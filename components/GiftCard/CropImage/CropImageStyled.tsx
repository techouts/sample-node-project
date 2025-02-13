import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const TitleTypography = styled(Typography)(() => ({
  fontStyle: "normal ",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "24px",
  textAlign: "center",
  letterSpacing: "0.1em",
  color: "#1C191A",
  "@media(max-width:600px)": {
    fontSize: "16px",
    paddingTop: "10px",
  },
}));
export const InfoTypography = styled(Typography)(() => ({
  fontStyle: "normal ",
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "24px",
  textAlign: "center",
  letterSpacing: "0.1em",
  color: "#1C191A",
  padding: "20px 0px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    paddingTop: "10px",
  },
}));

export const BoxStyled = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "53px",
  "@media(max-width:600px)": {
    paddingTop: "25px",
  },
  "& .MuiFormControl-root.MuiTextField-root": {
    padding: "2px 1px",
  },
  "& .MuiFormLabel-root.MuiInputLabel-root": {
    padding: "0px",
    color: "#231F20 !important",
  },
  "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
    color: "#AD184C !important",
  },
}));

export const ButtonStyled = styled(Button)(({ disabled }: any) => ({
  borderRadius: 0,
  padding: "13px 36px",
  height: "43px",

  backgroundColor: "#231F20",
  color: "white !important",
  letterSpacing: "1px",
  lineHeight: "16px",
  fontWeight: "500",
  fontSize: "12px",
  margin: "3px",
  opacity: disabled ? "0.5" : "",

  "&:hover": {
    backgroundColor: "#231F20",
  },
  "@media(max-width:600px)": {
    fontSize: "11px",
    width: "100%",
    height: "28px",
  },
}));
