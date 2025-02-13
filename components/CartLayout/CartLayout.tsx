import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import React, { useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import { useMobileCheck } from "../../utility/isMobile";
import Loader from "../../HOC/Loader/Loader";
import useStorage from "../../utility/useStoarge";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import EmptyUseCartComponent from "../EmptyUseCartComponent/EmptyUseCartComponent";
import { CartDeatils } from "./CartDeatils";
import { CartBillingAndOtherDetails } from "./CartBillingAndOtherDetails";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  GetCartItems,
  GetCartItemServiceability,
} from "../../utility/CartServiceability";
import { cartState, userState } from "../../recoilstore";
import { FetchCartId, MergeCarts } from "../../api/Cart/CustomerCart";
import { AVALIABLE_OFFERS, CART_TEXT } from "../../utility/Constants";
import {
  CartLayoutWrapper,
  Heading,
  CartItemsCount,
  OffersText,
} from "./CartLayoutStyles";
import { CartSSO } from "../CartSSO/CartSSO";
import {
  fetchOrders,
  fetchWishListProducts,
} from "../../api/Cart/CartSuggestionsAPI";
import { OrderDataToProductDataMapper } from "../../utility/OrderDataToProductDataMapper";
import CartCarousel from "../Cart/CarouselTabs/CartCarousel";
import { CartSuggestions } from "../Cart/CartSuggestions/CartSuggestions";
import UNBXDWidget from "../UNBXDWidget";
import { IS_UNBXD_ENABLED } from "../../utility/APIConstants";
import { BrandDiscount } from "./BrandDiscount";
import { UniqueBrands } from "../../HOC/UniqueBrands/UniqueBrands";

import { useInView } from "react-intersection-observer";

interface CartSuggestions {
  tabTitle: string;
  productsData: any;
}

export const CartLayout = ({ CMSUNBXDWidget,CMSBasketLoadingWidget }: any) => {
  const cookie = new Cookies();
  const { getItem } = useStorage();
  const isMobile = useMobileCheck();
  const [displayLoader, setLoader] = useState(false);
  const [tost, setTost] = useState(false);
  const [tostMessage, setTostMessge] = useState("");
  const [networkError, setNetworkError] = useState(false);
  const [networkErrorMessage, setNetworkErrorMessage] =
    useState("Network Error");
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const resetTheCart = useResetRecoilState(cartState);
  const [signInOpen, setSignInOpen] = useState(false);
  const [mergeCart, setMergeCart] = useState(false);
  const [cartSuggestionsData, setCartSuggestionsData] = useState<any>({});
  const handleError = (message: string) => {
    setNetworkError(true);
    setNetworkErrorMessage(message);
  };
  const handleSnackBar = (message: string) => {
    setTost(true);
    setTostMessge(message);
  };
  const handleCloseSSO = () => {
    setSignInOpen(false);
  };

  function updateCartSuggestions(
    tabTitle: string,
    data: any,
    component: any,
    url: string
  ) {
    if (data?.length !== 0) {
      const suggestion = {
        tabTitle: tabTitle,
        tabData: {
          componentData: data,
          showViewAll: true,
          navigationUrl: url,
        },
        Component: component,
      };
      setCartSuggestionsData((previousData: any) => ({
        ...previousData,
        [tabTitle]: suggestion,
      }));
    }
  }

  async function loadWishlistProducts() {
    const wishlistItems = await fetchWishListProducts();
    if (wishlistItems?.length !== 0 && wishlistItems !== undefined) {
      updateCartSuggestions(
        "Add From Wishlist",
        wishlistItems,
        CartCarousel,
        "/account/wishlist"
      );
    }
  }

  async function loadBuyNowProducts() {
    const buyItAgainItems = await fetchOrders();
    if (buyItAgainItems?.length !== 0 && buyItAgainItems !== undefined) {
      const buyItAgainProductsList = await OrderDataToProductDataMapper(
        buyItAgainItems
      );
      if (
        buyItAgainProductsList?.length !== 0 &&
        buyItAgainProductsList !== undefined
      ) {
        updateCartSuggestions(
          "Buy It Again",
          buyItAgainProductsList,
          CartCarousel,
          "/account/orders"
        );
      }
    }
  }

  const GetCartDetails = async (snackBarMessage?: string, cartItems?: any) => {
    const cartId = getItem("cartID", "local");
    const buyNowCartId = getItem("BuyNowCartID", "local");
    //For merging buy now cart
    if (
      buyNowCartId &&
      (!getItem("retryFlowCartID", "local") ||
        getItem("retryFlowCartID", "local") === "")
    ) {
      if (cartId == undefined) {
        const responseCartId = await FetchCartId();
        if (!responseCartId?.message) {
          const res = await MergeCarts(`${buyNowCartId}`, responseCartId);
        }
      } else {
        const res = await MergeCarts(`${buyNowCartId}`, `${cartId}`);
      }
    }
    if (`${getItem("cartID", "local")}` != "undefined") {
      let cartDetails: any;
      // For cart load on firest time and reload case.
      if (!cartItems) {
        cartDetails = await GetCartItems(`${cartId}`, setCartStore);
      }
      //When user updates the product cart count, move to wishlist and removes the product from cart
      else {
        cartDetails = cartItems;
        setCartStore((previousData) => ({
          ...previousData,
          cartItems: cartItems,
          previousCartCount: cartItems?.cart?.total_quantity,
        }));
        setUserDataItems((previousData) => ({
          ...previousData,
          userCartCount: cartItems?.cart?.total_quantity,
        }));
      }
      if (!cartDetails?.cart) {
        resetTheCart();
        setLoader(false);
        setIsCartEmpty(true);
      } else {
        setIsCartEmpty(cartDetails?.cart?.items?.length == 0);
        const serRes = await GetCartItemServiceability(
          cartDetails,
          userDataItems,
          setCartStore,
          setUserDataItems
        );
        setLoader(false);
      }
    } else {
      setIsCartEmpty(true);
      setLoader(false);
    }
    setLoader(false);
    if (snackBarMessage) {
      handleSnackBar(snackBarMessage);
    }
  };

  useEffect(() => {
    setIsCartEmpty(cartStore?.cartItems?.cart?.items?.length == 0);
  }, [cartStore?.cartItems]);

  const fetchSuggestions = async () => {
    if (cookie.get("accessToken")) {
      await loadWishlistProducts();
      // await loadBuyNowProducts();
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  useEffect(() => {
    setLoader(true);
    if (
      userDataItems?.pincode == undefined ||
      userDataItems?.geoLat == undefined ||
      userDataItems?.geoLong == undefined
    ) {
      setUserDataItems((previousData) => ({
        ...previousData,
        city: "Mumbai",
        pincode: "400050",
        geoLat: 19.05648,
        geoLong: 72.83138,
      }));
    } else {
      if (!signInOpen && !mergeCart) {
        GetCartDetails();
      }
    }
  }, [userDataItems?.pincode]);

  useEffect(() => {
    if (cartStore?.isCartUpdated) {
      GetCartDetails();
      setCartStore((previousData: any) => ({
        ...previousData,
        isCartUpdated: false,
      }));
    }
  }, [cartStore?.isCartUpdated]);
  function handleRefresh (){
    setCartStore((previousData: any) => ({
      ...previousData,
      isCartUpdated: true,
    }));
  }
  const CMSUNBXDWidget_ = CMSUNBXDWidget?.[0];
  const CMSBasketLoadingWidget_ = CMSBasketLoadingWidget?.[0]
  console.log(CMSBasketLoadingWidget_,"TESTINGGG")

  const { exploreModeServiceableData, exploreStoreModeServiceableStatus, exploreModeNonServiceableProductsCount } = useMemo(() => {
    
    if (cartStore?.cartItems?.cart?.items.length > 0 && !cartStore?.serviceableProducts?.cc) {
      const exploreModeServiceableData = cartStore?.cartItems?.cart?.items.map((item: any) => {
        return {
          storeId: undefined,  
          sku: item?.product?.type_id !== "simple" 
            ? item?.configured_variant?.sku 
            : item?.product?.sku,
          parent_sku: item?.product?.sku,
          isServiceable: false,  
          cartUid: item?.uid,
        };
      });
  
      
      const exploreModeNonServiceableProductsCount = exploreModeServiceableData.length;
  
      return {
        exploreModeServiceableData,
        exploreStoreModeServiceableStatus: false,
        exploreModeNonServiceableProductsCount,
      };
    }
  

    if (!userDataItems?.storeMode || userDataItems?.storeModeType !== "cc" || !cartStore?.serviceableProducts?.cc) {
      return { 
        exploreModeServiceableData: null, 
        exploreStoreModeServiceableStatus: null, 
        exploreModeNonServiceableProductsCount: null 
      };
    }
  
    const exploreModeServiceableData = cartStore?.cartItems?.cart?.items.map((item: any) => {
      const id = cartStore?.serviceableProducts?.cc
        ?.find((i: any) => i?.sku === item?.configured_variant?.sku)
        ?.fulfillments?.find((i: any) => i?.type === "CC")?.store?.id;
  
      return {
        storeId: id,
        sku: item?.product?.type_id !== "simple" 
          ? item?.configured_variant?.sku 
          : item?.product?.sku,
        parent_sku: item?.product?.sku,
        isServiceable: id === userDataItems?.storeCode,
        cartUid: item?.uid,
      };
    });
  
    const exploreStoreModeServiceableStatus = exploreModeServiceableData?.every((item: any) => item.isServiceable);
    const exploreModeNonServiceableProductsCount = exploreModeServiceableData?.filter((item: any) => !item.isServiceable).length;
  
    return {
      exploreModeServiceableData,
      exploreStoreModeServiceableStatus,
      exploreModeNonServiceableProductsCount,
    };
  }, [cartStore?.serviceableProducts?.cc, cartStore?.cartItems?.cart?.items, userDataItems?.storeCode]);
  

  const uniqueBrands = UniqueBrands(cartStore, userDataItems); 

  return (
    <Box>
      <CustomSnackBar
        snackBarOpen={tost}
        setSnackBarOpen={setTost}
        snackMessage={tostMessage}
      />
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
      {displayLoader && <Loader />}
      <CartSSO
        signInOpen={signInOpen}
        handleCloseSSO={handleCloseSSO}
        setLoader={setLoader}
        handleError={handleError}
        setCartStore={setCartStore}
        GetCartDetails={GetCartDetails}
        mergeCart={mergeCart}
        setMergeCart={setMergeCart}
      />
      <CartLayoutWrapper $isMobile={isMobile}>
        <Grid container>
          {!isMobile && (
            <Grid
              item
              sm={12}
              md={12}
              sx={{
                display: "flex",
                fontSize: "14px",
                alignItems: "center",
                gap: "4px",
                mb: 5,
              }}
            >
              <Heading>{`${CART_TEXT} `}</Heading>
              {!isCartEmpty &&
                cartStore?.cartItems?.cart?.items?.length > 0 && (
                  <CartItemsCount>
                    {`(${cartStore?.cartItems?.cart?.items?.length} items)`}
                  </CartItemsCount>
                )}
            </Grid>
          )}
          {isCartEmpty ? (
            <EmptyUseCartComponent />
          ) : (
            <>
              {cartStore?.cartItems?.cart && (
                <>
                  {cartStore?.cartItems?.cart?.available_promotions?.length >
                    0 &&
                    !userDataItems?.storeMode && (
                      <OffersText $isMobile={isMobile}>
                        {AVALIABLE_OFFERS}
                      </OffersText>
                    )}
                  <Grid container>
                    {/* Cart Product List */}
                    <CartDeatils
                      setLoader={setLoader}
                      GetCartDetails={GetCartDetails}
                      displayLoader={displayLoader}
                      handleError={handleError}
                      handleSnackBar={handleSnackBar}
                      setSignInOpen={setSignInOpen}
                      updateCartSuggestions={updateCartSuggestions}
                      handleRefresh={handleRefresh}
                      exploreModeServiceableData={exploreModeServiceableData}
                      exploreStoreModeServiceableStatus={
                        exploreStoreModeServiceableStatus
                      }
                      exploreModeNonServiceableProductsCount={
                        exploreModeNonServiceableProductsCount
                      }
                    />
                    {/* Cart Price Details */}
                    <CartBillingAndOtherDetails
                      setLoader={setLoader}
                      GetCartDetails={GetCartDetails}
                      handleError={handleError}
                      handleSnackBar={handleSnackBar}
                      cartStore={cartStore}
                      setCartStore={setCartStore}
                      setSignInOpen={setSignInOpen}
                      exploreModeServiceableData={exploreModeServiceableData}
                      exploreStoreModeServiceableStatus={
                        exploreStoreModeServiceableStatus
                      }
                    />
                  </Grid>
                </>
              )}
            </>
          )}
        </Grid>

        {(CMSBasketLoadingWidget_?.visibility === null ||
  !CMSBasketLoadingWidget_?.visibility ||
  CMSBasketLoadingWidget_?.visibility === "all" ||
  CMSBasketLoadingWidget_?.visibility === "web") &&
  uniqueBrands?.map((product: any, index: number) => (
    <BrandDiscount
      key={`${product.brandName}-${index}`}
      {...CMSUNBXDWidget_}
      productData={cartStore?.cartItems?.cart}
      brandName={product.brandName}
      discount={product.discount}
      index={index}
    />
  ))}


        {cookie.get("accessToken") &&
          !userDataItems?.storeMode &&
          Object.values(cartSuggestionsData)?.length > 0 && (
            <Grid>
              <CartSuggestions
                data={Object.values(cartSuggestionsData)}
                updateCartSuggestions={updateCartSuggestions}
              />
            </Grid>
          )}
      </CartLayoutWrapper>
    </Box>
  );
};
