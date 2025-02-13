import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { transientProps } from "../../utility/TransientProps";
export const TypographyModalClose = styled(
  Typography,
  transientProps
)<{
  $iconRight: string;
  $iconTop: string;
  $iconMobRight: string;
  $iconMobTop: string;
}>(({ $iconRight, $iconTop, $iconMobRight, $iconMobTop }) => ({
  position: "absolute",
  top: $iconTop,
  right: $iconRight,
  cursor: "pointer",
  zIndex: "999",
  "@media(max-width: 600px)": {
    top: $iconMobTop,
    right: $iconMobRight,
  },
}));
export const MainBox = styled(Box)(({ theme }) => ({
  " &:focus-visible": {
    outline: "-webkit-focus-ring-color auto 0px",
  },
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  position: "absolute",
  "::-webkit-scrollbar": {
    width: "20px",
  },
  "@media(max-width: 600px)": {
    "::-webkit-scrollbar": {
      display: "none",
    },
  },

  "::-webkit-scrollbar-thumb": {
    border: "8px solid #FFFFFF",
    borderRadius: "16px",
    backgroundColor: "#656263",
  },
}));
