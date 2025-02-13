import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { transientProps } from "../../utility/TransientProps";

export const ComponentTitle = styled(Box)(() => ({
  paddingBottom: "18px",
  "@media(max-width:600px)": {
    paddingBottom: "10px",
  },
}));
export const MainBox = styled(Box)(() => ({
  display: "flex",
  gap: "3%",
  "@media(max-width:600px)": {
    flexDirection: "column",
    alignSelf: "center",
    textAlign: "center",
    gap: "0%",
  },
  justifyContent: "space-between",
}));
export const MediaBox = styled(Box)(() => ({
  width: "35%",
  alignSelf: "center",
  "@media(max-width:600px)": {
    width: "100%",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const InnerBox = styled(Box)(() => ({
  width: "65%",
  "@media(max-width:600px)": {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
}));
export const SubTitle = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "20px",
  padding: "22px 0px 12px 0px",
  "@media(max-width:600px)": {
    padding: "10px 0px 8px 0px",
    textAlign: "left",
  },
}));
export const Description = styled(Typography)(() => ({
  color: "#7B7979",
  fontWeight: "400",
  fontSize: "16px",
  textAlign: "left",
  LineHeight:"24px",
  whiteSpace: "pre-wrap",

  "@media(max-width:600px)": {
    width: "100%",
    fontSize:"12px"
  },
}));

export const StyledBrandImage = styled(
  'img',
  transientProps
)<{ $isSubTitleAvailable: boolean }>(({ $isSubTitleAvailable }) => ({
  width: "100%",
  height: "100%",
  display: "block",
  "@media(max-width:600px)": {
    width: "100%",
    paddingBottom:$isSubTitleAvailable ? 0:'10px'
  },
}));
export const ImgList = styled(Box)(() => ({
  display: "flex",
  columnGap: "20px",
  padding: "3% 0px",
  "@media(max-width:600px)": {
    columnGap: "15px",
    padding: "5% 0px",
  },
}));
export const ImgBox = styled(Box)(() => ({
  height: "52px",
  width: "52px",
}));
export const Img = styled.img(() => ({
  width: "100%",
  height: "100%",
}));
export const ButtonBox = styled(Button)(() => ({
  width: "118px",
  minHeight: "44px",
  marginTop: "3.5%",
  backgroundColor: "#231F20",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  color: "#DEA3B7",
  fontWeight: "600",
  fontSize: "12px",
  borderRadius: "0px",
  "@media(max-width:600px)": {
    fontSize: "11px",
    marginTop: "2%",
    width: "97px",
    minHeight: "28px",
    lineHeight: "16px",
    letterSpacing: "1px",
  },
}));
