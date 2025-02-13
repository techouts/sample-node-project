import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { transientProps } from "../../../../utility/TransientProps";

export const ButtonStyled = styled(
  Button,
  transientProps
)<{ $isSignedin: boolean }>(({ $isSignedin }) => ({
  "&:hover": {
    background: $isSignedin ? "#DEA3B7" : "#231F20",
  },
  border: 0,
  borderRadius: 0,
  width: "100%",
  background: $isSignedin ? "#DEA3B7" : "#231F20",
  textAlign: "center",
  padding: "8px 0px",
  color: $isSignedin ? "#231F20" : "#DEA3B7",
  lineHeight: "16px",
  fontSize: $isSignedin ? "11px" : "12px",
  fontWeight: 600,
  textTransform: "uppercase",
}));

export const QuickActionsWrapper = styled(Box)(() => ({
  display: "flex",
  "::-webkit-scrollbar": {
    display: "none",
  },
  overflow: "auto",
  marginBottom: "16px",
  marginLeft: "16px",
}));

export const QuickActions = styled(Button)(() => ({
  "&:hover": {
    backgroundColor: "#D5CBF4",
  },
  background: "#D5CBF4",
  borderRadius: "0px",
  marginRight: "6px",
  color: "#231F20",
  fontSize: "12px",
  minWidth: "100px",
  maxWidth: " fit-content",
  height: "30px",
  lineHeight: "14px",
  textTransform: "capitalize",
}));

export const Header = styled(Typography)(() => ({
  lineHeight: "16px",
  fontWeight: 600,
  color: "#231F20",
  margin: "25px 16px 12px 16px",
  fontSize: "16px",
}));

export const ProfileItemsWrapper = styled(Box)(() => ({
  margin: "0px 16px",
}));

export const Content = styled(
  Stack,
  transientProps
)<{ $index: number }>(({ $index }) => ({
  width: "100%",
  justifyContent: "space-between",
  flexDirection: "row",
  borderTop: $index === 0 ? "1px solid #D9D9D9" : "none",
  borderBottom: "1px solid #D9D9D9",
}));

export const ArrowImageWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

export const ContentTitle = styled(Typography)(() => ({
  lineHeight: "30px",
  fontWeight: 600,
  color: "#231F20",
  fontSize: "12px",
  marginTop: "2%",
}));

export const ContentDescription = styled(Typography)(() => ({
  lineHeight: "16px",
  fontWeight: 400,
  color: "#4F4C4D",
  fontSize: "11px",
  marginBottom: "4%",
}));

export const BenefitsWrapperBox = styled(Box)(() => ({
  margin: "20px 16px 0px 16px",
}));

export const Benefits = styled(Stack)(() => ({
  flexDirection: "row",
  justifyContent: "flex-start",
  marginBottom: "7%",
  alignItems: "center",
}));

export const BenefitsTitle = styled(Typography)(() => ({
  lineHeight: "16px",
  fontWeight: 400,
  color: "#4F4C4D",
  fontSize: "12px",
  marginTop: "2%",
}));

export const BenefitsIcon = styled("img")(() => ({
  lineHeight: "16px",
  fontWeight: 400,
  color: "#4F4C4D",
  fontSize: "12px",
  marginTop: "2%",
  maxWidth: "35px",
  marginRight: "8px",
}));

export const FooterCopyRights = styled(Stack)(() => ({
  alignItems: "center",
  margin: "60px 0px 15px 0px",
}));

export const FooterCopyRightsTitle = styled(Typography)(() => ({
  fontSize: "12px",
  lineHeight: "16px",
  color: "#7B7979",
}));

export const ButtonWrapper = styled(
  Box,
  transientProps
)<{ $isSignedin: boolean }>(({ $isSignedin }) => ({
  marginRight: "16px",
  marginLeft: "16px",
  marginBottom: $isSignedin ? "0px" : "25px",
  marginTop:$isSignedin ? "0px" : "12px",
}));
