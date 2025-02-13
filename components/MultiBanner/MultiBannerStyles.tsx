import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const ViewAllText: any = styled(Box)(() => ({
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "12px",
  lineHeight: "140%",
  textAlign: "right",
  letterSpacing: "1px",
  color: "#AD184C",
  alignItems: "center",
  cursor: "pointer",
}));
export const CTAText = styled(Typography)(() => ({
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "140%",
  paddingTop: "5px"
}))