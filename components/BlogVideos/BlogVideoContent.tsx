import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  TitleTypography,
  Image,
  ContentBox,
  ContentTypography,
  VideoImage,
  ImagesBox,
  MainGrid,
  ContentGrid,
} from "./BlogVideoStyles";
import { useState, useRef } from "react";
import VideoListSchema from "../../schemas/VideoListSchema";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import Video from "../../HOC/Video/Video";
import { ReplaceVideo } from "../../utility/ReplaceVideo";
import ViewEvent from "../../utility/viewEvent";
import { event_type, widget_type } from "../../utility/GAConstants";
import { viewArray } from "../../utility/ViewEvenItemArray";
const BlogVideoContent = (props: VideoListSchema) => {
  const { bgColor, bgPadding, isLarge, items, __component, position, id } =
    props;
  const viewEventWrapper = useRef();
  const [show, setShow] = useState(true);
  const [idValue, setIdValue] = useState();
  const [videobutton, setVideobutton] = useState(true);
  const isMobile = useMobileCheck();

  const dataLayer = {
    item_id: `${__component}_${position + 1}`,
    item_name: "na",
    component_id: id,
    widget_type: widget_type,
    item_type: "product",
    widget_title: __component,
    widget_description: "na",
    widget_postion: position,
    no_of_items: items?.length,
    index: position + 1,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    view_items: viewArray(items),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  const isLargeVideo = (videos: any, index: any) => {
    return (
      <>
        {!show && index == idValue ? (
          <>
            {!show && (
              <>
                {videos?.videoUrl?.includes(process.env.NEXT_PUBLIC_YOUTUBE_SITE_URL) ||
                videos?.videoUrl?.includes(process.env.NEXT_PUBLIC_YOUTUBE_URL) ? (
                  <iframe
                    style={{
                      minHeight: isMobile ? "185px" : "476px",
                    }}
                    src={`${ReplaceVideo(videos?.videoUrl)}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay"
                    allowFullScreen
                    width={"100%"}
                  ></iframe>
                ) : (
                  <>
                    <Video
                      src={`${ReplaceVideo(videos?.videoUrl)}`}
                      controls
                      controlsList="nodownload"
                      disablePictureInPicture
                      autoPlay
                      loop
                      muted
                      width={"100%"}
                      height={"100%"}
                      title={videos?.text}
                    />
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <Image
            src={
              isMobile
                ? `${ReplaceImage(videos?.mobileImageUrl)}`
                : `${ReplaceImage(videos?.imageUrl)}`
            }
            alt="image"
            onClick={() => {
              setIdValue(index);
              setShow(false);
              setVideobutton(true);
            }}
          />
        )}
      </>
    );
  };
  const notIsLargeVideos = (list: any, index: any) => {
    return (
      <>
        {!show && index == idValue ? (
          <>
            {!show && (
              <>
                {list?.videoUrl?.includes(process.env.NEXT_PUBLIC_YOUTUBE_SITE_URL) ||
                list?.videoUrl?.includes(process.env.NEXT_PUBLIC_YOUTUBE_URL) ? (
                  <iframe
                    src={`${ReplaceVideo(list?.videoUrl)}${show ? "0" : "1"}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay"
                    allowFullScreen
                    width={"100%"}
                  ></iframe>
                ) : (
                  <>
                    <Video
                      src={`${ReplaceVideo(list?.videoUrl)}`}
                      controls
                      controlsList="nodownload"
                      disablePictureInPicture
                      autoPlay
                      loop
                      muted
                      width={"100%"}
                      height={"100%"}
                    />
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <Image
            src={
              isMobile
                ? `${ReplaceImage(list?.mobileImageUrl)}`
                : `${ReplaceImage(list?.imageUrl)}`
            }
            alt="image"
            onClick={() => {
              setIdValue(index);
              setShow(false);
              setVideobutton(true);
            }}
          />
        )}
      </>
    );
  };
  return (
    <>
      {isLarge ? (
        <Box
          ref={viewEventWrapper}
          bgcolor={bgColor}
          p={isMobile ? "0 6%" : bgPadding}
        >
          {items?.map((videos, index: any) => {
            const uniqueKeyValue = index;
            return (
              <Grid container key={uniqueKeyValue}>
                <ContentGrid item xs={12}>
                  <Box sx={{ marginTop: "10px" }}>
                    <TitleTypography isMobile={isMobile}>
                      {videos?.text}
                    </TitleTypography>
                  </Box>
                  <ImagesBox style={{ height: isMobile ? "185px" : "476px" }}>
                    {!(videobutton && index == idValue) && (
                      <VideoImage
                        isLargetype={isLarge}
                        style={{ display: isMobile ? "none" : "block" }}
                        src={`${ReplaceImage(videos?.videoButtonImageUrl)}`}
                        alt="image"
                        onClick={() => {
                          setIdValue(index);
                          setShow(false);
                          setVideobutton(true);
                        }}
                      />
                    )}
                    {isLargeVideo(videos, index)}
                  </ImagesBox>
                  <ContentBox>
                    <ContentTypography isMobile={isMobile}>
                      {videos?.ContentText}
                    </ContentTypography>
                  </ContentBox>
                </ContentGrid>
              </Grid>
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{ display: isMobile ? "none" : "block" }}
          bgcolor={bgColor}
          p={bgPadding}
        >
          {items?.map((list, index: any) => {
            const uniqueKeyValue = index;
            return (
              <MainGrid container key={uniqueKeyValue} spacing={2}>
                <Grid item sm={4} md={4} lg={4}>
                  <ImagesBox>
                    {!(videobutton && index == idValue) && (
                      <VideoImage
                        isLargetype={isLarge}
                        style={{ display: isMobile ? "none" : "block" }}
                        src={`${ReplaceImage(list?.videoButtonImageUrl)}`}
                        alt="image"
                        onClick={() => {
                          setIdValue(index);
                          setShow(false);
                          setVideobutton(true);
                        }}
                      />
                    )}
                    {notIsLargeVideos(list, index)}
                  </ImagesBox>
                </Grid>
                <Grid item sm={8} md={8} lg={8}>
                  <Box>
                    <TitleTypography>{list?.text}</TitleTypography>
                    <ContentTypography>{list?.ContentText}</ContentTypography>
                  </Box>
                </Grid>
              </MainGrid>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default BlogVideoContent;
