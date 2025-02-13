import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Data from "../../JSON/BlogHero.json";
import styles from "./BlogHeroBanner.module.css";
import { useRouter } from "next/router";
import Loader from "../../HOC/Loader/Loader";
import {
  TypographyChip,
  TypographyImagetext,
  TypographyButton,
  MainBoxView,
  ImagesBox,
} from "../../components/BlogHeroBanner/BlogHeroBannerStyles";
import { ReplaceImage } from "../../utility/ReplaceImage";
import ViewEvent from "../../utility/viewEvent";
import { blogViewArr } from "../../utility/ViewEvenItemArray";
import {
  bannerevent_type,
  event_type,
  widget_type,
} from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";
import { useInView } from "react-intersection-observer";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";
const BlogHeroBannerweb = ({
  items,
  imageAltText,
  position,
  id,
  __component,
  promotion_id,
  promotion_name,
}: any) => {
  const router = useRouter();
  const [displayLoader, setLoader] = useState(false);
  const [imagesContent, setImagesContent] = useState([...items] as any);
  const [imagesList, setImagesList] = useState([...items] as any);
  const viewEventWrapper = useRef();

  const [hasFiredEvent, setHasFiredEvent] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const cookie = new Cookies();
  const { getItem } = useStorage();

  const webImagesClassList = [
    styles["gallery-item-1"],
    styles["gallery-item-2"],
    styles["gallery-item-3"],
    styles["gallery-item-4"],
    styles["gallery-item-5"],
  ];

  const [carousalArray, setCarousalArray] = useState([] as any);
  useEffect(() => {
    const nodeList = Array.from(
      document?.querySelectorAll(`.${styles["gallery-item-web"]}`)
    );
    setCarousalArray(nodeList);
  }, []);

  useEffect(() => {
    if (carousalArray.length > 0) {
      carousalArray.forEach((el: HTMLElement, _: number, array: []) => {
        for (let i = 0; i < array.length + 1; i++) {
          el?.classList.remove(webImagesClassList[i]);
        }
      });
      carousalArray.forEach((el: HTMLElement, i: number) => {
        el?.classList?.add(webImagesClassList[i]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carousalArray]);

  useEffect(() => {
    if (inView && !hasFiredEvent) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${items
          ?.map((item: any) => `${item?.creative_name}-outer BHBW`)
          .join("|")}`,
        creative_slot: `${items
          ?.map((item: any) => `${item?.creative_slot}-outer BHBW`)
          .join("|")}`,
        items: items?.map((item: any) => ({
          promotion_id: `${promotion_id}-inner BHBW`,
          promotion_name: `${promotion_name}-inner BHBW`,
          creative_name: `${item?.creative_name}-inner BHBW`,
          creative_slot: `${item?.creative_slot}-inner BHBW`,
        })),
      };
      TriggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true);
    }
  }, [inView, hasFiredEvent, cookie, getItem, items]);

  const handleArrowDirection = (arrowDirection: string, itemname: string) => {
    let tempArray = Array.from(carousalArray);
    let tempImagesContentArray = imagesContent;

    if (arrowDirection === "prev") {
      tempArray.unshift(tempArray.pop());
      tempImagesContentArray.unshift(tempImagesContentArray.pop());
      callSwipeEvent("swipe_left", itemname);
    } else {
      tempArray.push(tempArray.shift());
      tempImagesContentArray.push(tempImagesContentArray.shift());
      callSwipeEvent("swipe_right", itemname);
    }

    setCarousalArray(tempArray);
    setImagesContent(tempImagesContentArray);
  };
  //View Event for Analytics
  const dataLayer = {
    item_id: "na",
    item_name: "na",
    component_id: id,
    widget_type: bannerevent_type,
    widget_title: "na",
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

  //swipe_left, swipe_right events
  const callSwipeEvent = (eventName: string, itemname: string) => {
    let eventname = eventName.includes("swipe_right");
    triggerGAEvent(
      {
        item_name: itemname,
        item_id: `${__component}_${position}_${eventname ? 2 : 1}`,
        component_id: id,
        widget_type: widget_type,
        item_type: "na",
        widget_title: "na",
        widget_description: "na",
        widget_position: position,
        no_of_items: items?.length,
        index: 1,
        item_brand: "na",
        item_category: "na",
      },
      eventName
    );
  };

  const callSelectPromotionEvent = (
    creative_name: string,
    creative_slot: string
  ) => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${creative_name}-outer BHBW`,
      creative_slot: `${creative_slot}-outer BHBW`,
      items: [
        {
          promotion_id: `${promotion_id}-inner BHBW`,
          promotion_name: `${promotion_name}-inner BHBW`,
          creative_name: `${creative_name}-inner BHBW`,
          creative_slot: `${creative_slot}-inner BHBW`,
        },
      ],
    };
    TriggerGaViewPromotion("select_promotion", datasLayer);
  };
  return (
    <>
      {displayLoader && <Loader />}
      <Box sx={{ width: "100%" }} ref={viewEventWrapper}>
        <div ref={ref}>
          {inView ? (
            <ImagesBox>
              {items?.map((list: any, index: any) => (
                <>
                  {list?.image && (
                    <Box
                      style={{
                        cursor: "pointer",
                        backgroundImage:
                          "url('" + ReplaceImage(list?.image) + "')",
                        backgroundSize: "cover",
                      }}
                      className={`${styles[`gallery-item-web`]} ${
                        webImagesClassList[index]
                      }`}
                      onClick={() => [
                        callSelectPromotionEvent(
                          list?.creative_name,
                          list?.creative_slot
                        ),

                        router?.push(list?.path),
                        setLoader(true),
                      ]}
                      key={index}
                    ></Box>
                  )}
                  <MainBoxView isMobile={false}>
                    <TypographyImagetext isMobile={false}>
                      {imagesContent[2]?.subText}
                    </TypographyImagetext>
                  </MainBoxView>
                </>
              ))}
              <Button
                onClick={() =>
                  handleArrowDirection("prev", imagesContent[1]?.subText)
                }
              >
                <img src={Data?.reverse} alt="reverse" />
              </Button>
              <Button
                onClick={() =>
                  handleArrowDirection("next", imagesContent[3]?.subText)
                }
              >
                <img src={Data?.Forward} alt="forward" />
              </Button>
            </ImagesBox>
          ) : null}
        </div>
      </Box>
    </>
  );
};
export default BlogHeroBannerweb;