import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
export const MainBox = styled(Box)(() => ({
  padding: "10px 30px",
  "@media(max-width:600px)": {
    padding: "10px 16px",
  },
}));
export const ViewBreaupTitle = styled(Typography)(() => ({
  fontWeight: "500",
  fontSize: "20px",
  lineHeight: "24px",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "15px",
    color: "#231F20",
  },
}));
export const ProductBox = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  marginTop: "5px",
  "@media(max-width:600px)": {
    marginTop: "0px",
  },
}));
export const ProductOrderTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "19px",
  color: "#4F4C4D",
  width: "81%",
  "@media(max-width:600px)": {
    fontWeight: "400",
    fontSize: "11px",
    lineHeight: "13px",
    color: "#4F4C4D",
  },
}));
export const ProductPriceTypography = styled(Typography)(() => ({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "20px",
  textAlign: "right",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontWeight: "600",
    fontSize: "11px",
    lineHeight: "13px",
    color: "#231F20",
  },
}));
export const MainStack = styled(Stack)(() => ({
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 30px",
  "@media(max-width:600px)": {
    marginTop: "10px",
    padding: "0 15px",
  },
}));
export const DiscountTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "19px",
  color: "#4F4C4D",
  "@media(max-width:600px)": {
    fontWeight: "400",
    fontSize: "11px",
    lineHeight: "13px",
    color: "#4F4C4D",
  },
}));
export const DiscountPriceTypography = styled(Typography)(() => ({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "20px",
  textAlign: "right",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontWeight: "600",
    fontSize: "11px",
    lineHeight: "13px",
    color: "#231F20",
  },
}));
export const ConvenienceStack = styled(Stack)(() => ({
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 30px",
  "@media(max-width:600px)": {
    marginTop: "10px",
    padding: "0 15px",
  },
}));
export const ConvenienceTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "19px",
  color: "#4F4C4D",
  "@media(max-width:600px)": {
    fontWeight: "400",
    fontSize: "11px",
    lineHeight: "13px",
    color: "#4F4C4D",
  },
}));
export const ConvenienceFeeTypography = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "20px",
  textAlign: "right",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontWeight: "600",
    fontSize: "11px",
    lineHeight: "13px",
    color: "#231F20",
  },
}));
export const DeliveryStack = styled(Stack)(() => ({
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 30px",
  "@media(max-width:600px)": {
    marginTop: "10px",
    padding: "0 15px",
  },
}));
export const DLTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "19px",
  color: "#4F4C4D",
  "@media(max-width:600px)": {
    fontWeight: "400",
    fontSize: "11px",
    lineHeight: "13px",
    color: "#4F4C4D",
  },
}));
export const DCTypography = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "20px",
  textAlign: "right",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontWeight: "600",
    fontSize: "11px",
    lineHeight: "13px",
    color: "#231F20",
  },
}));
export const ButtonBox = styled(Box)(() => ({
  padding: "13px 30px 40px 30px",
  "@media(max-width:600px)": {
    padding: "25px 16px",
  },
}));
export const ButtonStack = styled(Stack)(() => ({
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  "@media(max-width:600px)": {
    marginTop: "10px",
  },
}));
export const TotalAmountTypography = styled(Typography)(() => ({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "20px",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontWeight: "600",
    fontSize: "11px",
    lineHeight: "13px",
    color: "#4F4C4D",
  },
}));
export const GrandTotalTypography = styled(Typography)(() => ({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "20px",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontWeight: "600",
    fontSize: "11px",
    lineHeight: "13px",
    color: "#4F4C4D",
  },
}));
export const ModeTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "19px",
  color: " #4F4C4D",
  marginTop: "28px",
  "@media(max-width:600px)": {
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "12px",
    color: "#4F4C4D",
    marginTop: "10px",
  },
}));
export const DownlodButton = styled(Button)(() => ({
  marginTop: "40px",
  backgroundColor: "#DEA3B7",
  height: "55px",
  borderRadius: "0px",
  color: "#231F20",
  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
  "@media(max-width:600px)": {
    height: "28px",
  },
}));
export const ButtonTypography = styled(Typography)(() => ({
  fontWeight: "500",
  fontSize: "12px",
  lineHeight: "140%",
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontWeight: "600",
    fontSize: "11px",
    lineHeight: "140%",
    textTransform: "uppercase",
    color: "#231F20",
  },
}));
