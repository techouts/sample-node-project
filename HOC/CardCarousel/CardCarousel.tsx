import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  CustomNextArrow,
  CustomPrevArrow,
} from "../../components/ShopByCollection/CustomArrows";
import Carousel from "../Carousel/Carousel2";
import { ReplaceImage } from "../../utility/ReplaceImage";
export const CardCarousel = (props: any) => {
  const [prevArrow, setPrevArrow] = useState(false);
  const [nextArrow, setNextArrow] = useState(
    // @ts-ignore:next-line
    data?.items?.length === 6 ? false : true
  );
  const arrowsHandler = (sliderIndex: number) => {
    if (sliderIndex === 0) {
      setPrevArrow(false);
    } else if (sliderIndex === props?.additional_images?.length - 6) {
      setNextArrow(false);
    } else {
      setNextArrow(true);
      setPrevArrow(true);
    }
  };
  const userSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: prevArrow ? (
      <CustomPrevArrow
        cssData={{ width: "36px", height: "36px", left: "-40px" }}
      />
    ) : (
      false
    ),
    nextArrow: nextArrow ? (
      <CustomNextArrow
        cssData={{ width: "36px", height: "36px", right: "-45px" }}
      />
    ) : (
      false
    ),
    afterChange: (sliderIndex: number) => arrowsHandler(sliderIndex),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Stack>
        <Box></Box>
        <Box>
          <Carousel
            Component={userBanner}
            items={props?.additional_images}
            settings={userSettings}
            callBack={undefined}
            isVertical={undefined}
          />
        </Box>
      </Stack>
    </div>
  );
};
const userBanner = (item: any) => {
  return (
    <Box sx={{ width: "100px", height: "100px" }}>
      <img src={`${ReplaceImage(item?.imageUrl)}`} alt="product"></img>
    </Box>
  );
};
