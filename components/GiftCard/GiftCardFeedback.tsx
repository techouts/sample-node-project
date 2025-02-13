import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { VERIFIED_IMAGE_ICON } from "../../utility/AppIcons";
import { AppIcons } from "../../utility/AppIconsConstant";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { ShoppingExperience } from "../ShoppingExperience/ShoppingExperience";
import {
  Title,
  UserName,
  TitleBox,
  LargeText,
  SimpleText,
  StyledButton,
  PaymentText,
  OrderText,
  Ordercode,
  OrderDet,
} from "./FeedbackStyles";
import { useMobileCheck } from "../../utility/isMobile";
import React from "react";

const data = require("./GiftcardFeedback.json");
const FeedbackForm = () => {
  const isMobile = useMobileCheck();
  const VERIFIED_IMAGE = AppIcons(VERIFIED_IMAGE_ICON);
  return (
    <Box p={isMobile?"16px":"86px"}>
      <TitleBox>
        <Title>{data?.cardTitle}</Title>
        <img
          src={`${ReplaceImage(VERIFIED_IMAGE?.url)}`}
          alt="verified icon"
          width={"20px"}
        ></img>
      </TitleBox>
      <Grid container sx={{justifyContent: "space-between"}}>
        <Grid item xs={12} lg={6} sm={6} md={6}>
          <UserName>{data?.userName}</UserName>
          <Box sx={{border:isMobile? "1px solid #EAEAEA":"none", padding:isMobile?"16px":""}}>
          <OrderDet>{data?.orderDetail}</OrderDet>
          <OrderText>{data?.orderId}</OrderText>
          <Ordercode>{data?.ordernumber}</Ordercode>
          <OrderText>{data?.orderDate}</OrderText>
          <Ordercode>{data?.date}</Ordercode>
          <OrderText>{data?.orderstatus}</OrderText>
          <Ordercode>{data?.todelivered}</Ordercode>
          </Box>
          
        </Grid>
        <Grid item xs={12} lg={4} sm={4} md={4}>
        <Box  sx={{border: "1px solid #EAEAEA", padding:"18px 20px 13px 20px"}}>
            <Stack>
              <LargeText>{data?.viewbreakup}</LargeText>
                <Stack direction="row" justifyContent="space-between" mt="17px">
                  <SimpleText>{data?.E_Gift_Card}</SimpleText>
                    <SimpleText>
                      {`₹ ${data?.price}`}
                    </SimpleText>
                
                </Stack>
                  <Stack direction="row" justifyContent="space-between"  mt="20px">
                    <SimpleText>{data?.discount}</SimpleText>
                    <SimpleText>
                      - ₹ {data?.dPrice}
                    </SimpleText>
                  </Stack>
              
                <Stack direction="row" justifyContent="space-between" mt="20px">
                  <SimpleText>{data?.convenience}</SimpleText>
                  <SimpleText>
                    {`₹ ${data?.dPrice}`}
                  </SimpleText>
                </Stack>
                <Stack direction="row" justifyContent="space-between" mt="15px">
                  <SimpleText>{data?.deliverycharges}</SimpleText>
                  <SimpleText>
                    {`₹ ${data?.dPrice}`}
                  </SimpleText>
                </Stack>
            </Stack>
            <Divider sx={{border:"1px solid  #E8E8E8",marginTop:"14px"}}/>
          <Box>
            <Stack direction="row" spacing="4px" justifyContent="space-between"mt="14px">
              <LargeText sx={{ fontSize: isMobile ? "14px" : "16px" }}>
                {data?.Payableamount}
              </LargeText>
              <LargeText>
              {`₹ ${data?.price}`}
              </LargeText>
            </Stack>
            <Stack direction="row" spacing="4px" mt="13px">
              <PaymentText>{data?.PaymentMode}</PaymentText>
              <PaymentText>UPI</PaymentText>
            </Stack>
              <StyledButton>
                {data?.invoice}
              </StyledButton>
          </Box>
        </Box>
        </Grid>
      </Grid>
      <ShoppingExperience/>
    </Box>
  );
};
export default FeedbackForm;
