import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

interface BeautyTips {
  isMobile: boolean;
}
export const TextTypography = styled(Box)(({ isMobile }: BeautyTips) => ({
  color:"#2d2d2d !important",
  fontWeight: "400",
  "h2,h3,h4": {
    lineHeight: "140%",
    margin: "0px !important",
    fontSize: isMobile ? "12px !important" : "20px !important",
  },
  "&> div,p,ol,ul": {
    fontSize: isMobile ? "12px" : "18px",
    lineHeight: "140%",
    margin: "0px !important",
  },
}));
export const QuoteTypography = styled(Typography)(
  ({ isMobile }: BeautyTips) => ({
    fontStyle: "italic",
    fontWeight: "400",
    lineHeight: "140%",
    color: "#231F20",
    paddingTop: isMobile ? "15px" : "15px",
    fontSize: isMobile ? "12px" : "40px",
    paddingBottom: isMobile ? "0px" : "20px",
  })
);
