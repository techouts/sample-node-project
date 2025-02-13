import React, { useEffect } from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import {
  StoreTitle,
  AddressText,
  PhNumber,
  DirectionText,
  PhoneText,
} from "./FindStoresStyle";
import { storeDirectionText } from "./Constants";
import triggerGAEvent from "../../utility/GaEvents";
import { Widget_type } from "../../utility/GAConstants";
import { useMobileCheck } from "../../utility/isMobile";
import { StoreTimings } from "./StoreTimings";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import { useRouter } from "next/router";
import PhoneIcon from "@mui/icons-material/Phone";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import { getCartItems } from "../../HOC/ProductCard/ProductCardUtils";
import { SpecialCardImage } from "../../HOC/ProductCard/ProductCardStyles";
import { ReplaceImage } from "../../utility/ReplaceImage";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import toast from "react-hot-toast";

const FilteredStores = ({
  cities,
  title,
  lat,
  lng,
  setSignInOpen,
  setPopup,
  setCurrentStore,
  setCartData,
  handleSnackBar,
}: any) => {
  const isMobile = useMobileCheck();
  const { getItem, setItem } = useStorage();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const router = useRouter();
  const cookie = new Cookies();

  const redirectToGoogleMaps = (StoreLat: string, StoreLng: string) => {
      const storeLat = StoreLat || "";
    const storeLng = StoreLng || "";
    if (!storeLat || !storeLng ){
      return  toast.error("Unable to locate store !!!");
    }

    isMobile
      ? window.location.assign(
          `https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${storeLat},${storeLng}`
        )
      : window.open(
          `https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${storeLat},${storeLng}`,
          "_blank"
        );
  };
  const PLPCardBanner = `https://storage.googleapis.com/images_cms_sit_ssb/Products_placeholder_98760b9fb3_e593dbf3eb.svg`;

  const callEvent = (URL: string) => {
    triggerGAEvent(
      {
        item_name: cities?.displayName,
        item_id: storeDirectionText,
        widget_type: Widget_type,
        item_type: "store",
        widget_title: title,
        widget_description: cities?.address?.town,
        widget_postion: 2,
        link_url: URL,
        link_text: storeDirectionText,
        no_of_items: 1,
        index: 1,
        event_type: "link",
      },
      "click"
    );
  };

  async function getCurrentCartItems() {
    const cartId = getItem("cartID", "local") as string;
    let res;
    if (cartId) {
      res = await getCartItems({ cartId: cartId });
      setCartData(res);
      if (res?.response?.status == 400) {
        handleSnackBar(
          true,
          res?.response?.data?.Message || "View Store, Please try again"
        );
      }
    }
    return res;
  }

  function updateStoreValues(
    routePath: null | undefined | string = null,
    updateState: boolean
  ) {
    if (updateState) {
      setUserDataItems((prev: any) => ({
        ...prev,
        storeMode: true,
        storeName: cities?.displayName,
        storePath: `/store/${cities?.code}`,
        storeCode: cities?.code,
        storeModeType: "cc",
        storeAddress: `${cities?.displayName || ""} ${
          cities?.address?.formattedAddress || ""
        }`,
        storeCords: {
          lat: cities.geoPoint.latitude,
          long: cities.geoPoint.longitude,
        },
        storePincode: cities?.address?.postalCode,
      }));
    }
    if (routePath) {
     router.push(routePath)
  }
}

  return (
    <>
      <Box>
        <Grid container sx={{ minHeight: isMobile ? "22vh" : "30vh" }}>
          <Grid
            item
            lg={isMobile ? 7 : 5}
            md={isMobile ? 7 : 5}
            sm={isMobile ? 7 : 5}
            xs={isMobile ? 7 : 5}
            sx={{ borderRight: "1px solid #EAEAEA" }}
            p={2}
          >
            <StoreTitle>{cities?.displayName}</StoreTitle>
            <AddressText>{cities?.address?.line1}</AddressText>
            <AddressText>{cities?.address?.line2}</AddressText>
            <AddressText>{cities?.address?.town}</AddressText>
            <AddressText>-</AddressText>
            <AddressText>{cities?.address?.postalCode}</AddressText>
            <StoreTimings
              storeValues={cities?.openingHours?.weekDayOpeningList}
            />
          </Grid>
          <Grid
            item
            lg={isMobile ? 5 : 7}
            md={isMobile ? 5 : 7}
            sm={isMobile ? 5 : 7}
            xs={isMobile ? 5 : 7}
            sx={{
              display: "flex",
              position: "relative",
              justifyContent: "center",
            }}
          >
            <img
              src={`${ReplaceImage(
                isMobile
                  ? cities.storeImageFromCMSMobile || PLPCardBanner
                  : cities.storeImageFromCMSDesktop || PLPCardBanner
              )}`}
              alt="productImg"
              style={{
                height: isMobile ? "100%" : "40vh",
                width: "100%",
                objectFit: isMobile ? "fill" : "fill",
              }}
            ></img>
            <Box
              sx={{
                borderLeft: "1px solid #EAEAEA",
                fontWeight: "bold",
                position: "absolute",
                padding: "0px",
                margin: "0px",
                bottom: "0",
                background: "white",
                width: "100%",

                zIndex: "1",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  color: "#AD184C",
                  textDecoration: "underline",
                  textDecorationColor: "#AD184C",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
                onClick={async () => {
                  setCurrentStore(cities);
                  updateStoreValues(`/store/${cities?.code}`, true);
                }}
              >
                {`View Store`}
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid
          width={"100%"}
          container
          sx={{ color: "#AD184C", border: "1px solid #EAEAEA" }}
        >
          <Grid
            item
            lg={isMobile ? 7 : 5}
            md={isMobile ? 7 : 5}
            sm={isMobile ? 7 : 5}
            xs={isMobile ? 7 : 5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isMobile ? (
              <LocationOnIcon
                sx={{ fontSize: "40px" }}
                onClick={() => {
                  redirectToGoogleMaps(
                    cities?.geoPoint?.latitude,
                    cities?.geoPoint?.longitude
                  );
                }}
              />
            ) : (
              <DirectionText
                onClick={() => {
                  redirectToGoogleMaps(
                    cities?.geoPoint?.latitude,
                    cities?.geoPoint?.longitude
                  );
                }}
              >
                {/* {storeDirectionText} */}
                Get Directions
              </DirectionText>
            )}
          </Grid>
          <Grid
            item
            lg={isMobile ? 5 : 7}
            md={isMobile ? 5 : 7}
            sm={isMobile ? 5 : 7}
            xs={isMobile ? 5 : 7}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderLeft: "1px solid #EAEAEA",
            }}
          >
            <PhoneText
              onClick={() =>
                (window.location.href = `tel:${cities?.address?.phone}`)
              }
            >
              {isMobile ? (
                <PhoneIcon sx={{ fontSize: "40px" }} />
              ) : (
                <>
                  <PhoneIcon sx={{ padding: "5px" }} />
                  <PhNumber>{cities?.address?.phone}</PhNumber>
                </>
              )}
            </PhoneText>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FilteredStores;
