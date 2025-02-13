import React from "react";
import { Box, Stack } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";
import {
  InclusiveOffers,
  Off,
  Price,
  PriceBox,
  PriceBoxContainer,
  PriceLabel,
  PriceSO,
} from "./pdcardstyle";

const ProductPrice = ({ productDetails }: any) => {
  const isMobile = useMobileCheck();
  const isDiscountOff =
    productDetails?.pmr_price_value?.discount?.percent_off <= 0;
  return (
    <PriceBox>
      <Stack
        direction={{ xs: "row", sm: "row", md: "row" }}
        spacing={{ sm: 1 }}
        style={{
          marginTop: isMobile ? "8px" : "16px",
          alignItems: "center",
          gap: isMobile ? "6px" : "0",
        }}>
        {isDiscountOff ? (
          <Stack 
            direction={"row"}
            style={{ display: "flex", alignItems: "center", fontWeight: 400 }}>
            <PriceLabel sx={{ marginRight: "6px" }} ismobile={isMobile}>
              MRP
            </PriceLabel>
            <Price ismobile={isMobile}>
            ₹{Math.round(Number(productDetails?.pmr_price_value?.amount?.value))}
            </Price>
            <InclusiveOffers ml={"6px"} ismobile={isMobile}>
              (Inclusive of all taxes)
            </InclusiveOffers>
          </Stack>
        ) : (
          <Box>
            <Stack direction={"row"} alignItems={"center"}>
              <Price ismobile={isMobile}>
                <Stack style={{ display: "inline-block", fontWeight: 400 }}>
                  ₹
                </Stack>
                {Math.round(Number(productDetails?.pmr_price_value?.amount?.value))}
              </Price>
              <PriceSO ismobile={isMobile}>
                <Stack style={{ display: "inline-block", fontWeight: 400 }}>
                  MRP ₹
                </Stack>
                {Math.round(Number(productDetails?.price_range?.minimum_price?.regular_price?.value))}
              </PriceSO>
              <PriceBoxContainer ismobile={isMobile}>
                <Off ismobile={isMobile}>
                  {Math.round(Number(productDetails?.pmr_price_value?.discount?.percent_off))}
                  % discount
                </Off>
                {!isMobile && (
                  <InclusiveOffers ismobile={isMobile}>
                    (Inclusive of all taxes)
                  </InclusiveOffers>
                )}
              </PriceBoxContainer>
            </Stack>
            {isMobile && (
              <InclusiveOffers ismobile={isMobile}>
                (Inclusive of all taxes)
              </InclusiveOffers>
            )}
          </Box>
        )}
      </Stack>
    </PriceBox>
  );
};

export default ProductPrice;
