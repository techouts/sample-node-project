import React, { useRef, useEffect } from "react";
import { Video } from "./styles";
import * as ga from "../../lib/ga";
import useStorage from "../../utility/useStoarge";
import { Cookies } from "react-cookie";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";

export default function CustomVideo(props: any) {
  const { src, title, gaTitle, videoViewType = "contain" } = props;
  let firstTime = true;
  let media = new Audio(src);
  let onBeforeSeek = 0;
  const { getItem } = useStorage();
  const cookie = new Cookies();
  function attributesObj() {
    return {
      page_type: getItem("currentPageType", "local"),
      page_path: window?.location?.pathname,
      page_referrer_title:
        JSON.parse(localStorage.getItem("pageReferrer") as string)?.[
          JSON.parse(localStorage.getItem("pageReferrer") as string)?.length - 2
        ]?.previousPageTitle || "na",
      platform: window?.innerWidth > 768 ? "PWA" : "MobilePWA",
      customer_id: getItem("customerID", "local")
        ? getItem("customerID", "local")
        : cookie.get("MADid"),
      msd_user_id: getItem("customerID", "local")
        ? getItem("customerID", "local")
        : "",
      loyalty_level: getItem("loyalitylevel", "local")
        ? getItem("loyalitylevel", "local")
        : "na",
      page_slug: getItem("currentPageSlug", "local"),
      video_provider: "SSBeauty",
      video_url: src,
      video_title: title || gaTitle,
      video_percent: 0,
    };
  }
  function gaEvent(attrDetails: Object, eventName: string) {
    ga.event({
      action: eventName,
      params: attrDetails,
    });
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          onClose(ref.current.currentTime);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function trackProgress(event: any) {
    if (firstTime) {
      firstTime = false;
      gaEvent(attributesObj(), "video_start");
    } else {
      if (Math.abs(event.target.currentTime - onBeforeSeek) > 1) {
        onSeeked(event, event.target.currentTime, onBeforeSeek);
      }

      onBeforeSeek = event.target.currentTime;
      let intro = Math.ceil(media.duration * 0.25);
      let interval = Math.ceil(media.duration * 0.5);
      let climax = Math.ceil(media.duration * 0.75);
      if (Math.ceil(event.target.currentTime) == intro) {
        let atIntro = { ...attributesObj(), video_percent: 25 };
        gaEvent(atIntro, "video_progress");
      } else if (Math.ceil(event.target.currentTime) == interval) {
        let atInterval = { ...attributesObj(), video_percent: 50 };
        gaEvent(atInterval, "video_progress");
      } else if (Math.ceil(event.target.currentTime) == climax) {
        let atClimax = { ...attributesObj(), video_percent: 75 };
        gaEvent(atClimax, "video_progress");
      }
    }
  }
  function onSeeked(event: any, afterSeek: number, beforeSeek: number) {
    let videoSeekPercent = Math.ceil(
      (Math.abs(afterSeek - beforeSeek) / media.duration) * 100
    );
    let videoPercent = Math.ceil(
      (event.target.currentTime / media.duration) * 100
    );
    let atSeek = {
      ...attributesObj(),
      video_percent: videoPercent,
      video_seek_percentage: videoSeekPercent,
    };
    gaEvent(atSeek, "video_seeked");
  }
  function atEnd() {
    let atEndOfVideo = { ...attributesObj(), video_percent: 100 };
    gaEvent(atEndOfVideo, "video_complete");
  }
  function onClose(time: any) {
    let videoPercent = Math.ceil((time / media.duration) * 100);

    let atAbortOfVideo = { ...attributesObj(), video_percent: videoPercent };
    gaEvent(atAbortOfVideo, "video_aborted");
  }

  const callSelectPromotionEvent = () =>
    {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${"creative_name"}-outer BTYS`,
        creative_slot: `${"creative_slot"}-outer BTYS`,
        items: [
          {
            promotion_id: `${"promotion_id"}-inner BTYS`,
            promotion_name: `${"promotion_name"}-inner BTYS`,
            creative_name: `${"creative_name"}-inner BTYS`,
            creative_slot: `${"creative_slot"}-inner BTYS`,
          },
        ],
      };
      TriggerGaViewPromotion("select_promotion", datasLayer);
    };

  const handlePlay = () => {
    callSelectPromotionEvent();
  };

  return (
    <Video
      style={{ objectFit: videoViewType }}
      src={src}
      controls
      controlsList="nodownload"
      disablePictureInPicture
      onEnded={atEnd}
      autoPlay
      ref={wrapperRef}
      onTimeUpdate={trackProgress}
      onAbort={onClose}
      onPlay={handlePlay}
      muted
      width={"100%"}
      height={"100%"}
    ></Video>
  );
}