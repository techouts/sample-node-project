import styledComponent from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import {styled} from "@mui/material";
export const MainBox = styledComponent(Box)(() => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  textAlign: "center",
  backgroundColor: "#ffffff",
  padding: "10px",
  boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
  borderTopRightRadius: "20px",
  borderTopLeftRadius: "20px",
  zIndex: "999",
}));
export const StyledButton = styled(Button)(() => ({
  gap: "10px",
  display: "flex",
  margin: "0 auto",
  alignItems: "center",
  color: "#231F20",
}));
export const FirstTypography = styled(Typography)(() => ({
  display: "flex",
  fontWeight: 600,
  fontSize: "11px",
  color: "#231F20",
}));
export const SecondTypography = styled(Typography)(() => ({
  textTransform: "capitalize",
  color: "#4F4C4D",
  fontSize: "12px",
}));
export const DefaultLabel = styledComponent.span`
  color: #A7A5A6;
  padding-left: 6px
`;
export const MobileDrawer = styled(Drawer)(() => ({
  zIndex:"999999",
  "& .MuiBackdrop-root": {
    background: "none",
  },
  "& .MuiPaper-root": {
    borderRadius: "15px 15px 0px 0px",
  },
}));
export const DrawerBox = styled(Box)(() => ({
  "& .MuiDrawer-paper": {
    borderRadius: "20px",
  },
  display: "flex",
  flexDirection: "column",
  gap: "14px",
}));
export const DrawerSubBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
export const CustomDivider = styled(Divider)(() => ({
  margin: "0 auto",
  borderColor: "#DBDBDB",
}));
export const DrawerTypography = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: 600,
}));
export const MobileList = styled(MenuItem)(({ selected }: any) => ({
  fontWeight: selected ? "700" : "600",
  "& .MuiPaper.root": {
    borderRadius: "0px",
  },
  "& .Mui-focusVisible": {
    backgroundColor: "none",
  },
  "& .MuiPaper.root.MuiMenu.paper.MuiPaper.root.MuiPopover.paper": {
    boxShadow: "none",
  },
  "& . Mui-focusVisible": {
    backgroundColor: "red",
  },
  "&.MuiButtonBase-root.MuiMenuItem-root:hover": {
    backgroundColor: "white",
  },
}));
