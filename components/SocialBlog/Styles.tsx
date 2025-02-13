import styled from "@emotion/styled";
import { Grid, Box } from "@mui/material";

export const ContentBox = styled(Box)(({ theme }) => ({
  color: "#7B7979",
  textAlign: "justify",
  FontWeight: "400",
  "& > span": {
    display: "flex",
    flexWrap: "wrap",
    color: "#7B7979",
    marginTop: "20px",
    FontWeight: "400",
  },
}));

export const TitleBox = styled(Box)(({ isMobile }: any) => ({
  color: "#AD184C",
  fontSize: isMobile ? "12px" : "20px",
  lineHeight: isMobile ? "16.8px" : "28px",
  fontWeight: "600",
}));
