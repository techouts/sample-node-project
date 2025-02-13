import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import BrandsGridInterface from "../../schemas/BrandsGridSchema";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  MainBox,
  ContentGrid,
  ImageBox,
  Backgroundimage,
  Firstimage,
  GridItemsImage,
  IconImages,
  StyledButton,
  Title,
} from "./style";
import { widget_type, event_type } from "../../utility/GAConstants";
import triggerGaViewPromotion from "../../utility/GAViewPromotion";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";

const BrandsGrid = ({
  bgColor,
  bgPadding,
  contentImageUrl,
  contentImageUrlMobile,
  contentImagePath,
  bgImageUrl,
  bgMobileImageUrl,
  items,
  button,
  position,
  title,
  id,
  __component,
  promotion_id,
  promotion_name,
}: BrandsGridInterface) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [firstNonZeroDiff, setFirstNonZeroDiff] = useState<number | null>(null);
  const isMobile = useMobileCheck();
  const gridItemRefs = useRef([]);
  const cookie = new Cookies();
  const { getItem } = useStorage();

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
  }, [items]);

  useEffect(() => {
    if (visibleCount > 0  && items?.length > 0) {
      const startIndex = (visibleCount - firstNonZeroDiff)
      const endIndex = visibleCount;
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${items
          ?.slice(startIndex, endIndex)
          .map((item) => `${item?.creative_name}-outer BRG`)
          .join("|")}`,
        creative_slot: `${items
          ?.slice(startIndex, endIndex)
          .map((item) => `${item?.creative_slot}-outer BRG`)
          .join("|")}`,
          ecommerce: {
            items: items
            ?.slice(startIndex, endIndex)
            .map((item, index) => ({
              promotion_id: `${promotion_id}-inner BRG`,
              promotion_name: `${promotion_id}-inner BRG`,
              creative_name: `${item?.creative_name}-inner BRG`,
              creative_slot: `${item?.creative_slot}-inner BRG`,
            })),
          }
      };
      
      triggerGaViewPromotion("view_promotion", datasLayer);
    }
  }, [ visibleCount, isMobile , firstNonZeroDiff]);

  const handleClick = (url: string,  item: any , index?: any) => {
    if (url) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${items?.creative_name}-outer BRD`,
        creative_slot: `${items?.creative_slot}-outer BRD`,
        item_id: `${__component}_${position}_${index + 1}`,
        item_name: "na",
        item_type: "na",
        widget_type: widget_type,
        widget_description: "na",
        widget_position: position,
        link_url: `${global?.window?.location?.origin}${url}`,
        link_text: "na",
        no_of_items: items?.length,
        index: index + 1,
        item_brand: "na",
        item_category: "na",
        item_category2: "na",
        item_category3: "na",
        item_original_price: 0,
        item_price: 0,
        item_rating: "na",
        event_type: event_type,
        item_image_link: contentImageUrl,
        widget_title: __component,
        ecommerce: {
        items: [
          {
            promotion_id: `${promotion_id}-inner BRD`,
            promotion_name: `${promotion_id}-inner BRD`,
            creative_name: `${item?.creative_name}-inner BRD`,
            creative_slot: `${item?.creative_slot}-inner BRD`,
          }
        ]
      }
      };
      isMobile ? window.location.assign(url) : window.open(url);
      triggerGaViewPromotion("select_promotion", datasLayer);
    }
  };
  return (
    <>
      <MainBox
        imageSource={contentImageUrl && contentImageUrlMobile}
        p={isMobile ? "10px 16px" : bgPadding}
        bgcolor={bgColor}
      >
        {contentImageUrl && contentImageUrlMobile
          ? ""
          : title && <Title>{title}</Title>}
        {contentImageUrl && contentImageUrlMobile && (
          <Box display="flex" sx={{cursor: contentImagePath ? "pointer" : "default"}}>
            <Firstimage
              onClick={() => handleClick(contentImagePath)}
              src={
                isMobile
                  ? `${ReplaceImage(contentImageUrlMobile)}`
                  : `${ReplaceImage(contentImageUrl)}`
              }
            ></Firstimage>
          </Box>
        )}
        <ImageBox>
          {bgMobileImageUrl && bgImageUrl && (
            <Backgroundimage
              src={
                isMobile
                  ? `${ReplaceImage(bgMobileImageUrl)}`
                  : `${ReplaceImage(bgImageUrl)}`
              }
              alt="background image"
            ></Backgroundimage>
          )}
          <ContentGrid
            imageSource={contentImageUrl && contentImageUrlMobile}
            isBackgroundExist={bgImageUrl ? true : false}
          >
            {items?.map((item, index) => (
              <GridItemsImage
                key={index}
                data-index={index}
                ref={(el) => (gridItemRefs.current[index] = el)}
              >
                <IconImages
                  onClick={() => handleClick(item?.path, item, index)}
                  src={
                    isMobile
                      ? `${ReplaceImage(item?.imageUrlMobile)}`
                      : `${ReplaceImage(item?.imageUrl)}`
                  }
                />
              </GridItemsImage>
            ))}
          </ContentGrid>
        </ImageBox>
        <Box display="flex" justifyContent="center">
          {isMobile && button && (
            <StyledButton
              onClick={() => handleClick(contentImagePath)}
              variant="contained"
              imageSource={contentImageUrl && contentImageUrlMobile}
            >
              {button}
            </StyledButton>
          )}
          {isMobile || (contentImageUrl && contentImageUrlMobile)
            ? ""
            : button && (
                <StyledButton
                  onClick={() => handleClick(contentImagePath)}
                  variant="contained"
                  imageSource={contentImageUrl && contentImageUrlMobile}
                >
                  {button}
                </StyledButton>
              )}
        </Box>
      </MainBox>
    </>
  );
};
export default BrandsGrid;
