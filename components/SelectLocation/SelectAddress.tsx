import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { useMobileCheck } from "../../utility/isMobile";
import {
  TypographyCustName,
  TypographyAddress,
  TypographyNum,
  TypographyHeader,
  TypographyPlace,
} from "./SelectLocationStyles";

const SelectAddress = ({ option }: any) => {
  const isMobile = useMobileCheck();
  return (
    <Box sx={{ padding: "5px", width: "100%" }}>
      <fieldset
        style={{
          border: "1px solid #EAEAEA",
          padding: "10px",
        }}
      >
        {option?.default_billing == true ? (
          <legend
            style={{ fontWeight: "600", fontSize: "12px", color: "#AD184C" }}
          >
            Default Address
          </legend>
        ) : (
          ""
        )}
        <TypographyHeader
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {option?.default_billing == true && (
            <TypographyPlace isMobile={isMobile}>Default</TypographyPlace>
          )}
          {option?.save_as && (
            <TypographyPlace isMobile={isMobile}>
              {option?.save_as}
            </TypographyPlace>
          )}
          {option?.city && (
            <TypographyPlace isMobile={isMobile}>
              {option?.city}
            </TypographyPlace>
          )}
        </TypographyHeader>
        <TypographyCustName>
          {option?.firstname}
          {option?.lastname}
        </TypographyCustName>
        <TypographyAddress>{option?.addressDetails}</TypographyAddress>
        <TypographyAddress>{option?.street[0]}</TypographyAddress>
        <Typography sx={{ display: "flex", flexDirection: "row" }}>
          <TypographyAddress>{option?.city} - </TypographyAddress>
          <TypographyAddress>{option?.postcode}</TypographyAddress>
        </Typography>
        <TypographyNum>+91 {option?.telephone}</TypographyNum>
      </fieldset>
    </Box>
  );
};

export default SelectAddress;
