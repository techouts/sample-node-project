import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const MainCard = styled(Card)(() => ({
  boxShadow: "none",
}));

export const ButtonText = styled(Button)(() => ({
  backgroundColor: "#DEA3B7",
  color: "#231F20",
  height: "44px",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "16px",
  borderRadius: "0",

  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
}));

export const TitleText = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "500",
  paddingBottom: "20px",
  color: "#252D34"
}));

export const MainDivider = styled(Divider)(() => ({
  color: "gray",
}));

export const Radiovocher = styled(RadioGroup)(() => ({
  "& .MuiRadio-root.Mui-checked": {
    color: "#AD184C",
  },
}));

export const TextFieldPay = styled(TextField)(() => ({
  "& label.Mui-focused": {
    color: "#AD184C",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
  },
  "& .MuiOutlinedInput-root div p": {
    color: "#AD184C",
  },
}));

export const TextFieldtext = styled(InputAdornment)(() => ({
  cursor: "pointer",
  color:"#AD184C",
   textDecoration: "underline",
}));

export const PriceBox = styled(Box)(() => ({
  border: "1px solid #ccc",
  padding: "15px",
  width:"100%",
  textAlign: "center",
  backgroundColor: "#EAEAEA",
}));
