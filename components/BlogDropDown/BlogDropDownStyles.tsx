import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography  from "@mui/material/Typography";

interface Add {
  isMobile: boolean;
}


export const TitleTypography = styled(Typography)(({isMobile}:Add) => ({
  textAlign: "center",
  fontSize: isMobile ? "12px":"20px",
  lineHeight: "23.86px",
  fontStyle: "normal",
  fontWeight: "400",
  width: "100%",
  letterSpacing: "0.1em",
}));
export const DropDownBox=styled(Box)(()=>({
  width: "100%",
  display:"flex",
  justifyContent:"space-around",
  "@media(max-width:600px)": {
  overflow:"scroll",
  marginTop:"25px",
  gap:"10px",
  justifyContent: "space-between",
  },
  "::-webkit-scrollbar": {
    display: "none",
  },
}))
export const ChipBox = styled(Chip)(() => ({
  borderRadius: "0px",
  borderColor: "#231F20",
  width: "100%",
  fontSize: "12px",
  fontWeight: 400,
  color: "#231F20",
  lineHeight: "14px",
  padding: "8px",
  backgroundColor:"#FFFFFF",
  "&:hover": {
    background:"rgba(0, 0, 0, 0.87)",
  },
}));