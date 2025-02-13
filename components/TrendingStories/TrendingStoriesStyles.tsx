import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Add {
  isMobile: boolean;
}

export const BeautyButtonAndViewsText = styled(Grid)(({ isMobile }: Add) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: `${isMobile ? "-44px" : "0px"}`,
  marginLeft:`${isMobile ? "10px" : "0px"}`
}));

export const BeautyButton = styled(Button)(() => ({
  color: "#333",
  height: "25px",
  backgroundColor: "#D5CBF4",
  textTransform: "capitalize",
  borderRadius: "0px",
  "&:hover": {
    backgroundColor: "#D5CBF4",
  },
}));

export const ViewIconAndViewsText = styled(Typography)(({ isMobile }: Add) => ({
  display: "flex",
  alignItems: "center",
  color: "#A7A5A6",
  width: `${isMobile ? "60px" : "auto"}`,
  fontSize: `${isMobile ? "11px" : "12px"}`,
  backgroundColor: `${isMobile ? "#fff" : "none"}`,
  borderRadius: '15px'
}));

export const ImageHeading = styled(Typography)(({ isMobile }: Add) => ({
  margin: `${isMobile ? "30px 0px 10px 0px" : "10px auto"}`,
  fontSize: isMobile ? "14px":"20px",
  fontWeight: "600",
  cursor: "pointer"
}));

export const ThreeImagesHeading = styled(Typography)(({ isMobile }: Add) => ({
  margin: `${isMobile ? "26px 0px 0px 0px" : ""}`,
  fontSize: `${isMobile ? "12px" : "16px"}`,
  fontWeight: isMobile ? "500":"600",
  color:isMobile ? "#000000":"#231F20"
}));

export const ImageSubHeading = styled(Typography)(({isMobile}:any) => ({
  color: "#7B7979",
  marginBottom: "10px",
  lineHeight:isMobile?'140%':'150%',
  fontSize:isMobile ? '10px':'14px'
}));

export const ReadMoreAndShareText = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems:'center'
}));

export const SecondReadMoreAndShareText = styled(Typography)(
  ({ isMobile }: Add) => ({
    display: "flex",
    justifyContent: "space-between",
    marginTop: `${isMobile ? "8px" : "0px"}`,
    alignItems:'center'
  })
);

export const ReadMoreTypography = styled(Typography)(({isMobile}:Add) => ({
  color: "#8A133D",
  letterSpacing: "1px",
  fontWeight:"400",
  fontSize: isMobile ? '11px' :"12px",
  lineHeight:'16px',
  "&:hover": {
    cursor: "pointer",
  },
}));

export const ShareIconAndText = styled(Typography)(() => ({
  display: "flex",
  alignItems: "center",
  color: "#656263",
  fontSize: "14px",
  cursor: "pointer" 
}));

export const ThreeImagesAndContent = styled(Grid)(({ isMobile }: Add) => ({
  display: `${isMobile ? "block" : "flex"}`,
  "@media(min-width:601px) and (max-width:1024px)":{
    justifyContent:'space-between'
  }
}));

export const OnlyContentWrapper = styled(Grid)(({isMobile}:Add) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  padding: isMobile ? "unset":"16px 16px",
  boxShadow: '1px 1px 1px 1px whitesmoke',
}));

export const TitleTypography = styled(Typography)(({isMobile}:Add) => ({
  // width: "200px",
  // margin: "20px auto",
  letterSpacing: "1px",
  wordSpacing: "3px",
  textTransform: "uppercase",
  textAlign:'center',
  color:isMobile ? '#231F20': '#1C191A',
  fontWeight:'600',
  fontSize: isMobile ? '12px':'20px',
  lineHeight: '24px',
}));

export const ViewAllButton = styled(Button)(({isMobile}:Add) => ({
  display: "flex",
  // width: "120px",
  padding:isMobile ?'6px 18px':'14px 26px !important',
  // margin: "20px auto",
  marginTop: !isMobile ?'30px':'20px',
  marginBottom:isMobile ? '':'10px',
  marginInline:"auto",
  color: "#DEA3B7",
  borderRadius: "0px",
  backgroundColor: "#231F20",
  textTransform: "uppercase",
  "&:hover": {
    backgroundColor: "#231F20",
  },
}));
export const ViewAllTxt = styled(Typography)(() => ({
  // marginBottom:'5%',
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "16px",
  color: '#DEA3B7',
  "@media(max-width:600px)": {
    fontSize: "11px",
    lineHeight: "16px",
  },
}));
export const InMobileViewGridItems = styled(Grid)(({ isMobile }: Add) => ({
  display: `${isMobile ? "grid" : "flex"}`,
  gridTemplateColumns: `${isMobile ? "repeat(2, 1fr)" : "auto"}`,
  gridGap: `${isMobile ? "8px" : "16px"}`,
  margin: "4px",
  flexDirection:`${isMobile ? "row" : "column"}`,
  minHeight:`${isMobile ? "" : "600px"}`
}));

export const FirstContentItem = styled(Grid)(({ isMobile }: Add) => ({
  margin: "4px 10px 0px 0px",
  height: isMobile?'':'100%'
  
}));
