import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const MainBox = styled(Box)(() => ({}));
export const TitleTypography = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "20px",
  fontWeight: 500,
}));
export const TextTypography = styled(Typography)(() => ({
  color: "#252D34",
  fontSize: "14px",
}));
export const IconBox = styled(Box)(() => ({
  display: "flex",
  paddingBottom: "15px",
}));

export const ButtonBox = styled(Box)(() => ({
  textAlign: "center",
  paddingBottom: "10px",
  paddingTop: "10px",
}));
export const ButtonText = styled(Button)(() => ({
  background: "#DEA3B7",
  color: "#231F20",
  textAlign: "center",
  width: "100%",
  height: "45px",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "16px",
  borderRadius: "0",

  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
}));
