import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Responsive {
  isMobile?: boolean;
  imageDirection?: boolean;
}

export const MainBox = styled(Box)(() => ({
  display: "flex",
  margin: "20px",
}));
export const TopBox = styled(Box)(() => ({
  display: "flex",
}));

export const ContentGrid = styled(Grid)(
  ({ imageDirection }: Responsive) => ({
    "@media(max-width:600px)": {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: imageDirection ? "column" : "column-reverse",
    },
  })
);
export const TextGrid = styled(Grid)(() => ({
  paddingRight: "0px",
  textAlign: "left",
  "@media(max-width:600px)": {
    textAlign: "centre",
    fontSize: "12px",
  },
}));

export const TitleText = styled(Typography)(() => ({
  fontSize: "20px",
  color: "#AD184C",
  fontWeight: "600",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const TitleTypography = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "700",
  fontFamily: "Montserrat",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const SubTitleText = styled(Typography)(() => ({
  fontSize: "20px",
  color: "#231F20",
  fontWeight: "600",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const FaceCleansingSubText = styled(Box)(() => ({
  "& > h2,h3,h4,div": {
    fontSize: "20px",
    color: "#AD184C",
    fontWeight: "600",
    lineHeight: "140%",
    margin: "0px",
    "@media(max-width:600px)": {
      fontSize: "12px",
    },
  },
}));

export const DescriptionText = styled(Grid)(() => ({
  "& > h2,h3,h4": {
    fontSize: "20px",
    color: "#2d2d2d",
  },
  color: "#2d2d2d",
  display: "block",
  fontWeight: "400",
  fontStyle: "normal",
  fontSize: "18px",
  lineHeight: "140%",
   paddingTop:"15px",
  width: "100%",
  "@media(max-width:600px)": {
    fontSize: "12px !important",
    fontWeight: "400",
  },
  "& .bs-nav-link:hover": {
    textDecoration: "underline !important",
    color: "#AD184C",
  },
}));

export const HeadingLevel = styled(Grid)(({ isMobile }: Responsive) => ({
  "& > h2,h3,h4": {
    fontSize: isMobile ? "12px" : "20px",
    margin: "0px !important",
    padding: "0px !important",
  },
}));

export const HeadingLevelMain = styled(Grid)(({ isMobile }: Responsive) => ({
  "& > h2,h3,h4": {
    fontSize: isMobile ? "12px" : "20px",
    marginTop: "10px !important",
    padding: "0px !important",
    fontWeight: isMobile ? "500" : "700",
  },
}));

export const Quickviewtext = styled(Typography)(({ isMobile }: Responsive) => ({
  fontSize: isMobile ? "12px" : "20px",
  fontWeight: isMobile ? "500" : "700",
  color: "#1C191A",
}));

export const Descriptionbenefits = styled(Grid)(({ isMobile }: Responsive) => ({
  fontSize: isMobile ? "12px" : "18px",
  color: "#2d2d2d",
  "& > h2,h3,h4": {
    fontSize: isMobile ? "16px" : "20px",
    marginTop: "10px !important",
    padding: "0px !important",
    fontWeight:"600",
  },
}));

export const EmbededText = styled(Grid)(({ isMobile }: Responsive) => ({
  display: "unset",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}));

export const Parent = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "auto auto",
  gridGap: "10px",
}));
