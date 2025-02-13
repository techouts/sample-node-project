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
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import { useInView } from "react-intersection-observer";
const BlogHeroBannermobile = ({
  items,
  imageAltText,
  id,
  position,
  __component,
}: any) => {
  const router = useRouter();
  const isMobile = useMobileCheck();
  const [displayLoader, setLoader] = useState(false);
  const viewEventWrapper = useRef();
  const newVisibleProductsRef = useRef<any[]>([]);

  const [hasFiredEvent, setHasFiredEvent] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const cookie = new Cookies();
  const { getItem } = useStorage();

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

  const dataLayer = {
    item_id: "na",
    item_name: "na",
    component_id: id,
    widget_type: bannerevent_type,
    widget_title: __component,
    widget_description: "na",
    widget_postion: position,
    no_of_items: items?.length,
    index: position,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    view_items: blogViewArr(items, `${__component}_${position}_`),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  useEffect(() => {
    if (inView && !hasFiredEvent) {
      const firstItem = items[1];
      if (!firstItem) return;

      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${firstItem?.creative_name}-outer BHBM`,
        creative_slot: `${firstItem?.creative_slot}-outer BHBM`,
        items: [
          {
            promotion_id: `${"promotion_id"}-inner BHBM`,
            promotion_name: `${"promotion_name"}-inner BHBM`,
            creative_name: `${firstItem?.creative_name}-inner BHBM`,
            creative_slot: `${firstItem?.creative_slot}-inner BHBM`,
          },
        ],
      };
      TriggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true);
    }
  }, [inView, hasFiredEvent, cookie, getItem, id, __component, items]);

  const initialSlides = 1;

  const trackGAEvent = (index: number) => {
    const roundedIndex = Math.round(index);
    const startIndex = roundedIndex;
    const endIndex = Math.min(roundedIndex + initialSlides, items.length);

    const visibleProducts = items.slice(startIndex, endIndex);

    const newItems = visibleProducts.filter(
      (item: any) =>
        !newVisibleProductsRef.current.includes(item) && item.id !== 1
    );

    newVisibleProductsRef.current = [
      ...newVisibleProductsRef.current,
      ...newItems,
    ];

    if (newItems.length) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${items
          ?.map((item: any) => `${item?.creative_name}-outer BHBM`)
          .join("|")}`,
        creative_slot: `${items
          ?.map((item: any) => `${item?.creative_slot}-outer BHBM`)
          .join("|")}`,
        items: newItems?.map((item: any) => ({
          promotion_id: `${"promotion_id"}-inner BHBM`,
          promotion_name: `${"promotion_name"}-inner BHBM`,
          creative_name: `${item?.creative_name}-inner BHBM`,
          creative_slot: `${item?.creative_slot}-inner BHBM`,
        })),
      };
      TriggerGaViewPromotion("view_promotion", datasLayer);
    }
  };

  return (
    <>
      {displayLoader && <Loader />}
      <Box
        ref={viewEventWrapper}
        sx={{ width: "100%", maxHeight: isMobile ? "365px" : "0px" }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            height: "400px",
            margin: " 0 auto",
            position: "relative",
            justifyContent: "space-between",
          }}
          ref={ref}
        >
          {" "}
          {inView && imagesList.length
            ? imagesList.map((list: any, index: number) => (
                <>
                  <img
                    className={`${styles["gallery-item-mobile"]} ${mobileImagesClassList[index]}`}
                    src={ReplaceImage(list?.mobileImage)}
                    alt={list?.imageAltText || "image"}
                    key={index}
                    onClick={() => [
                      trackGAEvent(index),
                      setSelectedIndex(index),
                    ]}
                  />
                  <MainBoxView isMobile={true}>
                    <TypographyImagetext
                      isMobile={true}
                      onClick={() => router?.push(list?.path)}
                    >
                      {imagesContent[1]?.subText}
                    </TypographyImagetext>
                  </MainBoxView>
                </>
              ))
            : null}
        </Box>
      </Box>
    </>
  );
};

export default BlogHeroBannermobile;
