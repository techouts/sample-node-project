import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
interface Add {
  isMobile: boolean;
}
export const TypographyPlace = styled(Typography)(({ isMobile }: Add) => ({
  backgroundColor: "#EAE9EF",
  textAlign: "center",
  fontSize: isMobile ? "11px" : "14px",
  lineHeight: isMobile ? "13.2px" : "16.7px",
  padding: isMobile ? "7px 16px" : "8px 12px",
  color: "#231F20",
  fontWeight: "400",
  marginRight: "10px",
  marginBottom: "10px",
  flexWrap: "wrap",
}));
export const TitleTypography = styled(Typography)(({ isMobile }: Add) => ({
  fontWeight: "500",
  fontSize: isMobile ? "12px" : "20px",
  lineHeight: isMobile ? "15px" : "24px",
  marginLeft: "23px",
  color: "#231F20",
}));
export const MainGrid = styled(Grid)(() => ({
  border: "1px solid rgba(155, 155, 155, 0.3)",
  textAlign: "start",
}));
export const ChildGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));
export const AddTypography = styled(Typography)(() => ({
  display: "flex",
  flexDirection: "row",
  fontWeight: "600",
  flexWrap: "wrap",
  alignItems: "center",
  fontSize: "16px",
  cursor: "pointer",
  marginRight: "12px",
  "@media(max-width:768px)": {
    fontSize: "12px",
  },
}));
export const TypographyAddText = styled(Typography)(({ isMobile }: Add) => ({
  fontSize: isMobile ? "11px" : "16px",
  lineHeight: "96%",
  fontWeight: "500",
  marginLeft: "13px",
  color: "#231F20",
  "@media(max-width:768px)": {
    fontSize: "12px",
  },
}));

export const Typographylogo = styled(Typography)(() => ({
  textAlign: "end",
  flex: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "end",
}));
export const TypographyName = styled(Typography)(({ isMobile }: Add) => ({
  fontWeight: "500",
  color: "#000000",
  fontSize: isMobile ? "12px" : "16px",
  lineHeight: isMobile ? "14px" : "20px",
  margin: "8px 0px",
  wordBreak: "break-all",
}));
export const TypographyText = styled(Typography)(() => ({
  color: "#4F4C4D",
  fontSize: "16px",
  lineHeight: "150%",
  wordBreak: "break-all",
  "::-webkit-scrollbar": {
    width: "3px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "darkgrey",
    borderRadius: "3px",
    border: "8px solid darkgrey",
  },
}));
export const IconTypography = styled(Typography)(() => ({
  marginRight: "10px",
  cursor: "pointer",
}));
export const TypographyNumber = styled(Typography)(({ isMobile }: Add) => ({
  fontWeight: "400",
  fontSize: isMobile ? "12px" : "16px",
  padding: "5px 0px",
  lineHeight: isMobile ? "17px" : "23px",
  color: "#000000",
}));
export const TypographyHead = styled(Typography)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));
export const TypographyHeader = styled(Typography)(() => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
}));
