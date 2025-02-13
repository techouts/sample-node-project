import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  PriceBox,
  PriceNameTypography,
  ProductNameBox,
  ProductNameTypography,
  QuantityTypography,
  RatingBox,
  RatingTypography,
  StatusTypography,
  ProductImage,
} from "./ExchangeStatusCardStyled";
import { useMobileCheck } from "../../../utility/isMobile";
import { StarIconImage } from "../OrderDetails/OrderDetailsStyles";
import { onImageError } from "../../../utility/onImageError";
import { AppIcons } from "../../../utility/AppIconsConstant";
import { Error_Image } from "../../../utility/AppIcons";

const ExchangeStatusCardSingle = ({
  productImage,
  productName,
  rating,
  price,
  quantityOrdered,
}: any) => {
  const isMobile = useMobileCheck();
  const errorImage = AppIcons(Error_Image)
  return (
    <Fragment>
      <Grid container alignItems="center" display={"flex"} p={"2% 1%"}>
        <Grid item xs={4.2}>
          <ProductImage src={productImage} onError={(e: any) => onImageError(e, errorImage)} />
        </Grid>
        <Grid item xs={7.8}>
          <ProductNameBox>
            <ProductNameTypography isMobile={isMobile}>
              {productName}
            </ProductNameTypography>
          </ProductNameBox>
          {rating > 0 && (
            <RatingBox>
              <StarIconImage />
              <RatingTypography isMobile={isMobile}>{rating}</RatingTypography>
            </RatingBox>
          )}
          <Box>
            <QuantityTypography>{`Qty : ${quantityOrdered}`}</QuantityTypography>
          </Box>
          <PriceBox>
            <PriceNameTypography>₹{price}</PriceNameTypography>
            <StatusTypography>{"Online"}</StatusTypography>
          </PriceBox>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ExchangeStatusCardSingle;
