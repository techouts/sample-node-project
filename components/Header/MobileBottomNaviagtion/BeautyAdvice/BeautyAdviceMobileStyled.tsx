import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { transientProps } from "../../../../utility/TransientProps";

export const MainBox = styled(Box)(() => ({
  width: "100%",
  cursor: "pointer",
}));

export const NavigationCard = styled(
  Box,
  transientProps
)<{ $backgroundImageUrl: string }>(({ $backgroundImageUrl }) => ({
  boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.05)",
  height: "120px",
  margin: "16px 21px 16px 16px",
  display: "flex",
}));

export const NavigationCardTitle = styled(Typography)(() => ({
  fontSize: "16px",
  letterSpacing: "0.15px",
  fontWeight: "500",
  lineHeight: "20px",
  color: "#BD446E",
}));
export const NavigationCardContent = styled(Stack)(() => ({
  padding: "26px 0px 0px 20px",
  color: "#BD446E",
  fontWeight: 600,
}));

export const NavigationCardSubTitle = styled(Stack)(() => ({
  padding: "9px 15px 0px 20px",
  width: "100%",
  color: "#231F20",
  letterSpacing: "0.15px",
  lineHeight: "19px",
  fontWeight: 400,
  fontSize: "16px",
}));
