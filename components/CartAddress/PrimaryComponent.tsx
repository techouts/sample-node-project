import React, { Fragment, useEffect, useState } from "react";
import {
  DeliveryEstimationText,
  EstimatedDeliveryStack,
  EstimatedDeliveryTypography,
  PrimaryBox,
  PrimaryBoxOne,
  RadioGroupStyled,
  RadioStack,
  TruckImage,
  DateText,
  DeliveryOptionsTypography,
} from "./PrimaryComponentStyled";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useMobileCheck } from "../../utility/isMobile";
import { DateFormate } from "../../utility/DateFormate";
import { PayandClickDeliveryOptions } from "./PayandClickDeliveryOptions";
import { PayAndPick } from "./PayAndPick";
import { StandardDeliveryOptions } from "./StandardDeliveryOptions";
import { ExpressDeliveryOptions } from "./ExpressDeliveryOptions";
import { useRecoilState } from "recoil";
import { SSBLogos, userState } from "../../recoilstore";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  DELIVERY_OPTION_AVAILABLE,
  EXPRESS_CUSTOM_TEXT,
} from "../../utility/Constants";
import CartStoreInterface from "../../schemas/cartStoreAtom";
import { RadioButtonIcon } from "../../utility/CartUtilities";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  CART_TRUCK_ICON,
  CHECKED_RADIO_ICON,
  COD_ICON,
  UNCHECKED_RADIO_ICON,
} from "../../utility/AppIcons";
import { FETCH_CUSTOMER_WALLET } from "../../graphQLQueries/MyProfileQuery";
import client from "../../apollo-client";
import handleErrorResponse from "../../utility/ErrorHandling";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const PrimaryComponent = ({
  CartAddressData,
  setLoader,
  handleSnackBar,
  handleErrorAlert,
  cartStore,
  setCartStore,
}: any) => {
  const { data } = CartAddressData;
  const [SSBeautyLogos] = useRecoilState(SSBLogos);
  const [deliveryOptionsValue, setDeliveryOptionsValue] = useState<
    string | null
  >(cartStore?.currentDeliveryMode || "sd");
  const [standardDelivery, setStandardDelivery] = useState(true);
  const [payAndPickUp, setPayAndPickUp] = useState(false);
  const [expressDelivery, setExpressDelivery] = useState(false);
  const isMobile = useMobileCheck();
  const [checkedRadioButtonIcon, setCheckedRadioButtonIcon] = useState<
    any | null
  >(null);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [unCheckedRadioButtonIcon, setUnCheckedRadioButtonIcon] = useState<
    any | null
  >(null);

  const fetchCustomerWalletQuery = async () => {
    client
      .query({
        query: FETCH_CUSTOMER_WALLET,
        fetchPolicy: "no-cache",
      })
      .then((response: any) => {
        setUserDataItems({
          ...userDataItems,
          walletNumber: response?.data?.customer?.wallet_number,
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setCheckedRadioButtonIcon(
      SSBeautyLogos?.appLogos?.find(
        (item: any) => item?.name == CHECKED_RADIO_ICON
      )
    );
    setUnCheckedRadioButtonIcon(
      SSBeautyLogos?.appLogos?.find(
        (item: any) => item?.name == UNCHECKED_RADIO_ICON
      )
    );
    if (
      !userDataItems?.walletNumber ||
      userDataItems?.walletNumber === "na" ||
      userDataItems?.walletNumber === null
    ) {
      fetchCustomerWalletQuery();
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryOptionsValue(event.target.value);
    handleDeliveryModes(event.target.value);
  };
  const handleDeliveryModes = (mode: string) => {
    if (mode == "Standard Delivery" || mode == "sd") {
      setDeliveryOptionsValue("sd");
      setStandardDelivery(true);
      setPayAndPickUp(false);
      setExpressDelivery(false);
    }
    if (mode == "Pay and Pick up" || mode == "cc") {
      setDeliveryOptionsValue("cc");
      setPayAndPickUp(true);
      setStandardDelivery(false);
      setExpressDelivery(false);
    }
    if (mode == "Express Delivery" || mode == "ed") {
      setDeliveryOptionsValue("ed");
      setExpressDelivery(true);
      setStandardDelivery(false);
      setPayAndPickUp(false);
    }
  };

  useEffect(() => {
    if (!cartStore?.currentDeliveryMode) {
      handleDeliveryModes("sd"); //initially sd should be on.
    } else {
      if (
        cartStore?.currentDeliveryMode == "sd" ||
        cartStore?.currentDeliveryMode == "cc" ||
        cartStore?.currentDeliveryMode == "ed"
      ) {
        handleDeliveryModes(cartStore?.currentDeliveryMode);
      } else {
        setDeliveryOptionsValue(null);
      }
    }
  }, [cartStore?.serviceability]);
  const updateCurrentDeliveryMethod = (mode: string | null) => {
    setCartStore((perviousData: CartStoreInterface) => ({
      ...perviousData,
      currentDeliveryMode: mode,
    }));
  };
  useEffect(() => {
    standardDelivery && updateCurrentDeliveryMethod("sd");
    payAndPickUp && updateCurrentDeliveryMethod("cc");
    expressDelivery && updateCurrentDeliveryMethod("ed");
  }, [standardDelivery, payAndPickUp, expressDelivery]);
  const CODImage = AppIcons(COD_ICON);
  const CartTruckImage = AppIcons(CART_TRUCK_ICON);

  const deliveryTypeUI = () => {
    return (
      <>
        {payAndPickUp &&
          cartStore?.currentDeliveryMode == deliveryOptionsValue && (
            <EstimatedDeliveryStack
              direction="row"
              sx={{ display: isMobile ? "none" : "" }}
            >
              <TruckImage
                src={`${ReplaceImage(CODImage?.url)}`}
                alt="truck-image"
              />
              <EstimatedDeliveryTypography>
                {cartStore?.serviceability?.cc
                  ? "Select your pick up store from below "
                  : "Not Available For Pay and Pick Up"}
              </EstimatedDeliveryTypography>
            </EstimatedDeliveryStack>
          )}
        {expressDelivery &&
          cartStore?.currentDeliveryMode == deliveryOptionsValue && (
            <EstimatedDeliveryStack
              direction="row"
              sx={{ display: isMobile ? "none" : "" }}
            >
              <TruckImage
                src={`${ReplaceImage(CartTruckImage?.url)}`}
                alt="truck-image"
              />
              <EstimatedDeliveryTypography>
                {cartStore?.serviceability?.ed ? (
                  <DeliveryEstimationText $isMobile={isMobile}>
                        Estimated Delivery by{" "}
                        <DateText $isMobile={isMobile}>
                          {cartStore?.expressDeliveryDate}
                       </DateText>
                  </DeliveryEstimationText>
                ) : (
                  "Not available for this location"
                )}
              </EstimatedDeliveryTypography>
            </EstimatedDeliveryStack>
          )}
        {standardDelivery &&
          cartStore?.currentDeliveryMode == deliveryOptionsValue && (
            <>
              <EstimatedDeliveryStack
                direction="row"
                sx={{ display: isMobile ? "none" : "" }}
                isMobile={isMobile}
              >
                {cartStore?.serviceability?.sd &&
                  DateFormate(cartStore?.standardDeliveryDate) !=
                    "NaNth, undefined NaN" && (
                    <TruckImage
                      src={`${ReplaceImage(CartTruckImage?.url)}`}
                      alt="truck-image"
                    />
                  )}
                {!cartStore?.serviceability?.sd && (
                  <TruckImage
                    src={`${ReplaceImage(CartTruckImage?.url)}`}
                    alt="truck-image"
                  />
                )}
                <EstimatedDeliveryTypography>
                  {cartStore?.serviceability?.sd
                    ? DateFormate(cartStore?.standardDeliveryDate) !=
                        "NaNth, undefined NaN" && (
                        <DeliveryEstimationText $isMobile={isMobile}>
                          Estimated Delivery by{" "}
                          <DateText $isMobile={isMobile}>{` ${
                            cartStore?.standardDeliveryDate
                          }`}</DateText>
                        </DeliveryEstimationText>
                      )
                    : "Not available for this location"}
                </EstimatedDeliveryTypography>
              </EstimatedDeliveryStack>
            </>
          )}
      </>
    );
  };
  console.log(userDataItems,"test")
  return (
    <Fragment>
      <Stack>
        <PrimaryBox>
          <PrimaryBoxOne>
            {isMobile && (
              <DeliveryOptionsTypography>
                {DELIVERY_OPTION_AVAILABLE}
              </DeliveryOptionsTypography>
            )}
            <FormControl>
              <RadioGroupStyled
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={
                  cartStore?.serviceability?.sd ||
                  cartStore?.serviceability?.cc ||
                  cartStore?.serviceability?.ed
                    ? deliveryOptionsValue
                    : null
                }
                onChange={handleChange}
                style={{ whiteSpace: "nowrap" }}
              >
                <RadioStack
                  direction={{ xs: "column", sm: "row" }}
                  isMobile={isMobile}
                >
                  <FormControlLabel
                    value="sd"
                    sx={{ color: "#656263" }}
                    control={
                      <Radio
                        disabled={!cartStore?.serviceability?.sd}
                        checkedIcon={
                          <RadioButtonIcon
                            imageUrl={checkedRadioButtonIcon?.url}
                          />
                        }
                        icon={
                          <RadioButtonIcon
                            imageUrl={unCheckedRadioButtonIcon?.url}
                          />
                        }
                      />
                    }
                    label="Standard Delivery"
                  />
                  {standardDelivery &&
                    cartStore?.currentDeliveryMode == deliveryOptionsValue && (
                      <EstimatedDeliveryStack
                        direction="row"
                        sx={{
                          display: isMobile ? "visible" : "none",
                          paddingTop: isMobile ? "4px" : "",
                        }}
                        isMobile={isMobile}
                      >
                        <EstimatedDeliveryTypography>
                          {cartStore?.serviceability?.sd
                            ? DateFormate(cartStore?.standardDeliveryDate) !=
                                "NaNth, undefined NaN" && (
                                <DeliveryEstimationText $isMobile={isMobile}>
                                  Estimated Delivery by{" "}
                                  <DateText
                                    $isMobile={isMobile}
                                  >{` ${
                                    cartStore?.standardDeliveryDate
                                  }`}</DateText>
                                </DeliveryEstimationText>
                              )
                            : "Standard Delivery not available for the given pincode."}
                        </EstimatedDeliveryTypography>
                      </EstimatedDeliveryStack>
                    )}
                  <FormControlLabel
                    value="ed"
                    sx={{ color: "#656263" }}
                    control={
                      <Radio
                        disabled={
                          userDataItems?.storeMode
                            ? userDataItems?.storeModeType === "sd"
                            : !cartStore?.serviceability?.ed
                        }
                        checkedIcon={
                          <RadioButtonIcon
                            imageUrl={checkedRadioButtonIcon?.url}
                          />
                        }
                        icon={
                          <RadioButtonIcon
                            imageUrl={unCheckedRadioButtonIcon?.url}
                          />
                        }
                      />
                    }
                    label="Express Delivery"
                  />
                  {expressDelivery &&
                    cartStore?.currentDeliveryMode == deliveryOptionsValue && (
                      <EstimatedDeliveryStack
                        direction="row"
                        sx={{ display: isMobile ? "visible" : "none" }}
                        isMobile={isMobile}
                      >
                        <EstimatedDeliveryTypography>
                          {cartStore?.serviceability?.ed ? (
                            <DeliveryEstimationText $isMobile={isMobile}>
                                  Estimated Delivery by
                                  <DateText
                                    $isMobile={isMobile}
                                  >
                                    {cartStore?.expressDeliveryDate}
                                  </DateText>
                                {/* </> */}
                              {/* )} */}
                            </DeliveryEstimationText>
                          ) : (
                            "Express Delivery not available for the given pincode."
                          )}
                        </EstimatedDeliveryTypography>
                      </EstimatedDeliveryStack>
                    )}
                  <FormControlLabel
                    value="cc"
                    sx={{ color: "#656263" }}
                    control={
                      <Radio
                        // disabled={  
                        //   userDataItems?.storeMode
                        //     ? userDataItems?.storeModeType === "sd"
                        //     : !cartStore?.serviceability?.cc
                        // }
                         disabled={  
                          userDataItems?.storeMode
                            ? userDataItems?.storeModeType === "sd"
                            : true
                        }
                        checkedIcon={
                          <RadioButtonIcon
                            imageUrl={checkedRadioButtonIcon?.url}
                          />
                        }
                        icon={
                          <RadioButtonIcon
                            imageUrl={unCheckedRadioButtonIcon?.url}
                          />
                        }
                      />
                    }
                    label="Pay and Pick up"
                  />
                  {payAndPickUp &&
                    cartStore?.currentDeliveryMode == deliveryOptionsValue && (
                      <EstimatedDeliveryStack
                        direction="row"
                        sx={{ display: isMobile ? "visible" : "none" }}
                        isMobile={isMobile}
                      >
                        <EstimatedDeliveryTypography>
                          {cartStore?.serviceability?.cc
                            ? "Select your pick up store from below and add the billing address to continue"
                            : "Not Available For Pay and Pick Up "}
                        </EstimatedDeliveryTypography>
                      </EstimatedDeliveryStack>
                    )}
                </RadioStack>
              </RadioGroupStyled>
            </FormControl>
            {deliveryTypeUI()}
          </PrimaryBoxOne>
        </PrimaryBox>
        {payAndPickUp ? (
          <PayAndPick
            setLoader={setLoader}
            handleErrorAlert={handleErrorAlert}
            handleSnackBar={handleSnackBar}
            cartStore={cartStore}
            setCartStore={setCartStore}
          />
        ) : null}
        {/* For displaying customer addresses */}
        {payAndPickUp && cartStore?.serviceabilityStores?.length ? (
          <PayandClickDeliveryOptions
            selectBillingAddress={data?.selectBillingAddress}
            selectDeliveryAddress={data?.selectDeliveryAddress}
            setLoader={setLoader}
            handleErrorAlert={handleErrorAlert}
            handleSnackBar={handleSnackBar}
            cartStore={cartStore}
            setCartStore={setCartStore}
          />
        ) : null}
        {standardDelivery && (
          <StandardDeliveryOptions
            selectBillingAddress={data?.selectBillingAddress}
            selectDeliveryAddress={data?.selectDeliveryAddress}
            setLoader={setLoader}
            handleErrorAlert={handleErrorAlert}
            handleSnackBar={handleSnackBar}
            cartStore={cartStore}
            setCartStore={setCartStore}
          />
        )}
        {expressDelivery && (
          <ExpressDeliveryOptions
            selectBillingAddress={data?.selectBillingAddress}
            selectDeliveryAddress={data?.selectDeliveryAddress}
            setLoader={setLoader}
            handleErrorAlert={handleErrorAlert}
            handleSnackBar={handleSnackBar}
            cartStore={cartStore}
            setCartStore={setCartStore}
          />
        )}
      </Stack>
    </Fragment>
  );
};
export default PrimaryComponent;
