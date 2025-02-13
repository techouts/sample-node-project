import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const PrimaryBox = styled(Box)(() => ({
  width: "100%",
  paddingTop: "130px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  "@media (max-width:600px)": {
    pt: "94px",
  },
}));
export const Title = styled(Typography)(() => ({
  fontStyle: "normal ",
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "24px",
  textAlign: "center",
  letterSpacing: "0.1em",
  "@media(max-width:600px)": {
    fontSize: "12px",
    paddingTop: "10px",
  },
}));
export const SmallTitle = styled(Typography)(() => ({
  fontStyle: "normal ",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "22.4px",
  textAlign: "center",
  paddingTop: "10px",
  width: "90%",

  "@media(max-width:600px)": {
    fontSize: "12px",
    paddingTop: "10px",
  },
}));
export const TextFieldStyled = styled(TextField)(() => ({
  borderRadius: "unset",
}));
export const BoxStyled = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "53px",
  "@media(max-width:600px)": {
    paddingTop: "25px",
  },

  "& .MuiFormLabel-root.MuiInputLabel-root": {
    padding: "1px",
    color: "#231F20 !important",
  },
  "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
    color: "#AD184C !important",
  },
}));

export const ButtonStyled = styled(Button)(() => ({
  borderRadius: 0,
  padding: "18px",
  width: "30%",
  backgroundColor: "#231F20",
  color: "white",
  letterSpacing: "1px",
  lineHeight: "16px",
  fontWeight: "300",
  fontSize: "12px",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  "@media(max-width:600px)": {
    position: "absolute",
    top: "100%",
    transform: "translate(115%,9%)",
    padding: "5px",
    minWidth: "84px",
    marginTop: "25px",
  },
}));
