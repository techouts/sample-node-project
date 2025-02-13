import React from "react";
import Box from "@mui/material/Box";
import  Typography from "@mui/material/Typography";
import {
  MainBox,
  TextStyles,
  SubTextStyles,
  InnerStack,
  OuterStack,
} from "../Benefits/BenefitStyles";
import { useMobileCheck } from "../../utility/isMobile";
import ImagesLogoSchema from "../../schemas/ImagesLogoSchema";
const ProductHighLights = ({
  backEndItems,
  items,
  bgColor,
  title,
}: ImagesLogoSchema) => {
  const isMobile = useMobileCheck();
  const bgPadding = isMobile ? "0px 29px 25px 29px" : "18px 5%";
  return (
    <Box bgcolor={bgColor} p={bgPadding} mb={isMobile ? "25px" : "40px"}>
      {isMobile && (
        <Typography sx={{ textAlign: "center", padding: "25px 0px 10px 0px" }}>
          {title}
        </Typography>
      )}
      <OuterStack>
        {backEndItems?.map((item: any, index: any) => {
          return (
            <>
              {items?.filter((cmsItem) => cmsItem?.iconText === item)?.length >
                0 && (
                <InnerStack key={index}>
                  <img
                    alt="avatar logo"
                    src={
                      items?.filter(
                        (cmsItem) => cmsItem?.iconText === item
                      )?.[0]?.icon || ""
                    }
                    width={isMobile ? "50px" : "64px"}
                    height={isMobile ? "50px" : "64px"}
                  />
                  <MainBox
                    alignItems={item?.subText && isMobile ? "center" : ""}
                  >
                    <TextStyles Index={index}>{item}</TextStyles>
                    {item?.subText && (
                      <SubTextStyles>{item?.subText}</SubTextStyles>
                    )}
                  </MainBox>
                </InnerStack>
              )}
            </>
          );
        })}
      </OuterStack>
    </Box>
  );
};
export default ProductHighLights;
