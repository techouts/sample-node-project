import client from "../../../apollo-client";
import {
  createUser,
  getProfile,
  loginWithOtp,
  loginWithSocialAuth,
  LoginWithSocialMedia,
  signUpWithOtp,
  verifyOtp,
} from "../../../graphQLQueries/LoginQuery";
import { GET_PROFILE_DATA } from "../../../graphQLQueries/MyProfileQuery";
import graphql from "../../../middleware-graphql";
import handleErrorResponse from "../../../utility/ErrorHandling";
import { toast } from "../../../utility/Toast";

export const signUpWithOtpAPI = (mobileNumber: any, email: string) => {
  const response = graphql
    .mutate({
      mutation: signUpWithOtp,
      variables: {
        mobileNumber: mobileNumber,
        email: email,
      },
    })
    .then((response: any) => {
      return { status: "success", response: response };
    })
    .catch((error) => {
      toast.error("Someting went wrong, Please try again!!!");
      return { status: "fail", error: error };
    });
  return response;
};

export const loginWithOtpAPI = async (mobileNumber: any) => {
  const response = graphql
    .mutate({
      mutation: loginWithOtp,
      variables: {
        mobileNumber: mobileNumber,
      },
    })
    .then((response) => {
      return { status: "success", response: response };
    })
    .catch((error) => {
      toast.error("Someting went wrong, Please try again!!!");
      return { status: "fail", error: error, errorMessage: error?.message };
    });
  return response;
};

export const loginWithOtpAPIV2 = async (mobileNumber: any) => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_SSO_API_GATEWAY_URL_V2}/${mobileNumber}`,
    { method: "POST" }
  )
    .then(async (response) => {
      const json = await response.json();
      return { status: "success", response: json };
    })
    .catch((error) => {
      toast.error("Someting went wrong, Please try again!!!");
      return { status: "fail", error: error, errorMessage: error?.message };
    });
  return response;
};

export const verifyOtpAPI = (MobileNumber: string, otp: string) => {
  const response = graphql
    .mutate({
      mutation: verifyOtp,
      variables: {
        mobileNumber: MobileNumber,
        otp: otp,
      },
    })
    .then(async (response) => {
      if (response?.data?.verifyOtp?.existingUser) {
        localStorage?.setItem("customerType", "existing_customer");
        localStorage?.setItem("userType", "returning_user");
      } else {
        localStorage?.setItem("customerType", "new_customer");
        localStorage?.setItem("userType", "new_user");
      }
      return { status: "success", response: response };
    })
    .catch((error: any) => {
      toast.error("Someting went wrong, Please try again!!!");
      return { status: "fail", error: error, errorMessage: error?.message };
    });
  return response;
};

export const cartCreateUserAPI = (
  fullName: any,
  mobileNumber: any,
  login: any
) => {
  const response = graphql
    .mutate({
      mutation: createUser,
      variables: {
        fullName: fullName,
        mobile: mobileNumber,
        login: login,
        gender: "",
        address: "",
        anniversary: "",
        birthday: "",
        city: "",
        pincode: "",
        state: "",
      },
    })
    .then((response: any) => {
      return {
        status:
          response?.data?.createUser?.errorMessage === "na" ||
          response?.data?.createUser?.errorMessage === "unidenfied"
            ? "success"
            : "fail",
        response: response,
      };
    })
    .catch((error: any) => {
      toast.error("Someting went wrong, Please try again!!!");
      return { status: "fail", error: error, errorMessage: error?.message };
    });
  return response;
};

export const getProfileAPI = (accessToken: string) => {
  const response = graphql
    .mutate({
      mutation: getProfile,
      variables: {
        accessToken: accessToken,
      },
      fetchPolicy: "no-cache",
    })
    .then((response: any) => {
      return { status: "success", response: response };
    })
    .catch((error: any) => {
      toast.error("Someting went wrong, Please try again!!!");
      return { status: "fail", error: error, errorMessage: error?.message };
    });
  return response;
};

export const getProfileData = () => {
  const response = client
    .query({
      query: GET_PROFILE_DATA,
      fetchPolicy: "no-cache",
    })
    .then((response: any) => {
      return { status: "success", responseData: response };
    })
    .catch((error: any) => {
      return { status: "fail", error: error, errorMessage: error?.message };
    });
  return response;
};
export const loginWithSocialMediaAPI = (
  fullName: string,
  email: string,
  mobileNumber: string,
  socialAccessToken: string,
  socialProfileImage: any,
  socialLdp: any
) => {
  const response = graphql
    .mutate({
      mutation: LoginWithSocialMedia,
      variables: {
        address: "",
        anniversary: "",
        birthday: "",
        city: "",
        fullName: fullName,

        gender: "MALE",
        login: email,
        mobile: mobileNumber,
        pincode: "",
        state: "",
        socialAccessToken: socialAccessToken,
        socialProfileImage: socialProfileImage,
        socialLdp: socialLdp,
      },
    })
    .then((response: any) => {
      return { status: "success", response: response };
    })
    .catch((error: any) => {
      toast.error("Someting went wrong, Please try again!!!");
      return { status: "fail", error: error, errorMessage: error?.message };
    });
  return response;
};
export const loginWithSmAPI = (
  firstName: string,
  lastName: string,
  socialAccessToken: any,
  socialLdp: string
) => {
  const response = graphql
    .mutate({
      mutation: loginWithSocialAuth,
      fetchPolicy: "no-cache",
      variables: {
        firstName: firstName,
        lastName: lastName,
        socialAccessToken: socialAccessToken,
        socialLdp: socialLdp,
      },
    })
    .then((response: any) => {
      return { status: "success", response: response };
    })
    .catch((error: any) => {
      toast.error("Someting went wrong, Please try again!!!");
      return { status: "fail", error: error, errorMessage: error?.message };
    });
  return response;
};
export const createProfileAPI = (
  fullName: string,
  gender: string,
  email: string,
  mobileNumber: any,
  address: string,
  anniversary: string,
  birthday: any,
  city: string,
  pinCode: string,
  state: any
) => {
  const response = graphql
    .mutate({
      mutation: createUser,
      variables: {
        fullName: fullName,
        gender: gender,
        login: email,
        mobile: mobileNumber,
        address: address,
        anniversary: anniversary,
        birthday: birthday,
        city: city,
        pincode: pinCode,
        state: state,
      },
    })
    .then((response: any) => {
      return {
        status:
          response?.data?.createUser?.errorMessage === "na" ||
          response?.data?.createUser?.errorMessage === "unidenfied"
            ? "success"
            : "fail",
        response: response,
      };
    })
    .catch((error: any) => {
      toast.error("Someting went wrong, Please try again!!!");
      return { status: "fail", error: error, errorMessage: error?.message };
    });
  return response;
};
