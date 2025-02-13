import ExperienceLuxuryStoreSchema from "../../schemas/ShopByLuxurySchema";
import { CustomPrevArrow, CustomNextArrow } from "./CustomArrows";
import {
  StyledText,
  OfferText,
  MainCard,
  StyledImage,
  BackgroundBox,
} from "./ShopByLuxuryStyles";
import Carousel from "../../HOC/Carousel/Carousel2";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRef, useState, useEffect } from "react";
import Title from "../../HOC/Title/Title";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { widget_type, event_type } from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import triggerGAEvent from "../../utility/GaEvents";
import {
  ShopbyluxuryViewArray,
  viewArray,
} from "../../utility/ViewEvenItemArray";
import { useRouter } from "next/router";
import { gaActionEvent } from "../../utility/gaActionEvent";
import { useInView } from "react-intersection-observer";
import triggerGaViewPromotion from "../../utility/GAViewPromotion";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";

const ShopByLuxury = ({
  bgColor,
  bgPadding,
  items,
  title,
  position,
  id,
  titleColor,
  __component,
  promotion_id,
  promotion_name,
  viewport,
}: ExperienceLuxuryStoreSchema) => {
  const cookie = new Cookies();
  const { getItem } = useStorage();
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const carouselElement = carouselRef.current;
    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      if (Math.abs(dx) > Math.abs(dy)) {
        isSwiping = true;
        // Prevent vertical scroll during horizontal swipe
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      isSwiping = false;
    };

    if (carouselElement) {
      carouselElement.addEventListener("touchstart", handleTouchStart);
      carouselElement.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      carouselElement.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("touchstart", handleTouchStart);
        carouselElement.removeEventListener("touchmove", handleTouchMove);
        carouselElement.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  const isMobile = useMobileCheck();

  const viewEventWrapper = useRef();
  const [prevArrow, setPrevArrow] = useState(false);
  const [nextArrow, setNextArrow] = useState(
    items?.length === 3 ? false : true
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const initialSlides = isMobile ? 2.5 : 3;
  const [completedIndex, setCompletedIndex] = useState(initialSlides);
  const { ref, inView } = useInView({ triggerOnce: true });
 
  const handleArrowData = (index: number, eventName: string) => {
    triggerGAEvent(
      {
        item_name: "na",
        item_id: `${__component}_${position}_${index + 1}`,
        widget_type: widget_type,
        component_id: id,
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
    draggable: true,
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: (
      <CustomPrevArrow
        isPrev={prevArrow}
        cssData={{ width: "36px", height: "36px", left: "-40px" }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        isNext={nextArrow}
        cssData={{ width: "36px", height: "36px", right: "-40px" }}
      />
    ),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

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
      creative_name: `${newItems
        ?.map((item: any) => `${item?.creative_name}-outer SBL`)
        .join("|")}`,
      creative_slot: `${newItems
        ?.map((item: any) => `${item?.creative_slot}-outer SBL`)
        .join("|")}`,
      items: newItems?.map((item: any) => ({
        promotion_id: `${promotion_id}-inner SBL`,
        promotion_name: `${promotion_name}-inner SBL`,
        creative_name: `${item?.creative_name}-inner SBL`,
        creative_slot: `${item?.creative_slot}-inner SBL`,
      })),
    };
    TriggerGaViewPromotion("view_promotion", datasLayer);
  };

  return (
    <>
      <Box
        ref={viewEventWrapper}
        bgcolor={bgColor}
        p={isMobile ? "0 0 25px 16px" : bgPadding}
      >
        <Box component="div" pb={isMobile ? "10px" : "18px"}>
          <Title
            interface={{
              title: title,
              bgColor: bgColor,
              titleColor: titleColor,
            }}
          />
        </Box>
        <Grid ref={ref} style={{ touchAction: "pan-y" }}>
          {inView && (
            <Carousel
              Component={LuxuryCard}
              items={items}
              settings={userSettings}
              callBack={undefined}
              isVertical={undefined}
              componentvalue={__component}
              widgetposition={position}
              promotion_id={promotion_id}
              promotion_name={promotion_name}
              trackGAEvent={trackGAEvent}
            />
          )}
        </Grid>
      </Box>
    </>
  );
};
const LuxuryCard = (props: any) => {
  const {
    path,
    isNewTab,
    textBgColor,
    text,
    imageUrl,
    id,
    componentvalue,
    widgetposition,
    dataSet,
    viewport,
  } = props;

  const isMobile = useMobileCheck();
  const router = useRouter();
  const cookie = new Cookies();
  const { getItem } = useStorage();

  const handleClick = () => {

    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${props?.creative_name}-outer SBL`,
      creative_slot: `${props?.creative_slot}-outer SBL`,
      items: [
        {
          promotion_id: `${props?.promotion_id}-inner SBL`,
          promotion_name: `${props?.promotion_name}-inner SBL`,
          creative_name: `${props?.creative_name}-inner SBL`,
          creative_slot: `${props?.creative_slot}-inner SBL`,
        },
      ],
    };

    triggerGaViewPromotion("select_promotion", datasLayer);
    if (isNewTab) {
      path && window?.open(path);
    } else {
      path && router?.push(path);
    }
  };
  return (
    <>
      <MainCard onClick={() => handleClick()} style={{ touchAction: "pan-y" }}>
        <StyledImage
          src={`${ReplaceImage(imageUrl)}`}
          alt="LuxuryCardImage"
        ></StyledImage>
        <BackgroundBox
          height={isMobile ? "44px" : "72px"}
          color={"white"}
          bgcolor={textBgColor}
          textAlign={"center"}
          width={isMobile ? "calc(100% - 6px)" : "calc(100% - 16.5px)"}
          bottom={isMobile ? "3px" : "7.5px"}
          mx={isMobile ? "3px" : "8px"}
        >
          <StyledText sx={{ visibility: "hidden" }}>{text}</StyledText>
        </BackgroundBox>
        <OfferText
          height={isMobile ? "44px" : "72px"}
          color={"white"}
          bgcolor="transparent"
          textAlign={"center"}
          width={isMobile ? "calc(100% - 6px)" : "calc(100% - 16.5px)"}
          bottom={isMobile ? "3px" : "7.5px"}
          mx={isMobile ? "3px" : "8px"}
        >
          <StyledText>{text}</StyledText>
        </OfferText>
      </MainCard>
    </>
  );
};
export default ShopByLuxury;
