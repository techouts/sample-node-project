import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const CarouselTitle = styled(Typography)(({ isMobile }: any) => ({
  fontSize: `${isMobile ? "16px" : "40px"}`,
  fontWeight: "700",
  color: "#1C191A",
  lineHeight: `${isMobile ? "20px" : "49px"}`,
  textAlign: `${isMobile ? "left" : "center"}`,
  marginLeft: `${isMobile ? "16px" : ""}`,
  width: `${isMobile ? "72px" : ""}`,
}));

export const PlusImageTag = styled(Box)(({ itemTop, itemLeft }: any) => ({
  position: "absolute",
  marginTop: `${itemTop}`,
  marginLeft: `${itemLeft}`,
  cursor: "pointer",
  width: "10px",
  height: "10px",
  zIndex: "999",
}));

// Last Button
export const ShopButton = styled(Button)(() => ({
  backgroundColor: "#231F20",
  fontSize: "12px",
  margin: "30px auto",
  padding: "14px 26px",
  borderRadius: "0px",
  letterSpacing: "1px",
  color: "#DEA3B7",
  "&:hover": {
    backgroundColor: "#231F20",
  },
}));

export const TooltipTextStyleButton = styled(Button)(() => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "0px",
  border: "none",
  letterSpacing: "1px",
  color: "#231F20",
  fontWeight: 500,
  "&:hover": {
    border: "none",
    backgroundColor: "#FFFFFF",
  },
}));
