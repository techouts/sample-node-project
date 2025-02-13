import React, { useState } from "react";
import TextFieldHOC from "../../../HOC/TextField/TextField";
import {
  ClickProceedText,
  PriceText,
  ProceedButton,
  TermsBox,
  TermsConditionText,
} from "./MACServiceRegisterStyles";
import { useMobileCheck } from "../../../utility/isMobile";

const MACServiceRegisterForm = (props: any) => {
  const {
    registerProceedText,
    termsConditionTypo,
    serviceBookingHandler,
    registerButtonChecked,
    getUserData,
    userPhoneNumber,
    finalPrice,
    ctaServiceEvent,
  } = props;
  const isMobile = useMobileCheck();
  const errorMessage = {
    name: "Name should be contain first name and last name with space",
    mobile:
      "Phone number can’t be empty. It should be a valid number of 10 digits",
    email: "Email is mandatory",
  };
  const initialValues = {
    name: getUserData?.customerName ?? "",
    mobile: userPhoneNumber ?? "",
    email: getUserData?.userEmail ?? "",
  };
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState({
    name: false,
    mobile: false,
    email: false,
  });
  const formValidation = (isFormValid: any, id: any) => {
    setError({ ...error, [id]: !isFormValid });
  };
  function nameFunc(name: any, value: any, isFormValid: any) {
    if (name === "name") {
      isFormValid =
        value.length >= 2 &&
        value.match(/^[a-zA-Z ]{0,50}$/) &&
        value?.split(" ")?.length == 2;
      formValidation(isFormValid, name);
      if (value.match(/^[a-zA-Z ]{0,50}$/) && value?.split(" ")?.length <= 2) {
        setValues({
          ...values,
          [name]: value,
        });
      }
    }
  }
  function emailFunc(name: any, value: any) {
    if (name === "email") {
      const pattern = /^[a-z0-9@.]*$/;
      if (!pattern.test(value.toLowerCase())) {
        return;
      }
      setValues({
        ...values,
        [name]: value.toLowerCase(),
      });
      if (value.match(/^([a-z0-9]+\.?[a-z0-9]+)+@([\w-]+\.)+[\w-]{1,5}$/)) {
        setError({ ...error, email: false });
        setValues({
          ...values,
          [name]: value,
        });
      } else {
        setError({ ...error, email: true });
      }
    }
  }
  function mobileFunc(name: any, value: any, isFormValid: any) {
    if (name === "mobile") {
      let temp = value.toString().slice(0, 10);
      isFormValid = temp?.length == 10 || temp?.length == 0;
      if (temp?.length <= 10 && temp[0] > 5) {
        formValidation(isFormValid, name);
        setValues({
          ...values,
          [name]: Math.max(0, parseInt(temp)).toString().slice(0, 10),
        });
      } else if (temp?.length == 0) {
        setValues({
          ...values,
          [name]: "",
        });
        formValidation(true, name);
      }
    }
  }
  function handleInputChange(e: any) {
    let isFormValid = false;
    const { name, value } = e.target;
    if (name !== "mobile" && name !== "email" && name !== "name") {
      setValues({
        ...values,
        [name]: value,
      });
    }
    nameFunc(name, value, isFormValid);
    emailFunc(name, value);
    mobileFunc(name, value, isFormValid);
  }
  const textFieldsHandler = () => {
    serviceBookingHandler(
      values?.name,
      values?.email,
      values?.mobile.toString()
    );
    ctaServiceEvent(registerButtonChecked);
  };
  const proceedButtonEnable =
    values?.email?.match(/^([a-z0-9]+\.?[a-z0-9]+)+@([\w-]+\.)+[\w-]{1,5}$/) &&
    values?.mobile?.length == 10 &&
    values?.name?.length != 0 &&
    values?.name?.split(" ")?.length <= 2;
  return (
    <>
      <TextFieldHOC
        border="unset"
        borderRadius="0px"
        id="outlined-basic"
        label="Enter Name"
        variant="outlined"
        value={values.name}
        name="name"
        isColor={true}
        error={error?.name}
        helperText={error?.name && errorMessage.name}
        onChange={handleInputChange}
        InputLabelPropsColor={{
          color: "#231F20",
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "16px",
          paddingTop: "4px",
        }}
      />
      <TextFieldHOC
        border="unset"
        borderRadius="0px"
        id="outlined-basic"
        label="Enter Email ID"
        variant="outlined"
        value={values?.email}
        name="email"
        isColor={true}
        type="text"
        error={error?.email}
        helperText={error?.email && errorMessage?.email}
        onChange={handleInputChange}
        InputLabelPropsColor={{
          color: "#231F20",
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "16px",
          paddingTop: "4px",
        }}
      />
      <TextFieldHOC
        border="unset"
        borderRadius="0px"
        id="outlined-basic"
        label="Enter phone number"
        variant="outlined"
        value={values.mobile}
        error={error?.mobile}
        type="tel"
        inputProps={{ pattern: ["/d*"] }}
        onKeyDown={(event: any) => {
          ["e", "E", "+", "-", "."]?.includes(event.key) &&
            event.preventDefault();
        }}
        helperText={error?.mobile && errorMessage.mobile}
        name="mobile"
        onChange={handleInputChange}
        InputLabelPropsColor={{
          color: "#231F20",
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "16px",
          paddingTop: "4px",
        }}
      />
      {finalPrice > 0 && (
        <PriceText>{`Amount : Rs. ${finalPrice} (Payment to be made at the store directly)`}</PriceText>
      )}
      <TermsBox>
        <ClickProceedText>{registerProceedText}</ClickProceedText>
        <TermsConditionText
          onClick={() =>
            isMobile
              ? window.location.assign("/miscs/terms")
              : window.open("/miscs/terms")
          }
        >
          {termsConditionTypo}
        </TermsConditionText>
      </TermsBox>
      <ProceedButton
        onClick={textFieldsHandler}
        disabled={!proceedButtonEnable}
        sx={{ opacity: proceedButtonEnable ? 1 : 0.5 }}
      >
        {registerButtonChecked}
      </ProceedButton>
    </>
  );
};
export default MACServiceRegisterForm;
