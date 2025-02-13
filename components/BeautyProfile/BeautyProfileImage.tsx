import React from "react";
import { ItemTitle, StyledImage } from "./Styles";
import { ReplaceImage } from "../../utility/ReplaceImage";

const BeautyProfileImage = ({ item }: any) => {
  return (
    <>
      <StyledImage
        key={item?.text}
        src={`${ReplaceImage(item?.imageUrl)}`}
        alt={`${item?.text}-img`}
      />
      <ItemTitle>{item?.text}</ItemTitle>
    </>
  );
};

export default BeautyProfileImage;
