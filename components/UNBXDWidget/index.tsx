import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { HeaderTitle } from "./DynamicDataStyles";
import ProductsCarousel from "./ProductsCarousel";
import { useMobileCheck } from "../../utility/isMobile";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { MIDDLEWARE_UNBXD } from "../../utility/APIConstants";
import { triggerExperienceImpression } from "../../lib/UnbxdEvents";
import { userState } from "../../recoilstore";
import { useRecoilState } from "recoil";

const UNBXD_KEYS = {
  secret: process.env.NEXT_PUBLIC_UNBXD_SECRET_KEY,
  site_key: process.env.NEXT_PUBLIC_UNBXD_SITE_KEY,
};

const UNBXDWidget = (data: any) => {
  const {
    bgColor = "#ffffff",
    bgPadding = "1% 5%",
    backgroundImage,
    mobileBgPadding,
    productData,
    widgetId,
    pageType,
    displayItems,
    isWeb,
    isMsitePDP = false,
    searchVisible,
    isSearchPopup
  } = data;

  const router = useRouter();
  const cookie = new Cookies();

  const isMobile = useMobileCheck();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [productsData, setProductsData] = useState<any>([]);

  const [widgetData, setWidgetData] = useState<any>({});

  const userID = cookie.get("unbxd.userId") || "uid";

  const pdpID = productData?.items?.[0]?.id || "";

  const cartIDs = productData?.items?.map((a: any) => a?.unique_id) || [];

  const pageType_ = pageType?.toUpperCase() || "";

  const ids = pageType_ === "CART" ? cartIDs : [pdpID];

  const [requestId, setRequestId] = useState({});
  const getL1path = () => {
    const pathsSplit = router.asPath?.split("/");
    return pathsSplit[pathsSplit.length - 1];
  };

  const isTriggerAPI = useCallback(() => {
    let triggerAPI = false;
    if (["PRODUCT", "CART"].includes(pageType_)) {
      if (
        !!pageType_ &&
        !!widgetId &&
        ids?.length > 0 &&
        !ids.includes(undefined)
      ) {
        triggerAPI = true;
      }
    } else if (!!pageType_ && !!widgetId && !["PRODUCT"].includes(pageType_)) {
      triggerAPI = true;
    }
    return triggerAPI;
  }, [pageType_, ids, widgetId]);
  const isStoreMode =
    userDataItems?.storeMode && userDataItems?.storeModeType === "cc";

  useEffect(() => {
    if (!isStoreMode) {
      if (isTriggerAPI() === false) return;

      const isCatPage = router.asPath.includes("/category/");

      const idParams =
        ids?.length > 0 ? ids?.map((a: any) => `id=${a}`)?.join("&") : "";

      axios
        .post(
          `${MIDDLEWARE_UNBXD}/recommendations?pageType=${pageType_}&uid=${userID}&widgetId=${widgetId}&catlevel1Name=${
            isCatPage ? getL1path() : ""
          }&${idParams}`
        )
        .then((res) => {
          setProductsData(() => res?.data?.products?.items);
          setWidgetData(() => res?.data);
          setRequestId(() => res?.headers?.["unx-request-id"]);
          const itemIds = res?.data?.products?.items?.map((i: any) => i.id);
          triggerExperienceImpression({
            itemIds,
            pageType: pageType_,
            requestId: res?.headers?.["unx-request-id"],
            widgetId,
          });
        });
    }

  }, [widgetId, pdpID]);

  if (isStoreMode) {
    return;
  }

  return (
    <>
      {productsData?.length > 0 && (
        <Box
          id={`products-carousel${
            widgetData?.widgetTitle?.toLowerCase() === "similar products"
              ? "-similar"
              : ""
          }`}
          sx={{
            backgroundColor: bgColor,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
          p={
            isMobile
              ? backgroundImage
                ? mobileBgPadding ?? "75% 2% 0 2%"
                : bgPadding
              : bgPadding
          }>
          <HeaderTitle
            className="products-title"
            sx={{ paddingTop: backgroundImage ? "18px" : 0 }}>
            {widgetData?.widgetTitle || ""}
          </HeaderTitle>
          <ProductsCarousel
            products={productsData}
            displayItems={displayItems}
            isUnbxd={true}
            pageType={pageType_}
            widgetId={widgetId}
            requestId={requestId}
            mobileDisplayItems={2.1}
            isSearch={true}
            searchVisible={searchVisible}
            isSearchPopup={isSearchPopup}
          />
        </Box>
      )}
    </>
  );
};

export default UNBXDWidget;
