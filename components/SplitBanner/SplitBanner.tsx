import { useMediaQuery } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { StyledBox, StyledImage, StyledGrid, ClickableGrid } from "./Styles";
import SpiltBannerSchema from "../../schemas/SplitBannerSchema";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { banner_event_type } from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import triggerGAEvent from "../../utility/GaEvents";
import { useInView } from "react-intersection-observer";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";

export default function SplitBanner({
  id,
  __component,
  bgColor,
  bgPadding,
  imageUrl,
  imageUrlMobile,
  pathLeft,
  pathRight,
  isNewTab,
  position,
  Item_name,
  promotion_id,
  promotion_name,
  creative_name,
  creative_slot,
}: SpiltBannerSchema) {
  //for responsive
  const [isMobile, setIsmobile] = useState(false);
  const matches = useMediaQuery("(min-width:768px)");
  // const viewEventWrapper = useRef();
  const [hasFiredEvent, setHasFiredEvent] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  useEffect(() => {
    setIsmobile(!matches);
  }, [matches]);

  const cookie = new Cookies();
  const { getItem } = useStorage();

  useEffect(() => {
    if (inView && !hasFiredEvent) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${creative_name}-outer SPB`,
        creative_slot: `${creative_slot}-outer SPB`,
        items: [
          {
            promotion_id: `${promotion_id}-inner SPB`,
            promotion_name: `${promotion_name}-inner SPB`,
            creative_name: `${creative_name}-inner SPB`,
            creative_slot: `${creative_slot}-inner SPB`,
          },
        ],
      };
      TriggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true);
    }
  }, [inView, hasFiredEvent, cookie, getItem, id, __component]);

  const callSelectPromotionEvent = () => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${creative_name}-outer SPB`,
      creative_slot: `${creative_slot}-outer SPB`,
      items: [
        {
          promotion_id: `${promotion_id}-inner SPB`,
          promotion_name: `${promotion_name}-inner SPB`,
          creative_name: `${creative_name}-inner SPB`,
          creative_slot: `${creative_slot}-inner SPB`,
        },
      ],
    };
    TriggerGaViewPromotion("select_promotion", datasLayer);
  };

  const handleClick = (
    url: string | URL,
    isNewTab: boolean,
    position: number,
    Item_name?: string
  ) => {
    if (isNewTab && !isMobile) {
      url && window.open(url);
    } else {
      url && window.location.assign(url);
    }
    callSelectPromotionEvent();
  };
  return (
    <StyledBox
      p={isMobile ? (bgPadding ? "0 16px" : 0) : bgPadding}
      sx={{
        paddingTop: isMobile ? "12px" : "20px",
        paddingBottom: isMobile ? "12px" : "20px",
      }}
      bgColor={bgColor}
      ref={ref}
    >
      <StyledImage
        src={
          isMobile
            ? `${ReplaceImage(imageUrlMobile)}`
            : `${ReplaceImage(imageUrl)}`
        }
        alt="......."
      ></StyledImage>
      <StyledGrid container direction="column">
        <ClickableGrid
          item
          xs={12}
          aria-label="left-side"
          onClick={() => handleClick(pathLeft, isNewTab, position, Item_name)}
        ></ClickableGrid>
        <ClickableGrid
          item
          xs={12}
          aria-label="right-side"
          onClick={() => handleClick(pathRight, isNewTab, position, Item_name)}
        ></ClickableGrid>
      </StyledGrid>
    </StyledBox>
  );
}
