import {styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const TitleText = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "600",
  color: "#231F20",
}));

export const DescText = styled(Typography)(() => ({
  fontSize: "12px",
  color: "#A7A5A6",
}));

export const BorderBox = styled(Box)(() => ({
  padding: "20px",
  border: "1px solid #EAEAEA",
}));