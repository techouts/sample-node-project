import React from "react";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  FlippedBox,
  ImageBox,
  ImgWrapper,
  MainImageWrapperBox,
  StyledImage,
} from "./OffersGridStyles";

const OffersGridImages = ({
  isFlipped,
  indexValue,
  index,
  isFlipActive,
  imageUrl,
  text,
  cardBorder,
  itemPaddingBottom,
  flipMobileImageUrl,
  flipImageUrl,
  allowLastOddItemToBeCentered,
}: any) => {
  const isMobile = useMobileCheck();
  const mediaQueryCheck = useMobileCheck("(min-width : 900px )");
  return (
    <MainImageWrapperBox
      $allowLastOddItemToBeCentered={
        mediaQueryCheck && allowLastOddItemToBeCentered
      }
      padding={(window.innerWidth / 100) * 22.5}
    >
      <ImgWrapper
        sx={{
          transform:
            isFlipped && indexValue == index && isFlipActive
              ? "rotateY(180deg)"
              : "none",
        }}
      >
        <ImageBox>
          <StyledImage
            src={`${ReplaceImage(imageUrl)}`}
            alt={text}
            bordered={cardBorder}
            py={isMobile ? "4px" : itemPaddingBottom}
          />
        </ImageBox>
        {isFlipActive && (
          <FlippedBox>
            <StyledImage
              src={
                isMobile && isFlipActive
                  ? `${ReplaceImage(flipMobileImageUrl)}`
                  : `${ReplaceImage(flipImageUrl)}`
              }
              alt={text}
              bordered={cardBorder}
              py={isMobile ? "4px" : itemPaddingBottom}
            />
          </FlippedBox>
        )}
      </ImgWrapper>
    </MainImageWrapperBox>
  );
};

export default OffersGridImages;
