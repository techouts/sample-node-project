import React, { useEffect, useState, useRef } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Data from "../../JSON/BlogHero.json";
import styles from "./BlogHeroBanner.module.css";
import {
  MainBoxView,
  TypographyButton,
  TypographyChip,
  TypographyImagetext,
} from "./BlogHeroBannerStyles";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { useMobileCheck } from "../../utility/isMobile";
import { useRouter } from "next/router";
import Loader from "../../HOC/Loader/Loader";
import { blogViewArr } from "../../utility/ViewEvenItemArray";
import { bannerevent_type, event_type } from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
const BlogHeroBannermobile = ({ items ,imageAltText,id,position,__component}: any) => {
  const router = useRouter();
  const isMobile = useMobileCheck();
  const [displayLoader, setLoader] = useState(false);
  const viewEventWrapper = useRef();
  const [totalCarousalImages, setTotalCarousalImages] = useState(
    items.slice(0, 3)
  );
  const [imagesContent, setImagesContent] = useState(items.slice(0, 3) as any);
  const [imagesList, setImagesList] = useState(items.slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(1 as any);
  const [selectedIndex, setSelectedIndex] = useState(-1 as any);

  const mobileImagesClassList = [
    styles["mobile-gallery-item-1"],
    styles["mobile-gallery-item-2"],
    styles["mobile-gallery-item-3"],
  ];
  const [carousalArray, setCarousalArray] = useState([] as any);

  useEffect(() => {
    const nodeList = Array.from(
      document?.querySelectorAll(`.${styles["gallery-item-mobile"]}`)
    );

    carousalArray.length == 0 && setCarousalArray(nodeList);
  }, [carousalArray]);

  useEffect(() => {
    if (carousalArray.length > 0) {
      carousalArray.forEach((el: HTMLElement, _: number, array: []) => {
        for (let i = 0; i < array.length + 1; i++) {
          el?.classList?.remove(mobileImagesClassList[i]);
        }
      });

      carousalArray.forEach((el: HTMLElement, i: number) => {
        el?.classList?.add(mobileImagesClassList[i]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carousalArray]);

  useEffect(() => {
    let imgPosition = carousalArray.findIndex(
      (domImg: any) =>
        domImg.src == ReplaceImage(imagesList[selectedIndex]?.mobileImage)
    );
    if (imgPosition == 1) return;
    let tempArray = Array.from(carousalArray);
    let tempImagesContentArray = imagesContent;
    if (imgPosition == 0) {
      tempArray.unshift(tempArray.pop());
      tempImagesContentArray.unshift(tempImagesContentArray.pop());
    } else if (imgPosition == 2) {
      tempArray.push(tempArray.shift());
      tempImagesContentArray.push(tempImagesContentArray.shift());
    }
    setCurrentIndex(selectedIndex);
    setCarousalArray(tempArray);
  }, [selectedIndex]);
   //View Event for Analytics
   const dataLayer = {
    item_id:"na",
    item_name:"na",
    component_id:id,
    widget_type: bannerevent_type,
    widget_title:__component,
    widget_description:"na",
    widget_postion: position,
    no_of_items: items?.length,
    index:position,
    item_brand:"na",
    item_category:"na",
    item_category2:"na",
    item_category3:"na",
    event_type: event_type,
    view_items: blogViewArr(items,`${__component}_${position}_`),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");
  return (
    <>
      {displayLoader && <Loader />}
      <Box ref={viewEventWrapper}
       sx={{ width: "100%",maxHeight:isMobile ? "365px":"0px" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            height: "400px",
            margin: " 0 auto",
            position: "relative",
            justifyContent: "space-between",
          }}
        >
          {imagesList.map((list: any, index: number) => (
            <>
              <img
                className={`${styles["gallery-item-mobile"]} ${mobileImagesClassList[index]}`}
                src={ReplaceImage(list?.mobileImage)}
                alt={list?.imageAltText || 'image'}
                key={index}
                onClick={() => [setSelectedIndex(index)]}
                />
              <MainBoxView isMobile={true}>
                <TypographyImagetext isMobile={true} onClick={()=>router?.push(list?.path)}>
                  {imagesContent[1]?.subText}
                </TypographyImagetext>
              </MainBoxView>
            </>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default BlogHeroBannermobile;
