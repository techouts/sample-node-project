import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const ContentStack = styled(Stack)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  marginTop: "3px",
  "@media(max-width:600px)": {
    display: "none",
  },
}));
