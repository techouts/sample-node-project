import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


export const TitleTypography = styled(Typography)(() => ({
  paddingBottom: "20px",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "24px",
}));
export const NamedBox = styled(Box)(() => ({
  paddingLeft: "15px",
}));

export const PayNowButton = styled(Button)(() => ({
  width: "100%",
  height: "44px",
  alignText: "center",
  background: "#DEA3B7",
  color: "#231F20",
  borderRadius: "0",
  letterSpacing: "0.01em",
  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
}));

export const FirstBox = styled(Box)(() => ({
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "24px",
}));

export const TextFieldBox = styled(Box)(() => ({
  "& .MuiTextField-root": " m: 1",
}));
export const BankBox = styled(Box)(() => ({
  paddingLeft: "15px",
  gap: "15px",
}));

export const SecondBox = styled(Box)(() => ({
  display: "block",
  gap: "15px",
  marginTop: "10px",
}));

export const ButtonText = styled(Button)(() => ({
  width: "100%",
  height: "45px",
  alignText: "center",
  background: "#DEA3B7",
  color: "#231F20",
  marginTop: "20px",

  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
}));
