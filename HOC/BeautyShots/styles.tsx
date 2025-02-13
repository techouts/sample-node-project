import Box from "@mui/material/Box";
import  Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
export interface CustomTextInterface {
  fontSize: string;
  fontWeight: string;
  textTransform: string;
}
export interface BeautyShotsStylesInterface {
  isMobile: boolean;
}
export interface BeautyShotsRatioInterface {
  isMobile: boolean;
  Width:
     {
        mobile: string;
        desktop: string;
      }
    | undefined;
  Height:
     {
        mobile: string;
        desktop: string;
      }
    | undefined;
}
export interface VideoListFrameInterface {
  isMobile: boolean;
  BackgroundColor: string | undefined;
  Width: {
    mobile: string;
    desktop: string;
  };
  Height: {
    mobile: string;
    desktop: string;
  };
}
export const Heading = styled(Box)(
  ({ isMobile }: BeautyShotsStylesInterface) => ({
    fontSize: isMobile ? "12px" : "20px",
    fontWeight: 600,
    lineHeight: "24px",
    letterSpacing: "0.1 em",
    textTransform: "uppercase",
    color: "#FFFFFF",
  })
);
export const CustomText = styled(Typography)(
  ({ fontSize, fontWeight, textTransform }) => ({
    fontSize: `${fontSize}`,
    lineHeight: "140%",
    fontWeight: `${fontWeight}`,
    color: "#FFFFFF",
   
  })
);
export const MainFrameContent = styled(Box)(() => ({
  position: "relative",
  background: "linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 68%)",
  width: "100%",
  height: "100%",
}));
export const MainFrameImage = styled("img")(() => ({
  width: "100%",
  height: "100%",
}));
export const MainFramerVideoWrapper = styled(Box)(() => ({
  width: "100%",
  height: "100%",
}));
export const MainFrameText = styled(Typography)(
  ({ isMobile }: BeautyShotsStylesInterface) => ({
    top: "80%",
    left: "5%",
    maxWidth: "70%",
    position: "absolute",
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: isMobile ? "14px" : "20px",
    color: "#ffffff",
  })
);
export const Shadow = styled(Box)(() => ({
  left: 0,
  bottom: 0,
  right: 0,
  position: "absolute",
  width: "100%",
  height: "10%",
  background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #231F20 75%, #231F20 100%)",
}));
export const StyledButton = styled(Button)(() => ({
  background: "#DEA3B7",
  color: "#231F20",
  fontWeight:"600",
  fontSize: "12px",
  textAlign: "center",
  letterSpacing: "1px",
  borderRadius: "0px",
  boxShadow: "none",
  "&:hover": {
    background: "#DEA3B7",
    color: "#231F20",
    cursor:"pointer"
  },
  "@media(max-width:600px)": {
    fontSize: "11px",
    letterSpacing:'1px',
    fontWeight:"600"
  },
}));
export const VideosList = styled(Box)(
  ({ isMobile }: BeautyShotsStylesInterface) => ({
    paddingTop: "10px",
    maxHeight: isMobile ? "250px" : "450px",
    overflowY: "scroll",

    "::-webkit-scrollbar ":{
      width: "8px",
    },

    "@media (max-width:600px)": {
      "::-webkit-scrollbar ": {
        width: "5px",
      },
    },

    "::-webkit-scrollbar-track": {
      borderRadius: "10px",
    },

    "::-webkit-scrollbar-thumb": {
      background: "#4F4C4D",
      borderRadius: "10px",
    },

    "::-webkit-scrollbar-thumb:hover": {
      background: "#4F4C4D",
    },
  })
);
export const VideoDetails = styled(Stack)(() => ({
  justifyContent: "flex-start",
  alignItems: "center",
}));
