import { gql } from "@apollo/client";

export const loginWithOtp = gql`
  mutation loginWithOtp($mobileNumber: String!) {
    loginWithOtp(mobileNumber: $mobileNumber) {
      errorMessage
      otpSent
      errorCode
      existingUser
    }
  }
`;

export const signUpWithOtp = gql`
  mutation signUpWithOtp($mobileNumber: String!, $email: String!) {
    signUpWithOtp(mobileNumber: $mobileNumber, email: $email) {
      errorMessage
      otpSent
      errorCode
    }
  }
`;

export const verifyOtp = gql`
  mutation verifyOtp($mobileNumber: String!, $otp: String!) {
    verifyOtp(mobileNumber: $mobileNumber, otp: $otp) {
      accessToken
      errorCode
      existingUser
      expiresIn
      isValidSession
      gravityUser
      mobileNumber
      otpSent
      refreshToken
      scope
      tokenType
      errorMessage

      emailId
      fullName
    }
  }
`;

export const loginWithEmail = gql`
  mutation LoginWithEmail($email: String!, $password: String!) {
    loginWithEmail(email: $email, password: $password) {
      accessToken
      errorCode
      existingUser
      mobileNumber
      otpSent
      isValidSession
      gravityUser
      expiresIn
      scope
      tokenType
    }
  }
`;

export const createUser = gql`
  mutation CreateUser(
    $fullName: String!
    $gender: String!
    $login: String!
    $mobile: String!
    $address: String!
    $anniversary: String!
    $birthday: String!
    $city: String!
    $pincode: String!
    $state: String!
  ) {
    createUser(
      address: $address
      anniversary: $anniversary
      birthday: $birthday
      city: $city
      fullName: $fullName
      gender: $gender
      login: $login
      mobile: $mobile
      pincode: $pincode
      state: $state
    ) {
      accessToken
      errorCode
      existingUser
      expiresIn
      gravityUser
      isValidSession
      mobileNumber
      otpSent
      refreshToken
      scope
      tokenType
      errorMessage
    }
  }
`;

export const getProfile = gql`
  query GetProfile($accessToken: String!) {
    getProfile(accessToken: $accessToken) {
      uid
      addressesCount
      crmStatusFlag
      displayUid
      firstName
      gender
      isPasswordAvailable
      loyaltyDetails {
        primaryCardNumber
        tier
        cardValidDate
      }
      walletNumber
      lastName
      mobile
      modifiedTime
      name
      pk
      showFccPopUp
      title
      titleCode
      type
      errorMessage
    }
  }
`;

export const loginWithSocialAuth = gql`
  mutation LoginWithSM(
    $firstName: String!
    $lastName: String!
    $socialAccessToken: String!
    $socialLdp: String!
  ) {
    loginWithSM(
      firstName: $firstName
      lastName: $lastName
      socialAccessToken: $socialAccessToken
      socialLdp: $socialLdp
    ) {
      accessToken
      errorMessage
      errorCode
      expiresIn
      refreshToken
    }
  }
`;

export const LoginWithSocialMedia = gql`
  mutation LoginWithSocialMedia(
    $address: String!
    $anniversary: String!
    $birthday: String!
    $city: String!
    $fullName: String!
    $gender: String!
    $login: String!
    $mobile: String!
    $pincode: String!
    $state: String!
    $socialAccessToken: String
    $socialProfileImage: String
    $socialLdp: String
  ) {
    registerWithSocialMedia(
      address: $address
      anniversary: $anniversary
      birthday: $birthday
      city: $city
      fullName: $fullName
      gender: $gender
      login: $login
      mobile: $mobile
      pincode: $pincode
      state: $state
      socialAccessToken: $socialAccessToken
      socialProfileImage: $socialProfileImage
      socialLdp: $socialLdp
    ) {
      accessToken

      refreshToken

      expiresIn
      errorCode
      errorMessage
    }
  }
`;

export const IsAccountDeleted = gql`
query IsAccountDeleted($mobile_number: String!) {
  isAccountDeleted(mobile_number: $mobile_number)
}
`;
