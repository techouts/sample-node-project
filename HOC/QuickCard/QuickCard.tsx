import Box from "@mui/material/Box";
import { createTheme } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import { ThemeProvider, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { pinCodeBasedCoordinates } from "../../utility/GeoAPI";
import productServiceability from "../../utility/productServiceability";
import Loader from "../../HOC/Loader/Loader";
import {
  Amount,
  BottomButtons,
  CardImage,
  CloseButton,
  DescriptionGrid,
  DiscountIcon,
  HeartIcon,
  ItemCarousel,
  ListS,
  PDPTitle,
  PriceTag,
  ProductDetails,
  Review,
  ReviewQA,
  RegularPrice,
  DiscountPercentage,
  ColorPalette,
  SizeList,
  SizeMenu,
  OfferIcon,
  StyledButton,
  StyledText,
  StyledGrouped,
  CrossBox,
  Line1,
  Line2,
  StyledSelect,
  SelectBox,
  ArrowIcon,
  ColorsText,
  SlashText,
  ButtonStyledExchange,
  ExchangeTypography,
  ColorPaletteWrapperBox,
  DecrementButton,
  IncrementButton,
} from "./QuickCardStyles";
import Carousel from "../Carousel/Carousel2";
import {
  CustomNextArrow,
  CustomPrevArrow,
} from "../../components/ShopByCollection/CustomArrows";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { useMobileCheck } from "../../utility/isMobile";
import {
  addTocartCTA,
  ask_question,
  buyNowCTA,
  VIEW_DETAILS,
} from "../../components/ProductLayout/constants";
import {
  HEART_FILLED_ICON_URL,
  HEART_EMPTY_ICON_URL,
  DISCOUNT_IMAGE,
  PRODUCT_FALLBACK_URL,
  // ARROWDOWN,
} from "../ProductCard/Constants";
import { useRouter } from "next/router";
import {
  ANSWERED_QUESTIONS,
  OFFERS_AVAILABLE,
  REVIEWS_TEXT,
  SHADES_AVAILABLE,
  WRITE_REVIEW,
} from "./Constants";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import { AppIcons } from "../../utility/AppIconsConstant";
import { toast } from "../../utility/Toast";
import {
  DISCOUNTS_ICON,
  DOWN_ARROW_ICON,
  EMPTY_WISHLIST_COLOUR,
  Error_Image,
  WISHLIST_ADDED_ICON,
} from "../../utility/AppIcons";
import { onImageError } from "../../utility/onImageError";
import { transformItemName } from "../../utility/urlGenerator";
import { fetchCartDetails } from "../../api/Cart/CustomerCart";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import { useAppContext } from "../../context/userInfoContext";
import { UPDATE_ITEM_FROM_CART } from "../../graphQLQueries/UpdateProduct";
import client from "../../apollo-client";
import { CustomSnackBar } from "../CustomSnackBar/CustomSnackBar";
import {
  DecrementMobileButton,
  IncrementMobileButton,
} from "../../components/PdpCardComponent/pdcardstyle";
import handleErrorResponse from "../../utility/ErrorHandling";
import { IS_UNBXD_ENABLED } from "../../utility/APIConstants";
import { fetchExploreStoreModeServiceability } from "../../graphQLQueries/checkStoreAvailabilityForHLD";
import axios from "axios";
function QuickCard({
  details,
  setOpen,
  QuantityCount = 5,
  handleAddToCart,
  removeFromWishList,
  isWishlisted,
  handleWishList,
  productBuyNow,
  productID,
  handleRemoveWishlist,
  isfromWhishList,
  exchange = false,
  handleSelectForExchangeClick = () => {},
  setIsHovering,
  variantProps,
  updatedCartDetails,
  isUnbxd,
  setSignInOpen,
  ...props
}: any) {
  const cookie = new Cookies();
  const { getItem } = useStorage();
  const router = useRouter();

  const userInfoContext = useAppContext();
  const { updateContextData } = userInfoContext;
  const handleClose = () => {
    details?.stock_status === "IN_STOCK" &&
      setIsHovering &&
      setIsHovering(false);
    setOpen(false);
  };
  const [variantDetails, setVariantDetails] = useState(variantProps);
  const [initialRender, setInitialRender] = useState(0);
  const isMobile = useMobileCheck();
  const colorList: any[] = [];
  const sizeList: any[] = [];
  const [cartDetails, setCartDetails] = useState();
  const [apiQuantityProduct, setApiQuantityProduct] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0); // Specify the type as number
  const [productUid, setProductUid] = useState();
  const [showLoader, setLoader] = useState(false);
  const [pincode, setPincode] = useState<any>(getItem("pincode", "local"));
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [storeProductData, setStoreProductData] = useState<any>(null);

  let updatedQuantity: number;

  const [selectedColor, setSelectedColor] = useState({
    value_index: variantProps?.color,
  });
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [filteredColors, setFilteredColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState({
    value_index: variantProps?.size,
  });
  details?.configurable_options?.map((variant: any, index: Number) => {
    if (variant?.label?.toLowerCase() === "color") {
      variant?.values.map((colorPallete: any) => {
        colorList.push(colorPallete);
      });
    } else if (variant?.label?.toLowerCase() === "size") {
      variant?.values.map((sizePallete: any) => {
        sizeList.push(sizePallete);
      });
    }
  });
  const DISCOUNT_ICON = AppIcons(DISCOUNTS_ICON);
  const FILLED_HEART_ICON = AppIcons(WISHLIST_ADDED_ICON);
  const ARROWDOWN = AppIcons(DOWN_ARROW_ICON);
  const errorImage = AppIcons(Error_Image);
  const productImages =
    variantDetails?.additional_images?.length > 0
      ? variantDetails?.image?.url !== ""
        ? [variantDetails?.image, ...variantDetails?.additional_images]
        : variantDetails?.additional_images
      : [variantDetails?.image];
  const [productQuantity, setProductQuantity] = useState(1);
  const [imageSelected, setImageSelected] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [prevArrow, setPrevArrow] = useState(false);
  const [nextArrow, setNextArrow] = useState(
    // @ts-ignore:next-line
    props?.additional_images?.length === 6 ? false : true
  );
  const arrowsHandler = (sliderIndex: number) => {
    if (sliderIndex === 0) {
      setPrevArrow(false);
    } else if (sliderIndex === props?.additional_images?.length - 6) {
      setNextArrow(false);
    } else {
      setNextArrow(true);
      setPrevArrow(true);
    }
  };

  const fetchColors = (colorObj: any) => {
    if (!checkOutOfStock(colorObj?.value_index)) {
      setSelectedColor(colorObj);
    }
  };
  const fetchSizes = (sizeObj: any) => {
    setSelectedSize(sizeObj);
    setFilteredColors(
      details?.variants?.filter(
        (variant: any) => variant?.product?.size === sizeObj?.value_index
      )
    );
  };

  useEffect(() => {
    if (initialRender > 1) {
      details?.type_id !== "simple" &&
        details?.variants?.length > 0 &&
        setVariantDetails(
          details?.variants?.filter(
            (variant: any) =>
              variant?.product?.color == selectedColor?.value_index &&
              variant?.product?.size == selectedSize?.value_index
          )?.[0]?.product
        );
    }
    setInitialRender((prev) => prev + 1);
  }, [selectedColor, selectedSize]);

  useEffect(() => {
    fetchSizes({ value_index: variantProps?.size });
    fetchCartData();
  }, []);

  useEffect(() => {
    type ProductDetails = {
      sku: string;
      name: string;
    };

    function findProductQuantityInCart(
      productDetails: ProductDetails,
      cartDetails: any,
      updatedCartDetails: any
    ) {
      const productSku = variantDetails?.sku;
      // Check if the product is in the cart
      let cartItem;
      if (updatedCartDetails == undefined && cartDetails !== undefined) {
        cartItem = updatedCartDetails?.data?.cart?.items?.find((item: any) => {
          console.log(
            "updatedCartDetails",
            item?.configured_variant?.sku,
            productSku
          );

          return item?.configured_variant?.sku === productSku;
        });
      } else if (updatedCartDetails !== undefined) {
        cartItem = cartDetails?.data?.cart?.items?.find((item: any) => {
          console.log("cartDetails", item?.configured_variant?.sku, productSku);
          return item?.configured_variant?.sku === productSku;
        });
      }
      console.log("updatedCartDetails cartItem", cartItem);
      if (cartItem) {
        setApiQuantityProduct(cartItem?.quantity);
        setQuantity(cartItem?.quantity);
        setProductUid(cartItem?.uid);
      } else {
        setApiQuantityProduct(0);
        setQuantity(0);
        console.log(
          `Product "${productDetails?.name}" with SKU "${productSku}" is not present in the cart.`
        );
      }
    }

    // Call the function with the productDetails and cartDetails
    findProductQuantityInCart(variantDetails, cartDetails, updatedCartDetails);
  }, [cartDetails, updatedCartDetails, selectedColor, variantDetails, details]);

  const fetchCartData = async () => {
    const cartID = getItem("BuyNowCartID", "local")
      ? getItem("BuyNowCartID", "local")
      : getItem("cartID", "local");
    try {
      if (cartID) {
        const cartData: any = await fetchCartDetails(cartID);
        setCartDetails(cartData);
      }
    } catch (error) {
      console.error(
        "Error fetching cart details ---> ../PdpCardContent.tsx",
        error
      );
    }
  };

  useEffect(() => {
    // In Modal  add to card on Success it will execute.
    try {
      if (
        updatedCartDetails !== null &&
        updatedCartDetails !== undefined &&
        apiQuantityProduct === 0
      ) {
        let cartItem;
        if (updatedCartDetails !== undefined) {
          cartItem = updatedCartDetails?.data?.cart?.items?.find(
            (item: any) => {
              return item?.configured_variant?.sku === variantDetails?.sku;
            }
          );
        }
        if (cartItem) {
          setApiQuantityProduct(cartItem?.quantity);
          setQuantity(cartItem?.quantity);
          setProductUid(cartItem?.uid);
        } else {
          setApiQuantityProduct(0);
          setQuantity(0);
        }
      }
    } catch (error) {
      console.error("Error add to card  ---> ../QuickCard.tsx", error);
    }
  }, [updatedCartDetails, selectedColor, variantDetails]);

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
        isPrev={true}
        cssData={{ width: "24px", height: "24px", left: "-30px" }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        isNext={true}
        cssData={{ width: "24px", height: "24px", right: "-30px" }}
      />
    ),
    afterChange: (sliderIndex: number) => arrowsHandler(sliderIndex),
  };
  let total_users_rated = variantDetails?.review_count;
  let sum_of_max_rating_of_user_count = total_users_rated * 5;
  let sum_of_rating = 0;
  variantDetails &&
    variantDetails?.reviews?.items?.map((count: any) => {
      sum_of_rating =
        Number(sum_of_rating) + Number(count?.ratings_breakdown?.[0]?.value);
    });
  let rating = (sum_of_rating * 5) / sum_of_max_rating_of_user_count;

  const checkRating = () => {
    return Number(rating ? rating?.toFixed(1) : 0);
  };

  const handleQuantity = (e: any) => {
    setProductQuantity(e?.target?.value);
  };
  const getSelectOptions = () => {
    return (
      <SelectBox>
        <ArrowIcon
          src={`${ReplaceImage(ARROWDOWN?.url)}`}
          alt="ArrowDownIcon"
        />
        <StyledSelect onChange={handleQuantity}>
          {Array.from({ length: QuantityCount }, (key, i) => {
            return (
              <option selected={i + 1 == productQuantity} value={i + 1}>
                {i + 1}
              </option>
            );
          })}
        </StyledSelect>
      </SelectBox>
    );
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#DEA3B7",
      },
      secondary: {
        main: "#231F20",
      },
    },
    typography: {
      fontFamily: "Montserrat",
    },
  });

  const QuickViewCarousel = ({
    url,
    callBack,
    dataSet,
  }: {
    url: string;
    callBack: Function;
    dataSet: number;
  }) => {
    const errorImage = AppIcons(Error_Image);
    return (
      <img
        src={`${ReplaceImage(url || PRODUCT_FALLBACK_URL)}` || url}
        onError={(e: any) => onImageError(e, errorImage)}
        alt="slider_image"
        onClick={() => callBack(dataSet)}
        style={{
          width: "50px",
          height: "50px",
          cursor: "pointer",
          border: dataSet === imageSelected ? "1px solid #AD184C" : "0px",
        }}
      />
    );
  };
  const productName = transformItemName(details?.name);

  const getRouterPath = () => {
    return variantDetails?.type_id === "simple"
      ? `/${productName}/p/${details?.sku}`
      : `/${productName}/p/${details?.sku}${
          variantDetails?.color != null
            ? `?colorCode=${variantDetails?.color}`
            : ""
        }${
          variantDetails?.size != null ? `&size=${variantDetails?.size}` : ""
        }`;
  };
  const Wishlist_Empty_Colour = AppIcons(EMPTY_WISHLIST_COLOUR);

  const checkOutOfStock = (key: string) => {
    if (userDataItems.storeMode && userDataItems.storeModeType === "cc") {
      const variant = details?.variants?.find((variant: any) => variant?.product?.color?.toString() === key?.toString());
      if (variant) {
        const matchingVariant = storeProductData?.find((storeVariant: any) => 
          variant?.product?.sku?.toString() === storeVariant?.product?.sku?.toString()
        );      
        if (matchingVariant) {
          return false; 
        } else {
          return true; 
        }
      }
    }else {  
    if (
      details?.variants?.filter(
        (variant: any) =>
          variant?.product?.color?.toString() === key?.toString()
      )?.[0]?.product?.stock_status !== "IN_STOCK"
    ) {
      return true;
    }
  }
  return false
}

  useEffect(() => {
    updatedQuantity = quantity;
  }, [quantity]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updatedQuantity = quantity - 1;
    }
    if (updatedQuantity > 0) {
      handleStockCheck();
    }
  };

  const handleIncrement = () => {
    if (quantity < 9999) {
      setQuantity(quantity + 1);
      updatedQuantity = quantity + 1;
    }
    if (updatedQuantity != 0 && quantity < 9999) {
      handleStockCheck();
    }
  };

  const handleInputChange = (event: any) => {
    const newValue = event?.target?.value;
    // Check if the input is empty or non-numeric
    if (newValue?.trim() === "" || isNaN(newValue)) {
      // Handle invalid input or empty input by setting tempQuantity
      updatedQuantity = 0;
      setQuantity(0);
    } else {
      const parsedValue = parseFloat(newValue);
      //Check if the parsed value is a valid number and greater than or equal to 1
      if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 9999) {
        updatedQuantity = parsedValue;
        setQuantity(parsedValue);
      }
    }
  };

  const handleInputLeave = () => {
    if (quantity === 0) {
      updatedQuantity = 1;
      setQuantity(1);
      handleStockCheck(); //api call on input
    }
    if (!isNaN(quantity) && quantity >= 1 && quantity <= 9999) {
      handleStockCheck(); //api call on input
    }
  };
  const getVariantDetails = () => {
    return details?.type_id === "simple"
      ? details
      : router?.asPath?.includes("colorCode") ||
        router?.asPath?.includes("size")
      ? details?.variants?.filter(
          (variant: any) =>
            variant?.product?.color == router?.query?.colorCode &&
            variant?.product?.size == router?.query?.size
        )?.[0]?.product
      : details?.variants?.[0]?.product;
  };

  async function handleStockCheck() {
    // console.log("product details", productData);
    if(!cookie.get("accessToken") && userDataItems?.storeMode){
      setSignInOpen(true);
      return null;
    } else {
      setLoader(true);
      if (
        userDataItems?.storeMode &&
        userDataItems?.storeModeType === "cc" &&
        userDataItems?.storeCode
      ) {
        const res = await fetchExploreStoreModeServiceability( [
          {
            deliveryMode: "pick",
            quantity: 1,
            sku:
            details?.type_id === "simple" ? details?.sku : variantDetails?.sku,
            storeId: `${userDataItems?.storeCode}`,
          },
        ]);
        const isServiceable =  res?.data?.checkStoreAvailabilityForHLD?.status === "Serviceable";
        handleStockavilability(isServiceable);
      } else {
        const pincodeResponse: any = await pinCodeBasedCoordinates(pincode);
    
        const serviceabilityResponse = await productServiceability(
          parseFloat(pincodeResponse.latitude),
          parseFloat(pincodeResponse.longitude),
          pincode,
          details?.type_id === "simple" ? details?.sku : variantDetails?.sku
        );
    
        const savedResponse = serviceabilityResponse;
        handleStockavilability(serviceabilityResponse);
      }
    }
    
  }

  const handleStockavilability = async (productServiceability: any) => {
    if (!productServiceability) {
      setLoader(false);
      setSnackBarOpen(true);
      setSnackMessage("Product is Out of stock");
    } else {
      setLoader(false);
      if (
        apiQuantityProduct !== null &&
        apiQuantityProduct !== undefined &&
        apiQuantityProduct < 1
      ) {
        handleAddToCart(
          1, //set 1 productQuantity
          details?.sku,
          details?.type_id === "simple" ? details?.sku : variantDetails?.sku
        );
      } else {
        if (updatedQuantity !== null && updatedQuantity !== undefined) {
          await client
            .mutate({
              mutation: UPDATE_ITEM_FROM_CART,
              variables: {
                cartId: `${getItem("cartID", "local")}`,
                cartItemUid: productUid,
                productQuantity: Number(updatedQuantity),
              },
            })
            .then((res) => {
              const hasError = handleErrorResponse(res?.data?.updateCartItems); //response checking
              if (hasError) return null;
              if (res?.data?.updateCartItems !== null) {
                setQuantity(updatedQuantity);
                cookie.set(
                  "userCartCount",
                  res?.data?.addConfigurableProductsToCart?.cart?.items
                    ?.length ||
                    res?.data?.addSimpleProductsToCart?.cart?.items?.length,
                  {
                    path: "/",
                    sameSite: true,
                  }
                );
                setUserDataItems({
                  ...userDataItems,
                  userCartCount:
                    res?.data?.updateCartItems?.cart?.total_quantity ||
                    res?.data?.updateCartItems?.cart?.total_quantity,
                });
                updateContextData &&
                  updateContextData({
                    contextUserCartCount:
                      res?.data?.updateCartItems?.cart?.total_quantity ||
                      res?.data?.updateCartItems?.cart?.total_quantity,
                  });

                setSnackBarOpen(true);
                setSnackMessage("Product successfully updated to your cart");
              }
            })
            .catch((err) => {
              console.log("err", err);
              setLoader(false);

              setSnackBarOpen(true);
              setSnackMessage(
                "Could not update the product.The requested qty is not available"
              );
              fetchCartData(); //on failure cart api call & set previous qty
            });
        }
      }
    }
  };

  useEffect(() => {
    if (userDataItems.storeMode && userDataItems.storeModeType === "cc") {
      const fetchStoreData = async () => {
        try {
          const filter = `sku:${details?.sku} AND vStockAvailability:${userDataItems.storeCode}`;
          const encodedFilter = encodeURIComponent(filter);

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_MIDDLEWARE_UNBXD_SEARCH}/unbxd?q=*&variants.count=*&filter=${encodedFilter}&facets=false`
          );
          setStoreProductData(res?.data?.products?.items?.[0]?.variants);
        } catch (error) {
          console.error("Error fetching stock data", error);
        }
      };

      fetchStoreData();
    }
  }, [userDataItems.storeMode, userDataItems.storeModeType]);

  const divAttributes = {
    "data-item-type": isUnbxd ? "UnbxdCardcarousel" : "QuickCard",
  };
  return (
    <>
      {showLoader && <Loader />}
      <CustomSnackBar
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        snackMessage={snackMessage}></CustomSnackBar>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props?.open}
        {...divAttributes}
        data-product-id={details?.id || ""}
        data-variant-id={getVariantDetails()?.id || ""}>
        <Grid container>
          <Grid item xs={6} sm={6} md={4.5} p={isMobile ? "16px" : "40px 30px"}>
            <Box sx={{ position: "relative" }}>
              {!userDataItems.storeMode &&
                (isWishlisted ? (
                  <HeartIcon
                    isFilled={true}
                    src={`${ReplaceImage(FILLED_HEART_ICON?.url)}`}
                    alt="heart-filled"
                    onClick={(e: any) => {
                      e?.stopPropagation();
                      isfromWhishList
                        ? handleRemoveWishlist()
                        : removeFromWishList(productID);
                    }}
                  />
                ) : (
                  <HeartIcon
                    isFilled={false}
                    src={`${ReplaceImage(Wishlist_Empty_Colour?.url)}`}
                    alt="heart-empty"
                    onClick={(e: any) => {
                      e?.stopPropagation();
                      handleWishList(
                        variantDetails?.__typename,
                        variantDetails?.sku,
                        details?.sku
                      );
                    }}
                  />
                ))}
              <Stack direction="column">
                <ItemCarousel>
                  <Link
                    color="none"
                    underline="none"
                    href={getRouterPath()}
                    target="_blank">
                    <CardImage
                      src={`${ReplaceImage(
                        productImages?.[imageSelected]?.url ||
                          PRODUCT_FALLBACK_URL
                      )}`}
                      onError={(e: any) => onImageError(e, errorImage)}
                      alt="product"></CardImage>
                  </Link>
                </ItemCarousel>
                {!isMobile && (
                  <Box
                    sx={{ width: "90%", display: "flex", alignSelf: "center" }}>
                    <Carousel
                      Component={QuickViewCarousel}
                      items={productImages}
                      settings={userSettings}
                      callBack={setImageSelected}
                      isVertical={undefined}
                    />
                  </Box>
                )}
              </Stack>
            </Box>
          </Grid>
          <DescriptionGrid item xs={6} sm={6} md={7.5}>
            <Link
              color="none"
              underline="none"
              href={getRouterPath()}
              target="_blank">
              <PDPTitle>{variantDetails?.name}</PDPTitle>
            </Link>
            {!isMobile &&
              (IS_UNBXD_ENABLED
                ? details?.cColorsCount > 1 && (
                    <ColorsText
                      isMobile={
                        isMobile
                      }>{`${details?.cColorsCount} ${SHADES_AVAILABLE}`}</ColorsText>
                  )
                : colorList?.length > 1 && (
                    <ColorsText
                      isMobile={
                        isMobile
                      }>{`${colorList?.length} ${SHADES_AVAILABLE}`}</ColorsText>
                  ))}
            {!isMobile && (
              <Stack
                alignItems={isMobile ? "flex-start" : "center"}
                flexDirection={isMobile ? "column" : "row"}>
                {details?.rating_summary > 0 && (
                  <Review>
                    <Rating
                      name="size-small"
                      readOnly
                      defaultValue={details?.rating_summary}
                      size="small"
                    />
                    {details?.rating_summary}
                  </Review>
                )}
                <Link
                  color="none"
                  underline="none"
                  href={getRouterPath() + "#reviews"}
                  target="_blank">
                  <ReviewQA
                    onClick={() =>
                      setUserDataItems({
                        ...userDataItems,
                        productQAIndex: "1",
                      })
                    }>
                    {`${
                      details?.review_count > 0
                        ? `${details?.review_count} ${
                            details?.review_count > 1
                              ? REVIEWS_TEXT + "s"
                              : REVIEWS_TEXT
                          }`
                        : WRITE_REVIEW
                    }`}
                  </ReviewQA>
                </Link>
              </Stack>
            )}
            {details?.variants?.length > 1 && (
              <Stack spacing={isMobile ? 0 : 2}>
                {isMobile &&
                  (IS_UNBXD_ENABLED
                    ? details?.cColorsCount > 1 && (
                        <ColorsText
                          isMobile={
                            isMobile
                          }>{`${details?.cColorsCount} ${SHADES_AVAILABLE}`}</ColorsText>
                      )
                    : colorList?.length > 1 && (
                        <ColorsText
                          isMobile={
                            isMobile
                          }>{`${colorList?.length} ${SHADES_AVAILABLE}`}</ColorsText>
                      ))}
                {colorList?.length > 1 && (
                  <ListS isMobile={isMobile}>
                    {colorList?.map((color, index) => (
                      <ColorPaletteWrapperBox
                        available={!checkOutOfStock(color?.value_index)}
                        selected={
                          color?.value_index === selectedColor?.value_index
                        }
                        isMobile={isMobile}
                        onClick={() =>
                          filteredColors?.filter(
                            (filColor: any) =>
                              filColor?.product?.color == color?.value_index
                          )?.length !== 0 && fetchColors(color)
                        }>
                        <ColorPalette
                          key={index}
                          isMobile={isMobile}
                          swatch_color={color?.swatch_data?.value}
                          sx={{
                            padding: checkOutOfStock(color?.value_index)
                              ? isMobile
                                ? "16px"
                                : "18px"
                              : isMobile
                              ? "8px 14px"
                              : "8px 16px",
                          }}
                          onClick={() =>
                            filteredColors?.filter(
                              (filColor: any) =>
                                filColor?.product?.color == color?.value_index
                            )?.length !== 0 && fetchColors(color)
                          }></ColorPalette>
                        {checkOutOfStock(color?.value_index) && (
                          <CrossBox>
                            <Line1></Line1>
                            <Line2></Line2>
                          </CrossBox>
                        )}
                      </ColorPaletteWrapperBox>
                    ))}
                  </ListS>
                )}
                {sizeList?.length > 1 && (
                  <SizeList>
                    {sizeList?.map((size, index) => (
                      <SizeMenu
                        onClick={() => fetchSizes(size)}
                        selected={
                          size?.value_index == selectedSize?.value_index
                        }
                        key={index}
                        disabled={
                          details?.variants
                            ?.filter(
                              (prod: any) =>
                                prod?.product?.color ==
                                selectedColor?.value_index
                            )
                            ?.filter(
                              (item: any) =>
                                item?.product?.size == size?.value_index
                            )?.length == 0
                        }>
                        {size?.label}
                      </SizeMenu>
                    ))}
                  </SizeList>
                )}
              </Stack>
            )}
            <Grid container alignItems={"center"}>
              <PriceTag py={isMobile ? 0 : 1}>
                MRP: ₹
                <Amount>
                  {variantDetails?.pmr_price_value?.amount?.value?.toFixed(2)}
                </Amount>
              </PriceTag>
              {variantDetails?.pmr_price_value?.discount?.percent_off > 0 && (
                <RegularPrice>
                  ₹
                  {variantDetails?.price_range?.minimum_price?.regular_price?.value?.toFixed(
                    2
                  )}
                </RegularPrice>
              )}
              {variantDetails?.pmr_price_value?.discount?.percent_off > 0 && (
                <DiscountPercentage>
                  {variantDetails?.pmr_price_value?.discount?.percent_off?.toFixed(
                    2
                  )}
                  % off
                </DiscountPercentage>
              )}
            </Grid>
            {details?.AvailablePromotions?.length > 0 && (
              <DiscountIcon>
                <OfferIcon
                  src={`${ReplaceImage(DISCOUNT_ICON?.url)}`}
                  alt="discount-icon"
                />
                {`${details?.AvailablePromotions?.length} ${OFFERS_AVAILABLE}`}
              </DiscountIcon>
            )}
         {isMobile && ( <Link
              color="none"
              underline="none"
              href={getRouterPath() + "/about"}
              target="_blank">
              <ProductDetails>{VIEW_DETAILS}</ProductDetails>
            </Link>)}
            {!isMobile && (
              <>
                {exchange ? (
                  <>
                    <ButtonStyledExchange
                      onClick={() => handleSelectForExchangeClick()}>
                      <ExchangeTypography>
                        Select For Exchange
                      </ExchangeTypography>
                    </ButtonStyledExchange>
                  </>
                ) : (
                  <>
                    {apiQuantityProduct !== null &&
                    apiQuantityProduct !== undefined &&
                    apiQuantityProduct < 1 ? (
                      <BottomButtons>
                        {/* {getSelectOptions()} */}
                        <Box>
                          <ThemeProvider theme={theme}>
                            <StyledButton
                              color="secondary"
                              sx={{ borderColor: "#DEA3B7" }}
                              variant="outlined"
                              ismobile={isMobile}
                              onClick={() => {
                                handleStockCheck();
                              }}>
                              <StyledText isMobile={isMobile}>
                                {addTocartCTA}
                              </StyledText>
                            </StyledButton>
                            {!userDataItems?.storeMode && (
                              <StyledButton
                                color="primary"
                                variant="contained"
                                ismobile={isMobile}
                                onClick={() =>
                                  productBuyNow(
                                    details?.type_id === "simple"
                                      ? details?.sku
                                      : variantDetails?.sku
                                  )
                                }>
                                <StyledText isMobile={isMobile}>
                                  {buyNowCTA}
                                </StyledText>
                              </StyledButton>
                            )}
                          </ThemeProvider>
                        </Box>
                      </BottomButtons>
                    ) : (
                      <>
                        <Box>
                          <Box
                            style={{
                              marginTop: "2rem",
                              marginBottom: "1.5rem",
                              minWidth: "150px",
                            }}>
                            <DecrementButton
                              onClick={handleDecrement}
                              variant="contained">
                              −
                            </DecrementButton>
                            <Input
                              className={styles.input_field_inc_dec}
                              style={{
                                width: "11.5%",
                                padding: "0.51rem",
                                borderRadius: "0.2rem",
                                fontSize: "14px",
                                letterSpacing: "0.04rem",
                                color: "#221D1D",
                                backgroundColor: "#F7F7F8",
                                outline: "none",
                                textAlign: "center",
                              }}
                              type="text"
                              inputProps={{ maxLength: 4 }}
                              name="quantity"
                              value={quantity}
                              onBlur={handleInputLeave}
                              onChange={handleInputChange}
                            />
                            <IncrementButton
                              onClick={handleIncrement}
                              variant="contained">
                              +
                            </IncrementButton>
                            {!userDataItems?.storeMode && (
                              <ThemeProvider theme={theme}>
                                <StyledButton
                                  className={styles.QuickB_but_Button}
                                  color="primary"
                                  variant="contained"
                                  ismobile={isMobile}
                                  onClick={() =>
                                    productBuyNow(
                                      details?.type_id === "simple"
                                        ? details?.sku
                                        : variantDetails?.sku
                                    )
                                  }>
                                  <StyledText isMobile={isMobile}>
                                    {buyNowCTA}
                                  </StyledText>
                                </StyledButton>
                              </ThemeProvider>
                            )}
                          </Box>
                        </Box>
                      </>
                    )}
                  </>
                )}

                <Link
                  color="none"
                  underline="none"
                  href={getRouterPath() + "/about"}
                  target="_blank">
                  <ProductDetails>{VIEW_DETAILS}</ProductDetails>
                </Link>
              </>
            )}
          </DescriptionGrid>
        </Grid>
        <BootstrapDialogTitleQuickButton
          id="customized-dialog-title"
          onClose={handleClose}></BootstrapDialogTitleQuickButton>
        {isMobile &&
          (exchange ? (
            <ButtonStyledExchange>
              <ExchangeTypography>Select For Exchange</ExchangeTypography>
            </ButtonStyledExchange>
          ) : (
            <Box>
              <ThemeProvider theme={theme}>
                <StyledGrouped fullWidth orientation="horizontal">
                  {/* mobile */}
                  {apiQuantityProduct !== null &&
                  apiQuantityProduct !== undefined &&
                  apiQuantityProduct < 1 ? (
                    <>
                      <StyledButton
                        color="primary"
                        variant="contained"
                        ismobile={isMobile}
                        onClick={() => {
                          handleStockCheck();
                        }}>
                        <StyledText isMobile={isMobile}>
                          {addTocartCTA}
                        </StyledText>
                      </StyledButton>
                    </>
                  ) : (
                    <>
                      <Box>
                        {/* Increment and Decrement buttons */}
                        <Box
                          style={{ marginLeft: "10px" }}
                          className="box_container_add_to_cart">
                          <DecrementMobileButton
                            onClick={handleDecrement}
                            variant="contained">
                            −
                          </DecrementMobileButton>
                          <Input
                            className={styles.input_field_inc_dec}
                            style={{
                              width: "4rem",
                              padding: "0.51rem",
                              borderRadius: "0.2rem",
                              fontSize: "14px",
                              letterSpacing: "0.04rem",
                              color: "#221D1D",
                              backgroundColor: "#F7F7F8",
                              outline: "none",
                              textAlign: "center",
                              height: "28px",
                            }}
                            type="text"
                            inputProps={{ maxLength: 4 }}
                            name="quantity"
                            value={quantity}
                            onBlur={handleInputLeave}
                            // onClick={handleInputChange}
                            onChange={handleInputChange}
                          />
                          <IncrementMobileButton
                            onClick={handleIncrement}
                            variant="contained">
                            +
                          </IncrementMobileButton>
                        </Box>
                      </Box>
                    </>
                  )}

                  {!userDataItems?.storeMode && (
                    <StyledButton
                      variant="outlined"
                      ismobile={isMobile}
                      onClick={() =>
                        productBuyNow(
                          details?.type_id === "simple"
                            ? details?.sku
                            : variantDetails?.sku
                        )
                      }>
                      <StyledText isMobile={isMobile}>{buyNowCTA}</StyledText>
                    </StyledButton>
                  )}
                </StyledGrouped>
              </ThemeProvider>
            </Box>
          ))}
      </BootstrapDialog>
    </>
  );
}

export default QuickCard;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  div: {
    borderRadius: "0px",
  },
  "& .MuiPaper-root": {
    minWidth: "1000px",
    "@media (max-width:1000px)": {
      minWidth: "800px",
    },
    "@media (max-width:800px)": {
      minWidth: "620px",
    },
    "@media (max-width:600px)": {
      minWidth: "340px",
    },
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(8),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(5),
  },
  "@media (max-width:600px)": {
    "div h2 button": {
      padding: "0px",
    },
  },
}));

const BootstrapDialogTitleQuickButton = (props: any) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseButton />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
