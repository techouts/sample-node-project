import {styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { transientProps } from "../../../utility/TransientProps";

interface OTP {
  isMobile?: boolean;
}
export const Title = styled(Typography)(() => ({
  fontStyle: "normal ",
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "24px",
  textAlign: "center",
  letterSpacing: "0.1em",
  color: "#1C191A",
}));
export const SnankInfoBox = styled(Box)((isMobile) => ({
  "& .MuiSnackbar-root": {
    width: "75%",
    left: "15%",
    right: "unset",
    transform: "unset",
    top: "-20px !important",
    position: "absloute",
    "@media (max-width:600px)": {
      "& .MuiSnackbar-root": {
        margin: "auto",
      },
    },
  },
}));
export const SmallTitle = styled(Typography)(() => ({
  width: "90%",
  fontStyle: "normal ",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "22.4px",
  textAlign: "center",
  paddingTop: "10px",
  color: "#4F4C4D",
  "@media (max-width:600px)": {
    fontSize: "14px",
    paddingTop: "10px",
  },
}));
export const ButtonStyled = styled(Button)(() => ({
  borderRadius: 0,
  padding: "12px",
  width: "30%",
  backgroundColor: "#231F20",
  marginRight: "3px",
  color: "white",
  "&:hover": {
    backgroundColor: "#231F20",
  },
}));
// this is for the otp in page
export const VerifyButton = styled(
  Button,
  transientProps
)<{ disabled: any; isCartJourney: boolean }>(({ disabled, isCartJourney }) => ({
  borderRadius: 0,
  gap: "10px",
  padding: "14px,26px",
  width: "117px",
  height: "44px",
  backgroundColor: "#231F20",
  color: "white !important",
  opacity: disabled ? "0.5" : "",

  "&:hover": {
    backgroundColor: "#231F20",
  },
  "@media(max-width: 600px)": {
    margin: isCartJourney && "0px 16px",
    width: isCartJourney && "328px",
    height: isCartJourney && "28px",
    letterSpacing: isCartJourney && "1px",
  },
}));
// this is for the sign in page
export const TextFieldStyled = styled(TextField)(() => ({
  borderRadius: "unset",
}));
export const BoxStyled = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  paddingTop: "46px",
  "@media(max-width:600px)": {
    paddingTop: "25px",
  },
}));

export const AlertCard = styled(Typography)(() => ({
  background: "#F7F6F9",
  fontSize: "14px",
  width: "80%",
  padding: "10px 10px",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "46px",
  left: "65px",
  bottom: "-25px",
  textAlign: "center",
  "@media(max-width:600px)": {
    position: "absolute",
    bottom: "0px",
    left: "35px",
  },
}));
export const SignUpTypography = styled(Typography)(() => ({
  color: "#AD184C",
  textDecoration: "underline",
}));
// this for otpcomponent
export const PhoneNumber = styled(Typography)(() => ({
  color: "#AD184C",
}));

export const OtpField = styled(TextField)(() => ({
  type: "number",
  onChange: "handleChange",
  "&.MuiOutlinedInput-root input": {
    textAlign: "center !important",
  },
}));
export const TypographyOtpType = styled(Typography)(() => ({
  color: "#656263",
}));

export const OtpBox = styled(Box)(() => ({
  // "& > :not(style)": { margin: "1%", height: "10%", width: "12%" },
}));
export const ResendTimer = styled(Typography)(() => ({
  color: "#656263",
  fontWeight: "400",
}));
export const TextFieldColor = styled(TextField)(({ isMobile }: OTP) => ({
  // margin: "12px 14px",
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "&.MuiInputBase-root.MuiOutlinedInput-root": {
    borderRadius: "0px",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#D9D9D9",
    },
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root": {
    textAlign: "center",
    borderRadius: "0px",
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    padding: isMobile ? "10px 5px" : "18.5px 14px",
    textAlign: "center",
  },
}));
export const TypographyOtp = styled(Typography)(() => ({
  textAlign: "center",
  color: "#EB5757",
  fontSize: "14px",
  "@media(max-width:900px)": {
    fontSize: "12px",
  },
  "@media(max-width:600px)": {
    margin: " 0px 16px",
    fontSize: "10px",
  },
}));
