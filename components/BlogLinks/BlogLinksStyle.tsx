import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import  Box from "@mui/material/Box";

export const TypographyTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  padding: "17px 0px",
  letterSpacing: "0.1em",
  fontSize: " 20px",
  color: "#1C191A",
  fontWeight: "600",
  lineHeight: "24px",
  "@media (max-width: 600px)": {
    fontSize: " 12px",
    lineHeight: "14px",
    letterSpacing: "0.1em",
    color: "#231F20",

  },
}));
export const BoxStyles = styled(Box)(({ theme }) => ({
  display: "grid",
  gridGap: "15px",
  gridTemplateColumns: "repeat(4,1fr)",
}));
export const ButtonStyle = styled(Button)(({ theme }) => ({
  "@media (max-width: 600px)": {
    // padding: "6px 18px",
    margin: "18px auto",
    fontSize:'11px',
    letterSpacing:'1px',
  },
  display: "flex",
  background: "#231F20",
  borderRadius: "0px",
  margin: "40px auto",
  fontSize:'12px',
  letterSpacing: "1px",
  color: "#DEA3B7",
  "&: hover": {
    cursor: "pointer",
    background: "#231F20",
  },
}));
export const ButtonText = styled(Button)(({ theme }) => ({
  "@media (max-width: 600px)": {
    fontSize: "11px",
    padding: "4px 8px",
  },
  borderRadius: "0px",
  fontSize: "12px",
  background: "#D5CBF4",
  color: "#231F20",
  justifyContent: "center",
  textTransform:'none',
  padding:'3px 8px !important',
  "&: hover": {
    cursor: "pointer",
    background: "#D5CBF4",
    color: "#231F20",
  },
}));
export const TypographySubText = styled(Typography)(({ theme }) => ({
  fontSize: "11px",
  fontWeight: "400px",
  color: "#8A133D",
}));
export const BeautyView = styled(Box)(({ theme }) => ({
  "@media (max-width: 600px)": {
    margin: "-47px 10px 0px 10px",
  },
  display: "flex",
  alignItems: "center",
  fontSize: "small",
  justifyContent: "space-between",
  margin: "20px 20px 0px 20px",
}));
export const ViewsBox = styled(Box)(({ theme }) => ({
  "@media (max-width: 600px)": {
    background: "#ffffff",
    borderRadius: "10px",
    marginRight: "10px",
    padding:'3px 5px'
  },
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  gap:"2px",
  cursor:"pointer"
}));

export const ViewsTypography = styled(Typography)(({ theme }) => ({
  "@media (max-width: 600px)": {
     fontSize:"11px",
  },
   color: "#A7A5A6" ,
   fontSize:"12px"
}));
export const TextView = styled(Typography)(({ theme }) => ({
  justifyContent: "space-evenly",
  color: "#231F20",
  fontWeight: "600",
  fontSize: "20px",
  lineHeight: "140%",
  margin: "20px 0px 0px 20px",
  "@media (max-width: 600px)": {
    margin: "25px 5px 0px 10px",
    fontSize: "14px",
  },
}));
export const TextTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  fontSize: "20px",
  "@media (max-width: 600px)": {
    fontSize: "14px",
    marginTop: "10px",
  },
}));
export const ShareBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  "@media (max-width: 600px)": {
    margin: "10px",
    cursor:"pointer"
  },
}));
