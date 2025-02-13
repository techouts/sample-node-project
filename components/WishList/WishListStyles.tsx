import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { transientProps } from "../../utility/TransientProps";

export const BgBox = styled(Box, transientProps)<{isEmpty: boolean}>(({isEmpty}) => ({
  backgroundColor: isEmpty ? "#F7F6F9" : "transparent",
  margin: "29px 0px",
  "@media(max-width: 600px)": {
    margin: "25px 0px",
  },
}));

export const WishListBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection:"column",
  alignItems:"center",
  justifyContent: "center",
  margin:"0 auto",
  textAlign:"center"
}));

export const EmptyWishlist = styled(Typography)(() => ({
  fontSize:"50px",
  color:"#AD184C",
  fontWeight:"600",
  "@media(max-width: 600px)": {
    fontSize:"30px",
  },
}));
export const WishlistCTA = styled(Button)(() => ({
  fontSize:"12px",
  minWidth:"414px",
  height:"55px",
  backgroundColor:"#DEA3B7",
  textAlign:"center",
  color:"#231f20",
  cursor:"pointer",
  borderRadius:"0px",
  marginBottom:"78px",
  "&:hover":{
    backgroundColor:"#DEA3B7"
  },
  "@media(max-width: 600px)": {
    fontSize:"12px",
    minWidth:"160px",
    height:"43px",
    marginBottom:"27px",
  },
}));
export const WishlistMessage = styled(Typography)(() => ({
  fontSize:"20px",
  color:"#000000",
  paddingBottom:"32px",
  "@media(max-width: 600px)": {
    padding:"0px 76px 16px",
    fontSize:"12px",
  },
}));
export const WishlistTitle = styled(Typography)(() => ({
  fontSize:"20px",
  fontWeight:"400",
  color:"#1C191A",
  letterSpacing:"0.1em",
  "@media(max-width: 600px)": {
    color:"#231F20",
    fontSize:"16px",
  },
}));
export const WishlistCount = styled(Typography)(() => ({
  fontSize:"14px",
  fontWeight:"400",
  letterSpacing:"0.1em",
  color:"#1C191A",
  paddingLeft:"10px",
  "@media(max-width: 600px)": {
    color:"#231F20",
    fontSize:"16px",
    paddingLeft:"6px",
  },
}));

