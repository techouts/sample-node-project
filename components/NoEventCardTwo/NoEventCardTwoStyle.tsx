import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export const CardTitle = styled(Typography)(() => ({
  textAlign: "center",
  fontWeight: 700,
  fontSize: "40px",
  lineHeight: "142%",
  textTransform: "capitalize",
  color: "#000000",
  "@media (max-width: 600px)": {
    fontSize: "16px",
  },
}));

export const TotalCard = styled(Grid)(() => ({
  margin: "30px auto 50px auto",
  "@media (max-width: 600px)": {
    margin: "10px auto 25px auto",
  },
}));

export const ImageAndTitleWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "end",
}));

export const SingleImageBox = styled(Box)(() => ({
  position: "relative",
  display: "inline-block",
}));

export const ImageOverTitle = styled(Typography)(() => ({
  padding: "18px 12px",
  fontSize: "20px",
  lineHeight: "32px",
  position: "absolute",
  zIndex: "999",
  margin: "0 auto",
  left: 0,
  right: 0,
  textAlign: "start",
  bottom: "35%",
  background: "rgba(35, 31, 32, 0.7)",
  fontFamily: "Montserrat",
  color: "#FFFFFF",
  width: "96%",
  display: "inline-block",
  verticalAlign: "middle",
  "@media (max-width: 600px)": {
    padding: "10px",
    fontSize: "12px",
    bottom: "36%",
    lineHeight: "17px",
  },
}));

export const SingleImageUnderContentBox = styled(Box)(() => ({
  border: "1px solid #A7A5A6",
  borderTop: "none",
  width: "100%",
  marginTop: "-7px",
  textAlign: "start",
  padding: "20px 20px 28px 20px",
  "@media (max-width: 600px)": {
    padding: "14px 14px 20px 14px",
  },
}));

export const DateSubtitle = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "28px",
  color: "rgba(0, 0, 0, 0.8)",
  "@media (max-width: 600px)": {
    fontSize: "11px",
    lineHeight: "18px"
  },
}));
