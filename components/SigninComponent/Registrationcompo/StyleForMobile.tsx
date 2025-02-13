import styledComponent from "@emotion/styled";
import {styled} from "@mui/material";
import  Typography from "@mui/material/Typography";
import  Button from "@mui/material/Button";
import  Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { transientProps } from "../../../utility/TransientProps";
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

interface OfferTextStyle {
  offerTextColor: RGB | RGBA | HEX | string;
  smallText: RGB | RGBA | HEX | string;
}

export const Title = styled(Typography)(() => ({
  "@media(max-width: 600px)": {
    fontSize: "14px",
    lineHeight: "14px",
  },
  "@media(max-width: 900px)": {
    lineHeight: "18px",
  },
  fontStyle: "normal ",
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "24px",
  textAlign: "center",
  letterSpacing: "0.1em",
  color: "#1C191A",
}));

export const SmallTitle = styled(Typography)(() => ({
  "@media(max-width: 600px)": {
    fontSize: "14px",
    lineHeight: "14px",
  },
  marginTop: "10px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "16px",
  textAlign: "center",
  color: "#4F4C4D",
}));

export const ButtonStyled = styled(
  Button,
  transientProps
)<{ disabled: any; $isCartJourney: boolean }>(
  ({ disabled, $isCartJourney }) => ({
    "@media(max-width: 600px)": {
      width: $isCartJourney ? "90%" : "35%",
      height: $isCartJourney ? "28px" : "5%",
      marginTop: "25px",
      letterSpacing: "1px",
    },
    letterSpacing: "1px",
    lineHeight: "16px",
    fontWeight: "300",
    padding: "12px 50px",
    fontSize: "12px",
    marginTop: "29px",
    cursor: "pointer",
    borderRadius: 0,
    opacity: disabled ? "0.5" : "",
    width: "14%",
    backgroundColor: "#231F20",
    marginRight: "3px",
    color: "white !important",
    "&:hover": {
      backgroundColor: "#231F20",
    },
  })
);
export const TextFieldStyled = styled(TextField)(() => ({
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  borderRadius: "unset",
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
    width: "100%",
  },
  "& .MuiFormLabel-root.MuiInputLabel-root": {
    padding: "1px",
    color: "#231F20 !important",
  },
  "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
    color: "#AD184C !important",
  },
}));
export const BoxStyled = styled(Box)(() => ({
  "@media(max-width: 600px)": {
    paddingTop: "25px",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "43px",
}));

export const LoginIcons = styledComponent.img(() => ({
  width: "100%",
  height: "100%",
}));

export const SignUpText = styled(Typography)(() => ({
  fontStyle: "normal ",
  fontWeight: "900",
  fontSize: "16px",
  lineHeight: "22.4px",
  textAlign: "center",
  letterSpacing: "0.1em",
  paddingTop: "24px",
  display: "flex",
  alignItems: "center",
}));

export const TermsText = styled(Typography)(() => ({
  "@media(max-width: 600px)": {
    fontSize: "10px",
    lineHeight: "1.4px",
    paddingTop: "10px",
  },
  "@media(max-width: 900px)": {
    lineHeight: "18px",
  },
  cursor: "pointer",
  fontStyle: "normal ",
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "14px",
  justifyContent: "center",
  paddingTop: "10px",
  display: "flex",
  alignItems: "center",
  color: "#7B7979",
  flexWrap: "wrap",
}));
export const SignUpTypography = styled(Typography)(() => ({
  color: "#AD184C",
  textDecoration: "underline",
}));
export const TermsTypography = styled(Typography)(() => ({
  "@media(max-width: 600px)": {
    fontSize: "10px",
  },
  fontSize: "12px",
  paddingLeft: "5px",
  paddingRight: "5px",
  fontWeight: "600",
  color: "#231F20",
  textDecoration: "underline",
}));
