import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import { CommonCarouselStyles } from "./styles";
export interface ListItemBaseProps {
  imageUrl?: string;
  imageUrlMobile?: string;
  path?: string | URL;
  isNewTab?: boolean;
  color?: string;
  backgroundImage?: string;
  id?: any;
}

export interface CarouselProps {
  items: ListItemBaseProps[];
  settings: PropValuesSettings;
  Component: Function;
  callBack?: Function;
  isVertical?: boolean;
  position?: number;
  toggle?: boolean;
  imageIndex?: any;
  setSecondCarouselData?: any;
  viewEventWrapper?: any;
  componentvalue?: any;
  widgetposition?: number;
  componentName?: string;
  id?: number;
  updateCartSuggestions?: Function;
  promotion_id?: any;
  promotion_name?: any;
  viewport?: any;
  trackGAEvent?: (index: number) => void; 
}
interface PropValuesSettings {
  arrows: boolean;
  dots: boolean;
  infinite: boolean;
  initialSlide: number;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
}
const defaultSettings = {
  arrows: false,
  dots: false,
  infinite: false,
  initialSlide: 0,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
function Carousel({
  items,
  settings = defaultSettings,
  Component,
  callBack,
  position,
  toggle,
  componentvalue,
  widgetposition,
  componentName,
  updateCartSuggestions,
  id,
  imageIndex,
  setSecondCarouselData,
  viewEventWrapper,
  promotion_id,
  promotion_name,
  viewport,
  trackGAEvent, 
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(settings.initialSlide);
  const [triggeredSlides, setTriggeredSlides] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (trackGAEvent && !triggeredSlides.has(activeIndex)) {
      trackGAEvent(activeIndex);
      setTriggeredSlides((prev) => new Set(prev.add(activeIndex)));
    }
  }, [activeIndex, trackGAEvent, triggeredSlides]);

  return (
    <Box width={"100%"}>
      <CommonCarouselStyles>
        <Slider
          {...settings}
          afterChange={(current: number) => setActiveIndex(current)}
        >
          {items?.map((item: ListItemBaseProps, index: any) => {
            return (
              <Component
                {...item}
                callBack={callBack}
                key={item?.imageUrl}
                dataSet={index}
                position={position}
                promotion_id={promotion_id}
                promotion_name={promotion_name}
                items={items}
                itemsLength={items?.length}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                toggle={toggle}
                componentvalue={componentvalue}
                widgetposition={widgetposition}
                componentName={componentName}
                updateCartSuggestions={updateCartSuggestions}
                imageIndex={imageIndex}
                setSecondCarouselData={setSecondCarouselData}
                viewEventWrapper={viewEventWrapper}
                id={id ? id : item?.id}
                viewport={viewport}
              />
            );
          })}
        </Slider>
      </CommonCarouselStyles>
    </Box>
  );
}
export default Carousel;
