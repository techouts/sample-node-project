import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useMobileCheck } from "../../utility/isMobile";
import Loader from "../../HOC/Loader/Loader";
import MuiLabelStepper from "../../HOC/MuiLabelStepper/MuiLabelStepper";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { callOpenScreenEvent } from "../../utility/WebEngaerequirement";
import { useRecoilState } from "recoil";
import { storeSelectorModalStateHandler, userState } from "../../recoilstore";
import { MSDsetCookie } from "../../utility/MSDMadUuid";
import { Cookies } from "react-cookie";
import { Stack, Typography } from "@mui/material";
import CartHeaderRibbon from "./CartHeaderRibbon";
import LogoCarousel from "../Header/LogoCarousel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StoreModeSwitch from "../Header/StoreModeSwitch";
import HomeIcon from '@mui/icons-material/Home';
interface HeaderSchema {
  HeaderLogo: string;
  imageAlt: string;
  bgColor: string;
  bgPaddingMobile: string;
  bgPaddingWeb: string;
  isCartHeader: boolean;
  items: {
    id: number;
    text: string;
    textColor: string;
    textPath: string;
    textOnHeader: string;
    isTextColorActive: string;
    isTextColorInactive: string;
  }[];
  pageId: string;
}
const CartHeader = ({
  HeaderLogo,
  imageAlt,
  items,
  pageId,
  isCartHeader,
}: HeaderSchema) => {
  const router = useRouter();
  const isMobile = useMobileCheck();
  const [displayLoader, setLoader] = useState(false);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    storeSelectorModalStateHandler
  );

  //msd mad_uuid generated //open_screen event Analytics
  useEffect(() => {
    if (!localStorage.getItem("appLaunched")) {
      callOpenScreenEvent(userDataItems);
      localStorage.setItem("appLaunched", "true");
    }
  }, []);

  const cookie = new Cookies();
  useEffect(() => {
    let madcookie = "";
    madcookie = cookie.get("MADid");
    if (!madcookie) {
      cookie.set("MADid", MSDsetCookie("MADid", 365, "/"), {
        path: "/",
        sameSite: true,
        secure: true,
      });
    }
  }, []);

  const handleClick = () => {
    setUserDataItems((prev: any) => ({
      ...prev,
      storeMode: false,
      storeName: null,
      storePath: null,
      storeCode: null,
      storeModeType: "sd",
    }));
    router.push("/home");
  };

  const handleStoreLogoClick = () => {
    if (
      userDataItems?.storeMode &&
      userDataItems?.storePath &&
      userDataItems?.storePath !== ""
    ){
      window.location.assign(userDataItems?.storePath);
  };
}
const handleBackClick = () => {
  if (
    userDataItems?.storeMode &&
    userDataItems?.storePath &&
    userDataItems?.storePath !== ""
  ) {
    window.location.assign(userDataItems?.storePath);
  } else {
    window.location.assign("/home");
  }
};
  return (
    <>
      <Stack
        sx={{
          position: isMobile ? "relative" : "fixed",
          width: "100%",
          top: "0px",
          zIndex: isMobile ? "999" : "1100",
        }}
      >
        {!isMobile && <CartHeaderRibbon />}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start",
            height: isMobile ? "" : "80px",
            background: "#FFFFFF",
            boxShadow: isMobile ? "none" : "0px 5px 24px rgba(0, 0, 0, 0.15)",
            gap:
              userDataItems?.storeMode &&
              userDataItems?.storePath &&
              userDataItems?.storePath !== ""
                ? "20%"
                : "15%",
            padding: isMobile ? (isCartHeader ? "25px 16px" : "") : "0px 60px",
            marginTop: isMobile ? "60px" : "0px",
            position: !isMobile ? "none" : "static",
            top: 0,
            zIndex: "1100",
          }}
        >
          {displayLoader && <Loader></Loader>}

          {!isMobile && (
            <Stack direction="row" alignItems="center">
              {userDataItems.storeMode &&
              userDataItems?.storeModeType === "cc" &&
              router.asPath === "/cart/payment" ? null : (
                <ExpandMoreIcon
                  sx={{
                    color: "#bb466d",
                    fontSize: "3rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsModalOpen(true)}
                />
              )}
              {userDataItems?.storeMode ? (
                <img
                  src={"/ssb store logo.svg"}
                  alt="web image SSBeauty"
                  style={{
                    width: "230px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                  onClick={handleStoreLogoClick}
                />
              ) : (
                <LogoCarousel />
              )}
            </Stack>
          )}

          {isCartHeader && (
            <Box sx={{ textAlign: "center" }}>
              <MuiLabelStepper steps={items} currentStep={pageId} />
            </Box>
          )}
          {!isMobile && isCartHeader && router.asPath === "/cart/info" && (
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "#AC184C",
                }}
                onClick={handleBackClick}
              >
                <HomeIcon
                  sx={{
                    verticalAlign: "middle",
                    fontSize: "16px",
                    fontWeight: 600,
                    marginRight: "8px",
                    lineHeight: "20px",
                  }}
                />
                Go to{" "}
                {userDataItems?.storeMode &&
                userDataItems?.storePath &&
                userDataItems?.storePath !== ""
                  ? "store"
                  : "home"}
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
      <StoreModeSwitch navigationPath={"/miscs/store"} />
    </>
  );
};
export default CartHeader;
