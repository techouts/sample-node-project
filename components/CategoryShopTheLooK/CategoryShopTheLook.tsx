import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Carousel from "../../HOC/Carousel/Carousel2";
import { useMobileCheck } from "../../utility/isMobile";
import { toast } from "../../utility/Toast";
import StarIcon from "@mui/icons-material/Star";
import { Cookies } from "react-cookie";
import {
  ImageBox,
  ContentBox,
  WishImage,
  TitleBox,
  RatingBox,
  TitleText,
  RatingText,
  PriceBox,
  MRPText,
  ButtonBox,
  WishlistImageIcon,
  ProductImage,
} from "./CategoryShopTheLookStyle";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { useSetRecoilState, useRecoilState } from "recoil";
import { cartState, userState } from "../../recoilstore";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  EMPTY_WISHLIST_COLOUR,
  Error_Image,
  FALL_BACK_IMAGE_PRODUCT,
  WISHLIST_ADDED_ICON,
} from "../../utility/AppIcons";
import useStorage from "../../utility/useStoarge";
import client from "../../apollo-client";
import {
  ADD_CONFIGURABLE_PRODUCTS_TO_CART,
  ADD_SIMPLE_PRODUCTS_TO_CART,
} from "../../graphQLQueries/AddProductsToCart";
import {
  CreateEmptyCart,
  GETCUSTOMER_CART,
} from "../../graphQLQueries/CartQuery";
import { ADD_PRODUCTS_TO_WISHLIST } from "../../graphQLQueries/WhishList/AddProductsToWishList";
import { BootstrapDialog } from "../../components/SigninComponent/SignInStyled";
import SignInComponent from "../../components/SigninComponent/SignInComponent";
import { CUSTOMER_WISHLIST } from "../../graphQLQueries/WhishList/WishListQuery";
import { REMOVE_PRODUCTS_FROM_WISHLIST } from "../../graphQLQueries/WhishList/RemoveProductsFromWishList";
import Loader from "../../HOC/Loader/Loader";
import {
  addedToCartMessage,
  addedToWishlistMessage,
  removedWishlistMessage,
} from "../ProductLayout/constants";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import { onImageError } from "../../utility/onImageError";
import { pdpRedirecion } from "../../utility/PdpRedirection";
import { createEmptyCart } from "../../api/Cart/CustomerCart";
import handleErrorResponse from "../../utility/ErrorHandling";

const ShopTheLook = (props: any) => {
  const [displayLoader, setLoader] = useState(false);
  let items = props?.items;
  const [itemsData, setItemsData] = useState(items);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  //custom settings for Carousel
  const userSettings = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3.3,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          infinite: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2.3,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "10px",
          arrows: false,
          dots: false,
          useTransform: true,
        },
      },
    ],
  };

  useEffect(() => {
    let arr: any = [];
    items?.map((obj: any) => {
      arr.push({
        ...obj,
        setLoader: setLoader,
        snackBarOpen: snackBarOpen,
        setSnackBarOpen: setSnackBarOpen,
        setSnackMessage: setSnackMessage,
        snackMessage: snackMessage,
      });
    });
    setItemsData([...arr]);
  }, [items]);

  return (
    <>
      {displayLoader && <Loader />}
      <CustomSnackBar
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        snackMessage={snackMessage}
      ></CustomSnackBar>
      <Grid className="shop-the-look-product-carousel">
        <Carousel
          settings={userSettings}
          items={itemsData}
          Component={SingleCard}
        />
      </Grid>
    </>
  );
};

export const SingleCard = (props: any) => {
  const { rating_summary, variants, type_id, sku, pmr_price_value } = props;
  const Wishlist_Empty_Icon = AppIcons(EMPTY_WISHLIST_COLOUR);
  const Wishlist_filled_heart = AppIcons(WISHLIST_ADDED_ICON);
  const errorImage = AppIcons(Error_Image)
  const [varaintDetails, setVaraintDetails] = useState<any>();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [signInOpen, setSignInOpen] = useState(false);
  const [productID, setProductID] = useState(0);
  const [wishListedProducts, setWishListProducts] = useState<any>([]);
  const [CustomerID, setCustomerID] = useState(
    userDataItems ? userDataItems?.customerName : null
  );
  const [reRender, setReRender] = useState(false);
  const setCartStore = useSetRecoilState(cartState);
  const isFromCart = false;
  const isMobile = useMobileCheck();
  const cookie = new Cookies();
  const { getItem } = useStorage();
  const handleClosed = () => {
    setSignInOpen(false);
  };

  useEffect(() => {
    setCustomerID(userDataItems ? userDataItems?.customerName : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender]);

  useEffect(() => {
    setVaraintDetails(
      props?.type_id !== "simple" ? props?.variants?.[0]?.product : props
    );
    if (cookie.get("accessToken")) {
      client
        .mutate({
          mutation: CUSTOMER_WISHLIST,
          fetchPolicy: "no-cache",
          variables: {
            currentPage: 1,
            pageSize: 10,
          },
        })
        .then((res) => {
        

          setWishListProducts(
            res?.data?.customer?.wishlists[0]?.items_v2?.items
          );
          props?.setLoader(false);
        })
        .catch((err) =>{
          toast.error("Someting went wrong, Please try again!!!");
          console.log(err)})
        .finally(() => {
          props?.setLoader(false);
        });
    }
  }, []);

  const addProductToCart = (
    cartID: string | null,
    quantity: number,
    parentSku: string,
    childSku: string
  ) => {
    props?.setLoader(true);
    client
      .mutate({
        mutation:
          type_id === "simple"
            ? ADD_SIMPLE_PRODUCTS_TO_CART
            : ADD_CONFIGURABLE_PRODUCTS_TO_CART,
        variables: {
          cartID: cartID,
          skuID: `${type_id === "simple" ? parentSku : childSku}`,
          parentID: parentSku,
          quantity: parseFloat(`${quantity}`),
        },
      })
      .then((response) => {
          const hasError =    handleErrorResponse(response?.data) //response checking
          if (hasError) return null;
        cookie.set(
          "userCartCount",
          response?.data?.addConfigurableProductsToCart?.cart?.total_quantity ||
            response?.data?.addSimpleProductsToCart?.cart?.total_quantity,
          {
            path: "/",
            sameSite: true, 
            secure: true
          }
        );
        setUserDataItems({
          ...userDataItems,
          userCartCount:
            response?.data?.addConfigurableProductsToCart?.cart
              ?.total_quantity ||
            response?.data?.addSimpleProductsToCart?.cart?.total_quantity,
        });
        props?.setSnackBarOpen(true);
        props?.setSnackMessage(addedToCartMessage);
        if (isFromCart) {
          setCartStore((previousData: any) => ({
            ...previousData,
            isCartUpdated: true,
          }));
        }
      })
      .catch(async(errMessage: any) => {
        const isCartNotFound = errMessage?.message?.includes(
          "Could not find a cart with ID"
        );
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
        props?.showLoader(false);
        if (!isCartNotFound) {
          props?.setSnackBarOpen(true);
          props?.setSnackMessage(errMessage?.message);
        }
      })
      .finally(() => {
        props?.setLoader(false);
      });
  };

  const fetchEmptyCart = (
    quantity: number,
    parentSku: string,
    childSku: string
  ) => {
    props?.setLoader(true);
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
        props?.setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Someting went wrong, Please try again!!!");
        props?.setLoader(false);
      });
  };

  const handleAddToCart = (
    quantity: number,
    parentSku: string,
    childSku: string
  ) => {
    props?.setLoader(true);
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
            props?.setLoader(false);
            const errMessage = JSON.parse(JSON.stringify(err));
            console.log(errMessage?.message);
            props?.setSnackBarOpen(true);
            props?.setSnackMessage(errMessage?.message);
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
  const hanldleAddToCart = () => {
    handleAddToCart(
      1,
      sku,
      type_id === "simple" ? sku : variants?.[0]?.product?.sku
    );
  };

  useEffect(() => {
    setProductID(
      wishListedProducts?.filter(
        (product: any) => product?.product?.sku === sku
      )[0]?.id
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sku, wishListedProducts]);

  const handleWishList = (
    productType: string,
    sku: string,
    parent_sku: string
  ) => {
    props?.setLoader(true);
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
          setWishListProducts(
            response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items
          );
          props?.setSnackBarOpen(true);
          props?.setSnackMessage(addedToWishlistMessage);
        })
        .catch((error: any) => {
          console.log(error);
          props?.setSnackBarOpen(true);
          props?.setSnackMessage(error?.message);
        })
        .finally(() => {
          props?.setLoader(false);
        });
    } else {
      setSignInOpen(true);
      props?.setLoader(false);
    }
  };
  const isFavorite = wishListedProducts?.filter(
    (product: any) => product?.product?.sku == sku
  );
  const PRODUCT_FALLBACK_URL = AppIcons(FALL_BACK_IMAGE_PRODUCT);
  const removeFromWishList = (itemID: any) => {
    props?.setLoader(true);
    if (cookie.get("accessToken")) {
      client
        .mutate({
          mutation: REMOVE_PRODUCTS_FROM_WISHLIST,
          variables: {
            wishListItemId: itemID,
          },
        })
        .then((response) => {
        
          const hasError =    handleErrorResponse(response?.data) //response checking
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
          });
          props?.setSnackBarOpen(true);
          props?.setSnackMessage(removedWishlistMessage);
          setWishListProducts(
            response?.data?.removeProductsFromWishlist?.wishlist?.items_v2
              ?.items
          );
        })
        .catch((err) => {
          console.log(err);
          props?.setSnackBarOpen(true);
          props?.setSnackMessage(err?.message);
        })
        .finally(() => {
          props?.setLoader(false);
        });
    }
  };
  return (
    <>
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
        />
      </BootstrapDialog>
      <Stack
        direction={"row"}
        p={1}
        sx={{ paddingBottom: isMobile ? "25px" : "" }}
      >
        <Grid sx={{ height: isMobile ? "109px" : "143px", display: "flex" }}>
          <ImageBox>
            <Grid sx={{ width: "100px", height: "100%" }}>
              <WishImage isWishlist={isFavorite.length}>
                {isFavorite.length ? (
                  <WishlistImageIcon
                    src={`${ReplaceImage(Wishlist_filled_heart?.url)}`}
                    alt="heart-filled111"
                    onClick={(e: any) => {
                      removeFromWishList(productID);
                    }}
                    isWishlist={isFavorite.length}
                  />
                ) : (
                  <WishlistImageIcon
                    src={`${ReplaceImage(Wishlist_Empty_Icon?.url)}`}
                    alt="img"
                    onClick={() => {
                      handleWishList(type_id, variants?.[0]?.product?.sku, sku);
                    }}
                    isWishlist={isFavorite.length}
                  />
                )}
              </WishImage>
              <ProductImage
                isMobile={isMobile}
                src={varaintDetails?.image?.url ?? ReplaceImage(PRODUCT_FALLBACK_URL?.url)}
                alt="image loading..."
                onError={(e: any) => onImageError(e, errorImage)}
                onClick={() =>
                  window.open(
                    pdpRedirecion(
                      props?.sku,
                      props?.type_id,
                      props?.name,
                      varaintDetails?.color,
                      varaintDetails?.size
                    )
                  )
                }
              />
            </Grid>
          </ImageBox>
          <ContentBox>
            <TitleBox isMobile={isMobile}>
              <TitleText
                onClick={() =>
                  window.open(
                    pdpRedirecion(
                      props?.sku,
                      props?.type_id,
                      props?.name,
                      varaintDetails?.color,
                      varaintDetails?.size
                    )
                  )
                }
              >
                {varaintDetails?.name}
              </TitleText>
              {varaintDetails?.rating_summary > 0 && (
                <RatingBox>
                  <StarIcon sx={{ fontSize: "medium", marginRight: 0.7 }} />
                  {isMobile ? (
                    <RatingText
                      isMobile={isMobile}
                    >{`(${rating_summary})`}</RatingText>
                  ) : (
                    <RatingText isMobile={isMobile}>
                      {varaintDetails?.rating_summary}
                    </RatingText>
                  )}
                </RatingBox>
              )}

              <PriceBox>
                {pmr_price_value?.amount?.value > 0 ? (
                  <MRPText isMobile={isMobile}>
                    ₹{pmr_price_value?.amount?.value}
                  </MRPText>
                ) : (
                  ""
                )}
              </PriceBox>
            </TitleBox>
            <Box
              onClick={() => {
                hanldleAddToCart();
              }}
            >
              <ButtonBox isMobile={isMobile}>ADD TO CART</ButtonBox>
            </Box>
          </ContentBox>
        </Grid>
      </Stack>
    </>
  );
};

export default ShopTheLook;
