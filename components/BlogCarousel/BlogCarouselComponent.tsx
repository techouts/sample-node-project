import Carousel from "../../HOC/Carousel/Carousel2";
import {
  CustomNextArrow,
  CustomPrevArrow,
} from "../ShopByCollection/CustomArrows";
import EditorPickInterface from "../../schemas/EditorPickSchema";
import { Box } from "@mui/material";
import { Title, ViewAllbutton } from "./BlogCarouselStyle";
import styled from "@emotion/styled";
import { useMobileCheck } from "../../utility/isMobile";
import BlogCarousel from "./BlogCarousel";
import { useRouter } from "next/router";
import {
  viewAllFrMob,
  viewAllFrDesk,
} from "../BlogThumbnail/BlogThumbnailStyle";
import triggerGAEvent from "../../utility/GaEvents";
import ViewEvent from "../../utility/viewEvent";
import { event_type, widget_type } from "../../utility/GAConstants";
import { useRef, useState } from "react";
import { viewArray } from "../../utility/ViewEvenItemArray";
import { useInView } from "react-intersection-observer";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";

const BlogCarouselComponent = ({
  items,
  title,
  button,
  buttonPath,
  bgPadding,
  position,
  id,
  __component,
}: EditorPickInterface) => {
  const isMobile = useMobileCheck();
  const router = useRouter();
  const viewEventWrapper = useRef();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });
  const cookie = new Cookies();
  const { getItem } = useStorage();

  const [prevArrow, setPrevArrow] = useState(false);
  const [nextArrow, setNextArrow] = useState(
    items?.length === 3 ? false : true
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const SliderWrap = styled.div`
    .slick-center {
      transform: scale(1.1);
    }

    .slick-slide:not(.slick-active) {
      ${isMobile ? `margin: 10px 0 ` : `margin:10px`}

    .child {
      width: 100%;
    }

    .slide:not(.slick-active) {
      cursor: pointer;
    }
  `;
  const print = (sliderIndex: number) => {
    if (currentIndex < sliderIndex) {
      handleArrowData(sliderIndex, "swipe_right");
    } else {
      handleArrowData(sliderIndex, "swipe_left");
    }
  };
  const handleArrowData = (index: number, eventName: string) => {
    triggerGAEvent(
      {
        item_name: "na",
        item_id: "na",
        widget_type: widget_type,
        component_id: id,
        item_type: "na",
        widget_title: title,
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
  const settings = {
    arrows: true,
    dots: false,
    centerMode: true,
    centerPadding: isMobile ? "0%" : "30%",
    infinite: true,
    initialSlide: 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: false,
    pauseOnHover: false,
    prevArrow: (
      <CustomPrevArrow
        isPrev={true}
        cssData={{ width: "36px", height: "36px", left: "10px", top: "25%" }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        isNext={true}
        cssData={{ width: "36px", height: "36px", right: "10px", top: "25%" }}
      />
    ),
    afterChange: (sliderIndex: number) => print(sliderIndex),
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          infinite: false,
          initialSlide: 0,
          speed: 500,
          swipeToSlide: true,
          slidesToShow: 1.4,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0",
        },
      },
    ],
  };

  const dataLayer = {
    item_id: items?.[0]?.path,
    item_name: items?.[0]?.Item_name || "na",
    widget_type: widget_type,
    component_id: id,
    item_type: "product",
    widget_title: __component,
    widget_description: "na",
    widget_postion: position,
    no_of_items: items?.length,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    view_items: viewArray(items),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  const callGaEvent = () => {
    triggerGAEvent(
      {
        widget_type: widget_type,
        item_type: "product",
        widget_title: title,
        component_id: id,
        widget_description: "na",
        widget_position: position,
        no_of_items: items?.length,
        item_brand: "na",
        item_category: "na",
        link_text: button,
        link_url: `${global?.window?.location.origin}${buttonPath}`,
        item_id: buttonPath,
      },
      "view_all"
    );
  };

  const initialSlides = isMobile ? 1.5 : 3;
  let newVisibleProducts: any = [];

  const trackGAEvent = (index: number) => {
    const roundedIndex = Math.round(index - settings.initialSlide);

    const startIndex = roundedIndex;
    const endIndex = Math.min(roundedIndex + initialSlides, items.length);
    const visibleProducts = items.slice(startIndex, endIndex);

    const newItems = visibleProducts.filter(
      (item) => !newVisibleProducts.includes(item)
    );

    newVisibleProducts = [...newVisibleProducts, ...newItems];

    if (newItems.length) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${items
          ?.map((item: any) => `${item?.creative_name}-outer BC`)
          .join("|")}`,
        creative_slot: `${items
          ?.map((item: any) => `${item?.creative_slot}-outer BC`)
          .join("|")}`,
        items: newItems?.map((item: any) => ({
          promotion_id: `${"promotion_id"}-inner BC`,
          promotion_name: `${"promotion_name"}-inner BC`,
          creative_name: `${item?.creative_name}-inner BC`,
          creative_slot: `${item?.creative_slot}-inner BC`,
        })),
      };
      TriggerGaViewPromotion("view_promotion", datasLayer);
    }
  };

  return (
    <Box
      ref={viewEventWrapper}
      p={isMobile ? bgPadding : bgPadding}
      sx={{ width: "100%" }}
    >
      <div ref={ref}>
        {inView ? (
          <>
            <Title>{title}</Title>
            <SliderWrap>
              <Carousel
                promotion_name={`${"promotion_name"}-inner BC`}
                promotion_id={`${"promotion_id"}-inner BC`}
                Component={BlogCarousel}
                items={items}
                settings={settings}
                callBack={undefined}
                isVertical={undefined}
                componentName={__component}
                position={position}
                id={id}
                trackGAEvent={trackGAEvent}
              />
            </SliderWrap>
            {button && (
              <ViewAllbutton
                style={isMobile ? viewAllFrMob : viewAllFrDesk}
                onClick={() => {
                  callGaEvent();
                  return router?.push(buttonPath);
                }}
              >
                {button}
              </ViewAllbutton>
            )}
          </>
        ) : null}
      </div>
    </Box>
  );
};

export default BlogCarouselComponent;