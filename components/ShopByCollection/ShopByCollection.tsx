import  Box  from "@mui/material/Box";
import React, { useRef, useState } from "react";
import Carousel from "../../HOC/Carousel/Carousel2";
import {
  ItemTitle,
  StyledBox,
  StyledText,
  StyledViewMore,
} from "./ShopByCOllectionStyles";
import { CustomPrevArrow, CustomNextArrow } from "./CustomArrows";
import Title from "../../HOC/Title/Title";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { widget_type } from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";
import Image from "next/image";
import { isMobile as deviceIsMobile } from "react-device-detect";
import { useInView } from "react-intersection-observer";
import ItemSkeleton from "./ItemSkeleton";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";
import { ITEMS_LIST } from "../../schemas/BuyingGuidesSchema";

function ShopByCollection(data: any) {
  const isMobile = deviceIsMobile;
  const initialSlides = isMobile ? 4 : 6;
  const viewEventWrapper = useRef();

  const cookie = new Cookies();
  const { getItem } = useStorage();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [prevArrow, setPrevArrow] = useState(false);
  const [nextArrow, setNextArrow] = useState(
    data?.items?.length <= 6 ? false : true
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  let newVisibleProducts: any = [];

  const trackGAEvent = (index: number) => {
    const roundedIndex = Math.round(index);
    const startIndex = roundedIndex;
    const endIndex = Math.min(roundedIndex + initialSlides, data.items.length);

    const visibleProducts = data.items.slice(startIndex, endIndex);
  
    const newItems = visibleProducts.filter(
      (item: any) => !newVisibleProducts.includes(item)
    );

    newVisibleProducts = [...newVisibleProducts, ...newItems];

    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${newItems
        ?.map((item: any) => `${item?.creative_name}-outer SBC`)
        .join("|")}`,
      creative_slot: `${newItems
        ?.map((item: any) => `${item?.creative_slot}-outer SBC`)
        .join("|")}`,
      items: newItems?.map((item: any) => ({
        promotion_id: `${data?.promotion_id}-inner SBC`,
        promotion_name: `${data?.promotion_name}-inner SBC`,
        creative_name: `${item?.creative_name}-inner SBC`,
        creative_slot: `${item?.creative_slot}-inner SBC`,
      })),
    };
    TriggerGaViewPromotion("view_promotion", datasLayer);
  };

  const handleArrowData = (index: number, eventName: string) => {
    triggerGAEvent(
      {
        component_id: data?.id,
        item_name: data?.items[0]?.Item_name,
        item_id: `${data?.__component}_${data?.position}_${index + 1}`,
        widget_type: widget_type,
        item_type: data?.items[0].Item_type,
        widget_title: data?.__component,
        widget_description: "na",
        content_type: data?.items[0].Item_name,
        widget_postion: data?.position,
        no_of_items: data?.items?.length,
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
    slidesToShow: isMobile ? 3.5 : 6,
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
        cssData={{ width: "36px", height: "36px", right: "-45px" }}
      />
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function UserBanner({
    promotion_id,
    promotion_name,
    creative_name,
    creative_slot,
    path,
    imageUrl,
    textColor,
    text,
    textHoverBG,
  }: ITEMS_LIST) {
  
    const handleRoute = () => {
      triggerGAEvent(
        {
          previous_screen_name: "na",
          visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
          user_id: getItem("customer_ref", "local") || "na",
          creative_name: `${creative_name}-outer SBC`,
          creative_slot: `${creative_slot}-outer SBC`,
          items: [
            {
              promotion_id: `${promotion_id}-inner SBC`,
              promotion_name: `${promotion_name}-inner SBC`,
              creative_name: `${creative_name}-inner SBC`,
              creative_slot: `${creative_slot}-inner SBC`,
            },
          ],
        },
        "select_promotion"
      );
      path && window.location.assign(path);
    };

    return (
      <Box
        px={1}
        onClick={() => handleRoute()}
      >
        {inView && imageUrl ? (
          <StyledBox textHoverBG={textHoverBG}>
            <Image
              src={ReplaceImage(imageUrl)}
              alt="shop by collection"
              layout="responsive"
              width={100}
              height={100}
              quality={75}
              style={{
                margin: "auto",
                width: "100%",
                height: "100%",
              }}
              priority={isMobile}
            />
            <StyledText>
              <ItemTitle isMobile={isMobile} color={textColor}>
                {text}
              </ItemTitle>
            </StyledText>
          </StyledBox>
        ) : (
          null
        )}
      </Box>
    );
  }

  return (
    <Box
      ref={viewEventWrapper}
      width={"100%"}
      p={isMobile ? "0 0 0 16px" : `${data?.bgPadding}`}
      sx={{
        paddingTop: isMobile ? "12px" : "20px",
        paddingBottom: isMobile ? "12px" : "20px",
      }}
      bgcolor={data?.bgColor}
    >
      {(data?.title || data?.viewMore) && (
        <Box display={"flex"} textAlign={"end"}>
          {data?.title && (
            <Box
              whiteSpace="nowrap"
              flexBasis={isMobile ? "0% !important" : "56%"}
              textAlign={isMobile ? "start" : "end"}
              p={isMobile ? "10px 8px" : "16px 0px"}
              sx={{
                paddingTop: isMobile ? "2px" : "4px",
                paddingBottom: isMobile ? "14px" : "24px",
              }}
            >
              <Title interface={{ title: data?.title, styleEnd: true }} />
            </Box>
          )}
          <StyledViewMore
            component={"div"}
            onClick={() => {
              isMobile
                ? window.location.assign(data?.viewMoreLink)
                : window.open(data?.viewMoreLink);
            }}
          >
            {data?.viewMore}
          </StyledViewMore>
        </Box>
      )}

      <Box mx={isMobile ? 0 : -1} ref={ref}>
        {inView ? (
          <Carousel
            promotion_name={data?.promotion_name}
            promotion_id={data?.promotion_id}
            Component={UserBanner}
            items={data?.items}
            settings={userSettings}
            callBack={undefined}
            isVertical={undefined}
            trackGAEvent={trackGAEvent}
          />
        ) : <ItemSkeleton/>}
      </Box>
    </Box>
  );
}

export default React.memo(ShopByCollection);