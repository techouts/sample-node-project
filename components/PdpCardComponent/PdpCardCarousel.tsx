import React, { useEffect, useRef, useState } from "react";
import Carousel from "../../HOC/Carousel/Carousel2";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {
  CarouselCommoBox,
  FavIcon,
  CarouselLargImg,
  VerticalCarouselBox,
  LargeImgIconsMainBox,
  LikeShare,
  MobieShare,
  EditedBox,
  StyledBox,
  ZoomedBox,
  BestSellerButton,
  FeaturedButton,
} from "./pdcardstyle";

const CarouselMainBox = dynamic(
  () => import("./pdcardstyle").then((comp) => comp.CarouselMainBox),
  { ssr: false }
);

import { useMobileCheck } from "../../utility/isMobile";
import { toast } from "../../utility/Toast";
import {
  CustomPrevArrow,
  CustomNextArrow,
} from "../ShopByCollection/CustomArrows";
import PdpAdvantages from "./pdpAdvantages";
import { AddLikesMutation } from "../../graphQLQueries/ProductQuery";
import client from "../../apollo-client";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { PDPHeartIcon } from "../../HOC/ProductCard/ProductCardStyles";
import BasicModal from "../../HOC/Modal/ModalBlock";
import Loader from "../../HOC/Loader/Loader";
import { callWishlistEvent } from "../../utility/GaEvents";
import { PINCH_TO_ZOOM } from "./Constants";
import { PRODUCT_FALLBACK_URL } from "../../HOC/ProductCard/Constants";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  EMPTY_WISHLIST_COLOUR,
  SHARE_ICONS,
  WISHLIST_ADDED_ICON,
  ZOOM_ICON,
  EMPTY_STAR_ICON,
  TROPHY_ICONS,
  Error_Image,
} from "../../utility/AppIcons";
import { onImageError } from "../../utility/onImageError";
import { BEST_SELLER_LABEL, FEATURED_LABEL } from "../ProductLayout/constants";
import { transformItemName } from "../../utility/urlGenerator";
import dynamic from "next/dynamic";
import handleErrorResponse from "../../utility/ErrorHandling";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";

function PdpCardCarousel({
  component,
  productData,
  isWishlisted,
  removeFromWishList,
  addedToWishlist,
  productDetails,
  wishListedProductData,
}: any) {
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [liked, setLiked] = useState(false);
  const [showLoader, setLoader] = useState(false);
  const [likeCount, setLikeCount] = useState(
    parseInt(productData?.product_count || 0)
  );
  const valueArr = productDetails?.additional_images?.map(function (item: any) {
    return item.url || PRODUCT_FALLBACK_URL;
  });
  const errorImage = AppIcons(Error_Image);
  const isNonDuplicate = productDetails?.additional_images?.filter(function (
    item: any,
    idx: number
  ) {
    return valueArr.indexOf(item?.url) === idx;
  });

  let bindimages: any;

  if (isNonDuplicate?.length > 0) {
    if (productDetails?.image?.url !== "") {
      bindimages = [productDetails?.image, ...isNonDuplicate];
    } else {
      bindimages = isNonDuplicate;
    }
  } else {
    bindimages = [productDetails?.image];
  }

  const [selectImage, setSelectImage] = useState(bindimages[0]?.url);
  const [zoomSelectImage, setZoomSelectImage] = useState(bindimages[0]?.url);

  useEffect(() => {
    setSelectImage(bindimages[0]?.url);
    setZoomSelectImage(bindimages[0]?.url);
  }, [productDetails]);

  const isMobile = useMobileCheck();
  const [zoom, setZoom] = useState(false);
  const [prevArrow, setPrevArrow] = useState(false);
  const [nextArrow, setNextArrow] = useState(
    // @ts-ignore:next-line
    bindimages?.length <= 5 ? false : true
  );
  const [zoomprevArrow, setZoomPrevArrow] = useState(false);
  const [zoomnextArrow, setZoomNextArrow] = useState(
    // @ts-ignore:next-line
    bindimages?.length <= 5 ? false : true
  );
  useEffect(() => {
    setNextArrow(bindimages?.length <= 5 ? false : true);
    setZoomNextArrow(bindimages?.length <= 5 ? false : true);
  }, [bindimages?.length]);
  const arrowsHandler = (sliderIndex: number) => {
    if (sliderIndex === 0) {
      setPrevArrow(false);
      setNextArrow(true);
    } else if (sliderIndex === bindimages?.length - 5) {
      setPrevArrow(true);
      setNextArrow(false);
    } else {
      setNextArrow(true);
      setPrevArrow(true);
    }
  };
  const zoomArrowsHandler = (sliderIndex: number) => {
    if (sliderIndex === 0) {
      setZoomPrevArrow(false);
      setZoomNextArrow(true);
    } else if (sliderIndex === bindimages?.length - 5) {
      setZoomPrevArrow(true);
      setZoomNextArrow(false);
    } else {
      setZoomNextArrow(true);
      setZoomPrevArrow(true);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: isMobile ? 4.3 : 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    vertical: isMobile ? false : true,
    arrows: isMobile ? false : true,
    nextArrow: (
      <CustomNextArrow
        isNext={zoomnextArrow}
        cssData={{
          width: "36px",
          height: "36px",
          position: "relative",
          left: "16%",
          transform: "rotate(90deg)",
        }}
      />
    ),
    prevArrow: (
      <CustomPrevArrow
        isPrev={zoomprevArrow}
        cssData={{
          width: "36px",
          height: "36px",
          left: "16%",
          position: "relative",
          transform: "rotate(90deg)",
        }}
      />
    ),
    afterChange: (sliderIndex: number) => zoomArrowsHandler(sliderIndex),
  };
  const settings1 = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };
  const userSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    vertical: true,
    verticalSwiping: true,
    nextArrow: (
      <CustomNextArrow
        isNext={nextArrow}
        cssData={{
          width: "36px",
          height: "36px",
          position: "relative",
          left: "16%",
          transform: "rotate(90deg)",
        }}
      />
    ),
    prevArrow: (
      <CustomPrevArrow
        isPrev={prevArrow}
        cssData={{
          width: "36px",
          height: "36px",
          left: "16%",
          position: "relative",
          transform: "rotate(90deg)",
        }}
      />
    ),
    afterChange: (sliderIndex: number) => arrowsHandler(sliderIndex),
  };
  const handleAddLike = () => {
    setLoader(true);
    client
      .mutate({
        mutation: AddLikesMutation,
        variables: {
          sku: productData?.sku,
        },
      })
      .then((response: any) => {
        const hasError =   handleErrorResponse(response?.data?.addlikes?.status) //response checking
        if (hasError) return null;
        if (response?.data?.addlikes?.status === true) {
          setLiked(true);
          setLikeCount(likeCount + 1);
        }
      })
      .catch((error: any) => {
        toast.error("Someting went wrong, Please try again!!!");
        console.log(error)})
      .finally(() => setLoader(false));
  };
  const SharehandleOpen = () => {
    if (isMobile) {
      navigator
        .share({
          title: "Shoppers Stop Beauty",
          url: window?.location?.href,
        })
        .then(() => console.log("Successful share!"))
        .catch((err) => console.error(err));
    }
  };
  const handleClose = () => {
    setZoom(false);
  };

  const zoomimage = useRef(null as any);
  let imageElementScale = 1;

  const [start, setStart] = useState({
    distance: 0,
    x: 0,
    y: 0,
  });
  // Calculate distance between two fingers
  const distance = (event: any) => {
    return Math.hypot(
      event.touches[0].pageX - event.touches[1].pageX,
      event.touches[0].pageY - event.touches[1].pageY
    );
  };
  if (zoomimage) {
    zoomimage?.current?.addEventListener("touchstart", (event: any) => {
      if (event.touches.length === 2) {
        event.preventDefault(); // Prevent page scroll
        // Calculate where the fingers have started on the X and Y axis
        setStart({
          ...start,
          x: (event.touches[0].pageX + event.touches[1].pageX) / 2,
          y: (event.touches[0].pageY + event.touches[1].pageY) / 2,
          distance: distance(event),
        });
      }
    });
    zoomimage?.current?.addEventListener("touchmove", (event: any) => {
      if (event.touches.length === 2) {
        event.preventDefault(); // Prevent page scroll
        let scale;
        // Safari provides event.scale as two fingers move on the screen
        // For other browsers just calculate the scale manually
        if (event.scale) {
          scale = event.scale;
        } else {
          const deltaDistance = distance(event);
          scale = deltaDistance / start?.distance;
        }

        imageElementScale = Math.min(Math.max(1, scale), 4);
        // Calculate how much the fingers have moved on the X and Y axis
        const deltaX =
          ((event.touches[0].pageX + event.touches[1].pageX) / 2 - start?.x) *
          2; // x2 for accelarated movement
        const deltaY =
          ((event.touches[0].pageY + event.touches[1].pageY) / 2 - start?.y) *
          2; // x2 for accelarated movement
        // Transform the image to make it grow and move with fingers
        const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
        zoomimage.current.style.transform = transform;
        zoomimage.current.style.WebkitTransform = transform;
        zoomimage.current.style.zIndex = "9999";
      }
    });

    zoomimage?.current?.addEventListener("touchend", (event: any) => {
      // Reset image to it's original format
      zoomimage.current.style.transform = "";
      zoomimage.current.style.WebkitTransform = "";
      zoomimage.current.style.zIndex = "";
    });
  }
  const Wishlist_Empty_Colour = AppIcons(EMPTY_WISHLIST_COLOUR);
  const ZoomIconUrl = AppIcons(ZOOM_ICON);
  const Share_Icon = AppIcons(SHARE_ICONS);
  const Wishlist_filled_heart = AppIcons(WISHLIST_ADDED_ICON);
  const EmptyStarIcon = AppIcons(EMPTY_STAR_ICON);
  const TrophyIcon = AppIcons(TROPHY_ICONS);

  const productName = transformItemName(productData?.name);

  const getProductLink = () => {
    let paramsData = [];
    if (productData?.type_id !== "simple") {
      productDetails?.product?.color != null &&
        productDetails?.product?.color != "" &&
        paramsData.push(`colorCode=${productDetails?.product?.color}`);
      productDetails?.product?.size != null &&
        productDetails?.product?.size != "" &&
        paramsData.push(`size=${productDetails?.product?.size}`);
    }
    return productData?.type_id === "simple"
      ? `/${productName}/p/${productData?.sku}`
      : `/${productName}/p/${productData?.sku}?${paramsData
          ?.toString()
          ?.replace(/,/g, "&")}`;
  };

  return (
    <CarouselMainBox sx={{ padding: "0px" }}>
      {showLoader && <Loader />}
      <CarouselCommoBox>
        {/* For vertical carousel in desktop */}
        {!isMobile && (
          <VerticalCarouselBox>
            <Carousel
              Component={UserBanner}
              items={bindimages}
              settings={userSettings}
              isVertical={true}
              callBack={setSelectImage}></Carousel>
          </VerticalCarouselBox>
        )}
        {zoom && (
          <BasicModal
            Component={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column-reverse" : "row",
                  gap: isMobile ? "35px" : "10px",
                  padding: isMobile ? "20% 0px" : "5%",
                }}
                className={`${"slots.product-details"}`}
                id={`${1}`}>
                {/* For carousel in desktop/mobile in zoom modal */}
                <EditedBox isMobile={isMobile}>
                  <Carousel
                    Component={UserBanner}
                    items={bindimages}
                    settings={settings}
                    isVertical={isMobile ? false : true}
                    callBack={setZoomSelectImage}
                    toggle={zoom}></Carousel>
                </EditedBox>
                <ZoomedBox isMobile={isMobile}>
                  <img
                    style={{
                      width: "100%",
                    }}
                    src={zoomSelectImage}
                    alt="main-zoomed"
                    ref={zoomimage}
                  />
                  {isMobile && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "5px",
                      }}>
                      <img
                        src={`${ReplaceImage(ZoomIconUrl?.url)}`}
                        width={"14px"}
                        alt={"pinch-icon"}
                      />
                      <Typography
                        sx={{
                          fontSize: " 12px",
                          color: "#A7A5A6",
                          marginRight: "20px",
                        }}>
                        {PINCH_TO_ZOOM}
                      </Typography>
                    </Box>
                  )}
                </ZoomedBox>
              </Box>
            }
            height={isMobile ? "100%" : "90%"}
            width={isMobile ? "100%" : "72%"}
            top="50%"
            left="50%"
            handleClose={handleClose}
            open={true}></BasicModal>
        )}
        <CarouselLargImg>
          <LargeImgIconsMainBox>
            <LikeShare>
              {isMobile && (
                <>
                  <MobieShare>
                    <img
                      src={`${ReplaceImage(Share_Icon?.url)}`}
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                      alt="ShareIcon"
                      onClick={SharehandleOpen}
                    />
                  </MobieShare>
                </>
              )}
            </LikeShare>
            {productData?.is_best_seller_checkbox === 1 && (
              <BestSellerButton>
                <img
                  src={`${ReplaceImage(TrophyIcon?.url)}`}
                  alt="Trophy Icon"
                  style={{ marginRight: "4px", height: "13px" }}
                />
                {BEST_SELLER_LABEL}
              </BestSellerButton>
            )}
            {productData?.is_featured_checkbox === 1 && (
              <FeaturedButton>
                <img
                  src={`${ReplaceImage(EmptyStarIcon?.url)}`}
                  alt="Star Icon"
                  style={{ marginRight: "4px", height: "13px" }}
                />
                {FEATURED_LABEL}
              </FeaturedButton>
            )}
            {!userDataItems.storeMode && (
              <FavIcon>
                {isWishlisted ? (
                  <PDPHeartIcon
                    $isEmptyHeart={false}
                    src={`${ReplaceImage(Wishlist_filled_heart?.url)}`}
                    alt="remove-icon"
                    onClick={() => {
                      removeFromWishList();
                    }}
                  />
                ) : (
                  <PDPHeartIcon
                    $isEmptyHeart={true}
                    src={`${ReplaceImage(Wishlist_Empty_Colour?.url)}`}
                    alt="heart-empty"
                    onClick={() => {
                      addedToWishlist(
                        productData?.__typename,
                        productDetails?.sku,
                        productData?.sku
                      );
                    }}
                  />
                )}
              </FavIcon>
            )}

            {!isMobile && !userDataItems?.storeMode && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: "25px",
                  transform: "translateX(-50%)",
                  color: "#B22557",
                  borderRadius: 4,
                  fontWeight: 600,
                  cursor: "pointer",
                  zIndex: 10,
                  fontSize: "10px",
                  padding: "4px 10px",
                  whiteSpace: "nowrap",
                  marginLeft: "65px",
                  backgroundColor: "#fff",
                  border: "1px solid #B22557",
                }}
                onClick={() => {
                  const carouselElement =
                    global?.window?.document?.getElementById(
                      "products-carousel-similar"
                    );
                  if (carouselElement) {
                    carouselElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}>
                View Similar
              </Box>
            )}
            {isMobile ? (
              <StyledBox sx={{ position: "relative" }}>
                <Carousel
                  Component={UserBanner}
                  items={bindimages}
                  settings={settings1}
                  isVertical={false}
                  callBack={() => setZoom(true)}></Carousel>
                {!userDataItems?.storeMode && (
                  <Box
                    onClick={() => {
                      const carouselElement =
                        global?.window?.document?.getElementById(
                          "products-carousel-similar"
                        );
                      if (carouselElement) {
                        carouselElement.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    sx={{
                      fontSize: "12px",
                      color: "gray",
                      borderRadius: 4,
                      border: "1px solid gray",
                      padding: "2px 12px",
                      whiteSpace: "nowrap",
                      fontWeight: 600,
                      position: "absolute",
                      bottom: "5%",
                      marginLeft: "11px",
                    }}>
                    View Similar
                  </Box>
                )}
              </StyledBox>
            ) : (
              <>
                <img
                  style={{
                    cursor: "pointer",
                    maxHeight: "500px",
                    minHeight: "500px",
                    objectFit: "contain",
                  }}
                  src={selectImage || PRODUCT_FALLBACK_URL}
                  onError={(e: any) => onImageError(e, errorImage)}
                  width="100%"
                  alt="main-prod-image"
                  onClick={() => setZoom(true)}
                />
              </>
            )}
          </LargeImgIconsMainBox>
          <Box style={{ display: "block" }}>
            {!isMobile && (
              <PdpAdvantages component={component} productData={productData} />
            )}
          </Box>
        </CarouselLargImg>
      </CarouselCommoBox>
    </CarouselMainBox>
  );
}
const UserBanner = ({
  url,
  index,
  callBack,
  setActiveIndex,
  activeIndex,
  dataSet,
  toggle,
}: {
  url: string;
  index: number;
  callBack?: any;
  setActiveIndex: Function;
  activeIndex: number;
  dataSet: number;
  toggle: boolean;
}) => {
  const { query } = useRouter();
  const isMobile = useMobileCheck();
  const errorImage = AppIcons(Error_Image);
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function activeIndexBorderFunction() {
    if (
      (activeIndex == dataSet && isMobile && toggle) ||
      (activeIndex == dataSet && !isMobile)
    ) {
      return "1px solid #AD184C";
    } else {
      return "none";
    }
  }

  return (
    <>
      <Box
        sx={{
          display: toggle ? "block" : "grid",
          marginRight: isMobile && toggle ? "8px" : "0px",
        }}>
        <Stack
          onClick={() => [callBack(url), setActiveIndex(dataSet)]}
          sx={{
            alignItems: "center",
            padding: isMobile ? "0px 0px 0px auto" : "8px 0px 8px auto",
            width: isMobile ? "100%" : "70px",
          }}>
          <img
            width="100%"
            style={{
              cursor: "pointer",
              backgroundColor: "#F7F6F9",
              maxHeight: isMobile ? "100%" : "70px",
              minHeight: isMobile ? "100%" : "70px",
              border: activeIndexBorderFunction(),
            }}
            src={url || PRODUCT_FALLBACK_URL}
            onError={(e: any) => onImageError(e, errorImage)}
            alt="Images"
            key={index}
          />
        </Stack>
      </Box>
    </>
  );
};
export default PdpCardCarousel;
