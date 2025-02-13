import { Box } from "@mui/material";
import {
  ComponentTitle,
  MainBox,
  MediaBox,
  InnerBox,
  SubTitle,
  Description,
  Img,
  ImgBox,
  ImgList,
  ButtonBox,
  StyledBrandImage,
} from "./BrandDescriptionStyles";
import { useMobileCheck } from "../../utility/isMobile";
import Title from "../../HOC/Title/Title";
import { ReplaceImage } from "../../utility/ReplaceImage";
import ViewEvent from "../../utility/viewEvent";
import { Key, useEffect, useRef, useState } from "react";
import {
  event_type,
  Widget_type,
  widget_type,
} from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";
import { useInView } from "react-intersection-observer";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";

const BrandDescription = ({
  bgColor,
  bgPadding,
  title,
  ctaLabel,
  description,
  imgUrl,
  imgUrlMobile,
  subTitle,
  subTitleColor,
  items,
  ctaLabelUrl,
  position,
  id,
  __component,
  promotion_name,
  promotion_id,
}: any) => {
  const isMobile = useMobileCheck();
  const viewEventWrapper = useRef();

  const [hasFiredEvent, setHasFiredEvent] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const cookie = new Cookies();
  const { getItem } = useStorage();

  const dataLayer = {
    item_id: "na",
    item_name: "na",
    component_id: id,
    event_type: event_type,
    widget_type: widget_type,
    item_type: "na",
    widget_title: __component,
    widget_description: description,
    widget_position: position,
    no_of_items: 1,
    index: 1,
    view_items: [
      {
        item_id: `${__component}_${position}`,
        item_name: "na",
        index: 1,
        item_brand: "na",
        item_category: "na",
        price: 0,
        original_price: 0,
        quantity: 0,
        item_rating: "na",
        item_category2: "na",
        item_category3: "na",
        item_category5: "na",
        item_deeplink_url: "na",
        item_image_link: imgUrl,
      },
    ],
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");
  const callViewAllEvent = (text: string) => {
    triggerGAEvent(
      {
        widget_type: Widget_type,
        component_id: id,
        item_type: "na",
        widget_title: __component,
        widget_description: description,
        widget_postion: position,
        link_url: `${global?.window?.location?.origin}${ctaLabelUrl}`,
        link_text: text,
        no_of_items: items?.length,
        item_brand: "na",
        item_category: "na",
      },
      "view_all"
    );
  };

  useEffect(() => {
    if (inView && !hasFiredEvent) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${"creative_name"}-outer BRD`,
        creative_slot: `${"creative_slot"}-outer BRD`,
        items: [
          {
            promotion_id: `${promotion_id}-inner BRD`,
            promotion_name: `${promotion_name}-inner BRD`,
            //todo createe_name waiting for BAckend to add it
            creative_name: `${"creative_name"}-inner BRD`,
            creative_slot: `${"creative_slot"}-inner BRD`,
          },
        ],
      };
      console.log("datasLayer here", datasLayer);
      TriggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true);
    }
  }, [inView, hasFiredEvent, cookie, getItem, id, __component]);

  return (
    <Box
      ref={viewEventWrapper}
      bgcolor={bgColor}
      sx={{ paddingBottom: subTitle ? "0px" : isMobile ? "0px" : "40px" }}
      p={isMobile ? "0px 16px 0px 16px" : bgPadding}
    >
      <Box ref={ref}>
        <ComponentTitle>
          <Title
            interface={{ title: title, isFromPdp: subTitle ? false : true }}
          />
        </ComponentTitle>
        <MainBox>
          <MediaBox>
            <StyledBrandImage
              src={
                isMobile
                  ? `${ReplaceImage(imgUrlMobile)}`
                  : `${ReplaceImage(imgUrl)}`
              }
              $isSubTitleAvailable={subTitle ? true : false}
              alt="image"
            />
          </MediaBox>
          <InnerBox>
            {subTitle && <SubTitle color={subTitleColor}>{subTitle}</SubTitle>}
            <Description
              sx={{
                fontSize: {
                  lg: 16,
                  md: 14,
                  sm: 12,
                  xs: 12,
                },
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <ImgList>
              {items?.map(
                (item: { iconUrl: string }, index: Key | null | undefined) => (
                  <ImgBox key={index}>
                    <Img
                      src={`${ReplaceImage(item?.iconUrl)}`}
                      alt="icon"
                      width={"100%"}
                    />
                  </ImgBox>
                )
              )}
            </ImgList>
          </InnerBox>
        </MainBox>
        <Box sx={{ textAlign: "center" }}>
          {ctaLabel && (
            <ButtonBox
              sx={{ p: 0 }}
              onClick={() => {
                callViewAllEvent(ctaLabel);
                isMobile
                  ? window.location.assign(ctaLabelUrl)
                  : window.open(ctaLabelUrl);
              }}
            >
              {ctaLabel}
            </ButtonBox>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default BrandDescription;