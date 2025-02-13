import { gql } from "@apollo/client";
import graphql from "../../middleware-graphql";
import { toast } from "../../utility/Toast";

export const FccEnrollNewCustomer = gql`
  query enrollNewCustomer {
    enrollNewCustomer{
      newEnrollmentResponse_v1 {
        cardNumber
        responseCode
        correlationID
        errorMsg
      }
    }
  }
`;

export const FccEnrollNewCustomerCheck = async ({
  email,
  mobile,
}: {
  mobile: String;
  email: String;
}) => {
  const response = await graphql
    .query({
      query: FccEnrollNewCustomer,
      variables: {
        membershipType: "P",
        mobile: mobile,
        email: email,
        hvcFlag: "Y",
        hybrisEmailID: "sai.mk@gmail.com",
        hybrisAccountID: "sai.mk@gmail.com",
      },
    })
    .then((res: any) => {
      console.log("res", res);
      return res;
    })
    .catch((error) => {
      toast.error("Something went wrong, Please try again!!!");
      console.log("error!!!!", error);
      return error;
    });
  debugger;
  return response;
};
