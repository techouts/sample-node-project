import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import MyAccountNavData from "../../JSON/MyAccountNavData.json";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../../components/Header/Header"), { ssr: true });
import styles from "../../styles/Home.module.css";
import Account from "../../components/Header/MobileBottomNaviagtion/Account/Account";
import { Cookies } from "react-cookie";
import Loader from "../../HOC/Loader/Loader";
import { chatBotUtility } from "../../utility/chatBotObjUtility";
import { useRecoilState } from "recoil";
import { SSBLogos } from "../../recoilstore";
import Script from "next/script";
const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const DomainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

function AccountPage() {
  const router = useRouter();
  const cookie = new Cookies();
  const [SSBeautyLogos, setSSBeautyLogos] = useRecoilState(SSBLogos);
  const [useAccountData, setUseAccountData] = useState<any>(null);
  const [displayLoader, setLoader] = useState(false);
  const [accountRerender, setAccountRerender] = useState(false);
  const [headerComp, setHeaderComponent] = useState<any>();
  const accessToken = cookie.get("accessToken")
    ? cookie.get("accessToken") === "unidentified"
      ? null
      : cookie.get("accessToken")
    : null;

  useEffect(() => {
    if (window?.od?.messenger) {
      window.od.messenger("pushMessage", chatBotUtility());
    }
  }, [global?.window?.od?.messenger, cookie.get("accessToken")]);

  useEffect(() => {
    if (window.screen.width > 600)
      router.push(`/account/${MyAccountNavData?.data?.[0]?.titlePath}`);
  }, [router]);
  const structureData = {
    "@context": `${process.env.NEXT_PUBLIC_SCHEMA_URL}`,
    "@type": "Organization",
    name: "SSBeauty",
    alternateName: "SSBeauty By Shoppers Stop",
    url: `${DomainURL}`,
    logo: headerComp?.logoImageUrl,
    sameAs: [
      `${process.env.NEXT_PUBLIC_FACEBOOK_URL}`,
      `${process.env.NEXT_PUBLIC_INSTAGRAM_URL}`,
    ],
  };
  async function fetchApi() {
    const bottomNav = await fetch(
      `${NEXT_PUBLIC_CMS_URL}/api/accounts?populate[seo][populate]=*&populate[Header][populate][items][populate]=*&populate[Header][populate][topItems][populate]=*&populate[BlogNavigation][populate][items][populate]=*&populate[components][populate]=*&populate[Footer][populate][items][populate]=*&populate[footerCopyRights][populate]=*&filters[slug][$eq]=mobile-account`
    );
    const appIcons = await fetch(
      `${NEXT_PUBLIC_CMS_URL}/api/app-settings/1?populate[appIcons][populate]=*`
    );
    const headerData = await fetch(
      `${NEXT_PUBLIC_CMS_URL}/api/headers?filters[slug][$eq]=ssb-header&publicationState=live`
    );
    const header = await headerData.json();
    const res = await bottomNav.json();
    const appLogos = await appIcons.json();
    const data = res?.data[0];
    await setSSBeautyLogos({
      ...SSBeautyLogos,
      appLogos: appLogos?.data?.appIcons?.items,
    });
    await setHeaderComponent({
      ...header?.data?.[0]?.Header,
      isHideBottomNav: false,
    });
    await setUseAccountData(data);
  }

  useEffect(() => {
    if (window.screen.width <= 600) fetchApi();
    setLoader(false);
  }, [accessToken]);
  const [signOpen, setSignOpen] = useState(false);


  return (
    <>
      <Head>
        <title>
          Online Shopping India - Shop for clothes, shoes, Bags, watches @
          Shoppersstop.com
        </title>
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
      <div className={styles.container}>
        <Box width="100%">
          <Header
            {...headerComp}
            setSignOpen={setSignOpen}
            signOpen={signOpen}
            setAccountRerender={setAccountRerender}
            accountRerender={accountRerender}
          />
          <Box sx={{ mb: "80px" }}>
            {displayLoader && <Loader />}
            {useAccountData && (
              <Account
                {...useAccountData}
                setSignOpen={setSignOpen}
                accessToken={accessToken}
                setLoader={setLoader}
              />
            )}
          </Box>
        </Box>
      </div>
      {/* <ChatBotWidget/> */}
    </>
  );
}
export default AccountPage;
