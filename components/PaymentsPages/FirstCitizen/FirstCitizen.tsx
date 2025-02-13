import {styled} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  ApplyLoyalityAmount,
  OTPforLoyality,
  PlaceOrderForLoyality,
  RemoveLoyaltyAmount,
} from "../../../api/Payments/LoyalityApis";
import { cartState } from "../../../recoilstore";
import { useMobileCheck } from "../../../utility/isMobile";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import useStorage from "../../../utility/useStoarge";
import { CloseCircleWarning } from "../../CartLayout/CartConstants";
import { OtpComponentLogic } from "../../SigninComponent/MobileOtpScreen/OtpComponentLogic";
import callEventPay from "../PaymentAnalytics";
import { PayButton, TextTypography } from "./OtpStyled";
import { Cookies } from "react-cookie";
import { SetPaymentMethodQuery } from "../../../graphQLQueries/PaymentQuery";
import client from "../../../apollo-client";
import { useRouter } from "next/router";
import { JUSPAY_RETURN_URL } from "../../../utility/Constants";
import { ResendTimer } from "../../SigninComponent/MobileOtpScreen/MobileOtpStyled";
import { getSourceInfo } from "../../../utility/commonUtility";
import handleErrorResponse from "../../../utility/ErrorHandling";

export const Buttonlabel = styled(Button)(() => ({
  backgroundColor: "#231F20",
  color: "#DEA3B7",
  borderRadius: 0,
  padding: "23px",
  fontSize: "12px",
  height: "100%",
  "@media(max-width:600px)": {
    height: "90%",
  },
  margin: "5px",
  "&:hover": {
    background: "#231F20",
    color: "#DEA3B7",
    outline: "1px solid rgba(222, 163, 183, 1)",
  },
}));
export const TextFieldFC = styled(TextField)(() => ({
  border: "unset",
  borderRadius: "0px",

  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
  },

  "& label.Mui-focused": {
    color: "#AD184C !important",
  },
  "& .MuiOutlinedInput-root": {
    " &.Mui-focused fieldset": {
      borderColor: "#EAEAEA",
    },
  },
}));
function FirstCitizen(props: any) {
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const {
    setIsLoaded,
    primaryPoints,
    handleError,
    setPrimaryPoints,
    setInValidPaymentsOptions,
    setRedeemAmountLoyality,
    cmsData,
    selectedOption,
  } = props;
  const [pay, setPay] = useState(false);
  const { getItem, setItem } = useStorage();
  const [otp, setOtp] = useState("");
  const [resetOtpFields, setResetOtpFields] = useState(false);
  const [invalidOtp, setIsInvalidOtp] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState("");
  const cartID = getItem("BuyNowCartID", "local")
    ? `${getItem("BuyNowCartID", "local")}`
    : `${getItem("cartID", "local")}`;
  let isCheck = useMobileCheck();
  let number = getItem("mobileNumber", "local")?.toString();
  let phnumber = number
    ? number?.replace(number?.substring(2, 8), "XXXXXX")
    : "";
  const [loayalityWalletOtpData, setLoayalityWalletOtpData] = useState<any>();
  const [removeButton, setRemoveButton] = useState(false);
  const router = useRouter();
  const cookie = new Cookies();
  const [minAmount, setminAmount] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (Number(redeemAmount) < cmsData?.loyalityValue) {
      setminAmount(true);
    }
  }, [redeemAmount]);

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (pay) {
      setCounter(30);
    }
  }, [pay]);

  const handleChange = async () => {
    await setIsLoaded(true);
    const walletOtp = await OTPforLoyality(cartID, cookie.get("accessToken"));
    if (walletOtp?.data?.otpForLoyalty?.status) {
      setIsLoaded(false);
      setLoayalityWalletOtpData(walletOtp);
    } else {
      console.log(walletOtp, "FCC Err --->");
      setIsLoaded(false);
      handleError(
        walletOtp?.message
          ? walletOtp?.message
          : walletOtp?.data?.otpForLoyalty?.message
      );
    }
  };

  const clickHandler = async () => {
    callEventPay(cartStore, undefined, undefined, selectedOption);
    setIsLoaded(true);
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
    const orderData = await PlaceOrderForLoyality(
      cartID,
      cookie.get("accessToken"),
      getSourceInfo()
    );
    if (orderData && orderData?.data?.confirmPlaceOrder?.order?.order_number) {
      const orderId = await orderData?.data?.confirmPlaceOrder?.order?.order_number;
      await setIsLoaded(false);
      router?.push(`${JUSPAY_RETURN_URL}?id=${orderId}`);
    } else if (typeof orderData === undefined) {
      setIsLoaded(false);
      handleError(orderData?.message);
    }
  };

  const resendOTP = async () => {
    setIsLoaded(true);
    const loyalityOtp = await OTPforLoyality(cartID, cookie.get("accessToken"));
    if (loyalityOtp?.data?.otpForLoyalty?.status) {
      setIsLoaded(false);
      setCounter(30);
    } else if (typeof loyalityOtp === undefined) {
      setIsLoaded(false);
      handleError(loyalityOtp?.message);
    }
  };

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

  const verifyOtp = async () => {
    if (
      loayalityWalletOtpData?.data?.otpForLoyalty?.status &&
      otp.length == 6
    ) {
      setIsLoaded(true);
      const response = await ApplyLoyalityAmount(
        cartID,
        primaryPoints > cartStore?.cartItems?.cart?.prices?.grand_total?.value
          ? cartStore?.cartItems?.cart?.prices?.grand_total?.value
          : parseFloat(primaryPoints),
        otp,
        cookie.get("accessToken")
      );
      setPay(false);
      if (response?.data?.applyLoyaltyAmount) {
        setInValidPaymentsOptions(["Cash On Delivery"]);
        setIsLoaded(false);
        setPrimaryPoints(primaryPoints);
        setRedeemAmountLoyality(true);
        if (Number(redeemAmount) > cmsData?.loyalityValue) {
          setminAmount(false);
        }
        setCartStore((lp: any) => {
          return {
            ...lp,
            cartItems: {
              cart: {
                ...lp.cartItems.cart,
                grand_total:
                  response?.data?.applyLoyaltyAmount?.prices?.grand_total,
                loyalty_discount:
                  response?.data?.applyLoyaltyAmount?.prices?.loyalty_discount,
              },
            },
          };
        });
        setRemoveButton(true);
        if (
          response?.data?.applyLoyaltyAmount?.prices?.grand_total?.value <= 0
        ) {
          clickHandler();
        }
      } else if (typeof response !== undefined) {
        setIsLoaded(false);
        handleError(response?.message);
      } else {
        setIsLoaded(false);
        setIsInvalidOtp(true);
      }
    }
  };

  const VerifyHandler = () => {
    console.log("hjdhsd")
  }

  const removeLoyalty = async () => {
    setIsLoaded(true);
    const response: any = await RemoveLoyaltyAmount(cartID);
    if (response?.data) {
      setIsLoaded(false);
      setCartStore((lp: any) => {
        return {
          ...lp,
          cartItems: {
            cart: {
              ...lp.cartItems.cart,
              grand_total:
                response?.data?.applyLoyaltyAmount?.prices?.grand_total,
              loyalty_discount: undefined,
            },
          },
        };
      });
    } else {
      setIsLoaded(false);
      handleError(response?.message);
    }
  };

  return (
    <Box>
      {isCheck ? (
        ""
      ) : (
        <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
          First Citizen Club
        </Typography>
      )}
      <Divider
        sx={{ margin: isCheck ? "0px 0px 20px 0px" : "20px 0px" }}
      ></Divider>
      {cartStore?.cartItems?.cart?.prices?.loyalty_discount?.value > 0 ? (
        <>
          <TextFieldFC
            sx={{
              width: "100%",
              paddingBottom: isCheck ? "16px" : "",
            }}
            id="outlined-textarea"
            label="Redeemed Amount"
            multiline
            disabled
            value={cartStore?.cartItems?.cart?.prices?.loyalty_discount?.value}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    textDecoration: "underline",
                    color: "#AD184C",
                    cursor: "pointer",
                  }}
                  onClick={removeLoyalty}
                >
                  Remove
                </InputAdornment>
              ),
            }}
          />
          {cartStore?.cartItems?.cart?.prices?.loyalty_discount?.value > 0 && (
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "12px",
                color: "#4F4C4D",
                paddingTop: "6px",
              }}
            >
              {`₹${cartStore?.cartItems?.cart?.prices?.loyalty_discount?.value}  will be debited from your first citizen club reward points on order completion`}
            </Typography>
          )}
        </>
      ) : (
        <>
          {!pay ? (
            <>
              <TextFieldFC
                sx={{ width: "100%", backgroundColor: "#EAEAEA" }}
                id="outlined-textarea"
                label="Available Balance"
                defaultValue={"₹" + " " + primaryPoints}
                variant="outlined"
                type="text"
                inputProps={{ readOnly: true }}
              />
              <TextFieldFC
                id="outlined-textarea"
                label="Mobile Number"
                type="text"
                multiline
                defaultValue={number}
                variant="outlined"
                inputProps={{ readOnly: true }}
                sx={{
                  margin: "20px 0px",
                  width: "100%",
                  backgroundColor: "#EAEAEA",
                }}
              />
              <TextFieldFC
                sx={{
                  width: "100%",
                  backgroundColor: "#EAEAEA",
                }}
                id="outlined-textarea"
                label="Enter Amount To Redeem"
                multiline
                inputProps={{ readOnly: true }}
                value={
                  cartStore?.cartItems?.cart?.prices?.grand_total?.value >
                  primaryPoints
                    ? primaryPoints
                    : cartStore?.cartItems?.cart?.prices?.grand_total?.value
                }
              />
              {minAmount && (
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#4F4C4D",
                    paddingTop: "6px",
                  }}
                >
                  Minimum amount to be redeemed is ₹{cmsData?.loyalityValue}
                </Typography>
              )}
              {cartStore?.cartItems?.cart?.prices?.grand_total?.value > 0 &&
                ((cartStore?.cartItems?.cart?.prices?.loyalty_discount &&
                  cartStore?.cartItems?.cart?.prices?.loyalty_discount?.value <=
                    0) ||
                  !cartStore?.cartItems?.cart?.prices?.loyalty_discount
                    ?.value) &&
                primaryPoints >= cmsData?.loyalityValue &&
                cartStore?.cartItems?.cart?.prices?.grand_total?.value >
                  cmsData?.loyalityValue && (
                  <Button
                    disabled={
                      !(primaryPoints >= cmsData?.loyalityValue) ||
                      !(
                        cartStore?.cartItems?.cart?.prices?.grand_total?.value >
                        cmsData?.loyalityValue
                      )
                    }
                    sx={{
                      height: "44px",
                      width: "100%",
                      backgroundColor: "#DEA3B7",
                      borderRadius: "0",
                      color: "black",
                      marginTop: "15px",
                      ":hover": {
                        backgroundColor: "#DEA3B7",
                      },
                    }}
                    onClick={() => {
                      primaryPoints >= cmsData?.loyalityValue &&
                        cartStore?.cartItems?.cart?.prices?.grand_total?.value >
                          cmsData?.loyalityValue &&
                        callEventPay(
                          cartStore,
                          undefined,
                          undefined,
                          selectedOption
                        );
                      handleChange();
                      setPay(!pay);
                    }}
                  >
                    Redeem Amount
                  </Button>
                )}
            </>
          ) : (
            <Box>
              <Typography sx={{ float: "right" }}>
                <img
                  src={`${ReplaceImage(CloseCircleWarning)}`}
                  alt="close_icon"
                  onClick={() => {
                    setCounter(0);
                    setPay(false);
                  }}
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
                {primaryPoints >
                cartStore?.cartItems?.cart?.prices?.grand_total?.value
                  ? "Verify and Pay"
                  : "Verify and Proceed"}
              </PayButton>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default FirstCitizen;
