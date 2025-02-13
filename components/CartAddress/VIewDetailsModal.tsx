import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import React from "react";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { verifiedMarkMobile } from "../CartLayout/CartConstants";
import {
  ConvenienceFee,
  FreeSampleImg,
  FreeSampleTypography,
  OfferDiscount,
  OrderConfirmationTypography,
  TotalMrp,
  TotalPayableAmount,
  TotalSavings,
} from "./ViewDetailsModalStyled";
import {
  TOTAL_MRP,
  OFFER_DISCOUNT,
  FREE_SAMPLE,
  CONVENIENCE_FEE,
  GIFT_PRICE,
  FREE_SAMPLE_ADDED,
  TOTAL_SAVINGS,
  TOTAL_PAYABLE_AMOUNT,
  DETAILS,
  DISCOUNT,
  FREE_TEXT,
  SS_WALLET,
} from "../../utility/Constants";

const ViewDetailsModal = ({ customerCartData, cartStore }: any) => {
  const fetchTotalSavings = () => {
    return parseFloat(customerCartData?.cart?.promotion_total?.amount) > 0
      ? (
          parseFloat(customerCartData?.cart?.promotion_total?.amount) +
          Math.abs(customerCartData?.cart?.prices?.discount?.amount?.value)
        )?.toFixed(2)
      : Math.abs(
          customerCartData?.cart?.prices?.discount?.amount?.value
        )?.toFixed(2);
  };

  return (
    <Stack direction="column" width="100%" pl={2} pr={2} pt={"5px"} pb={"4px"}>
      <OrderConfirmationTypography>{DETAILS}</OrderConfirmationTypography>
      {customerCartData?.cart?.prices?.subtotal_excluding_tax?.value && (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ padding: "12px 16px 0px 16px" }}
        >
          <TotalMrp>{TOTAL_MRP}</TotalMrp>
          {customerCartData?.cart?.prices && (
            <TotalMrp>
              {`₹ ${customerCartData?.cart?.prices?.subtotal_excluding_tax?.value?.toFixed(
                2
              )}`}
            </TotalMrp>
          )}
        </Stack>
      )}

      {parseFloat(cartStore?.cartItems?.cart?.promotion_total?.amount) > 0 && (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ padding: "12px 16px 0px 16px" }}
        >
          <OfferDiscount>{OFFER_DISCOUNT}</OfferDiscount>
          {customerCartData?.cart?.prices && (
            <OfferDiscount>{`-₹ ${parseFloat(
              cartStore?.cartItems?.cart?.promotion_total?.amount
            )?.toFixed(2)}`}</OfferDiscount>
          )}
        </Stack>
      )}
      {customerCartData?.cart?.prices?.discount?.amount?.value && (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ padding: "12px 16px 0px 16px" }}
        >
          <OfferDiscount>
            {DISCOUNT} &nbsp;
            {customerCartData?.cart?.applied_coupons?.[0]?.code && (
              <>Coupon Discount</>
            )}
          </OfferDiscount>
          {customerCartData?.cart?.prices && (
            <OfferDiscount>
              {`-₹ ${Math.abs(
                customerCartData?.cart?.prices?.discount?.amount?.value
              )?.toFixed(2)}`}
            </OfferDiscount>
          )}
        </Stack>
      )}
      {customerCartData?.cart?.wallet_discount?.amount != null &&
        customerCartData?.cart?.wallet_discount?.amount != "0" && (
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ padding: "12px 16px 0px 16px" }}
          >
            <OfferDiscount>{SS_WALLET}</OfferDiscount>
            <OfferDiscount>
              - ₹{" "}
              {parseFloat(
                customerCartData?.cart?.wallet_discount?.amount
              )?.toFixed(2)}
            </OfferDiscount>
          </Stack>
        )}
      {customerCartData?.cart?.prices?.loyalty_discount?.value > 1 && (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ padding: "12px 16px 0px 16px" }}
        >
          <OfferDiscount>
            {customerCartData?.cart?.prices?.loyalty_discount?.label}
          </OfferDiscount>
          <OfferDiscount>
            - ₹{" "}
            {parseFloat(
              customerCartData?.cart?.prices?.loyalty_discount?.value
            )?.toFixed(2)}
          </OfferDiscount>
        </Stack>
      )}
      {customerCartData?.cart?.prices?.egv_discount?.value > 1 && (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ padding: "12px 16px 0px 16px" }}
        >
          <OfferDiscount>
            {customerCartData?.cart?.prices?.egv_discount?.label}
          </OfferDiscount>
          <OfferDiscount>
            - ₹{" "}
            {parseFloat(
              customerCartData?.cart?.prices?.egv_discount?.value
            )?.toFixed(2)}
          </OfferDiscount>
        </Stack>
      )}
      {customerCartData?.cart?.shipping_addresses?.[0]
        ?.selected_shipping_method && (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ padding: "10px 16px 0px 16px" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gridGap: "10px" }}>
            <ConvenienceFee>{CONVENIENCE_FEE}</ConvenienceFee>
          </Box>
          <ConvenienceFee>
            {customerCartData.cart?.shipping_addresses?.[0]
              ?.selected_shipping_method?.amount?.value == 0
              ? FREE_TEXT
              : `₹ ${customerCartData?.cart?.shipping_addresses?.[0]?.selected_shipping_method?.amount?.value?.toFixed(
                  2
                )}`}
          </ConvenienceFee>
        </Stack>
      )}
      {customerCartData?.cart?.prices?.giftPrice && (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ padding: "10px 16px 0px 16px" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gridGap: "10px" }}>
            <ConvenienceFee>{GIFT_PRICE}</ConvenienceFee>
          </Box>
          {customerCartData?.cart?.prices && (
            <ConvenienceFee>
              {customerCartData?.cart?.prices?.giftPrice?.toFixed(2)}
            </ConvenienceFee>
          )}
        </Stack>
      )}
      {customerCartData?.cart?.freeSample && (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ padding: "10px 16px 0px 16px" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gridGap: "10px" }}>
            <ConvenienceFee>{FREE_SAMPLE}</ConvenienceFee>
          </Box>
          {customerCartData?.cart?.prices && (
            <ConvenienceFee>
              {customerCartData?.cart?.freeSample}
            </ConvenienceFee>
          )}
        </Stack>
      )}
      {Number(fetchTotalSavings()) > 0 && customerCartData?.cart?.prices && (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            padding: "11px 16px",
            marginTop: "10px",
            backgroundColor: "#FBEDB5",
          }}
        >
          <TotalSavings>{TOTAL_SAVINGS}</TotalSavings>
          <TotalSavings>{`₹ ${fetchTotalSavings()}`}</TotalSavings>
        </Stack>
      )}
      {customerCartData?.cart?.freeSample && customerCartData?.cart?.prices && (
        <Stack
          direction="row"
          sx={{ padding: "10px 16px 0px 16px" }}
          spacing={1}
        >
          <FreeSampleImg
            src={`${ReplaceImage(verifiedMarkMobile)}`}
            alt="free-sample"
          />
          <FreeSampleTypography>{FREE_SAMPLE_ADDED}</FreeSampleTypography>
        </Stack>
      )}
      <Divider sx={{ paddingTop: "10px" }} />
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ padding: "10px 16px 16px 16px" }}
      >
        <TotalPayableAmount>{TOTAL_PAYABLE_AMOUNT}</TotalPayableAmount>
        {customerCartData?.cart?.prices && (
          <TotalPayableAmount>
            {customerCartData?.cart &&
              `₹ ${customerCartData?.cart?.prices?.grand_total?.value?.toFixed(
                2
              )}`}
          </TotalPayableAmount>
        )}
      </Stack>
    </Stack>
  );
};

export default ViewDetailsModal;
