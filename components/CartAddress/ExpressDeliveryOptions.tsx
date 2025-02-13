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
  DELIVERY_ADDRESS,
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
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import { UpdatePincode } from "../../utility/CartServiceability";
import { RadioButtonIcon } from "../../utility/CartUtilities";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  CHECKED_RADIO_ICON,
  UNCHECKED_RADIO_ICON,
} from "../../utility/AppIcons";

export function ExpressDeliveryOptions({
  selectBillingAddress,
  selectDeliveryAddress,
  handleSnackBar,
  setLoader,
  handleErrorAlert,
  typeOfDeliveryMode,
  cartStore,
  setCartStore,
}: any) {
  const isMobile = useMobileCheck();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [expressDeliveryAddressId, setExpressDeliveryAddressId] = useState(0);
  const [defaultAddress, setDefaultAddress] = useState<any>(null);
  const [otherAddress, setOtherAddress] = useState<any>(null);
  const checkedRadioButtonIcon = AppIcons(CHECKED_RADIO_ICON);
  const unCheckedRadioButtonIcon = AppIcons(UNCHECKED_RADIO_ICON);

  useEffect(() => {
    setDefaultAddress(
      cartStore?.userAddresses?.addresses?.filter(
        (address: any) => address?.default_billing == true
      )[0]
    );
    let otherAddressData = cartStore?.userAddresses?.addresses
      ?.filter(
        (address: any) => address?.default_billing != true
      )
      .reverse();
    if (otherAddressData?.length != 0) {
      const sa = otherAddressData?.filter(
        (address: any) =>
          address?.postcode == userDataItems?.pincode
      )?.[0];
      if (sa?.id) {
        otherAddressData?.sort(function (x: { id: any }, y: { id: any }) {
          return x?.id == sa?.id ? -1 : y?.id == sa?.id ? 1 : 0;
        });
      }
      setOtherAddress(otherAddressData);
    } else {
      setOtherAddress([]);
    }
  }, [cartStore?.userAddresses]);

  useEffect(() => {
    setExpressDeliveryAddressId(
      cartStore?.userAddresses?.addresses?.filter(
        (address: any) =>
          address?.postcode == userDataItems?.pincode
      )[0]?.id
    );
  }, [cartStore?.currentDeliveryMode]);

  useEffect(() => {
    const addressData = cartStore?.userAddresses?.addresses.filter(
      (address: any) => address.id === expressDeliveryAddressId
    );
    if (addressData?.length !== 0) {
      setCartStore((prevoiusData: any) => ({
        ...prevoiusData,
        userDeliveryAddress: {
          ...prevoiusData.userDeliveryAddress,
          ed: {
            billingAddress: addressData?.[0],
            shippingAddress: addressData?.[0],
          },
        },
      }));
    } else {
      if (addressData?.length !== 0) {
        setCartStore((prevoiusData: any) => ({
          ...prevoiusData,
          userDeliveryAddress: {
            ...prevoiusData.userDeliveryAddress,
            ed: {
              billingAddress: null,
              shippingAddress: null,
            },
          },
        }));
      }
    }
  }, [expressDeliveryAddressId, cartStore?.userAddresses]);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event?.target?.value);
    const addressData = cartStore?.userAddresses?.addresses.filter(
      (address: any) => address.id === id
    );
    const changePincode = async () => {
      const response = await UpdatePincode(
        addressData?.[0]?.postcode,
        setUserDataItems
      );
      if (response?.error) {
        setLoader(false);
        handleErrorAlert(response?.error);
      } else {
        setExpressDeliveryAddressId(id);
      }
    };
    changePincode();
  };

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
          {typeOfDeliveryMode ? selectBillingAddress : selectDeliveryAddress}
        </SelectDeliveryAddressTypography>
        <FormControlStyled isMobile={isMobile}>
          <StyledRadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={expressDeliveryAddressId}
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
            {otherAddress && (
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
