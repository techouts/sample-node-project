import {styled} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styledComponent from "@emotion/styled";

interface Responsive {
  isMobile: boolean;
}

export const CardTitle = styled(Grid)`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  color: black;
  font-size: 20px;
`;

export const StyledImage = styledComponent.img`
  width: 100%;
  height: 100%
`;
export const StyledBox = styled(Box)<{ textHoverBG: string }>(({ textHoverBG }) => ({
  textAlign: "center",
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: textHoverBG,
    color: "#FFFFFF",
  },
  cursor: "pointer",
  outline: "none",
}));

export const StyledText = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: "5px 0px",
  fontSize: "18px",
  fontWeight: "400",
}));

export const StyledViewMore = styled(Box)(() => ({
  color: "#AD184C",
  flexBasis: "40%",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "140%",
  letterSpacing: "1px",
  alignSelf: "center",
  paddingRight: "8px",
}));

export const ItemTitle = styled(Typography)(({ isMobile }: Responsive) => ({
  fontSize: "18px",
  fontWeight: "400",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: isMobile ? "nowrap":"normal",
  "@media (max-width: 900px)": {
    fontSize: "12px",
  },
}));
