import { useMobileCheck } from "../../utility/isMobile";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import {
  BeautyButtonAndViewsText,
  BeautyButton,
  ImageHeading,
  ImageSubHeading,
  ThreeImagesHeading,
  ReadMoreAndShareText,
  ReadMoreTypography,
  ShareIconAndText,
  ThreeImagesAndContent,
  OnlyContentWrapper,
  TitleTypography,
  ViewAllButton,
  InMobileViewGridItems,
  SecondReadMoreAndShareText,
  FirstContentItem,
  ViewAllTxt,
} from "./TrendingStoriesStyles";
import { ReplaceImage } from "../../utility/ReplaceImage";
import Loader from "../../HOC/Loader/Loader";
import Sharedata from "../../components/PdpCardComponent/SharePopUp/ShareData.json";
import { useEffect, useRef, useState } from "react";
import BasicModal from "../../HOC/Modal/ModalBlock";
import ShareInfo from "../PdpCardComponent/SharePopUp/ShareInfo";
import {
  viewAllFrMob,
  viewAllFrDesk,
} from "../BlogThumbnail/BlogThumbnailStyle";
import triggerGAEvent from "../../utility/GaEvents";
import {
  event_type,
  share_event_type,
  widget_type,
} from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import { ViewArray } from "../../utility/ViewEvenItemArray";
import { useInView } from "react-intersection-observer";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";
const TrendingStories = ({
  bgColor,
  bgPadding,
  title,
  items,
  imageUrl,
  beautyButton,
  shareText,
  cardTitle,
  cardDescription,
  buttonText,
  buttonPath,
  viewMore,
  position,
  imageAltText,
  id,
  __component,
  promotion_id,
  promotion_name,
}: any) => {
  const isMobile = useMobileCheck();
  const [displayLoader, setLoader] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const viewEventWrapper = useRef();

  const [hasFiredEvent, setHasFiredEvent] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const cookie = new Cookies();
  const { getItem } = useStorage();

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
  const SharehandleClose = () => setShareOpen(false);
  const dataLayer = {
    item_id: items[0]?.path,
    item_name: items?.[0]?.itemsList?.contentType,
    component_id: id,
    widget_type: widget_type,
    item_type: "product",
    widget_title: cardTitle,
    widget_description: cardDescription,
    widget_postion: position,
    no_of_items: items?.length,
    index: 1,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    view_items: ViewArray(items),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  const callEvent = (
    eventName: string,
    linktext: string,
    linkurl?: URL | string,
    itemname?: string
  ) => {
    triggerGAEvent(
      {
        component_id: id,
        item_name: itemname,
        item_id: items[0]?.path,
        widget_type: widget_type,
        item_type: "product",
        widget_title: __component,
        widget_description: cardDescription,
        widget_postion: position,
        link_url: `${global?.window?.location.origin}${linkurl}` || "na",
        link_text: linktext,
        no_of_items: items?.length,
        index: 1,
        item_brand: "na",
        item_category: "na",
        item_category2: "na",
        item_category3: "na",
        event_type: event_type,
      },
      eventName
    );
  };

  const callShareEvent = (linktext: string, itemname?: string) => {
    triggerGAEvent(
      {
        component_id: id,
        item_name: itemname,
        item_id: items[0]?.path,
        widget_type: widget_type,
        item_type: "product",
        widget_title: __component,
        widget_postion: position,
        link_url: "na",
        link_text: linktext,
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

  useEffect(() => {
    if (inView && !hasFiredEvent) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${items
          ?.map((item: any) => `${item?.creative_name}-outer TDS`)
          .join("|")}`,
        creative_slot: `${items
          ?.map((item: any) => `${item?.creative_slot}-outer TDS`)
          .join("|")}`,
        items: items?.map((item: any) => ({
          promotion_id: `${"promotion_id"}-inner TDS`,
          promotion_name: `${"promotion_name"}-inner TDS`,
          creative_name: `${item?.creative_name}-inner TDS`,
          creative_slot: `${item?.creative_slot}-inner TDS`,
        })),
      };
      TriggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true);
    }
  }, [inView, hasFiredEvent, cookie, getItem, items]);

  const callSelectPromotionEvent = (
    creative_name: string,
    creative_slot: string
  ) => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${creative_name}-outer TDS`,
      creative_slot: `${creative_slot}-outer TDS`,
      items: [
        {
          promotion_id: `${promotion_id}-inner TDS`,
          promotion_name: `${promotion_name}-inner TDS`,
          creative_name: `${creative_name}-inner TDS`,
          creative_slot: `${creative_slot}-inner TDS`,
        },
      ],
    };
    TriggerGaViewPromotion("select_promotion", datasLayer);
  };
  return (
    <>
      {displayLoader && <Loader />}
      <Box
        ref={viewEventWrapper}
        bgcolor={bgColor}
        p={isMobile ? "0 4%" : bgPadding}
        mt={"30px"}
      >
        <TitleTypography isMobile={isMobile}>{title}</TitleTypography>
        <Grid
          container
          sx={{
            maxHeight: isMobile ? "" : "540px",
            backgroundColor: "#fff",
            marginTop: isMobile ? "0px" : "16px",
            "@media (max-width: 768px) ": {
              maxHeight: !isMobile ? "" : "540px",
              marginTop: "0px !important",
            },
            "@media (max-width: 820px) ": {
              maxHeight: !isMobile ? "" : "640px",
              marginTop: "0px !important",
            },
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={6}
            xl={6}
            height={isMobile ? "" : "540px"}
          >
            <FirstContentItem isMobile={isMobile}>
              <Grid sx={{ cursor: "pointer", height: isMobile ? "" : "304px" }}>
                <img
                  src={`${ReplaceImage(imageUrl)}`}
                  alt={imageAltText || "Not Found"}
                  width="100%"
                  height={isMobile ? "" : "100%"}
                  vertical-align="bottom"
                  onClick={() => [
                    window.location.assign(
                      `${window.location.origin}${buttonPath}`
                    ),
                    setLoader(true),
                    callEvent("click", cardTitle, buttonPath, beautyButton),
                  ]}
                />
              </Grid>
              <OnlyContentWrapper
                isMobile={isMobile}
                height={isMobile ? "" : "193px"}
              >
                <BeautyButtonAndViewsText isMobile={isMobile}>
                  <BeautyButton>{beautyButton}</BeautyButton>
                </BeautyButtonAndViewsText>

                <Grid>
                  <ImageHeading
                    isMobile={isMobile}
                    onClick={() => window.location.assign(buttonPath)}
                  >
                    {cardTitle}
                  </ImageHeading>
                  <ImageSubHeading sx={{ mb: 2 }}>
                    {cardDescription}
                  </ImageSubHeading>
                </Grid>

                <ReadMoreAndShareText>
                  <ReadMoreTypography
                    isMobile={isMobile}
                    onClick={() => {
                      window.location.assign(
                        `${window.location.origin}${buttonPath}`
                      ),
                        callEvent(
                          "view_all",
                          buttonText,
                          buttonPath,
                          beautyButton
                        );
                    }}
                  >
                    {buttonText}
                  </ReadMoreTypography>
                  <ShareIconAndText
                    onClick={() => {
                      callShareEvent(shareText, beautyButton);
                      SharehandleOpen();
                    }}
                  >
                    <IconButton>
                      <ShareOutlinedIcon sx={{ fontSize: "12px" }} />
                    </IconButton>
                    {!isMobile && (
                      <Typography sx={{ fontSize: "12px" }}>
                        {shareText}
                      </Typography>
                    )}
                  </ShareIconAndText>
                </ReadMoreAndShareText>
              </OnlyContentWrapper>
            </FirstContentItem>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={6} xl={6} ref={ref}>
            {inView ? (
              <InMobileViewGridItems isMobile={isMobile}>
                {items
                  ?.slice(0, isMobile ? 2 : items?.length)
                  .map((itemsList: any) => {
                    return (
                      <>
                        <ThreeImagesAndContent isMobile={isMobile}>
                          <Box
                            style={{
                              display: "flex",
                            }}
                          >
                            <img
                              src={`${ReplaceImage(itemsList?.imageUrl)}`}
                              alt={
                                itemsList?.imageAltText || "Not Found mobile"
                              }
                              style={{
                                width: isMobile ? "100%" : "",
                                cursor: "pointer",
                              }}
                              height={isMobile ? "" : "100%"}
                              onClick={() => [
                                callSelectPromotionEvent(
                                  itemsList?.creative_name,
                                  itemsList?.creative_slot
                                ),
                                window.location.assign(
                                  `${window.location.origin}${itemsList?.imgPath}`
                                ),
                                setLoader(true),
                                callEvent(
                                  "click",
                                  itemsList?.title,
                                  itemsList?.imgPath,
                                  itemsList.contentType
                                ),
                              ]}
                            />
                          </Box>
                          <OnlyContentWrapper isMobile={isMobile}>
                            <BeautyButtonAndViewsText isMobile={isMobile}>
                              <BeautyButton>
                                {itemsList.contentType}
                              </BeautyButton>

                              {!isMobile && (
                                <Box>
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
                                        itemname={itemsList?.contentType}
                                      />
                                    }
                                  />
                                </Box>
                              )}
                            </BeautyButtonAndViewsText>

                            <ThreeImagesHeading isMobile={isMobile}>
                              {itemsList?.title}
                            </ThreeImagesHeading>

                            <SecondReadMoreAndShareText isMobile={isMobile}>
                              <ReadMoreTypography
                                isMobile={isMobile}
                                onClick={() => [
                                  window.location.assign(
                                    `${window.location.origin}${itemsList?.path}`
                                  ),
                                  setLoader(true),
                                  callEvent(
                                    "view_all",
                                    isMobile ? cardTitle : itemsList?.title,
                                    itemsList?.path,
                                    itemsList.contentType
                                  ),
                                ]}
                              >
                                {itemsList?.subText}
                              </ReadMoreTypography>
                              <ShareIconAndText
                                onClick={() => {
                                  callShareEvent(
                                    shareText,
                                    itemsList?.contentType
                                  );
                                  SharehandleOpen();
                                }}
                              >
                                <IconButton>
                                  <ShareOutlinedIcon
                                    sx={{ fontSize: "14px" }}
                                  />
                                </IconButton>
                                {!isMobile && (
                                  <Typography sx={{ fontSize: "14px" }}>
                                    {itemsList?.shareText}
                                  </Typography>
                                )}
                              </ShareIconAndText>
                            </SecondReadMoreAndShareText>
                          </OnlyContentWrapper>
                        </ThreeImagesAndContent>
                      </>
                    );
                  })}
              </InMobileViewGridItems>
            ) : null}
          </Grid>
        </Grid>

        {viewMore && (
          <ViewAllButton
            style={isMobile ? viewAllFrMob : viewAllFrDesk}
            isMobile={isMobile}
            onClick={() =>
              window.location.assign(`${window.location.origin}${buttonPath}`)
            }
          >
            <ViewAllTxt>{viewMore}</ViewAllTxt>
          </ViewAllButton>
        )}
      </Box>
    </>
  );
};
export default TrendingStories;
