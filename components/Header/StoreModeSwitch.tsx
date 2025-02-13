import { Grid, Modal, Typography } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { cartState, storeSelectorModalStateHandler, userInfo, userState } from "../../recoilstore";
import { HOME_TEXT } from "../Profile/constant";
import useStorage from "../../utility/useStoarge";
import { Cookies } from "react-cookie";
import { getCartItems } from "../../HOC/ProductCard/ProductCardUtils";
interface StoreModeSwitchProps {
  navigationPath:string

}
const StoreModeSwitch: React.FC<StoreModeSwitchProps> = ({
  navigationPath,
}) => {
  
  const [displayLoader, setLoader] = useState(false);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const isMobile = useMobileCheck();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useRecoilState(storeSelectorModalStateHandler);
  const handleLogoClick = () => {
    setLoader(true);
    if (router.asPath.includes("/store")){
       updateStore()
       window.location.assign(`/${HOME_TEXT}`);
    }else{
      updateStore()
      window.location.reload()
    }
    setLoader(false);
    setIsModalOpen(false)
  };

  function updateStore() {
    setUserDataItems((prev: any) => ({
      ...prev,
      storeMode: false,
      storeName: null, 
      storePath:null,
      storeCode: null,
      storeModeType: "sd",
    }));
    setCartStore((previousData: any) => ({
      ...previousData,
      isCartUpdated: true,
    }));
  }


  const handleStoreModeChange = async() =>{
    setLoader(true)
    router.push(navigationPath)
    updateStore()
    setLoader(false)
    setIsModalOpen(false)
  }
  


  return (
    <Modal
      sx={{ outline: "none", width: "100%" }}
      open={isModalOpen}
    >
      <Grid
        sx={{
          position: "absolute",
          height: "60vh",
          width: isMobile ? "90%" : "80%",
          top: isMobile ? "0px" : "142px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "white",
          display: "flex",
          flexDirection: "column",
          outline: "none",
        }}
        p={3}
      >
        <>
        </>
        <Grid
          style={{ height: isMobile ? "5vh" : "10vh", display: "flex" }}
          container
        >
          <Grid md={6} lg={6} sm={6} xs={6} item>
            <Typography sx={{ fontWeight: "bold" }}>Select Stores</Typography>
          </Grid>

          <Grid
            md={6}
            lg={6}
            sm={6}
            xs={6}
            item
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-end",
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <CloseIcon />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            height: "10vh",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#f8edf1",
              cursor: "pointer",
              "& .rightIcon": {
                color: "#bb466d",
              },
            },
          }}
          onClick={handleLogoClick}
        >
          <Grid item md={4} lg={4} sm={4} xs={4} sx={{height:"100%",display:"flex",justifyContent:"center"}}>
            <img
              src={"/ssb logo new.svg"}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Grid>

          <Grid item md={6} lg={6} sm={6} xs={6}>
            <Typography sx={{ fontSize: isMobile ? "12px" : "18px" }}>
              The only online destination for all your beauty needs
            </Typography>
          </Grid>

          <Grid
            item
            md={2}
            lg={2}
            sm={2}
            xs={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <KeyboardArrowRightIcon
              sx={{ fontSize: "40px" }}
              className="rightIcon"
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            height: "10vh",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#f8edf1",
              cursor: "pointer",
              "& .rightIcon": {
                color: "#bb466d",
              },
            },
          }}
          onClick={handleStoreModeChange}
        >
          <Grid item md={4} lg={4} sm={4} xs={4} sx={{height:"100%",display:"flex",justifyContent:"center"}}>
            <img
              src={"/ssb store logo.svg"}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Grid>

          <Grid item md={6} lg={6} sm={6} xs={6}>
            <Typography
              sx={{ fontSize: isMobile ? "12px" : "18px" }}
              component="span"
            >
              Pay online and pick up at store near you{" "}
              <Typography
                sx={{
                  fontStyle: "italic",
                  display: "inline",
                  fontSize: isMobile ? "12px" : "16px",
                }}
              >
                (Select stores only)
              </Typography>
            </Typography>
          </Grid>

          <Grid
            item
            md={2}
            lg={2}
            sm={2}
            xs={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <KeyboardArrowRightIcon
              sx={{ fontSize: "40px" }}
              className="rightIcon"
            />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};
export default StoreModeSwitch;
