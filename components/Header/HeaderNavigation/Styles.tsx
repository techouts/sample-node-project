import styled from "@emotion/styled";
import { Box } from "@mui/material";
export const FlexUnorderList = styled("ul")(() => ({
  display: "flex",
  paddingInlineStart: "0px",
  width: "100%",
  height: "100%",
  justifyContent: "end",
  columnGap: "6%",
  "&:last-child": { justifyContent: "" },
}));
export const ListItem = styled("li")(() => ({
  listStyleType: "none",
}));
export const UnorderList = styled(Box)(() => ({
  position: "fixed",
  width: "100%",
  left: 0,
  background: "white",
  top: "119px",
  padding: "0px !important",
}));
export const DynamicBox = styled(Box)(() => ({
  backgroundColor: "#FFFFFF",
  width: "100%",
  margin: "0",
}));
export const NavigationTitle = styled("a")(() => ({
  paddingBottom: "40px",
  fontWeight: "600",
  whiteSpace: "nowrap",
  "@media(max-width:1200px)": {
    fontSize: "14px",
  },
  "@media(max-width:900px)": {
    fontSize: "12px",
  },
}));
