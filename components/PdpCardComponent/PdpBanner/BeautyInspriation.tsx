import Box from "@mui/material/Box";
import  Grid  from "@mui/material/Grid";
import { useRef, useState, useEffect } from "react";
import Carousel from "../../../HOC/Carousel/Carousel2";
import BasicModal from "../../../HOC/Modal/ModalBlock";
import CustomVideo from "../../../HOC/Video/Video";
import {
  event_type,
  widget_powered_by,
  widget_type,
} from "../../../utility/GAConstants";
import { useMobileCheck } from "../../../utility/isMobile";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import ViewEvent from "../../../utility/viewEvent";
import {
  BeautyHeaderTitle,
  BeautySubtitle,
  BeautyTitle,
} from "./PdpBannerstlyles";
import { AppIcons } from "../../../utility/AppIconsConstant";
import { PLAY_VIDEO_ICON } from "../../../utility/AppIcons";
import AxiosInstance from "../../../utility/AxiosInstance";
import { ReplaceVideo } from "../../../utility/ReplaceVideo";
import { viewArray } from "../../../utility/ViewEvenItemArray";
const BeautyInspiriation = (props: any) => {
  const {
    title,
    productData,
    categoryLevel,
  } = props;
  const [show, setShow] = useState(true);
  const [id, setId] = useState();
  const [videobutton, setVideobutton] = useState(true);
  const [mobileVideo, setMobileVideo] = useState(false);
  const isMobile = useMobileCheck();
  const [videosData, setVideosData] = useState<any>();
  const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
  const userSettings = {
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    dots: false,
    infinite: false,
  };
  const VideoPlayButton = AppIcons(PLAY_VIDEO_ICON);

  const getLevelData = (levelValue: string) => {
    switch (levelValue?.toLowerCase()) {
      case "one":
        return 1;
        break;
      case "two":
        return 2;
        break;
      case "three":
        return 3;
        break; 
      case "four":
        return 4;
        break;
      default:
        return 3;
    }
  };

  useEffect(() => {
    const categoryID = productData?.items?.[0]?.categories?.filter(
      (obj: any) => {
        return obj.level === getLevelData(categoryLevel) + 1;
      }
    )?.[0]?.id;
    if (categoryID) {
      AxiosInstance(
        `${NEXT_PUBLIC_CMS_URL}/api/plps?filters[slug][$eq]=${categoryID}&populate[categoryVideos][populate][items][populate]`,
        true,
        false
      ).then((response) => {
        setVideosData(
          response?.data?.data?.[0]?.components?.filter(
            (item: any) => {
              return item?.__component === "widget.category-videos";
            }
          )
        );
      });
    }
  }, [productData]);

  const CommonBanner = (props: any) => {
    const { dataSet } = props;

    return (
      <Grid item xs={11.5} lg={3.8} md={3.8} sm={3.8}>
        <Box
          ref={viewEventWrapper}
          sx={{ position: "relative", cursor: "pointer" }}
        >
          {!(videobutton && dataSet == id) && (
            <img
              style={{
                position: "absolute",
                top: isMobile ? "34%" : "43%",
                left: "41%",
                width: "50px",
              }}
              onClick={() => {
                setId(dataSet), setShow(false), setVideobutton(true);
                setMobileVideo(true);
              }}
              src={`${ReplaceImage(VideoPlayButton?.url)}`}
              width={"100%"}
              alt="PLAY BUTTON"
            />
          )}
          {!show && dataSet == id ? (
            <Box>
              {isMobile ? (
                <BasicModal
                  width={"100%"}
                  height={"100%"}
                  top="50%"
                  left="50%"
                  handleClose={() => {
                    setMobileVideo(false), setShow(true), setVideobutton(false);
                  }}
                  open={mobileVideo}
                  sx={{ display: "flex" }}
                  Component={
                    <video
                      src={`${ReplaceVideo(props.VideoIconUrl)}`}
                      controls
                      controlsList="nodownload"
                      disablePictureInPicture
                      autoPlay
                      loop
                      muted
                      style={{
                        width: "100%",
                        display: "flex",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                      }}
                    />
                  }
                />
              ) : (
                <CustomVideo
                  width="100%"
                  videoViewType="contain"
                  src={ReplaceVideo(props?.VideoIconUrl)}
                  title={props?.text}
                ></CustomVideo>
              )}
            </Box>
          ) : (
            <img
            src={props?.imgUrlWeb}
              alt="thumbnail image"
              width={"100%"}
              onClick={() => {
                setId(dataSet), setShow(false), setVideobutton(true);
              }}
            />
          )}
        </Box>
        <BeautyTitle>{props?.text}</BeautyTitle>
        <BeautySubtitle>{props?.subTitle}</BeautySubtitle>
      </Grid>
    );
  };
  const UserBanner = (props: any) => {
    return (
      <Grid
        container
        sx={{
          justifyContent: "space-between",
          marginTop: "5px",
        }}
      >
        <CommonBanner {...props} />
      </Grid>
    );
  };

  const viewEventWrapper = useRef();
  const dataLayer = {
    item_name:props?.__component,
    item_id:props?.id,
    event_type: event_type,
    widget_type: widget_type,
    item_type: "na",
    widget_powered_by: widget_powered_by,
    widget_title: title,
    widget_description: "na",
    widget_position: 7,
    no_of_items: videosData?.[0]?.items?.length,
    view_items: viewArray(videosData?.[0]?.items),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  return (
    <>
      <Box
        ref={viewEventWrapper}
        p={videosData?.[0]?.bgPadding}
        bgcolor={videosData?.[0]?.bgColor}
      >
        <BeautyHeaderTitle>{videosData?.[0]?.title}</BeautyHeaderTitle>
        {isMobile ? (
          <Carousel
            Component={UserBanner}
            items={videosData?.[0]?.items}
            settings={userSettings}
          ></Carousel>
        ) : (
          <Grid container spacing={2}>
            {videosData?.[0]?.items?.map((item: any, index: any) => (
              <>
                <CommonBanner {...item} dataSet={index} />
              </>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};
export default BeautyInspiriation;
