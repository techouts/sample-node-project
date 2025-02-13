import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useMobileCheck } from "../../../utility/isMobile";
import {
  CartButton,
  ApplyText,
  ApplyButton,
  SearchBox,
} from "../CartLayoutStyles";
import { AddCouponToCart, CouponList } from "../CouponQueries/CouponList";
import item from "./ApplyCouponModal.json";
import { acEvent_type } from "../../../utility/GAConstants";
import CartStoreInterface from "../../../schemas/cartStoreAtom";
import { callEventCartCoupon } from "../CartAnalytics";
import { couponcartUpdatedEvent } from "../../../utility/WebEngageEvents";

interface Coupon {
  coupon_code: string;
  description: string;
  discount_amount: number;
  simple_action: string;
  __typename: string;
  coupon_applicable:string;
  is_visibility_frontend:string;
}

function ApplyCouponModal({
  setApplyCoupon,
  setApplyCouponModal,
  setLoader,
  handleSnackBar,
  handleError,
  setCartStore,
}: any) {
  const [couponText, setCouponText] = useState<string>("");
  const [couponData, setCouponData] = useState<any>([]);
  const isMobile = useMobileCheck();
  const couponHandle = async (itemCouponCode: any, couponDiscount?: any) => {
  let couponExists =false;

    if (itemCouponCode) {
      setLoader(true);
      const applyCouponCodes = await CouponList();
      if (applyCouponCodes?.data?.getCouponCodes?.length !== 0) {
        console.log("inside 1",applyCouponCodes?.getCouponCodes);
        const filteredCouponCodes: Coupon[] = applyCouponCodes?.getCouponCodes
        .filter((coupon: Coupon) => {
          console.log("check coupon",coupon);
            const hasWeb = coupon.coupon_applicable.includes("Web");
            return hasWeb;
        })
         couponExists = filteredCouponCodes.some(coupon => coupon.coupon_code === itemCouponCode);
        
      }
    }
      if(couponExists){
      const appliedCouponResponse = await AddCouponToCart(itemCouponCode);
      if (appliedCouponResponse !== undefined) {
        let cartStore = { cartItems: appliedCouponResponse?.applyCouponToCart };
        const discountAmount = Math.abs(parseFloat(cartStore?.cartItems?.cart?.prices?.discount?.amount?.value)) || 0;
        const promotionTotal = parseFloat(cartStore?.cartItems?.cart?.promotion_total?.amount) || 0;
        const grandTotal = appliedCouponResponse?.applyCouponToCart?.cart?.prices?.grand_total?.value || 0;
        const subtotalExcludingTax = appliedCouponResponse?.applyCouponToCart?.cart?.prices?.subtotal_excluding_tax?.value || 0;
        const previousDiscountAmount = Math.abs(parseFloat(appliedCouponResponse?.applyCouponToCart?.cart?.prices?.discount?.amount?.value)) || 0;
        
        setCartStore((previousData: CartStoreInterface) => ({
          ...previousData,
          cartItems: appliedCouponResponse?.applyCouponToCart,
        }));
        callEventCartCoupon(
          itemCouponCode,
          "Apply",
          discountAmount + promotionTotal,
          acEvent_type,
          grandTotal,
          subtotalExcludingTax,
          grandTotal,
          subtotalExcludingTax,
          previousDiscountAmount,
          cartStore
        );
        couponcartUpdatedEvent(cartStore);
        handleSnackBar("Coupon Applied");
        setApplyCoupon(itemCouponCode);
        setApplyCouponModal(false);
        setLoader(false);
      } else {
        setLoader(false);
        handleError(
          "The coupon code isn't valid. Verify the code and try again."
        );
      }
    }else{
      setApplyCouponModal(true);
      setLoader(false);
      handleError(
        "The coupon code no longer valid"
      );
    }
     
  };
  const handleChange = (e: any) => {
    setCouponText(e.target.value);
  };

  useEffect(() => {
    const applyCouponData = async () => {
      setLoader(true);
      const applyCouponCodes = await CouponList();
      if (applyCouponCodes?.data?.getCouponCodes?.length !== 0) {        
        const filteredCouponCodes: Coupon[] = applyCouponCodes?.getCouponCodes
        .filter((coupon: Coupon) => {
          console.log("check coupon",coupon);
            const hasWeb = coupon?.coupon_applicable.includes("Web") && coupon?.is_visibility_frontend === "1";
            return hasWeb;
        })
    
        console.log("Filtered Coupons:", filteredCouponCodes);

          setCouponData(filteredCouponCodes);
        

      }
      setLoader(false);
    };
    setLoader(true);
    applyCouponData();
  }, []);

  return (
    <Fragment>
      <Box sx={{ padding: "20px" }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "20px",
            textTransform: "uppercase",
            color: "#231F20",
          }}>
          {item.title}
        </Typography>
        <SearchBox>
          <TextField
            placeholder={item.searchHolder}
            onChange={handleChange}
            sx={{
              width: "70%",
              fontSize: "14px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
          <CartButton onClick={() => couponHandle(couponText)}>
            Apply
          </CartButton>
        </SearchBox>
        {isMobile && (
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#252D34",
              paddingTop: "12px",
            }}>
            Available Coupons
          </Typography>
        )}
        {couponData &&
          couponData?.map((items: any, index: number) => {
            const isPercentageCoupon = items?.simple_action === "by_percent";
            return (
              <Box
                key={index}
                sx={{
                  border: "1px solid #DEDEDE",
                  padding: "20px 16px ",
                  marginTop: "20px",
                }}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    sx={{
                      color: "#AD184C",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}>
                    {items?.coupon_code}
                  </Typography>
                  <ApplyButton
                    onClick={() => {
                      couponHandle(items?.coupon_code, items?.discount_amount);
                    }}>
                    Apply
                  </ApplyButton>
                </Stack>
                <ApplyText mt="10px">{items?.description}</ApplyText>
                <ApplyText mt="20px">
                  Max Discount
                  {isPercentageCoupon ? (
                    <b> {items?.discount_amount}&#x00025;</b>
                  ) : (
                    <b>
                      {" "}
                      &#8377;
                      {items?.discount_amount}
                    </b>
                  )}
                </ApplyText>
              </Box>
            );
          })}
      </Box>
    </Fragment>
  );
}
export default ApplyCouponModal;
