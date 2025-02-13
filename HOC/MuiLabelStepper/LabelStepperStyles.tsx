import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography  from "@mui/material/Typography";
interface Responsive {
  isMobile: boolean;
}

export const  StepLabel= styled(Typography)(() => ({
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 600,
  marginRight: "8px",
  lineHeight: "20px",
  textTransform : "capitalize"
}));
export const DotsGrid=styled(Grid)(({isMobile}:Responsive)=>({
  fontSize: isMobile ? "16px" : "30px",
  marginBottom: isMobile ? "7px" : "15px",
}))

