import { Box } from "@mui/material";
import CryptoJS from "crypto-js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { event } from "../../../lib/ga/index";
import InitialScreenComponentInterface from "../../../schemas/SignIn/InitialScreen";
import { useMobileCheck } from "../../../utility/isMobile";
import useStorage from "../../../utility/useStoarge";
import { Cookies } from "react-cookie";
import {
  ErrorEvent,
  SignInProccess,
} from "../../SigninComponent/AnalyticsAttributes";
import { loginWithOtpAPI, loginWithOtpAPIV2, signUpWithOtpAPI } from "../utils/SSOAPI";
import {
  BoxStyled,
  ButtonStyled,
  SmallTitle,
  TextFieldStyled,
  Title,
} from "./InitialScreenStyled";
import GoogleRecaptcha from "../../InvisibleRecaptcha/InvisibleRecaptcha";
import { IS_RECAPTCHA_ENABLED } from "../../../utility/APIConstants";

const InitialScreen = (props: InitialScreenComponentInterface) => {
  const {
    data,
    getIsEmail,
    getIsMobile,
    enteredValue,
    getUserInfo,
    setNetworkError,
    setLoader,
    socialAuth,
    socialProfile,
    socialGraphDomain,
    setSnackBarMessage,
    setOtpErrorSnackBarOpen,
  } = props;
  const [emailOrPhone, setEmailOrPhone] = useState(enteredValue);
  const [error, setError] = useState(false);
  const [helpertext, setHelperText] = useState("");
  const cookie = new Cookies();
  const [isDisabled, setIsDisabled] = useState(
    emailOrPhone?.length > 1 ? false : true
  );
  const { getItem, setItem } = useStorage();
  const isMobile = useMobileCheck();

  const emailOrPhoneRef = useRef(emailOrPhone);

  useEffect(() => {
    emailOrPhoneRef.current = emailOrPhone;
  }, [emailOrPhone]);

  const handleTokenReceived = (token: string) => {
    console.log("Received tokennn:", token);
    if (token) {
      ProceedClick();
    } else {
      console.error("recaptcha failed..");
    }
  };
  const handleChange = (event: any) => {
    event?.target?.value?.length <= 10 && event?.target?.value[0] > 5
      ? setEmailOrPhone(
          Math.max(0, parseInt(event.target.value)).toString().slice(0, 10)
        )
      : event?.target?.value?.length == 0 && setEmailOrPhone("");
    if (event.target.value?.length == 0) {
      setError(false);
    } else if (event.target.value?.length < 10) {
      setError(true);
      setHelperText(
        "Phone number can’t be empty. It should be a valid number of 10 digits"
      );
      setIsDisabled(true);
    } else {
      setError(false);
      setIsDisabled(false);
    }
  };
  const ProceedClick = async () => {
    const currentEmailOrPhone = emailOrPhoneRef.current;

    const EmailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const PhoneFormat =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (currentEmailOrPhone.match(EmailFormat)) {
      let SignInProcced = SignInProccess();
      setError(false);
      getIsEmail(true);
      localStorage.setItem("Email", currentEmailOrPhone);
      (SignInProcced.page_title = "signindetailpage"),
        (SignInProcced.page_type = "SSO"),
        (SignInProcced.page_path = window?.location?.pathname),
        (SignInProcced.platform =
          window?.innerWidth > 768 ? "PWA" : "MobilePWA"),
        (SignInProcced.method = "email");
      (SignInProcced.link_url = "na"), (SignInProcced.link_text = "email");
      SignInProcced.outbound = false;
      SignInProcced.jounry_type = "signIn";
      SignInProcced.status = "valid";
      let SignInProceed = {
        ...SignInProcced,
        user_info_hash: CryptoJS.MD5(currentEmailOrPhone),
        page_referrer: getItem("previousPagePath", "local"),
        page_referrer_title: getItem("previousPageTitle", "local"),
        platform: window?.innerWidth > 768 ? "PWA" : "MobilePWA",
        customer_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : cookie.get("MADid"),
        msd_user_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : "",
        page_path: window?.location?.href,
        page_type: "SSO",
        loyalty_level: getItem("loyalitylevel", "local")
          ? getItem("loyalitylevel", "local")
          : "",
        user_mail_id: CryptoJS.MD5(currentEmailOrPhone),
        user_phone_number: currentEmailOrPhone,
      };
      const param = { params: SignInProceed, action: "signin_proceed" };
      event(param);
    } else if (currentEmailOrPhone.match(PhoneFormat)) {
      setLoader(false);
      let SignInProcced = SignInProccess();
      (SignInProcced.page_title = "signindetailpage"),
        localStorage.setItem("mobileNumber", currentEmailOrPhone);
      SignInProcced.method = "mobile";
      (SignInProcced.link_url = "na"), (SignInProcced.link_text = "PROCEED");
      SignInProcced.outbound = false;
      SignInProcced.jounry_type = "signin";
      SignInProcced.status = "valid";
      let SignInProceed = {
        ...SignInProcced,
        user_info_hash: CryptoJS.MD5(currentEmailOrPhone),
        page_referrer:
          JSON?.parse(localStorage?.getItem("pageReferrer") as string)?.[
            JSON?.parse(localStorage?.getItem("pageReferrer") as string)
              ?.length - 2
          ]?.previousPagePath || "na",
        page_referrer_title:
          JSON.parse(localStorage?.getItem("pageReferrer") as string)?.[
            JSON?.parse(localStorage?.getItem("pageReferrer") as string)
              ?.length - 2
          ]?.previousPageTitle || "na",
        platform: window?.innerWidth > 768 ? "PWA" : "MobilePWA",
        customer_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : cookie.get("MADid"),
        msd_user_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : "",
        page_path: window.location.href,
        page_type: "SSO",
        loyalty_level: getItem("loyalitylevel", "local")
          ? getItem("loyalitylevel", "local")
          : "na",
        user_mail_id: "na",
        user_phone_number: currentEmailOrPhone,
        page_slug: getItem("currentPageSlug", "local"),
      };
      const param = { params: SignInProceed, action: "signin_proceed" };

      event(param);
      // GraphQL Api Call
      if (socialAuth && currentEmailOrPhone.match(PhoneFormat)) {
        setLoader(true);

        const email =
          socialGraphDomain &&
          (socialGraphDomain == "facebook"
            ? socialProfile?.email
            : socialGraphDomain == "google"
            ? socialProfile?.email
            : "");
        const signUpWithOtpApiResponse = await signUpWithOtpAPI(
          currentEmailOrPhone,
          email
        );
        const { status, response }: any = signUpWithOtpApiResponse;
        if (status === "success") {
          const { otpSent, errorCode, errorMessage } =
            response?.data?.signUpWithOtp;
          if (otpSent === true) {
            getIsMobile(true);
            setNetworkError(false);
          }
          if (
            errorCode.toLowerCase() === "maxresendattemptsreachedotperror" ||
            errorCode.toLowerCase() ===
              "maxverificationattemptsreachedotperror" ||
            errorCode.toLowerCase() === "mobilenotuniqueerror"
          ) {
            setOtpErrorSnackBarOpen(true);
            setSnackBarMessage(errorMessage);
          }

          setLoader(false);
        }
        if (status === "fail") {
          setNetworkError(true);
          setNetworkError("Network Error");
          setLoader(false);
        }
      } else {
        setLoader(true);
        // const loginWithOtpApiResponse = await loginWithOtpAPI(currentEmailOrPhone);

        const loginWithOtpApiResponse = await loginWithOtpAPIV2(currentEmailOrPhone);
        
        const { status, response }: any = loginWithOtpApiResponse;
        response?.data?.loginWithOtp?.errorMessage &&
          response?.data?.loginWithOtp?.errorMessage !== "unidentified" &&
          setError(response?.data?.loginWithOtp?.errorMessage);
        setHelperText(
          response?.data?.loginWithOtp?.errorMessage?.replaceAll(
            "shoppersstop.com",
            "ssbeauty.in"
          )
        );
        if (status === "success") {
          const { otpSent, errorCode, errorMessage } =
            response?.data?.loginWithOtp;

          if (otpSent === true) {
            getIsMobile(true);
            setNetworkError(false);
          }

          if (
            errorCode?.toLowerCase() === "maxresendattemptsreachedotperror" ||
            errorCode?.toLowerCase() ===
              "maxverificationattemptsreachedotperror"
          ) {
            setOtpErrorSnackBarOpen(true);
            setSnackBarMessage(errorMessage);
          }
          setLoader(false);
        }
        if (status === "fail") {
          setNetworkError(true);
          setNetworkError("Network Error");
        }
        setLoader(false);
      }
    } else {
      setError(true);
      let Error = ErrorEvent();
      Error.page_title = "signindetailpage";
      (Error.page_type = "SSO"), (Error.page_path = window.location.href);
      Error.platform = window?.innerWidth > 768 ? "PWA" : "MobilePWA";
      Error.status = "invalid";
      let ErrorDetails = {
        ...Error,
        page_referrer_title: getItem("previousPageTitle", "local"),
        page_referrer: getItem("previousPagePath", "local"),
      };

      const param = { params: ErrorDetails, action: "error" };
      event(param);
      setHelperText("Please enter a valid phone number");
    }
    getUserInfo(currentEmailOrPhone);
  };

  const handleKeyRestrictions = (event: any) => {
    let keyCharCode = event.keyCode;
    if (event?.key === "Enter") {
      ProceedClick();
    }
    if (["e", "E", "+", "-", ".", "Unidentified"]?.includes(event.key)) {
      event.preventDefault();
    }
    if ((keyCharCode >= 48 && keyCharCode <= 57) || keyCharCode == 8) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <React.Fragment>
      <Box
        width="100%"
        sx={{
          pt: "130px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          "@media (max-width:600px)": {
            pt: "94px",
          },
        }}>
        <Title sx={{ fontSize: { lg: 20, md: 16, sm: 14, xs: 12 } }}>
          {" "}
          {data?.title}{" "}
        </Title>
        <SmallTitle sx={{ fontSize: { lg: 16, md: 14, sm: 12, xs: 12 } }}>
          {socialAuth ? "Enter your mobile number to sign up" : data?.subTitle}
        </SmallTitle>
        <BoxStyled width={isMobile ? "88%" : "75%"}>
          <TextFieldStyled
            autoComplete="off"
            id="outlined-basic"
            label={
              socialAuth ? "Enter your phone Number" : "Enter your phone number"
            }
            variant="outlined"
            fullWidth
            error={error}
            helperText={error && helpertext}
            value={emailOrPhone}
            inputProps={{
              inputmode: "numeric",
              pattern: "[0-9]*",
            }}
            onKeyDown={handleKeyRestrictions}
            // whenever email can be used for signIn we need to update the validation
            onChange={handleChange}
            type="tel"
            InputLabelProps={{
              style: { color: "#AD184C" },
            }}
            InputProps={{
              style: {
                padding: 0,
                margin: 0,
                borderRadius: 0,
                height: "49px",
                position: "relative",
                justifyContent: isMobile ? "center" : "none",
              },

              endAdornment: IS_RECAPTCHA_ENABLED ? (
                <GoogleRecaptcha
                  onTokenReceived={handleTokenReceived}
                  isDisabled={isDisabled}
                  buttonText={data?.buttontext}
                />
              ) : (
                <ButtonStyled onClick={ProceedClick} disabled={isDisabled}>
                  {data?.buttontext}
                </ButtonStyled>
              ),
            }}
          />
        </BoxStyled>
      </Box>
    </React.Fragment>
  );
};

export default InitialScreen;
