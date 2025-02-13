import Head from "next/head";
import Script from "next/script";
import FooterSubscribe from "../../components/FooterSubscribe/FooterSubscribe";
import Footer from "../../components/Footer/Footer";
import FooterPayment from "../../components/FooterPayment";
import { useEffect } from "react";
import { useRouter } from "next/router";
import FooterCopyRights from "../../components/FooterCopyRights/FooterCopyRights";
import * as ga from "../../lib/ga";
import dynamic from "next/dynamic";

// import Header from "../../components/Header/Header";
const Header = dynamic(() => import("../../components/Header/Header"), {
  ssr: true,
});
import RenderComponent from "../../HOC/RenderComponent/RenderComponent";
import HorizontalSpacer from "../../components/HorizontalSpacer/HorizontalSpacer";
import { HelpCenterLayout } from "../../components/HelpCenter/HelpCenterLayout";
import Contact from "../../components/ContactUs/Contact";
import { AboutUs } from "../../components/AboutUs/AboutUs";
import StepperData from "../../components/StepperData/StepperData";
import SingleBanner from "../../components/SingleBanner/SingleBanner";
import OffersGrid from "../../components/OffersGrid/OffersGrid";
import BrandsGrid from "../../components/BrandsGrid/BrandsGrid";
import StepperBanner from "../../components/StepperBanner/StepperBanner";
import Benefits from "../../components/Benefits/Benefits";
import { GetTheApp } from "../../components/GetTheApp/GetTheApp";
import useStorage from "../../utility/useStoarge";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import BlogAuthor from "../../components/BlogAuthor/BlogAuthor";
import ShopByCollection from "../../components/ShopByCollection/ShopByCollection";
import SingleButton from "../../HOC/Button/SingleButton";
import HOCTitle from "../../HOC/HOCTitle/HOCTitle";
import TabsUIRenderComponent from "../../components/Filters/TabsUI";
import FirstCitizenSignUp from "../../components/FirstCitizenSignUp/FirstCitizenSignUp";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import EventTab from "../../components/EventCardsTab/EventTab";
import storesCityJson from "../../components/FindStoresTab/FindStoresJson.json";
import NoEventCardTwo from "../../components/NoEventCardTwo/NoEventCardTwo";
import ShopbyIngredient from "../../components/ShopbyIngredient/ShopbyIngredient";
import StoresRenderComponent from "../../components/FindStoresTab/StoresRenderComponent";
import ConsultationHeading from "../../components/ConsultationComponentOne/ConsultationHeading";
import ConsultationTabBanner from "../../components/ConsultationComponentTwo/ConsultationTabBanner";
import ConsultationServiceCard from "../../components/ConsultationComponentThree/ConsultationServiceCard";
import StoreTopBrand from "../../components/StoreTopBrands/StoreTopBrand";
import FooterBottom from "../../components/FooterBottom/FooterBottom";
import { callScrollEvent } from "../../utility/ScrollEventAnalytics";
import { Grid } from "@mui/material";
import { SSBLogos, SSBStoreImages } from "../../recoilstore";
import { useRecoilState } from "recoil";
import DynamicDataFetcher from "../../components/MSDPowered/DynamicDataFetcher";
import { chatBotUtility } from "../../utility/chatBotObjUtility";
import { Cookies } from "react-cookie";
import TitleTab from "../../HOC/TitleTab/TitleTab";
import SocialBlog from "../../components/SocialBlog/SocialBlog";
import FirstCitizenQuestions from "../../components/FirstCitizenFAQ/FirstCitizenQuestions";
const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const logger = require("../../next-logger.config");
const DomainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const ChatBotWidget = dynamic(() => import("../../components/ChatBotWidget"));

export default function MiscPage(props: any) {
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
  const cookie = new Cookies();
  const { setItem, getItem } = useStorage();
  const attributes = props.model;
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
  };
  const components = attributes?.components;
  const breadCrumbs = attributes?.breadcrumb;
  const footerCopyRights = attributes?.footerCopyRights;
  const footerComponent =
    props?.header?.data?.[0]?.Footer || attributes?.Footer;
  const footerBottom = attributes?.footerBottom;
  const footerPayment = props?.header?.data?.[0]?.FooterPayment;
  const footerSubscribe = props?.header?.data?.[0]?.FooterSubscribe;
  const footerBenefits = props?.header?.data?.[0]?.FooterBenefits;
  const [SSBeautyLogos, setSSBeautyLogos] = useRecoilState(SSBLogos);
  const [storeImages, setStoreImages] = useRecoilState(SSBStoreImages);
  const router = useRouter();
  useEffect(() => {
    if (window?.od?.messenger) {
      window.od.messenger("pushMessage", chatBotUtility());
    }
  }, [global?.window?.od?.messenger, cookie.get("accessToken")]);
  let breadCrumbStructuredList: any = [];
  const pushListItem = (position: number, name: string, item: any) => {
    breadCrumbStructuredList[position] = {
      "@type": "ListItem",
      position: position + 1,
      name: name,
      item: item,
    };
  };
  if (breadCrumbs) {
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

  const breadCrumbStructuredData = {
    "@context": `${process.env.NEXT_PUBLIC_SCHEMA_URL}/`,
    "@type": "BreadcrumbList",
    itemListElement: breadCrumbStructuredList,
  };

  useEffect(() => {
    if (props?.pageNotFound === true) {
      router.push({
        pathname: window.location.origin + "/404",
      });
    }
    setSSBeautyLogos({
      ...SSBeautyLogos,
      appLogos: props?.appLogos?.data?.appIcons?.items,
    });
    setStoreImages(props?.storeImages?.data?.storeImage?.items)
    setPage();
  }, []);

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
      var pageRenderFinish = new Date().getTime();
      var pageRenderTime = pageRenderFinish - pageRenderStart;
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
      if (pageReferer.length && pageReferer.length !== 1) {
        previousPagePath =
          pageReferer[pageReferer?.length - 2]?.previousPagePath;
        previousPageTitle =
          pageReferer[pageReferer?.length - 2]?.previousPageTitle;
      }
      await ga.pageview(
        global?.window?.location?.href,
        props?.analyticsPageType,
        previousPageTitle || "na",
        getItem("customerID", "local")
          ? getItem("customerID", "local")
          : cookie.get("MADid"),
        getItem("customerID", "local") ? getItem("customerID", "local") : "",
        getItem("loyalitylevel", "local")
          ? getItem("loyalitylevel", "local")
          : "na",
        attributes?.slug,
        seconds,
        previousPagePath || "na",
        "",
        global?.window?.location?.href,
        "",
        "",
        "",
        userType || "na",
        isLoggedIn ? "loggedIn" : "guest",
        customerType
      );
    };
    if (document.readyState === "complete") {
      handleRouteChange();
    } else {
      window.addEventListener("load", handleRouteChange);
      return () => document.removeEventListener("load", handleRouteChange);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState == "visible") {
        setItem(
          "currentPagePath",
          `${global?.window?.location?.pathname}`,
          "local"
        );
        setItem("currentPageTitle", attributes?.title, "local");
        setItem("currentPageType", props?.analyticsPageType, "local");
        setItem("currentPageSlug", attributes?.slug, "local");
        setItem("currentPageDesc", attributes?.description, "local");
      } else {
        setPage();
      }
    });
  }, []);

  setItem("currentPagePath", `${global?.window?.location?.pathname}`, "local");
  setItem("currentPageTitle", attributes?.title, "local");
  setItem("currentPageType", props?.analyticsPageType, "local");
  setItem("currentPageSlug", attributes?.slug, "local");
  setItem("currentPageDesc", attributes?.description, "local");

  //Scroll Events Analytics
  callScrollEvent();

  const isContactusPage = router.query?.pid === "contact-us";
  const { isSSBMobileApp} = router.query;
  return (
    <>
      <Head>
        <title>{attributes?.description || "ShoppersStop"}</title>
        {props?.model?.seo?.map((el: any) => {
          switch (el?.tagType?.toLowerCase()) {
            case "meta":
              return <meta name={el?.name} content={el?.content}></meta>;
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
        <>
          <meta property="og:title" content={props?.model?.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={global?.window?.location?.href} />
          <meta property="og:image" content="/ssblogo_favicon.png" />
          <meta property="og:image:width" content="200" />
          <meta property="og:image:height" content="200" />
          <meta property="og:description" content={props?.model?.description} />
          <meta property="og:site_name" content="SSBeauty" />
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no"
          />
        </>
        <link
          rel="canonical"
          href={global?.window?.location?.href?.split("?")?.[0]}
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
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
        {/* <script
          async
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        /> */}
        <script
          async
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structureData) }}
        />
        <script
          async
          key="breadCrumbs-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadCrumbStructuredData),
          }}
        />
      </Head>
      <div>
        {headerComponent && !isSSBMobileApp && <Header {...headerComponent} />}
        <Grid sx={{ margin: "0 auto", maxWidth: "1440px" }}>
          {breadCrumbs && <BreadCrumb {...breadCrumbs} />}
          {components?.map((component: any, index: number) => {
            if (
              component?.visibility === null ||
              !component?.visibility ||
              component?.visibility === "all" ||
              component?.visibility === "web"
            ) {
              if (component.__component == "widget.horizontal-spacer") {
                return (
                  <RenderComponent
                    Component={HorizontalSpacer}
                    data={component}
                    key={index}
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
              if (component.__component == "widget.offers-grid") {
                return (
                  <RenderComponent
                    Component={OffersGrid}
                    data={component}
                    position={index}
                    key={index}
                  />
                );
              }
              if (component.__component == "widget.offer-grid-text") {
                return (
                  <RenderComponent
                    Component={ShopbyIngredient}
                    data={component}
                    position={index}
                    key={index}
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
              if (component.__component == "widget.tabs-component") {
                return (
                  <RenderComponent
                    Component={TabsUIRenderComponent}
                    data={component}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component?.__component == "empty.stores") {
                return (
                  <RenderComponent
                    Component={StoresRenderComponent}
                    data={{
                      ...storesCityJson,
                      stateCityData:
                        components?.find(
                          (i: any) => i?.__component === "widget.store-detail"
                        )?.states || [],
                      ...component,
                    }}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component?.__component == "widget.book-consultant-heading") {
                return (
                  <RenderComponent
                    Component={ConsultationHeading}
                    data={component}
                    key={index}
                  />
                );
              }
              if (component?.__component == "widget.why-consultant") {
                return (
                  <RenderComponent
                    Component={ConsultationTabBanner}
                    data={component}
                    key={index}
                  />
                );
              }
              if (component?.__component == "widget.consultant-service") {
                return (
                  <RenderComponent
                    Component={ConsultationServiceCard}
                    data={component}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component.__component == "widget.events") {
                return (
                  <RenderComponent
                    Component={EventTab}
                    data={component}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component.__component == "widget.offer-grid-data") {
                return (
                  <RenderComponent
                    Component={NoEventCardTwo}
                    data={component}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component.__component == "slots.product-carousel") {
                return (
                  <RenderComponent
                    Component={DynamicDataFetcher}
                    data={component}
                    key={index}
                    slug={attributes?.slug}
                    position={index}
                  />
                );
              }
              if (component.__component == "widget.top-brands") {
                return (
                  <RenderComponent
                    Component={StoreTopBrand}
                    data={component}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component?.__component == "blog-widget.blog-list") {
                return (
                  <RenderComponent
                    Component={BlogAuthor}
                    data={component}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component.__component == "blog-widget.blog-benefits") {
                return (
                  <RenderComponent
                    Component={SocialBlog}
                    data={component}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component?.__component == "widget.brands-grid") {
                return (
                  <RenderComponent
                    Component={BrandsGrid}
                    data={component}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component?.__component === "widget.stepper-banner") {
                return (
                  <RenderComponent
                    Component={StepperBanner}
                    data={component}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component?.__component == "widget.contact-us") {
                return (
                  <RenderComponent
                    Component={Contact}
                    data={component}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component?.__component == "widget.get-the-app") {
                return (
                  <RenderComponent
                    Component={GetTheApp}
                    data={component}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component?.__component == "widget.nested-child") {
                return (
                  <RenderComponent
                    Component={HelpCenterLayout}
                    data={component}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component?.__component == "widget.rich-text") {
                return (
                  <RenderComponent
                    Component={AboutUs}
                    data={component}
                    key={index}
                  />
                );
              }
              if (component?.__component == "widget.stepper-data") {
                return (
                  <RenderComponent
                    Component={StepperData}
                    data={component}
                    key={index}
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
              if (component?.__component == "widget.title") {
                return (
                  <RenderComponent
                    Component={HOCTitle}
                    data={component}
                    key={index}
                  />
                );
              }
              if (component.__component == "widget.fc-data") {
                return (
                  <RenderComponent
                    Component={FirstCitizenSignUp}
                    data={component}
                    key={index}
                  />
                );
              }
              if (component?.__component == "widget.title-tab") {
                return (
                  <RenderComponent
                    Component={TitleTab}
                    data={component}
                    key={index}
                    position={index}
                  />
                );
              }
              if (component.__component == "widget.accordion") {
                return (
                  <RenderComponent
                    Component={FirstCitizenQuestions}
                    data={component}
                    key={index}
                  />
                );
              }
              if (component?.__component == "widget.button") {
                return (
                  <RenderComponent
                    Component={SingleButton}
                    data={component}
                    key={index}
                  />
                );
              }
            }
          })}
        </Grid>
        {footerPayment && !isSSBMobileApp && (
          <FooterPayment {...footerPayment} />
        )}
        {footerSubscribe && !isSSBMobileApp && (
          <FooterSubscribe {...footerSubscribe} />
        )}
        {footerBenefits && !isSSBMobileApp && <Benefits {...footerBenefits} />}
        {footerComponent && !isSSBMobileApp && <Footer {...footerComponent} />}
        {footerBottom && !isSSBMobileApp && (
          <FooterBottom items={footerBottom} />
        )}
        {footerCopyRights && !isSSBMobileApp && (
          <FooterCopyRights {...footerCopyRights} />
        )}
      </div>
      {isContactusPage && <ChatBotWidget />}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const res = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/miscs?filters[slug][$eq]=${context?.params.pid}&publicationState=live`
  );
  const appIcons = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/app-settings/1?populate[appIcons][populate]=*`
  );
  const headerData = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/headers?filters[slug][$eq]=ssb-header&publicationState=live`
  );
  const storeImages = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/app-settings/1?populate[storeImage][populate]=*`
  );
  const header = await headerData.json();
  const pageData = await res.json();
  const appLogos = await appIcons.json();
  const SSBStoreImages = await storeImages.json()
  if (pageData?.error) {
    logger.error(
      {
        URL:
          `${NEXT_PUBLIC_CMS_URL}/api/miscs?filters[slug][$eq]=` +
          context.params.pid,
        type: "server",
        Response: pageData?.error,
      },
      `${pageData?.error?.message}`
    );
  }

  return {
    props: {
      pageNotFound: pageData?.data?.[0]?.components?.length > 0 ? false : true,
      model: pageData?.data?.[0] || null,
      appLogos: appLogos,
      header: header || null,
      analyticsPageType: "misc",
      storeImages: SSBStoreImages,
    }, // will be passed to the page component as props
  };
}
