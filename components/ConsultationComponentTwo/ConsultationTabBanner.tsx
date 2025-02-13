import React from "react";
import { Box } from "@mui/material";
import {
  BannerBox,
  BannerTitle,
  BannerItemBox,
  BannerIconAndText,
  BannerIconDescription,
} from "./ConsultationTabBannerStyles";
import ConsultationTabBannerSchema from "./ConsultationTabBannerSchema";
import { useMobileCheck } from "../../utility/isMobile";

const ConsultationTabBanner = ({
  bgColor,
  bgPadding,
  title,
  items,
}: ConsultationTabBannerSchema) => {
  const isMobile = useMobileCheck();
  return (
    <Box p={isMobile ? "0px" : bgPadding}>
      <BannerBox bgcolor={bgColor}>
        <BannerTitle>{title}</BannerTitle>
        <BannerItemBox>
          {items?.map((eachItem) => (
            <BannerIconAndText key={eachItem?.id}>
              <img
                src={isMobile ? eachItem?.mobileIcon : eachItem?.icon}
                alt="Banner Image"
                style={{ maxHeight: "90px", maxWidth: "90px" }}
              />
              <BannerIconDescription>
                {eachItem?.iconText}
              </BannerIconDescription>
            </BannerIconAndText>
          ))}
        </BannerItemBox>
      </BannerBox>
    </Box>
  );
};

export default ConsultationTabBanner;
