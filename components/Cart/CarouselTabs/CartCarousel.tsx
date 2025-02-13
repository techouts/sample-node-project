import React, { useEffect, useState ,useRef} from "react";
import ProductCard from "../../../HOC/ProductCard/ProductCard";
import { Box } from "@mui/system";
import Carousel from "../../../HOC/Carousel/Carousel2";
import { CustomSnackBar } from "../../../HOC/CustomSnackBar/CustomSnackBar";
import Loader from "../../../HOC/Loader/Loader";
import {
  CustomNextArrow,
  CustomPrevArrow,
} from "../../ShopByCollection/CustomArrows";
import { useMobileCheck } from "../../../utility/isMobile";
import triggerGAEvent, { viewitemCartArray } from "../../../utility/GaEvents";
import { event_type, widget_type } from "../../../utility/GAConstants";
import ViewEvent from "../../../utility/viewEvent";

function CartCarousel({ products, updateCartSuggestions }: any) {
  const isMobile = useMobileCheck();
  const [displayLoader, setLoader] = useState(false);
  const [tost, setTost] = useState(false);
  const [tostMessage, setTostMessge] = useState("");
  const [prevArrow, setPrevArrow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewEventWrapper = useRef();
  const [nextArrow, setNextArrow] = useState(
    // @ts-ignore:next-line
    isMobile
      ? products?.length < 1
        ? false
        : true
      : products?.length <= 4
        ? false
        : true
  );
  useEffect(() => {
    setNextArrow(
      isMobile
        ? products?.length < 1
          ? false
          : true
        : products?.length <= 4
          ? false
          : true
    );
  }, [products?.length]);

  const arrowsHandler = (sliderIndex: number) => {
    if (sliderIndex === 0) {
      setPrevArrow(false);
      setNextArrow(true);
    } else if (
      isMobile
        ? sliderIndex === products?.length - 1.5
        : sliderIndex === products?.length - 4
    ) {
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
        component_id:"na",
        item_name:"na",
        item_id:"na",
        widget_type: widget_type,
        item_type:"na",
        widget_title:"na",
        widget_description: "na",
        content_type: "product",
        widget_postion:index+1,
        no_of_items:products?.length,
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
    slidesToShow: 4,
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
    afterChange: (sliderIndex: number) => arrowsHandler(sliderIndex),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 1.5,
          slidesToScroll: 1,
          prevArrow: (
            <CustomPrevArrow
              isPrev={prevArrow}
              cssData={{ width: "36px", height: "36px", left: "-12px" }}
            />
          ),
          nextArrow: (
            <CustomNextArrow
              isNext={nextArrow}
              cssData={{ width: "36px", height: "36px", right: "-12px" }}
            />
          ),
        },
      },
    ],
  };

  const dataLayer = {
    widget_type: widget_type,
    widget_title: "Add From Wishlist",
    widget_description: "na",
    widget_postion: 1,
    no_of_items: products?.length,
    component_id:"na",
    content_type:"product",
    event_type: event_type,
    item_type:"product",
    index:1,
    view_items: viewitemCartArray(products),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view_item_list");

  return (
    <>
      {displayLoader && <Loader />}
      <CustomSnackBar
        snackBarOpen={tost}
        setSnackBarOpen={setTost}
        snackMessage={tostMessage}
      />

      <Box   ref={viewEventWrapper}
        sx={{
          paddingTop: isMobile ? "11px" : "18px",
          width: "100%",
          "& .slick-track": {
            marginLeft: "0px !important",
          },
        }}
      >
        <Carousel
          Component={UserBanner}
          items={products}
          settings={userSettings}
          callBack={undefined}
          isVertical={undefined}
          updateCartSuggestions={updateCartSuggestions}
        />
      </Box>
    </>
  );
  function UserBanner(item: any, key: number) {
    return (
      <Box  
        sx={{
          paddingRight: item?.dataSet < item?.itemsLength ? "18px" : "0px",
        }}
      >
        <ProductCard
          updateCartSuggestions={updateCartSuggestions}
          details={item?.product}
          showBuyNow={false}
          showLoader={setLoader}
          setSnackBarOpen={setTost}
          setSnackMessage={setTostMessge}
          isFromCart={true}
          wishListItems={products}
          isfromWhishList={
            item?.__typename === "ConfigurableWishlistItem" ||
            item?.__typename === "SimpleWishlistItem"
          }
          wishListItemId={
            (item?.__typename === "ConfigurableWishlistItem" ||
              item?.__typename === "SimpleWishlistItem") &&
            item?.id
          }
        ></ProductCard>
      </Box>
    );
  }
}

export default CartCarousel;
