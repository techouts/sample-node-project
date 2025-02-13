import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
export const TypographyTitle = styled(Typography)(() => ({
  color: "#AD184C",
  whiteSpace: "nowrap",
  fontWeight: "500",
  fontSize: "18px",
  lineHeight: "22px",
  "@media(max-width:768px)": {
    fontSize: "15px",
  },
}));

export const TypographySubTitle = styled(Box)(() => ({
  color: "#231F20",
  fontSize: "14px",
  cursor: "pointer",
  "@media(max-width:768px)": {
    fontSize: "11px",
  },
}));
export const TypographyLine = styled(Typography)(() => ({
  margin: "12px 0px",
}));
export const BigBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  lineHeight: 10,
}));
export const MobBox = styled(Box)`
  line-height: 10 !important;
`;
export const Accordions = styled(Accordion)(() => ({
  boxShadow: "none",
}));
export const BigBoxMobile = styled(Box)(() => ({
  paddingLeft: "16px",
  paddingRight: "16px",
}));
export const AccordionDetailsBox = styled(Box)(() => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
}));
export const AccordionSummaryTitle = styled(AccordionSummary)(() => ({
  padding: "0px",
}));
