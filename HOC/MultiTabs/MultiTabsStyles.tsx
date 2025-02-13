import {styled} from "@mui/material";
import Typography from "@mui/material/Typography";

import { transientProps } from "../../utility/TransientProps";

export const ViewAllText = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  fontSize: "12px",
  fontWeight: 500,
  lineHeight: $isMobile ? "16px" : "140%",
  color: "#AD184C",
  textAlign: "right",
  letterSpacing: $isMobile ? "0px" : "1px",
  textDecoration: $isMobile ? "underline" : "none",
  textTransform: $isMobile ? "capitalize" : "uppercase",
  cursor:"pointer"
}));
