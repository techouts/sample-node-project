import { gql } from "@apollo/client";

export const CREATE_SSWALLET = gql`
  mutation CreateWallet($mobileNumber: String!, $email: String!) {
    createWallet(mobileNumber: $mobileNumber, email: $email) {
      otpSent
      errorMessage
    }
  }
`;

export const CREATE_HYBRIS_USER = gql`
  mutation createHybrisUser($mobileNumber: String!) {
    createHybrisUser(mobileNumber: $mobileNumber) {
      content
      totalBalance
      walletNumber
  }
  }
`;


export const VERIFY_CREATE_SSWALLET = gql`
  mutation VerifyCreateWallet($mobileNumber: String!, $otp: String!) {
    verifyCreateWallet(mobileNumber: $mobileNumber, otp: $otp) {
      errorCode
      errorMessage
      success
    }
  }
`;

export const WALLET_EXPIRY = gql`
  query walletExpiry {
    walletExpiry {
      expiryDate
      totalAmount
    }
  }
`;
