import styled from "@emotion/styled";
import  Box from "@mui/material/Box";
import  Button from "@mui/material/Button";
import  Typography  from "@mui/material/Typography";

interface Responsive{
    isMobile:boolean
}


export const Imagepic = styled.img<Responsive>`
width:100%;
`;


export const BoxGrid = styled(Box)(({isMobile}:Responsive) => ({
    marginTop:'20px',
    display:'grid',
    gridTemplateColumns:isMobile ? "repeat(1,1fr)":"repeat(2,1fr)",
    gap:'10px',
  "@media(min-width:601px) and (max-width:1024px)":{
    gridTemplateColumns:'repeat(1,1fr)'
  }
  }));

  export const TypographyMaintext = styled(Typography)(({isMobile}:Responsive) => ({
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#1C191A",
  }));

  export const RowBox = styled(Box)(({isMobile}:Responsive) => ({
    padding:isMobile?'10px':'15px',
    width:'65%',
    cursor:'pointer'
  }));

  export const ButtonBox = styled(Box)(({isMobile}:Responsive) =>({
    display:'flex',
    alignItems:'center',
    position: isMobile ? "absolute":"relative",
    bottom: isMobile ?"18%":"10%"
 
  }));


export const Buttontext = styled(Button)(({isMobile}:Responsive) =>({
    backgroundColor:'#D5CBF4',
    borderRadius:'0px',
    color:'#231F20',
    textTransform:'none',
    height:isMobile?"21px":"26px",
    fontSize: isMobile? "11px":"12px",
    "&:hover": {
      backgroundColor: "#D5CBF4"
    }
  }));
 
  export const BoxLogo = styled(Box)(({isMobile}:Responsive)=>({
    display:'flex',
   alignItems:'center',
   gap:'2px',
   color:'#A7A5A6',
   background:'white',
   borderRadius:'10px',
   width:'35%',
   justifyContent:'flex-end',
   padding: isMobile ? '1px 5px':'0px 0px'
  }));
  
  export const Typographyhead = styled(Box)(({isMobile}:Responsive) => ({
      fontSize: isMobile? '12px':'16px',
      lineHeight:'140%',
      fontWeight:'600',
      color: "#231F20",
      marginTop:'10px'
  }));

  export const BoxRead = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
   alignItems:'center',
  });

  export const Boxshare = styled(Box)({
    display:'flex',
    alignItems:'center',
    gap:'7px',
    marginTop:'17px',
    justifyContent:'flex-end',
    cursor:"pointer"
  });

  export const Typographyshare = styled(Typography)({
    fontSize:'12px',
    lineHeight:'140%',
     color:'#656263',
  });

  export const Typographyview = styled(Box)(({isMobile}:Responsive) => ({
    fontSize:'12px',

}));

export const Typographyviews = styled(Box)(({isMobile}:Responsive) => ({
    fontSize:'12px',

}));

 export const Typographyreadtext = styled(Typography)(({isMobile}:Responsive) => ({
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "1px",
    color: "#8A133D",
    marginTop:'17px',
    cursor:'pointer'
  }));