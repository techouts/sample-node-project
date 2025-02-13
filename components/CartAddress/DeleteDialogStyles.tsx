import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { transientProps } from "../../utility/TransientProps";

export const ModalWrapper = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));

export const ModalTitle = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  padding: "20px 0px",
  fontSize: $isMobile ? "18px" : "24px",
  fontWeight: "600",
  lineHeight: $isMobile ? "22px" : "30px",
  color: "#231F20",
}));

export const ActionButton = styled(
  Button,
  transientProps
)<{ $backgroundColor: string; $textColor: string }>(
  ({ $backgroundColor, $textColor }) => ({
    backgroundColor: $backgroundColor,
    borderRadius: "0px",
    color: $textColor,
    margin: "10px",
    "&:hover": {
      backgroundColor: $backgroundColor,
    },
  })
);
