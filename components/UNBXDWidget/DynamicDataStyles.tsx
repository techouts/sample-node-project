import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
export const HeaderTitle = styled(Typography)(({}) => ({
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