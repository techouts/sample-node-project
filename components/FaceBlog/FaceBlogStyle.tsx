import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

export const MainBox = styled(Box)(() => ({
  display: "flex",
  gap: "16px",
  justifyContent: "center",
  flexWrap: "wrap",
  backgroundColor:"#FBFBFB",
   "@media(max-width:600px)": {
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: "8px",
    backgroundColor:"#FBFBFB",
  },
}));

export const ImageCard = styled(Card)(() => ({
  boxShadow: "none",
  minHeight: "475px",
  width:"413px",
  borderRadius: "0",
  "@media(max-width:600px)": {
    width: "47%",
    minHeight: "100%",
  },
}));

export const MCardMedia = styled(CardMedia)(() => ({
  position: "relative",
}));

export const StackView = styled(Stack)(() => ({
  flexDirection: "row",
}));

export const BoxView = styled(Box)(() => ({
  position: "absolute",
  right: "10px",
  bottom: "15px",
  border: "1px solid white",
  backgroundColor: "white",
  borderRadius: "10px",
  paddingRight: "5px",
}));

export const StackMore = styled(Stack)(() => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const TCardContent = styled(CardContent)(() => ({
  "@media(max-width:600px)": {
    padding:"10px",
  },
}));


export const TitleTypography = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "20px",
  lineHeight: "140%",
  "@media(max-width:600px)": {
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "140%",
  },
}));

export const SubtTypography = styled(Typography)(() => ({
  marginTop: "10px",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "140%",
}));

export const ReadTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  lineHeight: "16px",
  color: "#8A133D",
  marginLeft: "17.46px",
  cursor: "pointer",
  "@media(max-width:600px)": {
    fontWeight: "400",
    fontSize: "11px",
    lineHeight: "16px",
    marginLeft: "10px",
    cursor: "pointer",
  },
}));

export const CardActionsMore = styled(CardActions)(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "24px",
}));

export const ViewTextTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "140%",
  color: "#A7A5A6",
}));

export const StackText = styled(Stack)(() => ({
  flexDirection: "row",
}));

export const FirstStack = styled(Stack)(() => ({
  gap: "4px",
  flexDirection: "row",
}));


export const EyeOutlinedIcon = styled(RemoveRedEyeOutlinedIcon)(() => ({
  height: "15px",
  opacity: "0.4",
}));


export const ShareIcon = styled(ShareOutlinedIcon)(() => ({
  height: "11.1px",
  marginTop: "5%",
  color: "#7B7979",
  width: "12px",
  "@media(max-width:600px)": {
    width: "12px",
    height: "11.1px",
    color: "#7B7979",
    marginBottom: "8px",
  },
}));

export const ShareTextTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "16px",
  color: "#7B7979",
}));
