import React from "react";
import { useMobileCheck } from "../../utility/isMobile";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { BoxStyled } from "../OffersGrid/OffersGridStyles";
import { ExploreUserConsent } from "./ExploreUserConsent";
import {
  getCartItems,
  RemoveCartItems,
} from "../../HOC/ProductCard/ProductCardUtils";
import useStorage from "../../utility/useStoarge";
import client from "../../apollo-client";
import { ADD_PRODUCTS_TO_WISHLIST } from "../../graphQLQueries/WhishList/AddProductsToWishList";

export function ExploreStoreUserConsentHandler({
  openPopup,
  handlePopUp,
  router,
  setLoader,
  setUserDataItems,
  message = "You have items in the cart, please checkout/Wishlist them before exploring the store",
  rightCta = "Checkout Cart",
  leftCta = "Wishlist",
  commonCta = "Clear Cart",
  rightAction,
  leftAction,
  commonCtaAction,
  isCartMode = false,
  ...props
}: {
  openPopup: boolean;
  handlePopUp: any;
  setLoader: any;
  setUserDataItems: any;
  router: any;
  message: string;
  leftCta: string;
  rightCta: string;
  rightAction?: any;
  leftAction?: any;
  isCartMode?: boolean;
  commonCta?: string;
  commonCtaAction?: any;
  setSnackMessage?: any;
  setSnackBarOpen?: any;
}) {
  const isMobile = useMobileCheck();
  const { getItem, setItem } = useStorage();
  const cartId = getItem("cartID", "local") as string;
  async function handleWishList() {
    const cartItems = await getCartItems({ cartId: cartId });
    if (!cartItems?.data?.cart) {
      props?.setSnackBarOpen(true);
      props?.setSnackMessage("Unable to process request");
    }
    if (cartItems?.data?.cart?.items?.length > 0) {
      const cartNonWishlistItems = cartItems?.data?.cart?.items
        ?.filter((i: any) => i.isWishlisted === false)
        ?.map((item: any) => {
          return {
            sku:
              item?.product?.type_id !== "simple"
                ? item?.configured_variant?.sku
                : item?.product?.sku,
            parent_sku: item?.product?.sku,
            quantity: 1,
          };
        });
      if (cartNonWishlistItems?.length > 0) {
        await client
          .mutate({
            mutation: ADD_PRODUCTS_TO_WISHLIST,
            fetchPolicy: "no-cache",
            variables: {
              WishListInput: cartNonWishlistItems,
            },
          })
          .then(async (response: any) => {
            const res = await RemoveCartItems(cartId);
            if (res?.response?.status == 400) {
              props?.setSnackBarOpen(true);
              props?.setSnackMessage(
                res?.response?.data?.Message ||
                  "Unable to remove cart items, Please try again"
              );
              return;
            }
            if (res?.data?.removeCart?.status) {
              setUserDataItems((prev: any) => ({
                ...prev,
                userCartCount: 0,
              }));
              handlePopUp();
            }
          })
          .catch((error) => {
            props?.setSnackBarOpen(true);
            props?.setSnackMessage("Unable to process request");
          });
      } else {
        const res = await RemoveCartItems(cartId);
        if (res?.response?.status == 400) {
          props?.setSnackBarOpen(true);
          props?.setSnackMessage(
            res?.response?.data?.Message ||
              "Unable to remove cart items, Please try again"
          );
          return;
        }
        if (res?.data?.removeCart?.status) {
          setUserDataItems((prev: any) => ({
            ...prev,
            userCartCount: 0,
          }));
          handlePopUp();
        }
      }
    } else {
      props?.setSnackBarOpen(true);
      props?.setSnackMessage("No Items in the cart");
    }
    handlePopUp();
  }

  function handleCheckout() {
    setLoader(true);
    setUserDataItems((prev: any) => ({
      ...prev,
      storeMode: false,
      storeModeType: null,
      storeName: null,
      storeCode: null,
      storePath:null,
    }));
    handlePopUp();
    router?.push(`/cart/info`);
  }

  async function handleClearCart() {
    const res = await RemoveCartItems(cartId);
    if (res?.response?.status == 400) {
      props?.setSnackBarOpen(true);
      props?.setSnackMessage(
        res?.response?.data?.Message ||
          "Unable to remove cart items, Please try again"
      );
      return;
    }
    if (res?.data?.removeCart?.status) {
      setUserDataItems((prev: any) => ({
        ...prev,
        userCartCount: 0,
      }));
      handlePopUp();
    }
  }

  return (
    <>
      {openPopup && (
        <BoxStyled>
          <BasicModal
            top={"50%"}
            width={isMobile ? "100%" : "30%"}
            left={"50%"}
            open={openPopup}
            handleClose={() => {
              handlePopUp();
            }}
            animationDuration={1000}
            Component={
              <ExploreUserConsent
                message={message}
                rightCta={rightCta}
                leftCta={leftCta}
                rightAction={rightAction || handleCheckout}
                leftAction={leftAction || handleWishList}
                isCartMode={isCartMode}
                commonCta={commonCta}
                commonCtaAction={commonCtaAction || handleClearCart}
              />
            }
          ></BasicModal>
        </BoxStyled>
      )}
    </>
  );
}
