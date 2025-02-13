/* eslint-disable @next/next/next-script-for-ga */
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Head from "next/head";
import CartHeader from "../../components/CartLayout/CartHeader";
import LocationIntelligence from "../../components/LocationIntelligence/LocationIntelligence";
import { CartContextWrapper } from "../../context/cartContext";
import * as ga from "../../lib/ga";
import useStorage from "../../utility/useStoarge";
import { callScrollEvent } from "../../utility/ScrollEventAnalytics";
import Footer from "../../components/Footer/Footer";
import FooterCopyRights from "../../components/FooterCopyRights/FooterCopyRights";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import RenderComponent from "../../HOC/RenderComponent/RenderComponent";
import FooterSubscribe from "../../components/FooterSubscribe/FooterSubscribe";
import FooterPayment from "../../components/FooterPayment";
import Benefits from "../../components/Benefits/Benefits";
import { SSBLogos } from "../../recoilstore";
import { useRecoilState } from "recoil";
import { useMobileCheck } from "../../utility/isMobile";
import { HeaderWithOnlyAppLogo } from "../../components/CartLayout/HeaderWithOnlyAppLogo";
import { Cookies } from "react-cookie";
import FooterBottom from "../../components/FooterBottom/FooterBottom";
import { chatBotUtility } from "../../utility/chatBotObjUtility";
import { CartLayout } from "../../components/CartLayout/CartLayout";
import CartAddress from "../../components/CartAddress/CartAddress";
import PaymentPageIndex from "../../components/PaymentsPages/paymentss";
import OrderPage from "../../components/OrderConfirmation/OrderConfirmation";
import Script from "next/script";
import { Clarity } from "../../utility/Clarity";
const CartData = require("../../JSON/CartLayoutData.json");
const CartAddressData = require("../../JSON/CartAddress.json");
const OrderConfirmationData = require("../../components/OrderConfirmation/OrderConfirmation.json");
const CartLayoutDataResponse = require("../../JSON/CartLayoutDataResponse.json");
const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const DomainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

function CartPage(props: any) {
  const cookie = new Cookies();
  const attributes = props.model;
  const components = attributes?.components;
  const footerCopyRights = attributes?.footerCopyRights;
  const footerComponent =
    props?.header?.data?.[0]?.Footer || attributes?.Footer;
  const footerBottom = attributes?.footerBottom;
  const footerPayment = props?.header?.data?.[0]?.FooterPayment;
  const footerSubscribe = props?.header?.data?.[0]?.FooterSubscribe;
  const footerBenefits = props?.header?.data?.[0]?.FooterBenefits;
  const router = useRouter();
  const pageId = router?.query?.pid;
  const { setItem, getItem } = useStorage();
  const isMobile = useMobileCheck();

  const structureData = {
    "@context": `${process.env.NEXT_PUBLIC_SCHEMA_URL}`,
    "@type": "Organization",
    name: "SSBeauty",
    alternateName: "SSBeauty By Shoppers Stop",
    url: `${DomainURL}`,
    logo: props?.model?.cartHeader?.HeaderLogo,
    sameAs: [
      props?.header?.data?.[0]?.FooterSubscribe?.facebookIconPath,
      props?.header?.data?.[0]?.FooterSubscribe?.instagramIconPath,
      props?.header?.data?.[0]?.FooterSubscribe?.twitterIconPath,
    ],
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
          pageReferer?.[pageReferer?.length - 2]?.previousPagePath;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState == "visible") {
        setItem("currentPageTitle", attributes?.title, "local");
        setItem("currentPageType", props?.analyticsPageType, "local");
        setItem("currentPageSlug", attributes?.slug, "local");
        setItem("currentPageDesc", attributes?.description, "local");
      } else {
        setPage();
      }
    });
  }, []);

  setItem("currentPageTitle", attributes?.title, "local");
  setItem("currentPageType", props?.analyticsPageType, "local");
  setItem("currentPageSlug", attributes?.slug, "local");
  setItem("currentPageDesc", attributes?.description, "local");

  const [SSBeautyLogos, setSSBeautyLogos] = useRecoilState(SSBLogos);

  //Scroll Events Analytics
  callScrollEvent();
  useEffect(() => {
    setSSBeautyLogos({
      ...SSBeautyLogos,
      appLogos: props?.appLogos?.data?.appIcons?.items,
    });
  }, []);

  const CMSUNBXDWidget = components?.filter(a => a?.__component === "slots.unbxd-carousel");
  const CMSBasketLoadingWidget = components?.filter(a => a?.__component === "widget.basket-loading");
  return (
    <>
      <Head>
        <title>{attributes?.description}</title>
        <script
          src={`${process.env.NEXT_PUBLIC_JUSPAY_APIURL}/pay-v3.js`}
        />
         <meta
            name="viewport"
            content="width=device-width, user-scalable=no"
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
            ${JSON.parse(JSON.stringify(`{"debug_mode": ${process.env.NEXT_PUBLIC_TRACING_ENVIRONMENT === "prod"}, "send_page_view": false}`))});`,
          }}
        />
        <script
          
          async
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structureData) }}
        />
        {/* {Clarity()} */}
      </Head>
      <LocationIntelligence />
      <CartContextWrapper>
        {isMobile && (
          <Stack direction="column" sx={{ marginBottom: "25px" }}>
            <HeaderWithOnlyAppLogo
              data={props?.model?.cartHeader}
              pageId={pageId}
            />
          </Stack>
        )}
        <CartHeader {...props?.model?.cartHeader} pageId={pageId} />
        <Grid sx={{ margin: "0 auto", maxWidth: "1440px", padding: isMobile ? "0px" : "100px 0 0 0" }}>
          {components?.map((component: any, index: number) => {
    if (
        component?.visibility === null ||
        !component?.visibility ||
        component?.visibility === "all" ||
        component?.visibility === "web"
    ) {
        if (component.__component === "empty.cart-info") {
            return (
              <CartLayout
                    CMSUNBXDWidget={CMSUNBXDWidget}
                    CMSBasketLoadingWidget={CMSBasketLoadingWidget}
                    cartData={CartData}
                    CartLayoutDataResponse={CartLayoutDataResponse}
                    key={index}
                />
            );
        }
        if (component.__component === "empty.address") {
            return <CartAddress {...CartAddressData} key={index} />;
        }
        if (component.__component === "empty.payment") {
            return (
                <PaymentPageIndex
                    componentData={component}
                    key={index}
                />
            );
        }
        if (component.__component === "empty.orderconfirmation") {
            return <OrderPage {...OrderConfirmationData} key={index} />;
        }
        if (component.__component) {
            return (
                <RenderComponent
                    Component={component.__component}
                    data={component}
                    key={index}
                    position={index + 1}
                    isFromOptimization={true}
                />
            );
        }
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
      </CartContextWrapper>
    </>
  );
}
export default CartPage;

export async function getServerSideProps(context: any) {
  const res = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/carts?filters[slug][$eq]=${context?.params.pid}&publicationState=live`
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
      protected: context?.params.pid !== "info" ? true : false,
      model: pageData.data[0],
      appLogos: appLogos,
      analyticsPageType: "cart",
      header: header || null,
    }, // will be passed to the page component as props
  };
}
