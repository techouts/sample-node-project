import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const HeadingTypography = styled(Typography)({
  margin: "13px",
  textAlign: "center",
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "24px",
  color: "#1C191A",
  "@media(max-width:600px)": {
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "150%",
    color: "#1C191A",
  },
});

export const BuyingGuidesBox = styled(Box)({
  backgroundColor: "rgb(255,255,255)",
  textAlign: "center",
  columnGap: "16px",
  justifyContent: "center",
  flexDirection: "row",
  "@media(max-width:600px)": {
    flexDirection: "column",
    rowGap: "12px",
    padding: "0px 16px",
  },
});

export const MainBox = styled(Box)({
  position: "relative",
});

export const GradientBox = styled(Box)({
  background: "linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 68%)",
  bottom: 0,
  position: "absolute",
  width: "100%",
  height: "100%",
});

export const TextBox = styled(Box)({
  position: "absolute",
  bottom: "10%",
  width: "100%",
  "@media(max-width:600px)": {
    bottom: "5px",
  },
});

export const TitleTypography = styled(Typography)({
  fontWeight: "600",
  fontSize: "22px",
  lineHeight: "32px",
  color: "#FFFFFF",
  "@media(max-width:600px)": {
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#FFFFFF",
  },
});

export const SubTypography = styled(Typography)({
  fontWeight: "400",
  fontSize: "16px",
  color: "#E0E0E0",
  "@media(max-width:600px)": {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "32px",
    color: "#FFFFFF",
  },
});

export const ButtonBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "32px",
  "@media(max-width:600px)": {
    marginTop: "25px",
  },
});

export const ShopButton = styled(Button)({
  background: "#231F20",
  width: "265px",
  height: "64px",
  padding: "20px 50px",
  color: "#FFFFFF",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "24px",
  borderRadius: "0px",
  "&:hover": {
    background: "#231F20",
  },
  "@media(max-width:600px)": {
    padding: "15px 56px",
    background: "#231F20",
    width: "256px",
    height: "54px",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "24px",
  },
});
