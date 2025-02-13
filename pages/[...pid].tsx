/* eslint-disable @next/next/next-script-for-ga */
import Head from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import { ProductLayout } from "../components/ProductLayout/ProductLayout";
const Header = dynamic(() => import("../components/Header/Header"), {
  ssr: true,
});
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Footer from "../components/Footer/Footer";
import FooterCopyRights from "../components/FooterCopyRights/FooterCopyRights";
import FooterSubscribe from "../components/FooterSubscribe/FooterSubscribe";
import FooterPayment from "../components/FooterPayment";
import BackToTopButton from "../components/BackToTopBtn/BackToTopButton";
import Benefits from "../components/Benefits/Benefits";
import Loader from "../HOC/Loader/Loader";
import useStorage from "../utility/useStoarge";
import * as ga from "../lib/ga";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RenderComponent, {
  LazyloadComponents,
} from "../HOC/RenderComponent/RenderComponent";
import SingleBanner from "../components/SingleBanner/SingleBanner";
import HorizontalSpacer from "../components/HorizontalSpacer/HorizontalSpacer";
import ShopByCollection from "../components/ShopByCollection/ShopByCollection";
import LocationIntelligence from "../components/LocationIntelligence/LocationIntelligence";
import { callScrollEvent } from "../utility/ScrollEventAnalytics";
import { toast } from "../utility/Toast";
import { useRecoilState } from "recoil";
import {
  SSBLogos,
  categoriesData,
  brandsData,
  plpSchemaData,
} from "../recoilstore";
import logger from "../next-logger.config";
import client from "../apollo-client";
import {
  PDP_JSON_QUERY,
  PDP_PRICE_JSON_QUERY,
  PRODUCT_DATA_SKU,
} from "../graphQLQueries/ProductQuery";
import AxiosInstance from "../utility/AxiosInstance";
// import PdpBanner from "../components/PdpCardComponent/PdpBanner/PdpBanner";
const PdpBanner = dynamic(
  () => import("../components/PdpCardComponent/PdpBanner/PdpBanner"),
  { ssr: false }
);
import BeautyInspiriation from "../components/PdpCardComponent/PdpBanner/BeautyInspriation";
import ProductHighLights from "../components/ProductHightLights/ProductHightLights";
import MultiTabs from "../components/MultiTabs/Multitab";
import ProductQA from "../components/Product QA/ProductQA";
import BrandDescription from "../components/BrandDescription/BrandDescription";
import { ComponentRenderingUtility } from "../utility/ComponentRenderingUtility";
import DynamicDataFetcher from "../components/MSDPowered/DynamicDataFetcher";
import FooterBottom from "../components/FooterBottom/FooterBottom";
import { Cookies } from "react-cookie";
import { chatBotUtility } from "../utility/chatBotObjUtility";
import { CATEGORYLISTJSON } from "../graphQLQueries/CategoryQuery";
import { Clarity } from "../utility/Clarity";
import PDPBlockComponent from "../components/PDP/PDPBlockComponent";
import UNBXDWidget from "../components/UNBXDWidget";

import handleErrorResponse from "../utility/ErrorHandling";
import { Stack } from "@mui/material";
import { useMobileCheck } from "../utility/isMobile";
const ProductQAData = require("../JSON/ProductQA.json");
const pdpbannerdata = require("../JSON/PdpBanner.json");
const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const DomainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;
const NEXT_PUBLIC_FILTER_FACETS: any = process.env.NEXT_PUBLIC_FILTER_FACETS;
const NEXT_PUBLIC_APP_LINK_META_TAG_DOMAIN: any =
  process.env.NEXT_PUBLIC_APP_LINK_META_TAG_DOMAIN;
const FILTER_FACETS = JSON.parse(NEXT_PUBLIC_FILTER_FACETS);
const NEXT_PUBLIC_APP_STORE_ID: any = process.env.NEXT_PUBLIC_APP_STORE_ID;
const NEXT_PUBLIC_ANDRIOD_APP_PACKAGE: any =
  process.env.NEXT_PUBLIC_ANDRIOD_APP_PACKAGE;
const NEXT_PUBLIC_APP_NAME: any = process.env.NEXT_PUBLIC_APP_NAME;
const NEXT_PUBLIC_WEB_FALL_BACK: any = process.env.NEXT_PUBLIC_WEB_FALL_BACK;

export default function ProductsPage(props: any) {
  const structureData = {
    "@context": `${process.env.NEXT_PUBLIC_SCHEMA_URL}`,
    "@type": "Organization",
    name: "SSBeauty",
    alternateName: "SSBeauty By Shoppers Stop",
    url: `${DomainURL}`,
    logo: props?.header?.data?.[0]?.Header.logoImageUrl,
    sameAs: [
      props?.header?.data?.[0]?.FooterSubscribe?.facebookIconPath,
      props?.header?.data?.[0]?.FooterSubscribe?.instagramIconPath,
      props?.header?.data?.[0]?.FooterSubscribe?.twitterIconPath,
    ],
  };
  const [schemaStructureData, setSchemaStructureData] =
    useRecoilState(plpSchemaData);
  const cookie = new Cookies();
  const [virtualCatgeoryProducts, setVirtualCategoryProducts] = useState([]);
  const [isVirtualCategory, setVirtualCategory] = useState(false);

  const [breadCrumbPLP, setBreadCrumbPLP] = useState<any>([]);
  const [categoryPath, setCategoryPath] = useState("");
  const [categories, setCategories] = useRecoilState(categoriesData);
  const [brands, setBrands] = useRecoilState(brandsData);
  const { pageId, model, isPLP, isPDP } = props;
  const [filtered, setFiltered] = useState<any>(undefined);
  const [sortData, setSortData] = useState({});
  const [unbxdCategoryPath, setUnbxdCategoryPath] = useState<any>();
  const headerComponent = {
    ...props?.header?.data?.[0]?.Header,
    Brands: props?.header?.data?.[0]?.Brands,
    BrandItems: props?.header?.data?.[0]?.BrandItems,
    popularBrands: props?.header?.data?.[0]?.popularBrands,
    popularCategories: props?.header?.data?.[0]?.popularCategories,
    unbxdCarousel: props?.header?.data?.[0]?.unbxdCarousel,
    searchbarTexts: props?.header?.data?.[0]?.multiText?.items?.map(
      (item: any) => item?.name
    ),
    isPDP: isPDP,
  };
  const footerComponent = props?.header?.data?.[0]?.Footer || model?.Footer;
  const components = model?.components;
  const footerCopyRights = model?.footerCopyRights;
  const router = useRouter();
  const [SSBeautyLogos, setSSBeautyLogos] = useRecoilState(SSBLogos);
  const { setItem, getItem } = useStorage();
  const [displayLoader, setLoader] = useState(true);
  const [productData, setProductData] = useState<any>();
  const [aboutbrand, setAboutbrand] = useState<any>();
  const [totalCount, setTotalCount] = useState(productData);
  const [pageNo, setPageNo] = useState(1);
  const brandName = productData?.items?.[0]?.brand_name;
  const entityID = productData?.items?.[0]?.id;
  const [filteredCategories, setFilteredCategories] = useState<any>([]);
  const footerBottom = model?.footerBottom;
  const footerPayment = props?.header?.data?.[0]?.FooterPayment;
  const footerSubscribe = props?.header?.data?.[0]?.FooterSubscribe;
  const footerBenefits = props?.header?.data?.[0]?.FooterBenefits;
  let breadCrumbStructuredList: any = [];
  const isMobile = useMobileCheck();

  useEffect(() => {
    if (isPLP || isPDP) {
      if (window?.od?.messenger) {
        window.od.messenger("pushMessage", chatBotUtility());
      }
    }
  }, [global?.window?.od?.messenger, cookie.get("accessToken")]);

  const pushListItem = (position: number, name: string, item: any) => {
    breadCrumbStructuredList[position] = {
      "@type": "ListItem",
      position: position + 1,
      name: name,
      item: item,
    };
  };

  if (isPLP && categories?.length > 0 && !router?.asPath.includes("/c/brand")) {
    pushListItem(0, "Home", DomainURL);
    categories.map((categoriesList: any, index: number) => {
      pushListItem(
        index + 1,
        categoriesList?.name,
        categoriesList?.level === 1 || categoriesList?.level === 0
          ? `${DomainURL}/category/${categoriesList.url_key}`
          : categoriesList?.level === 2
          ? `${DomainURL}/${categories?.[0]?.url_key}/${categories?.[1]?.url_key}/c/${categoriesList?.id}?category_id=${categoriesList?.id}`
          : `${DomainURL}/${categories?.[0]?.url_key}/${categories?.[1]?.url_key}/${categories?.[2]?.url_key}/c/${categoriesList?.id}?category_id=${categoriesList?.id}`
      );
    });
  }
  if (isPLP && router?.asPath.includes("/c/brand") && brands?.length > 0) {
    pushListItem(0, "Home", DomainURL);
    pushListItem(
      1,
      brands?.[0]?.label,
      DomainURL +
        `/${brands?.[0]?.label}/c/brand?brand_name=${brands?.[0]?.value}`
    );
  }

  if (isPDP && filteredCategories?.length > 0) {
    pushListItem(0, "Home", DomainURL);
    filteredCategories.map((categoriesList: any, index: number) => {
      pushListItem(
        index + 1,
        categoriesList?.name,
        categoriesList?.level === 2
          ? `${DomainURL}/category/${categoriesList.url_key}`
          : categoriesList?.level === 3
          ? `${DomainURL}/${filteredCategories?.[0]?.url_key}/${filteredCategories?.[1]?.url_key}/c/${categoriesList?.id}?category_id=${categoriesList?.id}`
          : `${DomainURL}/${filteredCategories?.[0]?.url_key}/${filteredCategories?.[1]?.url_key}/${productData?.items?.[0]?.categories?.[2]?.url_key}/c/${categoriesList?.id}?category_id=${categoriesList?.id}`
      );
    });
    if (productData?.items?.[0]?.name) {
      pushListItem(
        filteredCategories?.length,
        productData?.items?.[0]?.name,
        `${DomainURL}/${productData?.items?.[0]?.name}`
      );
    }
  }

  const breadCrumbStructuredData = {
    "@context": `${process.env.NEXT_PUBLIC_SCHEMA_URL}/`,
    "@type": "BreadcrumbList",
    itemListElement: breadCrumbStructuredList,
  };

  const varinatFilter = () => {
    return props?.model?.items?.[0]?.variants
      ?.filter((prod: any) => prod?.product?.color == router?.query?.colorCode)
      ?.filter((item: any) => item?.product?.size == router?.query?.size);
  };

  const getAvailability = () => {
    const simpleStockStatus = props?.model?.items?.[0]?.stock_status;
    const variantStockStatus = varinatFilter()?.[0]?.product?.stock_status;
    return variantStockStatus || simpleStockStatus;
  };

  const productPDPData = {
    "@context": `${process.env.NEXT_PUBLIC_SCHEMA_URL}/`,
    "@type": "Product",
    name:
      props?.model?.items?.[0]?.type_id === "simple"
        ? props?.model?.items?.[0]?.name
        : varinatFilter()?.length > 0
        ? varinatFilter()?.[0]?.product?.name
        : props?.model?.items?.[0]?.name,
    image:
      props?.model?.items?.[0]?.type_id === "simple"
        ? props?.model?.items?.[0]?.image?.url
        : varinatFilter()?.length > 0
        ? varinatFilter()?.[0]?.product?.image?.url
        : props?.model?.items?.[0]?.image?.url,
    description: props?.model?.items?.[0]?.description?.html,
    "Product ID":
      props?.model?.items?.[0]?.type_id === "simple"
        ? props?.model?.items?.[0]?.sku
        : varinatFilter()?.length > 0
        ? varinatFilter()?.[0]?.product?.sku
        : props?.model?.items?.[0]?.sku,
    brand: {
      "@type": "Brand",
      name: props?.model?.items?.[0]?.brand_info,
    },
    offers: {
      "@type": "Offer",
      url: global?.window?.location?.href,
      priceCurrency: "INR",
      price:
        props?.model?.items?.[0]?.type_id === "simple"
          ? props?.model?.items?.[0]?.pmr_price_value?.amount?.value
          : varinatFilter()?.length > 0
          ? varinatFilter()?.[0]?.product?.pmr_price_value?.amount?.value
          : props?.model?.items?.[0]?.pmr_price_value?.amount?.value,
      availability:
        getAvailability() === "IN_STOCK"
          ? `${process.env.NEXT_PUBLIC_SCHEMA_URL}/InStock`
          : `${process.env.NEXT_PUBLIC_SCHEMA_URL}/OutStock`,
      itemCondition: `${process.env.NEXT_PUBLIC_SCHEMA_URL}/NewCondition`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: props?.model?.items?.[0]?.rating_summary,
      bestRating: props?.model?.items?.[0]?.best_rating,
      worstRating: props?.model?.items?.[0]?.worst_rating,
      ratingCount: props?.model?.items?.[0]?.rating_count,
      reviewCount: props?.model?.items?.[0]?.review_count,
    },
    review: {
      "@type": "Review",
      name: props?.model?.items?.[0]?.reviews?.items?.[0]?.summary,
      reviewBody: props?.model?.items?.[0]?.reviews?.items?.[0]?.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue:
          props?.model?.items?.[0]?.reviews?.items?.[0]?.average_rating,
        bestRating: props?.model?.items?.[0]?.best_rating,
        worstRating: props?.model?.items?.[0]?.worst_rating,
      },
      datePublished: props?.model?.items?.[0]?.reviews?.items?.[0]?.created_at,
      author: {
        "@type": "Person",
        name: props?.model?.items?.[0]?.reviews?.items?.[0]?.nickname,
      },
    },
  };

  const PLPData = {
    "@context": `${process.env.NEXT_PUBLIC_SCHEMA_URL}/`,
    "@type": "ItemList",
    itemListElement: schemaStructureData,
  };

  useEffect(() => {
    if (props?.pageNotFound === true) {
      router.push({
        pathname: window.location.origin + "/404",
      });
    }
  }, []);

  const setPageInfo = () => {
    if (isPLP || isPDP) {
      let pageRefererArray = JSON.parse(
        localStorage.getItem("pageReferrer") as string
      );
      const pageReferrer = {
        previousPageTitle: model?.title,
        previousPagePath: window.location.href,
      };
      if (pageRefererArray?.length > 0 && model?.title) {
        if (
          pageRefererArray?.[pageRefererArray?.length - 1]
            ?.previousPageTitle !== model?.title
        ) {
          pageRefererArray = [...pageRefererArray, pageReferrer];
        }
      } else if (model?.title) {
        pageRefererArray = [pageReferrer];
      }
      localStorage.setItem("pageReferrer", JSON.stringify(pageRefererArray));
    }
  };

  useEffect(() => {
    setPageInfo();
  }, [isPLP, isPDP]);

  useEffect(() => {
    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState == "visible") {
        if (isPLP || isPDP) {
          setItem("currentPageTitle", model?.title, "local");
          setItem(
            "currentPageType",
            isPLP
              ? router?.query?.pid?.includes("search")
                ? "slp"
                : "plp"
              : "pdp",
            "local"
          );
          setItem(
            "currentPageSlug",
            isPLP ? model?.slug : productData?.items?.[0]?.name,
            "local"
          );
          setItem("currentPageDesc", model?.description, "local");
        }
      } else {
        setPageInfo();
      }
    });
  }, []);

  useEffect(() => {
    if (isPDP) {
      let pageRenderStart = new Date().getTime();
      const Pageloadtime = () => {
        let pageLoadTime;
        let pageRenderFinish = new Date().getTime();
        let pageRenderTime = pageRenderFinish - pageRenderStart;
        if (localStorage.getItem("timeToFirstByte")) {
          pageLoadTime = localStorage.getItem("timeToFirstByte")
            ? localStorage.getItem("timeToFirstByte")
            : "" + pageRenderTime;
        } else {
          pageLoadTime = localStorage.getItem("timeToRouteChangeToRender")
            ? localStorage.getItem("timeToRouteChangeToRender")
            : "" + localStorage.getItem("timeToRenderPage");
        }
        localStorage.removeItem("timeToFirstByte");
        localStorage.removeItem("timeToRouteChangeToRender");
        localStorage.removeItem("timeToRenderPage");
        return Number(pageLoadTime);
      };
       const userType = global?.window?.localStorage?.getItem("userType")
         ? global?.window?.localStorage?.getItem("userType")
         : "guest_user";
       const isLoggedIn = global?.window?.localStorage?.getItem("accessToken");
       const customerType: string | null =
         global?.window?.localStorage?.getItem("customerType")
           ? global?.window?.localStorage?.getItem("customerType")
           : "guest_user";
      const handleRouteChange = () => {
        let loadTime = Pageloadtime();
        const seconds = Math.floor(loadTime / 1000);
        let previousPagePath, previousPageTitle;
        const pageReferer = JSON.parse(
          localStorage.getItem("pageReferrer") as string
        );
        if (pageReferer?.length && pageReferer?.length !== 1) {
          previousPagePath =
            pageReferer?.[pageReferer?.length - 2]?.previousPagePath;
          previousPageTitle =
            pageReferer?.[pageReferer?.length - 2]?.previousPageTitle;
        }
        ga.pageview(
          global?.window?.location?.href,
          "pdp",
          previousPageTitle || "na",
          getItem("customerID", "local")
            ? getItem("customerID", "local")
            : cookie.get("MADid"),
          getItem("customerID", "local") ? getItem("customerID", "local") : "",
          getItem("loyalitylevel", "local")
            ? getItem("loyalitylevel", "local")
            : "na",
          getItem("currentPageSlug", "local")
            ? getItem("currentPageSlug", "local")
            : "na",
          seconds,
          previousPagePath || "na",
          "",
          global?.window?.location?.href,
          "",
          "",
          "",
          userType || "na",
          isLoggedIn ? "loggedIn" : "guest",
          customerType,
        );
      };
      if (productData?.items?.[0]?.name) {
        handleRouteChange();
        return () => document.removeEventListener("load", handleRouteChange);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!router?.isFallback, productData?.items?.[0]?.name]);
  const userType = global?.window?.localStorage?.getItem("userType")
    ? global?.window?.localStorage?.getItem("userType")
    : "guest_user";
  const isLoggedIn = global?.window?.localStorage?.getItem("accessToken");
  const customerType: string | null = global?.window?.localStorage?.getItem(
    "customerType"
  )
    ? global?.window?.localStorage?.getItem("customerType")
    : "guest_user";
  useEffect(() => {
    if (isPLP) {
      let pageRenderStart = new Date().getTime();
      const Pageloadtime = () => {
        let pageLoadTime;
        let pageRenderFinish = new Date().getTime();
        let pageRenderTime = pageRenderFinish - pageRenderStart;
        if (localStorage.getItem("timeToFirstByte")) {
          pageLoadTime = localStorage.getItem("timeToFirstByte")
            ? localStorage.getItem("timeToFirstByte")
            : "" + pageRenderTime;
        } else {
          pageLoadTime = localStorage.getItem("timeToRouteChangeToRender")
            ? localStorage.getItem("timeToRouteChangeToRender")
            : "" + localStorage.getItem("timeToRenderPage");
        }
        localStorage.removeItem("timeToFirstByte");
        localStorage.removeItem("timeToRouteChangeToRender");
        localStorage.removeItem("timeToRenderPage");
        return Number(pageLoadTime);
      };
      const handleRouteChange = () => {
        let loadTime = Pageloadtime();
        const seconds = Math.floor(loadTime / 1000);
        let previousPagePath, previousPageTitle;
        const pageReferer = JSON.parse(
          localStorage.getItem("pageReferrer") as string
        );
        if (pageReferer?.length && pageReferer?.length !== 1) {
          previousPagePath =
            pageReferer?.[pageReferer?.length - 2]?.previousPagePath;
          previousPageTitle =
            pageReferer?.[pageReferer?.length - 2]?.previousPageTitle;
        }
        ga.pageview(
          global?.window?.location?.href,
          "plp",
          previousPageTitle || "na",
          getItem("customerID", "local")
            ? getItem("customerID", "local")
            : cookie.get("MADid"),
          getItem("customerID", "local") ? getItem("customerID", "local") : "",
          getItem("loyalitylevel", "local")
            ? getItem("loyalitylevel", "local")
            : "na",
          getItem("currentPageSlug", "local")
            ? getItem("currentPageSlug", "local")
            : "na",
          seconds,
          previousPagePath || "na",
        "",
        global?.window?.location?.href,
        "",
        "",
        "",
        userType || "na",
        isLoggedIn ? "loggedIn" : "guest",
        customerType,

        );
      };
      if (model?.slug) {
        handleRouteChange();
        return () => document.removeEventListener("load", handleRouteChange);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!router?.isFallback]);

  if (isPLP || isPDP) {
    setItem("currentPageTitle", model?.title, "local");
    setItem(
      "currentPageType",
      isPLP ? (router?.query?.pid?.includes("search") ? "slp" : "plp") : "pdp",
      "local"
    );
    setItem(
      "currentPageSlug",
      isPLP ? model?.slug : productData?.items?.[0]?.name,
      "local"
    );
    setItem("currentPageDesc", model?.description, "local");
  }

  // PLP filters, sort and page configurations
  useEffect(() => {
    if (isPLP && !router?.isFallback) {
      const productListingContent = components?.filter(
        (content: any, index: number) => {
          return content?.__component === "widget.product-listing";
        }
      )?.[0];
      const isVirtualCategory = productListingContent?.isVirtualCategory;
      setVirtualCategory(isVirtualCategory);
      const virtualProducts = productListingContent?.productsVC?.items;
      setVirtualCategoryProducts(productListingContent?.productsVC?.items);
      if (router.asPath.includes("?")) {
        if (window?.location?.search) {
          const filteredquery: any = window?.location?.search
            ?.replace("?", "")
            ?.split("&");
          let filterOptions: any = {};
          filteredquery.map((obj: any) => {
            if (
              !obj?.includes("search") &&
              !obj?.includes("sort") &&
              !obj?.includes("pid") &&
              !obj?.includes("page") &&
              !obj?.includes("sku") &&
              !obj?.includes("searchTitle") &&
              !obj?.includes("categoryFilter") &&
              (FILTER_FACETS?.includes(obj?.split("=")?.[0]) ||
                obj.includes("Filter"))
            ) {
              let name = obj?.split("=")?.[0];
              let options = obj?.split("=")?.[1];
              if (name === "price") {
                filterOptions[name] = { from: decodeURIComponent(options) };
              } else {
                filterOptions[name] = {
                  in: options
                    ?.replace("%20", " ")
                    ?.split("%2C")
                    ?.filter((a: any) => a !== "undefined"),
                };
              }
            }
            if (obj.split("=")?.[0] === "sort") {
              setSortData(decodeURIComponent(obj?.split("=")?.[1]));
            }
            if (obj.split("=")?.[0] === "page") {
              setPageNo(obj?.split("=")?.[1]);
            }
            if (obj.split("=")?.[0] === "categoryFilter") {
              setUnbxdCategoryPath(decodeURIComponent(obj?.split("=")?.[1]));
            }
          });
          if (isVirtualCategory && virtualProducts) {
            filterOptions["sku"] = {
              in: virtualProducts?.map((item: any) => {
                return item?.parent_sku;
              }),
            };
          }
          setFiltered(filterOptions);
        }
      } else if (isVirtualCategory && virtualProducts) {
        let filterOptions: any = {};
        filterOptions["sku"] = {
          in: virtualProducts?.map((item: any) => {
            return item?.parent_sku;
          }),
        };
        setFiltered(filterOptions);
      } else {
        setFiltered({});
      }
    }
  }, [router.asPath, router.query, global?.window?.location]);

  //PDP product availablity check

  const isAboutPage = router?.query?.pid?.includes("about") && isPDP;
  const productSku =
    router?.query?.pid?.[router?.query?.pid?.length - (isAboutPage ? 2 : 1)];

  const reMappedComponents = isAboutPage
    ? components?.filter(
        (component: any) => component?.__component == "slots.product-tabs"
      )
    : components;
  useEffect(() => {
    if (isPDP) {
      const pid = productSku || "";

      if (pageId === pid) {
        if (pid && model) {
          if (model?.items?.length > 0) {
            AxiosInstance(
              PDP_PRICE_JSON_QUERY(JSON.stringify(pid)),
              false,
              false,
              process.env.NEXT_PUBLIC_PDP_PRICE
            )
              .then((res) => {
                const { products } = res?.data?.data;

                if (products?.items?.length > 0) {
                  const modelItems = model?.items?.[0];
                  const productItems = products?.items?.[0];
                  const configurable_options_concat = [],
                    variants_concat = [];

                  const configurable_options_model =
                    modelItems.configurable_options;
                  const configurable_options_items =
                    productItems.configurable_options;

                  const variants_model = modelItems.variants;
                  const variants_items = productItems.variants;

                  for (let i = 0; i < variants_model.length; i++) {
                    variants_concat.push({
                      product: {
                        ...variants_model[i].product,
                        ...variants_items[i].product,
                      },
                    });
                  }

                  for (let i = 0; i < configurable_options_model.length; i++) {
                    const values = [];

                    for (
                      let vi = 0;
                      vi < configurable_options_model[i].values.length;
                      vi++
                    ) {
                      values.push({
                        ...configurable_options_model[i].values[vi],
                        ...configurable_options_items[i].values[vi],
                      });
                    }

                    configurable_options_concat.push({
                      ...configurable_options_model[i],
                      ...configurable_options_items[i],
                      values: values,
                    });
                  }

                  // Override
                  const items = [
                    {
                      ...modelItems,
                      configurable_options: configurable_options_concat,
                      variants: variants_concat,
                      pmr_price_value: productItems.pmr_price_value,
                      AvailablePromotions: productItems.AvailablePromotions,
                      stock_status: productItems.stock_status,
                      price_range: productItems.price_range,
                      is_out_of_stock: productItems?.is_out_of_stock,
                      freeProduct: productItems?.free_product_description && {
                        description: productItems?.free_product_description,
                        know_more_text:
                          productItems?.free_product_know_more_label,
                        know_more_link:
                          productItems?.free_product_know_more_link,
                      },
                    },
                  ];

                  model &&
                    setProductData({
                      ...model,
                      items: items,
                    });
                }
              })
              .catch((err) => {
                console.error(err);
                // router.push(`${window.location.origin}/404?path=${router.asPath}`);
              });
          } else {
            router.push(`${window.location.origin}/404?path=${router.asPath}`);
          }
        }
      } else if (productSku) {
        client
          .query({
            query: PRODUCT_DATA_SKU,
            variables: {
              sku: productSku,
            },
          })
          .then((res) => {
            if (res?.data?.products?.items?.length > 0)
              setProductData(res?.data?.products);
            else
              router.push(
                `${window.location.origin}/404?path=${router.asPath}`
              );
          })
          .catch((err) => {
            console.error(err);
            router.push(`${window.location.origin}/404?path=${router.asPath}`);
          });
      }
    }
  }, [model, pageId]);

  //PDP about the brand component fetching data from CMS
  useEffect(() => {
    if (isPDP) {
      if (brandName) {
        AxiosInstance(
          `${NEXT_PUBLIC_CMS_URL}/api/brand-infos?filters[brand][$eq]=${brandName}`,
          true,
          false
        ).then((response) => {
          setAboutbrand(response?.data?.data?.[0]);
        });
      }
      const primaryLevels = productData?.items?.[0]?.categories?.filter(
        (obj: any) => obj?.is_primary > 0
      );
      const nonPrimaryLevels = productData?.items?.[0]?.categories?.filter(
        (obj: any) => obj?.is_primary === 0
      );
      let filteredArr =
        primaryLevels?.length > 0
          ? primaryLevels?.filter(({ level }: any, index: number) => {
              return (
                index ===
                primaryLevels.findIndex(
                  (other: any) =>
                    level === other.level && other?.name !== "Default Category"
                )
              );
            })
          : nonPrimaryLevels?.filter(({ level }: any, index: number) => {
              return (
                index ===
                nonPrimaryLevels.findIndex(
                  (other: any) =>
                    level === other.level && other?.name !== "Default Category"
                )
              );
            });
      let sortArr = filteredArr?.sort((a: any, b: any) => a?.level - b?.level);
      setFilteredCategories(sortArr);
    }
  }, [productData]);


  // PDP highlights binding
  const benefitsData = productData?.items?.[0]?.product_highlighter
    ? productData?.items?.[0]?.product_highlighter?.split(",")
    : undefined;

  const addressData = {
    bgColor: " #FAFAFA",
    bgPadding: "3% 5%",
    id: "678",
    __component: "widget.benefits",
    backEndItems: benefitsData,
  };

  useEffect(() => {
    if (!router?.isFallback && isPDP) {
      setLoader(false);
    }
  }, [router]);

  //Scroll Events Analytics
  callScrollEvent();
  useEffect(() => {
    setSSBeautyLogos({
      ...SSBeautyLogos,
      appLogos: props?.appLogos?.data?.appIcons?.items,
    });
  }, [props?.appLogos]);

  const initialCatLevel = (checkVal: any) => {
    return {
      level: 0,
      id: checkVal?.[0]?.id,
      name: checkVal?.[0]?.name,
      path: checkVal?.[0]?.path,
      product_count: checkVal?.[0]?.product_count,
      url_key: checkVal?.[0]?.url_key,
    };
  };

  const filterByProperty = async (array: any, prop: any, value: any) => {
    var filtered: any = [];
    array?.map((level1: any) => {
      if (level1[prop] === value) {
        return null;
      } else {
        level1.children?.map((level2: any) => {
          if (level2[prop] === value) {
            filtered.push({
              level: 1,
              id: level2?.id,
              name: level2?.name,
              path: level2?.path,
              product_count: level2?.product_count,
              url_key: level2?.url_key,
            });
            let checkVal = array?.filter((val: any) => {
              return (
                val?.name === "Luxe" &&
                val?.name === level1?.name &&
                val?.level === 1
              );
            });
            if (checkVal?.length > 0) {
              filtered.unshift(initialCatLevel(checkVal));
            }
          } else {
            level2.children?.map((level3: any) => {
              if (level3[prop] === value) {
                filtered.push(
                  {
                    level: 1,
                    id: level2?.id,
                    name: level2?.name,
                    path: level2?.path,
                    product_count: level2?.product_count,
                    url_key: level2?.url_key,
                  },
                  {
                    level: 2,
                    id: level3?.id,
                    name: level3?.name,
                    path: level3?.path,
                    product_count: level3?.product_count,
                    url_key: level3?.url_key,
                  }
                );
                let checkVal = array?.filter((val: any) => {
                  return (
                    val?.name === "Luxe" &&
                    val?.name === level1?.name &&
                    val?.level === 1
                  );
                });
                if (checkVal?.length > 0) {
                  filtered.unshift(initialCatLevel(checkVal));
                }
              } else {
                level3.children?.map((level4: any) => {
                  if (level4[prop] === value) {
                    filtered.push(
                      {
                        level: 1,
                        id: level2?.id,
                        name: level2?.name,
                        path: level2?.path,
                        product_count: level2?.product_count,
                        url_key: level2?.url_key,
                      },
                      {
                        level: 2,
                        id: level3?.id,
                        name: level3?.name,
                        path: level3?.path,
                        product_count: level3?.product_count,
                        url_key: level3?.url_key,
                      },
                      {
                        level: 3,
                        id: level4?.id,
                        name: level4?.name,
                        path: level4?.path,
                        product_count: level4?.product_count,
                        url_key: level4?.url_key,
                      }
                    );
                    let checkVal = array?.filter((val: any) => {
                      return (
                        val?.name === "Luxe" &&
                        val?.name === level1?.name &&
                        val?.level === 1
                      );
                    });
                    if (checkVal?.length > 0) {
                      filtered.unshift(initialCatLevel(checkVal));
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
    return filtered;
  };

  useEffect(() => {
    if (isPLP) {
      filterByProperty(
        props?.model?.categoryList?.category?.children,
        "id",
        Number(model?.slug)
      ).then((res: any) => {
        setBreadCrumbPLP(res);
        const categoryPathValue = res
          ?.map((categoriesList: any) => categoriesList.name)
          .join(">");
        setCategoryPath(categoryPathValue);
      });
    }
  }, [router]);

  return (
    <>
      {(isPDP || isPLP) && !router?.isFallback && (
        <div>
          <Head>
            {isPDP && (
              <title>
                {` Buy ${model?.items?.[0]?.name} Online at Best Price in India | SSBeauty`}
              </title>
            )}
            {model?.seo?.map((el: any) => {
              switch (el?.tagType?.toLowerCase()) {
                case "meta":
                  return (
                    <>
                      {["Title", "title"].includes(el?.name) && (
                        <title>{el?.content}</title>
                      )}
                      <meta name={el?.name} content={el?.content}></meta>
                    </>
                  );
                case "link":
                  return <link rel={el?.name} href={el?.content}></link>;
                case "script": {
                  if (el?.content) {
                    return <script async src={`${el?.content}`}></script>;
                  } else {
                    return (
                      <script async type="text/javascript">
                        {" "}
                        {el?.script}{" "}
                      </script>
                    );
                  }
                }
                default:
                  return;
              }
            })}
            {isPDP && (
              <>
                <meta
                  property="og:title"
                  content={`Buy ${model?.items?.[0]?.name} Online at Best Price in India | SSBeauty`}
                />
                <meta property="og:type" content="website" />
                <meta
                  property="og:url"
                  content={global?.window?.location?.href}
                />
                <meta
                  property="og:image"
                  content={
                    model?.items?.[0]?.variants?.filter((obj: any) => {
                      obj.product?.color === router?.query?.colorCode;
                    })?.length > 0
                      ? model?.items?.[0]?.variants?.filter((obj: any) => {
                          obj.product?.color === router?.query?.colorCode;
                        })?.[0]?.product?.image?.url
                      : model?.items?.[0]?.variants?.[0]?.product?.image?.url
                  }
                />
                <meta property="og:image:width" content="200" />
                <meta property="og:image:height" content="200" />
                <meta
                  property="og:description"
                  content={`Buy ${model?.items?.[0]?.name} online. SSBeauty offers a wide range of ${model?.items?.[0]?.categories?.[0]?.name} products at best prices in India. Buy ${model?.items?.[0]?.name} now!`}
                />
                <meta property="og:site_name" content="SSBeauty" />
                <meta
                  name="title"
                  content={`Buy ${model?.items?.[0]?.name} Online at Best Price in India | SSBeauty`}
                />
                <meta
                  name="description"
                  content={`Buy ${model?.items?.[0]?.name} online. SSBeauty offers a wide range of ${model?.items?.[0]?.categories?.[0]?.name} products at best prices in India. Buy ${model?.items?.[0]?.name} now!`}
                />
              </>
            )}
            {isPLP && (
              <>
                <meta
                  property="og:title"
                  content={model?.title || model?.description}
                />
                <meta property="og:type" content="website" />
                <meta
                  property="og:url"
                  content={global?.window?.location?.href}
                />
                <meta property="og:image" content="/ssblogo_favicon.png" />
                <meta property="og:image:width" content="200" />
                <meta property="og:image:height" content="200" />
                <meta property="og:description" content={model?.description} />
                <meta property="og:site_name" content="SSBeauty" />
              </>
            )}
            {!isPLP && !isPDP && (
              <>
                <meta property="og:title" content={model?.description} />
                <meta property="og:type" content="website" />
                <meta
                  property="og:url"
                  content={global?.window?.location?.href}
                />
                <meta property="og:image" content="/ssblogo_favicon.png" />
                <meta property="og:image:width" content="200" />
                <meta property="og:image:height" content="200" />
                <meta property="og:description" content={model?.description} />
                <meta property="og:site_name" content="SSBeauty" />
              </>
            )}
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(attributes){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config','${
                  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE
                }',
                ${JSON.parse(
                  JSON.stringify(
                    `{"debug_mode": ${
                      process.env.NEXT_PUBLIC_TRACING_ENVIRONMENT === "prod"
                    }, "send_page_view": false}`
                  )
                )});`,
              }}
            />
            <meta
              property="al:ios:url"
              content={global?.window?.location?.href.replace(
                global?.window?.location?.origin,
                NEXT_PUBLIC_APP_LINK_META_TAG_DOMAIN
              )}
            />
            <meta
              property="al:android:url"
              content={global?.window?.location?.href.replace(
                global?.window?.location?.origin,
                NEXT_PUBLIC_APP_LINK_META_TAG_DOMAIN
              )}
            />
            <meta
              property="al:ios:app_store_id"
              content={NEXT_PUBLIC_APP_STORE_ID}
            />
            <meta property="al:ios:app_name" content={NEXT_PUBLIC_APP_NAME} />
            <meta
              property="al:android:package"
              content={NEXT_PUBLIC_ANDRIOD_APP_PACKAGE}
            />
            <meta
              property="al:android:app_name"
              content={NEXT_PUBLIC_APP_NAME}
            />
            <meta
              property="al:web:should_fallback"
              content={NEXT_PUBLIC_WEB_FALL_BACK}
            />
            <meta
              name="apple-itunes-app"
              content={`app-id=${NEXT_PUBLIC_APP_STORE_ID}, app-argument=${global?.window?.location?.href.replace(
                global?.window?.location?.origin,
                NEXT_PUBLIC_APP_LINK_META_TAG_DOMAIN
              )}`}
            />
            <link
              rel="canonical"
              href={
                isPLP
                  ? global?.window?.location?.href?.includes("&page=")
                    ? global?.window?.location?.href?.split("&page=")?.[0]
                    : global?.window?.location?.href?.split("?page=")?.[0]
                  : global?.window?.location?.href?.split("?")?.[0]
              }
            />
            <script
              async
              key="structured-data"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(structureData),
              }}
            />
            <Script
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `window.webengageWidgetInit = window.webengageWidgetInit || function(){
              webengage.init( {
                  licenseCode : 'in~~10a5cba9c'
              }).onReady(function() {
                  webengage.render();
                  webengage.survey.render();
                webengage.notification.render();
              });
          };
          (function(d){
          var _we = d.createElement('script');
          _we.type = 'text/javascript';
          _we.defer = true;
          _we.src = (d.location.protocol == 'https:' ? 'https://ssl.widgets.webengage.com' : 'http://cdn.widgets.webengage.com') + "/js/widget/webengage-min-v-3.0.js";
          var _sNode = d.getElementById('_webengage_script_tag');
          _sNode.parentNode.insertBefore(_we, _sNode);
        })(document)`,
              }}
            />
            <script
              async
              key="breadCrumbs-data"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadCrumbStructuredData),
              }}
            />
            {isPDP && (
              <script
                async
                key="product-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(productPDPData),
                }}
              />
            )}
            {isPLP && (
              <script
                async
                key="PLP-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(PLPData),
                }}
              />
            )}
            {/* {(isPLP || isPDP) && Clarity()} */}
          </Head>
          {displayLoader && <Loader />}
          <BackToTopButton />
          <LocationIntelligence />
          <Box width={"100%"}>
            {headerComponent && (
              <Header
                {...headerComponent}
                isHideBottomNav={true}
                attribute={model}
                isPLP={isPLP}
                isPDP={isPDP}
                productData={productData}
              />
            )}
            <Grid sx={{ margin: "0 auto", maxWidth: "1440px" }}>
              {isPDP ? (
                !isAboutPage ? (
                  filteredCategories?.length > 0 && (
                    <Grid sx={{ padding: "0 5% 40px 5%" }}>
                      <Typography
                        component="span"
                        onClick={() => {
                          router.push("/home");
                        }}
                        sx={{
                          cursor: "pointer",
                          color: "#AD184C",
                          fontSize: "12px",
                          lineHeight: "14px",
                        }}>
                        Home
                      </Typography>
                      {filteredCategories?.map(
                        (categoriesList: any, index: number) => {
                          return (
                            <>
                              <Typography
                                component="span"
                                sx={{
                                  cursor: "pointer",
                                  color: "#AD184C",
                                  fontSize: "12px",
                                  lineHeight: "14px",
                                }}
                                onClick={() => {
                                  if (categoriesList?.level === 2) {
                                    window.location.assign(
                                      `/category/${categoriesList.url_key}`
                                    );
                                  } else {
                                    if (categoriesList?.level === 3) {
                                      window.location.assign(
                                        `${window.location.origin}/${filteredCategories?.[0]?.url_key}/${filteredCategories?.[1]?.url_key}/c/${categoriesList?.id}?category_id=${categoriesList?.id}`
                                      );
                                    }
                                    if (categoriesList?.level === 4) {
                                      window.location.assign(
                                        `${window.location.origin}/${filteredCategories?.[0]?.url_key}/${filteredCategories?.[1]?.url_key}/${productData?.items?.[0]?.categories?.[2]?.url_key}/c/${categoriesList?.id}?category_id=${categoriesList?.id}`
                                      );
                                    }
                                  }
                                }}>
                                / {categoriesList?.name}
                              </Typography>
                            </>
                          );
                        }
                      )}
                      {productData?.items?.[0]?.name && (
                        <Typography
                          sx={{
                            cursor: "pointer",
                            fontSize: "12px",
                            lineHeight: "14px",
                          }}
                          component="span">
                          / {productData?.items?.[0]?.name}
                        </Typography>
                      )}
                    </Grid>
                  )
                ) : (
                  <Grid sx={{ padding: "0 5% 40px 5%" }}>
                    <Stack
                      sx={{ cursor: "pointer" }}
                      direction={"row"}
                      gap={"1rem"}
                      onClick={() => {
                        const splitUrl = router?.asPath?.split("?");
                        const basePath = isAboutPage
                          ? splitUrl?.[0]
                              ?.split("/")
                              ?.filter(
                                (item: any, index: number, arr: any[]) =>
                                  Boolean(item) && index < arr?.length - 1
                              )
                              ?.join("/")
                          : `${splitUrl?.[0]}/about`;

                        const queryParams = splitUrl?.[1];
                        router?.push(
                          `${basePath}${queryParams ? "?" + queryParams : ""}`
                        );
                      }}>
                      <ArrowBackIcon />
                      <Typography>{"Product Description"}</Typography>
                    </Stack>
                  </Grid>
                )
              ) : (
                <></>
              )}
              {isPLP && router?.asPath?.includes("search") && (
                <Grid sx={{ padding: "35px 5% 40px 5%" }}>
                  <Typography
                    component="span"
                    onClick={() => {
                      router.push("/home");
                    }}
                    sx={{
                      cursor: "pointer",
                      color: "#AD184C",
                      fontSize: "12px",
                      lineHeight: "14px",
                    }}>
                    Home
                  </Typography>
                  {
                    <Typography
                      component="span"
                      sx={{
                        cursor: "pointer",
                        color: "#231F20",
                        fontSize: "12px",
                        lineHeight: "14px",
                        textTransform: "capitalize",
                      }}>
                      / Search
                    </Typography>
                  }
                </Grid>
              )}
              {isPLP &&
                !router?.asPath.includes("/c/brand") &&
                !router?.asPath?.includes("search") &&
                model.components?.filter(
                  (key: any) => key?.__component == "widget.product-listing"
                )?.[0]?.isVirtualCategory &&
                model.components?.filter(
                  (key: any) => key?.__component == "widget.product-listing"
                )?.[0]?.title && (
                  <Grid sx={{ padding: "0 5% 40px 5%" }}>
                    <Typography
                      component="span"
                      onClick={() => {
                        router.push("/home");
                      }}
                      sx={{
                        cursor: "pointer",
                        color: "#AD184C",
                        fontSize: "12px",
                        lineHeight: "14px",
                      }}>
                      Home
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        cursor: "pointer",
                        color: "#231F20",
                        fontSize: "12px",
                        lineHeight: "14px",
                      }}>
                      /{" "}
                      {
                        model.components?.filter(
                          (key: any) =>
                            key?.__component == "widget.product-listing"
                        )?.[0]?.title
                      }
                    </Typography>
                  </Grid>
                )}
              {isPLP && router?.asPath?.includes("/beauty-profile") && (
                <Grid sx={{ padding: "0 5% 40px 5%" }}>
                  <Typography
                    component="span"
                    onClick={() => {
                      router.push("/home");
                    }}
                    sx={{
                      cursor: "pointer",
                      color: "#AD184C",
                      fontSize: "12px",
                      lineHeight: "14px",
                    }}>
                    Home
                  </Typography>
                  {
                    <Typography
                      component="span"
                      sx={{
                        cursor: "pointer",
                        color: "#231F20",
                        fontSize: "12px",
                        lineHeight: "14px",
                        textTransform: "capitalize",
                      }}>
                      / beauty-profile
                    </Typography>
                  }
                </Grid>
              )}
              {isPLP &&
                (categories?.length > 0 || breadCrumbPLP?.length > 0) &&
                !router?.asPath.includes("/c/brand") &&
                !router?.asPath?.includes("search") && (
                  <Grid sx={{ padding: "15px 5% 40px 5% "}}>
                    <Typography
                      component="span"
                      onClick={() => {
                        router.push("/home");
                      }}
                      sx={{
                        cursor: "pointer",
                        color: "#AD184C",
                        fontSize: "12px",
                        lineHeight: "14px",
                      }}>
                      Home
                    </Typography>
                    {breadCrumbPLP?.length > 0
                      ? breadCrumbPLP?.map(
                          (categoriesList: any, index: number) => {
                            return (
                              <>
                                <Typography
                                  component="span"
                                  sx={{
                                    cursor: "pointer",
                                    color:
                                      index === breadCrumbPLP?.length - 1
                                        ? "#231F20"
                                        : "#AD184C",
                                    fontSize: "12px",
                                    lineHeight: "14px",
                                  }}
                                  onClick={() => {
                                    if (
                                      categoriesList?.level === 0 ||
                                      categoriesList?.level === 1
                                    ) {
                                      window.location.assign(
                                        `/category/${categoriesList.url_key}`
                                      );
                                    } else {
                                      if (categoriesList?.level === 2) {
                                        window.location.assign(
                                          `${window.location.origin}/${
                                            breadCrumbPLP?.[0]?.url_key ||
                                            "Luxe"
                                          }/${breadCrumbPLP?.[1]?.url_key}/c/${
                                            categoriesList?.id
                                          }?category_id=${categoriesList?.id}`
                                        );
                                      }
                                      if (categoriesList?.level === 3) {
                                        window.location.assign(
                                          `${window.location.origin}/${
                                            breadCrumbPLP?.[0]?.url_key ||
                                            "Luxe"
                                          }/${breadCrumbPLP?.[1]?.url_key}/${
                                            breadCrumbPLP?.[2]?.url_key
                                          }/c/${
                                            categoriesList?.id
                                          }?category_id=${categoriesList?.id}`
                                        );
                                      }
                                      if (categoriesList?.level === 4) {
                                        window.location.assign(
                                          `${window.location.origin}/${
                                            breadCrumbPLP?.[0]?.url_key ||
                                            "Luxe"
                                          }/${breadCrumbPLP?.[1]?.url_key}/${
                                            breadCrumbPLP?.[2]?.url_key
                                          }/${breadCrumbPLP?.[3]?.url_key}/c/${
                                            categoriesList?.id
                                          }?category_id=${categoriesList?.id}`
                                        );
                                      }
                                    }
                                  }}>
                                  / {categoriesList?.name}
                                </Typography>
                              </>
                            );
                          }
                        )
                      : categories?.map(
                          (categoriesList: any, index: number) => {
                            return (
                              <>
                                <Typography
                                  component="span"
                                  sx={{
                                    cursor: "pointer",
                                    color:
                                      index === categories?.length - 1
                                        ? "#231F20"
                                        : "#AD184C",
                                    fontSize: "12px",
                                    lineHeight: "14px",
                                  }}
                                  onClick={() => {
                                    if (categoriesList?.level === 2) {
                                      window.location.assign(
                                        `/category/${categoriesList.url_key}`
                                      );
                                    } else {
                                      if (categoriesList?.level === 3) {
                                        window.location.assign(
                                          `${window.location.origin}/${categories?.[0]?.url_key}/${categories?.[1]?.url_key}/c/${categoriesList?.id}?category_id=${categoriesList?.id}`
                                        );
                                      }
                                      if (categoriesList?.level === 4) {
                                        window.location.assign(
                                          `${window.location.origin}/${categories?.[0]?.url_key}/${categories?.[1]?.url_key}/${categories?.[2]?.url_key}/c/${categoriesList?.id}?category_id=${categoriesList?.id}`
                                        );
                                      }
                                    }
                                  }}>
                                  / {categoriesList?.name}
                                </Typography>
                              </>
                            );
                          }
                        )}
                  </Grid>
                )}
              {isPLP &&
                router?.asPath.includes("/c/brand") &&
                !router?.asPath?.includes("search") &&
                brands?.length > 0 && (
                  <Grid sx={{ padding : isMobile ? "10% 5% 40px 5%" : "0 5% 40px 5%" }}>
                    <Typography
                      component="span"
                      onClick={() => {
                        router.push("/home");
                      }}
                      sx={{
                        cursor: "pointer",
                        color: "#AD184C",
                        fontSize: "12px",
                        lineHeight: "14px",
                      }}>
                      Home
                    </Typography>
                    {
                      <Typography
                        component="span"
                        sx={{
                          cursor: "pointer",
                          color: "#231F20",
                          fontSize: "12px",
                          lineHeight: "14px",
                          textTransform: "capitalize",
                        }}
                        onClick={() => {
                          window?.location?.assign(
                            `${window?.location?.origin}/${brands?.[0]?.label}/c/brand?brand_name=${brands?.[0]?.value}`
                          );
                        }}>
                        / {brands?.[0]?.label}
                      </Typography>
                    }
                  </Grid>
                )}
              {reMappedComponents?.map((component: any, index: number) => {
                if (
                  component?.visibility === null ||
                  !component?.visibility ||
                  component?.visibility === "all" ||
                  component?.visibility === "web"
                ) {
                  if (component?.__component == "widget.expert-advice") {
                    return (
                      <RenderComponent
                        Component={PdpBanner}
                        data={{ ...pdpbannerdata, ...component, productData }}
                        key={index}
                      />
                    );
                  }
                  if (component?.__component == "widget.horizontal-spacer") {
                    return (
                      <RenderComponent
                        Component={HorizontalSpacer}
                        data={component}
                        key={index}
                      />
                    );
                  }
                  if (component?.__component == "slots.product-details") {
                    return (
                      <RenderComponent
                        Component={PDPBlockComponent}
                        data={{
                          productData: { ...model, ...productData },
                          component,
                          isPDP,
                          totalCount,
                        }}
                        key={index}
                      />
                    );
                  }
                  if (
                    component?.__component == "slots.product-highlights" &&
                    benefitsData?.length > 0
                  ) {
                    return (
                      <RenderComponent
                        Component={ProductHighLights}
                        data={{ ...addressData, ...component }}
                        key={index}
                      />
                    );
                  }
                  if (
                    component?.__component == "slots.product-tabs" &&
                    model?.items?.[0]
                  ) {
                    return (
                      <RenderComponent
                        Component={MultiTabs}
                        key={index}
                        data={{
                          isAboutPage,
                          modelData: { ...model?.items?.[0], ...component },
                        }}
                      />
                    );
                  }
                  if (
                    component?.__component == "slots.product-reviews" &&
                    productData
                  ) {
                    return (
                      <RenderComponent
                        key={index}
                        Component={ProductQA}
                        data={{
                          ProductQAData: ProductQAData,
                          productData: productData,
                          component: component,
                        }}
                      />
                    );
                  }
                  if (
                    component?.__component == "slots.product-brand" &&
                    aboutbrand
                  ) {
                    return (
                      <RenderComponent
                        Component={BrandDescription}
                        data={{ ...aboutbrand, ...component }}
                        key={index}
                        position={index}
                      />
                    );
                  }
                  if (component?.__component == "slots.product-videos") {
                    return (
                      <RenderComponent
                        Component={BeautyInspiriation}
                        data={{ productData, ...component }}
                        key={index}
                        position={index}
                      />
                    );
                  }
                  if (component.__component == "widget.hero-banner") {
                    return (
                      <RenderComponent
                        Component={HeroBanner}
                        data={component}
                        key={index}
                        position={index}
                      />
                    );
                  }
                  if (component.__component == "widget.single-banner") {
                    return (
                      <RenderComponent
                        Component={SingleBanner}
                        data={component}
                        key={index}
                        position={index}
                      />
                    );
                  }
                  if (component.__component == "widget.product-listing") {
                    return (
                      <>
                        {filtered && (
                          <ProductLayout
                            setLoader={setLoader}
                            displayLoader={displayLoader}
                            params={router?.query}
                            filteredOptions={filtered}
                            pageTitle={model?.title}
                            pageNo={pageNo}
                            sortData={sortData}
                            setSortData={setSortData}
                            virtualCatgeoryProducts={virtualCatgeoryProducts}
                            componentData={component}
                            categoryListCheck={props?.model?.categoryList}
                            slug={model?.slug}
                            categoryPath={categoryPath}
                            isVirtualCategory={isVirtualCategory}
                            unbxdCategoryPath={unbxdCategoryPath}
                            setUnbxdCategoryPath={setUnbxdCategoryPath}
                          />
                        )}
                      </>
                    );
                  }
                  if (component.__component == "slots.product-carousel") {
                    let dataObj = { ...component, productData: productData };

                    return (
                      <LazyloadComponents
                        Component={component.__component}
                        data={dataObj}
                        key={dataObj.title}
                        position={index}
                      />
                    );
                  }
                  if (component.__component == "slots.unbxd-carousel") {
                    let dataObj = { ...component, productData: productData };

                    return (
                      <RenderComponent
                        Component={UNBXDWidget}
                        data={dataObj}
                        key={component.widgetId}
                        position={index}
                      />
                    );
                  }
                  if (component.__component == "widget.shop-by-collection") {
                    return (
                      <RenderComponent
                        Component={ShopByCollection}
                        data={component}
                        key={index}
                        position={index}
                      />
                    );
                  }
                  if (component?.__component == "widget.horizontal-spacer") {
                    return (
                      <RenderComponent
                        Component={HorizontalSpacer}
                        data={component}
                        key={index}
                      />
                    );
                  }
                }
              })}
            </Grid>
            {footerPayment && <FooterPayment {...footerPayment} />}
            {footerSubscribe && <FooterSubscribe {...footerSubscribe} />}
            {footerBenefits && <Benefits {...footerBenefits} />}
            {footerComponent && <Footer {...footerComponent} />}
            {footerBottom && <FooterBottom items={footerBottom} />}
            {footerCopyRights && <FooterCopyRights {...footerCopyRights} />}
          </Box>
          {/* <ChatBotWidget/> */}
        </div>
      )}
      {!isPDP && !isPLP && !router?.isFallback && (
        <ComponentRenderingUtility
          props={props}
          analyticsPageType="page"
          currentPageType="Home"
        />
      )}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const isPLP = context?.params?.pid?.includes("c");
  const isPDP = context?.params?.pid?.includes("p");
  const isAbout = isPDP && context?.params?.pid?.includes("about");
  const res = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/${
      isPLP ? "plps" : isPDP ? "pdps" : "pages"
    }?filters[slug][$eq]=${
      isPDP
        ? `beauty&time=${new Date().toString()}`
        : context?.params?.pid?.[
            context?.params.pid?.length - (isAbout ? 2 : 1)
          ]
    }&publicationState=live`
  );
  const appIcons = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/app-settings/1?populate[appIcons][populate]=*`
  );
  const headerData = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/headers?filters[slug][$eq]=ssb-header&publicationState=live`
  );
  const header = await headerData.json();
  const pageData = await res.json();
  const appLogos = await appIcons.json();
  let productData = {};
  let categoryList = null;
  if (isPLP) {
    await AxiosInstance(CATEGORYLISTJSON)
      .then((response) => {
        categoryList = response?.data?.data;
      })
      .catch(function (error: any) {});
  }
  if (isPDP) {
    if (process.env.NEXT_PUBLIC_DISABLE_PRODUCTS_POST_CALL_PDP === "true") {
      productData = await AxiosInstance(
        PDP_JSON_QUERY(
          JSON.stringify(
            context.params.pid?.[context.params.pid?.length - (isAbout ? 2 : 1)]
          )
        ),
        false,
        false,
        process?.env?.NEXT_PUBLIC_PDP_URL
      )
        .then((res) => {
          return res?.data?.data?.products;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      productData = await client
        .query({
          query: PRODUCT_DATA_SKU,
          variables: {
            sku: context.params.pid?.[
              context.params.pid?.length - (isAbout ? 2 : 1)
            ],
          },
          fetchPolicy: "no-cache",
          errorPolicy: "ignore",
        })
        .then((res) => {
          return res?.data?.products;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  const data = isPDP
    ? { ...pageData.data[0], ...productData }
    : isPLP
    ? { ...pageData?.data[0], categoryList: categoryList }
    : { ...pageData?.data[0] };

  if (data?.error) {
    logger.error(
      {
        URL: `${NEXT_PUBLIC_CMS_URL}/api/pages?filters[slug][$eq]=${context.params.pid}`,
        type: "server",
        Response: data?.error,
      },
      `${data?.error?.message}`
    );
  }

  const pageNotFound =
    pageData?.data?.[0]?.components?.length > 0 ? false : true;

  if (pageNotFound) {
    return {
      notFound: true,
    };
  }

  if (
    isPDP &&
    (data == null || data?.items == null || data?.items?.length === 0)
  ) {
    return {
      notFound: true,
    };
  }

  if (isPDP) {
    return {
      props: {
        pageNotFound,
        model: data || null,
        appLogos: appLogos,
        header: header || null,
        isPLP: isPLP,
        isPDP: isPDP,
        pageId:
          context.params.pid?.[context.params.pid?.length - (isAbout ? 2 : 1)],
      }, // will be passed to the page component as props
      // revalidate: 60 * 240, // 240 Minutes (4 Hours)
    };
  } else {
    return {
      props: {
        pageNotFound,
        model: data || null,
        appLogos: appLogos,
        header: header || null,
        isPLP: isPLP,
        isPDP: isPDP,
        pageId: context.params.pid?.[context.params.pid?.length - 1],
      }, // will be passed to the page component as props
      // revalidate: 60 * 240, // 240 Minutes (4 Hours)
    };
  }
}
