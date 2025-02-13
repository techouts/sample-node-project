import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BlogComponentOneInterface from "../../schemas/BlogComponentOne";
import {
  TitleBox,
  SecondGrid,
  ThirdGrid,
  LastBox,
  SubTitleTypogaphy,
  ShareIconBox,
  ReadMore,
  ButtonStyled,
  ButtonStyle,
  viewAllFrMob,
  viewAllFrDesk,
} from "./BlogThumbnailStyle";
import { useMobileCheck } from "../../utility/isMobile";
import BasicModal from "../../HOC/Modal/ModalBlock";
import ShareInfo from "../PdpCardComponent/SharePopUp/ShareInfo";
import Sharedata from "../../components/PdpCardComponent/SharePopUp/ShareData.json";
import { useState, useRef, useEffect } from "react";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { useRouter } from "next/router";
import Loader from "../../HOC/Loader/Loader";
import {
  event_type,
  widget_type,
  share_event_type,
} from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";
import ViewEvent from "../../utility/viewEvent";
import { viewArray } from "../../utility/ViewEvenItemArray";
import triggerGaViewPromotion from "../../utility/GAViewPromotion";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";

const BlogThumbnail = ({
  bgPadding,
  bgColor,
  title,
  items,
  viewMore,
  position,
  viewMorePath,
  id,
  __component,
  promotion_id,
  promotion_name,
}: BlogComponentOneInterface) => {
 
  const [triggeredItems, setTriggeredItems] = useState(new Set());
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const [previousVisibleIds, setPreviousVisibleIds] = useState(new Set());
  const isMobile = useMobileCheck();
  const [shareOpen, setShareOpen] = useState(false);
  const [displayLoader, setLoader] = useState(false);
  const router = useRouter();
  const viewEventWrapper = useRef();
  const gridItemRefs = useRef([]);
  const isInteractingRef = useRef(false);
  const cookie = new Cookies();
  const { getItem } = useStorage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index, 10);

          if (entry.isIntersecting && !triggeredItems.has(index)) {
            setTriggeredItems((prev) => new Set(prev).add(index));
            setVisibleIndexes((prev) => {
              const newValue = [...prev, index];
              if (newValue.length % 2 === 0) {
                const newSet = newValue.slice(-2);
                return newSet; 
              }
              return newValue; 
            });
          
          }
        });
      },
      { threshold: 0.25 }
    );

    gridItemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => {
      gridItemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [triggeredItems]);

  useEffect(() => {
    if (isInteractingRef.current) return;
    if ((visibleIndexes.length === 2) && items?.length > 0) {
      const uniqueVisibleIndexes = [...new Set(visibleIndexes)];

      const visibleItems = items.filter((item, index) => uniqueVisibleIndexes.includes(index));
      const newVisibleItems = visibleItems.filter(item => !previousVisibleIds.has(item.id));

      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: visibleItems
          .map((item) => `${item?.creative_name}-outer BThumb`)
          .join("|"),
        creative_slot: visibleItems
          .map((item) => `${item?.creative_slot}-outer BThumb`)
          .join("|"),
        ecommerce: {
          items: visibleItems.map((item) => ({
            promotion_id: `${promotion_id}-inner BThumb`,
            promotion_name: `${promotion_name}-inner BThumb`,
            creative_name: `${item?.creative_name}-inner BThumb`,
            creative_slot: `${item?.creative_slot}-inner BThumb`,
          })),
        },
      };
      
      triggerGaViewPromotion("view_promotion", datasLayer);
    }
  }, [visibleIndexes, items, promotion_id, promotion_name, cookie, getItem]);

  const SharehandleOpen = (titleName: any) => {
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
  const callGaEvent = (
    eventName: string,
    link_text: string,
    linkurl?: URL | string
  ) => {
    isInteractingRef.current = true;
    triggerGAEvent(
      {
        item_name: items?.[0]?.Item_name,
        item_id: `${__component}_${position}`,
        component_id: id,
        widget_type: widget_type,
        item_type: items?.[0]?.Item_type,
        widget_title: __component,
        widget_description: "na",
        widget_position: position,
        no_of_items: items?.length,
        item_brand: "na",
        item_category: "na",
        item_rating: "na",
        event_type: event_type,
        item_category2: "na",
        item_category3: "na",
        link_text: link_text,
        creative_name: `${items?.creative_name}-outer BThumb`,
        creative_slot: `${items?.creative_slot}-outer BThumb`,
        ecommerce: {
          items: [
            {
            promotion_id: `${promotion_id}-inner BThumb`,
            promotion_name: `${promotion_id}-inner BThumb`,
            creative_name: `${item?.creative_name}-inner BThumb`,
            creative_slot: `${item?.creative_slot}-inner BThumb`,
            }
          ]
        },
        link_url: `${global?.window?.location.origin}${linkurl}`,
      },
     "select_promotion"
    );
    setTimeout(() => {
      isInteractingRef.current = false; // Reset after interaction
    }, 0);
  };
  const callShareEvent = (linktext: string, itemname: string) => {
    triggerGAEvent(
      {
        item_name: itemname,
        item_id: `${__component}_${position}`,
        component_id: id,
        widget_type: widget_type,
        item_type: "share",
        widget_title: __component,
        widget_description: "na",
        widget_position: position,
        no_of_items: items?.length,
        item_brand: "na",
        item_category: "na",
        item_rating: "na",
        event_type: share_event_type,
        item_category2: "na",
        item_category3: "na",
        link_text: linktext,
        link_url: "na",
        method: "FACEBOOK / WHATSAPP / PINTREST / EMAIL",
      },
      "share"
    );
  };
 
  return (
    <>
      {displayLoader && <Loader />}
      <Box
        p={isMobile ? "0% 2%" : bgPadding}
        bgcolor={bgColor}
        ref={viewEventWrapper}
      >
        <TitleBox>{title}</TitleBox>
        <ImageList variant="masonry" cols={2} gap={16}>
          {items?.map((blogs: any, index: number) => {
            return (
              <ImageListItem
                key={index}
                sx={{ width: "100%", cursor: "pointer" }}
                data-index={index}
                ref={(el) => (gridItemRefs.current[index] = el)}
              >
                <Box
                  onClick={() => {
                    callGaEvent("select_promotion", "Palettes", blogs?.imgPath);
                    return [router?.push(blogs?.imgPath), setLoader(true)];
                  }}
                >
                  <img
                    srcSet={ReplaceImage(blogs?.imageUrl)}
                    alt={blogs?.imageAltText || "image"}
                    width="100%"
                  />
                </Box>
                <Box
                  sx={{
                    background: "#FFF",
                    boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <SecondGrid>
                    <ButtonStyled> {blogs?.button}</ButtonStyled>
                  </SecondGrid>
                  <ThirdGrid>
                    <SubTitleTypogaphy
                      onClick={() => [
                        router?.push(blogs?.imgPath),
                        setLoader(true),
                      ]}
                    >
                      {blogs?.subTitle}
                    </SubTitleTypogaphy>
                    {!isMobile && (
                      <ShareIconBox
                        onClick={() => {
                          SharehandleOpen(blogs?.subTitle);
                          callShareEvent(blogs?.shareText, blogs?.button);
                        }}
                      >
                        <Box>
                          <img
                            src={`${ReplaceImage(blogs?.shareIcon)}`}
                            alt="shareIcon"
                            width="12px"
                          />
                        </Box>
                        <Typography sx={{ fontSize: "12px" }}>
                          {blogs?.shareText}
                        </Typography>
                      </ShareIconBox>
                    )}
                  </ThirdGrid>
                  <LastBox>
                    <ReadMore
                      onClick={() => [
                        router?.push(blogs?.readMorepath),
                        setLoader(true),
                        callGaEvent(
                          "view_all",
                          blogs?.readMore,
                          blogs?.readMorepath
                        ),
                      ]}
                    >
                      {blogs?.readMore}
                    </ReadMore>
                    <img
                      src={`${ReplaceImage(blogs?.shareIcon)}`}
                      alt="shareIcon"
                      width="12px"
                      onClick={SharehandleOpen}
                    />
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
                  </LastBox>
                </Box>
              </ImageListItem>
            );
          })}
        </ImageList>
        {viewMore && (
          <Box p="0 0 25px 0">
            <ButtonStyle
              style={isMobile ? viewAllFrMob : viewAllFrDesk}
              onClick={() => [
                router?.push(viewMorePath),
                callGaEvent("viewall", viewMore, viewMorePath),
              ]}
            >
              {viewMore}
            </ButtonStyle>
          </Box>
        )}
      </Box>
    </>
  );
};
export default BlogThumbnail;
