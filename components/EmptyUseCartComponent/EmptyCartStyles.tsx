import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

interface Bag {
  isMobile: boolean;
}
export const ContentBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  alignItems:"center"
}));
export const TextTypography = styled(Typography)(({ isMobile }: Bag) => ({
  fontSize: isMobile ? "16px" : "20px",
  lineHeight: "150%",
  fontWeight: 400,
  color: "#000000",
}));
export const ShoppingButton = styled(Button)(({ isMobile }: Bag) => ({
  backgroundColor: "#DEA3B7",
  borderRadius: "0px",
  color: "#231F20",
  width:isMobile?"90%":"30%",
  height:"44px",
  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
  fontSize: "14px",
  lineHeight: "16px",
  textTransform:"uppercase",
  letterSpacing:"1px",
  textAlign:"center",
  fontWeight:500,
  cursor:"pointer"
}));
