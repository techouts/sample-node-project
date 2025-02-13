import styled from "@emotion/styled";
import { transientProps } from "../../utility/TransientProps";
import ListItemButton from "@mui/material/ListItemButton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export const StyledListHead = styled(
  ListItemButton,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  backgroundColor: $isMobile ? "#F0F0F4 !important" : "#FFFFFF !important",
  marginBottom: "7px",
}));
export const ListTitle = styled(ListItemText)(() => ({
  color: "#231F20",
  lineHeight: "22.4px",
  "& > span": {
    fontWeight: "600",
  },
}));

export const ContactusStyle = styled(Typography)(({ isMobile }: any) => ({
  color: isMobile ? "#AD184C" : "#231F20",
  cursor: "pointer",
  fontSize: "16px",
  lineHeight: "22.4px",
  fontWeight: "600",
  textDecoration: isMobile && "underline",
}));

export const SubTitle = styled(Typography)(() => ({
  lineHeight: "22.4px",
  fontWeight: "400",
  "& > a": {
    color: "#AD184C",
    textDecoration: "underline",
    cursor: "pointer",
    fontWeight: "400",
  },
}));

export const ListOption = styled(
  ListItemText,
  transientProps
)<{ $isSelected: boolean }>(({ $isSelected }) => ({
  color: $isSelected ? "#AD184C" : "#4F4C4D",
  lineHeight: "22.4px",
}));
export const ListDot = styled(
  CircleIcon,
  transientProps
)<{ $isSelected: boolean }>(({ $isSelected }) => ({
  color: $isSelected ? "#AD184C" : "#4F4C4D",
  fontSize: "4.5px",
  marginRight: "10px",
}));
export const StyledAccordian = styled(
  Accordion,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  border: "2px solid #E1E1E1",
  borderBottom: "2px solid #E1E1E1",
  boxShadow: "none",
  marginBottom: $isMobile ? "10px" : "20px",
  "&:before": {
    height: "0px",
  },
}));
export const AccordionTitle = styled(Typography)(() => ({
  color: "#231F20",
  "@media screen and (max-width: 600px)": {
    fontSize: "12px",
  },
}));

export const AccordionText = styled(Typography)(() => ({
  color: "#4F4C4D",
  fontSize: "14px",
  "@media screen and (max-width: 600px)": {
    fontSize: "11px",
  },
}));

export const StyledSummary = styled(AccordionSummary)(() => ({
  color: "#231F20",
  margin: "2px 0px",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));
export const StyledArrow = styled(ArrowForwardIosRoundedIcon)(() => ({
  color: "#292D32",
  fontSize: "16px",
  marginRight: "10px",
}));
export const StyledUpArrow = styled(
  ArrowForwardIosRoundedIcon,
  transientProps
)<{ $isSelected: boolean }>(({ $isSelected }) => ({
  color: "#292D32",
  fontSize: "16px",
  marginRight: "10px",
  animationDelay: "s",
  transform: $isSelected ? "rotate(-90deg)" : "rotate(90deg)",
}));

//FAQHeading styles

export const MainTitle = styled(Typography)(() => ({
  color: "#231F20",
  fontSize: "32px",
  fontWeight: "700",
  "@media screen and (max-width: 600px)": {
    fontSize: "16px",
  },
}));
export const SubText = styled(Typography)(() => ({
  color: "#231F20",
  lineHeight: "10px",
  padding: "10px 0px 20px",
  "@media screen and (max-width: 600px)": {
    fontSize: "12px",
  },
  "& > a": {
    color: "#AD184C",
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

// search input
export const StyledBox = styled(Typography)(() => ({
  position: "relative",
}));
export const SearchInput = styled(TextField)(() => ({
  minWidth: "100%",
  marginBottom: "14px",
  marginTop: "14px",
  "& > div": {
    borderRadius: "0px",
  },
  "@media (max-width: 600px)": {
    minWidth: "100%",
    padding: "0% 7%",
  },
}));

export const SuggestBox = styled(Paper)(() => ({
  position: "absolute",
  padding: "3px",
  width: "100%",
  height: "90px",
  color: "#333",
  backgroundColor: "#fff",
  zIndex: "5",
  alignItems: "center",
  borderRadius: "0px",
  overflowY: "scroll",
}));

export const SuggestFields = styled(Typography)(() => ({
  padding: "3px",
  borderRadius: "1px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#F8EDF1",
  },
}));
