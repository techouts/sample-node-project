import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styledComponent from "@emotion/styled";
import { styled } from "@mui/material/styles";
import { ColorType } from "../../utility/ColorType";
import { transientProps } from "../../utility/TransientProps";
interface StyledImageBorder {
  py: string;
}
interface TitleData {
  titleColor: string;
}
interface InnerBox {
  $textColor: ColorType | string;
  columnNumbers: number;
}
interface BackgroundTextColor {
  tileTextBackground: ColorType | string;
  showGradient: boolean;
}
export const BlockGrid = styled(Box)(({ theme }) => ({
  height: "max-content",
  position: "absolute",
  bottom: "0",
  left: "0",
  right: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const InnerSmallText = styled(
  Typography,
  transientProps
)<{ $tileSubTextColor: ColorType | string; $columnNumbers: number }>(
  ({ $tileSubTextColor, $columnNumbers }) => ({
    height: "max-content",
    justifyContent: "center",
    alignItems: "center",
    color: $tileSubTextColor,
    textDecoration: "underline",
    lineHeight: "21px",
    margin: "0",
    fontSize: `${
      $columnNumbers === 3 ? "15px" : $columnNumbers === 2 ? "16px" : "18px"
    }`,
    "@media (max-width: 768px)": {
      fontSize: "12px",
      lineHeight: "14px"
    },
  })
);
export const ViewAllButton = styled(
  Button,
  transientProps
)<{ $backColor: string }>(({ $backColor }) => ({
  backgroundColor: $backColor === "#231F20" ? "#DEA3B7" : "#231F20",
  color: $backColor === "#231F20" ? "#231F20" : "#DEA3B7",
  fontSize: "12px",
  padding: "14px 26px 14px 26px",
  margin: "20px auto 0px auto",
  display: "block",
  left: "20px",
  borderRadius: "0px",
  "&:hover": {
    backgroundColor: $backColor === "#231F20" ? "#DEA3B7" : "#231F20",
    color: $backColor === "#231F20" ? "#231F20" : "#DEA3B7",
  },
  "@media (max-width: 900px)": {
    left: "5px",
    padding: "6px 18px 6px 18px",
    marginTop: "10px",
    backgroundColor: $backColor === "#231F20" ? "#DEA3B7" : "#231F20",
    color: $backColor === "#231F20" ? "#231F20" : "#DEA3B7",
  },
  "@media (max-width: 600px)": {
    marginBottom: "25px",
    marginTop: "12px",
  },
}));
export const MainInnerBox = styled(Box)(
  ({ tileTextBackground, showGradient }: BackgroundTextColor) => ({
    padding: "5px",
    width: "100%",
    height: "max-content",
    minHeight: "40px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: tileTextBackground,
    opacity: `${showGradient && "0.8"}`,
    backdropFilter: `${showGradient && "blur(10px)"}`,
    margin: "12px",
  })
);
export const InnerBox = styled(
  Typography,
  transientProps
)<{ $tileTextColor: ColorType | string }>(({ $tileTextColor }) => ({
  color: $tileTextColor,
  margin: "0",
  fontFamily: "Montserrat",
  fontWeight: 500,
  fontSize: "22px",
  lineHeight: "32px",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: "14px"
  },
}));
export const StyledGrid = styled(Grid)((isMobile: any) => ({
  position: "relative",
  textAlign: "center",
  paddingTop: isMobile ? "8px" : "18px",
  paddingLeft: isMobile ? "8px" : "18px",
}));
export const TextGrid = styled(Grid)((isMobile: any) => ({
  color: "#000000",
  zIndex: "9999",
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}));
export const DescriptionTypography = styled(
  Typography,
  transientProps
)<{ $isMobile: any }>(({ $isMobile }) => ({
  position: "absolute",
  top: "8%",
  width: "100%",
  display: "flex",
  backgroundColor: " #fff",
  maxWidth: $isMobile ? "82%" : "88%",
  maxHeight: $isMobile ? "70%" : "78%",
  overflow: "auto",
  fontSize: "18px",
  lineHeight: "25px",
  padding: "23px 23px 21px 12px",
  '&::-webkit-scrollbar': {
    width: '6px'
  },
  // '&::-webkit-scrollbar-track': {
  // },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: "#8D8D8D",
    borderRadius: "10px"
  },
  "@media (max-width: 600px)": {
    fontSize: "10px",
    lineHeight: "14px",
    padding: "8px 9px 14px 10px",
    '&::-webkit-scrollbar': {
      width: '2px'
    },
  },
}));

export const SideButton = styled(Button)(() => ({
  float: "right",
  color: "#AD184C",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  cursor: "pointer",
  padding: "8px 0px",
  lineHeight: "16.8px",
  justifyContent: "flex-end",
}));
export const StyledImage = styledComponent.img<StyledImageBorder>`
    width: 100%;
    height: 100%;
    cursor: pointer;
`;
export const BoxStyled = styled(Box)(({}) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: "0px",
}));
export const GridContainerPosition = styled(Grid)`
  position: relative;
`;
export const TitleInsideComponent = styled(Box)(
  ({ titleColor }: TitleData) => ({
    color: titleColor,
    position: "absolute",
    top: "2%",
    zIndex: 99,
    width: "100%",
    margin: "0",
    textAlign: "center",
    fontSize: "12px",
    "@media (max-width: 768px)": {
      fontSize: "20px",
      top: "0px",
    },
  })
);
export const MainGrid = styled(Grid)((theme) => ({
  position: "relative",
}));
