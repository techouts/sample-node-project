import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {styled}from "@mui/material";
import Typography from "@mui/material/Typography";
import { transientProps } from "../../utility/TransientProps";
export const DeleteBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));
export const MessageText = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: "24px",
  lineHeight: "30px",
  color: "#231F20",
  padding: "20px 0px",
  "@media (max-width:600px)": {
    fontSize: "12px",
    lineHeight: "17px",
  },
}));
export const Buttons = styled(
  Button,
  transientProps
)<{ isPrimary: boolean; isMobile: boolean }>(({ isPrimary, isMobile }) => ({
  backgroundColor: isPrimary ? " #231F20" : "#DEA3B7",
  borderRadius: "0px",
  color: isPrimary ? "#FFFFFF" : "#231F20",
  margin: "10px 8px",
  padding: "14px 26px",
  "&:hover": {
    backgroundColor: isPrimary ? "#231F20" : "#DEA3B7",
  },
}));
export const ButtonText = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "1px",
  lineHeight: "16px",
}));
