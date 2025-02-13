import {styled} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const MainBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));
export const CreditCardTypography = styled(Typography)(() => ({
  paddingBottom: "20px",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "24px",
  color: "#252D34",
}));
export const ExpDateBox = styled(Box)(() => ({
  display: "grid",
  flexDirection: "column",
}));
export const CvvBox = styled(Box)(() => ({
  display: "grid",
  flexDirection: "column",
  width: "80%",
}));
export const CardTextField = styled(TextField)(() => ({
  paddingBottom: "16px",
  "& .MuiOutlinedInput-root": {
    fontWeight: "400",
    fontSize: "14px",
    color: "#A7A5A6",
  },
}));
export const ErrorTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "140%",
  color: "#EB5757",
}));
export const DateErrorTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "140%",
  color: "#EB5757",
}));
export const CvvErrorTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "140%",
  color: "#EB5757",
}));
export const SelectBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));
export const FlexBox = styled(Grid)(() => ({
  display: "flex",
  gap: "10px",
}));
export const ButtonBox = styled(Box)(() => ({
  marginBottom: "15px",
}));
export const PayButton = styled(Button)(() => ({
  borderRadius: "0",
  background: "#DEA3B7",
  height: "44px",
  color: "#231F20",
  ":hover": {
    backgroundColor: "#DEA3B7",
  },
}));

export const SaveTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "20px",
  color: "#231F20",
}));

export const AutoCompleteGrid = styled(Autocomplete)(() => ({
  height: "36px",
  border: "1px solid #E7E7E7",
  display: "flex",
  alignItems: "center",
}));

export const OtherBankTypography = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "20px",
  color: "#231F20",
  marginTop: "20px",
  marginBottom: "12px",
}));
