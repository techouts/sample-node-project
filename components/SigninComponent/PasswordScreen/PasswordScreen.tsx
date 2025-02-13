import React, { Fragment, useState } from "react";
import {
  Title,
  SmallTitle,
  ButtonStyled,
  TextFieldStyled,
  BoxStyled,
  ForgotPasswordText,
} from "./PasswordScreenStyled";
import IconButton from "@mui/material/IconButton";
import PasswordScreenComponentInterface from "../../../schemas/SignIn/PasswordScreen";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import graphql from "../../../middleware-graphql";
import { getProfile, loginWithEmail } from "../../../graphQLQueries/LoginQuery";
import { useMobileCheck } from "../../../utility/isMobile";
import { toast } from "../../../utility/Toast";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoilstore";
import {
  TIER1_LOGO,
  TIER2_LOGO,
  TIER3_LOGO,
  TIER4_LOGO,
  USER_TIER1_SHORT_TEXT,
  USER_TIER2_SHORT_TEXT,
  USER_TIER3_SHORT_TEXT,
  USER_TIER4_SHORT_TEXT,
} from "../../Profile/constant";
import handleErrorResponse from "../../../utility/ErrorHandling";


const PasswordScreen = (
  PasswordScreenData: PasswordScreenComponentInterface
) => {
  const {
    data,
    getIsForgotPassword,
    userInfo,
    handleClose,
    getIsFullDetails,
    setCustomerID,
    getAccessToken,
  } = PasswordScreenData;
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const isMobile = useMobileCheck();

  const handleLogin = async () => {
    // OAuth Api Call
    graphql
      .mutate({
        mutation: loginWithEmail,
        variables: {
          email: userInfo,
          password: password,
        },
      })
      .then((response) => {
       
        const {
          accessToken,
          errorCode,
          existingUser,
          mobileNumber,
          otpSent,
          isValidSession,
          gravityUser,
          expiresIn,
          scope,
          tokenType,
        }: any = response?.data?.loginWithEmail;

        if (existingUser === false) {
          getIsFullDetails(true);
        } else {
          if (accessToken != "unidentified") {
            graphql
              .query({
                query: getProfile,
                variables: {
                  accessToken: accessToken,
                },
              })
              .then((response) => {
               
                const {
                  firstName,
                  gender,
                  isPasswordAvailable,
                  lastName,
                  mobile,
                  name,
                  title,
                  titleCode,
                  displayUid,
                  uid,
                  walletNumber,
                  loyaltyDetails,
                } = response?.data?.getProfile;
                setCustomerID(name);
                getAccessToken(accessToken);
                global?.window?.localStorage.setItem("customer_Name", name);
                global?.window?.localStorage.setItem(
                  "accessToken",
                  accessToken
                );
                userDataItems &&
                  setUserDataItems({
                    ...userDataItems,
                    customerName: name,
                    primaryCardNumber: loyaltyDetails?.primaryCardNumber,
                    tier: loyaltyDetails?.tier,
                    walletNumber: walletNumber,
                    userEmail: uid,
                    tierLogo:
                      loyaltyDetails?.tier !== "na"
                        ? loyaltyDetails?.tier === "Tier1"
                          ? TIER1_LOGO
                          : loyaltyDetails?.tier === "Tier2"
                          ? TIER2_LOGO
                          : loyaltyDetails?.tier === "Tier3"
                          ? TIER3_LOGO
                          : TIER4_LOGO
                        : "",
                    tierText:
                      loyaltyDetails?.tier !== "na"
                        ? loyaltyDetails?.tier === "Tier1"
                          ? USER_TIER1_SHORT_TEXT
                          : loyaltyDetails?.tier === "Tier2"
                          ? USER_TIER2_SHORT_TEXT
                          : loyaltyDetails?.tier === "Tier3"
                          ? USER_TIER3_SHORT_TEXT
                          : USER_TIER4_SHORT_TEXT
                        : "",
                  });
                handleClose(true);
              })
              .catch((err) => console.log(err));
          }
        }
      })
      .catch((error) => {
        toast.error("Someting went wrong, Please try again!!!");
        console.log(error)});
  };
  const handleForgotPassword = () => {
    console.log("forgot password clicked");
    getIsForgotPassword(true);
  };

  return (
    <Fragment>
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
        <BoxStyled width={isMobile ? "88%" : "75%"}>
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
        <ForgotPasswordText>
          <Box sx={{ cursor: "pointer" }} onClick={handleForgotPassword}>
            {data?.ForgotPasswordtext}
          </Box>
        </ForgotPasswordText>
      </Box>
    </Fragment>
  );
};

export default PasswordScreen;
