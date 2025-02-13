import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import React, { Fragment, useEffect, useState } from "react";
import { ContinueButton, PrimaryBox } from "./SecondaryComponentStyled";
import {
  SimpleText,
  LargeText,
  TotalBox,
  StyledButton,
} from "../CartLayout/CartLayoutStyles";
import Loader from "../../HOC/Loader/Loader";
import useStorage from "../../utility/useStoarge";
import {
  ShippingAddress,
  BillingAddress,
  ShippingMethodsOnCart,
} from "../../api/Cart/CustomerCart";
import {
  updateStandardDelivery,
  updateCncDelivery,
} from "../../api/Cart/DeliveryAddress";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../../recoilstore";
import {
  CONTINUE,
  VIEW_DETAILS,
  ORDER_CONFIRMATION,
  TOTAL_MRP,
  OFFER_DISCOUNT,
  SS_WALLET,
  TOTAL_SAVINGS,
  TOTAL_PAYABLE_AMOUNT,
  FREE_TEXT,
  CONVENIENCE_FEE,
} from "../../utility/Constants";
import {
  ViewDetailsBox,
  ViewDetailsButton,
  PriceTypography,
  ViewDetailsTypography,
} from "./PrimaryComponentStyled";
import ViewDetailsModal from "./VIewDetailsModal";
import { useMobileCheck } from "../../utility/isMobile";
import { TransitionProps } from "@mui/material/transitions";
import triggerGAEvent, { cartItemJSON } from "../../utility/GaEvents";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { ExpressAndStandardDeliveryProductsPopup } from "./ExpressAndStandardDeliveryProductsPopup";
import { InfoIcon } from "../CartLayout/ViewBreakUpStyles";
import { INFO_ICON } from "../../utility/AppIcons";
import { AppIcons } from "../../utility/AppIconsConstant";
import { ReplaceImage } from "../../utility/ReplaceImage";
import EditAddress from "../Address/EditAddress/EditAddress";
import { GetCartAddresses } from "../../utility/CartServiceability";
import { Typography } from "@mui/material";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SecondaryComponent = (CartAddressData: any) => {
  const { handleErrorAlert, handleSnackBar } = CartAddressData;
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const {
    serviceability,
    currentDeliveryMode,
    cartItems,
    serviceableProducts,
    userDeliveryAddress,
    storeId,
  } = cartStore;
  const { getItem } = useStorage();
  const isMobile = useMobileCheck();
  const [displayLoader, setLoader] = useState(false);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [finalForward, setFinalForward] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartServiceableProducts, setCartServiceableProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const infoIcon = AppIcons(INFO_ICON);
  const [flowCode, setFlowCode] = useState<"estimatedDelivery"|"rtoEditAddress"|"suggestionPopup"|null>()

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const handleViewDetailsOpen = () => {
    setViewDetails(true);
  };
  const handleClose = () => {
    setViewDetails(false);
  };
  const handleClosePopUp = () => {
    setModalOpen(false);
  };
  const handleOpenPopUp = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    setFinalForward(
      (serviceability?.cc && currentDeliveryMode == "cc") ||
        (serviceability?.ed && currentDeliveryMode == "ed") ||
        (serviceability?.sd && currentDeliveryMode == "sd")
        ? userDeliveryAddress != undefined
          ? currentDeliveryMode == "cc"
            ? userDeliveryAddress?.cc?.billingAddress != null
              ? true
              : false
            : currentDeliveryMode == "sd"
            ? userDeliveryAddress?.sd?.shippingAddress?.postcode ==
                userDataItems?.pincode &&
              userDeliveryAddress?.sd?.billingAddress?.postcode ==
                userDataItems?.pincode
              ? true
              : false
            : userDeliveryAddress?.ed?.shippingAddress?.postcode ==
                userDataItems?.pincode &&
              userDeliveryAddress?.ed?.billingAddress?.postcode ==
                userDataItems?.pincode
            ? true
            : false
          : false
        : false
    );
  }, [userDeliveryAddress, currentDeliveryMode, serviceability]);
  const updateDeliveryMethods = async (deliveryData: any) => {
    if (currentDeliveryMode == "sd" || currentDeliveryMode == "ed") {
      const response = await updateStandardDelivery(
        deliveryData,
        `${
          getItem("BuyNowCartID", "local")
            ? getItem("BuyNowCartID", "local")
            : getItem("cartID", "local")
        }`
      );
      return response;
    }
    if (currentDeliveryMode == "cc") {
      const response = await updateCncDelivery(
        storeId,
        `${
          getItem("BuyNowCartID", "local")
            ? getItem("BuyNowCartID", "local")
            : getItem("cartID", "local")
        }`
      );
      return response;
    }
  };
  const handleContinue = async () => {
    callEvent();
    setLoader(true);
    let deliveryData: any = [];
    if (cartStore?.currentDeliveryMode !== "cc") {
      serviceableProducts?.non_cc?.map((product: any) => {
        if (currentDeliveryMode == "sd") {
          deliveryData.push({
            sku: product?.sku,
            delivery_method: "SD",
            estimated_delivery_date: cartStore?.standardDeliveryDate,
          });
        } else {
          product?.fulfillments?.map((fulfillment: any) => {
            if (fulfillment?.type === "HD") {
              let productServiceableTypes: {
                ed?: boolean;
                sd?: boolean;
              } = {};
              fulfillment?.deliveryModeEDDs?.map((mode: any) => {
                if (mode?.deliveryMode === "ED") {
                  mode?.serviceableStores?.map((store: any) => {
                    if (store?.lspEDDs?.length !== 0) {
                      productServiceableTypes.ed = true;
                    } else {
                      productServiceableTypes.ed = false;
                    }
                  });
                }
                if (mode?.deliveryMode === "SD") {
                  mode?.serviceableStores?.map((store: any) => {
                    if (store?.lspEDDs?.length !== 0) {
                      productServiceableTypes.sd = true;
                    } else {
                      productServiceableTypes.sd = false;
                    }
                  });
                }
              });
              deliveryData.push({
                sku: product?.sku,
                delivery_method: productServiceableTypes?.ed ? "ED" : "SD",
                estimated_delivery_date: productServiceableTypes?.ed
                  ? cartStore?.expressDeliveryDate
                  : cartStore?.standardDeliveryDate,
              });
            }
          });
        }
      });
      setCartServiceableProducts(deliveryData);
    }
    if (
      cartStore?.currentDeliveryMode == "ed" &&
      deliveryData?.length == cartItems?.cart?.items?.length
    ) {
      if (
        deliveryData?.filter(
          (obj: { delivery_method: string }) => obj?.delivery_method == "SD"
        )?.length != 0
      ) {
        setModalOpen(true);
        setFlowCode("estimatedDelivery")
        setLoader(false);
      } else {
        await handleAddressPage(deliveryData);
      }
    } else {
      await handleAddressPage(deliveryData);
    }
  };
  
  async function handleAddressPage(deliveryData: any) {
    setLoader(true);
    if (currentDeliveryMode === "cc") {
      const billingResponse = await BillingAddress(
        userDeliveryAddress.cc.billingAddress
      );
      if (billingResponse?.data) {
        const shippingResponse = await ShippingAddress(
          userDeliveryAddress.cc.billingAddress,
          1
        );
        if (shippingResponse?.data) {
          const response = await updateDeliveryMethods(deliveryData);
          if (response?.data?.SaveCncStore?.message == "saved succesfully") {
            const shippingMethodOnCartResponse = await ShippingMethodsOnCart(
              getItem("BuyNowCartID", "local")
                ? `${getItem("BuyNowCartID", "local")}`
                : `${getItem("cartID", "local")}`,
              "freeshipping",
              "freeshipping"
            );
            if (shippingMethodOnCartResponse?.data) {
              window.location.assign("/cart/payment");
            } else {
              setLoader(false);
              handleErrorAlert(shippingMethodOnCartResponse?.message);
            }
          } else {
            setLoader(false);
            handleErrorAlert(response?.message);
          }
        } else {
          setLoader(false);
          handleErrorAlert(shippingResponse?.message);
        }
      } else {
        setLoader(false);
        handleErrorAlert(billingResponse?.message);
      }
    } else {
      const response = await updateDeliveryMethods(deliveryData);
      if (
        response?.data?.UpdateDeliveryMethod?.message == "saved succesfully" ||
        response?.data?.SaveCncStore?.message == "saved succesfully"
      ) {
        const billingResponse = await BillingAddress(
          currentDeliveryMode == "sd"
            ? userDeliveryAddress.sd.billingAddress
            : userDeliveryAddress.ed.billingAddress
        );
        if (billingResponse?.data) {
          const shippingResponse = await ShippingAddress(
            currentDeliveryMode == "sd"
              ? userDeliveryAddress.sd.shippingAddress
              : userDeliveryAddress.ed.shippingAddress
          );
          if (shippingResponse?.data) {
            if (
              shippingResponse?.data?.setShippingAddressesOnCart?.gokwick_response?.data?.reason?.toLowerCase() ===
                "address incomplete" &&
              Boolean(
                Number(
                  shippingResponse?.data?.setShippingAddressesOnCart
                    ?.gokwick_flag
                )
              )
            ) {
              setModalOpen(true);
              setFlowCode("suggestionPopup");
              setLoader(false);
            } else {
              let carrierData: any;
              if (
                shippingResponse?.data?.setShippingAddressesOnCart?.cart
                  ?.shipping_addresses?.length > 0
              ) {
                carrierData =
                  shippingResponse?.data?.setShippingAddressesOnCart?.cart?.shipping_addresses?.[0]?.available_shipping_methods?.filter(
                    (method: any) =>
                      currentDeliveryMode === "sd"
                        ? method?.carrier_code.toLowerCase() === "freeshipping"
                        : method?.carrier_code.toLowerCase() === "flatrate"
                  );
              }
              const shippingMethodOnCartResponse = await ShippingMethodsOnCart(
                getItem("BuyNowCartID", "local")
                  ? `${getItem("BuyNowCartID", "local")}`
                  : `${getItem("cartID", "local")}`,
                shippingResponse?.data?.setShippingAddressesOnCart?.cart
                  ?.shipping_addresses?.length > 0
                  ? carrierData?.[0]?.carrier_code || "freeshipping"
                  : "freeshipping",
                shippingResponse?.data?.setShippingAddressesOnCart?.cart
                  ?.shipping_addresses?.length > 0
                  ? carrierData?.[0]?.method_code || "freeshipping"
                  : "freeshipping"
              );
              if (shippingMethodOnCartResponse?.data) {
                window.location.assign("/cart/payment");
              } else {
                setLoader(false);
                handleErrorAlert(shippingMethodOnCartResponse?.message);
              }
            }
          } else {
            setLoader(false);
            handleErrorAlert(shippingResponse?.message);
          }
        } else {
          setLoader(false);
          handleErrorAlert(billingResponse?.message);
        }
      } else {
        setLoader(false);
        handleErrorAlert(response?.message);
      }
    }
  }
  const callEvent = () => {
    let cartItemData = cartItemJSON(cartItems?.cart);
    const promotionTotal = parseFloat(cartItems?.cart?.promotion_total?.amount) || 0;
    const discountAmount = Math.abs(cartItems?.cart?.prices?.discount?.amount?.value) || 0;
    triggerGAEvent(
      {
        currency: "INR",
        value: cartItems?.cart?.prices?.grand_total?.value || 0,
        no_of_items: cartItems?.cart?.items?.length,
        coupon_code: cartItems?.cart?.applied_coupons?.[0]?.code ||"na",
        tax: cartItems?.cart?.prices?.subtotal_including_tax?.value || 0,
        order_id: cartItems?.cart?.items?.[0]?.configurable_options?.[0]?.id,
        transaction_id: localStorage?.getItem("cartID"),
        shipping: cartItems?.cart?.prices?.subtotal_including_tax?.value || 0,
        item_type: cartItems?.cart?.__typename,
        shipping_tier:
          cartItems?.cart?.shipping_addresses?.[0]?.selected_shipping_method ||
          "na",
        user_pin_code:
          userDeliveryAddress[
            currentDeliveryMode as keyof typeof userDeliveryAddress
          ]?.billingAddress?.postcode,
        user_state:
          userDeliveryAddress[
            currentDeliveryMode as keyof typeof userDeliveryAddress
          ]?.billingAddress?.region?.region,
        user_city:
          userDeliveryAddress[
            currentDeliveryMode as keyof typeof userDeliveryAddress
          ]?.billingAddress?.city,
        order_discount:Number(promotionTotal > 0 && discountAmount > 0
        ? parseFloat((promotionTotal + discountAmount).toFixed(2))
        : promotionTotal > 0
        ? parseFloat(promotionTotal.toFixed(2))
        : discountAmount.toFixed(2)) ||0,
        other_purchase_items: cartItems?.cart?.items?.length,
        total_saving:
          cartItems?.cart?.prices?.subtotal_with_discount_excluding_tax
            ?.value || 0,
        gift_or_voucher_detail: "na",
        gift_or_voucher_amount: "na",
        mrp_value: cartItems?.cart?.prices?.subtotal_excluding_tax?.value || 0,
        jounery_type: "",
        order_items: cartItemData,
      },
      "add_shipping_info"
    );
  };

  const fetchTotalSavings = () => {
    return parseFloat(cartStore?.cartItems?.cart?.promotion_total?.amount) > 0
      ? (
          parseFloat(cartStore?.cartItems?.cart?.promotion_total?.amount) +
          Math.abs(cartStore?.cartItems?.cart?.prices?.discount?.amount?.value)
        )?.toFixed(2)
      : Math.abs(
          cartStore?.cartItems?.cart?.prices?.discount?.amount?.value
        )?.toFixed(2);
  };

  const handleUpdateAddress = () => {
    const updateAddress = async () => {
      await GetCartAddresses(setCartStore);
      setLoader(false);
      handleSnackBar("Address Updated");
    };
    updateAddress();
  };

  function handleModalComponent(type: any) {
    switch (type) {
      case "estimatedDelivery": {
        return (
          <ExpressAndStandardDeliveryProductsPopup
            closePopup={handleClosePopUp}
            showLoader={setLoader}
            handleErrorAlert={handleErrorAlert}
            deliverableProducts={cartServiceableProducts}
            displayLoader={displayLoader}
            handleAddressPage={handleAddressPage}
          />
        );
      }
      case "rtoEditAddress": {
        return (
          <EditAddress
            toggleUpdated={handleUpdateAddress}
            editingData={
              cartStore.currentDeliveryMode === "sd"
                ? cartStore.userDeliveryAddress.sd.shippingAddress
                : cartStore.userDeliveryAddress.ed.shippingAddress
            }
            edithandleClose={handleClosePopUp}
            showLoader={setLoader}
            handleSnackBar={handleSnackBar}
            handleErrorAlert={handleErrorAlert}
            currentPage="info"
            isFromCart={true}
            suggestionMessage={
              "Please update your address to ensure products get delivered at correct address and on time"
            }
          />
        );
      }
      case "suggestionPopup": {
        return (
          <Stack justifyItems={"center"} alignItems={"center"} p={6}>
            <Typography>
              {
                "Please update your address to ensure products get delivered at correct address and on time"
              }
            </Typography>
            <ContinueButton
              sx={{ mt: 2 }}
              onClick={() => {
                setModalOpen(true);
                setFlowCode("rtoEditAddress");
                setLoader(false);
              }}
            >
              {"Okay"}
            </ContinueButton>
          </Stack>
        );
      }
      default:
        return <></>;
    }
  }

  //checking delivery mode should always be one among these below types
  type DeliveryMode = "sd" | "cc" | "ed";

  const userDeliveryAddressMessagesHandler = (): string => {
    const currentDeliveryMode = cartStore?.currentDeliveryMode as DeliveryMode;
    const userDeliveryAddress = cartStore?.userDeliveryAddress;

    // check user has addresses coming from backend if not show the below message
    if (!cartStore?.userAddresses?.addresses?.length) {
      return "Please add a delivery address*";
    }

    // Use the currentDeliveryMode to check if user has DeliveryAddress if not ask to select
    if (currentDeliveryMode && userDeliveryAddress?.[currentDeliveryMode]) {
      return "Please select address to proceed";
    }
    return "Cannot deliver to this address*";
  };

  return (
    <Fragment>
      {displayLoader && <Loader />}
      {!isMobile ? (
        <PrimaryBox>
          <Stack sx={{ padding: "20px" }} spacing={2.5}>
            <LargeText>{ORDER_CONFIRMATION}</LargeText>
            <Stack direction="row" justifyContent="space-between">
              <SimpleText>{TOTAL_MRP}</SimpleText>
              {cartStore?.cartItems?.cart?.prices && (
                <SimpleText>
                  {`₹ ${cartItems?.cart?.prices?.subtotal_excluding_tax?.value?.toFixed(
                    2
                  )}`}
                </SimpleText>
              )}
            </Stack>

            {parseFloat(cartStore?.cartItems?.cart?.promotion_total?.amount) >
              0 && (
              <Stack direction="row" justifyContent="space-between">
                <SimpleText>{OFFER_DISCOUNT}</SimpleText>
                <SimpleText>{`-₹ ${parseFloat(
                  cartStore?.cartItems?.cart?.promotion_total?.amount
                )?.toFixed(2)}`}</SimpleText>
              </Stack>
            )}
            {cartItems?.cart?.prices?.discount && (
              <Stack direction="row" justifyContent="space-between">
                <SimpleText>
                  {cartItems?.cart?.applied_coupons?.[0]?.code && (
                    <>Coupon Discount</>
                  )}
                </SimpleText>
                {cartStore?.cartItems?.cart?.prices && (
                  <SimpleText>
                    {`-₹ ${Math.abs(
                      cartStore?.cartItems?.cart?.prices?.discount?.amount?.value?.toFixed(
                        2
                      )
                    )}`}
                  </SimpleText>
                )}
              </Stack>
            )}
            {cartStore?.cartItems?.cart?.wallet_discount?.amount != null &&
              cartStore?.cartItems?.cart?.wallet_discount?.amount != "0" && (
                <Stack direction="row" justifyContent="space-between">
                  <SimpleText>{SS_WALLET}</SimpleText>
                  {cartStore?.cartItems?.cart?.prices && (
                    <SimpleText>
                      {`-₹ ${parseFloat(
                        cartItems?.cart?.wallet_discount?.amount
                      )?.toFixed(2)}`}
                    </SimpleText>
                  )}
                </Stack>
              )}
            {cartStore?.cartItems?.cart?.prices?.loyalty_discount?.value >
              1 && (
              <Stack direction="row" justifyContent="space-between">
                <SimpleText>
                  {cartStore?.cartItems?.cart?.prices?.loyalty_discount?.label}
                </SimpleText>
                <SimpleText>
                  - ₹{" "}
                  {parseFloat(
                    cartStore?.cartItems?.cart?.prices?.loyalty_discount?.value
                  )?.toFixed(2)}
                </SimpleText>
              </Stack>
            )}
            {cartStore?.cartItems?.cart?.prices?.egv_discount?.value > 1 && (
              <Stack direction="row" justifyContent="space-between">
                <SimpleText>
                  {cartStore?.cartItems?.cart?.prices?.egv_discount?.label}
                </SimpleText>
                <SimpleText>
                  - ₹{" "}
                  {parseFloat(
                    cartStore?.cartItems?.cart?.prices?.egv_discount?.value
                  )?.toFixed(2)}
                </SimpleText>
              </Stack>
            )}
            <Stack direction="row" justifyContent="space-between">
              <SimpleText>
                {CONVENIENCE_FEE}
                {!isMobile ? (
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                      sx: {
                        "& .MuiTooltip-tooltip": {
                          backgroundColor: "#1c191a",
                          borderRadius: "0%",
                          color: "#fff",
                          padding: "5px 15px",
                          maxWidth: "none",
                          fontSize: "12px",
                        },
                        "& .MuiTooltip-arrow": {
                          color: "#1c191a",
                        },
                      },
                    }}
                    arrow
                    disableFocusListener
                    disableTouchListener
                    title="Final Delivery Charges Will Be Reflected On The Payment Page"
                  >
                    <InfoIcon
                      src={`${ReplaceImage(infoIcon?.url)}`}
                      alt="INFO_ICON"
                    />
                  </Tooltip>
                ) : (
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                      <Tooltip
                        PopperProps={{
                          disablePortal: true,
                          sx: {
                            "& .MuiTooltip-tooltip": {
                              backgroundColor: "#1c191a",
                              borderRadius: "0%",
                              color: "#fff",
                              padding: "5px 15px",
                              maxWidth: "none",
                              fontSize: "12px",
                            },
                            "& .MuiTooltip-arrow": {
                              color: "#1c191a",
                            },
                          },
                        }}
                        arrow
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title="Final Delivery Charges Will Be Reflected On The Payment Page"
                      >
                        <InfoIcon
                          onClick={handleTooltipOpen}
                          src={`${ReplaceImage(infoIcon?.url)}`}
                          alt="INFO_ICON"
                        />
                      </Tooltip>
                    </div>
                  </ClickAwayListener>
                )}
              </SimpleText>
              <SimpleText>
                {cartStore?.cartItems?.cart?.shipping_addresses?.[0]
                  ?.selected_shipping_method?.amount?.value == 0 ||
                !cartStore?.cartItems?.cart?.shipping_addresses?.[0]
                  ?.selected_shipping_method
                  ? FREE_TEXT
                  : `₹ ${cartStore?.cartItems?.cart?.shipping_addresses?.[0]?.selected_shipping_method?.amount?.value?.toFixed(
                      2
                    )}`}
              </SimpleText>
            </Stack>
          </Stack>
          {cartStore?.cartItems?.cart?.prices &&
            Number(fetchTotalSavings()) > 0 && (
              <TotalBox sx={{ padding: "10px 20px", marginBottom: "14px" }}>
                <Stack
                  direction="row"
                  spacing="4px"
                  justifyContent="space-between"
                >
                  <LargeText>{TOTAL_SAVINGS}</LargeText>
                  {cartStore?.cartItems?.cart &&
                    cartStore?.cartItems?.cart?.prices && (
                      <LargeText>{`₹ ${fetchTotalSavings()}`}</LargeText>
                    )}
                </Stack>
              </TotalBox>
            )}
          <Box sx={{ padding: "0px 20px" }}>
            <Stack direction="row" spacing="4px" justifyContent="space-between">
              <LargeText>{TOTAL_PAYABLE_AMOUNT}</LargeText>
              {cartStore?.cartItems?.cart?.prices && (
                <LargeText>
                  {`₹ ${cartItems?.cart?.prices?.grand_total?.value?.toFixed(
                    2
                  )}`}
                </LargeText>
              )}
            </Stack>
            {!finalForward && (
              <Typography sx={{ color: "red" }}>
                {userDeliveryAddressMessagesHandler()}
              </Typography>
            )}
            <StyledButton
              $isCartPage={false}
              disabled={!finalForward}
              sx={{
                opacity: finalForward ? "1" : "0.3",
              }}
              fullWidth
              onClick={() => finalForward && handleContinue()}
            >
              {CONTINUE}
            </StyledButton>
          </Box>
        </PrimaryBox>
      ) : (
        <>
          <ViewDetailsBox isMobile={isMobile}>
            <ViewDetailsButton onClick={handleViewDetailsOpen}>
              {cartStore?.cartItems?.cart?.prices && (
                <PriceTypography>
                  {`₹ ${cartStore?.cartItems?.cart?.prices?.grand_total?.value}`}
                </PriceTypography>
              )}
              <ViewDetailsTypography>{VIEW_DETAILS}</ViewDetailsTypography>
            </ViewDetailsButton>
            <ContinueButton
              disabled={!finalForward}
              onClick={() => handleContinue()}
            >
              {CONTINUE}
            </ContinueButton>
          </ViewDetailsBox>
          <Dialog
            sx={{ display: !isMobile ? "none" : "" }}
            fullScreen
            open={viewDetails}
            onClose={handleClose}
            TransitionComponent={Transition}
            PaperProps={{
              sx: {
                position: "fixed",
                height: "auto",
                bottom: "0",
                borderRadius: "30px 30px 0px 0px",
                boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Box
              pb={0}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ViewDetailsModal
                customerCartData={cartStore?.cartItems}
                cartStore={cartStore}
              />
            </Box>
            <Divider />
          </Dialog>
        </>
      )}
      <BasicModal
        padding={
          flowCode === "estimatedDelivery" ? "" : isMobile ? "0 16px" : ""
        }
        height={
          isMobile
            ? flowCode === "suggestionPopup"
              ? "auto"
              : "100%"
            : flowCode === "suggestionPopup"
              ? "30%"
              : "80%"
        }
        width={
          isMobile
            ? "100%"
            : flowCode === "estimatedDelivery"
              ? "38%"
              : "50%"
        }
        top="50%"
        left="50%"
        overflowData={flowCode === "estimatedDelivery" ? "scroll" : "auto"}
        handleOpen={handleOpenPopUp}
        handleClose={handleClosePopUp}
        open={modalOpen}
        Component={handleModalComponent(flowCode)}
      />
    </Fragment>
  );
};
export default SecondaryComponent;
