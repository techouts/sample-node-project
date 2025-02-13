import  Box from "@mui/material/Box";
import React, { createContext, Fragment, useEffect, useState } from "react";
import triggerGAEvent from "../../utility/GaEvents";
import { useMobileCheck } from "../../utility/isMobile";
import useStorage from "../../utility/useStoarge";
import ForgotPasswordInitialScreen from "./ForgotPasswordScreen/ForgotPasswordInitialScreen";
import ForgotPasswordVerifyScreen from "./ForgotPasswordScreen/ForgotPasswordVerifyScreen";
import InitialScreen from "./InitialScreen/InitialScreen";
import MobileOtpScreen from "./MobileOtpScreen/MobileOtpScreen";
import PasswordScreen from "./PasswordScreen/PasswordScreen";
import RegisterComponent from "./Registrationcompo/RegisterForMobile";
import RegistrationComponent from "./Registrationcompo/RegistrationComponent";
import ResetPasswordScreen from "./ResetPasswordScreen/ResetPasswordScreen";
import BottomImageLayout from "./utils/BottomImageLayout";
import { DialogBackButton } from "./utils/DialogBackButton";
import { DialogCloseButton } from "./utils/DialogCloseButton";
import SnackbarToast from "./utils/SnackbarToast";
import SocialAuthDescription from "./utils/SocialAuthDescription";
import { ButtonStyled, SnackBox } from "./SignInStyled";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";

const InitialScreenData = require("../../JSON/SignIn/InitialScreen.json");
const PasswordScreenData = require("../../JSON/SignIn/PasswordScreen.json");
const BottomImageLayoutData = require("../../JSON/SignIn/BottomImageLayout");
const SocialAuthDescriptionData = require("../../JSON/SignIn/SocialAuthDescription");
const ResetPasswordScreenData = require("../../JSON/SignIn/ResetPasswordScreen");
const MobileOtpScreenData = require("../../JSON/SignIn/MobileOtpScreen");
const RegistrationComponentData = require("../../JSON/SignIn/RegisterForMobile.json");
export const MobileContext = createContext("");

export default function SignInComponent(props: any) {
  const {
    handleClosed,
    setCustomerID,
    setLoader,
    setReRender,
    signUpScreen,
    initialScreen,
    isCartJourney = false,
    setIsCartJourney,
    cartJourney = false,
  } = props;
  const [open, setOpen] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [IsForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [IsEmailVerifiedScreen, setIsEmailVerifiedScreen] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isFullDetails, setIsFullDetails] = useState(false);
  const [isBottomImage, setIsBottomImage] = useState(true);
  const [userInfo, setUserInfo] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [networkError, setNetworkError] = useState(false);
  const [networkErrorMessage, setNetworkErrorMessage] =
    useState("Network Error");
  const [isSignUpJourney, setIsSignUpJourney] = useState(true);
  const [socialAuth, setIsSocialAuth] = useState(false);
  const [socialProfile, setSocialProfile] = useState();
  const [socialAccessToken, setSocialAccessToken] = useState("");
  const [socialGraphDomain, setSocialGraphDomain] = useState("");
  const { getItem, setItem } = useStorage();
  const isMobile = useMobileCheck();
  const [isRegisterSignUp, setIsRegisterSignUp] = useState(false);
  const [gravityUser, setGravityUser] = useState(false);
  const [otpErrorSnackBarOpen, setOtpErrorSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (isMobile) {
      setIsRegisterSignUp(true);
    }
  }, [isMobile]);
  const clearLocalStorage = () => {
    localStorage?.removeItem("fName");
    localStorage?.removeItem("lName");
    localStorage?.removeItem("email");
  };
  useEffect(() => {
    setIsInitial(initialScreen);
    setIsSignUp(signUpScreen);
  }, [initialScreen, signUpScreen]);

  const handleClose = () => {
    //clear localStorage
    handleClosed(false);
    setOpen(false);
    setIsResetPassword(false);
    setIsEmailVerifiedScreen(false);
    setIsForgotPassword(false);
    setIsInitial(true);
    setIsEmail(false);
    setIsPhone(false);
    setIsRegister(false);
    setIsSignUp(false);
    setIsFullDetails(false);
    setIsBottomImage(true);
  };
  const handleBackButton = (screen: any) => {
    backButton();

    if (screen === "mobileOTPRegister") {
      setIsEmail(false);
      setIsPhone(false);
      setIsInitial(false);
      setIsRegister(false);
      setIsSignUp(true);
      setIsFullDetails(false);
      setSignUpName(String(localStorage.getItem("SignUpName")));
      setSignUpPhone(String(localStorage.getItem("SignUpPhone")));
    } else {
      if (screen === "isOTPSignIn") {
        setEnteredValue(String(localStorage.getItem("mobileNumber")));
        triggerGAEvent(
          {
            link_text: "edit",
            link_url: "na",
            widget_description:
              "OTP sent to " +
              String(localStorage.getItem("mobileNumber")).slice(0, 2) +
              "XXXXXX" +
              String(localStorage.getItem("mobileNumber")).slice(8),
          },
          "hyperlink",
          "SSO",
          "SSO"
        );
      } else if (enteredValue === "isEmailSignIn") {
        setEnteredValue(String(localStorage.getItem("Email")));
      } else {
        setEnteredValue("");
      }
      setIsEmail(false);
      setIsPhone(false);
      setIsInitial(true);
      setIsRegister(false);
      setIsSignUp(false);
      setIsFullDetails(false);
      setIsBottomImage(true);
    }
  };
  const handleFP1BackButton = () => {
    setIsForgotPassword(false);
    setIsPhone(false);
    setIsInitial(false);
    setIsEmail(true);
  };
  const handleFP2BackButton = () => {
    setIsEmailVerifiedScreen(false);
    setIsForgotPassword(false);
    setIsPhone(false);
    setIsInitial(false);
    setIsEmail(true);
  };
  const getIsEmail = (booleanValue: boolean) => {
    setIsEmail(booleanValue);
    setIsInitial(false);
  };
  const getIsEmailVerified = (booleanValue: boolean) => {
    setIsEmailVerifiedScreen(booleanValue);
    setIsInitial(false);
    setIsEmail(false);
    setIsPhone(false);
    setIsForgotPassword(false);
  };
  const getIsMobile = (booleanValue: boolean) => {
    setIsPhone(booleanValue);
    setIsInitial(false);
    setIsResetPassword(false);
    setIsEmailVerifiedScreen(false);
    setIsForgotPassword(false);
    setIsEmail(false);
    setIsSignUp(false);
    setIsEmailVerifiedScreen(false);
    setIsForgotPassword(false);
  };
  const getIsForgotPassword = (booleanValue: boolean) => {
    setIsForgotPassword(booleanValue);
    setIsInitial(false);
    setIsEmail(false);
    setIsPhone(false);
  };
  const getIsResetPassword = (booleanValue: boolean) => {
    setIsResetPassword(booleanValue);
    setIsEmailVerifiedScreen(false);
    setIsForgotPassword(false);
    setIsInitial(false);
    setIsEmail(false);
    setIsPhone(false);
  };

  const getIsSignUp = (booleanValue: boolean) => {
    if (cartJourney == true) {
      setIsCartJourney(false);
    }
    setIsSignUp(booleanValue);
    setIsResetPassword(false);
    setIsEmailVerifiedScreen(false);
    setIsForgotPassword(false);
    setIsInitial(false);
    setIsEmail(false);
    setIsPhone(false);
  };

  const getIsSignIn = (booleanValue: boolean) => {
    if (cartJourney == true) {
      setIsCartJourney(true);
    }
    setIsInitial(booleanValue);
    setIsResetPassword(false);
    setIsEmailVerifiedScreen(false);
    setIsForgotPassword(false);
    setIsEmail(false);
    setIsPhone(false);
    setIsSignUp(false);
    setIsRegister(false);
  };

  const getIsRegister = (booleanValue: boolean) => {
    setIsRegister(booleanValue);
    setIsResetPassword(false);
    setIsEmailVerifiedScreen(false);
    setIsForgotPassword(false);
    setIsInitial(false);
    setIsEmail(false);
    setIsPhone(false);
    setIsSignUp(false);
  };

  const getIsFullDetails = (
    booleanValue: boolean,
    isScreen: string,
    gravityUserFlag: boolean
  ) => {
    setIsSignUpJourney(isScreen === "isOTPSignIn" ? false : true);
    if (isScreen === "isOTPSignIn" && !gravityUserFlag) {
      clearLocalStorage();
    }
    setIsFullDetails(booleanValue);
    setIsResetPassword(false);
    setIsEmailVerifiedScreen(false);
    setIsForgotPassword(false);
    setIsInitial(false);
    setIsEmail(false);
    setIsPhone(false);
    setIsRegister(false);
    setIsSignUp(false);
    setIsBottomImage(false);
  };
  const getUserInfo = (userInfo: string) => {
    setUserInfo(userInfo);
  };
  const getAccessToken = (token: any) => {
    setAccessToken(token);
  };
  const backButton = () => {
    triggerGAEvent(
      {
        widget_description: "Go back to Sign in",
        link_text: "Go back to Sign in",
        link_url: "na",
      },
      "hyperlink"
    );
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset" as any);
  }, []);

  return (
    <Fragment>
      <MobileContext.Provider value={userInfo}>
        {isInitial && (
          <>
            <Box width="100%" position="relative">
              <SnackbarToast
                open={networkError}
                onClose={() => setNetworkError(false)}
                Message={networkErrorMessage}
              />
              <SnackBox>
                <CustomSnackBar
                  position="absolute"
                  topWeb={isMobile ? "-50px" : "25px"}
                  snackBarOpen={otpErrorSnackBarOpen}
                  setSnackBarOpen={setOtpErrorSnackBarOpen}
                  snackMessage={snackBarMessage}
                ></CustomSnackBar>
              </SnackBox>
              <DialogCloseButton onClose={handleClosed} />
              <InitialScreen
                {...InitialScreenData}
                getIsEmail={getIsEmail}
                getIsMobile={getIsMobile}
                enteredValue={enteredValue}
                getUserInfo={getUserInfo}
                setNetworkError={setNetworkError}
                setNetworkErrorMessage={setNetworkErrorMessage}
                setLoader={setLoader}
                socialAuth={socialAuth}
                socialProfile={socialProfile}
                socialGraphDomain={socialGraphDomain}
                setSnackBarMessage={setSnackBarMessage}
                setOtpErrorSnackBarOpen={setOtpErrorSnackBarOpen}
              />
              {socialAuth ? null : (
                <Box>
                  <SocialAuthDescription
                    {...SocialAuthDescriptionData}
                    getIsSignUp={getIsSignUp}
                    isInitial={true}
                    setIsSocialAuth={setIsSocialAuth}
                    setSocialProfile={setSocialProfile}
                    setCustomerID={setCustomerID}
                    handleClose={handleClose}
                    setNetworkError={setNetworkError}
                    setNetworkErrorMessage={setNetworkErrorMessage}
                    setSocialGraphDomain={setSocialGraphDomain}
                    setLoader={setLoader}
                    setSocialAccessToken={setSocialAccessToken}
                    setReRender={setReRender}
                    isCartJourney={isCartJourney}
                    setIsCartJourney={setIsCartJourney}
                    cartJourney={cartJourney}
                  />
                </Box>
              )}

              {isCartJourney && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <ButtonStyled
                    onClick={() => [getIsSignUp(true), setIsCartJourney(true)]}
                  >
                    Check Out As Guest
                  </ButtonStyled>
                </Box>
              )}
            </Box>
            <Box>
              <BottomImageLayout
                {...BottomImageLayoutData}
                isBottomImage={isBottomImage}
                isInitial={true}
              />
            </Box>
          </>
        )}
        {isEmail && (
          <>
            <Box width="100%" position="relative">
              <SnackbarToast
                open={networkError}
                onClose={() => setNetworkError(false)}
                Message={networkErrorMessage}
              />
              <DialogBackButton
                onClick={handleBackButton}
                isScreen={"isEmailSignIn"}
              />
              <PasswordScreen
                {...PasswordScreenData}
                userInfo={userInfo}
                getIsForgotPassword={getIsForgotPassword}
                handleClose={handleClose}
                getIsFullDetails={getIsFullDetails}
                getAccessToken={getAccessToken}
                setCustomerID={setCustomerID}
                setLoader={setLoader}
              />
              <SocialAuthDescription
                {...SocialAuthDescriptionData}
                getIsSignUp={getIsSignUp}
                isEmail={true}
                setIsSocialAuth={setIsSocialAuth}
                setSocialProfile={setSocialProfile}
                handleClose={handleClose}
                setNetworkError={setNetworkError}
                setNetworkErrorMessage={setNetworkErrorMessage}
                setSocialGraphDomain={setSocialGraphDomain}
                setLoader={setLoader}
                setSocialAccessToken={setSocialAccessToken}
                setReRender={setReRender}
                isCartJourney={isCartJourney}
                setIsCartJourney={setIsCartJourney}
                cartJourney={cartJourney}
              />
            </Box>
            <Box>
              <BottomImageLayout
                {...BottomImageLayoutData}
                isBottomImage={isBottomImage}
                isEmail={true}
              />
            </Box>
          </>
        )}
        {isPhone && (
          <>
            <Box width="100%" position="relative">
              <SnackbarToast
                open={networkError}
                onClose={() => setNetworkError(false)}
                Message={networkErrorMessage}
              />{" "}
              <SnackBox>
                <CustomSnackBar
                  position="absolute"
                  topWeb={isMobile ? "-50px" : "25px"}
                  snackBarOpen={otpErrorSnackBarOpen}
                  setSnackBarOpen={setOtpErrorSnackBarOpen}
                  snackMessage={snackBarMessage}
                ></CustomSnackBar>
              </SnackBox>
              <DialogBackButton onClick={handleBackButton} />
              <MobileOtpScreen
                {...MobileOtpScreenData}
                handleBackButton={handleBackButton}
                userInfo={userInfo}
                getAccessToken={getAccessToken}
                isScreen={"isOTPSignIn"}
                setCustomerID={setCustomerID}
                getIsFullDetails={getIsFullDetails}
                setReRender={setReRender}
                handleClose={handleClose}
                setNetworkError={setNetworkError}
                setNetworkErrorMessage={setNetworkErrorMessage}
                setLoader={setLoader}
                socialAuth={socialAuth}
                socialProfile={socialProfile}
                socialGraphDomain={socialGraphDomain}
                setSocialAccessToken={setSocialAccessToken}
                socialAccessToken={socialAccessToken}
                isCartJourney={isCartJourney}
                setIsCartJourney={setIsCartJourney}
                cartJourney={cartJourney}
                setGravityUser={setGravityUser}
                isSignUpJourney={isSignUpJourney}
                setSnackBarMessage={setSnackBarMessage}
                setOtpErrorSnackBarOpen={setOtpErrorSnackBarOpen}
              />
            </Box>
            <Box>
              <BottomImageLayout
                {...BottomImageLayoutData}
                isBottomImage={isBottomImage}
                isMobileOtpScreen={true}
              />
            </Box>
          </>
        )}
        {IsForgotPassword && (
          <>
            <Box width="100%" position="relative">
              <SnackbarToast
                open={networkError}
                onClose={() => setNetworkError(false)}
                Message={networkErrorMessage}
              />{" "}
              <DialogBackButton onClick={handleFP1BackButton} />
              <ForgotPasswordInitialScreen
                {...InitialScreenData}
                getIsEmailVerified={getIsEmailVerified}
                getIsMobile={getIsMobile}
              />
              <SocialAuthDescription
                {...SocialAuthDescriptionData}
                getIsSignUp={getIsSignUp}
                isForgotPasswordInitial={true}
                setIsSocialAuth={setIsSocialAuth}
                setSocialProfile={setSocialProfile}
                setCustomerID={setCustomerID}
                handleClose={handleClose}
                setNetworkError={setNetworkError}
                setNetworkErrorMessage={setNetworkErrorMessage}
                setSocialGraphDomain={setSocialGraphDomain}
                setLoader={setLoader}
                setSocialAccessToken={setSocialAccessToken}
                setReRender={setReRender}
                isCartJourney={isCartJourney}
                setIsCartJourney={setIsCartJourney}
                cartJourney={cartJourney}
              />
            </Box>
            <Box>
              <BottomImageLayout
                {...BottomImageLayoutData}
                isBottomImage={isBottomImage}
                isForgotPasswordInitial={true}
              />
            </Box>
          </>
        )}

        {IsEmailVerifiedScreen && (
          <>
            <Box width="100%" position="relative">
              <SnackbarToast
                open={networkError}
                onClose={() => setNetworkError(false)}
                Message={networkErrorMessage}
              />{" "}
              <DialogBackButton onClick={handleFP2BackButton} />
              <ForgotPasswordVerifyScreen
                {...PasswordScreenData}
                getIsResetPassword={getIsResetPassword}
              />
              <SocialAuthDescription
                {...SocialAuthDescriptionData}
                getIsSignUp={getIsSignUp}
                isForgotPasswordVerifyScreen={true}
                setIsSocialAuth={setIsSocialAuth}
                setSocialProfile={setSocialProfile}
                setCustomerID={setCustomerID}
                handleClose={handleClose}
                setNetworkError={setNetworkError}
                setNetworkErrorMessage={setNetworkErrorMessage}
                setSocialGraphDomain={setSocialGraphDomain}
                setLoader={setLoader}
                setSocialAccessToken={setSocialAccessToken}
                setReRender={setReRender}
                isCartJourney={isCartJourney}
                setIsCartJourney={setIsCartJourney}
                cartJourney={cartJourney}
              />
            </Box>
            <Box>
              <BottomImageLayout
                {...BottomImageLayoutData}
                isBottomImage={isBottomImage}
                isForgotPasswordVerifyScreen={true}
              />
            </Box>
          </>
        )}
        {isResetPassword && (
          <>
            <Box width="100%" position="relative">
              <SnackbarToast
                open={networkError}
                onClose={() => setNetworkError(false)}
                Message={networkErrorMessage}
              />{" "}
              <DialogCloseButton onClose={handleClose} />
              <ResetPasswordScreen {...ResetPasswordScreenData} />
            </Box>
            <Box>
              <BottomImageLayout
                {...BottomImageLayoutData}
                isBottomImage={isBottomImage}
                isForgotPasswordVerifyScreen={true}
              />
            </Box>
          </>
        )}
        {isSignUp && (
          <>
            <Box width="100%" position="relative">
              <SnackbarToast
                open={networkError}
                onClose={() => setNetworkError(false)}
                Message={networkErrorMessage}
              />{" "}
              <DialogCloseButton onClose={handleClose} />
              <RegisterComponent
                {...RegistrationComponentData}
                enteredValue={enteredValue}
                getIsRegister={getIsRegister}
                setCustomerID={setCustomerID}
                getUserInfo={getUserInfo}
                setLoader={setLoader}
                setNetworkError={setNetworkError}
                setNetworkErrorMessage={setNetworkErrorMessage}
                signUpName={signUpName}
                signUpPhone={signUpPhone}
                isCartJourney={isCartJourney}
              />
              {!isCartJourney && (
                <SocialAuthDescription
                  {...SocialAuthDescriptionData}
                  getIsSignIn={getIsSignIn}
                  isScreen={"initialRegisterScreen"}
                  isSignUp={true}
                  setIsSocialAuth={setIsSocialAuth}
                  setSocialProfile={setSocialProfile}
                  setCustomerID={setCustomerID}
                  handleClose={handleClose}
                  setNetworkError={setNetworkError}
                  setNetworkErrorMessage={setNetworkErrorMessage}
                  setSocialGraphDomain={setSocialGraphDomain}
                  setLoader={setLoader}
                  setSocialAccessToken={setSocialAccessToken}
                  setReRender={setReRender}
                  isCartJourney={isCartJourney}
                  setIsCartJourney={setIsCartJourney}
                  cartJourney={cartJourney}
                />
              )}
            </Box>
            <Box>
              <BottomImageLayout
                {...BottomImageLayoutData}
                isBottomImage={isBottomImage}
                isSignUp={true}
              />
            </Box>
          </>
        )}
        {isRegister && (
          <>
            <Box width="100%" position="relative">
              <SnackbarToast
                open={networkError}
                onClose={() => setNetworkError(false)}
                Message={networkErrorMessage}
              />{" "}
              <SnackBox>
                <CustomSnackBar
                  position="absolute"
                  topWeb={isMobile ? "-50px" : "25px"}
                  snackBarOpen={otpErrorSnackBarOpen}
                  setSnackBarOpen={setOtpErrorSnackBarOpen}
                  snackMessage={snackBarMessage}
                ></CustomSnackBar>
              </SnackBox>
              <DialogBackButton
                onClick={handleBackButton}
                isScreen={"mobileOTPRegister"}
              />
              <MobileOtpScreen
                {...MobileOtpScreenData}
                getIsFullDetails={getIsFullDetails}
                handleBackButton={handleBackButton}
                isScreen={"mobileOTPRegister"}
                handleClose={handleClose}
                setCustomerID={setCustomerID}
                setLoader={setLoader}
                setNetworkError={setNetworkError}
                setNetworkErrorMessage={setNetworkErrorMessage}
                socialAuth={socialAuth}
                socialProfile={socialProfile}
                setReRender={setReRender}
                setSignUpName={setSignUpName}
                setSignUpPhone={setSignUpPhone}
                isCartJourney={isCartJourney}
                setGravityUser={setGravityUser}
                isSignUpJourney={isSignUpJourney}
                setSnackBarMessage={setSnackBarMessage}
                setOtpErrorSnackBarOpen={setOtpErrorSnackBarOpen}
              />
              <SocialAuthDescription
                {...SocialAuthDescriptionData}
                getIsSignIn={getIsSignIn}
                isScreen={"mobileOTPRegister"}
                isRegister={true}
                setIsSocialAuth={setIsSocialAuth}
                setSocialProfile={setSocialProfile}
                setCustomerID={setCustomerID}
                handleClose={handleClose}
                setNetworkError={setNetworkError}
                setNetworkErrorMessage={setNetworkErrorMessage}
                setSocialGraphDomain={setSocialGraphDomain}
                setLoader={setLoader}
                setSocialAccessToken={setSocialAccessToken}
                setReRender={setReRender}
                isMobileSignUp={isMobile}
                isRegisterSignUp={isRegisterSignUp}
                isCartJourney={isCartJourney}
                setIsCartJourney={setIsCartJourney}
                cartJourney={cartJourney}
              />
            </Box>
            <Box>
              <BottomImageLayout
                {...BottomImageLayoutData}
                isBottomImage={isBottomImage}
                isRegister={true}
              />
            </Box>
          </>
        )}
        {isFullDetails && (
          <>
            <Box width="100%" position="relative">
              <SnackbarToast
                open={networkError}
                onClose={() => setNetworkError(false)}
                Message={networkErrorMessage}
              />
              <SnackBox>
                <CustomSnackBar
                  position="absolute"
                  topWeb={isMobile ? "-50px" : "25px"}
                  snackBarOpen={otpErrorSnackBarOpen}
                  setSnackBarOpen={setOtpErrorSnackBarOpen}
                  snackMessage={snackBarMessage}
                ></CustomSnackBar>
              </SnackBox>
              <DialogCloseButton onClose={handleClose} />
              <RegistrationComponent
                setCustomerID={setCustomerID}
                {...RegistrationComponentData}
                handleClose={handleClose}
                isSignUpJourney={isSignUpJourney}
                setLoader={setLoader}
                setReRender={setReRender}
                setNetworkError={setNetworkError}
                setNetworkErrorMessage={setNetworkErrorMessage}
                gravityUser={gravityUser}
                setSnackBarMessage={setSnackBarMessage}
                setOtpErrorSnackBarOpen={setOtpErrorSnackBarOpen}
              />

              <BottomImageLayout
                {...BottomImageLayoutData}
                isFullDetails={true}
                isBottomImage={false}
              />
            </Box>
          </>
        )}
      </MobileContext.Provider>
    </Fragment>
  );
}
