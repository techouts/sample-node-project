import {styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import { ColorType } from "../../utility/ColorType";
import { transientProps } from "../../utility/TransientProps";

export const OfferTextStyle = styled(
  Typography,
  transientProps
)<{ $textColor: ColorType | string }>(({ $textColor }) => ({
  color: $textColor,
  fontWeight: "500",
  fontSize: "20px",
  cursor:"pointer",
  lineHeight: "140%",
  fontStyle:"normal",
  "@media(max-width: 600px)": {
    fontSize: "12px",
    whiteSpace: "nowrap",
  },
}));

export const SmallTextStyle = styled(Typography)(() => ({
  color: " #858585",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "22.4px",
  cursor:"pointer",
  letterSpacing: 0,
  fontStyle:"normal",
  "@media(max-width: 600px)": {
    fontSize: "10px",
    whiteSpace: "nowrap",
  },
}));
