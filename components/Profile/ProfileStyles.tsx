import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

export const ImageBox = styled(Box)(() => ({
  position: "relative",
  bottom: "90px",
  left: "40px",
  "@media(max-width:900px)": {
    position: "relative",
    bottom: "100px",
    left: "0px",
  },
}));

export const AvatarView = styled(Avatar)(({ customerImage }: any) => ({
  height: "110px",
  width: "112px",
  backgroundColor: customerImage ? "" : "#F2F2F5",
  padding: customerImage ? "" : "20px",
  "& .css-1pqm26d-MuiAvatar-img": {
    objectFit: "fill",
  },
}));

export const MainGrid = styled(Grid)(() => ({
  "@media(max-width:900px)": {
    paddingTop: "40px  !important",
    textAlign: "center",
  },
}));

export const ParentGrid = styled(Grid)(({ isMobile }: any) => ({
  position: "relative",
  left: "8px",
  width: "100%",
  padding: isMobile ? "" : "20px",
  margin: "0px",
}));

export const PictureBox = styled(Box)(() => ({
  position: "absolute",
  bottom: "250px",
  left: "110px",
  height: "42px",
  width: "42px",
  "@media(max-width:900px)": {
    position: "relative",
    bottom: "125px",
    left: "175px",
    height: "35px",
    width: "35px",
  },
}));
export const TierTextTypography = styled(Typography)(() => ({
  textDecorationLine: "underline",
  fontWeight: "600",
  fontSize: "16px",
  width: "120px",
  lineHeight: "20px",
  textAlign: "center",
  marginTop: "15px",
  "@media(max-width:900px)": {
    width: "100%",
    fontSize: "12px",
    textAlign: "center",
    marginTop: "0",
  },
}));
export const UserNameBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
  "@media(max-width:900px)": {
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "15px",
  },
}));
export const UserName = styled(Typography)(() => ({
  fontWeight: "500",
  fontSize: "28px",
  lineHeight: "121%",
  color: "#231F20",

  "@media(max-width:900px)": {
    fontSize: "16px",
  },
}));
export const TierLogoImage = styled(Box)(() => ({
  height: "29px",
  width: "28px",
  "@media(max-width:900px)": {
    height: "19px",
    width: "19px",
  },
}));

export const UserKeyTypography = styled(Typography)(() => ({
  color: "#4F4C4D",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "110%",
  flexShrink: 0,
  "@media(max-width:900px)": {
    textAlign: "justify",
    justifyContent: "space-between",
    fontSize: "11px",
    fontWeight: "400",
    lineHeight: "13px",
  },
}));
export const UserValueTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "19px",
  color: "#1C191A",
  lineBreak: "anywhere",
  "@media(max-width:900px)": {
    fontSize: "11px",
    lineHeight: "13px",
  },
}));
export const VerifyButtonTypography = styled(Typography)(() => ({
  color: "#9C1644",
  textDecoration: "underline",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  "@media(max-width:900px)": {
    textAlign: "justify",
    justifyContent: "space-between",
    fontSize: "11px",
    lineHeight: "13px",
  },
}));

export const VerifiactionBox = styled(Box)(() => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
}));

export const VerifiedImage = styled(Typography)(() => ({
  height: "20px",
  width: "20px",
  "@media(max-width:900px)": {
    height: "10px",
    width: "10px",
  },
}));

export const UserDetailsBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  paddingBottom: "20px",
  fontWeight: "400",
  flexWrap: "nowrap",
  "@media(max-width:600px)": {
    paddingBottom: "10px",
  },
}));

export const ProfileBox = styled(Box)(() => ({
  fontWeight: "400",
  fontSize: "16px",
}));

export const EditBox = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  justifyContent: "flex-end",
  "@media(max-width:900px)": {
    position: "absolute",
    top: "2%",
    right: "20px",
    marginTop: "10px",
  },
}));

export const EditLogo = styled(Box)(() => ({
  height: "15px",
  width: "15px",
  marginRight: "14px",
  "@media(max-width:900px)": {
    height: "12px",
    width: "12px",
  },
}));

export const EditTextTypography = styled(Typography)(() => ({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "96%",
  marginTop: "5px",
  color: " #231F20",
  "@media(max-width:900px)": {
    fontSize: "11px",
  },
}));
export const TierPointsTypography = styled(Typography)(({ isFlag }: any) => ({
  fontWeight: "500",
  fontSize: "20px",
  lineHeight: "160%",
  color: "#4F4C4D",
  justifyContent: "flex-end",
  gap: "3px",
  margin: isFlag ? "15px 10px 0px 20px" : "15px 10px 0px 0px",
  "@media(max-width:900px)": {
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "13px",
    margin: "0 10px 0 0",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "3px",
    display: "flex",
  },
}));

export const ChangePasswordTypography = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "16px",
  color: "#AD184C",
  textDecorationLine: "underline",
  cursor: "pointer",
  marginTop: "20px",
  marginLeft: "34px",
  "@media(min-width:120px)": {
    marginLeft: "0px",
  },
  "@media(max-width:600px)": {
    marginTop: "10px",
  },
}));
export const ViewMoreTypography: any = styled(Typography)(() => ({
  cursor: "pointer",
  fontSize: "11px",
  color: "#AD184C",
  textDecoration: "underline",
  lineHeight: "120%",
  fontStyle: "normal",
  marginTop: "9px",
  fontWeight: 500,
}));
