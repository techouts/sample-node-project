import { useEffect, useRef, useState } from "react";
import { createTheme, Grid, ThemeProvider } from "@mui/material";
import PdpCardCarousel from "./PdpCardCarousel";
import PdpCardContent from "./PdpCardContent";
const productSampleData = require("../PdpCardComponent/pdpCardCarouselData.json");
import { useMobileCheck } from "../../utility/isMobile";
import Loader from "../../HOC/Loader/Loader";
import { Cookies } from "react-cookie";
import client from "../../apollo-client";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import {
  ADD_CONFIGURABLE_PRODUCTS_TO_CART,
  ADD_SIMPLE_PRODUCTS_TO_CART,
} from "../../graphQLQueries/AddProductsToCart";
import { useAppContext } from "../../context/userInfoContext";
import {
  CreateEmptyCart,
  GETCUSTOMER_CART,
} from "../../graphQLQueries/CartQuery";
import {
  BottomNav,
  StyledButtons,
  StyledGroup,
  StyledText,
} from "./pdcardstyle";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../../recoilstore";
import { CUSTOMER_WISHLIST } from "../../graphQLQueries/WhishList/WishListQuery";
import { REMOVE_PRODUCTS_FROM_WISHLIST } from "../../graphQLQueries/WhishList/RemoveProductsFromWishList";
import {
  addedToWishlistMessage,
  removedWishlistMessage,
} from "../ProductLayout/constants";
import { ADD_PRODUCTS_TO_WISHLIST } from "../../graphQLQueries/WhishList/AddProductsToWishList";
import { BootstrapDialog } from "../SigninComponent/SignInStyled";
import SignInComponent from "../SigninComponent/SignInComponent";
import ViewEvent from "../../utility/viewEvent";
import { toast } from "../../utility/Toast";
import {
  event_type,
  widget_powered_by,
  Widget_type,
  widget_type,
} from "../../utility/GAConstants";
import * as ga from "../../lib/ga";
import { CREATE_BUYNOW_CART } from "../../graphQLQueries/Cart/BuyNowCart";
import { CART_ROUTE } from "../Header/Constants";
import { useRouter } from "next/router";
import { createEmptyCart } from "../../api/Cart/CustomerCart";
import handleErrorResponse from "../../utility/ErrorHandling";
function PdpCardComponent({ productData, component, totalCount }: any) {
  const productDetails = productData?.items?.[0];
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
  const [wishListedProducts, setWishListProducts] = useState<any>([]);
  const [productID, setProductID] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();
  const cookie = new Cookies();
  const isMobile = useMobileCheck();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [displayLoader, setLoader] = useState(false);
  const userInfoContext = useAppContext();
  const { updateContextData } = userInfoContext;
  const [psd, setPsd] = useState<any>({
    sd: false,
    ed: false,
    cc: false,
  });
  const [mode, setMode] = useState("sd");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const inStock = getVariantDetails()?.stock_status === "IN_STOCK";
  const [reRender, setReRender] = useState(false);
  const [CustomerID, setCustomerID] = useState(
    userDataItems ? userDataItems?.customerName : null
  );
  const [signInOpen, setSignInOpen] = useState(false);
  const [size, setSize] = useState("");
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const handleClosed = () => {
    setSignInOpen(false);
  };
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

  useEffect(() => {
    setCustomerID(userDataItems ? userDataItems?.customerName : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender]);
  const addedToWishlist = (
    productType: String,
    sku: String,
    parent_sku: String
  ) => {
    if (cookie.get("accessToken")) {
      setLoader(true);
      client
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
       const hasError =   handleErrorResponse(response?.data) //response checking
       if (hasError) return null;
          cookie.set(
            "userWishListCount",
            response?.data?.addProductsToWishlist?.wishlist?.items_count,
            {
              path: "/",
              sameSite: true,
              secure: true,
            }
          );
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
        })
        .catch((error: any) => {
          toast.error("Someting went wrong, Please try again!!!");
          console.log(error);
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
       const hasError =   handleErrorResponse(response?.data) //response checking
       if (hasError) return null;
          cookie.set(
            "userWishListCount",
            response?.data?.removeProductsFromWishlist?.wishlist?.items_count,
            {
              path: "/",
              sameSite: true,
            }
          );
          setUserDataItems({
            ...userDataItems,
            userWishListCount:
              response?.data?.removeProductsFromWishlist?.wishlist?.items_count,
          });
          setSnackMessage(removedWishlistMessage);
          setWishListProducts(
            response?.data?.removeProductsFromWishlist?.wishlist?.items_v2
              ?.items
          );
          setSnackBarOpen(true);
        })
        .catch((err) => {
          toast.error("Someting went wrong, Please try again!!!");
          console.log(err);
        })
        .finally(() => setLoader(false));
    }
  };
  const addProductToCart = (cartID: string | null) => {
    client
      .mutate({
        mutation:
          productDetails?.__typename === "SimpleProduct"
            ? ADD_SIMPLE_PRODUCTS_TO_CART
            : ADD_CONFIGURABLE_PRODUCTS_TO_CART,
        variables: {
          cartID: cartID,
          skuID: `${
            productDetails?.__typename === "SimpleProduct"
              ? productDetails?.sku
              : getVariantDetails()?.sku
          }`,
          quantity: 1,
          parentID: `${productDetails?.sku}`,
        },
      })
      .then((response: any) => {
       const hasError =   handleErrorResponse( response?.data) //response checking
       if (hasError) return null;
        cookie.set(
          "userCartCount",
          response?.data?.addConfigurableProductsToCart?.cart?.items?.length ||
            response?.data?.addSimpleProductsToCart?.cart?.items?.length,
          {
            path: "/",
            sameSite: true,
          }
        );
        setUserDataItems({
          ...userDataItems,
          userCartCount:
            response?.data?.addConfigurableProductsToCart?.cart
              ?.total_quantity ||
            response?.data?.addSimpleProductsToCart?.cart?.total_quantity,
        });
        updateContextData &&
          updateContextData({
            contextUserCartCount:
              response?.data?.addConfigurableProductsToCart?.cart
                ?.total_quantity ||
              response?.data?.addSimpleProductsToCart?.cart?.total_quantity,
          });
        setLoader(false);
        setSnackBarOpen(true);
        setSnackMessage("Product successfully added to your cart");
      })
      .catch(async (errMessage: any) => {
        console.log(errMessage);
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
      });
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
    if (cookie.get("accessToken")) {
      client
        .mutate({
          mutation: CREATE_BUYNOW_CART,
          variables: {
            productQuantity: 1,
            productSku: `${
              productDetails?.type_id === "simple"
                ? productDetails?.sku
                : getVariantDetails()?.sku
            }`,
            parentID: `${productDetails?.sku}`,
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
        .catch((err) =>{ 
          toast.error("Someting went wrong, Please try again!!!");
          setLoader(false)});
    } else {
      setSignInOpen(true);
      setLoader(false);
    }
  };
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
       const hasError =   handleErrorResponse( res?.data?.customer?.wishlists?.[0]?.items_v2?.items) //response checking
       if (hasError) return null;
          setWishListProducts(
            res?.data?.customer?.wishlists?.[0]?.items_v2?.items
          );
        })
        .catch((err: any) => {
          toast.error("Someting went wrong, Please try again!!!");
          console.log(err)});
    }
  }, []);
  useEffect(() => {
    if (wishListedProducts?.length > 0) {
      setIsWishlisted(
        wishListedProducts?.some(
          (item: any) => item?.product?.sku == productDetails?.sku
        )
      );
      setProductID(
        wishListedProducts.find(
          (item: any) => item?.product?.sku == productDetails?.sku
        )?.id
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [wishListedProducts]);

  const viewEventWrapper = useRef();
  const dataLayer = {
    item_id: getVariantDetails()?.sku,
    item_name: getVariantDetails()?.name,
    widget_type: widget_type,
    item_type: getVariantDetails()?.__typename,
    widget_powered_by: widget_powered_by,
    widget_title: "ProductproductDetails",
    widget_description: "",
    widget_position: "",
    no_of_items: 1,
    view_items: [
      {
        item_id: getVariantDetails()?.sku,
        item_name: getVariantDetails()?.name,
        index: 1,
        item_brand: "",
        item_category: "",
        price: getVariantDetails()?.pmr_price_value?.amount?.value,
        original_price:
          getVariantDetails()?.price_range?.minimum_price?.regular_price?.value,
        quantity: getVariantDetails()?.product_count,
        item_rating: getVariantDetails()?.rating_summary,
        item_category2: "",
        item_category3: "",
        item_category5: "",
        item_size: getVariantDetails()?.configurable_options?.label,
        item_deeplink_url: "",
        item_image_link: "",
      },
    ],
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");
  return (
    <>
      {displayLoader && <Loader />}
      <CustomSnackBar
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        snackMessage={snackMessage}></CustomSnackBar>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={signInOpen}
        fullScreen
        onClose={handleClosed}>
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
        p={isMobile ? "25px 0px" : component?.bgPadding}>
        <Grid container spacing={"25px"}>
          <Grid item xs={12} sm={5}>
            <Grid
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={{ display: "block" }}>
              {getVariantDetails() && (
                <PdpCardCarousel
                  ref={viewEventWrapper}
                  removeFromWishList={removeFromWishList}
                  addedToWishlist={addedToWishlist}
                  setSnackMessage={setSnackMessage}
                  setSnackBarOpen={setSnackBarOpen}
                  productDetails={productDetails}
                  getVariantDetails={getVariantDetails}
                  component={component}
                  productID={productID}
                  setProductID={setProductID}
                  isWishlisted={isWishlisted}
                  userDataItems={userDataItems}
                  setUserDataItems={setUserDataItems}
                />
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7}>
            <PdpCardContent
              ref={viewEventWrapper}
              setSnackMessage={setSnackMessage}
              setSnackBarOpen={setSnackBarOpen}
              handleAddToCart={handleAddToCart}
              productData={productData}
              productDetails={productDetails}
              getVariantDetails={getVariantDetails}
              setAnalyticsSize={setSize}
              buyNowHandle={buyNowHandle}
              component={component}
              psd={psd}
              setPsd={setPsd}
              mode={mode}
              setMode={setMode}
              totalCount={totalCount}
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
              aria-label="styled-group">
              {inStock ? (
                <>
                  <StyledButtons
                    disabled={!psd[mode]}
                    color="primary"
                    variant="contained"
                    ismobile={isMobile}>
                    <StyledText
                      onClick={() => {
                        handleAddToCart();
                      }}>
                      ADD TO CART
                    </StyledText>
                  </StyledButtons>
                  <StyledButtons
                    variant="outlined"
                    disabled={!psd[mode]}
                    ismobile={isMobile}
                    onClick={() => buyNowHandle()}>
                    <StyledText>BUY NOW</StyledText>
                  </StyledButtons>
                </>
              ) : (
                <StyledButtons
                  color="primary"
                  variant="contained"
                  ismobile={isMobile}>
                  <StyledText>OUT OF STOCK</StyledText>
                </StyledButtons>
              )}
            </StyledGroup>
          </ThemeProvider>
        </BottomNav>
      )}
    </>
  );
}
export default PdpCardComponent;
