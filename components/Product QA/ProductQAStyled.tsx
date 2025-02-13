import styled from "@emotion/styled";
import { TabList } from "@mui/lab";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";

export const TabListStyled = styled(TabList)(() => ({
  "& .MuiTab-root.Mui-selected ": {
    color: "black",
  },
}));
export const PrimaryBox = styled(Box)(() => ({
  width: "100%",
  typography: "body1",
  backgroundColor: "#F7F7F7",
}));
export const SecondaryBox = styled(Box)(() => ({
  borderBottom: 1,
  borderColor: "divider",
  backgroundColor: "#F6F6F6",
  borderWidth: "0px 0px 2px 0px",
  "& .MuiTabs-root": {
    "& .MuiTabs-scroller": {
      backgroundColor: "white",
    },
  },
}));
export const StyledTab = styled(Tab)(() => ({
  backgroundColor: "#FFFFFF",
  listStyle: "none",
  textTransform: "none",
  fontSize: "22px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    width:"50%",
  },
  fontWeight: 400,
  border: "none",
  color: "#231F20",
  padding:" 2% 5%",
  "&.Mui-selected ": {
    color: "#AD184C !important",
    backgroundColor: "#F6F6F6",
    fontWeight: 500,
  },
}));


