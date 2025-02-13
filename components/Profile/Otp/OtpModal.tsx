import React, { useState, useEffect } from "react";
import {
  FirstParent,
  MainBox,
  NumParent,
  OnlyNum,
  OtpNumber,
  PButton,
  PTitle,
  ResendOtpTypography,
  SendOtp,
  SubtitleGrid,
  TimerTypography,
  TitleGrid,
  VerifyButtonBox,
} from "../ChangePassword/EditStyles";
import { Box,Typography } from "@mui/material";
import { OtpComponentLogic } from "../../SigninComponent/MobileOtpScreen/OtpComponentLogic";
import otpData from "../MyProfileOtpModal.json";
import {
  TypographyOtp,
} from "../../SigninComponent/MobileOtpScreen/MobileOtpStyled";
import { useMobileCheck } from "../../../utility/isMobile";

const OtpModal = ({ handleVerifyOtp, setResend, counter, setCounter }: any) => {
  const [otp, setOtp] = useState("");

  let phone = global?.window?.localStorage?.getItem("mobileNumber");
  let phnumber = phone?.replace(phone?.substring(2, 8), "XXXXXX");
  const [resetOtpFields, setResetOtpFields] = useState(false);
  const [invalidOtp, setIsInvalidOtp] = useState(false);

  const VerifyHandler = (otp: string) => {
    handleVerifyOtp(otp);
  };
  const isMobile = useMobileCheck();

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  const otptimer = () => {
    if (counter != 0) {
      return (
        <TimerTypography>
          Resend in 00:{counter < 10 ? `0${counter}` : counter}
        </TimerTypography>
      );
    } else
      return (
        <MainBox isMobile={isMobile} id="resend">
          <Typography sx={{ color: "#7B7979" }}>
            Didn’t receive an SMS?
          </Typography>
          <ResendOtpTypography onClick={setResend}>
            Resend OTP
          </ResendOtpTypography>
        </MainBox>
      );
  };
  return (
    <div>
      <FirstParent isMobile={isMobile}>
        <PTitle>
          <TitleGrid>{otpData?.otpTitle}</TitleGrid>
          <SubtitleGrid>{otpData?.otpSubtitle}</SubtitleGrid>
        </PTitle>
        <NumParent>
          <OtpNumber
            dangerouslySetInnerHTML={{ __html: otpData?.otpnumber }}
          ></OtpNumber>
          <OnlyNum>{phnumber}</OnlyNum>
        </NumParent>
        <OtpComponentLogic
          setOtp={setOtp}
          resetOtpFields={resetOtpFields}
          VerifyHandler={VerifyHandler}
          invalidOtp={invalidOtp}
          setIsInvalidOtp={setIsInvalidOtp}
        />
        {invalidOtp && (
          <TypographyOtp>
            {" "}
            The entered OTP is either invalid or expired, kindly enter the OTP
            again.
          </TypographyOtp>
        )}
        <Box
          sx={{
            pt: "28px",
            pb: "30px  ",
            "@media (max-width:600px)": {
              pt: "25px",
              pb: "25px",
            },
          }}
        >
          {otptimer()}
        </Box>
        <VerifyButtonBox>
          <PButton onClick={() => VerifyHandler(otp)}>
            {otpData?.otpButton}
          </PButton>
        </VerifyButtonBox>
      </FirstParent>
    </div>
  );
};

export default OtpModal;
