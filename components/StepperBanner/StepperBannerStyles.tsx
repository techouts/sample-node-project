import  Box from "@mui/material/Box";
import  Button from "@mui/material/Button";
import  Grid from "@mui/material/Grid";
import  Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

interface Responsive {
  isMobile?: boolean;
  mobileBackgroungImage?: URL;
  webBackgroundImage?: URL;
  isComponentDiffer?: boolean;
  borderCheck?: boolean;
  titleTextColor?: string;
  btnTextColor?: string;
  btnBgColor?: string;
}

const heightChecking = (
  isMobile: boolean | undefined,
  isComponentDiffer: boolean | undefined
) => {
  if (isMobile) {
    if (!isComponentDiffer) {
      return "264px";
    } else {
      return "504px";
    }
  } else {
    if (isComponentDiffer) {
      return "673px";
    } else {
      return "486px";
    }
  }
};

export const TopBox = styled(Box)(
  ({
    isMobile,
    webBackgroundImage,
    mobileBackgroungImage,
    isComponentDiffer,
  }: Responsive) => ({
    width: "100%",
    height: heightChecking(isMobile, isComponentDiffer),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    objectFit: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `${
      isMobile ? `url(${mobileBackgroungImage})` : `url(${webBackgroundImage})`
    }`,
  })
);

export const MainContentBox = styled(Box)(
  ({ isComponentDiffer }: Responsive) => ({
    width: "85%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: isComponentDiffer ? "" : "#ffffffd4",
    alignItems: isComponentDiffer ? "start" : "center",
    justifyContent: "center",
    position: isComponentDiffer ? "absolute" : "relative",
    left: isComponentDiffer ? "5%" : "0%",
    top: isComponentDiffer ? "35%" : "0%",
    "@media(min-width:768px)": {
      width: "80%",
      left: isComponentDiffer ? "5%" : "0%",
      top: isComponentDiffer ? "45%" : "0%",
    },
  })
);

export const Title = styled(Typography)(
  ({ isComponentDiffer, titleTextColor }: Responsive) => ({
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "22px",
    color: titleTextColor ? titleTextColor : "#231F20",
    marginTop: "25px",
    marginBottom: "10px",
    fontFamily: "Montserrat",
    "@media(min-width:768px)": {
      fontSize: isComponentDiffer ? "32px" : "50px",
      lineHeight: "61px",
      marginTop: "40px",
      marginBottom: "4px",
    },
  })
);

export const Subtitle = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: 400,
  textAlign: "center",
  lineHeight: "24px",
  color: "#231F20",
  fontFamily: "Montserrat",
  marginBottom: "30px",
  "@media (max-width: 768px)": {
    fontSize: "12px",
    lineHeight: "14px",
    marginBottom: "12px",
  },
}));

export const StartButton = styled(Button)(
  ({ btnBgColor, btnTextColor }: Responsive) => ({
    backgroundColor: btnBgColor ? btnBgColor : "#231F20",
    color: btnTextColor ? btnTextColor : "#DEA3B7",
    padding: "14px 26px",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "1px",
    marginBottom: "40px",
    fontFamily: "Montserrat",
    borderRadius: "0%",
    "&:hover": {
      backgroundColor: btnBgColor ? btnBgColor : "#231F20",
    },
    "@media (max-width: 768px)": {
      fontSize: "11px",
      padding: "6px 18px",
      marginBottom: "25px",
    },
  })
);

export const ContentBox = styled(Grid)(({ isComponentDiffer }: Responsive) => ({
  display: "flex",
  alignItems: "start",
  justifyContent: isComponentDiffer ? "start" : "center",
  gap: "10px",
  "@media(min-width:768px)": {
    display: "flex",
    gap: "16px",
  },
}));

export const ContentTypography = styled(Grid)(
  ({ isComponentDiffer, borderCheck, btnTextColor, btnBgColor }: Responsive) => ({
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: btnBgColor ? btnBgColor : isComponentDiffer ? "#DEA3B7" : "#FFFFFF",
    border: borderCheck ? btnBgColor === "#231f20" ? "2px solid #FFFFFF" : "2px solid black" : "none" ,
    width: "152px",
    height: isComponentDiffer ? "40px" : "28px",
    fontWeight: 500,
    textAlign: "center",
    color: btnTextColor ?? "#231F20",
    fontSize: "12px",
    cursor: "pointer",
    "@media(min-width:768px)": {
      height: isComponentDiffer ? "50px" : "44px",
      width: "199px",
      fontSize: "16px",
    },
  })
);

export const ShowResultsButton = styled(Button)(
  ({ isComponentDiffer, btnBgColor, btnTextColor }: Responsive) => ({
    backgroundColor: btnBgColor ? btnBgColor : "#231F20",
    color: btnTextColor ? btnTextColor : "#DEA3B7",
    padding: "6px 18px",
    fontWeight: 500,
    fontSize: "11px",
    lineHeight: "16px",
    letterSpacing: "1px",
    borderRadius: "0px",
    cursor: "pointer",
    marginTop: isComponentDiffer ? "30px" : "0px",
    "@media(min-width:768px)": {
      padding: "14px 26px",
      fontSize: "12px",
      marginTop: isComponentDiffer ? "64px" : "0px",
    },
    "&:hover": {
      backgroundColor: btnBgColor ? btnBgColor : "#231F20",
    },
    "&:disabled": {
      color: "#a54364",
      backgroundColor: "silver",
    },
  })
);

export const TakeQuizAgain = styled(Typography)(() => ({
  fontSize: "10px",
  fontWeight: 500,
  lineHeight: "16px",
  textAlign: "center",
  letterSpacing: "1px",
  textDecorationLine: "underline",
  color: "#DEA3B7",
  cursor: "pointer",
  margin: "5px",
  "@media(min-width:768px)": {
    fontSize: "11px",
  },
}));

export const EndBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "12px",
  alignItems: "center",
  gap: "10px",
  marginBottom: "35px",
  "@media(min-width:768px)": {
    marginTop: "18px",
    marginBottom: "60px",
    gap: "12px",
    right: "5px",
  },
}));
