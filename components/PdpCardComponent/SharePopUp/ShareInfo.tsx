import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  TypographyData,
  TypographyStrick,
  TypographyTextInfo,
  BoxTaxes,
  BoxDiscount,
  TypographyHeader,
  TypographyCost,
  MediaNameButton,
} from "./ShareStyle";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { PRODUCT_FALLBACK_URL } from "../../../HOC/ProductCard/Constants";
import triggerGAEvent from "../../../utility/GaEvents";
import { useMobileCheck } from "../../../utility/isMobile";
import { shareCTAevent_type, widget_type } from "../../../utility/GAConstants";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const handleClick = (url: URL, isMobile: boolean | Boolean) => {
  isMobile
    ? window.location.assign(url + window.location.href)
    : window.open(url + window.location.href);
};
const ShareInfo = (props: any) => {
  const isMobile = useMobileCheck();
  const {
    shareInfoData,
    productData,
    isShowProductData = true,
    pdpData = false,
    itemname,
  } = props;
  const ShareAnalytic = (url: URL, shareMethod: string) => {
    triggerGAEvent(
      {
        component_id: shareInfoData?.id,
        item_name: itemname,
        item_id: url,
        item_type: "product",
        index: 1,
        widget_type: widget_type,
        widget_title: shareInfoData?.data?.title,
        widget_position: 1,
        no_of_items: shareInfoData?.data?.items?.length,
        item_brand: "na",
        item_category: "na",
        item_category2: "na",
        item_category3: "na",
        link_url: `${global?.window?.location?.origin}${url}`,
        outbound: true,
        link_text: shareMethod,
        method: shareMethod,
        event_type: shareCTAevent_type,
      },
      "share"
    );
  };
  const imgUrl = productData?.image?.url || productData?.variants?.[0]?.product?.image?.url
  const imageUrl = imgUrl ? `${ReplaceImage(imgUrl)}` : PRODUCT_FALLBACK_URL

  return (
    <Box p={"46px 56px"}>
      <TypographyHeader sx={{ padding: pdpData ? "0px 0px 40px 0px" : "0px" }}>
        {shareInfoData?.data?.title}
      </TypographyHeader>
      <Box sx={{ flexGrow: 1 }}>
        {isShowProductData && (
          <Grid
            container
            spacing={2}
            xs={12}
            lg={12}
            md={12}
            sm={12}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {shareInfoData?.data?.items?.map((item: any, index: number) => (
              <>
                <Grid item xs={4} lg={4} md={4}>
                  <Box>
                    <img
                      key={item?.textTaxes}
                      src={imageUrl}
                      width="200px"
                      alt="image_block"
                    />
                  </Box>
                </Grid>
                <Grid item xs={8} lg={8} md={8}>
                  <TypographyTextInfo>{productData?.name}</TypographyTextInfo>
                  <TypographyData>
                    <TypographyCost>
                      {productData?.price_range?.minimum_price?.discount
                        ?.percent_off <= 0
                        ? `₹${productData?.price_range?.minimum_price?.regular_price?.value}`
                        : `₹${productData?.pmr_price_value?.amount?.value}`}
                    </TypographyCost>
                    {productData?.price_range?.minimum_price?.discount
                      ?.percent_off > 0 && (
                      <>
                        {" "}
                        <TypographyStrick>
                          ₹
                          {
                            productData?.price_range?.minimum_price
                              ?.regular_price?.value
                          }
                        </TypographyStrick>
                        <BoxDiscount>
                          {Number(
                            productData?.price_range?.minimum_price?.discount
                              ?.percent_off
                          ).toFixed(0)}
                          % discount
                        </BoxDiscount>
                        <BoxTaxes>{item?.textTaxes}</BoxTaxes>
                      </>
                    )}
                  </TypographyData>
                </Grid>
              </>
            ))}
          </Grid>
        )}
        <Grid item lg={12} xs={12} md={12}>
          {shareInfoData?.data?.socialMedia?.map((item: any, index: number) => (
            <MediaNameButton
              key={item.mediaName}
              onClick={() => {
                ShareAnalytic(item?.path, item?.mediaName);
                handleClick(item?.path, isMobile);
              }}
            >
              {item.mediaName}
            </MediaNameButton>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default ShareInfo;
