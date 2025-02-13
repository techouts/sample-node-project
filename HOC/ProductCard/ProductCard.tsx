import React, { useCallback, useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import { fetchCartDetails } from "../../api/Cart/CustomerCart";
import {
  OuterBox,
  BorderBox,
  StyledGroup,
  StyledButton,
  StyledText,
  TagIcon,
  HeartIcon,
  ImageGrid,
  TagsText,
  TagsStack,
  StyledStack,
  MainStack,
  RatingBox,
  TitleText,
  PriceText,
  DiscountOff,
  OffPrice,
  GiftsText,
  QuickViewButton,
  ProdImage,
  FallBackBox,
  StyledLink,
  StarMuiIcon,
  RatingsText,
  VariantsText,
  CustomAnchor,
  WishlistIconGrid,
  MoneySign,
} from "./ProductCardStyles";
import { createTheme } from "@mui/material/styles";
import { useMobileCheck } from "../../utility/isMobile";
import { toast } from "../../utility/Toast";

import { useRecoilState, useSetRecoilState } from "recoil";
import { cartState, userState } from "../../recoilstore";
import {
  ADD_CONFIGURABLE_PRODUCTS_TO_CART,
  ADD_SIMPLE_PRODUCTS_TO_CART,
} from "../../graphQLQueries/AddProductsToCart";
import client from "../../apollo-client";
import useStorage from "../../utility/useStoarge";
import { REMOVE_PRODUCTS_FROM_WISHLIST } from "../../graphQLQueries/WhishList/RemoveProductsFromWishList";
import {
  CreateEmptyCart,
  GETCUSTOMER_CART,
} from "../../graphQLQueries/CartQuery";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { CustomSnackBar } from "../CustomSnackBar/CustomSnackBar";
import { ADD_PRODUCTS_TO_WISHLIST } from "../../graphQLQueries/WhishList/AddProductsToWishList";
import { BootstrapDialog } from "../../components/SigninComponent/SignInStyled";
import SignInComponent from "../../components/SigninComponent/SignInComponent";
import {
  addedToCartMessage,
  addedToWishlistMessage,
  addTocartCTA,
  BEST_SELLER_LABEL,
  buyNowCTA,
  FEATURED_LABEL,
  NOTIFY_CTA,
  OUT_OF_STOCK,
  QUICK_VIEW,
  removedWishlistMessage,
  SHOW_SIMILAR_CTA,
} from "../../components/ProductLayout/constants";
import { CREATE_BUYNOW_CART } from "../../graphQLQueries/Cart/BuyNowCart";
import { CART_ROUTE } from "../../components/Header/Constants";
import {
  callCartEvent,
  callmsdSelectItem,
  callNotifymeEvent,
  callsearchCartEvent,
  callSelectItem,
  callslpSelectItem,
  callslpWishlistEvent,
  callWishlistEvent,
  RemoveWishlistEvent,
  wishlistUpdatedEvent,
} from "../../utility/GaEvents";
import { onImageError } from "../../utility/onImageError";
import {
  EMPTY_STAR_ICON,
  EMPTY_WISHLIST_COLOUR,
  Error_Image,
  FALL_BACK_IMAGE_PRODUCT,
  TROPHY_ICONS,
  WISHLIST_ADDED_ICON,
} from "../../utility/AppIcons";
import { AppIcons } from "../../utility/AppIconsConstant";
import CartCarousel from "../../components/Cart/CarouselTabs/CartCarousel";
import DependencyBasicModalComp from "./DependencyBasicModalComp";
import { FREE_PRODUCT_AVAILABLE, OFFERS_AVAILABLE, SHADES_AVAILABLE, SIZES_AVAILABLE } from "../QuickCard/Constants";
import { transformItemName } from "../../utility/urlGenerator";
import { useInView } from "react-intersection-observer";
import AxiosInstance from "../../utility/AxiosInstance";
import { GET_PLP_SEARCHED_QUICKVIEW_DATA_JSON, GET_PLP_SEARCHED_UNBXD_QUICKVIEW_DATA_JSON } from "../../graphQLQueries/SearchListQuery";
import { createEmptyCart } from "../../api/Cart/CustomerCart";
import productServiceability from "../../utility/productServiceability";
import { pinCodeBasedCoordinates } from "../../utility/GeoAPI";
import Loader from "../../HOC/Loader/Loader";
import { IS_UNBXD_ENABLED } from "../../utility/APIConstants";
import {
  triggerAddToCartEvent,
  triggerProductClickEvent,
} from "../../lib/UnbxdEvents";
import handleErrorResponse from "../../utility/ErrorHandling";
import { plpCartUpdatedEvent } from "../../utility/WebEngageEvents";
import { exploreModeAddToCartCheck, getCartItems } from "./ProductCardUtils";
import UserInfoInterface from "../../schemas/userInfoAtom";
import { ExploreUserConsent } from "../../components/StoreSwitch/ExploreUserConsent";
import { BoxStyled } from "../../components/OffersGrid/OffersGridStyles";
import BasicModal from "../Modal/ModalBlock";
import { ExploreStoreUserConsentHandler } from "../../components/StoreSwitch/ExploreStoreUserConsentHandler";
import { fetchExploreStoreModeServiceability, StoreAvailabilityRequestPayload } from "../../graphQLQueries/checkStoreAvailabilityForHLD";
const theme = createTheme({
  palette: {
    primary: {
      main: "#DEA3B7",
    },
    secondary: {
      main: "#c5c5c5",
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

export default function ProductCard(props: any) {
  const {
    uniqueID,
    details: skuDetails,
    showLoader,
    wishListItems,
    snackMessage,
    setSnackMessage,
    snackBarOpen,
    setSnackBarOpen,
    wishListItemId,
    showBuyNow = true,
    isFromCart = false,
    variantSku = "",
    isMSD = false,
    moduleData = {},
    componentData = {},
    gakey,
    referrerSku,
    referrerPrice,
    componentname,
    isUnbxd,
    pageType,
    widgetId,
    requestId,
  } = props;

  const router = useRouter();
  const cookie = new Cookies();
  const { getItem , setItem} = useStorage();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [isHovering, setIsHovering] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [networkErrorMessage, setNetworkErrorMessage] = useState("");
  const [productID, setProductID] = useState(0);
  const [CustomerID, setCustomerID] = useState(
    userDataItems ? userDataItems?.customerName : null
  );

  const [skuDetails_, setSkuDetails] = useState(null);
  const [pincode, setPincode] = useState<any>(getItem("pincode", "local"));
  const [displayLoader, setLoader] = useState(false);
  const [updatedCartDetails, setUpdatedCartDetails] = useState();
  const [openPopup, setPopup] = useState<boolean>(false);
  function handlePopUpClose() {
    setPopup(false);
  }

  const details :any = skuDetails_;
  const variants = details?.variants || [];

    useEffect(() => {
      if (skuDetails) {
        setSkuDetails(skuDetails);
      }
    }, [skuDetails]);


  const inStock = details?.stock_status === "IN_STOCK" || details?.stock_status === "In Stock";

  const PRODUCT_FALLBACK_URL = AppIcons(FALL_BACK_IMAGE_PRODUCT);
  const errorImage = AppIcons(Error_Image)
  //mouse events for product card
  const handleMouseOver = () => {
    if (inStock) {
      if (details?.type_id !== "simple" && !!details?.isDataFetched === false) {
        AxiosInstance(
          GET_PLP_SEARCHED_QUICKVIEW_DATA_JSON(JSON.stringify(skuDetails.sku)),
          false,
          false,
          process.env.NEXT_PUBLIC_PRODUCTS_GRAPHQL_URL
        ).then((res: any) => {
          const skuData = res?.data?.data?.products;

          const variantDetails_ = skuData?.items?.[0]?.variants || [];
          setSkuDetails({
            ...details,
            isDataFetched: true,
            configurable_options: skuData?.items?.[0]?.configurable_options,
            variants: variantDetails_
          })
        })
      }

      setIsHovering(true);
    }

  };
  const handleMouseOut = () => {
    inStock && setIsHovering(false);
  };

  const isMobile = useMobileCheck();

  const handleQuickView = () => {
    inStock && setOpen(true);
  };
  const [wishListedProducts, setWishListProducts] = useState(wishListItems);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reRender, setReRender] = useState(false);
  const setCartStore = useSetRecoilState(cartState);
  const [notifyPopUp, setNotifyPopUp] = useState(false);
  const [thanksPopUp, setThanksPopUp] = useState(false);
  const [variantDetails, setVaraintDetails] = useState<any>();

  const pRetailprice = Number(variantDetails?.product?.pmr_price_value?.amount?.value);
  const pDiscount =  Number(variantDetails?.product?.pmr_price_value?.discount?.percent_off);
  const pPrice = Number(variantDetails?.product?.price_range?.minimum_price?.final_price?.value);
  const ofDiscount = variantDetails?.product?.price_range?.minimum_price?.final_price?.value - variantDetails?.product?.pmr_price_value?.amount?.value;
                   

  useEffect(() => {
    setVaraintDetails(getVariantDetailsFunc());
  }, [details]);

  // useEffect(()=>{
  //   fetchCartData();
  // },[variantDetails,details]) 

  const getVariantDetailsFunc = () => {
    const sortKey: any = window?.location?.search
      ?.replace("?", "")
      ?.split("&")
      ?.filter((item: any) => item?.includes("sort"))?.[0]
      ?.split("=")?.[1]
    const priceUrl: boolean = global?.window?.location?.search?.includes("price");
    if (details?.type_id !== "simple") {
      if (priceUrl && sortKey) {
        return details?.variants?.sort(function (a: any, b: any) {
          return (
            a?.product?.price_range?.minimum_price?.final_price?.value -
            b?.product?.price_range?.minimum_price?.final_price?.value
          );
        })?.[0];
      } else if (variantSku !== "") {
        return details?.variants?.filter(
          (item: any) => item?.product?.sku === variantSku
        )?.[0];
      } else {
        return details?.variants?.[0];
      }
    } else {
      return { product: details };
    }
  };

  useEffect(() => {
    setCustomerID(userDataItems ? userDataItems?.customerName : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender]);

  useEffect(() => {
    setCustomerID(userDataItems?.customerName);
  }, [userDataItems?.customerName]);

  const handleProductClick = () => {
    setOpen(false);
    if (window.location?.href?.includes("search")) {
      callslpSelectItem(
        "select_item",
        details,
        router?.asPath,
        details?.name,
        getProductLink(),
        details?.brand_info,
        componentData?.id,
        gakey,
        variantDetails,
      );
    } else if (isMSD) {
      callmsdSelectItem(
        "select_item",
        details,
        router?.asPath,
        details?.name,
        getProductLink(),
        details?.brand_info,
        moduleData,
        componentData?.id,
        gakey,
        variantDetails,
        referrerSku,
        referrerPrice,
        componentname     
         );
          } else {
      callSelectItem(
        "select_item",
        details,
        router?.asPath,
        details?.name,
        getProductLink(),
        details?.brand_info,
        componentData?.id,
        gakey,
        variantDetails
      );
    }
    if (isUnbxd) {
      triggerProductClickEvent(details, gakey, pageType, widgetId, requestId);
    }
  };

  useEffect(() => {
    setWishListProducts(wishListItems);
  }, [wishListItems]);
  useEffect(() => {
    setIsWishlisted(
      wishListedProducts?.filter(
        (product: any) => product?.product?.sku === details?.sku
      )?.length > 0
    );
    setProductID(
      wishListedProducts?.filter(
        (product: any) => product?.product?.sku === details?.sku
      )[0]?.id
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details, wishListedProducts]);
  const productBuyNow = (productSku: string) => {
    showLoader(true);
    if (cookie.get("accessToken")) {
      client
        .mutate({
          mutation: CREATE_BUYNOW_CART,
          variables: {
            productQuantity: 1,
            productSku: productSku,
            parentID: details?.sku,
          },
        })
        .then((res) => {
          const hasError =    handleErrorResponse(res?.data?.createBuyNowCart?.cart_id) //response checking
        if (hasError) return null;
          callNotifymeEvent(
            details,
            inStock ? buyNowCTA : NOTIFY_CTA,
            router?.asPath?.includes(buyNowCTA) ? CART_ROUTE : router.query.pid,
            inStock ? "add_to_cart" : "select_item",
            componentData?.id,
            getProductLink(),
            gakey,
            variantDetails,
            res
          );
          localStorage.setItem(
            "BuyNowCartID",
            res?.data?.createBuyNowCart?.cart_id
          );
          setCartStore((previousData) => ({
            ...previousData,
            cartItems: null,
            serviceability: {
              sd: false,
              ed: false,
              cc: false,
            },
            serviceabilityStores: [],
            serviceableProducts: {
              cc: null,
              non_cc: null,
            },
          }));
          setUserDataItems((previousData: any) => ({
            ...previousData,
            userCartCount: 1,
          }));
          window.location.assign(CART_ROUTE);
        })
        .catch((err) => showLoader(false));
    } else {
      setSignInOpen(true);
      showLoader(false);
    }
  };


  const fetchCartData = async () => {
    const cartID = getItem("BuyNowCartID", "local")
      ? getItem("BuyNowCartID", "local")
      : getItem("cartID", "local");
    try {
      if(cartID){
        const cartData = await fetchCartDetails(cartID);
        setUpdatedCartDetails(cartData);
      }
    } catch (error) {
      console.error("Error fetching cart details ---> ../ProductCard.tsx", error);
    }
  };

  function handleAddToCartSuccessResponse(response: any) {
    const hasError = handleErrorResponse(response?.data); //response checking
    if (hasError) return null;
    const updatedCartCount = userDataItems?.storeMode
      ? response?.data?.addConfigurableProductsToCartV2?.cart?.total_quantity
      : response?.data?.addConfigurableProductsToCart?.cart?.total_quantity;
    cookie.set("userCartCount", updatedCartCount, {
      path: "/",
      sameSite: true,
      secure: true,
    });
    fetchCartData();
    if (window.location?.href?.includes("search")) {
      callsearchCartEvent(
        "add_to_cart",
        details,
        router.query.pid,
        "ADD TO CART",
        details?.brand_info,
        componentData?.id,
        getProductLink(),
        gakey,
        variantDetails,
        response
      );
    } else if (isMSD) {
      callmsdSelectItem(
        "add_to_cart",
        details,
        router?.asPath,
        details?.name,
        getProductLink(),
        details?.brand_info,
        moduleData,
        componentData?.id,
        gakey,
        variantDetails,
        referrerSku,
        referrerPrice,
        componentname,
        response
      );
    } else {
      callCartEvent(
        "add_to_cart",
        details,
        router.query.pid,
        "ADD TO CART",
        componentData?.id,
        getProductLink(),
        gakey,
        variantDetails,
        response
      );
    }
    setUserDataItems({
      ...userDataItems,
      userCartCount: updatedCartCount,
    });
    let cartCount =
      response?.data?.addConfigurableProductsToCart?.cart?.total_quantity ||
      response?.data?.addSimpleProductsToCart?.cart?.total_quantity;
    setSnackBarOpen(true);
    setSnackMessage(addedToCartMessage);
    props?.isfromWhishList && handleRemoveWishlist(cartCount);
    plpCartUpdatedEvent(response);
    if (isFromCart) {
      setCartStore((previousData: any) => ({
        ...previousData,
        isCartUpdated: true,
      }));
    }
  }

  const addProductToCart = async (
    cartID: string | null,
    quantity: number,
    parentSku: string,
    childSku: string
  ) => {
    showLoader(true);
    if (userDataItems?.storeMode) {
        const response = await exploreModeAddToCartCheck({
          cartId: cartID,
          skuID: `${details?.type_id === "simple" ? parentSku : childSku}`,
          parentID: parentSku,
          quantity: parseFloat(`${quantity}`),
          pincode: userDataItems?.storePincode,
          storeId: userDataItems?.storeCode,
          // isInitial: userDataItems?.isStoreModeAddToCartInitial,
          // isInitial: localStorage.getItem("isStoreModeAddToCartInitial") === "true",
          setSnackBarOpen: setSnackBarOpen,
          setSnackMessage: setSnackMessage,
        }); 
        handleAddToCartSuccessResponse(response);
      showLoader(false);
    } else {
      client
        .mutate({
          mutation:
            details?.type_id === "simple"
              ? ADD_SIMPLE_PRODUCTS_TO_CART
              : ADD_CONFIGURABLE_PRODUCTS_TO_CART,
          variables: {
            cartID: cartID,
            skuID: `${details?.type_id === "simple" ? parentSku : childSku}`,
            parentID: parentSku,
            quantity: parseFloat(`${quantity}`),
          },
        })
        .then((response) => {
          handleAddToCartSuccessResponse(response);
        })
        .catch(async (err: any) => {
          const errMessage = JSON.parse(JSON.stringify(err));
          console.log(errMessage?.message);
          const isCartNotFound = errMessage?.message?.includes(
            "Could not find a cart with ID"
          );
          fetchCartData();
          if (isCartNotFound) {
            const isGuestUser = !!localStorage.getItem("accessToken") === false;
            if (isGuestUser) {
              const cartID = await createEmptyCart();
              localStorage.setItem("cartID", cartID);
              if (cartID) {
                addProductToCart(cartID, quantity, parentSku, childSku);
              }
            }
          }
          showLoader(false);
          if (!isCartNotFound) {
            setSnackBarOpen(true);
            setSnackMessage(errMessage?.message);
          }
        })
        .finally(() => {
          showLoader(false);
        });
    }
  };

  const handleAddToCart = (
    quantity: number,
    parentSku: string,
    childSku: string
  ) => {

    if (isUnbxd) {
      triggerAddToCartEvent({
        details: details,
        variantdetails: variantDetails,
      });
    }
 
    showLoader(true);
    if (cookie.get("accessToken")) {
      if (getItem("cartID", "local")) {
        addProductToCart(
          getItem("cartID", "local") as string,
          quantity,
          parentSku,
          childSku
        );
      } else {
        client
          .query({
            query: GETCUSTOMER_CART,
          })
          .then((res: any) => {

            if (res?.data?.customerCart?.id) {
              localStorage.setItem("cartID", res?.data?.customerCart?.id);
              addProductToCart(
                res?.data?.customerCart?.id,
                quantity,
                parentSku,
                childSku
              );
            } else fetchEmptyCart(quantity, parentSku, childSku);
          })
          .catch((err: any) => {
            showLoader(false);
            const errMessage = JSON.parse(JSON.stringify(err));
            console.log(errMessage?.message);
            setSnackBarOpen(true);
            setSnackMessage(errMessage?.message);
          });
      }
    } else {
      if (localStorage.getItem("cartID")) {
        addProductToCart(
          localStorage?.getItem("cartID"),
          quantity,
          parentSku,
          childSku
        );
      } else {
        fetchEmptyCart(quantity, parentSku, childSku);
      }
    }
  };

  const fetchEmptyCart = (
    quantity: number,
    parentSku: string,
    childSku: string
  ) => {
    showLoader(true);
    client
      .mutate({
        mutation: CreateEmptyCart,
      })
      .then((res) => {

        localStorage.setItem("cartID", res?.data?.createEmptyCart);
        addProductToCart(
          res?.data?.createEmptyCart,
          quantity,
          parentSku,
          childSku
        );
      })
      .catch((err) => {
        console.log(err)
        toast.error("Someting went wrong, Please try again!!!");
       } )
      .finally(() => showLoader(false));
  };

  const removeFromWishList = (itemID: any, cartCount?: any) => {
    showLoader(true);
    if (cookie.get("accessToken")) {
      client
        .mutate({
          mutation: REMOVE_PRODUCTS_FROM_WISHLIST,
          variables: {
            wishListItemId: itemID,
          },
        })
        .then((response) => {
          const hasError =   handleErrorResponse(response?.data) //response checking
          if (hasError) return null;
          cookie.set(
            "userWishListCount",
            response?.data?.removeProductsFromWishlist?.wishlist?.items_count,
            {
              path: "/",
              sameSite: true
            }
          );
          setUserDataItems({
            ...userDataItems,
            userWishListCount:
              response?.data?.removeProductsFromWishlist?.wishlist?.items_count,
            userCartCount: cartCount || userDataItems?.userCartCount
          });
          if (props?.isfromWhishList) {
            props?.fetchWishListProducts && props?.fetchWishListProducts();
          }
          if (props?.isFromCart && props?.updateCartSuggestions) {
            props?.updateCartSuggestions(
              "Add From Wishlist",
              response?.data?.removeProductsFromWishlist?.wishlist?.items_v2
                ?.items,
              CartCarousel,
              "/account/wishlist"
            );
          }
          setSnackMessage(removedWishlistMessage);
          setWishListProducts(
            response?.data?.removeProductsFromWishlist?.wishlist?.items_v2
              ?.items
          );
            const filteredItem = wishListedProducts?.find(
              (cItem: any) => cItem?.id === itemID
            );
          setSnackBarOpen(true);
          removeWishlistEvents(response, filteredItem);
          wishlistUpdatedEvent(response, variantDetails, pPrice, pRetailprice,ofDiscount);         
        })
        .catch((err) => {
          console.log(err);
          setNetworkError(true);
          setNetworkErrorMessage(err?.message);
        })
        .finally(() => showLoader(false));
    }
  };
  const removeWishlistEvents = (response: any, filteredItem?:any) => {
    if (window.location?.href?.includes("search")) {
      callslpWishlistEvent(
        "remove_from_wishlist",
        details,
        router.query.pid,
        "Remove from wishlist",
        componentData?.id,
        getProductLink(),
        gakey,
        variantDetails,
        response
      );
    } else if (isMSD) {
      callmsdSelectItem(
        "remove_from_wishlist",
        details,
        router?.asPath,
        details?.name,
        getProductLink(),
        details?.brand_info,
        moduleData,
        componentData?.id,
        gakey,
        variantDetails,
        referrerSku,
        referrerPrice,
        componentname,
        response
      );
    } else {
      RemoveWishlistEvent(
        "remove_from_wishlist",
        details,
        router.query.pid,
        "Remove from wishlist",
        componentData?.id,
        getProductLink(),
        gakey,
        variantDetails,
        response,
        filteredItem
      );
    }
  };
  const getVariant = () => {
    return (
      <>
        {details?.configurable_options
          ?.filter((item: any) => item?.values?.length > 0)
          ?.map((variant: any, index: number) => {
            return (
              variant?.values?.length > 1 &&
              `${variant?.values?.length} ${variant?.label}${variant?.values?.length > 1 ? "s" : ""
              } Available ${details?.configurable_options?.[index + 1]?.values?.length >
                1 && index !== details?.configurable_options?.length - 1
                ? " | "
                : " "
              }`
            );
          })}
      </>
    );
  };
  const handleWishList = (
    productType: string,
    sku: string,
    parent_sku: string
  ) => {
    showLoader(true);
    if (cookie.get("accessToken")) {
      client
        .mutate({
          mutation: ADD_PRODUCTS_TO_WISHLIST,
          fetchPolicy: "no-cache",
          variables: {
            WishListInput: [
              {
                sku: productType !== "simple" ? sku : parent_sku,
                parent_sku: parent_sku,
                quantity: 1,
              },
            ],
          },
        })
        .then((response: any) => {
          if (
            response?.data?.addProductsToWishlist?.user_errors?.[0]?.message
          ) {
            setSnackMessage(
              response?.data?.addProductsToWishlist?.user_errors?.[0]?.message
            );
            setSnackBarOpen(true);
          } else {
            cookie.set(
              "userWishListCount",
              response?.data?.addProductsToWishlist?.wishlist?.items_count,
              {
                path: "/",
                sameSite: true
              }
            );
            wishlistEvents(response);
            setUserDataItems({
              ...userDataItems,
              userWishListCount:
                response?.data?.addProductsToWishlist?.wishlist?.items_count,
            });
            setWishListProducts(
              response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items
            );
            setSnackMessage(addedToWishlistMessage);
            setSnackBarOpen(true);
            if (props?.isFromCart && props?.updateCartSuggestions) {
              props?.updateCartSuggestions(
                "Add From Wishlist",
                response?.data?.removeProductsFromWishlist?.wishlist?.items_v2
                  ?.items,
                CartCarousel,
                "/account/wishlist"
              );
            }
            wishlistUpdatedEvent(
              response,
              variantDetails,
              pPrice,
              pRetailprice,
              ofDiscount
            );
          }
        })
        .catch((error: any) => {
          console.log(error);
          setNetworkError(true);
          setNetworkErrorMessage(error?.message);
        })
        .finally(() => {
          showLoader(false);
        });
    } else {
      setSignInOpen(true);
      showLoader(false);
    }
  };

  const wishlistEvents = (response:any) => {
    if (window.location?.href?.includes("search")) {
      callslpWishlistEvent(
        "add_to_wishlist",
        details,
        router.query.pid,
        "Move to Wishlist",
        componentData?.id,
        getProductLink(),
        gakey,
        variantDetails,
        response
      );
    } else if (isMSD) {
      callmsdSelectItem(
        "add_to_wishlist",
        details,
        router?.asPath,
        details?.name,
        getProductLink(),
        details?.brand_info,
        moduleData,
        componentData?.id,
        gakey,
        variantDetails,
        referrerSku,
        referrerPrice,
        componentname,
        response
      );
    } else {
      callWishlistEvent(
        "add_to_wishlist",
        details,
        router.query.pid,
        "Move to Wishlist",
        componentData?.id,
        getProductLink(),
        gakey,
        variantDetails,
        response
      );
    }
  };

  const [signInOpen, setSignInOpen] = useState(false);
  const handleClosed = () => {
    setSignInOpen(false);
  };

  const handleRemoveWishlist = (cartCount?: any) => {
    removeFromWishList(wishListItemId, cartCount);
    setOpen(false);
    closeDeleteCard();
  };
  const openDeleteCard = () => {
    setIsOpenDelete(true);
  };
  const closeDeleteCard = () => {
    setIsOpenDelete(false);
  };
  const productName = transformItemName(details?.name);

  const getProductLink = () => {
    let paramsData = [];
    if (details?.type_id !== "simple") {
      variantDetails?.product?.color != null &&
        variantDetails?.product?.color != "" &&
        paramsData.push(`colorCode=${variantDetails?.product?.color}`);
      variantDetails?.product?.size != null &&
        variantDetails?.product?.size != "" &&
        paramsData.push(`size=${variantDetails?.product?.size}`);
    }
    return details?.type_id === "simple"
      ? `/${productName}/p/${details?.sku}`
      : `/${productName}/p/${details?.sku}?${paramsData
        ?.toString()
        ?.replace(/,/g, "&")}`;
  };

  const Wishlist_Empty_Colour = AppIcons(EMPTY_WISHLIST_COLOUR);
  const EmptyStar = AppIcons(EMPTY_STAR_ICON);
  const Trophy_icon = AppIcons(TROPHY_ICONS);
  const Wishlist_filled_heart = AppIcons(WISHLIST_ADDED_ICON);

  const handleStockavilability = (productServiceability: any) => {
    if (!productServiceability) {
      setLoader(false);
      setSnackBarOpen(true);
      setSnackMessage("Product is Out of stock");
    } else {
      setLoader(false);
      details?.variants?.length > 1
        ? inStock && handleQuickView()
        : inStock &&
          handleAddToCart(
            1,
            details?.sku,
            variantDetails?.product?.sku ?? details?.sku
          );
    }
  };

  async function handleStockCheck() {
    setLoader(true);
    if (
      userDataItems?.storeMode &&
      userDataItems?.storeModeType === "cc" &&
      userDataItems?.storeCode
    ) {
      const res = await fetchExploreStoreModeServiceability([
        {
          deliveryMode: "pick",
          quantity: 1,
          sku:
            details?.type_id === "simple"
              ? details?.sku
              : variantDetails?.product?.sku,
          storeId: `${userDataItems?.storeCode}`,
        },
      ]);
      handleStockavilability(
        res?.data?.checkStoreAvailabilityForHLD?.status === "Serviceable"
      );
    } else {
      const pincodeResponse: any = await pinCodeBasedCoordinates(
        userDataItems?.storeMode ? userDataItems?.storePincode : pincode
      );

      const serviceabilityResponse = await productServiceability(
        parseFloat(pincodeResponse.latitude),
        parseFloat(pincodeResponse.longitude),
        userDataItems?.storeMode ? userDataItems?.storePincode : pincode,
        details?.type_id === "simple"
          ? details?.sku
          : variantDetails?.product?.sku
      );

      const savedResponse = serviceabilityResponse;
      handleStockavilability(serviceabilityResponse);
    }
  }
  
  const handleLeftCTA = () => { 
    details?.variants?.length > 1
      ? inStock && handleQuickView()
      : inStock &&
      handleAddToCart(
        1,
        details?.sku,
        variantDetails?.product?.sku ?? details?.sku
      );
  };

  const handleRightCTA = () => {
    if (inStock) {
      if (details?.variants?.length > 1) {
        handleQuickView();
      } else {
        productBuyNow(
          details?.type_id === "simple"
            ? details?.sku
            : variantDetails?.product?.sku
        );
      }
    } else {
      notifyOpen();
    }
  };

  const notifyOpen = () => {
    setNotifyPopUp(true);
  };
  const openThanks = () => {
    setThanksPopUp(true);
  };
  const closeThanks = () => {
    setThanksPopUp(false);
  };
  const notifyClose = () => setNotifyPopUp(false);
  const getProductImg = () => {
    if (details?.image?.url && details?.image?.url !== "") {
      return details?.image?.url;
    } else if (
      variantDetails?.product?.image?.url &&
      variantDetails?.product?.image?.url !== ""
    ) {
      return variantDetails?.product?.image?.url;
    } else if (
      details?.additional_images?.[0]?.url &&
      details?.additional_images?.[0]?.url !== ""
    ) {
      return details?.additional_images?.[0]?.url;
    } else if (
      variantDetails?.product?.additional_images?.[0]?.url &&
      variantDetails?.product?.additional_images?.[0]?.url !== ""
    ) {
      return variantDetails?.product?.additional_images?.[0]?.url;
    } else {
      return PRODUCT_FALLBACK_URL?.url;
    }
  };

  const callNotifyEvents = () => {
    if (isMSD) {
      callmsdSelectItem(
        "add_to_cart",
        details,
        router?.asPath,
        inStock ? buyNowCTA : NOTIFY_CTA,
        router?.asPath?.includes(buyNowCTA) ? CART_ROUTE : router.query.pid,
        details?.brand_info,
        moduleData,
        componentData?.id,
        gakey,
        variantDetails,
        referrerSku,
        referrerPrice,
        componentname
      );
    } else {
      callNotifymeEvent(
        details,
        inStock ? buyNowCTA : NOTIFY_CTA,
        router?.asPath?.includes(buyNowCTA) ? CART_ROUTE : router.query.pid,
        inStock ? "add_to_cart" : "select_item",
        componentData?.id,
        getProductLink(),
        gakey,
        variantDetails
      );
    }
  };

  async function handleProductToCartInCCMode() {
    const response = await exploreModeAddToCartCheck({
      cartId: getItem("cartID", "local") as string,
      skuID: variantDetails?.product?.sku ?? details?.sku,
      parentID: details?.sku,
      quantity: 1,
      pincode: userDataItems?.storePincode,
      storeId: userDataItems?.storeCode,
      // isInitial: userDataItems?.isStoreModeAddToCartInitial,
      // isInitial: localStorage.getItem("isStoreModeAddToCartInitial") === "true",
      setSnackBarOpen: setSnackBarOpen,
      setSnackMessage: setSnackMessage
    });
    // if (userDataItems?.isStoreModeAddToCartInitial && response?.data) {
    //   setUserDataItems({
    //     ...userDataItems,
    //     isStoreModeAddToCartInitial: false,
    //     dummy:"hey4"
    //   });
    // }
    handleAddToCartSuccessResponse(response);
    openPopup && handlePopUpClose();
  }

  const ref = useRef();

  const { ref: inViewRef, inView, entry } = useInView({ triggerOnce: true });

  const _inView = entry ? inView : true

  // Use `useCallback` so we don't recreate the function on each render
  const setRefs = useCallback(
    (node: any) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef]
  );

  const RenderAvailableVariantsCount = () => {
    return (
      <>
        {details?.cColorsCount > 1 && (
          <VariantsText>{`${details?.cColorsCount} ${SHADES_AVAILABLE}`}</VariantsText>
        )}
        {details?.cSizesCount > 1 && (
          <VariantsText>{`${details?.cSizesCount} ${SIZES_AVAILABLE}`}</VariantsText>
        )}
      </>
    );
  };

  const RENDER_UNBXD_VARIANT_COUNT =
    IS_UNBXD_ENABLED && (details?.cSizesCount > 1 || details?.cColorsCount > 1);

  const divAttributes = {
        "data-item-type": isUnbxd ? "UnbxdCardcarousel" : "ProdctSCCard",
      };

  return (
    <div ref={setRefs} data-product-id={uniqueID} {...divAttributes}>
      {/* {displayLoader && <Loader />} */}
      {_inView && (
        <div>
          <Snackbar
            open={networkError}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{ marginTop: "56px" }}
            onClose={() => setNetworkError(false)}
          >
            <Alert severity="error" onClose={() => setNetworkError(false)}>
              {networkErrorMessage}
            </Alert>
          </Snackbar>
          <CustomSnackBar
            snackBarOpen={snackBarOpen}
            setSnackBarOpen={setSnackBarOpen}
            snackMessage={snackMessage}
            autoHideDuration={5000}
          ></CustomSnackBar>
          <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={signInOpen}
            fullScreen
            onClose={handleClosed}
          >
            <SignInComponent
              handleClosed={handleClosed}
              initialScreen={true}
              CustomerID={CustomerID}
              setCustomerID={setCustomerID}
              setReRender={setReRender}
              setLoader={showLoader}
            />
          </BootstrapDialog>
          <OuterBox
            isMobile={isMobile}
            loading={false}
            isSpecialCard={false}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
          >
            <StyledLink
              color="none"
              underline="none"
              href={getProductLink()}
              target="_blank"
              onClick={handleProductClick}
            ></StyledLink>
            <BorderBox
              aria-label="Bordered"
              isMobile={isMobile}
              loading={false}
            >
              <Grid
                container
                direction="column"
                sx={{ height: "100%" }}
                flexWrap={isMobile ? "unset" : "wrap"}
              >
                <MainStack isMobile={isMobile}>
                  <TagsStack isMobile={isMobile}>
                    {details?.is_best_seller_checkbox == 1 && (
                      <StyledStack direction="row">
                        <TagIcon
                          isMobile={isMobile}
                          src={`${ReplaceImage(Trophy_icon?.url)}`}
                          alt="trophy-icon"
                        />
                        <TagsText isMobile={isMobile} colored={false}>
                          {BEST_SELLER_LABEL}
                        </TagsText>
                      </StyledStack>
                    )}
                    {details?.is_featured_checkbox == 1 && (
                      <StyledStack direction="row">
                        <TagIcon
                          isMobile={isMobile}
                          src={`${ReplaceImage(EmptyStar?.url)}`}
                          alt="feature-icon"
                        />
                        <TagsText isMobile={isMobile} colored={true}>
                          {FEATURED_LABEL}
                        </TagsText>
                      </StyledStack>
                    )}
                  </TagsStack>
                  {!userDataItems.storeMode && (
                  <WishlistIconGrid isMobile={isMobile}>
                    {props?.isfromWhishList ? (
                      <HeartIcon
                        src={`${ReplaceImage(Wishlist_filled_heart?.url)}`}
                        alt="heart-filled"
                        isFilled={true}
                        onClick={(e: any) => {
                          e?.stopPropagation();
                          openDeleteCard();
                        }}
                      />
                    ) : (
                      <>
                        {isWishlisted ? (
                          <HeartIcon
                            src={`${ReplaceImage(Wishlist_filled_heart?.url)}`}
                            alt="heart-filled111"
                            isFilled={true}
                            onClick={(e: any) => {
                              e?.stopPropagation();
                              removeFromWishList(productID);
                            }}
                          />
                        ) : (
                          <HeartIcon
                            src={`${ReplaceImage(Wishlist_Empty_Colour?.url)}`}
                            alt="heart-empty"
                            isFilled={false}
                            onClick={(e: any) => {
                              e?.stopPropagation();
                              handleWishList(
                                details?.type_id,
                                variantDetails?.product?.sku,
                                details?.sku
                              );
                            }}
                          />
                        )}
                      </>
                    )}
                  </WishlistIconGrid>
                  )}
                </MainStack>
                <ImageGrid item xs={6} my={1} isMobile={isMobile}>
                  <FallBackBox>
                    <CustomAnchor
                      href={getProductLink()}
                      target="_blank"
                      onClick={handleProductClick}
                    >
                      <ProdImage
                        data-sku={details?.sku}
                        src={`${ReplaceImage(getProductImg())}`}
                        onError={(e: any) => onImageError(e, errorImage)}
                        alt="product-image"
                        style={{
                          height: `${isMobile ? "175px" : "245px"}`,
                          margin: "0 auto",
                          width: "100%",
                          objectFit: "contain",
                        }}
                      ></ProdImage>
                    </CustomAnchor>
                  </FallBackBox>
                  {Number(details?.rating_summary) > 0 && (
                    <RatingBox>
                      <StyledStack direction="row">
                        <StarMuiIcon isMobile={isMobile} />
                        <RatingsText isMobile={isMobile}>
                          {parseFloat(details?.rating_summary)?.toFixed(1)}
                        </RatingsText>
                      </StyledStack>
                    </RatingBox>
                  )}
                  {inStock ? (
                    <>
                      {isHovering && (
                        <QuickViewButton
                          inStock={true}
                          onClick={(e) => {
                            e?.stopPropagation();
                            handleQuickView();
                          }}
                        >
                          {QUICK_VIEW}
                        </QuickViewButton>
                      )}
                    </>
                  ) : (
                    <QuickViewButton inStock={false}>
                      {OUT_OF_STOCK}
                    </QuickViewButton>
                  )}
                </ImageGrid>
                <Grid
                  item
                  xs={"auto"}
                  px={2}
                  pt={isMobile ? 0 : 1}
                  pb={0}
                  aria-label="contentSection"
                  sx={{ cursor: "pointer" }}
                >
                  <TitleText isMobile={isMobile} isSpecialCard={false}>
                    {details?.name
                      ? details?.name
                      : variantDetails?.product?.name}
                  </TitleText>
                  {RENDER_UNBXD_VARIANT_COUNT ? (
                    <RenderAvailableVariantsCount />
                  ) : (
                    details?.variants?.length > 1 && (
                      <VariantsText>
                        {details?.configurable_options?.length > 2
                          ? "Various Shades Available"
                          : getVariant()}
                      </VariantsText>
                    )
                  )}
                  <PriceText isMobile={isMobile}>
                    <MoneySign isMobile={isMobile}>₹</MoneySign>
                    {variantDetails?.product?.pmr_price_value?.amount?.value?.toFixed(
                      2
                    )}
                  </PriceText>
                  {variantDetails?.product?.pmr_price_value?.discount
                    ?.percent_off > 0 && (
                    <OffPrice isMobile={isMobile}>
                      ₹
                      {variantDetails?.product?.price_range?.minimum_price?.regular_price?.value?.toFixed(
                        2
                      )}
                    </OffPrice>
                  )}
                  {variantDetails?.product?.pmr_price_value?.discount
                    ?.percent_off > 0 && (
                    <DiscountOff isMobile={isMobile}>
                      {variantDetails?.product?.pmr_price_value?.discount?.percent_off?.toFixed(
                        0
                      )}
                      % off
                    </DiscountOff>
                  )}
                  {Number(details?.is_free_gift_available) > 0 ? (
                    <GiftsText isMobile={isMobile}>
                      Free Gift Available
                    </GiftsText>
                  ) : (
                    <>
                      {(details?.type_id === "simple" &&
                        details?.AvailablePromotions?.length > 0) ||
                        (details?.type_id !== "simple" &&
                          variantDetails?.product?.AvailablePromotions?.length >
                            0 && (
                            <GiftsText isMobile={isMobile}>{`${
                              details?.type_id === "simple"
                                ? details?.AvailablePromotions?.length
                                : variantDetails?.product?.AvailablePromotions
                                    ?.length
                            } ${OFFERS_AVAILABLE}`}</GiftsText>
                          ))}
                    </>
                  )}
                  {Number(details?.is_free_product_available) > 0 && (
                    <GiftsText isMobile={isMobile}>
                      {FREE_PRODUCT_AVAILABLE}
                    </GiftsText>
                  )}
                </Grid>
              </Grid>
            </BorderBox>
            <Box>
              <ThemeProvider theme={theme}>
                <StyledGroup
                  fullWidth
                  orientation={isMobile ? "vertical" : "horizontal"}
                >
                  <StyledButton
                    color="primary"
                    variant="contained"
                    isMobile={isMobile}
                    onClick={(e) => {
                      e?.stopPropagation();
                      // handleLeftCTA();
                      if (
                        !cookie.get("accessToken") &&
                        userDataItems?.storeMode
                      ) {
                        setSignInOpen(true);
                      } else {
                        handleStockCheck();
                      }
                    }}
                    disabled={inStock ? false : true}
                  >
                    <StyledText>
                      {inStock ? addTocartCTA : SHOW_SIMILAR_CTA}
                    </StyledText>
                  </StyledButton>
                  {!userDataItems?.storeMode && showBuyNow && (
                    <StyledButton
                      variant="outlined"
                      isMobile={isMobile}
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleRightCTA();
                        if (!inStock) callNotifyEvents();
                      }}
                    >
                      <StyledText>
                        {inStock ? buyNowCTA : NOTIFY_CTA}
                      </StyledText>
                    </StyledButton>
                  )}
                </StyledGroup>
              </ThemeProvider>
            </Box>
            <DependencyBasicModalComp
              open={open}
              setOpen={setOpen}
              details={details}
              variantDetails={variantDetails}
              isWishlisted={isWishlisted}
              isfromWhishList={props?.isfromWhishList}
              handleAddToCart={handleAddToCart}
              productID={productID}
              productBuyNow={productBuyNow}
              removeFromWishList={removeFromWishList}
              handleRemoveWishlist={handleRemoveWishlist}
              handleWishList={handleWishList}
              setIsHovering={setIsHovering}
              closeDeleteCard={closeDeleteCard}
              isOpenDelete={isOpenDelete}
              notifyOpen={notifyOpen}
              notifyClose={notifyClose}
              notifyPopUp={notifyPopUp}
              showLoader={showLoader}
              openThanks={openThanks}
              closeThanks={closeThanks}
              thanksPopUp={thanksPopUp}
              updatedCartDetails={updatedCartDetails}
              isUnbxd={isUnbxd}
              setSignInOpen={setSignInOpen}
            />
          </OuterBox>
        </div>
      )}
      {/* {openPopup && (
        <BoxStyled>
          <BasicModal
            top={"50%"}
            width={isMobile ? "100%" : "30%"}
            left={"50%"}
            open={openPopup}
            handleClose={() => {
              handlePopUpClose();
            }}
            Component={
              <ExploreUserConsent
                message="You have items from regular delivery in cart, please Checkout/Wishlist them before exploring the store"
                rightCta="Checkout Cart"
                leftCta="Wishlist"
                rightAction={() => {
                  //Wishlist
                  setLoader(true);
                  setUserDataItems((prev: any) => ({
                    ...prev,
                    storeMode: false,
                    storeModeType: null,
                    storeName: null,
                    isStoreModeAddToCartInitial: true,
                  }));
                  handlePopUpClose();
                  router?.push(`/cart/info`);
                }}
                leftAction={async () => {
                  //Checkout Cart
                  await handleProductToCartInCCMode();
                }}
              />
            }
          ></BasicModal>
        </BoxStyled>
      )} */}
      {userDataItems?.storeMode && openPopup && (
        <ExploreStoreUserConsentHandler
          openPopup={openPopup}
          handlePopUp={handlePopUpClose}
          isCartMode={false}
          setLoader={setLoader}
          setUserDataItems={setUserDataItems}
          router={router}
          message={
            "You have items in the cart, please checkout/Wishlist them before exploring the store"
          }
          rightCta={"Checkout Cart"}
          leftCta={"Wishlist"}
          commonCta={"Clear Cart"}
          leftAction={async () => {
            //Wishlist
            await handleProductToCartInCCMode();
          }}
          setSnackMessage={setSnackMessage}
          setSnackBarOpen={setSnackBarOpen}
        />
      )}
    </div>
  );
}
