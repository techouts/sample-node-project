import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { StyledButton } from "./CartLayoutStyles";
import client from "../../apollo-client";
import { ADD_PRODUCTS_TO_WISHLIST } from "../../graphQLQueries/WhishList/AddProductsToWishList";
import { getCartItems } from "../../HOC/ProductCard/ProductCardUtils";
import { REMOVE_MULTIPLE_ITEMS_FROM_CART } from "../../graphQLQueries/RemoveItemsFromCart";
import WarningIcon from "@mui/icons-material/Warning";
import { useMobileCheck } from "../../utility/isMobile";
import Loader from "../../HOC/Loader/Loader";

export function MoveNonServiceableItemsFromCart({
  handleSnackBar,
  handleRefresh,
  exploreModeNonServiceableProductsCount,
  exploreModeServiceableData
}: {
  handleSnackBar: any;
  handleRefresh: any;
  exploreModeNonServiceableProductsCount: any;
  exploreModeServiceableData:any;
}) {
  const [displayLoader, setLoader] = useState(false);
  const cartId = localStorage.getItem("cartID") as string;
  const isMobile = useMobileCheck();
  async function handleMoveWishlistItems() {
    setLoader(true);
    const cartItems = await getCartItems({ cartId: cartId });

    if (!cartItems?.data?.cart) {
      handleSnackBar("Unable to process request");
      return;
    }

    if (cartItems?.data?.cart?.items?.length > 0) {
      const cartNonWishlistItems = cartItems?.data?.cart?.items
        ?.filter((i: any) => i.isWishlisted === false)
        ?.map((item: any) => {
          return {
            sku: item?.product?.type_id !== "simple"
              ? item?.configured_variant?.sku
              : item?.product?.sku,
            parent_sku: item?.product?.sku,
            quantity: 1,
          };
        });

      const nonServiceableItems = exploreModeServiceableData
        ?.filter((i: any) => !i?.isServiceable)
        ?.map((i: any) => ({
          cart_item_uid: i?.cartUid,
        }));


      if (cartNonWishlistItems?.length > 0) {
        const wishlistItems = exploreModeServiceableData
          ?.filter(
            (i: any) =>
              i?.isServiceable === false &&
              nonServiceableItems?.some(
                (j: any) => j?.cart_item_uid === i?.cartUid
              )
          )
          ?.map((i: any) => ({
            sku: i?.sku,
            parent_sku: i?.parent_sku,
            quantity: 1,
          }));

       
        console.log('Wishlist Items:', wishlistItems);

        if (wishlistItems?.length > 0) {
          await client
            .mutate({
              mutation: ADD_PRODUCTS_TO_WISHLIST,
              fetchPolicy: "no-cache",
              variables: {
                WishListInput: cartNonWishlistItems,
              },
            })
            .then(async (res: any) => {
              if (nonServiceableItems?.length > 0) {
                await RemoveMultipleCartItems(cartId, nonServiceableItems);
              }
            })
            .catch((error) => {
              handleSnackBar("Unable to process request");
              console.error('API Error:', error);
              return error;
            });
        }
      } else {
        if (nonServiceableItems?.length > 0) {
          await RemoveMultipleCartItems(cartId, nonServiceableItems);
        }
      }
    }
    setLoader(false);
  }


  async function RemoveMultipleCartItems(cartId: string, cartItems: any) {
    await client
      .mutate({
        mutation: REMOVE_MULTIPLE_ITEMS_FROM_CART,
        variables: {
          cart_id: cartId,
          cartItems: cartItems,
        },
      })
      .then((res) => {
        if (res?.data?.removeCartItems?.status) {
          handleRefresh();
        } else {
          handleSnackBar("Unable to remove cart items, Please try again");
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleSnackBar("Unable to remove cart items, Please try again");
      });
  }
  
  return (
    <>
    {displayLoader && <Loader />}
    <Stack
      flexDirection={"row"}
      p={2}
      mb={1}
      sx={{
        background: "#f8eae9",
        width: "100%",
        borderRadius: "6px",
        border: "1px solid #ede3e1",
      }}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack>
        <Stack direction="row" alignItems="center">
          <WarningIcon sx={{ color: "#b40200", marginRight: "5px" }} />
          <Typography
            sx={{
              fontSize: isMobile ? "12px" : "16px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            {`Uh - Oh! ${
              exploreModeNonServiceableProductsCount && exploreModeNonServiceableProductsCount
            } Item not available in store`}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: "12px", color: "black" }}>
          {"Move items to wishlist to proceed"}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#e50172",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={async () => {
            await handleMoveWishlistItems();
          }}
        >
          {"Move to wishlist"}
        </Typography>
      </Stack>
    </Stack>
    </>
  );
}
