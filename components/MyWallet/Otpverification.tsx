import React from "react";
import { useState } from "react";
import data from "./Otp.json";
import {
  FirstParent,
  PTitle,
  TitleGrid,
  SubtitleGrid,
  NumParent,
  OnlyNum,
  SendOtp,
  PButton,
} from "./OtpStyle";
import { Grid } from "@mui/material";
import { OtpComponentLogic } from "../SigninComponent/MobileOtpScreen/OtpComponentLogic";
type proptype = {
  doCurrBal?: () => any;
};
function Otpverification(props: proptype) {
  const [otp, setOtp] = useState("");
  let phone = localStorage?.getItem("mobileNumber");

  let phnumber = phone?.replace(phone.substring(2, 8), "XXXXXX");
  return (
    <FirstParent>
      <PTitle>
        <TitleGrid>{data.otpTitle}</TitleGrid>

        <SubtitleGrid>{data.otpSubtitle}</SubtitleGrid>
      </PTitle>

      <NumParent>
        <Grid dangerouslySetInnerHTML={{ __html: data.otpnumber }}></Grid>

        <OnlyNum>{phnumber}</OnlyNum>
      </NumParent>

      <OtpComponentLogic setOtp={setOtp} />

      <SendOtp dangerouslySetInnerHTML={{ __html: data.otpText }}></SendOtp>

      <PButton onClick={props?.doCurrBal}>{data.otpButton}</PButton>
    </FirstParent>
  );
}

export default Otpverification;
