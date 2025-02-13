import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
interface MobileCheck {
  isMobile?: boolean;
}
export const SimpleText = styled(Typography)(({ isMobile }: MobileCheck) => ({
  fontSize: isMobile ? "12px" :"16px",
  fontWeight: "400",
  color: "#231F20",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  lineHeight: isMobile ?"16px" : "19px" 
}));

export const PaddingBox = styled(Box)(() => ({
  // padding: "0px 16px 16px 16px",
}));

export const BorderBox = styled(Box)(() => ({
  border: "none",
}));

export const InfoIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 6px;
  cursor: pointer;
`;