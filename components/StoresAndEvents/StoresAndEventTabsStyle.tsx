import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";



export const EachTab = styled(Tab)(() => ({
    fontSize: "20px",
    lineHeight: "24px",
    color: "#1C191A",
    textTransform: "uppercase",
    paddingInline: "10px",
    "@media (max-width: 600px)": {
      fontSize: "12px",
      lineHeight: "14px",
    },
  }));
  
  export const AllTabsBox = styled(Grid)(() => ({
    borderBottom: "1px solid #E7E7E7",
    paddingTop: "28px",
    width: "58%",
    margin: "0px auto",
    "@media (max-width: 600px)": {
      width: "94%",
      paddingTop: "13px",
    },
    "@media (min-width: 601px) and (max-width: 1200px)": {
      width: "80%",
    },
  }));