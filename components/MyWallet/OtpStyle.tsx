import styled from "@emotion/styled";
import { Grid } from "@mui/material";
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
export const FirstParent = styled(Grid)((theme) => ({
  width: "85%",
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
  margin: "12px auto",
  fontWeight: "600",
}));
export const SubtitleGrid = styled(Grid)((theme) => ({
  marginBottom: "35px",
  fontSize: "15px",
  wordSpacing: "2px",
}));
export const PButton = styled(Grid)((theme) => ({
  width: "180px",
  padding: "12px 20px",
  textAlign: "center",
  backgroundColor: "#333",
  color: "#fff",
  cursor: "pointer",
  margin: "35px auto",
}));
// Address Component Style
export const NumParent = styled(Grid)((theme) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "60px",
  marginBottom: "12px",
  textAlign: "center",
}));
export const OnlyNum = styled(Grid)((theme) => ({
  fontWeight: "bold",
  color: "#AD184C",
  marginLeft: "5px",
}));
export const SendOtp = styled(Grid)((theme) => ({
  margin: "25px auto",
  textAlign: "center",
  color: "#7B7979",
  "& > span": {
    color: "#AD184C",
    cursor: "pointer",
    fontWeight: "600",
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