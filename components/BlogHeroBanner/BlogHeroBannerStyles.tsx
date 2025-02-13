import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography  from "@mui/material/Typography";
interface Responsive{
  isMobile:boolean
}

export const TypographyChip = styled(Typography)(({isMobile}:Responsive) => ({
  color: "black",
  background: "#D5CBF4",
  display: "inline-block",
  padding:isMobile ? "4px 8px ":"3px 12px",
  fontSize:isMobile ? "10px":"12px",
  fontWeight:"400"
}));


export const TypographyImagetext = styled(Typography)(({isMobile}:Responsive) => ({
  fontSize: isMobile ? "14px" : "20px",
  fontWeight:"600",
  lineHeight:'140%',
  color: "#FFFFFF",
}));

export const TypographyButton = styled(Typography)(({isMobile}:Responsive) => ({
  color: "black",
  background: "#DEA3B7",
  display: "inline-block",
  padding: isMobile? "6px 18px": "14px 26px",
  fontSize: isMobile ?"11px": "12px",
  fontWeight: "600",
  cursor:'pointer'
}));

export const MainBoxView = styled(Box)(({isMobile}:Responsive) => ({
  position: "absolute",
  left: isMobile ?"18%":"35%",
  bottom: isMobile ? "20%":"5%",
  zIndex: "2",
  marginLeft:"3%",
  maxWidth: isMobile ? "187px": "300px",
}));

export const ImagesBox = styled(Box)({
  alignItems: "center",
  display: "flex",
  height: "400px",
  margin: " 0 auto",
  position: "relative",
  justifyContent: "space-between",
});
