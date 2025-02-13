import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import React, { useEffect, useState } from "react";
import AddressComponent from "./AddressComponent";
import {
  FormControlStyled,
  StyledRadioGroup,
  FormControlLabelStyled,
} from "./AddressComponentStyled";
import {
  DEFAULT_ADDRESS,
  OTHER_ADDRESS,
  BILLING_ADDRESS,
  SELECT_TEXT,
} from "../../utility/Constants";
import {
  SecondaryBox,
  SelectDeliveryAddressTypography,
  DefaultAddressTypography,
  OtherAddressTypography,
  SubTitle,
} from "./PrimaryComponentStyled";
import { useMobileCheck } from "../../utility/isMobile";
import { AddNewBillingAddress } from "./AddNewBillingAddress";
import { RadioButtonIcon } from "../../utility/CartUtilities";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  CHECKED_RADIO_ICON,
  UNCHECKED_RADIO_ICON,
} from "../../utility/AppIcons";
export function PayandClickDeliveryOptions({
  selectBillingAddress,
  handleSnackBar,
  handleErrorAlert,
  setLoader,
  cartStore,
  setCartStore,
}: any) {
  const isMobile = useMobileCheck();
  const checkedRadioButtonIcon = AppIcons(CHECKED_RADIO_ICON);
  const unCheckedRadioButtonIcon = AppIcons(UNCHECKED_RADIO_ICON);
  const [defaultAddress, setDefaultAddress] = useState<any>(null);
  const [otherAddress, setOtherAddress] = useState<any>(null);

  useEffect(() => {
    setDefaultAddress(
      cartStore?.userAddresses?.addresses?.filter(
        (address: any) => address?.default_billing == true
      )[0]
    );
  }, [cartStore?.userAddresses]);

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

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event?.target?.value);
    setAddressId(id);
  };

  useEffect(() => {
    const addressData = cartStore?.userAddresses?.addresses.filter(
      (address: any) => address.id === addressId
    );
    let otherAddressData = cartStore?.userAddresses?.addresses
      ?.filter(
        (address: any) => address?.default_billing != true
      )
      .reverse();
    if (addressData?.[0]?.id) {
      otherAddressData?.sort(function (x: { id: any }, y: { id: any }) {
        return x?.id == addressData?.[0]?.id
          ? -1
          : y?.id == addressData?.[0]?.id
          ? 1
          : 0;
      });
    }
    setOtherAddress(otherAddressData);
    if (addressData?.length !== 0) {
      setCartStore((prevoiusData: any) => ({
        ...prevoiusData,
        userDeliveryAddress: {
          ...prevoiusData.userDeliveryAddress,
          cc: {
            billingAddress: addressData?.[0],
          },
        },
      }));
    } else {
      setCartStore((prevoiusData: any) => ({
        ...prevoiusData,
        userDeliveryAddress: {
          ...prevoiusData.userDeliveryAddress,
          cc: {
            billingAddress: null,
          },
        },
      }));
    }
  }, [addressId, cartStore?.userAddresses]);

  const AddressOption = ({ address }: any) => {
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
                <RadioButtonIcon imageUrl={checkedRadioButtonIcon?.url} />
              }
              icon={
                <RadioButtonIcon imageUrl={unCheckedRadioButtonIcon?.url} />
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
            marginRight: isMobile ? "14px !important" : "-6px !important",
            marginTop: isMobile ? "-18px !important" : "0px !important",
          }}
        />
        <AddressComponent
          address={address}
          setLoader={setLoader}
          handleSnackBar={handleSnackBar}
          handleErrorAlert={handleErrorAlert}
          cartStore={cartStore}
          setCartStore={setCartStore}
        />
      </Box>
    );
  };

  return (
    <>
      <SecondaryBox>
        <SelectDeliveryAddressTypography isMobile={isMobile}>
          {selectBillingAddress}
        </SelectDeliveryAddressTypography>
        <FormControlStyled isMobile={isMobile}>
          <StyledRadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={addressId}
            onChange={handleAddressChange}
            style={{ position: "relative", float: "right" }}
          >
            {defaultAddress ? (
              <>
                <DefaultAddressTypography $isMobile={isMobile}>
                  {DEFAULT_ADDRESS}
                </DefaultAddressTypography>
                <AddressOption address={defaultAddress} />
                {/* For adding new customer address */}
                <AddNewBillingAddress
                  setLoader={setLoader}
                  handleErrorAlert={handleErrorAlert}
                  handleSnackBar={handleSnackBar}
                />
              </>
            ) : (
              <AddNewBillingAddress
                setLoader={setLoader}
                handleErrorAlert={handleErrorAlert}
                handleSnackBar={handleSnackBar}
              />
            )}
            {otherAddress?.length != 0 && (
              <>
                <OtherAddressTypography $isMobile={isMobile}>
                  {OTHER_ADDRESS}
                </OtherAddressTypography>
                {otherAddress?.map((addressItem: any) => (
                  <AddressOption address={addressItem} />
                ))}
              </>
            )}
          </StyledRadioGroup>
        </FormControlStyled>
      </SecondaryBox>
    </>
  );
}
