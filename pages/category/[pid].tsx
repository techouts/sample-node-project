import { ComponentRenderingUtility } from "../../utility/ComponentRenderingUtility";
import useStorage from "../../utility/useStoarge";
import { useEffect } from "react";
import * as ga from "../../lib/ga";
import router from "next/router";
import { Cookies } from "react-cookie";
import Head from "next/head";
const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const logger = require("../../next-logger.config");
const { getItem } = useStorage();
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
export const Category = (props: any) => {
  //webengage requirement
  useEffect(() => {
    ga.event({
      action: "category_view",
      params: {
        page_path: global?.window?.location?.href,
        page_type: getItem("currentPageType", "local"),
        page_referrer_title:
          JSON?.parse(localStorage?.getItem("pageReferrer") as string)?.[
            JSON?.parse(localStorage?.getItem("pageReferrer") as string)
              ?.length - 2
          ]?.previousPageTitle || "na",
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
        item_category: router?.query?.pid || "na",
        item_category2: "na",
        item_category3: "na",
        item_category4: "na",
        item_category_id: "na",
        item_category2_id: "na",
        item_category3_id: "na",
        item_category4_id: "na",
        page_referrer:
          JSON?.parse(localStorage?.getItem("pageReferrer") as string)?.[
            JSON?.parse(localStorage?.getItem("pageReferrer") as string)
              ?.length - 2
          ]?.previousPagePath || "na",
        user_type: userType || "na",
        visitor_type: isLoggedIn ? "loggedIn" : "guest",
        customer_type: customerType,
      },
    });
  }, []);
  return (
      <ComponentRenderingUtility
        props={props}
        isBreadCrumbsRequired={true}
        analyticsPageType="category"
        currentPageType="Category Listing Page"
      />
  );
};
export default Category;


export async function getServerSideProps(context: any) {
  const res = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/categories?filters[slug][$eq]=${context?.params.pid}&publicationState=live`
  );
  const appIcons = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/app-settings/1?populate[appIcons][populate]=*`
  );
  const headerData = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/headers?filters[slug][$eq]=ssb-header&publicationState=live`
  );
  const header = await headerData.json();
  const appLogos = await appIcons.json();
  const pageData = await res.json();
  if (pageData?.error) {
    logger.error(
      {
        URL: `${NEXT_PUBLIC_CMS_URL}/api/categories?filters[slug][$eq]=${context.params.pid}`,
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
