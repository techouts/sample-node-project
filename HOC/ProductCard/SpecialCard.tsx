import React from "react";
import {
  OuterBox,
  StyledText,
  TitleText,
  SpecialCardWrapper,
  SpecialCardSubTitle,
  SpecialCardStyledButton,
  SpecialCardImage,
} from "./ProductCardStyles";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
function SpecialCard() {
  const isMobile = useMobileCheck();
  const CMSImageUrl = process.env.NEXT_PUBLIC_S3_URL
  const PLPCardBanner = `${CMSImageUrl}/PDP_Card_Image_ccd278b116.png`
  return (
    <OuterBox isMobile={isMobile} loading={false} isSpecialCard={true}>
      <SpecialCardWrapper>
        <SpecialCardImage
          src={`${ReplaceImage(PLPCardBanner)}`}
          alt="productImg"
          isMobile={isMobile}
        ></SpecialCardImage>
        <TitleText isMobile={isMobile} isSpecialCard={true}>
          {"See products in your shade"}
        </TitleText>
        <SpecialCardSubTitle isMobile={isMobile}>
          {"Find your matching products"}
        </SpecialCardSubTitle>
        <SpecialCardStyledButton
          variant="outlined"
          isMobile={isMobile}
          isSpecialCard={true}
        >
          <StyledText>BUY NOW</StyledText>
        </SpecialCardStyledButton>
      </SpecialCardWrapper>
    </OuterBox>
  );
}
export default SpecialCard;
