import React, { Fragment, useRef } from "react";
import TextFieldHOC from "../../../HOC/TextField/TextField";
import { ADD_NEW_ADDRESS, EDIT_ADDRESS } from "../../../utility/Constants";
import {
  ADD_ADDRESS_TEXT,
  UPDATE_ADDRESS_TEXT,
} from "../../Accounts/constants";
import { callEventMyProfile } from "../../MyProfileLayout/MyprofileAnalytics";
import {
  AddAddressButton,
  AddAddressTypography,
  AddressFormsBox,
  CheckBoxStyle,
  LocationNameTextField,
  MainBox,
  ModalHeaderText,
  SelectSizeList,
  ShippingTypography,
  SizeTab,
  TextFieldAddress,
  TextFieldBox,
} from "./EditAddressStyles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import {inputLabelClasses}from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
export const EditAddressUI = (props: any) => {
  const {
    handleChange,
    isMobile,
    values,
    error,
    handleInputChange,
    tabValue,
    isFromCart,
    editingData,
    errorMessage,
    pinCodeError,
    errorMessages,
    handleTabsChange,
    addressSaveTab,
    setAddressSaveTab,
    handleAddAddress,
    isDisabled,
    UnCheckedIcon,
    CheckedIcon,
    checked,
    handleCheck,
  } = props;
  const buttonText = useRef<any>();
  return (
    <Fragment>
      {" "}
      <MainBox
        pl={isMobile ? "" : 7.5}
        pr={isMobile ? "" : 8}
        pt={isMobile ? "" : "21px"}
        m={isMobile ? "16px" : ""}
      >
        {" "}
        <Box m={isMobile ? "32px 16px 25px 16px" : ""}>
          {" "}
          {isFromCart && (
            <ModalHeaderText $isMobile={isMobile}>
              {" "}
              {editingData === null ? ADD_NEW_ADDRESS : EDIT_ADDRESS}
            </ModalHeaderText>
          )}
          <TextFieldBox isMobile={isMobile}>
            {" "}
            <TextFieldHOC
              border="unset"
              borderRadius="0px"
              TextFieldHeight="49px"
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={values.name}
              name="name"
              isColor={true}
              error={error?.name}
              helperText={error?.name && errorMessage.name}
              onChange={handleInputChange}
              InputLabelPropsColor={{
                color: "#231F20",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
                paddingTop: "4px",
              }}
            />{" "}
          </TextFieldBox>{" "}
          <TextFieldBox isMobile={isMobile}>
            {" "}
            <TextFieldHOC
              border="unset"
              borderRadius="0px"
              TextFieldHeight="49px"
              id="outlined-basic"
              label="Mobile No."
              variant="outlined"
              value={values.mobile}
              error={error?.mobile}
              type="Number"
              inputProps={{ pattern: ["/d*"] }}
              onKeyDown={(event: any) => {
                ["e", "E", "+", "-", "."]?.includes(event.key) &&
                  event.preventDefault();
              }}
              helperText={error?.mobile && errorMessage.mobile}
              name="mobile"
              onChange={handleInputChange}
              InputLabelPropsColor={{
                color: "#231F20",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
                paddingTop: "4px",
              }}
            />{" "}
          </TextFieldBox>{" "}
          <TextFieldBox isMobile={isMobile}>
            {" "}
            <TextFieldHOC
              border="unset"
              borderRadius="0px"
              TextFieldHeight="49px"
              id="outlined-basic"
              label="Pin Code"
              variant="outlined"
              name="pinCode"
              type="tel"
              value={values?.pinCode}
              onChange={(e: { target: { value: any } }) => {
                const { value } = e.target;

                if (/^\d{0,6}$/.test(value)) {
                  handleInputChange(e);
                }
              }}
              error={error?.pinCode || pinCodeError}
              helperText={
                error?.pinCode
                  ? "Pincode should contain 6 digits"
                  : pinCodeError && errorMessages
              }
              InputLabelPropsColor={{
                color: "#231F20",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
                paddingTop: "4px",
              }}
              inputProps={{
                maxLength: 6,
              }}
              onKeyDown={(event: {
                key: string;
                preventDefault: () => void;
              }) => {
                if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                  event.preventDefault();
                }
              }}
            />
          </TextFieldBox>
          <TextFieldBox isMobile={isMobile}>
            {" "}
            <TextFieldHOC
              border="unset"
              borderRadius="0px"
              TextFieldHeight="49px"
              id="outlined-basic"
              label="City"
              variant="outlined"
              fullWidth
              value={values?.city}
              disabled={true}
              name="city"
              onChange={handleInputChange}
              InputLabelPropsColor={{
                color: "#231F20",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
                paddingTop: "4px",
              }}
            />{" "}
          </TextFieldBox>{" "}
          <TextFieldBox isMobile={isMobile}>
            {" "}
            <TextFieldHOC
              border="unset"
              borderRadius="0px"
              TextFieldHeight="49px"
              id="outlined-basic"
              label="State"
              variant="outlined"
              fullWidth
              value={values?.state}
              disabled={true}
              name="state"
              onChange={handleChange}
              InputLabelPropsColor={{
                color: "#231F20",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
                paddingTop: "4px",
              }}
            />{" "}
          </TextFieldBox>{" "}
          <TextFieldBox isMobile={isMobile}>
            {" "}
            <TextFieldAddress
              id="outlined-basic"
              label="Address"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={values?.address}
              name="address"
              onChange={handleInputChange}
              error={error?.address}
              helperText={error?.address && errorMessage?.address}
              InputLabelProps={{
                sx: {
                  color: "#231F20",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  paddingTop: "4px",
                  [`&.${inputLabelClasses.shrink}`]: {
                    color: "#AD184C",
                    fontWeight: "500",
                    fontSize: "12px",
                    lineHeight: "150%",
                  },
                },
              }}
        />{" "}
          </TextFieldBox>{" "}
          <CheckBoxStyle isMobile={isMobile}>
            {" "}
            <Checkbox
              checked={checked}
              onChange={handleCheck}
              sx={{
                color: "#231F20",
                padding: "0px !important",
                width: "18px",
              }}
              icon={<UnCheckedIcon />}
              checkedIcon={<CheckedIcon />}
            />{" "}
            <ShippingTypography>
              {" "}
              Use this as the default shipping address{" "}
            </ShippingTypography>{" "}
          </CheckBoxStyle>{" "}
          <Box sx={{ paddingTop: isMobile ? "" : "20px" }}>
            {" "}
            <Grid container>
              {" "}
              <Grid item xs={5.5}>
                {" "}
                <SelectSizeList>
                  {" "}
                  <Stack direction="row" spacing={2}>
                    {" "}
                    <Box>
                      {" "}
                      <TabContext value={tabValue || "Home"}>
                        {" "}
                        <Box>
                          {" "}
                          <TabList
                            onChange={handleTabsChange}
                            sx={{
                              minHeight: "0px",
                              paddingRight: "0px",
                              paddingLeft: "0px",
                            }}
                            TabIndicatorProps={{ sx: { display: "none" } }}
                          >
                            {" "}
                            <SizeTab label="Home " value="Home" />{" "}
                            <SizeTab label="Work" value="Work" />{" "}
                            <SizeTab label="Other" value="Other" />{" "}
                          </TabList>{" "}
                        </Box>{" "}
                      </TabContext>{" "}
                    </Box>{" "}
                  </Stack>{" "}
                </SelectSizeList>{" "}
              </Grid>{" "}
              {tabValue === "Other" && (
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {" "}
                  <LocationNameTextField
                    isMobile={isMobile}
                    id="outlined-textarea"
                    label=""
                    variant="filled"
                    placeholder="Location's Name"
                    value={addressSaveTab}
                    onChange={(e: any) => {
                      setAddressSaveTab(e.target.value);
                    }}
                  />{" "}
                </Grid>
              )}{" "}
            </Grid>{" "}
          </Box>{" "}
          <AddressFormsBox isMobile={isMobile}>
            {" "}
            <AddAddressButton
              isMobile={isMobile}
              onClick={() => {
                handleAddAddress();
                callEventMyProfile(
                  editingData?.id ? UPDATE_ADDRESS_TEXT : ADD_ADDRESS_TEXT,
                  tabValue
                );
              }}
              disabled={isDisabled}
              ref={buttonText}
            >
              {" "}
              <AddAddressTypography>
                {" "}
                {editingData?.id ? UPDATE_ADDRESS_TEXT : ADD_ADDRESS_TEXT}{" "}
              </AddAddressTypography>{" "}
            </AddAddressButton>{" "}
          </AddressFormsBox>{" "}
        </Box>{" "}
      </MainBox>{" "}
    </Fragment>
  );
};
