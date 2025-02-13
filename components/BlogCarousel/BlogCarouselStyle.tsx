import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  textAlign: "center",
  letterSpacing: "0.1em",
  fontWeight:"600",
  marginTop: "40px",
  marginBottom: "18px",
  color: '#1C191A',
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight:"14.32px",
    marginTop: "30px",
    // marginBottom: "10px",
    color: "#231F20",
  },
}));
export const BeautyButton = styled(Button)(({ theme }) => ({
  borderRadius: "0px",
  color: "#231F20",
  textTransform:'none',
  padding:'2px 8px !important',
  backgroundColor: "#D5CBF4",
  "@media(max-width:600px)": {
    padding: "4px 12px",
  },
  "&:hover": {
    background: "#D5CBF4",
    color: "#231F20",
    cursor:"pointer"
  },
}));

export const ViewAllbutton = styled(Button)(({ theme }) => ({
  borderRadius: "0px",
  color: "#DEA3B7",
  backgroundColor: " #231F20",
  // padding: "14px 26px",
  margin: "40px auto",
  letterSpacing:'1px',
  display: "flex",
  fontSize:'12px',
  "@media(max-width:600px)": {
    // padding: "6px 18px",
    margin: "20px auto",
    cursor: "pointer",
    fontSize:'11px'
  },
  "&:hover": {
    background: "#231F20",
    color: "#DEA3B7",
    cursor:"pointer"
  },
}));
export const DisplayBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  // margin: "20px 20px 0px 20px",
  fontSize: "12px",
  alignItems: "center",
  "@media(max-width:600px)": {
    margin: "-64px 10px 10px 10px",
    fontSize: "11px",
  },
}));
export const MainBox = styled(Box)(() => ({
  boxShadow:"0px 0px 25px rgba(0, 0, 0, 0.05)",
  backgroundColor:"#fff",
  padding:"20px"
}));
export const ViewsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: "#FFFFFF",
  gap: "5px",
  borderRadius: "10px",
  padding:"3px 5px"
}));
export const ViewsTypograhy = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  lineHeight: "140%",
  color: "#A7A5A6",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));
export const DisplayBottom = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
  alignItems: "center",
  "@media(max-width:600px)": {
    marginTop: "10px",
  },
}));

export const TitleTypography = styled(Typography)(({ theme }) => ({
  marginTop: "15px",
  fontWeight: "600",
  fontStyle: "normal",
  fontSize: "20px",
  lineHeight: "140%",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "14px",
  },
}));
export const SubTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "140%",
  color: "#8A133D",
  cursor: "pointer",
}));
export const Typographytext = styled(Typography)(({ theme }) => ({
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "16px",
  color: "#656263",
}));
export const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  cursor:"pointer"
}));

export const ReadBox = styled(Typography)(({ theme }) => ({
  color: "#7B7979",
  fontSize: "14px",
  marginTop:"10px",
  lineHeight: "16px",
  alignItems: "center",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));
export const AlignBox = styled(Box)(({ theme }) => ({
  // margin: "25px 20px 20px 20px",
  "@media(max-width:600px)": {
    margin: "25px 10px 0px 10px",
  },
  cursor:"pointer"
}));
