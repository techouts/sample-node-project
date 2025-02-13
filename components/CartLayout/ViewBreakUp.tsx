import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BoxStyled,
  LargeText,
  SmallText,
  StyledButton,
  TotalBox,
} from "./CartLayoutStyles";
import { TransitionProps } from "@mui/material/transitions";
import { useRouter } from "next/router";
import { useMobileCheck } from "../../utility/isMobile";
import useStorage from "../../utility/useStoarge";
import {
  ContinueButton,
  ContinueTypography,
  PriceTypography,
  ViewDetailsBox,
  ViewDetailsButton,
  ViewDetailsTypography,
} from "../CartAddress/PrimaryComponentStyled";
import ViewDetailsModal from "../CartAddress/VIewDetailsModal";
import Loader from "../../HOC/Loader/Loader";
import ViewEvent from "../../utility/viewEvent";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../../recoilstore";
import { Cookies } from "react-cookie";
import {
  PLACE_ORDER,
  CONTINUE,
  PAY_NOW,
  VIEW_BREAKUP,
  TOTAL_MRP,
  SS_WALLET,
  OFFER_DISCOUNT,
  FREE_SAMPLE_ADDED,
  TOTAL_SAVINGS,
  TOTAL_PAYABLE_AMOUNT,
  VIEW_DETAILS,
  JUSPAY_RETURN_URL,
  CONVENIENCE_FEE,
  FREE_TEXT,
} from "../../utility/Constants";
import { verifiedMarkMobile } from "./CartConstants";
import { ReplaceImage } from "../../utility/ReplaceImage";
import client from "../../apollo-client";
import {
  BorderBox,
  InfoIcon,
  PaddingBox,
  SimpleText,
} from "./ViewBreakUpStyles";
import {
  OrderPlaceQuery,
  SetPaymentMethodQuery,
} from "../../graphQLQueries/PaymentQuery";
import { CREATE_JUSPAY_ORDER } from "../../graphQLQueries/CartQuery";
import axios from "axios";
import { CardTransaction, merchant_id } from "../../utility/APIConstants";
import { dataLayer, placeOrderEvent } from "./CartAnalytics";
import { PlaceOrderForWallet } from "../../api/Payments/SsWalletApis";
import { SAVED_UPI_PAYMENTS } from "../../graphQLQueries/SavedUpiPaymentsQuery";
import { INFO_ICON } from "../../utility/AppIcons";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  GetCartAddresses,
  GetCartItems,
  GetCartItemServiceability,
} from "../../utility/CartServiceability";
import handleErrorResponse from "../../utility/ErrorHandling";
import { getSourceInfo } from "../../utility/commonUtility";
import { CouponList } from "./CouponQueries/CouponList";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { ShippingMethodsOnCart } from "../../api/Cart/CustomerCart";
import { updateCncDelivery } from "../../api/Cart/DeliveryAddress";
import { ExploreStoresCCAddress } from "./ExploreStoresCCAddress";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function ViewBreakUp({
  customerCartData,
  hideViewCart,
  currentPage,
  handleError,
  currentPayment,
  setCD,
  setNetBank,
  setUpi,
  setssWalletS,
  savedPaymentCvv,
  mobilePayOption,
  setSignInOpen,
  selectedWallet,
  finalCheck,
  value,
  topLevelBanks,
  radio,
  selectedUpiOrCard,
  cmsData,
  applyCoupon,
  storeModeType,
  disablePlaceOrder,
  openAddressChangeModal,
  setOpenAddressChangeModal
}: any) {
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const cookie = new Cookies();
  const infoIcon = AppIcons(INFO_ICON);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const isMobile = useMobileCheck();
  const [displayLoader, setLoader] = useState(false);
  const { getItem } = useStorage();
  const [freeSample, setFreeSample] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [finalPayNowEnable, setFinalPayNowEnable] = useState(false);
  const [noOfOutOfStocks, setOutOfStocks] = useState(0);
  const router = useRouter();
  const viewEventWrapper = useRef();
  ViewEvent(viewEventWrapper, dataLayer, "view");
  const [open, setOpen] = React.useState(false);
  const [ccModeStatus, setCcModeStatus] = useState<
    | "OPEN_ADDRESS_MODAL"
    | "CLOSE_ADDRESS_MODAL"
    | "INITIAL"
    | "PROCEED_TO_PAYMENT"
  >("INITIAL");
  const [couponCode, setCouponCode] = useState(applyCoupon);

  let placeOrderOutOfStock;

  let couponExists: any;

  interface Coupon {
    coupon_code: string;
    description: string;
    discount_amount: number;
    simple_action: string;
    __typename: string;
    coupon_applicable: string;
  }

  useEffect(() => {
    setCouponCode(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "");
  }, [cartStore?.cartItems]);

  const GetCartDetails = async () => {
    setLoader(true);
    const cardID = getItem("BuyNowCartID", "local")
      ? getItem("BuyNowCartID", "local")
      : getItem("cartID", "local");
    const cartDetails = await GetCartItems(cardID, setCartStore);
    placeOrderOutOfStock = cartDetails?.cart?.items?.filter(
      (item: { product: { stock_status: string } }) =>
        item?.product?.stock_status == "OUT_OF_STOCK"
    );
    if (couponCode) {
      setLoader(true);
      const applyCouponCodes = await CouponList();
      if (applyCouponCodes?.data?.getCouponCodes?.length !== 0) {
        const filteredCouponCodes: Coupon[] =
          applyCouponCodes?.getCouponCodes.filter((coupon: Coupon) => {
            const hasWeb = coupon.coupon_applicable.includes("Web");
            return hasWeb;
          });
        couponExists = filteredCouponCodes.some(
          (coupon) => coupon.coupon_code === couponCode
        );
      }
    }

    if (couponCode?.length > 0 && couponExists === false) {
      handleError("This coupon has expired. Please remove it and try another");
    } else if (
      couponCode?.length > 0 &&
      couponExists &&
      placeOrderOutOfStock?.length === 0 &&
      finalPayNowEnable === false
    ) {
      setLoader(false);
      handleRouter();
    } else if (
      couponCode?.length === 0 &&
      placeOrderOutOfStock?.length === 0 &&
      finalPayNowEnable === false
    ) {
      setLoader(false);
      handleRouter();
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
    if (
      response &&
      placeOrderOutOfStock?.length === 0 &&
      finalPayNowEnable === false
    ) {
      handleRouter();
      setLoader(false);
    } else {
      handleError("Some products are out of stock");
    }
    setLoader(false);
    return response;
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const handleViewDetailsOpen = () => {
    setViewDetails(true);
  };
  const handleClose = () => {
    setViewDetails(false);
  };
  const cashOnDeliveryPayment = async () => {
    if (couponCode) {
      setLoader(true);
      const applyCouponCodes = await CouponList();
      if (applyCouponCodes?.data?.getCouponCodes?.length !== 0) {
        const filteredCouponCodes: Coupon[] =
          applyCouponCodes?.getCouponCodes.filter((coupon: Coupon) => {
            const hasWeb = coupon.coupon_applicable.includes("Web");
            return hasWeb;
          });
        couponExists = filteredCouponCodes.some(
          (coupon) => coupon.coupon_code === couponCode
        );
      }
    }

    if (couponCode?.length > 0 && couponExists === false) {
      setLoader(false);
      handleError("This coupon has expired. Please remove it and try another");
    } else if (
      ((couponCode?.length > 0 && couponExists) || couponCode?.length === 0) &&
      cartStore?.cartItems?.cart?.items?.length > 0
    ) {
      setLoader(true);
      await client
        .mutate({
          mutation: SetPaymentMethodQuery,
          variables: {
            cartId: getItem("BuyNowCartID", "local")
              ? `${getItem("BuyNowCartID", "local")}`
              : `${getItem("cartID", "local")}`,
            code: "cashondelivery",
          },
        })
        .then((response: any) => {})
        .catch((error: any) => {
          console.log(error);
          handleError(error?.message);
        });
      await client
        .mutate({
          mutation: OrderPlaceQuery,
          variables: {
            cart_id: getItem("BuyNowCartID", "local")
              ? `${getItem("BuyNowCartID", "local")}`
              : `${getItem("cartID", "local")}`,
            access_token: cookie.get("accessToken"),
            source_from_info: getSourceInfo(),
          },
        })
        .then((response: any) => {
          const hasError = handleErrorResponse(response?.data); //response checking
          if (hasError) return null;
          if (response?.data) {
            const orderId =
              response?.data?.confirmPlaceOrder?.order?.order_number;
            window?.location.replace(
              `${window.location.origin}${JUSPAY_RETURN_URL}?id=${orderId}`
            );
          }
        })
        .catch((error: any) => {
          setLoader(false);
          handleError(error?.message);
        });
    }
  };
  const clickHandlerSSWallet = async () => {
    if (couponCode) {
      setLoader(true);
      const applyCouponCodes = await CouponList();
      if (applyCouponCodes?.data?.getCouponCodes?.length !== 0) {
        console.log("inside 1", applyCouponCodes?.getCouponCodes);
        const filteredCouponCodes: Coupon[] =
          applyCouponCodes?.getCouponCodes.filter((coupon: Coupon) => {
            console.log("check coupon", coupon);
            const hasWeb = coupon.coupon_applicable.includes("Web");
            return hasWeb;
          });
        couponExists = filteredCouponCodes.some(
          (coupon) => coupon.coupon_code === couponCode
        );
      }
    }

    if (couponCode?.length > 0 && couponExists === false) {
      setLoader(false);
      handleError("This coupon has expired. Please remove it and try another");
    } else if (
      ((couponCode?.length > 0 && couponExists) || couponCode?.length === 0) &&
      cartStore?.cartItems?.cart?.items?.length > 0
    ) {
      setLoader(true);
      await client
        .mutate({
          mutation: SetPaymentMethodQuery,
          variables: {
            cartId: getItem("BuyNowCartID", "local")
              ? `${getItem("BuyNowCartID", "local")}`
              : `${getItem("cartID", "local")}`,
            code: "free",
          },
        })
        .then((response: any) => {})
        .catch((error: any) => {
          handleError(error?.message);
          setLoader(false);
        });

      const orderData = await PlaceOrderForWallet(
        getItem("BuyNowCartID", "local")
          ? `${getItem("BuyNowCartID", "local")}`
          : `${getItem("cartID", "local")}`,
        cookie.get("accessToken"),
        getSourceInfo()
      );
      if (
        orderData &&
        orderData?.data?.confirmPlaceOrder?.order?.order_number
      ) {
        const orderId = orderData?.data?.confirmPlaceOrder?.order?.order_number;
        router?.push(`${JUSPAY_RETURN_URL}?id=${orderId}`);
      } else if (typeof orderData === undefined) {
        setLoader(false);
        handleError(orderData?.message);
      }
    }
  };
  const clickHandlerNB = async (value: any) => {
    if (couponCode) {
      setLoader(true);
      const applyCouponCodes = await CouponList();
      if (applyCouponCodes?.data?.getCouponCodes?.length !== 0) {
        const filteredCouponCodes: Coupon[] =
          applyCouponCodes?.getCouponCodes.filter((coupon: Coupon) => {
            const hasWeb = coupon.coupon_applicable.includes("Web");
            return hasWeb;
          });
        couponExists = filteredCouponCodes.some(
          (coupon) => coupon.coupon_code === couponCode
        );
      }
    }

    if (couponCode?.length > 0 && couponExists === false) {
      setLoader(false);
      handleError("This coupon has expired. Please remove it and try another");
    } else if (
      ((couponCode?.length > 0 && couponExists) || couponCode?.length === 0) &&
      cartStore?.cartItems?.cart?.items?.length > 0
    ) {
      setLoader(true);
      client
        .mutate({
          mutation: SetPaymentMethodQuery,
          variables: {
            cartId: getItem("BuyNowCartID", "local")
              ? `${getItem("BuyNowCartID", "local")}`
              : `${getItem("cartID", "local")}`,
            code: "juspay",
          },
        })
        .then((juspayRes) => {
          const hasError = handleErrorResponse(
            juspayRes?.data?.setPaymentMethodOnCart?.cart
              ?.selected_payment_method
          ); //response checking
          if (hasError) return null;
          if (
            juspayRes?.data?.setPaymentMethodOnCart?.cart
              ?.selected_payment_method
          ) {
            client
              .mutate({
                mutation: CREATE_JUSPAY_ORDER,
                variables: {
                  cart_id: getItem("BuyNowCartID", "local")
                    ? `${getItem("BuyNowCartID", "local")}`
                    : `${getItem("cartID", "local")}`,
                  return_url: `${window.location.origin}${JUSPAY_RETURN_URL}`,
                  method: value?.payment_method_type,
                  saved_payment: false,
                  access_token: cookie.get("accessToken"),
                  source_from_info: getSourceInfo(),
                },
              })
              .then((res) => {
                const hasError = handleErrorResponse(
                  res?.data?.placeJuspayOrder?.success
                ); //response checking
                if (hasError) return null;
                if (res?.data?.placeJuspayOrder?.success) {
                  setCartStore((lp: any) => {
                    return {
                      ...lp,
                      cartItems: {
                        cart: {
                          ...lp.cartItems.cart,
                          orderID: res?.data?.placeJuspayOrder?.order_id,
                        },
                      },
                    };
                  });
                  axios({
                    method: "post",
                    url: `${CardTransaction}`,
                    data: {
                      order_id: getItem("BuyNowCartID", "local")
                        ? `${getItem("BuyNowCartID", "local")}`
                        : `${getItem("cartID", "local")}`,
                      payment_method_type: value?.payment_method_type,
                      payment_method: value?.payment_method,
                      merchant_id: merchant_id,
                      save_to_locker: true,
                      redirect_after_payment: true,
                      format: "json",
                    },
                    headers: { "x-merchantid": merchant_id },
                  })
                    .then(function (response) {
                      setLoader(false);
                      if (response?.data?.payment?.authentication?.url) {
                        window.location.href =
                          response?.data?.payment?.authentication?.url;
                      }
                    })
                    .catch((error) => {
                      setLoader(false);
                      handleError(error?.message);
                    });
                }
              })
              .catch((err) => {
                console.log(err);
                setLoader(false);
                handleError(err?.message);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          handleError(err.message);
        });
    }
  };

  const handleRouter = async () => {
    if (cookie.get("accessToken")) {
      if (cartStore?.cartItems?.cart?.items?.length > 0) {
        if (currentPage == "cart") {
          if (couponCode) {
            setLoader(true);
            const applyCouponCodes = await CouponList();
            if (applyCouponCodes?.data?.getCouponCodes?.length !== 0) {
              const filteredCouponCodes: Coupon[] =
                applyCouponCodes?.getCouponCodes.filter((coupon: Coupon) => {
                  const hasWeb = coupon.coupon_applicable.includes("Web");
                  return hasWeb;
                });
              couponExists = filteredCouponCodes.some(
                (coupon) => coupon.coupon_code === couponCode
              );
            }
          }
        }
      }

      if (couponCode?.length > 0 && couponExists === false) {
        setLoader(false);
        handleError(
          "This coupon has expired. Please remove it and try another"
        );
      } else if (
        ((couponCode?.length > 0 && couponExists) ||
          couponCode?.length === 0) &&
        cartStore?.cartItems?.cart?.items?.length > 0
      ) {
        if (currentPage == "cart") {
          setLoader(true);
          if (
            userDataItems?.storeMode &&
            userDataItems?.storeModeType === "cc"
          ) {
            if (
              ccModeStatus === "INITIAL" ||
              ccModeStatus === "CLOSE_ADDRESS_MODAL"
            ) {
              setCcModeStatus("OPEN_ADDRESS_MODAL");
              return;
            } else if (ccModeStatus === "PROCEED_TO_PAYMENT") {
              const response = await updateCncDelivery(
                userDataItems?.storeCode,
                getItem("cartID", "local")
              );
              if (response?.data) {
                const shippingMethodOnCartResponse =
                  await ShippingMethodsOnCart(
                    getItem("cartID", "local"),
                    "freeshipping",
                    "freeshipping"
                  );
                if (shippingMethodOnCartResponse?.data) {
                  try {
                    await placeOrderEvent(
                      cartStore,
                      customerCartData,
                      userDataItems
                    );
                  } catch (error) {
                    console.error(error);
                  }
                  window.location.assign("/cart/payment");
                } else {
                  setLoader(false);
                  handleError(shippingMethodOnCartResponse?.message);
                }
              } else {
                setLoader(false);
                handleError(response?.message);
              }
            }
          } else {
            try {
              await placeOrderEvent(cartStore, customerCartData, userDataItems);
            } catch (error) {
              console.error(error);
            }
            setLoader(false);
            window.location.assign("/cart/address");
          }
        } else if (currentPage == "address") {
          setLoader(true);
          try {
            await placeOrderEvent(cartStore, customerCartData, userDataItems);
          } catch (error) {
            console.error(error);
          }
          setLoader(false);
          window.location.assign("/cart/payment");
        } else {
          if (currentPayment.toLowerCase() == "credit card / debit card") {
            setCD((prev: any) => prev + 1);
          } else if (currentPayment.toLowerCase() == "net banking") {
            setNetBank((prev: any) => prev + 1);
          } else if (currentPayment.toLowerCase() == "upi") {
            setUpi((prev: any) => prev + 1);
          } else if (
            cartStore?.cartItems?.cart &&
            cartStore?.cartItems?.cart?.prices?.grand_total?.value == "0" &&
            cartStore?.cartItems?.cart?.wallet_discount?.amount > 0
          ) {
            setssWalletS((prev: any) => prev + 1);
          }
        }
      }
    } else {
      setSignInOpen(true);
    }
  };
  const cardPayment = async (savedPaymentCvv: any, selectedWallet: any) => {
    if (couponCode) {
      setLoader(true);
      const applyCouponCodes = await CouponList();
      if (applyCouponCodes?.data?.getCouponCodes?.length !== 0) {
        console.log("inside 1", applyCouponCodes?.getCouponCodes);
        const filteredCouponCodes: Coupon[] =
          applyCouponCodes?.getCouponCodes.filter((coupon: Coupon) => {
            console.log("check coupon", coupon);
            const hasWeb = coupon.coupon_applicable.includes("Web");
            return hasWeb;
          });
        couponExists = filteredCouponCodes.some(
          (coupon) => coupon.coupon_code === couponCode
        );

        console.log("couponExists", couponExists);
      }
    }

    if (couponCode?.length > 0 && couponExists === false) {
      setLoader(false);
      handleError("This coupon has expired. Please remove it and try another");
    } else if (
      ((couponCode?.length > 0 && couponExists) || couponCode?.length === 0) &&
      cartStore?.cartItems?.cart?.items?.length > 0
    ) {
      setLoader(true);
      client
        .mutate({
          mutation: SetPaymentMethodQuery,
          variables: {
            cartId: getItem("BuyNowCartID", "local")
              ? `${getItem("BuyNowCartID", "local")}`
              : `${getItem("cartID", "local")}`,
            code: "juspay",
          },
        })
        .then((juspayRes) => {
          const hasError = handleErrorResponse(
            juspayRes?.data?.setPaymentMethodOnCart?.cart
              ?.selected_payment_method
          ); //response checking
          if (hasError) return null;
          if (
            juspayRes?.data?.setPaymentMethodOnCart?.cart
              ?.selected_payment_method
          ) {
            client
              .mutate({
                mutation: CREATE_JUSPAY_ORDER,
                variables: {
                  cart_id: getItem("BuyNowCartID", "local")
                    ? `${getItem("BuyNowCartID", "local")}`
                    : `${getItem("cartID", "local")}`,
                  return_url: `${window.location.origin}${JUSPAY_RETURN_URL}`,
                  method:
                    selectedWallet.length > 0
                      ? "UPI"
                      : savedPaymentCvv?.card_type === "DEBIT"
                      ? "DC"
                      : "CC",
                  saved_payment: selectedWallet.length > 0 ? true : false,
                  access_token: cookie.get("accessToken"),
                  source_from_info: getSourceInfo(),
                },
              })
              .then((res) => {
                const hasError = handleErrorResponse(
                  res?.data?.placeJuspayOrder?.success
                ); //response checking
                if (hasError) return null;
                if (res?.data?.placeJuspayOrder?.success) {
                  setCartStore((lp: any) => {
                    return {
                      ...lp,
                      cartItems: {
                        cart: {
                          ...lp.cartItems.cart,
                          orderID: res?.data?.placeJuspayOrder?.order_id,
                        },
                      },
                    };
                  });
                  axios({
                    method: "post",
                    url: `${CardTransaction}`,
                    data: {
                      order_id: getItem("BuyNowCartID", "local")
                        ? `${getItem("BuyNowCartID", "local")}`
                        : `${getItem("cartID", "local")}`,
                      payment_method_type:
                        selectedWallet.length > 0 ? "WALLET" : "CARD",
                      payment_method:
                        selectedWallet.length > 0
                          ? selectedWallet
                          : savedPaymentCvv?.card_brand,
                      card_token:
                        selectedWallet.length > 0
                          ? ""
                          : savedPaymentCvv?.card_token,
                      card_security_code:
                        selectedWallet.length > 0
                          ? ""
                          : savedPaymentCvv?.cardCvv,
                      merchant_id: merchant_id,
                      name_on_card:
                        selectedWallet.length > 0
                          ? ""
                          : savedPaymentCvv?.cardName,
                      redirect_after_payment: true,
                      format: "json",
                    },
                    headers: { "x-merchantid": merchant_id },
                  })
                    .then(function (response) {
                      setLoader(false);
                      if (response?.data?.payment?.authentication?.url) {
                        window.location.href =
                          response?.data?.payment?.authentication?.url;
                      }
                    })
                    .catch((error: any) => {
                      console.log(error);
                      setLoader(false);
                      handleError(error?.message);
                    });
                }
              })
              .catch((error: any) => {
                console.log(error);
                setLoader(false);
                handleError(error?.message);
              });
          }
        })
        .catch((error: any) => {
          console.log(error);
          setLoader(false);
          handleError(error?.message);
        });
    }
  };
  useEffect(() => {
    const outOfStock = cartStore?.cartItems?.cart?.items?.filter(
      (item: { product: { stock_status: string } }) =>
        item?.product?.stock_status == "OUT_OF_STOCK"
    );
    setOutOfStocks(outOfStock?.length || 0);
    const paymenthodSelected =
      currentPage == "payment"
        ? !(
            finalCheck?.savedUpi ||
            finalCheck?.savedCard ||
            finalCheck?.otherPayments
          )
          ? true
          : false
        : false;

    setFinalPayNowEnable(
      (cartStore?.serviceability?.cc ||
        cartStore?.serviceability?.ed ||
        cartStore?.serviceability?.sd) &&
        paymenthodSelected &&
        cartStore?.cartItems?.cart?.prices
    );
  }, [finalCheck, cartStore?.serviceability, cartStore?.cartItems]);

  const fetchTotalSavings = () => {
    const promotionTotal =
      parseFloat(cartStore?.cartItems?.cart?.promotion_total?.amount) || 0;
    const discountAmount =
      Math.abs(
        parseFloat(cartStore?.cartItems?.cart?.prices?.discount?.amount?.value)
      ) || 0;

    return (promotionTotal + discountAmount).toFixed(2);
  };

  const handlePayNow = async (upi: any) => {
    if (couponCode) {
      setLoader(true);
      const applyCouponCodes = await CouponList();
      if (applyCouponCodes?.data?.getCouponCodes?.length !== 0) {
        console.log("inside 1", applyCouponCodes?.getCouponCodes);
        const filteredCouponCodes: Coupon[] =
          applyCouponCodes?.getCouponCodes.filter((coupon: Coupon) => {
            console.log("check coupon", coupon);
            const hasWeb = coupon.coupon_applicable.includes("Web");
            return hasWeb;
          });
        couponExists = filteredCouponCodes.some(
          (coupon) => coupon.coupon_code === couponCode
        );

        console.log("couponExists", couponExists);
      }
    }

    if (couponCode?.length > 0 && couponExists === false) {
      setLoader(false);
      handleError("This coupon has expired. Please remove it and try another");
    } else if (
      ((couponCode?.length > 0 && couponExists) || couponCode?.length === 0) &&
      cartStore?.cartItems?.cart?.items?.length > 0
    ) {
      setLoader(true);

      const cartID = getItem("BuyNowCartID", "local")
        ? `${getItem("BuyNowCartID", "local")}`
        : `${getItem("cartID", "local")}`;

      client
        .mutate({
          mutation: SetPaymentMethodQuery,
          variables: {
            cartId: cartID,
            code: "juspay",
          },
        })
        .then((juspayRes) => {
          const hasError = handleErrorResponse(
            juspayRes?.data?.setPaymentMethodOnCart?.cart
              ?.selected_payment_method
          ); //response checking
          if (hasError) return null;
          if (
            juspayRes?.data?.setPaymentMethodOnCart?.cart
              ?.selected_payment_method
          ) {
            client
              .mutate({
                mutation: CREATE_JUSPAY_ORDER,
                variables: {
                  cart_id: cartID,
                  return_url: `${window.location.origin}${JUSPAY_RETURN_URL}`,
                  method: "UPI",
                  saved_payment: true,
                  access_token: cookie.get("accessToken"),
                  source_from_info: getSourceInfo(),
                },
              })
              .then((res) => {
                const hasError = handleErrorResponse(
                  res?.data?.placeJuspayOrder?.success
                ); //response checking
                if (hasError) return null;
                if (res?.data?.placeJuspayOrder?.success) {
                  setCartStore((lp: any) => {
                    return {
                      ...lp,
                      cartItems: {
                        cart: {
                          ...lp.cartItems.cart,
                          orderID: res?.data?.placeJuspayOrder?.order_id,
                        },
                      },
                    };
                  });
                  axios({
                    method: "post",
                    url: `${CardTransaction}`,
                    data: {
                      order_id: cartID,
                      payment_method_type: "UPI",
                      payment_method: "UPI",
                      merchant_id: merchant_id,
                      redirect_after_payment: true,
                      format: "json",
                      txn_type: "UPI_COLLECT",
                      upi_vpa: upi,
                    },
                    headers: { "x-merchantid": merchant_id },
                  })
                    .then(function (response) {
                      if (response?.data?.payment?.authentication?.url) {
                        client
                          .mutate({
                            mutation: SAVED_UPI_PAYMENTS,
                            variables: {
                              upi_id: upi,
                              isDefault: true,
                            },
                          })
                          .then((res) => {
                            const hasError = handleErrorResponse(res); //response checking
                            if (hasError) return null;
                            window.location.href =
                              response?.data?.payment?.authentication?.url;
                          })
                          .catch((error: any) => {
                            console.log(error);
                            // handleError(error.message);
                            setLoader(false);
                          });
                      }
                    })
                    .catch((error: any) => {
                      console.log(error);
                      // handleError(error.message);
                      setLoader(false);
                    });
                }
              })
              .catch((error: any) => {
                console.log(error);
                // handleError(error.message);
                setLoader(false);
              });
          }
        })
        .catch((error: any) => {
          console.log(error);
          // handleError(error.message);
          setLoader(false);
        });
    }
  };
  const isServiceAvailable = 
  (userDataItems?.storeMode && userDataItems?.storeModeType === "cc" && cartStore?.serviceability?.cc) || 
  cartStore?.serviceability?.ed || 
  cartStore?.serviceability?.sd;

  function checkDisable(){
    const mSitePlaceOrderCheck = !isServiceAvailable ||
    (noOfOutOfStocks == 0
      ? mobilePayOption === "Credit Card / Debit Card"
        ? cmsData?.ccValueordcValue <
            cartStore?.cartItems?.cart?.prices?.grand_total
              ?.value && finalPayNowEnable
        : mobilePayOption === "First Citizen Club"
        ? cmsData?.loyalityValue <
            cartStore?.cartItems?.cart?.prices?.grand_total
              ?.value && finalPayNowEnable
        : finalPayNowEnable
      : true)
    if(userDataItems?.storeMode){
      if(userDataItems?.storeModeType === "cc" && router.asPath === "/cart/info"){
        return !disablePlaceOrder
      } else {
        mSitePlaceOrderCheck
      }
    } else {
      return mSitePlaceOrderCheck
    } 
  } 
  const isMSitePlaceOrderDisabled = useMemo(checkDisable,[isServiceAvailable, noOfOutOfStocks, mobilePayOption, finalPayNowEnable, cmsData,disablePlaceOrder])
  console.log('isMSitePlaceOrderDisabled', isMSitePlaceOrderDisabled)

  useEffect(()=>{
    if(openAddressChangeModal){
      setCcModeStatus("OPEN_ADDRESS_MODAL")
    }
  },[openAddressChangeModal])
  console.log(ccModeStatus,"ccmode")
  return (
    <>
      {displayLoader && <Loader />}
      {!(isMobile && currentPage == "address") && (
        <BorderBox ref={viewEventWrapper}>
          {!hideViewCart && (
            <Stack
              p={
                isMobile ? (currentPage == "payment" ? "0px" : "14px") : "20px"
              }
              spacing={2}
            >
              <LargeText isMobile={isMobile}>{VIEW_BREAKUP}</LargeText>

              {cartStore?.cartItems?.cart?.prices?.subtotal_including_tax
                ?.value && (
                <Stack direction="row" justifyContent="space-between">
                  <SimpleText>{TOTAL_MRP}</SimpleText>
                  {cartStore?.cartItems?.cart?.prices && (
                    <SimpleText>
                      {`₹ ${cartStore?.cartItems?.cart?.prices?.subtotal_including_tax?.value?.toFixed(
                        2
                      )}`}
                    </SimpleText>
                  )}
                </Stack>
              )}
              {cartStore?.cartItems?.cart?.promotion_total?.amount && (
                <Stack direction="row" justifyContent="space-between">
                  <SimpleText>{OFFER_DISCOUNT}</SimpleText>
                  <SimpleText>{`-₹ ${parseFloat(
                    cartStore?.cartItems?.cart?.promotion_total?.amount
                  )?.toFixed(2)}`}</SimpleText>
                </Stack>
              )}
              {cartStore?.cartItems?.cart?.prices?.discount?.amount?.value && (
                <Stack direction="row" justifyContent="space-between">
                  <SimpleText>
                    {cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code && (
                      <>Coupon Discount</>
                    )}
                    &nbsp;
                  </SimpleText>
                  <SimpleText>
                    {`-₹ ${Math.abs(
                      cartStore?.cartItems?.cart?.prices?.discount?.amount
                        ?.value
                    )?.toFixed(2)}`}
                  </SimpleText>
                </Stack>
              )}
              {cartStore?.cartItems?.cart?.wallet_discount?.amount != null &&
                cartStore?.cartItems?.cart?.wallet_discount?.amount != "0" && (
                  <Stack direction="row" justifyContent="space-between">
                    <SimpleText>{SS_WALLET}</SimpleText>
                    <SimpleText>
                      - ₹{" "}
                      {parseFloat(
                        cartStore?.cartItems?.cart?.wallet_discount?.amount
                      )?.toFixed(2)}
                    </SimpleText>
                  </Stack>
                )}
              {cartStore?.cartItems?.cart?.prices?.loyalty_discount?.value >
                1 && (
                <Stack direction="row" justifyContent="space-between">
                  <SimpleText>
                    {
                      cartStore?.cartItems?.cart?.prices?.loyalty_discount
                        ?.label
                    }
                  </SimpleText>
                  <SimpleText>
                    - ₹{" "}
                    {parseFloat(
                      cartStore?.cartItems?.cart?.prices?.loyalty_discount
                        ?.value
                    )?.toFixed(2)}
                  </SimpleText>
                </Stack>
              )}
              {cartStore?.cartItems?.cart?.prices?.egv_discount?.value > 1 && (
                <Stack direction="row" justifyContent="space-between">
                  <SimpleText>
                    {cartStore?.cartItems?.cart?.prices?.egv_discount?.label}
                  </SimpleText>
                  <SimpleText>
                    - ₹{" "}
                    {parseFloat(
                      cartStore?.cartItems?.cart?.prices?.egv_discount?.value
                    )?.toFixed(2)}
                  </SimpleText>
                </Stack>
              )}
              <Stack direction="row" justifyContent="space-between">
                <SimpleText>
                  {CONVENIENCE_FEE}
                  {!router.asPath.includes("/payment") && (
                    <>
                      {!isMobile ? (
                        <Tooltip
                          PopperProps={{
                            disablePortal: true,
                            sx: {
                              "& .MuiTooltip-tooltip": {
                                backgroundColor: "#1c191a",
                                borderRadius: "0%",
                                color: "#fff",
                                padding: "5px 15px",
                                maxWidth: "none",
                                fontSize: "12px",
                              },
                              "& .MuiTooltip-arrow": {
                                color: "#1c191a",
                              },
                            },
                          }}
                          arrow
                          disableFocusListener
                          disableTouchListener
                          title="Final Delivery Charges Will Be Reflected On The Payment Page"
                        >
                          <InfoIcon
                            src={`${ReplaceImage(infoIcon?.url)}`}
                            alt="INFO_ICON"
                          />
                        </Tooltip>
                      ) : (
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                          <div>
                            <Tooltip
                              PopperProps={{
                                disablePortal: true,
                                sx: {
                                  "& .MuiTooltip-tooltip": {
                                    backgroundColor: "#1c191a",
                                    borderRadius: "0%",
                                    color: "#fff",
                                    padding: "5px 15px",
                                    maxWidth: "none",
                                    fontSize: "12px",
                                  },
                                  "& .MuiTooltip-arrow": {
                                    color: "#1c191a",
                                  },
                                },
                              }}
                              arrow
                              onClose={handleTooltipClose}
                              open={open}
                              disableFocusListener
                              disableHoverListener
                              disableTouchListener
                              title="Final Delivery Charges Will Be Reflected On The Payment Page"
                            >
                              <InfoIcon
                                onClick={handleTooltipOpen}
                                src={`${ReplaceImage(infoIcon?.url)}`}
                                alt="INFO_ICON"
                              />
                            </Tooltip>
                          </div>
                        </ClickAwayListener>
                      )}
                    </>
                  )}
                </SimpleText>
                <SimpleText>
                  {cartStore?.cartItems?.cart?.shipping_addresses?.[0]
                    ?.selected_shipping_method?.amount?.value == 0 ||
                  !cartStore?.cartItems?.cart?.shipping_addresses?.[0]
                    ?.selected_shipping_method
                    ? FREE_TEXT
                    : `₹ ${cartStore?.cartItems?.cart?.shipping_addresses?.[0]?.selected_shipping_method?.amount?.value?.toFixed(
                        2
                      )}`}
                </SimpleText>
              </Stack>
              {freeSample && (
                <Stack direction="row" spacing="4px" alignItems="center">
                  <img
                    width="16px"
                    height="16px"
                    src={`${ReplaceImage(verifiedMarkMobile)}`}
                    alt="tick"
                  ></img>
                  <SmallText>{FREE_SAMPLE_ADDED}</SmallText>
                </Stack>
              )}
            </Stack>
          )}
          {cartStore?.cartItems?.cart?.prices &&
            Number(fetchTotalSavings()) > 0 && (
              <TotalBox
                sx={{
                  marginTop: isMobile
                    ? currentPage == "payment"
                      ? "10px"
                      : "0px"
                    : "0px",
                }}
              >
                <Stack
                  direction="row"
                  spacing="4px"
                  justifyContent="space-between"
                >
                  <LargeText>{TOTAL_SAVINGS}</LargeText>
                  {cartStore?.cartItems?.cart &&
                    cartStore?.cartItems?.cart?.prices && (
                      <LargeText>{`₹ ${fetchTotalSavings()}`}</LargeText>
                    )}
                </Stack>
              </TotalBox>
            )}
          <PaddingBox
            sx={{
              marginTop: isMobile
                ? currentPage == "payment"
                  ? "10px"
                  : "0px"
                : "0px",
              padding: isMobile
                ? currentPage == "payment"
                  ? "0px 0px 16px 0px"
                  : "0px 16px 16px 16px"
                : "0px 20px",
            }}
          >
            <Stack direction="row" spacing="4px" justifyContent="space-between">
              <LargeText sx={{ fontSize: isMobile ? "14px" : "16px" }}>
                {TOTAL_PAYABLE_AMOUNT}
              </LargeText>
              <LargeText>
                {cartStore?.cartItems?.cart?.prices &&
                  `₹ ${cartStore?.cartItems?.cart?.prices?.grand_total?.value?.toFixed(
                    2
                  )}`}
              </LargeText>
            </Stack>
            {!isMobile && currentPage != "payment" && (
              <StyledButton
                disabled={
                  userDataItems?.storeMode && userDataItems?.storeModeType
                    ? userDataItems?.storeModeType === "sd"
                      ? !isServiceAvailable ||
                        (noOfOutOfStocks == 0 ? finalPayNowEnable : true)
                      : !disablePlaceOrder
                    : !isServiceAvailable ||
                      (noOfOutOfStocks == 0 ? finalPayNowEnable : true)
                }
                $isCartPage={true}
                fullWidth
                onClick={() => {
                  if (
                    userDataItems?.storeMode &&
                    userDataItems?.storeModeType === "cc"
                  ) {
                    handleRouter();
                  } else {
                    isServiceAvailable && GetCartDetails();
                  }
                }}
                sx={{
                  opacity: isServiceAvailable ? "1" : "0.5",
                }}
              >
                {PLACE_ORDER}
              </StyledButton>
            )}
          </PaddingBox>
        </BorderBox>
      )}
      {isMobile && (
        <>
          <ViewDetailsBox isMobile={isMobile}>
            <ViewDetailsButton onClick={handleViewDetailsOpen}>
              {cartStore?.cartItems?.cart?.prices && (
                <PriceTypography>
                  {`₹ ${cartStore?.cartItems?.cart?.prices?.grand_total?.value?.toFixed(
                    2
                  )}`}
                </PriceTypography>
              )}
              <ViewDetailsTypography>{VIEW_DETAILS}</ViewDetailsTypography>
            </ViewDetailsButton>
            <ContinueButton
              disabled={
                isMSitePlaceOrderDisabled
              }
            >
              <ContinueTypography
                onClick={() => {
                  if (currentPage == "payment") {
                    if (isMobile && mobilePayOption == "Cash On Delivery") {
                      cashOnDeliveryPayment();
                    } else if (mobilePayOption == "Net Banking") {
                      clickHandlerNB(
                        value?.payment_method ? value : topLevelBanks
                      );
                    } else if (mobilePayOption == "SS Wallet") {
                      clickHandlerSSWallet();
                    } else if (
                      radio?.includes("UPI[") ||
                      mobilePayOption === "Pay by any UPI app"
                    ) {
                      handlePayNow(selectedUpiOrCard);
                    } else {
                      cardPayment(savedPaymentCvv, selectedWallet);
                    }
                  }
                  handleRouter();
                }}
              >
                {" "}
                {currentPage == "cart"
                  ? PLACE_ORDER
                  : currentPage == "address"
                  ? CONTINUE
                  : isMobile && mobilePayOption == "Cash On Delivery"
                  ? PLACE_ORDER
                  : PAY_NOW}
              </ContinueTypography>
            </ContinueButton>
          </ViewDetailsBox>
          <Dialog
            sx={{ display: !isMobile ? "none" : "" }}
            fullScreen
            open={viewDetails}
            onClose={handleClose}
            TransitionComponent={Transition}
            PaperProps={{
              sx: {
                position: "fixed",
                height: "auto",
                bottom: "0",
                borderRadius: "30px 30px 0px 0px",
                boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Box
              pb={0}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ViewDetailsModal
                customerCartData={cartStore?.cartItems}
                cartStore={cartStore}
              />
            </Box>
            <Divider />
          </Dialog>
        </>
      )}
      {ccModeStatus === "OPEN_ADDRESS_MODAL" && (
        <BoxStyled>
          <BasicModal
            top={"50%"}
            width={isMobile ? "100%" : "521px"}
            left={"50%"}
            height={isMobile ? "70%" : "50%"}
            overflowData={
              cartStore?.userAddresses?.addresses.length > 0 ? "scroll" : "none"
            }
            open={ccModeStatus}
            handleClose={() => {
              setCcModeStatus("CLOSE_ADDRESS_MODAL");
              setOpenAddressChangeModal(false)
            }}
            Component={
              <ExploreStoresCCAddress
                setLoader={setLoader}
                handleErrorAlert={handleError}
                handleClose={() => {
                  setCcModeStatus("PROCEED_TO_PAYMENT");
                  setOpenAddressChangeModal(false)
                }}
              />
            }
          ></BasicModal>
        </BoxStyled>
      )}
    </>
  );
}

export default ViewBreakUp;
