import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { transientProps } from "../../utility/TransientProps";

export const BodyWrapper = styled(Box)(() => ({
  padding: "22px",
}));

export const ModalHeader = styled(Box)(() => ({
  marginBottom: "20px",
  paddingBottom: "20px",
  borderBottom: "1px solid  #D9D9D9",
}));

export const ModalHeaderTitle = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "20px",
  textTransform: "uppercase",
  color: "#231F20",
}));

export const ModalHeaderSubTitle = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "140%",
  color: "#4F4C4D",
}));

export const ModalBody = styled(Box)(() => ({
  width: "100%",
}));

export const ModalFooter = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  gap: "8px",
}));

export const StyledButton = styled(
  Button,
  transientProps
)<{ $isColoredBotton: boolean }>(({ $isColoredBotton }) => ({
  textAlign: "center",
  background: $isColoredBotton ? "#DEA3B7" : "#ffffff",
  height: "35px",
  width: "50%",
  borderRadius: 0,
  color: "#231F20",
  border: $isColoredBotton ? "none" : "1px solid #DEA3B7",
  "&:hover": {
    backgroundColor: $isColoredBotton ? "#DEA3B7" : "#ffffff",
  },
  ":disabled": {
    backgroundColor: "silver",
  },
}));

export const ButtonTypography = styled(Typography)(() => ({
  textTransform: "uppercase",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "140%",
  color: "#231F20",
}));

export const DetailsTypography = styled(
  Typography,
  transientProps
)<{ $isBold: boolean }>(({ $isBold }) => ({
  fontStyle: "normal",
  fontWeight: $isBold ? "bold" : 500,
  fontSize: "14px",
  lineHeight: "140%",
  color: "#231F20",
}));
