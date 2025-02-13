import graphql from "../../middleware-graphql";
import { CHECK_ALL_AVAILABILITY } from "../../graphQLQueries/CheckAvailabilityEDD";
import { CHECK_AVAILABILITY_FOR_CC_FULLFILLMENT } from "../../graphQLQueries/CheckAvailabilityForCCFulfillment";
import {toast} from "../../utility/Toast";
import handleErrorResponse from "../../utility/ErrorHandling";

export const productAvailabilityCheck = async (
  postcode: any,
  latitude: any,
  longitude: any,
  products: any,
  type: any = "HD",
  fulfillmentType: any = "HD"
) => {
  const response = await graphql
    .mutate({
      mutation: CHECK_ALL_AVAILABILITY,
      variables: {
        request: {
          type: type,
          fulfillmentType: fulfillmentType,
          address: {
            postcode: postcode,
            latitude: latitude,
            longitude: longitude,
          },
          products: products,
        },
      },
    })
    .then((response: any) => {
     
      return response;
    })
    .catch((error: any) => {
      toast.error("Someting went wrong, Please try again!!!");
      console.log("error!!!!", error);
    });
  return response;
};

export const productAvailabilityForCCFulfillment = async (
  postcode: any,
  latitude: any,
  longitude: any,
  products: any,
) => {
  const response = await graphql
    .mutate({
      mutation: CHECK_AVAILABILITY_FOR_CC_FULLFILLMENT,
      
      variables: {
        request: {
          address: {
            postcode: postcode,
            latitude: latitude,
            longitude: longitude,
          },
          products: products,
        },
      },
    })
    .then((response: any) => {
      
      return response;
    })
    .catch((error: any) => {
      toast.error("Someting went wrong, Please try again!!!");
      console.log("error!!!!", error);
    });
  return response;
};



