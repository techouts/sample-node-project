import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import {
  GridOne,
  MainGrid,
  ParentBox,
  TypographyBanner,
  CardTypography,
  IconTypography,
  ButtonStack,
  IconGrid,
} from "./PdpBannerstlyles";
import {
  widget_powered_by,
  bannerevent_type,
  Event_type,
  event_type,
  widget_type,
} from "../../../utility/GAConstants";
import ViewEvent from "../../../utility/viewEvent";
import PdpBannerInterface from "./PdpBannerSchema";
import { useRef } from "react";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import triggerGAEvent from "../../../utility/GaEvents";
import { useMobileCheck } from "../../../utility/isMobile";
import { AppIcons } from "../../../utility/AppIconsConstant";
import { LEFT_ARROW_ICON } from "../../../utility/AppIcons";
import { LeftArrowIcon } from "../../Profile/constant";
const PdpBanner = ({
  title,
  items,
  carditem,
  productData,
  __component
}: PdpBannerInterface) => {
  const router = useRouter();
  const analyticProductData = productData?.items?.[0];
  const Left_direction_icon = AppIcons(LEFT_ARROW_ICON);
  const viewEventWrapper = useRef();
  const isMobile = useMobileCheck();
  const dataLayer = {
    item_id: analyticProductData?.sku,
    item_name: analyticProductData?.name,
    event_type: Event_type,
    widget_type: bannerevent_type,
    item_type: "product",
    widget_powered_by: widget_powered_by,
    widget_title: __component,
    widget_description: "na",
    widget_position: "8",
    no_of_items: 1,
    view_items: JSON.stringify({ items }),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");
  const analyticUtility = () => {
    return {
      item_name: analyticProductData?.name,
      item_id: analyticProductData?.sku,
      event_type: event_type,
      widget_type: widget_type,
      item_type: analyticProductData?.__typename,
      widget_description: analyticProductData?.short_description?.html||"na",
      no_of_items: productData?.items?.length,
      index:1,
      item_brand:analyticProductData?.brand_info,
      item_category:analyticProductData?.categories?.[0]?.name,
      item_category2:analyticProductData?.categories?.[1]?.name,
      item_category3:analyticProductData?.categories?.[2]?.name,
      item_original_price:
        analyticProductData?.price_range?.minimum_price?.regular_price?.value,
      item_price:
        analyticProductData?.pmr_price_value?.amount?.value,
      item_rating: analyticProductData?.rating_summary,
    };
  };
  const consultChatAnalytic = (titlePath: string, title: string) => {
    triggerGAEvent(
      {
        ...analyticUtility(),
        widget_title: title,
        widget_position:8,
        link_url: `${global?.window?.location?.origin}${titlePath}`||"na",
        link_text: title,
      },
      "click"
    );
  };
  const moreProductsAnalytic = (
    ctaLabelUrl: string,
    brand: string,
    cardTitle: string
  ) => {
    triggerGAEvent(
      {
        ...analyticUtility(),
        widget_title: cardTitle,
        widget_position:7,
        link_url: `${global?.window?.location?.origin}${ctaLabelUrl}`,
        link_text: brand,
      },
      "click"
    );
  };
  return (
    <>
      {analyticProductData && <MainGrid p={"0px 5%"}>
        {carditem?.map((data, index) => {
          const {
            cardTitle,
            cardSubTitle,
            brand,
            ctaLabelUrl,
          } = data;

          const Shopall = `/${analyticProductData?.brand_info?.trim()?.replace(/\s/g, '-')}/c/${analyticProductData?.categories?.[0]?.id}?brand_name=${analyticProductData?.brand_name}&category_id=${analyticProductData?.categories?.[0]?.id}`;
          const MoreShop = `/${analyticProductData?.brand_info?.trim()?.replace(/\s/g, '-')}/c/brand?brand_name=${analyticProductData?.brand_name}`;
          return (
            <>
              <GridOne
                container
                key={index}
                onClick={() => {
                  global?.window?.location?.assign(
                    index == 0 ? MoreShop : Shopall
                  ),
                    moreProductsAnalytic(ctaLabelUrl, brand, cardTitle);
                }}
              >
                <Grid item xs={11}>
                  <CardTypography>
                    {`${cardTitle} 
                   ${
                     index == 0
                       ? analyticProductData?.categories?.[0]?.name?.toLowerCase()
                       : ""
                   } 
                   ${cardSubTitle} 
                  ${
                    analyticProductData?.brand_info
                      ? analyticProductData?.brand_info?.toLowerCase()
                      : ""
                  }`}
                  </CardTypography>
                </Grid>
                <IconGrid
                  item
                  xs={1}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <img
                    src={Left_direction_icon?.url ? `${ReplaceImage(Left_direction_icon?.url)}` : LeftArrowIcon}
                    alt="image not found"
                  />
                </IconGrid>
              </GridOne>
            </>
          );
        })}
      </MainGrid>}
      <ParentBox ref={viewEventWrapper}>
        <TypographyBanner
          dangerouslySetInnerHTML={{ __html: title }}
        ></TypographyBanner>
        <Stack direction="row" spacing={isMobile ? 1 : 3} mt="10px">
          {items.map((dataTwo, index) => {
            const { title, titlePath, iconUrl } = dataTwo;
            return (
              <>
                <ButtonStack
                  direction="row"
                  key={index}
                  onClick={() => {
                    titlePath
                      ? router.push(titlePath)
                      : (window?.od?.messenger("trigger"),
                        window?.od?.messenger("open")),
                      consultChatAnalytic(titlePath, title);
                  }}
                >
                  <IconTypography>{title}</IconTypography>
                  <img
                    src={`${ReplaceImage(iconUrl)}` || `${iconUrl}`}
                    alt="image not found"
                    style={{
                      cursor: "pointer",
                      maxHeight: "16px",
                      objectFit: "cover",
                    }}
                  />
                </ButtonStack>
              </>
            );
          })}
        </Stack>
      </ParentBox>
    </>
  );
};
export default PdpBanner;
