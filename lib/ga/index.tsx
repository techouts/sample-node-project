import { getSanitizedPDPURL } from "../../utility/urlGenerator";

// log the pageview with their URL
export const pageview = (
  page_path: URL | string,
  page_type: string,
  page_referrer_title: string | Window,
  customer_id: string | Window,
  msd_user_id: string | Window,
  loyalty_level: any,
  page_slug: any,
  page_loadtime?: number,
  page_referrer?: any,
  item_deeplink_url?: URL | string,
  widget_title?: any,
  item_category?: any,
  item_category2?: any,
  page_desc?: any,
  user_type?: any,
  visitor_type?: any,
  customer_type?: any,
) => {
  let finalData = {};
  let pageData = {
    event: "page_view",
    page_path,
    page_type,
    page_referrer_title,
    platform: window?.innerWidth > 768 ? "PWA" : "MobilePWA",
    customer_id,
    msd_user_id,
    loyalty_level,
    page_slug,
    page_loadtime,
    page_referrer,
    item_deeplink_url,
    user_type,
    visitor_type,
    customer_type,
  };

  if (String(pageData.page_path)?.includes("/p/")) {
    pageData.page_path = getSanitizedPDPURL(pageData.page_path as string);
  }

  if (String(pageData.item_deeplink_url)?.includes("/p/")) {
    pageData.item_deeplink_url = getSanitizedPDPURL(
      pageData.item_deeplink_url as string
    );
  }

  let beautyStopPageData = {
    widget_title,
    item_category,
    item_category2,
    page_desc,
  };
  if (page_type?.includes("blog")) {
    finalData = { ...pageData, ...beautyStopPageData };
  } else {
    finalData = pageData;
  }
  window?.dataLayer?.push(finalData);
};

interface Event {
  action: string;
  params: {};
}

// log specific events happening.
export const event = ({ action, params }: Event) => {
  if (typeof window != "undefined") {
    window?.dataLayer?.push({ ...{ event: action }, ...params });
  }
};
