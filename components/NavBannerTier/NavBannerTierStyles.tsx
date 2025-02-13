import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface Responsive {
  isMobile?: boolean;
  positiontype?: boolean;
}
export const ScrollButton = styled(Button)(({ isMobile }: Responsive) => ({
  cursor: "pointer",
  color: "#231F20",
  fontSize: isMobile ? "12px" : "16px",
  padding: isMobile ? "0px 15px 0px 0px" : "0px 27px 0px 0px ",
  textTransform: "capitalize",
  textDecoration: "underline",
  fontWeight: 500,
  lineHeight: "150%",
  backgroundColor: "white",
  ":hover": {
    backgroundColor: "#FFFFFF",
    textDecoration: "underline",
  },
}));

export const FirstCitizenImage = styled(Box)(({ isMobile }: Responsive) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  backgroundColor: "#F7F6F9",
  textAlign: isMobile ? "center" : "unset",
}));

export const NavBannerTitle = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    maxWidth: isMobile ? "" : "83%",
    fontSize: isMobile ? "12px" : "20px",
    lineHeight: "130%",
    color: "#231F20",
    paddingTop: "8px",
    fontStyle: "normal",
    fontWeight: 500,
  })
);

export const NavBannerSubtitle = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    maxWidth: "343px",
    fontSize: isMobile ? "11px" : "14px",
    lineHeight: "150%",
    color: "#4F4C4D",
    paddingRight: isMobile ? "10px" : "",
    fontStyle: "normal",
    fontWeight: 400,
  })
);

export const NavTitleintro = styled(Typography)(({ isMobile }: Responsive) => ({
  color: "#AD184C",
  fontSize: isMobile ? "16px" : "22px",
  lineHeight: "150%",
  fontWeight: 500,
}));

export const NavtitleBox = styled(Box)(({ isMobile }: Responsive) => ({
  marginBottom: isMobile ? "12px" : "",
  paddingLeft: isMobile ? "16px" : "",
  backgroundColor: "white",
}));
export const TitlesBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  gap: "10px",
}));