import React, { useState } from "react";
import {styled} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {
  ListBox,
  ListTypography,
  SignInTypography,
  MobileList,
  CtaButton,
  StyledTextButton,
} from "./HeaderStyle";
import MenuIcon from "@mui/icons-material/Menu";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  DrawerCompInterface,
  HeaderListItems,
} from "../../schemas/HeaderSchema";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoilstore";
import Loader from "../../HOC/Loader/Loader";

const DrawerComp = ({
  items,
  crossIconUrl,
  signInText,
  userIconUrl,
  ctaLabelBgColor,
  ctaLabelColor,
  ctaLabel,
  handleDialog,
  setQrcode,
}: DrawerCompInterface) => {
  const router = useRouter();
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const [displayLoader, setLoader] = useState(false);
  const userDataItems = useRecoilValue(userState);
  const [CustomerID, setCustomerID] = useState(
    global?.window?.localStorage.getItem("customer_Name") ?? null
  );
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleFcc = () => {
    CustomerID
      ? (setLoader(true), router.push("/miscs/first-citizen"), setLoader(false))
      : (setDrawerOpen(false), handleDialog());
  };
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <>
      {displayLoader && <Loader />}
      <Drawer
        anchor="left"
        open={DrawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: 300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <img
              src={`${ReplaceImage(crossIconUrl)}` || crossIconUrl}
              alt="cross-image"
            />
          </IconButton>
        </DrawerHeader>
        <List>
          {items.map((item: HeaderListItems, index: number) => (
            <ListBox key={index}>
              <Accordion disableGutters={true} elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MobileList isLuxe={item?.text?.toLowerCase() === "luxe"}>
                    {item?.text}
                  </MobileList>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
            </ListBox>
          ))}
        </List>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <Typography>
                {
                  <img
                    src={
                      userDataItems.tierLogo
                        ? userDataItems.tierLogo
                        : `${ReplaceImage(userIconUrl)}`
                    }
                    alt="sign in icon"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                }
              </Typography>
              <SignInTypography
                onClick={() => {
                  setDrawerOpen(false);
                  handleDialog();
                }}
              >
                {CustomerID ? CustomerID : signInText}
              </SignInTypography>
            </ListItemIcon>
          </ListItemButton>
          {CustomerID ? (
            userDataItems?.tierText && (
              <ListItemButton>
                <CtaButton
                  onClick={handleFcc}
                  sx={{
                    background: ctaLabelBgColor,
                    color: ctaLabelColor,
                  }}
                >
                  <StyledTextButton
                    contentEditable="true"
                    dangerouslySetInnerHTML={{   __html: `First Citizen Club <span>${
                      userDataItems?.tierText || ""
                    }</span>`, }}
                  ></StyledTextButton>
                </CtaButton>
              </ListItemButton>
            )
          ) : (
            <ListItemButton>
              <CtaButton
                onClick={handleFcc}
                sx={{
                  background: ctaLabelBgColor,
                  color: ctaLabelColor,
                }}
              >
                <StyledTextButton
                  contentEditable="true"
                  dangerouslySetInnerHTML={{ __html: ctaLabel }}
                ></StyledTextButton>
              </CtaButton>
            </ListItemButton>
          )}
        </List>
        <Divider />
        <List>
          {items.map((item: any, index: number) => (
            <ListItemButton
              key={index}
              onClick={() => {
                index === 0
                  ? setQrcode(true)
                  : item?.webUrl && window.location.assign(`${window.location.origin}${item?.webUrl}`);
              }}
            >
              <ListItemIcon>
                <Typography>
                  <img
                    src={`${ReplaceImage(item?.mobileIconUrl)}`}
                    alt="icons"
                  />
                </Typography>
                <ListTypography>{item?.mobileText}</ListTypography>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton onClick={() => setDrawerOpen(!DrawerOpen)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
