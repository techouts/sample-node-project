import useStorage from "./useStoarge";
import * as ga from "../lib/ga";
import { Cookies } from "react-cookie";

export const callErrorEvent = (propParams: any) => {
  const { getItem } = useStorage();
  const cookie = new Cookies();
  ga.event({
    action: "error_event",
    params: {
      page_type: getItem("currentPageType", "local"),
      page_path: global?.window?.location?.href,
      page_referrer_title:
      getItem("pageReferrer", "local") ? JSON?.parse(getItem("pageReferrer", "local") as string)?.[
          JSON?.parse(getItem("pageReferrer", "local") as string)?.length -
            2
        ]?.previousPageTitle || "na" : "na",
      page_slug: getItem("currentPageSlug", "local"),
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
      error_type: "API failure",
      page_referrer:
      getItem("pageReferrer", "local") ? JSON?.parse(getItem("pageReferrer", "local") as string)?.[
          JSON?.parse(getItem("pageReferrer", "local") as string)?.length -
            2
        ]?.previousPagePath || "na" : "na",
      ...propParams,
    },
  });
};
