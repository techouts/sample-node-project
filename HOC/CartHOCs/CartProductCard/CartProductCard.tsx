import React, { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import styles from "../../../styles/Home.module.css";

import {
  OfferPercent,
  OfferPrice,
  ProductTitle,
  ProductCaption,
  RegularPrice,
  BorderBox,
  QuantityText,
  MenuSelectedShaded,
  ColorText,
  SmallText,
  StandardDeliveryBox,
  StandardDeliveryText,
  AppliedOfferBox,
  GridContainer,
  ProductImage,
  DecrementButton,
  IncrementButton,
} from "./Styles";
import { useMobileCheck } from "../../../utility/isMobile";
import { Box } from "@mui/system";
import BasicModal from "../../Modal/ModalBlock";
import {
  OfferView,
  RemoveItemFromCart,
} from "../../../components/CartLayout/FreeSampleModal/FreeSampleModalpopUp";
import { UPDATE_ITEM_FROM_CART } from "../../../graphQLQueries/UpdateProduct";
import { REMOVE_ITEM_FROM_CART } from "../../../graphQLQueries/RemoveItemsFromCart";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { DateFormate } from "../../../utility/DateFormate";
import useStorage from "../../../utility/useStoarge";
import client from "../../../apollo-client";
import { Cookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../../../recoilstore";
import { handleWishList } from "../../../api/Cart/CartProductsOperations";
import {
  ACCESS_TOKEN,
  COD_NOT_AVAILABLE,
  EXPRESS_CUSTOM_TEXT,
  EXPRESS_DELIVERY,
  MOVE_TO_WISHLIST,
  NOT_SERVICABLE,
  OUT_OF_STOCK,
  PAY_AND_PICK,
  QUANTITY,
  REMOVE_FROM_CART,
  REMOVE_ITEM,
  REMOVE_MODAL_SUBTITLE,
  STANDARD_DELIVERY,
  STANDARD_DELIVERY_APPLIED,
  TOAST_CART_PRODUCT_ADD_WISHLIST,
  TOAST_CART_PRODUCT_REMOVE,
  TOAST_CART_PRODUCT_UPDATE_QUANITY,
} from "../../../utility/Constants";
import {
  callAddwishlistEvent,
  callSelectItem,
  removeFromCartEvent,
} from "../CartProductCardAnalytic";
import {
  cartUpdatedEvent,
  wishlistUpdatedEvent,
} from "../../../utility/GaEvents";
import { pdpRedirecion } from "../../../utility/PdpRedirection";
import { ContactedGraphqlUrl } from "../../../utility/MagentoImageUrlConcatConstant";
import { PRODUCT_FALLBACK_URL } from "../../ProductCard/Constants";
import { AppIcons } from "../../../utility/AppIconsConstant";
import {
  CART_TRUCK_ICON,
  COD_ICON,
  DELETE_ICON,
  DOWN_ARROW_ICON,
  EMPTY_WISHLIST_COLOUR,
  Error_Image,
} from "../../../utility/AppIcons";
import router from "next/router";
import { Percentage } from "./Logos";
import { onImageError } from "../../../utility/onImageError";
import CartCarousel from "../../../components/Cart/CarouselTabs/CartCarousel";
import { CommonRegexes } from "../../../utility/Regex";
import productServiceability from "../../../utility/productServiceability";
import { pinCodeBasedCoordinates } from "../../../utility/GeoAPI";
import { fetchCartDetails } from "../../../api/Cart/CustomerCart";
import handleErrorResponse from "../../../utility/ErrorHandling";
import { quantitycartUpdatedEvent } from "../../../utility/WebEngageEvents";
import WarningIcon from "@mui/icons-material/Warning";
import { fetchExploreStoreModeServiceability } from "../../../graphQLQueries/checkStoreAvailabilityForHLD";

export const CartProductCard = ({
  product,
  setLoader,
  productIndex,
  GetCartDetails,
  displayLoader,
  handleSnackBar,
  handleError,
  productReadMode,
  deliveryTag,
  setSignInOpen,
  updateCartSuggestions = () => {},
  currentServiceableStore,
}: any) => {
  const isMobile = useMobileCheck();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const dropDownQuantity = Array.from({ length: 10 }, (_, i) => i + 1);
  const [selectedquantity, setSelectedQuantity] = useState(product?.quantity);
  const [offerViewModalOPen, setOfferViewModalOPen] = useState(false);
  const [quantityTenPlus, setQuantityTenPlus] = useState<any>();
  const [removeCart, setRemoveCart] = useState(-1);
  const [productNameForURL, setProductNameForURL] = useState("");
  const [quantityProduct, setQuantityProduct] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0); // Specify the type as number
  const [tempQuantity, setTempQuantity] = useState<number>(); // Specify the type as string

  let updatedQuantity: number;

  const { getItem } = useStorage();
  const [pincode, setPincode] = useState<any>(getItem("pincode", "local"));
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");
  const [psd, setPsd] = useState<any>({
    sd: false,
    ed: false,
    cc: false,
  });
  console.log(psd,"psd")
  const errorImage = AppIcons(Error_Image);
  const [productTag, setProductTag] = useState<string | null>(null);
  useEffect(() => {
    setProductNameForURL(
      product?.product?.name?.toLowerCase()?.replace(/ /g, "-")
    );
    if (product?.product?.stock_status == "IN_STOCK") {
      if (psd?.sd || psd?.cc || psd?.ed) {
        if (product?.product?.cod_available) {
          setProductTag(null);
        } else {
          setProductTag(COD_NOT_AVAILABLE);
        }
      } else if (
        cartStore?.serviceability?.sd !== undefined &&
        cartStore?.serviceability?.ed !== undefined &&
        cartStore?.serviceability?.cc !== undefined
      ) {
        setProductTag(NOT_SERVICABLE);
      }
    } else {
      setProductTag(OUT_OF_STOCK);
    }
  }, [psd, product]);

  useEffect(() => {
    if (userDataItems?.storeMode && userDataItems?.storeModeType === "cc") {
      const ccProductServiceabilityDetails =
        cartStore?.serviceableProducts?.cc?.filter((prod: any) =>
          product?.configured_variant?.sku
            ? prod?.sku == product?.configured_variant?.sku
            : prod?.sku == product?.product?.sku
        );
      updatePsd(ccProductServiceabilityDetails);
    } else {
      console.log(cartStore?.serviceableProducts?.non_cc,"data 999>>>>")
      const nonccProductServiceabilityDetails =
        cartStore?.serviceableProducts?.non_cc?.filter((prod: any) =>
          product?.configured_variant?.sku
            ? prod?.sku == product?.configured_variant?.sku
            : prod?.sku == product?.product?.sku
        );
      updatePsd(nonccProductServiceabilityDetails);
      if (cartStore?.serviceabilityStores?.length > 0) {
        setPsd((prvData: any) => ({
          ...prvData,
          cc: cartStore?.serviceabilityStores?.[0],
        }));
      } else {
        setPsd((prvData: any) => ({
          ...prvData,
          cc: false,
        }));
      }
    }
  }, [cartStore?.serviceability, cartStore?.serviceableProducts]);

  function updatePsd(data: any) {
    if (data?.length > 0) {
      checkServiceability(data);
    } else {
      setPsd((prvData: any) => ({
        ...prvData,
        ed: false,
        sd: false,
      }));
    }
  }

  useEffect(() => {
    setQuantity(product?.quantity);
    updatedQuantity = product?.quantity;
  }, [product]);
  //set quantity

  useEffect(() => {
    updatedQuantity = quantity;
  }, [quantity]);

  const isDisabled =
    userDataItems?.storeMode && userDataItems?.storeModeType === "cc"
      ? currentServiceableStore !== userDataItems?.storeCode
      : false;

  function findProductQuantityInCart(selectedProductData: any, cartData: any) {
    const productSku = selectedProductData?.configured_variant?.sku;
    // Check if the product is in the cart
    if (cartData !== undefined) {
      const cartItem = cartData?.data?.cart?.items?.find((item: any) => {
        return item?.configured_variant?.sku === productSku;
      });
      setQuantity(cartItem.quantity);
      if (cartItem) {
        console.log(
          `Product "${selectedProductData?.product?.name}" with SKU "${productSku}" is present in the cart with quantity: ${cartItem.quantity}`
        );
      } else {
        console.log(
          `Product "${selectedProductData?.product?.name}" with SKU "${productSku}" is not present in the cart.`
        );
      }
    }
  }

  const fetchCartData = async (selectedProductData: any) => {
    const cartID = getItem("BuyNowCartID", "local")
      ? getItem("BuyNowCartID", "local")
      : getItem("cartID", "local");
    try {
      const cartData = await fetchCartDetails(cartID);
      findProductQuantityInCart(selectedProductData, cartData);
    } catch (error) {
      console.error("Error fetching cart details", error);
    }
  };

  
  
  

  
  const deliveryMode = (mode: any) => {
    if (mode?.deliveryMode === "ED") {
      mode?.serviceableStores?.map((store: any) => {
        if(store?.DeliveryDate){
          setPsd((prvData: any) => ({
            ...prvData,
            ed:{
              edd:store?.DeliveryDate
            },
          }));
        } else {
          setPsd((prvData: any) => ({
            ...prvData,
            ed: false,
          }));
        }
      });
    }else {
      setPsd((prvData: any) => ({
        ...prvData,
        ed: false,
      }));
    }
    if (mode?.deliveryMode === "SD") {
      mode?.serviceableStores?.map((store: any) => {
        if(store?.DeliveryDate){
          setPsd((prvData: any) => ({
            ...prvData,
            sd:{
              edd:store?.DeliveryDate
            },
          }));
        }else {
          setPsd((prvData: any) => ({
            ...prvData,
            sd: false,
          }));
        }
      });
    }
  };

  const checkServiceability = (data: any) => {
    console.log("data 999",data)
    if (data) {
      data?.[0]?.fulfillments?.map((fulfillment: any) => {
        if (fulfillment?.type === "HD") {
          fulfillment?.deliveryModeEDDs?.map((mode: any) => {
            console.log(mode,"mode")
            deliveryMode(mode);
          });
        } else if (fulfillment?.type === "CC") {
          setPsd((prvData: any) => ({
            ...prvData,
            cc: fulfillment?.store,
          }));
        }
      });
    } else {
      setPsd((prvData: any) => ({
        ...prvData,
        cc:false,
        ed: false,
        sd: false,
      }));
    }
  };
  const handleCloseofferView = () => {
    setOfferViewModalOPen(false);
  };
  const handleCloseRemoveCart = () => {
    setRemoveCart(-1);
  };
  const open1 = Boolean(anchorE2);

  const UpdateTheQuantity = async (
    value: number,
    uid: string,
    productData: object,
    updateType?:string
  ) => {
    const quantityValue = Math.abs(value - product.quantity);
    if (updatedQuantity === null || updatedQuantity === undefined) {
      console.warn("Invalid quantity. Skipping API call.");
      return;
    }
    setLoader(true);
    let serviceabilityResponse: any = false;
    const sku =
      (productData as any)?.product?.type_id === "simple"
        ? (productData as any)?.product?.sku
        : (productData as any)?.configured_variant?.sku;
    if (userDataItems?.storeMode && userDataItems?.storeModeType === "cc") {
      const res = await fetchExploreStoreModeServiceability([
        {
          deliveryMode: "pick",
          quantity: 1,
          sku: sku,
          storeId: `${userDataItems?.storeCode}`,
        },
      ]);
      serviceabilityResponse =
        res?.data?.checkStoreAvailabilityForHLD?.status === "Serviceable";
    } else {
      const newPincode = getItem("changedCartPincode", "local");
      let selectedPincode =
        newPincode !== undefined && newPincode === pincode
          ? newPincode
          : pincode;
      const pincodeResponse = await pinCodeBasedCoordinates(selectedPincode);

      setDisable(true);
      serviceabilityResponse = await productServiceability(
        parseFloat(pincodeResponse.latitude),
        parseFloat(pincodeResponse.longitude),
        selectedPincode,
        sku
      );
    }

    if (
      serviceabilityResponse &&
      updatedQuantity !== null &&
      updatedQuantity !== undefined
    ) {
      await client
        .mutate({
          mutation: UPDATE_ITEM_FROM_CART,
          variables: {
            cartId: `${getItem("cartID", "local")}`,
            cartItemUid: uid,
            productQuantity: Number(updatedQuantity),
          },
        })
        .then((res) => {
          const hasError = handleErrorResponse(res?.data?.updateCartItems); //response checking
          if (hasError) return null;
          if (res?.data?.updateCartItems !== null) {
            setSelectedQuantity(value);
            setDisable(false);
            GetCartDetails(
              TOAST_CART_PRODUCT_UPDATE_QUANITY,
              res?.data?.updateCartItems
            );
            let cartData = {
              ...cartStore,
              cartItems: res?.data?.updateCartItems,
            };
            quantitycartUpdatedEvent(cartData);
            removeFromCartEvent(
              cartData,
              res?.data?.updateCartItems?.cart?.items?.filter(
                (dataSku: any) => {
                  return (
                    dataSku?.configured_variant?.sku ===
                      product?.configured_variant?.sku ||
                    dataSku?.product?.sku === product?.product?.sku
                  );
                }
              )?.[0],
              "Quantity Updated",
              updateType=='increment'?'adding':'removing'
            );
          }
        })
        .catch((err) => {
          fetchCartData(productData);
          console.log("err", err);
          setLoader(false);
          handleError(
            "Could not update the product.The requested qty is not available"
          );
        });
    } else {
      setLoader(false);
      setProductTag(OUT_OF_STOCK);
    }
    setQuantityTenPlus(null);
    handleCloseQuantity();
  };

  function OnRemoveProductHandler(uid: string) {
    setLoader(true);
    client
      .mutate({
        mutation: REMOVE_ITEM_FROM_CART,
        variables: {
          cartId: `${getItem("cartID", "local")}`,
          cartItemUid: uid,
        },
      })
      .then(async (response) => {
        const hasError = handleErrorResponse(
          response?.data?.removeItemFromCart
        ); //response checking
        if (hasError) return null;
        cookie.set(
          "userCartCount",
          response?.data?.removeItemFromCart?.cart?.total_quantity,
          {
            path: "/",
            sameSite: true,
            secure: true,
          }
        );
        userDataItems &&
          setUserDataItems({
            ...userDataItems,
            userCartCount:
              response?.data?.removeItemFromCart?.cart?.total_quantity,
          });
        cartUpdatedEvent(response);
        // removeFromCartEvent(cartStore, product, "remove_from_cart","removing");
        await GetCartDetails(
          cookie.get(ACCESS_TOKEN)
            ? TOAST_CART_PRODUCT_ADD_WISHLIST
            : TOAST_CART_PRODUCT_REMOVE,
          response?.data?.removeItemFromCart
        );
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        handleError(err?.message);
      });
  }

  function handleClickMoveToWishlist(product: any) {
    if (cookie.get("accessToken")) {
      setLoader(true);
      const addToWishlist = async () => {
        const response: any = await handleWishList(
          product?.product?.__typename,
          product?.configured_variant?.sku,
          product?.product?.sku
        );
        if (response?.data?.addProductsToWishlist != null) {
          
          setUserDataItems({
            ...userDataItems,
            userWishListCount:
              response?.data?.addProductsToWishlist?.wishlist?.items_count,
          });
          cookie.set(
            "userWishListCount",
            response?.data?.addProductsToWishlist?.wishlist?.items_count,
            {
              path: "/",
              sameSite: true,
            }
          );
          OnRemoveProductHandler(product?.uid);
          updateCartSuggestions(
            "Add From Wishlist",
            response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items,
            CartCarousel,
            "/account/wishlist"
          );
          callAddwishlistEvent(
            cartStore,
            product,
            "add_to_wishlist",
            productIndex
          );
          wishlistUpdatedEvent(response);
        } else {
          setLoader(false);
        }
      };
      addToWishlist();
    } else {
      setSignInOpen(true);
      setLoader(false);
    }
    handleCloseRemoveCart();
  }

  const handleClickQuantity = (event: any) => {
    setSelectedQuantity(event?.currentTarget);
    setAnchorE2(event?.currentTarget);
  };
  const handleCloseQuantity = () => {
    setAnchorE2(null);
  };

  const Delete_icon = AppIcons(DELETE_ICON);
  const CartTruckImage = AppIcons(CART_TRUCK_ICON);
  const CODImage = AppIcons(COD_ICON);
  const Wishlist_Empty_Colour = AppIcons(EMPTY_WISHLIST_COLOUR);
  const ArrowDown = AppIcons(DOWN_ARROW_ICON);
  const isStoreModeCC = userDataItems.storeMode && userDataItems.storeModeType === "cc"

  const getProductImage = (productImageURL: string) => {
    if (productImageURL) {
      try {
        let domain = new URL(productImageURL);
        if (domain.origin) {
          return `${ReplaceImage(productImageURL)}`;
        }
      } catch (e) {
        return `${ReplaceImage(ContactedGraphqlUrl + productImageURL)}`;
      }
    } else {
      return `${ReplaceImage(PRODUCT_FALLBACK_URL)}`;
    }
  };

  const getOffersCount = () => {
    const sku = product?.configured_variant?.sku
      ? product?.configured_variant?.sku
      : product?.product?.sku;
    return cartStore?.cartItems?.cart?.item_level_promotions?.filter(
      (data: any) => {
        return data?.sku === sku;
      }
    )?.[0]?.pmrRules?.length;
  };

  const getPmrDiscountPrice = () => {
    const sku = product?.configured_variant?.sku
      ? product?.configured_variant?.sku
      : product?.product?.sku;
    return cartStore?.cartItems?.cart?.item_level_promotions?.filter(
      (data: any) => {
        return data?.sku === sku;
      }
    )?.[0];
  };

  const simpleProduct = () => {
    if (isMobile) {
      if (product?.product.type_id === "simple") {
        window.location.assign(
          pdpRedirecion(
            product?.product?.sku,
            product?.product?.type_id,
            productNameForURL
          )
        );
      } else {
        window.location.assign(
          pdpRedirecion(
            product?.product?.sku,
            product?.product?.type_id,
            productNameForURL,
            product?.configured_variant?.color,
            product?.configured_variant?.size
          )
        );
      }
    } else {
      window.open(
        product?.product.type_id === "simple"
          ? pdpRedirecion(
              product?.product?.sku,
              product?.product?.type_id,
              productNameForURL
            )
          : pdpRedirecion(
              product?.product?.sku,
              product?.product?.type_id,
              productNameForURL,
              product?.configured_variant?.color,
              product?.configured_variant?.size
            )
      );
    }
  };
  const handleClickHandler = () => {
    if (
      !isDisabled &&
      productTag !== OUT_OF_STOCK &&
      !product?.mp_free_gifts?.is_free_gift
    ) {
      let callSelecItem = "";
      if (product?.configured_variant?.name) {
        callSelecItem = product?.configured_variant?.name;
      } else {
        callSelecItem = product?.product?.name;
      }
      let productType = "";
      if (product?.product.type_id === "simple") {
        productType = pdpRedirecion(
          product?.product?.sku,
          product?.product?.type_id,
          productNameForURL
        );
      } else {
        productType = pdpRedirecion(
          product?.product?.sku,
          product?.product?.type_id,
          productNameForURL,
          product?.configured_variant?.color,
          product?.configured_variant?.size
        );
      }
      callSelectItem(
        cartStore,
        product,
        "select_item",
        callSelecItem,
        productIndex,
        `${window.location.origin}${productType}`,
        router?.asPath
      );
      simpleProduct();
    }
  };

  const [cartQuantity, setCartQuantity] = useState("");

  const onChangeCartQuantity = (val: string) => {
    if (val.length === 0) {
      setCartQuantity("");
    } else if (CommonRegexes.numeric.test(val)) {
      if ((val.length === 1 && val !== "0") || val.length > 1) {
        setCartQuantity(val);
      }
    }
  };

  const [disAble, setDisable] = useState(false);

  const handleDecrement = (value: number, sku: string, productData: object) => {
    if (isStoreModeCC || (productTag !== "out of stock" && productTag !== "not deliverable")) {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        updatedQuantity = quantity - 1;
      }
      if (updatedQuantity > 0) {
        UpdateTheQuantity(value, sku, productData,'decrement');
      }
    }
  };

  const handleIncrement = (value: number, sku: string, productData: object) => {
    if (productTag !== "out of stock" && productTag !== "not deliverable") {
      if (quantity < 9999) {
        setQuantity(quantity + 1);
        updatedQuantity = quantity + 1;
      }
      if (updatedQuantity != 0 && quantity < 9999) {
        UpdateTheQuantity(value, sku, productData,'increment');
      }
    }
  };

  const handleInputChange = (
    event: any,
    value: number,
    sku: string,
    productData: object
  ) => {

    if (isStoreModeCC || (productTag !== "out of stock" && productTag !== "not deliverable")) {
      const newValue = event?.target?.value;
      // Check if the input is empty or non-numeric
      if (newValue?.trim() === "" || isNaN(newValue)) {
        // Handle invalid input or empty input by setting tempQuantity
        updatedQuantity = 0;
        setQuantity(0);
      } else {
        //Update tempQuantity with the new input value
        // updatedQuantity = newValue;
        const parsedValue = parseFloat(newValue);
        //Check if the parsed value is a valid number and greater than or equal to 1
        if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 9999) {
          updatedQuantity = parsedValue;
          setQuantity(parsedValue);
        }
      }
    }
  };

  const handleInputLeave = (
    value: number,
    sku: string,
    productData: object
  ) => {
    if (isStoreModeCC || (productTag !== "out of stock" && productTag !== "not deliverable")) {
      if (quantity === 0) {
        updatedQuantity = 1;
        setQuantity(1);
        UpdateTheQuantity(value, sku, productData); //api call on input
      }
      if (!isNaN(quantity) && quantity >= 1 && quantity <= 9999) {
        UpdateTheQuantity(value, sku, productData); //api call on input
      }
    }
  };

  const showDeliveryModeOptions = useMemo(() => {
    if (userDataItems?.storeMode) {
      if (userDataItems?.storeModeType === "cc") {
        return false;
      } else if (userDataItems?.storeModeType === "sd") {
        return psd?.sd;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }, [userDataItems?.storeMode, userDataItems?.storeModeType]);
  console.log('showDeliveryModeOptions', showDeliveryModeOptions)

  return (
    <Box sx={{ position: "relative" }}>
      <BorderBox
        isMobile={isMobile}
        data-item-type={"CartProductCard"}
        data-product-id={product?.product?.id || ""}
        sx={{ opacity: 1 }}
      >
        {deliveryTag ? (
          <>
            {deliveryTag == "SD" && (
              <StandardDeliveryBox isMobile={isMobile}>
                <StandardDeliveryText
                  onClick={() => !isDisabled && setOfferViewModalOPen(true)}
                >
                  {STANDARD_DELIVERY_APPLIED}
                </StandardDeliveryText>
              </StandardDeliveryBox>
            )}
          </>
        ) : (
          <>
            {getOffersCount() > 0 && (
              <AppliedOfferBox isMobile={isMobile}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing="4px">
                    <Percentage></Percentage>
                    <SmallText>
                      {getOffersCount()}{" "}
                      {getOffersCount() > 1 ? "Offers" : "Offer"}
                      &nbsp;Applied
                    </SmallText>
                  </Stack>
                  <ColorText
                    onClick={() => !isDisabled && setOfferViewModalOPen(true)}
                  >
                    View
                  </ColorText>
                </Stack>
              </AppliedOfferBox>
            )}
          </>
        )}
        <GridContainer isMobile={isMobile} container>
          <ProductImage
            isMobile={isMobile}
            item
            xs={12}
            sm={2}
            md={2}
            textAlign="center"
            sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
          >
            <img
              style={{
                cursor:
                  productTag !== OUT_OF_STOCK &&
                  !product?.mp_free_gifts?.is_free_gift
                    ? "unset"
                    : "pointer",
              }}
              src={getProductImage(
                product?.configured_variant?.image
                  ? product?.configured_variant?.image?.url
                  : product?.product?.image?.url
              )}
              onError={(e: any) => onImageError(e, errorImage)}
              alt="productImg"
              width="100%"
              height="100%"
              onClick={handleClickHandler}
            ></img>
            {!displayLoader && (
              <>
                {!productTag ? null : (
                  <Box
                    sx={{
                      background: "#1C191A",
                      opacity: " 0.7",
                      height: "36px",
                      position: "absolute",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      top: "65%",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "#FFFFFF",
                        width: "100%",
                        textTransform: "uppercase",
                      }}
                    >
                      {!userDataItems.storeMode ? productTag : "Not Available"}
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </ProductImage>
          <Grid item xs={12} sm={10} md={10}>
            <Stack spacing="10px">
              <Stack
                direction={"row"}
                gap="6px"
                justifyContent={"space-between"}
              >
                <ProductTitle
                  $isReadOnly={productReadMode}
                  $isMobile={isMobile}
                  $disable={
                    productTag !== OUT_OF_STOCK &&
                    !product?.mp_free_gifts?.is_free_gift
                      ? false
                      : true
                  }
                  onClick={async () => {
                    if (
                      !isDisabled &&
                      productTag !== OUT_OF_STOCK &&
                      !product?.mp_free_gifts?.is_free_gift
                    ) {
                      callSelectItem(
                        cartStore,
                        product,
                        "select_item",
                        product?.configured_variant?.name
                          ? product?.configured_variant?.name
                          : product?.product?.name,
                        productIndex,
                        `${window.location.origin}${
                          product?.product.type_id === "simple"
                            ? pdpRedirecion(
                                product?.product?.sku,
                                product?.product?.type_id,
                                productNameForURL
                              )
                            : pdpRedirecion(
                                product?.product?.sku,
                                product?.product?.type_id,
                                productNameForURL,
                                product?.configured_variant?.color,
                                product?.configured_variant?.size
                              )
                        }`,
                        router?.asPath
                      );

                      if (isMobile) {
                        if (product?.product.type_id === "simple") {
                          window.location.assign(
                            pdpRedirecion(
                              product?.product?.sku,
                              product?.product?.type_id,
                              productNameForURL
                            )
                          );
                        } else {
                          window.location.assign(
                            pdpRedirecion(
                              product?.product?.sku,
                              product?.product?.type_id,
                              productNameForURL,
                              product?.configured_variant?.color,
                              product?.configured_variant?.size
                            )
                          );
                        }
                      } else {
                        if (product?.product.type_id === "simple") {
                          window.open(
                            pdpRedirecion(
                              product?.product?.sku,
                              product?.product?.type_id,
                              productNameForURL
                            )
                          );
                        } else {
                          window.open(
                            pdpRedirecion(
                              product?.product?.sku,
                              product?.product?.type_id,
                              productNameForURL,
                              product?.configured_variant?.color,
                              product?.configured_variant?.size
                            )
                          );
                        }
                      }
                    }
                  }}
                >
                  {product?.configured_variant?.name
                    ? product?.configured_variant?.name
                    : product?.product?.name}
                </ProductTitle>
                {!productReadMode && isMobile && (
                  <img
                    src={`${ReplaceImage(Delete_icon?.url)}`}
                    alt="remove"
                    width="16px"
                    height="16px"
                    onClick={() => {
                      setRemoveCart(productIndex);
                    }}
                  ></img>
                )}
              </Stack>
              {product?.caption && (
                <ProductCaption>{product?.caption}</ProductCaption>
              )}
              {accessToken &&
                !product?.mp_free_gifts?.is_free_gift &&
                (productTag == "not deliverable" ||
                  productTag == "out of stock") &&
                (!userDataItems.storeMode ? (
                  <p
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "17px",
                      justifyContent: isMobile ? "center" : "start",
                      color: "#FF0000",
                    }}
                  >
                    Please remove or move to wishlist the item to place the
                    order
                  </p>
                ) : (
                  <>
                    <p
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "17px",
                        justifyContent: isMobile ? "center" : "start",
                        color: "#FF0000",
                      }}
                    >
                      Product not available at the store
                    </p>
                    <p
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "17px",
                        justifyContent: isMobile ? "center" : "start",
                        color: "#FF0000",
                      }}
                    >
                      Please remove or move to wishlist the item to place the
                      order
                    </p>
                  </>
                ))}
              {!accessToken &&
                !product?.mp_free_gifts?.is_free_gift &&
                (productTag == "not deliverable" ||
                  productTag == "out of stock") && (
                  <p
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "17px",
                      justifyContent: isMobile ? "center" : "start",
                      color: "#FF0000",
                    }}
                  >
                    Please remove the item to place the order
                  </p>
                )}

              {!product?.mp_free_gifts?.is_free_gift && (
                <Stack direction="row" gap={isMobile ? "10px" : "40px"}>
                  {!productReadMode &&
                  quantityTenPlus?.productUid == product?.uid &&
                  quantityTenPlus?.value >= 10 ? (
                    <></>
                  ) : (
                    <>
                      <Box>
                        <Box style={{ marginTop: "1.2rem", minWidth: "150px" }}>
                          <DecrementButton
                            disabled={disAble}
                            onClick={() => {
                                handleDecrement(
                                  updatedQuantity,
                                  product?.uid,
                                  product
                                );
                            }}
                            variant="contained"
                          >
                            −
                          </DecrementButton>
                          <Input
                            className={styles.input_field_inc_dec}
                            style={{
                              width: isMobile ? "33.5%" : "22.5%",
                              padding: "0.51rem", // Add padding for better aesthetics
                              // border: "1px solid red", // Add a border for clarity
                              borderRadius: "0.2rem",
                              fontSize: "14px",
                              letterSpacing: "0.04rem",
                              color: "#221D1D",
                              backgroundColor: "#F7F7F8",
                              outline: "none", // Remove the default input outline on focus
                              textAlign: "center",
                            }}
                            type="text"
                            inputProps={{ maxLength: 4 }}
                            name="quantity"
                            value={quantity}
                            onBlur={() => {
                              
                                handleInputLeave(
                                  updatedQuantity,
                                  product?.uid,
                                  product
                                );
                            }} // Triggered when the input loses focus
                            // onClick={(e)=>handleInputChange(e,updatedQuantity, product?.uid, product)}
                            onChange={(e) => {
                             
                                handleInputChange(
                                  e,
                                  updatedQuantity,
                                  product?.uid,
                                  product
                                );
                            }}
                            // disabled={productTag ==="OUT_OF_STOCK"?true:false}
                          />
                          <IncrementButton
                          onClick={() => {                            
                                handleIncrement(
                                  updatedQuantity,
                                  product?.uid,
                                  product
                                );
                            }}
                            variant="contained"
                            disabled={disAble}
                          >
                            +
                          </IncrementButton>
                        </Box>
                      </Box>
                    </>
                  )}
                </Stack>
              )}
              {showDeliveryModeOptions && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <img
                    src={`${ReplaceImage(CartTruckImage?.url)}`}
                    alt="SD-logo"
                    width="14px"
                    height="14px"
                  ></img>
                  <Typography
                    sx={{
                      fontSize: isMobile ? "11px" : "14px",
                      color: "#231F20",
                    }}
                  >
                    {psd?.sd
                      ? `${STANDARD_DELIVERY} by ${psd?.sd?.edd}`
                      : `${STANDARD_DELIVERY} is not available`}
                  </Typography>
                </Stack>
              )}
              {showDeliveryModeOptions && psd?.ed && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <img
                    src={`${ReplaceImage(CartTruckImage?.url)}`}
                    alt="ED-logo"
                    width="14px"
                    height="14px"
                  ></img>
                  <Typography
                    sx={{
                      fontSize: isMobile ? "11px" : "14px",
                      color: "#231F20",
                    }}
                  >
                      {EXPRESS_DELIVERY} by {psd?.ed?.edd}
                  </Typography>
                </Stack>
              )}
              
              {/* {showDeliveryModeOptions && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <img
                    src={`${ReplaceImage(CODImage?.url)}`}
                    alt="CC-logo"
                    width="14px"
                    height="14px"
                  />
                  <Typography
                    sx={{
                      fontSize: isMobile ? "11px" : "14px",
                      color: "#231F20",
                    }}
                  >
                    {cartStore?.serviceableProducts?.cc?.length !== 0 &&
                    cartStore?.cartItems?.cart?.items?.length ===
                      cartStore?.serviceableProducts?.cc?.length
                      ? `${PAY_AND_PICK} is  available`
                      : `${PAY_AND_PICK} is not available`}
                  </Typography>
                </Stack>
              )} */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {!product?.mp_free_gifts?.is_free_gift ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    {product?.prices && (
                      <OfferPrice>
                        {`₹${Math.round(
                          Number(
                            getPmrDiscountPrice()?.discount
                              ? product?.prices?.row_total?.value -
                                  getPmrDiscountPrice()?.discount
                              : product?.prices?.row_total?.value -
                                  product?.prices?.total_item_discount?.value
                          )
                        )}`}
                      </OfferPrice>
                    )}
                    {((getPmrDiscountPrice()?.discount &&
                      getPmrDiscountPrice()?.discount != 0) ||
                      (product?.prices &&
                        product?.prices?.total_item_discount?.value != 0)) && (
                      <>
                        <RegularPrice>
                          {`₹${Math.round(
                            Number(product?.prices?.row_total?.value)
                          )}`}
                        </RegularPrice>
                        <OfferPercent>
                          {`${Math.round(
                            getPmrDiscountPrice()?.discount
                              ? (getPmrDiscountPrice()?.discount /
                                  product?.prices?.row_total?.value) *
                                  100
                              : (product?.prices?.total_item_discount?.value /
                                  product?.prices?.row_total?.value) *
                                  100
                          )}% off`}
                        </OfferPercent>
                      </>
                    )}
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      sx={{
                        color: "#AD184C",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Free
                    </Typography>
                  </Stack>
                )}
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ marginRight: "10px" }}
                  alignItems="center"
                >
                  {!isMobile && !productReadMode && (
                    <>
                      {accessToken && !product?.mp_free_gifts?.is_free_gift && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            cursor: " pointer",
                            paddingRight: "29px",
                          }}
                          onClick={() => {
                            // if (!isDisabled) {
                            handleClickMoveToWishlist(product);
                            // }
                          }}
                        >
                          <img
                            src={`${ReplaceImage(Wishlist_Empty_Colour?.url)}`}
                            alt="remove image"
                            width="16px"
                          ></img>
                          <Typography
                            sx={{
                              color: "#AD184C",
                              fontSize: "14px",
                              lineHeight: "120%",
                              fontWeight: 400,
                              textDecoration: "underline",
                              textTransform: "capitalize",
                            }}
                          >
                            {MOVE_TO_WISHLIST}
                          </Typography>
                        </Box>
                      )}
                      <Box
                        onClick={() => {
                          // if (!isDisabled) {
                          setRemoveCart(productIndex);
                          // }
                        }}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={`${ReplaceImage(Delete_icon?.url)}`}
                          alt="remove image"
                          width="16px"
                        ></img>
                        <Typography
                          sx={{
                            color: "#231F20",
                            fontSize: "14px",
                            lineHeight: "120%",
                            fontWeight: 400,
                            textDecoration: "underline",
                          }}
                        >
                          {REMOVE_ITEM}
                        </Typography>
                      </Box>
                    </>
                  )}
                  {productIndex == removeCart && (
                    <BasicModal
                      top={"50%"}
                      width={isMobile ? "90%" : "36%"}
                      left={"50%"}
                      open={productIndex == removeCart}
                      handleClose={handleCloseRemoveCart}
                      widget_title={REMOVE_FROM_CART}
                      widget_description={REMOVE_MODAL_SUBTITLE}
                      component_id={product?.uid}
                      Component={
                        <RemoveItemFromCart
                          uid={product?.uid}
                          image={getProductImage(
                            product?.configured_variant?.image
                              ? product?.configured_variant?.image?.url
                              : product?.product?.image?.url
                          )}
                          handleCloseRemoveCart={handleCloseRemoveCart}
                          handleClickMoveToWishlist={handleClickMoveToWishlist}
                          product={product}
                          setLoader={setLoader}
                          GetCartDetails={GetCartDetails}
                          handleSnackBar={handleSnackBar}
                          handleError={handleError}
                          disableMovetoWishlist={
                            !product?.mp_free_gifts?.is_free_gift ? false : true
                          }
                          cartStore={cartStore}
                          productTag={productTag}
                          productIndex={productIndex}
                        />
                      }
                    ></BasicModal>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </GridContainer>
      </BorderBox>
      {offerViewModalOPen && (
        <BasicModal
          top={isMobile ? "75%" : "50%"}
          width={isMobile ? "100%" : "521px"}
          left={"50%"}
          height={"310px"}
          open={offerViewModalOPen}
          handleClose={handleCloseofferView}
          Component={
            <OfferView
              cartStore={cartStore}
              productSku={
                product?.configured_variant?.sku
                  ? product?.configured_variant?.sku
                  : product?.product?.sku
              }
            />
          }
        ></BasicModal>
      )}
    </Box>
  );
};
