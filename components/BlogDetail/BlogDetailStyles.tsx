import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography  from "@mui/material/Typography";
import {styled} from "@mui/material";

interface Gallery {
  isMobile: boolean;
}
export const Linetwo = styled(Box)((theme) => ({
  display: "flex",
  justifyContent: "flex-end",
}));
export const TopGrid = styled(Grid)(() => ({
  display: "flex",
}));

export const VideoImages = styled("img")(({ isMobile }:Gallery) => ({
  display:isMobile ? "none" : "block",
  position: "absolute",
  top: "44% " ,
  left: "45%" ,
  width: "75px",
}));

export const ParagraphText = styled(Box)(({isMobile}:Gallery) => ({
  display: "flex",
  flexDirection: "column",
  color: "#2d2d2d",
  // textAlign: "justify",
  marginTop: "15px ",
  fontSize: isMobile ? "12px":"18px",
  "h2,h3,h4":{
  fontSize: isMobile ? "12px":"20px",
  lineHeight: "140%",
  fontWeight: "600",
  margin: "0px",
  paddingTop:'10px'
  },
  "&> div,p": {
  fontSize: isMobile ? "12px":"18px",
  fontWeight: "400",
  lineHeight: "140%",
  margin:'0px'
  },

}));

export const ContentBox = styled(Box)(() => ({
  gridGap: "10px",
  marginTop: "30px",
  "@media(max-width:600px)": {
    marginTop: "15px",
  },
}));
export const EyeGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "150px",
  color: " #A7A5A6",
  fontSize: "14px",
}));
export const Lineone = styled(Typography)(() => ({
  "& > span": { color: "#AD184C" },
  fontWeight: "400",
  width: "100%",
  Lineheight: "14.32px",
  marginLeft: "300px",
  "@media(max-width:600px)": {
    marginLeft: "0px",
    fontSize: "14px",
  },
}));
export const Makeup = styled(Typography)(({ isMobile }:Gallery) => ({
  color: "#231F20",
  padding: "6px 12px",
  backgroundColor: "#DEA3B7",
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "14.32px",
  textAlign: "center",
  margin: isMobile ? "25px 0 15px 0": "30px 0px 0px 0px",
  cursor:"pointer"
}));
export const Heading = styled('h1')(() => ({
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "40px",
  color: "#231F20",
  lineHeight:"56px",
  margin:'16px 0px 0px 0px',
  "@media(max-width:600px)": {
    fontSize: "18px",
    lineHeight:"25.2px",
    color: "#231F20",
    margin:'15px 0px 0px 0px'
},
}));
export const HeaderBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop:"16px",
  "@media(max-width:600px)": {
  marginTop:"0px"
  },

}));
export const SubHeading = styled(Typography)((theme) => ({
  fontStyle: "italic",
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "28px",
  color: "#231F20",
  marginTop: "10px ",
  "@media(max-width:600px)": {
    fontSize: "14px",
    lineHeight:"16.8px",
    color:"#231F20"
  },
}));
export const Name = styled(Grid)(() => ({
  fontWeight: "400",
  fontStyle: "normal",
  fontSize: "20px",
  color: "#7B7979",
  Lineheight: "22px",
  marginTop: "20px ",
  cursor:'pointer',
  "@media(max-width:600px)": {
    marginTop: "10px ",
    fontSize:"12px",
    Lineheight:"17px"
  },
  "&:hover":{
    color:'#AD184C',
    textDecoration:"underline"
  }
}));

export const Listofview = styled(Box)(() => ({
  color: "#AD184C",
  marginTop: "10px",
  Font: "Montserrat",
  fontWeight: "700",
  fontSize: "20px",
  Lineheight: "32px",
  cursor: "pointer",
}));
export const ListofviewHeading = styled(Typography)(() => ({
  color: "#231F20",
  fontWeight: "700",
  fontSize: "20px",
  Lineheight: "32px",
}));
export const ButtonGrid = styled(Grid)(() => ({
  textDecoration: "underline",
  color: "#AD184C",
  fontWeight: "700",
  textTransform: "capitalize",
}));
export const QuickTyography = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "20px",
  Lineheight: "21.47px",
  letter: "10%",
}));

  export const GalleryButton = styled(Stack)(({isMobile}:Gallery) => ({
    background: "#231F20",
    opacity: "0.7",
    backdropFilter: "blur(77px)",
    color: "white",
    padding:isMobile?"13px 17px":"22px",
    position:"absolute",
    right:"0px",
    top:"31%",
    cursor:"pointer"
  }));
  export const GalleryText = styled(Typography)(({isMobile}:Gallery) => ({
    fontWeight:"600",
    fontSize:isMobile?"12px":"22px",
    lineHeight:isMobile?"17px":"32px",
    color:"#FFFFFF"
  }));
  
