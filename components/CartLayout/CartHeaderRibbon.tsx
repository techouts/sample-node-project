import { Box, Stack, IconButton } from "@mui/material";
import router from "next/router";
import React, { useMemo, useState } from "react";
import { isMobile } from "../../utility/commonUtility";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { LocationTypography, StoreSwitch } from "../Header/HeaderStyle";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import { LOCATION_ICON } from "../../utility/AppIcons";
import { AppIcons } from "../../utility/AppIconsConstant";
import { useMobileCheck } from "../../utility/isMobile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CCModeSwitch from "../StoreSwitch";
import TextCarousel from "../StoreSwitch/TextCarousel";
import { exploreStoreModeTitles, cities } from "../Header/Constants";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";

function CartHeaderRibbon() {
  const location = AppIcons(LOCATION_ICON);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const isMobile = useMobileCheck();
  const [displayLoader, setLoader] = useState(false);
  const autoScrollText = useMemo(() => {
    return userDataItems?.storeName
      ? [...exploreStoreModeTitles, { title: userDataItems?.storeName }]
      : [...exploreStoreModeTitles, ...cities];
  }, [userDataItems]);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  return (
    <>
      <CustomSnackBar
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        snackMessage={snackMessage}
      ></CustomSnackBar>
      <Box
        sx={{
          background: userDataItems?.storeMode ? "#AD184C" : "#F8EDF1",
          height: "40px",
          width: "100%",
          padding: isMobile ? "0 16px" : "0px 60px",
        }}
      >
        <Stack flexDirection={"row"}>
          <Stack
            flexDirection={"row"}
            sx={{ width: "50%" }}
            alignItems={"center"}
          >
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              onClick={() => {
                if (userDataItems?.storeMode) {
                  router.push(userDataItems?.storePath || "/miscs/store");
                }
              }}
            >
              {location?.url && !userDataItems.storeMode && (
                <IconButton
                  sx={{
                    padding: "7px 7px 7px 0px",
                    fontFamily: "Montserrat",
                  }}
                >
                  <img src={`${ReplaceImage(location?.url)}`} alt="web image" />
                </IconButton>
              )}

              {!userDataItems?.storeMode && (
                <LocationTypography $isStoreMode={userDataItems?.storeMode}>
                  {`${
                    (userDataItems?.city && userDataItems?.city + ",") ??
                    "Mumbai,"
                  }   ${
                    userDataItems?.pincode ??
                    " 400050"
                  }`}
                </LocationTypography>
              )}
              {isMobile && !userDataItems?.storeMode && <ExpandMoreIcon />}
              {userDataItems?.storeMode && (
                <TextCarousel
                  data={autoScrollText}
                  isStoreMode={userDataItems?.storeMode}
                />
              )}
            </Stack>
           
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default CartHeaderRibbon;
