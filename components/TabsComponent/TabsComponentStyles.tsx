import styled from "@emotion/styled";
import Button from "@mui/material/Button";

interface Add {
  isMobile: boolean;
}

export const ButtonItem = styled(Button)(({ isMobile }: Add) => ({
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center",
  letterSpacing: "1px",
  color: "#231F20",
  height: isMobile ? "30px" : "62px",
  borderRadius: "0",
  boxShadow: "none",
}));
