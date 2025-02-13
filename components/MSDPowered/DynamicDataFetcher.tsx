import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import client from "../../apollo-client";
import { MSD_RECOMMENDED, MSD_RECOMMENDED_PAGE_NAME } from "../../graphQLQueries/MSDQueries/MSDRecommended";
import {
  GET_SEARCHED_DATA,
  GET_SEARCHED_DATA_JSON,
} from "../../graphQLQueries/SearchListQuery";
import graphql from "../../middleware-graphql";
import { OTHER_MODULE, TRAFFIC_CP, VISUALLY_SIMILAR } from "./Constants";
import { HeaderTitle } from "./DynamicDataStyles";
import ProductsCarousel from "./ProductsCarousel";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import { useRecoilValue } from "recoil";
import { cartState } from "../../recoilstore";
import { useMobileCheck } from "../../utility/isMobile";
import AxiosInstance from "../../utility/AxiosInstance";
import handleErrorResponse from "../../utility/ErrorHandling";

const cookie = new Cookies();

const DynamicDataFetcher = (data: any) => {
  const router = useRouter();
  const { getItem } = useStorage();
  const {
    title,
    bgColor,
    bgPadding,
    module,
    noOfItems,
    type,
    moduleType,
    productSku,
    position,
    displayItems,
    backgroundImage,
    mobileBgImageUrl,
    mobileBgPadding,
    responseModuleName,
    slug,
  } = data;
  const productSkusData = data?.productsData?.items?.map((item: any) => {
    return item["parent_sku"];
  });
  const isMobile = useMobileCheck();
  const cartStore = useRecoilValue(cartState);
  const [productsData, setProductsData] = useState<any>({});
  const [msdResponse, setMsdResponse] = useState<any>({});

  useEffect(() => {
    if (type === "static") {
      fetchMagentoData();
    } else {
      if (
        moduleType !== VISUALLY_SIMILAR &&
        moduleType !== TRAFFIC_CP &&
        module !== VISUALLY_SIMILAR &&
        module !== TRAFFIC_CP
      ) {
        fetchMSDData();
      }
    }
  }, []);

  const getMaxProductAmountSku = () => {
    return highestSku()?.configured_variant?.sku
      ? highestSku()?.configured_variant?.sku
      : highestSku()?.product?.sku;
  };

  const highestSku = () => {
    return cartStore?.cartItems?.cart?.items?.reduce(function (
      prev: any,
      current: any
    ) {
      return prev?.prices?.row_total?.value -
        prev?.prices?.total_item_discount?.value >
        current?.prices?.row_total?.value -
        current?.prices?.total_item_discount?.value
        ? prev
        : current;
    });
  };

  useEffect(() => {
    if (
      moduleType === VISUALLY_SIMILAR ||
      moduleType === TRAFFIC_CP ||
      module === VISUALLY_SIMILAR ||
      module === TRAFFIC_CP
    ) {
      if (
        type !== "static" &&
        router?.asPath?.includes("cart") &&
        cartStore?.cartItems?.cart?.items?.length > 0 &&
        getMaxProductAmountSku() &&
        !router?.isFallback
      ) {
        fetchMSDData();
      }
    }
  }, [cartStore?.cartItems?.cart?.items?.length]);

  useEffect(() => {
    if (
      moduleType === VISUALLY_SIMILAR ||
      moduleType === TRAFFIC_CP ||
      module === VISUALLY_SIMILAR ||
      module === TRAFFIC_CP
    ) {
      if (
        type !== "static" &&
        !router?.asPath?.includes("cart") &&
        (getStaticSku() || productSku) &&
        !router?.isFallback
      ) {
        fetchMSDData();
      }
    }
  }, [data?.productData, router]);

  const getStaticSku = () => {
    if (data?.productData?.items?.[0]?.type_id === "simple") {
      return data?.productData?.items?.[0]?.sku;
    } else if (
      router?.asPath?.includes("colorCode") &&
      router?.asPath?.includes("size")
    ) {
      return data?.productData?.items?.[0]?.variants?.filter(
        (variant: any) =>
          variant?.product?.color?.toString() ==
          router?.query?.colorCode?.toString() &&
          variant?.product?.size?.toString() == router?.query?.size?.toString()
      )?.[0]?.product?.sku;
    } else if (router?.asPath?.includes("colorCode")) {
      return data?.productData?.items?.[0]?.variants?.filter(
        (variant: any) =>
          variant?.product?.color?.toString() ==
          router?.query?.colorCode?.toString()
      )?.[0]?.product?.sku;
    } else if (router?.asPath?.includes("size")) {
      return data?.productData?.items?.[0]?.variants?.filter(
        (variant: any) =>
          variant?.product?.size?.toString() == router?.query?.size?.toString()
      )?.[0]?.product?.sku;
    } else {
      return data?.productData?.items?.[0]?.variants?.[0]?.product?.sku;
    }
  };

  const getProductID = () => {
    if (productSku) {
      return productSku;
    } else if (getStaticSku()) {
      return getStaticSku();
    } else if (cartStore?.cartItems?.cart?.items?.length > 0) {
      return getMaxProductAmountSku();
    } else {
      return "";
    }
  };

  const isJsonString = (str: any) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const fetchMSDData = () => {
    if ((moduleType && moduleType !== OTHER_MODULE) || module) {
      let filters: any = [];
      let payload = {};
      data?.items?.length > 0 &&
        data?.items?.map((filterKeys: any) => {
          if (filterKeys?.field && filterKeys?.value)
            filters.push({
              field: filterKeys?.field,
              type: filterKeys?.type || "exact",
              value: isJsonString(filterKeys?.value)
                ? JSON.parse(filterKeys?.value)
                : filterKeys?.value,
            });
        });
      if (
        responseModuleName !== "" &&
        responseModuleName !== null
      ) {
        payload = {
          module_name:
            moduleType && moduleType !== OTHER_MODULE ? moduleType : module,
          user_id: getItem("customer_ref", "local") || "",
          num_results: noOfItems,
          mad_uuid: cookie.get("MADid"),
          product_id: getProductID(),
          filters: filters,
          page_name: responseModuleName,
        };
      } else {
        payload = {
          module_name:
            moduleType && moduleType !== OTHER_MODULE ? moduleType : module,
          user_id: getItem("customer_ref", "local") || "",
          num_results: noOfItems,
          mad_uuid: cookie.get("MADid"),
          product_id: getProductID(),
          filters: filters,
        };
      }
      if(filters.length!=0){
      graphql
        .mutate({
          mutation: responseModuleName !== "" &&
            responseModuleName !== null ? MSD_RECOMMENDED_PAGE_NAME : MSD_RECOMMENDED,
          variables: payload,
        })
        .then((res: any) => {
          setProductsData(res?.data?.msdRecomended?.data?.products?.items);
          setMsdResponse(res?.data?.msdRecomended?.data);
        })
        .catch((error: any) => {
          // toast.error("Someting went wrong, Please try again!!!");
          console.log("error", error);
        })
      }

    }
  };

  const filtersConversionToString = (obj: any) => {
    let str = "";
    for (const [p, val] of Object.entries(obj)) {
      const valueLab: any = val;
      const valueKey: any =
        valueLab?.in?.length > 0
          ? valueLab?.in?.length > 1
            ? val
            : { eq: valueLab?.in?.[0] }
          : val;
      str += `${p}:\n`;
      for (const [key, value] of Object.entries(valueKey)) {
        const keyValue = JSON.stringify(value);
        str += `{${key}:${keyValue}}`;
      }
    }
    return `{${str}}`;
  };

  const fetchMagentoData = () => {
    if (process.env.NEXT_PUBLIC_DISABLE_PRODUCTS_POST_CALL === "true") {
      AxiosInstance(
        GET_SEARCHED_DATA_JSON(
          encodeURIComponent(JSON.stringify("")),
          noOfItems,
          1,
          filtersConversionToString({ sku: { in: productSkusData } }),
          JSON.stringify({})
        ),
        false,
        false,
        process?.env?.NEXT_PUBLIC_PRODUCT_CAROUSEL_URL
      )
        .then((res) => {
          setProductsData(res?.data?.data?.products?.items);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      client
        .query({
          query: GET_SEARCHED_DATA,
          variables: {
            searchText: "",
            pageSize: noOfItems,
            currentPage: 1,
            filters: { sku: { in: productSkusData } },
            sort: {},
            queryParamVal: `?widget=product-carosuel&id=${slug}_${data?.id}`,
          },
        })
        .then((res) => {
          setProductsData(res?.data?.products?.items);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  };

  const getReferrerAmount = () => {
    if (productSku) {
      return null;
    } else if (getStaticSku()) {
      const ProductItems = data?.productData?.items[0];
      if ( ProductItems && ProductItems?.type_id === "simple") {
        return ProductItems?.pmr_price_value?.discount?.percent_off > 0
          ? ProductItems?.pmr_price_value?.amount?.value?.toFixed(2)
          : ProductItems?.price_range?.minimum_price?.regular_price?.value?.toFixed(2);
      } else {
        return fetchDynamicCartStoreIDs();
      }
    }
  };

  const fetchDynamicCartStoreIDs = () => {
    if (
      data?.productData?.items?.[0]?.variants?.filter(
        (variant: any) => variant?.product?.sku === getStaticSku()
      )?.[0]?.product?.pmr_price_value?.discount?.percent_off > 0
    ) {
      if (
        data?.productData?.items?.[0]?.variants?.filter(
          (variant: any) => variant?.product?.sku === getStaticSku()
        )?.[0]?.product?.pmr_price_value?.amount?.value > 0
      ) {
        data?.productData?.items?.[0]?.variants
          ?.filter(
            (variant: any) => variant?.product?.sku === getStaticSku()
          )?.[0]
          ?.product?.price_range?.minimum_price?.regular_price?.value?.toFixed(
            2
          );
      }
    } else {
      return cartStore?.cartItems?.cart?.items?.filter((data: any) => {
        return (
          getMaxProductAmountSku() === data?.product?.sku ||
          getMaxProductAmountSku() === data?.configured_variant?.sku
        );
      })?.[0]?.prices?.price?.value;
    }
  };

  const bgImg = `url(${isMobile ? mobileBgImageUrl ?? backgroundImage : backgroundImage
    })`

  return (
    <>
      {productsData?.length > 0 && (
        <Box
          sx={{
            backgroundColor: bgColor,
            backgroundImage: bgImg.includes("null") ? "none" : bgImg,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
          p={
            isMobile
              ? backgroundImage
                ? mobileBgPadding ?? "75% 2% 0 2%"
                : bgPadding
              : bgPadding
          }
        >
          <HeaderTitle sx={{ paddingTop: backgroundImage ? "18px" : 0 }}>
            {title}
          </HeaderTitle>
          <ProductsCarousel
            products={productsData}
            staticProductSkus={data?.productsData?.items}
            msdResponse={msdResponse}
            isDynamic={type !== "static"}
            position={position}
            displayItems={displayItems}
            backgroundImage={backgroundImage}
            referrerSku={getStaticSku() ? getStaticSku() : undefined}
            referrerPrice={getReferrerAmount()}
          />
        </Box>
      )}
    </>
  );
};

export default DynamicDataFetcher;
