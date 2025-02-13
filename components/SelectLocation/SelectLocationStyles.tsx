import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";

interface Add {
  isMobile: boolean;
}

export const TypographyTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "16px",
  textTransform: "uppercase",
  padding: "5px 0px ",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const TypographyAddressText = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "14px",
  padding: "5px 0px ",
  color: "#4F4C4D",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));
export const TypographyCustName = styled(Typography)(() => ({
  fontWeight: " 600",
  fontSize: "16px",
  padding: "5px 0px ",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const TypographySignIn = styled(Typography)(() => ({
  backgroundColor: "#DEA3B7",
  padding: "10px",
  fontSize: "14px",
  cursor: "pointer",
  fontWeight: "600",
  "@media(max-width:600px)": {
    fontSize: "11px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #DEA3B7",
  },
}));
export const TypographySignUp = styled(Typography)(() => ({
  backgroundColor: "#DEA3B7",
  padding: "10px",
  fontSize: "14px",
  cursor: "pointer",
  fontWeight: "600",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));
export const TypographyOr = styled(Typography)(() => ({
  textAlign: "center",
  fontSize: "14px",
  paddingTop: "10px",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));
export const TypographyNum = styled(Typography)(() => ({
  fontWeight: " 500",
  fontSize: "16px",
  marginTop: "10px",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const TypographyLocText = styled(Typography)(() => ({
  fontWeight: " 400",
  fontSize: "12px",
  cursor: "pointer",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));

export const RadioButtonStyle = styled(RadioGroup)(() => ({
  "& .MuiButtonBase-root-MuiRadio-root ": {
    position: "relative",
    "&.MuiButtonBase-root:hover": {
      bgcolor: "transparent",
    },
    "& .Mui-checked": {
      color: "#AD184C",
    },
  },
  
  "@media(max-width:600px)": {
    padding: "0px",
  },
}));

export const TypographyAddress = styled(Typography)(() => ({
  fontWeight: " 400",
  fontSize: "14px",
  color: "#4F4C4D",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const Typographyedit = styled(Typography)(() => ({
  fontWeight: " 400",
  fontSize: "12px",
  textDecorationLine: "underline",
  color: "#AD184C",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));
export const TypographyShowMore = styled(Typography)(() => ({
  fontWeight: " 400",
  fontSize: "12px",
  color: "#AD184C",
  textAlign: "center",
  cursor: "pointer",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));
export const TypographyShowLess = styled(Typography)(() => ({
  fontWeight: " 400",
  fontSize: "12px",
  color: "#AD184C",
  textAlign: "center",
  cursor: "pointer",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));
export const TextFieldBox = styled(TextField)(() => ({
  padding: "10px 0px",
  border: "none",
  "& .MuiOutlinedInput-root": {
    paddingRight: "0px",
    borderRadius: "0px",
    border: "1px solid #EAEAEA",
  },
  "& .MuiInputAdornment-root": {
    display: "contents",
  },
  "& .css-1wc848c-MuiFormHelperText-root ": {
    color: "red",
  },
  width: "100%",
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    padding: "3%",
  },
  "& .css-1j2lu4k-MuiButtonBase-root-MuiButton-root:hover": {
    background: "black",
    color: "#DEA3B7",
    outline: "none",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid lightgray",
  },
  // To remove up and down arrows in input
  "input::-webkit-outer-spin-button,input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "input[type=number]": {
    "-moz-appearance": "textfield",
  },
}));
export const Buttonlabel = styled(Button)(() => ({
  backgroundColor: "black",
  color: "#DEA3B7",
  borderRadius: 0,
  padding: "2.6% 10%",
  fontSize: "12px",
  height: "100%",
  "@media(max-width:600px)": {
    height: "90%",
  },
  margin: "0.5%",
  "&:hover": {
    background: "black",
    color: "pink",
    outline: "1px solid rgba(222, 163, 183, 1)",
  },
}));
export const MainGrid = styled(Grid)(() => ({
  textAlign: "center",
  margin: "15px 0px",
}));
export const TypographyBlock = styled(Typography)(() => ({
  textAlign: "center",
  paddingTop: "15px",
  fontSize: "16px",
  fontWeight: "600",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));
export const Boxbutton = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  paddingTop: "20px",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));
export const ButtonMain = styled(Box)(() => ({
  backgroundColor: "#DEA3B7",
  color: "black",
  padding: "8px 30px",
  textAlign: "center",
  fontFamily: "Montserrat",
  "&:hover": { backgroundColor: "#DEA3B7" },
}));
export const TypographyHeader = styled(Typography)(() => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
}));
export const TypographyPlace = styled(Typography)(({ isMobile }: Add) => ({
  backgroundColor: "#EAE9EF",
  textAlign: "center",
  fontSize: isMobile ? "11px" : "14px",
  lineHeight: isMobile ? "13.2px" : "16.7px",
  padding: "5px",
  marginRight: "10px",
  marginBottom: "10px",
  flexWrap: "wrap",
}));
