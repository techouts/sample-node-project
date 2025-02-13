import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Carousel from "../../HOC/Carousel/Carousel2";
import CategoryCarouselInterface from "../../schemas/CategoryCarouselSchema";
import { useMobileCheck } from "../../utility/isMobile";
import React, { useState, useRef, useEffect } from "react";
import { CustomPrevArrow, CustomNextArrow } from "../ShopByLuxury/CustomArrows";
import {
  Typographytext,
  Typographylabel,
  Typographymain,
} from "./CategoryCarouselStyles";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { widget_type, event_type } from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import { viewArray } from "../../utility/ViewEvenItemArray";
import triggerGAEvent from "../../utility/GaEvents";
import { useInView } from "react-intersection-observer";
import triggerGaViewPromotion from "../../utility/GAViewPromotion";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";

const handleClick = (url: string, isMobile: boolean | any, index: number) => {
  isMobile ? window.location.assign(url) : url && window.open(url);
};
function CategoryCarousel({
  bgColor,
  bgpadding,
  title,
  items,
  position,
  id,
  __component,
  promotion_id,
  promotion_name,
}: CategoryCarouselInterface) {
  const viewEventWrapper = useRef();
  const isMobile = useMobileCheck();

  const cookie = new Cookies();
  const { getItem } = useStorage();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [prevArrow, setPrevArrow] = useState(false);
  const [nextArrow, setNextArrow] = useState(
    // @ts-ignore:next-line
    items?.length <= 3 ? false : true
  );

  const initialSlides = isMobile ? 2 : 4;
  let newVisibleProducts: any = [];

  const trackGAEvent = (index: number) => {
    const roundedIndex = Math.round(index);
    const startIndex = roundedIndex;
    const endIndex = Math.min(roundedIndex + initialSlides, items.length);

    const visibleProducts = items.slice(startIndex, endIndex);

    const newItems = visibleProducts.filter(
      (item) => !newVisibleProducts.includes(item)
    );

    newVisibleProducts = [...newVisibleProducts, ...newItems];

    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${items
        ?.map((item: any) => `${item?.creative_name}-outer CC`)
        .join("|")}`,
      creative_slot: `${items
        ?.map((item: any) => `${item?.creative_slot}-outer CC`)
        .join("|")}`,
      items: newItems?.map((item: any) => ({
        promotion_id: `${promotion_id}-inner CC`,
        promotion_name: `${promotion_name}-inner CC`,
        creative_name: `${item?.creative_name}-inner CC`,
        creative_slot: `${item?.creative_slot}-inner CC`,
      })),
    };
    TriggerGaViewPromotion("view_promotion", datasLayer);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const arrowsHandler = (sliderIndex: number) => {
    if (sliderIndex === 0) {
      setPrevArrow(false);
      setNextArrow(true);
    } else if (sliderIndex === items?.length - 3) {
      setPrevArrow(true);
      setNextArrow(false);
    } else {
      setNextArrow(true);
      setPrevArrow(true);
    }
    setCurrentIndex(sliderIndex);
    if (currentIndex < sliderIndex) {
      handleArrowData(sliderIndex, "swipe_right");
    } else {
      handleArrowData(sliderIndex, "swipe_left");
    }
  };

  // handling for prev and next arrow functionalities in carousel
  const handleArrowData = (index: number, eventName: string) => {
    triggerGAEvent(
      {
        item_name: "na",
        component_id: id,
        item_id: `${__component}_${position}_${index + 1}`,
        widget_type: widget_type,
        item_type: "na",
        widget_title: __component,
        widget_description: "na",
        widget_postion: position,
        no_of_items: items?.length,
        index: index + 1,
        item_brand: "na",
        item_category: "na",
      },
      eventName
    );
  };
  const userSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 3.75,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: (
      <CustomPrevArrow
        isPrev={prevArrow}
        cssData={{ width: "36px", height: "36px", left: "-50px", top: "40%" }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        isNext={nextArrow}
        cssData={{ width: "36px", height: "36px", right: "50px", top: "40%" }}
      />
    ),
    afterChange: (sliderIndex: number) => arrowsHandler(sliderIndex),
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const singleCard = (item: any, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const callClickEvent = (
      path: any,
      text: string,
      imageUrl: any,
      item: any
    ) => {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${item?.creative_name}-outer CC`,
        creative_slot: `${item?.creative_slot}-outer CC`,
        ecommerce: {
          items: [
            {
              promotion_id: `${promotion_id}-inner CC`,
              promotion_name: `${promotion_name}-inner CC`,
              creative_name: `${item?.creative_name}-inner CC`,
              creative_slot: `${item?.creative_slot}-inner CC`,
            },
          ],
        },
      };

      triggerGaViewPromotion("select_promotion", datasLayer);
    };
    return (
      <Box
        {...item}
        onClick={() => {
          handleClick(item?.Path, isMobile, index),
            callClickEvent(item?.Path, item?.title, item?.imageUrl, item);
        }}
        px={isMobile ? 0.5 : 1}
      >
        <img
          width="100%"
          height="100%"
          src={`${ReplaceImage(item?.imageUrl)}`}
          alt="image"
        ></img>
        <Stack>
          <Typographytext isMobile={isMobile}>{item?.title}</Typographytext>
          <Typographylabel isMobile={isMobile}>
            {item?.subTitle}
          </Typographylabel>
        </Stack>
      </Box>
    );
  };
  return (
    <Box
      ref={viewEventWrapper}
      width="100%"
      bgcolor={bgColor}
      p={isMobile ? "0 0 20px 16px " : bgpadding}
    >
      <Grid
        container
        direction="row"
        style={{ alignItems: "center" }}
        ref={ref}
      >
        {inView && (
          <>
            <Grid item xs={12} md={3}>
              <Typographymain isMobile={isMobile}>{title}</Typographymain>
            </Grid>
            <Grid item xs={12} md={9}>
              <Carousel
                trackGAEvent={trackGAEvent}
                promotion_name={promotion_name}
                promotion_id={promotion_id}
                Component={singleCard}
                items={items}
                settings={userSettings}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
export default CategoryCarousel;