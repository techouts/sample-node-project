import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import  Grid  from "@mui/material/Grid";

export const TypographyToastClose = styled(Typography)(() => ({
  position: "absolute",
  right: "2%",
  top: "18px",
  cursor: "pointer",
}));

export const MainBox = styled(Grid)(() => ({
  textAlign: "center",
}));
