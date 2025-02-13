import {styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const ViewText = styled(Typography)(() => ({
  fontSize: "10px",
  color: "#AD184C",
}));
export const MainTabs = styled(Box)(() => ({
  borderBottom: 1,
  borderColor: "divider",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
export const MainTabsMob = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
export const ViewMob = styled(Typography)(() => ({
  fontSize: "12px",
  textDecoration: "underline",
}));
