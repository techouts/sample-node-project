import {
  AccordionSummary,
  Box,
  Button,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import StyledComponent from "@emotion/styled";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Accordion from "@mui/material/Accordion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const StyledAccordion = styled(Accordion)<{ $isMobile: boolean , isLastItem:boolean}>(
  ({ $isMobile,isLastItem }) => ({
    borderBottom: isLastItem ?  "none":"2px solid #E1E1E1",
    boxShadow: "none",
    marginBottom:  $isMobile ? "10px" : "20px",
    "&:before": {
      height: "0px",
    },
  })
);
export const StyledSummary = styled(AccordionSummary)(() => ({
  color: "#231F20",
  margin: "2px 0px",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));
export const AccordionTitle = styled(Typography)(() => ({
  color: "#231F20",
  fontWeight: "700",
  "@media screen and (max-width: 600px)": {
    fontSize: "12px",
  },
}));
export const AccordionSpanTitle = StyledComponent.span<{
  isMobile: boolean;
}>`
  font-size: ${(props) => (props.isMobile ? "11px" : "16px")};
   font-weight: 500;
   color:#A7A5A6;
  "@media screen and (max-width: 600px)": {
    fontSize: 12px,
  },
`;
export const StyledArrow = styled(ArrowForwardIosRoundedIcon)(() => ({
  color: "#292D32",
  fontSize: "16px",
  marginRight: "10px",
}));
export const AccordionText = styled(Typography)(() => ({
  color: "#4F4C4D",
  fontSize: "14px",
  "@media screen and (max-width: 600px)": {
    fontSize: "11px",
  },
}));

export const StyledTitle = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "14px",
  color: "#303030",
}));

export const StyledSubTitle = styled(Typography)(() => ({
  fontSize: "10px",
  fontWeight: "500",
  color: "#727272",
}));
export const StyledArrowForwardIcon = styled(ArrowForwardIcon)(() => ({
  color: "black",
  fontSize: "10px",
  margin: "0px 4px",
}));
export const MainBox = styled(Box)(() => ({
  border: "0.5px solid lightgray",
  // borderRadius: "10px",
  padding: "2vw 0vw",
  minHeight: "20%",
  "@media screen and (max-width: 600px)": {
    padding: "2vw 0vw 0vw 0vw",
    minHeight: "fit-content",
  },
}));
export const StyledButton = styled(Button)(() => ({
  backgroundColor: "black",
  color: "white",
  padding: "5px 80px",
  margin: "10px 0px 10px 20px",
  fontWeight: "700",
  ":hover": {
    backgroundColor: "black",
    color: "white",
  },
}));

//Filter Styles
export const Filtertitle = styled(Typography)`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  padding-bottom: 12px;
`;

export const FilterMenuItem = styled(MenuItem)(() => ({
  minHeight: "30px",
  paddingTop: "0px",
  fontSize: "12px",
  "&.MuiMenuItem-root:hover": {
    color: "#231F20 ",
    fontWeight: 600,
  },
  "&.MuiMenuItem-root:focus": {
    color: "#231F20 ",
    fontWeight: 600,
  },
}));
