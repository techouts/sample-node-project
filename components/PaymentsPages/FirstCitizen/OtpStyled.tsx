import {styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
export const VerifyTypography = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "20px",
  lineHeight: "24px",
  color: "#1C191A",
  textAlign: "center",
  letterSpacing: "0.1em",
}));
export const OtpTypography = styled(Typography)(() => ({
  color: "#4F4C4D",
  fontSize: "16px",
  lineHeight: "21px",
  textAlign: "center",
  paddingTop: "10px",
  paddingBottom: "10px",
}));
export const SentOtpTypography = styled(Typography)(() => ({
  textAlign: "center",
  color: "#656263",
  paddingTop: "10px",
  paddingBottom: "10px",
  "&& span": {
    color: "#AD184C",
    textDecoration: "underLine",
  },
}));
export const TextTypography = styled(Typography)(() => ({
  textAlign: "center",
  color: "#656263",
  paddingTop: "10px",
  paddingBottom: "10px",
  "&& span": {
    color: "#AD184C",
    textDecoration: "underLine",
  },
}));

export const PayButton = styled(Button)(() => ({
  backgroundColor: "#231F20",
  color: "#FFFFFF",
  margin: "0 auto",
  display: "flex",
  border: "1px solid",
  paddingTop: "10px",
  paddingRight: "12px",
  paddingLeft: "12px",
  borderRadius: "0",
  "&:focus": {
    outline: 0,
    border: "1px solid",
    backgroundColor: "#231F20",
  },
  "&:hover": {
    outline: 0,
    border: "1px solid",
    backgroundColor: "#231F20",
  },
}));
