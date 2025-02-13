/* eslint-disable @next/next/no-img-element */
import CategoryInterface from "../../schemas/Categories";
import Title from "../../HOC/Title/Title";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  CategoryImage,
  CategoryText,
  ListItemContainer,
} from "./QuickLinksStyle";
import { useEffect, useRef, useState } from "react";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { widget_type, event_type } from "../../utility/GAConstants";
import { useMobileCheck } from "../../utility/isMobile";
import ViewEvent from "../../utility/viewEvent";
import triggerGAEvent from "../../utility/GaEvents";
import { ViewArray } from "../../utility/ViewEvenItemArray";
import { useInView } from "react-intersection-observer";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import triggerGaViewPromotion from "../../utility/GAViewPromotion";

function QuickLinks({
  bgPadding,
  items,
  mobileItems,
  bgColor,
  title,
  id,
  __component,
  position,
  promotion_id,
  promotion_name,
}: CategoryInterface) {
  const isMobile = useMobileCheck();
  const [listItems, setListItems] = useState(isMobile ? mobileItems : items);
  const viewEventWrapper = useRef();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hasFiredEvent, setHasFiredEvent] = useState(false);

  const cookie = new Cookies();
  const { getItem } = useStorage();
  useEffect(() => {
    setListItems(isMobile ? mobileItems : items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);


  useEffect(() => {
    if (inView && !hasFiredEvent) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${listItems
          ?.map((item: any) => `${item?.creative_name}-outer QL`)
          .join("|")}`,
        creative_slot: `${listItems
          ?.map((item: any) => `${item?.creative_slot}-outer QL`)
          .join("|")}`,
        items: listItems?.map((item) => ({
          promotion_id: `${promotion_id}-inner QL`,
          promotion_name: `${promotion_name}-inner QL`,
          creative_name: `${item?.creative_name}-inner QL`,
          creative_slot: `${item?.creative_slot}-inner QL`,
        })),
        // }
      };
      triggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true);
    }
  }, [inView, hasFiredEvent, cookie, getItem, id, __component, listItems]);

  const handleCTAClick = (category: any, index: number) => {
    if (category?.isNewTab) {
      isMobile
        ? window.location.assign(category?.path)
        : window.open(category?.path);
    } else {
      window.location.assign(category?.path);
    }
    callClickEvent(category, index);
  };
  const callClickEvent = (category: any, index: number) => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${category?.creative_name}-outer QL`,
      creative_slot: `${category?.creative_slot}-outer QL`,
      items: [
        {
          promotion_id: `${promotion_id}-inner QL`,
          promotion_name: `${promotion_name}-inner QL`,
          creative_name: `${category?.creative_name}-inner QL`,
          creative_slot: `${category?.creative_slot}-inner QL`,
        },
      ],
    };
    triggerGaViewPromotion("select_promotion", datasLayer);
  };
  return (
    <Box
      bgcolor={bgColor}
      p={isMobile ? "0 16px" : bgPadding}
      sx={{
        paddingTop: isMobile ? "12px" : "20px",
        paddingBottom: isMobile ? "12px" : "20px",
      }}
      className={__component + id}
      ref={viewEventWrapper}
    >
      {title && (
        <Box
          pb={isMobile ? "10px" : "18px"}
          sx={{
            paddingTop: isMobile ? "2px" : "4px",
            paddingBottom: isMobile ? "14px" : "24px",
          }}
        >
          <Title interface={{ title: title, bgColor: bgColor }} />
        </Box>
      )}
      <Grid
        container
        spacing={isMobile ? undefined : 0}
        rowGap={isMobile ? "10px" : 0}
        ref={ref}
      >
        {inView &&
          listItems?.map((category, idx) => (
            <Grid
              item
              xs={4}
              sm={12 / listItems?.length}
              md={12 / listItems?.length}
              lg={12 / listItems?.length}
              key={idx}
            >
              <ListItemContainer onClick={() => handleCTAClick(category, idx)}>
                <CategoryImage
                  src={`${ReplaceImage(category?.imageUrl)}`}
                  alt="Top Categories"
                  width="100%"
                />
                <CategoryText
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {category?.text}
                </CategoryText>
              </ListItemContainer>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default QuickLinks;