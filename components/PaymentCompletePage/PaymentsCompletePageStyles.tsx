import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { transientProps } from "../../utility/TransientProps";
export interface Responsive {
  ismobile: boolean;
}

export const OffersUl = styled.div`
  line-height: 80%;
  color: #656263;
  background-color: #f7f6f9;
  padding: 10px 25px 15px 10px;
`;

export const ForDots = styled(Box)(() => ({
  display: "list-item",
  lineHeight: "0",
}));

export const OfferTypo = styled(Typography)(() => ({
  display: "contents",
  padding: "10px , 60px , 20px, 8px",
  fontSize: "12px",
}));
export const FormControlB = styled(FormControl)(() => ({
  display: " block",
}));
export const FormControlLabelB = styled(FormControlLabel)(() => ({
  marginLeft: "0px",
  marginRight: "0px",
  display: " grid",
}));

export const labelB = styled(FormLabel)(() => ({}));

export const CardBox = styled(Box)(() => ({
  border: "1px solid #EAEAEA",
  display: "grid",
  alignItems: "center",
}));
export const IconContBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));
export const CardContBox = styled(Box)(() => ({
  display: "inline-block",
}));
export const CardContTypo = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "600",
}));
export const CardContTypo1 = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: "600",
}));
export const AccordionBox = styled(Box)(() => ({
  width: "100%",
  padding: "0px 16px",
  margin: "24px 0px 16px 0px",
  border: "1px solid #EAEAEA",
}));

export const OtherPayTypo = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "20px",
  margin: "16px 0px",
}));

export const OtherPayTab = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "20px",
  margin: "16px 0px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
}));

export const ChoosePaymentType = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "32px",
  color: "#252D34",
  marginBottom: "25px",
}));

export const CartProductTitle = styled(
  Typography,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  fontSize: isMobile ? "14px" : "16px",
  fontWeight: 500,
  color: "#231F20",
}));

export const CategoryTitle = styled(
  Typography,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  fontSize: isMobile ? "12px" : "14px",
  fontWeight: 400,
  color: "#A7A5A6",
}));

export const ProductPriceText = styled(
  Typography,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  fontSize: "16px",
  fontWeight: 700,
  color: "#AD184C",
}));

export const Accord = styled(Accordion)(() => ({
  boxShadow: "none",
  padding: "0px",
}));

export const AccordSummary = styled(AccordionSummary)(() => ({
  boxShadow: "none",
  padding: "0px",
}));

export const AccordDetail = styled(AccordionDetails)(() => ({
  boxShadow: "none",
  padding: "0px",
  width: "100%",
}));

export const PriceDetailsBoxs = styled(Box)(() => ({
  border: "1px solid #EAEAEA",
  padding: "20px",
  width: "100%",
}));

export const StackList = styled(Stack)(() => ({
  flexDirection: "row",
  justifyContent: "space-between",
}));

export const PDlistTypo = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: 600,
  lineHeight: "20px",
  padding: "4px 0px",
}));

export const BreakupTitle = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: "20px",
  paddingBottom: "6px",
}));
export const BreakupList = styled(Typography)(() => ({
  display: "flex",
  alignItems: "center",
  columnGap: "8px",
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "20px",
  paddingTop: "6px",
  color: "#231F20",
}));

export const SavingsLabelBox = styled(Box)(() => ({
  backgroundColor: "#FBEDB5",
  margin: "8px -16px 8px -16px",
}));

export const SavingsLabelTypo = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: 700,
  lineHeight: "16px",
  padding: "8px 0px 8px 16px",
  color: "#231F20",
}));

export const SavingsLabelValue = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: "16px",
  padding: "8px 16px 8px 16px",
  color: "#231F20",
}));
export const SampleTypoBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-start",
  columnGap: "8px",
}));

export const SampleTypo = styled(Typography)(() => ({
  fontSize: "12px",
  marginBottom: "8px",
  display: "inline-flex",
}));

export const TotalTypo = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: "16px",
  padding: "8px 0px 8px 0px",
  color: "#231F20",
}));

export const SavedTypo = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  padding: 21px 0px 12px 9px;
`;

export const Icon = styled.img`
  padding: 22px 13px 22px 16px;
`;
