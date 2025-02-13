import client from "../../apollo-client";
import {
  AddBillingAddressQuery,
  AddShippingAddressQuery,
} from "../../graphQLQueries/AddressQuery";
import {
  ASSIGN_CUSTOMER_TO_GUEST_CART,
  MERGE_ACTIVE_CARTS,
} from "../../graphQLQueries/Cart/BuyNowCart";
import {
  CUSTOMER_CART,
  CreateEmptyCart,
  GETCUSTOMER_CART_COUNT,
} from "../../graphQLQueries/CartQuery";
import { setShippingMethodQuery } from "../../graphQLQueries/PaymentQuery";
import handleErrorResponse from "../../utility/ErrorHandling";
import {toast} from "../../utility/Toast";


export const userCartQunatityCount = async () => {
  const response = await client
    .query({
      query: GETCUSTOMER_CART_COUNT,
      fetchPolicy: "no-cache",
    })
    .then((response: any) => {
     
      return response;
    })
    .catch((err: any) => {
      console.log("error", err);
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return response;
};

export const fetchCartDetails = async (cardId: any) => {
  const response = await client
    .mutate({
      mutation: CUSTOMER_CART,
      variables: {
        cartId: cardId,
      },
      errorPolicy: "ignore",
    })
    .then((response: any) => {
    
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

{
  /* For guest user*/
}
export const createEmptyCart = async () => {
  const response = await client
    .mutate({
      mutation: CreateEmptyCart,
    })
    .then((response: any) => {
    
      return response?.data?.createEmptyCart;
    })
    .catch((err: any) => {
      console.log("error", err);
      toast.error("Someting went wrong, Please try again!!!");
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return response;
};

export const ShippingAddress = async (address: any, maxRetries = 3) => {
  let attempt = 0;
  let success = false;
  let response = null;
  while (attempt < maxRetries && !success) {
    attempt++;
    response = await client
      .mutate({
        mutation: AddShippingAddressQuery,
        variables: {
          cartId: localStorage.getItem("BuyNowCartID")
            ? localStorage.getItem("BuyNowCartID")
            : localStorage.getItem("cartID"),
          firstname: address?.firstname,
          lastname: address?.lastname,
          company: "Company Name",
          street: address?.street[0],
          city: address?.city,
          region: address?.region?.region_code,
          region_id: address?.region?.region_id,
          postcode: address?.postcode,
          country_code: "IN",
          telephone: address?.telephone,
          save_in_address_book: address?.id ? false : true,
          utmsource: "",
        },
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
    if (
      response?.data?.setShippingAddressesOnCart?.gokwick_response?.status ===
        "500" ||
      response?.data?.setShippingAddressesOnCart?.gokwick_response?.status ===
        "403" ||
      response?.data?.setShippingAddressesOnCart?.gokwick_response?.status ===
        "422"
    ) {
      continue;
    } else {
      success = true;
    }
  }
  return response;
};

export const BillingAddress = async (address: any) => {
  const response = await client
    .mutate({
      mutation: AddBillingAddressQuery,
      variables: {
        cartId: localStorage.getItem("BuyNowCartID")
          ? localStorage.getItem("BuyNowCartID")
          : localStorage.getItem("cartID"),
        firstname: address?.firstname,
        lastname: address?.lastname,
        company: "Company Name",
        street: address?.street[0],
        city: address?.city,
        region: address?.region?.region_code,
        region_id: address?.region?.region_id,
        postcode: address?.postcode,
        country_code: "IN",
        telephone: address?.telephone,
        save_in_address_book: address?.id ? false : true,
      },
    })
    .then((response: any) => {
      const hasError =    handleErrorResponse(response) //response checking
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

export const ShippingMethodsOnCart = async (
  cardId: any,
  carrierCode: string,
  methodCode: string
) => {
  const response = await client
    .mutate({
      mutation: setShippingMethodQuery,
      variables: {
        cartId: cardId,
        carrier_code: carrierCode,
        method_code: methodCode,
      },
    })
    .then((response: any) => {
      const hasError =    handleErrorResponse(response) //response checking
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

export async function MergeCarts(buyNowCartId: string, cartId: string) {
  const response = await client
    .mutate({
      mutation: MERGE_ACTIVE_CARTS,
      variables: {
        BuyNowCart: buyNowCartId,
        CustomerCart: cartId,
      },
    })
    .then((res) => {
      const hasError =    handleErrorResponse(res?.data?.mergeActiveCarts?.cart_id) //response checking
          if (hasError) return null;
      if (res?.data?.mergeActiveCarts?.cart_id) {
        localStorage.setItem("cartID", res?.data?.mergeActiveCarts?.cart_id);
        localStorage.removeItem("BuyNowCartID");
        return res?.data?.mergeActiveCarts?.cart_id;
      }
    })
    .catch((err) => {
      toast.error("Someting went wrong, Please try again!!!");
      console.log(err);
      return err;
    });
  return response;
}

export async function MergeGustUserCart(guestCartId: string) {
  const response = await client
    .mutate({
      mutation: ASSIGN_CUSTOMER_TO_GUEST_CART,
      variables: {
        GuestCartId: guestCartId,
      },
    })
    .then((res) => {
      const hasError =    handleErrorResponse(res) //response checking
        if (hasError) return null;
      
      return res;
    })
    .catch((err) => {
      toast.error("Someting went wrong, Please try again!!!");
      console.log(err);
      return err;
    });
  return response;
}

export async function FetchCartId() {
  const response = await client
    .query({
      query: GETCUSTOMER_CART_COUNT,
      fetchPolicy: "no-cache",
    })
    .then(async (res: any) => {
     
      const cartID = res?.data?.customerCart?.id;
      localStorage.setItem("cartID", cartID);
      return cartID;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  return response;
}
