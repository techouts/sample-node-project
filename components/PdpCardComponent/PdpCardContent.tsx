import React, { useEffect, useRef, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Rating from "@mui/material/Rating";
import ShareInfo from "./SharePopUp/ShareInfo";
import ShareInfoData from "./SharePopUp/ShareData.json";
import { useMobileCheck } from "../../utility/isMobile";
import styles from "../../styles/Home.module.css";
import { Cookies } from "react-cookie";
import productServiceability from "../../utility/productServiceability";
import { pinCodeBasedCoordinates } from "../../utility/GeoAPI";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  ButtonTypography,
  GridBox,
  Review,
  ShareBox,
  StyledButton,
  TitleBox,
  ProductTitle,
  WriteAskTypo,
  AddCartButton,
  NotifyMe,
  NotifySubmit,
  RatingTag,
  DecrementButton,
  IncrementButton,
  BrandBox,
  MobileBrandBox,
} from "./pdcardstyle";
import dynamic from "next/dynamic";
import PdpAdvantages from "./pdpAdvantages";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { useRouter } from "next/router";
import client from "../../apollo-client";
import {
  AddLikesMutation,
  PRODUCT_NOTIFY_ME,
} from "../../graphQLQueries/ProductQuery";
import {
  widget_type,
  share_event_type,
  event_type,
  widgetType,
} from "../../utility/GAConstants";
import { toast } from "../../utility/Toast";
import { AvailableOffers } from "../../HOC/CartHOCs/AvailableOffers/AvailableOffers";
import { BootstrapDialog } from "../SigninComponent/SignInStyled";
import SignInComponent from "../SigninComponent/SignInComponent";
import Loader from "../../HOC/Loader/Loader";
import { userState } from "../../recoilstore";
import { useRecoilState } from "recoil";
import triggerGAEvent, {
  callCartEvent,
  callViewItemArray,
  pdpcartUpdatedEvent,
} from "../../utility/GaEvents";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ErrorIcon from "@mui/icons-material/Error";
import {
  ADD_TO_CART,
  BUY_NOW_LABEL,
  NOTIFY_TEXT,
  OUT_OF_STOCK,
  SUBMIT_LABEL,
} from "./Constants";
import { ReplaceImage } from "../../utility/ReplaceImage";
import ViewEvent from "../../utility/viewEvent";
import { AppIcons } from "../../utility/AppIconsConstant";
import { SHARE_ICONS } from "../../utility/AppIcons";
import { NotifyContent } from "./NotifyContent";
import { getSanitizedPDPURL, transformItemName } from "../../utility/urlGenerator";
import { scrollIntoView } from "../../utility/commonUtility";
const ProductPrice = dynamic(() => import("./ProductPrice"), { ssr: false });
const DeliveryPickup = dynamic(() => import("./DeliveryPickup"), {
  ssr: false,
});
const PdpVariants = dynamic(() => import("./PdpVariants"), { ssr: false });
const IconBox = dynamic(
  () => import("./pdcardstyle").then((comp) => comp.IconBox),
  { ssr: false }
);
import { fetchCartDetails } from "../../api/Cart/CustomerCart";
import useStorage from "../../utility/useStoarge";
import { UPDATE_ITEM_FROM_CART } from "../../graphQLQueries/UpdateProduct";
import { TOAST_CART_PRODUCT_UPDATE_QUANITY } from "../../utility/Constants";
import { useAppContext } from "../../context/userInfoContext";
import { pdpRedirecion } from "../../utility/PdpRedirection";
import { triggerAddToCartEvent } from "../../lib/UnbxdEvents";

import handleErrorResponse from "../../utility/ErrorHandling";
import { fetchExploreStoreModeServiceability, StoreAvailabilityRequestPayload } from "../../graphQLQueries/checkStoreAvailabilityForHLD";
import axios from "axios";
import DeliveryPickupNew from "./DeliveryPickupNew";
const PdpCardContent = ({
  productData,
  handleAddToCart,
  buyNowHandle,
  component,
  psd,
  setPsd,
  mode,
  setMode,
  productDetails,
  typeOfDelivery,
  setTypeOfDelivery,
  setSnackMessage,
  setSnackBarOpen,
  updatedCartDetails,
  fetchValues,
}: any) => {
  const cookie = new Cookies();
  const { getItem } = useStorage();
  const [shareOpen, setShareOpen] = useState(false);
  const [showLoader, setLoader] = useState(false);
  const isMobile = useMobileCheck();
  const inStock = productDetails?.stock_status === "IN_STOCK";
  const analyticProductData = productData;
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [liked, setLiked] = useState(false);
  const scroll = useRef();
  const [notify, setNotify] = useState(false);
  const [emailID, setEmailID] = useState("");
  const viewEventWrapper = useRef();
  const [likeCount, setLikeCount] = useState(
    parseInt(productData?.product_count || 0)
  );
  const [notifyPopUp, setNotifyPopUp] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const colorList: any[] = [];
  const sizeList: any[] = [];
  const [cartDetails, setCartDetails] = useState();
  const [apiQuantityProduct, setApiQuantityProduct] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0); // Specify the type as number
  const [pincode, setPincode] = useState<any>(getItem("pincode", "local"));
  const [productUid, setProductUid] = useState();
  const [reRender, setReRender] = useState(false);
  const [CustomerID, setCustomerID] = useState(
    userDataItems ? userDataItems?.customerName : null
  );
  const [storeProductData, setStoreProductData] = useState<any>(null);
  console.log(psd,"psd")

  let updatedQuantity: number;

  const userInfoContext = useAppContext();
  const { updateContextData } = userInfoContext;

  productData?.configurable_options?.map((variant: any) => {
    if (variant?.label?.toLowerCase() === "color") {
      variant?.values?.map((colorPallete: any) => {
        colorList?.push(colorPallete);
      });
    } else if (variant?.label.toLowerCase() === "size") {
      variant?.values?.map((sizePallete: any) => {
        sizeList?.push(sizePallete);
      });
    }
  });
  const getSelectedColor = () => {
    const queryColorCode = router?.query?.colorCode;
    const matchingColor = colorList?.find(item => item?.value_index == productDetails?.color);
  
    if (matchingColor) return matchingColor;
    if (queryColorCode) {
      const queryMatchingColor = colorList?.find(item => item?.value_index == queryColorCode);
      if (queryMatchingColor) return queryMatchingColor;
    }
    return colorList?.[0];
  };
  
  const getSelectedSize = () => {
    const querySize = router?.query?.size;
    const matchingSize = sizeList?.find(item => item?.value_index == productDetails?.size);
  
    if (matchingSize) return matchingSize;
    if (querySize) {
      const queryMatchingSize = sizeList?.find(
        (item) => item?.value_index == querySize
      );
      if (queryMatchingSize) return queryMatchingSize;
    }
    return sizeList?.[0];
  };
  
  const [selectedColor, setSelectedColor] = useState<any>();
  const [selectedSize, setSelectedSize] = useState<any>();
  
  useEffect(() => {
    setCustomerID(userDataItems ? userDataItems?.customerName : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender]);
 

  useEffect(() => {
    getSelectedColor();
    getSelectedSize();
  },[])

  useEffect(() => {
    fetchCartData();
  },[!isMobile])

  useEffect(() => {
    setSelectedColor(
      router?.query?.colorCode
          ? colorList?.find((item) => item?.value_index == router?.query?.colorCode) || colorList?.[0]
          : colorList?.[0]
  );
  
  setSelectedSize(
    router?.query?.size
        ? sizeList?.find((item) => item?.value_index == router?.query?.size) || sizeList?.[0]
        : sizeList?.[0]
);

  }, [router]);

  const getVariantDetails = () => {
    return productDetails?.type_id === "simple"
      ? productDetails
      : router?.asPath?.includes("colorCode") ||
        router?.asPath?.includes("size")
      ? productDetails?.variants?.filter(
          (variant: any) =>
            variant?.product?.color == router?.query?.colorCode &&
            variant?.product?.size == router?.query?.size
        )?.[0]?.product
      : productDetails?.variants?.[0]?.product;
  };

  useEffect(() => {
    if((getItem("BuyNowCartID", "local") ||
    getItem("cartID", "local"))){
    fetchCartData();
    }
  }, []);
  const fetchCartData = async () => {
    const cartID = getItem("BuyNowCartID", "local")
      ? getItem("BuyNowCartID", "local")
      : getItem("cartID", "local");
    try {
      if(cartID){
        const cartData: any = await fetchCartDetails(cartID);
        setCartDetails(cartData);
      }
    } catch (error) {
      console.error("Error fetching cart details ---> ../PdpCardContent.tsx", error);
    }
  };



  useEffect(() => {
    type ProductDetails = {
      sku: string;
      name: string;
    };

    function findProductQuantityInCart(
      productDetails: ProductDetails,
      cartDetails: any,
      updatedCartDetails:any
    ) {
      const productSku = productDetails?.sku;
      // Check if the product is in the cart
      let cartItem;    
      if (quantity == 0 && updatedCartDetails !== undefined) {
        cartItem = updatedCartDetails?.data?.cart?.items?.find((item: any) => {
         //  console.log("hello 1");
         return item?.configured_variant?.sku === productSku;
       });
       
     }else if (quantity > 0 && cartDetails!==undefined){
         cartItem = cartDetails?.data?.cart?.items?.find((item: any) => {
          //  console.log("hello 2",);
          return item?.configured_variant?.sku === productSku;
        });
      }
        // console.log("Cart Item:", cartItem);

        if (cartItem) {
          // console.log(
          //   `Product "${productDetails.name}" with SKU "${productSku}" is present in the cart with quantity: ${cartItem.quantity}`
          // );
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
    findProductQuantityInCart(productDetails, cartDetails,updatedCartDetails);
  }, [cartDetails,updatedCartDetails,selectedColor,productDetails]);

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const analyticUtility = () => {
    return {
      event_type: share_event_type,
      widget_type: widget_type,
      item_name: analyticProductData?.name,
      item_id: analyticProductData?.sku,
      item_type: analyticProductData?.__typename,
      widget_title: "na",
      widget_description: analyticProductData?.short_description?.html || "na",
      widget_position: 1,
      no_of_items: 1,
      item_brand: productData?.brand_info,
      item_category: productData?.categories?.[0]?.name,
      item_category2: productData?.categories?.[0]?.name,
      item_category3: productData?.categories?.[0]?.name,
    };
  };

  const SharehandleOpen = () => {
    triggerGAEvent(
      {
        ...analyticUtility(),
        link_url: `${global?.window?.location?.origin}${Share_Icon?.url}`,
        method: "FACEBOOK/WHATSAPP/PINTEREST/EMAIL",
      },
      "share"
    );
    setShareOpen(true);
  };
  const SharehandleClose = () => {
    setShareOpen(false);
  };
  const handleAddLikeAnalytic = () => {
    triggerGAEvent(
      {
        ...analyticUtility(),
        link_url: "",
      },
      "click"
    );
  };
  const handleAddLike = () => {
    setLoader(true);
    handleAddLikeAnalytic();
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
          setLikeCount(
            productDetails?.product_count === (NaN || "NAN") ? 0 : likeCount + 1
          );
        }
      })
      .catch((error: any) => {
        toast.error("Someting went wrong, Please try again!!!");
        console.log(error)})
      .finally(() => setLoader(false));
  };
  let scrollTop = global?.window?.document.getElementById("productQA");

  const handleClosed = () => {
    setSignInOpen(false);
  };

  const updateColor = (color: any) => {
    handleClose();
    setSelectedColor(color);
    if (color && color?.value_index) {
      router.query.colorCode = color?.value_index;
      router.push(router);
    }
  };
  const fetchColors = (colorObj: any) => {
    if (!checkOutOfStock(colorObj?.value_index)) {
      setSelectedColor(colorObj);
      if (colorObj && colorObj?.value_index) {
        router.query.colorCode = colorObj?.value_index;
        router.push(router);
      }
    }
  };
  const fetchSizes = (sizeObj: any) => {
    setSelectedSize(sizeObj);
    if (sizeObj && sizeObj?.value_index) {
      router.query.size = sizeObj?.value_index;
      router.push(router);
    }
  };
 
  const checkOutOfStock = (key: string) => {
    if (userDataItems.storeMode && userDataItems.storeModeType === "cc") {
      const variant = productData?.variants?.find((variant: any) => variant?.product?.color?.toString() === key?.toString());
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
      const variant = productData?.variants?.find(
        (variant: any) => variant?.product?.color?.toString() === key?.toString()
      );
  
      if (variant?.product?.stock_status !== "IN_STOCK") {
        return true; 
      }
    }
    return false;
  };
  
  
  const Share_Icon = AppIcons(SHARE_ICONS);
  const getSpecificVariantPrice = (product: any, checkPriceValue: boolean) => {
    const priceDetails = product?.variants?.filter((singleProd: any) => {
      return singleProd?.product?.color === selectedColor?.value_index
    })

    if (checkPriceValue) {
      return priceDetails?.[0]?.product?.price_range?.minimum_price?.final_price
        ?.value
    } else {
      return priceDetails?.[0]?.product?.pmr_price_value?.amount?.value
    }
  }

  const getSpecificVariantDiscount = (product: any, checkPriceValue: boolean) => {
    const priceDetails = product?.variants?.filter((singleProd: any) => {
      return singleProd?.product?.color === selectedColor?.value_index
    })
    
    if (checkPriceValue) {
      return priceDetails?.[0]?.product?.pmr_price_value?.discount?.amount_off
        
    } else {
      return priceDetails?.[0]?.product?.pmr_price_value?.discount?.amount_off
    }
  }

  const getSpecificImageurl = (product: any, checkPriceValue: boolean) => {
    const prodDetails = product?.variants?.filter((singleProd: any) => {
      return singleProd?.product?.color === selectedColor?.value_index;
    });
    if (checkPriceValue) {
      return prodDetails?.[0]?.product?.image?.url;
    } else {
      return product?.image?.url;
    }
  };
  const queryString = global?.window?.location?.search;
  const urlParams = new URLSearchParams(queryString);
  let colorCodeData = urlParams.get("colorCode");
  let sizeCodeData = urlParams.get("size");
  const getVariantSku = () => {
    return productData?.type_id === "simple"
      ? productData?.sku
      : router?.asPath?.includes("colorCode") &&
        router?.asPath?.includes("size")
      ? productData?.variants?.filter(
          (variant: any) =>
            variant?.product?.color?.toString() == colorCodeData &&
            variant?.product?.size?.toString() == sizeCodeData
        )?.[0]?.product?.sku
      : router?.asPath?.includes("colorCode")
      ? productData?.variants?.filter(
          (variant: any) => variant?.product?.color?.toString() == colorCodeData
        )?.[0]?.product?.sku
      : router?.asPath?.includes("size")
      ? productData?.variants?.filter(
          (variant: any) => variant?.product?.size?.toString() == sizeCodeData
        )?.[0]?.product?.sku
      : productData?.variants?.[0]?.product?.sku;
  };
  const dataLayer = {
    item_id: getVariantSku() || productData?.sku || "na",
    widget_type: widget_type,
    item_name: productData?.name || "na",
    item_type: productData?.__typename || "na",
    widget_title: "na",
    widget_description: "na",
    widget_postion: 1,
    no_of_items: 1,
    item_brand: productData?.brand_info || "na",
    item_category: productData?.categories?.[0]?.name || "na",
    item_category2: productData?.categories?.[1]?.name || "na",
    item_category3: productData?.categories?.[2]?.name || "na",
    item_category5: productData?.sku || "na",
    item_category5_id: productData?.sku || "na",
    item_deeplink_url: `${global?.window?.location.origin}${
      productData?.type_id === "simple"
        ? pdpRedirecion(
            productData?.sku,
            productData?.type_id,
            productData?.name
          )
        : pdpRedirecion(
            productData?.sku,
            productData?.type_id,
            productData?.name,
            productData?.configured_variant?.color,
            productData?.configured_variant?.size
          )
    }`,
    item_price:
      Number(
        productData?.variants
          ? getSpecificVariantPrice(productData, false)
          : productData?.pmr_price_value?.amount?.value
          ? Number(productData?.pmr_price_value?.amount?.value)
          : 0
      ) || 0,
    item_original_price:
      Number(
        productData?.variants
          ? getSpecificVariantPrice(productData, true)
          : productData?.price_range?.minimum_price?.regular_price?.value
          ? Number(
              productData?.price_range?.minimum_price?.regular_price?.value
            )
          : 0
      ) || 0,
    discount:
      Number(
        productData?.variants
          ? getSpecificVariantDiscount(productData, true)
          : productData?.pmr_price_value?.discount?.amount_off
          ? Number(productData?.pmr_price_value?.discount?.amount_off)
          : 0
      ) || 0,
    item_image_link: [
      productData?.variants
        ? getSpecificImageurl(productData, true)
        : productData?.image?.url || "na",
    ],
    status: productData?.stock_status == "IN_STOCK" || "na",
    event_type: "view_list_view",
    view_items: [callViewItemArray(productData)],
  };
  ViewEvent(viewEventWrapper, dataLayer, "view_item");
  //web engage PDP Product viewed Event
  const Webengagedatalayer = {
    item_id: getVariantSku() || "na",
    no_of_items: 1,
    path: getSanitizedPDPURL(global?.window?.location?.href) || "na",
    item_name: productData?.name || "na",
    item_category: productData?.categories?.[0]?.name || "na",
    item_category2: productData?.categories?.[1]?.name || "na",
    item_category3: productData?.categories?.[2]?.name || "na",
    item_category4: productData?.categories?.[3]?.name || "na",
    item_category_id: productData?.categories?.[0]?.id?.toString() || "na",
    item_category2_id: productData?.categories?.[1]?.id?.toString() || "na",
    item_category3_id: productData?.categories?.[2]?.id?.toString() || "na",
    item_category4_id: productData?.categories?.[3]?.id?.toString() || "na",
    item_category5: productData?.sku || "na",
    item_category5_id: productData?.sku || "na",
    item_brand: productData?.brand_info || "na",
    item_deeplink_url:
      `${global?.window?.location.origin}${
        productData?.type_id === "simple"
          ? pdpRedirecion(
              productData?.sku,
              productData?.type_id,
              productData?.name
            )
          : pdpRedirecion(
              productData?.sku,
              productData?.type_id,
              productData?.name,
              productData?.configured_variant?.color,
              productData?.configured_variant?.size
            )
      }` || "na",
    item_price:
      Number(
        productData?.variants
          ? getSpecificVariantPrice(productData, false)
          : productData?.pmr_price_value?.amount?.value
          ? Number(productData?.pmr_price_value?.amount?.value)
          : 0
      ) || 0,
    item_original_price:
      Number(
        productData?.variants
          ? getSpecificVariantPrice(productData, true) :productData?.price_range?.minimum_price?.regular_price?.value ?
          Number(productData?.price_range?.minimum_price?.regular_price?.value) :0
      ) || 0,
    discount:
      Number(
        productData?.variants
          ? getSpecificVariantDiscount(productData, true) : productData?.pmr_price_value?.discount?.amount_off ?
          Number( productData?.pmr_price_value?.discount?.amount_off) : 0
      ) || 0,
    currency: "INR",
    item_image_link: [
      productData?.variants
        ? getSpecificImageurl(productData, true)
        : productData?.image?.url||"na"
    ] ,
    item_variant:
      productData?.type_id !== "simple"
        ? productData?.configurable_options?.filter((obj: any) => {
            return obj.attribute_code === "color"
          })?.length > 0
          ? productData?.configurable_options
              ?.filter((obj: any) => {
                return obj.attribute_code === "color"
              })?.[0]
              ?.values?.filter((key: any) => {
                return (
                  key.value_index === productData?.variants?.[0]?.product?.color
                )
              })?.[0]?.label
          : productData?.color
          ? productData?.color
          : "na"
        : "na",
  }
  ViewEvent(viewEventWrapper, Webengagedatalayer,"Product Viewed");


  useEffect(() => {
    const timeout = setTimeout(() => {
      let queryText = router?.asPath;
      let reviews = queryText?.includes("#reviews");
      let questions = queryText?.includes("#questions");

      const about = queryText?.includes("about");

      if (about) {
        scrollIntoView({ elementID: "about" });
      } else if (reviews) {
        handleWriteReview();
      } else if (questions) {
        handleWriteQuestions();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handleWriteReview = () => {
    scrollTop?.scrollIntoView({ behavior: "smooth" });
    scrollTop?.scrollIntoView(true);
    let scrolledY = window.scrollY;
    if (scrolledY) {
      window.scroll(0, scrolledY - 130);
    }
    setUserDataItems({
      ...userDataItems,
      productQAIndex: "1",
    });
  };
  const handleWriteQuestions = () => {
    scrollTop?.scrollIntoView({ behavior: "smooth" });
    scrollTop?.scrollIntoView(true);
    let scrolledY = window.scrollY;
    if (scrolledY) {
      window.scroll(0, scrolledY - 130);
    }
    setUserDataItems({
      ...userDataItems,
      productQAIndex: "2",
    });
  };
  //notify me cta event in PDP
  const NotifymeEvent = (data: any) => {
    triggerGAEvent(
      {
        item_name: data?.name,
        component_id: component?.id,
        item_id: data?.sku,
        event_type: event_type,
        widget_type: widgetType,
        item_type: data?.type_id,
        widget_title: "na",
        widget_description: "na",
        widget_position: 1,
        link_url: "na",
        link_text: "Notify Me",
      },
      "click"
    );
  };
  // Web-Engage event notifyme click and notifyme submit event
  const getDetails = (productData: any, variants?: any) => {
    return productData?.__typename === "SimpleProduct"
      ? productData
      : variants?.product;
  };
  const WeebEngageNotifyMeEvent = (dataproduct: any, eventName: any) => {
    triggerGAEvent(
      {
        item_id: dataproduct?.sku || "na",
        item_brand: productData?.brand_info || "na",
        item_category: productData?.categories?.[0]?.name || "na",
        user_pin_code: window?.localStorage?.getItem("pincode") || "na",
        item_category2: productData?.categories?.[1]?.name || "na",
        item_category3: productData?.categories?.[2]?.name || "na",
        item_category4: productData?.categories?.[3]?.name || "na",
        item_image_link: [dataproduct?.image?.url || "na"],
        item_original_price: dataproduct?.pmr_price_value?.amount?.value || 0,
        item_price:
          dataproduct?.price_range?.minimum_price?.regular_price?.value || 0,
        item_variant:
          productData?.configurable_options
            ?.filter((att: any) => att?.attribute_code === "color")?.[0]
            ?.values?.filter?.((dataVal: any) => {
              return (
                dataVal?.value_index ==
                getDetails(productData, productData?.variants)?.color
              );
            })?.[0]?.label ||
          productData?.configurable_options?.[0]?.values?.[0]?.label ||
          "na",
      },
      eventName
    );
  };

  const notifyOpen = () => {
    NotifymeEvent(productDetails);
    setNotifyPopUp(true);
  };
  const notifyClose = () => setNotifyPopUp(false);
  const handleNotifyME = () => {
    setLoader(true);
    client
      .mutate({
        mutation: PRODUCT_NOTIFY_ME,
        variables: {
          sku: productDetails?.sku,
          mail: emailID,
        },
      })
      .then((response: any) => {
        setLoader(false);
        response && notifyOpen();
        WeebEngageNotifyMeEvent(productDetails, "notify_me_submit");
      })
      .catch((error: any) => {
        toast.error("Someting went wrong, Please try again!!!");
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
    setNotify(false);
  };
  const productName = transformItemName(productData?.name);
  // console.log("PDP page");

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
  const offersList = productData?.type_id === "simple"
  ? productData?.AvailablePromotions || []
  : productDetails?.AvailablePromotions || []

const offersData = [
  {
    description: productData?.free_items_offers
      ?.replace("<p>", "")
      ?.replace("</p>", ""),
  },
  ...[...offersList, productData?.freeProduct],
]




  useEffect(() => {
    updatedQuantity = quantity;
  }, [quantity]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updatedQuantity = quantity - 1;
      fetchCartData();
    }
    if(updatedQuantity >0 ){
      // handleStockCheck();
      addToCart()
      }
  };

  const handleIncrement = () => {
    if (quantity < 9999) {
      setQuantity(quantity + 1);
      updatedQuantity = quantity + 1;
      fetchCartData();
    }
    if(updatedQuantity !=0 && quantity < 9999){
      // handleStockCheck();
      addToCart()
      }
  };

  const handleInputChange = (event: any) => {
    const newValue = event?.target?.value;
    // Check if the input is empty or non-numeric
    if (newValue?.trim() === "" || isNaN(newValue)) {
      // Handle invalid input or empty input by setting tempQuantity
      updatedQuantity = 0;
      setQuantity(0)
    }
     else {
      const parsedValue = parseFloat(newValue);
      //Check if the parsed value is a valid number and greater than or equal to 1
      if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 9999)  {
        updatedQuantity = parsedValue;
        setQuantity(parsedValue)
      }
    }
  };

  const handleInputLeave = () => {
    if(quantity===0){
      updatedQuantity=1;
      setQuantity(1)
      // handleStockCheck();//api call on input
      addToCart()
    }
    if (!isNaN(quantity) && quantity >= 1 && quantity <= 9999)  {
      // handleStockCheck(); //api call on input 
      addToCart();
    }
  };


  const addToCart = async () => {
    if (
      userDataItems?.storeMode &&
      userDataItems?.storeModeType === "cc" &&
      userDataItems?.storeCode
    ) {
      const requestPayload: StoreAvailabilityRequestPayload[] = [
        {
          deliveryMode: "pick",
          quantity: 1,
          sku: productDetails?.sku,
          storeId: `${userDataItems?.storeCode}`,
        },
      ];
      const res = await fetchExploreStoreModeServiceability(requestPayload);
      const isServiceable =
        res?.data?.checkStoreAvailabilityForHLD?.status === "Serviceable";
      if (!isServiceable) {
        setLoader(false);
        setSnackBarOpen(true);
        setSnackMessage("Product is not Serviceable");
      } else {
        await handleUpdateCart();
      }
    } else {
      if (!productServiceability) {
        setLoader(false);
        setSnackBarOpen(true);
        setSnackMessage("Product is not Serviceable");
      } else {
        await handleUpdateCart();
      }
    }
  };

  async function handleUpdateCart() {
    if (
      apiQuantityProduct !== null &&
      apiQuantityProduct !== undefined &&
      apiQuantityProduct < 1
    ) {
      handleAddToCart();
      // callCartEvent(
      //   'add_to_cart',
      //   productData,
      //   'na',
      //   ADD_TO_CART,
      //   component?.id,
      //   getProductLink(),
      //   1,
      //   { product: { ...productDetails } }
      // );
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
            // console.log("hello UPDATE_ITEM_FROM_CART", res);
            if (res?.data?.updateCartItems !== null) {
              setQuantity(updatedQuantity);
              cookie.set(
                "userCartCount",
                res?.data?.addConfigurableProductsToCart?.cart?.items?.length ||
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

  const handleStockavilability = async (productServiceability: any) => {
    // console.log("hello productServiceability", productServiceability);
    // console.log(quantity, "hello in");
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
       handleAddToCart();
       fetchCartData();
        callCartEvent(
          "add_to_cart",
          productData,
          "na",
          ADD_TO_CART,
          component?.id,
          getProductLink(),
          1,
          { product: { ...productDetails } }
        );
      } else {
        // console.log(updatedQuantity, "hello else 2");

        if (updatedQuantity!==null && updatedQuantity!==undefined) {
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
            const hasError =   handleErrorResponse(res?.data?.updateCartItems) //response checking
            if (hasError) return null;
            // console.log("hello UPDATE_ITEM_FROM_CART", res);
            if (res?.data?.updateCartItems !== null) {
              setQuantity(updatedQuantity);
              cookie.set(
                "userCartCount",
                res?.data?.addConfigurableProductsToCart?.cart?.items?.length ||
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
              // GetCartDetails(
              //   TOAST_CART_PRODUCT_UPDATE_QUANITY,
              //   res?.data?.updateCartItems
              // );
              // cartUpdatedEvent(res);
              // let cartData = {
              //   ...cartStore,
              //   cartItems: res?.data?.updateCartItems,
              // };
              // removeFromCartEvent(
              //   cartData,
              //   res?.data?.updateCartItems?.cart?.items?.filter((dataSku: any) => {
              //     return (
              //       dataSku?.configured_variant?.sku ===
              //       product?.configured_variant?.sku ||
              //       dataSku?.product?.sku === product?.product?.sku
              //     );
              //   })?.[0],
              //   value > product?.quantity ? "add_to_cart" : "remove_from_cart",
              //   "Quantity Updated",
              //   productIndex,
              //   quantityValue
              // );
              fetchCartData();
              setSnackBarOpen(true);
              setSnackMessage("Product successfully updated to your cart");
            }
          })
          .catch((err) => {
            console.log("err", err);
            setLoader(false);
            // handleError(
            //   "Could not update the product.The requested qty is not available"
            // );
            setSnackBarOpen(true);
            setSnackMessage("Could not update the product.The requested qty is not available");
            fetchCartData(); //on failure cart api call & set previous qty
          });

        }
        // else{
        //  setLoader(false);
        //  setProductTag(OUT_OF_STOCK);
        // }
      }
    }
  };
    
  async function handleStockCheck() {
    // console.log("product details", productData);
    setLoader(true);
    const pincodeResponse: any = await pinCodeBasedCoordinates(pincode);
    

    const serviceabilityResponse = await productServiceability(
      parseFloat(pincodeResponse.latitude),
      parseFloat(pincodeResponse.longitude),
      pincode,
      productData?.type_id === "simple"
        ? productData?.sku
        : getVariantDetails()?.sku
    );

    const savedResponse = serviceabilityResponse;
    // console.log("serviceabilityResponse", savedResponse);
    handleStockavilability(serviceabilityResponse);
  }
  // console.log("hello psd",psd)

  useEffect(() => {
    if (userDataItems.storeMode && userDataItems.storeModeType === "cc") {
      const fetchStoreData = async () => {
        try {
          const filter = `sku:${productDetails?.sku} AND vStockAvailability:${userDataItems.storeCode}`;
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

  const capitalizeWords = (text: string) => {
    if (!text) return text;
    return text
      ?.split(" ") 
      ?.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() 
      )
      .join(" "); 
  };

  const input = productData?.brand_info;
  const formattedInput = input;

const generateUrl = () => {
  const encodedBrandInfo = encodeURIComponent(productData?.brand_info);

  let url = `${global?.window?.location?.origin}/c/search?search=${encodedBrandInfo}&brandName_uFilter=${encodedBrandInfo}`;

  if (userDataItems?.storeMode) {
    const encodedStoreCode = encodeURIComponent(userDataItems?.storeCode);
    url += `&vStockAvailability=${encodedStoreCode}`;
  }

  return url;
};


 const handleBrandPLP = () => {
   const url = generateUrl();
   router.push(url); 
 };

  return (
    <>
      {showLoader && <Loader />}
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={signInOpen}
        fullScreen
        onClose={handleClosed}>
        <SignInComponent
          handleClosed={handleClosed}
          initialScreen={true}
          setLoader={setLoader}
          setCustomerID={setCustomerID}
          setReRender={setReRender}
        />
      </BootstrapDialog>
      {fetchValues && (
        <Grid
          container
          p={isMobile ? "0 16px" : "0px"}
          data-item-type={"ProductCard"}
          data-product-id={productData?.id || ""}
          data-variant-id={getVariantDetails()?.id || ""}>
          <MobileBrandBox onClick={handleBrandPLP} ismobile={false}>
            {formattedInput}
          </MobileBrandBox>

          <Grid item xs={12}>
            <GridBox ref={viewEventWrapper}>
              <TitleBox>
                <ProductTitle
                  variant="h1"
                  sx={{
                    fontSize: isMobile ? "16px" : "20px",
                  }}>
                  {productDetails?.name}
                </ProductTitle>
              </TitleBox>
              {!isMobile && (
                <IconBox>
                  <ShareBox>
                    <img
                      src={`${ReplaceImage(Share_Icon?.url)}`}
                      onClick={SharehandleOpen}
                      alt="share icon"
                      width="30px"
                    />
                  </ShareBox>
                </IconBox>
              )}
            </GridBox>
            <Box>
              <BasicModal
                width={isMobile ? "600px" : "700px"}
                minHeight="400px"
                top="50%"
                left="50%"
                handleOpen={SharehandleOpen}
                handleClose={SharehandleClose}
                open={shareOpen}
                Component={
                  <ShareInfo
                    shareInfoData={ShareInfoData}
                    productData={productDetails}
                    pdpData={true}
                  />
                }
              />
              <Review>
                {Number(productData?.rating_summary) !== 0 && (
                  <>
                    <RatingTag>
                      <Rating
                        name="sizeListL-small"
                        readOnly
                        defaultValue={Number(productData?.rating_summary)}
                        size="small"
                        sx={{
                          gap: isMobile ? "6px" : "10px",
                          marginTop: "0px",
                        }}
                      />
                      {Number(productData?.rating_summary) !== 0 && (
                        <> {Number(productData?.rating_summary)}/5</>
                      )}
                    </RatingTag>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      style={{ height: "16px", color: "#A7A5A6" }}
                      flexItem
                    />
                  </>
                )}
                <WriteAskTypo onClick={() => handleWriteReview()}>
                  {productData?.review_count > 0
                    ? `${productData?.review_count} Reviews`
                    : "Write A Review"}
                </WriteAskTypo>
              </Review>
              <ProductPrice productDetails={productDetails} />
              {((productData?.type_id === "simple" &&
                productData?.AvailablePromotions?.length > 0) ||
                (productData?.type_id !== "simple" &&
                  productDetails?.AvailablePromotions?.length > 0) ||
                productData?.free_items_offers) && (
                <Box
                  width={isMobile ? "100%" : "90%"}
                  sx={{ marginTop: isMobile ? "10px" : "20px" }}
                  ref={scroll}>
                  <AvailableOffers
                    offers={[
                      {
                        description: productData?.free_items_offers
                          ?.replace("<p>", "")
                          ?.replace("</p>", ""),
                      },
                      { ...productData?.freeProduct },
                      ...(productData?.type_id === "simple"
                        ? productData?.AvailablePromotions
                        : productDetails?.AvailablePromotions),
                    ]}
                    key={JSON.stringify(
                      productData?.type_id === "simple"
                        ? productData?.AvailablePromotions
                        : productDetails?.AvailablePromotions
                    )}
                    InnerOffersTitle={true}
                    OuterOffersTitle={false}
                    showKnowMore={false}
                    reff={scroll}
                    toggle={false}></AvailableOffers>
                </Box>
              )}
              <PdpVariants
                productData={productData}
                isMobile={isMobile}
                handleClick={handleClick}
                selectedColor={selectedColor}
                checkOutOfStock={checkOutOfStock}
                updateColor={updateColor}
                colorList={colorList}
                anchorEl={anchorEl}
                fetchColors={fetchColors}
                open={open}
                handleClose={handleClose}
                sizeList={sizeList}
                fetchSizes={fetchSizes}
                selectedSize={selectedSize}
                productDetails={productDetails}
              />
              <>
                {psd?.status !== "Out Of Stock" ? (
                  !isMobile &&
                  (apiQuantityProduct !== null &&
                  apiQuantityProduct !== undefined &&
                  apiQuantityProduct < 1 ? (
                    <Box>
                      {/* Add to Cart button */}
                      <AddCartButton
                        onClick={() => {
                          if (
                            !cookie.get("accessToken") &&
                            userDataItems?.storeMode
                          ) {
                            setSignInOpen(true);
                          } else {
                            addToCart();
                          }
                          // handleStockCheck()
                          // triggerAddToCartEvent(productData)
                        }}
                        disabled={productData?.is_out_of_stock}>
                        <ButtonTypography color="black">
                          {ADD_TO_CART}
                        </ButtonTypography>
                      </AddCartButton>
                      {!userDataItems?.storeMode && (
                        <StyledButton
                          // className={styles.Styled_Button_Cart}
                          variant="outlined"
                          onClick={() => {
                            buyNowHandle();
                            callCartEvent(
                              "add_to_cart",
                              productData,
                              "na",
                              BUY_NOW_LABEL,
                              component?.id,
                              getProductLink(),
                              1,
                              { product: { ...productDetails } }
                            );
                            pdpcartUpdatedEvent(
                              productData,
                              productData?.brand_info,
                              getProductLink()
                            );
                          }}
                          disabled={productData?.is_out_of_stock}>
                          <ButtonTypography>{BUY_NOW_LABEL}</ButtonTypography>
                        </StyledButton>
                      )}
                    </Box>
                  ) : (
                    <Box>
                      {/* Increment and Decrement buttons */}
                      <Box style={{ marginTop: "1.2rem", minWidth: "150px" }}>
                        <DecrementButton
                          onClick={handleDecrement}
                          variant="contained">
                          −
                        </DecrementButton>
                        <Input
                          className={styles.input_field_inc_dec}
                          style={{
                            width: "10.5%",
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
                          // onMouseUp={handleInputChange}
                          onChange={handleInputChange}
                        />
                        <IncrementButton
                          onClick={handleIncrement}
                          variant="contained">
                          +
                        </IncrementButton>
                        {!userDataItems?.storeMode && (
                          <StyledButton
                            className={styles.Styled_Button_Cart}
                            variant="outlined"
                            onClick={() => {
                              buyNowHandle();
                              callCartEvent(
                                "add_to_cart",
                                productData,
                                "na",
                                BUY_NOW_LABEL,
                                component?.id,
                                getProductLink(),
                                1,
                                { product: { ...productDetails } }
                              );
                              pdpcartUpdatedEvent(
                                productData,
                                productData?.brand_info,
                                getProductLink()
                              );
                            }}
                            disabled={productData?.is_out_of_stock}>
                            <ButtonTypography>{BUY_NOW_LABEL}</ButtonTypography>
                          </StyledButton>
                        )}
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={{ display: "flex", gap: notify ? "14px" : "0px" }}>
                    {!isMobile && (
                      <AddCartButton disabled>
                        <ButtonTypography color="black">
                          {OUT_OF_STOCK}
                        </ButtonTypography>
                      </AddCartButton>
                    )}
                    <BasicModal
                      width={isMobile ? "100%" : "570px"}
                      top="50%"
                      left="50%"
                      handleOpen={notifyOpen}
                      handleClose={notifyClose}
                      open={notifyPopUp}
                      Component={<NotifyContent notifyClose={notifyClose} />}
                    />
                    {notify ? (
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "25px",
                          alignItems: "flex-end",
                        }}>
                        <Input
                          placeholder="Enter Email ID To Get Notified"
                          fullWidth
                          id="fullWidth"
                          onChange={(e) => {
                            setEmailID(e.target.value);
                          }}
                          sx={{ width: isMobile ? "100%" : "18vw" }}
                        />
                        <NotifySubmit
                          sx={{
                            opacity: emailID == "" ? "0.4" : "unset",
                          }}
                          onClick={() => {
                            emailID != "" && handleNotifyME();
                          }}>
                          {SUBMIT_LABEL}
                        </NotifySubmit>
                        <ErrorIcon
                          sx={{
                            fontSize: "medium",
                            color: "#EB5757",
                            display: "none",
                          }}
                        />
                      </Box>
                    ) : (
                      <StyledButton
                        style={{
                          border: "0px",
                          gap: "10px",
                          textTransform: "none",
                          paddingLeft: isMobile ? "0px" : "17px",
                          justifyContent: "flex-start",
                        }}
                        variant="outlined"
                        onClick={() => {
                          setNotify(true);
                          WeebEngageNotifyMeEvent(
                            productDetails,
                            "notify_me_click"
                          );
                        }}>
                        <NotificationsIcon />
                        <NotifyMe>{NOTIFY_TEXT}</NotifyMe>
                      </StyledButton>
                    )}
                  </Box>
                )}
              </>
            </Box>
          </Grid>
          {isMobile && (
            <PdpAdvantages component={component} productData={productData} />
          )}
          {userDataItems.storeMode ? (
            <DeliveryPickup
              data={productData}
              psd={psd}
              setPsd={setPsd}
              mode={mode}
              setMode={setMode}
              productDetails={productDetails}
              userDataItems={userDataItems}
              setUserDataItems={setUserDataItems}
              typeOfDelivery={typeOfDelivery}
              setTypeOfDelivery={setTypeOfDelivery}
            />
          ) : (
            <DeliveryPickupNew
              data={productData}
              psd={psd}
              setPsd={setPsd}
              mode={mode}
              setMode={setMode}
              productDetails={productDetails}
              userDataItems={userDataItems}
              setUserDataItems={setUserDataItems}
              typeOfDelivery={typeOfDelivery}
              setTypeOfDelivery={setTypeOfDelivery}
            />
          )}
        </Grid>
      )}
    </>
  );
};
export default PdpCardContent;