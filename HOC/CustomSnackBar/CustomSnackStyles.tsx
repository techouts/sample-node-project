import styled from "@emotion/styled";
import { Box,Stack, Typography, Snackbar } from "@mui/material";
import { transientProps } from "../../utility/TransientProps";
export interface Responsive {
  ismobile: boolean;
}
export interface SpecialCardResponsive {
  ismobile: boolean;
  isSpecialCard: boolean;
}
export interface LoadingInterface {
  ismobile: boolean;
  loading: any;
  isSpecialCard: boolean;
}
export const SnackBarGrid = styled(
  Snackbar,
  transientProps
)<{ topWeb: string; topMob: string; $position: any; $width: any }>(
  ({ topWeb, topMob, $position, $width }) => ({
    backgroundColor: "#231F23",
    position: $position,
    color: "#4F4C4D",
    width: $width,
    margin: "auto",
    top: `${topWeb} !important`,
    "@media (max-width: 600px)": {
      top: `${topMob} !important`,
      left: "0px !important",
    },
  })
);

export const AlertBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  padding: "15px",
  display: "flex",
  flexDirection: "row",
  boxShadow: "0px 0px 10px",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#FFFFFF",
  "@media (max-width: 600px)": {
    padding: "10px",
  },
}));
export const ToastText = styled(Typography)(() => ({
  fontSize: "14px",
  padding: "0px",
  margin: "0px auto",
  "@media (max-width: 600px)": {
    fontSize: "12px",
  },
}));
export const FlexBox = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  columnGap: "10px",
  "@media (max-width: 600px)": {
    columnGap: "5px",
  },
}));