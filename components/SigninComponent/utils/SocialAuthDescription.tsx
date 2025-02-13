import { default as styled, default as styledComponent } from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { Cookies } from "react-cookie";
import { event } from "../../../lib/ga/index";
import SignInComponentInterface from "../../../schemas/SignIn/SignIn";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import useStorage from "../../../utility/useStoarge";
import CryptoJS from "crypto-js";
import { useRecoilState } from "recoil";
import { useAppContext } from "../../../context/userInfoContext";
import { userState } from "../../../recoilstore";
import { fetchGoogleUserInfo } from "../../../utility/GoogleUserInfo";
import { useMobileCheck } from "../../../utility/isMobile";
import { MobileContext } from "../SignInComponent";
import {
  access_token_flow,
  getTierLogo,
  getTierTitle,
} from "../../../utility/commonUtility";
import { signInorSignupOrskipFrNow } from "../../SigninComponent/AnalyticsAttributes";
import { getProfileAPI, getProfileData, loginWithSmAPI } from "./SSOAPI";
import {
  LoginIcons,
  OrText,
  SignUpDescription,
  SignUpText,
  SignUpTypography,
  SocialIcon,
  StackedText,
} from "./SocialAuthDescriptionStyled";
import { Facebook_Icon, Google_icon } from "../../Header/Constants";
import triggerGAEvent from "../../../utility/GaEvents";

const SocialAuthDescription = (props: SignInComponentInterface) => {
  const {
    data,
    getIsSignUp,
    getIsSignIn,
    isScreen,
    isInitial,
    isEmail,
    isForgotPasswordInitial,
    isForgotPasswordVerifyScreen,
    isSignUp,
    isRegister,
    setIsSocialAuth,
    setSocialProfile,
    setCustomerID,
    handleClose,
    setNetworkError,
    setNetworkErrorMessage,
    setSocialGraphDomain,
    setLoader,
    setSocialAccessToken,
    setReRender,
    isRegisterSignUp,
    isMobileSignUp,
    setIsCartJourney,
    cartJourney,
  } = props;
  const { getItem, setItem } = useStorage();
  const cookie = new Cookies();
  const userInfoContext = useAppContext();
  const { updateContextData } = userInfoContext;
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const isMobile = useMobileCheck();
  const MobileNumber = React.useContext(MobileContext);
  const getProfileApiCall = async (graphDomain: string) => {
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
      (await responseData?.data?.customer?.customer_ref)
        ? setItem(
            "customerID",
            responseData?.data?.customer?.customer_ref,
            "local"
          )
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
      let firstName = response?.data?.getProfile?.firstName;
      let lastName = response?.data?.getProfile?.lastName;
      // let userEmail = response?.data?.getProfile?.uid;
      let userEmail = responseData?.data?.customer?.email;
      let cardValidDate = response?.data?.getProfile?.cardValidDate;
      let id = responseData?.data?.customer?.customer_ref;
      let mobileNumber = response?.data?.getProfile?.mobile;
      let genderDetails = response?.data?.getProfile?.gender;
      await callLoginEvent(
        firstName,
        lastName,
        userEmail,
        primaryCardNumber,
        cardValidDate,
        primaryCardNumber == "na" ? "Not Activated" : "Activated",
        walletNumber == "na" ? "Not Activated" : "Activated",
        mobileNumber,
        genderDetails,
        graphDomain
      );
      setItem("customerEmailID", userEmail, "local");
      let addresses = responseData?.data?.customer?.addresses;
      let defaultAddress = addresses?.find(
        (addr: any) => addr?.default_billing == true
      );
      if (firstName === "" || firstName === null || firstName === undefined) {
        cookie.set("customer_Name", "Guest", {
          path: "/",
          sameSite: true,
          secure: true,
        });
        setItem("customerID", id, "local");
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
            city: defaultAddress?.city,
            state: defaultAddress?.state,
            pincode: defaultAddress?.postcode,
            customerName: "Guest",
            walletNumber: walletNumber,
            userEmail: userEmail,
            tierLogo: getTierLogo(tier),
            tierText: getTierTitle(tier),
          });

        setReRender(true);
      } else {
        cookie.set("customer_Name", `${firstName} ${lastName}`, {
          path: "/",
          sameSite: true,
        });
        setItem("customerID", id, "local");
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
            city: defaultAddress?.city,
            state: defaultAddress?.state,
            pincode: defaultAddress?.postcode,
            customerName: `${firstName} ${lastName}`,
            walletNumber: walletNumber,
            userEmail: userEmail,

            tierLogo: getTierLogo(tier),
            tierText: getTierTitle(tier),
          });

        setReRender(true);
      }

      handleClose(true);
      setLoader(false);
    }
    if (status === "fail") {
      setLoader(false);
    }
    // }, 0.5);
  };
  const loginWithSM = async (
    firstName: string,
    lastName: string,
    access_token: string,
    graphDomain: string
  ) => {
    setLoader(true);

    const loginWithSMApiResponse = await loginWithSmAPI(
      firstName,
      lastName,
      access_token,
      graphDomain
    );
    const { status, response }: any = loginWithSMApiResponse;
    if (status === "success") {
      const { accessToken, errorCode, errorMessage } =
        response?.data?.loginWithSM;
      if (errorCode === "None") {
        if (access_token_flow(accessToken)) {
          //call get all profile
          await getProfileApiCall(graphDomain);
        } else {
          setLoader(false);
          setNetworkError(true);
          setNetworkErrorMessage("Network Error");
        }
      } else {
        setIsSocialAuth(true);
        setLoader(false);
      }
    }
    if (status === "fail") {
      setLoader(false);
    }
  };
  //Google Auth

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      const userInfo = await fetchGoogleUserInfo(res?.access_token);
      setSocialAccessToken(res?.access_token);
      setSocialProfile(userInfo);
      setSocialGraphDomain("google");
      const { email, family_name, picture, name, given_name } = userInfo;

      await loginWithSM(given_name, family_name, res?.access_token, "google");
    },
    onError: (errorResponse) => {
      setNetworkErrorMessage("Unable to login");
      console.log(errorResponse);
    },
  });
  const handleGoogleLogin = async (data: any) => {
    googleLogin();
    if (isScreen?.includes("Register")) {
      triggerGAEvent(
        {
          link_text: "Google",
          link_url: window?.location?.pathname,
          outbound: true,
          method: "Google",
          journey_type: "signup",
          user_info_hash: CryptoJS.MD5(MobileNumber),
        },
        "signup_register",
        "signupregister",
        "SSO"
      );
      setItem("previousPageTitle", "signupregister", "local");
      setItem("previousPagePath", window?.location?.pathname, "local");
    } else {
      triggerGAEvent(
        {
          link_text: "na",
          link_url: "na",
          outbound: true,
          method: "Google",
          journey_type: "signin",
          user_info_hash: CryptoJS.MD5(MobileNumber),
        },
        "signin_proceed",
        "signupregister",
        "SSO"
      );
      setItem("previousPageTitle", "signin_proceed", "local");
      setItem("previousPagePath", window?.location?.pathname, "local");
    }
  };
  //social login successfull event
  const callLoginEvent = (
    firstname?: string,
    lastname?: string,
    mailid?: string,
    fc_no?: string,
    fc_card_validity?: string,
    fcstatus?: any,
    walletstatus?: any,
    mobileNumber?: any,
    genderDetails?: any,
    graphDomain?: any
  ) => {
    triggerGAEvent(
      {
        user_phone_number: `+91${mobileNumber}`,
        user_mail_id: mailid,
        jounery_type: "signin",
        method: graphDomain,
        user_info_hash: CryptoJS.MD5(mobileNumber),
        age: "na",
        gender: genderDetails,
        user_birth_date: "na",
        user_last_name: lastname,
        user_first_name: firstname,
        fc_status: fcstatus,
        fc_points: 0,
        fc_card_number: fc_no,
        fc_card_validity: fc_card_validity || "na",
        user_type: "na",
        wallet_status: walletstatus,
        wallet_amount: 0,
      },
      "login"
    );
  };

  const triggerSocialIcon = (
    eventName: string,
    data: any,
    link_text: string
  ) => {
    triggerGAEvent(
      {
        link_text: link_text,
        link_url: "na",
        outbound: true,
        method: data,
        jounry_type: "signup",
        user_info_hash: CryptoJS.MD5(MobileNumber),
      },
      eventName,
      "signupregister",
      "SSO"
    );
  };

  //Facebook Login
  const handleFacebookLogin = () => {
    try {
      (window as any)?.FB?.login(
        function (response: any) {
          try {
            setLoader(true);
            if (response?.status == "unknown") {
              handleFacebookLogin();
              return;
            }
            const { accessToken, graphDomain, userID } = response?.authResponse;
            const access_token = accessToken;
            setSocialAccessToken(accessToken);

            if (response.authResponse) {
              (window as any)?.FB?.api(
                "/me",
                { fields: "name, email" },
                async function (authResponse: any) {
                  setSocialProfile(authResponse);
                  setSocialGraphDomain("facebook");
                  const { name, email } = authResponse;
                  const Name = name.split(" ");
                  const firstname = Name[0];
                  Name.shift();
                  const lastName = Name.join(" ");

                  await loginWithSM(
                    firstname || "Guest",
                    lastName || "Guest",
                    access_token,
                    graphDomain
                  );
                }
              );
            } else {
              console.log("User cancelled login or did not fully authorize.");
              setLoader(false);
            }
          } catch (err) {
            console.log("new", err);
            setLoader(false);
          } finally {
            setLoader(false);
          }
        },
        {
          scope: "email",
          return_scopes: true,
        }
      );
    } catch (err) {
      console.log("new1", err);
      setLoader(false);
    }
  };
  const handleButton = () => {
    if (isScreen?.includes("Register")) {
      getIsSignIn(true);
      const signINClick = {
        page_title: "signindetailpage",
        customer_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : cookie.get("MADid"),
        msd_user_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : "",
        link_url: "na",
        loyalty_level: "na",
        page_slug: getItem("currentPageSlug", "local"),
        widget_description: data?.signupText + " " + data?.signuplink,
        link_text: "Sign in",
        outbound: false,
        page_referrer_title:
          JSON.parse(localStorage?.getItem("pageReferrer") as string)?.[
            JSON?.parse(localStorage?.getItem("pageReferrer") as string)
              ?.length - 2
          ]?.previousPageTitle || "na",
        platform: window?.innerWidth > 768 ? "PWA" : "MobilePWA",
        page_path: window?.location?.pathname,
        page_referrer:
          JSON?.parse(localStorage?.getItem("pageReferrer") as string)?.[
            JSON?.parse(localStorage?.getItem("pageReferrer") as string)
              ?.length - 2
          ]?.previousPagePath || "na",
        page_type: "SSO",
      };
      const param = {
        params: signINClick,
        action: "hyperlink",
      };
      event(param);
    } else {
      let signInorSignupOrskipForNow: any = signInorSignupOrskipFrNow();
      signInorSignupOrskipForNow.page_title = "signindetailpage";

      (signInorSignupOrskipForNow.customer_id = getItem("customerID", "local")
        ? getItem("customerID", "local")
        : cookie.get("MADid")),
        (signInorSignupOrskipForNow.msd_user_id =
          getItem("customerID", "local") || ""),
        (signInorSignupOrskipForNow.link_url = "na");
      signInorSignupOrskipForNow.loyalty_level = "na";
      signInorSignupOrskipForNow.widget_description =
        data?.signupText + " " + data?.signuplink;
      signInorSignupOrskipForNow.link_text = "Sign up";
      // SignInProccedMedia.link_text=names
      signInorSignupOrskipForNow.outbound = false;
      let signInorSignupOrskipFrNw = {
        ...signInorSignupOrskipForNow,
        page_referrer_title:
          JSON.parse(localStorage?.getItem("pageReferrer") as string)?.[
            JSON?.parse(localStorage?.getItem("pageReferrer") as string)
              ?.length - 2
          ]?.previousPageTitle || "na",
        platform: window?.innerWidth > 768 ? "PWA" : "MobilePWA",
        page_path: window?.location?.pathname,
        page_slug: getItem("currentPageSlug", "local"),
        page_referrer:
          JSON?.parse(localStorage?.getItem("pageReferrer") as string)?.[
            JSON?.parse(localStorage?.getItem("pageReferrer") as string)
              ?.length - 2
          ]?.previousPagePath || "na",
      };

      signInorSignupOrskipFrNw.page_type = "SSO";

      const param = {
        params: signInorSignupOrskipFrNw,
        action: "hyperlink",
      };
      event(param);
      getIsSignUp(true);
      // cartJourney && setIsCartJourney(false);
    }
  };

  return (
    <React.Fragment>
      {process.env.NEXT_PUBLIC_DISABLE_SOCIAL_MEDIA_ICONS !== "true" && (
        <SocialIcon
          spacing={{ xs: 1, sm: 2, md: 4 }}
          isInitial={isInitial}
          isEmail={isEmail}
          isForgotPasswordInitial={isForgotPasswordInitial}
          isForgotPasswordVerifyScreen={isForgotPasswordVerifyScreen}
          isSignUp={isSignUp}
          isRegister={isRegister}
        >
          <OrText
            isInitial={isInitial}
            isEmail={isEmail}
            isForgotPasswordInitial={isForgotPasswordInitial}
            isForgotPasswordVerifyScreen={isForgotPasswordVerifyScreen}
            isSignUp={isSignUp}
            isRegister={isRegister}
          >
            Or
          </OrText>
          <StackedText spacing={2.5} direction="row">
            <>
              <LoginIcons
                key="facebook"
                src={`${ReplaceImage(Facebook_Icon)}`}
                alt="social-icon"
                onClick={() => {
                  handleFacebookLogin();
                  triggerSocialIcon("signup_register", "Facebook", "Facebook");
                }}
              />
              <LoginIcons
                key="google"
                src={`${ReplaceImage(Google_icon)}`}
                alt="social-icon"
                onClick={() => {
                  handleGoogleLogin(data);
                  triggerSocialIcon("signup_register", "Google", "Google");
                }}
              />
            </>
          </StackedText>
        </SocialIcon>
      )}
      <SignUpText
        isInitial={isInitial}
        isEmail={isEmail}
        isForgotPasswordInitial={isForgotPasswordInitial}
        isForgotPasswordVerifyScreen={isForgotPasswordVerifyScreen}
        isSignUp={isSignUp}
        isRegister={isRegister}
        sx={{ fontSize: { lg: 16, md: 14, sm: 12, xs: 12 } }}
      >
        {isScreen?.includes("Register") ? data?.signinText : data?.signupText}
        <SignUpTypography
          onClick={() => {
            handleButton();
          }}
          sx={{
            cursor: "pointer",
            fontSize: { lg: 16, md: 14, sm: 12, xs: 12 },
          }}
        >
          {isScreen?.includes("Register") ? data?.signinlink : data?.signuplink}
        </SignUpTypography>
      </SignUpText>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <SignUpDescription>{data?.signupDescription}</SignUpDescription>
      </Box>
    </React.Fragment>
  );
};

export default SocialAuthDescription;
