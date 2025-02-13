import { useEffect, useRef, useState } from "react";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import Loader from "../../HOC/Loader/Loader";
import SignInComponent from "../SigninComponent/SignInComponent";
import { BootstrapDialog } from "../SigninComponent/SignInStyled";
import { useMobileCheck } from "../../utility/isMobile";
import { fetchCartDetails } from "../../api/Cart/CustomerCart";
import { pinCodeBasedCoordinates } from "../../utility/GeoAPI";
import productServiceability from "../../utility/productServiceability";
import { toast } from "../../utility/Toast";
import { useAppContext } from "../../context/userInfoContext";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import styles from "../../styles/Home.module.css";

import {
  BottomNav,
  StyledButtons,
  StyledGroup,
  StyledText,
  IncrementMobileButton,
  DecrementMobileButton
} from "../PdpCardComponent/pdcardstyle";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import { Cookies } from "react-cookie";
import client from "../../apollo-client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../../recoilstore";
import {
  ADD_CONFIGURABLE_PRODUCTS_TO_CART,
  ADD_SIMPLE_PRODUCTS_TO_CART,
} from "../../graphQLQueries/AddProductsToCart";
import {
  CreateEmptyCart,
  GETCUSTOMER_CART,
} from "../../graphQLQueries/CartQuery";
import { CREATE_BUYNOW_CART } from "../../graphQLQueries/Cart/BuyNowCart";
import { CART_ROUTE } from "../Header/Constants";
import { widget_type } from "../../utility/GAConstants";
import PdpCardCarousel from "../PdpCardComponent/PdpCardCarousel";
import ViewEvent from "../../utility/viewEvent";
import { REMOVE_PRODUCTS_FROM_WISHLIST } from "../../graphQLQueries/WhishList/RemoveProductsFromWishList";
import {
  addedToWishlistMessage,
  removedWishlistMessage,
} from "../ProductLayout/constants";
import { ADD_PRODUCTS_TO_WISHLIST } from "../../graphQLQueries/WhishList/AddProductsToWishList";
import PdpCardContent from "../PdpCardComponent/PdpCardContent";
import { callCartEvent,pdpRemoveWishlistEvent,pdpWishlistEvent,wishlistUpdatedEvent } from "../../utility/GaEvents";
import { CUSTOMER_WISHLIST } from "../../graphQLQueries/WhishList/WishListQuery";
import { TECHNICAL_ISSUE_TEXT } from "../../utility/Constants";
import { transformItemName } from "../../utility/urlGenerator";
import { createEmptyCart } from "../../api/Cart/CustomerCart";
import useStorage from "../../utility/useStoarge";
import { ADD_TO_CART } from "../PdpCardComponent/Constants";
import { UPDATE_ITEM_FROM_CART } from "../../graphQLQueries/UpdateProduct";
import handleErrorResponse from "../../utility/ErrorHandling";
import { PDPcartUpdatedEvent } from "../../utility/WebEngageEvents";
import { exploreModeAddToCartCheck, getCartItems } from "../../HOC/ProductCard/ProductCardUtils";
import UserInfoInterface from "../../schemas/userInfoAtom";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { ExploreUserConsent } from "../StoreSwitch/ExploreUserConsent";
import { BoxStyled } from "../OffersGrid/OffersGridStyles";
import { ExploreStoreUserConsentHandler } from "../StoreSwitch/ExploreStoreUserConsentHandler";

export default function PDPBlockComponent({
  productData,
  component,
  totalCount,
}: any) {

  const pDetails = productData?.items?.[0];
  const [productDetails, setProductDetails] = useState(pDetails);
  const [fetchValues, setFetchValues] = useState(false);

  const isMobile = useMobileCheck();
  const router = useRouter();
  const cookie = new Cookies();
  const { getItem , setItem} = useStorage();
  const [networkError, setNetworkError] = useState(false);
  const [networkErrorMessage, setNetworkErrorMessage] =
    useState("Network Error");
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [size, setSize] = useState(
    productData?.items?.[0]?.variants?.[0]?.size
  );
  const [color, setColor] = useState(
    productData?.items?.[0]?.variants?.[0]?.color
  );
  const [reRender, setReRender] = useState(false);
  const [CustomerID, setCustomerID] = useState(
    userDataItems ? userDataItems?.customerName : null
  );
  const [productID, setProductID] = useState(0);
  const [psd, setPsd] = useState<any>({
    status: "",
    sd: false,
    ed: false,
    cc: false,
  });
  const [typeOfDelivery, setTypeOfDelivery] = useState(userDataItems?.storeMode ?"Pay & Pickup":"Standard Delivery");
  const [pincode, setPincode] = useState(userDataItems?.pincode || "400050");
  const [mode, setMode] = useState(userDataItems?.storeMode ?"cc":"sd");
  const [displayLoader, setLoader] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [signInOpen, setSignInOpen] = useState(false);
  const [wishListedProducts, setWishListProducts] = useState<any>([]);
  const [wishListedProductData, setWishListProductData] = useState<any>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [cartDetails, setCartDetails] = useState();
  const [apiQuantityProduct, setApiQuantityProduct] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0); // Specify the type as number
  const [productUid, setProductUid] = useState();
  const [updatedCartDetails,setUpdatedCartDetails] = useState();
  const [openPopup, setPopup] = useState<boolean>(false);
  function handlePopUp() {
    setPopup(false);
  }

  let updatedQuantity: number;

  const userInfoContext = useAppContext();
  const { updateContextData } = userInfoContext;

  const handleClosed = () => {
    setSignInOpen(false);
  };
  useEffect(() => {
    setCustomerID(userDataItems ? userDataItems?.customerName : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (reRender) {
      setLoader(false);
      setSignInOpen(false);
    }
  }, [reRender]);

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
    const fetchCartData = async () => {
      const cartID = getItem("BuyNowCartID", "local")
        ? getItem("BuyNowCartID", "local")
        : getItem("cartID", "local");
      try {
        if(cartID){
          const cartData = await fetchCartDetails(cartID);
          // console.log("cartdata", cartData);
          setCartDetails(cartData);
        }
      } catch (error) {
        console.error("Error fetching PDPBlockComponent.tsx ", error);
      }
    };
    if(isMobile &&(getItem("BuyNowCartID", "local") ||
    getItem("cartID", "local"))){
    fetchCartData();
    }
   
  }, []); 
  useEffect(()=>{
    fetchCartData();
  },[productDetails,isMobile])

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
      if (updatedCartDetails == undefined && cartDetails!==undefined) {
         cartItem = cartDetails?.data?.cart?.items?.find((item: any) => {
          console.log("cartDetails",item?.configured_variant?.sku,productSku);
         
          return item?.configured_variant?.sku === productSku;
        });
        
      }else if (updatedCartDetails !== undefined ){
         cartItem = updatedCartDetails?.data?.cart?.items?.find((item: any) => {
          console.log("updatedCartDetails",item?.configured_variant?.sku,productSku);
          return item?.configured_variant?.sku === productSku;
        });
      }
      console.log("updatedCartDetails cartItem mobile",cartItem)
        if (cartItem) {
          console.log(
            `Product "${productDetails.name}" with SKU "${productSku}" is present in the cart with quantity: ${cartItem.quantity}`
          );
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
  }, [cartDetails,updatedCartDetails,productDetails]);

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
  const getProduct = () => {
    if (productData?.items?.[0]?.type_id === "simple") {
        return productData?.items?.[0];
    }

    const colorCode = router?.query?.colorCode?.toString();
    const size = router?.query?.size?.toString();
    const variants = productData?.items?.[0]?.variants || [];

    if (router?.asPath?.includes("colorCode") && router?.asPath?.includes("size")) {
        const matchingVariant = variants.find((variant:any) =>
            variant?.product?.color?.toString() === colorCode &&
            variant?.product?.size?.toString() === size
        );
        return matchingVariant?.product || variants[0]?.product;
    }

    if (router?.asPath?.includes("colorCode")) {
        const matchingVariant = variants.find((variant:any) =>
            variant?.product?.color?.toString() === colorCode
        );
        return matchingVariant?.product || variants[0]?.product;
    }

    if (router?.asPath?.includes("size")) {
        const matchingVariant = variants.find((variant:any) =>
            variant?.product?.size?.toString() === size
        );
        return matchingVariant?.product || variants[0]?.product;
    }

    return variants[0]?.product || productData?.items?.[0];
};

  useEffect(() => {
  setProductDetails(getProduct());  
    setSize(router?.query?.size);
    setColor(router?.query?.colorCode);
    setFetchValues(true);
  }, [router]);
  useEffect(() => {
    if (cookie.get("accessToken")) {
      client
        .mutate({
          mutation: CUSTOMER_WISHLIST,
          variables: {
            currentPage: 1,
            pageSize: 100,
          },
        })
        .then((res: any) => {
       const hasError =   handleErrorResponse(res?.data?.customer?.wishlists) //response checking
       if (hasError) return null;
          setWishListProducts(
            res?.data?.customer?.wishlists?.[0]?.items_v2?.items
          );
        })
        .catch((err: any) =>{ 
          toast.error("Someting went wrong, Please try again!!!");
          console.log(err)})
        .finally(() => { });
    }
  }, []);


  useEffect(() => {
    if (wishListedProducts?.length > 0) {
      setIsWishlisted(
        wishListedProducts?.filter(
          (item: any) => item?.product?.sku == productData?.items?.[0]?.sku
        )?.length > 0
      );
      setProductID(
        wishListedProducts?.find(
          (item: any) => item?.product?.sku == productData?.items?.[0]?.sku
        )?.id
      );
    }
  }, [productDetails, wishListedProducts]);

  const fetchCartData = async () => {
    const cartID = getItem("BuyNowCartID", "local")
      ? getItem("BuyNowCartID", "local")
      : getItem("cartID", "local");
    
    if ([null, "", undefined, "undefined"].includes(cartID)) return; 
    
    try {
      if(cartID){
        const cartData = await fetchCartDetails(cartID);
        // console.log("cartdata", cartData);
        setUpdatedCartDetails(cartData);
      }
    } catch (error) {
      console.error("Error fetching cart details ---> ../PdpCardContent.tsx", error);
    }
  };

  function handleAddToCartSuccessResponse(response: any) {
    const hasError = handleErrorResponse(response?.data); //response checking
    callCartEvent(
      "add_to_cart",
      productData?.items?.[0],
      "na",
      ADD_TO_CART,
      component?.id,
      getProductLink(),
      1,
      { product: { ...productDetails } },
      response
    );
    if (hasError) return null;
    const cartCount = userDataItems?.storeCode
      ? response?.data?.addConfigurableProductsToCartV2?.cart?.items?.length
      : response?.data?.addConfigurableProductsToCart?.cart?.items?.length ||
        response?.data?.addSimpleProductsToCart?.cart?.items?.length;
    cookie.set(
      "userCartCount",
      cartCount,
      {
        path: "/",
        sameSite: true,
        secure: true,
      }
    );
    fetchCartData();
    setUserDataItems({
      ...userDataItems,
      userCartCount:
      cartCount,
    });
    setLoader(false);
    setSnackBarOpen(true);
    setSnackMessage("Product successfully added to your cart");
    PDPcartUpdatedEvent(response);
  }

  async function handleProductToCartInCCMode() {
    const response = await exploreModeAddToCartCheck({
      cartId: getItem("cartID", "local") as string,
      skuID: `${productDetails?.sku}`,
      quantity: 1,
      parentID: `${productData?.items?.[0]?.sku}`,
      pincode: userDataItems?.storePincode,
      storeId: userDataItems?.storeCode,
      setSnackBarOpen: setSnackBarOpen,
      setSnackMessage: setSnackMessage,
    });
    handleAddToCartSuccessResponse(response);
    openPopup && handlePopUp();
  }

  const addProductToCart = async (cartID: string | null) => {
    if (userDataItems?.storeMode && userDataItems?.storeModeType === "cc") {
        const response = await exploreModeAddToCartCheck({
          cartId: cartID,
          skuID: `${productDetails?.sku}`,
          quantity: 1,
          parentID: `${productData?.items?.[0]?.sku}`,
          pincode: userDataItems?.storePincode,
          storeId: userDataItems?.storeCode,
          setSnackBarOpen: setSnackBarOpen,
          setSnackMessage: setSnackMessage
        });
        handleAddToCartSuccessResponse(response);
      setLoader(false);
    } else {
      client
        .mutate({
          mutation:
            productData?.items?.[0]?.__typename === "SimpleProduct"
              ? ADD_SIMPLE_PRODUCTS_TO_CART
              : ADD_CONFIGURABLE_PRODUCTS_TO_CART,
          variables: {
            cartID: cartID,
            skuID: `${productDetails?.sku}`,
            quantity: 1,
            parentID: `${productData?.items?.[0]?.sku}`,
          },
        })
        .then((response: any) => {
          handleAddToCartSuccessResponse(response);
        })
        .catch(async (errMessage: any) => {
          console.error(errMessage);
          const isCartNotFound = errMessage?.message?.includes(
            "Could not find a cart with ID"
          );
          if (isCartNotFound) {
            const isGuestUser = !!localStorage.getItem("accessToken") === false;
            if (isGuestUser) {
              const cartID = await createEmptyCart();
              localStorage.setItem("cartID", cartID);
              if (cartID) {
                addProductToCart(cartID);
              }
            }
          }
          setLoader(false);
          if (!isCartNotFound) {
            setNetworkErrorMessage(errMessage?.message ?? TECHNICAL_ISSUE_TEXT);
            setNetworkError(true);
          }
        });
    }
  };

  const fetchEmptyCart = () => {
    client
      .mutate({
        mutation: CreateEmptyCart,
      })
      .then((res) => {
        localStorage.setItem("cartID", res?.data?.createEmptyCart);
        addProductToCart(res?.data?.createEmptyCart);
      })
      .catch((err) => {
        toast.error("Someting went wrong, Please try again!!!");
        console.log(err)});
  };

  const handleAddToCart = () => {
    setLoader(true);
    if (cookie.get("accessToken")) {
      client
        .query({
          query: GETCUSTOMER_CART,
        })
        .then((res: any) => {
          if (res?.data?.customerCart?.id) {
            localStorage.setItem("cartID", res?.data?.customerCart?.id);
            addProductToCart(res?.data?.customerCart?.id);
          } else fetchEmptyCart();
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    } else {
      if (localStorage.getItem("cartID")) {
        addProductToCart(localStorage?.getItem("cartID"));
      } else {
        fetchEmptyCart();
      }
    }
  };

  const buyNowHandle = () => {
    setLoader(true);
    setCartStore((perviousData) => ({
      ...perviousData,
      currentDeliveryMode:
        typeOfDelivery === "Standard Delivery"
          ? "sd"
          : typeOfDelivery === "Express Delivery"
            ? "ed"
            : "cc",
    }));
    if (cookie.get("accessToken")) {
      client
        .mutate({
          mutation: CREATE_BUYNOW_CART,
          variables: {
            productQuantity: 1,
            productSku: productDetails?.sku,
            parentID: `${productData?.items?.[0]?.sku}`,
          },
        })
        .then(async (res) => {
          const hasError =    handleErrorResponse(res?.data?.createBuyNowCart?.cart_id) //response checking
          if (hasError) return null;
          await localStorage.setItem(
            "BuyNowCartID",
            res?.data?.createBuyNowCart?.cart_id
          );
          await setCartStore((previousData) => ({
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
          await setUserDataItems((previousData: any) => ({
            ...previousData,
            userCartCount: 1,
          }));
          await window.location.assign(CART_ROUTE);
        })
        .catch((err) => {
          toast.error("Someting went wrong, Please try again!!!");
          setLoader(false)});
    } else {
      setSignInOpen(true);
      setLoader(false);
    }
  };

  const addedToWishlist = async (
    productType: String,
    sku: String,
    parent_sku: String
  ) => {
    if (cookie.get("accessToken")) {
      setLoader(true);
     await client
        .mutate({
          mutation: ADD_PRODUCTS_TO_WISHLIST,
          variables: {
            WishListInput: [
              {
                sku: productType !== "SimpleProduct" ? sku : parent_sku,
                parent_sku: parent_sku,
                quantity: 1,
              },
            ],
          },
        })
        .then((response: any) => {
          cookie.set(
            "userWishListCount",
            response?.data?.addProductsToWishlist?.wishlist?.items_count,
            {
              path: "/",
              sameSite: true
            }
          );
          setUserDataItems({
            ...userDataItems,
            userWishListCount:
              response?.data?.addProductsToWishlist?.wishlist?.items_count,
          });
            const wishlistIndex =
              response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items
                ?.length - 1;
          setWishListProductData(
                  response?.data?.addProductsToWishlist?.wishlist?.items_v2
                    ?.items?.[wishlistIndex]
                );
          setWishListProducts(
            response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items
          );
          setSnackMessage(addedToWishlistMessage);
          setSnackBarOpen(true);
          pdpWishlistEvent("add_to_wishlist", response, getVariantDetails());
          wishlistUpdatedEvent(response, getVariantDetails());
          return response;
        })
        .catch((error: any) => {
          console.log(error);
          setNetworkErrorMessage(error?.message ?? TECHNICAL_ISSUE_TEXT);
          setNetworkError(true);
        })
        .finally(() => setLoader(false));
    } else {
      setSignInOpen(true);
    }
  };

  const removeFromWishList = () => {
    if (cookie.get("accessToken")) {
      setLoader(true);
      client
        .mutate({
          mutation: REMOVE_PRODUCTS_FROM_WISHLIST,
          variables: {
            wishListItemId: productID,
          },
        })
        .then((response) => {
          const hasError =    handleErrorResponse(response?.data) //response checking
          if (hasError) return null;
          if (
            response?.data?.removeProductsFromWishlist?.user_errors?.[0]
              ?.message
          ) {
            setNetworkErrorMessage(
              response?.data?.removeProductsFromWishlist?.user_errors?.[0]
                ?.message ?? TECHNICAL_ISSUE_TEXT
            );
            setNetworkError(true);
          } else {
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
                response?.data?.removeProductsFromWishlist?.wishlist
                  ?.items_count,
            });
            setSnackMessage(removedWishlistMessage);
            setWishListProducts(
              response?.data?.removeProductsFromWishlist?.wishlist?.items_v2
                ?.items
            );
             const filteredItem = wishListedProducts?.find(
             (cItem:any) => cItem?.id === productID
            );
            setSnackBarOpen(true);
            pdpRemoveWishlistEvent(
              "remove_from_wishlist",
              response,
              filteredItem
            );
            wishlistUpdatedEvent(response, getVariantDetails());
            return response;
          }
        })
        .catch((err) => {
          console.log(err);
          setNetworkErrorMessage(err?.message ?? TECHNICAL_ISSUE_TEXT);
          setNetworkError(true);
        })
        .finally(() => setLoader(false));
    }
  };

  const viewEventWrapper = useRef();
  const dataLayer = {
    item_id: productDetails?.sku,
    item_name: productDetails?.name,
    widget_type: widget_type,
    item_type: productDetails?.__typename,
    component_id: component?.id,
    widget_title: "na",
    widget_description: "na",
    widget_position: 1,
    no_of_items: 1,
    index: 1,
    view_items: [
      {
        item_id: productDetails?.sku,
        item_name: productDetails?.name,
        index: 1,
        item_brand: productDetails?.brand_info,
        item_category: productDetails?.category?.[0]?.name || "na",
        price: pDetails?.pmr_price_value?.amount?.value,
        original_price:
          pDetails?.price_range?.minimum_price?.regular_price?.value,
        quantity: productDetails?.product_count,
        item_rating: productDetails?.rating_summary,
        item_category2: productDetails?.category?.[1]?.name || "na",
        item_category3: productDetails?.category?.[2]?.name || "na",
        item_category5: productDetails?.category?.[2]?.name || "na",
        item_size: productDetails?.configurable_options?.label,
        item_deeplink_url: "na",
        item_image_link: productDetails?.image?.url,
      },
    ],
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

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
  
  useEffect(() => {
    updatedQuantity = quantity;
    // setTempQuantity(quantity?.toString());
    //handleStockCheck();
  }, [quantity]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updatedQuantity = quantity - 1;
    }
    if(updatedQuantity >0 ){
      handleStockCheck();
      
      }
  };

  const handleIncrement = () => {
    if (quantity < 9999) {
      setQuantity(quantity + 1);
      updatedQuantity = quantity + 1;
    }
    if(updatedQuantity !=0 && quantity < 9999){
      handleStockCheck();
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
      if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 9999) {
        updatedQuantity = parsedValue;
        setQuantity(parsedValue)
      } 
    }
  };

  const handleInputLeave = () => {
    if(quantity===0){
      updatedQuantity=1;
      setQuantity(1)
      handleStockCheck();//api call on input 
    }
    if (!isNaN(quantity) && quantity >= 1 && quantity <= 9999)  {
      handleStockCheck(); //api call on input 
    }
  };

  const handleStockavilability = async (productServiceability: any) => {
    if (!productServiceability) {
      setLoader(false);
      // setSnackBarOpen(true);
      // setSnackMessage("Product is Out of stock");
    } else {
      setLoader(false);
      if (
        apiQuantityProduct !== null &&
        apiQuantityProduct !== undefined &&
        apiQuantityProduct < 1
      ) {
        handleAddToCart();
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
              // console.log("hello UPDATE_ITEM_FROM_CART", res);
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
                fetchCartData();
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
              fetchCartData();
            });
        }
      }
    }
  };
    
  async function handleStockCheck() {
    setLoader(true);
    const pincodeResponse: any = await pinCodeBasedCoordinates((userDataItems?.storeMode ? userDataItems?.storePincode : pincode) as string );

    handleStockavilability(pincodeResponse);
  }


  return (
    <>
      {displayLoader && <Loader />}
      <CustomSnackBar
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        snackMessage={snackMessage}
      ></CustomSnackBar>
      {networkError && (
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
      )}
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={signInOpen}
        fullScreen
        onClose={handleClosed}
      >
        <SignInComponent
          handleClosed={handleClosed}
          initialScreen={true}
          setCustomerID={setCustomerID}
          setReRender={setReRender}
          setLoader={setLoader}
        />
      </BootstrapDialog>
      <Grid
        bgcolor={component?.bgColor}
        height="auto"
        p={isMobile ? "25px 0px" : component?.bgPadding}
      >
        <Grid container spacing={"25px"}>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={{ display: "block" }}
            >
              {productDetails && (
                <PdpCardCarousel
                  ref={viewEventWrapper}
                  removeFromWishList={removeFromWishList}
                  addedToWishlist={addedToWishlist}
                  setSnackMessage={setSnackMessage}
                  setSnackBarOpen={setSnackBarOpen}
                  productDetails={productDetails}
                  component={component}
                  isWishlisted={isWishlisted}
                  productData={pDetails}
                  wishListedProductData={wishListedProductData}
                />
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <PdpCardContent
              ref={viewEventWrapper}
              fetchValues={fetchValues}
              setSnackMessage={setSnackMessage}
              setSnackBarOpen={setSnackBarOpen}
              handleAddToCart={handleAddToCart}
              productData={pDetails}
              productDetails={productDetails}
              setAnalyticsSize={setSize}
              buyNowHandle={buyNowHandle}
              component={component}
              psd={psd}
              setPsd={setPsd}
              mode={mode}
              setMode={setMode}
              totalCount={totalCount}
              typeOfDelivery={typeOfDelivery}
              setTypeOfDelivery={setTypeOfDelivery}
              updatedCartDetails={updatedCartDetails}
            />
          </Grid>
        </Grid>
      </Grid>
      {isMobile && (
        <BottomNav>
          <ThemeProvider theme={theme}>
            <StyledGroup
              fullWidth
              orientation="horizontal"
              aria-label="styled-group"
            >
              {psd?.status !== "Out Of Stock" ? (
                <>
                  {apiQuantityProduct !== null &&
                  apiQuantityProduct !== undefined &&
                  apiQuantityProduct < 1 ? (
                    <>
                      <StyledButtons
                        disabled={productData?.is_out_of_stock}
                        color="primary"
                        variant="contained"
                        ismobile={isMobile}
                      >
                        <StyledText
                          onClick={() => {
                            if (
                              !cookie.get("accessToken") &&
                              userDataItems?.storeMode
                            ) {
                              setSignInOpen(true);
                            } else {
                              handleStockCheck();
                            }
                          }}
                        >
                          ADD TO CART
                        </StyledText>
                      </StyledButtons>
                    </>
                  ) : (
                    <>
                      <Box>
                        {/* Increment and Decrement buttons */}
                        <Box className="box_container_add_to_cart">
                          <DecrementMobileButton
                            onClick={handleDecrement}
                            variant="contained"
                          >
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
                            variant="contained"
                          >
                            +
                          </IncrementMobileButton>
                        </Box>
                      </Box>
                    </>
                  )}
                  {!userDataItems?.storeMode && (
                    <StyledButtons
                      variant="outlined"
                      disabled={productData?.is_out_of_stock}
                      ismobile={isMobile}
                      onClick={() => {
                        buyNowHandle();
                      }}
                    >
                      <StyledText>BUY NOW</StyledText>
                    </StyledButtons>
                  )}
                </>
              ) : (
                <StyledButtons
                  color="primary"
                  variant="contained"
                  ismobile={isMobile}
                >
                  <StyledText>OUT OF STOCK</StyledText>
                </StyledButtons>
              )}
            </StyledGroup>
          </ThemeProvider>
        </BottomNav>
      )}
      {userDataItems?.storeMode && openPopup && (
        <ExploreStoreUserConsentHandler
          openPopup={openPopup}
          handlePopUp={handlePopUp}
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
    </>
  );
}
