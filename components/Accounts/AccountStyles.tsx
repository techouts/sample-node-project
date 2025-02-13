import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { pink } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers";

export const AvatarView = styled(Avatar)(({ profileImage }: any) => ({
  height: "110px",
  width: "112px",
  backgroundColor: profileImage ? "" : "#F2F2F5",
  padding: profileImage ? "" : "20px",
  "& .css-1pqm26d-MuiAvatar-img": {
    objectFit: "fill",
  },
  "@media(max-width:900px)": {
    height: "96px",
    width: "96px",
    "& .css-1pqm26d-MuiAvatar-img": {
      objectFit: "fill",
    },
  },
}));

export const ParentGrid = styled(Grid)(() => ({
  padding: "30px 0px 30px 0px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  "@media(max-width:900px)": {
    // padding: '0px 10px',
    // marginTop:'16px'
  },
}));
export const LocalizationProviders = styled(LocalizationProvider)(() => ({
  "& .MuiTextField-root": {
    "@media (max-width:600px)": {
      width: "200px",
    },
  },
}));

export const TierTextTypo = styled(Typography)(() => ({
  textAlign: "center",
  textDecorationLine: "underline",
  fontWeight: "600",
  fontSize: "16px",
  color: "#231F20",
  margin: "0px 10px",
  maxWidth: "141px",
  "@media(max-width:900px)": {
    fontSize: "12px",
    margin: "0px",
    maxWidth: "100%",
  },
}));

export const InfoTextTypo = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "12px",
  color: "#7B7979;",
  marginTop: "5px",
  width: "96%",
  marginLeft: "10px",
  whiteSpace: "pre-wrap",
}));
export const MakeChangesTypography = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "133%",
  color: "#FFFFFF",
}));

export const fontsiz = {
  fontSize: "14px",
};

export const fontsiznocol = {
  fontSize: "14px",
  fontWeight: "400",
  color: "#231F20",
};
export const stylesfont = {
  backgroundColor: "#231F20",
  width: "139px",
  height: "44px",
};
export const stylefordesk = {
  backgroundColor: "#231F20",
  height: "28px",
  color: "white",
  width: "96%",
};

export let label_gender = {
  color: "black",
  fontSize: "14px",
  textAlign: "left",
};
export const note = { color: "#7B7979", fontSize: "0.75rem" };
export const box_compo = {
  "& > :not(style)": {
    margin: "8px 0px 24px 8px",
    width: "80%",
    "& .css-1in441m {": {
      color: "#AD184C",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#AD184C",
  },
  "@media(max-width:900px)": {
    width: "95%",
  },
};
export const radio_button = {
  "&.Mui-checked": {
    color: pink[600],
  },
};
export const forbut_center = { textAlign: "center", width: "96%" };
export const photo_height = {
  maxHeight: "150px",
  textAlign: "center",
  cursor: "pointer",
};
