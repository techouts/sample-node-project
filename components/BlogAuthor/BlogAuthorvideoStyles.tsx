import styled from "@emotion/styled";
import Box from "@mui/material/Box";
interface Responsive {
  isMobile?: boolean;
  positiontype?: boolean;
}
export const VideoImagesBox = styled(Box)(({ isMobile }: Responsive) => ({
  width: isMobile ? "150px" : "388px",
}));
