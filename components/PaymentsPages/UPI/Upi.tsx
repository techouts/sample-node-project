import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import client from "../../../apollo-client";
import {
  SetPaymentMethodQuery,
  VERIFY_UPI,
} from "../../../graphQLQueries/PaymentQuery";
import Loader from "../../../HOC/Loader/Loader";
import { CardTransaction, merchant_id } from "../../../utility/APIConstants";
import axios from "axios";
import { CREATE_JUSPAY_ORDER } from "../../../graphQLQueries/CartQuery";
import useStorage from "../../../utility/useStoarge";
import { SAVED_UPI_PAYMENTS } from "../../../graphQLQueries/SavedUpiPaymentsQuery";
import { JUSPAY_RETURN_URL } from "../../../utility/Constants";
import { useMobileCheck } from "../../../utility/isMobile";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { toast } from "../../../utility/Toast";
import { TickCircleWarning } from "../../CartLayout/CartConstants";
import callEventPay from "../PaymentAnalytics";
import { useRecoilState } from "recoil";
import { cartState } from "../../../recoilstore";
import { Cookies } from "react-cookie";
import QRCodePayment from "./QRCodePayment";
import { getSourceInfo } from "../../../utility/commonUtility";
import handleErrorResponse from "../../../utility/ErrorHandling";
import { CouponList } from "../../CartLayout/CouponQueries/CouponList";
let flag = true;

export const UpiComponent = ({
  handleError,
  Upi,
  selectedOption,
  finalCheckCallBack,
  openCancelTransModal,
  setOpenCancelTransModal,
  setSelectedUpiOrCard
}: any) => {
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [openGooglePay, setOpenGooglePay] = useState(false);
  const [verify, setVerify] = useState(false);
  const [match, setMatch] = useState("");
  const [failed, setFailed] = useState(false);
  const [displayLoader, setLoader] = useState(false);
  const [upiUrl, setUpiUrl] = useState("");

  const [couponCode, setCouponCode]= useState(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "")
  
  let couponExists:any;

  const { getItem } = useStorage();
  const cartID = getItem("BuyNowCartID", "local")
      ? `${getItem("BuyNowCartID", "local")}`
      : `${getItem("cartID", "local")}`;

  useEffect(() => {
        setCouponCode(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "" );
    }, [cartStore?.cartItems]);

  const closeCancelTransModal = () => {
    setOpenCancelTransModal({
      ...openCancelTransModal,
      enable: false,
    });
  };

  const cancelTransaction = () => {
    window.location.replace(
      `${window.location.origin}${JUSPAY_RETURN_URL}?order_id=${cartID}&status=AUTHORIZATION_FAILED`
    );
  };


  const cookie = new Cookies();

  const matchUpi = () => {
    if (matches.test(match)) {
      setLoader(true);
      client
        .mutate({
          mutation: VERIFY_UPI,
          variables: {
            input: match,
          },
        })
        .then((response: any) => {
       const hasError =   handleErrorResponse(response?.data?.validateVPA?.status) //response checking
       if (hasError) return null;
          if (response?.data?.validateVPA?.status === "VALID") {
            setVerify(true);
            setFailed(false);
            setLoader(false);
            setSelectedUpiOrCard(match)
          } else {
            setFailed(true);
            setVerify(false);
            setLoader(false);
          }
        })
        .catch((error: any) => {
          console.log(error);
          handleError(error?.message);
        })
        .finally(() => setLoader(false));
    } else {
      setFailed(true);
      setVerify(false);
      setLoader(false);
    }
  };
  let matches = /[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}/;

  const handlePayNow = async ({ isQR = false }: { isQR?: boolean }) => {
    if (couponCode) {
      setLoader(true);
      const applyCouponCodes = await CouponList();
      if (applyCouponCodes?.data?.getCouponCodes?.length !== 0) {
        console.log("inside 1",applyCouponCodes?.getCouponCodes);
        interface Coupon {
          coupon_code: string;
          description: string;
          discount_amount: number;
          simple_action: string;
          __typename: string;
          coupon_applicable:string;
      }
        const filteredCouponCodes: Coupon[] = applyCouponCodes?.getCouponCodes
        .filter((coupon: Coupon) => {
          console.log("check coupon",coupon);
            const hasWeb = coupon.coupon_applicable.includes("Web");
            return hasWeb;
        })
         couponExists = filteredCouponCodes.some(coupon => coupon.coupon_code === couponCode);
  
        console.log("couponExists",couponExists);
      }
    }
    if(couponCode?.length>0 && couponExists === false){
      setLoader(false);
      handleError("This coupon has expired. Please remove it and try another")
    }else if ((couponCode?.length>0 && couponExists)|| couponCode?.length=== 0){
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
       const hasError =   handleErrorResponse( juspayRes?.data?.setPaymentMethodOnCart?.cart?.selected_payment_method) //response checking
       if (hasError) return null;
        if (
          juspayRes?.data?.setPaymentMethodOnCart?.cart?.selected_payment_method
        ) {
          client
            .mutate({
              mutation: CREATE_JUSPAY_ORDER,
              variables: {
                cart_id: cartID,
                return_url: `${window.location.origin}${JUSPAY_RETURN_URL}`,
                method: "UPI",
                saved_payment: false,
                access_token: cookie.get("accessToken"),
                source_from_info: getSourceInfo(),
              },
            })
            .then((res) => {
       const hasError =   handleErrorResponse(res?.data?.placeJuspayOrder?.success) //response checking
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

                if (isQR) {
                  axios
                    .post("/api/upi-initiate", { orderid: cartID })
                    .then((res) => {
                      setUpiUrl(res?.data?.upi_url);
                      setOpenCancelTransModal({
                        ...openCancelTransModal,
                        qrCreated: true,
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      setLoader(false);
                      handleError(err?.message);
                    });

                  setLoader(false);
                  return;
                }

                axios({
                  method: "post",
                  url: `${CardTransaction}`,
                  data: {
                    order_id: getItem("BuyNowCartID", "local")
                      ? `${getItem("BuyNowCartID", "local")}`
                      : `${getItem("cartID", "local")}`,
                    payment_method_type: "UPI",
                    payment_method: "UPI",
                    merchant_id: merchant_id,
                    redirect_after_payment: true,
                    format: "json",
                    txn_type: "UPI_COLLECT",
                    upi_vpa: match,
                  },
                  headers: { 'x-merchantid': merchant_id }
                })
                  .then(function (response) {
                     if (response?.data?.payment?.authentication?.url) {
                      client
                        .mutate({
                          mutation: SAVED_UPI_PAYMENTS,
                          variables: {
                            upi_id: match,
                            isDefault: true,
                          },
                        })
                        .then((res) => {
       const hasError =   handleErrorResponse(res) //response checking
       if (hasError) return null;
                          window.location.href =
                            response?.data?.payment?.authentication?.url;
                        })
                        .catch((error: any) => {
                          console.log(error);
                          setLoader(false);
                          handleError(error?.message);
                        });
                      setOpenGooglePay(true);
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
    if (verify == true) {
      finalCheckCallBack("otherPayments", true);
    }
  }, [verify]);

  useEffect(() => {
    async function forMatchUPI() {
      if (verify == true) {
        if (Upi != 0 && flag == true) {
          handlePayNow({});
          flag = false;
          setTimeout(() => {
            flag = true;
          }, 1);
        }
      }
    }
    forMatchUPI();
  }, [Upi]);

  let isCheck = useMobileCheck();

  return (
    <>
      {displayLoader && <Loader />}
      {!!upiUrl ? (
        <QRCodePayment
        orderId={cartID}
          upiUrl={upiUrl}
          openCancelTransModal={openCancelTransModal}
          cancelTransaction={cancelTransaction}
          closeCancelTransModal={closeCancelTransModal}
          setOpenCancelTransModal={setOpenCancelTransModal}
        />
      ) : (
        <Box>
          <Typography
            sx={{ fontSize: "16px", fontWeight: 600, marginBottom: "7px" }}>
            Scan the QR using any UPI app
          </Typography>
          <Typography>
            on your mobile phone like PhonePe, Paytm, GooglePay, BHIM, etc
          </Typography>
          <img
            src="/qr_img.png"
            style={{ width: "180px", height: "180px", margin: "10px 0" }}
            alt="qr_img"
          />
          <Button
            sx={{
              height: "44px",
              width: "100%",
              backgroundColor: "#DEA3B7",
              borderRadius: "none",
              color: "black",
              marginBottom: "15px",
              "&:hover": {
                backgroundColor: "#DEA3B7",
                color: "black",
              },
            }}
            onClick={() => {
              handlePayNow({ isQR: true });
            }}>
            Generate QR Code
          </Button>
          {isCheck ? (
            ""
          ) : (
            <Typography sx={{ fontWeight: "500" }}>
              Pay by any UPI app
            </Typography>
          )}
          {!isCheck && <Divider sx={{ margin: "20px 0px" }}></Divider>}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
              paddingBottom: isCheck ? "16px" : "",
            }}>
            <TextField
              aria-label="UPI-ID"
              sx={{
                height: isCheck ? "" : "49px",
                borderRadius: "unset",
                color: "#A7A5A6",
                border: "none",
                "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input":
                  {
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  },
              }}
              placeholder="Enter UPI ID Here"
              onChange={(e) => setMatch(e.target.value)}
              fullWidth
              InputProps={{
                style: {
                  padding: 0,
                  margin: 0,
                  borderRadius: 0,
                },
                endAdornment: (
                  <Button
                    sx={{
                      borderRadius: 0,
                      padding: "13.5px 19.5px",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      backgroundColor: "#231F20",
                      margin: "5px",
                      color: "#DEA3B7",
                      "&:hover": {
                        backgroundColor: "#231F20",
                        color: "#DEA3B7",
                      },
                    }}
                    onClick={() => matchUpi()}>
                    VERIFY
                  </Button>
                ),
              }}
            />
          </Box>
          {failed && (
            <p style={{ color: "red" }}>Please enter a valid UPI ID</p>
          )}

          {verify && (
            <>
              <Stack
                direction={"row"}
                sx={{ padding: isCheck ? "0px 0px 20px 0px" : "20px 0px" }}>
                <img
                  src={`${ReplaceImage(TickCircleWarning)}`}
                  alt="tick circle"
                  width={"24px"}
                  height={"24px"}
                />
                <Typography
                  sx={{
                    lineHeight: "24px",
                    paddingLeft: "5px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}>
                  Verified
                </Typography>
              </Stack>
              {isCheck ? (
                ""
              ) : (
                <Button
                  sx={{
                    height: "44px",
                    width: "100%",
                    backgroundColor: "#DEA3B7",
                    borderRadius: "none",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#DEA3B7",
                      color: "black",
                    },
                  }}
                  onClick={() => {
                    callEventPay(
                      cartStore,
                      undefined,
                      undefined,
                      selectedOption
                    );
                    handlePayNow({});
                  }}>
                  PAY NOW
                </Button>
              )}
            </>
          )}
          {openGooglePay && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
              }}>
              Open Google Pay mobile app and approve payment
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};
