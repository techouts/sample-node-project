import client from "../../../apollo-client";
import {
  APPLY_COUPON_TO_CART,
  GET_COUPON_CODES,
  REMOVE_COUPON_FROM_CART,
} from "../../../graphQLQueries/CouponQuery";
import useStorage from "../../../utility/useStoarge";
import {toast} from "../../../utility/Toast";
import handleErrorResponse from "../../../utility/ErrorHandling";


export const CouponList = async () => {
  const response = await client
    .query({
      query: GET_COUPON_CODES,
      fetchPolicy: 'no-cache', // Disable cache
    })
    .then(async (responseCouponList) => {
      return responseCouponList;
    })
    .catch((err) => {
      console.log("error", err);
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return response?.data;
};
export const AddCouponToCart = async (couponText: any) => {
  const { getItem, setItem } = useStorage();

  const response = await client
    .mutate({
      mutation: APPLY_COUPON_TO_CART,
      variables: {
        cartId: getItem("BuyNowCartID", "local")
        ? `${getItem("BuyNowCartID", "local")}`
        : `${getItem("cartID", "local")}`,
        coupon_code: couponText,
      },
    })
    .then(async (responseAddCouponToCart) => {
      const hasError =    handleErrorResponse(responseAddCouponToCart) //response checking
        if (hasError) return null;
      return responseAddCouponToCart;
    })
    .catch((err) => {
      console.log("error", err);
      const errMessage = JSON.parse(JSON.stringify(err));
      toast.error("Someting went wrong, Please try again!!!");
      return errMessage;
    });
  return response?.data;
};
export const RemoveCouponFromCart = async () => {
  const { getItem} = useStorage();
  const response = await client
    .mutate({
      mutation: REMOVE_COUPON_FROM_CART,
      variables: {
        cartId: `${getItem("cartID", "local")}`,
      },
    })
    .then(async (responseRemoveCouponFromCart) => {
      const hasError =    handleErrorResponse(responseRemoveCouponFromCart) //response checking
      if (hasError) return null;
      return responseRemoveCouponFromCart;
    })
    .catch((err) => {
      console.log("error", err);
      const errMessage = JSON.parse(JSON.stringify(err));
      toast.error("Someting went wrong, Please try again!!!");
      return errMessage;
    });
  return response?.data;
};
