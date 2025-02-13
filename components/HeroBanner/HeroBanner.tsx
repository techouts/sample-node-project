import Carousel from "../../HOC/Carousel/Carousel2";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import HeroBannerSchema from "../../schemas/HeroBannerSchema";
import { ReplaceImage } from "../../utility/ReplaceImage";
import triggerGAEvent from "../../utility/GaEvents";
import {
  itemArrayView,
  singleItemArrayClick,
} from "../../utility/ViewEvenItemArray";
import { useInView } from "react-intersection-observer";
import MediaBoxSkeleton from "./MediaBoxSkeleton";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";
import { isMobile as deviceIsMobile } from "react-device-detect";

function HeroBanner({
  autoPlay,
  bgColor,
  bgPadding,
  controlType,
  id,
  items,
  position = 1,
  __component,
  promotion_id,
  promotion_name,
  viewport,
}: HeroBannerSchema) {
  const isMobile = deviceIsMobile;
  const viewEventWrapper = useRef();
  const slidesRef = useRef<number[]>([]);
  const [skeletonloader, setSkeletonloader] = useState([]);
  const completedSlides = slidesRef.current;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const settings = {
    arrows: controlType === "arrows",
    dots: controlType === "dots",
    infinite: autoPlay,
    initialSlide: 0,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: autoPlay,
    pauseOnHover: autoPlay,
  };

  const initialSlides = isMobile ? 1 : 1;
  let newVisibleProducts: any = [];

  const cookie = new Cookies();
  const { getItem } = useStorage();

  const trackGAEvent = (index: number) => {
    const roundedIndex = Math.round(index);
    const startIndex = roundedIndex;
    const endIndex = Math.min(roundedIndex + initialSlides, items.length);

    const visibleProducts = items.slice(startIndex, endIndex);
    setSkeletonloader(visibleProducts)
    const newItems = visibleProducts.filter(
      (item) => !newVisibleProducts.includes(item)
    );

    newVisibleProducts = [...newVisibleProducts, ...newItems];

    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${items
        ?.map((item: any) => `${item?.creative_name}-outer HB`)
        .join("|")}`,
      creative_slot: `${items
        ?.map((item: any) => `${item?.creative_slot}-outer HB`)
        .join("|")}`,
      items: newItems?.map((item: any) => ({
        promotion_id: `${promotion_id}-inner HB`,
        promotion_name: `${promotion_name}-inner HB`,
        creative_name: `${item?.creative_name}-inner HB`,
        creative_slot: `${item?.creative_slot}-inner HB`,
      })),
    };
    TriggerGaViewPromotion("view_promotion", datasLayer);
  };

  return (
    <Box
      ref={viewEventWrapper}
      sx={{
        backgroundColor: bgColor,
        height: "100%",
        p: `${
          isMobile
            ? bgPadding === null || bgPadding === "0"
              ? "0"
              : "0 16px"
            : bgPadding
        }`,
        paddingTop: isMobile ? "12px" : "20px",
        paddingBottom: isMobile ? "5px" : "20px",
        width: "100%",
      }}
    >
      <div ref={ref}>
        {inView || skeletonloader?.length > 0 ? (
          <Carousel
            data-testid="carousel"
            items={items}
            settings={settings}
            Component={Item}
            position={position}
            callBack={undefined}
            isVertical={undefined}
            componentName={__component}
            promotion_id={promotion_id}
            promotion_name={promotion_name}
            viewport={viewport}
            trackGAEvent={trackGAEvent}
          />
        ):(<MediaBoxSkeleton />)}
      </div>
    </Box>
  );
}
export function Item({
  path,
  isNewTab = false,
  imageUrl,
  imageUrlMobile,
  dataSet,
  items,
  Item_name,
  altText,
  itemsLength,
  position,
  componentName,
  isVideo,
  __component,
  promotion_id,
  promotion_name,
  creative_name,
  creative_slot,
  viewport,
}: any) {
  const router = useRouter();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isMobile = deviceIsMobile;

  const Events = (idx: number) => {
    const filteredBanner = items?.filter(
      (cItem: any, index: any) => index === idx
    );

    triggerGAEvent(
      {
        creative_name,
        creative_slot,
        items: __component
          ? singleItemArrayClick(
              promotion_id,
              promotion_name,
              creative_name,
              creative_slot
            )
          : itemArrayView(filteredBanner, promotion_id, promotion_name),
      },
      "select_promotion"
    );
  };
  const handleClickRedirection = () => {
    if (isNewTab) {
      path && window?.open(path);
    } else {
      path && router.push(path);
    }
    return null;
  };

  const src = isMobile
    ? `${ReplaceImage(imageUrlMobile)}`
    : `${ReplaceImage(imageUrl)}`;

  if (src.includes("null")) return null;

  return (
    <Box
      ref={ref}
      onClick={(e: any) => {
        handleClickRedirection() && e.preventDefault();
        Events(dataSet);
      }}
      sx={{
        cursor: path ? "pointer" : "unset",
      }}
    >
      {!inView ? (
        <MediaBoxSkeleton isVideo={isVideo} />
      ) : isVideo ? (
        <video
          src={src}
          disablePictureInPicture
          autoPlay
          loop
          muted
          style={{
            margin: "auto",
            width: "100%",
          }}
        />
      ) : (
        <img
        src={src}
        alt={altText || "Banner"}
        style={{
          margin: "auto",
          width: "100%",
          objectFit: "cover",
        }}
      />
      )}
    </Box>
  );
}
export default HeroBanner;
