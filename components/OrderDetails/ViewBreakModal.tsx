import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  MainBox,
  ProductBox,
  MainStack,
  DLTypography,
  DCTypography,
  ButtonBox,
  ButtonStack,
  ModeTypography,
  ViewBreaupTitle,
  ProductOrderTypography,
  ProductPriceTypography,
  DiscountTypography,
  DiscountPriceTypography,
  ConvenienceTypography,
  ConvenienceFeeTypography,
  DeliveryStack,
  ConvenienceStack,
  TotalAmountTypography,
  GrandTotalTypography,
  DownlodButton,
  ButtonTypography,
} from "./ViewBreakModalStyles";
import { useMobileCheck } from "../../utility/isMobile";
import PaymentModeUtility from "../../utility/PaymentModeUtility";
const MyOrderModel = ({ viewBreakUp }: any) => {
  const InvoiceDownload = (pdfUrl: String) => {
    const link = document.createElement("a");
    link.download = `${pdfUrl}`;
    link.href = `${pdfUrl}`;
    link.click();
  };
  const isMobile = useMobileCheck();

  const getFormattedValue = (value: any) => {
    return `Rs. ${parseFloat(value)?.toFixed(2)}`;
  };
  return (
    <>
      <Box>
        <Box sx={{ padding: isMobile ? "25px 16px" : "48px 0px 42px 30px" }}>
          <ViewBreaupTitle>View Breakup</ViewBreaupTitle>
        </Box>
        {viewBreakUp?.map((item: any, index: number) => (
          <>
            <MainBox key={index}>
              <ProductBox>
                <ProductOrderTypography>
                  {item?.items?.[0]?.quantity_ordered} x{" "}
                  {item?.items?.[0]?.product_name}
                </ProductOrderTypography>
                <ProductPriceTypography>
                  {item?.items?.[0]?.product_sale_price?.value !== 0 &&
                  item?.items?.[0]?.product_sale_price?.value !== 0.01
                    ? getFormattedValue(
                        item?.items?.[0]?.product_sale_price?.value *
                          item?.items?.[0]?.quantity_ordered
                      )
                    : "Free"}
                </ProductPriceTypography>
              </ProductBox>
            </MainBox>
            {item?.items?.[0]?.applied_pmr_promotions_amount > 0 && (
              <MainBox key={index}>
                <ProductBox>
                  <ProductOrderTypography>
                    Product Promotion Discount
                  </ProductOrderTypography>
                  <ProductPriceTypography>
                    -{" "}
                    {getFormattedValue(
                      item?.items?.[0]?.applied_pmr_promotions_amount
                    )}
                  </ProductPriceTypography>
                </ProductBox>
              </MainBox>
            )}
          </>
        ))}
        {viewBreakUp?.[0]?.items?.[0]?.coupon_amount &&
          parseFloat(viewBreakUp?.[0]?.coupon_amount) > 0 &&
          viewBreakUp?.[0]?.total?.grand_total?.value && (
            <MainStack>
              <DiscountTypography>
                Coupon Discount (
                {`${viewBreakUp?.[0]?.items?.[0]?.coupon_code}`})
              </DiscountTypography>
              <DiscountPriceTypography>
                - Rs.{parseFloat(viewBreakUp?.[0]?.coupon_amount)?.toFixed(2)}
              </DiscountPriceTypography>
            </MainStack>
          )}
        {viewBreakUp?.convenienceFee && (
          <ConvenienceStack>
            <ConvenienceTypography>Convenience Fee</ConvenienceTypography>
            <ConvenienceFeeTypography>
              Rs.{viewBreakUp?.convenienceFee}
            </ConvenienceFeeTypography>
          </ConvenienceStack>
        )}
        {viewBreakUp?.[0]?.total?.shipping_handling && (
          <>
            {viewBreakUp?.[0]?.total?.shipping_handling?.amount_excluding_tax
              ?.value > 0 ? (
              <DeliveryStack>
                <DLTypography>Delivery Charges</DLTypography>
                <DCTypography>
                  Rs.
                  {
                    viewBreakUp?.[0]?.total?.shipping_handling
                      ?.amount_excluding_tax?.value
                  }
                </DCTypography>
              </DeliveryStack>
            ) : (
              <DeliveryStack>
                <DLTypography>Delivery Charges</DLTypography>
                <DCTypography>Free</DCTypography>
              </DeliveryStack>
            )}
          </>
        )}
      
        <Divider sx={{ marginTop: "20px" }} />
        <ButtonBox>
          <ButtonStack>
            <TotalAmountTypography>Total Paid</TotalAmountTypography>
            <GrandTotalTypography>
              {getFormattedValue(viewBreakUp?.[0]?.total?.grand_total?.value)}
            </GrandTotalTypography>
          </ButtonStack>
          <ModeTypography>
            Mode of Payment: {PaymentModeUtility(viewBreakUp)}
          </ModeTypography>
          {viewBreakUp?.[0]?.invoice_url !== null &&
            viewBreakUp?.[0]?.invoice_url !== "" && (
              <DownlodButton
                fullWidth
                onClick={() => InvoiceDownload(viewBreakUp?.[0]?.invoice_url)}
              >
                <ButtonTypography>download invoice</ButtonTypography>
              </DownlodButton>
            )}
        </ButtonBox>
      </Box>
    </>
  );
};
export default MyOrderModel;
