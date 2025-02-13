import React, { useEffect, useRef, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CategorySchema from "./CategoryShopSchema";
import {
  CustomPrevArrow,
  CustomNextArrow,
} from "../ShopByCollection/CustomArrows";
import { useMobileCheck } from "../../utility/isMobile";
import {
  CarouselTitle,
  PlusImageTag,
  ShopButton,
  TooltipTextStyleButton,
} from "./CategoryShopStyle";
import { widget_type, event_type } from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import CategoryShopTheLook from "../CategoryShopTheLooK/CategoryShopTheLook";
import router, { useRouter } from "next/router";
import Carousel from "../../HOC/Carousel/Carousel2";
import { viewArray } from "../../utility/ViewEvenItemArray";
import triggerGAEvent from "../../utility/GaEvents";
import {
  GET_SEARCHED_DATA,
  GET_SEARCHED_DATA_JSON,
} from "../../graphQLQueries/SearchListQuery";
import client from "../../apollo-client";
import AxiosInstance from "../../utility/AxiosInstance";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";
import { useInView } from "react-intersection-observer";

const CategoryShop = ({
  items,
  shopButtonPath,
  bgColor,
  bgPadding,
  titleForMobile,
  titleForWeb,
  shopButton,
  position,
  __component,
  promotion_id,
  promotion_name,
}: CategorySchema & { promotion_id: string; promotion_name: string }) => {
  const isMobile = useMobileCheck();
  const viewEventWrapper = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevArrow, setPrevArrow] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [SecondCarouselData, setSecondCarouselData] = useState<any>();
  const [nextArrow, setNextArrow] = useState(items?.length <= 2 ? false : true);

  const cookie = new Cookies();
  const { getItem } = useStorage();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const dataLayer = {
    item_id: "na",
    item_name: "na",
    item_type: "na",
    widget_type: widget_type,
    widget_title: __component || "na",
    widget_description: "na",
    widget_postion: position,
    no_of_items: items?.length,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    index: position,
    event_type: event_type,
    view_items: viewArray(items, `${__component}_${position}_`),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  const arrowsHandler = (sliderIndex: number) => {
    setSecondCarouselData([]);
    if (sliderIndex === 0) {
      setPrevArrow(false);
      setNextArrow(true);
    } else if (sliderIndex === items?.length - 2) {
      setPrevArrow(true);
      setNextArrow(true);
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
    setImageIndex(sliderIndex);
  };

  // handling for prev and next arrow functionalities in carousel
  const handleArrowData = (index: number, eventName: string) => {
    triggerGAEvent(
      {
        item_name: "na",
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
  const preArrowCSS = {
    width: "36px",
    height: "36px",
    left: "-5%",
  };
  const nextArrowCSS = {
    width: "36px",
    height: "36px",
  };
  const userSettings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: <CustomPrevArrow isPrev={prevArrow} cssData={preArrowCSS} />,
    nextArrow: <CustomNextArrow isNext={nextArrow} cssData={nextArrowCSS} />,
    afterChange: (sliderIndex: number) => {
      arrowsHandler(
        Math.round(sliderIndex * 2) / 2 === items.length
          ? 0
          : Math.round(sliderIndex * 2) / 2
      );
    },
    beforeChange: (sliderIndex: number) =>
      setImageIndex(
        Math.round(sliderIndex * 2) / 2 === items.length
          ? 0
          : Math.round(sliderIndex * 2) / 2
      ),
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const filtersConversionToString = (obj: any) => {
    let str = "";
    for (const [p, val] of Object.entries(obj)) {
      const valueLab: any = val;
      const valueKey: any =
        valueLab?.in?.length > 0
          ? valueLab?.in?.length > 1
            ? val
            : { eq: valueLab?.in?.[0] }
          : val;
      str += `${p}:\n`;
      for (const [key, value] of Object.entries(valueKey)) {
        const keyValue = JSON.stringify(value);
        str += `{${key}:${keyValue}}`;
      }
    }
    return `{${str}}`;
  };

  useEffect(() => {
    let data: any = items;
    let productSkusData: any = data?.[imageIndex]?.products?.items?.map(
      (item: any) => {
        return item["parent_sku"];
      }
    );
    if (productSkusData?.length > 0) {
      if (process.env.NEXT_PUBLIC_DISABLE_PRODUCTS_POST_CALL === "true") {
        AxiosInstance(
          GET_SEARCHED_DATA_JSON(
            encodeURIComponent(JSON.stringify("")),
            productSkusData?.length || 0,
            1,
            filtersConversionToString({ sku: { in: productSkusData } }),
            JSON.stringify({})
          ),
          false,
          false,
          process?.env?.NEXT_PUBLIC_PRODUCT_CAROUSEL_URL
        )
          .then((res) => {
            setSecondCarouselData(res?.data?.data?.products);
          })
          .catch((err) => console.log(err));
      } else {
        client
          .query({
            query: GET_SEARCHED_DATA,
            variables: {
              searchText: "",
              pageSize: productSkusData?.length,
              currentPage: 1,
              filters: { sku: { in: productSkusData } },
              sort: {},
              queryParamVal:
                "?widget=shopthelook&id=" +
                router?.query?.pid +
                "_" +
                imageIndex,
            },
          })
          .then((res) => {
            setSecondCarouselData(res?.data?.products);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [imageIndex]);

  const handleCheckout = () => {
    router.push(shopButtonPath);
  };
  const initialSlides = isMobile ? 1 : 2;
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
        ?.map((item: any) => `${item?.creative_name}-outer CS`)
        .join("|")}`,
      creative_slot: `${items
        ?.map((item: any) => `${item?.creative_slot}-outer CS`)
        .join("|")}`,
      items: newItems?.map((item: any) => ({
        promotion_id: `${promotion_id}-inner CS`,
        promotion_name: `${promotion_name}-inner CS`,
        creative_name: `${item?.creative_name}-inner CS`,
        creative_slot: `${item?.creative_slot}-inner CS`,
      })),
    };
    TriggerGaViewPromotion("view_promotion", datasLayer);
  };
  return (
    <>
      <Box ref={viewEventWrapper} bgcolor={bgColor} p={bgPadding}>
        <Grid
          container
          style={{
            alignItems: "center",
            paddingBottom: "35px",
          }}
          ref={ref}
        >
          {inView ? (
            <>
              <Grid item xs={3} sm={4} md={4} lg={3} xl={3}>
                {isMobile ? (
                  <CarouselTitle isMobile={isMobile}>
                    {titleForMobile}
                  </CarouselTitle>
                ) : (
                  <CarouselTitle isMobile={isMobile}>
                    {titleForWeb}
                  </CarouselTitle>
                )}
              </Grid>
              <Grid
                item
                xs={9}
                sm={8}
                md={8}
                lg={9}
                xl={9}
                sx={{ paddingLeft: isMobile ? "16px" : "46px" }}
              >
                <Carousel
                  Component={CarouselItemsFunction}
                  items={items}
                  settings={userSettings}
                  imageIndex={imageIndex}
                  setSecondCarouselData={setSecondCarouselData}
                  viewEventWrapper={viewEventWrapper}
                  trackGAEvent={trackGAEvent}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
        <CategoryShopTheLook {...SecondCarouselData} />
      </Box>
      {shopButton && (
        <Grid style={{ textAlign: "center" }}>
          <ShopButton variant="contained" onClick={handleCheckout}>
            {shopButton}
          </ShopButton>
        </Grid>
      )}
    </>
  );
};

export const CarouselItemsFunction = (item: any, index: number) => {
  const data = item?.products;
  const isMobile = useMobileCheck();

  const slide = {
    transition: "all 0.2s",
    transform: "scale(0.8)",
  };
  const activeSlide = {
    transform: "scale(1)",
  };
  const [indexedValue, setIndexedValue] = useState<any>();

  const handleTooltipClose = () => {
    setIndexedValue(undefined);
  };

  const handleTooltipOpen = (tooltipIndex: any) => {
    setIndexedValue(tooltipIndex);
  };

  return (
    <>
      <Box ref={item?.viewEventWrapper} position="relative">
        {item.number == item.imageIndex && (
          <>
            {item?.subItems?.map((position: any, subItemsindex: number) => {
              return (
                <>
                  <Tooltip
                    PopperProps={{
                      sx: {
                        "& .MuiTooltip-tooltip": {
                          backgroundColor: "#fff",
                          borderRadius: "0%",
                          color: "#333",
                          padding: "5px",
                        },
                        "& .MuiTooltip-arrow": {
                          color: "#fff",
                        },
                      },
                      disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    open={indexedValue === subItemsindex ? true : false}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    arrow
                    title={
                      <TooltipTextStyleButton
                        onClick={() => window.location.assign(position?.path)}
                      >
                        {position?.tooltipMsg}
                      </TooltipTextStyleButton>
                    }
                    placement={
                      isMobile
                        ? "bottom"
                        : position?.tooltipPlacement || "right"
                    }
                  >
                    <PlusImageTag
                      itemTop={
                        isMobile ? position?.mobileTopPosition : position?.top
                      }
                      itemLeft={
                        isMobile ? position?.mobileLeftPosition : position?.left
                      }
                    >
                      <img
                        onClick={() => handleTooltipOpen(subItemsindex)}
                        src={isMobile ? item?.circleImage : item?.plusImage}
                        alt="Plus Image"
                        width="100%"
                      />
                    </PlusImageTag>
                  </Tooltip>
                </>
              );
            })}
          </>
        )}
        <Grid>
          <div style={item?.number == item?.imageIndex ? activeSlide : slide}>
            <img
              src={isMobile ? item?.mobileImageUrl : item?.imageUrl}
              alt="Carousel Images"
              width="100%"
            />
          </div>
        </Grid>
      </Box>
    </>
  );
};

export default CategoryShop;
