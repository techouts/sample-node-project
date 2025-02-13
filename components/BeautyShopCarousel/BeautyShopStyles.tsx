import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const ProductTitle = styled(Grid)(({ isMobile }: any) => ({
  "& > h2,h3,h4":{
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontSize: isMobile ? "12px" : "20px",
  lineHeight: isMobile ? "17px" : "28px",
  fontWeight: 600,
  color: "#231F20",
  justifyContent:'flex-end',
  margin:'0px',
  padding:'0px'
  }
}));

export const MainBox = styled(Box)(({ isMobile }: any) => ({
  width: "100%",
  padding: isMobile ? "25px 16px 25px 16px" : "56px 40px 56px 40px",
}));

export const ContentGrid = styled(Grid)(() => ({
  marginTop: "1%",
}));
export const BuyNowButton = styled(Button)(({ isMobile }: any) => ({
  borderRadius: "0px",
  backgroundColor: "#DEA3B7",
  color: "black",
  display:"block",
  "&.MuiButton-root:hover": {
    backgroundColor: "#DEA3B7",
  },
  padding: isMobile ? "5px 15px": "15px 55px",
}));
export const ProductGrid = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
}));
export const ButtonBox = styled(Grid)(({isMobile}:any) => ({
  display:"flex",
  justifyContent : isMobile ? "center":"none",
  padding: "20px 0 0 0",
}));
export const Img = styled.img`
  align-self: start;
`;
export const StyledStack = styled(Stack)(() => ({
  flexDirection: "column",
  gap: "15px",
}));
export const ImageGrid = styled(Grid)(({ isMobile }: any) => ({
  display: isMobile ? "none" : "flex",
}));
export const ProductDetails = styled(Box)(() => ({
  flexDirection: "row",
  display: "flex",
  gap: "10px",
}));
export const TitleTypography = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontStyle: "normal",
  color: "#1C191A",
  fontSize: "20px",
  fontWeight: "550",
  lineHeight: "24px",
  textTransform: "uppercase",
}));
export const Text = styled(Grid)(({isMobile}:any) => ({
  fontWeight: "400",
  fontSize: isMobile ?"12px":"18px",
  lineHeight: "140%",
  color:"#2d2d2d",
}));
export const CountText = styled(Typography)(() => ({
  flexDirection: "row",
  display: "flex",
  justifyContent:"end",
  gap: "5px",
}));
export const GalleryImageBox = styled(Box)(() => ({
  position: "relative",
  width: "100%",
}));
export const GalleryBox = styled(Box)(() => ({
  width: "100%",
}));
export const FirstBox = styled(Box)(() => ({
  width: "100%",
}));

export const ButtonText = styled(Typography)(({ isMobile }: any) => ({
  marginRight: isMobile ? "0px" : "60px",
  paddingLeft: isMobile ? "0px" : "40px",
  whiteSpace: "nowrap",
  display: "flex",
  flexDirection: "column",
  "& > span": {
    whiteSpace: "nowrap",
  },
}));
export const ArrowImage = styled(Box)(() => ({
  padding: "10x 0px 0px 0px",
}));
export const Image = styled.img`
  width: 100%;
`;
