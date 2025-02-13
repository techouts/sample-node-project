import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { transientProps } from "../../utility/TransientProps";

export const TextBox = styled(Box)(({ theme }) => ({
  fontSize: "1%",
  width: "100%",
}));
export const Typographys = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  textDecorationLine: "underline",
  objectFit: "cover",
  display: "flex",
  fontSize: "12px",
}));
export const Typography1 = styled(Typography)(({ theme }) => ({
  fontWeight: "400",
  fontSize: "18px",
  right: "0px",
  lineHeight: "142%",
  "@media (max-width: 900px)": {
    fontSize: "16px",
    whiteSpace: "nowrap",
    alignItems: "center",
  },
  "@media (max-width: 600px)": {
    fontSize: "12px",
  },
}));
export const BorderBox = styled(
  Grid,
  transientProps
)<{ $isText: boolean }>(({ $isText }) => ({
  "@media (max-width: 600px)": {
    flexDirection: $isText ? "row-reverse" : "row",
    display: $isText ? "block" : "flex",
  },
  flexWrap: "nowrap",
  fontSize: "12px",
  width: "auto",
  alignItems: "center",
}));
export const MarBox = styled(Box)(({ theme }) => ({
  width: "100%",
}));
export const TypographyFirst = styled(Typography)(({ theme }) => ({
  width: "100%",
  fontSize: "16px",
}));
export const ImgBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  "@media (max-width: 600px)": {
    marginLeft: "10px",
    marginRight: "45px",
    width: "60%",
  },
}));
export const BoxText = styled(Box)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "150%",
  "& > span": {
    fontWeight: "bold",
    textDecoration: "underline",
    cursor: "pointer",
    display: "block",
    flexDirection: "column",
  },
  "@media (max-width: 600px)": {
    width: "100%",
    fontSize: "12px",
    display: "flex",
    flexDirection: "row",
  },
}));
export const BorderGrid = styled(Grid)(({ theme }) => ({
  borderRight: "2px solid rgba(235,235,235,0.9)",
  padding: "1% 3%",
  "&:first-of-type": { paddingLeft: "0" },
  "&:last-child": { borderRight: "none", paddingRight: "0" },
  marginBottom: "1%",
  marginTop: "2%",
  "@media (max-width: 900px)": {
    borderBottom: "2px solid rgba(235,235,235,0.9)",
    margin: "0px 20px",
    borderRight: "none",
    padding: "4% 0%",
    marginBottom: "2%",
  },
  "@media (max-width: 600px)": {
    marginLeft: "16px",
    marginRight: "16px",
  },
}));
