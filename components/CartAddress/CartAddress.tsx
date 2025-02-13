import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { Fragment, useEffect, useState } from "react";
import { PrimaryBox } from "./CartAdressStyled";
import PrimaryComponent from "./PrimaryComponent";
import SecondaryComponent from "./SecondaryComponent";
import { useMobileCheck } from "../../utility/isMobile";
import {
  AddressTypography,
  DeliveryOptionsTypography,
} from "./PrimaryComponentStyled";
import Loader from "../../HOC/Loader/Loader";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import useStorage from "../../utility/useStoarge";
import {
  GetCartAddresses,
  GetCartItems,
  GetCartItemServiceability,
} from "../../utility/CartServiceability";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../../recoilstore";
import {
  ADDRESS_TEXT,
  DELIVERY_OPTION_AVAILABLE,
  JUSPAY_RETURN_URL,
} from "../../utility/Constants";
import client from "../../apollo-client";
import { CART_ACTIVE_INFO } from "../../graphQLQueries/CartQuery";
import handleErrorResponse from "../../utility/ErrorHandling";
const CartAddress = (CartAddressData: any) => {
  const { data } = CartAddressData;
  const [displayLoader, setLoader] = useState(true);
  const { getItem } = useStorage();
  const isMobile = useMobileCheck();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [networkError, setNetworkError] = useState(false);
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [networkErrorMessage, setNetworkErrorMessage] =
    useState("Network Error");
  const handleSnackBar = (message: string) => {
    setLoader(false);
    setSnackBarOpen(true);
    setSnackMessage(message);
  };

  const handleErrorAlert = (message: string) => {
    setLoader(false);
    setNetworkErrorMessage(message);
    setNetworkError(true);
  };

  const GetCartDetails = async () => {
    const cardID = getItem("BuyNowCartID", "local")
      ? getItem("BuyNowCartID", "local")
      : getItem("cartID", "local");
    const cartDetails = await GetCartItems(
      cardID,
      setCartStore
    );
    if (cartDetails?.message) {
      setLoader(false);
      handleErrorAlert(cartDetails?.message);
    } else {
      await GetCartItemServiceability(
        cartDetails,
        userDataItems,
        setCartStore,
        setUserDataItems
      );
      await getAddress();
    }
    setLoader(false);
  };

  const getAddress = async () => {
    const response = await GetCartAddresses(setCartStore);
    if (response?.message) {
      setLoader(false);
      handleErrorAlert(response?.message);
    }
    setLoader(false);
    setIsInitialRender(false);
    return response;
  };

  useEffect(() => {
    setLoader(true);
    if (!isInitialRender || getItem("BuyNowCartID", "local")) {
      GetCartDetails();
    } else {
      getAddress();
    }
  }, [userDataItems?.pincode]);

  useEffect(() => {
    const cartID = getItem("BuyNowCartID", "local")
      ? `${getItem("BuyNowCartID", "local")}`
      : `${getItem("cartID", "local")}`;
    client
      .query({
        query: CART_ACTIVE_INFO,
        variables: {
          cartId: cartID,
        },
      })
      .then((res) => {
       
        if (
          res?.data?.cart?.items?.length < 1 &&
          cartStore?.cartItems?.cart?.orderID
        ) {
          window.location.replace(
            `${window.location.origin}${JUSPAY_RETURN_URL}?order_id=${cartID}&status=AUTHORIZATION_FAILED`
          );
        }
      })
      .catch((err) => {
        if (cartStore?.cartItems?.cart?.orderID) {
          window.location.replace(
            `${window.location.origin}${JUSPAY_RETURN_URL}?order_id=${cartID}&status=AUTHORIZATION_FAILED`
          );
        }
        console.log("err>>:", err);
      });
  }, [global?.window?.location]);


  return (
    <Fragment>
      {displayLoader && <Loader />}
      <CustomSnackBar
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        snackMessage={snackMessage}
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
      {
        <PrimaryBox isMobile={isMobile}>
          <AddressTypography>{ADDRESS_TEXT}</AddressTypography>
          {!isMobile && (
            <DeliveryOptionsTypography>
              {DELIVERY_OPTION_AVAILABLE}
            </DeliveryOptionsTypography>
          )}
          <Grid container xs={12} spacing={2}>
            <Grid item xs={isMobile ? 12 : 8}>
              <PrimaryComponent
                CartAddressData={CartAddressData}
                setLoader={setLoader}
                addressTypography={data?.addressTypography}
                handleSnackBar={handleSnackBar}
                handleErrorAlert={handleErrorAlert}
                cartStore={cartStore}
                setCartStore={setCartStore}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4}>
              <SecondaryComponent
                handleErrorAlert={handleErrorAlert}
                cartStore={cartStore}
                setCartStore={setCartStore}
                handleSnackBar={handleSnackBar}
              />
            </Grid>
          </Grid>
        </PrimaryBox>
      }
    </Fragment>
  );
};

export default CartAddress;
  