import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export const InnerStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  cursor: "pointer",
  "@media(max-width: 760px)": {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    fontSize: "12px",
    letterSpacing: "0px",
    "@media(max-width: 450px)": {
      width: "50%",
      gap: "10px",
    },
  }, 
}));
export const MainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  "@media(max-width: 450px)": {
    width: "80%",
  },
}));
export const OuterStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  "@media(max-width: 760px)": {
    alignItems: "flex-start",
  },
  "@media (max-width:425px)": {
    gridGap: "10px",
  },
}));
export const TextStyles = styled(Box)(({ Index }: any) => ({
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "18px",
  textTransform: "capitalize",
  color: "#231F20",
  "@media(max-width: 900px)": {
    fontSize: "16px",
    "@media(max-width: 600px)": {
      fontSize: "10px",
    },
  },
}));
export const SubTextStyles = styled(Box)(({ theme }) => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "12px",
  paddingTop:"2%",
  textTransform: "capitalize",
  color: "#A7A5A6",
  "@media(max-width: 900px)": {
    fontSize: "14px",
    lineHeight: "10px",
    fontWeight: "400",
  },
  "@media(max-width: 600px)": {
    fontSize: "9px",
    paddingTop: "3px",
    whiteSpace: "nowrap",
  },
}));
export const BenefitsIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  "@media(max-width: 450px)": {
    width: "50%",
  },
}));
