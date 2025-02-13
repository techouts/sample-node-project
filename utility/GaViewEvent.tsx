import * as ga from "../lib/ga/index";
import { getSanitizedPDPURL } from "./urlGenerator";
import useStorage from "./useStoarge";
import { Cookies } from "react-cookie";
import { widget_powered_by } from "./GAConstants";

 function TriggerGaViewEvent( eventName: string,params: any,
    ) {
  const { getItem } = useStorage();
  const cookie = new Cookies();
  const pageReferer = JSON.parse(
    localStorage.getItem("pageReferrer") as string
  );
  if (pageReferer?.length > 0 && pageReferer?.length !== 1) {
    pageReferer?.[pageReferer?.length - 1]?.previousPageTitle;
    pageReferer?.[pageReferer?.length - 1]?.previousPagePath;
  }
  params = {
    ...params,
    page_type: getItem("currentPageType", "local"),
    page_path: getSanitizedPDPURL(global?.window?.location?.href),
    page_referrer_title: pageReferer?.[pageReferer?.length - 1]
      ?.previousPageTitle
      ? pageReferer?.[pageReferer?.length - 1]?.previousPageTitle
      : "na",
    platform: window?.innerWidth > 768 ? "PWA" : "MobilePWA",
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
    widget_powered_by: params?.widget_powered_by || widget_powered_by,
    page_referrer:
      getSanitizedPDPURL(
        JSON?.parse(localStorage?.getItem("pageReferrer") as string)?.[
          JSON?.parse(localStorage?.getItem("pageReferrer") as string)
            ?.length - 1
        ]?.previousPagePath
      ) || "na",
  };
  ga.event({
    action: eventName,
    params: params,
  });
  }

  export default TriggerGaViewEvent;