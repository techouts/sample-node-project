import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Badge from "@mui/material/Badge";

import { transientProps } from "../../utility/TransientProps";
import { Switch } from "@mui/material";

export const HeaderContainer = styled(AppBar)(({ theme }) => ({
  color: "black",
  top: "40px",
  backgroundColor: "#FFFFFF",
}));
export const SearchBar = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  boxShadow: "none",
  border: "1px solid #E7E7E7",
  borderRadius: 1,
  height: "36px",
  width: "100%",
  "@media(max-width:900px)": {
    height: "30px",
    borderRadius: "100px",
  },
}));
export const HeaderBannerBox = styled(
  Box,
  transientProps
)<{ $isAccountPage: boolean , $isStoreMode:boolean}>(({ $isAccountPage, $isStoreMode }) => ({
  display: "flex",
  flexDirection: "column",
  background: $isStoreMode ? "#AD184C":"#F8EDF1",
  height: $isAccountPage ? "150px" : "40px",
  width: "100%",
  position: "fixed",
  top: "0px",
  zIndex: "1100",
}));

export const UserName = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "16px",
  fontWeight: 600,
  color: "#231F20",
}));
export const UserDetails = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
}));
export const UserArrowLeftStyle = styled.img`
  padding-left: 16px;
  height: 12px;
`;
export const UserCardDetails = styled(
  Typography,
  transientProps
)<{ $isSigned: boolean }>(({ $isSigned }) => ({
  fontSize: "12px",
  lineHeight: "140%",
  fontWeight: 400,
  color: "#231F20",
  marginTop: "8px",
  width: $isSigned ? "200px" : "100%",
  textDecoration: $isSigned ? "underline" : "none",
  textAlign: "left",
}));
export const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center"
}));
export const SignInBox = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "600",
  gap: "5px",
  display: "flex",
  justifyContent: "space-evenly",
}));
export const MobileSearchBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));
export const HeaderNavigationBarBox = styled(Box)(({ theme }) => ({
  width: "100% !important",
  height: "100%",
}));
export const SignInGrid = styled(Grid)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "space-between",
}));
export const CartGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
}));
export const ListBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
}));
export const ListTypography = styled(Typography)(({ theme }) => ({
  paddingLeft: "10px",
}));
export const ListStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  display: "flex",
  width: "100%",
  height: "100%",
}));
export const ProfileImage = styled.img`
  width: 69px;
  height: 69px;
  border-radius: 50%;
`;
export const MobileList = styled(
  Typography,
  transientProps
)<{ isLuxe: boolean }>(({ isLuxe }) => ({
  fontWeight: "600",
  color: isLuxe ? "#C19F00" : "#231F20",
}));
export const SignInTypography = styled(Typography)(({ theme }) => ({
  paddingLeft: "10px",
  fontWeight: "600",
  color: "#231F20",
}));
export const StyledTextButton = styled(Typography)(({ theme }) => ({
  fontSize: "10px",
  whiteSpace: "nowrap",
  display: "flex",
  flexDirection: "column",
  textTransform: "none",
  "& > span": {
    fontSize: "12px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    lineHeight: "15px",
  },
}));
export const SignInTypo = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  whiteSpace: "nowrap",
  "@media(max-width:1200px)": {
    fontSize: "14px",
  },
  "@media(max-width:900px)": {
    fontSize: "12px",
  },
}));
export const CtaButton = styled(Button)(({ theme }) => ({
  width: "110px",
  height: "35px",
  borderRadius: "0px",
  "@media screen and (max-width: 900px) and (min-width: 600px)": {
    width: "auto",
  },
}));
export const ModalClick = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LocationTypography = styled(Typography)<{ $isStoreMode:boolean}>(({ $isStoreMode }) => ({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "17px",
  color: $isStoreMode ? "#ffffff": "#231F20",
  cursor: "pointer",

  "@media(max-width:900px)": {
    fontSize: "11px",
    lineHeight: "14px",
  },
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "14px",
  },
}));
export const ProfileMenu = { top: "3%", left: "-3%" };
export const ProfileMenuItems = {
  fontsize: "16px",
  width: "202px",
  borderRadius: "0px",
};
export const HeaderModalWrapper = styled(Box)(() => ({
  // borderTop: "2px solid #E6DEDE",
}));
export const SubHeaderNavBox = styled(Stack)(() => ({
  cursor: "pointer",
  alignContent: "normal",
}));
export const SubHeaderUnorderList = styled("ul")(() => ({
  display: "flex",
  paddingInlineStart: "0px",
  position: "fixed",
  width: "100% !important",
  height: window.innerHeight,
  left: "0px",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginRight: "5%",
}));
export const BoxWrapper = styled(Box)(() => ({
  backgroundColor: "white",
  width: "100%",
  display: "flex",
  maxWidth: "1440px",
  margin: "0 auto",
  justifyContent: "center",
  "@media(max-width:900px)": {
    overflowX: "scroll",
    overflowY: "hidden",
    "::-webkit-scrollbar": {
      width: "1px",
    },
  },
}));
export const SubHeaderTitle = styled("li")(() => ({
  fontSize: "15px",
}));
export const SubHeader = styled("li")(() => ({
  listStyleType: "none",
  marginRight: "15px",
  marginLeft: "15px"
}));
export const SubHederNav = styled("a")(() => ({
  padding: "30px",
}));
export const SubHeaderModal = styled(Box)(({ left }: any) => ({
  position: "absolute",
  display: "flex",
  background: "white",
  left: left,
  overflowY: "scroll",
  overflowX: "hidden",
  // borderTop: "1px groove",
  boxShadow: "0 3px 3px  rgba(0, 0, 0, 0.1)",
  flexWrap: "wrap",
  maxHeight: window.innerHeight - 180,
  paddingLeft: "1%",
  top: "120px",
  "::-webkit-scrollbar": {
    width: "1px",
  },
  "@media(min-width:980px) and (max-width:1230px)": {
    top: "90px",
  },
  "@media(min-width:1230px)": {
    top: "72px",
  },
}));
export const SubHeaderNavContent = styled(Grid)(() => ({
  position: "relative",
  display: "contents",
  gridColumn: "inherit",
  cursor: "pointer",
  overflowX: "hidden",
}));
export const HeaderModalContentTitle = styled(Typography)(() => ({
  color: "#231F20",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "24px",
  paddingBottom: "16px",
  textAlign: "left",
  paddingLeft: "5px"
}));
export const HeaderModalContentListItems = styled(Typography)(() => ({
  fontWeight: 400,
  color: "#231F20",
  fontSize: "16px",
  lineHeight: "24px",
  paddingBottom: "8px",
  margin: "0px !important",
  textAlign: "left",
  paddingLeft: "5px"
}));

export const HeaderModalContentList = styled(List)(() => ({
  padding: 0,
}));

export const SubHeaderText = styled(
  Typography,
  transientProps
)<{ $isActiveTab: boolean }>(({ $isActiveTab }) => ({
  color: $isActiveTab ? "#AD184C" : "#231F20",
  fontSize: "16px",
  lineHeight: "24px",
}));

export const HeaderNavBar = styled(Toolbar)(() => ({
  background: "#ffffff",
  backgroundColor: "#FFFFFF",
  paddingLeft: "0px",
  paddingRight: "0px",
  justifyContent: "center",
  "@media(min-width:601px)": {
    minHeight: "80px",
    padding: 0,
  },
}));
export const HeaderWrapper = styled(Box)(() => ({
  placeItems: "center",
  display: "flex",
  "@media(max-width:600px)": {
    justifyContent: "space-between",
  },
  maxWidth: "1440px",
  margin: "0 auto"
}));

export const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    color: "white",
    backgroundColor: "#AD184C",
  },
});

export const StoreSwitch = styled(Switch)(({ theme }) => ({
  width: 100,
  height: 20,
  padding: 0,
  marginLeft: "10px",
  display: "flex",
  position: 'relative',
  "&:active": {
    "& .MuiSwitch-thumb": {
      // width: 15,
      width: 20,
      backgroundImage: `url('/walking.gif')`,
      backgroundSize: 'cover',
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 0,
    transition: "transform 2s ease",
    "&.Mui-checked": {
      transform: "translateX(80px)",
      // color: "#fff",
      color: "transparent",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "white",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 20,
    height: 20,
    backgroundImage: `url('/walking.gif')`,
    backgroundSize: 'cover',
    borderRadius: '40%',
    transition: 'transform 0.2s',
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
 
  "&.apartment-icon": {
    position: "absolute",
    width: "24px", // Adjust as needed
    height: "auto",
    top: "50%",
    left: "calc(100% - 30px)", // Position inside the switch
    transform: "translateY(-50%)",
    zIndex: 1,
  },
}));
