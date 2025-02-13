import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMobileCheck } from "../../../utility/isMobile";
import data from "./Wallet.json";
import ola from "../../../public/ola.png";
import client from "../../../apollo-client";
import { SetPaymentMethodQuery } from "../../../graphQLQueries/PaymentQuery";
import useStorage from "../../../utility/useStoarge";
import { CREATE_JUSPAY_ORDER } from "../../../graphQLQueries/CartQuery";
import { JUSPAY_RETURN_URL } from "../../../utility/Constants";
import axios from "axios";
import { CardTransaction, merchant_id } from "../../../utility/APIConstants";
import Loader from "../../../HOC/Loader/Loader";
import { useRecoilState } from "recoil";
import { cartState, SSBLogos } from "../../../recoilstore";
import { AppIcons } from "../../../utility/AppIconsConstant";
import {
  AIRTEL_MOBILE_IMAGE,
  FREECHARGE_MOBILE_IMAGE,
  JIO_MOBILE_IMAGE,
  MOBIWICK_MOBILE_IMAGE,
} from "../../../utility/AppIcons";
import callEventPay from "../PaymentAnalytics";
import { Cookies } from "react-cookie";
import { getSourceInfo } from "../../../utility/commonUtility";
import handleErrorResponse from "../../../utility/ErrorHandling";
import { CouponList } from "../../CartLayout/CouponQueries/CouponList";


export const Wallet = ({
  finalCheckCallBack,
  jusPayWallet,
  handleError,
  selectedWallet,
  setSelectedWallet,
  selectedOption
}: any) => {
  const [radio, setRadio] = useState<string>();
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [displayLoader, setLoader] = useState(false);
  const [couponCode, setCouponCode]= useState(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "")
  const { getItem } = useStorage();
  const isMobile = useMobileCheck();

  const cookie = new Cookies();

  let couponExists:any;

  useEffect(() => {
    setCouponCode(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "" );
}, [cartStore?.cartItems]);

  const controlProps = (item: string) => ({
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  useEffect(() => {
    if (selectedWallet && radio) {
      finalCheckCallBack("otherPayments", true);
    } else {
      finalCheckCallBack("otherPayments", false);
    }
  }, [radio, selectedWallet]);

  const handlePaynow = async () => {
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
      selectedOption
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
      .then((juspayRes) => {
       const hasError =   handleErrorResponse(juspayRes?.data?.setPaymentMethodOnCart?.cart?.selected_payment_method) //response checking
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
                method: "wallet",
                saved_payment: false,
                access_token: cookie.get("accessToken"),
                source_from_info: getSourceInfo()
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
                axios({
                  method: "post",
                  url: `${CardTransaction}`,
                  data: {
                    order_id: getItem("BuyNowCartID", "local")
                      ? `${getItem("BuyNowCartID", "local")}`
                      : `${getItem("cartID", "local")}`,
                    payment_method_type: "WALLET",
                    payment_method: selectedWallet,
                    merchant_id: merchant_id,
                    redirect_after_payment: true,
                    format: "json",
                  },
                  headers: { 'x-merchantid': merchant_id }

                })
                  .then(function (response) {
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
  const Airtel_icon = AppIcons(AIRTEL_MOBILE_IMAGE);
  const MobiKwick_Icon = AppIcons(MOBIWICK_MOBILE_IMAGE);
  const FreeCharge_Icon = AppIcons(FREECHARGE_MOBILE_IMAGE);
  const JioMoney_Icon = AppIcons(JIO_MOBILE_IMAGE);

  return (
    <>
      {displayLoader && <Loader />}
      <Box>
        {!isMobile && (
          <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
            {data.title}
          </Typography>
        )}
        {!isMobile && <Divider sx={{ margin: "20px 0px" }}></Divider>}
        <RadioGroup
          sx={{
            paddingBottom: isMobile ? "22px" : "",
            "& .MuiRadio-root.Mui-checked": {
              color: "#AD184C",
            },
            "& .MuiFormControlLabel-root": {
              marginRight: isMobile ? "0px" : "",
            },
            gap: isMobile ? "16px" : "",
          }}
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          onChange={(event) => {
            setRadio(event?.target.value);
          }}
        >
          {jusPayWallet?.map((item: any, index: Number) => {
            return (
              <>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid
                    md={6}
                    lg={6}
                    item
                    arial-label="srdisai"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={
                        item?.juspay_bank_code === "JP_AIRTEL"
                          ? Airtel_icon?.url
                          : item?.juspay_bank_code === "JP_MOBIKWIK"
                            ? MobiKwick_Icon?.url
                            : item?.juspay_bank_code === "JP_FREECHARGE"
                              ? FreeCharge_Icon?.url
                              : item?.juspay_bank_code === "JP_JIOMONEY"
                                ? JioMoney_Icon?.url
                                : item?.juspay_bank_code === "JP_OLAM"
                                  ? ola?.src
                                  : ""
                      }
                      alt="image"
                      width={"40px"}
                      height={"40px"}
                    />
                    {item.description}
                  </Grid>
                  <Grid
                    md={6}
                    lg={6}
                    item
                    onClick={() => setSelectedWallet(item.payment_method)}
                  >
                    <FormControlLabel
                      value={`index` + index}
                      label=""
                      control={
                        <Radio
                          {...controlProps(`index` + index)}
                          size="small"
                          checked={radio === `index` + index}
                        />
                      }
                      sx={{ display: "flex", flexDirection: "row-reverse" }}
                    />
                  </Grid>
                </Grid>
                {!isMobile && <Divider sx={{ margin: "20px 0px" }}></Divider>}
              </>
            );
          })}
        </RadioGroup>
        {!isMobile && (
          <Button
            sx={{
              height: "44px",
              width: "100%",
              backgroundColor: "#DEA3B7",
              borderRadius: "0",
              color: "black",
              ":hover": {
                backgroundColor: "#DEA3B7",
              },
            }}
            disabled={!radio}
            onClick={() => {
              handlePaynow();
            }}
          >
            PAY NOW
          </Button>
        )}
      </Box>
    </>
  );
};
