import React from "react";
import { Box } from "@mui/material";
import {
  ParticularStoreName,
  StoreAddressText,
  StorePhoneNumber,
} from "./MACServiceLocationStyles";

const ParticularLocation = ({ cities }: any) => {
  return (
    <>
      <Box>
        {cities?.name && <ParticularStoreName>{cities?.name}</ParticularStoreName>}
        {cities?.landmark && <StoreAddressText>{cities?.landmark}</StoreAddressText>}
        {cities?.line1 && <StoreAddressText>{cities?.line1}</StoreAddressText>}
        {cities?.line2 && <StoreAddressText>{cities?.line2},</StoreAddressText>}
        {cities?.street && <StoreAddressText>{cities?.street}</StoreAddressText>}
        {cities?.city && <StoreAddressText>{cities?.city}</StoreAddressText>}
        {cities?.pincode && <StoreAddressText>{`- ${cities?.pincode}`}</StoreAddressText>}
        {cities?.phone && <StorePhoneNumber>Tel: +91 {cities?.phone}</StorePhoneNumber>}
      </Box>
    </>
  );
};

export default ParticularLocation;
