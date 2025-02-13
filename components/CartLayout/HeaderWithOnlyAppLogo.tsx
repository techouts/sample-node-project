import React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { HeaderNavBar, HeaderContainer } from "../Header/HeaderStyle";
import { useRouter } from "next/router";
import CartHeaderRibbon from "./CartHeaderRibbon";
import { Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { storeSelectorModalStateHandler, userState } from "../../recoilstore";
import { useRecoilState } from "recoil";
import LogoCarousel from "../Header/LogoCarousel";
import HomeIcon from '@mui/icons-material/Home';


export function HeaderWithOnlyAppLogo({ data }: any) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useRecoilState(storeSelectorModalStateHandler);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const handleStoreLogoClick = () => {
    if (
      userDataItems?.storeMode &&
      userDataItems?.storePath &&
      userDataItems?.storePath !== ""
    ){
      window.location.assign(userDataItems?.storePath);
    }
  };

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
      <AppBar
        sx={{
          background: "#ffffff",
          top: 0,
          color: "black",
          cursor: "pointer",
          backgroundColor: "#FFFFFF",
          zIndex: "1100",
        }}
      >
        <CartHeaderRibbon />
        <HeaderNavBar>
          <Stack
            flexDirection={"row"}
            justifyContent={
              router.asPath === "/cart/info" ? "space-between" : "center"
            }
            alignItems={"center"}
          >
           

            {userDataItems?.storeMode ? (
              <>
              <Stack display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"row"}>
              <ExpandMoreIcon
              sx={{
                color: "#bb466d",
                fontSize: "3rem",
                cursor: "pointer",
              }}
              onClick={() => setIsModalOpen(true)}
            />
             <img
                  onClick={handleStoreLogoClick}
                  src={"/ssb store logo.svg"}
                  alt="web image SSBeauty"
                  width={"100%"}
                  style={{
                    maxWidth: "40%",
                    cursor: "pointer",
                  }}
                />
              </Stack>
               
              </>
            ) : (
              <>
              <ExpandMoreIcon
              sx={{
                color: "#bb466d",
                fontSize: "3rem",
                cursor: "pointer",
              }}
              onClick={() => setIsModalOpen(true)}
            />
              <LogoCarousel isCartPage={true}/>
              </>
            )}
            {router.asPath === "/cart/info" && <HomeIcon onClick={handleBackClick} />}
          </Stack>
        </HeaderNavBar>
      </AppBar>
    </>
  );
}
