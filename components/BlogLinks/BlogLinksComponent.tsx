import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { TypographyTitle, ButtonStyle, BoxStyles } from "./BlogLinksStyle";
import { useMobileCheck } from "../../utility/isMobile";
import Carousel from "../../HOC/Carousel/Carousel2";
import PersonalCareInterface from "../../schemas/PersonalCareSchema";
import BlogLinks from "./BlogLinks";
import {
  viewAllFrMob,
  viewAllFrDesk,
} from "../BlogThumbnail/BlogThumbnailStyle";
import { useRouter } from "next/router";
import triggerGAEvent from "../../utility/GaEvents";
import ViewEvent from "../../utility/viewEvent";
import { event_type, widget_type } from "../../utility/GAConstants";
import { useRef } from "react";
import { viewArray } from "../../utility/ViewEvenItemArray";
import { useInView } from "react-intersection-observer";
import triggerGaViewPromotion from "../../utility/GAViewPromotion";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";

const BlogLinksComponent = ({
  title,
  viewMore,
  items,
  bgPadding,
  bgColor,
  position,
  viewMorePath,
  id,
  __component,
  promotion_id,
  promotion_name,
}: PersonalCareInterface) => {
  const [hasFiredEvent, setHasFiredEvent] = useState(false);
  const isMobile = useMobileCheck();
  const router = useRouter(); 
  const initialSlides = isMobile ? 2 : 4;
  const [completedIndex, setCompletedIndex] = useState(initialSlides);
  const viewEventWrapper = useRef();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });
  const { getItem } = useStorage();
  const cookie = new Cookies();
  const userSettings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 2.1,
    slidesToScroll: 1,
    swipeToSlide: true,
  }; 

  const callGaEvent = () => {
    triggerGAEvent(
      {
        widget_type: widget_type,
        item_type: "na",
        component_id: id,
        widget_title: __component,
        widget_description: "na",
        widget_position: position,
        no_of_items: items?.length,
        item_brand: "na",
        item_category: "na",
        link_text: viewMore,
        link_url: `${global?.window?.location.origin}${viewMorePath}`,
      },
      "view_all"
    );
  };

  useEffect(() => {
    if (inView && !hasFiredEvent && !isMobile) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${items?.map((item) => `${item?.creative_name}-outer BLink`)
          .join("|")}`,
        creative_slot: `${items?.map((item) => `${item?.creative_name}-outer BLink`)
          .join("|")}`,
        ecommerce: {
        items: items?.map((item) => ({
          promotion_id: `${promotion_id}-inner BLink`,
          promotion_name: `${promotion_id}-inner BLink`,
          creative_name: `${item?.creative_name}-inner Blink`,
          creative_slot: `${item?.creative_slot}-inner Blink`,
        })),
      }
      };
      triggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true); // Mark the event as fired
    }
  }, [inView, hasFiredEvent, cookie, getItem, id, __component, items]);

  let seenItems: any[] = [];
  
  const trackGAEvent = (index: number) => {
   
    const roundedIndex = Math.round(index);
    const startIndex = roundedIndex;
    const endIndex = Math.min(roundedIndex + initialSlides, items.length); 
  
    const slicedItems = items?.slice(startIndex, endIndex);  
    const newItems = slicedItems.filter(item => !seenItems.includes(item));
  
    seenItems = [...seenItems, ...newItems];

    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_names: `${newItems?.map((item) => `${item?.creative_name}-outer BLink`)
        .join("|")}`,
      creative_slot: `${newItems?.map((item) => `${item?.creative_name}-outer BLink`)
        .join("|")}`,
      ecommerce: {
      items: newItems?.map((item) => ({
        promotion_id: `${promotion_id}-inner BLink`,
        promotion_name: `${promotion_id}-inner BLink`,
        creative_name: `${item?.creative_name}-inner Blink`,
        creative_slot: `${item?.creative_slot}-inner Blink`,
      })),
    }
    };
    if(newItems?.length > 0){
      triggerGaViewPromotion("view_promotion", datasLayer);
    }
  };
  return (
    <Box ref={ref}
      width={"100%"}
      p={isMobile ? "0 0 0 4%" : bgPadding}
      bgcolor={bgColor}
    >
      <Box>
        {inView && (
          <>
      <TypographyTitle>{title}</TypographyTitle>
      {isMobile ? (
        <Carousel
          Component={BlogLinks}
          items={items}
          settings={userSettings}
          callBack={undefined}
          isVertical={undefined}
          trackGAEvent={trackGAEvent}
        />
      ) : (
        <BoxStyles>
          {items?.map((data: any, index: any) => (
            <Box key={index}>
              <BlogLinks
                {...data}
                itemPosition={position}
                componentName={__component}
                promotion_id={promotion_id}
                promotion_name={promotion_name}
              />
            </Box>
          ))}
        </BoxStyles>
      )}
      {viewMore && (
        <ButtonStyle
          style={isMobile ? viewAllFrMob : viewAllFrDesk}
          onClick={() => [router?.push(viewMorePath), callGaEvent()]}
        >
          {viewMore}
        </ButtonStyle>
      )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default BlogLinksComponent;