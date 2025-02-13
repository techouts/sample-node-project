import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/system";
import ProductCard from "../../HOC/ProductCard/ProductCard";
import {
  CustomNextArrow,
  CustomPrevArrow,
} from "../ShopByCollection/CustomArrows";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import client from "../../apollo-client";
import { CUSTOMER_WISHLIST } from "../../graphQLQueries/WhishList/WishListQuery";
import { useMobileCheck } from "../../utility/isMobile";
import Loader from "../../HOC/Loader/Loader";
import {
  event_type,
  msd_behaviour,
  widget_type,
} from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import triggerGAEvent, {
  viewmsdItemArray,
} from "../../utility/GaEvents";
import { Grid } from "@mui/material";
import { CommonCarouselStyles } from "../../HOC/Carousel/styles";
import Slider from "react-slick";
import { Cookies } from "react-cookie";
import handleErrorResponse from "../../utility/ErrorHandling";
import { useInView } from "react-intersection-observer";
import triggerGaViewEvent from "../../utility/GaViewEvent";

function ProductsCarousel({
  products,
  staticProductSkus = [],
  msdResponse = {},
  isDynamic = false,
  id,
  position,
  referrerSku,
  referrerPrice,
  displayItems,
  backgroundImage,
  showArrow= true,
}: any) {
  const isMobile = useMobileCheck();
  const [displayLoader, setLoader] = useState(false);
  const [tost, setTost] = useState(false);
  const [tostMessage, setTostMessge] = useState("");
  const [prevArrow, setPrevArrow] = useState(false);
  const viewEventWrapper = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // State to store the previously visible products
  const [previousVisibleProducts, setPreviousVisibleProducts] = useState<any[]>([]);
  const [currentVisibleProducts,setCurrentVisibleProducts]=useState<any[]>([]);
  const [totalProducts,setTotalProducts]=useState<any[]>([]);
  const { ref, inView, entry } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    cookie.get("accessToken") &&  fetchWishListProducts();
  }, [products?.length]);

  const arrowsHandler = (sliderIndex: number) => {
    console.log("arrowsHandler",products);
    
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

    if (currentIndex < sliderIndex && totalProducts?.length < products?.length) {
    // Determine the new visible products
    const startIndex = sliderIndex;
    const endIndex = isMobile ? startIndex + 2 : startIndex + 4;
    const visibleProducts = products.slice(startIndex, endIndex);

    // Compare with previous visible products to identify newly added products
    const newVisibleProducts = visibleProducts.filter(
      (product: any) => !previousVisibleProducts.some(
        (prevProduct: any) => prevProduct.sku === product.sku
      )
    );

    // Trigger ViewEvent for newly added products
    if (newVisibleProducts?.length > 0) {
      const dataLayer = {
        item_id: "na",
        widget_type: widget_type,
        item_name: "na",
        item_type: "na",
        widget_title: "na",
        widget_description: "na",
        widget_postion: position,
        widget_powered_by: isDynamic ? "MSD" : "CMS",
        no_of_items: newVisibleProducts?.length,
        item_brand: "na",
        item_category: "na",
        item_category2: "na",
        item_category3: "na",
        index: position,
        msd_module_id: msdResponse?.products?.module_id,
        msd_module_name: msdResponse?.products?.module_name,
        msd_module_bhaviour: msd_behaviour,
        msd_strategy_id: msdResponse?.tiles?.[0]?.id,
        event_type: event_type,
        view_items: viewmsdItemArray(newVisibleProducts),
      };
      triggerGaViewEvent("view_item_list", dataLayer)  
    }
  }
  };

  console.log("previousVisibleProducts",previousVisibleProducts);
  console.log("currentVisibleProducts",currentVisibleProducts);
  console.log("totalProducts",products);
  
  const handleArrowData = (index: number, eventName: string) => {
    isDynamic
      ? triggerGAEvent(
          {
            item_name: msdResponse?.products?.items?.[0]?.typeName,
            widget_type: widget_type,
            item_type: "products",
            widget_title: "RECENTLY VIEWED",
            widget_description: "na",
            content_type: msdResponse?.products?._typeName,
            widget_postion: index + 1,
            no_of_items: products?.length,
            index: index + 1,
            item_brand: msdResponse?.products?.items?.[0]?.brand_info || "na",
            item_id: msdResponse?.products?.items?.[0]?.sku,
            price:
              msdResponse?.products?.items?.[0]?.price_range?.minimum_price
                ?.regular_price?.value || 0,
            msd_module_id: msdResponse?.products?.module_id,
            msd_module_name: msdResponse?.products?.module_name,
            msd_module_bhaviour: msd_behaviour,
            msd_strategy_id: msdResponse?.products?.tiles,
            widget_powered_by: isDynamic ? "MSD" : "CMS",
            component_id: id,
          },
          eventName
        )
      : triggerGAEvent(
          {
            item_name: "na",
            widget_type: widget_type,
            item_type: "products",
            widget_title: "RECENTLY VIEWED",
            widget_description: "na",
            content_type: "na",
            widget_postion: index + 1,
            no_of_items: products?.length,
            index: index + 1,
            item_brand: "na",
            item_id: "na",
          },
          eventName
        );
  };
  const userSettings = {
    arrows: showArrow,
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: displayItems > 4 ? 4 : displayItems,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: (
      <CustomPrevArrow
        isPrev={prevArrow}
        cssData={{ width: "36px", height: "36px", left: "-45px" }}
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
          arrows: showArrow,
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

  const [wishListItems, setWishListItems] = useState([]);
  const cookie = new Cookies();
  const fetchWishListProducts = () => {
    client
      .query({
        query: CUSTOMER_WISHLIST,
        fetchPolicy: "no-cache",
        variables: {
          currentPage: 1,
          pageSize: 100,
        },
      })
      .then((res) => {
        setWishListItems(res?.data?.customer?.wishlists[0]?.items_v2?.items);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  };

  useEffect(() => {
  if (entry?.isIntersecting) {
    const startIndex = currentIndex;
    const endIndex = isMobile ? startIndex + 2 : startIndex + 4;
    const visibleProducts = products.slice(startIndex, endIndex);
    console.log("visibleProducts",visibleProducts);
    setCurrentVisibleProducts(visibleProducts)
    setPreviousVisibleProducts(visibleProducts)
    updateTotalProducts(visibleProducts);
  }
},[entry,currentIndex,products])


const updateTotalProducts = (visibleProducts: any[]) => {
  setTotalProducts((prevTotalProducts: any[]) => {
    const newProducts = visibleProducts.filter(
      (product: any) => !prevTotalProducts.some((p) => p.sku === product.sku)
    );
    return [...prevTotalProducts, ...newProducts];
  });
};

console.log("TotalProducts",totalProducts);

  const dataLayer = {
    item_id: "na",
    widget_type: widget_type,
    item_name: "na",
    item_type: "na",
    widget_title: "similar Products",
    widget_description: "na",
    widget_postion: position,
    widget_powered_by: isDynamic ? "MSD" : "CMS",
    no_of_items: currentVisibleProducts?.length,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    index: position,
    msd_module_id: msdResponse?.products?.module_id,
    msd_module_name: msdResponse?.products?.module_name,
    msd_module_bhaviour: msd_behaviour,
    msd_strategy_id: msdResponse?.tiles?.[0]?.id,
    event_type: event_type,
    view_items: viewmsdItemArray(currentVisibleProducts),
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
      <Grid
        sx={{
          paddingBottom: backgroundImage ? "18px" : 0,
          paddingTop: isMobile ? "11px" : "18px",
          width: "100%",
          "& .slick-track": {
            marginLeft: "0px !important",
          },
        }}
      >
        <Box ref={viewEventWrapper}>
          <CommonCarouselStyles>
            <Slider {...userSettings}>
              {products?.map((item: any, index: any) => {
                const moduleData = {
                  msd_module_id: msdResponse?.products?.module_id,
                  msd_module_name: msdResponse?.products?.module_name,
                  msd_strategy_id: msdResponse?.tiles?.[index]?.id,
                };
                return (
                  <Box
                    sx={{
                      paddingRight:
                        index < products?.length ? "18px" : "0px",
                    }}
                  >
                    <ProductCard
                      fetchWishListProducts={fetchWishListProducts}
                      details={{...item, items: products}}
                      showLoader={setLoader}
                      setSnackBarOpen={setTost}
                      setSnackMessage={setTostMessge}
                      wishListItems={wishListItems}
                      isFromCart={true}
                      isfromWhishList={
                        item?.__typename === "ConfigurableWishlistItem" ||
                        item?.__typename === "SimpleWishlistItem"
                      }
                      wishListItemId={
                        (item?.__typename === "ConfigurableWishlistItem" ||
                          item?.__typename === "SimpleWishlistItem") &&
                        item?.id
                      }
                      referrerSku={referrerSku}
                      variantSku={
                        staticProductSkus && staticProductSkus?.length > 0
                          ? staticProductSkus?.filter(
                              (productsData: any) =>
                                productsData?.parent_sku === item?.sku
                            )?.[0]?.sku
                          : ""
                      }
                      isMSD={isDynamic}
                      referrerPrice={referrerPrice}
                      moduleData={moduleData}
                      gakey={index}
                    ></ProductCard>
                  </Box>
                );
              })}
            </Slider>
          </CommonCarouselStyles>
        </Box>
      </Grid>
    </>
  );
}

export default ProductsCarousel;
