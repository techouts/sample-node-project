import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styledComponent from "@emotion/styled";

export const BlockGrid = styled(Box)(({ theme }) => ({
  height: "max-content",
  position: "absolute",
  bottom: "0",
  paddingBottom:"1.25%",
  left: "0",
  right: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const Offertext = styled(Box)((theme) => ({
  width: "100%",
  height: "max-content",
  backgroundColor: "#FFFFFF",
  textAlign: "center",
  opacity: "85%",
  margin:"0% 22% 0% 22% "
  
}));
export const StyledGrid = styled(Grid)(({ theme }) => ({
  position: "relative",
  textAlign: "center",
}));
export const ImageContainer = styledComponent.img`
  width: 100%;
  height: 100%
`;
export const BorderBox = styled(Grid)`
  width:100%;
  height:100%;
  top:0;
  position:absolute;
  padding:6% 6% 1.1% 3%;
`;
export const Border = styled(Box)`
  border:1px solid white;
  height:100%;
`;
export const BrandSize = styled(Typography)`
  font-size:15px;
  font-weight:600;
  font-family: Montserrat;
  line-height:32px;
`