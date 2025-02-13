import {styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { transientProps } from "../../../utility/TransientProps";

export const SuggestionsHeader = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignContent: "center",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "25px",
}));

export const SuggestionTitle = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  color: "#AD184C",
}));

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
