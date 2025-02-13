import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  AddressTypography,
  DirectionTypography,
  NameTypography,
} from "./SelectStoreComponentStyled";
import { useMobileCheck } from "../../utility/isMobile";
import { GoogleMapDirections } from "../../utility/GoogleMapDirections";
import { DIRECTION } from "../../utility/Constants";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { AppIcons } from "../../utility/AppIconsConstant";
import { GPS_LOCATION_ICON } from "../../utility/AppIcons";
const SelectStoreComponent = ({ store, userLat, userLng }: any) => {
  const isMobile = useMobileCheck();
  const locationIcon = AppIcons(GPS_LOCATION_ICON);
  return (
    <Fragment>
      <Stack direction="column" width={isMobile ? "auto%" : "auto"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <NameTypography $isMobile={isMobile}>
            {store?.line1} {store?.distance}
          </NameTypography>
        </Box>
      </Stack>
      <Box sx={{ pt: isMobile ? "14px" : "8px" }}>
        <AddressTypography $isMobile={isMobile}>
          {store?.line2}{" "}
        </AddressTypography>
        <AddressTypography $isMobile={isMobile}>
          {store?.city},{store?.state} - {store?.postcode}{" "}
        </AddressTypography>
        <Box
          sx={{
            paddingTop: isMobile ? "14px" : "20px",
            float: isMobile ? "right" : "left",
            display: "flex",
            gap: "4px",
          }}
        >
          {isMobile && (
            <img
              src={`${ReplaceImage(locationIcon?.url)}`}
              width={"14px"}
              height={"14px"}
              alt="Gps-Icon"
            />
          )}
          <DirectionTypography
            $isMobile={isMobile}
            onClick={() =>
              store?.latitude &&
              store?.longitude &&
              GoogleMapDirections(
                userLat,
                userLng,
                store?.latitude,
                store?.longitude
              )
            }
          >
            {store?.directionTypography || DIRECTION}
          </DirectionTypography>
        </Box>
      </Box>
    </Fragment>
  );
};
export default SelectStoreComponent;
