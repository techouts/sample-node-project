import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const ServicesDropdownTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "39px",
  color: "#231F20",
  margin: "40px 0px 18px 0px",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "16px",
    margin: "25px 0px 10px 0px",
  },
}));

export const ExpandMoreImage = styled.img`
  max-width: 18px;
`;
