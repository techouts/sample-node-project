import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMobileCheck } from "../../utility/isMobile";
import { AvailableOffers } from "../../HOC/CartHOCs/AvailableOffers/AvailableOffers";
import { CartProductCard } from "../../HOC/CartHOCs/CartProductCard/CartProductCard";
import BasicModal from "../../HOC/Modal/ModalBlock";
import FreeSample from "./FreeSample";
import { BoxStyled, ButtonStyled, OffersText } from "./CartLayoutStyles";
import PincodeChangeModal from "./FreeSampleModal/PincodeChangeModal";
import { Cookies } from "react-cookie";
import {
  AVALIABLE_OFFERS,
  CHANGE_TEXT,
  CHECK_TEXT,
} from "../../utility/Constants";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../../recoilstore";
import { useRouter } from "next/router";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  TICK_CIRCLE_WARNING,
  VERIFIED_IMAGE_ICON,
} from "../../utility/AppIcons";
import { AddFreeSampleGift, RemoveFreeSampleGift } from "./FreeSampleList";
import { viewCartArray } from "../../utility/GaEvents";
import ViewEvent from "../../utility/viewEvent";
import StoreAddress from "./StoreAddress";
import { StoreModeSwitch } from "./StoreModeSwitch";
import { Button } from "@mui/material";
import { MoveNonServiceableItemsFromCart } from "./MoveNonServiceableItemsFromCart";
export function CartDeatils({
  setLoader,
  GetCartDetails,
  displayLoader,
  handleSnackBar,
  handleError,
  setSignInOpen,
  updateCartSuggestions,
  exploreModeServiceableData,
  exploreStoreModeServiceableStatus,
  exploreModeNonServiceableProductsCount,
  handleRefresh,
}: any) {
  const cookie = new Cookies();
  const router = useRouter();
  const isMobile = useMobileCheck();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const accessToken = cookie.get("accessToken");
  const [freeSample, setFreeSample] = useState<any>([]);
  const [isVerify, setIsVerify] = useState(false);
  const viewEventWrapper = useRef();
  const [userName, setUserName] = useState<string | null>(
    userDataItems?.pincode
  );
  const [pincodeChangeModalpop, setPincodeChangeModalpop] = useState(false);
  const pincodeHandler = () => {
    setPincodeChangeModalpop(true);
  };
  const handlepincodeChangeModalclose = () => {
    setPincodeChangeModalpop(false);
  };

  useEffect(() => {
    setFreeSample(cartStore?.cartItems?.cart?.mp_free_gifts);
  }, [cartStore]);

  const addingFreeSample = async (data: any, rules: any) => {
    await setLoader(true);
    let response = await AddFreeSampleGift(Number(rules?.rule_id), data?.id);
    if (response?.mpFreeGiftsAddGift?.status === "success") {
      await setLoader(false);
      let arr = cartStore?.cartItems?.cart?.mp_free_gifts;
      let ruleIndex = arr.findIndex((rulesData: any) => {
        return rulesData?.rule_id === response?.mpFreeGiftsAddGift?.rule_id;
      });
      let index = arr?.[ruleIndex]?.gifts?.findIndex((data: any) => {
        return (
          data?.id?.toString() === response?.mpFreeGiftsAddGift?.product_gift_id
        );
      });
      if (ruleIndex > -1 && index > -1) {
        arr[ruleIndex].gifts[index].added = true;
      }
      await setFreeSample([...arr]);
      await GetCartDetails();
    } else {
      await setLoader(false);
    }
  };

  const removeFreeSample = async (data: any, rules: any) => {
    await setLoader(true);
    let gift = await cartStore?.cartItems?.cart?.items?.filter((item: any) => {
      return item?.product?.sku === data?.sku;
    });
    let response = await RemoveFreeSampleGift(Number(gift?.[0]?.id));
    if (response?.freeGiftsDeleteByQuoteItem) {
      await setLoader(false);
      let arr = cartStore?.cartItems?.cart?.mp_free_gifts;
      let ruleIndex = arr.findIndex((rulesData: any) => {
        return rulesData?.rule_id === rules?.rule_id;
      });
      let index = arr?.[ruleIndex]?.gifts?.findIndex((data: any) => {
        return data?.id?.toString() === data?.id;
      });
      if (ruleIndex > -1 && index > -1) {
        arr[ruleIndex].gifts[index].added = false;
      }
      await setFreeSample([...arr]);
      await GetCartDetails();
    } else {
      await setLoader(false);
    }
  };
  const dataLayer = {
    no_of_items: cartStore?.cartItems?.cart?.items?.length,
    currency: "INR",
    value: cartStore?.cartItems?.cart?.prices?.grand_total?.value || 0,
    updated_items: viewCartArray(cartStore),
  };
  const TickCircleWarning = AppIcons(TICK_CIRCLE_WARNING);
  const VERIFIED_IMAGE = AppIcons(VERIFIED_IMAGE_ICON);
  function handleStoreModeSwitch() {
    setLoader(true);
    setUserDataItems((prev) => {
      return {
        ...prev,
        storeModeType: prev?.storeModeType === "cc" ? "sd" : "cc",
      };
    });
    setCartStore((previousData: any) => ({
      ...previousData,
      isCartUpdated: true,
    }));
    setLoader(false);
  }

  return (
    <>
      <Grid
        item
        xs={12}
        sm={8}
        md={8}
        lg={8}
        aria-label="offers n added products"
        pr={isMobile ? 0 : 2}
        sx={{ display: "flex", flexDirection: "column" }}
        spacing={2}
      >
        <Stack direction="column">
          {userDataItems?.storeMode &&
            userDataItems?.storeModeType === "cc" &&
            exploreStoreModeServiceableStatus === false && (
              <MoveNonServiceableItemsFromCart
                handleRefresh={handleRefresh}
                handleSnackBar={handleSnackBar}
                exploreModeServiceableData={exploreModeServiceableData}
                exploreModeNonServiceableProductsCount={
                  exploreModeNonServiceableProductsCount
                }
              />
            )}
          {userDataItems?.storeMode &&
            userDataItems?.storeModeType === "cc" && (
              <StoreAddress
                address={userDataItems?.storeAddress}
                userCords={{
                  lat: userDataItems?.geoLat,
                  long: userDataItems?.geoLong,
                }}
                storeCords={userDataItems?.storeCords}
              />
            )}
          {cartStore?.cartItems?.cart?.available_promotions?.length > 0 &&
            userDataItems?.storeMode && (
              <OffersText $isMobile={isMobile}>{AVALIABLE_OFFERS}</OffersText>
            )}

          {cartStore?.cartItems?.cart?.available_promotions?.length > 0 && (
            <Box sx={{ mb: isMobile ? 0 : 2 }}>
              <AvailableOffers
                offers={cartStore?.cartItems?.cart?.available_promotions}
                InnerOffersTitle={false}
                OuterOffersTitle={true}
                toggle={isMobile ? true : false}
                isFromCart={true}
              ></AvailableOffers>
            </Box>
          )}
          {isMobile && !userDataItems?.storeMode && (
            <BoxStyled sx={{ mb: "25px" }}>
              <Box
                sx={{
                  width: "100%",
                  height: "49px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "rgb(247, 246, 249)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    marginLeft: "16px",
                    gap: "9px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: isMobile ? "12px" : "14px",
                      fontWeight: 400,
                      lineHeight: isMobile ? "14px" : "20px",
                      color: "#231F20",
                    }}
                  >
                    {userName}
                  </Typography>
                  {isVerify && (
                    <img
                      src={
                        router?.query?.pid === "cart"
                          ? `${ReplaceImage(VERIFIED_IMAGE?.url)}`
                          : isMobile && router?.query?.pid != "cart"
                          ? `${ReplaceImage(TickCircleWarning?.url)}`
                          : `${ReplaceImage(VERIFIED_IMAGE?.url)}`
                      }
                      alt="verify"
                      width="16px"
                      height="16px"
                    />
                  )}
                </Box>
                <Box>
                  <ButtonStyled $isMobile={isMobile} onClick={pincodeHandler}>
                    {userDataItems?.pincode ? CHANGE_TEXT : CHECK_TEXT}
                  </ButtonStyled>
                </Box>
              </Box>
              {pincodeChangeModalpop && (
                <BasicModal
                  top={"50%"}
                  width={isMobile ? "100%" : "521px"}
                  left={"50%"}
                  height={accessToken ? "70%" : "25%"}
                  overflowData={
                    cartStore?.userAddresses?.addresses.length > 0
                      ? "scroll"
                      : "none"
                  }
                  open={pincodeChangeModalpop}
                  handleClose={handlepincodeChangeModalclose}
                  Component={
                    <PincodeChangeModal
                      setLoader={setLoader}
                      setPincodeChangeModalpop={setPincodeChangeModalpop}
                      GetCartDetails={GetCartDetails}
                    />
                  }
                ></BasicModal>
              )}
            </BoxStyled>
          )}
          {/* Free sample components as of now commented */}
          {freeSample?.length > 0 && (
            <FreeSample
              freeSample={freeSample}
              addingFreeSample={addingFreeSample}
              removeFreeSample={removeFreeSample}
            />
          )}
          <Box
            ref={viewEventWrapper}
            sx={{ overflowY: "auto", maxHeight: "700px" }}
          >
            {ViewEvent(viewEventWrapper, dataLayer, "view_cart")}
            {cartStore?.cartItems?.cart?.items?.map(
              (item: any, index: number) =>
                item !== null && (
                  <Box key={index} sx={{ mb: 2 }}>
                    <CartProductCard
                      product={item}
                      productIndex={index}
                      setLoader={setLoader}
                      GetCartDetails={GetCartDetails}
                      displayLoader={displayLoader}
                      handleError={handleError}
                      handleSnackBar={handleSnackBar}
                      productReadMode={false}
                      deliveryTag={null}
                      setSignInOpen={setSignInOpen}
                      updateCartSuggestions={updateCartSuggestions}
                      currentServiceableStore={
                        exploreModeServiceableData?.find(
                          (i: any) => item?.configured_variant?.sku === i?.sku
                        )?.storeId
                      }
                    ></CartProductCard>
                  </Box>
                )
            )}
          </Box>
        </Stack>
      </Grid>
    </>
  );
}
