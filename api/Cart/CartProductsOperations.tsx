import client from "../../apollo-client";
import { ADD_PRODUCTS_TO_WISHLIST } from "../../graphQLQueries/WhishList/AddProductsToWishList";
import handleErrorResponse from "../../utility/ErrorHandling";
import {toast} from "../../utility/Toast";

export async function handleWishList(
  productType: String,
  sku: String,
  parent_sku: String
) {
  const response = client
    .mutate({
      mutation: ADD_PRODUCTS_TO_WISHLIST,
      variables: {
        WishListInput: [
          {
            sku: productType !== "SimpleProduct" ? sku : parent_sku,
            parent_sku: parent_sku,
            quantity: 1,
          },
        ],
      },
    })
    .then((response: any) => {
      const hasError =    handleErrorResponse(response)
      if (hasError) return null;
      return response;
    })
    .catch((error: any) => {
      toast.error("Someting went wrong, Please try again!!!");
      console.log(error)
      return error?.message}
    );
  return response;
}
