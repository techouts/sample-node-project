import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";

export const TypographyEmpty = styled(Typography)(({ theme }) => ({
  "@media (max-width: 600px)": {
    fontSize: "20px",
  },
  textAlign: "center",
  fontSize: "32px",
  fontWeight: "600",
  padding: "80px 20px",
}));
export const ChildGrid = styled(Grid)(({ theme }) => ({
  width: "100%",
  "& .MuiPaper-root": {
    boxShadow: "unset",
  },
}));
export const TabSelect = styled(Tab)(({ theme }) => ({
  "@media (max-width: 600px)": {
    fontSize: "12px",
    height: "45px",
  },
  width: "437px",
  height: "79px",
  color: "black",
  fontWeight: "600",
  fontSize: "18px",
  opacity: 1,
  textTransform: "none",
}));

export const MainTabs = styled(Tabs)(({ theme }) => ({
  background: "#ffffff",
  "& .Mui-selected": {
    background: "#DEA3B7",
  },
  "& .MuiTabs-scroller": {
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
  },
}));
export const AddButton = styled(Button)(({ theme }) => ({
  "@media (max-width: 600px)": {
    fontSize: "11px",
    fontWeight: 500,
    lineHeight: "28px",
    letterSpacing: "1px",
    color: "#231F20",
    marginTop: "5%",
  },
  width: "100%",
  textAlign: "center",
  backgroundColor: "#DEA3B7",
  borderRadius: "0px",
  boxShadow: "none",
  fontSize: "12px",
  fontWeight: "500",
  color: "black",
  lineHeight: "43px",
  letterSpacing: "1px",
  "&:hover": {
    backgroundColor: "#DEA3B7",
    boxShadow: "none",
  },
}));
export const TypographyCard = styled(Typography)(({ theme }) => ({
  position: "absolute",
  color: "white",
  bottom: "58%",
  left: "20px",
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "20px",
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));

export const TypographyCardChild = styled(Typography)(({ theme }) => ({
  position: "absolute",
  color: "white",
  bottom: "50%",
  left: "20px",
  fontSize: "18px",
  fontWeight: "600",
  letterSpacing: "2px",
  lineHeight: "20px",
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));
export const TypographyCardHolder = styled(Typography)(({ theme }) => ({
  position: "absolute",
  color: "white",
  bottom: "38%",
  left: "20px",
  fontSize: "16px",
  lineHeight: "20px",
  fontWeight: "400",
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));
export const TypographyCardData = styled(Typography)(({ theme }) => ({
  position: "absolute",
  color: "white",
  bottom: "30%",
  left: "20px",
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "20px",
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));
export const TypographyDate = styled(Typography)(({ theme }) => ({
  position: "absolute",
  color: "white",
  bottom: "37%",
  right: "20px",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: "400",
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));
export const TypographyBoth = styled(Typography)(() => ({
  position: "absolute",
  color: "white",
  bottom: "30%",
  right: "20px",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "20px",
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));

export const BoxSelection = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "end",
  marginTop: "1%",
}));
export const TypographyDefault = styled(Typography)(() => ({
  backgroundColor: "#EAE9EF",
  width: "69px",
  height: "31px",
  textAlign: "center",
  fontSize: "14px",
  fontWeight: "400",
  paddingTop: "5px",
  color: "#231F20",
  marginLeft: "14px",
}));
export const BoxOption = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
}));
export const BoxAdd = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));
export const TypographyUpiAdd = styled(Typography)(({ theme }) => ({
  padding: "20px 0px",
  fontSize: "16px",
  fontWeight: "600",
}));
export const TypographyCardEmpty = styled(Typography)(({ theme }) => ({
  position: "relative",
  color: "white",
}));
export const TypographyCardBrand = styled(Typography)(({ theme }) => ({
  position: "absolute",
  right: "20px ",
  top: "20px",
}));
export const FirstAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
}));
