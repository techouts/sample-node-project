import React from "react";
import { Box } from "@mui/material";
import {
  MainBox,
  TextStyles,
  SubTextStyles,
  InnerStack,
  OuterStack,
} from "./BenefitStyles";
import { useMobileCheck } from "../../utility/isMobile";
import ImagesLogoSchema from "../../schemas/ImagesLogoSchema";
import { ReplaceImage } from "../../utility/ReplaceImage";
const Benefits = ({ bgColor, bgPadding, items }: ImagesLogoSchema) => {
  const isMobile = useMobileCheck();
  return (
    <Box bgcolor={bgColor} p={isMobile? "20px 16px" : bgPadding}>
      <OuterStack>
        {items?.map((item: any, index: any) => (
          <InnerStack key={index}>
            {item?.imageUrl && (
              <img alt="avatar logo" src={`${ReplaceImage(item?.imageUrl)}`} />
            )}
            <MainBox alignItems={item?.subText && isMobile ? "center" : ""}>
              <TextStyles Index={index} dangerouslySetInnerHTML={{ __html: item?.text || item?.label }}>
              </TextStyles>
              {item?.subText && <SubTextStyles>{item?.subText}</SubTextStyles>}
            </MainBox>
          </InnerStack>
        ))}
      </OuterStack>
    </Box>
  );
};
export default Benefits;
