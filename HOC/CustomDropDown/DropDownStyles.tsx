import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {styled} from "@mui/material";
import { transientProps } from "../../utility/TransientProps";
export interface Responsive {
  ismobile?: boolean;
}
export const FlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
}));
export const BorderBox = styled(Box)(({ ismobile }: Responsive) => ({
  width: "100%",
  height: ismobile ? "250px" : "400px",
  border: "0px solid rgba(155, 155, 155, 0.3)",
  borderBottom: "0px",
  position: "relative",
}));
export const StyledGroup = styled(ButtonGroup)(() => ({
  borderRadius: "0px",
}));
export const StyledButton = styled(Button)(({ ismobile }: Responsive) => ({
  color: "#231F20",
  borderRadius: "0px",
  boxShadow: "none",
  padding: "0px",
  height: ismobile ? "28px" : "56px",
}));
export const StyledText = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 700,
  color: "#231F20",
}));
export const StyledIcon = styled(
  Box,
  transientProps
)<{ $isBlog: boolean }>(({ $isBlog }) => ({
  display: $isBlog ? "flex" : "",
  alignItems: $isBlog ? "center" : "",
  gap: $isBlog ? "8px" : "",
  position: $isBlog ? "sticky" : "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: "5%",
}));

export const ArrowStyledIcon = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: "5%",
  fontSize: "2rem",
  marginLeft: "50%",
}));

export const StyledForm = styled(
  FormControl,
  transientProps
)<{ $isBlog: boolean }>(({ $isBlog }) => ({
  minWidth: $isBlog ? "100%" : 200,
  border: "none",
  "& .MuiInputBase-root": {
    borderRadius: "0px",
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: $isBlog ? "none" : "block",
  },
}));

export const StyledSelect = styled(
  Select,
  transientProps
)<{ $isBlog: boolean; $border: boolean }>(({ $isBlog, $border }) => ({
  width: $isBlog ? "100%" : "228px",
  border: "none",
  fontWeight: "400",
  color: "#231f20",
  "& > fieldset": {
    borderWidth: $border ? "1px" : "0px",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#EAEAEA",
  },
  "& .MuiMenuItem-root": {
    width: $isBlog ? "100%" : "228px",
  },
  "& .css-ttfums-MuiButtonBase-root-MuiMenuItem-root": {
    minHeight: "auto",
    width: $isBlog ? "100%" : "228px",
  },
  "&:before": {
    borderColor: "none",
  },
  "&:after": {
    borderColor: "none",
  },
  "& .MuiSvgIcon-root.MuiSelect-icon": {
    display: "none",
  },
}));

export const StyledList = styled(
  MenuItem,
  transientProps
)<{ $isBlog: boolean }>(({ $isBlog }) => ({
  fontSize: $isBlog ? "14px" : "",
  lineHeight: $isBlog ? " 16.7px" : "",
  fontWeight: 400,
  padding: $isBlog ? "16px 20px" : "",
  fontStyle: "normal",
  color: "#231F20",
  "& .MuiPaper.root": {
    borderRadius: "0px",
    boxShadow: "none",
  },
  "& .Mui-focusVisible": {
    backgroundColor: "none",
  },
  "& .MuiPaper.root.MuiMenu.paper.MuiPaper.root.MuiPopover.paper": {
    boxShadow: "none",
  },
  "& . Mui-focusVisible": {
    backgroundColor: "red",
  },
  "&.MuiButtonBase-root.MuiMenuItem-root:hover": {
    backgroundColor: "rgba(0, 82, 204, 0.08);",
  },
  textTransform: "capitalize",
}));
export const BlogTypography = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: 400,
  lineHeight: "21.47px",
  fontStyle: "normal",
  color: "#000000",
}));
