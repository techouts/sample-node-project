import { useEffect } from "react";
import { ComponentRenderingUtility } from "../../utility/ComponentRenderingUtility";
import * as ga from "../../lib/ga";
import router from "next/router";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const logger = require("../../next-logger.config");
const { getItem } = useStorage();

export const Brand = (props: any) => {
  const cookie = new Cookies();
  const userType = global?.window?.localStorage?.getItem("userType")
    ? global?.window?.localStorage?.getItem("userType")
    : "guest_user";
  const isLoggedIn = global?.window?.localStorage?.getItem("accessToken");
  const customerType: string | null = global?.window?.localStorage?.getItem(
    "customerType"
  )
    ? global?.window?.localStorage?.getItem("customerType")
    : "guest_user";
  //webengage requirement
  useEffect(() => {
    ga.event({
      action: "brand_view",
      params: {
        page_path: global?.window?.location?.pathname,
        page_type: getItem("currentPageType", "local"),
        page_referrer_title: JSON.parse(
          localStorage.getItem("pageReferrer") as string
        )?.[
          JSON.parse(localStorage.getItem("pageReferrer") as string)?.length - 1
        ]?.previousPageTitle,
        platform: global?.window?.innerWidth > 768 ? "PWA" : "MobilePWA",
        customer_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : cookie.get("MADid"),
        msd_user_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : "",
        loyalty_level: getItem("loyalitylevel", "local")
          ? getItem("loyalitylevel", "local")
          : "na",
        page_slug: getItem("currentPageSlug", "local"),
        brand_name: router?.query?.pid,
        brand_id: "na",
        category_name: "na",
        user_type: userType || "na",
        visitor_type: isLoggedIn ? "loggedIn" : "guest",
        customer_type: customerType,
      },
    });
  }, []);
  return (
      <ComponentRenderingUtility
        isBreadCrumbsRequired={true}
        props={props}
        analyticsPageType="brand"
        currentPageType="Brand Listing Page"
      />
  );
};
export default Brand;

export async function getServerSideProps(context: any) {
  const res = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/brands?filters[slug][$eq]=${context?.params.pid}&publicationState=live`
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
  if (pageData?.error) {
    logger.error(
      {
        URL:
          `${NEXT_PUBLIC_CMS_URL}/api/brands?filters[slug][$eq]=` +
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
    }, // will be passed to the page component as props
  };
}
