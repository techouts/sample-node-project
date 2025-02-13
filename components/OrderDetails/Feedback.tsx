import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import {
  AddressBox,
  OrderfeedbackTitle,
  ReviewButton,
  StyledBox,
  TitleTypography,
} from "./OrderDetailsStyles";

import ReviewComponentCard from "../ReviewComponent/ReviewComponentCard";
import { Cookies } from "react-cookie";
const ReviewData = require("../../JSON/ReviewCardData.json");
const FeedBackRating = ({ orderItem, orderData }: any) => {
  const [openReviewTab, setReviewTab] = useState(false);
  const [value, setValue] = useState(0);
  const [clickedBack, setClickedBack] = useState(false);

  const cookie = new Cookies();
  const reviewClick = () => {
    if (cookie.get("accessToken")) {
      setReviewTab(!openReviewTab);
    } else {
      setReviewTab(true);
    }
  };
  useEffect(() => {
    console.log("first");
    setValue((prevState) => {
      return 0;
    });
  }, [clickedBack]);

  return (
    <AddressBox>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TitleTypography>Product feedback</TitleTypography>
          <OrderfeedbackTitle>
            Rate The Product: {orderItem?.product_name}
          </OrderfeedbackTitle>
          <Rating
            sx={{
              color: "#AD184C",
              "& .MuiRating-label": {
                fontSize: "38px",
              },
            }}
            name="half-rating"
            precision={1}
            value={value}
            size="large"
            onChange={(event: any, newValue: any) => {
              setValue(newValue);
              if (cookie.get("accessToken")) {
                setReviewTab(!openReviewTab);
              } else {
                setReviewTab(true);
              }
            }}
          ></Rating>
          <ReviewButton size="small" onClick={reviewClick}>
            Write a review
          </ReviewButton>
          <ReviewComponentCard
            setValue={setValue}
            setClickedBack={setClickedBack}
            clickedBack={clickedBack}
            value={value}
            setReviewTab={setReviewTab}
            openReviewTab={openReviewTab}
            componentData={ReviewData}
            productDataItem={orderData}
            productName={orderItem?.product_name}
            productSku={orderItem?.parent_sku}
            closeReviewTab={reviewClick}
            myOrders={true}
          />
        </Grid>
      </Grid>
    </AddressBox>
  );
};

export default FeedBackRating;
