import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

export const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  "&.MuiBackdrop-root": {
    top: "120px",
    overflowX: "scroll",
  },
  "@media(max-width:600px)": {
    top: "50px !important",
    border: "none",
  },
}));

export const BackdropBox = styled(Box)(({ theme }) => ({
  position: "fixed",
  height: "80%",
  margin: "0px",
  top: "120px",
  left: "50%",
  transform: "translateX(-50%)",
  right: "30px",
  backgroundColor: "white",
  maxHeight: "calc(90vh - 80px)",
  borderRadius: "0px 0px 10px 10px",
  overflowY: "scroll",
  overflowStyle: "none",
  color: "#4F4C4D",
  fontWeight: "400",
  width: "65%",
  "::-webkit-scrollbar": {
    display: "none",
  },
  "@media(max-width:600px)": {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: "50px",
    left: "50%",
    maxHeight: "100vh",
  },
}));
export const Boxs = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

export const RecentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "9px",
  "@media(max-width:600px)": {},
}));

export const RecentGrid = styled(Grid)(({ theme }) => ({
  display: "grid",
  width: "100%",
  paddingLeft: "3%",
  "@media(max-width:600px)": {
    paddingTop: "0%",
  },
}));

export const RecentContent = styled(Grid)(({ theme }) => ({
  paddingBottom: "10px",
  fontSize: "20px",
  "@media(max-width:600px)": {
    paddingBottom: "2px",
  },
}));

export const RecentText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#e9e9e9",
  },
  "@media(max-width:600px)": {
    color: "#4F4C4D",
    fontSize: "12px",
  },
}));

export const GridFilter = styled(Grid)(({ theme }) => ({
  paddingBottom: "20px",
  paddingTop: "1px",
  "@media(max-width:600px)": {
    paddingBottom: "0px",
  },
}));

export const TrendingTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "black",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));

export const TrendGrid = styled(Grid)(({ theme }) => ({
  display: "grid",
  paddingLeft: "3%",
}));

export const TrendList = styled(Grid)(({ theme }) => ({
  width: "100%",
  paddingBottom: "10px",
  fontSize: "20px",
  "@media(max-width:600px)": {
    paddingBottom: "0px",
  },
}));

export const TrendCarouselList = styled(Grid)(() => ({
  width: "100%",
  paddingBottom: "10px",
  fontSize: "20px",
  "@media(max-width:600px)": {
    paddingBottom: "0px",
  },
}));

export const CarouselGrids = styled(Grid)(({ theme }) => ({
  paddingLeft: "0px",
  paddingBottom: "10px",
}));

export const PopularBrandTitle = styled(Typography)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "9px",
  paddingTop: "10px",
}));

export const PopularGrid = styled(Grid)(({ theme }) => ({
  width: "100%",
  paddingBottom: "10px",
}));

export const SearchDataIcons = styled(Grid)(({ theme }) => ({
  paddingBottom: "20px",
  fontSize: "20px",
  "@media(max-width:600px)": {
    paddingBottom: "2px",
  },
}));

export const RecentTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "black",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));

export const BrandsTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "black",
  fontWeight: 700,
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));

export const GridImage = styled(Grid)(({ theme }) => ({
  display: "grid",
  paddingLeft: "30px",
  gridGap: "6px",
  "@media(max-width:600px)": {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: "12px",
    paddingLeft: "20px",
  },
}));

export const TrendListMob = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  "@media(max-width:600px)": {

  },
}));

export const TrendMobile = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  "@media(max-width:600px)": {},
}));

// SpinnerLoaderForSearch Component Styles Start from here
export const LoaderIconAndTextBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const SpinnerLoaderText = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontSize: "20px",
  fontWeight: 500,
  color: "#AD184C",
  "@media(max-width:600px)": {
    fontSize: "16px",
  },
}));
