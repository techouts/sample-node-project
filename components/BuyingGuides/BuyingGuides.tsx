import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  BuyingGuideInterface,
  ITEMS_LIST,
} from "../../schemas/BuyingGuidesSchema";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  Styledimage,
  SubTitleTypography,
  ViewAllbutton,
  MainBox,
  StyledGrid,
  TitleTypography,
  SubTitle,
  StyledBox,
  BoxStyled,
} from "./Styles";
import { useRouter } from "next/router";
import { useMobileCheck } from "../../utility/isMobile";
import Carousel from "../../HOC/Carousel/Carousel2";
import Title from "../../HOC/Title/Title";
import ViewEvent from "../../utility/viewEvent";
import { widget_type, event_type } from "../../utility/GAConstants";
import { useEffect, useRef, useState } from "react";
import triggerGAEvent from "../../utility/GaEvents";
import { viewArray } from "../../utility/ViewEvenItemArray";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import { useInView } from "react-intersection-observer";

export const MsiteCarousel = ({
  imageUrl,
  text,
  mobileTitle,
  isNewtab,
  path,
  textColor,
  promotion_id,
  promotion_name,
  creative_name,
  creative_slot,
}: ITEMS_LIST) => {
  const router = useRouter();

  const cookie = new Cookies();
  const { getItem } = useStorage();

  const callSelectPromotionEvent = () => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${creative_name}-outer BGDM`,
      creative_slot: `${creative_slot}-outer BGDM`,
      items: [
        {
          promotion_id: `${promotion_id}-inner BGDM`,
          promotion_name: `${promotion_name}-inner BGDM`,
          creative_name: `${creative_name}-inner BGDM`,
          creative_slot: `${creative_slot}-inner BGDM`,
        },
      ],
    };
    TriggerGaViewPromotion("select_promotion", datasLayer);
  };

  const handleClickRedirection = (isNewTab: boolean, path: URL | string) => {
    callSelectPromotionEvent();
    if (isNewTab) {
      window?.open(path);
    } else {
      router.push(path);
    }
  };
  return (
    <StyledGrid onClick={() => handleClickRedirection(isNewtab, path)}>
      <Styledimage alt={text} src={`${ReplaceImage(imageUrl)}`} />
      <BoxStyled>
        <TitleTypography $textColor={textColor}>{mobileTitle}</TitleTypography>
        <SubTitle ismobile={true}>{text}</SubTitle>
      </BoxStyled>
    </StyledGrid>
  );
};

const BuyingGuides = ({
  items,
  viewMore,
  title,
  bgColor,
  bgPadding,
  viewMoreLink,
  position,
  id,
  __component,
  promotion_id,
  promotion_name,
}: BuyingGuideInterface) => {
  const isMobile = useMobileCheck();
  const router = useRouter();
  const [hasFiredEvent, setHasFiredEvent] = useState(false);
  const viewEventWrapper = useRef();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });
  const [mobileCarouselRef, mobileInView] = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const cookie = new Cookies();
  const { getItem } = useStorage();

  useEffect(() => {
    if (inView && !hasFiredEvent) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${items
          ?.map((item: any) => `${item?.creative_name}-outer BGDW`)
          .join("|")}`,
        creative_slot: `${items
          ?.map((item: any) => `${item?.creative_slot}-outer BGDW`)
          .join("|")}`,
        items: items?.map((item: any) => ({
          promotion_id: `${promotion_id}-inner BGDW`,
          promotion_name: `${promotion_name}-inner BGDW`,
          creative_name: `${item?.creative_name}-inner BGDW`,
          creative_slot: `${item?.creative_slot}-inner BGDW`,
        })),
      };
      TriggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true);
    }
  }, [inView, hasFiredEvent, cookie, getItem, id, __component, items]);

  const initialSlides = isMobile ? 2 : 4;
  let newVisibleProducts: any = [];

  const trackGAEvent = (index: number) => {
    const roundedIndex = Math.round(index);
    const startIndex = roundedIndex;
    const endIndex = Math.min(roundedIndex + initialSlides, items.length);

    const visibleProducts = items.slice(startIndex, endIndex);

    const newItems = visibleProducts.filter(
      (item) => !newVisibleProducts.includes(item)
    );

    newVisibleProducts = [...newVisibleProducts, ...newItems];

    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${items
        ?.map((item: any) => `${item?.creative_name}-outer BGDM`)
        .join("|")}`,
      creative_slot: `${items
        ?.map((item: any) => `${item?.creative_slot}-outer BGDM`)
        .join("|")}`,
      items: newItems?.map((item: any) => ({
        promotion_id: `${promotion_id}-inner BGDM`,
        promotion_name: `${promotion_name}-inner BGDM`,
        creative_name: `${item?.creative_name}-inner BGDM`,
        creative_slot: `${item?.creative_slot}-inner BGDM`,
      })),
    };
    TriggerGaViewPromotion("view_promotion", datasLayer);
  };

  const handleClickRedirection = (
    isNewTab: boolean,
    path: URL | string,
    index: number
  ) => {
    if (isNewTab) {
      window?.open(path);
    } else {
      router.push(path);
    }
  };
  const userSettings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 2.1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  const dataLayer = {
    item_id: "na",
    widget_type: widget_type,
    component_id: id,
    item_type: "na",
    item_name: "na",
    widget_title: __component,
    widget_description: "na",
    widget_postion: position,
    no_of_items: items?.length,
    index: position,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    view_items: viewArray(items, `${__component}_${position}_`),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  const callEvent = (imageUrl: string, index?: any, linktext?: string) => {
    triggerGAEvent(
      {
        item_name: items[0]?.Item_name,
        item_id: `${__component}_${position}_${index + 1}`,
        widget_type: widget_type,
        item_type: items[0]?.Item_type,
        widget_title: __component,
        widget_description: "na",
        widget_postion: position,
        link_url: `${global?.window?.location?.origin}${items[0]?.path}`,
        link_text: linktext,
        no_of_items: items?.length,
        index: index + 1,
        item_brand: "na",
        item_category: "na",
        item_category2: "na",
        item_category3: "na",
        item_image_link: imageUrl,
        item_orginal_price: 0,
        item_price: 0,
        item_rating: "na",
        event_type: event_type,
      },
      "click"
    );
  };

  const callViewall = () => {
    triggerGAEvent(
      {
        widget_type: widget_type,
        widget_title: __component,
        widget_description: "na",
        widget_postion: position,
        link_url: `${global?.window?.location?.origin}${viewMoreLink}`,
        link_text: viewMore,
        no_of_items: items?.length,
        item_brand: "na",
        item_category: "na",
        item_type: items[0]?.Item_type,
        content_type: "product",
      },
      "view_all"
    );
  };

  const callSelectPromotionEvent = (
    creative_name: string,
    creative_slot: string
  ) => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${creative_name}-outer BGDW`,
      creative_slot: `${creative_slot}-outer BGDW`,
      items: [
        {
          promotion_id: `${promotion_id}-inner BGDW`,
          promotion_name: `${promotion_name}-inner BGDW`,
          creative_name: `${creative_name}-inner BGDW`,
          creative_slot: `${creative_slot}-inner BGDW`,
        },
      ],
    };
    TriggerGaViewPromotion("select_promotion", datasLayer);
  };

  return (
    <MainBox
      p={isMobile ? "0 16px" : bgPadding}
      sx={{
        paddingTop: isMobile ? "12px" : "20px",
        paddingBottom: isMobile ? "12px" : "20px",
      }}
      bgcolor={bgColor}
      ref={viewEventWrapper}
    >
      {!isMobile && (
        <ViewAllbutton
          $backColor={bgColor}
          $isMobile={isMobile}
          onClick={() => {
            callViewall();
            return router.push(viewMoreLink);
          }}
        >
          {viewMore}
        </ViewAllbutton>
      )}
      {title && (
        <Box
          sx={{
            paddingTop: isMobile ? "2px" : "4px",
            paddingBottom: isMobile ? "4px" : "8px",
          }}
        >
          <Title interface={{ title: title, bgColor: bgColor }} />
        </Box>
      )}
      {!isMobile ? (
        <Box display="block" ref={ref}>
          <Stack
            spacing={{ lg: "18px", md: "14px", sm: "10px" }}
            direction="row"
          >
            {items?.map((item: ITEMS_LIST, index) => {
              const {
                imageUrl,
                text,
                path,
                isNewtab,
                textColor,
                creative_name,
                creative_slot,
              } = item;
              return (
                <StyledGrid
                  key={index}
                  onClick={() => {
                    callEvent(imageUrl, index, text);
                    callSelectPromotionEvent(creative_name, creative_slot);

                    handleClickRedirection(isNewtab, path, index);
                  }}
                  item
                  sm={12 / items?.length}
                  md={12 / items?.length}
                  lg={12 / items?.length}
                >
                  <Styledimage alt={text} src={`${ReplaceImage(imageUrl)}`} />
                  <SubTitleTypography
                    variant="subtitle1"
                    $textColor={textColor}
                    sx={{
                      fontSize: { lg: 16, md: 14, sm: 12 },
                      lineHeight: { lg: "24px", md: "20px", sm: "16px" },
                    }}
                  >
                    {text}
                  </SubTitleTypography>
                </StyledGrid>
              );
            })}
          </Stack>
        </Box>
      ) : (
        <div ref={mobileCarouselRef}>
          {mobileInView ? (
            <Carousel
              promotion_name={promotion_name}
              promotion_id={promotion_id}
              Component={MsiteCarousel}
              items={items}
              settings={userSettings}
              callBack={undefined}
              isVertical={undefined}
              trackGAEvent={trackGAEvent}
            />
          ) : null}
        </div>
      )}
      {isMobile && viewMore && (
        <StyledBox>
          <ViewAllbutton
            $backColor={bgColor}
            $isMobile={isMobile}
            onClick={() => {
              callViewall();
              return router.push(viewMoreLink);
            }}
          >
            {viewMore}
          </ViewAllbutton>
        </StyledBox>
      )}
    </MainBox>
  );
};

export default BuyingGuides;