import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import {
  StyledGrid,
  BlockGrid,
  InnerBox,
  InnerSmallText,
  GridContainerPosition,
  ViewAllButton,
  MainGrid,
  TitleInsideComponent,
  MainInnerBox,
  TextBox,
  TitleBox,
  fetchBlockRatio,
} from "./OffersGridStyles";
import Title from "../../HOC/Title/Title";
import { GridCardSchema } from "../../schemas/OffersGrid";
import { useMobileCheck } from "../../utility/isMobile";
import { widget_type, event_type } from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import { triggerGAEvent } from "../../utility/GaEvents";
import { viewArray } from "../../utility/ViewEvenItemArray";
import dynamic from "next/dynamic";
import { Cookies } from "react-cookie";
import { useInView } from "react-intersection-observer";
import useStorage from "../../utility/useStoarge";
import triggerGaViewPromotion from "../../utility/GAViewPromotion";
import SkeletonLoader from "./SkeletonLoader";

const OffersGridImages = dynamic(() => import("./OffersGridImages"), {
  ssr: false,
});

function GridCards({
  items,
  mobileItems,
  bgPadding,
  bgColor,
  viewMore,
  title,
  titleColor,
  itemPaddingBottomMobile,
  itempaddingXMobile,
  itemBackgroundSpacing,
  mobileColumns,
  desktopColumns,
  cardBorder,
  itemPaddingBottom,
  itemPaddingX,
  showGradient,
  showTextOnHover,
  viewMoreLink,
  position,
  marginLeft,
  viewMoreWeb,
  viewMoreMobile,
  id,
  __component,
  disableGenericBottomSpace,
  promotion_id,
  promotion_name
}: GridCardSchema) {
  const isMobile = useMobileCheck();
  const [indexValue, setIndexValue] = useState(-1);
  const [dataItems, setDataItems] = useState(isMobile ? items : mobileItems);
  const [isFlipped, setIsFlipped] = useState<any>(false);
  const [isVisible, setIsVisible] = useState(false); 
  const viewEventWrapper = useRef();
  const [hasFiredEvent, setHasFiredEvent] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [visibleCount, setVisibleCount] = useState(0);
  const [firstNonZeroDiff, setFirstNonZeroDiff] = useState<number | null>(null);
  const gridItemRefs = useRef([]); 

  const cookie = new Cookies();
  const { getItem } = useStorage();
  const gridRef = useRef(null);
  
 useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      let newVisibleCount = 0;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index, 10);
          newVisibleCount = Math.max(newVisibleCount, index + 1);
        }
      });
     
      setVisibleCount((prev) => {
        const diff = newVisibleCount - prev; 
        if (diff > 0 && firstNonZeroDiff === null) {
          setFirstNonZeroDiff(diff); 
        }

        return Math.max(prev, newVisibleCount);
      });
    },
    { threshold: 0.25 }
  );

  // Observe each grid item
  gridItemRefs.current.forEach((ref) => {
    if (ref) observer.observe(ref);
  });
  return () => {
    gridItemRefs.current.forEach((ref) => {
      if (ref) observer.unobserve(ref);
    });
  };
}, [dataItems]);

  useEffect(() => {
    setDataItems(isMobile ? mobileItems : items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);
  const mediaQueryCheck = useMobileCheck("(min-width : 900px )");

  useEffect(() => {
    if (visibleCount > 0  ) {
      const startIndex = (visibleCount - firstNonZeroDiff)
      const endIndex = visibleCount;

      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${dataItems
          ?.slice(startIndex, endIndex)
          .map((item) => `${item?.creative_name}-outer OFGRID`)
          .join("|")}`,
        creative_slot: `${dataItems
          ?.slice(startIndex, endIndex)
          .map((item) => `${item?.creative_slot}-outer OFGRID`)
          .join("|")}`,
          ecommerce: {
            items: dataItems
            ?.slice(startIndex, endIndex)
            .map((item, index) => ({
              promotion_id: `${promotion_id}-inner OFGRID`,
              promotion_name: `${promotion_id}-inner OFGRID`,
              creative_name: `${item?.creative_name}-inner OFGRID`,
              creative_slot: `${item?.creative_slot}-inner OFGRID`,
            })),
          }
      };
      
      triggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true); 
    }
  }, [ visibleCount, isMobile , firstNonZeroDiff]);
  const mouseEnter = (index: any, isFlipActive: any) => {
    setIndexValue(index);
    if (isFlipActive) {
      setIsFlipped(isFlipActive);
    }
  };
  const mouseLeave = (index: any, isFlipActive: any) => {
    if (index == indexValue) {
      setIsFlipped(!isFlipped);
    }
  };
  const handleClickRedirection = (
    isNewTab: boolean,
    path: URL | string,
    index: number,
    imageUrl: string,
    isFlipActive: boolean,
    itemsData:any
  ) => {
    const isNewTabChecking = isNewTab
      ? path && window?.open(path)
      : path && window.location.assign(`${path}`);
    callEvent(index, imageUrl, path, itemsData);
    if (isMobile && isFlipActive) {
      setIndexValue(index);
      setIsFlipped(isFlipActive);
      if (indexValue == index) {
        return isNewTabChecking;
      }
    } else {
      return isNewTabChecking;
    }
    return null;
  };

  const callEvent = (index: number, imageUrl?: string, path?: URL | string, itemsData: any) => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${itemsData?.creative_name}-outer OFGRID`,
      creative_slot: `${itemsData?.creative_slot}-outer OFGRID`,
      ecommerce: {
      items: [
        {
          promotion_id: `${promotion_id}-inner OFGRID`,
          promotion_name: `${promotion_id}-inner OFGRID`,
          creative_name: `${itemsData?.creative_name}-outer OFGRID`,
          creative_slot: `${itemsData?.creative_name}-outer OFGRID`,
        }
      ]
    }
    };
    triggerGaViewPromotion("select_promotion", datasLayer);
  };

  const callViewall = (index?: number, path?: string) => {
    triggerGAEvent(
      {
        widget_type: widget_type,
        component_id: id,
        item_type: items[0]?.Item_type,
        item_name: items[0]?.Item_name,
        widget_title: __component,
        widget_description: "na",
        widget_postion: position,
        link_url: `${global?.window?.location?.origin}${viewMoreLink}`,
        link_text: viewMore,
        no_of_items: dataItems?.length,
        item_brand: "na",
        item_category: "na",
      },
      "view_item_list"
    );
  };
  function paddingBottomFunc() {
    if (isMobile) {
      return "12px";
    } else {
      if (disableGenericBottomSpace) {
        return "0px";
      } else {
        return "20px";
      }
    }
  }
  return (
    <>
      <MainGrid  
        p={isMobile ? "12px 16px" : bgPadding}
        sx={{
          paddingBottom: paddingBottomFunc(),
        }}
        bgcolor={bgColor}
      >
        <TitleInsideComponent
          titleColor={titleColor}
          ref={viewEventWrapper}
        ></TitleInsideComponent>
        {title && (
          <TitleBox>
            <Title interface={{ title: title, bgColor: bgColor }} />
          </TitleBox>
        )}
         {isVisible ? (
        <SkeletonLoader />
      ) : (
        <GridContainerPosition
          container
          spacing={isMobile ? "8px" : itemBackgroundSpacing || 0}
          mt={0}
          aria-label="parent-grid"
          ref={ref}
        >
          {dataItems?.map((itemsData: any, index: number, originalList) => {
            const mobileAspects =
              index + 1 === originalList?.length &&
              originalList?.length % 2 === 1
                ? 12
                : 12 / mobileColumns;
            return (
              <>
                <StyledGrid
                  item
                  // xs={12 / mobileColumns}
                  // sm={12 / mobileColumns}
                  xs={mobileAspects}
                  sm={mobileAspects}
                  md={12 / desktopColumns}
                  lg={12 / desktopColumns}
                  aria-label="styled"
                  key={itemsData?.text}
                  ref={(el) => (gridItemRefs.current[index] = el)} 
                  data-index={index}
                  onClick={() => {
                    handleClickRedirection(
                      itemsData?.isNewTab,
                      itemsData?.path,
                      index,
                      itemsData?.imageUrl,
                      itemsData?.isFlipActive,
                      itemsData
                    );
                  }}
                  onMouseEnter={() =>
                    !isMobile &&
                    itemsData?.isFlipActive &&
                    mouseEnter(index, itemsData?.isFlipActive)
                  }
                  onMouseLeave={() =>
                    !isMobile &&
                    itemsData?.isFlipActive &&
                    mouseLeave(index, itemsData?.isFlipActive)
                  } 
                >
                  {(itemsData?.flipImageUrl ||
                    itemsData?.flipMobileImageUrl ||
                    itemsData?.imageUrl) && (
                    <OffersGridImages
                      isFlipped={isFlipped}
                      indexValue={indexValue}
                      index
                      isFlipActive={itemsData?.isFlipActive}
                      imageUrl={itemsData?.imageUrl}
                      text={itemsData?.text}
                      cardBorder={cardBorder}
                      itemPaddingBottom={itemPaddingBottom}
                      flipMobileImageUrl={itemsData?.flipMobileImageUrl}
                      flipImageUrl={itemsData?.flipImageUrl}
                      allowLastOddItemToBeCentered={
                        mediaQueryCheck
                          ? false
                          : index + 1 === originalList?.length &&
                            originalList?.length % 2 === 1
                      }
                    />
                  )}
                  {(isMobile ||
                    !showTextOnHover ||
                    (indexValue == index && showTextOnHover)) && (
                    <Grid container>
                      <BlockGrid
                        ml={isMobile ? 1 : marginLeft}
                        sx={{
                          padding:
                            mediaQueryCheck &&
                            originalList?.length % 2 === 1 &&
                            index + 1 === originalList?.length
                              ? `0px ${
                                  (global?.window?.innerWidth / 100) *
                                  fetchBlockRatio(global?.window?.innerWidth)
                                }px`
                              : "0px",
                        }}
                      >
                        <MainInnerBox
                          mb={
                            isMobile
                              ? itemPaddingBottomMobile
                              : itemPaddingBottom
                          }
                          mx={
                            isMobile && mobileColumns > 1
                              ? itempaddingXMobile
                              : itemPaddingX
                          }
                          showGradient={showGradient}
                          offerBackground={itemsData?.offerBackground}
                          py={
                            isMobile
                              ? itemsData?.MobiletextPaddingY
                              : itemsData?.WebtextPaddingY
                          }
                          px={
                            isMobile
                              ? itemsData?.MobiletextPaddingX
                              : itemsData?.WebtextPaddingX
                          }
                        >
                          {itemsData?.text && (
                            <InnerBox
                              sx={{ visibility: "hidden" }}
                              variant="body1"
                              $textColor={itemsData?.textColor}
                              $isSubTextAvailable={
                                itemsData?.subText ? true : false
                              }
                            >
                              {itemsData?.text}
                            </InnerBox>
                          )}
                          {itemsData?.subText && (
                            <InnerSmallText
                              sx={{ visibility: "hidden" }}
                              $subTextColor={itemsData?.subTextColor}
                              variant="subtitle1"
                              $columnNumbers={desktopColumns}
                            >
                              {itemsData?.subText}
                            </InnerSmallText>
                          )}
                        </MainInnerBox>
                        <TextBox
                          py={
                            isMobile
                              ? itemsData?.MobiletextPaddingY
                              : itemsData?.WebtextPaddingY
                          }
                          px={
                            isMobile
                              ? itemsData?.MobiletextPaddingX
                              : itemsData?.WebtextPaddingX
                          }
                          mb={
                            isMobile
                              ? itemPaddingBottomMobile
                              : itemPaddingBottom
                          }
                        >
                          {itemsData?.text && (
                            <InnerBox
                              variant="body1"
                              $textColor={itemsData?.textColor}
                              $isSubTextAvailable={
                                itemsData?.subText ? true : false
                              }
                            >
                              {itemsData?.text}
                            </InnerBox>
                          )}
                          {itemsData?.subText && (
                            <InnerSmallText
                              $subTextColor={itemsData?.subTextColor}
                              variant="subtitle1"
                              $columnNumbers={desktopColumns}
                            >
                              {itemsData?.subText}
                            </InnerSmallText>
                          )}
                        </TextBox>
                      </BlockGrid>
                    </Grid>
                  )}
                </StyledGrid>
              </>
            );
          })}
          {((isMobile && viewMoreMobile) || (!isMobile && viewMoreWeb)) && (
            <ViewAllButton
              onClick={() => {
                viewMoreLink &&
                  window.location.assign(
                    `${window.location.origin}${viewMoreLink}`
                  );
                callViewall();
              }}
              $backColor={bgColor}
            >
              {viewMore}
            </ViewAllButton>
          )}
        </GridContainerPosition>
      )}
      </MainGrid>
    </>
  );
}
export default GridCards;