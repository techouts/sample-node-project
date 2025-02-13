import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CryptoJS from "crypto-js";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { useAppContext } from "../../../context/userInfoContext";
import { CustomSnackBar } from "../../../HOC/CustomSnackBar/CustomSnackBar";
import { userState } from "../../../recoilstore";
import MobileOtpScreenComponentInterface from "../../../schemas/SignIn/MobileOtpScreen";
import { chatBotUtility } from "../../../utility/chatBotObjUtility";
import {
  access_token_flow,
  getTierLogo,
  getTierTitle,
} from "../../../utility/commonUtility";
import triggerGAEvent from "../../../utility/GaEvents";
import { pinCodeBasedCoordinates } from "../../../utility/GeoAPI";
import { useMobileCheck } from "../../../utility/isMobile";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import useStorage from "../../../utility/useStoarge";
import { SigninEdit } from "../../Header/Constants";
import { MobileContext } from "../SignInComponent";
import {
  cartCreateUserAPI,
  getProfileAPI,
  getProfileData,
  loginWithOtpAPI,
  loginWithOtpAPIV2,
  loginWithSocialMediaAPI,
  signUpWithOtpAPI,
  verifyOtpAPI,
} from "../utils/SSOAPI";
import {
  BoxStyled,
  PhoneNumber,
  ResendTimer,
  SignUpTypography,
  SmallTitle,
  SnankInfoBox,
  Title,
  TypographyOtp,
  VerifyButton,
  TypographyOtpType,
} from "./MobileOtpStyled";
import { OtpComponentLogic } from "./OtpComponentLogic";

export default function MobileOtpScreen(
  MobileOtpScreenData: MobileOtpScreenComponentInterface
) {
  const {
    info,
    handleBackButton,
    isScreen,
    getIsFullDetails,
    userInfo,
    setCustomerID,
    handleClose,
    setNetworkError,
    setNetworkErrorMessage,
    setLoader,
    socialAuth,
    socialProfile,
    setReRender,
    socialGraphDomain,
    socialAccessToken,
    isCartJourney,
    setGravityUser,
    isSignUpJourney,
    setSnackBarMessage,
    setOtpErrorSnackBarOpen,
  }: any = MobileOtpScreenData;
  const cookie = new Cookies();
  const router = useRouter();
  const userInfoContext = useAppContext();
  const { updateContextData } = userInfoContext;
  const [otp, setOtp] = useState("");
  const [resetOtpFields, setResetOtpFields] = useState(false);
  let number: any = localStorage.getItem("mobileNumber");
  let phnumber = number
    ? number.replace(number?.substring(2, 8), "XXXXXX")
    : "";
  const [counter, setCounter] = useState(30);
  const [otpError, setOtpError] = useState(false);
  const [resendMes, setResendMes] = useState(false);
  const [isValidOtp, setIsValidOtp] = useState(true);
  const MobileNumber = React.useContext(MobileContext);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [invalidOtp, setIsInvalidOtp] = useState(false);
  const [displayErrorMsg, setDisplayErrorMessage] = useState("The entered OTP is either invalid or expired, kindly enter the OTP again.")
  const isMobile = useMobileCheck();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);
  const [userType, setUserType] = useState("");
  const [dob, setDob] = useState<Date | null>(null);


  const [resendOtp, setResendOtp] = useState(false);

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  const { setItem } = useStorage();

  const otptimer = () => {
    if (counter != 0) {
      return (
        <ResendTimer sx={{ m: 2 }}>
          {info.resendTimer}
          00:{counter < 10 ? `0${counter}` : counter}
        </ResendTimer>
      );
    } else
      return (
        <Box sx={{ display: "flex", m: 2, gap: "5px" }} id="resend">
          <Typography sx={{ color: "#7B7979" }}>{info?.otpSms}</Typography>
          <SignUpTypography onClick={ResendOtp} style={{ cursor: "pointer" }}>
            {info?.resendOtp}
          </SignUpTypography>
        </Box>
      );
  };
  const getFormattedDate = (date: any) => {
    let year = date?.getFullYear();
    let month = ("0" + (date?.getMonth() + 1)).slice(-2);
    let day = date?.getDate();

    return `${year}-${month}-${day}`;
  };
  const socialCreateUser = async () => {
    // Create User API Call
    const fullName = socialGraphDomain && socialProfile?.name;
    const myArray = fullName.split("");
    const email = socialGraphDomain && socialProfile?.email;
    const birthday = dob ? getFormattedDate(dob) : "";
    const socialAccess_Token = socialGraphDomain && socialAccessToken;
    const socialProfileImage =
      socialGraphDomain &&
      (socialGraphDomain == "facebook"
        ? socialProfile?.name
        : socialGraphDomain == "google"
          ? socialProfile?.picture
          : "");
    const socialLdp =
      socialGraphDomain &&
      (socialGraphDomain == "facebook"
        ? "facebook"
        : socialGraphDomain == "google"
          ? "google"
          : "");

    const mobileNumber = userInfo || MobileNumber;
    const loginWithSocialMediaApiResponse = await loginWithSocialMediaAPI(
      fullName,
      email,
      mobileNumber,
      socialAccess_Token,
      socialProfileImage,
      socialLdp
    );
    const { status, response }: any = loginWithSocialMediaApiResponse;
    if (status === "success") {
      const { accessToken, errorCode, errorMessage } =
        response?.data?.registerWithSocialMedia;
      if (errorCode === "None" && access_token_flow(accessToken)) {
        await getProfileApiCall(false);
      } else {
        setNetworkErrorMessage(errorMessage);
        setNetworkError(true);
        setLoader(false);
      }
      setLoader(false);
      triggerFormSocialsignup(
        fullName,
        email,
        mobileNumber,
        socialGraphDomain,
        status,
        birthday,
        myArray,
      );
    }
    if (status === "fail") {
      setNetworkError(true);
      setLoader(false);
    }
  };

  //social signup event
  const triggerFormSocialsignup = (
    firstname: string,
    email: string,
    mobileNumber: number,
    socialGraphDomain: string,
    status: string,
    birthday: any,
    myArray: any
  ) => {
    triggerGAEvent(
      {
        link_text: socialGraphDomain,
        link_url: "na",
        method: socialGraphDomain,
        jounry_type: "signup",
        user_info_hash: CryptoJS.MD5(MobileNumber),
        status: status,
        age: "na",
        user_phone_number: `+91${mobileNumber}`,
        user_mail_id: email,
        gender: "na",
        user_birth_date: birthday,
        user_last_name: myArray[1],
        user_first_name: myArray[0],
        fc_status: "na",
        fc_points: 0,
        fc_card_number: "na",
        fc_card_validity: "na",
        user_type: "Guest",
        wallet_status: "na",
        wallet_amount: 0,
      },
      "sign_up",
      "signupuserdetailpage",
      "SSO"
    );
  };
  const ResendOtp = async () => {

    if (socialAuth) {
      const email =
        socialGraphDomain &&
        (socialGraphDomain == "facebook"
          ? socialProfile?.email
          : socialGraphDomain == "google"
            ? socialProfile?.email
            : "");
      const apiResponse = await signUpWithOtpAPI(
        userInfo || MobileNumber,
        email
      );
      const { status, response }: any = apiResponse;

      if (status === "success") {
        const { otpSent, errorCode, errorMessage } =
          response?.data?.signUpWithOtp;
        if (otpSent === true) {
          setNetworkError(false);
        }
        if (
          errorCode.toLowerCase() === "maxresendattemptsreachedotperror" ||
          errorCode.toLowerCase() === "maxverificationattemptsreachedotperror"
        ) {
          setOtpErrorSnackBarOpen(true);
          setSnackBarMessage(errorMessage);
        }
      }
      if (status === "fail") {
        setNetworkError(true);
        setNetworkError("Network Error");
      }
    } else {
      // GraphQL Api Call

      const apiResponse = await loginWithOtpAPIV2(userInfo || MobileNumber);

      const { status, response }: any = apiResponse;

      if (status === "success") {
        const { otpSent, errorCode, errorMessage } =
          response?.data?.loginWithOtp;

        if (otpSent === true) {
          setResendOtp(!resendOtp);
          setResendMes(true);
          setSnackBarOpen(true);
          setCounter(30);
          setResetOtpFields((value) => !value);
          triggerGAEvent(
            {
              link_text: "edit",
              link_url: "na",
              widget_description: "Resend",
            },
            "hyperlink",
            "signindetailpage",
            "SSO"
          );
          setNetworkError(false);
        }
        if (
          errorCode.toLowerCase() === "maxresendattemptsreachedotperror" ||
          errorCode.toLowerCase() === "maxverificationattemptsreachedotperror"
        ) {
          setOtpErrorSnackBarOpen(true);
          setSnackBarMessage(errorMessage);
        }
      }
      if (status === "fail") {
        setNetworkError(true);
        setNetworkError("Network Error");
      }
    }
  };
  const getProfileApiCall = async (isSignIn: boolean) => {
    let primaryCardNumber: string;
    let tier: string;
    let walletNumber: string;
    // setTimeout(async () => {
    const accessToken = cookie.get("accessToken");
    const getProfileApiResponse = await getProfileAPI(accessToken);
    const { status, response }: any = getProfileApiResponse;

    if (status === "success") {
      // get profile data api call for addresses
      const getProfileDataApiResponse = await getProfileData();
      const { status, responseData }: any = getProfileDataApiResponse;
      await responseData?.data?.customer?.customer_ref
        ? setItem("customerID", responseData?.data?.customer?.customer_ref, "local")
        : setItem("customerID", "na", "local");
      await setItem(
        "customer_ref",
        responseData?.data?.customer?.customer_ref,
        "local"
      );
      primaryCardNumber =
        response?.data?.getProfile?.loyaltyDetails?.primaryCardNumber;
      tier = response?.data?.getProfile?.loyaltyDetails?.tier;
      walletNumber = response?.data?.getProfile?.walletNumber;
      let dob = await responseData?.data?.customer?.dob;
      let firstName = await responseData?.data?.customer?.firstname
        ? responseData?.data?.customer?.firstname
        : response?.data?.getProfile?.firstName;
      let lastName = await responseData?.data?.customer?.lastname
        ? responseData?.data?.customer?.lastname
        : response?.data?.getProfile?.lastName;
      // let userEmail = response?.data?.getProfile?.uid;
      let userEmail = responseData?.data?.customer?.email;
      let cardValidDate = response?.data?.getProfile?.cardValidDate;
      let id = responseData?.data?.customer?.customer_ref;
      let addresses = await responseData?.data?.customer?.addresses;
      let defaultAddress = await addresses?.find(
        (addr: any) => addr?.default_billing == true
      );
      if (isSignIn) {
        await callLoginEvent(
          firstName,
          lastName,
          userEmail,
          primaryCardNumber,
          cardValidDate,
          primaryCardNumber == "na" ? "Not Activated" : "Activated",
          walletNumber == "na" ? "Not Activated" : "Activated",
          firstName === "" || firstName === null || firstName === undefined ? "Guest" : "Registered"
        );
      }
      await setItem("fcValidDate", cardValidDate, "local");
      await setItem("customerEmailID", userEmail, "local");
      let pincode = defaultAddress?.postcode
        ? defaultAddress?.postcode
        : userDataItems?.pincode;
      let state = defaultAddress?.state
        ? defaultAddress?.state
        : userDataItems?.state;
      let city = defaultAddress?.city
        ? defaultAddress?.city
        : userDataItems?.city;
      let geoLat = userDataItems?.geoLat;
      let geoLong = userDataItems?.geoLong;
      if (router?.asPath.includes("cart")) {
        if (defaultAddress?.postcode) {
          if (defaultAddress?.postcode != userDataItems?.pincode) {
            const pincodeResponse = await pinCodeBasedCoordinates(
              defaultAddress?.postcode
            );
            city = pincodeResponse?.city;
            pincode = pincodeResponse?.pincode;
            geoLat = pincodeResponse?.latitude;
            geoLong = pincodeResponse?.longitude;
            state = pincodeResponse?.state;
          }
        }
      }

      if (firstName === "" || firstName === null || firstName === undefined) {
        cookie.set("customer_Name", "Guest", {
          path: "/",
          sameSite: true,
          secure: true
        });
        setUserType("Guest");
        setItem("customer_Name", "Guest", "local");
        setCustomerID("Guest");
        updateContextData &&
          updateContextData({
            contextCustomer_Name: "Guest",
          });
        userDataItems &&
          setUserDataItems({
            ...userDataItems,
            primaryCardNumber: primaryCardNumber,
            tier: tier,
            city: city,
            pincode: pincode,
            geoLat: geoLat,
            geoLong: geoLong,
            state: state,
            dob: dob,
            customerName: "Guest",
            walletNumber: walletNumber,
            userEmail: userEmail,
            cardValidDate: cardValidDate,
            tierLogo: getTierLogo(tier),
            tierText: getTierTitle(tier),
          });

        setReRender(true);

        await window.od.messenger("shutdown");
        await window.od.messenger("pushMessage", chatBotUtility());
        await window.od.messenger("init");
      } else {
        cookie.set("customer_Name", `${firstName} ${lastName}`, {
          path: "/",
          sameSite: true
        });
        setUserType("Registered");
        setItem("customer_Name", `${firstName} ${lastName}`, "local");
        setItem("loyalitylevel", tier, "local");
        setCustomerID(`${firstName} ${lastName}`);
        updateContextData &&
          updateContextData({
            contextCustomer_Name: `${firstName} ${lastName}`,
          });
        userDataItems &&
          setUserDataItems({
            ...userDataItems,
            primaryCardNumber: primaryCardNumber,
            tier: tier,
            state: state,
            city: city,
            dob: dob,
            pincode: pincode,
            geoLat: geoLat,
            geoLong: geoLong,
            customerName: `${firstName} ${lastName}`,
            walletNumber: walletNumber,
            userEmail: userEmail,
            cardValidDate: cardValidDate,
            tierLogo: getTierLogo(tier),
            tierText: getTierTitle(tier),
          });

        setReRender(true);
        await window?.od?.messenger("shutdown");
        await window?.od?.messenger("pushMessage", chatBotUtility());
        await window?.od?.messenger("init");
      }
      localStorage?.getItem("gotoUrl") &&
        localStorage?.getItem("gotoUrl") !== "" &&
        router?.push(`${localStorage?.getItem("gotoUrl")}`);
      handleClose(true);
      setLoader(false);
    }
    if (status === "fail") {
      setLoader(false);
    }
    // }, 0.5);
  };
  const VerifyOtpAPICall = async (socialAuth = false, skipVerify = false) => {
    if (socialAuth && skipVerify) {
      socialCreateUser();
    } else {
      const verifyOtpApiResponse = await verifyOtpAPI(
        userInfo || MobileNumber,
        otp
      );
      const { status, response }: any = verifyOtpApiResponse;
      if (status === "success") {
        const {
          accessToken,
          existingUser,
          errorMessage,
          mobileNumber,
          errorCode,
          gravityUser,
          emailId,
          fullName,
        } = response?.data?.verifyOtp;
        if (existingUser) {
          localStorage?.setItem("customerType", "existing_customer");
          localStorage?.setItem("userType", "returning_user");
        } else {
          localStorage?.setItem("customerType", "new_customer");
          localStorage?.setItem("userType", "new_user");
        }
        if (
          gravityUser === true &&
          emailId &&
          emailId !== "na" &&
          fullName &&
          fullName !== "na"
        ) {
          const Name = fullName?.split(" ");
          const firstName = Name[0];
          Name.shift();
          const lastName = Name.join("");
          setItem("email", emailId, "local");
          setItem("guestEmailId", emailId, "local");
          setItem("fName", firstName, "local");
          setItem("lName", lastName, "local");
          setGravityUser(true);
        } else {
          if (!isSignUpJourney) {
            setItem("fName", "", "local");
            setItem("lName", "", "local");
          }
          setItem("email", "", "local");
        }

        if (errorCode === "None") {
          if (existingUser === false) {
            if (socialAuth) {
              socialCreateUser();
            } else {
              getIsFullDetails(true, isScreen, gravityUser);
            }

            // social createUser
          } else if (access_token_flow(accessToken)) {
            //getProfile API Call
            setLoader(false);
            await getProfileApiCall(true);
          } else {
            setLoader(false);
            setNetworkError(true);
            setNetworkErrorMessage(errorMessage);
          }
        } else {
          setLoader(false);
          setIsInvalidOtp(true);
          setDisplayErrorMessage(errorMessage)
        }
        setLoader(false);
      }
      if (status === "fail") {
        setNetworkError(true);
        setLoader(false);
        setNetworkErrorMessage("Network Error");
      }
      triggerGAEvent(
        {
          jounry_type: "signin",
          method: "mobile:otp",
          link_text: "Verify OTP",
          link_url: "na",
          user_info_hash: CryptoJS.MD5(MobileNumber),
          status: status,
        },
        "hyperlink",
        "verify OTP",
        "SSO"
      );
    }
  };
  const VerifyHandler = () => {
    setLoader(true);
    socialAuth ? VerifyOtpAPICall(true, true) : VerifyOtpAPICall(false, false);
  };

  const DisplayNote = () => {
    if (info.invalidAttemptsCounter >= 3) {
      setOtpError(true);
      setErrorSnackBarOpen(true);
    }
  };

  // login success event
  const callLoginEvent = (
    firstname: string,
    lastname: string,
    mailid: string,
    fc_no: string,
    fc_card_validity: string,
    fcstatus: any,
    walletstatus: any,
    userTypeName: string
  ) => {
    triggerGAEvent(
      {
        user_phone_number: `+91${userInfo || MobileNumber}`,
        user_mail_id: mailid,
        jounery_type: "signin",
        method: socialGraphDomain || " mobile : otp",
        user_info_hash: CryptoJS.MD5(MobileNumber),
        age: "na",
        gender: "na",
        user_birth_date: "na",
        user_last_name: lastname,
        user_first_name: firstname,
        fc_status: fcstatus,
        fc_points: 0,
        fc_card_number: fc_no,
        fc_card_validity: fc_card_validity || "na",
        user_type: userTypeName,
        wallet_status: walletstatus,
        wallet_amount: 0,
      },
      "login"
    );
  };
  return (
    <Fragment>
      {!isMobile && (
        <SnankInfoBox
          sx={{
            position: "absolute",
            left: "0px",
            top: "9%",
            width: "100%",
          }}
        >
          {resendMes ? (
            <CustomSnackBar
              position="absolute"
              snackBarOpen={snackBarOpen}
              setSnackBarOpen={setSnackBarOpen}
              snackMessage={info?.ResendMessage}
            ></CustomSnackBar>
          ) : (
            ""
          )}
          {otpError ? (
            <CustomSnackBar
              position="absolute"
              errorSnackBarOpen={errorSnackBarOpen}
              setErrorSnackBarOpen={setErrorSnackBarOpen}
              snackMessage={info?.alertSms}
            ></CustomSnackBar>
          ) : (
            ""
          )}
        </SnankInfoBox>
      )}

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
        }}
      >
        <Title sx={{ fontSize: { lg: 20, md: 16, sm: 14, xs: 12 } }}>
          {isScreen === "isOTPSignIn" ? info?.signInTitle : info?.signUpTitle}
        </Title>
        <SmallTitle sx={{ fontSize: { lg: 16, md: 14, sm: 12, xs: 12 } }}>
          {info?.subTitle}
        </SmallTitle>
        <BoxStyled>
          <TypographyOtpType>{info?.otptext}</TypographyOtpType>
          <PhoneNumber>{phnumber} </PhoneNumber>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => handleBackButton(isScreen)}
            src={`${ReplaceImage(SigninEdit)}`}
            alt="edit_icon"
          />
        </BoxStyled>
        <Box
          sx={{
            pt: "20px",
            "@media (max-width:600px)": {
              pt: "25px",
            },
          }}
        >
          <OtpComponentLogic
            setOtp={setOtp}
            resetOtpFields={resetOtpFields}
            VerifyHandler={VerifyHandler}
            invalidOtp={invalidOtp}
            setIsInvalidOtp={setIsInvalidOtp}
            resendOtp={resendOtp}
          />
          {invalidOtp && (
            <TypographyOtp>
              {displayErrorMsg}
            </TypographyOtp>
          )}
          {!isValidOtp ? (
            <Typography sx={{ color: "#EB5757" }}>
              {info?.invalidOTP}
            </Typography>
          ) : (
            ""
          )}
        </Box>
        <Box
          sx={{
            pt: "28px",
            pb: "30px  ",
            "@media (max-width:600px)": {
              pt: "25px",
              pb: "25px",
            },
          }}
        >
          {otptimer()}
        </Box>
        <VerifyButton
          disabled={otp.length != 6}
          onClick={() => VerifyHandler()}
          isCartJourney={isCartJourney}
          type="submit"
        >
          {info?.button}
        </VerifyButton>
      </Box>
      {isMobile && (
        <Box
          sx={{
            position: "absolute",
            // bottom: "150px",
            width: "100%",
          }}
        >
          <Box sx={{ position: "relative", top: "95px" }}>
            {resendMes ? (
              <CustomSnackBar
                topMob="-30px"
                position="absolute"
                width="75%"
                snackBarOpen={snackBarOpen}
                setSnackBarOpen={setSnackBarOpen}
                snackMessage={info?.ResendMessage}
              >
                {info?.ResendMessage}
              </CustomSnackBar>
            ) : (
              ""
            )}
          </Box>
        </Box>
      )}
    </Fragment>
  );
}
