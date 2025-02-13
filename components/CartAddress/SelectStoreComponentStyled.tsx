import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { transientProps } from "../../utility/TransientProps";

export const PrimaryBox = styled(Box)(() => ({
  display: "flex",
  gridGap: "20px",
}));

export const RadioGroupStyled = styled(RadioGroup)(() => ({
  "& .MuiRadio-root.Mui-checked": {
    color: "#AD184C",
  },
  "& .MuiButtonBase-root.MuiRadio-root": {
    padding: "4px",
  },
}));

export const NameTypography = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: $isMobile ? "14px" : "16px",
  color: $isMobile ? "#231F20" : "#000000",
  lineHeight: $isMobile ? "17px" : "20px",
}));
export const AddressTypography = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  maxWidth: "350px",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: $isMobile ? "12px" : "16px",
  lineHeight: "150%",
  color: "#4F4C4D",
}));

export const DirectionTypography = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  cursor: "pointer",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: $isMobile ? "12px" : "14px",
  lineHeight: $isMobile ? "14px" : "140.83%",
  color: "#AD184C ",
  textDecorationLine: "underline",
  textTransform: "capitalize",
}));
