import {styled}from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { transientProps } from "../../../utility/TransientProps";
import Button from "@mui/material/Button";

interface Responsive {
  isMobile: boolean;
}
export const BorderBox = styled(Box)(({ isMobile }: Responsive) => ({
  border: "1px solid #EAEAEA",
  position: "relative",
  padding: isMobile ? "0px" : "30px 0px",
}));
export const SimpleText = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "#231F20",
}));
export const BoldText = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  color: "#231F20",
}));
export const SmallText = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#231F20",
  fontWeight: "600",
}));
export const LargeText = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "700",
  color: "#231F20",
}));
export const ColorText = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#AD184C",
  cursor: "pointer",
  fontWeight: "400",
  textDecoration: "underline",
  textAlign: "right",
  lineHeight: "17px",
}));
export const ColoredBox = styled(Box)(() => ({
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#B5A4EC",
  color: "#FFFFFF",
}));
export const TotalBox = styled(Box)(() => ({
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#FBEDB5",
}));
export const ProductTitle = styled(
  Typography,
  transientProps
)<{ $isReadOnly: boolean; $isMobile: boolean; $disable: boolean }>(
  ({ $isReadOnly, $isMobile, $disable }) => ({
    fontSize: "16px",
    fontWeight: "600",
    color: "#231F20",
    lineHeight: "140%",
    width: $isReadOnly ? "100%" : $isMobile ? "100%" : "68%",
    cursor: $disable ? "unset" : "pointer",
  })
);
export const ProductCaption = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#A7A5A6",
}));
export const RegularPrice = styled(Typography)(() => ({
  fontSize: "11px",
  fontWeight: "400",
  color: "#979596",
  textDecoration: "line-through",
}));
export const OfferPrice = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  color: "#AD184C",
  lineHeight: "140%",
  "@media(max-width:600px)": {
    fontSize: "16px",
    lineHeight: "150%",
  },
}));
export const OfferPercent = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: "600",
  color: "#231F20",
}));
export const FeaturesText = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#231F20",
}));
export const QuantityText = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#231F20",
  fontWeight: "400",
  lineHeight: "19.6px",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));
export const MenuSelectedShaded = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#AD184C",
  fontWeight: "400",
  "@media(max-width:600px)": {
    fontSize: "11px",
    margin: "2px 0px 0px 8px !important",
  },
}));

export const StandardDeliveryBox = styled(Box)(({ isMobile }: Responsive) => ({
  width: isMobile ? "100%" : "",
  position: "absolute",
  right: isMobile ? "" : "-1px",
  top: isMobile ? "" : "-1px",
  bottom: isMobile ? "-10px" : "",
  backgroundColor: "#D5CBF4",
  padding: isMobile ? "10px 0px" : "3px 3px 3px 6px",
}));
export const StandardDeliveryText = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: "10px",
  lineHeight: "12px",
  color: "#231F20",
  textAlign: "center",
}));
export const AppliedOfferBox = styled(Box)(({ isMobile }: Responsive) => ({
  width: isMobile ? "100%" : "220px",
  position: "absolute",
  right: isMobile ? "" : "-1px",
  top: isMobile ? "" : "-1px",
  bottom: isMobile ? "-10px" : "",
  backgroundColor: "#FBEDB5",
  padding: "5px 20px 5px 10px",
  borderBottomLeftRadius: isMobile ? "0px" : "10px",
}));

export const GridContainer = styled(Grid)(({ isMobile }: Responsive) => ({
  flexWrap: "nowrap",
  padding: isMobile ? "20px" : "",
  gap: isMobile ? "5px" : "10px",
}));

export const ProductImage = styled(Grid)(({ isMobile }: Responsive) => ({
  width: "100px",
  height: "100px",
  position: isMobile ? "static" : "relative",
  display: isMobile ? "block" : "flex",
  justifyContent: "center",
  alignItems: "center",
}));


export const IncrementButton = styled(Button)(({ theme }) => ({
  border: 'none',
  fontSize: '1.55rem',
  minWidth:"42px",
  padding:"0px 0px",
  color: '#7F7F7F',
  paddingLeft: '0.7rem',
  paddingRight: '0.7rem',
  backgroundColor: '#F7F7F8',
  '&:hover, &.Mui-focusVisible': {
    backgroundColor: '#DEA3B7', // Hover color
    color: '#231F20', // Text color on hover
    border: 'none', // Additional border styles on hover if needed
  },
}));
export const DecrementButton = styled(Button)(({ theme }) => ({
  border: 'none',
  fontSize: '1.55rem',
  minWidth:"42px",
  padding:"0px 0px",
  color: '#7F7F7F',
  paddingLeft: '0.7rem',
  paddingRight: '0.7rem',
  backgroundColor: '#F7F7F8',
  '&:hover, &.Mui-focusVisible': {
    backgroundColor: '#DEA3B7', // Hover color
    color: '#231F20', // Text color on hover
    border: 'none', // Additional border styles on hover if needed
  },
}));