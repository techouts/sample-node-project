import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Event Card Styles
export const ContentTitle = styled(Typography)(() => ({
  fontSize: "20px",
  lineHeight: "32px",
  fontWeight: 700,
  fontFamily: "Montserrat",
  color: "#000000",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "18px",
  },
}));

export const EventDetailsItem = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "24px",
  color: "#231F20",
  fontFamily: "Montserrat",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));

export const LocationText = styled(EventDetailsItem)(() => ({
  color: "#231f20",
  "& > span": {
    color: "#AD184C",
    cursor: "pointer",
    textDecoration: "underline",
  },
}));

export const RegisterBtn = styled(Button)(() => ({
  color: "#231F20",
  letterSpacing: "1px",
  fontFamily: "Montserrat",
  fontWeight: 500,
  width: "163px",
  height: "43px",
  fontSize: "12px",
  lineHeight: "18px",
  borderRadius: "0px",
  textTransform: "uppercase",
  backgroundColor: "#DEA3B7",
  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
  "@media(max-width:600px)": {
    width: "100%",
    height: "28px",
    fontSize: "11px",
    lineHeight: "15px",
  },
}));

export const ImageContainer = styled("img")(() => ({}));

export const EventDetailsTitle = styled(ContentTitle)(() => ({}));

// No Events Found Card Styles
export const EventsNotFoundCard = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px auto",
}));

export const EventsNotFoundTitle = styled(Typography)(() => ({
  color: "#000000",
  fontSize: "40px",
  fontWeight: "700",
  lineHeight: "142%",
  fontFamily: "Montserrat",
  textTransform: "capitalize",
  "@media (max-width: 600px)": {
    fontSize: "16px",
  },
}));

export const EventsNotFoundSubtitle = styled(Typography)(() => ({
  color: "#231F20",
  fontSize: "16px",
  lineHeight: "24px",
  fontFamily: "Montserrat",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "17px",
  },
}));

export const ImageStyle = styled.img`
  max-width: 200px;
`;
