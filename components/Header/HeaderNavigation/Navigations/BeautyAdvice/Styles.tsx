import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { transientProps } from "../../../../../utility/TransientProps";

export const SingleCard = styled(
  Box,
  transientProps
)<{ $index: number }>(({ $index }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignSelf: "flex-start",
  flexDirection: `${$index % 2 === 0 ? "column" : "column-reverse"}`,
  cursor: "pointer",
  m: 2,
}));

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  marginbottom: 12px;
`;

export const Title = styled(Typography)(() => ({
  fontSize: "20px",
  lineHeight: "32px",
  fontWeight: 700,
  color: "#000000",
}));

export const SubTitle = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: 400,
  color: "#231F20",
}));

export const BeautyAdviceWrapper = styled(Box)(() => ({
  padding: "0% 5%",
  paddingBottom: "1%",
  margin: "15px 0px",
}));
