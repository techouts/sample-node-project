import styledComponent from "@emotion/styled";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Card";
import Card from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { transientProps } from "../../utility/TransientProps";
interface Beauty {
  isMobile: boolean;
}
export const CeGrid = styled(Grid)(() => ({
  width: "100%",
  textAlign: "center",
  alignItems: "center",
  cursor: "pointer",
}));
export const ImgsCard = styled(
  Card,
  transientProps
)<{ $isBlog: boolean }>(({ $isBlog }) => ({
  boxShadow: $isBlog ? "0px 0px 25px rgba(0, 0, 0, 0.05)" : "none",
  backgroundColor: $isBlog ? "#FFFFFF" : "#F3F3F3",
  borderRadius: $isBlog ? "0px" : "none",
  cursor: "pointer",
}));
export const StyledButton = styled(Button)(({ isMobile }: Beauty) => ({
  backgroundColor: "#231F20",
  marginTop: isMobile ? "" : "3%",
  padding: "14px 26px",
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 500,
  letterSpacing: "1px",
  borderRadius: "unset",
  color: "#DEA3B7",
  textTransform: "uppercase",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  "@media(max-width:900px)": {
    padding: "8px 18px",
    fontSize: "11px",
  },
}));
export const AlTypography = styled(Typography)(() => ({
  fontSize: "16px",
  color: "#7B7979",
  "@media(max-width:600px)": {
    fontSize: "11px",
    marginTop: "6px",
    width: "100%",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
  },
}));
export const CardBox = styled(Box)({
  height: "100%",
});
export const BCardContent = styled(CardContent)(() => ({
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "1",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  fontWeight: "500",
  padding: "16px 16px 0px 16px",
  lineHeight: "142%",
  color: "#231F20",
  "@media (max-width:900px)": {
    padding: "12px 21px 4px 16px",
    textAlign: "center",
  },
}));
export const ContentTag = styled(Typography)(() => ({
  backgroundColor: "#c3b0f3",
  width: "58px",
  lineHeight: "18px",
  color: "#141414",
  fontSize: "12px",
  textAlign: "center",
  cursor: "pointer",
  "@media(max-width:600px)": {
    display: "none",
  },
}));
export const ButtonBox = styled(Box)(() => ({
  textAlign: "left",
  "@media(max-width:600px)": {
    textAlign: "center",
    position: "relative",
    margin: "25px 0px",
  },
}));
export const STypography = styled(Typography)(() => ({
  fontSize: "13px",
  lineHeight: " 150%",
  color: "#656263",
  "@media(max-width:900px)": {
    fontSize: "10px",
    padding: " 0 7%",
    width: "100%",
    display: " -webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    textAlign: "center",
  },
  "@media(min-width:601px) and (max-width:900px)": {
    fontSize: "14px",
  },
}));
export const MTypography = styled(
  Typography,
  transientProps
)<{ $isBlog: boolean }>(({ $isBlog }) => ({
  fontSize: "13px",
  color: "#656263",
  "@media(max-width:600px)": {
    fontSize: "10px",
    width: "100%",
    display: " -webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },
}));

export const PTypography = styled(Typography)(() => ({
  fontSize: "16px",
  display: "block",
  letterSpacing: "0.15px",
  color: "#000000",
  "@media(max-width:600px)": {
    display: "-webkit-box",
    overflow: "hidden",
    width: "100%",
    fontSize: "12px",
    textOverflow: "ellipsis",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
  },
}));
export const HTypography = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "400",
  textTransform: "uppercase",
  "@media(max-width:600px)": {
    fontSize: "14px",
  },
}));
export const RightGrid = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
}));

export const RGrid = styled(Grid)(() => ({
  cursor: "pointer",
  "@media(max-width:600px)": {
    marginTop: "1%",
  },
}));
export const FirstStack = styled(Stack)(() => ({
  flexDirection: "column",
}));
export const RightStack = styled(Stack)(() => ({
  "@media(max-width:600px)": {
    flexDirection: "row",
    width: "minContent",
    gridGap: "8px",
  },
}));
export const OverlappedImage = styledComponent.img`
    width: 100% ;
`;
export const CartTitle = styled(Typography)({
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "20px",
  lineHeight: "140%",
  color: "#231F20",
  paddingTop: "15px",
  "@media(max-width:600px)": {
    fontSize: "14px",
  },
});
export const CardDescription = styled(Typography)({
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: " 140%",
  color: "#7B7979",
  marginTop: "10px",
  "@media(max-width:600px)": {
    fontSize: "10px",
  },
});
