import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
interface Responsive {
  isMobile?: boolean;
}
export const PrimaryBox = styled(Box)(() => ({
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "#FFFFFF",
  "@media(max-width:600px)": {},
}));

export const ProductNameTypography = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    textAlign: "left",
    fontSize: isMobile ? "12px" : "20px",
    fontWeight: "500",
    lineHeight: "140%",
    color: "#231F20",
    "@media(max-width:600px)": {},
  })
);

export const ProductNameBox = styled(Box)(() => ({
  "@media(max-width:600px)": {},
}));

export const RatingBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  marginTop: "12px",
  alignItems: "center",
  "@media(max-width:600px)": {},
}));
export const PriceBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  gap: "45px",
  marginTop: "14px",
  alignItems: "center",
  "@media(max-width:600px)": {
    marginTop: "8px",
    gap: "31px",
  },
}));

export const PriceNameTypography = styled(Typography)(() => ({
  color: "#231F20",
  fontSize: "20px",
  fontWeight: "700",
  "@media(max-width:600px)": {
    fontSize: "14px",
  },
}));
export const VerticalDivider = styled(Divider)(() => ({
  margin: "0px 12px",
}));

export const RatingTypography = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    marginLeft: "7px",
    fontSize: isMobile ? "11px" : "16px",
    color: " #231F20",
    fontWeight: "400",
  })
);
export const SizeTypography = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    fontSize: isMobile ? "11px" : "16px",
    fontWeight: "400",
    lineHeight: "120%",
    color: "#231F20",
  })
);
export const StatusTypography = styled(Typography)(() => ({
  color: "#AD184C",
  fontSize: "16px",
  fontWeight: "500",
  lineHeight: "140%",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));
export const StarImage = styled.img`
  width: 2.6%;

  @media screen and (max-width: 600px) {
    width: 4.5%;
  }
`;
export const ProductImage = styled.img`
  width: 100%;
  padding: 16px;
`;
export const QuantityTypography = styled(Typography)(() => ({
  color: "#231F20",
  fontSize: "16px",
  fontWeight: "500",
  lineHeight: "120%",

  textAlign: "left",
  marginTop: "14px",
  "@media(max-width:600px)": {
    fontSize: "11px",
    fontWeight: "400",
    marginTop: "8px",
  },
}));

export const ExchangeBox = styled(Box)(() => ({
  minHeight: "45px",
  minWidth: "160px",
  display: "flex",
  textAlign: "center",
  border: "1px solid #DEA3B7",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  "@media(max-width:600px)": {},
}));

export const ExchangeTypography = styled(Typography)(() => ({
  color: "#231F20",
  fontSize: "12px",
  fontWeight: "500",

  "@media(max-width:600px)": {
    fontSize: "10px",
  },
}));
