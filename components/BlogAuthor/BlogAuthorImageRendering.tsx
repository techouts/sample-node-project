import { Box } from "@mui/material";
import { useRouter } from "next/router";
import BasicModal from "../../HOC/Modal/ModalBlock";
import CustomVideo from "../../HOC/Video/Video";
import { event_type, widget_type } from "../../utility/GAConstants";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceVideo } from "../../utility/ReplaceVideo";
import { Image, ImagesBox } from "../BlogVideos/BlogVideoStyles";
import triggerGAEvent from "../../utility/GaEvents";
import { ReplaceImage } from "../../utility/ReplaceImage";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";

const ImageRendering = ({
  isVideo,
  index,
  videoUrl,
  imageUrl,
  imgPath,
  imageAltText,
  title,
  itemName,
  linkText,
  items,
  id,
  position,
  __component,
  show,
  setShow,
  videoOpen,
  setVideoOpen,
  idValue,
  setIdValue,
  widgetDescription,
  cookie,
  getItem,
  promotion_name,
  promotion_id,
  item,
}: any) => {
  const isMobile = useMobileCheck();
  const router = useRouter();
  const callGaEvent = () => {
    triggerGAEvent(
      {
        widget_type: widget_type,
        component_id: id,
        item_name: itemName || "na",
        item_type: "product",
        widget_title: __component,
        widget_description: widgetDescription || "na",
        widget_position: position,
        no_of_items: items?.length,
        item_brand: "na",
        item_category: "na",
        link_text: linkText || "na",
        index: position + 1,
        link_url: `${global?.window?.location.origin}${imgPath}` || "na",
        item_id: `${__component}_${position}`,
        item_rating: "na",
        event_type: event_type,
        item_category2: "na",
        item_category3: "na",
      },
      "click"
    );
  };

  const callSelectPromotionEvent = (itemInfo: any) => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${itemInfo?.creative_name}-outer BA`,
      creative_slot: `${itemInfo?.creative_slot}-outer BA`,
      items: [
        {
          promotion_id: `${promotion_id}-inner BA`,
          promotion_name: `${promotion_name}-inner BA`,
          creative_name: `${itemInfo?.creative_name}-inner BA`,
          creative_slot: `${itemInfo?.creative_slot}-inner BA`,
        },
      ],
    };
    TriggerGaViewPromotion("select_promotion", datasLayer);
  };

  function isVideoConditionalFunction(callEventtriggered?: boolean) {
    if (isVideo) {
      setIdValue(index);
      setShow(false);
      isMobile && setVideoOpen(true);
      callSelectPromotionEvent(item);
    } else {
      imgPath && router?.push(imgPath);
      callEventtriggered && callGaEvent();
    }
  }
  return (
    <ImagesBox>
      {!show && index == idValue ? (
        <>
          {!show && (
            <Box
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              {videoUrl?.includes(process.env.NEXT_PUBLIC_YOUTUBE_SITE_URL) ||
              videoUrl?.includes(process.env.NEXT_PUBLIC_YOUTUBE_URL) ? (
                <>
                  {isMobile ? (
                    <BasicModal
                      width={"100%"}
                      height={"100%"}
                      top="50%"
                      left="50%"
                      handleClose={() => {
                        setVideoOpen(false);
                        setShow(true);
                      }}
                      open={videoOpen}
                      Component={
                        <iframe
                          style={{
                            width: "100%",
                            display: "flex",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                          }}
                          src={`${ReplaceVideo(videoUrl)}`}
                          title="YouTube video player"
                          allow="autoplay"
                          allowFullScreen
                        ></iframe>
                      }
                    />
                  ) : (
                    <iframe
                      style={{
                        height: "100%",
                      }}
                      src={`${ReplaceVideo(videoUrl)}`}
                      title="YouTube video player"
                      allow="autoplay"
                      allowFullScreen
                      width={"100%"}
                    ></iframe>
                  )}
                </>
              ) : (
                <>
                  {isMobile ? (
                    <BasicModal
                      width={"100%"}
                      height={"100%"}
                      top="50%"
                      left="50%"
                      handleClose={() => {
                        setVideoOpen(false);
                        setShow(true);
                      }}
                      open={videoOpen}
                      sx={{ display: "flex" }}
                      Component={
                        <video
                          src={`${ReplaceVideo(videoUrl)}`}
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
                      idValue="vidId"
                      src={`${ReplaceVideo(videoUrl)}`}
                      title={title}
                      controls
                      controlsList="nodownload"
                      disablePictureInPicture
                      autoPlay
                      loop
                      muted
                      width={"100%"}
                      height={"100%"}
                      videoViewType="contain"
                      gaTitle={linkText}
                    />
                  )}
                </>
              )}
            </Box>
          )}
        </>
      ) : (
        <Image
          src={ReplaceImage(imageUrl)}
          alt={imageAltText || "image"}
          onClick={() => isVideoConditionalFunction(true)}
        />
      )}
      {isVideo && idValue != index && (
        <Box
          sx={{
            width: "40px",
            position: "absolute",
            textAlign: "center",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_CMS_IMAGES_URL}/Group_48097400_932a99f820_15b2b6fc1a.png`}
            alt="play-icon"
            width={"100%"}
            onClick={() => isVideoConditionalFunction()}
          />
        </Box>
      )}
    </ImagesBox>
  );
};

export default ImageRendering;