import styled from "@emotion/styled"; 
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export const TitleTextGift = styled(Grid)(() => ({
  fontSize: "24px",
  fontWeight: "700",
  color: "#AD184C",
}));
export const OrderDetails = styled(Grid)(() => ({
  fontWeight: "600",
  fontSize: "18px",
}));
export const ButtonGift = styled(Button)(() => ({
  backgroundColor: "#F8EDF1",
  fontSize: "14px",
  height: "45px",
}));
export const SubmitButton = styled(Button)(() => ({
  padding: "14px 26px 13px 26px",
  backgroundColor: "#231F20",
  color: "#DEA3B7",
  borderRadius: "none",
}));
export const SubmitBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
}));
export const TextFieldsGift = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    height: "185px",
  },
}));
