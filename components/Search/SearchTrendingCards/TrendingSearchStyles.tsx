import {styled } from "@mui/material";
import Grid from "@mui/material/Grid";

export const MainGrid = styled(Grid)(() => ({
  display: "flex",
  textAlign: "center",
  overflowX: "auto",
  cursor: "pointer",
  "@media(max-width: 600px)": {},
}));
