import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid  from "@mui/material/Grid";
import { ColorType } from "../../utility/ColorType";
import { transientProps } from "../../utility/TransientProps";
export interface Responsive {
  ismobile: boolean;
}
export const MainBox = styled(Box)((theme) => ({
  width: "100%",
  "@media(max-width:600px)": {
    padding: "0  0 0 16px  ",
  },
}));
export const ViewAllbutton = styled(
  Button,
  transientProps
)<{ $backColor: string; $isMobile: boolean }>(({ $backColor, $isMobile }) => ({
  color:
    $backColor === "#231F20" ? "#231F20" : $isMobile ? "#DEA3B7" : "#AD184C",
  "@media(min-width:600px)": {
    position: "absolute",
    right: "5%",
    "&.MuiButtonBase-root.MuiButton-root": {
      paddingRight: "0px",
    },
  },
  "@media(max-width:600px)": {
    backgroundColor: "#231F20",
    padding: "6px 18px",
    display: "flex",
    top: "12px",
    marginBottom: "3%",
    "&:hover": {
      backgroundColor: "#231F20 !important",
      color: "#DEA3B7 !important",
    },
  },
  "&:hover": {
    backgroundColor: "#ffff",
    color: "#AD184C",
  },
  fontSize: "12px",
  borderRadius: "0px",
  letterSpacing: "1px",
  cursor: "pointer",
  float: "right",
}));
export const StyledGrid = styled(Grid)(() => ({
  position: "relative",
  paddingTop: "12px",
  width: "100%",
  "@media(max-width:600px)": {
    maxWidth: "100%",
    paddingTop: "10px",
    paddingLeft: "0px",
    paddingRight: "8px",
  },
}));
export const Styledimage = styled("img")(() => ({
  width: "100%",
  height: "100%",
  cursor: "pointer",
  borderRadius: "0px",
}));
export const StyledBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));
export const BoxStyled = styled(Box)(() => ({
  width: "90%",
  margin: "auto",
  font: " -webkit-control",
}));
export const TitleTypography = styled(
  Grid,
  transientProps
)<{ $textColor: ColorType | string }>(({ $textColor }) => ({
  "@media(max-width:400px)": {
    fontSize: "12px",
  },
  position: "absolute",
  fontSize: "14px",
  fontWeight: 600,
  color: $textColor,
  bottom: "26px",
}));
export const SubTitleTypography = styled(
  Typography,
  transientProps
)<{ $textColor: ColorType | string }>(({ $textColor }) => ({
  "@media(max-width:1210px)": {
    padding: "0% 4% 4% 4%",
  },
  color: $textColor,
  fontSize: "16px",
  position: "absolute",
  bottom: 0,
  fontWeight: 400,
  padding: "0 12% 4.5% 14%",
  textAlign: "center",
}));
export const SubTitle = styled.p<Responsive>`
  font-size: 10px;
  font-weight: 600;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 86%;
  margin: 1px;
  position: absolute;
  color: #e0e0e0;
  bottom: 10px;
`;
