import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { transientProps } from "../../utility/TransientProps";

export const MainGrid = styled(Grid)(() => ({
  padding: "0 5%",
  "@media (max-width:600px)": {
    padding: "0px 16px",
  },
}));
export const MainBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  marginBottom: "30px",
  padding: "0 80px",
  "@media (max-width:600px)": {
    padding: "30px 16px",
    marginBottom: "0px",
  },
}));
export const ColoredText = styled(Typography)(() => ({
  color: "#AD184C",
  fontSize: "12px",
  lineHeight: "14px",
  fontWeight: 500,
}));
export const SmallText = styled(ColoredText)(() => ({
  color: "#4F4C4D",
  paddingLeft: "5px",
  fontWeight: 400,
}));
export const DynamicText = styled(
  Typography,
  transientProps
)<{ $isSelected: boolean }>(({ $isSelected }) => ({
  color: $isSelected ? "#231F20" : "#4F4C4D",
  fontWeight: $isSelected ? "600" : "400",
  fontSize: "16px",
}));

export const SelectedTypography = styled(Typography)(() => ({
  margin: "30px 0px",
  fontSize: "22px",
  color: "#AD184C",
  fontWeight: "600",
}));

export const SelectBox = styled(Box)(() => ({
  marginBottom: "32px",
  cursor: "pointer",
}));
export const SelectedAccountSection = styled(Typography)(() => ({
  color: "#AD184C",
  fontWeight: "600",
  fontSize: "22px",
  lineHeight: "150%",
  marginBottom: "30px",
  "@media (max-width:600px)": {
    padding: "0px 20px 20px 20px",
    marginBottom: "0",
    fontSize: "16px",
  },
}));
