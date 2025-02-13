import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const HomeLink = styled(Typography)(() => ({
  color: "#AD184C",
  fontWeight: "400",
  letterSpacing: "0.1px",
  fontSize: "14px",
  textTransform: "capitalize",
  lineHeight: "17px",
  fontStyle: "normal",
  "&:hover": {
    cursor: "pointer",
  },
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));

export const MakeupLink = styled(HomeLink)(() => ({
  color: "#979596",
  "&:hover": {
    cursor: "default",
    textDecoration: "none",
  },
}));

export const SlashOne = styled(Typography)(() => ({
  color: "#AD184C",
  fontWeight: "400",
  fontSize: "14px",
  letterSpacing: "0.1em",
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));
