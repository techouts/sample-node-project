import {styled} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { transientProps } from "../../utility/TransientProps";
type CartLayoutProps = {
  margin?: string;
};

interface MobileCheck {
  isMobile?: boolean;
}

export const CartLayoutWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  padding: $isMobile ? "16px" : "40px 60px 0px 60px",
  width: "100%",
}));
export const Heading = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "24px",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "#1C191A",
}));
export const CartItemsCount = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "17px",
  color: "#1C191A",
}));
export const BoxStyled = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch",
  marginBottom: "16px",
  height: "49px",
}));

export const StyledBox = styled(Box)(() => ({
  backgroundColor: "#F8DB6C",
  fontSize: "14px",
  fontWeight: "600",
  display: "grid",
  placeItems: "center",
  padding: "0 2.5%",
  whiteSpace: "nowrap",
}));
export const TextFieldNoBackground = styled(TextField)(() => ({
  borderRadius: "unset",
}));
export const TextFieldBackground = styled(TextField)(() => ({
  borderRadius: "unset",
  backgroundColor: "#F7F6F9",
  border: "none",
  // To remove up and down arrows in input
  "input::-webkit-outer-spin-button,input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "input[type=number]": {
    "-moz-appearance": "textfield",
  },
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
  margin: "3px",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  "&:disabled": {
    backgroundColor: "#231F20",
    color: "#DEA3B7",
  },
}));

export const BorderBox = styled(Box)(() => ({
  border: "1px solid #EAEAEA",
}));

export const PaddingBox = styled(Box)(() => ({
  padding: "20px 20px 0px 20px",
}));

export const SimpleText = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "#231F20",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  lineHeight: "19px",
}));

export const BoldText = styled(Typography)(({ margin }: CartLayoutProps) => ({
  fontSize: "14px",
  fontWeight: "700",
  color: "#4F4C4D",
  margin: margin ? margin : "0px",
}));

export const SmallText = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#231F20",
}));
export const LargeText = styled(Typography)(({ isMobile }: MobileCheck) => ({
  fontSize: isMobile ? "14px" : "16px",
  fontWeight: "700",
  textTransform: "uppercase",
  lineHeight: "20px",
  color: "#231F20",
  "& span": {
    fontWeight: "400",
  },
}));

export const ColorText = styled(Typography)(({ isMobile }: MobileCheck) => ({
  fontSize: isMobile ? "12px" : "14px",
  color: "#AD184C",
  cursor: "pointer",
  textDecoration: "underline",
  lineHeight: isMobile ? "14px" : "",
}));

export const ColoredBox = styled(Box)(() => ({
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#B5A4EC",
  color: "#FFFFFF",
}));

export const TotalBox = styled(Box)(() => ({
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#FBEDB5",
  marginBottom: "12px",
}));

export const StyledButton = styled(
  Button,
  transientProps
)<{ $isCartPage: boolean }>(({ $isCartPage }) => ({
  height: "43px",
  backgroundColor: "#DEA3B7",
  fontSize: "12px",
  fontWeight: 600,
  lineHeight: "16px",
  borderRadius: "unset",
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "#231F20",
  margin: $isCartPage ? "15px 0px 18px 0px" : "20px 0px",
  padding: "0px",
  "&:hover": {
    backgroundColor: "#DEA3B7",
    color: "#231F20",
  },
}));

export const CartHeaderBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  alignSelf: "center",
  height: "80px",
}));
export const CartHeaderTitle = styled(Typography)(() => ({}));
export const CartButton = styled(Button)(() => ({
  borderRadius: 0,
  padding: "5px 19px",
  backgroundColor: "#231F20",
  color: "#DEA3B7",
  "&:hover": {
    backgroundColor: "#DEA3B7",
    color: "#231F20",
  },
}));
export const ApplyText = styled(Typography)(() => ({
  color: "#4F4C4D",
  fontSize: "16px",
}));
export const ApplyButton = styled(Typography)(() => ({
  textDecorationLine: "underline",
  fontSize: "14px",
  color: "#AD184C",
  cursor: "pointer",
}));

export const SearchBox = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  height: "40px",
  alignItems: "center",
  backgroundColor: "#F7F6F9",
  marginTop: "25px",
  justifyContent: "space-between",
  padding: "5px",
}));

export const OffersText = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  fontSize: $isMobile ? "16px" : "14px",
  fontWeight: $isMobile ? 500 : 400,
  lineHeight: $isMobile ? "16px" : "120%",
  color: $isMobile ? "#252D34" : "#231F20",
  textTransform: "capitalize",
  marginBottom: $isMobile ? "2px" : "8px",
}));
