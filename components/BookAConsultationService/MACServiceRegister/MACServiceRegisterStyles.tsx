import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const MakeupTrailTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "20px",
  lineHeight: "32px",
  color: "#231F20",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "17px",
  },
}));

export const StoreAddressText = styled(Typography)(() => ({
  fontSize: "18px",
  color: "#231F20",
  textTransform: "capitalize",
  "@media (max-width: 600px)": {
    fontSize: "12px",
  },
}));

export const PriceText = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#231F20",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "17px",
    color: "#000000",
  },
}));

export const EventesUpdatedText = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#231F20",
}));

export const ClickProceedText = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#231F20",
}));

export const TermsConditionText = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#AD184C",
  cursor: "pointer",
  marginLeft: "3.7px",
  textDecoration: "underline",
  "@media (max-width: 600px)": {
    marginLeft: "0px",
  },
}));

export const TermsBox = styled(Box)(() => ({
  display: "flex",
  "@media (max-width: 600px)": {
    display: "block",
  },
}));

export const CheckBoxAndText = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

export const TextFieldsBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  rowGap: "18px",
  margin: "32px 0px 18px 0px",
  "@media (max-width: 600px)": {
    margin: "32px 0px 26px 0px",
  },
}));

export const EachTextField = styled(TextField)(() => ({
  "& .MuiInputLabel-root": { color: "#A7A5A6" },
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: "#EAEAEA",
    },
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "#AD184C",
  },
  "& .MuiOutlinedInput-root": {
    "& > fieldset": {
      border: "1px solid #EAEAEA",
      borderRadius: "0%",
    },
  },
}));

export const ProceedButton = styled(Button)(() => ({
  fontWeight: 500,
  fontSize: "12px",
  letterSpacing: "1px",
  color: "#231F20",
  borderRadius: "0%",
  width: "200px",
  padding: "14px 0px",
  margin: "20px 0px",
  textTransform: "uppercase",
  backgroundColor: "#DEA3B7",
  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
  "@media (max-width: 600px)": {
    width: "100%",
    padding: "8px 0px",
    fontSize: "11px",
    margin: "25px 0px",
  },
}));
