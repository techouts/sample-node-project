import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
interface Responsive {
  isMobile: boolean;
}
export const GDCardOne = styled(Grid)((theme) => ({
  position: "fixed",
  background: "#33333395",
  width: "100%",
  height: "100vh",
  top: "0",
  left: "0",
}));
export const GDCardTwo = styled(Grid)((theme) => ({
  position: "relative",
  width: "50%",
  height: "100%",
  margin: "0px auto",
  marginTop: "104px",
  background: "#fff",
  borderRadius: "4px",
  border: "1px solid #999",
  "@media (max-width: 600px)": {
    marginTop: "98px",
    width: "100%",
  },
}));
export const GDCardThree = styled(Grid)((theme) => ({
  position: "fixed",
  right: "calc(29% - 30px)",
  top: "calc(100vh - 83vh)",
  cursor: "pointer",
  width: "26px",
  height: "26px",
  paddingTop: "3.3px",
  paddingRight: "1.4px",
  color: "#AD184C",
  lineHeight: "18px",
  textAlign: "center",
  fontWeight: "900",
  "::after": {
    content: '"X"',
  },
  "@media (max-width: 600px)": {
    right: "calc(10% - 30px)",
    top: "calc(100vh - 84vh)",
  },
}));
// Password Component Style
export const FirstParent = styled(Grid)(({ isMobile }: Responsive) => ({
  width: isMobile ? "" : "85%",
  margin: "40px auto",
}));
export const PTitle = styled(Grid)((theme) => ({
  textAlign: "center",
}));
export const TitleGrid = styled(Grid)((theme) => ({
  fontSize: "20px",
  wordSpacing: "5px",
  letterSpacing: "1px",
  color: "#1C191A",
  margin: "0px auto",
  lineHeight: "24px",
  fontWeight: "400",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "14px",
  },
}));
export const SubtitleGrid = styled(Grid)((theme) => ({
  marginBottom: "35px",
  fontSize: "16px",
  wordSpacing: "2px",
  fontWeight: "400",
  paddingTop: "10px",
  lineHeight: "24px",
  color: "#4F4C4D",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    paddingTop: "5px",
    lineHeight: "14px",
    marginBottom: "25px",
  },
}));
export const PButton = styled(Grid)((theme) => ({
  cursor: "pointer",
  minWidth: "117px",
  minHeight: "44px",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  background: "#231F20",
  color: "#ffffff",
  fontSize: "12px",
  "@media (max-width: 600px)": {
    minHeight: "28px",
    minWidth: "109px",
    fontSize: "11px",
  },
}));
export const VerifyButtonBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}));
// Address Component Style
export const NumParent = styled(Grid)((theme) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "70px",
  marginBottom: "20px",
  textAlign: "center",
  lineHeight: "24px",
  "@media (max-width:600px)": {
    marginTop: "25px",
  },
}));
export const OtpNumber = styled(Grid)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "#656263",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const OnlyNum = styled(Grid)((theme) => ({
  fontWeight: "400",
  color: "#AD184C",
  marginLeft: "5px",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const SendOtp = styled(Grid)((theme) => ({
  margin: "28px auto 36px",
  textAlign: "center",
  color: "#7B7979",
  fontSize: "14px",
  "@media (max-width:600px)": {
    margin: "25px auto 25px",
    fontSize: "12px",
  },
  "& > span": {
    color: "#AD184C",
    cursor: "pointer",
    fontWeight: "400",
    textDecoration: "underline",
  },
}));
export const ImageGrid = styled(Grid)((theme) => ({
  display: "none",
  width: "50%",
  margin: "10px auto",
  "@media (max-width: 600px)": {
    display: "block",
  },
}));
export const TimerTypography = styled(Typography)(() => ({
  color: "#656263",
  fontWeight: "400",
  textAlign: "center",
  margin: "16px",
}));
export const ResendOtpTypography = styled(Typography)(() => ({
  cursor: "pointer",
  color: "#AD184C",
  textDecoration: "underline",
}));
export const MainBox = styled(Box)(({ isMobile }: any) => ({
  display: "flex",
  justifyContent: "center",
  margin: isMobile ? 0 : 2,
  gap: "5px",
}));
