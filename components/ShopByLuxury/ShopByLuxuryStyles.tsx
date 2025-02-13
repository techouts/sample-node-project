import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const BackgroundBox = styled(Box)((theme) => ({
  opacity: 0.7,
  position: "absolute",
  display: "grid",
  placeItems: "center",
}));
export const OfferText = styled(Box)((theme) => ({
  position: "absolute",
  display: "grid",
  placeItems: "center",
}));
export const StyledText = styled(Typography)((theme) => ({
  fontSize: "18px",
  fontWeight: 500,
  color: "#FFFFFF",
  lineHeight: "24px",
  fontFamily: "Montserrat",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "15px",
  },
}));

export const MainCard = styled(Box)((theme) => ({
  margin: "0 9px",
  position: "relative",
  cursor: "pointer",
}));
export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;
