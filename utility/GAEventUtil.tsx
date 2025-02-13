import * as ga from "../lib/ga";
import useStorage from "./useStoarge";
import { widget_powered_by } from "./GAConstants";
import { AnyARecord } from "dns";
import { Cookies } from "react-cookie";

export const triggerGAAccountEvent = (
  params: any,
  action: string,
  event_type?: any,
  widget_type?: any,
  item_name?: any,
  item_type?: any,
  no_of_items?: any,
  item_id?: any,
  widget_description?: any
) => {
  const { getItem } = useStorage();
  const cookie = new Cookies();
  ga.event({
    action: action,
    params: {
      page_type: getItem("currentPageType", "local"),
      page_path: global?.window?.location?.href,
      page_referrer_title:
        JSON.parse(localStorage?.getItem("pageReferrer") as string)?.[
          JSON?.parse(localStorage?.getItem("pageReferrer") as string)?.length -
            2
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
      outbound: false,
      widget_powered_by: widget_powered_by,
      page_referrer:
        JSON?.parse(localStorage?.getItem("pageReferrer") as string)?.[
          JSON?.parse(localStorage?.getItem("pageReferrer") as string)?.length -
            2
        ]?.previousPagePath || "na",
      ...params,
    },
  });
};
export default triggerGAAccountEvent;

export const cartItemJSON = (cartItems: any) => {
  const newArr = cartItems?.map((obj: any, index: number) => {
    const myAccount = {} as any;
    myAccount["item_name"] = obj?.product?.name || "na";
    myAccount["item_type"] = obj?.product?.__typename || "na";
    myAccount["item_id"] = obj?.product?.sku || "na";
    myAccount["item_brand"] = obj?.product?.brand_name || "na";
    myAccount["item_original_price"] = "";
    myAccount["item_price"] = obj?.product?.prices?.price?.value || 0;
    myAccount["item_rating"] = obj?.product?.rating_summary || "na";
    cartItems?.map((obj2: any) => {
      myAccount["item_category"] = obj?.product?.categories?.[0]?.name || "na";
      myAccount["item_category2"] =
        obj2?.product?.categories?.[1]?.name || "na";
      myAccount["item_category3"] =
        obj2?.product?.categories?.[2]?.name || "na";
      myAccount["item_category4"] =
        obj2?.product?.categories?.[3]?.name || "na";
      myAccount["item_category5"] =
        obj2?.product?.sku || "na";
       myAccount["item_category5_id"] = obj2?.product?.sku || "na";
      myAccount["item_category_id"] =
        obj2?.product?.categories?.[0]?.category_code || 0;
      myAccount["item_category2_id"] =
        obj2?.product?.categories?.[1]?.category_code || 0;
      myAccount["item_category3_id"] =
        obj2?.product?.categories?.[2]?.category_code || 0;
      myAccount["item_category4_id"] =
        obj2?.product?.categories?.[3]?.category_code || 0;
    });
    return myAccount;
  });
  return newArr;
};
