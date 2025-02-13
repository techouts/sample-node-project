import { gql } from "@apollo/client";
import client from "../apollo-client";
import handleErrorResponse from "../utility/ErrorHandling";
import { toast } from "../utility/Toast";

export const GetGokwickRiskFlag = async (cardId: any) => {
  const response = await client
    .query({
      query: gql`{GetGokwickRiskFlag (
            cart_token: "${cardId}"
          ){
            risk_flag
            gokwick_status
          }}`,
      fetchPolicy: "no-cache",
    })
    .then((response: any) => {
      const hasError = handleErrorResponse(response); //response checking
      if (hasError) return null;
      return response;
    })
    .catch((err: any) => {
      console.log("error", err);
      toast.error("Someting went wrong, Please try again!!!");
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return response;
};
