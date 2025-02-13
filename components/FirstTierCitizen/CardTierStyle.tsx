import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

interface Add {
  isMobile: boolean;
  alignment: boolean;
}
export const TabBox = styled(Box)(({ isMobile }: any) => ({
  display: "flex",
  marginTop: isMobile ? "12px" : "25px",
  marginBottom: isMobile ? "20px" : "45px",
  paddingLeft: isMobile ? "16px" : "",
  backgroundColor: "white",
}));

export const Title = styled(Typography)(({}) => ({
  fontWeight: 600,
  fontSize: "22px",
  color: "#231F20",
}));
export const SubTitle = styled(Typography)(({}) => ({
  fontSize: "16px",
  color: "#4F4C4D",
  "@media(max-width:600px)": { padding: " 0 0px" },
}));
export const EnrollButton = styled(Button)(({ isMobile }: any) => ({
  background: "#231F20",
  color: "#FFFFFF",
  borderRadius: "0",
  fontSize: "12px",
  fontWeight: 600,
  padding: isMobile ? "6px 18px" : "14px 26px",
  "&:hover": {
    background: "#231F20",
    color: "#FFFFFF",
  },
}));
export const Quotes = styled(Typography)(({ direction }: any) => ({
  color: "#AD184C",
  fontWeight: "600",
  marginTop: "15px",
  fontSize: "14px !important",
  textAlign: "initial",
}));
export const TierHeader = styled(Typography)(({ isMobile }: any) => ({
  fontWeight: 500,
  fontSize: isMobile ? "12px" : "20px",
  lineHeight: "130%",
  color: "#231F20",
}));
export const RichText = styled(Grid)(({}) => ({
  marginTop: "18px",
  fontSize: "14px",
  textAlign: "initial",
  color: "#231F20",
  "& > span": {
    display: "block",
    fontSize: "14px",
    fontWeight: 500,
  },
  "&> p li": {
    fontSize: "14px",
    fontWeight: 400,
    color: "#231F20",
  },
  "&> div ul": {
    paddingLeft: "20px",
  },
}));
export const StartedText = styled(Typography)(({ isMobile }: any) => ({
  fontSize: isMobile ? "12px" : "22px",
  lineHeight: isMobile ? "15px" : "27px",
  color: "#231F20",
  fontWeight: 500,
  fontStyle: "normal",
}));
export const CheckOutText = styled(Typography)(({ isMobile }: any) => ({
  fontSize: isMobile ? "11px" : "16px",
  paddingTop: isMobile ? "3px" : "10px",
  lineHeight: "140%",
  color: " #4F4C4D",
  fontWeight: 400,
}));
export const TierDetailsGrid = styled(Grid)(({ alignment, isMobile }: Add) => ({
  display: "flex",
  padding: isMobile
    ? alignment
      ? "18px 0px 25px 0px"
      : "18px 16px 25px 16px"
    : alignment
    ? "38px 0px 40px 31px"
    : "45px 0px 45px 44px",
  flexDirection: alignment ? "row" : "row-reverse",
  justifyContent: "space-between",
}));
export const CheckOutMobileText = styled(Grid)(({ isMobile }: any) => ({
  fontSize: isMobile ? "14px" : "22px",
  lineHeight: isMobile ? "140%" : "27px",
  paddingTop: "8px",
  color: "#4F4C4D",
  fontWeight: 600,
  fontStyle: "normal",
  textAlign: "center",
}));
export const ButtonBox = styled(Box)(({ isMobile }: any) => ({
  display: "flex",
  justifyContent: isMobile ? "center" : "flex-start",
  marginTop: isMobile ? "18px" : "30px",
}));
