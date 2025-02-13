/* eslint-disable @next/next/next-script-for-ga */
import Head from "next/head";
import { ComponentRenderingUtility } from "../utility/ComponentRenderingUtility";
import Script from "next/script";
const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const DomainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;
const NEXT_PUBLIC_APP_LINK_META_TAG_DOMAIN: any =
  process.env.NEXT_PUBLIC_APP_LINK_META_TAG_DOMAIN;
const NEXT_PUBLIC_APP_STORE_ID: any = process.env.NEXT_PUBLIC_APP_STORE_ID;
const NEXT_PUBLIC_ANDRIOD_APP_PACKAGE: any =
  process.env.NEXT_PUBLIC_ANDRIOD_APP_PACKAGE;
const NEXT_PUBLIC_APP_NAME: any = process.env.NEXT_PUBLIC_APP_NAME;
const NEXT_PUBLIC_WEB_FALL_BACK: any = process.env.NEXT_PUBLIC_WEB_FALL_BACK;

export default function Home(props: any) {
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

  return (
    <>
      <Head>
        <meta
          property="al:ios:url"
          content={NEXT_PUBLIC_APP_LINK_META_TAG_DOMAIN + "/home"}
        />
        <meta
          property="al:android:url"
          content={NEXT_PUBLIC_APP_LINK_META_TAG_DOMAIN + "/home"}
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
        <meta property="al:android:app_name" content={NEXT_PUBLIC_APP_NAME} />
        <meta
          property="al:web:should_fallback"
          content={NEXT_PUBLIC_WEB_FALL_BACK}
        />
        <meta
          name="apple-itunes-app"
          content={`app-id=${NEXT_PUBLIC_APP_STORE_ID}, app-argument=${
            NEXT_PUBLIC_APP_LINK_META_TAG_DOMAIN + "/home"
          }`}
        />
        <meta property="og:title" content={props?.model?.title || props?.model?.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={global?.window?.location.href} />
        <meta property="og:image" content="/ssblogo_favicon.png" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:description" content={props?.model?.description} />
        <meta property="og:site_name" content="SSBeauty" />
        <script
          
          async
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structureData),
          }}
        />
      </Head>
      <ComponentRenderingUtility
        props={props}
        analyticsPageType="page"
        currentPageType="Home"
      />
    </>
  );
}
export async function getServerSideProps() {
  const res = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/pages?filters[slug][$eq]=home&publicationState=live`
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
  const data = { ...pageData?.data[0] };
  return {
    props: {
      pageNotFound: pageData?.data?.[0]?.components?.length > 0 ? false : true,
      model: data || null,
      appLogos: appLogos,
      header: header || null,
    }, // will be passed to the page component as props
  };
}
