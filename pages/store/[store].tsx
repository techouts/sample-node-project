import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { AboutUs } from "../../components/AboutUs/AboutUs";
import Benefits from "../../components/Benefits/Benefits";
import BlogAuthor from "../../components/BlogAuthor/BlogAuthor";
import BrandsGrid from "../../components/BrandsGrid/BrandsGrid";
import ConsultationHeading from "../../components/ConsultationComponentOne/ConsultationHeading";
import ConsultationServiceCard from "../../components/ConsultationComponentThree/ConsultationServiceCard";
import ConsultationTabBanner from "../../components/ConsultationComponentTwo/ConsultationTabBanner";
import Contact from "../../components/ContactUs/Contact";
import EventTab from "../../components/EventCardsTab/EventTab";
import TabsUIRenderComponent from "../../components/Filters/TabsUI";
import FirstCitizenQuestions from "../../components/FirstCitizenFAQ/FirstCitizenQuestions";
import FirstCitizenSignUp from "../../components/FirstCitizenSignUp/FirstCitizenSignUp";
import Footer from "../../components/Footer/Footer";
import FooterBottom from "../../components/FooterBottom/FooterBottom";
import FooterCopyRights from "../../components/FooterCopyRights/FooterCopyRights";
import FooterPayment from "../../components/FooterPayment";
import FooterSubscribe from "../../components/FooterSubscribe/FooterSubscribe";
import { GetTheApp } from "../../components/GetTheApp/GetTheApp";
import Header from "../../components/Header/Header";
import { HelpCenterLayout } from "../../components/HelpCenter/HelpCenterLayout";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import HorizontalSpacer from "../../components/HorizontalSpacer/HorizontalSpacer";
import DynamicDataFetcher from "../../components/MSDPowered/DynamicDataFetcher";
import NoEventCardTwo from "../../components/NoEventCardTwo/NoEventCardTwo";
import OffersGrid from "../../components/OffersGrid/OffersGrid";
import ShopByCollection from "../../components/ShopByCollection/ShopByCollection";
import ShopbyIngredient from "../../components/ShopbyIngredient/ShopbyIngredient";
import SingleBanner from "../../components/SingleBanner/SingleBanner";
import SocialBlog from "../../components/SocialBlog/SocialBlog";
import StepperBanner from "../../components/StepperBanner/StepperBanner";
import StepperData from "../../components/StepperData/StepperData";
import StoreTopBrand from "../../components/StoreTopBrands/StoreTopBrand";
import SingleButton from "../../HOC/Button/SingleButton";
import HOCTitle from "../../HOC/HOCTitle/HOCTitle";
import RenderComponent from "../../HOC/RenderComponent/RenderComponent";
import TitleTab from "../../HOC/TitleTab/TitleTab";
import { SSBLogos, userState } from "../../recoilstore";
import { chatBotUtility } from "../../utility/chatBotObjUtility";
import { callScrollEvent } from "../../utility/ScrollEventAnalytics";
import useStorage from "../../utility/useStoarge";
import * as ga from "../../lib/ga";
import StoreInfoCard from "../../components/StoreSwitch/StoreInfoCard";

const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const logger = require("../../next-logger.config");
const DomainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

export default function StorePage(props: any) {
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
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
        global?.window?.location?.href,
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


  //redirect to homepage for users who directly come to store page and disable store mode for them
  useEffect(()=>{
    if (router.query.store && router.query.store !== userDataItems.storeCode){
      window.location.assign(`/miscs/store`);
      setUserDataItems((prev: any) => ({
        ...prev,
        storeMode: false,
        storeName: null, 
        storePath:null,
        storeCode: null,
        storeModeType: "sd",
      }));
    }
  },[])

  return (
    <>
      <div>
        {headerComponent && <Header {...headerComponent} />}
        <Grid sx={{ margin: "0 auto", maxWidth: "1440px" }}>
          {/* {breadCrumbs && <BreadCrumb {...breadCrumbs} />} */}
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
              if (component?.__component == "widget.all-stores") {
                return (
                  <RenderComponent
                    Component={StoreInfoCard}
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
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const res = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/stores?filters[slug][$contains]=${context?.params.store}`
  );
  const appIcons = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/app-settings/1?populate[appIcons][populate]=*`
  );
  const headerData = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/headers?filters[slug][$eq]=ssb-header&publicationState=live`
  );
  const header = await headerData.json();
  const pageData = await res?.json();
  const appLogos = await appIcons.json();
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
    }, // will be passed to the page component as props
  };
}
