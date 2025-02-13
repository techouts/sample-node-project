import { Box, Grid, styled } from "@mui/material";
import styledComponent from "@emotion/styled";

interface BackgroundCardInterface {
  bgColor?: string;
}

export const StyledBox = styled(Box)<BackgroundCardInterface>`
  width: 100%;
  height: 100%;
  background-color: ${({ bgColor }) => bgColor};
  position: relative;
`;

export const StyledImage = styledComponent.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledGrid = styled(Grid)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor:pointer;
`;

export const ClickableGrid = styled(Grid)`
  cursor: pointer;
`;
