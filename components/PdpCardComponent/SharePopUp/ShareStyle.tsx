import styled from "@emotion/styled";
import { Typography, Box, Button } from "@mui/material";

export const TypographyHeader = styled(Typography)(() => ({
  fontSize: "24px",
  fontWeight: "600",
}));

export const TypographyData = styled(Typography)(() => ({
  display: "flex",
  flexDirection: "row",
  paddingTop: "10px",
  alignItems: "center",
  marginLeft: "26px",
}));

export const TypographyTextInfo = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "600",
  marginLeft: "26px",
}));

export const BoxDiscount = styled(Box)(() => ({
  marginLeft: "5px",
}));

export const TypographyCost = styled(Typography)(() => ({
  color: "#AD184C",
  fontWeight: "600",
  fontSize: "20px",
}));

export const BoxTaxes = styled(Box)(() => ({
  color: "#979596",
  paddingLeft: "10px",
}));

export const TypographyStrick = styled(Typography)(() => ({
  textDecorationLine: "line-through",
  color: "#979596",
  paddingLeft: "10px",
}));

export const MediaNameButton = styled(Button)(() => ({
  backgroundColor: "#AD184C",
  margin: "40px 20px 0px 0px",
  color: "white",
  width: "18%",
  height: "45px",
  fontSize: "14px",
}));
