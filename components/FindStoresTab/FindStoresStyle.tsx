import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button  from "@mui/material/Button";

export const StoreHeading = styled(Typography)(() => ({
  lineHeight: "28px",
  fontSize: "20px",
  fontWeight: 700,
  color: "#231F20",
  textTransform: "capitalize",
  margin: "40px 0px",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "17px",
    margin: "25px 0px",
  },
}));

export const FilterAllStores = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "14px",
  color: "#4F4C4D",
  maxHeight: "530px",
  overflowY: "scroll",
  "& ::-webkit-scrollbar": {
    width: 5,
  },
  "& ::-webkit-scrollbar-thumb": {
    backgroundColor: "#656263",
    borderRadius: 2,
  },
}));

export const StoreTitle = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "20px",
  color: "#000000",
  margin: "4px 0px",
  fontFamily: "Montserrat",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "15px",
  },
}));

export const AddressText = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "24px",
  fontFamily: "Montserrat",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "18px",
  },
}));

export const PhNumber = styled(AddressText)(() => ({
  textDecoration: "underline",
  textDecorationColor:"#AD184C",
  fontWeight:"bold",
  fontSize: "14px",
  lineHeight: "23px",
  // margin: "5px 0px 10px 0px",
  margin: "16px 0px 12px 4px",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    // margin: "8px 0px 16px 0px",
    lineHeight: "140.83%",
  },
}));
export const Storetime = styled(AddressText)(() => ({
  color: "#4F4C4D",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "120%",
  "@media (max-width: 600px)": {
    fontSize: "12px",
  },
}));

export const StoreTimingTitle = styled(AddressText)(() => ({
  fontWeight: 500,
  lineHeight: "20px",
  color: "#000000",
  textTransform: "capitalize",
  paddingBottom:"5px",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "15px"
  },
}));

export const TimingsText = styled(AddressText)(() => ({}));

export const DirectionText = styled(Typography)(() => ({
  display: "inline-block",
  fontSize: "14px",
  lineHeight: "120%",
  color: "#AD184C",
  cursor: "pointer",
  fontWeight:"bold",
  margin: "16px 0px 12px 4px",
  fontFamily: "Montserrat",
  textTransform: "capitalize",
  textDecoration: "underline",
  textDecorationColor:"#AD184C"
}));

export const PhoneText = styled(Typography)(() => ({
  display: "flex",
  alignItems:"center",
  fontSize: "14px",
  lineHeight: "120%",
  color: "#AD184C",
  cursor: "pointer",
  fontWeight:"bold",
  fontFamily: "Montserrat",
  textTransform: "capitalize",
  textDecoration: "underline",
  textDecorationColor:"#AD184C"
}));

export const SearchIconImage = styled.img`
  max-width: 18px;
`;

export const ExpandMoreImage = styled.img`
  max-width: 18px;
`;

// No Stores here, (Box Styles)
export const NoStoresImage = styled.img`
  max-width: 281px;
  @media screen and (max-width: 600px) {
    max-width: 203px;
  }
`;

export const NoStoresTitle = styled(AddressText)(() => ({
  fontWeight: 700,
  color: "#AD184C",
}));

export const NoStoresBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  // marginTop: "15%",
}));

// Map Pin Point Tooltip styles
export const TooltipBox = styled(Box)(() => ({
  width: "246px",
  padding: "8px 12px",
  "@media (max-width: 600px)": {
    width: "213px",
  },
}));

export const TooltipExpandImg = styled.img`
  max-height: 10px;
  margin-left: 3px;
  cursor: pointer;
  transform: rotate(270deg);
  object-fit: contain;
`;

export const PinPointTooltipText = styled(Typography)(() => ({
  fontSize: "14px",
  lineHeight: "20px",
  fontFamily: "Montserrat",
  color: "#1C191A",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "18px",
  },
}));

export const TooltipImgAndTypography = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

// Particular(Single) Store Styles
export const NavigateIconAndText = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  marginTop: "0.5%",
  position: "absolute",
  "@media (max-width: 600px)": {
    marginTop: "0%",
    position: "relative",
  },
  "@media (min-width: 601px) and (max-width: 1200px)": {
    marginTop: "0%",
    position: "relative",
  },
}));

export const NavigateIconText = styled(Typography)(() => ({
  fontSize: "22px",
  lineHeight: "33px",
  fontWeight: 500,
  fontFamily: "Montserrat",
  color: "#231F20",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "18px",
  },
}));

export const ConsultationButton = styled(Button)(() => ({
  width: "218px",
  height: "43px",
  fontSize: "12px",
  lineHeight: "17px",
  fontWeight: 500,
  letterSpacing: "1px",
  margin: "25px 0px",
  textTransform: "uppercase",
  fontFamily: "Montserrat",
  backgroundColor: "#DEA3B7",
  borderRadius: "0%",
  color: "#231F20",
  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
  "@media (max-width: 600px)": {
    width: "100%",
    height: "32px",
    margin: "15px 0px",
  },
}));
