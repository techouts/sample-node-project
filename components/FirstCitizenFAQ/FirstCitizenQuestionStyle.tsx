import styled from "@emotion/styled";
import { transientProps } from "../../utility/TransientProps";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const StyledArrows = styled(
  ArrowForwardIosRoundedIcon,
  transientProps
)<{ $click: boolean }>(({ $click }) => ({
  color: "#292D32",
  fontSize: "18px",
  marginRight: "10px",
  animationDelay: "s",
}));

export const AddIconStyled = styled(AddIcon)(() => ({
  color: "#292D32",
  fontSize: "18px",
}));

export const RemoveIconStyled = styled(RemoveIcon)(() => ({
  color: "#292D32",
  fontSize: "18px",
}));

export const TitleTypography = styled(Typography)(({ isMobile }: any) => ({
  fontSize: isMobile ? "12px" : "18px",
  fontWeight: "500",
  lineHeight: "124%",
  color: "#231F20",
}));
export const DescrptionTypography = styled(Typography)(({ isMobile }: any) => ({
  whiteSpace: "pre-wrap",
  fontSize: isMobile ? "11px" : "14px",
  fontWeight: "400",
  lineHeight: "150%",
  color: "#4F4C4D",
}));
export const ViewMoreTypography = styled(Typography)(({ isMobile }: any) => ({
  color: "#AD184C",
  cursor: "pointer",
  fontSize: isMobile ? "12px" : "14px",
  lineHeight: "150%",
  textDecorationLine: "underline",
  fontWeight: "400",
  textAlign: "center",
  marginBottom: isMobile ? "25px" : "22px",
}));
