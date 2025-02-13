import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { transientProps } from "../../../utility/TransientProps";
export interface Responsive {
  isMobile: boolean;
  isFromCart: boolean;
  toggle: boolean;
}
export const KnowMore = styled(Typography)(({ isMobile }: Responsive) => ({
  fontSize: isMobile ? "12px" : "16px",
  fontWeight: "600",
  color: "#B22657;",
  cursor: "pointer",
  textDecoration: "underline",
  display: "inline-flex",
  paddingLeft: "6px",
}));

export const ViewMore = styled(Typography)(({ isMobile }: Responsive) => ({
  textAlign: isMobile ? "center" : "left",
  fontSize: isMobile ? "11px" : "14px",
  lineHeight: "120%",
  fontWeight: "400",
  color: "#AD184C",
  cursor: "pointer",
  textDecoration: "underline",
  paddingLeft: isMobile ? "0px" : "40px",
  marginTop: isMobile ? "10px" : "15px",
}));

export const MainBox = styled(Box)(({ isMobile }: Responsive) => ({
  backgroundColor: isMobile ? "#FFFFFF" : "#F7F6F9",
  color: "#656263",
  textAlign: "left",
  padding: "10px 0px",
}));

export const ListOffer = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean; $isFromCart: boolean }>(
  ({ $isMobile, $isFromCart }) => ({
    fontSize: $isMobile ? "12px" : "16px",
    display: $isMobile ? "block" : "list-item",
    border: $isMobile ? "1px solid #EAEAEA" : "",
    padding: $isMobile ? "8px 20px" : "",
    margin: $isMobile ? "10px 0px" : "",
    fontWeight: 400,
    lineHeight: $isMobile ? ($isFromCart ? "16px" : "140%") : "170%",
    color: $isMobile ? ($isFromCart ? "#231F20" : "#656263") : "#656263",
  })
);

export const Offer = styled("ul")(() => ({
  margin: "0px!important",
}));

export const OfferTypography: any = styled(Typography)(
  ({ isMobile, isFromCart, toggle }: Responsive) => ({
    padding: "8px 0px 0px 2px",
    display: toggle && isMobile ? "block" : "list-item",
    border: toggle && isMobile ? "1px solid #EAEAEA" : "",
    margin: toggle && isMobile ? "10px 0px" : "",
    fontWeight: 400,
    lineHeight: toggle && isMobile ? (isFromCart ? "16px" : "140%") : "170%",
    color:
      toggle && isMobile ? (isFromCart ? "#231F20" : "#656263") : "#656263",
  })
);
export const OfferKnowMoreTypography: any = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    color: "#AD184C",
    textDecoration: "underline",
    fontSize: isMobile ? "12px" : "16px",
  })
);
