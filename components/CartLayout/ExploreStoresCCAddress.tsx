import { Box, Divider, Radio, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../../recoilstore";
import { GetCartAddresses } from "../../utility/CartServiceability";
import { RadioButtonIcon } from "../../utility/CartUtilities";
import {
  SELECT_BILLING_ADDRESS,
  SAVED_ADDRESS,
} from "../../utility/Constants";
import AddressComponent from "../CartAddress/AddressComponent";
import {
  FormControlLabelStyled,
  FormControlStyled,
  StyledRadioGroup,
} from "../CartAddress/AddressComponentStyled";
import {
  CHECKED_RADIO_ICON,
  UNCHECKED_RADIO_ICON,
} from "../../utility/AppIcons";
import { AppIcons } from "../../utility/AppIconsConstant";
import { useMobileCheck } from "../../utility/isMobile";
import { AddNewBillingAddress } from "../CartAddress/AddNewBillingAddress";
import { StyledButton } from "./CartLayoutStyles";
import { BillingAddress, ShippingAddress } from "../../api/Cart/CustomerCart";

export function ExploreStoresCCAddress({
  setLoader,
  handleErrorAlert,
  handleClose,
}: {
  setLoader: any;
  handleErrorAlert: any;
  handleClose:any
}) {
  const [checkedRadioButtonIcon, setCheckedRadioButtonIcon] = useState<
    any | null
  >(AppIcons(CHECKED_RADIO_ICON));
  const [unCheckedRadioButtonIcon, setUnCheckedRadioButtonIcon] = useState<
    any | null
  >(AppIcons(UNCHECKED_RADIO_ICON));
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const isMobile = useMobileCheck();

  const [addressId, setAddressId] = useState<any>(
    cartStore?.userDeliveryAddress?.cc?.billingAddress !== null
      ? cartStore?.userAddresses?.addresses.filter(
          (address: any) =>
            address.postcode ===
            cartStore?.userDeliveryAddress?.cc?.billingAddress?.postcode
        )[0]?.id
        ? cartStore?.userAddresses?.addresses.filter(
            (address: any) =>
              address.postcode ===
              cartStore?.userDeliveryAddress?.cc?.billingAddress?.postcode
          )[0]?.id
        : cartStore?.userAddresses?.addresses?.filter(
            (keyAdd: any) => keyAdd?.default_billing === true
          )?.[0]?.id
        ? cartStore?.userAddresses?.addresses?.filter(
            (keyAdd: any) => keyAdd?.default_billing === true
          )?.[0]?.id
        : cartStore?.userAddresses?.addresses?.[0]?.id
      : cartStore?.userAddresses?.addresses?.filter(
          (keyAdd: any) => keyAdd?.default_billing === true
        )?.[0]?.id
      ? cartStore?.userAddresses?.addresses?.filter(
          (keyAdd: any) => keyAdd?.default_billing === true
        )?.[0]?.id
      : cartStore?.userAddresses?.addresses?.[0]?.id
  );

  useEffect(() => {
    setLoader(true);
    const getAddress = async () => {
      await GetCartAddresses(setCartStore);
      setLoader(false);
    };
    getAddress();
  }, []);

  const handleContinue = async () => {
    setLoader(true);
    const addressData = cartStore?.userAddresses?.addresses.find(
      (address: any) => address.id === addressId
    );
    if (addressData) {
      setCartStore((previousData: any) => ({
        ...previousData,
        userDeliveryAddress: {
          ...previousData.userDeliveryAddress,
          cc: {
            billingAddress: addressData,
          },
        },
      }));
      try {
        const billingResponse = await BillingAddress(addressData);
        if (billingResponse?.data) {
          await ShippingAddress(addressData, 1);
        }
      } catch (error) {
      } finally {
        setLoader(false);
        handleClose();
        
      }
    } else {
      setLoader(false);
    }
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event?.target?.value);
    setAddressId(id);
  };

  return (
    <Box sx={{ margin: "20px 20px 20px 20px", position: "relative" }}>
      <Typography
        sx={{ fontWeight: "700", fontSize: "16px", marginBottom: "12px" }}
      >
        {SELECT_BILLING_ADDRESS}
      </Typography>
      <AddNewBillingAddress
        setLoader={setLoader}
        handleErrorAlert={handleErrorAlert}
        handleSnackBar={() => {}}
      />
      {cartStore?.userAddresses && (
        <Box>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "14px",
              padding: "10px 0px 10px 0px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Divider orientation="horizontal">
              <Typography>or</Typography>
            </Divider>
          </Typography>
          <Typography
            sx={{ fontWeight: "600", fontSize: "12px", color: "#A7A5A6" }}
          >
            {SAVED_ADDRESS}
          </Typography>
          <FormControlStyled isMobile={isMobile}>
            <StyledRadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={addressId}
              onChange={handleAddressChange}
              style={{ position: "relative", float: "right" }}
            >
              {cartStore?.userAddresses?.addresses?.map(
                (address: any, index: any) => {
                  return (
                    <Box
                      sx={{
                        border: "1px solid #DEDEDE",
                        padding: isMobile ? "12px 16px" : "20px",
                        marginLeft: isMobile ? "9%" : "",
                        marginBottom: "16px",
                        position: "relative",
                      }}
                    >
                      <FormControlLabelStyled
                        labelPlacement="start"
                        label=""
                        control={
                          <Radio
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
                        value={address?.id}
                        sx={{
                          display: "flex",
                          position: "relative",
                          float: "right",
                          bottom: isMobile ? "86%" : "6px",
                          right: isMobile ? "103%" : "",
                          marginRight: isMobile
                            ? "14px !important"
                            : "-6px !important",
                          marginTop: isMobile
                            ? "-18px !important"
                            : "0px !important",
                        }}
                      />
                      <AddressComponent
                        address={address}
                        setLoader={setLoader}
                        editVisible={true}
                        handleErrorAlert={handleErrorAlert}
                        cartStore={cartStore}
                        setCartStore={setCartStore}
                      />
                    </Box>
                  );
                }
              )}
            </StyledRadioGroup>
          </FormControlStyled>
        </Box>
      )}
      <StyledButton
        $isCartPage={true}
        fullWidth
        onClick={() => addressId && handleContinue()}
        sx={{
          opacity: addressId ? "1" : "0.5",
          position: "sticky",
          bottom: 5,
          marginBottom: "4px",
        }}
      >
        {"Continue"}
      </StyledButton>
    </Box>
  );
}
