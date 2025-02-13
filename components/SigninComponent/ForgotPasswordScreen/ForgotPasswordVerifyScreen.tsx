import React, { useState } from "react";
import {
  Title,
  SmallTitle,
  ButtonStyled,
  TextFieldStyled,
  BoxStyled,
  ForgotPasswordText,
  ResetPasswordTypography,
} from "./ForgotPasswordVerifyScreenStyled";
import IconButton from "@mui/material/IconButton";
import PasswordScreenComponentInterface from "../../../schemas/SignIn/PasswordScreen";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMobileCheck } from "../../../utility/isMobile";

const ForgotPasswordVerifyScreen = (
  PasswordScreenData: PasswordScreenComponentInterface
) => {
  const { data, getIsResetPassword } = PasswordScreenData;
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isMobile = useMobileCheck();
  const handleLogin = () => {
    console.log("onClick");
  };
  
  const handleForgotPassword = () => {
    console.log("forgot password clicked");
  };

  return (
    <React.Fragment>
      {!isMobile && (
        <Box
          sx={{
            position: "absolute",
            left: "5%",
            top: "5%",
            width: "100%",
          }}
        >
          <ResetPasswordTypography>
            Reset password link has been sent to your registered email ID.
          </ResetPasswordTypography>
        </Box>
      )}

      <Box
        width="100%"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Title sx={{ fontSize: { lg: 20, md: 16, sm: 14, xs: 12 } }}>
          {" "}
          {data?.title}{" "}
        </Title>
        <SmallTitle sx={{ fontSize: { lg: 16, md: 14, sm: 12, xs: 12 } }}>
          {data?.subTitle}
        </SmallTitle>
        <BoxStyled width={isMobile ? "88%" : "75%"} sx={{ pt: 2 }}>
          <TextFieldStyled
            id="outlined-basic"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            error={error}
            helperText={error && helperText}
            onChange={(event: any) => setPassword(event.target.value)}
            placeholder="Enter password"
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
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    style={{ padding: "20px" }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </BoxStyled>
        <ButtonStyled onClick={handleLogin}>{data?.buttontext}</ButtonStyled>

        <ForgotPasswordText
          sx={{ cursor: "pointer" }}
          onClick={handleForgotPassword}
        >
          {data?.ForgotPasswordtext}
        </ForgotPasswordText>
      </Box>
      {isMobile && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "220px",
          }}
        >
          <ResetPasswordTypography>
            Reset password link has been sent to your registered email ID.
          </ResetPasswordTypography>
        </Box>
      )}
    </React.Fragment>
  );
};

export default ForgotPasswordVerifyScreen;
