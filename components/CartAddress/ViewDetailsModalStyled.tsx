import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StyledComponent from "@emotion/styled";

export const PrimaryBox = styled(Box)(() => ({
  border: "1px solid #EAEAEA",
}));

export const OrderConfirmationTypography = styled(Typography)(() => ({
  padding: "16px 16px 0px 16px",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "14px",
  color: "#231F20",
  lineHeight: "20px",
  textTransform: "capitalize",
}));

export const TotalMrp = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "16px",
  color: "#231F20",
}));
export const OfferDiscount = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "16px",
  color: "#231F20",
}));

export const ConvenienceFee = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "16px",
  color: "#231F20",
}));

export const InfoImg = StyledComponent.img`
width:14px;
height:14px;
padding-left:"15px"
`;
export const TotalSavings = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "16px",
  color: "#231F20",
  textTransform: "capitalize",
}));

export const FreeSampleTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "16px",
  color: "#4F4C4D",
  textTransform: "capitalize",
}));

export const FreeSampleImg = StyledComponent.img`
width:16px;
height:16px;

`;
export const TotalPayableAmount = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "14px",
  color: "#231F20",
  lineHeight: "20px",
  textTransform: "capitalize",
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
  background: " #DEA3B7",
}));

export const ContinueTypography = styled(Typography)(() => ({
  textTransform: "uppercase",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  color: "#231F20",
}));
