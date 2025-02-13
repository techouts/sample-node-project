import styled from "@emotion/styled";
import { Typography } from "@mui/material";

interface ImageStyleInterface {
  itemImgPath: string;
}

export const BrandTitle = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontSize: "20px",
  lineHeight: "24px",
  textAlign: "center",
  letterSpacing: "0.1em",
  color: "#231F20",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "14px",
  },
}));

export const StyledImg = styled.img<ImageStyleInterface>`
  cursor: ${(itemImgPath) => (itemImgPath ? "pointer" : "default")};
`;
