import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const ParentBox = styled(Box)(({ theme }) => ({
  padding: "15px 0px",
}));
export const ShareIconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  textAlign: "center",
  justifyContent: "space-evenly",
  alignItems:'center',
  color: "#A7A5A6",
  gap:"5px",
  cursor:"pointer"
}));
export const SubTitleTypogaphy = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "700",
  "@media(max-width:600px)": {
    fontSize: "14px",
    fontWeight:600,
    marginTop: "25px",
    LineHeight:"19.6px",
    color: "#231F20"
  },
}));

export const ButtonStyled = styled(Button)((theme) => ({
  fontSize: "12px",
  background: "#D5CBF4",
  padding: "3px 12px",
  borderRadius: "0px",
  color: "#231F20",
  textTransform:'none',
  "@media(max-width:600px)": {
    fontSize: "11px",
    lineHeight: "13px",
    fontWeight: "400",
    padding: "4px 8px",
  },
  "&:hover": {
    background: "#D5CBF4",
    color: "#231F20",
    cursor:"pointer"
  },
}));
export const BoxStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  color: "#A7A5A6",
  justifyContent: "space-evenly",
  gap:"4px",
  "@media(max-width:600px)": {
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    gap:"2px",
    padding:"3px 5px"
  },
}));

export const TitleBox = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: "600",
  fontSize:'20px',
  letterSpacing: "0.1em",
  margin: "10px auto",
  color: '#1C191A',
  "@media(max-width:600px)": {
    paddingTop:"25px",
    color: '#231F20',
    fontSize:'12px',


  }
}));
export const viewAllFrDesk={width:"114px",height:"44px"}
export const viewAllFrMob={width:"94px",height:"28px"}
export const ButtonStyle = styled(Button)(({ theme }) => ({
  display: "flex",
  margin: " auto",
  textAlign: "center",
  fontWeight: "500",
  fontSize: "12px",
  color: "#DEA3B7",
  borderRadius: "0px",
  background: "#231F20",
  padding: "14px 26px",
  "&:hover": {
      background: "#231F20",
      color: "#DEA3B7",
      cursor: "pointer",
  },
  "@media(max-width:600px)": {
    padding: "6px 18px",
    fontSize: " 11px",
   
  },
}));

export const SecondGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 20px 0px 20px",
  "@media(max-width:600px)": {
    padding: "4px 8px",
    margin: "-47px  10px 0px 10px",
  },
}));

export const ThirdGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  margin: "20px",
  paddingBottom:"10px",
  "@media(max-width:600px)": {
    margin: "10px 15px 0px 10px",
  },
}));

export const LastBox = styled(Box)(({ theme }) => ({
  display: "none",
  paddingBottom:"10px",
  "@media(max-width:600px)": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px",
  },
}));

export const ReadMore = styled(Typography)(({ theme }) => ({
  display: "none",
  "@media(max-width:600px)": {
    display: "block",
    color: "#8A133D",
    fontSize: "11px",
  },
}));
