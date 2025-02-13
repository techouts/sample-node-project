import client from "../../apollo-client";
import { GET_LOYALITY_DATA } from "../../graphQLQueries/LoyalityData";
import {
  APPLY_WALLET_LOYALITY,
  OTPForLoyality,
  PlaceLoyalityOrder,
  REMOVE_LOYALTY_AMOUNT,
} from "../../graphQLQueries/LoyalityQuery";
import handleErrorResponse from "../../utility/ErrorHandling";

import {toast} from "../../utility/Toast";

export const ApplyLoyalityAmount = async (
  cartID: any,
  loyalityPoints: number,
  loyalityPin: string,
  access_token: String
) => {
  const response = await client
    .mutate({
      mutation: APPLY_WALLET_LOYALITY,
      variables: {
        cart_id: cartID,
        loyalty_point: loyalityPoints,
        otp: loyalityPin,
        access_token: access_token,
      },
    })
    .then((response: any) => {
    
  const hasError =    handleErrorResponse(response) //response checking
  if (hasError) return null;
      return response;
    })
    .catch((error: any) => {
      toast.error("Someting went wrong, Please try again!!!");
      const errMessage = JSON.parse(JSON.stringify(error));
      return errMessage;
    });
  return response;
};

export const OTPforLoyality = async (cartID: string, access_token: string) => {
  const response = await client
    .query({
      query: OTPForLoyality,
      variables: {
        cart_id: cartID,
        access_token: access_token,
      },
      fetchPolicy: "no-cache",
    })
    .then((response) => {
      const hasError =    handleErrorResponse(response) //response checking
        if (hasError) return null;
      return response;
    })
    .catch((err) => {
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return response;
};
export const PlaceOrderForLoyality = async (
  cartID: string,
  access_token: string,
  type: string
) => {
  const response = await client
    .query({
      query: PlaceLoyalityOrder,
      variables: {
        cart_id: cartID,
        access_token: access_token,
        source_from_info: type
      },
      fetchPolicy: "no-cache",
    })
    .then((response) => {
      const hasError =    handleErrorResponse(response) //response checking
        if (hasError) return null;
      return response;
    })
    .catch((err) => {
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return response;
};

export const RemoveLoyaltyAmount = async (cartID: string) => {
  const response = await client
    .query({
      query: REMOVE_LOYALTY_AMOUNT,
      variables: {
        cart_id: cartID,
      },
      fetchPolicy: "no-cache",
    })
    .then((response) => {
     
      return response;
    })
    .catch((err) => {
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return response;
};