import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { MergeGustUserCart, FetchCartId } from "../../api/Cart/CustomerCart";
import { userState } from "../../recoilstore";
import CartStoreInterface from "../../schemas/cartStoreAtom";
import useStorage from "../../utility/useStoarge";
import SignInComponent from "../SigninComponent/SignInComponent";
import { BootstrapDialog } from "../SigninComponent/SignInStyled";

export function CartSSO({
  signInOpen,
  handleCloseSSO,
  setLoader,
  handleError,
  setCartStore,
  GetCartDetails,
  mergeCart,
  setMergeCart,
}: any) {
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const cookie = new Cookies();
  const [CustomerID, setCustomerID] = useState(
    userDataItems ? userDataItems?.customerName : null
  );
  const [initialScreen, setInitialScreen] = useState(true);
  const [signUpScreen, setSignUpScreen] = useState(false);
  const [isCartJourney, setIsCartJourney] = useState(true);
  const { getItem, setItem } = useStorage();

  useEffect(() => {
    const mergeCurrentCart = async () => {
      if (cookie.get("accessToken")) {
        setLoader(true);
        const nonLoginUserCartId = getItem("cartID", "local");
        const mergedCart = await MergeGustUserCart(`${nonLoginUserCartId}`);
        if (!mergedCart?.message) {
          const loginUserCartId = await FetchCartId();
          localStorage.setItem("cartID", loginUserCartId);
          const cartData = {
            cart: {
              ...mergedCart?.data?.assignCustomerToGuestCart,
            },
          };
          setCartStore((previousData: CartStoreInterface) => ({
            ...previousData,
            cartItems: {
              cart: {
                ...previousData?.cartItems?.cart,
                ...mergedCart?.data?.assignCustomerToGuestCart,
              },
            },
          }));
          await GetCartDetails(undefined, cartData);
        } else {
          setLoader(false);
          handleError(mergedCart?.message);
        }
      }
      setMergeCart(false);
    };
    if (mergeCart) {
      mergeCurrentCart();
    }
  }, [mergeCart]);

  return (
    <>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={signInOpen}
        fullScreen
        onClose={handleCloseSSO}
      >
        <SignInComponent
          handleClosed={handleCloseSSO}
          initialScreen={initialScreen}
          setCustomerID={setCustomerID}
          CustomerID={CustomerID}
          setLoader={setLoader}
          setReRender={setMergeCart}
          signUpScreen={signUpScreen}
          isCartJourney={isCartJourney}
          setIsCartJourney={setIsCartJourney}
          cartJourney={true}
        />
      </BootstrapDialog>
    </>
  );
}
