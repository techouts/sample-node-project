import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const ViewButton = styled(Stack)(({ theme }) => ({
    color: "#AD184C",
    fonstSize: "16px",
    textDecorationLine: " underline",
    cursor: "pointer",
    paddingTop: "25px",
    alignItems: "center",
    margin: "0 auto",
    display: "flex",
    "@media(max-width:600px)": {
        fontSize: "12px",
        paddingTop: "15px",
        paddingBottom: "15px",
    },
}));
export const TitleBox = styled(Box)(({}) => ({})=>({
display:"flex",
alignItems: "center",
gap:"8px",
"@media(max-width:600px)": {
    gap:"14px"
}
}))
export const Viewbreak = styled(Typography)(({}) => ({
    color: "#231F20",
    fonstSize: "16px",
    fontWeight:700,
}));
export const Title=styled(Typography)(({})=>({
    color:"#AD184C",
    fontSize:"24px",
    fontWeight:700,
    lineHeight: "32px",
    "@media(max-width:600px)": {
        fontSize:"20px",   
    }
}))
export const UserName=styled(Typography)(({})=>({
    color:"#231F20",
    fontSize:"16px",
    fontWeight:400,
    padding:"12px 0px",
    lineHeight: "150%",
    "@media(max-width:600px)": {
        fontSize:"12px",
        lineHeight: "140%",  
        padding:"10px 0px 25px 0px", 
    }
}))
export const RatingTitle=styled(Typography)(({})=>({
    color:"#231F20",
    fontSize:"24px",
    fontWeight:500,
    lineHeight: "150%",
    "@media(max-width:600px)": {
        fontSize:"16px",
        lineHeight: "24px",   
    }
}))
export const RatingButton=styled(Button)(({})=>({
   borderRadius:"0px",
    fontSize:"14px",
    fontWeight:400,
    color: "#231F20",
    background: "#F8EDF1",
    padding:"15px 5px",
    "@media(max-width:600px)": {
      fontSize:"16px" ,
      lineHeight: "24px", 
      background: "#F8EDF1",
      padding:"4px 15px"
    }
}))
export const LargeText = styled(Typography)(({}) => ({
    fontSize:  "16px",
    fontWeight: "700",
    textTransform: "uppercase",
    lineHeight: "20px",
    color: "#231F20",
    "& span": {
      fontWeight: "400",
    },
    "@media(max-width:600px)": {
        fontSize: "14px" 
    }
  }));
  export const PaymentText = styled(Typography)(({}) => ({
    fontSize: "16px",
    fontWeight: "400",
    color: "#7B7979",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: "19px" ,
    "@media(max-width:600px)": {
        fontSize: "12px" ,
        lineHeight:"16px" 
    }
  }));
  export const SimpleText = styled(Typography)(({  }) => ({
    fontSize: "16px",
    fontWeight: "400",
    color: "#231F20",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: "19px" ,
    "@media(max-width:600px)": {
        fontSize: "12px" ,
        lineHeight:"16px" 
    }
  }));
  
  export const StyledButton = styled(Button)(({  }) => ({
    height: "43px",
    width:"100%",
    marginTop:"20px",
    backgroundColor: "#DEA3B7",
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "16px",
    borderRadius: "unset",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#231F20",
    padding: "0px",
    "&:hover": {
      backgroundColor: "#DEA3B7",
      color: "#231F20",
    },
  }));
  export const OrderDet = styled(Typography)(({  }) => ({
    fontSize: "18px",
    fontWeight: 500,
    color:"#231F20",
    marginTop:"30px",
    lineHeight: "22px" ,
    "@media(max-width:600px)": {
       display:"none"
    }
  }));
  export const OrderText = styled(Typography)(({  }) => ({
    fontSize: "16px",
    fontWeight: 500,
    color:"#7B7979",
    display: "flex",
    marginTop:"13px",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: "150%" ,
    "@media(max-width:600px)": {
        lineHeight:"24px",
        color: "#231F20", 
        marginTop:"12px",
    }
  }));

  export const Ordercode = styled(Typography)(({  }) => ({
    fontSize: "16px",
    fontWeight: "500",
    color: "#231F20", 
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: "150%" ,
    "@media(max-width:600px)": {
        lineHeight:"20px",
        fontSize:"14px",
        fontWeight: "400",
        color: "#231F20", 
    }
  }));
  