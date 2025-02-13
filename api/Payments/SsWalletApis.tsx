import client from "../../apollo-client";
import {
  APPLY_WALLET_AMOUNT,
  OTPForWALLET,
  PlaceWalletOrder,
  REMOVE_WALLET_AMOUNT,
} from "../../graphQLQueries/SSWalletQueries";
import handleErrorResponse from "../../utility/ErrorHandling";
import {toast} from "../../utility/Toast";


export const ApplyWalletAmount = async (
  cartID: any,
  walletAmount: any,
  walletPin: string
) => {
  const response = await client
    .mutate({
      mutation: APPLY_WALLET_AMOUNT,
      variables: {
        cart_id: cartID,
        wallet_amount: walletAmount,
        wallet_pin: walletPin,
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

export const RemoveWalletAmount = async (cartID: string) => {
  const response = await client
    .mutate({
      mutation: REMOVE_WALLET_AMOUNT,
      variables: {
        cart_id: cartID,
      },
      fetchPolicy: "no-cache",
    })
    .then((response) => {
    
      return response;
    })
    .catch((err) => {
      toast.error("Someting went wrong, Please try again!!!");
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return response;
};

export const OTPforWallet = async (cartID: string, access_token: string) => {
  const response = await client
    .query({
      query: OTPForWALLET,
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

export const PlaceOrderForWallet = async (
  cartID: string,
  access_token: string,
  type: string
) => {
  const response = await client
    .query({
      query: PlaceWalletOrder,
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
