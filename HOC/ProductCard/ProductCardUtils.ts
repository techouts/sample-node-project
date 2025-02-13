import is from "date-fns/esm/locale/is/index.js";
import client from "../../apollo-client";
import { ADD_PRODUCTS_TO_WISHLIST } from "../../graphQLQueries/WhishList/AddProductsToWishList";
import { arcClient } from "../../utility/ArcInstance";

export async function getCartItems({ cartId }: { cartId: string }) {
  const response = await arcClient
    .get(`/getSimpleCart?cart_id=${cartId}`)
    .then((response: any) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return response;
}

export async function exploreModeAddToCartCheck({
  cartId,
  skuID,
  parentID,
  quantity,
  pincode,
  storeId,
  isInitial,
  setSnackBarOpen,
  setSnackMessage,
}: any) {
  let finalResponse;
  if (isInitial) {
    const cartItems = await getCartItems({ cartId: cartId });
    if (!cartItems?.data?.cart) {
      setSnackBarOpen(true);
      setSnackMessage("Unable to process request");
    }
    if (cartItems?.data?.cart?.items?.length > 0) {
      const cartNonWishlistItems = cartItems?.data?.cart?.items
        ?.filter((i: any) => i.isWishlisted === false)
        ?.map((item: any) => {
          return {
            sku:
              item?.product?.type_id !== "simple"
                ? item?.configured_variant?.sku
                : item?.product?.sku,
            parent_sku: item?.product?.sku,
            quantity: 1,
          };
        });
      if (cartNonWishlistItems?.length > 0) {
        await client
          .mutate({
            mutation: ADD_PRODUCTS_TO_WISHLIST,
            fetchPolicy: "no-cache",
            variables: {
              WishListInput: cartNonWishlistItems,
            },
          })
          .then(async (res: any) => {
            const removeCartItemsRes = await RemoveCartItems(cartId);
            if (removeCartItemsRes?.data?.removeCart?.status) {
              const addToCartRes = await exploreModeUpdateCart({
                action: "A",
                cartID: cartId,
                parentSku: parentID,
                sku: skuID,
                pincode: pincode,
                quantity: quantity,
                storeID: storeId,
              });
              finalResponse = addToCartRes;
            } else {
              setSnackBarOpen(true);
              setSnackMessage("Unable to process request");
            }
          })
          .catch((error) => {
            setSnackBarOpen(true);
            setSnackMessage("Unable to process request");
            return error;
          });
      } else {
        const removeCartItemsRes = await RemoveCartItems(cartId);
        if (removeCartItemsRes?.data?.removeCart?.status) {
          const addToCartRes = await exploreModeUpdateCart({
            action: "A",
            cartID: cartId,
            parentSku: parentID,
            sku: skuID,
            pincode: pincode,
            quantity: quantity,
            storeID: storeId,
          });
          finalResponse = addToCartRes;
        } else {
          setSnackBarOpen(true);
          setSnackMessage("Unable to process request");
        }
      }
    } else {
      const addToCartRes = await exploreModeUpdateCart({
        action: "A",
        cartID: cartId,
        parentSku: parentID,
        sku: skuID,
        pincode: pincode,
        quantity: quantity,
        storeID: storeId,
      });
      finalResponse = addToCartRes;
    }
  } else {
    const addToCartRes = await exploreModeUpdateCart({
      action: "A",
      cartID: cartId,
      parentSku: parentID,
      sku: skuID,
      pincode: pincode,
      quantity: quantity,
      storeID: storeId,
    });
    finalResponse = addToCartRes;
  }

  if (isInitial && finalResponse?.data) {
    localStorage.setItem(
      "isStoreModeAddToCartInitial",
      "false"
    )
  }

  return finalResponse;
}

export async function exploreModeUpdateCart({
  action,
  cartID,
  parentSku,
  pincode,
  quantity,
  sku,
  storeID,
}: {
  cartID: string;
  action: "A" | "U" | "R";
  sku: string;
  parentSku: string;
  quantity: number;
  storeID: string;
  pincode: string;
}) {
  const response = await arcClient
    .post("/addOrUpdateCartV2", {
      cart: {
        cart_id: cartID,
        action: action,
        sku: sku,
        parent_sku: parentSku,
        quantity: quantity,
        store_name: storeID,
        delivery_type: "HLD",
        pincode: pincode,
        force: true,
      },
    })
    .then((res: any) => {
      console.log("res at exploreModeUpdateCart", res);
      return res;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
  return response;
}

{
  /*
  * This method removes all items from current cart
  */
}
export async function RemoveCartItems(cartId: string) {
  const response = await arcClient
    .get(`/removeCart?cart_id=${cartId}`)
    .then((response: any) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return response;
}