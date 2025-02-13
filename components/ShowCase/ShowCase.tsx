import { useEffect, useRef, useState } from "react";
import TrunkShowInterface from "../../schemas/ShowCase";
import Title from "../../HOC/Title/Title";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { OfferTextStyle, SmallTextStyle } from "./ShowCaseStyles";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { widget_type, event_type } from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import triggerGAEvent from "../../utility/GaEvents";
import { viewArray } from "../../utility/ViewEvenItemArray";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import { useInView } from "react-intersection-observer";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";

const ShowCase = ({
  id,
  __component,
  bgColor,
  bgPadding,
  items,
  title,
  position,
  promotion_id,
  promotion_name,
}: TrunkShowInterface) => {
  const isMobile = useMobileCheck();

  const viewEventWrapper = useRef();

  const [hasFiredEvent, setHasFiredEvent] = useState(false);

  const cookie = new Cookies();
  const { getItem } = useStorage();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const dataLayer = {
    item_id: "na",
    item_name: "na",
    component_id: id,
    widget_type: widget_type,
    item_type: "na",
    widget_title: __component,
    widget_description: "na",
    widget_postion: position,
    no_of_items: items?.length,
    index: position,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    view_items: viewArray(items, `${__component}_${position}_`),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  const gaTriggerEvent = (index: number, imageUrl: string, url: any) => {
    triggerGAEvent(
      {
        item_name: items[0]?.Item_name,
        item_id: `${__component}_${position}_${index + 1}`,
        component_id: id,
        widget_type: widget_type,
        item_type: items[0]?.Item_type,
        widget_title: __component,
        widget_description: "na",
        widget_postion: position,
        link_url: `${global?.window?.location?.origin}${url}`,
        link_text: items[0]?.text,
        no_of_items: items?.length,
        index: index + 1,
        item_brand: "na",
        item_category: "na",
        item_image_link: imageUrl,
        item_category2: "na",
        item_category3: "na",
        item_orginal_price: 0,
        item_price: 0,
        item_rating: "na",
        event_type: event_type,
      },
      "click"
    );
  };
  const callSelectPromotionEvent = (
    creative_name: string,
    creative_slot: string
  ) => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${creative_name}-outer SC`,
      creative_slot: `${creative_slot}-outer SC`,
      items: [
        {
          promotion_id: `${promotion_id}-inner SC`,
          promotion_name: `${promotion_name}-inner SC`,
          creative_name: `${creative_name}-inner SC`,
          creative_slot: `${creative_slot}-inner SC`,
        },
      ],
    };
    TriggerGaViewPromotion("select_promotion", datasLayer);
  };

  useEffect(() => {
    if (inView && !hasFiredEvent) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${items
          ?.map((item: any) => `${item?.creative_name}-outer SC`)
          .join("|")}`,
        creative_slot: `${items
          ?.map((item: any) => `${item?.creative_slot}-outer SC`)
          .join("|")}`,
        items: items?.map((item: any) => ({
          promotion_id: `${promotion_id}-inner SC`,
          promotion_name: `${promotion_name}-inner SC`,
          creative_name: `${item?.creative_name}-inner SC`,
          creative_slot: `${item?.creative_slot}-inner SC`,
        })),
      };
      TriggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true);
    }
  }, [inView, hasFiredEvent, cookie, getItem, id, __component, items]);

  return (
    <Box
      ref={viewEventWrapper}
      sx={{
        backgroundColor: bgColor,
        padding: isMobile ? (bgPadding ? "0 16px" : 0) : bgPadding,
        paddingTop: isMobile ? "12px" : "20px",
        paddingBottom: isMobile ? "12px" : "20px",
      }}
    >
      <div ref={ref}>
        {inView ? (
          <>
            {title && (
              <Box
                sx={{
                  paddingTop: isMobile ? "2px" : "4px",
                  paddingBottom: isMobile ? "4px" : "2px",
                }}
              >
                <Title
                  interface={{ title: title, bgColor: bgColor }}
                  sx={{
                    textAlign: "center",
                  }}
                />
              </Box>
            )}
            <Stack
              direction={{ xs: "row", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              sx={{ justifyContent: "center" }}
              paddingTop={isMobile ? "10px" : "18px"}
            >
              {items?.map(
                (
                  {
                    imageUrl,
                    path,
                    text,
                    textColor,
                    subText,
                    creative_name,
                    creative_slot,
                  },
                  index
                ) => (
                  <Paper
                    key={index}
                    elevation={0}
                    onClick={() => {
                      gaTriggerEvent(index, imageUrl, path);
                      callSelectPromotionEvent(creative_name, creative_slot);
                      window.location.assign(
                        `${window.location.origin}${path}`
                      );
                    }}
                  >
                    <Stack
                      width="100%"
                      height="100%"
                      direction={index % 2 === 0 ? "column" : "column-reverse"}
                      sx={{ backgroundColor: bgColor }}
                    >
                      <Box sx={{ cursor: "pointer" }}>
                        <img
                          src={`${ReplaceImage(imageUrl)}`}
                          alt="Trunk Show Image"
                          width={"100%"}
                          height={"100%"}
                        />
                      </Box>
                      <Box
                        textAlign={index % 2 === 0 ? "left" : "right"}
                        padding={1}
                        sx={{ backgroundColor: bgColor }}
                      >
                        <OfferTextStyle $textColor={textColor}>
                          {text}
                        </OfferTextStyle>
                        <SmallTextStyle> {subText}</SmallTextStyle>
                      </Box>
                    </Stack>
                  </Paper>
                )
              )}
            </Stack>
          </>
        ) : null}
      </div>
    </Box>
  );
};
export default ShowCase;