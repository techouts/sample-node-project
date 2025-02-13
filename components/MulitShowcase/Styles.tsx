import {styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StyledComponent from "@emotion/styled";
interface IndexInterface {
  index: number;
  isMobile: any;
  zigzag: boolean;
}
export const FlexBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const StyledButton = styled(Button)(({ theme }) => ({
  lineHeight: 3,
  fontSize: "12px",
  position: "absolute",
  width: "100%",
  marginBlock: "auto",
  backgroundColor: "#231F20",
  color: "#DEA3B7",
  borderRadius: "0",
  boxShadow: "none",
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: "#231F20",
    color: "#DEA3B7",
    boxShadow: "none",
  },
  "@media(max-width: 900px)": {
    fontSize: "10px",
    lineHeight: 2,
  },
  "@media(max-width: 600px)": {
    fontSize: "8px",
  },
}));
export const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));
export const ContentImg = StyledComponent.img`
  height: 100%;
  width:100%;
  cursor:pointer;
`;
export const StyledImage = StyledComponent.img`
    width: 100%;
    height: 100%;
    object-fit: cover
`;
export const SingleCard = styled(Box)(({ index, zigzag }: IndexInterface) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignSelf: "flex-start",
  flexDirection: `${index % 2 === 0 ? "column-reverse" : "column"}`,
  cursor: "pointer",
  "@media(min-width: 600px)": {
    padding: zigzag ? `${index % 2 === 0 ? "0 0 5% 0" : "5% 0 0 0"}` : "",
  },
}));
