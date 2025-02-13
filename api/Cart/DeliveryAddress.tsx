import client from "../../apollo-client";
import {
  UPDATE_STANDARD_DELIVERY_METHOD,
  UPDATE_CNC_DELIVERY_METHOD,
} from "../../graphQLQueries/UpdateDeliveryMethod";
import handleErrorResponse from "../../utility/ErrorHandling";
import {toast} from "../../utility/Toast";

export const updateStandardDelivery = async (
  deliveryData: any,
  cartId: any
) => {
  const response = await client
    .mutate({
      mutation: UPDATE_STANDARD_DELIVERY_METHOD,
      variables: {
        cartId: cartId,
        deliveryMethods: deliveryData,
      },
    })
    .then((response: any) => {
      const hasError =    handleErrorResponse(response) //response checking
      if (hasError) return null;
      return response;

    })
    .catch((err: any) => {
      console.log("error",err);
      toast.error("Someting went wrong, Please try again!!!");
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return response;
};

export const updateCncDelivery = async (storeId: any, cartId: any) => {
  const response = await client
    .mutate({
      mutation: UPDATE_CNC_DELIVERY_METHOD,
      variables: {
        cartId: cartId,
        cncStoreId: storeId,
      },
    })
    .then((response: any) => {
      const hasError =   handleErrorResponse(response) //response checking
      if (hasError) return null;
      return response;
    })
    .catch((err: any) => {
      console.log("error",err);
      toast.error("Someting went wrong, Please try again!!!");
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return response;
};
