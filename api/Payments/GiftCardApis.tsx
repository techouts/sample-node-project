import client from "../../apollo-client";
import {
  REDEEM_EGV_CARD,
  REMOVE_EGV_CARD,
} from "../../graphQLQueries/GiftCardQuery";
import {
  OrderPlaceQuery,
  SetPaymentMethodQuery,
} from "../../graphQLQueries/PaymentQuery";
import handleErrorResponse from "../../utility/ErrorHandling";
import {toast} from "../../utility/Toast";

export const ApplyEGVCard = async (
  cart_id: any,
  amount: any,
  access_token: String,
  card_number: string,
  card_pin: string
) => {
  const response = await client
    .mutate({
      mutation: REDEEM_EGV_CARD,
      variables: {
        cart_id: cart_id,
        amount: amount,
        access_token: access_token,
        card_number: card_number,
        card_pin: card_pin,
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

export const SetPaymentMethod = async (cartID: string, code: string) => {
  const response = await client
    .query({
      query: SetPaymentMethodQuery,
      variables: {
        cartId: cartID,
        code: code,
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

export const PlaceOrder = async (cartID: string, access_token: string, type: string) => {
  const response = await client
    .query({
      query: OrderPlaceQuery,
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

export const RemoveEGVCard = async (cartID: string) => {
  const response = await client
    .query({
      query: REMOVE_EGV_CARD,
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
