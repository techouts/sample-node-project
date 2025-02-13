import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import BasicModal from "../../HOC/Modal/ModalBlock";
import {
  BoxStyled,
  ButtonStyled,
  BorderBox,
  PaddingBox,
  ColorText,
  BoldText,
} from "./CartLayoutStyles";
import { RemoveCouponFromCart } from "./CouponQueries/CouponList";
import ApplyCouponModal from "./FreeSampleModal/ApplyCouponModal";
import PincodeChangeModal from "./FreeSampleModal/PincodeChangeModal";
import ViewBreakUp from "./ViewBreakUp";
import { useMobileCheck } from "../../utility/isMobile";
import { Cookies } from "react-cookie";
import {
  REMOVE_TEXT,
  APPLY_COUPON,
  CHANGE_TEXT,
  CHECK_TEXT,
} from "../../utility/Constants";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import { callEventCartCoupon } from "./CartAnalytics";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { square_tick, verifiedMarkMobile } from "./CartConstants";
import CartStoreInterface from "../../schemas/cartStoreAtom";
import { AppIcons } from "../../utility/AppIconsConstant";
import { rcEvent_type } from "../../utility/GAConstants";
import { triggerGAEvent } from "../../utility/GaEvents";
import {
  CART_TRUCK_ICON,
  TICK_CIRCLE_WARNING,
  VERIFIED_IMAGE_ICON,
} from "../../utility/AppIcons";
import { couponRemovecartUpdatedEvent } from "../../utility/WebEngageEvents";
import { CCModeBillingAddress } from "./CCModeBillingAddress";
import FirstCitizenClubConsent from "../FirstCitizenClubConsent";

export function CartBillingAndOtherDetails({
  setLoader,
  GetCartDetails,
  handleError,
  handleSnackBar,
  cartStore,
  setCartStore,
  setSignInOpen,
  exploreStoreModeServiceableStatus,
}: any) {
  const cookie = new Cookies();
  const isMobile = useMobileCheck();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const accessToken = cookie.get("accessToken");
  const [pincodeChangeModalpop, setPincodeChangeModalpop] = useState(false);
  const [giftCardModal, setGiftCardModal] = useState(false);
  const [applyCouponModal, setApplyCouponModal] = useState(false);
  const [giftPrice, setGiftPrice] = useState("");
  const [applyCoupon, setApplyCoupon] = useState<any>("");
  const [isVerify, setIsVerify] = useState(false);
  const [userStore, setUserStore] = useRecoilState(userState);
  const [userName, setUserName] = useState<string | null>(
    userDataItems?.pincode
  );
  const [openAddressChangeModal,setOpenAddressChangeModal] = useState<boolean>(false)

  const pincodeHandler = () => {
    setPincodeChangeModalpop(true);
  };
  const handlepincodeChangeModalclose = () => {
    setPincodeChangeModalpop(false);
  };
  const handleCloseGiftCardModal = () => {
    setGiftCardModal(false);
  };
  const handleChange = (event: any) => {
    if (event.target.checked) {
      setGiftPrice("50");
    } else {
      setGiftPrice("");
    }
  };
  const updateCoupon = (couponData: any) => {
    setApplyCoupon(couponData);
  };
  const couponHandler = async (cuponType: string) => {
    if (applyCoupon) {
      setLoader(true);
      const removeCouponCode = await RemoveCouponFromCart();
      if (removeCouponCode !== undefined) {
        await setCartStore((previousData: CartStoreInterface) => ({
          ...previousData,
          cartItems: removeCouponCode?.removeCouponFromCart,
        }));

        let cartData = {
          ...cartStore,
          cartItems: removeCouponCode?.removeCouponFromCart,
        };
        callEventCartCoupon(
          cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code,
          REMOVE_TEXT,
          parseFloat(cartStore?.cartItems?.cart?.promotion_total?.amount),
          rcEvent_type,
          removeCouponCode?.removeCouponFromCart?.cart?.prices?.grand_total
            ?.value,
          removeCouponCode?.removeCouponFromCart?.cart?.prices
            ?.subtotal_excluding_tax?.value,
          removeCouponCode?.removeCouponFromCart?.cart?.prices?.grand_total
            ?.value,
          removeCouponCode?.removeCouponFromCart?.cart?.prices
            ?.subtotal_excluding_tax?.value,
          Math.abs(
            removeCouponCode?.removeCouponFromCart?.cart?.prices?.discount
              ?.amount?.value
          ),
          cartData
        );
        couponRemovecartUpdatedEvent(cartData);
        setApplyCoupon("");
        setLoader(false);
        handleSnackBar("Coupon Removed");
      } else {
        setLoader(false);
        handleError(
          "Failed to remove applied coupon.Verify the code and try again."
        );
      }
    } else {
      setApplyCouponModal(true);
    }
    gaTriggerEvent(
      cuponType,
      cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code
    );
  };

  const gaTriggerEvent = (cuponType: string, cuponCode: string) => {
    triggerGAEvent(
      {
        widget_title: cuponType ? cuponType : "na",
        coupon_code: cuponCode ? cuponCode : "na",
        event_type: cuponType ? cuponType : "na",
        link_url: "na",
        link_text: cuponType ? cuponType : "na",
      },
      "click"
    );
  };

  const handleCloseApplyCoupnModal = () => {
    setApplyCouponModal(false);
  };
  const CheckedIcon = () => {
    return (
      <img
        src={`${ReplaceImage(square_tick)}`}
        alt="checked icon"
        width={"25px"}
      ></img>
    );
  };
  useEffect(() => {
    setApplyCoupon(
      cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || ""
    );
  }, [cartStore?.cartItems]);

  useEffect(() => {
    {
      cartStore?.serviceability?.cc ||
      cartStore?.serviceability?.ed ||
      cartStore?.serviceability?.sd
        ? setIsVerify(true)
        : setIsVerify(false);
    }
  }, [cartStore?.serviceability]);
  useEffect(() => {
    const address = cartStore?.userAddresses?.addresses?.filter(
      (address: any, index: number) =>
        address?.postcode == userDataItems?.pincode
    )[0];

    if (address) {
      setUserName(
        `${userDataItems?.pincode} (${address?.firstname} ${address?.lastname})`
      );
    } else {
      setUserName(userDataItems?.pincode);
    }
  }, [userDataItems?.pincode]);
  const VERIFIED_IMAGE = AppIcons(VERIFIED_IMAGE_ICON);
  const CartTruckImage = AppIcons(CART_TRUCK_ICON);
  const TickCircleWarning = AppIcons(TICK_CIRCLE_WARNING);

  //opens address change popup in cc mode on CCMODEBILLINGADDRESS
  function handleAddressChange(){
    setOpenAddressChangeModal(true)
  }
  useEffect(() => {
    if (userStore.tier === "na") {
      setCartStore((previousData: any) => ({
        ...previousData,
        acceptFCCConsent: false,
      }));
    }
  }, []);
  return (
    <Grid item xs={12} sm={4} md={4} lg={4}>
      <Stack spacing={"10px"}>
        {userStore.tier === "na" && <FirstCitizenClubConsent />}
        {!isMobile && !userDataItems?.storeMode && (
          <>
            <Box
              sx={{
                width: "100%",
                height: "40px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgb(247, 246, 249)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  marginLeft: "20px",
                  gap: "6px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "140%",
                    color: "#231F20",
                  }}
                >
                  {userName}
                </Typography>
                {isVerify && (
                  <>
                    <img
                      src={
                        isMobile
                          ? `${ReplaceImage(TickCircleWarning?.url)}`
                          : `${ReplaceImage(VERIFIED_IMAGE?.url)}`
                      }
                      alt="verify"
                      width="20px"
                      height="20px"
                    />
                  </>
                )}
              </Box>
              <Box>
                <ButtonStyled $isMobile={isMobile} onClick={pincodeHandler}>
                  {userDataItems?.pincode ? CHANGE_TEXT : CHECK_TEXT}
                </ButtonStyled>
              </Box>
            </Box>
            {/* <BoxStyled> */}
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
            {/* </BoxStyled> */}
          </>
        )}
        {userDataItems?.storeMode &&
          userDataItems?.storeModeType === "cc" &&
          cartStore?.userDeliveryAddress?.cc?.billingAddress && (
            <CCModeBillingAddress
              address={cartStore?.userDeliveryAddress?.cc?.billingAddress}
              handleAddressChange={handleAddressChange}
            />
          )}
        <BorderBox>
          <PaddingBox>
            <Box>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={{
                    fontSize: isMobile ? "12px" : "16px",
                    color: "#231F20",
                    fontWeight: "500",
                    lineHeight: isMobile ? "18px" : "24px",
                  }}
                >
                  Have a Coupon Code?
                </Typography>
                <ColorText
                  isMobile={isMobile}
                  onClick={() => {
                    couponHandler(applyCoupon ? REMOVE_TEXT : APPLY_COUPON);
                  }}
                >
                  {applyCoupon ? REMOVE_TEXT : APPLY_COUPON}
                </ColorText>
              </Stack>
              {applyCoupon && (
                <Stack direction="row" alignItems="center">
                  <img
                    src={`${ReplaceImage(verifiedMarkMobile)}`}
                    alt="appliedlogo"
                    width="16px"
                    height="15px"
                  ></img>
                  <BoldText margin="0px 2px">{applyCoupon}</BoldText>
                  <Typography
                    sx={{ fontSize: "14px", color: "#4F4C4D", fontWeight: 500 }}
                  >
                    applied
                  </Typography>
                </Stack>
              )}
            </Box>
            {applyCouponModal && (
              <BasicModal
                top={"50%"}
                width={isMobile ? "100%" : "521px"}
                overflowData={"scroll"}
                left={"50%"}
                height={isMobile ? "100%" : "490px"}
                open={applyCouponModal}
                handleClose={handleCloseApplyCoupnModal}
                widget_title={"APPLY COUPON"}
                widget_description={"Enter Coupon Code"}
                componentId={1}
                Component={
                  <ApplyCouponModal
                    applyCoupon={applyCoupon}
                    setApplyCoupon={updateCoupon}
                    setApplyCouponModal={setApplyCouponModal}
                    setLoader={setLoader}
                    handleSnackBar={handleSnackBar}
                    handleError={handleError}
                    setCartStore={setCartStore}
                  />
                }
              ></BasicModal>
            )}
            <Divider
              style={{
                margin: isMobile ? "10px auto auto 0px" : "20px auto auto 0px",
              }}
            ></Divider>
          </PaddingBox>
          <ViewBreakUp
            currentPage="cart"
            customerCartData={cartStore?.cartItems}
            viewBreakUpOptions={null}
            handleError={handleError}
            setSignInOpen={setSignInOpen}
            applyCoupon={applyCoupon}
            disablePlaceOrder={exploreStoreModeServiceableStatus}
            openAddressChangeModal={openAddressChangeModal}
            setOpenAddressChangeModal={setOpenAddressChangeModal}
          ></ViewBreakUp>
        </BorderBox>
      </Stack>
    </Grid>
  );
}
