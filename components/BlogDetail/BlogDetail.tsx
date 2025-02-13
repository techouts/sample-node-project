import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useState, useRef } from "react";
import {
  Heading,
  Name,
  ContentBox,
  SubHeading,
  ParagraphText,
  HeaderBox,
  GalleryButton,
  GalleryText,
  VideoImages,
} from "./BlogDetailStyles";
import { useMobileCheck } from "../../utility/isMobile";
import BeautyShop from "../BeautyShopCarousel/BeautyShop";
import BasicModal from "../../HOC/Modal/ModalBlock";
import ShareInfo from "../PdpCardComponent/SharePopUp/ShareInfo";
import Sharedata from "../../components/PdpCardComponent/SharePopUp/ShareData.json";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { useRouter } from "next/router";
import Loader from "../../HOC/Loader/Loader";
import { ImagesBox, Image } from "../BlogVideos/BlogVideoStyles";
import ViewEvent from "../../utility/viewEvent";
import {
  event_type,
  share_event_type,
  widget_type,
} from "../../utility/GAConstants";
import Video from "../../HOC/Video/Video";
import { ReplaceVideo } from "../../utility/ReplaceVideo";
import { viewArray } from "../../utility/ViewEvenItemArray";
import triggerGAEvent from "../../utility/GaEvents";
const BlogDetail = ({
  bannerItems,
  galleryItems,
  bgColor,
  bgPadding,
  heading,
  name,
  paragraph,
  subheading,
  imageAltText,
  position,
  __component,
  id,
}: any) => {
  const viewEventWrapper = useRef();
  const router = useRouter();
  const isMobile = useMobileCheck();
  const [Image1, setImage1] = useState(false);
  const [show, setShow] = useState(true);
  const [idValue, setIdValue] = useState();
  const [videobutton, setVideobutton] = useState(true);
  const handleClick = () => {
    setImage1(true);
  };
  const [shareOpen, setShareOpen] = useState(false);
  const [displayLoader, setLoader] = useState(false);
  const items = bannerItems;
  const SharehandleOpen = () => {
    if (isMobile) {
      navigator
        .share({
          title: "ShopperStop",
          url: window.location.href,
        })
        .then(() => console.log("Successful share!"))
        .catch((err) => console.error(err));
    } else {
      setShareOpen(true);
    }
  };

  const convertNameToURL = (name: string) => {
    const temp = name.split(" ").map((el) => el.toLowerCase());
    const url = temp.join("-");
    return url;
  };
  const SharehandleClose = () => setShareOpen(false);
  const dataLayer = {
    item_id: `${__component}_${position + 1}`,
    item_name: name,
    component_id: id,
    widget_type: widget_type,
    item_type: "product",
    widget_title: __component,
    widget_description: subheading,
    widget_postion: position,
    no_of_items: bannerItems?.length,
    index: position + 1,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    view_items: viewArray(items),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  const callEvent = (
    eventName: string,
    linktext: string,
    linkurl?: URL | string,
    itemsLength?: object | any
  ) => {
    triggerGAEvent(
      {
        component_id: id,
        item_name: heading,
        item_id: `${__component}_${position + 1}`,
        widget_type: widget_type,
        item_type: "product",
        widget_title: __component,
        widget_description: subheading,
        widget_postion: position,
        link_url: `${global?.window?.location.origin}${linkurl}` || "na",
        link_text: linktext,
        no_of_items: itemsLength?.length,
        index: 1,
        item_brand: "na",
        item_category: "na",
        event_type: event_type,
        item_rating: "na",
      },
      eventName
    );
  };

  const callShareEvent = () => {
    triggerGAEvent(
      {
        component_id: id,
        item_name: heading,
        item_id: `${__component}_${position + 1}`,
        widget_type: widget_type,
        item_type: "product",
        widget_title: __component,
        widget_postion: position + 1,
        link_url: "na",
        link_text: heading,
        no_of_items: items?.length,
        index: 1,
        item_brand: "na",
        item_category: "na",
        item_category2: "na",
        item_category3: "na",
        event_type: share_event_type,
        method: "FACEBOOK/ WHATSAPP / PINTEREST / EMAIL",
      },
      "share"
    );
  };
  return (
    <>
      {displayLoader && <Loader />}
      <Box p={isMobile ? "0 4%" : bgPadding} ref={viewEventWrapper}>
        <HeaderBox>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              alignItems: "center",
            }}
          >
            <ShareOutlinedIcon
              sx={{
                width: "14px",
                marginTop: isMobile ? "10px" : "",
                cursor: "pointer",
              }}
              fontSize="small"
              onClick={() => {
                SharehandleOpen(), callShareEvent();
              }}
            />
          </Box>
          <Box sx={{ margin: "10px 0 0 0" }}>
            {!isMobile && (
              <BasicModal
                height={isMobile ? "300px" : "200px"}
                width={isMobile ? "200px" : "700px"}
                top="50%"
                left="50%"
                handleOpen={SharehandleOpen}
                handleClose={SharehandleClose}
                open={shareOpen}
                Component={
                  <ShareInfo
                    shareInfoData={Sharedata}
                    isShowProductData={false}
                  />
                }
              />
            )}
          </Box>
        </HeaderBox>
        <Heading>{heading} </Heading>

        <SubHeading>{subheading}</SubHeading>
        <Name
          onClick={() => {
            router?.push(convertNameToURL(name));
          }}
        >
          {name}
        </Name>
        <ContentBox>
          <Grid container>
            {bannerItems?.map((banner: any, index: any) => {
              return (
                <Grid
                  item
                  xs={12 / bannerItems?.length}
                  sm={12 / bannerItems?.length}
                  md={12 / bannerItems?.length}
                  lg={12 / bannerItems?.length}
                  xl={12 / bannerItems?.length}
                  key={index}
                >
                  {banner?.videoButtonImageUrl && (
                    <ImagesBox style={{ height: isMobile ? "" : "476px" }}>
                      {!(videobutton && index == idValue) && (
                        <VideoImages
                          isMobile={isMobile}
                          src={`${ReplaceImage(banner?.videoButtonImageUrl)}`}
                          alt={imageAltText || "stsimage"}
                          onClick={() => {
                            setIdValue(index),
                              setShow(false),
                              setVideobutton(true);
                          }}
                        />
                      )}
                      {!show && index == idValue ? (
                        <>
                          {!show && (
                            <>
                              {banner?.videoUrl?.includes(process.env.NEXT_PUBLIC_YOUTUBE_SITE_URL) ||
                              banner?.videoUrl?.includes(process.env.NEXT_PUBLIC_YOUTUBE_URL) ? (
                                <iframe
                                  style={{
                                    minHeight: isMobile ? "185px" : "621px",
                                  }}
                                  src={`${ReplaceVideo(banner?.videoUrl)}${
                                    show ? "0" : "1"
                                  }`}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="autoplay"
                                  allowFullScreen
                                  width={"100%"}
                                ></iframe>
                              ) : (
                                <>
                                  <Video
                                    src={`${ReplaceVideo(banner?.videoUrl)}`}
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
                              ? `${ReplaceImage(banner?.mobileImageUrl)}`
                              : `${ReplaceImage(banner?.imageUrl)}`
                          }
                          alt={imageAltText || "image"}
                          onClick={() => {
                            setIdValue(index),
                              setShow(false),
                              setVideobutton(true);
                          }}
                        />
                      )}
                    </ImagesBox>
                  )}
                  {!Image1 ? (
                    <>
                      {!banner?.videoUrl && (
                        <Box sx={{ position: "relative" }}>
                          <img
                            src={ReplaceImage(banner?.imageUrl)}
                            alt={imageAltText || "image"}
                            width="100%"
                            height="100%"
                            onClick={() => {
                              banner?.imgPath && router?.push(banner?.imgPath),
                                setLoader(true),
                                callEvent(
                                  "click",
                                  "na",
                                  banner?.imgPath,
                                  bannerItems
                                );
                            }}
                            style={{
                              padding:
                                bannerItems?.length > 1 ? "0 8px 0 0" : "0",
                              verticalAlign: "bottom",
                              cursor: banner?.imgPath ? "pointer" : "default",
                            }}
                          />
                          {galleryItems?.length > 1 && (
                            <GalleryButton
                              isMobile={isMobile}
                              direction="row"
                              alignItems="center"
                              spacing={isMobile ? "20px" : "50px"}
                              onClick={() => {
                                handleClick(),
                                  callEvent(
                                    "click",
                                    banner?.galleryCarouselButtonText,
                                    "na",
                                    galleryItems
                                  );
                              }}
                            >
                              <Box>
                                <GalleryText isMobile={isMobile}>
                                  {banner?.galleryCarouselButtonText}
                                </GalleryText>
                                <GalleryText
                                  isMobile={isMobile}
                                >{`${galleryItems?.length} PHOTOS`}</GalleryText>
                              </Box>
                              <Box>
                                <img
                                  src={`${ReplaceImage(
                                    banner?.arrowCarouselImageUrl
                                  )}`}
                                  alt="arrow-image"
                                />
                              </Box>
                            </GalleryButton>
                          )}
                        </Box>
                      )}
                    </>
                  ) : (
                    <Box>
                      <BeautyShop
                        buttonPath={""}
                        galleryItems={galleryItems}
                        bgPadding={bgPadding}
                        bgColor={bgColor}
                        arrowImageUrl={""}
                        galleryButtonText={""}
                        gallerImageUrl={""}
                        id={id}
                        componentName={__component}
                        position={position}
                        subheading={subheading}
                        heading={heading}
                      />
                    </Box>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </ContentBox>
        {galleryItems?.length > 1 || (
          <ParagraphText
            isMobile={isMobile}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        )}
      </Box>
    </>
  );
};
export default BlogDetail;
