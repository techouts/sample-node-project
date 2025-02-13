import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  ApplyWalletAmount,
  OTPforWallet,
  PlaceOrderForWallet
} from "../../../api/Payments/SsWalletApis";
import client from "../../../apollo-client";
import { SetPaymentMethodQuery } from "../../../graphQLQueries/PaymentQuery";
import Loader from "../../../HOC/Loader/Loader";
import useStorage from "../../../utility/useStoarge";
import { toast } from "../../../utility/Toast";
import { Cookies } from "react-cookie";
import { OtpComponentLogic } from "../../SigninComponent/MobileOtpScreen/OtpComponentLogic";
import { PayButton, TextTypography } from "../FirstCitizen/OtpStyled";
import { useRecoilValue } from "recoil";
import {  userState } from "../../../recoilstore";
import { useMobileCheck } from "../../../utility/isMobile";
import { ResendTimer } from "../../SigninComponent/MobileOtpScreen/MobileOtpStyled";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { CloseCircleWarning } from "../../CartLayout/CartConstants";
import callEventPay from "../PaymentAnalytics";
import { JUSPAY_RETURN_URL } from "../../../utility/Constants";
import { CustomSnackBar } from "../../../HOC/CustomSnackBar/CustomSnackBar";
import { getSourceInfo } from "../../../utility/commonUtility";
import handleErrorResponse from "../../../utility/ErrorHandling";
import { CouponList } from "../../CartLayout/CouponQueries/CouponList";


// import data from "./SsWallet.json";
let flag = true;
const SsWallet = (props: any) => {
  const {
    childData,
    walletId,
    isChecked,
    setIsChecked,
    balanceAmount,
    handleError,
    setIsLoaded,
    setViewBreakUpOptions,
    setInValidPaymentsOptions,
    ssWalletS,
    selectedOption,
    cartStore,
    setCartStore,
    finalCheckCallBack,
    unCheckSsWallet,
  } = props;
  const cookie = new Cookies();
  const [otp, setOtp] = useState("");
  const [resetOtpFields, setResetOtpFields] = useState(false);
  const [showPayNow, setShowPayNow] = useState(
    cartStore?.cartItems?.cart?.prices?.grand_total?.value <= balanceAmount &&
      Number(cartStore?.cartItems?.cart?.wallet_discount?.amount) > 0
      ? true
      : false
  );
  const userDataItems = useRecoilValue(userState);
  const [toastMessage, setToastMessage] = useState(
    "An OTP has been sent again."
  );
  const { getItem, setItem } = useStorage();
  const [invalidOtp, setIsInvalidOtp] = useState(false);
  const [displayLoader, setLoader] = useState(false);
  const router = useRouter();
  const [walletOtpData, setWalletOtpData] = useState<any>();
  const [displayOtpScreen, setDisplayOtpScreen] = useState(false);
  const [cartID, setCartID] = useState(
    getItem("BuyNowCartID", "local")
      ? `${getItem("BuyNowCartID", "local")}`
      : `${getItem("cartID", "local")}`
  );
  let number = getItem("mobileNumber", "local")?.toString();
  let phnumber = number
    ? number?.replace(number?.substring(2, 8), "XXXXXX")
    : "";
  const [counter, setCounter] = useState(0);
  const [resendMes, setResendMes] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [couponCode, setCouponCode]= useState(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "")
  
  let couponExists:any;

  useEffect(() => {
    setCouponCode(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "" );
}, [cartStore?.cartItems]);

  useEffect(() => {
    if (props?.walletUsed?.amount > 0) {
      setInValidPaymentsOptions(["Cash On Delivery"]);
    }
  }, [props?.walletUsed?.amount]);

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  useEffect(() => {
    if (ssWalletS && showPayNow && flag == true) {
      clickHandler();
      flag = false;
    }
  }, [ssWalletS]);

  const handleChange = async (event: any) => {
    const checked = event.target.checked;
    setIsLoaded(true);
    if (checked) {
      const walletOtp = await OTPforWallet(cartID, cookie.get("accessToken"));
      if (walletOtp?.data?.otpForWallet?.status) {
        setWalletOtpData(walletOtp);
        setIsLoaded(false);
        setDisplayOtpScreen(true);
      } else if (typeof walletOtp === undefined) {
        setIsLoaded(false);
        handleError(walletOtp?.message);
      }
    } else {
      await unCheckSsWallet();
      setShowPayNow(false);
    }
  };

  const clickHandler = async () => {
    setLoader(true);
    await client
      .mutate({
        mutation: SetPaymentMethodQuery,
        variables: {
          cartId: cartID,
          code: "free",
        },
      })
      .then((response: any) => {
      })
      .catch((error: any) => {
        console.log(error);
        handleError(error?.message);
        setIsLoaded(false);
      });

    callEventPay(
      cartStore,
      balanceAmount,
      props?.walletUsed?.amount,
      selectedOption
    );

    const orderData = await PlaceOrderForWallet(
      cartID,
      cookie.get("accessToken"),
      getSourceInfo()
    );
    if (orderData && orderData?.data?.confirmPlaceOrder?.order?.order_number) {
      const orderId = orderData?.data?.confirmPlaceOrder?.order?.order_number;
      router?.push(`${JUSPAY_RETURN_URL}?id=${orderId}`);
    } else if (typeof orderData === undefined) {
      setIsLoaded(false);
      handleError(orderData?.message);
    }
  };

  const verifyOtp = async () => {
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
      balanceAmount,
      props?.walletUsed?.amount,
      selectedOption
    );
    if (walletOtpData?.data?.otpForWallet?.status && otp.length == 6) {
      setIsLoaded(true);
      const response = await ApplyWalletAmount(
        cartID,
        cartStore?.cartItems?.cart?.prices?.grand_total?.value > balanceAmount
          ? balanceAmount
          : cartStore?.cartItems?.cart?.prices?.grand_total?.value,
        otp
      );
      setIsLoaded(false);
      setDisplayOtpScreen(false);
      if (response?.data) {
        setIsChecked({
          ["isChecked"]: true,
        });
        setCartStore((lp: any) => {
          return {
            ...lp,
            cartItems: {
              cart: {
                ...lp.cartItems.cart,
                prices: response?.data?.applyWalletAmount?.prices,
                wallet_discount:
                  response?.data?.applyWalletAmount?.wallet_discount,
              },
            },
          };
        });
        if (
          response?.data?.applyWalletAmount?.prices?.grand_total?.value >
          balanceAmount
        ) {
          setViewBreakUpOptions((previousData: any) => ({
            ...previousData,
            ssWalletAmount: balanceAmount,
          }));
          setInValidPaymentsOptions(["Cash On Delivery"]);
        } else if (
          response?.data?.applyWalletAmount?.prices?.grand_total?.value <=
          balanceAmount
        ) {
          setShowPayNow(true);
          setViewBreakUpOptions((previousData: any) => ({
            ...previousData,
            ssWalletAmount:
              cartStore?.cartItems?.cart?.prices?.grand_total?.value,
          }));
          setInValidPaymentsOptions(["Cash On Delivery"]);
        }
      } else if (typeof response === undefined) {
        handleError(response?.message);
      } else {
        setResendMes(true);
        setSnackBarOpen(true);
        setToastMessage(response?.message);
      }
      response?.data?.applyWalletAmount?.wallet_discount?.amount > 0 &&
        response?.data?.applyWalletAmount?.prices?.grand_total?.value == 0 &&
        clickHandler();
    } else {
      setIsInvalidOtp(true);
    }
  }
  };

  const VerifyHandler = () => {
    console.log("kjhdkh");
  };

  const resendOTP = async () => {
    setIsLoaded(true);
    const walletOtp = await OTPforWallet(cartID, cookie.get("accessToken"));
    if (walletOtp?.data?.otpForWallet?.status) {
      setWalletOtpData(walletOtp);
      setIsLoaded(false);
      setCounter(30);
      setSnackBarOpen(true);
      setToastMessage("An OTP has been sent again.");
      setResendMes(true);
      setDisplayOtpScreen(true);
    } else if (typeof walletOtp === undefined) {
      setIsLoaded(false);
      handleError(walletOtp?.message);
    }
  };

  let isCheck = useMobileCheck();
  const otptimer = () => {
    if (counter != 0) {
      return (
        <ResendTimer sx={{ textAlign: "center" }}>
          {"Resend in "}
          00:{counter < 10 ? `0${counter}` : counter}
        </ResendTimer>
      );
    } else
      return (
        <Box sx={{ textAlign: "center" }} id="resend">
          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: "150%",
              color: "red",
              textAlign: "center",
            }}
          >
            {invalidOtp && "Please enter a valid OTP"}
          </Typography>
          <TextTypography>
            Didn’t receive an SMS? <span onClick={resendOTP}>Resend OTP</span>
          </TextTypography>
        </Box>
      );
  };
  useEffect(() => {
    if (
      cartStore?.cartItems?.cart?.wallet_discount?.amount > 0 &&
      cartStore?.cartItems?.cart?.prices?.grand_total?.value == 0
    ) {
      finalCheckCallBack("otherPayments", true);
      setIsChecked({
        ["isChecked"]: true,
      });
    } else if (cartStore?.cartItems?.cart?.wallet_discount?.amount > 0) {
      setIsChecked({
        ["isChecked"]: true,
      });
    } else {
      finalCheckCallBack("otherPayments", false);
    }
  }, [cartStore]);
  useEffect(() => {
    if (displayOtpScreen) {
      setCounter(30);
    }
  }, [displayOtpScreen]);

  return (
    <>
      {displayLoader && <Loader />}
      {resendMes && (
        <CustomSnackBar
          position="absolute"
          snackBarOpen={snackBarOpen}
          setSnackBarOpen={setSnackBarOpen}
          snackMessage={toastMessage}
        ></CustomSnackBar>
      )}
      <>
        {displayOtpScreen ? (
          <Box>
            {!isCheck && (
              <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
                {"SS Wallet"}
              </Typography>
            )}
            {!isCheck && <Divider sx={{ margin: "20px 0px" }}></Divider>}
            <Typography
              sx={{ float: "right" }}
              onClick={() => {
                setCounter(0);
                setDisplayOtpScreen(false);
              }}
            >
              <img
                src={`${ReplaceImage(CloseCircleWarning)}`}
                alt="close_icon"
              />
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                lineHeight: "24px",
                color: "#1C191A",
                textAlign: "center",
              }}
            >
              VERIFY PHONE NO. WITH OTP
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "140%",
                color: "#4F4C4D",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Enter the OTP sent to your phone number
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "150%",
                color: "#656263",
                textAlign: "center",
                marginTop: "25px",
                marginBottom: "20px",
              }}
            >
              OTP sent to{" "}
              <Typography sx={{ color: "#AD184C" }} component="span">
                {phnumber}
              </Typography>
            </Typography>
            <OtpComponentLogic
              setOtp={setOtp}
              resetOtpFields={resetOtpFields}
              VerifyHandler={VerifyHandler}
              invalidOtp={invalidOtp}
              setIsInvalidOtp={setIsInvalidOtp}
            />
            <Box
              sx={{
                pt: "28px",
                pb: "30px  ",
                "@media (max-width:600px)": {
                  pt: "25px",
                  pb: "25px",
                },
              }}
            >
              {otptimer()}
            </Box>
            <PayButton
              sx={{ paddingBottom: isCheck ? "" : "10px" }}
              onClick={verifyOtp}
            >
              {cartStore?.cartItems?.cart?.prices?.grand_total?.value == 0
                ? "Verify and Proceed"
                : "Verify and Pay"}
            </PayButton>
          </Box>
        ) : (
          <Box>
            {isCheck ? (
              ""
            ) : (
              <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                {"SS Wallet"}
              </Typography>
            )}
            {!isCheck && <Divider sx={{ margin: "20px 0px" }}></Divider>}
            <FormGroup sx={{ paddingBottom: "20px" }}>
              <FormControlLabel
                control={
                  balanceAmount > 1 ? (
                    <Checkbox
                      sx={{
                        " &.Mui-checked": {
                          color: "#231F20",
                        },
                      }}
                      onChange={handleChange}
                      name={childData?.childData?.title}
                      checked={isChecked?.isChecked ? true : false}
                    />
                  ) : (
                    <></>
                  )
                }
                label={
                  balanceAmount > 0
                    ? `Use your ₹ ${
                        Number(
                          cartStore?.cartItems?.cart?.wallet_discount?.amount
                        ) > 0
                          ? cartStore?.cartItems?.cart?.wallet_discount.amount
                          : cartStore?.cartItems?.cart?.prices?.grand_total
                              ?.value <= balanceAmount
                          ? cartStore?.cartItems?.cart?.prices?.grand_total
                              ?.value
                          : balanceAmount
                      } SS Wallet balance`
                    : (walletId || userDataItems?.walletNumber !== "na")
                    ? `You have 0 balance in your SS Wallet`
                    : "Activate your SS Wallet from My Profile section."
                }
              />
              {isChecked?.isChecked && (
                <Typography pl={4}>
                  (Available Balance is Rs. {balanceAmount})
                </Typography>
              )}
            </FormGroup>
            {!isCheck &&
              cartStore?.cartItems?.cart?.prices?.grand_total?.value == 0 && (
                <Button
                  sx={{
                    height: "44px",
                    width: "100%",
                    backgroundColor: "#DEA3B7",
                    borderRadius: "0",
                    color: "black",
                    " &:hover": {
                      color: "black",
                      backgroundColor: "#DEA3B7",
                    },
                  }}
                  onClick={clickHandler}
                >
                  PAY NOW
                </Button>
              )}
          </Box>
        )}
      </>
    </>
  );
};
export default SsWallet;
