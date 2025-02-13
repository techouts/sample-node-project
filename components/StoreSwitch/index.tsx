import React, { useEffect, useState } from "react";
import { StoreSwitch } from "../Header/HeaderStyle";
import UserInfoInterface from "../../schemas/userInfoAtom";
import { useRouter } from "next/router";
import {
  getCartItems,
  RemoveCartItems,
} from "../../HOC/ProductCard/ProductCardUtils";
import useStorage from "../../utility/useStoarge";
import { useMobileCheck } from "../../utility/isMobile";
import client from "../../apollo-client";
import { ADD_PRODUCTS_TO_WISHLIST } from "../../graphQLQueries/WhishList/AddProductsToWishList";
import { Cookies } from "react-cookie";
import { ExploreStoreUserConsentHandler } from "./ExploreStoreUserConsentHandler";
import { Box } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";

export default function CCModeSwitch({
  setLoader,
  setUserDataItems,
  userDataItems,
  navigationPath,
  isPDP,
  ...props
}: {
  setLoader: any;
  setUserDataItems: any;
  userDataItems: UserInfoInterface;
  navigationPath: string;
  isPDP?: boolean;
  setSnackBarOpen?: any;
  setSnackMessage?: any;
}) {
  const router = useRouter();
  const isMobile = useMobileCheck();
  const [openPopup, setPopup] = useState<boolean>(false);
  const [cartData, setCartData] = useState<any>();
  function handlePopUp() {
    setPopup(false);
  }
  const { getItem, setItem } = useStorage();
  const cookie = new Cookies();

  async function handleTurnOffCCMode() {
    const cartId = getItem("cartID", "local") as string;
    
    const cartItems = await getCartItems({ cartId: cartId });
    setCartData(cartItems);
    if (cartItems?.data?.cart?.items?.length > 0) {
      setPopup(true);
      setLoader(false);
    } else {
      setPopup(false);
      updateStore();
      if (!isPDP) {
        router.push("/home");
      }
    }
  }

  async function handleCart() {
    const cartId = getItem("cartID", "local") as string;
    if (cartId) {
      if (cartData?.data?.cart?.items?.length > 0) {
        const cartNonWishlistItems = cartData?.data?.cart?.items
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
            .then(async (res: any) => {
              const removeCartItemsRes = await RemoveCartItems(cartId);
              if (removeCartItemsRes?.data?.removeCart?.status) {
                setPopup(false);
                updateStore();
                router.push("/home");
              } else {
                //TODO: Need to handle negative case
              }
            })
            .catch((error) => {
              console.log("error", error);
              //TODO: Need to handle negative case
            });
        } else {
          const removeCartItemsRes = await RemoveCartItems(cartId);
          if (removeCartItemsRes?.data?.removeCart?.status) {
            setPopup(false);
            updateStore();
            if (!isPDP) {
              router.push("/home");
            }
          } else {
            //TODO: Need to handle negative case
          }
        }
      } else {
        setPopup(false);
        if (!isPDP) {
          router.push("/home");
        }
      }
    }
  }

  function updateStore() {
    setUserDataItems((prev: any) => ({
      ...prev,
      storeMode: !prev.storeMode,
      storeName: userDataItems?.storeMode ? null : prev.storeName,
      storePath: userDataItems?.storeMode ? null : prev.storePath,
      storeCode: userDataItems?.storeCode ? null : prev.storeCode,
      storeModeType: userDataItems?.storeCode ? null : "sd",
    }));
    setItem("isStoreModeAddToCartInitial", true, "local");
  }

  async function handleClearCart() {
    const res = await RemoveCartItems(getItem("cartID", "local") as string);
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

  async function handleStoreChange() {
    setLoader(true);
    if (
      userDataItems?.storeMode &&
      localStorage?.getItem("isStoreModeAddToCartInitial") === "true" &&
      !userDataItems?.storeCode
    ) {
      updateStore();
      setLoader(false);
      return;
    }
    if (cookie.get("accessToken")) {
      if (userDataItems?.storeMode) {
        await handleTurnOffCCMode();
      } else {
        updateStore();
        router.push(navigationPath);
      }
    } else {
      if (userDataItems?.storeMode) {
        updateStore();
        if (!isPDP) {
          router.push("/home");
        }
      } else {
        updateStore();
        router.push(navigationPath);
      }
    }
    setLoader(false);
  }

  return (
    <>
      <Box position="relative" display="flex" alignItems="center">
        <StoreSwitch
          checked={userDataItems?.storeMode}
          onChange={handleStoreChange}
        />

        {userDataItems?.storeMode && <ApartmentIcon
          className="apartment-icon"
          onClick={userDataItems?.storeMode ? handleStoreChange : () => {} }
          style={{
            position: "absolute",
            cursor: "pointer",
            background: "white",
            border: "1px solid #F8EDF1",
            borderRadius: "40%",
            width: "20px",
            height: "auto",
            top: "50%",
            left: "calc(100% - 20px)", // Adjust as needed
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        />}
      </Box>
      {userDataItems?.storeMode && openPopup && (
        <ExploreStoreUserConsentHandler
          openPopup={openPopup}
          handlePopUp={handlePopUp}
          setLoader={setLoader}
          setUserDataItems={setUserDataItems}
          router={router}
          message={
            router?.asPath.includes("cart")
              ? `You are moving out of ${userDataItems?.storeName} store, your items will be marked for Standard Delivery`
              : "You have items in the cart, please checkout/Wishlist them before exploring the store"
          }
          rightCta={"Checkout Cart"}
          leftCta={"Wishlist"}
          commonCta={router?.asPath.includes("cart") ? "Okay" : "Clear Cart"}
          leftAction={async () => {
            //Wishlist
            await handleCart();
          }}
          setSnackMessage={props?.setSnackMessage}
          setSnackBarOpen={props?.setSnackBarOpen}
          isCartMode={router?.asPath.includes("cart")}
          commonCtaAction={async () => {
            setLoader(true);
            setUserDataItems((prev: any) => ({
              ...prev,
              storeMode: false,
              storeModeType: null,
              storeName: null,
              storeCode: null,
              storePath: null,
            }));
            setItem("isStoreModeAddToCartInitial", true, "local");
            if (!router?.asPath.includes("cart")) {
              await handleClearCart();
            }
            handlePopUp();
            router?.push(`/home`);
          }}
        />
      )}
    </>
  );
}
