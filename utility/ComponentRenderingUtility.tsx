import { useState, useEffect } from "react";
import useStorage from "./useStoarge";
import * as ga from "../lib/ga";
import Head from "next/head";
import LocationIntelligence from "../components/LocationIntelligence/LocationIntelligence";
import { LazyloadComponents } from "../HOC/RenderComponent/RenderComponent";
import Footer from "../components/Footer/Footer";
import FooterCopyRights from "../components/FooterCopyRights/FooterCopyRights";
import FooterBottom from "../components/FooterBottom/FooterBottom";
import BreadcrumbNavigation from "../components/BreadcrumbNavigation/BreadcrumbNav";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";
import BlogDropDown from "../components/BlogDropDown/BlogNavigation";
import { callScrollEvent } from "./ScrollEventAnalytics";
import { CustomSnackBar } from "../HOC/CustomSnackBar/CustomSnackBar";
import { SSBLogos } from "../recoilstore";
import { useRecoilState } from "recoil";
import { Grid } from "@mui/material";
import { Cookies } from "react-cookie";
import FooterPayment from "../components/FooterPayment";
import FooterSubscribe from "../components/FooterSubscribe/FooterSubscribe";
import Benefits from "../components/Benefits/Benefits";
import { useRouter } from "next/router";
import { chatBotUtility } from "./chatBotObjUtility";
import Script from "next/script";
import { Clarity } from "./Clarity";
import dynamic from "next/dynamic";
import StoreModeSwitch from "../components/Header/StoreModeSwitch";


const Header = dynamic(() => import("../components/Header/Header"), { ssr: true });

const DomainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;
const NEXT_PUBLIC_APP_LINK_META_TAG_DOMAIN: any =
  process.env.NEXT_PUBLIC_APP_LINK_META_TAG_DOMAIN;
const NEXT_PUBLIC_APP_STORE_ID: any = process.env.NEXT_PUBLIC_APP_STORE_ID;
const NEXT_PUBLIC_ANDRIOD_APP_PACKAGE: any =
  process.env.NEXT_PUBLIC_ANDRIOD_APP_PACKAGE;
const NEXT_PUBLIC_APP_NAME: any = process.env.NEXT_PUBLIC_APP_NAME;
const NEXT_PUBLIC_WEB_FALL_BACK: any = process.env.NEXT_PUBLIC_WEB_FALL_BACK;
declare global {
  interface Window {
    onedirectSettings: {};
  }
}
export function ComponentRenderingUtility({
  props,
  isBreadCrumbsRequired = false,
  analyticsPageType,
  currentPageType,
}: any) {
  let pageLoaded = false;
  const getAuthorName = () => {
    const cmp = props?.model?.components?.filter(
      (comp: any) =>
        comp?.__component === "blog-widget.blog-detail" ||
        comp?.__component === "blog-widget.blog-profile"
    )?.[0];
    return cmp?.title || cmp?.authorName || "na";
  };
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
  const webSiteData =
    props?.model?.slug === "home"
      ? {
        "@context": `${process.env.NEXT_PUBLIC_SCHEMA_URL}/`,
        "@type": "WebSite",
        name: "SSBeauty",
        url: `${DomainURL}`,
        sameAs: [
          props?.header?.data?.[0]?.FooterSubscribe?.facebookIconPath,
          props?.header?.data?.[0]?.FooterSubscribe?.instagramIconPath,
        ],
        potentialAction: {
          "@type": "SearchAction",
          target: `${DomainURL}/c/search?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }
      : {};
  const { setItem, getItem } = useStorage();
  const cookie = new Cookies();
  const [SSBeautyLogos, setSSBeautyLogos] = useRecoilState(SSBLogos);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const attributes = props.model;

  const headerComponent = {
    ...props?.header?.data?.[0]?.Header,
    Brands: props?.header?.data?.[0]?.Brands,
    BrandItems: props?.header?.data?.[0]?.BrandItems,
    popularBrands: props?.header?.data?.[0]?.popularBrands,
    popularCategories: props?.header?.data?.[0]?.popularCategories,
    unbxdCarousel: props?.header?.data?.[0]?.unbxdCarousel,
    searchbarTexts:props?.header?.data?.[0]?.multiText?.items?.map((item:any)=>item?.name),
  };
  const footerComponent =
    props?.header?.data?.[0]?.Footer || attributes?.Footer;
  const components = attributes?.components;
  const footerCopyRights = attributes?.footerCopyRights;
  const footerBottom = attributes?.footerBottom;
  const BlogNavigation = attributes?.BlogNavigation;
  const breadCrumbs = attributes?.breadcrumb
    ? Object?.assign(attributes?.breadcrumb, {
        isBlog: props?.isBlog ? props?.isBlog : false,
      })
    : {};
  const footerPayment = props?.header?.data?.[0]?.FooterPayment;
  const footerSubscribe = props?.header?.data?.[0]?.FooterSubscribe;
  const footerBenefits = props?.header?.data?.[0]?.FooterBenefits;
  const router = useRouter();
  let breadCrumbStructuredList: any = [];
  const pushListItem = (position: number, name: string, item: any) => {
    breadCrumbStructuredList[position] = {
      "@type": "ListItem",
      position: position + 1,
      name: name,
      item: item,
    };
  };

  if (isBreadCrumbsRequired) {
    breadCrumbStructuredList.push(
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${DomainURL}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: router?.query?.pid,
        item: `${DomainURL}/${router?.query?.pid}`,
      }
    );
  }
  if (!isBreadCrumbsRequired && breadCrumbs && !props?.isBlog) {
    if (breadCrumbs?.levelOnePath && breadCrumbs?.levelOneText) {
      pushListItem(
        0,
        breadCrumbs?.levelOneText,
        DomainURL + breadCrumbs?.levelOnePath
      );
    }
    if (breadCrumbs?.levelTwoPath && breadCrumbs?.levelTwoText) {
      pushListItem(
        1,
        breadCrumbs?.levelTwoText,
        DomainURL + breadCrumbs?.levelTwoPath
      );
    }
    if (breadCrumbs?.levelOnePath && breadCrumbs?.levelThreeText) {
      pushListItem(
        2,
        breadCrumbs?.levelThreeText,
        DomainURL + breadCrumbs?.levelOnePath
      );
    }
    if (breadCrumbs?.levelFourPath && breadCrumbs?.levelFourText) {
      pushListItem(
        3,
        breadCrumbs?.levelFourText,
        DomainURL + breadCrumbs?.levelFourPath
      );
    }
  }
  if (!isBreadCrumbsRequired && breadCrumbs && props?.isBlog) {
    if (breadCrumbs?.levelOnePath && breadCrumbs?.levelOneText) {
      pushListItem(0, "Beauty-Blog/", DomainURL + "/beauty-stop");
      pushListItem(
        1,
        breadCrumbs?.levelOneText,
        DomainURL +
        breadCrumbs?.levelOnePath?.replace("beauty-stop", "beauty-blog")
      );
    }
    if (breadCrumbs?.levelTwoPath && breadCrumbs?.levelTwoText) {
      pushListItem(
        2,
        breadCrumbs?.levelTwoText,
        DomainURL +
        breadCrumbs?.levelTwoPath?.replace("beauty-stop", "beauty-blog")
      );
    }
    if (breadCrumbs?.levelOnePath && breadCrumbs?.levelThreeText) {
      pushListItem(
        3,
        breadCrumbs?.levelThreeText,
        DomainURL +
        breadCrumbs?.levelOnePath?.replace("beauty-stop", "beauty-blog")
      );
    }
    if (breadCrumbs?.levelFourPath && breadCrumbs?.levelFourText) {
      pushListItem(
        4,
        breadCrumbs?.levelFourText,
        breadCrumbs?.levelFourPath
          ? DomainURL +
          breadCrumbs?.levelFourPath?.replace("beauty-stop", "beauty-blog")
          : global?.window?.location?.href?.replace(
            "beauty-stop",
            "beauty-blog"
          )
      );
    }
  }
  const convertNameToURL = (name: string) => {
    const temp = name?.split(" ")?.map((el) => el?.toLowerCase());
    const url = temp?.join("-");
    return url;
  };

  const breadCrumbStructuredData = {
    "@context": `${process.env.NEXT_PUBLIC_SCHEMA_URL}/`,
    "@type": "BreadcrumbList",
    itemListElement: props?.isBlog
      ? [
        ...breadCrumbStructuredList,
        (breadCrumbStructuredList[breadCrumbStructuredList?.length] = {
          "@type": "ListItem",
          position: breadCrumbStructuredList?.length + 1,
          name: router?.query?.pid?.[router?.query?.pid?.length - 1]
            ?.split("-")
            ?.map(
              (e: any) =>
                e?.charAt(0)?.toUpperCase() + e?.slice(1)?.toLowerCase()
            )
            ?.join(" "),
          url: `${DomainURL}/beauty-blog/${router?.query?.pid?.[
            router?.query?.pid?.length - 1
          ]
            ?.split("-")
            ?.map(
              (e: any) =>
                e?.charAt(0)?.toUpperCase() + e?.slice(1)?.toLowerCase()
            )
            ?.join(" ")}`,
        }),
      ]
      : breadCrumbStructuredList,
  };

  useEffect(() => {
    if (window?.od?.messenger) {
      window.od.messenger("pushMessage", chatBotUtility());
    }
  }, [global?.window?.od?.messenger, cookie.get("accessToken")]);

  const setPage = () => {
    let pageRefererArray = JSON.parse(
      localStorage.getItem("pageReferrer") as string
    );
    const pageReferrer = {
      previousPageTitle: attributes?.title,
      previousPagePath: window.location.href,
    };
    if (pageRefererArray?.length > 0 && attributes?.title) {
      if (
        pageRefererArray?.[pageRefererArray?.length - 1]?.previousPageTitle !=
        attributes?.title
      ) {
        pageRefererArray = [...pageRefererArray, pageReferrer];
      }
    } else if (attributes?.title) {
      pageRefererArray = [pageReferrer];
    }
    localStorage.setItem("pageReferrer", JSON.stringify(pageRefererArray));
  };

  useEffect(() => {
    let pageRenderStart = new Date().getTime();
    function Pageloadtime() {
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
    }
    const handleRouteChange = async () => {
      pageLoaded = true;
      let loadTime = Pageloadtime();
      const seconds = Math.floor(loadTime / 1000);
      let previousPagePath, previousPageTitle;
      const userType = global?.window?.localStorage?.getItem("userType")
        ? global?.window?.localStorage?.getItem("userType")
        : "guest_user";
      const isLoggedIn = global?.window?.localStorage?.getItem("accessToken");
      const customerType: string | null = global?.window?.localStorage?.getItem(
        "customerType"
      )
        ? global?.window?.localStorage?.getItem("customerType")
        : "guest_user";
      const pageReferer = JSON.parse(
        localStorage.getItem("pageReferrer") as string
      );
      if (pageReferer?.length && pageReferer?.length !== 1) {
        previousPagePath =
          pageReferer[pageReferer?.length - 2]?.previousPagePath;
        previousPageTitle =
          pageReferer?.[pageReferer?.length - 2]?.previousPageTitle;
      }
      window.location?.href?.includes("beauty-stop")
        ? await ga.pageview(
            global?.window?.location?.href,
            analyticsPageType,
            previousPageTitle || "na",
            getItem("customerID", "local")
              ? getItem("customerID", "local")
              : cookie.get("MADid"),
            getItem("customerID", "local")
              ? getItem("customerID", "local")
              : "",
            getItem("loyalitylevel", "local")
              ? getItem("loyalitylevel", "local")
              : "na",
            attributes?.slug,
            seconds,
            previousPagePath || "na",
            global?.window?.location?.href,
            getAuthorName(),
            (router?.query?.pid?.length || 0) >= 2
              ? router?.query?.pid?.[0]
              : "na",
            (router?.query?.pid?.length || 0) >= 2
              ? router?.query?.pid?.[1]
              : "na",
            analyticsPageType,
            userType || "na",
            isLoggedIn ? "loggedIn" : "guest",
            customerType
          )
        : await ga.pageview(
            global?.window?.location?.href,
            analyticsPageType,
            previousPageTitle || "na",
            getItem("customerID", "local")
              ? getItem("customerID", "local")
              : cookie.get("MADid"),
            getItem("customerID", "local")
              ? getItem("customerID", "local")
              : "",
            getItem("loyalitylevel", "local")
              ? getItem("loyalitylevel", "local")
              : "na",
            attributes?.slug,
            seconds,
            previousPagePath || "na",
            global?.window?.location?.href,
            "na",
            "na",
            "",
            analyticsPageType || "na",
            userType || "na",
            isLoggedIn ? "loggedIn" : "guest",
            customerType
          );
    };
    // if (document.readyState === "complete") {
    if (!pageLoaded) {
      handleRouteChange();
    }
    // } else {
    //   window.addEventListener("load", handleRouteChange);
    return () => document.removeEventListener("load", handleRouteChange);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState == "visible") {
        setItem("currentPageTitle", attributes?.title, "local");
        setItem("currentPageType", analyticsPageType, "local");
        setItem("currentPageSlug", attributes?.slug, "local");
        setItem("currentPageDesc", attributes?.description, "local");
      } else {
        setPage();
      }
    });
    if (props?.pageNotFound === true) {
      router.push({
        pathname: window.location.origin + "/404",
      });
    }
    setPage();
  }, []);

  setItem("currentPageTitle", attributes?.title, "local");
  setItem("currentPageType", analyticsPageType, "local");
  setItem("currentPageSlug", attributes?.slug, "local");
  setItem("currentPageDesc", attributes?.description, "local");

  useEffect(() => {
    const item = localStorage.getItem("orderConfirmationfeedback");
    if (item == "orderConfirmationfeedback") {
      setSnackBarOpen(true);
      setSnackBarMessage("Thank you for your valuable feedback");
    }
    localStorage.removeItem("orderConfirmationfeedback");
    setSSBeautyLogos({
      ...SSBeautyLogos,
      appLogos: props?.appLogos?.data?.appIcons?.items,
    });
  }, []);

  //Scroll Events
  callScrollEvent();

  return (
    <>
      <Head>
        {attributes?.seo?.map((el: any) => {
          switch (el?.tagType?.toLowerCase()) {
            case "meta":
              return (
                <>
                  {["Title", "title"].includes(el?.name) && (
                    <title>{el?.content}</title>
                  )}
                  <meta
                    name={el?.name}
                    content={el?.content}
                    key={el.id}
                  ></meta>
                </>
              );
            case "link":
              return (
                <link rel={el?.name} href={el?.content} key={el.id}></link>
              );
            case "script": {
              if (el?.content) {
                return <script async src={`${el?.content}`} />;
              } else {
                return (
                  <script async type="text/javascript">
                    {el?.script}
                  </script>
                );
              }
            }
            default:
              return;
          }
        })}
        {/* {currentPageType === "Home" && Clarity()} */}
        {(analyticsPageType === "brand" ||
          analyticsPageType === "category" ||
          analyticsPageType === "page") && (
          <>
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
            <meta
              property="og:title"
              content={attributes?.title || attributes?.description}
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={global?.window?.location.href} />
            <meta property="og:image" content="/ssblogo_favicon.png" />
            <meta property="og:image:width" content="200" />
            <meta property="og:image:height" content="200" />
            <meta property="og:description" content={attributes?.description} />
            <meta property="og:site_name" content="SSBeauty" />
          </>
        )}
        <link
          rel="canonical"
          href={global?.window?.location?.href?.split("?")?.[0]}
        />
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structureData) }}
        />
        <script
          key="website-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteData) }}
        />
        <script
          key="breadCrumbs-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadCrumbStructuredData),
          }}
        />
        {props?.isBlog && (
          <script
            key="website-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(props?.schemaMarkup),
            }}
          />
        )}

        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(attributes){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config','${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE}',
              ${JSON.parse(
                JSON.stringify(
                  `{"debug_mode": ${
                    process.env.NEXT_PUBLIC_TRACING_ENVIRONMENT === "prod"
                  }, "send_page_view": false}`
                )
              )});`,
          }}
        />
      </Head>
      <div>
        <LocationIntelligence />
        {headerComponent && (
          <>
            <Header
              {...headerComponent}
              attribute={attributes}
           
            
            />

            
          </>
        )}
        {isBreadCrumbsRequired && <BreadcrumbNavigation initialSlug={"Home"} />}
        <CustomSnackBar
          position="absolute"
          snackBarOpen={snackBarOpen}
          setSnackBarOpen={setSnackBarOpen}
          snackMessage={snackBarMessage}
        ></CustomSnackBar>
        {breadCrumbs && <BreadCrumb {...breadCrumbs} />}
        {BlogNavigation && <BlogDropDown {...BlogNavigation} />}
        <Grid sx={{ margin: "0 auto", maxWidth: "1440px" }}>
          {components?.map((component: any, index: number) => {
            if (
              component.__component &&
              (component?.visibility === null ||
                !component?.visibility ||
                component?.visibility === "all" ||
                component?.visibility === "web")
            ) {
              return (
                <LazyloadComponents
                  Component={component.__component}
                  data={component}
                  key={index}
                  position={index + 1}
                />
              );
            }
            return null;
          })}
        </Grid>
        {footerPayment && <FooterPayment {...footerPayment} />}
        {footerSubscribe && <FooterSubscribe {...footerSubscribe} />}
        {footerBenefits && <Benefits {...footerBenefits} />}
        {footerComponent && <Footer {...footerComponent} />}
        {footerBottom && <FooterBottom items={footerBottom} />}
        {footerCopyRights && <FooterCopyRights {...footerCopyRights} />}
        {/* <ChatBotWidget/> */}
      </div>
    </>
  );
}
