import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { transientProps } from "../../utility/TransientProps";
export const MainBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  paddingRight: "2%",
  justifyContent: "space-around",
  alignItems: "center",
  bottom: "0px",
  position: "fixed",
  height: "64px",
  boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
  borderRadius: "20px 20px 0px 0px",
  backgroundColor: "white",
  zIndex: 9999,
}));

export const BoxLogo = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const NavIcon = styled("img")(() => ({
  width:"24px",
  height:"24px"
}))

export const Title = styled(
  Typography,
  transientProps
)<{ $color?: string; $isactivenav: boolean }>(({ $color, $isactivenav }) => ({
  fontSize: "11px",
  fontWeight: "600",
  color: $isactivenav ? "#AD184C" : $color,
}));
