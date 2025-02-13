import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useMobileCheck } from "../../utility/isMobile";
import {
  Typographytitle,
  TabStyle,
  GridContentWrapper,
  ViewMoreViewLessTypo,
  DescriptionBox,
  ProductSku,
  ProductTitle,
  TabTitleWrapper,
} from "./MultiTabStyles";
import { useRouter } from "next/router";
import triggerGAEvent from "../../utility/GaEvents";
import { event_type } from "../../utility/GAConstants";
import ImageGallery from "./A+Content";

export default function MultiTabs({ isAboutPage, modelData }: any) {
  const isMobile = useMobileCheck();
  const { description, ingredients, how_to_use, short_description } = modelData;
  const [calcHeight, setCalcHeight] = useState(200);
  const ref = useRef<any>(null);
  useEffect(() => {
    setCalcHeight(ref?.current?.clientHeight);
  });
  function calcs() {
    if (calcHeight < 200) {
      return "none";
    } else {
      return "block";
    }
  }
  let noOfTabs = 0;
  let temData: any = [];
  const router = useRouter();
  Object?.keys(modelData).forEach((tabName) => {
    if (
      tabName != null &&
      (tabName == "about_the_product" ||
        (tabName == "ingredients" && ingredients != null) ||
        (tabName == "how_to_use" && how_to_use != null))
    ) {
      temData.push(tabName);
      noOfTabs++;
    }
  });
  const [value, setValue] = useState(temData?.[0]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    callClikEvent(newValue);
  };

  const getProductFilterData = () => {
    if (modelData?.type_id === "simple") {
      return modelData?.sku;
    }
    const colorCodeRoute = router?.asPath?.includes("colorCode");
    const sizeRoute = router?.asPath?.includes("size");
    const colorCode = router?.query?.colorCode?.toString();
    const size = router?.query?.size?.toString();

    if (colorCodeRoute && sizeRoute) {
      return modelData?.variants?.filter(
        (variant: any) =>
          variant?.product?.color?.toString() === colorCode &&
          variant?.product?.size?.toString() === size
      )?.[0]?.product?.sku;
    }

    if (colorCodeRoute) {
      return modelData?.variants?.filter(
        (variant: any) => variant?.product?.color?.toString() === colorCode
      )?.[0]?.product?.sku;
    }

    if (sizeRoute) {
      return modelData?.variants?.filter(
        (variant: any) => variant?.product?.size?.toString() === size
      )?.[0]?.product?.sku;
    }

    return modelData?.variants?.[0]?.product?.sku;
  };

  const callClikEvent = (linktext: string) => {
    triggerGAEvent(
      {
        item_name: modelData?.__typename,
        item_id: modelData?.sku,
        component_id: modelData?.__component,
        event_type: event_type,
        widget_type: "select_tab",
        item_type: modelData?.type_id,
        widget_title: linktext,
        widget_description: description?.html,
        widget_position: 2,
        link_url: "na",
        link_text: linktext,
        no_of_items: 1,
        index: 1,
        item_brand: modelData?.brand_info,
        item_category: modelData?.categories?.[0]?.name,
        item_category2: modelData?.categories?.[1]?.name,
        item_category3: modelData?.categories?.[2]?.name,
        item_original_price: modelData?.pmr_price_value?.amount?.value,
        item_price: modelData?.price_range?.minimum_price?.regular_price?.value,
        item_rating: modelData?.rating_summary,
      },
      "click"
    );
  };
  const modalVariantSkuData = () => {
    if (modelData?.type_id !== "simple") {
      if (getProductFilterData()) {
        return getProductFilterData();
      } else {
        return modelData?.variants?.[0]?.product?.sku;
      }
    } else {
      return modelData?.sku;
    }
  };

  return (
    <Box
      bgcolor={modelData?.bgColor}
      sx={{ paddingBottom: isMobile ? "20px" : "40px" }}
      p={isMobile ? "0px 16px 25px 16px" : modelData?.bgPadding}
      id="about">
      {noOfTabs >= 1 && (
        <div style={{ width: "100%", background: "#F7F7F7" }}>
          <TabContext value={value}>
            <Box>
              <TabList
                onChange={handleChange}
                TabIndicatorProps={{
                  style: { backgroundColor: "#F6F6F6" },
                }}>
                {description && (
                  <TabStyle
                    noOfTabs={noOfTabs}
                    isMobile={isMobile}
                    label={"About The Product"}
                    value="about_the_product"
                    disableRipple
                  />
                )}
                {ingredients && (
                  <TabStyle
                    noOfTabs={noOfTabs}
                    isMobile={isMobile}
                    label={"Ingredients"}
                    value="ingredients"
                    disableRipple
                  />
                )}
                {how_to_use && (
                  <TabStyle
                    noOfTabs={noOfTabs}
                    isMobile={isMobile}
                    label={"How To Use"}
                    value="how_to_use"
                    disableRipple
                  />
                )}
              </TabList>
            </Box>

            <TabPanel
              value="about_the_product"
              style={{ padding: isMobile ? "10px" : "45px" }}>
              <GridContentWrapper
                container
                sx={{ padding: "unset !important" }}
                direction="column"
                xs={12}>
                <ImageGallery
                  shortDescription={description?.html}
                  description={description?.html}
                  modelData={modelData}
                  isAboutPage={isAboutPage}
                  productId={modalVariantSkuData()}
                />
              </GridContentWrapper>
            </TabPanel>
            <TabPanel
              value="ingredients"
              style={{ padding: isMobile ? "10px" : "" }}>
              <GridContentWrapper
                container
                direction="column"
                rowGap={"15px"}
                xs={12}>
                <TabTitleWrapper>
                  <Typographytitle
                    isMobile={isMobile}
                    noOfTabs={noOfTabs}
                    dangerouslySetInnerHTML={{ __html: ingredients }}
                  />
                </TabTitleWrapper>
              </GridContentWrapper>
            </TabPanel>
            <TabPanel
              value="how_to_use"
              style={{ padding: isMobile ? "10px" : "" }}>
              <GridContentWrapper
                container
                direction="column"
                rowGap={"15px"}
                xs={12}>
                <TabTitleWrapper>
                  <Typographytitle
                    isMobile={isMobile}
                    noOfTabs={noOfTabs}
                    dangerouslySetInnerHTML={{ __html: how_to_use }}
                  />
                </TabTitleWrapper>
              </GridContentWrapper>
            </TabPanel>
          </TabContext>
        </div>
      )}
    </Box>
  );
}
