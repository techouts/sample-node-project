import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import styledComponent from "@emotion/styled";
import { styled } from "@mui/material/styles";
import { ColorType } from "../../utility/ColorType";
import { transientProps } from "../../utility/TransientProps";

interface StyledImageBorder {
  bordered: boolean;
  py: string;
}
interface TitleData {
  titleColor: string;
}
interface BackgroundTextColor {
  offerBackground: ColorType | string;
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
)<{ $subTextColor: ColorType | string; $columnNumbers: number }>(
  ({ $subTextColor, $columnNumbers }) => ({
    height: "max-content",
    justifyContent: "center",
    alignItems: "center",
    color: $subTextColor,
    fontFamily: "Montserrat",
    margin: "0",
    fontSize: "14px",
    "@media (max-width: 768px)": {
      fontSize: "11px",
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
    marginTop: "12px",
  },
}));

export const CommonStyles = styled(Box)(() => ({
  width: "100%",
  height: "max-content",
  minHeight: "40px",
  textAlign: "center",
  cursor: "pointer",
}));

export const MainInnerBox = styled(CommonStyles)(
  ({ offerBackground, showGradient }: BackgroundTextColor) => ({
    backgroundColor: offerBackground,
    opacity: `${showGradient && "0.85"}`,
    backdropFilter: `${showGradient && "blur(77px)"}`,
  })
);

export const TextBox = styled(CommonStyles)(() => ({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
}));

export const InnerBox = styled(
  Typography,
  transientProps
)<{
  $textColor: ColorType | string;
  $isSubTextAvailable: boolean;
}>(({ $textColor, $isSubTextAvailable }) => ({
  color: $textColor,
  margin: "0",
  fontWeight: "500",
  fontSize: `${$isSubTextAvailable ? "20px" : "16px"}`,
  "@media (max-width: 768px)": {
    fontSize: "12px",
  },
}));
export const StyledGrid = styled(Grid)((isMobile: any) => ({
  position: "relative",
  textAlign: "center",
  perspective: "1000px",
  paddingTop: isMobile ? "8px" : "18px",
  paddingLeft: isMobile ? "8px" : "18px",
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
    height: auto;
    cursor: pointer;
    display:block;
    ${(props) =>
      props?.bordered &&
      `outline: 1px solid white;
       outline-offset:-${props?.py}`}
`;

export const BoxStyled = styled(Box)(() => ({
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
export const FlippedBox = styled(Box)(() => ({
  transform: "rotateY(180deg)",
  position: "absolute",
  width: "100%",
  height: "100%",
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
  top: "0%",
}));
export const ImageBox = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "100%",
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
}));

export const TitleBox = styled(Box)(() => ({
  paddingTop: "4px",
  paddingBottom: "auto",
  "@media (max-width: 768px)": {
    paddingTop: "2px",
    paddingBottom: "6px",
  },
}));

export const MainImageWrapperBox = styled(
  Box,
  transientProps
)<{ $allowLastOddItemToBeCentered: boolean; padding: number }>(
  ({ $allowLastOddItemToBeCentered, padding }) => ({
    backgroundColor: "transparent",
    width: "100%",
    perspective: "1000px",
    margin: $allowLastOddItemToBeCentered ? "0 auto" : "0px",
    padding: $allowLastOddItemToBeCentered ? `0px ${padding}px` : "0px",
  })
);

export const ImgWrapper = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  textAlign: "center",
  transition: "transform 0.6s",
  transformStyle: "preserve-3d",
}));

export const fetchBlockRatio = (screenWidth: number) => {
  if (screenWidth >= 320 && screenWidth <= 440) {
    return 22.5;
  } else if (screenWidth > 440 && screenWidth <= 510) {
    return 21.5;
  } else {
    return 22.5;
  }
};
