import React, { useEffect } from "react";
import { useState } from "react";
import Loader from "../../../HOC/Loader/Loader";
import { PayButton } from "./CDCardsStyles";
import { useMobileCheck } from "../../../utility/isMobile";
import { merchant_id } from "../../../utility/APIConstants";
import client from "../../../apollo-client";
import { CREATE_JUSPAY_ORDER } from "../../../graphQLQueries/CartQuery";
import { SetPaymentMethodQuery } from "../../../graphQLQueries/PaymentQuery";
import useStorage from "../../../utility/useStoarge";
import { JUSPAY_RETURN_URL } from "../../../utility/Constants";
import { useRecoilState } from "recoil";
import { cartState } from "../../../recoilstore";
import callEventPay from "../PaymentAnalytics";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Cookies } from "react-cookie";
import handleErrorResponse from "../../../utility/ErrorHandling";
import { getSourceInfo } from "../../../utility/commonUtility";
import { CouponList } from "../../CartLayout/CouponQueries/CouponList";
let flag = true;

export default function CreditCardInput({
  handleError,
  CD,
  finalCheckCallBack,
  cmsData,
}: any) {
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [cardNoError, setCardNoError] = useState(false);
  const [cardErrMsg, setCardErrMsg] = useState(
    "Please enter a valid card number"
  );
  const [cardBin, setCardBin]: any = useState({});
  const [displayLoader, setLoader] = useState(false);
  const isMobile = useMobileCheck();
  const { getItem } = useStorage();
  const [cardNumberValid, setCardNumberValid] = useState(false);
  const [cardNameValid, setCardNameValid] = useState(false);
  const [expMonthValid, setExpMonthValid] = useState(false);
  const [expYrValid, setExpYrValid] = useState(false);
  const [cvvValid, setCvvValid] = useState(false);

  const [juspay_form, set_juspay_form] = useState<any>();
  const [couponCode, setCouponCode]= useState(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "")
  
  let couponExists:any;

  useEffect(() => {
    setCouponCode(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "" );
}, [cartStore?.cartItems]);

  const cookie = new Cookies();

  useEffect(() => {
    if (
      cardNumberValid &&
      cardNameValid &&
      expMonthValid &&
      expYrValid &&
      cvvValid
    ) {
      finalCheckCallBack("otherPayments", true);
    } else {
      finalCheckCallBack("otherPayments", false);
    }
  }, [
    cardNumberValid,
    cardNameValid,
    expMonthValid,
    expYrValid,
    cvvValid,
    cardBin,
  ]);
  const clickHandler = async () => {
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
    callEventPay(
      cartStore,
      undefined,
      undefined,
      cardBin?.card_type === "CREDIT" ? "CC" : "DC"
    );
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
      .then((juspayRes: any) => {
        const hasError =   handleErrorResponse( juspayRes?.data?.setPaymentMethodOnCart?.cart?.selected_payment_method) //response checking
        if (hasError) return null;
        if (
          juspayRes?.data?.setPaymentMethodOnCart?.cart?.selected_payment_method
        ) {
          client
            .mutate({
              mutation: CREATE_JUSPAY_ORDER,
              variables: {
                cart_id: getItem("BuyNowCartID", "local")
                  ? `${getItem("BuyNowCartID", "local")}`
                  : `${getItem("cartID", "local")}`,
                return_url: `${window.location.origin}${JUSPAY_RETURN_URL}`,
                method: cardBin?.card_type === "CREDIT" ? "CC" : "DC",
                saved_payment: false,
                access_token: cookie.get("accessToken"),
                source_from_info: getSourceInfo()
              },
            })
            .then((res: any) => {
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
                juspay_form?.submit_form({
                  success_handler: function (response: any) {
                  },
                  error_handler: function (response: any) {
                    setLoader(false);
                    handleError(response?.message);
                  },
                });
              }
            })
            .catch((error: any) => {
              console.log(error);
              handleError(error?.message);
              setLoader(false);
            });
        }
      })
      .catch((error: any) => {
        console.log(error);
        handleError(error?.message);
        setLoader(false);
      });
    }
  };

  useEffect(() => {
    if (CD != 0 && flag == true) {
      clickHandler();
      flag = false;
    }
  }, [CD]);

  useEffect(() => {
    startSetup("payment_form");
  }, [global?.window?.Juspay]);
  const startSetup = (id: any) => {
    let parent: any = document.getElementById("payment_form");
    let iframes: any = document.getElementsByTagName("iframe");
    let formExisting = false;
    for (const iframe of iframes) {
      if (
        iframe.src === `${process.env.NEXT_PUBLIC_JUSPAY_APIURL}/iframe-element`
      ) {
        formExisting = true;
      }
    }
    if (!formExisting) {
      if (window?.Juspay) {
        set_juspay_form(
          window?.Juspay.Setup({
            payment_form: "#payment_form",
            success_handler: function (status: any) { },
            error_handler: function (
              error_code: any,
              error_message: any,
              bank_error_code: any,
              bank_error_message: any,
              gateway_id: any
            ) { },
            tokenize_support: true,
            auto_tab_enabled: true,
            card_bin_digit_count: 6,
            iframe_elements: {
              card_number: {
                /* Class name of the <div> which will hold the iframe element for card number. */
                container: ".card_number_div",
                attributes: {
                  /* Field Attributes, which you want to set for the <input> field inside the iframe element. */
                  placeholder: "Card Number",
                },
              },
              name_on_card: {
                /* Class name of the <div> which will hold the iframe element for card holder name. */
                container: ".name_on_card_div",
                attributes: {
                  /* Field Attributes, which you want to set for the <input> field inside the iframe element. */
                  placeholder: "Name On Card",
                },
              },
              card_exp_month: {
                /* Class name of the <div> which will hold the iframe element for card expiry month. */
                container: ".card_exp_month_div",
                attributes: {
                  /* Field Attributes, which you want to set for the <input> field inside the iframe element. */
                  placeholder: "MM",
                },
              },
              card_exp_year: {
                /* Class name of the <div> which will hold the iframe element for card expiry year. */
                container: ".card_exp_year_div",
                attributes: {
                  /* Field Attributes, which you want to set for the <input> field inside the iframe element. */
                  placeholder: "YY",
                },
              },
              security_code: {
                /* Class name of the <div> which will hold the iframe element for card security code. */
                container: ".security_code_div",
                attributes: {
                  /* Field Attributes, which you want to set for the <input> field inside the iframe element. */
                  placeholder: "CVV",
                },
              },
            },
            styles: {
              /* Add common styling for all input fields here */
              input: {
                height: "44px",
                border: "1px solid #EAEAEA",
                "padding-left": "10px",
                color: isMobile ? "#231f20" : "#000000",
                "font-weight": "400",
                "font-size": "14px",
                "margin-bottom": "16px",
              },
              /* Add the styling for card number input field here */
              ".card_number": {
                "line-height": "20px",
                "font-size": "14px",
                color: isMobile ? "#231f20" : "#000000",
              },
              /* Add the styling for card holder name input field here */
              ".name_on_card": {
                "line-height": "20px",
                "font-size": "14px",
                color: isMobile ? "#231f20" : "#000000",
              },
              /* Add the styling for card expiry month input field here */
              ".card_exp_month": {
                "line-height": "20px",
                "font-size": "14px",
                width: "60px",
                color: isMobile ? "#231f20" : "#000000",
              },
              /* Add the styling for card expiry year input field here */
              ".card_exp_year": {
                "line-height": "20px",
                "font-size": "14px",
                width: "60px",
                color: isMobile ? "#231f20" : "#000000",
              },
              /* Add the styling for card security code input field here */
              ".security_code": {
                "line-height": "20px",
                "font-size": "14px",
                color: isMobile ? "#231f20" : "#000000",
              },
              /* Add the styling to be added to input fields in focus state */
              ":focus": {},
            },
            iframe_element_callback: function (event: any) {
              if (event.type == "touchstart") {
                let input = document.createElement("input");
                input.setAttribute("type", "text");
                parent.insertBefore(input, parent.firstChild);
                input.focus();
                input.blur();
                parent.removeChild(input);
              }
              console.log(event, "eventCallBack-->");
              if (event?.target_element === "card_number") {
                setCardBin(event);
                if (
                  event?.cardbin_info_fetch_error?.error_code ===
                  "object_not_found" &&
                  event?.empty === false &&
                  event?.card_isin
                ) {
                  setCardNoError(true);
                  setCardNumberValid(false);
                } else if (
                  event?.country !== "INDIA" &&
                  event?.empty === false &&
                  event?.card_isin
                ) {
                  setCardNoError(true);
                  setCardNumberValid(false);
                  setCardErrMsg(
                    "International cards are not allowed. Please use a different card"
                  );
                } else if (
                  event?.type === "blur" &&
                  event.valid === false &&
                  event?.brand !== "none" &&
                  event?.empty === false
                ) {
                  setCardNumberValid(false);
                  setCardNoError(true);
                } else if (!event?.card_isin && event.empty === false) {
                  setCardNoError(false);
                  setCardNumberValid(false);
                } else if (event.valid && event.empty === false) {
                        setCardNumberValid(true);
                        setCardNoError(false);
                    } else {
                        setCardNumberValid(false);
                      }
                    }
                    if (event?.target_element === "name_on_card") {
                      if (event.valid && event.empty === false) {
                        setCardNameValid(true);
                      } else {
                        setCardNameValid(false);
                      }
                    }
                    if (event?.target_element === "card_exp_month") {
                      if (event.valid && event?.empty === false) {
                        setExpMonthValid(true);
                      } else {
                        setExpMonthValid(false);
                      }
                    }
                    if (event?.target_element === "card_exp_year") {
                      if (event.valid && event.empty === false) {
                        setExpYrValid(true);
                      } else {
                        setExpYrValid(false);
                      }
                    }
                    if (event?.target_element === "security_code") {
                      if (event.valid && event.empty === false) {
                        setCvvValid(true);
                      } else {
                        setCvvValid(false);
                      }
                    }
                  },
                })
              );
            }
          }
        };
      

  return (
    <>
      {displayLoader && <Loader />}
      {!isMobile && (
        <Typography sx={{ fontWeight: "500", marginBottom: "20px" }}>
          Credit / Debit Card
        </Typography>
      )}
      <form className="juspay_inline_form" id="payment_form">
        <input type="hidden" className="merchant_id" value={merchant_id} />
        <input
          type="hidden"
          className="order_id"
          value={
            getItem("BuyNowCartID", "local")
              ? `${getItem("BuyNowCartID", "local")}`
              : `${getItem("cartID", "local")}`
          }
        />
        <input type="hidden" className="payment_method_type" value="CARD" />
        <div className="card_number_div"></div>
        {cardNoError && (
          <Typography
            component={"span"}
            sx={{ fontSize: "12px", color: "red" }}
          >
            {cardErrMsg}
          </Typography>
        )}
        <br />
        <div className="name_on_card_div"></div>
        <br />
        <div
          className="card_exp_month_div"
          style={{ display: "inline-block", width: "20%" }}
        ></div>
        <div
          className="card_exp_year_div"
          style={{ display: "inline-block", width: "20%", marginRight: "15px" }}
        ></div>
        <div
          className="security_code_div"
          style={{ display: "inline-block", width: "55%" }}
        ></div>
        <br />
        <input
          type="checkbox"
          style={{
            color: "#AD184C",
          }}
          className="juspay_locker_save"
          id="save_later"
        />{" "}
        <label htmlFor="save_later">Save this card for later</label>
        <br />
        <br />
        <input type="hidden" className="redirect" value="true" />
        {!isMobile && (
          <PayButton
            disabled={
              !cardNumberValid ||
              !cardNameValid ||
              !expMonthValid ||
              !expYrValid ||
              !cvvValid ||
              cartStore?.cartItems?.cart?.prices?.grand_total?.value <=
              cmsData?.ccValueordcValue
            }
            sx={{
              backgroundColor:
                !cardNumberValid ||
                  !cardNameValid ||
                  !expMonthValid ||
                  !expYrValid ||
                  !cvvValid ||
                  cartStore?.cartItems?.cart?.prices?.grand_total?.value <=
                  cmsData?.ccValueordcValue
                  ? "#e5e5e5 !important"
                  : "#DEA3B7",
            }}
            fullWidth
            onClick={clickHandler}
            id="common_pay_btn"
          >
            Pay Now
          </PayButton>
        )}
      </form>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: 400,
          fontSize: "14px",
          color: "#4F4C4D",
          paddingTop: "11px",
        }}
      >
        <img
          width={"16px"}
          height={"16px"}
          src={`${process.env.NEXT_PUBLIC_CMS_IMAGES_URL}/info_circle_7c73b4dcbf_0c2e99a971.png`
          }
          alt="info_circle"
        />
        <Typography sx={{ paddingLeft: "4px" }}>
          Minimum amount to be used is ₹{cmsData?.ccValueordcValue}
        </Typography>
      </Grid>
    </>
  );
}
