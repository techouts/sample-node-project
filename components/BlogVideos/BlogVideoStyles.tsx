import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
interface Responsive {
  isMobile?: boolean;
  isLargetype?: boolean;
}

export const TitleTypography = styled('h2')(({ isMobile }: any) => ({
  color: "#AD184C",
  lineHeight: isMobile ? "16.8px" : "28px",
  fontSize: isMobile ? "12px" : "20px",
  margin:'0px',
  fontWeight: 600,
}));
export const ContentTypography = styled(Typography)(({ isMobile }: any) => ({
  color: "#7B7979",
  lineHeight: isMobile ? "16.8px" : "28px",
  fontWeight: 400,
  fontSize: isMobile ? "12px" : "16px",
  textAlign:'justify'
}));

export const VideoImage = styled("img")(({ isMobile,isLargetype }: Responsive) => ({
  display:isMobile ? "none" : "none",
  position: "absolute",
  top: isLargetype ? "40%" : "34%",
  left: isLargetype? "47%" : "41%",
  width: isLargetype ? "75px":"50px",
}));

export const ContentBox = styled(Box)(() => ({
  marginBottom: "20px",
}));
export const MainGrid = styled(Grid)(() => ({
  marginTop: "20px",
}));
export const ContentGrid = styled(Grid)(() => ({
  display:"grid",
  gap:"15px"
}));
export const ImagesBox = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  cursor:"pointer"
}));
export const Image = styled.img`
  width: 100%;
  vertical-align:bottom;
  height:100%;
`;
