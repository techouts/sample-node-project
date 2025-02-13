import {styled} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const GridOne = styled(Grid)(({}) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  border: "1px solid #ccc",
  padding: "0px 40px",
  alignItems: "center",
  width: "100%",
  minHeight: "90px",
  cursor: "pointer",
  "@media (max-width:600px)": {
    minHeight: "49px",
    width: "100%",
    padding: "0px 20px",
    justifyContent: "space-between",
  },
}));
export const MainGrid = styled(Grid)(({}) => ({
  display: "flex",
  margin: "25px auto",
  gridGap: "16px",
  "@media (max-width:600px)": {
    flexDirection: "column",
    gridGap: "25px",
    padding: "0px 16px",
  },
}));
export const IconGrid = styled(Grid)(({}) => ({
  marginTop: "6px",
}));
export const CardTypography = styled(Typography)(({}) => ({
  color: "#AD184C",
  fontSize: "20px",
  fontWeight: 500,
  textAlign: "center",
  textTransform:"capitalize",
  "@media (max-width:600px)": {
    fontSize: "14px",
  },
}));

export const ParentBox = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#BD4670",
  padding: "20px",
  width: "100%",
  margin: "40px 0px",
  "@media (max-width:600px)": {
    margin: "25px 0px",
  }
}));

export const TypographyBanner = styled(Typography)(({}) => ({
  fontSize: "30px",
  textAlign: "center",
  fontWeight: 500,
  color: "#fff",
  "@media (max-width:600px)": {
    fontSize: "15px",
  },
}));

export const ButtonStack = styled(Stack)(({}) => ({
  display: "flex",
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  gridGap: "5px",
  alignItems: "center",
  padding: "12px",
  "@media (max-width:600px)": {
    padding: "5px",
  },
}));

export const IconTypography = styled(Typography)(({}) => ({
  whiteSpace: "nowrap",
  fontWeight: 500,
  color:"#231F20",
  fontSize: "12px",
  marginRight: "11px",
  cursor: "pointer",
  "@media (max-width:600px)": {
    fontSize: "11px",
  },
}));
export const BeautyHeaderTitle = styled(Typography)(({}) => ({
  color: "#1C191A",
  fontSize: "20px",
  textAlign: "center",
  letterSpacing: "0.1em",
  lineHeight: "24px",
  marginBottom:"18px",
  "@media (max-width:600px)": {
    fontSize: "12px",
    lineHeight: "14px",
    marginBottom:"10px"
  }
}));
export const BeautyTitle = styled(Typography)(({}) => ({
  fontWeight: 500,
  fontSize: "16px",
  color: "#000000",
  margin: "20px 0 8px 0",
  lineHeight:"22px",
  letterSpacing: "0.15px",
  textAlign: "center",
  "@media (max-width:600px)": {
    fontSize: "12px",
    margin: "8px 0 8px 0",
    lineHeight:"140%",
  },
}));
export const BeautySubtitle = styled(Typography)(({}) => ({
  fontWeight: 400,
  fontSize: "13px",
  color: "#656263",
  textAlign: "center",
  letterSpacing: "0.15px",
  lineHeight:"150%",
  "@media (max-width:600px)": {
    fontSize: "10px",
    lineHeight:"140%",
  },
}));
