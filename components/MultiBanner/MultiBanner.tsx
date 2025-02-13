import React, { useRef, useState, useEffect } from "react";
import { CTAText, ViewAllText } from "./MultiBannerStyles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TrendingStoresInterface from "../../schemas/TrendingStoresSchema";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { banner_event_type } from "../../utility/GAConstants";
import { useRouter } from "next/router";
import ViewEvent from "../../utility/viewEvent";
import triggerGAEvent from "../../utility/GaEvents";
import styles from "../../HOC/Title/Title.module.css";
import { ViewAllButton } from "../OffersGrid/OffersGridStyles";
import { ViewArray } from "../../utility/ViewEvenItemArray";
import { useInView } from "react-intersection-observer";
import BannerViewEvent from "../../utility/GaViewEventBanner";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";

function MultiBanner(data: TrendingStoresInterface) {
  const isMobile = useMobileCheck();
  const router = useRouter();
  const viewEventWrapper = useRef();

  const [hasFiredEvent, setHasFiredEvent] = useState(false);

  const { ref, inView } = useInView({
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
        creative_name: `${data?.items
          ?.map((item: any) => `${item?.creative_name}-outer MBC`)
          .join("|")}`,
        creative_slot: `${data?.items
          ?.map((item: any) => `${item?.creative_slot}-outer MBC`)
          .join("|")}`,
        items: data?.items?.map((item: any) => ({
          promotion_id: `${data?.promotion_id}-inner MBC`,
          promotion_name: `${data?.promotion_name}-inner MBC`,
          creative_name: `${item?.creative_name}-inner MBC`,
          creative_slot: `${item?.creative_slot}-inner MBC`,
        })),
      };
      TriggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true);
    }
  }, [inView, hasFiredEvent, cookie, getItem, data.items]);

  const callSelectPromotionEvent = (
    creative_name: string,
    creative_slot: string
  ) => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${creative_name}-outer MBC`,
      creative_slot: `${creative_slot}-outer MBC`,
      items: [
        {
          promotion_id: `${data?.promotion_id}-inner MBC`,
          promotion_name: `${data?.promotion_name}-inner MBC`,
          creative_name: `${creative_name}-inner MBC`,
          creative_slot: `${creative_slot}-inner MBC`,
        },
      ],
    };
    TriggerGaViewPromotion("select_promotion", datasLayer);
  };

  const handleClickRedirection = (isNewTab: boolean, path: URL | string) => {
    if (isNewTab) {
      path && window?.open(path);
    } else {
      path && router.push(path);
    }
  };

  return (
    <Box
      bgcolor={data?.bgColor}
      p={isMobile ? (data?.bgPadding ? "0 16px" : 0) : data?.bgPadding}
      sx={{
        paddingTop: isMobile ? "12px" : "20px",
        paddingBottom: isMobile ? "12px" : "20px",
      }}
    >
      <Box display={"flex"} justifyContent={"center"}>
        {data?.title && (
          <Box
            ref={ref}
            component="span"
            className={
              data?.bgColor === "#231F20"
                ? styles?.title_text_Bg
                : styles?.title_text
            }
            ml={data?.ctaLabel && !isMobile ? "auto" : "inherit"}
            sx={{
              paddingTop: isMobile ? "2px" : "4px",
              paddingBottom: isMobile ? "14px" : "24px",
            }}
          >
            {data?.title}
          </Box>
        )}
        {data?.ctaLabel && !isMobile && (
          <ViewAllText
            component="span"
            ml={"auto"}
            onClick={() => {
              handleClickRedirection(false, data?.ctaLabelUrl);
            }}
          >
            <CTAText>{data?.ctaLabel}</CTAText>
          </ViewAllText>
        )}
      </Box>
      <Grid container spacing={2.2}>
        {data?.items?.map((option, idx) => {

          return (
            <Grid
              onClick={() => {
                callSelectPromotionEvent(
                  option?.creative_name,
                  option?.creative_slot
                );
                handleClickRedirection(option?.isNewTab, option?.path);
              }}
              item
              xs={12}
              sm={12}
              md={6}
              sx={{ textAlign: "center" }}
              key={idx}
            >
              {(isMobile ? option?.imageUrlMobile : option?.imageUrl) && (
                <img
                  src={
                    isMobile
                      ? `${ReplaceImage(option?.imageUrlMobile)}`
                      : `${ReplaceImage(option?.imageUrl)}`
                  }
                  width="100%"
                  alt={option?.altText}
                  style={{ cursor: "pointer" }}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
      {data?.ctaLabel && isMobile && (
        <ViewAllButton
          onClick={() => {
            window.location.assign(
              `${window.location.origin}${data?.ctaLabelUrl}`
            );
          }}
          $backColor={data?.bgColor}
        >
          {data?.ctaLabel}
        </ViewAllButton>
      )}
    </Box>
  );
}
export default MultiBanner;