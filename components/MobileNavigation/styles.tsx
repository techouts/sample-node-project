import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { transientProps } from "../../utility/TransientProps";

export const CategoryHeader = styled(Stack)(() => ({
  padding: "8px",
  alignItems: "center",
  flexDirection: "row",

}));

export const CategoryAccordion = styled(Accordion)(() => ({
  boxShadow: "none",
  marginTop: "10px",
}));

export const CategoryAccordionSummary = styled(AccordionSummary)(() => ({
  background: "#F0F0F4",
}));

export const AccordionSummaryText = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "140%",
  color: " #231F20",
  fontWeight: 600,
}));

export const AccordionDetailsText = styled(Typography)(() => ({
  marginTop: "8px",
  fontSize: "12px",
  lineHeight: "140%",
  color: "#000000",
  fontWeight: 400,
}));

export const NavigationCard = styled(Box,transientProps)<{$bgColor:string, $backgroundImageUrl:string }>(
  ({ $bgColor, $backgroundImageUrl }) => ({
    background: `${$bgColor} url(${$backgroundImageUrl}) no-repeat right bottom`,
    height: "100%",
  })
);

export const NavigationCardTitle = styled(Typography)(() => ({
  fontSize: "16px",
  letterSpacing: "0.15px",
}));

export const NavigationCardContent = styled(Stack,transientProps)<{$color:string}>(
  ({ $color }) => ({
    padding: "10px 0px 0px 10px",
    color: $color,
  })
);

export const CategoryDetails = styled(Box)(() => ({
  margin: "16px 0px 16px 16px",
}));

export const CategoryTitle = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "140%",
  fontWeight: "600",
  textTransform: "capitalize",
}));

export const CategoryAllText = styled(Typography)(() => ({
  fontSize: "11px",
  lineHeight: "120%",
  fontWeight: "400",
  textDecorationLine: "underline",
  color: "#AD184C",
}));
