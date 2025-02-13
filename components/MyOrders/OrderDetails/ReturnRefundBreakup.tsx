import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import React from "react";
import { useMobileCheck } from "../../../utility/isMobile";
import {
  ButtonBox,
  ButtonStack,
  GrandTotalTypography,
  MainStack,
  ProductOrderTypography,
  ProductPriceTypography,
  TotalAmountTypography,
  ViewBreaupTitle,
} from "../../OrderDetails/ViewBreakModalStyles";

const ReturnRefundBreakup = (returnItem: any) => {
  const isMobile = useMobileCheck();
  return (
    <>
      {returnItem?.total_refund > 0 && (
        <>
          <Box sx={{ padding: isMobile ? "25px 16px" : "48px 0px 42px 30px" }}>
            <ViewBreaupTitle>View Refund Breakup</ViewBreaupTitle>
          </Box>

          {returnItem?.wallet_refund > 0 && (
            <MainStack>
              <ProductOrderTypography>SS Wallet</ProductOrderTypography>
              <ProductPriceTypography>
                {`Rs. ${returnItem?.wallet_refund?.toFixed(2)}`}
              </ProductPriceTypography>
            </MainStack>
          )}
          {returnItem?.egv_refund > 0 && (
            <MainStack>
              <ProductOrderTypography>Gift Card </ProductOrderTypography>
              <ProductPriceTypography>
                {`Rs. ${returnItem?.egv_refund?.toFixed(2)}`}
              </ProductPriceTypography>
            </MainStack>
          )}
          {returnItem?.total_refund -
            (returnItem?.wallet_refund +
            returnItem?.egv_refund) >
            0 && (
            <MainStack>
              <ProductOrderTypography>{`${returnItem?.juspay_refund_mode ? returnItem?.juspay_refund_mode : "JusPay"}`} {`${returnItem?.juspay_reference_id ? `(Ref No. ${returnItem?.juspay_reference_id})` : ""}`}</ProductOrderTypography>
              <ProductPriceTypography>
                {`Rs. ${
                  (returnItem?.total_refund -
                  returnItem?.wallet_refund -
                  returnItem?.egv_refund)?.toFixed(2)
                }`}
              </ProductPriceTypography>
            </MainStack>
          )}
          <Divider sx={{ marginTop: "20px" }} />
          <ButtonBox>
            <ButtonStack>
              <TotalAmountTypography>Total Refund</TotalAmountTypography>
              <GrandTotalTypography>
                {`Rs. ${returnItem?.total_refund?.toFixed(2)}`}
              </GrandTotalTypography>
            </ButtonStack>
          </ButtonBox>
        </>
      )}
    </>
  );
};

export default ReturnRefundBreakup;