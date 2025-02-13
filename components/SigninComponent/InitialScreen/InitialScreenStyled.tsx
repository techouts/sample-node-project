import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const Title = styled(Typography)(() => ({
  fontStyle: "normal ",
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "24px",
  textAlign: "center",
  letterSpacing: "0.1em",
  color: "#1C191A",
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
  color: "#4F4C4D",

  "@media(max-width:600px)": {
    fontSize: "12px",
    paddingTop: "10px",
  },
}));
export const TextFieldStyled = styled(TextField)(() => ({
  borderRadius: "unset",

  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
    width: "100%",
  },
  "& .MuiFormLabel-root.MuiInputLabel-root": {
    color: "#231F20 !important",
  },
  "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
    color: "#AD184C !important",
  },
  "& .MuiFormHelperText-root": {
      display:"flex",
      justifyContent:"left",
      marginLeft:"0px",
      marginRight:"0px",
      fontSize: "12px",
    "@media (max-width:1300px)": {
      fontSize: "11px",
    },
    "@media (max-width:600px)": {
      fontSize: "9px",
    },
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
    position: "absolute",
    top: "100%",
    padding: "6px 17.5px",
    height: "28px",
    marginTop: "32px",
    fontSize: "11px",
  },
}));
