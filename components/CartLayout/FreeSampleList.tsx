import client from "../../apollo-client";
import {
  AddFreeSample,
  GetFreeSampleProducts,
  RemoveFreeSample,
} from "../../graphQLQueries/FreeSampleQuery";
import useStorage from "../../utility/useStoarge";
import {toast} from "../../utility/Toast";
import handleErrorResponse from "../../utility/ErrorHandling";


export const GetFreeSampleList = async (sku: string) => {
  const response = await client
    .query({
      query: GetFreeSampleProducts,
      variables: {
        sku: sku,
      },
    })
    .then(async (response) => {
      return response;
    })
    .catch((err) => {
      console.log("error", err);
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return response?.data;
};

export const AddFreeSampleGift = async (rule_id: any, gift_id: any) => {
  const { getItem } = useStorage();
  const response: any = await client
    .mutate({
      mutation: AddFreeSample,
      variables: {
        cart_id: getItem("BuyNowCartID", "local")
          ? `${getItem("BuyNowCartID", "local")}`
          : `${getItem("cartID", "local")}`,
        rule_id: rule_id,
        gift_id: gift_id,
      },
    })
    .then(async (response) => {
      const hasError =    handleErrorResponse(response) //response checking
        if (hasError) return null;
      return response;
    })
    .catch((err) => {
      console.log("error", err);
      toast.error("Someting went wrong, Please try again!!!");
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return response?.data;
};

export const RemoveFreeSampleGift = async (item_id: any) => {
  const { getItem } = useStorage();
  const response: any = await client
    .mutate({
      mutation: RemoveFreeSample,
      variables: {
        cart_id: getItem("BuyNowCartID", "local")
          ? `${getItem("BuyNowCartID", "local")}`
          : `${getItem("cartID", "local")}`,
        item_id: item_id,
      },
    })
    .then(async (response) => { 
        const hasError =    handleErrorResponse(response) //response checking
        if (hasError) return null;
      return response;
    })
    .catch((err) => {
      console.log("error", err);
      toast.error("Someting went wrong, Please try again!!!");
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return response?.data;
};
