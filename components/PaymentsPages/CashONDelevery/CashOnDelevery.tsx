import react, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  ButtonBox,
  ButtonText,
  IconBox,
  MainBox,
  TextTypography,
  TitleTypography,
} from "./CashOnDeleveryStyles";
import { useRouter } from "next/router";
import Loader from "../../../HOC/Loader/Loader";
import client from "../../../apollo-client";
import {
  OrderPlaceQuery,
  SetPaymentMethodQuery,
} from "../../../graphQLQueries/PaymentQuery";
import useStorage from "../../../utility/useStoarge";
import { Cookies } from "react-cookie";
import { useMobileCheck } from "../../../utility/isMobile";
import { JUSPAY_RETURN_URL } from "../../../utility/Constants";
import callEventPay from "../PaymentAnalytics";
import handleErrorResponse from "../../../utility/ErrorHandling";
import { getSourceInfo } from "../../../utility/commonUtility";
import { CouponList } from "../../CartLayout/CouponQueries/CouponList";

const CashOnDelivery = (props: any) => {
  const { componentData, handleError, cartStore, selectedOption } = props;
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const { getItem } = useStorage();
  const cookie = new Cookies();
  const [couponCode, setCouponCode]= useState(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "")
  
  let couponExists:any;

  useEffect(() => {
    setCouponCode(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "" );
}, [cartStore?.cartItems]);

  const handleContinue = async () => {
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
      .then((response: any) => {
      })
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
          source_from_info: getSourceInfo()
        },
      })
      .then((response: any) => {
        const hasError =   handleErrorResponse(response?.data) //response checking
        if (hasError) return null;
        if (response?.data) {
          const orderId = response?.data?.confirmPlaceOrder?.order?.order_number;
          router?.push(`${JUSPAY_RETURN_URL}?id=${orderId}`);
        }
      })
      .catch((error: any) => {
        setLoader(false);
        handleError(error?.message);
      });
    }
  };
  let isMobile = useMobileCheck();
  return (
    <>
      {loader && <Loader />}
      <MainBox>
        <Box>
          {isMobile ? (
            ""
          ) : (
            <TitleTypography>{componentData?.Data?.title}</TitleTypography>
          )}
          <Divider
            sx={{ margin: isMobile ? "0px 0px 20px 0px" : "20px 0px" }}
          ></Divider>
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ paddingBottom: "16px" }}
          >
            <IconBox>
              <InfoOutlinedIcon sx={{ color: "#AD184C" }} />
            </IconBox>
            <Box sx={{ paddingLeft: "15px" }}>
              <TextTypography>{componentData?.Data?.text}</TextTypography>
            </Box>
          </Stack>
          {!isMobile && (
            <ButtonBox>
              <ButtonText onClick={handleContinue}>
                {componentData?.Data?.buttonText}
              </ButtonText>
            </ButtonBox>
          )}
        </Box>
      </MainBox>
    </>
  );
};
export default CashOnDelivery;
