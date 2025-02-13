import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import React from "react";
import { Boxs, SelectButtons} from "./CartModalStyles";
import { useMobileCheck } from "../../../utility/isMobile";
import { REMOVE_ITEM_FROM_CART } from "../../../graphQLQueries/RemoveItemsFromCart";
import client from "../../../apollo-client";
import useStorage from "../../../utility/useStoarge";


import { Cookies } from "react-cookie";
import { useAppContext } from "../../../context/userInfoContext";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoilstore";
import {
  callAddwishlistEvent,
  removeCartEvent,
  removeFromCartEvent,
} from "../../../HOC/CartHOCs/CartProductCardAnalytic";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { PercentageLogo, verifiedMarkMobile } from "../CartConstants";
import {
  MOVE_TO_WISHLIST,
  REMOVE_FROM_CART,
  REMOVE_MODAL_SUBTITLE,
  REMOVE_TEXT,
  TOAST_CART_PRODUCT_REMOVE,
} from "../../../utility/Constants";
import { cartUpdatedEvent } from "../../../utility/GaEvents";
import handleErrorResponse from "../../../utility/ErrorHandling";
export const FreeSampleModalpopUp = (props: any) => {
  const isMobile = useMobileCheck();
  return (
    <>
      {props?.freeSampleData.map((rules: any) => {
        return (
          <Box sx={{ padding: "20px" }}>
            <Typography sx={{fontWeight:700,marginBottom:"20px"}}>
              SELECT {rules?.max_gift} FREE{" "}
              {rules?.max_gift > 1 ? "SAMPLES" : "SAMPLE"} (
              {
                rules?.gifts?.filter((data: any) => {
                  return data?.added === true;
                })?.length
              }
              /{rules?.gifts?.length})
            </Typography>
            {rules?.gifts?.map((data: any) => {
              return (
                <>
                  <Boxs>
                    <img
                      src={data.image}
                      alt="image"
                      width={"45px"}
                      height={"55px"}
                    ></img>
                    <Typography
                      sx={{
                        color: "#231F20",
                        fontSize: isMobile ? "11px" : "16px",
                      }}
                    >
                      {data?.name}
                    </Typography>
                    {data?.added ? (
                      <>
                        <SelectButtons
                          backgroundColors={"#231F20"}
                          colors={"#DEA3B7"}
                          onClick={() => {
                            props?.removeFreeSample(data, rules);
                          }}
                        >
                          Remove
                        </SelectButtons>
                      </>
                    ) : (
                      <SelectButtons
                        onClick={() => {
                          props?.addingFreeSample(data, rules);
                        }}
                      >
                        Select
                      </SelectButtons>
                    )}
                  </Boxs>
                </>
              );
            })}
          </Box>
        );
      })}
    </>
  );
};
export const OfferView = ({ cartStore, productSku }: any) => {
  const viewOffers = cartStore?.cartItems?.cart?.item_level_promotions?.filter(
    (data: any) => {
      return data?.sku === productSku;
    }
  )?.[0]?.pmrRules;
  return (
    <Box>
      <Box sx={{ padding: "20px" }}>
        {viewOffers?.map((pmrRules: any, index: number) => {
          return (
            <>
              <Stack direction="row" alignItems="flex-start" gap="4px">
                <Grid sx={{ height: "15px", width: "15px", marginTop: "2px" }}>
                  <img
                    src={`${ReplaceImage(PercentageLogo)}`}
                    alt="givenchy"
                    width={"100%"}
                  ></img>
                </Grid>
                <Typography
                  width="360px"
                  sx={{
                    padding: "0px",
                    color: "#4F4C4D",
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                >
                  {pmrRules?.name}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                gap="4px"
                sx={{ marginTop: "10px" }}
              >
                <Typography
                  width="360px"
                  sx={{
                    padding: "0px",
                    color: "#4F4C4D",
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                >
                  {pmrRules?.code}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                gap="4px"
                sx={{ marginTop: "10px" }}
              >
                <Grid sx={{ height: "15px" }}>
                  <img
                    src={`${ReplaceImage(verifiedMarkMobile)}`}
                    alt="offer"
                    width={"100%"}
                  ></img>
                </Grid>
                <Typography
                  sx={{
                    color: "#AD184C",
                    fontSize: "14px",
                    lineHeight: "17px",
                    fontWeight: "500",
                    marginTop: "1px",
                  }}
                >
                  Offer applied
                </Typography>
              </Stack>
              {index < viewOffers?.length - 1 && (
                <Divider
                  sx={{ paddingTop: "25px", marginBottom: "25px" }}
                ></Divider>
              )}
            </>
          );
        })}
      </Box>
    </Box>
  );
};
export const RemoveItemFromCart = (props: {
  image: any;
  uid: any;
  handleCloseRemoveCart: any;
  handleClickMoveToWishlist: Function;
  product: any;
  setLoader: Function;
  GetCartDetails: Function;
  handleError: Function;
  handleSnackBar: Function;
  cartStore: any;
  productTag: any;
  productIndex: number;
  disableMovetoWishlist: boolean;
}) => {
  const {
    image,
    uid,
    handleCloseRemoveCart,
    handleClickMoveToWishlist,
    product,
    setLoader,
    GetCartDetails,
    handleSnackBar,
    handleError,
    cartStore,
    productIndex,
    disableMovetoWishlist,
  } = props;
  const isMobile = useMobileCheck();
  const userInfoContext = useAppContext();
  const { updateContextData } = userInfoContext;
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const removeItemfromCart = () => {
    OnRemoveProductHandler(uid);
    handleCloseRemoveCart();
  };
  function OnRemoveProductHandler(uid: string) {
    setLoader(true);
    const { getItem } = useStorage();
    const cookie = new Cookies();
    client
      .mutate({
        mutation: REMOVE_ITEM_FROM_CART,
        variables: {
          cartId: getItem("BuyNowCartID", "local")
            ? `${getItem("BuyNowCartID", "local")}`
            : `${getItem("cartID", "local")}`,
          cartItemUid: uid,
        },
      })
      .then(async (response) => {
        const hasError =    handleErrorResponse(response?.data) //response checking
        if (hasError) return null;
        cartUpdatedEvent(response);
        if (response?.data?.removeItemFromCart?.cart) {
          await GetCartDetails(
            TOAST_CART_PRODUCT_REMOVE,
            response?.data?.removeItemFromCart
          );
          handleSnackBar("Product Removed");
        }
        userDataItems &&
          setUserDataItems({
            ...userDataItems,
            userCartCount:
              response?.data?.removeItemFromCart?.cart?.total_quantity,
          });
        cookie.set(
          "userCartCount",
          response?.data?.removeItemFromCart?.cart?.total_quantity,
          {
            path: "/",
            sameSite: true, 
            secure: true
          }
        );
        updateContextData &&
          updateContextData({
            contextUserCartCount:
              response?.data?.removeItemFromCart?.cart?.total_quantity,
          });
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        handleError(err?.message);
      });
  }
  return (
    <>
      <Box>
        <Stack
          sx={{
            padding: isMobile ? "30px 21px 16px 20px" : "30px",
          }}
          direction="row"
          gap={isMobile ? "4px" : "8px"}
        >
          <Box>
            <img src={image} alt="stack" width="100px" height="100px" />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography
              sx={{
                marginBottom: "10px",
                textTransform: "uppercase",
                fontSize: "16px",
                color: "#231F20",
                fontWeight: 700,
                lineHeight: "20px",
              }}
            >
              {REMOVE_FROM_CART}
            </Typography>
            <Typography
              sx={{
                color: "#656263",
                fontWeight: 500,
                lineHeight: "150%",
                fontSize: "16px",
              }}
            >
              {REMOVE_MODAL_SUBTITLE}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          {!disableMovetoWishlist && (
            <Button
              variant="contained"
              sx={{
                width: "50%",
                height: isMobile ? "40px" : "54px",
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "140%",
                color: "#231F20",
                backgroundColor: "#DEA3B7",
                borderRadius: "0",
                letterSpacing: "1px",
                ":hover": {
                  backgroundColor: "#DEA3B7",
                },
                textTransform: "uppercase",
              }}
              onClick={() => {
                setLoader(true);
                handleClickMoveToWishlist(product);
                callAddwishlistEvent(
                  cartStore,
                  product,
                  "add_to_wishlist",
                  productIndex
                );
              }}
            >
              {MOVE_TO_WISHLIST}
            </Button>
          )}
          <Button
            variant="outlined"
            sx={{
              width: disableMovetoWishlist ? "100%" : "50%",
              height: isMobile ? "40px" : "54px",
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "140%",
              color: "#231F20",
              borderRadius: "0",
              border: "1px solid #DEA3B7",
              ":hover": {
                border: "1px solid #DEA3B7",
              },
              textTransform: "uppercase",
            }}
            onClick={() => {
              setLoader(true);
              removeItemfromCart();
              removeCartEvent(
                cartStore,
                product,
                REMOVE_TEXT,
              );
            }}
          >
            {REMOVE_TEXT}
          </Button>
        </Stack>
      </Box>
    </>
  );
};
export const KnowMoreModal = () => {
  return (
    <>
      <Box padding={"20px"}>
        <b>BANK OFFER DETAILS</b>
      </Box>
    </>
  );
}