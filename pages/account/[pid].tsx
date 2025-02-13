/* eslint-disable @next/next/next-script-for-ga */
import Head from "next/head";
import { useEffect } from "react";
// import dynamic from "next/dynamic";

import Header from "../../components/Header/Header";
// const Header = dynamic(() => import("../../components/Header/Header"), { ssr: true });
import Benefits from "../../components/Benefits/Benefits";
import FooterSubscribe from "../../components/FooterSubscribe/FooterSubscribe";
import Footer from "../../components/Footer/Footer";
import FooterPayment from "../../components/FooterPayment";
import FooterCopyRights from "../../components/FooterCopyRights/FooterCopyRights";
import BrandDescription from "../../components/BrandDescription/BrandDescription";
import { useRouter } from "next/router";
import * as ga from "../../lib/ga";
import useStorage from "../../utility/useStoarge";
import RenderComponent from "../../HOC/RenderComponent/RenderComponent";
import MyAccountNav from "../../components/MyAccount/MyAccountNav";
import { Cookies } from "react-cookie";
import { SSBLogos } from "../../recoilstore";
import { useRecoilState } from "recoil";
import { callScrollEvent } from "../../utility/ScrollEventAnalytics";
import FooterBottom from "../../components/FooterBottom/FooterBottom";
import DynamicDataFetcher from "../../components/MSDPowered/DynamicDataFetcher";
import TitleTab from "../../HOC/TitleTab/TitleTab";
import Script from "next/script";
const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const DomainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

export default function Account(props: any) {
  const structureData = {
    "@context": `${process.env.NEXT_PUBLIC_SCHEMA_URL}`,
    "@type": "Organization",
    name: "SSBeauty",
    alternateName: "SSBeauty By Shoppers Stop",
    url: `${DomainURL}/home`,
    logo: props?.header?.data?.[0]?.Header.logoImageUrl,
    sameAs: [
      props?.header?.data?.[0]?.FooterSubscribe?.facebookIconPath,
      props?.header?.data?.[0]?.FooterSubscribe?.instagramIconPath,
      props?.header?.data?.[0]?.FooterSubscribe?.twitterIconPath,
    ],
  };
  const cookie = new Cookies();
  const router = useRouter();
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
  const userAccountInfo = attributes;
  const footerCopyRights = attributes?.footerCopyRights;
  const footerComponent =
    props?.header?.data?.[0]?.Footer || attributes?.Footer;
  const footerBottom = attributes?.footerBottom;
  const footerPayment = props?.header?.data?.[0]?.FooterPayment;
  const footerSubscribe = props?.header?.data?.[0]?.FooterSubscribe;
  const footerBenefits = props?.header?.data?.[0]?.FooterBenefits;
  const [SSBeautyLogos, setSSBeautyLogos] = useRecoilState(SSBLogos);
  let breadCrumbStructuredList: any = [];
  if (userAccountInfo) {
    const name = userAccountInfo?.account?.items?.filter((dataItem: any) => {
      return dataItem?.selected === true;
    });
    if (name?.[0]?.title) {
      breadCrumbStructuredList.push(
        {
          "@type": "ListItem",
          position: 1,
          name: "My Account",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: name?.[0]?.title,
          item: `${DomainURL}/${name?.[0]?.title}`,
        }
      );
    }
  }
  const breadCrumbStructuredData = {
    "@context": `${process.env.NEXT_PUBLIC_SCHEMA_URL}`,
    "@type": "BreadcrumbList",
    itemListElement: breadCrumbStructuredList,
  };
  useEffect(() => {
    if (props?.pageNotFound === true) {
      router.push({
        pathname: window.location.origin + "/404",
      });
    }
  }, []);
  useEffect(() => {
    if (window?.od?.messenger) {
      window.od.messenger("pushMessage", {
        uniqueHash: cookie.get("accessToken")
          ? process.env.NEXT_PUBLIC_OD_MESSANGER_AUTH_UNIQUE_HASH
          : process.env.NEXT_PUBLIC_OD_MESSANGER_UNIQUE_HASH,
        flowInitialAttributes: {
          prechat_Name: cookie.get("accessToken")
            ? getItem("customer_Name", "local")
            : "",
          prechat_PrimaryEmail: cookie.get("accessToken")
            ? getItem("customerEmailID", "local")
            : "",
          prechat_PrimaryMobile: cookie.get("accessToken")
            ? getItem("mobileNumber", "local")
            : "",
          prechat_ApiKey: `${process.env.NEXT_PUBLIC_OD_MESSANGER_PRE_CHAT_APIKEY}`,
          CI_13658: cookie.get("accessToken") ? cookie.get("accessToken") : "",
        },
      });
    }
  }, [global?.window?.od?.messenger]);

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
    setPage();
  }, []);
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
      let loadTime = Pageloadtime();
      const userType = global?.window?.localStorage?.getItem("userType")
        ? global?.window?.localStorage?.getItem("userType")
        : "guest_user";
      const isLoggedIn = global?.window?.localStorage?.getItem("accessToken");
      const customerType: string | null = global?.window?.localStorage?.getItem(
        "customerType"
      )
        ? global?.window?.localStorage?.getItem("customerType")
        : "guest_user";
      let previousPagePath, previousPageTitle;
      const pageReferer = JSON.parse(
        localStorage.getItem("pageReferrer") as string
      );
      if (pageReferer?.length && pageReferer?.length !== 1) {
        previousPagePath =
          pageReferer[pageReferer?.length - 2]?.previousPagePath;
        previousPageTitle =
          pageReferer?.[pageReferer?.length - 2]?.previousPageTitle;
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
        loadTime,
        previousPagePath || "na",
        "",
        global?.window?.location?.href,
        "na",
        "na",
        "na",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState == "visible") {
        setItem("currentPageTitle", attributes?.title, "local");
        setItem("currentPageType", props?.analyticsPageType, "local");
        setItem("currentPageSlug", attributes?.slug, "local");
      } else {
        setPage();
      }
    });
  }, []);

  setItem("currentPageTitle", attributes?.title, "local");
  setItem("currentPageType", props?.analyticsPageType, "local");
  setItem("currentPageSlug", attributes?.slug, "local");

  //Scroll Events Analytics
  callScrollEvent();
  useEffect(() => {
    setSSBeautyLogos({
      ...SSBeautyLogos,
      appLogos: props?.appLogos?.data?.appIcons?.items,
    });
  }, []);

  return (
    <>
      <Head>
        <title>{attributes?.description}</title>
        {attributes?.seo?.map((el: any) => {
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
        {/* <ChatBotWidget/> */}
        <script
        
           async
          src={`${process.env.NEXT_PUBLIC_JUSPAY_APIURL}/pay-v3.js`}
        />
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
        {headerComponent && <Header {...headerComponent} />}

        {userAccountInfo && <MyAccountNav {...userAccountInfo} />}

        {components?.map((component: any, index: number) => {
          if (component?.__component == "widget.brand-description") {
            return (
              <RenderComponent
                Component={BrandDescription}
                data={component}
                key={index}
                position={index}
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
        })}
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
    `${NEXT_PUBLIC_CMS_URL}/api/accounts?filters[slug][$eq]=${context?.params.pid}&publicationState=live`
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
  return {
    props: {
      pageNotFound: pageData?.data?.[0]?.components?.length > 0 ? false : true,
      protected: true,
      model: pageData.data[0],
      appLogos: appLogos,
      header: header || null,
      analyticsPageType: "account",
    }, // will be passed to the page component as props
  };
}
