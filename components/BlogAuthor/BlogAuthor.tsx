import { Box } from "@mui/system";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMobileCheck } from "../../utility/isMobile";
import BlogAuthorSchema from "../../schemas/BlogAuthorSchema";
import {
  Typographysubtitle,
  GridImages,
  Boxfield,
  Buttontext,
  Typographytitle,
  Typographyread,
  BoxShare,
  ShareButton,
  BoxShadow,
  BoxShow,
  Typographypara,
} from "../BlogAuthor/BlogAuthorStyles";
import BasicModal from "../../HOC/Modal/ModalBlock";
import ShareInfo from "../PdpCardComponent/SharePopUp/ShareInfo";
import Sharedata from "../../components/PdpCardComponent/SharePopUp/ShareData.json";
import { ReplaceImage } from "../../utility/ReplaceImage";
import Loader from "../../HOC/Loader/Loader";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import triggerGAEvent from "../../utility/GaEvents";
import {
  event_Type,
  event_type,
  share_event_type,
  widget_type,
} from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import { viewArray } from "../../utility/ViewEvenItemArray";
import ImageRendering from "./BlogAuthorImageRendering";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";

const BlogAuthor = ({
  bgPadding,
  items,
  title,
  position,
  viewAllPath,
  viewAllText,
  sortByBottom,
  __component,
  id,
  promotion_id,
  promotion_name,
}: BlogAuthorSchema) => {
  const socialMediaNames = Sharedata?.data?.socialMedia?.map(
    (socialIconItems) => socialIconItems?.mediaName
  );
  const [idValue, setIdValue] = useState<any>();
  const viewEventWrapper = useRef();
  let reversed_array: any = [];
  items.forEach((element: any) => {
    reversed_array.unshift(element);
  });
  const finalItems = sortByBottom ? reversed_array : items;
  const isMobile = useMobileCheck();
  const router = useRouter();
  const [shareOpen, setShareOpen] = useState(false);
  const [displayLoader, setLoader] = useState(false);
  const [show, setShow] = useState(true);
  const [videoOpen, setVideoOpen] = useState(false);
  const [hasFiredEvent, setHasFiredEvent] = useState(false);

  const cookie = new Cookies();
  const { getItem } = useStorage();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  useEffect(() => {
    if (idValue == null) {
      return;
    }
    setIdValue(null);
  }, [router]);

  useEffect(() => {
    if (inView && !hasFiredEvent) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${items
          ?.map((item: any) => `${item?.creative_name}-outer BA`)
          .join("|")}`,
        creative_slot: `${items
          ?.map((item: any) => `${item?.creative_slot}-outer BA`)
          .join("|")}`,

        items: finalItems?.map((item: any) => ({
          promotion_id: `${promotion_id}-inner BA`,
          promotion_name: `${promotion_name}-inner BA`,
          creative_name: `${item?.creative_name}-inner BA`,
          creative_slot: `${item?.creative_slot}-inner BA`,
        })),
      };
      TriggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true);
    }
  }, [inView, hasFiredEvent, cookie, getItem, id, __component, finalItems]);
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
  const CMSImageUrl = process.env.NEXT_PUBLIC_S3_URL;
  const VECTORIMAGE = `${CMSImageUrl}/Blog_Share_b52fcc13ac.png`;
  const shareText = "SHARE";
  const dataLayer = {
    item_id: "na",
    item_name: "na",
    widget_type: widget_type,
    item_type: "na",
    component_id: id ? id : "na",
    widget_title: __component,
    widget_description: items[0]?.subTitle,
    widget_postion: position,
    no_of_items: items?.length,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    index: position,
    view_items: viewArray(items, `${__component}_${position}_`),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");
  const callEvent = (
    eventName: string,
    linktext: string,
    method?: string,
    linkurl?: URL | string
  ) => {
    triggerGAEvent(
      {
        widget_type: widget_type,
        widget_title: __component,
        widget_description: items[0]?.subTitle,
        widget_postion: position,
        link_url: `${global?.window?.location.origin}${linkurl}`,
        link_text: linktext,
        no_of_items: items?.length,
        index: 1,
        item_brand: "na",
        item_type: "na",
        item_category: "na",
        component_id: id || "na",
        event_type: event_Type,
      },
      eventName
    );
  };
  const callShareEvent = (
    eventName: string,
    method: string,
    itemType: string,
    itemName: string,
    imagePath: string,
    id: number
  ) => {
    triggerGAEvent(
      {
        widget_type: widget_type,
        widget_title: __component,
        widget_description: items[0]?.subTitle,
        widget_postion: position,
        link_url: imagePath
          ? `${global?.window?.location.origin}${imagePath}`
          : "na",
        link_text: eventName ? eventName : "na",
        no_of_items: items?.length,
        index: 1,
        item_name: itemName ? itemName : "na",
        item_type: itemType ? itemType : "na",
        method: socialMediaNames ? socialMediaNames : "na",
        outbound: true,
        component_id: id ? id : "na",
        event_type: share_event_type,
        item_id: `${__component}_${position}`,
        item_category: "na",
        item_category2: "na",
        item_category3: "na",
      },
      eventName
    );
  };
  const callHyperlinkevent = (
    eventName: string,
    linktext: string,
    linkurl?: URL | string
  ) => {
    triggerGAEvent(
      {
        widget_description: items[0]?.subTitle,
        link_url: `${global?.window?.location.origin}${linkurl}`,
        link_text: linktext,
      },
      eventName
    );
  };
  function lengthOfItems(items: any) {
    if (items?.length % 2 == 0) {
      return items?.length;
    } else {
      return items?.length - 1;
    }
  }
  const sliceItems = useMemo(
    () => (isMobile ? lengthOfItems(items) : items.length),
    [items, isMobile]
  );
  function viewAllTextFunc(viewAllText: any) {
    if (isMobile) {
      if (viewAllText) {
        return "space-between";
      } else {
        return "center";
      }
    } else {
      return "center";
    }
  }
  return (
    <>
      {" "}
      {displayLoader && <Loader />}
      <Box
        ref={viewEventWrapper}
        width={"100%"}
        p={isMobile ? "16px" : bgPadding}
      >
        {" "}
        <Box mt={"5px"} mb={"5px"}>
          {" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: viewAllTextFunc(viewAllText),
              alignItems: "center",
              paddingLeft: viewAllText ? "6%" : "",
            }}
          >
            {!isMobile && <Box></Box>}
            {title && (
              <Typographysubtitle isMobile={isMobile}>
                {title}
              </Typographysubtitle>
            )}
            {!isMobile && viewAllText && (
              <Typography
                sx={{
                  height: "24px",
                  fontWeight: 500,
                  fontSize: isMobile ? "12px" : "16px",
                  textDecorationLine: "underline",
                  paddingRight: "5px",
                  color: "#AD184C",
                }}
                onClick={() => {
                  setLoader(true);
                  router.push(viewAllPath);
                  callEvent("view_all", "ViewAll", "", viewAllPath);
                }}
              >
                {" "}
                {viewAllText} &gt;
              </Typography>
            )}
          </Box>{" "}
        </Box>{" "}
        <Box ref={ref}>
          {inView && (
            <GridImages isMobile={isMobile}>
              {" "}
              {finalItems
                ?.slice(0, sliceItems)
                ?.map((item: any, index: number) => {
                  return (
                    <>
                      {" "}
                      <Box m={"5px 5px"} bgcolor="#F5F5F5">
                        {" "}
                        <Box>
                          <ImageRendering
                            isVideo={item?.isVideo}
                            index={index}
                            items={items}
                            __component={__component}
                            position={position}
                            id={id}
                            show={show}
                            setShow={setShow}
                            videoOpen={videoOpen}
                            setVideoOpen={setVideoOpen}
                            idValue={idValue}
                            setIdValue={setIdValue}
                            videoUrl={item?.videoUrl}
                            mobileImageUrl={item?.mobileImageUrl}
                            imageUrl={item?.imageUrl}
                            imgPath={item?.imgPath}
                            imageAltText={item?.imageAltText}
                            linkText={item?.title}
                            itemName={item?.chiptext}
                            widgetDescription={item?.subTitle}
                            cookie={cookie}
                            getItem={getItem}
                            promotion_id={promotion_id}
                            promotion_name={promotion_name}
                            item={item}
                          />
                        </Box>
                        <BoxShadow
                          isVideo={item?.isVideo}
                          isMobile={isMobile}
                          positiontype={position}
                        >
                          {item?.position && (
                            <Boxfield
                              isMobile={isMobile}
                              positiontype={position}
                            >
                              <Box>
                                {!isMobile && (
                                  <Buttontext>{item?.chiptext}</Buttontext>
                                )}
                              </Box>
                            </Boxfield>
                          )}
                          <Box>
                            <Typographytitle
                              isMobile={isMobile}
                              positiontype={position}
                            >
                              {item?.title}
                            </Typographytitle>
                            {!isMobile && (
                              <Typographypara mt={"10px"}>
                                {item?.subTitle}
                              </Typographypara>
                            )}
                          </Box>
                          <BoxShow positiontype={position} isMobile={isMobile}>
                            <Box>
                              <Typographyread
                                positiontype={position}
                                onClick={() => {
                                  router?.push(item?.readMorePath);
                                  setLoader(true);
                                  callHyperlinkevent(
                                    "hyperlink",
                                    "Readmore",
                                    item?.readMorePath
                                  );
                                }}
                              >
                                {item?.readMoreText}
                              </Typographyread>
                            </Box>
                            <Box>
                              {item?.isSharable && (
                                <>
                                  <BoxShare
                                    onClick={() => {
                                      callShareEvent(
                                        "share",
                                        item?.linktext,
                                        item?.Item_type,
                                        item?.Item_name,
                                        item?.imgPath,
                                        item?.id
                                      );
                                      SharehandleOpen();
                                    }}
                                  >
                                    <img
                                      src={`${ReplaceImage(VECTORIMAGE)}`}
                                      alt="vector-image"
                                    />
                                    {!isMobile && (
                                      <ShareButton>{shareText}</ShareButton>
                                    )}
                                  </BoxShare>
                                </>
                              )}
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
                                      />
                                    }
                                  />
                                </Box>
                              )}
                            </Box>
                          </BoxShow>
                        </BoxShadow>
                      </Box>
                    </>
                  );
                })}
            </GridImages>
          )}
        </Box>
        {isMobile && viewAllText && (
          <Grid
            item
            lg={5}
            md={5}
            sx={{
              height: "24px",
              fontWeight: 500,
              fontSize: "12px",
              textAlign: "center",
              textDecorationLine: "underline",
              color: "#AD184C",
              paddingTop: "15px",
            }}
            onClick={() => {
              setLoader(true);
              router.push(viewAllPath);
            }}
          >
            {viewAllText} &gt;
          </Grid>
        )}
      </Box>
    </>
  );
};
export default BlogAuthor;