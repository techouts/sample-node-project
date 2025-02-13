import { gql } from "@apollo/client";
import graphql from "../middleware-graphql";
import handleErrorResponse from "../utility/ErrorHandling";
import { toast } from "../utility/Toast";

export const GET_LOYALITY_DATA = gql`
  query getLoyaltyPoints($GetGroupLoyaltyPointsRequest: LoyaltyPointsRequest!) {
    getLoyaltyPoints(
      GetGroupLoyaltyPointsRequest: $GetGroupLoyaltyPointsRequest
    ) {
      getGroupLoyaltyPointsResponse {
        redeemablePointsValue
        customerNumber
        message
        status
        regularPoints {
          data
        }
        promoPoints {
          data
        }
      }
      sslLoyaltyDetails {
        barcodeImage
        cardDesc
        cardValidDate
        dateOfLastLinkingAttempt
        fccCardImage
        isLinked
        isLocked
        isTermsAccepted
        nameOnCard
        numberOfChildren
        optionEmail
        optionMail
        optionMobile
        optionTele
        original16DigitCardNumber
        original16DigitCardNumberFormatted
        primaryCardNumber
        selfEmployed
        tier
      }
    }
  }
`;

export const GET_PRIMARY_POINTSDATA = gql`
  query getLoyaltyPoints($GetGroupLoyaltyPointsRequest: LoyaltyPointsRequest!) {
    getLoyaltyPoints(
      GetGroupLoyaltyPointsRequest: $GetGroupLoyaltyPointsRequest
    ) {
      getGroupLoyaltyPointsResponse {
        redeemablePointsValue
        customerNumber
        message
        status
        regularPoints {
          data
        }
        promoPoints {
          data
        }
      }
      sslLoyaltyDetails {
        barcodeImage
        cardDesc
        cardValidDate
        dateOfLastLinkingAttempt
        fccCardImage
        isLinked
        isLocked
        isTermsAccepted
        nameOnCard
        numberOfChildren
        optionEmail
        optionMail
        optionMobile
        optionTele
        original16DigitCardNumber
        original16DigitCardNumberFormatted
        primaryCardNumber
        selfEmployed
        tier
      }
    }
  }
`;

export const GET_FCC_DETAILS = gql`
  query {
    getFirstCitizenClubPoints {
      user {
        email
        first_name
        last_name
      }
      balances {
        loyalty_account
        balance
      }
      member_id
      member_name
      totalBalance
      tier_class
      tier_start_date
      tier_end_date
      sslLoyaltyDetails {
        barcodeImage
        cardDesc
        cardValidDate
        dateOfLastLinkingAttempt
        fccCardImage
        isLinked
        isLocked
        isTermsAccepted
        nameOnCard
        numberOfChildren
        optionEmail
        optionMail
        optionMobile
        optionTele
        original16DigitCardNumber
        original16DigitCardNumberFormatted
        primaryCardNumber
        selfEmployed
        tier
      }
    }
  }
`;

export async function GetFCCDetails() {
  const response = await graphql
    .query({
      query: GET_FCC_DETAILS,
      variables: {},
    })
    .then((res) => {
      const hasError = handleErrorResponse(res); //response checking
      if (hasError) return null;
      return res;
    })
    .catch((error) => {
      toast.error("Something went wrong, Please try again!!!");
      console.log("error at GET_FCC_DETAILS", error);
      return error;
    });
  return response;
}

// promoFlag = "B" OR "CM"
export async function GetLoyaltyData(promoFlag: string) {
  const response = await graphql
    .query({
      query: GET_LOYALITY_DATA,
      variables: {
        GetGroupLoyaltyPointsRequest: { PromoFlag: promoFlag },
      },
    })
    .then((res) => {
      const hasError = handleErrorResponse(res); //response checking
      if (hasError) return null;
      return res;
    })
    .catch((error) => {
      toast.error("Something went wrong, Please try again!!!");
      console.log("error at GET_LOYALITY_DATA", error);
      return error;
    });
  return response;
}
