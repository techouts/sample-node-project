import { GEO_PINCODE } from "../graphQLQueries/GeoPincode";
import graphql from "../middleware-graphql";
import handleErrorResponse from "./ErrorHandling";
import { toast } from "./Toast";

export const pinCodeBasedCoordinates = async (pinCode: string) => {

  if (pinCode?.length == 6) {
    const response = await graphql
    .mutate({
      mutation: GEO_PINCODE,
      variables: {
        pincode: pinCode
      },
    })
    .then((res) => {
     
      return res?.data?.getLatLongValues;
    })
    .catch((err) => {
      console.log("in error=====>",err);
      toast.error("Someting went wrong, Please try again!!!");
    return {  error: "Network Error", errorMessage: err};
  })
    return response;
  } else return { error: "Incorrect Pin Code" };
};

export const pinCodeBasedLocationDetails = async (pinCode: string) => {
  if (pinCode?.length == 6) {
    const response = await graphql
    .mutate({
      mutation: GEO_PINCODE,
      variables: {
        pincode: pinCode
      },
    })
      .then((res) => {
      
      return res?.data?.getLatLongValues;
    })
    .catch((err) => {
      toast.error("Someting went wrong, Please try again!!!");
      console.log(err);
      return { error: "Network Error", errorMessage: err };
    });
    return response;
  } else return { error: "Incorrect Pin Code" };
};
