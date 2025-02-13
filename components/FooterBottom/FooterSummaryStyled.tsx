import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";

export const TextTypography = styled(Grid)(() => ({
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "16px",
  color: "#000000",
  paddingBottom: "10px",
  "@media(max-width:600px)": {
    paddingBottom: "12px",
    fontSize: "14px",
  },
}));

export const TextDescription = styled(Grid)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  paddingBottom: "18px",
  "@media(max-width:600px)": {
    paddingBottom: "25px",
    fontSize: "11px",
  },
}));
