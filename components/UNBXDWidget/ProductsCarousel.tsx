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
import { Dialog, Grid } from "@mui/material";
import { CommonCarouselStyles } from "../../HOC/Carousel/styles";
import Slider from "react-slick";
import { Cookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { loaderStateHandler } from "../../recoilstore";

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
  isUnbxd,
  pageType,
  widgetId,
  requestId,
  mobileDisplayItems,
  searchVisible,
  isSearch = false,
  isSearchPopup = false,
}: any) {
  const isMobile = useMobileCheck();
  const [displayLoader, setLoader] = useState(false);
  const [tost, setTost] = useState(false);
  const [tostMessage, setTostMessge] = useState("");
  const [prevArrow, setPrevArrow] = useState(false);
  const viewEventWrapper = useRef();

  const [_, setIsLoaderEnable] = useRecoilState(loaderStateHandler);

  const [nextArrow, setNextArrow] = useState(
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
    cookie.get("accessToken") && fetchWishListProducts();
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
    // setCurrentIndex(sliderIndex);
  };

  const userSettings = {
    arrows: true,
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
          arrows: true,
          slidesToShow: mobileDisplayItems || 1.5,
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

  return (
    <Box position={isSearchPopup ? "relative" : "initial"}>
      {/* {!displayLoader && (
        <Loader
          style={{
            position: "absolute",
          }}
        />
      )} */}
      {tost && (
        <Dialog
          sx={{ zIndex: "1301" }}
          open={tost}
          onClose={() => setTost(false)}>
          <CustomSnackBar
            snackBarOpen={tost}
            setSnackBarOpen={setTost}
            snackMessage={tostMessage}
          />
        </Dialog>
      )}
      <Grid
        sx={{
          paddingBottom: backgroundImage ? "18px" : searchVisible ? "50px" : 0,
          paddingTop: isMobile ? "11px" : "18px",
          width: "100%",
          "& .slick-track": {
            marginLeft: "0px !important",
          },
        }}>
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
                      paddingRight: index < products?.length ? "18px" : "0px",
                    }}>
                    <ProductCard
                      fetchWishListProducts={fetchWishListProducts}
                      details={{ ...item, items: products }}
                      showLoader={setIsLoaderEnable}
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
                      isUnbxd={isUnbxd}
                      pageType={pageType}
                      widgetId={widgetId}
                      requestId={requestId}></ProductCard>
                  </Box>
                );
              })}
            </Slider>
          </CommonCarouselStyles>
        </Box>
      </Grid>
    </Box>
  );
}

export default ProductsCarousel;
