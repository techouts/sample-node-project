import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import React, { useState, useRef, useEffect } from "react";
import { event_type, widget_type } from "../../utility/GAConstants";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { ReplaceVideo } from "../../utility/ReplaceVideo";
import { viewArray } from "../../utility/ViewEvenItemArray";
import ViewEvent from "../../utility/viewEvent";
import CustomVideo from "../Video/Video";
import {
  CustomText,
  MainFrameImage,
  MainFrameContent,
  MainFrameText,
  Shadow,
  MainFramerVideoWrapper,
  VideosList,
  VideoDetails,
} from "./styles";
import { useInView } from "react-intersection-observer";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";
export interface VideoViewerInterface {
  items: Items[];
  frame: Frame;
  position: number;
  Component: string;
  promotion_id: string;
  promotion_name: string;
}
export interface Frame {
  frameWidth: string;
  frameHeight: string;
  frameWidthMobile: string;
  frameHeightMobile: string;
  imageAltText: string;
  Item_type: any;
  Item_name: any;
  id: any;
}
export interface Items {
  imageUrl: string;
  content: string;
  videoUrl: string;
  imageAltText: string;
  playIconUrl: string;
  position: number;
}
function VideoViewer(data: VideoViewerInterface) {
  const isMobile = useMobileCheck();
  const [isInitial, setInitial] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(data?.items?.[0]);
  const viewEventWrapper = useRef();

  const [hasFiredEvent, setHasFiredEvent] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const cookie = new Cookies();
  const { getItem } = useStorage();

  const updateCurrentVideo = (item: any) => {
    setInitial(true);
    setCurrentVideo(item);
  };
  const dataLayer = {
    item_id: "na",
    widget_type: widget_type,
    item_name: "na",
    item_type: data?.frame?.Item_type,
    widget_title: data?.Component,
    component_id: data?.frame?.id,
    widget_description: "na",
    widget_postion: data?.position,
    no_of_items: data?.items?.length,
    item_brand: "na",
    item_category: "na",
    item_category2: "na ",
    item_category3: "na",
    event_type: event_type,
    view_items: viewArray(data?.items),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  useEffect(() => {
    if (inView && !hasFiredEvent) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${data?.items
          ?.map((item: any) => `${item?.creative_name}-outer BTYS`)
          .join("|")}`,
        creative_slot: `${data?.items
          ?.map((item: any) => `${item?.creative_slot}-outer BTYS`)
          .join("|")}`,
        items: data?.items?.map((item: any) => ({
          promotion_id: `${data?.promotion_id}-inner BTYS`,
          promotion_name: `${data?.promotion_name}-inner BTYS`,
          creative_name: `${item?.creative_name}-inner BTYS`,
          creative_slot: `${item?.creative_slot}-inner BTYS`,
        })),
      };
      TriggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true);
    }
  }, [inView, hasFiredEvent, cookie, getItem, data.items]);

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      sx={{ p: isMobile ? 2 : 2.5 }}
    >
      <Box
        ref={viewEventWrapper}
        onClick={() => setInitial(false)}
        sx={{
          position: "relative",
          border: "1px solid #231F20",
          cursor: "pointer",
        }}
        width={
          isMobile ? data?.frame?.frameWidthMobile : data?.frame?.frameWidth
        }
        height={
          isMobile ? data?.frame?.frameHeightMobile : data?.frame?.frameHeight
        }
      >
        {isInitial && (
          <MainFrameContent>
            <MainFrameImage
              src={`${ReplaceImage(currentVideo?.imageUrl)}`}
              alt={currentVideo?.imageAltText || "main-frame-image"}
            />
            <Box
              sx={{
                width: "40px",
                position: "absolute",
                textAlign: "center",
                top: "40%",
                left: "50%",
              }}
            >
              <img
                src={`${ReplaceImage(currentVideo?.playIconUrl)}`}
                alt="play-icon"
                width={"100%"}
              />
            </Box>
            <Box
              sx={{
                background:
                  "linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 68%)",
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                width: "100%",
                height: "30%",
              }}
            ></Box>
            <MainFrameText isMobile={isMobile}>
              {currentVideo?.content}
            </MainFrameText>
          </MainFrameContent>
        )}
        {!isInitial && (
          <MainFramerVideoWrapper>
            {!currentVideo.videoUrl.includes("www.youtube.com") &&
            !currentVideo.videoUrl.includes("https://youtu.be") ? (
              <CustomVideo
                src={
                  `${ReplaceVideo(currentVideo.videoUrl)}` ||
                  currentVideo.videoUrl
                }
                title={currentVideo?.content}
              />
            ) : (
              <iframe
                width={"100%"}
                height={"100%"}
                src={
                  `${ReplaceVideo(currentVideo.videoUrl)}` ||
                  currentVideo.videoUrl
                }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </MainFramerVideoWrapper>
        )}
      </Box>
      <Box
        width={isMobile ? "100%" : "50%"}
        p={isMobile ? "20px 0px 0px 20px" : "40px 0px 0px 40px"}
        bgcolor={"#231F20"}
        sx={{
          position: "relative",
          width: isMobile ? data?.frame?.frameWidthMobile : "537px",
        }}
      >
        <Box pr={4} ref={ref}>
          <CustomText
            fontWeight="400"
            textTransform="capitalize"
            fontSize={isMobile ? "12px" : "16px"}
          >
            {/* More Videos */}
          </CustomText>
          <VideosList isMobile={isMobile}>
            {data?.items?.map((item: any, index: number) => {
              return (
                <Box
                  key={`key-${index}`}
                  onClick={() => {
                    updateCurrentVideo(item);
                  }}
                >
                  <VideoDetails direction={"row"}>
                    <CustomText
                      pr={1}
                      fontWeight="200"
                      textTransform="lowercase"
                      fontSize={isMobile ? "16px" : "24px"}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </CustomText>
                    <Box
                      sx={{
                        marginRight: isMobile ? "10px" : "8px ",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      <img
                        width={"100px"}
                        height={"100px"}
                        src={`${ReplaceImage(item?.imageUrl)}`}
                        alt={item?.imageAltText || "list-image"}
                      />
                      <Box
                        sx={{
                          width: "25px",
                          position: "absolute",
                          left: "40%",
                          top: "30%",
                        }}
                      >
                        <img
                          style={{ width: "100%" }}
                          src={`${ReplaceImage(currentVideo?.playIconUrl)}`}
                          alt="play-icon"
                        />
                      </Box>
                    </Box>

                    <Shadow />
                    <CustomText
                      fontWeight="600"
                      textTransform="capitalize"
                      fontSize={isMobile ? "12px" : "16px"}
                    >
                      {item?.content}
                    </CustomText>
                  </VideoDetails>
                </Box>
              );
            })}
          </VideosList>
        </Box>
      </Box>
    </Stack>
  );
}
export default VideoViewer;
