import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export const ServiceCardBox = styled(Grid)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  columnGap: "20px",
  rowGap: "40px",
  "@media(max-width:600px)": {
    columnGap: "8px",
    rowGap: "8px",
  },
}));

export const OnlyTextForServiceCard = styled(Box)(() => ({
  padding: "30px 24px",
  "@media(max-width:600px)": {
    padding: "8px",
  },
}));

export const ServiceCardAndRadioButton = styled(Box)(() => ({
  display: "flex",
  "@media(max-width:600px)": {
    display: "block",
  },
}));

export const ServiceCardImgTitle = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "140%",
  textTransform: "capitalize",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "16px",
  },
}));

export const ServiceCardTitle = styled(ServiceCardImgTitle)(() => ({
  marginBottom: "30px",
  "@media(max-width:600px)": {
    marginBottom: "5px",
  },
}));

export const ServiceCardImgSubtitle = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontSize: "20px",
  color: "#4F4C4D",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));

export const CardPaymentsText = styled(ServiceCardImgSubtitle)(() => ({
  fontWeight: 500,
  color: "#656263",
  marginTop: "15px"
}));

export const ImgFreeTextServiceCard = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontWeight: 500,
  fontSize: "20px",
  color: "#AD184C",
  "@media(max-width:600px)": {
    fontSize: "10px",
    marginTop:"18px"
  },
}));

export const PriceTypo = styled(ImgFreeTextServiceCard)(() => ({
  display: "inline-block",
  marginRight: "4px",
}));

export const TrailText = styled(Typography)(() => ({
  display: "flex",
  fontWeight: 700,
  fontFamily: "Montserrat",
  fontSize: "20px",
  lineHeight: "24px",
  color: "#FFFFFF",
  height: "56px",
  width: "137px",
  position: "absolute",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#AD184C",
  "@media(max-width:600px)": {
    display: "none",
  },
}));
