import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styledComponent from "@emotion/styled";
import { styled } from "@mui/material/styles";

interface imageRespose {
  imageSource: any;
}

interface backgroundimageInterface {
  imageSource: any;
  isBackgroundExist: boolean;
}
export const MainBox = styled(Box)(({ imageSource }: imageRespose) => ({
  display: "flex",
  flexDirection: imageSource ? "row" : "column",
  "@media(max-width:600px)": {
    flexDirection: imageSource ? "column" : "",
  },
}));
export const Title = styled(Typography)({
  fontSize: "32px",
  fontWeight: 700,
  lineHeight: "140%",
  textAlign: "center",
  padding: "2.8% 0 3.2% 0",
  "@media(max-width:600px)": {
    fontSize: "16px",
    padding: "14% 0 7% 0",
  },
});
export const ContentGrid = styled(Grid)(
  ({ imageSource, isBackgroundExist }: backgroundimageInterface) => ({
    position: isBackgroundExist ? "absolute" : "relative",
    gridTemplateColumns: imageSource ? "repeat(3, 1fr)" : "repeat(6, 1fr)",
    display: "grid",
    width: "100%",
    rowGap: imageSource ? "8%" : "9%",
    columnGap: imageSource ? "4.5%" : "1.4%",
    justifyItems: "center",
    alignItems: "center",
    padding: imageSource ? "3.5% 6.5% 3.5% 5.5%" : "4.4% 2.7%",
    "@media(max-width:600px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
      rowGap: imageSource ? "15%" : "7px",
      columnGap: imageSource ? "4.5%" : "7px",
      padding: imageSource ? "7.5% 4.5%" : "17px",
    },
  })
);
export const GridItemsImage = styled(Box)({
  display: "grid",
  width: "100%",
});
export const IconImages = styledComponent.img`
width:100%;
cursor:pointer;
`;
export const StyledButton = styled(Button)(({ imageSource }: imageRespose) => ({
  backgroundColor: imageSource ? "#DEA3B7 !important" : "black !important",
  color: imageSource ? "#000" : "white",
  boxShadow: "none",
  borderRadius: "0",
  cursor: "pointer",
  marginTop: "2.8%",
  fontSize: "11px",
  fontWeight: "500",
  "&.MuiButtonBase-root.MuiButton-root": {
    padding: imageSource ? "6px 18px" : "20px 50px",
  },
  "@media(max-width:600px)": {
    marginTop: imageSource ? "3.5%" : "11%",
    "&.MuiButtonBase-root.MuiButton-root": {
      padding: imageSource ? "6px 18px" : "15px 56px",
    },
  },
}));
export const Backgroundimage = styledComponent.img`
 width: 100%;
 height: 100%;
`;
export const Firstimage = styledComponent.img`
 width: 100%;
 height: 100%;
`;
export const ImageBox = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
});
