import Box from "@mui/material/Box";
import { useState } from "react";
import { OtpComponentLogic } from "../../SigninComponent/MobileOtpScreen/OtpComponentLogic";
import { OtpTypography, PayButton, SentOtpTypography, TextTypography, VerifyTypography } from "./OtpStyled";
export const Otp = ({ rmn }: any) => {
  const [otp, setOtp] = useState("");
  return (
    <Box>
      <VerifyTypography>VERIFY phone no. WITH OTP</VerifyTypography>
      <OtpTypography>Enter the OTP sent to your phone number</OtpTypography>
      <SentOtpTypography >{`OTP sent to ${rmn?.replace(
        rmn?.substring(2, 8),
        "XXXXXX"
      )}`}</SentOtpTypography>
      <OtpComponentLogic setOtp={setOtp} sysprops={{ display: "flex", justifyContent: "space-evenly" }}></OtpComponentLogic>
      <TextTypography>
        Didn’t receive an SMS? <span>Resend OTP</span>
      </TextTypography>
      <PayButton>Verify and pay</PayButton>
    </Box>
  );
};
