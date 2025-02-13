import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StyledComponent from "@emotion/styled";

export const PrimaryBox = styled(Box)(() => ({
  border: "1px solid #EAEAEA",
}));

export const OrderConfirmationTypography = styled(Typography)(() => ({
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "20px",
  paddingRight: "20px",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "16px",
  color: "#231F20",
  textTransform: "uppercase",
}));

export const TotalMrp = styled(Typography)(() => ({
  paddingTop: "10px",
  paddingBottom: "10px",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "16px",
  color: "#231F20",
}));
export const OfferDiscount = styled(Typography)(() => ({
  paddingTop: "10px",
  paddingBottom: "10px",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "16px",
  color: "#231F20",
}));

export const ConvenienceFee = styled(Typography)(() => ({
  paddingTop: "10px",
  paddingBottom: "10px",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "16px",
  color: "#231F20",
}));

export const InfoImg = StyledComponent.img`
width:14px;
height:14px;
padding-left:"15px"
`;
export const TotalSavings = styled(Typography)(() => ({
  paddingTop: "10px",
  paddingBottom: "10px",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "16px",
  color: "#231F20",
  textTransform: "capitalize",
}));

export const FreeSampleTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  color: "#4F4C4D",
  textTransform: "capitalize",
}));

export const FreeSampleImg = StyledComponent.img`
width:16px;
height:16px;

`;
export const TotalPayableAmount = styled(Typography)(() => ({
  paddingTop: "10px",
  paddingBottom: "10px",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "16px",
  color: "#231F20",
  textTransform: "uppercase",
}));

export const ButtonStack = styled(Stack)(() => ({
  width: "90%",
  justifyContent: "center",
  alignItems: "center",
  background: " #DEA3B7",
  cursor: "pointer",
}));

export const ContinueButton = styled(Button)(() => ({
  textAlign: "center",
  background: "#231F20",
  height: "35px",
  width: "50%",
  borderRadius: 0,
  color: "#FFFFFF",
  padding:"9.5px 0px",
  textTransform: "uppercase",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  ":disabled": {
    backgroundColor: "silver",
  },
  marginBottom: "10px"
}));
