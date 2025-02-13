import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import Modal from "../../../HOC/Modal/ModalBlock";
import {
  ButtonText,
  MainCard,
  MainDivider,
  PriceBox,
  Radiovocher,
  TextFieldPay,
  TextFieldtext,
  TitleText,
} from "./GiftCardPaymentStyles";
import { useMobileCheck } from "../../../utility/isMobile";
import Captcha from "../../MyWallet/CaptchaCode";
import graphql from "../../../middleware-graphql";
import { CheckBal } from "../../../graphQLQueries/MywalletQuery";
import { CustomSnackBar } from "../../../HOC/CustomSnackBar/CustomSnackBar";
import { useRecoilState } from "recoil";
import { cartState } from "../../../recoilstore";
import useStorage from "../../../utility/useStoarge";
import { Cookies } from "react-cookie";
import {
  ApplyEGVCard,
  PlaceOrder,
  RemoveEGVCard,
  SetPaymentMethod,
} from "../../../api/Payments/GiftCardApis";
import { JUSPAY_RETURN_URL } from "../../../utility/Constants";
import { useRouter } from "next/router";
import callEventPay from "../PaymentAnalytics";
import { getSourceInfo } from "../../../utility/commonUtility";
import handleErrorResponse from "../../../utility/ErrorHandling";
import { CouponList } from "../../CartLayout/CouponQueries/CouponList";


const GiftCardPay = ({
  Data,
  setIsLoaded,
  handleError,
  setInValidPaymentsOptions,
  selectedOption
}: any) => {
  const { getItem } = useStorage();
  const cookie = new Cookies();
  let isMobile = useMobileCheck();
  const router = useRouter();
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [checkBalance, setCheckBalance] = useState(false);
  const [value, setValue] = React.useState("Gift Card");
  const [pin, setPin] = React.useState("");
  const [onlyNums, setOnlyNums] = useState("");
  const [amountRedeem, setAmountRedeem] = useState("");
  const [cardNoError, setCardNoError] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [captchaModal, setCaptchaModal] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [networkErrorMessage, setNetworkErrorMessage] = useState("");
  const [checkBalData, setCheckBalData] = useState<any>();
  const [amountRedeemed, setAmountRedeemed] = useState(
    cartStore?.cartItems?.cart?.prices?.egv_discount?.value
      ? cartStore?.cartItems?.cart?.prices?.egv_discount?.value
      : 0
  );
  const [expData, setExpData] = useState("");
  const cartID = getItem("BuyNowCartID", "local")
    ? `${getItem("BuyNowCartID", "local")}`
    : `${getItem("cartID", "local")}`;

  const [couponCode, setCouponCode]= useState(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "")
  
  let couponExists:any;
  
  useEffect(() => {
      setCouponCode(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "" );
  }, [cartStore?.cartItems]);

  const checkBalanceHandler = () => {
    if (!checkBalance) {
      setCaptchaModal(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setPin("");
    setOnlyNums("");
    setAmountRedeem("");
    setCheckBalance(false);
    setAmountRedeem("");
    setCardNoError(false);
    setPinError(false);
    setIsCaptcha(false);
    setCheckBalData(undefined);
    setExpData("");
    setAmountRedeemed(0);
  };

  const cardNumberHandler = (e: any) => {
    setCheckBalance(false);
    setAmountRedeem("");
    setCheckBalData(undefined);
    setExpData("");
    const inputVal = e.target.value?.replace(/ /g, "");
    let inputNumbersOnly = inputVal?.replace(/\D/g, "");
    if (inputNumbersOnly.length >= 16) {
      setCardNoError(false);
      inputNumbersOnly = inputNumbersOnly.substr(0, 16);
    } else {
      setCardNoError(true);
    }
    const splits = inputNumbersOnly.match(/.{1,4}/g);
    let spacedNumber = "";
    if (splits) {
      spacedNumber = splits.join(" ");
    }
    setOnlyNums(spacedNumber);
  };

  const pinHandler = (e: any) => {
    setCheckBalance(false);
    setAmountRedeem("");
    setCheckBalData(undefined);
    setExpData("");
    let val = e.target.value;
    let inputNumbersOnly = val?.replace(/\D/g, "");
    if (inputNumbersOnly.length >= 6) {
      setPinError(false);
      inputNumbersOnly = inputNumbersOnly.substr(0, 6);
    } else {
      setPinError(true);
    }
    setPin(inputNumbersOnly);
  };

  const redeemClickHandler = async () => {
    if (couponCode) {
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
      handleError("This coupon has expired. Please remove it and try another")
    }else if ((couponCode?.length>0 && couponExists)|| couponCode?.length=== 0){
    callEventPay(cartStore,undefined, undefined, selectedOption);
    setIsLoaded(true);
    const response = await ApplyEGVCard(
      cartID,
      amountRedeem,
      cookie.get("accessToken"),
      onlyNums?.replace(/\D/g, ""),
      pin
    );
    if (response?.data?.applyEgvAmount) {
      setInValidPaymentsOptions(["Cash On Delivery"]);
      setIsLoaded(false);
      setAmountRedeemed(
        response?.data?.applyEgvAmount?.prices?.egv_discount?.value
      );
      setCartStore((lp: any) => {
        return {
          ...lp,
          cartItems: {
            cart: {
              ...lp.cartItems.cart,
              grand_total: response?.data?.applyEgvAmount?.prices?.grand_total,
              egv_discount:
                response?.data?.applyEgvAmount?.prices?.egv_discount,
            },
          },
        };
      });
    }
    else{
      setIsLoaded(false);
      handleError(response?.errors?.message);
    }
  }
  };

  const paywithEGV = async () => {
    callEventPay(cartStore,undefined, undefined, selectedOption);
    setIsLoaded(true);
    const paymentMethodRes: any = await SetPaymentMethod(cartID, "free");
    if (paymentMethodRes?.data) {
      const orderData = await PlaceOrder(cartID, cookie.get("accessToken"), getSourceInfo());
      if (
        orderData &&
        orderData?.data?.confirmPlaceOrder?.order?.order_number
      ) {
        setIsLoaded(false);
        const orderId = orderData?.data?.confirmPlaceOrder?.order?.order_number;
        router?.push(`${JUSPAY_RETURN_URL}?id=${orderId}`);
      } else if (typeof orderData === undefined) {
        setIsLoaded(false);
        handleError(orderData?.message);
      }
    } else {
      setIsLoaded(false);
    }
  };

  const handleClose = () => setCaptchaModal(false);

  const checkGiftBalance = async () => {
    setIsLoaded(true);
    let inputNumbersOnly = onlyNums.replace(/\D/g, "");
    setCaptchaModal(false);
    await graphql
      .mutate({
        mutation: CheckBal,
        variables: {
          cardNumber: inputNumbersOnly.toString(),
          cardPIN: pin.toString(),
        },
      })
      .then((response: any) => {
        if (
          response?.data?.checkBalance?.responseMessage ===
          "Transaction successful."
        ) {
          if (response?.data?.checkBalance?.amount === 0) {
            setIsLoaded(false);
            setPin("");
            setOnlyNums("");
            setNetworkErrorMessage(
              "There is no sufficient amount in this Gift Card. Please try with different Gift Card"
            );
            setNetworkError(true);
            setCheckBalance(false);
          } else {
            setIsLoaded(false);
            setCheckBalData(response?.data?.checkBalance?.amount);
            setAmountRedeem(
              response?.data?.checkBalance?.amount >
                cartStore?.cartItems?.cart?.prices?.grand_total?.value
                ? cartStore?.cartItems?.cart?.prices?.grand_total?.value
                : response?.data?.checkBalance?.amount
            );
            let expFormat = JSON.stringify(
              response?.data?.checkBalance?.cardExpiry
            )
              .slice(1, 11)
              .split("-");
            setExpData(expFormat[2] + "/" + expFormat[1] + "/" + expFormat[0]);
          }
        } else {
          setIsLoaded(false);
          setNetworkErrorMessage(response?.data?.checkBalance?.responseMessage ? response?.data?.checkBalance?.responseMessage : "Please Enter Valid Card Details");
          setNetworkError(true);
          setCheckBalance(false);
        }
      })
      .catch((err) => {
        setIsLoaded(false);
        console.log(err, "err");
        setNetworkErrorMessage(err || "Please Enter Valid Card Details");
        setNetworkError(true);
        setCheckBalance(false);
      });
  };

  const removeEGV = async () => {
    setIsLoaded(true);
    const response: any = await RemoveEGVCard(cartID);
    if (response?.data) {
      setIsLoaded(false);
      setCartStore((lp: any) => {
        return {
          ...lp,
          cartItems: {
            cart: {
              ...lp.cartItems.cart,
              grand_total: response?.data?.applyEgvAmount?.prices?.grand_total,
              egv_discount: undefined,
            },
          },
        };
      });
      setPin("");
      setOnlyNums("");
      setAmountRedeem("");
      setCheckBalance(false);
      setAmountRedeem("");
      setCardNoError(false);
      setPinError(false);
      setIsCaptcha(false);
      setCheckBalData(undefined);
      setExpData("");
      setAmountRedeemed(0);
    } else {
      setIsLoaded(false);
      handleError(response?.message);
    }
  };

  const component = function () {
    return (
      <>
        <Box>
          <Captcha
            show={() => {}}
            setIsCaptcha={setIsCaptcha}
            iscontactus={false}
          />
          <Grid sx={{ textAlign: "center" }}>
            <ButtonText
              sx={{
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#231F20",
                width: "123px",
              }}
              disabled={!isCaptcha}
              onClick={checkGiftBalance}
            >
              Submit
            </ButtonText>
          </Grid>
        </Box>
      </>
    );
  };

  return (
    <>
      <CustomSnackBar
        snackBarOpen={networkError}
        setSnackBarOpen={setNetworkError}
        snackMessage={networkErrorMessage}
      />
      <MainCard>
        <CardContent sx={{ padding: "0px" }}>
          <TitleText>{Data?.title}</TitleText>
          <MainDivider orientation="horizontal"></MainDivider>

          {amountRedeemed === 0 ? (
            <Radiovocher
              sx={{ display: "flex", flexDirection: "row", padding: "20px 0" }}
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value={Data?.radioText}
                control={
                  <Radio
                    sx={{ padding: "0px", height: "20px", marginRight: "7px" }}
                  />
                }
                label="Gift Card"
                sx={{ marginLeft: "0px" }}
              />
              <FormControlLabel
                value={Data?.radioTextTwo}
                control={
                  <Radio
                    sx={{ padding: "0px", height: "20px", marginRight: "7px" }}
                  />
                }
                label="E-Gift Voucher"
                sx={{ marginLeft: "0px" }}
              />
            </Radiovocher>
          ) : (
            ""
          )}

          <Box sx={{ display: "grid", gap: "20px" }}>
            {amountRedeemed === 0 ? (
              <TextFieldPay
                id="outlined-basic"
                label="Card Number"
                variant="outlined"
                required
                value={onlyNums}
                helperText={
                  cardNoError ? (
                    <p style={{ color: "red" }}>
                      Card Number should contains 16 digits
                    </p>
                  ) : (
                    ""
                  )
                }
                onChange={(e) => cardNumberHandler(e)}
                InputProps={{
                  style: {
                    borderRadius: 0,
                    boxShadow: "none",
                    outline: "none",
                  },
                }}
              />
            ) : (
              ""
            )}
            {amountRedeemed === 0 ? (
              <TextFieldPay
                id="outlined-basic"
                label="PIN"
                required
                variant="outlined"
                value={pin}
                onChange={(e) => pinHandler(e)}
                helperText={
                  pinError ? (
                    <p style={{ color: "red" }}>Pin should contain 6 digits</p>
                  ) : (
                    ""
                  )
                }
                InputProps={{
                  style: {
                    borderRadius: 0,
                    boxShadow: "none",
                    outline: "none",
                  },
                  endAdornment: !cardNoError &&
                    !pinError &&
                    onlyNums &&
                    pin && (
                      <TextFieldtext
                        position="end"
                        sx={{ color: " #AD184C" }}
                        onClick={checkBalanceHandler}
                      >
                        Check Balance
                      </TextFieldtext>
                    ),
                }}
              />
            ) : (
              ""
            )}
            {checkBalData && expData && amountRedeemed === 0 ? (
              <Box style={{ display: "flex" }}>
                <PriceBox>
                  <Typography>{Data?.availableBalance}</Typography>
                  <Typography sx={{ fontWeight: "700" }}>
                    {checkBalData}
                  </Typography>
                </PriceBox>
                <PriceBox>
                  <Typography>{Data?.expairyDate}</Typography>
                  <Typography sx={{ fontWeight: "700" }}>{expData}</Typography>
                </PriceBox>
              </Box>
            ) : (
              ""
            )}
            {checkBalData && amountRedeemed === 0 ? (
              <TextFieldPay
                id="outlined-basic"
                sx={{
                  backgroundColor: "#EAEAEA",
                }}
                disabled
                label="Enter amount to be Redeem"
                variant="outlined"
                value={amountRedeem}
                InputProps={{
                  style: {
                    borderRadius: 0,
                    boxShadow: "none",
                    outline: "none",
                  },
                }}
              />
            ) : (
              ""
            )}
            {amountRedeemed > 0 ? (
              <TextFieldPay
                id="outlined-basic"
                sx={{
                  backgroundColor: "#EAEAEA",
                }}
                disabled
                label="Redeemed Amount"
                variant="outlined"
                value={amountRedeemed}
                InputProps={{
                  style: {
                    borderRadius: 0,
                    boxShadow: "none",
                    outline: "none",
                  },
                  endAdornment: amountRedeemed && (
                    <TextFieldtext
                      position="end"
                      sx={{ color: " #AD184C" }}
                      onClick={removeEGV}
                    >
                      remove
                    </TextFieldtext>
                  ),
                }}
              />
            ) : (
              ""
            )}
            {checkBalData && amountRedeemed <= 0 ? (
              <ButtonText
                disabled={!checkBalData || !expData || !amountRedeem}
                onClick={redeemClickHandler}
              >
                {Data?.buttonText}
              </ButtonText>
            ) : (
              ""
            )}
          </Box>
        </CardContent>
      </MainCard>
      {captchaModal && (
        <Modal
          open={captchaModal}
          height={isMobile ? "37%" : "266px"}
          width={isMobile ? "91%" : "538px"}
          handleClose={handleClose}
          top={"40%"}
          left={"50%"}
          Component={component()}
          display="flex"
          alignItems="center  "
          justifyContent="center"
        ></Modal>
      )}
      {cartStore?.cartItems?.cart?.prices?.grand_total?.value <= 0 && (
        <Grid sx={{ justifyContent: "center", display: "flex" }}>
          <ButtonText sx={{ width: "200px" }} onClick={paywithEGV}>
            Pay Now
          </ButtonText>
        </Grid>
      )}
    </>
  );
};
export default GiftCardPay;
