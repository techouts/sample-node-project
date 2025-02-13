import { Box, Checkbox, Stack, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import ffcLogo from "./ffc-logo.svg";
import {
  BoxWrapper,
  ConsentDescription,
  ConsentDetails,
  ConsentDetailsPriceText,
  ConsentDetailsSubtitle,
  ConsentDetailsTitle,
} from "./FirstCitizenClubConsentStyles";
import { useRecoilState } from "recoil";
import { FccCrown } from "../CartLayout/CartConstants";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { AppIcons } from "../../utility/AppIconsConstant";
import { userState } from "../../recoilstore";
function FirstCitizenClubConsent() {
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const FccConsentLogo = AppIcons(FccCrown);
  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void {
    setUserDataItems((previousData: any) => ({
      ...previousData,
      acceptFCCConsent: event?.target?.checked,
    }));
  }

  return (
    <BoxWrapper>
      <ConsentDetails>
        <ConsentDetailsTitle>{"First Citizen Club Member"}</ConsentDetailsTitle>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          mt={2}
          width={"100%"}
        >
          <Stack direction={"row"}>
            <img
              width={"36.42px"}
              height={"27.77px"}
              src={`${ReplaceImage(FccConsentLogo?.url)}`}
            />
            <Stack ml={1}>
              <ConsentDetailsSubtitle>{"First connect"}</ConsentDetailsSubtitle>
              <ConsentDetailsPriceText>{"₹0"}</ConsentDetailsPriceText>
            </Stack>
          </Stack>
          <Checkbox
            checked={userDataItems?.acceptFCCConsent}
            onChange={handleChange}
          />
        </Stack>
      </ConsentDetails>
      <ConsentDescription>
        {
          "By continuing I am agreeing to enroll for the free tier subscription for loyalty program"
        }
      </ConsentDescription>
    </BoxWrapper>
  );
}

export default FirstCitizenClubConsent;
