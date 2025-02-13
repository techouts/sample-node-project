import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const ConsultationTabTitle = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "140%",
  textTransform: "capitalize",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "16px",
    marginBottom: "6px"
  },
}));

export const ConsultationTabSubtitle = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontSize: "20px",
  marginTop: "16px",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "11px",
    marginTop: "10px",
  },
}));
