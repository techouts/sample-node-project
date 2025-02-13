import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


interface Responsive {
  isMobile?: boolean;
}

export const Typographyonelevel = styled(Typography)(
    ({ isMobile }: Responsive) => ({
      fontSize: isMobile ? "11px" : "16px",
      lineHeight: "14px",
      fontWeight: "400",
    })
  );

   export const BreadCrumbBox = styled(Box)(({ isMobile }: Responsive) => ({
     display: "flex",
     cursor: "pointer",
     alignItems: "center",
     paddingTop: "15px",
   }));
 
 
  