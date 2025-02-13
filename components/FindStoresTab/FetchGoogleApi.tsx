import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import GoogleMapReact from "google-map-react";
import { useMobileCheck } from "../../utility/isMobile";
import {
  TooltipBox,
  TooltipExpandImg,
  PinPointTooltipText,
  TooltipImgAndTypography,
} from "./FindStoresStyle";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { capturedGoogleMapKey } from "./Constants";
import { SingleStoreTiming } from "./SingleStoreTiming";

const MarkerPoint = ({ icon, store, expandImg, setSelectedStore }: any) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Box sx={{ cursor: "pointer" }}>
        <Tooltip
          PopperProps={{
            sx: {
              "& .MuiTooltip-tooltip": {
                backgroundColor: "#fff",
                border: "0.3px solid #DEA3B7",
                borderRadius: "0%",
                color: "#333",
              },
              "& .MuiTooltip-arrow": {
                color: "#fff",
              },
            },
          }}
          title={
            <TooltipBox>
              <TooltipImgAndTypography>
                <PinPointTooltipText>{store?.displayName}</PinPointTooltipText>
                <IconButton>
                  <TooltipExpandImg
                    src={expandImg}
                    alt="Expand Image"
                    onClick={() => setSelectedStore(store)}
                  />
                </IconButton>
              </TooltipImgAndTypography>
              <SingleStoreTiming
                storeValues={store?.openingHours?.weekDayOpeningList}
              />
            </TooltipBox>
          }
          placement="top"
          open={opened}
          arrow
        >
          <img
            onClick={() => setOpened(!opened)}
            src={icon}
            alt="Map Pin-Point"
          />
        </Tooltip>
      </Box>
    </>
  );
};

interface StoreRelatedVariableDeclaration {
  stores: Array<any>;
  setSelectedStore: Function;
  expandMoreImg: string;
}

const FetchGoogleApi = ({
  stores,
  expandMoreImg,
  setSelectedStore,
}: StoreRelatedVariableDeclaration) => {
  const isMobile = useMobileCheck();
  const CMSImageUrl = process.env.NEXT_PUBLIC_S3_URL;
  const location_waring = `${CMSImageUrl}/location_warning_ae9290fde1.png`;
  const mapPinPointIcon = `${ReplaceImage(location_waring)}`;
  const defaultProps = {
    center: {
      lat: stores?.[0]?.geoPoint?.latitude,
      lng: stores?.[0]?.geoPoint?.longitude,
    },
    zoom: isMobile ? 4 : 10,
  };

  const handleApiLoaded = (map: any, maps: any) => {
    console.log("maps loadded");
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: capturedGoogleMapKey }}
          center={defaultProps.center}
          zoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {stores?.map((store: any) => (
            <MarkerPoint
              key={`${store?.geoPoint?.latitude} ${store?.geoPoint?.longitude}`}
              setSelectedStore={setSelectedStore}
              expandImg={expandMoreImg}
              store={store}
              lat={store?.geoPoint?.latitude}
              lng={store?.geoPoint?.longitude}
              icon={mapPinPointIcon}
            />
          ))}
        </GoogleMapReact>
      </div>
    </Box>
  );
};

export default FetchGoogleApi;
