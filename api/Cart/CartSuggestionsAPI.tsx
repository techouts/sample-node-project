import client from "../../apollo-client";
import { GET_ORDERS_DATA } from "../../graphQLQueries/OrdersQuery";
import { CUSTOMER_WISHLIST } from "../../graphQLQueries/WhishList/WishListQuery";
import handleErrorResponse from "../../utility/ErrorHandling";

export const fetchWishListProducts = async () => {
  const response = await client
    .query({
      query: CUSTOMER_WISHLIST,
      fetchPolicy: "no-cache",
      variables: {
        pageSize: 10,
        currentPage: 1,
      },
    })
    .then((res) => {
      
      return res?.data?.customer?.wishlists[0]?.items_v2?.items;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const fetchOrders = async () => {
  const response = await client
    .query({
      query: GET_ORDERS_DATA,
      variables: {
        pageSize: 10,
        currentPage: 1,
      },
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    })
    .then((res) => {
   
      return res?.data?.customer?.orders?.items;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};
