import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import StyledComponent from "@emotion/styled";
import { transientProps } from "../../utility/TransientProps";

export const PrimaryBox = styled(Box)(() => ({
  paddingTop: "0",
}));
export const AddressTypography = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "24px",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "40px",
  color: "#1C191A",
  "@media(max-width:600px)": {
    display: "none",
  },
}));
export const DeliveryOptionsTypography = styled(Typography)(() => ({
  paddingTop: "0px",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  color: "#231F20",
  marginBottom: "8px",
  lineHeight: "120%",
  "@media(max-width:600px)": {
    fontSize: "16px",
    lineHeight: "150%",
    color: "#AD184C",
    fontWeight: "600",
  },
}));
export const PrimaryBoxOne = styled(Box)(() => ({
  background: "#F7F6F9",
  padding: "16px",
}));

export const RadioStack = styled(Stack)(({ isMobile }: any) => ({
  gridGap: isMobile ? "0px" : "20px",
  display: "Flex  ",
  padding: "5px",
  flexWrap: "wrap",
}));
export const RadioGroupStyled = styled(RadioGroup)(() => ({
  "& .MuiRadio-root.Mui-checked": {
    color: "#AD184C",
  },
  "& .MuiButtonBase-root.MuiRadio-root": {
    padding: "4px",
  },
}));

export const EstimatedDeliveryStack = styled(Stack)(({ isMobile }: any) => ({
  marginTop: isMobile ? "0px" : "20px",
  paddingLeft: isMobile ? "14px" : "",
  alignItems: "center",
}));

export const TruckImage = StyledComponent.img`
width:14px;
height:14px;
`;

export const EstimatedDeliveryTypography = styled(Typography)(() => ({
  paddingLeft: "8px",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  color: "#231F20",
  whiteSpace: "normal",
  "@media (max-width: 600px)": {
    color: "#7B7979",
  },
}));

export const DeliveryEstimationText = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile: boolean }) => ({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  color: "#231F20",
  whiteSpace: "normal",
  "@media (max-width: 600px)": {
    color: "#7B7979",
  },
}));

export const DateText = styled(
  "span",
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  fontStyle: "normal",
  fontWeight: 550,
  fontSize: "14px",
  color: "#231F20",
  "@media (max-width: 600px)": {
    color: "#7B7979",
  },
}));

export const SubTitle = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  fontStyle: "normal",
  fontWeight: $isMobile ? 500 : 400,
  fontSize: $isMobile ? "16px" : "20px",
  color: $isMobile ? "#AD184C" : "#231F20",
  lineHeight: "150%",
  textTransform: "capitalize",
  marginBottom: $isMobile ? "10px" : "0px",
}));
export const NearestStoreTypography = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: $isMobile ? "12px" : "14px",
  lineHeight: "150%",
  color: "#A7A5A6",
  textTransform: "uppercase",
  paddingBottom: "10px",
  "@media (max-width: 600px)": {
    padding: " 25px 0 10px 0",
  },
}));
export const OtherStoreTypography = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  marginTop: "0px",
  paddingTop: "20px",
  paddingBottom: "10px",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: $isMobile ? "12px" : "14px",
  color: "#A7A5A6",
  textTransform: "uppercase",
  "@media (max-width: 600px)": {
    padding: " 20px 0 10px 0",
  },
}));

export const TextFieldStyled = styled(TextField)(() => ({
  borderRadius: "unset",
  border: "none",
}));
export const ButtonStyled = styled(
  Button,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  borderRadius: 0,
  padding: $isMobile ? "9.5px 21px" : "7px 25px",
  backgroundColor: "#231F20",
  marginRight: "5px",
  color: "#DEA3B7",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center",
  letterSpacing: "1px",
  textTransform: "uppercase",
  "&:hover": {
    backgroundColor: "#231F20",
  },
}));

export const ChangeTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  color: " #DEA3B7",
  textTransform: "uppercase",
}));
export const SecondaryBox = styled(Box)(() => ({
  paddingTop: "40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "@media (max-width: 600px)": {
    paddingTop: "24px",
  },
}));

export const SelectDeliveryAddressTypography = styled(Typography)(
  ({ isMobile }: any) => ({
    fontStyle: "normal",
    fontWeight: isMobile ? "600" : "400",
    fontSize: "20px",
    color: isMobile ? "#AD184C" : "#231F20",
    textTransform: "capitalize",
  })
);

export const DefaultAddressTypography = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  paddingTop: $isMobile ? "0px" : "10px",
  paddingBottom: "10px",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: $isMobile ? "12px" : "14px",
  lineHeight: "150%",
  color: "#A7A5A6",
  textTransform: "uppercase",
}));

export const OtherAddressTypography = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  paddingTop: $isMobile ? "10px" : "20px",
  paddingBottom: "10px",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: $isMobile ? "12px" : "14px",
  lineHeight: "150%",
  color: "#A7A5A6",
  textTransform: "uppercase",
}));
export const AddNewAddressButton = styled(
  Button,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width:"100%",
  background: " #FFFFFF",
  border: " 1px solid #DEA3B7",
  marginTop: "2px",
  borderRadius: "0px",
  height: "44px",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: $isMobile ? "11px" : "12px",
  padding: "0px",
  color: "#231F20",
  letterSpacing: "1px",
  lineHeight: "140%",
  textTransform: "uppercase",
}));

export const ContinueButton = styled(Button)(() => ({
  textAlign: "center",
  background: "#231F20",
  height: "35px",
  width: "50%",
  borderRadius: 0,
  "&:hover": {
    backgroundColor: "#231F20",
  },
  ":disabled": {
    backgroundColor: "silver",
  },
  textTransform: "uppercase",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  color: "#FFFFFF",
}));

export const ContinueTypography = styled(Typography)(() => ({
  textTransform: "uppercase",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  color: "#FFFFFF",
}));

export const ViewDetailsButton = styled(Button)(() => ({
  textAlign: "center",
  height: "35px",
  width: "50%",
  border: "1px solid #231F20 ",
  borderRadius: 0,
  "&:hover": {
    backgroundColor: "#ffffff",
  },
}));

export const ViewDetailsTypography = styled(Typography)(() => ({
  paddingLeft: "4px",
  textTransform: "uppercase",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  color: "#A7A5A6",
}));

export const PriceTypography = styled(Typography)(() => ({
  textTransform: "uppercase",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  color: "#231F20",
  marginRight: "4px",
}));

export const ViewDetailsBox = styled(Box)(({ isMobile }: any) => ({
  display: isMobile ? "flex" : "none",
  width: "100%",
  position: "fixed",
  bottom: 0,
  right: 0,
  zIndex: 999,
  background: "#ffffff",
  padding: "18px 16px",
  boxShadow: "0px 4px 25px rgb(0 0 0 / 15%)",
  borderTopRightRadius: "20px",
  borderTopLeftRadius: "20px",
}));
export const PayAndPickupSubText = styled(Typography)(({ isMobile }: any) => ({
  fontWeight: 400,
  fontSize: isMobile ? "12px" : "16px",
  lineHeight: isMobile ? "14px" : "140%",
  textTransform: !isMobile ? "capitalize" : "unset",
  color: "#A7A5A6",
}));
export const PayAndPickupSubTextMobile = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "150%",
  color: "#4F4C4D",
  marginTop: "25px",
  marginBottom: "6px",
  textTransform: "capitalize",
}));
