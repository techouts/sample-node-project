import React, { useEffect, useState, Fragment } from "react";
import { Box } from "@mui/material";
import RegistrationComponentInterface from "../../../schemas/SignIn/RegisterForMobile";
import {
  BoxStyled,
  ButtonStyled,
  SmallTitle,
  TermsText,
  TermsTypography,
  TextFieldStyled,
  Title,
} from "./StyleForMobile";
import useStorage from "../../../utility/useStoarge";
import CryptoJS from "crypto-js";
import { useMobileCheck } from "../../../utility/isMobile";
import { loginWithOtpAPI, loginWithOtpAPIV2 } from "../utils/SSOAPI";
import triggerGAEvent from "../../../utility/GaEvents";
export default function RegisterComponent(
  RegistrationComponentData: RegistrationComponentInterface
) {
  const { setItem } = useStorage();
  const {
    Registration,
    getIsRegister,
    getUserInfo,
    setLoader,
    setNetworkError,
    setNetworkErrorMessage,
    signUpPhone,
    signUpName,
    isCartJourney,
  }: any = RegistrationComponentData;
  // Input Field Data
  const errorMessage = {
    name: "Please enter your first name and last name",
    phone:
      "Phone number can’t be empty. It should be a valid number of 10 digits",
  };
  const initialValues = {
    name: signUpName || "",
    phone: signUpPhone || "",
  };

  const [email, setEmail] = useState(
    localStorage.getItem("guestEmailId") || ""
  );
  const [emailError, setEmailError] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [isDisabled, setIsDisabled] = useState<boolean | undefined>(
    (initialValues?.name?.length && initialValues?.phone?.length) > 1
      ? false
      : true
  );

  const [isFormTouched, setIsFormTouched] = useState(false);
  const [error, setError] = useState({
    name: false,
    phone: false,
  });
  const [userNameErrMsg, setUserNameErrMsg] = useState("")
  
  const isMobile = useMobileCheck();
  useEffect(() => {
    if (isFormTouched) {
      let isValid = Object.values(error)?.includes(true);
      if (isCartJourney) {
        isValid = isValid && !emailError;
      }

      if (
        isCartJourney
          ? !emailError &&
          email.length > 0 &&
          values?.name?.length > 0 &&
          values?.phone?.length > 0 &&
          isValid !== true
          : values?.name?.length > 0 &&
          values?.phone?.length > 0 &&
          isValid !== true
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [error, emailError, email, isFormTouched, values]);

  const formValidation = (isFormValid: any, id: any) => {
    setError({ ...error, [id]: !isFormValid });
  };

  function mobileFun(name: any, value: any, isFormValid: any) {
    if (name === "phone") {
      let temp = value.toString().slice(0, 10);
      isFormValid = temp?.length == 10 || temp?.length == 0;
      if (temp?.length <= 10 && temp[0] > 5) {
        formValidation(isFormValid, name);
        setValues({
          ...values,
          [name]: Math.max(0, parseInt(temp)).toString().slice(0, 10),
        });
        localStorage?.setItem("SignUpPhone", value);
      } else if (temp?.length == 0) {
        setValues({
          ...values,
          [name]: "",
        });
        formValidation(true, name);
      }
    }
  }
  function emailFun(name: any, value: any) {
    if (name === "email") {
      const pattern = /^[a-z0-9@.]*$/;
      if (!pattern.test(value.toLowerCase())) {
        return;
      }
      setEmail(value.toLowerCase());
      if (value.match(/^([a-z0-9]+\.?[a-z0-9]+)+@([\w-]+\.)+[\w-]{1,5}$/)) {
        setEmailError(false);
      } else {
        setEmailError(true);
      }
    }
  }

  const inputChangeHandler = (e: any) => {
    setIsFormTouched(true);
    let isFormValid = false;
    const { name, value } = e.target;
    if (value === "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    if (value?.length == 0) {
      formValidation(true, name);
      setValues({
        ...values,
        [name]: value,
      });
    } else if (name === "name") {
      const pattern = /^[a-zA-Z ]*$/;
      if (!pattern.test(value)) {
        console.log("failed");
        return;
      }
      isFormValid = value.trim().match(/^[^\s].+\w+\s+\w+$/);
      const names = value?.split(' ').map((e: any) => e.trim())
      let nameErrMsg = ""
      if (!value?.includes(' ')) {
        nameErrMsg = "Please enter your first name and last name";
      } else if (names!.length == 2) {
        if (names?.[1].isEmpty) {
          nameErrMsg = 'Please enter last name';
        } else if (names?.[0].length > 24) {
          nameErrMsg = 'First name should not exceed 24 characters';
        } else if (names?.[1].length > 20) {
          nameErrMsg = 'Last name should not exceed 20 characters';
        }
      }
      formValidation(isFormValid && !nameErrMsg, name);
      setUserNameErrMsg(nameErrMsg)
      if (value?.split(" ")?.length < 3 && value?.length <45) {
        setValues({
          ...values,
          [name]: value
        })
        localStorage?.setItem("SignUpName", value);
      }
    }
    mobileFun(name, value, isFormValid);
    emailFun(name, value);
  };

  const onSubmit = async () => {
    if (values?.phone.length == 10) {
      // GraphQL Api Call
      getUserInfo(values?.phone);
      setLoader(true);
      // const loginWithOtpApiResponse = await loginWithOtpAPI(values?.phone);
      const loginWithOtpApiResponse = await loginWithOtpAPIV2(values?.phone);

      const { status, response }: any = loginWithOtpApiResponse;
      if (status === "success") {
        const { otpSent, errorMessage } = response?.data?.loginWithOtp;
        localStorage.setItem("mobileNumber", values?.phone);
        localStorage.setItem("fName", values?.name?.split(" ")[0] || "");
        localStorage.setItem("lName", values?.name?.split(" ")[1] || "");
        localStorage.setItem("guestEmailId", email || "");
        if (otpSent === true) {
          getIsRegister(true);
          triggerSingUpWithNumber("valid");
        } else {
          setNetworkError(true);
          setNetworkErrorMessage(errorMessage);
        }
        setLoader(false);
      }
      if (status === "fail") {
        //handle failure scenarios.
        setNetworkError(true);
        setNetworkErrorMessage("Network Error");
        setLoader(false);
      }
    } else if (values?.phone.length <= 10) {
      console.log("Sorry! Below 10 characters are not valid!");
      triggerSingUpWithNumber("invalid");
    } else if (values?.phone?.length >= 10) {
      console.log("More than 10 characters are Not allowed!");
      triggerSingUpWithNumber("invalid");
    } else {
      triggerSingUpWithNumber("invalid");
    }
  };

  const triggerSingUpWithNumber = (status?: string) => {
    triggerGAEvent(
      {
        link_text: Registration?.buttontext,
        link_url: "na",
        method: "mobile",
        journey_type: "signup",
        user_info_hash: CryptoJS.MD5(values?.phone),
        status: status,
        user_phone_number: values?.phone,
        user_mail_id: "na",
      },
      "signup_register",
      "signup_register",
      "SSO"
    );

    setItem("previousPageTitle", "signupregister", "local");
    setItem("previousPagePath", window?.location?.pathname, "local");
  };

  const triggerEvent = (linkurl: any) => {
    triggerGAEvent(
      {
        widget_description: "na",
        link_text: `${Registration.terms} ${Registration.privacy}`,
        link_url: `${global?.window?.location?.origin}${linkurl}`,
      },
      "hyperlink",
      "signupentermobilenumber",
      "SSO"
    );
    setItem("previousPageTitle", "signupregister", "local");
    setItem("previousPagePath", window?.location?.pathname, "local");
  };

  const handlePhoneKeyRestrictions = (event: any) => {
    let keyCharCode = event.keyCode;
    if (event?.key === "Enter") {
      onSubmit();
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
  const handleUrl = (url: any) => {
    url && isMobile ? window.location.assign(url) : url && window.open(url);
  };

  return (
    <Fragment>
      <Box
        width="100%"
        sx={{
          pt: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          "@media (max-width:600px)": {
            pt: "94px",
          },
        }}
      >
        <Title sx={{ fontSize: { lg: 20, md: 16, sm: 14, xs: 12 } }}>
          {isCartJourney ? Registration?.cartTitle : Registration?.mtitle}
        </Title>
        <SmallTitle sx={{ fontSize: { lg: 16, md: 14, sm: 12, xs: 12 } }}>
          {isCartJourney ? Registration?.cartSubTitle : Registration?.msubTitle}
        </SmallTitle>
        <BoxStyled width={isMobile ? "88%" : "75%"}>
          <TextFieldStyled
            id="outlined-basic"
            label="Name"
            name="name"
            value={values.name}
            onChange={inputChangeHandler}
            margin="normal"
            variant="outlined"
            fullWidth
            error={error?.name}
            helperText={userNameErrMsg || error?.name && errorMessage?.name}
            InputLabelProps={{
              style: { color: "#AD184C" },
            }}
            InputProps={{
              style: {
                padding: 0,
                margin: 0,
                borderRadius: 0,
              },
            }}
          />
        </BoxStyled>
        <Box width={isMobile ? "88%" : "75%"} pt="30px">
          <TextFieldStyled
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            name="phone"
            value={values.phone}
            onChange={inputChangeHandler}
            type="tel"
            error={error?.phone}
            helperText={error?.phone && errorMessage?.phone}
            fullWidth
            onKeyDown={handlePhoneKeyRestrictions}
            InputLabelProps={{
              style: { color: "#AD184C" },
            }}
            inputProps={{
              inputmode: "numeric",
              pattern: "[0-9]*",
            }}
            InputProps={{
              style: {
                padding: 0,
                margin: 0,
                borderRadius: 0,
              },
            }}
          />
        </Box>
        {isCartJourney && (
          <Box width={isMobile ? "88%" : "75%"} pt="30px">
            <TextFieldStyled
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              name="email"
              value={email}
              onChange={inputChangeHandler}
              type="text"
              error={emailError}
              helperText={emailError ? "Email is mandatory" : ""}
              fullWidth
              InputLabelProps={{
                style: { color: "#AD184C" },
              }}
              InputProps={{
                style: {
                  padding: 0,
                  margin: 0,
                  borderRadius: 0,
                },
              }}
            />
          </Box>
        )}
        {!isCartJourney && (
          <TermsText width={isMobile ? "95%" : "75%"}>
            {Registration?.termsText}
            <TermsTypography>
              <span
                onClick={() => {
                  triggerEvent("/miscs/Terms");
                  handleUrl("/miscs/Terms");
                }}
              >
                {Registration.terms}
              </span>
            </TermsTypography>
            and
            <TermsTypography>
              <span
                onClick={() => {
                  triggerEvent("/miscs/privacy-policy");
                  handleUrl("/miscs/privacy-policy");
                }}
              >
                {" "}
                {Registration.privacy}
              </span>
            </TermsTypography>
          </TermsText>
        )}

        <ButtonStyled
          onClick={() => {
            onSubmit();
            triggerSingUpWithNumber("valid");
          }}
          disabled={isDisabled}
          $isCartJourney={isCartJourney}
        >
          {Registration?.buttontext}
        </ButtonStyled>
      </Box>
    </Fragment>
  );
}
