import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  StyledBox,
  FlexBox,
  StyledButton,
  StyledImage,
  SingleCard,
  ContentImg,
} from "./Styles";
import MultiShowcaseInterface, {
  LIST_ITEMS,
} from "../../schemas/MultiShowcaseSchema";
import Title from "../../HOC/Title/Title";
import { useRouter } from "next/router";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { widget_type, event_type } from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import triggerGAEvent from "../../utility/GaEvents";
import { viewArray } from "../../utility/ViewEvenItemArray";
import { useInView } from "react-intersection-observer";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";

const MultiShowcase = ({
  title,
  bgColor,
  bgPadding,
  contentLeft,
  contentImageUrl,
  contentImageUrlMobile,
  items,
  zigzag = false,
  path,
  position,
  id,
  __component,
  promotion_id,
  promotion_name,
}: MultiShowcaseInterface) => {
  const router = useRouter();
  const [isMobile, setIsmobile] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  const viewEventWrapper = useRef();
  const [hasFiredEvent, setHasFiredEvent] = useState(false);

  const cookie = new Cookies();
  const { getItem } = useStorage();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  useEffect(() => {
    setIsmobile(!matches);
  }, [matches]);

  useEffect(() => {
    if (inView && !hasFiredEvent) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${items
          ?.map((item: any) => `${item?.creative_name}-outer MSC`)
          .join("|")}`,
        creative_slot: `${items
          ?.map((item: any) => `${item?.creative_slot}-outer MSC`)
          .join("|")}`,
        items: items?.map((item: any) => ({
          promotion_id: `${promotion_id}-inner MSC`,
          promotion_name: `${promotion_name}-inner MSC`,
          creative_name: `${item?.creative_name}-inner MSC`,
          creative_slot: `${item?.creative_slot}-inner MSC`,
        })),
      };
      TriggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true);
    }
  }, [inView, hasFiredEvent, cookie, getItem, id, __component, items]);

  const callSelectPromotionEvent = (
    creative_name: string,
    creative_slot: string
  ) => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${creative_name}-outer MSC`,
      creative_slot: `${creative_slot}-outer MSC`,
      items: [
        {
          promotion_id: `${promotion_id}-inner MSC`,
          promotion_name: `${promotion_name}-inner MSC`,
          creative_name: `${creative_name}-inner MSC`,
          creative_slot: `${creative_slot}-inner MSC`,
        },
      ],
    };
    TriggerGaViewPromotion("select_promotion", datasLayer);
  };

  const handleClickRedirection = (
    isNewTab: boolean,
    path: URL | string,
    index: number,
    linktext: string,
    creative_name: string,
    creative_slot: string
  ) => {
    if (isNewTab) {
      window?.open(path);
    } else {
      router.push(path);
    }
   
    callSelectPromotionEvent(creative_name, creative_slot);

    return null;
  };
  const commonFunction = (condition: any, value1: any, value2: any) => {
    if (condition) {
      return value1;
    } else {
      return value2;
    }
  };

  return (
    <Box
      ref={viewEventWrapper}
      bgcolor={bgColor}
      p={isMobile ? "0 16px" : bgPadding}
      sx={{
        paddingTop: isMobile ? "12px" : "20px",
        paddingBottom: isMobile ? "12px" : "20px",
      }}
    >
      {title && (
        <Box
          sx={{
            paddingTop: isMobile ? "2px" : "4px",
            paddingBottom: isMobile ? "4px" : "8px",
          }}
        >
          <Title
            interface={{
              title: title,
            }}
          />
        </Box>
      )}
      <Grid
        container
        display="flex"
        flexShrink="0"
        flexWrap={isMobile ? "wrap" : "nowrap"}
        columnGap="10px"
        rowGap="8px"
        paddingTop={
          isMobile
            ? commonFunction(title, "10px", 0)
            : commonFunction(title, "1.5%", 0)
        }
        direction={
          isMobile ? "row" : commonFunction(contentLeft, "row", "row-reverse")
        }
      >
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <FlexBox
            onClick={() =>
              path && window.location.assign(`${window.location.origin}${path}`)
            }
          >
            <ContentImg
              src={
                isMobile
                  ? `${ReplaceImage(contentImageUrlMobile)}`
                  : `${ReplaceImage(contentImageUrl)}`
              }
              alt="img "
            />
          </FlexBox>
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8} xl={8} ref={ref}>
          <StyledBox display={isMobile ? "grid" : "flex"}>
            <Stack direction="row" spacing={{ xs: "8px", md: "12px" }}>
              {items?.map((item: LIST_ITEMS, idx: number) => {
                const indexValue = idx;
                return (
                  <SingleCard
                    isMobile={isMobile}
                    key={indexValue}
                    index={idx}
                    zigzag={zigzag}
                    onClick={(e: any) =>
                      handleClickRedirection(
                        item?.isNewTab,
                        item?.path,
                        idx,
                        item?.text,
                        item?.creative_name,
                        item?.creative_slot
                      ) && e.preventDefault()
                    }
                  >
                    <StyledImage
                      src={`${ReplaceImage(item?.imageUrl)}`}
                      alt="image"
                    ></StyledImage>
                    {item?.text && (
                      <StyledButton variant="contained">
                        {item?.text}
                      </StyledButton>
                    )}
                  </SingleCard>
                );
              })}
            </Stack>
          </StyledBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MultiShowcase;