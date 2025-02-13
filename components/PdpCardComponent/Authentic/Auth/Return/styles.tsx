import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const TypographyProduct = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  fontSize: "30px",
  marginTop: "20px",
}));

export const TypographyText = styled(Typography)(({ theme }) => ({
  fontWeight: "400",
  fontSize: "16px",
  paddingTop: "10px",
  lineHeight:"27.2px",
  "@media(max-width:768px)": {
    fontSize: "12px",
    lineHeight:"20px", 
  },
}));
export const ButtonInfo1 = styled(Button)(({ theme }) => ({
  backgroundColor: "#231F20",
  color: "#DEA3B7",
  marginTop: "26px",
  padding:"14px 26px",
  borderRadius: "0px",
  fontSize:"12px",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  "@media(max-width:768px)": {
    fontSize: "12px",
    padding:"6px 18px",
    marginTop: "12px",
  },
}));
export const ButtonInfo2 = styled(Button)(({ theme }) => ({
  backgroundColor: "#231F20",
  color: "#DEA3B7",
  marginTop: "29px",
  borderRadius: "0px",
  padding:"14px 26px",
  marginBottom: "30px",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  "@media(max-width:768px)": {
    fontSize: "12px",
    marginTop: "12px",
     padding:"6px 18px",
   
  },
}));
