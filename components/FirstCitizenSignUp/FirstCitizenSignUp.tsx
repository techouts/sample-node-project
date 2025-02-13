import { Box } from "@mui/material";
import React, { useState } from "react";
import { useMobileCheck } from "../../utility/isMobile";
import {
  MainBox,
  TitleTypography,
  SubTitleTypography,
  LoginButtons,
  ButtonsBox,
  SignInBox,
  SubTitleBox,
} from "./FirstCitizenSignUpStyles";
import CardTierData from "../FirstTierCitizen/CardTierData";
import { Cookies } from "react-cookie";
import NavBannerTier from "../NavBannerTier/NavBannerTier";
import { useAppContext } from "../../context/userInfoContext";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoilstore";
import Loader from "../../HOC/Loader/Loader";
import FirstCitizenSchema from "../../schemas/FirstCitizenSchema";
import LoyalityData from "../LoyalityDataComponent/LoyalityData";
import { useRouter } from "next/router";

function FirstCitizenSignUp({
  title,
  loginButton,
  signUpButton,
  subTitle,
  item,
  navTitle,
  navImgUrl,
  items,
  fcLogo,
  fcNacInnerTitle,
  fcNavInnerSubTitle,
  bgPadding,
  bgColor,
}: FirstCitizenSchema) {
  const userInfoContext = useAppContext();
  const { contextData, updateContextData } = userInfoContext;
  const userDataItems = useRecoilValue(userState);
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");
  const [displayLoader, setLoader] = useState(
    accessToken && userDataItems && userDataItems?.tier !== "na" ? true : false
  );
  const router = useRouter();
  const isMobile = useMobileCheck();
  const [isSignUp, setIsSignUp] = useState(true);
  const styles = accessToken ? "" : "0% 4.5%";
  return (
    <Box p={isMobile ? styles : bgPadding}>
      {displayLoader && <Loader />}
      {!accessToken && (
        <MainBox isMobile={isMobile}>
          <SignInBox isMobile={isMobile}>
            {isMobile ? "" : <TitleTypography>{title}</TitleTypography>}
            <SubTitleBox>
              <SubTitleTypography>{subTitle}</SubTitleTypography>
            </SubTitleBox>
            <ButtonsBox sx={{ width: "100%" }} isMobile={isMobile}>
              <LoginButtons
                $isFirst={true}
                onClick={() => {
                  {
                    updateContextData && updateContextData({ openSSO: true });
                  }
                }}
              >
                {loginButton}
              </LoginButtons>
              <LoginButtons
                $isFirst={false}
                onClick={() => {
                  {
                    updateContextData && updateContextData({ openSSO: true });
                  }
                }}
              >
                {signUpButton}
              </LoginButtons>
            </ButtonsBox>
          </SignInBox>
        </MainBox>
      )}
      {accessToken && userDataItems.tier !== "na" && (
        <LoyalityData
          displayLoader={displayLoader}
          setLoader={setLoader}
          item={item}
        />
      )}
      {accessToken &&
      userDataItems?.tier !== "na" &&
      router?.asPath?.includes("/account") ? (
        <></>
      ) : (
        <>
          <NavBannerTier
            navTitle={navTitle}
            navImgUrl={navImgUrl}
            items={items}
            fcLogo={fcLogo}
            fcNacInnerTitle={fcNacInnerTitle}
            fcNavInnerSubTitle={fcNavInnerSubTitle}
          />
          <CardTierData item={item} />
        </>
      )}
    </Box>
  );
}

export default FirstCitizenSignUp;
