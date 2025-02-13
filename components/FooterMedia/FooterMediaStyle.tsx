import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
interface Resposive {
    isMobile: boolean;
  }
export const MainGrid = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    gap: "10px",
   "@media(max-width:600px)":{
      display:"flex",
      flexDirection:"column"
   } 
  }));
  export const BorderGrid = styled(Box)(({ theme }) => ({
    "@media(max-width:600px)":{
    borderBottom:"1px solid "
    }
   }));
   export const Typographysub = styled(Typography)(({ isMobile }: Resposive) => ({
    marginLeft: `${isMobile ? "0px" : "60px"}`,
  }));

   export const TextFeildBox = styled(Box)(({ theme }) => ({
    paddingRight:'0px ! important'
   }));

   export const MainBox = styled(Box)(({ theme }) => ({
    display:'flex',
    backgroundColor: "#F5F5F5",
    width:"100%",
    justifyContent: "space-evenly",
   }));