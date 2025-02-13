import React, { Fragment, useState } from "react";
import InitialScreenComponentInterface from "../../../schemas/SignIn/InitialScreen";
import { useMobileCheck } from "../../../utility/isMobile";
import {
  BoxStyled,
  ButtonStyled,
  PrimaryBox,
  SmallTitle,
  TextFieldStyled,
  Title,
} from "./ForgotPasswordInitialScreenStyled";

const ForgotPasswordInitialScreen = (
  props: InitialScreenComponentInterface
) => {
  const { data, getIsEmailVerified, getIsMobile } = props;
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState(false);
  const [helpertext, setHelperText] = useState("");
  const isMobile = useMobileCheck();
  const ProceedClick = () => {
    const EmailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const PhoneFormat =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (emailOrPhone.match(EmailFormat)) {
      localStorage.setItem("Email", emailOrPhone);
      setError(false);
      getIsEmailVerified(true);
    } else if (emailOrPhone.match(PhoneFormat)) {
      localStorage.setItem("mobileNumber", emailOrPhone);

      setError(false);
      getIsMobile(true);
    } else {
      setError(true);
      setHelperText("Please enter a valid email or phone number");
    }
  };

  return (
    <Fragment>
      <PrimaryBox>
        <Title sx={{ fontSize: { lg: 20, md: 16, sm: 14, xs: 12 } }}>
          {data?.title}
        </Title>
        <SmallTitle sx={{ fontSize: { lg: 16, md: 14, sm: 12, xs: 12 } }}>
          {data?.subTitle}
        </SmallTitle>
        <BoxStyled width={isMobile ? "88%" : "75%"}>
          <TextFieldStyled
            id="outlined-basic"
            label="Email/Phone"
            variant="outlined"
            fullWidth
            error={error}
            helperText={error && helpertext}
            value={emailOrPhone}
            onChange={(event: any) => setEmailOrPhone(event.target.value)}
            InputLabelProps={{
              style: { color: "#AD184C" },
            }}
            InputProps={{
              style: {
                padding: 0,
                margin: 0,
                borderRadius: 0,
              },
              endAdornment: (
                <ButtonStyled onClick={ProceedClick}>
                  {data?.buttontext}
                </ButtonStyled>
              ),
            }}
          />
        </BoxStyled>
      </PrimaryBox>
    </Fragment>
  );
};

export default ForgotPasswordInitialScreen;
