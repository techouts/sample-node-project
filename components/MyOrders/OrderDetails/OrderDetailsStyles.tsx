import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import StarIcon from "@mui/icons-material/Star";
import { transientProps } from "../../../utility/TransientProps";

export const OrderDetailsWrapperBox = styled(Box)(() => ({
  padding: "26px 32px",
  ":hover": {
    background: "#F7F6F9",
  },
  "@media (max-width:600px)": {
    padding: "25px 16px",
  },
}));
export const ContainerBox = styled(Box)(() => ({
  width: "100%",
}));
export const MainBox = styled(Box)(() => ({
  background: "#F7F6F9",
  padding: "0",
  "@media(max-width:600px)": {
    padding: "0",
  },
}));
export const ArrowBackIcon = styled(ArrowBackIosNewRoundedIcon)(() => ({
  fontSize: "20px",
  color: "#292D32",
}));
export const HeadingTypography = styled(Typography)(() => ({
  marginLeft: "10px",
  fontWeight: "500",
  lineHeight: "140%",
  fontSize: "24px",
  color: "#231F20",
}));
export const ImageBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "12px",
  paddingLeft: "10px",
  "@media (max-width:600px)": {
    gridGap: "10px",
    paddingLeft: "0px",
    paddingTop: "0px",
    marginBottom: "5px",
  },
}));

export const OrderImage = styled.img`
  max-width: 160px;
  max-height: 150px;
  @media (max-width: 600px) {
    max-width: 116px;
    max-height: 115px;
  }
`;
export const TitleTypography = styled(Typography)(() => ({
  fontWeight: "500",
  fontSize: "20px",
  color: "#231F20",
  lineHeight: "140%",
  "@media(max-width:600px)": {
    fontWeight: "500",
    fontSize: "12px",
    overflow: "hidden",
    textOverflow: "",
    display: "-webkit-box",
    "-webkitLineClamp": "2",
    "-webkitBoxOrient": "vertical",
  },
}));
export const StarIconImage = styled(StarIcon)(() => ({
  width: "17px",
  height: "16px",
  "@media(max-width:600px)": {
    width: "12px",
    height: "11px",
  },
}));
export const RatingBox = styled(Box)(() => ({
  margin: "13px 0px",
  display: "flex",
  gap: "4px",
  alignItems: "center",
  "@media(max-width:600px)": {
    margin: "8px 0px",
  },
}));
export const PriceBox = styled(Box)(() => ({
  display: "flex",
  gridGap: "16px",
  marginTop: "10px",
}));
export const PriceTypogrphy = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "#231F20",
  paddingBottom: "32px",
  "@media(max-width:600px)": {
    fontSize: "14px",
    paddingBottom: "16px",
  },
}));
export const RatingTypography = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  "@media(max-width:600px)": {
    fontSize: "11px",
    fontWeight: "400",
    marginLeft: "0px",
  },
}));
export const QuantityTypography = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "500",
  color: "#231F20",
  lineHeight: "120%",
  paddingBottom: "24px",
  "@media(max-width:600px)": {
    fontSize: "11px",
    fontWeight: "500",
    color: "#231F20",
    paddingBottom: "4px",
  },
}));
export const OnlineBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "114px",
  height: "33px",
  backgroundColor: "white",
  cursor: "pointer",
  "@media(max-width:600px)": {
    width: "75px",
    height: "26px",
  },
}));
export const OnlineTypography = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "500",
  color: "#AD184C",
  "@media(max-width:600px)": {
    fontSize: "11px",
    fontWeight: "500",
    color: "#AD184C",
  },
}));
export const ReturnButtonStack = styled(Stack)(() => ({
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  background: "#fff",
  minHeight: "78px",
  "@media (max-width:600px)": {
    minHeight: "52px",
  },
}));
export const ReorderButton = styled(Button)(() => ({
  fontWeight: "500",
  fontSize: "18px",
  lineHeight: "22px",
  textTransform: "uppercase",
  color: "#231F20",
  ":hover": {
    background: "#FFFFFF",
  },
  "@media(max-width:600px)": {
    fontWeight: "500",
    fontSize: "11px",
    lineHeight: "13px",
    color: "#231F20",
  },
}));
export const ReturnButton = styled(
  Button,
  transientProps
)<{ $orderStatus: string, $isDisabled?: boolean }>(({ $orderStatus, $isDisabled }) => ({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "19px",
  color:`${
    $isDisabled ? "#A7A5A6!important" : "#231F20"
  } `,
  ":hover": {
    background: "#FFFFFF",
  },
  "@media(max-width:600px)": {
    fontWeight: "600",
    fontSize: "11px",
    lineHeight: "13px",
    color: `${
      $isDisabled ? "#A7A5A6!important" : "#231F20"
    } `,
  },
}));
export const ModaldataBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: "100%",
  textAlign: "center",
  top: "50%",
  bottom: "50%",
  padding: $isMobile ? "" : "88px 0px",
}));
export const TitledataTypography = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? "63%" : "54%",
  justifyContent: "center",
  display: "flex",
  fontSize: $isMobile ? "18px" : "24px",
  color: "#231F20",
  alignItems: "center",
  margin: "auto",
  fontWeight: "500",
  marginTop: $isMobile ? "50px" : "",
}));
export const ExchangeButton = styled(ReturnButton)();
export const CancelButton = styled(Button)(() => ({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "19px",
  color: "#231F20",
  ":hover": {
    background: "#FFFFFF",
  },
  "@media(max-width:600px)": {
    fontSize: "11px",
    lineHeight: "13px",
  },
}));
export const ButtonBoxs = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  gridGap: "15px",
  alignItems: "center",
  paddingTop: "20px",
  marginBottom: $isMobile ? "50px" : "",
}));
export const ConfirmTypography = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  minWidth: $isMobile ? "60px" : "78px",
  minHeight: $isMobile ? "28px" : "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#231F20",
  fontSize: "12px",
  color: "#ffffff",
  cursor: "pointer",
}));
export const CancelTypography = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  minWidth: $isMobile ? "108px" : "106px",
  minHeight: $isMobile ? "28px" : "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#DEA3B7",
  fontSize: "12px",
  color: "#231F20",
  cursor: "pointer",
}));

export const ReturnTextInfo = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  color: "#656263",
  lineHeight: "140%",
  fontStyle: "normal",
  fontFamily: "Montserrat",
  "@media(max-width:600px)": {
    fontSize: "10px",
  },
}));
