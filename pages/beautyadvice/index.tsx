import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../../components/Header/Header"), { ssr: true });
import styles from "../../styles/Home.module.css";
import { BeautyAdviceMsite } from "../../components/Header/MobileBottomNaviagtion/BeautyAdvice/BeautyAdviceMobile";
import { useRecoilState } from "recoil";
import { SSBLogos } from "../../recoilstore";
import AxiosInstance from "../../utility/AxiosInstance";
import Loader from "../../HOC/Loader/Loader";
import Head from "next/head";
import Script from "next/script";
const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const DomainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

export default function BeautyAdvicePage() {
  const [SSBeautyLogos, setSSBeautyLogos] = useRecoilState(SSBLogos);
  const [headerComponent, setHeaderComponent] = useState<any>();
  const [displayLoader, setLoader] = useState(true);
  const structureData = {
    "@context": `${process.env.NEXT_PUBLIC_SCHEMA_URL}`,
    "@type": "Organization",
    name: "SSBeauty",
    alternateName: "SSBeauty By Shoppers Stop",
    url: `${DomainURL}`,
    logo: headerComponent?.logoImageUrl,
    sameAs: [
      `${process.env.NEXT_PUBLIC_FACEBOOK_URL}`,
      `${process.env.NEXT_PUBLIC_INSTAGRAM_URL}`,
    ],
  };

  useEffect(() => {
    AxiosInstance(
      `${NEXT_PUBLIC_CMS_URL}/api/headers?filters[slug][$eq]=ssb-header&publicationState=live`,
      true,
      false
    ).then((response) => {
      setHeaderComponent({
        ...response?.data?.data?.[0]?.Header,
        isHideBottomNav: false,
      });
      AxiosInstance(
        `${NEXT_PUBLIC_CMS_URL}/api/app-settings/1?populate[appIcons][populate]=*`,
        true,
        false
      ).then((appIconRes) => {
        setLoader(false);
        setSSBeautyLogos({
          ...SSBeautyLogos,
          appLogos: appIconRes?.data?.data?.appIcons?.items,
        });
      });
    });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>
          Buy Beauty &amp; Cosmetic Products Online at Best Price in India |
          SSBeauty
        </title>
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
            ${JSON.parse(JSON.stringify(`{"debug_mode": ${process.env.NEXT_PUBLIC_TRACING_ENVIRONMENT === "prod"}, "send_page_view": false}`))});`,
          }}
        />
        <Script
        
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            window.onedirectSettings = {
              apiKey: "${process.env.NEXT_PUBLIC_OD_MESSANGER_PRE_CHAT_APIKEY}",
              widgetHash: "${process.env.NEXT_PUBLIC_OD_WIDGET_HASH}"
            }
              `,
          }}
        />
        <Script
        
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            window.od = {}; var mc = function() { mc.c(arguments);}
            mc.q = []; mc.c=function(args) { mc.q.push(args)};
            window.od.messenger = mc;
              `,
          }}
        />
        <Script
        
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            fetch("${process.env.NEXT_PUBLIC_MSG_ONEDIRECT_API}")
    .then((r) => r.json())
    .then((r) => {
      !function (e, s, n, t, a) { el = s.createElement(n), p = s.getElementsByTagName(n)[0], el.defer = 1, el.id = "onedirect-messaging-sdk", el.src = 'https://s3-ap-southeast-1.amazonaws.com/onedirect/messaging/web-sdk/production/'+r.version+'/od-messaging.init.v1.0.min.js', p.parentNode.insertBefore(el, p) }(window, document, "script");
    }).catch((error) => {
      console.log(error)
    })
              `,
          }}
        />
        <script
          
          async
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structureData) }}
        />
      </Head>
      {displayLoader && <Loader />}
      <Box width="100%">
        <Header {...headerComponent} />
        <Box sx={{ mb: "120px" }}>
          <BeautyAdviceMsite {...headerComponent} />
        </Box>
      </Box>
      {/* <ChatBotWidget/> */}
    </div>
  );
}
