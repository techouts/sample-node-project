import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography  from "@mui/material/Typography";

export const Title = styled(Typography)(() => ({
  fontStyle: "normal ",
  fontWeight: "400",
  fontSize: "20px",
  textAlign: "center",
  letterSpacing: "0.1em",
  marginTop: "110px",

  "@media (max-width:600px)": {
    marginTop: "94px",
    fontSize: "12px",
  },
}));
export const SmallTitle = styled(Typography)(() => ({
  fontStyle: "normal ",
  fontWeight: "400",
  fontSize: "16px",
  textAlign: "center",
  paddingTop: "10px",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const ButtonStyled = styled(Button)(() => ({
  borderRadius: 0,
  width: "20%",
  backgroundColor: "#231F20",
  marginTop: "30px",
  marginRight: "4px",
  color: "white",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  "@media(max-width:600px)": {
    marginTop: "25px",
  },
}));
export const TextFieldStyled = styled(TextField)(() => ({
  borderRadius: "unset",
}));
export const BoxStyled = styled(Box)(() => ({
  width: "75%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "53px",
  "@media(max-width:600px)": {
    paddingTop: "25px",
  },
}));

export const ForgotPasswordText = styled(Typography)(() => ({
  marginTop: "10px",
  textDecoration: "underline",
}));

export const ResetPasswordTypography = styled(Typography)(() => ({
  background: "#F7F6F9",
  fontSize: "14px",
  padding: "2%",
  margin: "5px 65px",
  textAlign: "center",
}));
