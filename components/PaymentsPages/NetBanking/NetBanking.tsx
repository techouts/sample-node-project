import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  PayButton,
  ButtonBox,
  AutoCompleteGrid,
  OtherBankTypography,
} from "../CreditDebit/CDCardsStyles";
import data from "./Netbanking.json";
import { useMobileCheck } from "../../../utility/isMobile";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { CardTransaction, merchant_id } from "../../../utility/APIConstants";
import axios from "axios";
import client from "../../../apollo-client";
import { SetPaymentMethodQuery } from "../../../graphQLQueries/PaymentQuery";
import { CREATE_JUSPAY_ORDER } from "../../../graphQLQueries/CartQuery";
import useStorage from "../../../utility/useStoarge";
import Loader from "../../../HOC/Loader/Loader";
import { JUSPAY_RETURN_URL } from "../../../utility/Constants";
import { useRecoilState } from "recoil";
import { cartState } from "../../../recoilstore";
import callEventPay from "../PaymentAnalytics";
import { Cookies } from "react-cookie";
import { getSourceInfo } from "../../../utility/commonUtility";
import handleErrorResponse from "../../../utility/ErrorHandling";
import { CouponList } from "../../CartLayout/CouponQueries/CouponList";
let flag = true;

export const NetBanking = ({
  jusPayNetBanking,
  handleError,
  NetBank,
  selectedOption,
  finalCheckCallBack,
  value,
  setValue,
  topLevelBanks,
  setTopLevelBanks,
}: any) => {
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [displayLoader, setLoader] = useState(false);
  const [couponCode, setCouponCode]= useState(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "")

  const isMobile = useMobileCheck();
  const { getItem } = useStorage();


  const cookie = new Cookies();

  const banksList = jusPayNetBanking.filter(function (cv) {
    return !data?.items.find(function (e) {
      return e.payment_method === cv.payment_method;
    });
  });

  let couponExists:any;

  useEffect(() => {
    setCouponCode(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "" );
}, [cartStore?.cartItems]);

  const clickHandler = async (value: any) => {
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
    callEventPay(cartStore, undefined, undefined, selectedOption);
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
                method: value?.payment_method_type,
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
                    payment_method_type: value?.payment_method_type,
                    payment_method: value?.payment_method,
                    merchant_id: merchant_id,
                    save_to_locker: true,
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
                  .catch((error) => {
                    setLoader(false);
                    handleError(error?.message);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
              setLoader(false);
              handleError(err.message);
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
  useEffect(() => {
    if (topLevelBanks?.payment_method || value?.payment_method) {
      finalCheckCallBack("otherPayments", true);
    } else {
      finalCheckCallBack("otherPayments", false);
    }
  }, [topLevelBanks, value]);
  useEffect(() => {
    if (topLevelBanks != null && NetBank != 0 && flag) {
      clickHandler(topLevelBanks);
      flag = false;
      setTimeout(() => {
          flag = true;
      }, 200);
  }  
  }, [NetBank]);
  return (
    <Box className="netBanking">
      {displayLoader && <Loader />}
      {isMobile ? (
        <>
          <FormControl
            sx={{ display: "grid", paddingLeft: "8px", paddingRight: "8px" }}
          >
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={topLevelBanks?.payment_method}
              onChange={(e, value) => {
                const option = data?.items.find(
                  (bankDetails: any) => bankDetails.payment_method === value
                );
                setTopLevelBanks(option);
                setValue(null);
              }}
            >
              {data?.items?.map((item: any, index: number) => (
                <FormControlLabel
                  key={index}
                  sx={{ padding: "8px" }}
                  value={item?.payment_method}
                  control={
                    <Radio
                      checked={
                        topLevelBanks?.payment_method === item?.payment_method
                      }
                      sx={{ position: "absolute", right: 0 }}
                    />
                  }
                  label={
                    <Stack direction="row" width="100%">
                      <img
                        src={item.image}
                        alt="bank logo"
                        width={"20px"}
                        height={"100%"}
                      />
                      <Typography pl={1.5}> {item?.description} </Typography>
                    </Stack>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </>
      ) : (
        <Box>
          <Typography sx={{ fontWeight: "500" }}>{data.title}</Typography>
          <Divider sx={{ margin: "20px 0px" }}></Divider>
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            padding={"10px 0px 40px 0px"}
          >
            {data.items?.map((item: any, index) => {
              return (
                <Stack
                  alignItems={"center"}
                  key={index}
                  onClick={() => clickHandler(item)}
                >
                  <img
                    src={item.image}
                    alt="bank logo"
                    width={"35px"}
                    height={"35px"}
                  ></img>
                  <Typography>{item.description}</Typography>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      )}
      <OtherBankTypography>Other Banks</OtherBankTypography>
      <AutoCompleteGrid
        disablePortal
        id="combo-box-demo"
        disableClearable
        getOptionLabel={(option: any) => option?.description}
        options={banksList}
        onChange={(e, value) => {
          setValue(value);
          setTopLevelBanks(null);
        }}
        renderOption={(props, option: any, { selected }) => (
          <li {...props}>
            <RadioGroup
              value={value && value?.payment_method}
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel
                sx={{ height: "100%", paddingBottom: "13px" }}
                value={option?.payment_method}
                control={
                  <Radio
                    checked={value?.payment_method === option?.payment_method}
                  />
                }
                label={option?.description}
              />
            </RadioGroup>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            size="small"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            placeholder="Search for other banks here"
          />
        )}
      />
      <Grid pt={4}>
        {isMobile ? (
          ""
        ) : (
          <ButtonBox>
            <PayButton
              fullWidth
              onClick={() =>
                clickHandler(value?.payment_method ? value : topLevelBanks)
              }
              disabled={!value?.payment_method}
            >
              Pay Now
            </PayButton>
          </ButtonBox>
        )}
      </Grid>
    </Box>
  );
};
