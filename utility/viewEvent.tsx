import React, { useEffect, useState } from "react";
import * as ga from "../lib/ga/index";
import useStorage from "./useStoarge";
import { widget_powered_by } from "../utility/GAConstants";
import { Cookies } from "react-cookie";
import { getSanitizedPDPURL } from "./urlGenerator";

export function ViewEvent(
  ref: React.MutableRefObject<undefined>,
  params: any,
  eventName: string
) {
  const isFromTrendingSearch = global?.window?.location?.href?.includes(
    "isFromTrendingSearch=true"
  );
  const isFromPopularCategory = global?.window?.location?.href?.includes(
    "isFromPopularCategory=true"
  );

  const getRefererTitle = () => {
    if (isFromPopularCategory) return "popular categories";
    else if (isFromTrendingSearch) return "trending searches";
    else if (global?.window?.location?.pathname === "/account/wishlist")
      return "wishlist";
    else if (
      JSON?.parse(
        global?.window?.localStorage?.getItem("pageReferrer") || "[]"
      )?.[
        JSON?.parse(
          global?.window?.localStorage?.getItem("pageReferrer") || "[]"
        )?.length - 2
      ]?.previousPageTitle
    )
      return JSON?.parse(
        global?.window?.localStorage?.getItem("pageReferrer") || "[]"
      )?.[
        JSON?.parse(
          global?.window?.localStorage?.getItem("pageReferrer") || "[]"
        )?.length - 2
      ]?.previousPageTitle;
    else {
      return "na";
    }
  };

  const [isEventFired, setEventFired] = useState(false);
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
  const page_referrer_title = getRefererTitle();
  const callbackFunction = (entries: any) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isEventFired) {
      const pageReferer = JSON.parse(
        global?.window?.localStorage.getItem("pageReferrer") as string
      );
      if (pageReferer?.length > 0 && pageReferer?.length !== 1) {
        pageReferer?.[pageReferer?.length - 1]?.previousPageTitle;
        pageReferer?.[pageReferer?.length - 1]?.previousPagePath;
      }
      params = {
        ...params,
        page_type: getItem("currentPageType", "local"),
        page_path: getSanitizedPDPURL(global?.window?.location?.href),
        page_referrer_title: page_referrer_title || "na",
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
        user_type: userType || "na",
        visitor_type: isLoggedIn ? "loggedIn" : "guest",
        customer_type: customerType,
      };
      ga.event({
        action: eventName,
        params: params,
      });
      setEventFired(true);
    }
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  useEffect(() => {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(callbackFunction, options);
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);
  return <></>;
}

export default ViewEvent;
