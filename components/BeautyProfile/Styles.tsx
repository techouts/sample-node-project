import Box from "@mui/material/Box";
import {styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import styledComponent from "@emotion/styled";

interface PositionInterface {
  isFirst?: boolean;
  isSelection?: boolean;
  isMobile?: boolean;
  redo?: boolean;
  slide?: any;
  lastSlide?: boolean;
}
export const StyledImage = styledComponent.img`
  width: 100%;
  display:flex;
   @media screen and (max-width: 600px){
    // min-height: 80px
  }
`;
export const MobileImage = styledComponent.img<PositionInterface>`
  position:absolute;
  right:0px;
 
  bottom:75px;
  z-index: -99;
  width:70%;  
  ${(props) =>
    props?.isMobile
      ? props?.isFirst
        ? "opacity: 1"
        : "opacity: 0.4"
      : "opacity: 1"}
`;
export const TickIcon = styledComponent.img`
  height:16.5px;
  position:absolute;
  right:-10px;
  top:-12px;
  z-index:999;
  @media screen and (max-width: 600px){
    height: 12.5px;
    width: 12.5px;
    right:-7px;
    top:-10px;
  }
`;
export const StyledBox = styled(Box)(() => ({
  textAlign: "center",
  width: "100%",
  display: "grid",
  gap: "25px 18px",
  gridTemplateColumns: "repeat(3, 1fr)",
  "@media (max-width: 600px)": {
    gap: "10px",
  },
}));
export const FlexBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  position: "relative",
  paddingLeft: "20px",
  "@media (max-width: 600px)": {
    height: "468px",
    padding: "0px",
  },
}));
export const FloatBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  height: "600px",
}));
export const SingleTile = styled(Box)(() => ({
  position: "relative",
  textAlign: "center",
  "@media (max-width: 600px)": {
    // minHeight: "108px",
  },
}));

export const TypographyFinalTitle = styled(Typography)(() => ({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "22.4px",
  alignItems: "center",
  paddingBottom: "7px",
  "@media (max-width: 600px)": {
    // minHeight: "108px",
  },
}));

export const Spacer = styled(Box)(({ lastSlide }: PositionInterface) => ({
  minHeight: lastSlide ? "10px" : "62px",
  "@media (max-width: 600px)": {
    minHeight: "18px",
  },
}));

export const MainTitle = styled(Typography)(() => ({
  display: "flex",
  justifySelf: "flex-start",
  fontSize: "28px",
  lineHeight: "34.97px",
  fontWeight: "500",
  color: "#231F20",
  "@media (max-width: 600px)": {
    fontSize: "16px",
    lineHeight: "22.4px",
  },
}));
export const SubTitle = styled(Typography)(() => ({
  display: "flex",
  justifySelf: "flex-start",
  textAlign: "left",
  // padding: "5px 0px 12px 0px",
  fontSize: "15px",
  fontWeight: "400",
  lineHeight: "21px",
  color: "#4F4C4D",
  opacity: "0.8",
  width: "65%",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    width: "70%",
  },
}));

export const ItemTitle = styled(Typography)(() => ({
  color: "#FFFFFF",
  backgroundColor: "#C65D82",
  minHeight: "35px",
  fontSize: "16px",
  display: "grid",
  fontWeight: "500",
  placeItems: "center",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    minHeight: "28px",
    fontWeight: "400",
    lineHeight: "28px",
  },
}));

export const StyledButton = styled(Typography)(() => ({
  width: "fit-content",
  whiteSpace: "nowrap",
  height: "44px",
  color: "#FFFFFF",
  backgroundColor: "#231F20",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "16px",
  cursor: "pointer",
  letterSpacing: "1px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "14px 26px",
  "@media (max-width: 600px)": {
    height: "28px",
    fontSize: "11px",
    padding: "6px 26px",
  },
}));

export const PositionBox = styled(Box)(
  ({ isSelection, isMobile, redo, slide, lastSlide }: PositionInterface) => ({
    margin: redo ? "5px 0" : isSelection ? "64px 0px 0px 0px" : "20px 0px",
    justifyContent: !isSelection ? "flex-start" : "center",
    "@media (max-width: 600px)": {
      margin: "0px",
      // marginBottom: "20px",
      position: "absolute",
      // transform: "translateX(-50%)",
      bottom: !lastSlide && "0px",
      left: slide == -1 && "40%",
    },
  })
);

export const SecondaryButton = styled(Typography)(() => ({
  width: "fit-content",
  whiteSpace: "nowrap",
  color: "#231F20",
  outline: "1px solid #DEA3B7",
  fontSize: "12px",
  fontWeight: "600",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "13px 26px",
  cursor: "pointer",
  "@media (max-width: 600px)": {
    height: "26px",
    fontSize: "11px",
    padding: "5px 15px",
    position: "relative",
    backgroundColor: "white",
  },
}));

export const MuiDotsBox = styled(Box)(
  ({ slide, isMobile }: PositionInterface) => ({
    display: "flex",
    justifyContent: slide ? "flex-start" : "center",
    marginLeft: !isMobile && slide ? "40px" : "0px",
  })
);
