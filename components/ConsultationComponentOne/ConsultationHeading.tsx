import React from "react";
import { Box } from "@mui/material";
import {
  ConsultationTabTitle,
  ConsultationTabSubtitle,
} from "./ConsultationHeadingStyles";
import ConsultationHeadingSchema from "./ConsultationHeadingSchema";
import { useMobileCheck } from "../../utility/isMobile";

const ConsultationHeading = ({
  title,
  subTitle,
  bgColor,
  bgPadding,
}: ConsultationHeadingSchema) => {
  const isMobile = useMobileCheck();
  return (
    <Box bgcolor={bgColor} p={isMobile ? "0px 16px" : bgPadding}>
      <Box sx={{ margin: isMobile ? "20px 0px" : "40px 0px" }}>
        <ConsultationTabTitle>{title}</ConsultationTabTitle>
        <ConsultationTabSubtitle>{subTitle}</ConsultationTabSubtitle>
      </Box>
    </Box>
  );
};

export default ConsultationHeading;
