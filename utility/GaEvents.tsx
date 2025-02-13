import * as ga from "../lib/ga";
import useStorage from "./useStoarge";

const getPmrDiscountPrice = (sku: string, items: any) => {
  return items?.item_level_promotions?.filter((data: any) => {
    return data?.sku === sku;
  })?.[0];
};

const getImageUrl = (details: any, variantDetails: any) => {
  return details?.image?.url && details?.image?.url !== ""
    ? details?.image?.url
    : variantDetails?.product?.image?.url &&
      variantDetails?.product?.image?.url !== ""
    ? variantDetails?.product?.image?.url
    : details?.additional_images?.[0]?.url &&
      details?.additional_images?.[0]?.url !== ""
    ? details?.additional_images?.[0]?.url
    : variantDetails?.product?.additional_images?.[0]?.url &&
      variantDetails?.product?.additional_images?.[0]?.url !== ""
    ? variantDetails?.product?.additional_images?.[0]?.url
    : details?.image?.url;
};

const getDetails = (details: any, variantDetails: any) => {
  return details?.__typename === "SimpleProduct"
    ? details
    : variantDetails?.product;
};
import {
  msd_behaviour,
  select_event_type,
  widget_powered_by,
  widget_type,
} from "../utility/GAConstants";
import { pdpRedirecion } from "./PdpRedirection";
import { Cookies } from "react-cookie";
import { ContactedGraphqlUrl } from "./MagentoImageUrlConcatConstant";
import { PRODUCT_FALLBACK_URL } from "../HOC/ProductCard/Constants";
import { useRouter } from "next/router";
import { getSanitizedPDPURL, transformItemName } from "./urlGenerator";
export const triggerGAEvent = (
  params: any,
  action: string,
  title?: string,
  type?: string
) => {
  const userType = global?.window?.localStorage?.getItem("userType")
    ? global?.window?.localStorage?.getItem("userType")
    : "guest_user";
  const isLoggedIn = global?.window?.localStorage?.getItem("accessToken");
  const customerType: string | null = global?.window?.localStorage?.getItem(
    "customerType"
  )
    ? global?.window?.localStorage?.getItem("customerType")
    : "guest_user";
  const page_referrer_title =
    window?.location?.pathname === "/account/wishlist"
      ? "wishlist"
      : JSON?.parse(localStorage?.getItem("pageReferrer") || "[]")?.[
          JSON?.parse(localStorage?.getItem("pageReferrer") || "[]")?.length - 2
        ]?.previousPageTitle || "na";
  const cookie = new Cookies();
  const { getItem } = useStorage();
  ga.event({
    action: action,
    params: {
      page_path: getSanitizedPDPURL(global?.window?.location?.href) || "na",
      page_type: type || getItem("currentPageType", "local"),
      page_referrer_title: page_referrer_title || "na",
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
      widget_powered_by: params?.widget_powered_by || widget_powered_by,
      widget_description: "na",
      outbound: false,
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
      ...params,
    },
  });
};
export default triggerGAEvent;

//add_shipping_info,begin_checkout,add_payment_info item array
export const cartItemJSON = (cartItems: any) => {
  const newArr = cartItems?.items?.map((obj: any, index: number) => {
    obj?.type_id === "simple"
      ? obj?.product?.image?.url
      : obj?.configured_variant?.image?.url;
    const deeplinkurl =
      `${global?.window?.location.origin}${
        obj?.product?.type_id === "simple"
          ? pdpRedirecion(
              obj?.product?.sku,
              obj?.product?.type_id,
              obj?.product?.name
            )
          : pdpRedirecion(
              obj?.product?.sku,
              obj?.product?.type_id,
              obj?.product?.name,
              obj?.configured_variant?.color,
              obj?.configured_variant?.size
            )
      }` || "na";
    const RetailPrice =
      obj?.prices?.price?.value * obj?.quantity -
      Number(
        cartItems?.item_level_promotions?.find(
          (i: any) => i?.sku === obj?.configured_variant?.sku
        )?.discount
      );
    const discount = obj?.prices?.price?.value * obj?.quantity - RetailPrice;
    const cartcheckout = {} as any;
    cartcheckout["item_id"] = obj?.configured_variant?.sku || "na";
    cartcheckout["item_name"] = obj?.product?.name || "na";
    cartcheckout["coupon"] = cartItems?.applied_coupons?.[0]?.code || 0;
    (cartcheckout["discount"] = Math.ceil(discount) || 0),
      (cartcheckout["index"] = index);
    cartcheckout["item_brand"] = obj?.product?.brand_info || "na";
    (cartcheckout["item_category"] = obj?.product?.categories?.[0]?.name || "na"),
      (cartcheckout["item_category2"] = obj?.product?.categories?.[1]?.name || "na"),
      (cartcheckout["item_category3"] =obj?.product?.categories?.[2]?.name|| "na"),
      (cartcheckout["item_category4"] = obj?.product?.categorie?.[3]?.name||"na"),
      (cartcheckout["item_category5"] = obj?.product?.sku || "na"),
      (cartcheckout["item_category5_id"] = obj?.product?.sku || "na"),
      (cartcheckout["item_variant"] =
        obj?.configurable_options?.filter(
          (item: any) => item?.option_label == "Color"
        )?.[0]?.value_label || "na");
    cartcheckout["price"] = obj?.prices?.price?.value * obj?.quantity || 0;
    cartcheckout["original_price"] = Math.ceil(RetailPrice)
      ? Math.ceil(RetailPrice)
      : Math.ceil(obj?.prices?.price?.value * obj?.quantity) || 0;
    cartcheckout["quantity"] = obj?.quantity || 0;
    cartcheckout["item_rating"] = obj?.product?.rating_summary;
    cartcheckout["affiliation"] = "na";
    (cartcheckout["status"] = obj?.product?.stock_status == "IN_STOCK"),
      (cartcheckout["item_ean_code"] = "na");
    cartcheckout["item_sample"] = obj?.mp_free_gifts?.is_free_gift || "na";
    cartcheckout["item_size"] = obj?.conconfigured_variant?.size
      ? obj?.conconfigured_variant?.size
      : obj?.product?.size || "na";
    cartcheckout["item_image_link"] = obj?.configured_variant?.image?.url
      ? [obj?.configured_variant?.image?.url]
      : obj?.product?.image?.url
      ? [obj?.product?.image?.url]
      : "na";
    cartcheckout["item_deeplink_url"] = deeplinkurl || "na ";
    (cartcheckout["item_category_id"] =
      obj?.product?.categories?.[0]?.id?.toString() || "na"),
      (cartcheckout["item_category2_id"] =
        obj?.product?.categories?.[1]?.id?.toString() || "na"),
      (cartcheckout["item_category3_id"] =
        obj?.product?.categories?.[2]?.id?.toString() || "na"),
      (cartcheckout["item_category4_id"] =
        obj?.product?.categories?.[3]?.id?.toString() || "na");
    cartcheckout["item_category5"] = obj?.product?.sku || "na";
    cartcheckout["item_category5_id"] = obj?.product?.sku || "na";
    return cartcheckout;
  });
  return newArr;
};
// item array for purchase event
export const orderItemJSON = (orderDetails: any) => {
  const newArr = orderDetails?.map((item: any, index: number) => {
    const deeplinkurl =
      `${window.location.origin}/${transformItemName(
        item?.items?.[0]?.product_name
      )}/p/${item?.items?.[0]?.parent_sku}` || "na";
    const retailPrice =
      item?.items?.[0]?.applied_pmr_promotions_amount > 0
        ? parseFloat(
            (
              item?.items?.[0]?.product_sale_price?.value -
              item?.items?.[0]?.applied_pmr_promotions_amount
            )?.toFixed(2)
          )
        : item?.items?.[0]?.product_sale_price?.value
        ? item?.items?.[0]?.product_sale_price?.value
        : 0 - item?.items?.[0]?.applied_pmr_promotions_amount?.toFixed(2);
    const catData = latestLevelBreadCrumbs(item?.items?.[0]?.categories, 4);
    const price =
      retailPrice + Number(item?.items?.[0]?.applied_pmr_promotions_amount);
    const orderconfirmation = {} as any;
    orderconfirmation["item_id"] = item?.items?.[0]?.product_sku || "na";
    orderconfirmation["item_name"] = item?.items?.[0]?.product_name || "na";
    orderconfirmation["coupon"] = item?.items?.[0]?.coupon_code || "na";
    orderconfirmation["discount"] = Number(
      item?.items?.[0]?.applied_pmr_promotions_amount
    );
    orderconfirmation["index"] = index + 1;
    orderconfirmation["quantity"] = item?.items?.[0]?.quantity_ordered || 0;
    orderconfirmation["item_brand"] = item?.items?.[0]?.brand_name || "na";
    orderconfirmation["item_variant"] =
      item?.items?.[0]?.selected_options?.[0]?.value || "na";
    orderconfirmation["item_size"] = item?.items?.[0]?.size || "na";
    orderconfirmation["original_price"] =
      item?.items?.[0]?.product_sale_price?.value -
        item?.items?.[0]?.applied_pmr_promotions_amount/item?.items?.[0]?.quantity_ordered || 0;
    orderconfirmation["price"] =
      item?.items?.[0]?.product_sale_price?.value || 0;
    orderconfirmation["item_rating"] = item?.items?.[0]?.average_rating || "na";
    orderconfirmation["affiliation"] = "na";
    (orderconfirmation["item_image_link"] = item?.egv_image
      ? [item?.egv_image]
      : item?.items?.[0]?.image
      ? [ContactedGraphqlUrl + item?.items?.[0]?.image]
      : [PRODUCT_FALLBACK_URL]),
      (orderconfirmation["item_deeplink_url"] = deeplinkurl || "na");
    (orderconfirmation["item_category"] =
      catData?.breadcrumbs?.[0]?.category_name || "na"),
      (orderconfirmation["item_category2"] =
        catData?.breadcrumbs?.[1]?.category_name || "na"),
      (orderconfirmation["item_category3"] = catData?.breadcrumbs?.[2]
        ?.category_name
        ? catData?.breadcrumbs?.[2]?.category_name
        : catData?.name || "na"),
      (orderconfirmation["item_category4"] = catData?.breadcrumbs?.[3]
        ?.category_name
        ? catData?.breadcrumbs?.[3]?.category_name
        : catData?.name || "na"),
      (orderconfirmation["item_ean_code"] = "na"),
      (orderconfirmation["item_sample"] = "na"),
      (orderconfirmation["item_category_id"] =
        item?.items?.[0]?.categories?.[0]?.uid?.toString() || "na"),
      (orderconfirmation["item_category2_id"] =
        item?.items?.[0]?.categories?.[1]?.uid?.toString() || "na"),
      (orderconfirmation["item_category3_id"] =
        item?.items?.[0]?.categories?.[2]?.uid?.toString() || "na"),
      (orderconfirmation["item_category5_id"] =
        item?.items?.[0]?.product_sku || "na"),
      (orderconfirmation["item_category4_id"] =
        item?.items?.[0]?.categories?.[4]?.uid?.toString() || "na");
    return orderconfirmation;
  });
  return newArr;
};

// transaction event item array
export const transactionItemArray = (orderDetails: any) => {
  const newArr = orderDetails?.map((item: any, index: number) => {
    const deeplinkurl =
      `${window.location.origin}/${transformItemName(
        item?.items?.[0]?.product_name
      )}/p/${item?.items?.[0]?.parent_sku}` || "na";
    const retailPrice =
      item?.items?.[0]?.applied_pmr_promotions_amount > 0
        ? parseFloat(
            (
              item?.items?.[0]?.product_sale_price?.value -
              item?.items?.[0]?.applied_pmr_promotions_amount /
                item?.items?.[0]?.quantity_ordered
            )?.toFixed(2)
          )
        : item?.items?.[0]?.product_sale_price?.value
        ? item?.items?.[0]?.product_sale_price?.value
        : 0 - item?.items?.[0]?.applied_pmr_promotions_amount?.toFixed(2);
    const price =
      retailPrice + Number(item?.items?.[0]?.applied_pmr_promotions_amount);
    const orderconfirmation = {} as any;
    orderconfirmation["item_id"] = item?.items?.[0]?.product_sku || "na";
    orderconfirmation["item_name"] = item?.items?.[0]?.product_name || "na";
    orderconfirmation["coupon"] = item?.items?.[0]?.coupon_code || "na";
    orderconfirmation["discount"] = Number(
      item?.items?.[0]?.applied_pmr_promotions_amount
    );
    orderconfirmation["index"] = index + 1;
    orderconfirmation["quantity"] = item?.items?.[0]?.quantity_ordered || 0;
    orderconfirmation["item_brand"] = item?.items?.[0]?.brand_name || "na";
    orderconfirmation["item_variant"] =
      item?.items?.[0]?.selected_options?.[0]?.value || "na";
    orderconfirmation["item_size"] = item?.items?.[0]?.size || "na";
    orderconfirmation["price"] =
      price * item?.items?.[0]?.quantity_ordered || 0;
    orderconfirmation["original_price"] =
      retailPrice * item?.items?.[0]?.quantity_ordered || 0;
    orderconfirmation["item_rating"] = item?.items?.[0]?.average_rating || "na";
    orderconfirmation["affiliation"] = "na";
    (orderconfirmation["item_image_link"] = item?.egv_image
      ? [item?.egv_image]
      : item?.items?.[0]?.image
      ? [ContactedGraphqlUrl + item?.items?.[0]?.image]
      : [PRODUCT_FALLBACK_URL]),
      (orderconfirmation["item_deeplink_url"] = deeplinkurl || "na");
    (orderconfirmation["item_category"] =
      item?.items?.[0]?.categories?.[0]?.name || "na"),
      (orderconfirmation["item_category2"] =
        item?.items?.[0]?.categories?.[1]?.name || "na"),
      (orderconfirmation["item_category3"] =
        item?.items?.[0]?.categories?.[2]?.name || "na"),
      (orderconfirmation["item_category4"] =
        item?.items?.[0]?.categories?.[3]?.name || "na"),
      (orderconfirmation["item_ean_code"] = "na"),
      (orderconfirmation["item_sample"] = "na"),
      (orderconfirmation["item_category_id"] =
        item?.items?.[0]?.categories?.[0]?.level?.toString() || "na"),
      (orderconfirmation["item_category2_id"] =
        item?.items?.[0]?.categories?.[1]?.level?.toString() || "na"),
      (orderconfirmation["item_category3_id"] =
        item?.items?.[0]?.categories?.[2]?.level?.toString() || "na"),
      (orderconfirmation["item_category5_id"] =
        item?.items?.[0]?.product_sku || "na"),
      (orderconfirmation["item_category4_id"] =
        item?.items?.[0]?.categories?.[4]?.level?.toString() || "na");
    return orderconfirmation;
  });
  return newArr;
};

export const myOrdersItemJSON = (ordersData: any) => {
  const newArr = ordersData?.map((data: any, index: number) => {
    const orderItem = {} as any;
    orderItem["item_id"] = data?.items?.[0]?.item_id || "na";
    orderItem["item_name"] = data?.items?.[0]?.product_name || "na";
    orderItem["item_type"] = data?.items?.[0]?.__typename || "na";
    orderItem["item_brand"] = data?.items?.brand_name || "na";
    orderItem["item_price"] =
      data?.items?.[0]?.product_sale_price?.value || "na";
    orderItem["item_original_price"] = "na";
    orderItem["item_rating"] = data?.items?.[0]?.average_rating || "na";
    ordersData?.map((obj2: any) => {
      orderItem["item_category"] = "na";
      orderItem["item_category2"] = "na";
      orderItem["item_category3"] = "na";
    });
    return orderItem;
  });
  return newArr;
};
// cart_updated Event in Cart while removing product from cart
export const cartUpdatedEvent = (response: any) => {
  const updatedcartNo = itemCartUpdate(
    response?.data?.removeItemFromCart?.cart?.items ||
      response?.data?.updateCartItems?.cart?.items,
    response?.data?.removeItemFromCart?.cart?.item_level_promotions ||
      response?.data?.updateCartItems?.cart?.item_level_promotions
  );
  triggerGAEvent(
    {
      no_of_items:
        response?.data?.removeItemFromCart?.cart?.items?.length ||
        response?.data?.updateCartItems?.cart?.items?.length ||
        0,
      index: 1,
      updated_items: updatedcartNo,
      value:
        response?.data?.removeItemFromCart?.cart?.prices?.grand_total?.value ||
        response?.data?.updateCartItems?.cart?.prices?.grand_total?.value ||
        0,
    },
    "cart_updated"
  );
};

// cart_updated item array
export const itemCartUpdate = (items: any, item_level_promotions: any) => {
  const getImageURL = (cartItem: any) => {
    if (cartItem?.product?.type_id == "simple") {
      return cartItem?.product?.image?.url;
    } else {
      return cartItem?.configured_variant?.image?.url;
    }
  };
  const newArr = items?.map((cartItem: any) => {
    const RetailPrice =
      cartItem?.prices?.price?.value * cartItem?.quantity -
      Number(
        item_level_promotions?.find(
          (i: any) => i?.sku === cartItem?.configured_variant?.sku
        )?.discount
      );
    const discount =
      cartItem?.prices?.price?.value * cartItem?.quantity - RetailPrice;
    const variant =
      cartItem?.configurable_options?.filter(
        (item: any) => item?.option_label == "Color"
      )?.[0]?.value_label || "na";
    const cartUpdates = {} as any;
    cartUpdates["item_id"] = cartItem?.configured_variant?.sku || "na";
    cartUpdates["item_name"] =
      cartItem?.configured_variant?.name || cartItem?.product?.name;
    cartUpdates["index"] = 1;
    cartUpdates["quantity"] = cartItem?.quantity;
    cartUpdates["item_image_link"] = getImageURL(cartItem)
      ? [getImageURL(cartItem)]
      : "na";
    cartUpdates["price"] =
      cartItem?.prices?.price?.value * cartItem?.quantity || 0;
    cartUpdates["original_price"] = RetailPrice
      ? RetailPrice
      : cartItem?.prices?.price?.value * cartItem?.quantity || 0;
    cartUpdates["discount"] = Math.ceil(discount) || 0;
    cartUpdates["item_deeplink_url"] =
      `${global?.window?.location.origin}${
        cartItem?.product.type_id === "simple"
          ? pdpRedirecion(
              cartItem?.product?.sku,
              cartItem?.product?.type_id,
              cartItem?.product?.name
            )
          : pdpRedirecion(
              cartItem?.product?.sku,
              cartItem?.product?.type_id,
              cartItem?.product?.name,
              cartItem?.configured_variant?.color,
              cartItem?.configured_variant?.size
            )
      }` || "na";
    (cartUpdates["item_category_id"] =
      cartItem?.product?.categories?.[0]?.id?.toString() || "na"),
      (cartUpdates["item_category2_id"] =
        cartItem?.product?.categories?.[1]?.id?.toString() || "na");
    cartUpdates["item_category3_id"] =
      cartItem?.product?.categories?.[2]?.id?.toString() || "na";
    cartUpdates["item_category4_id"] =
      cartItem?.product?.categories?.[3]?.id?.toString() || "na";
    cartUpdates["item_category5"] = cartItem?.product?.sku || "na";
    cartUpdates["item_category5_id"] = cartItem?.product?.sku || "na";
    cartUpdates["item_category"] =
      cartItem?.product?.categories?.[0]?.name || "na";
    cartUpdates["item_category2"] =
      cartItem?.product?.categories?.[1]?.name || "na";
    cartUpdates["item_category3"] =
      cartItem?.product?.categories?.[2]?.name || "na";
    cartUpdates["item_category4"] =
      cartItem?.product?.categories?.[3]?.name || "na";
    cartUpdates["item_brand"] = cartItem?.product?.brand_info || "na";
    cartUpdates["item_variant"] = variant || "na";
    return cartUpdates;
  });
  return newArr;
};
//BUYNOW CTA - add_to_cart event in pdp and cart_updated event in PDP, PLP
export const pdpcartUpdatedEvent = (
  data: any,
  brand: any,
  deeplinkurl?: any
) => {
  const pdpupdatedcartNo = pdpitemCartUpdate(data, brand, deeplinkurl);
  triggerGAEvent(
    {
      no_of_items: 1,
      index: 1,
      updated_items: [pdpupdatedcartNo],
      value: data?.price_range?.minimum_price?.regular_price?.value || 0,
    },
    "cart_updated"
  );
};
export const pdpitemCartUpdate = (item: any, brand: any, deeplinkurl?: any) => {
  const variant =
    item?.configurable_options?.filter(
      (item: any) => item?.option_label == "Color"
    )?.[0]?.value_label || "na";
  const cartUpdates = {} as any;
  cartUpdates["item_id"] = item?.variants?.[0]?.product?.sku || "na";
  cartUpdates["item_name"] = item?.name;
  cartUpdates["index"] = 1;
  cartUpdates["quantity"] = 1;
  cartUpdates["item_image_link"] = (
    item?.type_id === "simple"
      ? item?.image?.url
      : item?.variants?.[0]?.product?.image?.url
  )
    ? [
        item?.type_id === "simple"
          ? item?.image?.url
          : item?.variants?.[0]?.product?.image?.url,
      ]
    : "na";
  cartUpdates["price"] = item?.pmr_price_value?.amount?.value || 0;
  cartUpdates["item_variant"] = variant || "na";
  cartUpdates["discount"] =
    item?.price_range?.minimum_price?.discount?.amountoff || 0;
  cartUpdates["original_price"] =
    item?.price_range?.minimum_price?.regular_price?.value || 0;
  cartUpdates["item_deeplink_url"] =
    `${global?.window?.location.origin}${deeplinkurl}` || "na";
  (cartUpdates["item_brand"] = brand || "na"),
    (cartUpdates["item_category"] = item?.categories?.[0]?.name || "na");
  cartUpdates["item_category2"] = item?.categories?.[1]?.name || "na";
  cartUpdates["item_category3"] = item?.categories?.[2]?.name || "na";
  cartUpdates["item_category4"] = item?.categories?.[3]?.name || "na";
  cartUpdates["item_category_id"] =
    item?.categories?.[0]?.id?.toString() || "na";
  cartUpdates["item_category2_id"] =
    item?.categories?.[1]?.id?.toString() || "na";
  cartUpdates["item_category3_id"] =
    item?.categories?.[2]?.id?.toString() || "na";
  cartUpdates["item_category4_id"] =
    item?.categories?.[3]?.id?.toString() || "na";
  cartUpdates["item_category5"] = item?.sku || "na";
  cartUpdates["item_category5_id"] = item?.sku || "na";
  return cartUpdates;
};

// Wishlist_updated Event in PLP,PDP and Cart
export const wishlistUpdatedEvent = (
  response: any,
  pdpvarinat?: any,
  pPrice?: any,
  pRetailprice?: any,
  ofDiscount?: any
) => {
  const updatedwishlistNo = itemwishlistUpdate(
    response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items ||
      response?.data?.removeProductsFromWishlist?.wishlist?.items_v2?.items,
    pdpvarinat,
    pPrice,
    pRetailprice,
    ofDiscount
  );
  triggerGAEvent(
    {
      no_of_items:
        response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items
          ?.length ||
        response?.data?.removeProductsFromWishlist?.wishlist?.items_v2?.items
          ?.length ||
        0,
      index: 1,
      updated_items: updatedwishlistNo,
      value: 0,
    },
    "wishlist_updated"
  );
};
// wishlist_updated item array
export const itemwishlistUpdate = (
  items: any,
  pdpvarinat?: any,
  pPrice?: any,
  pRetailprice?: any,
  ofDiscount?: any
) => {
  const newArr = items?.map((wishlistItem: any) => {
    const variant = wishlistItem?.product?.configurable_options?.map(
      (singleFilter: any) => {
        const allLabels = singleFilter?.values?.map((singleValue: any) => {
          return singleValue?.label;
        });
        return allLabels;
      }
    );
    const catData = latestLevelBreadCrumbs(
      wishlistItem?.product?.categories,
      4
    );
    const flattenedVariants = [...variant];
    const wishlistUpdates = {} as any;
    (wishlistUpdates["item_id"] =
      wishlistItem?.product?.variants?.[0]?.product?.sku || "na"),
      (wishlistUpdates["item_name"] = wishlistItem?.product?.name),
      (wishlistUpdates["index"] = 1);
    (wishlistUpdates["quantity"] = wishlistItem?.quantity || 0),
      (wishlistUpdates["price"] =
        wishlistItem?.product?.price_range?.minimum_price?.regular_price
          ?.value || 0),
      (wishlistUpdates["discount"] =
        wishlistItem?.product?.pmr_price_value?.discount?.amount_off || 0),
      (wishlistUpdates["original_price"] =
        wishlistItem?.product?.pmr_price_value?.amount?.value || 0),
      (wishlistUpdates["item_image_link"] = [
        wishlistItem?.product.type_id === "simple"
          ? wishlistItem?.product?.image?.url
          : wishlistItem?.product?.variants?.[0]?.product?.image?.url,
      ]),
      (wishlistUpdates["item_deeplink_url"] =
        `${global?.window?.location.origin}${
          wishlistItem?.product.type_id === "simple"
            ? pdpRedirecion(
                wishlistItem?.product?.sku,
                wishlistItem?.product?.type_id,
                wishlistItem?.product?.name
              )
            : pdpRedirecion(
                wishlistItem?.product?.sku,
                wishlistItem?.product?.type_id,
                wishlistItem?.product?.name,
                wishlistItem?.variants?.[0]?.product?.color,
                wishlistItem?.variants?.[0]?.product?.size
              )
        }` || "na");
    wishlistUpdates["item_brand"] = wishlistItem?.product?.brand_info || "na";
    wishlistUpdates["item_variant"] = flattenedVariants || pdpvarinat || "na";
    wishlistUpdates["item_category"] =
      catData?.breadcrumbs?.[0]?.category_name || "na";
    wishlistUpdates["item_category2"] =
      catData?.breadcrumbs?.[1]?.category_name || "na";
    wishlistUpdates["item_category3"] = catData?.breadcrumbs?.[2]?.category_name
      ? catData?.breadcrumbs?.[2]?.category_name
      : catData?.name || "na";
    wishlistUpdates["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
      ? catData?.breadcrumbs?.[3]?.category_name
      : catData?.name || "na";
    wishlistUpdates["item_category_id"] =
      wishlistItem?.product?.categories?.[0]?.id?.toString() || "na";
    wishlistUpdates["item_category2_id"] =
      wishlistItem?.product?.categories?.[1]?.id?.toString() || "na";
    wishlistUpdates["item_category3_id"] =
      wishlistItem?.product?.categories?.[2]?.id?.toString() || "na";
    wishlistUpdates["item_category4_id"] =
      wishlistItem?.product?.categories?.[3]?.id?.toString() || "na";
    wishlistUpdates["item_category5"] = wishlistItem?.product?.sku || "na";
    wishlistUpdates["item_category5_id"] = wishlistItem?.product?.sku || "na";
    return wishlistUpdates;
  });
  return newArr;
};

export const cartListJSON = (cartItems: any) => {
  const newArr = cartItems?.map((obj: any, index: number) => {
    const cartItem = {} as any;
    cartItem["item_id"] = obj?.product?.sku || "na";
    cartItem["item_name"] = obj?.product?.name || "na";
    cartItem["item_type"] = obj?.product?.__typename || "na";
    cartItem["item_brand"] = obj?.product?.brand_name || "na";
    cartItem["item_price"] = obj?.prices?.price?.value || "na";
    cartItem["item_original_price"] = "";
    cartItem["item_rating"] = obj?.product?.rating_summary || "na";
    cartItems?.map((obj2: any) => {
      cartItem["item_category"] = obj?.product?.categories?.[0]?.name || "na";
      cartItem["item_category2"] = obj2?.product?.categories?.[1]?.name || "na";
      cartItem["item_category3"] = obj2?.product?.categories?.[2]?.name || "na";
    });
    return cartItem;
  });
  return newArr;
};

const latestLevelBreadCrumbs = (catList: any[], level: number) => {
  return catList?.find((item: any) => {
    if (item?.level === level) {
      return item;
    } else {
      latestLevelBreadCrumbs(catList, level - 1);
    }
  });
};

//add_to_cart Event in PDP, PLP, wishlist
export const callCartEvent = (
  eventName: string,
  details: any,
  pageid?: any,
  linktext?: string,
  componentid?: any,
  deeplinkurl?: any,
  gakey?: number,
  variantDetails?: any,
  response?: any
) => {
  const brandDataIndex =
    response?.data?.addConfigurableProductsToCart?.cart?.items?.length - 1;
  const produtInfo =
    response?.data?.addConfigurableProductsToCart?.cart?.items?.[
      brandDataIndex
    ];
  const pdata =
    response?.data?.addConfigurableProductsToCart?.cart
      ?.item_level_promotions ||
    response?.data?.addSimpleProductsToCart?.cart?.item_level_promotions;
  const retailprice =
    details?.price_range?.minimum_price?.regular_price?.value -
      pdata?.[0]?.discount ||
    details?.items?.[0]?.price_range?.minimum_price?.regular_price?.value -
      pdata?.[0]?.discount;
  const producturl = `${global?.window?.location.origin}${
    details?.type_id === "simple"
      ? pdpRedirecion(details?.sku, details?.type_id, details?.name)
      : pdpRedirecion(
          details?.sku,
          details?.type_id,
          details?.name,
          details?.configured_variant?.color,
          details?.configured_variant?.size
        )
  }`;
  const catData = latestLevelBreadCrumbs(produtInfo?.product?.categories, 4);
  const itemCartArray = Item(
    details,
    deeplinkurl,
    variantDetails,
    gakey,
    retailprice,
    pdata,
    produtInfo,
    producturl,
    catData
  );
  triggerGAEvent(
    {
      widget_type: widget_type,
      content_type: "product",
      widget_title: pageid == "MY WISHLIST" || "na",
      widget_description: "na",
      widget_position: gakey || 0,
      link_text: linktext,
      link_url: `${global?.window?.location.origin}${deeplinkurl}` || "na",
      no_of_items: 1,
      index: gakey || 0,
      item_name: details?.name,
      item_id: variantDetails?.product?.sku || "na",
      component_id: componentid || "na",
      item_brand: produtInfo?.product?.brand_info || "na",
      item_type: details?.__typename || "na",
      item_category: catData?.breadcrumbs?.[0]?.category_name || "na",
      item_category2: catData?.breadcrumbs?.[1]?.category_name || "na",
      item_category3: catData?.breadcrumbs?.[2]?.category_name
        ? catData?.breadcrumbs?.[2]?.category_name
        : catData?.name || "na",
      item_category4: catData?.breadcrumbs?.[3]?.category_name
        ? catData?.breadcrumbs?.[3]?.category_name
        : catData?.name || "na",
      item_image_link: getImageUrl(details, variantDetails)
        ? [getImageUrl(details, variantDetails)]
        : details?.variants?.[0]?.product?.image?.url || "na",
      item_original_price:
        Math.ceil(
          getDetails(details, variantDetails)?.pmr_price_value?.amount?.value
        ) || 0,
      item_price:
        getDetails(details, variantDetails)?.price_range?.minimum_price
          ?.regular_price?.value || 0,
      status: details?.stock_status == "IN_STOCK" || "na",
      item_category_id:
        details?.categories?.[0]?.id?.toString() ||
        produtInfo?.product?.categories?.[0]?.id?.toString() ||
        "na",
      item_category2_id:
        details?.categories?.[0]?.id?.toString() ||
        produtInfo?.product?.categories?.[1]?.id?.toString() ||
        "na",
      item_category3_id:
        details?.categories?.[0]?.id?.toString() ||
        produtInfo?.product?.categories?.[2]?.id?.toString() ||
        "na",
      item_category4_id:
        details?.categories?.[0]?.id?.toString() ||
        produtInfo?.product?.categories?.[3]?.id?.toString() ||
        "na",
      item_category5: details?.sku || "na",
      item_category5_id: details?.sku || "na",
      discount: pdata?.[0]?.discount || 0,
      item_variant:
        details?.configurable_options
          ?.filter((att: any) => att?.attribute_code === "color")?.[0]
          ?.values?.filter?.((dataVal: any) => {
            return (
              dataVal?.value_index == getDetails(details, variantDetails)?.color
            );
          })?.[0]?.label ||
        details?.configurable_options?.[0]?.values?.[0]?.label ||
        "na",
      item_rating: details?.rating_summary,
      item_ean_code: "na",
      item_size: getDetails(details, variantDetails)?.size || "na",
      item_deeplink_url: producturl || "na",
      user_pin_code: localStorage?.getItem("pincode"),
      cart_items: [itemCartArray],
    },
    eventName
  );
};
//slp add_to_cart event
export const callsearchCartEvent = (
  eventName: string,
  details: any,
  pageid?: any,
  linktext?: string,
  brandName?: string,
  id?: any,
  deeplinkurl?: any,
  gakey?: any,
  variantDetails?: any,
  response?: any
) => {
  const imagelink = details?.image?.url;
  const brandDataIndex =
    response?.data?.addConfigurableProductsToCart?.cart?.items?.length - 1;
  const produtInfo =
    response?.data?.addConfigurableProductsToCart?.cart?.items?.[
      brandDataIndex
    ];
  const catData = latestLevelBreadCrumbs(produtInfo?.product?.categories, 4);
  const itemCartArray = searchcartItems(
    details,
    deeplinkurl,
    imagelink,
    gakey,
    produtInfo,
    catData
  );
  triggerGAEvent(
    {
      widget_type: widget_type,
      content_type: "product",
      widget_title: pageid == "MY WISHLIST" || "na",
      widget_description: "na",
      widget_position: gakey || 0,
      link_text: linktext,
      link_url: `${global?.window?.location.origin}${deeplinkurl}` || "na",
      no_of_items: 1,
      index: gakey || 0,
      item_name: details?.name,
      item_id: variantDetails?.product?.sku || "na",
      component_id: id,
      item_brand: produtInfo?.product?.brand_info || "na",
      item_type: details?.__typename || "na",
      item_category: catData?.breadcrumbs?.[0]?.category_name || "na",
      item_category2: catData?.breadcrumbs?.[1]?.category_name || "na",
      item_category3: catData?.breadcrumbs?.[2]?.category_name
        ? catData?.breadcrumbs?.[2]?.category_name
        : catData?.name || "na",
      item_category4: catData?.breadcrumbs?.[3]?.category_name
        ? catData?.breadcrumbs?.[3]?.category_name
        : catData?.name || "na",
      item_image_link: getImageUrl(details, variantDetails)
        ? [getImageUrl(details, variantDetails)]
        : details?.variants?.[0]?.product?.image?.url || "na",
      item_original_price:
        getDetails(details, variantDetails)?.pmr_price_value?.amount?.value ||
        details?.pmr_price_value?.amount?.value ||
        variantDetails?.pmr_price_value?.amount?.value ||
        0,
      item_price:
        getDetails(details, variantDetails)?.price_range?.minimum_price
          ?.regular_price?.value ||
        details?.price_range?.minimum_price?.regular_price?.value ||
        variantDetails?.price_range?.minimum_price?.regular_price?.value ||
        0,
      discount:
        Math.ceil(
          getDetails(details, variantDetails)?.pmr_price_value?.discount
            ?.amount_off
        ) || 0,
      status: details?.stock_status == "IN_STOCK" || "na",
      item_category_id:
        details?.categories?.[0]?.id?.toString() ||
        produtInfo?.product?.categories?.[0]?.id?.toString() ||
        "na",
      item_category2_id:
        details?.categories?.[1]?.id?.toString() ||
        produtInfo?.product?.categories?.[1]?.id?.toString() ||
        "na",
      item_category3_id:
        details?.categories?.[2]?.id?.toString() ||
        produtInfo?.product?.categories?.[2]?.id?.toString() ||
        "na",
      item_category4_id:
        details?.categories?.[3]?.id?.toString() ||
        produtInfo?.product?.categories?.[3]?.id?.toString() ||
        "na",
      item_category5: details?.sku || "na",
      item_category5_id: details?.sku || "na",
      item_variant:
        details?.configurable_options
          ?.filter((att: any) => att?.attribute_code === "color")?.[0]
          ?.values?.filter?.((dataVal: any) => {
            return (
              dataVal?.value_index == getDetails(details, variantDetails)?.color
            );
          })?.[0]?.label ||
        details?.configurable_options?.[0]?.values?.[0]?.label ||
        "na",
      item_rating: details?.rating_summary,
      item_ean_code: "na",
      item_size: getDetails(details, variantDetails)?.size || "na",
      item_deeplink_url: deeplinkurl,
      search_term:
        window?.location?.search &&
        window?.location?.search
          ?.replace("?", "")
          ?.split("&")
          ?.filter((item: any) => item?.includes("search"))?.[0]
          ?.split("=")?.[1],
      user_pin_code: localStorage?.getItem("pincode"),
      cart_items: [itemCartArray],
    },
    eventName
  );
};

// add to cart item array
export const Item = (
  details: any,
  deeplinkurl: any,
  variantDetails: any,
  gakey?: any,
  retailPrice?: any,
  pdata?: any,
  produtInfo?: any,
  producturl?: any,
  catData?: any
) => {
  const itemArray = {} as any;
  (itemArray["item_id"] = variantDetails?.product?.sku),
    (itemArray["item_name"] = details?.name),
    (itemArray["item_type"] = details?.__typename),
    (itemArray["coupon"] = "na"),
    (itemArray["discount"] = pdata?.[0]?.discount || 0),
    (itemArray["index"] = gakey),
    (itemArray["item_brand"] = produtInfo?.product?.brand_info || "na"),
    (itemArray["item_category"] =
      catData?.breadcrumbs?.[0]?.category_name || "na"),
    (itemArray["item_variant"] =
      details?.configurable_options
        ?.filter((att: any) => att?.attribute_code === "color")?.[0]
        ?.values?.filter?.((dataVal: any) => {
          return (
            dataVal?.value_index == getDetails(details, variantDetails)?.color
          );
        })?.[0]?.label ||
      details?.configurable_options?.[0]?.values?.[0]?.label ||
      "na"),
    (itemArray["original_price"] =
      Math.ceil(
        getDetails(details, variantDetails)?.pmr_price_value?.amount?.value
      ) || 0),
    (itemArray["price"] =
      getDetails(details, variantDetails)?.price_range?.minimum_price
        ?.regular_price?.value || 0),
    (itemArray["quantity"] = 1),
    (itemArray["item_rating"] = details?.rating_summary),
    (itemArray["item_category2"] =
      catData?.breadcrumbs?.[1]?.category_name || "na"),
    (itemArray["item_category3"] = catData?.breadcrumbs?.[2]?.category_name
      ? catData?.breadcrumbs?.[2]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
      ? catData?.breadcrumbs?.[3]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category_id"] =
      produtInfo?.product?.categories?.[0]?.id?.toString() || "na"),
    (itemArray["item_category2_id"] =
      produtInfo?.product?.categories?.[1]?.id?.toString() || "na"),
    (itemArray["item_category3_id"] =
      produtInfo?.product?.categories?.[2]?.id?.toString() || "na"),
    (itemArray["item_category4_id"] =
      produtInfo?.product?.categories?.[3]?.id?.toString() || "na"),
    (itemArray["item_category5"] = details?.sku || "na"),
    (itemArray["item_category5_id"] = details?.sku || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["status"] = details?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] =
      getDetails(details, variantDetails)?.size || "na"),
    (itemArray["item_deeplink_url"] = producturl || "na"),
    (itemArray["item_image_link"] = getImageUrl(details, variantDetails)
      ? [getImageUrl(details, variantDetails)]
      : details?.variants?.[0]?.product?.image?.url || "na");
  itemArray["item_sample"] = "na";
  return itemArray;
};
//cart item array
export const cartItemss = (
  details: any,
  deeplinkurl: any,
  variantDetails: any,
  gakey?: any,
  retailPrice?: any,
  pdata?: any,
  produtInfo?: any
) => {
  const itemArray = {} as any;
  (itemArray["item_id"] = variantDetails?.product?.sku
    ? variantDetails?.product?.sku
    : "na"),
    (itemArray["item_name"] = details?.name),
    (itemArray["item_type"] = details?.__typename),
    (itemArray["coupon"] = "na"),
    (itemArray["discount"] = pdata?.[0]?.discount || 0),
    (itemArray["index"] = gakey),
    (itemArray["item_brand"] = produtInfo?.product?.brand_info || "na"),
    (itemArray["item_category"] = details?.categories?.[0]?.name || "na"),
    (itemArray["item_variant"] =
      details?.configurable_options
        ?.filter((att: any) => att?.attribute_code === "color")?.[0]
        ?.values?.filter?.((dataVal: any) => {
          return (
            dataVal?.value_index == getDetails(details, variantDetails)?.color
          );
        })?.[0]?.label ||
      details?.configurable_options?.[0]?.values?.[0]?.label ||
      "na"),
    (itemArray["original_price"] =
      Math.ceil(
        getDetails(details, variantDetails)?.pmr_price_value?.amount?.value
      ) || 0),
    (itemArray["price"] =
      getDetails(details, variantDetails)?.price_range?.minimum_price
        ?.regular_price?.value || 0),
    (itemArray["quantity"] = 1),
    (itemArray["item_rating"] = details?.rating_summary),
    (itemArray["item_category2"] = details?.categories?.[1]?.name || "na"),
    (itemArray["item_category3"] = details?.categories?.[2]?.name || "na"),
    (itemArray["item_category4"] = details?.categories?.[3]?.name || "na"),
    (itemArray["item_category_id"] =
      details?.categories?.[0]?.id?.toString() || "na"),
    (itemArray["item_category2_id"] =
      details?.categories?.[1]?.id?.toString() || "na"),
    (itemArray["item_category3_id"] =
      details?.categories?.[2]?.id?.toString() || "na"),
    (itemArray["item_category4_id"] =
      details?.categories?.[3]?.id?.toString() || "na"),
    (itemArray["item_category5"] = details?.sku || "na"),
    (itemArray["item_category5_id"] = details?.sku || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["status"] = details?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] =
      getDetails(details, variantDetails)?.size || "na"),
    (itemArray["item_deeplink_url"] =
      `${global?.window?.location.origin}${deeplinkurl}` || "na"),
    (itemArray["item_image_link"] = getImageUrl(details, variantDetails)
      ? [getImageUrl(details, variantDetails)]
      : "na");
  itemArray["item_sample"] = "na";
  return itemArray;
};
//search add to cart item array
export const searchcartItems = (
  details: any,
  deeplinkurl: any,
  variantDetails: any,
  gakey?: any,
  produtInfo?: any,
  catData?: any
) => {
  const item_original_price =
    getDetails(details, variantDetails)?.pmr_price_value?.amount?.value ||
    details?.pmr_price_value?.amount?.value ||
    variantDetails?.pmr_price_value?.amount?.value;
  const item_price =
    getDetails(details, variantDetails)?.price_range?.minimum_price
      ?.regular_price?.value ||
    details?.price_range?.minimum_price?.regular_price?.value ||
    variantDetails?.price_range?.minimum_price?.regular_price?.value;
  const offerdiscount = item_price - item_original_price;
  const itemArray = {} as any;
  (itemArray["item_id"] = variantDetails?.product?.sku || "na"),
    (itemArray["item_name"] = details?.name),
    (itemArray["item_type"] = details?.__typename),
    (itemArray["coupon"] = "na"),
    (itemArray["discount"] = Math.ceil(offerdiscount) || 0),
    (itemArray["index"] = gakey),
    (itemArray["item_brand"] = produtInfo?.product?.brand_info || "na"),
    (itemArray["item_category"] = details?.categories?.[0]?.name || "na"),
    (itemArray["item_variant"] =
      details?.configurable_options
        ?.filter((att: any) => att?.attribute_code === "color")?.[0]
        ?.values?.filter?.((dataVal: any) => {
          return (
            dataVal?.value_index == getDetails(details, variantDetails)?.color
          );
        })?.[0]?.label ||
      details?.configurable_options?.[0]?.values?.[0]?.label ||
      "na"),
    (itemArray["price"] = item_price || 0),
    (itemArray["original_price"] = item_original_price || 0),
    (itemArray["quantity"] = 1),
    (itemArray["item_rating"] = details?.rating_summary),
    (itemArray["item_category2"] =
      catData?.breadcrumbs?.[1]?.category_name || "na"),
    (itemArray["item_category3"] = catData?.breadcrumbs?.[2]?.category_name
      ? catData?.breadcrumbs?.[2]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
      ? catData?.breadcrumbs?.[3]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category_id"] =
      details?.categories?.[0]?.id?.toString() ||
      produtInfo?.product?.categories?.[0]?.id?.toString() ||
      "na"),
    (itemArray["item_category2_id"] =
      details?.categories?.[1]?.id?.toString() ||
      produtInfo?.product?.categories?.[1]?.id?.toString() ||
      "na"),
    (itemArray["item_category3_id"] =
      details?.categories?.[2]?.id?.toString() ||
      produtInfo?.product?.categories?.[2]?.id?.toString() ||
      "na"),
    (itemArray["item_category4_id"] =
      details?.categories?.[3]?.id?.toString() ||
      produtInfo?.product?.categories?.[3]?.id?.toString() ||
      "na"),
    (itemArray["item_category5"] = details?.sku || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["item_category5_id"] = details?.sku || "na"),
    (itemArray["status"] = details?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] = details?.variants?.[0]?.product?.size || "na"),
    (itemArray["item_deeplink_url"] =
      `${global?.window?.location.origin}${deeplinkurl}` || "na"),
    (itemArray["item_image_link"] = getImageUrl(details, variantDetails)
      ? [getImageUrl(details, variantDetails)]
      : details?.variants?.[0]?.product?.image?.url || "na");
  itemArray["item_sample"] = "na";
  return itemArray;
};

//view_item_list array for PLP and Wishlist
export const viewItemArray = (
  productss: any,
  deeplink?: any,
  pid?: any,
  categoryListCheck?: any
) => {
  const newArr =
    productss?.length > 0 &&
    productss?.map((products: any, index: any) => {
      const product = pid == "wishlist" ? products?.product : products;
      const cateData =
        categoryListCheck?.category?.children?.[0]?.children?.[0];
      const itemArray = {} as any;
      (itemArray["item_id"] = product?.variants?.[0]?.product?.sku),
        (itemArray["item_name"] = product?.name),
        (itemArray["item_type"] = product?.__typename),
        (itemArray["coupon"] = "na"),
        (itemArray["discount"] =
          product?.pmr_price_value?.discount?.amount_off || 0),
        (itemArray["index"] = index + 1),
        (itemArray["item_brand"] = product?.brand_info || "na"),
        (itemArray["item_category"] = cateData?.name || "na"),
        (itemArray["item_variant"] =
          product?.configurable_options
            ?.filter((att: any) => att?.attribute_code === "color")?.[0]
            ?.values?.filter?.((dataVal: any) => {
              return dataVal?.value_index == product?.color;
            })?.[0]?.label ||
          product?.configurable_options?.[0]?.values?.[0]?.label ||
          "na"),
        (itemArray["price"] =
          product?.price_range?.minimum_price?.regular_price?.value || 0),
        (itemArray["original_price"] =
          product?.pmr_price_value?.amount?.value || 0),
        (itemArray["quantity"] = 1),
        (itemArray["item_rating"] = product?.rating_summary),
        (itemArray["item_category2"] = cateData?.children?.[0]?.name || "na"),
        (itemArray["item_category3"] = cateData?.children?.[1]?.name || "na"),
        (itemArray["item_category4"] = cateData?.children?.[2]?.name || "na"),
        (itemArray["item_category_id"] = cateData?.id?.toString() || "na"),
        (itemArray["item_category2_id"] =
          cateData?.children?.[0]?.id?.toString() || "na"),
        (itemArray["item_category3_id"] =
          cateData?.children?.[1]?.id?.toString() || "na"),
        (itemArray["item_category4_id"] =
          cateData?.children?.[2]?.id?.toString() || "na"),
        (itemArray["item_category5"] = product?.sku || "na"),
        (itemArray["affiliation"] = "na"),
        (itemArray["item_ean_code"] = "na"),
        (itemArray["item_category5_id"] = product?.sku || "na"),
        (itemArray["status"] = product?.stock_status == "IN_STOCK" || "na"),
        (itemArray["item_size"] =
          product?.variants?.[0]?.product?.size || "na"),
        (itemArray["item_deeplink_url"] =
          `${global?.window?.location.origin}${
            product?.type_id === "simple"
              ? pdpRedirecion(product?.sku, product?.type_id, product?.name)
              : pdpRedirecion(
                  product?.sku,
                  product?.type_id,
                  product?.name,
                  product?.configured_variant?.color,
                  product?.configured_variant?.size
                )
          }` || "na"),
        (itemArray["item_image_link"] =
          product?.image?.url ||
          product?.variants?.map((product: any) => {
            if (product?.product?.image?.url !== "") {
              return product?.product?.image?.url;
            }
          })?.[0]
            ? [
                product?.image?.url ||
                  product?.variants?.map((product: any) => {
                    if (product?.product?.image?.url !== "") {
                      return product?.product?.image?.url;
                    }
                  })?.[0],
              ]
            : "na");
      itemArray["item_sample"] = "na";
      return itemArray;
    });
  return newArr;
};
//view_search_results item array
export const viewSearchResultsItemArray = (
  productss: any,
  deeplink?: any,
  categoryListCheck?: any
) => {
  const newArr =
    productss?.length > 0
      ? productss?.map((products: any, index: any) => {
          const imag =
            products?.type_id === "simple"
              ? products?.image?.url
              : products?.configured_variant?.image?.url;
          const cateData =
            categoryListCheck?.category?.children?.[0]?.children?.[0];
          const itemArray = {} as any;
          (itemArray["item_id"] =
            products?.type_id == "configurable"
              ? products?.variants?.[0]?.product?.sku
              : products?.sku),
            (itemArray["item_name"] = products?.name),
            (itemArray["coupon"] = "na"),
            (itemArray["discount"] =
              products?.pmr_price_value?.discount?.amount_off || 0),
            (itemArray["index"] = index + 1),
            (itemArray["item_brand"] = products?.brand_info || "na"),
            (itemArray["item_category"] = cateData?.name || "na"),
            (itemArray["item_variant"] =
              products?.configurable_options
                ?.filter((att: any) => att?.attribute_code === "color")?.[0]
                ?.values?.filter?.((dataVal: any) => {
                  return dataVal?.value_index == products?.color;
                })?.[0]?.label ||
              products?.configurable_options?.[0]?.values?.[0]?.label ||
              "na"),
            (itemArray["price"] =
              products?.price_range?.minimum_price?.regular_price?.value || 0),
            (itemArray["original_price"] =
              products?.pmr_price_value?.amount?.value || 0),
            (itemArray["quantity"] = 1),
            (itemArray["item_rating"] = products?.rating_summary),
            (itemArray["item_category2"] =
              cateData?.children?.[1]?.name || "na"),
            (itemArray["item_category3"] =
              cateData?.children?.[2]?.name || "na"),
            (itemArray["item_category4"] =
              cateData?.children?.[3]?.name || "na"),
            (itemArray["item_category5"] = products?.sku || "na"),
            (itemArray["item_category5_id"] = products?.sku || "na"),
            (itemArray["item_category_id"] = cateData?.id?.toString() || "na"),
            (itemArray["item_category2_id"] =
              cateData?.children?.[0]?.id?.toString() || "na"),
            (itemArray["item_category3_id"] =
              cateData?.children?.[1]?.id?.toString() || "na"),
            (itemArray["item_category4_id"] =
              cateData?.children?.[2]?.id?.toString() || "na"),
            (itemArray["affiliation"] = "na"),
            (itemArray["item_ean_code"] = "na"),
            (itemArray["item_size"] =
              products?.variants?.[0]?.product?.size || "na"),
            (itemArray["item_deeplink_url"] =
              `${global?.window?.location.origin}${
                products?.type_id === "simple"
                  ? pdpRedirecion(
                      products?.sku,
                      products?.type_id,
                      products?.name
                    )
                  : pdpRedirecion(
                      products?.sku,
                      products?.type_id,
                      products?.name,
                      products?.configured_variant?.color,
                      products?.configured_variant?.size
                    )
              }` || "na"),
            (itemArray["item_image_link"] =
              products?.image?.url ||
              products?.variants?.map((product: any) => {
                if (product?.product?.image?.url !== "") {
                  return product?.product?.image?.url;
                }
              })?.[0]
                ? [
                    products?.image?.url ||
                      products?.variants?.map((product: any) => {
                        if (product?.product?.image?.url !== "") {
                          return product?.product?.image?.url;
                        }
                      })?.[0],
                  ]
                : "na");
          return itemArray;
        })
      : [];
  return newArr;
};
//select_item Event in PLP
export const callSelectItem = (
  eventName: string,
  details: any,
  pageid?: any,
  linktext?: string,
  linkurl?: any,
  brand?: string,
  id?: any,
  key?: any,
  variantDetails?: any
) => {
  const itemCartArray = selectItems(details, linkurl, variantDetails, key);
  triggerGAEvent(
    {
      item_list_name: details?.__typename,
      item_list_id: details?.type_id,
      widget_type: widget_type,
      content_type: "product",
      widget_title: pageid?.includes("wishlist") ? "MY WISHLIST" : "na",
      widget_description: "na",
      widget_position: key + 1,
      link_text: linktext,
      no_of_items: 1,
      link_url: `${global?.window?.location.origin}${linkurl}` || "na",
      index: key + 1,
      item_name: details?.name,
      item_id: variantDetails?.product?.sku
        ? variantDetails?.product?.sku
        : "na",
      component_id: id || "na",
      item_brand: brand || "na",
      item_type: details?.__typename || "na",
      event_type: select_event_type,
      item_category: details?.categories?.[0]?.name || "na",
      item_category2: details?.categories?.[1]?.name || "na",
      item_category3: details?.categories?.[2]?.name || "na",
      item_category4: details?.categories?.[3]?.name || "na",
      item_image_link: [getImageUrl(details, variantDetails)],
      item_original_price:
        getDetails(details, variantDetails)?.pmr_price_value?.amount?.value ||
        0,
      item_price:
        getDetails(details, variantDetails)?.price_range?.minimum_price
          ?.regular_price?.value || 0,
      status: details?.stock_status == "IN_STOCK" || "na",
      item_category_id: details?.categories?.[0]?.id?.toString() || "na",
      item_category2_id: details?.categories?.[1]?.id?.toString() || "na",
      item_category3_id: details?.categories?.[2]?.id?.toString() || "na",
      item_category4_id: details?.categories?.[3]?.id?.toString() || "na",
      item_category5: details?.sku || "na",
      item_category5_id: details?.sku || "na",
      item_variant:
        details?.configurable_options
          ?.filter((att: any) => att?.attribute_code === "color")?.[0]
          ?.values?.filter?.((dataVal: any) => {
            return (
              dataVal?.value_index == getDetails(details, variantDetails)?.color
            );
          })?.[0]?.label ||
        details?.configurable_options?.[0]?.values?.[0]?.label ||
        "na",
      item_rating: details?.rating_summary,
      item_ean_code: "na",
      item_size: getDetails(details, variantDetails)?.size || "na",
      item_deeplink_url: `${global?.window?.location.origin}${linkurl}` || "na",
      user_pin_code: localStorage?.getItem("pincode"),
      click_items: [itemCartArray],
    },
    eventName
  );
};
//select_item event through search
export const callslpSelectItem = (
  eventName: string,
  details: any,
  pageid?: any,
  linktext?: string,
  linkurl?: any,
  brand?: string,
  id?: any,
  key?: number,
  variantDetails?: any
) => {
  const itemCartArray = searchselectItems(
    details,
    linkurl,
    variantDetails,
    key
  );
  triggerGAEvent(
    {
      item_list_name: details?.__typename,
      item_list_id: details?.type_id,
      item_type: details?.__typename || "na",
      widget_type: widget_type,
      content_type: "product",
      widget_title: pageid?.includes("wishlist") ? "MY WISHLIST" : "na",
      widget_description: "na",
      widget_position: key || 0,
      link_text: linktext,
      no_of_items: 1,
      link_url: `${global?.window?.location.origin}${linkurl}` || "na",
      index: key,
      item_name: details?.name,
      item_id: variantDetails?.product?.sku
        ? variantDetails?.product?.sku
        : "na",
      component_id: id,
      item_brand: brand || "na",
      event_type: select_event_type,
      item_category: details?.categories?.[0]?.name || "na",
      item_category2: details?.categories?.[1]?.name || "na",
      item_category3: details?.categories?.[2]?.name || "na",
      item_category4: details?.categories?.[3]?.name || "na",
      item_image_link: getImageUrl(details, variantDetails)
        ? [getImageUrl(details, variantDetails)]
        : "na",
      item_original_price:
        getDetails(details, variantDetails)?.pmr_price_value?.amount?.value ||
        0,
      item_price:
        getDetails(details, variantDetails)?.price_range?.minimum_price
          ?.regular_price?.value || 0,
      discount:
        details?.price_range?.minimum_price?.regular_price?.value -
          details?.pmr_price_value?.amount?.value || 0,
      status: details?.stock_status == "IN_STOCK" || "na",
      item_category_id: details?.categories?.[0]?.id?.toString() || "na",
      item_category2_id: details?.categories?.[1]?.id?.toString() || "na",
      item_category3_id: details?.categories?.[2]?.id?.toString() || "na",
      item_category4_id: details?.categories?.[3]?.id?.toString() || "na",
      item_category5: details?.sku || "na",
      item_category5_id: details?.sku || "na",
      item_variant:
        details?.configurable_options
          ?.filter((att: any) => att?.attribute_code === "color")?.[0]
          ?.values?.filter?.((dataVal: any) => {
            return (
              dataVal?.value_index == getDetails(details, variantDetails)?.color
            );
          })?.[0]?.label ||
        details?.configurable_options?.[0]?.values?.[0]?.label ||
        "na",
      item_rating: details?.rating_summary,
      item_ean_code: "na",
      item_size: getDetails(details, variantDetails)?.size || "na",
      item_deeplink_url: `${global?.window?.location.origin}${linkurl}` || "na",
      search_term:
        window?.location?.search &&
        window?.location?.search
          ?.replace("?", "")
          ?.split("&")
          ?.filter((item: any) => item?.includes("search"))?.[0]
          ?.split("=")?.[1],
      user_pin_code: localStorage?.getItem("pincode"),
      click_items: [itemCartArray],
    },
    eventName
  );
};

// search select item event
export const searchselectItems = (
  details: any,
  linkurl?: any,
  variantDetails?: any,
  key?: any
) => {
  const itemArray = {} as any;
  (itemArray["item_id"] =
    details?.type_id === "configurable"
      ? details?.variants?.[0]?.product?.sku
      : "na"),
    (itemArray["item_name"] = details?.name),
    (itemArray["item_type"] = details?.__typename),
    (itemArray["coupon"] = "na"),
    (itemArray["discount"] =
      getDetails(details, variantDetails)?.pmr_price_value?.discount
        ?.amount_off || 0),
    (itemArray["index"] = key || 0),
    (itemArray["item_brand"] = details?.brand_info || "na"),
    (itemArray["item_category"] = details?.categories?.[0]?.name || "na"),
    (itemArray["item_category_id"] =
      details?.categories?.[0]?.id?.toString() || "na"),
    (itemArray["item_variant"] =
      details?.configurable_options
        ?.filter((att: any) => att?.attribute_code === "color")?.[0]
        ?.values?.filter?.((dataVal: any) => {
          return (
            dataVal?.value_index == getDetails(details, variantDetails)?.color
          );
        })?.[0]?.label ||
      details?.configurable_options?.[0]?.values?.[0]?.label ||
      "na"),
    (itemArray["price"] =
      getDetails(details, variantDetails)?.price_range?.minimum_price
        ?.regular_price?.value || 0),
    (itemArray["original_price"] =
      getDetails(details, variantDetails)?.pmr_price_value?.amount?.value || 0),
    (itemArray["quantity"] = 1),
    (itemArray["item_rating"] = details?.rating_summary),
    (itemArray["item_category2"] = details?.categories?.[1]?.name || "na"),
    (itemArray["item_category3"] = details?.categories?.[2]?.name || "na"),
    (itemArray["item_category4"] = details?.categories?.[3]?.name || "na"),
    (itemArray["item_category2_id"] =
      details?.categories?.[1]?.id?.toString() || "na"),
    (itemArray["item_category3_id"] =
      details?.categories?.[2]?.id?.toString() || "na"),
    (itemArray["item_category4_id"] =
      details?.categories?.[3]?.id?.toString() || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["item_category5"] = details?.sku || "na"),
    (itemArray["item_category5_id"] = details?.sku || "na"),
    (itemArray["status"] = details?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] =
      getDetails(details, variantDetails)?.size || "na"),
    (itemArray["item_deeplink_url"] =
      `${global?.window?.location.origin}${linkurl}` || "na"),
    (itemArray["item_image_link"] = getImageUrl(details, variantDetails)
      ? [getImageUrl(details, variantDetails)]
      : "na");
  itemArray["item_sample"] = "na";
  return itemArray;
};

export const selectItems = (
  details: any,
  linkurl?: any,
  variantDetails?: any,
  key?: any,
  productInfo?: any
) => {
  const itemArray = {} as any;
  (itemArray["item_id"] = details?.variants?.[0]?.product?.sku || "na"),
    (itemArray["item_name"] = details?.name),
    (itemArray["item_type"] = details?.__typename),
    (itemArray["coupon"] = "na"),
    (itemArray["discount"] =
      getDetails(details, variantDetails)?.pmr_price_value?.discount
        ?.amount_off || 0),
    (itemArray["index"] = key + 1 || 0),
    (itemArray["item_brand"] =
      productInfo?.product?.brand_info || details?.brand_info || "na"),
    (itemArray["item_category"] = details?.categories?.[0]?.name || "na"),
    (itemArray["item_category_id"] =
      details?.categories?.[0]?.id?.toString() || "na"),
    (itemArray["item_variant"] =
      details?.configurable_options
        ?.filter((att: any) => att?.attribute_code === "color")?.[0]
        ?.values?.filter?.((dataVal: any) => {
          return (
            dataVal?.value_index == getDetails(details, variantDetails)?.color
          );
        })?.[0]?.label ||
      details?.configurable_options?.[0]?.values?.[0]?.label ||
      "na"),
    (itemArray["price"] =
      getDetails(details, variantDetails)?.price_range?.minimum_price
        ?.regular_price?.value || 0),
    (itemArray["original_price"] =
      getDetails(details, variantDetails)?.pmr_price_value?.amount?.value || 0),
    (itemArray["quantity"] = 1),
    (itemArray["item_rating"] = details?.rating_summary),
    (itemArray["item_category2"] = details?.categories?.[1]?.name || "na"),
    (itemArray["item_category3"] = details?.categories?.[2]?.name || "na"),
    (itemArray["item_category4"] = details?.categories?.[3]?.name || "na"),
    (itemArray["item_category2_id"] =
      details?.categories?.[1]?.id?.toString() || "na"),
    (itemArray["item_category3_id"] =
      details?.categories?.[2]?.id?.toString() || "na"),
    (itemArray["item_category4_id"] =
      details?.categories?.[3]?.id?.toString() || "na"),
    (itemArray["item_category5"] = details?.sku || "na"),
    (itemArray["item_category5_id"] = details?.sku || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["status"] = details?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] =
      getDetails(details, variantDetails)?.size || "na"),
    (itemArray["item_deeplink_url"] =
      `${global?.window?.location.origin}${linkurl}` || "na"),
    (itemArray["item_image_link"] = getImageUrl(details, variantDetails)
      ? [getImageUrl(details, variantDetails)]
      : "na");
  itemArray["item_sample"] = "na";
  return itemArray;
};

//add_to_wishlist and remove_from_wishlist event in PLP
export const callWishlistEvent = (
  eventName?: string,
  details?: any,
  pageid?: any,
  linktext?: string,
  id?: any,
  deeplinkurl?: any,
  gakey?: number,
  variantDetails?: any,
  response?: any
) => {
  const discount =
    details?.price_range?.minimum_price?.regular_price?.value -
    details?.pmr_price_value?.amount?.value;
  const brandDataIndex =
    response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items?.length -
      1 ||
    response?.data?.removeProductsFromWishlist?.wishlist?.items_v2?.items
      ?.length - 1;
  const produtInfo =
    response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items?.[
      brandDataIndex
    ] ||
    response?.data?.removeProductsFromWishlist?.wishlist?.items_v2?.items?.[
      brandDataIndex
    ];
  const catData = latestLevelBreadCrumbs(produtInfo?.product?.categories, 4);
  const itemCartArray = wishlistItems(
    details,
    deeplinkurl,
    variantDetails,
    gakey,
    produtInfo,
    catData
  );
  triggerGAEvent(
    {
      widget_type: widget_type,
      content_type: "product",
      widget_title: "na",
      widget_description: "na",
      widget_position: gakey || 0,
      link_text: linktext,
      link_url: `${global?.window?.location.origin}${deeplinkurl}` || "na",
      no_of_items: 1,
      index: gakey || 0,
      item_name: details?.name,
      item_id:
        details?.type_id === "configurable"
          ? variantDetails?.product?.sku
          : "na",
      item_brand: produtInfo?.product?.brand_info
        ? produtInfo?.product?.brand_info
        : details?.brand_info || "na",
      item_type: details?.__typename,
      component_id: id || "na",
      item_category: catData?.breadcrumbs?.[0]?.category_name || "na",
      item_category2: catData?.breadcrumbs?.[1]?.category_name || "na",
      item_category3: catData?.breadcrumbs?.[2]?.category_name
        ? catData?.breadcrumbs?.[2]?.category_name
        : catData?.name || "na",
      item_category4: catData?.breadcrumbs?.[3]?.category_name
        ? catData?.breadcrumbs?.[3]?.category_name
        : catData?.name || "na",
      item_image_link: getImageUrl(details, variantDetails)
        ? [getImageUrl(details, variantDetails)]
        : details?.variants?.[0]?.product?.image?.url || "na",
      item_original_price: details?.pmr_price_value?.amount?.value || 0,
      item_price:
        details?.price_range?.minimum_price?.regular_price?.value || 0,
      status: details?.stock_status == "IN_STOCK" || "na",
      item_category_id:
        details?.categories?.[0]?.id?.toString() ||
        produtInfo?.product?.categories?.[0]?.id?.toString() ||
        "na",
      item_category2_id:
        details?.categories?.[1]?.id?.toString() ||
        produtInfo?.product?.categories?.[1]?.id?.toString() ||
        "na",
      item_category3_id:
        details?.categories?.[2]?.id?.toString() ||
        produtInfo?.product?.categories?.[2]?.id?.toString() ||
        "na",
      item_category4_id:
        details?.categories?.[3]?.id?.toString() ||
        produtInfo?.product?.categories?.[3]?.id?.toString() ||
        "na",
      item_category5: details?.sku || "na",
      item_category5_id: details?.sku || "na",
      discount: Math.ceil(discount) || 0,
      item_variant:
        details?.configurable_options
          ?.filter((att: any) => att?.attribute_code === "color")?.[0]
          ?.values?.filter?.((dataVal: any) => {
            return (
              dataVal?.value_index == getDetails(details, variantDetails)?.color
            );
          })?.[0]?.label ||
        details?.configurable_options?.[0]?.values?.[0]?.label ||
        "na",
      item_rating: details?.rating_summary || "na",
      item_ean_code: "na",
      item_size: getDetails(details, variantDetails)?.size || "na",
      item_deeplink_url:
        `${global?.window?.location.origin}${deeplinkurl}` || "na",
      user_pin_code: localStorage?.getItem("pincode"),
      wishlist_items: [itemCartArray],
    },
    eventName || "na"
  );
};
// PLP remove wishlist event
export const RemoveWishlistEvent = (
  eventName?: string,
  details?: any,
  pageid?: any,
  linktext?: string,
  id?: any,
  deeplinkurl?: any,
  gakey?: number,
  variantDetails?: any,
  response?: any,
  item?: any
) => {
  const discount =
    details?.price_range?.minimum_price?.regular_price?.value -
    details?.pmr_price_value?.amount?.value;
  const brandDataIndex =
    response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items?.length -
      1 ||
    response?.data?.removeProductsFromWishlist?.wishlist?.items_v2?.items
      ?.length - 1;
  const produtInfo =
    response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items?.[
      brandDataIndex
    ] ||
    response?.data?.removeProductsFromWishlist?.wishlist?.items_v2?.items?.[
      brandDataIndex
    ];
  const catData = latestLevelBreadCrumbs(item?.product?.categories, 4);
  const itemCartArray = RemovewishlistItems(
    details,
    deeplinkurl,
    variantDetails,
    gakey,
    produtInfo,
    catData
  );
  triggerGAEvent(
    {
      widget_type: widget_type,
      content_type: "product",
      widget_title: "na",
      widget_description: "na",
      widget_position: gakey || 0,
      link_text: linktext,
      link_url: `${global?.window?.location.origin}${deeplinkurl}` || "na",
      no_of_items: 1,
      index: gakey || 0,
      item_name: details?.name,
      item_id:
        details?.type_id === "configurable"
          ? variantDetails?.product?.sku
          : "na",
      item_brand: produtInfo?.product?.brand_info
        ? produtInfo?.product?.brand_info
        : details?.brand_info || "na",
      item_type: details?.__typename,
      component_id: id || "na",
      item_category: catData?.breadcrumbs?.[0]?.category_name || "na",
      item_category2: catData?.breadcrumbs?.[1]?.category_name || "na",
      item_category3: catData?.breadcrumbs?.[2]?.category_name
        ? catData?.breadcrumbs?.[2]?.category_name
        : catData?.name || "na",
      item_category4: catData?.breadcrumbs?.[3]?.category_name
        ? catData?.breadcrumbs?.[3]?.category_name
        : catData?.name || "na",
      item_image_link: getImageUrl(details, variantDetails)
        ? [getImageUrl(details, variantDetails)]
        : details?.variants?.[0]?.product?.image?.url || "na",
      item_original_price: details?.pmr_price_value?.amount?.value || 0,
      item_price:
        details?.price_range?.minimum_price?.regular_price?.value || 0,
      status: details?.stock_status == "IN_STOCK" || "na",
      item_category_id:
        catData?.breadcrumbs?.[0]?.category_id?.toString() || "na",
      item_category2_id:
        catData?.breadcrumbs?.[1]?.category_id?.toString() || "na",
      item_category3_id: catData?.breadcrumbs?.[2]?.category_id?.toString()
        ? catData?.breadcrumbs?.[2]?.category_id?.toString()
        : catData?.id?.toString() || "na",
      item_category4_id: catData?.breadcrumbs?.[3]?.category_id?.toString()
        ? catData?.breadcrumbs?.[3]?.category_id?.toString()
        : catData?.id?.toString() || "na",
      item_category5: details?.sku || "na",
      item_category5_id: details?.sku || "na",
      discount: Math.ceil(discount) || 0,
      item_variant:
        details?.configurable_options
          ?.filter((att: any) => att?.attribute_code === "color")?.[0]
          ?.values?.filter?.((dataVal: any) => {
            return (
              dataVal?.value_index == getDetails(details, variantDetails)?.color
            );
          })?.[0]?.label ||
        details?.configurable_options?.[0]?.values?.[0]?.label ||
        "na",
      item_rating: details?.rating_summary || "na",
      item_ean_code: "na",
      item_size: getDetails(details, variantDetails)?.size || "na",
      item_deeplink_url:
        `${global?.window?.location.origin}${deeplinkurl}` || "na",
      user_pin_code: localStorage?.getItem("pincode"),
      wishlist_items: [itemCartArray],
    },
    eventName || "na"
  );
};

export const pdpRemoveWishlistEvent = (
  eventName?: any,
  response?: any,
  item?: any
) => {
  const catData = latestLevelBreadCrumbs(item?.product?.categories, 4);
  const brandDataIndex =
    response?.data?.removeProductsFromWishlist?.wishlist?.items_v2?.items
      ?.length - 1;
  const discount =
    item?.product?.price_range?.minimum_price?.regular_price?.value -
    item?.product?.pmr_price_value?.amount?.value;
  const linkurl =
    `${global?.window?.location.origin}${
      item?.product?.type_id === "simple"
        ? pdpRedirecion(
            item?.product?.sku,
            item?.product?.type_id,
            item?.product?.name
          )
        : pdpRedirecion(
            item?.product?.sku,
            item?.product?.type_id,
            item?.product?.name,
            item?.product?.configured_variant?.color,
            item?.product?.configured_variant?.size
          )
    }` || "na";
  const itemCartArray = pdpRemovewishlistItem(
    brandDataIndex,
    catData,
    linkurl,
    item
  );
  triggerGAEvent(
    {
      widget_type: widget_type,
      content_type: "product",
      widget_title: "na",
      widget_description: "na",
      widget_position: Number(brandDataIndex) || 0,
      link_text: eventName,
      link_url: linkurl || "na",
      no_of_items: 1,
      index: brandDataIndex || 0,
      item_name: item?.product?.name,
      item_id: item?.product?.variants?.[0]?.product?.sku || "na",
      item_brand: item?.product?.brand_info || "na",
      item_type: item?.__typename || "na",
      component_id: "na",
      item_category: catData?.breadcrumbs?.[0]?.category_name || "na",
      item_category2: catData?.breadcrumbs?.[1]?.category_name || "na",
      item_category3: catData?.breadcrumbs?.[2]?.category_name
        ? catData?.breadcrumbs?.[2]?.category_name
        : catData?.name || "na",
      item_category4: catData?.breadcrumbs?.[3]?.category_name
        ? catData?.breadcrumbs?.[3]?.category_name
        : catData?.name || "na",
      item_image_link: item?.product?.variants?.[0]?.product?.image?.url
        ? [item?.product?.variants?.[0]?.product?.image?.url]
        : "na",
      item_original_price: item?.product?.pmr_price_value?.amount?.value || 0,
      item_price:
        item?.product?.price_range?.minimum_price?.regular_price?.value || 0,
      status: item?.product?.stock_status == "IN_STOCK" || "na",
      item_category_id:
        catData?.breadcrumbs?.[0]?.category_id?.toString() || "na",
      item_category2_id:
        catData?.breadcrumbs?.[1]?.category_id?.toString() || "na",
      item_category3_id: catData?.breadcrumbs?.[2]?.category_id?.toString()
        ? catData?.breadcrumbs?.[2]?.categoy_id?.toString()
        : catData?.id?.toString() || "na",
      item_category4_id: catData?.breadcrumbs?.[3]?.id?.toString()
        ? catData?.breadcrumbs?.[3]?.id?.toString()
        : catData?.id?.toString() || "na",
      item_category5: item?.product?.sku || "na",
      item_category5_id: item?.product?.sku || "na",
      discount: Math.ceil(discount) || 0,
      item_variant: item?.product?.variants?.[0]?.product?.color || "na",
      item_rating: item?.product?.rating_summary || "na",
      item_ean_code: "na",
      item_size: item?.product?.variants?.[0]?.product?.size || "na",
      item_deeplink_url: linkurl,
      user_pin_code: localStorage?.getItem("pincode"),
      wishlist_items: [itemCartArray],
    },
    eventName
  );
};
export const pdpRemovewishlistItem = (
  brandDataIndex: any,
  catData: any,
  linkurl: any,
  item: any
) => {
  const discount =
    item?.product?.price_range?.minimum_price?.regular_price?.value -
    item?.product?.pmr_price_value?.amount?.value;
  const itemArray = {} as any;
  (itemArray["item_id"] = item?.product?.variants?.[0]?.product?.sku || "na"),
    (itemArray["item_name"] = item?.product?.name),
    (itemArray["coupon"] = "na"),
    (itemArray["discount"] = Math.ceil(discount) || 0),
    (itemArray["index"] = brandDataIndex || 0),
    (itemArray["item_brand"] = item?.product?.brand_info || "na"),
    (itemArray["item_category"] =
      catData?.breadcrumbs?.[0]?.category_name || "na"),
    (itemArray["item_variant"] =
      item?.product?.variants?.[0]?.product?.color || "na"),
    (itemArray["price"] =
      item?.product?.price_range?.minimum_price?.regular_price?.value || 0),
    (itemArray["original_price"] =
      item?.product?.pmr_price_value?.amount?.value || 0),
    (itemArray["quantity"] = 1),
    (itemArray["item_rating"] = item?.product?.rating_summary),
    (itemArray["item_category2"] =
      catData?.breadcrumbs?.[1]?.category_name || "na"),
    (itemArray["item_category3"] = catData?.breadcrumbs?.[2]?.category_name
      ? catData?.breadcrumbs?.[2]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
      ? catData?.breadcrumbs?.[3]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category_id"] =
      catData?.breadcrumbs?.[0]?.category_id?.toString() || "na"),
    (itemArray["item_category2_id"] =
      catData?.breadcrumbs?.[1]?.category_id?.toString() || "na"),
    (itemArray["item_category3_id"] =
      catData?.breadcrumbs?.[2]?.category_id?.toString()
        ? catData?.breadcrumbs?.[2]?.category_id?.toString()
        : catData?.id?.toString() || "na"),
    (itemArray["item_category4_id"] =
      catData?.breadcrumbs?.[3]?.category_id?.toString()
        ? catData?.breadcrumbs?.[3]?.category_id?.toString()
        : catData?.id?.toString() || "na"),
    (itemArray["item_category5"] = item?.product?.sku || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["item_category5_id"] = item?.product?.sku || "na"),
    (itemArray["status"] = item?.product?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] =
      item?.product?.variants?.[0]?.product?.size || "na"),
    (itemArray["item_deeplink_url"] = linkurl || "na"),
    (itemArray["item_image_link"] = item?.product?.variants?.[0]?.product?.image
      ?.url
      ? [item?.product?.variants?.[0]?.product?.image?.url]
      : "na");
  itemArray["item_sample"] = "na";
  return itemArray;
};

export const pdpWishlistEvent = (
  eventName?: any,
  response?: any,
  variants?: any,
  item?: any
) => {
  const brandDataIndex =
    response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items?.length -
      1 ||
    response?.data?.removeProductsFromWishlist?.wishlist?.items_v2?.items
      ?.length - 1;
  const produtInfo =
    response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items?.[
      brandDataIndex
    ] ||
    response?.data?.removeProductsFromWishlist?.wishlist?.items_v2?.items?.[
      brandDataIndex
    ];
  const discount =
    produtInfo?.product?.price_range?.minimum_price?.regular_price?.value -
    produtInfo?.product?.pmr_price_value?.amount?.value;
  const productName = transformItemName(produtInfo?.product?.name);
  const catData = latestLevelBreadCrumbs(produtInfo?.product?.categories, 4);
  const linkurl =
    `${global?.window?.location.origin}${
      produtInfo?.product?.type_id === "simple"
        ? pdpRedirecion(
            produtInfo?.product?.sku,
            produtInfo?.product?.type_id,
            produtInfo?.product?.name
          )
        : pdpRedirecion(
            produtInfo?.product?.sku,
            produtInfo?.product?.type_id,
            produtInfo?.product?.name,
            produtInfo?.product?.configured_variant?.color,
            produtInfo?.product?.configured_variant?.size
          )
    }` || "na";
  const itemCartArray = pdpwishlistItems(
    brandDataIndex,
    produtInfo,
    catData,
    linkurl
  );
  triggerGAEvent(
    {
      widget_type: widget_type,
      content_type: "product",
      widget_title: "na",
      widget_description: "na",
      widget_position: brandDataIndex || 0,
      link_text: eventName,
      link_url: linkurl || "na",
      no_of_items: 1,
      index: brandDataIndex || 0,
      item_name: produtInfo?.product?.name,
      item_id: produtInfo?.product?.variants?.[0]?.product?.sku || "na",
      item_brand: produtInfo?.product?.brand_info || "na",
      item_type: produtInfo?.product?.__typename,
      component_id: "na",
      item_category: catData?.breadcrumbs?.[0]?.category_name || "na",
      item_category2: catData?.breadcrumbs?.[1]?.category_name || "na",
      item_category3: catData?.breadcrumbs?.[2]?.category_name
        ? catData?.breadcrumbs?.[2]?.category_name
        : catData?.name || "na",
      item_category4: catData?.breadcrumbs?.[3]?.category_name
        ? catData?.breadcrumbs?.[3]?.category_name
        : catData?.name || "na",
      item_image_link: produtInfo?.product?.variants?.[0]?.product?.image?.url
        ? [produtInfo?.product?.variants?.[0]?.product?.image?.url]
        : "na",
      item_original_price:
        produtInfo?.product?.pmr_price_value?.amount?.value || 0,
      item_price:
        produtInfo?.product?.price_range?.minimum_price?.regular_price?.value ||
        0,
      status: produtInfo?.product?.stock_status == "IN_STOCK" || "na",
      item_category_id:
        produtInfo?.product?.categories?.[0]?.id?.toString() || "na",
      item_category2_id:
        produtInfo?.product?.categories?.[1]?.id?.toString() || "na",
      item_category3_id:
        produtInfo?.product?.categories?.[2]?.id?.toString() || "na",
      item_category4_id:
        produtInfo?.product?.categories?.[3]?.id?.toString() || "na",
      item_category5: produtInfo?.product?.sku || "na",
      item_category5_id: produtInfo?.product?.sku || "na",
      discount: Math.ceil(discount) || 0,
      item_variant:
        produtInfo?.product?.configurable_options?.[0]?.values?.[0]?.label ||
        "na",
      item_rating: produtInfo?.product?.rating_summary || "na",
      item_ean_code: "na",
      item_size: produtInfo?.product?.variants?.[0]?.product?.size || "na",
      item_deeplink_url: linkurl,
      user_pin_code: localStorage?.getItem("pincode"),
      wishlist_items: [itemCartArray],
    },
    eventName
  );
};
export const pdpwishlistItems = (
  brandDataIndex: any,
  produtInfo: any,
  catData: any,
  linkurl: any
) => {
  const discount =
    produtInfo?.product?.price_range?.minimum_price?.regular_price?.value -
    produtInfo?.product?.pmr_price_value?.amount?.value;
  const itemArray = {} as any;
  (itemArray["item_id"] =
    produtInfo?.product?.variants?.[0]?.product?.sku || "na"),
    (itemArray["item_name"] = produtInfo?.product?.name),
    (itemArray["coupon"] = "na"),
    (itemArray["discount"] = Math.ceil(discount) || 0),
    (itemArray["index"] = brandDataIndex || 0),
    (itemArray["item_brand"] = produtInfo?.product?.brand_info || "na"),
    (itemArray["item_category"] =
      catData?.breadcrumbs?.[0]?.category_name || "na"),
    (itemArray["item_variant"] =
      produtInfo?.product?.configurable_options?.[0]?.values?.[0]?.label ||
      "na"),
    (itemArray["price"] =
      produtInfo?.product?.price_range?.minimum_price?.regular_price?.value ||
      0),
    (itemArray["original_price"] =
      produtInfo?.product?.pmr_price_value?.amount?.value || 0),
    (itemArray["quantity"] = 1),
    (itemArray["item_rating"] = produtInfo?.product?.rating_summary),
    (itemArray["item_category2"] =
      catData?.breadcrumbs?.[1]?.category_name || "na"),
    (itemArray["item_category3"] = catData?.breadcrumbs?.[2]?.category_name
      ? catData?.breadcrumbs?.[2]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
      ? catData?.breadcrumbs?.[3]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category_id"] =
      produtInfo?.product?.categories?.[0]?.id?.toString() || "na"),
    (itemArray["item_category2_id"] =
      produtInfo?.product?.categories?.[1]?.id?.toString() || "na"),
    (itemArray["item_category3_id"] =
      produtInfo?.product?.categories?.[2]?.id?.toString() || "na"),
    (itemArray["item_category4_id"] =
      produtInfo?.product?.categories?.[3]?.id?.toString() || "na"),
    (itemArray["item_category5"] = produtInfo?.product?.sku || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["item_category5_id"] = produtInfo?.product?.sku || "na"),
    (itemArray["status"] =
      produtInfo?.product?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] =
      produtInfo?.product?.variants?.[0]?.product?.size || "na"),
    (itemArray["item_deeplink_url"] = linkurl || "na"),
    (itemArray["item_image_link"] = produtInfo?.product?.variants?.[0]?.product
      ?.image?.url
      ? [produtInfo?.product?.variants?.[0]?.product?.image?.url]
      : "na");
  itemArray["item_sample"] = "na";
  return itemArray;
};

//add_to_wishlist event in SLP
export const callslpWishlistEvent = (
  eventName: string,
  details: any,
  pageid?: any,
  linktext?: string,
  id?: any,
  deeplinkurl?: any,
  gakey?: number,
  variantDetails?: any,
  response?: any
) => {
  const discount =
    details?.price_range?.minimum_price?.regular_price?.value -
    details?.pmr_price_value?.amount?.value;
  const produtInfo =
    response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items?.[0] ||
    response?.data?.removeProductsFromWishlist?.wishlist?.items_v2?.items?.[0];
  const catData = latestLevelBreadCrumbs(produtInfo?.product?.categories, 4);
  const itemCartArray = slpwishlistItems(
    details,
    deeplinkurl,
    variantDetails,
    gakey,
    produtInfo,
    catData
  );
  triggerGAEvent(
    {
      widget_type: widget_type,
      content_type: "product",
      widget_title: "na",
      widget_description: "na",
      widget_position: gakey || 0,
      link_text: linktext,
      link_url: `${global?.window?.location.origin}${deeplinkurl}` || "na",
      no_of_items: 1,
      index: gakey || 0,
      item_name: details?.name,
      item_id: variantDetails?.product?.sku || "na",
      item_brand:
        produtInfo?.product?.brand_info || details?.brand_info || "na",
      item_type: details?.__typename || "na",
      component_id: id,
      item_category: catData?.breadcrumbs?.[0]?.category_name || "na",
      item_category2: catData?.breadcrumbs?.[1]?.category_name || "na",
      item_category3: catData?.breadcrumbs?.[2]?.category_name
        ? catData?.breadcrumbs?.[2]?.category_name
        : catData?.name || "na",
      item_category4: catData?.breadcrumbs?.[3]?.category_name
        ? catData?.breadcrumbs?.[3]?.category_name
        : catData?.name || "na",
      item_image_link: getImageUrl(details, variantDetails)
        ? [getImageUrl(details, variantDetails)]
        : details?.variants?.[0]?.product?.image?.url || "na",
      item_original_price: details?.pmr_price_value?.amount?.value || 0,
      item_price:
        details?.price_range?.minimum_price?.regular_price?.value || 0,
      status: details?.stock_status == "IN_STOCK" || "na",
      item_category_id:
        details?.categories?.[0]?.id?.toString() ||
        produtInfo?.product?.categories?.[0]?.id ||
        "na",
      item_category2_id:
        details?.categories?.[1]?.id?.toString() ||
        produtInfo?.product?.categories?.[1]?.id ||
        "na",
      item_category3_id:
        details?.categories?.[2]?.id?.toString() ||
        produtInfo?.product?.categories?.[2]?.id ||
        "na",
      item_category4_id:
        details?.categories?.[3]?.id?.toString() ||
        produtInfo?.product?.categories?.[3]?.id ||
        "na",
      item_category5: details?.sku || "na",
      item_category5_id: details?.sku || "na",
      discount: Math.ceil(discount) || 0,
      item_variant:
        details?.configurable_options
          ?.filter((att: any) => att?.attribute_code === "color")?.[0]
          ?.values?.filter?.((dataVal: any) => {
            return (
              dataVal?.value_index == getDetails(details, variantDetails)?.color
            );
          })?.[0]?.label ||
        details?.configurable_options?.[0]?.values?.[0]?.label ||
        "na",
      item_rating: details?.rating_summary,
      item_ean_code: "na",
      item_size: getDetails(details, variantDetails)?.size || "na",
      item_deeplink_url:
        `${global?.window?.location.origin}${deeplinkurl}` || "na",
      search_term:
        window?.location?.search &&
        window?.location?.search
          ?.replace("?", "")
          ?.split("&")
          ?.filter((item: any) => item?.includes("search"))?.[0]
          ?.split("=")?.[1],
      wishlist_items: [itemCartArray],
    },
    eventName
  );
};
export const RemovewishlistItems = (
  details: any,
  deeplinkurl?: any,
  variantDetails?: any,
  gakey?: number,
  produtInfo?: any,
  catData?: any
) => {
  const discount =
    details?.price_range?.minimum_price?.regular_price?.value -
    details?.pmr_price_value?.amount?.value;
  const itemArray = {} as any;
  (itemArray["item_id"] = variantDetails?.product?.sku || "na"),
    (itemArray["item_name"] = details?.name),
    (itemArray["coupon"] = "na"),
    (itemArray["discount"] = Math.ceil(discount) || 0),
    (itemArray["index"] = gakey || 0),
    (itemArray["item_brand"] = produtInfo?.product?.brand_info
      ? produtInfo?.product?.brand_info
      : details?.brand_info || "na"),
    (itemArray["item_category"] =
      catData?.breadcrumbs?.[0]?.category_name || "na"),
    (itemArray["item_variant"] =
      details?.configurable_options
        ?.filter((att: any) => att?.attribute_code === "color")?.[0]
        ?.values?.filter?.((dataVal: any) => {
          return (
            dataVal?.value_index == getDetails(details, variantDetails)?.color
          );
        })?.[0]?.label ||
      details?.configurable_options?.[0]?.values?.[0]?.label ||
      "na"),
    (itemArray["price"] =
      details?.price_range?.minimum_price?.regular_price?.value || 0),
    (itemArray["original_price"] =
      details?.pmr_price_value?.amount?.value || 0),
    (itemArray["quantity"] = 1),
    (itemArray["item_rating"] = details?.rating_summary),
    (itemArray["item_category2"] =
      catData?.breadcrumbs?.[1]?.category_name || "na"),
    (itemArray["item_category3"] = catData?.breadcrumbs?.[2]?.category_name
      ? catData?.breadcrumbs?.[2]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
      ? catData?.breadcrumbs?.[3]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category_id"] =
      details?.categories?.[0]?.id?.toString() ||
      produtInfo?.product?.categories?.[0]?.id?.toString() ||
      catData?.breadcrumbs?.[0]?.category_id?.toString() ||
      "na"),
    (itemArray["item_category2_id"] =
      details?.categories?.[1]?.id?.toString() ||
      produtInfo?.product?.categories?.[1]?.id?.toString() ||
      catData?.breadcrumbs?.[1]?.category_id?.toString() ||
      "na"),
    (itemArray["item_category3_id"] =
      catData?.breadcrumbs?.[2]?.category_id?.toString()
        ? catData?.breadcrumbs?.[2]?.category_id?.toString()
        : catData?.id?.toString() || "na"),
    (itemArray["item_category4_id"] =
      catData?.breadcrumbs?.[3]?.category_id?.toString()
        ? catData?.breadcrumbs?.[3]?.category_id?.toString()
        : catData?.id?.toString() || "na"),
    (itemArray["item_category5"] = details?.sku || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["item_category5_id"] = details?.sku || "na"),
    (itemArray["status"] = details?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] =
      getDetails(details, variantDetails)?.size || "na"),
    (itemArray["item_deeplink_url"] =
      `${global?.window?.location.origin}${deeplinkurl}` || "na"),
    (itemArray["item_image_link"] = getImageUrl(details, variantDetails)
      ? [getImageUrl(details, variantDetails)]
      : details?.variants?.[0]?.product?.image?.url || "na");
  itemArray["item_sample"] = "na";
  return itemArray;
};

export const wishlistItems = (
  details: any,
  deeplinkurl?: any,
  variantDetails?: any,
  gakey?: number,
  produtInfo?: any,
  catData?: any
) => {
  const discount =
    details?.price_range?.minimum_price?.regular_price?.value -
    details?.pmr_price_value?.amount?.value;
  const itemArray = {} as any;
  (itemArray["item_id"] = variantDetails?.product?.sku || "na"),
    (itemArray["item_name"] = details?.name),
    (itemArray["coupon"] = "na"),
    (itemArray["discount"] = Math.ceil(discount) || 0),
    (itemArray["index"] = gakey || 0),
    (itemArray["item_brand"] = produtInfo?.product?.brand_info
      ? produtInfo?.product?.brand_info
      : details?.brand_info || "na"),
    (itemArray["item_category"] =
      catData?.breadcrumbs?.[0]?.category_name || "na"),
    (itemArray["item_variant"] =
      details?.configurable_options
        ?.filter((att: any) => att?.attribute_code === "color")?.[0]
        ?.values?.filter?.((dataVal: any) => {
          return (
            dataVal?.value_index == getDetails(details, variantDetails)?.color
          );
        })?.[0]?.label ||
      details?.configurable_options?.[0]?.values?.[0]?.label ||
      "na"),
    (itemArray["price"] =
      details?.price_range?.minimum_price?.regular_price?.value || 0),
    (itemArray["original_price"] =
      details?.pmr_price_value?.amount?.value || 0),
    (itemArray["quantity"] = 1),
    (itemArray["item_rating"] = details?.rating_summary),
    (itemArray["item_category2"] =
      catData?.breadcrumbs?.[1]?.category_name || "na"),
    (itemArray["item_category3"] = catData?.breadcrumbs?.[2]?.category_name
      ? catData?.breadcrumbs?.[2]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
      ? catData?.breadcrumbs?.[3]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category_id"] =
      details?.categories?.[0]?.id?.toString() ||
      produtInfo?.product?.categories?.[0]?.id?.toString() ||
      "na"),
    (itemArray["item_category2_id"] =
      details?.categories?.[1]?.id?.toString() ||
      produtInfo?.product?.categories?.[1]?.id?.toString() ||
      "na"),
    (itemArray["item_category3_id"] =
      details?.categories?.[2]?.id?.toString() ||
      produtInfo?.product?.categories?.[2]?.id?.toString() ||
      "na"),
    (itemArray["item_category4_id"] =
      details?.categories?.[3]?.id?.toString() ||
      produtInfo?.product?.categories?.[3]?.id?.toString() ||
      "na"),
    (itemArray["item_category5"] = details?.sku || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["item_category5_id"] = details?.sku || "na"),
    (itemArray["status"] = details?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] =
      getDetails(details, variantDetails)?.size || "na"),
    (itemArray["item_deeplink_url"] =
      `${global?.window?.location.origin}${deeplinkurl}` || "na"),
    (itemArray["item_image_link"] = getImageUrl(details, variantDetails)
      ? [getImageUrl(details, variantDetails)]
      : details?.variants?.[0]?.product?.image?.url || "na");
  itemArray["item_sample"] = "na";
  return itemArray;
};

// slp wishlist item array
export const slpwishlistItems = (
  details: any,
  deeplinkurl?: any,
  variantDetails?: any,
  gakey?: number,
  produtInfo?: any,
  catData?: any
) => {
  const discount =
    details?.price_range?.minimum_price?.regular_price?.value -
    details?.pmr_price_value?.amount?.value;
  const itemArray = {} as any;
  (itemArray["item_id"] = variantDetails?.product?.sku || "na"),
    (itemArray["item_name"] = details?.name),
    (itemArray["coupon"] = "na"),
    (itemArray["discount"] = Math.ceil(discount) || 0),
    (itemArray["index"] = gakey || 0),
    (itemArray["item_brand"] = produtInfo?.product?.brand_info || "na"),
    (itemArray["item_category"] =
      catData?.breadcrumbs?.[0]?.category_name || "na"),
    (itemArray["item_variant"] =
      details?.configurable_options
        ?.filter((att: any) => att?.attribute_code === "color")?.[0]
        ?.values?.filter?.((dataVal: any) => {
          return (
            dataVal?.value_index == getDetails(details, variantDetails)?.color
          );
        })?.[0]?.label ||
      details?.configurable_options?.[0]?.values?.[0]?.label ||
      "na"),
    (itemArray["price"] =
      details?.price_range?.minimum_price?.regular_price?.value || 0),
    (itemArray["original_price"] =
      details?.pmr_price_value?.amount?.value || 0),
    (itemArray["quantity"] = 1),
    (itemArray["item_rating"] = details?.rating_summary),
    (itemArray["item_category2"] =
      catData?.breadcrumbs?.[1]?.category_name || "na"),
    (itemArray["item_category3"] = catData?.breadcrumbs?.[2]?.category_name
      ? catData?.breadcrumbs?.[2]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
      ? catData?.breadcrumbs?.[3]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category_id"] =
      details?.categories?.[0]?.id?.toString() ||
      produtInfo?.product?.categories?.[0]?.id?.toString() ||
      "na"),
    (itemArray["item_category2_id"] =
      details?.categories?.[1]?.id?.toString() ||
      produtInfo?.product?.categories?.[1]?.id?.toString() ||
      "na"),
    (itemArray["item_category3_id"] =
      details?.categories?.[2]?.id?.toString() ||
      produtInfo?.product?.categories?.[2]?.id?.toString() ||
      "na"),
    (itemArray["item_category4_id"] =
      details?.categories?.[3]?.id?.toString() ||
      produtInfo?.product?.categories?.[3]?.id?.toString() ||
      "na"),
    (itemArray["item_category5"] = details?.sku || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["item_category5_id"] = details?.sku || "na"),
    (itemArray["status"] = details?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] =
      getDetails(details, variantDetails)?.size || "na"),
    (itemArray["item_deeplink_url"] =
      `${global?.window?.location.origin}${deeplinkurl}` || "na"),
    (itemArray["item_image_link"] = getImageUrl(details, variantDetails)
      ? [getImageUrl(details, variantDetails)]
      : details?.variants?.[0]?.product?.image?.url || "na");
  itemArray["item_sample"] = "na";
  return itemArray;
};

// select_item event for notify me in PLP and buynow cta add to cart event
export const callNotifymeEvent = (
  details: any,
  linktext: string,
  linkurl: any,
  eventName?: any,
  id?: any,
  deeplinkurl?: any,
  gakey?: number,
  variantDetails?: any,
  response?: any
) => {
  const pdata =
    response?.data?.addConfigurableProductsToCart?.cart
      ?.item_level_promotions ||
    response?.data?.addSimpleProductsToCart?.cart?.item_level_promotions;
  const itemCartArray = notifymeselectItems(
    details,
    deeplinkurl,
    variantDetails,
    gakey,
    pdata
  );
  const eventKey =
    eventName === "add_to_cart"
      ? "cart_items"
      : eventName === "select_item"
      ? "select_item"
      : "click_items";
  triggerGAEvent(
    {
      item_name: details?.name,
      item_id: variantDetails?.product?.sku || "na",
      component_id: id,
      widget_type: widget_type,
      item_type: details?.__typename || "na",
      widget_title: "na",
      widget_description: "na",
      widget_position: gakey,
      link_url: `${global?.window?.location.origin}${linkurl}` || "na",
      link_text: linktext,
      no_of_items: 1,
      index: gakey,
      item_brand: details?.brand_info,
      item_category: details?.categories?.[0]?.name || "na",
      item_category2: details?.categories?.[1]?.name || "na",
      item_category3: details?.categories?.[2]?.name || "na",
      item_category4: details?.categories?.[3]?.name || "na",
      item_image_link: getImageUrl(details, variantDetails)
        ? [getImageUrl(details, variantDetails)]
        : "na",
      item_original_price:
        getDetails(details, variantDetails)?.pmr_price_value?.amount?.value ||
        0,
      item_price:
        getDetails(details, variantDetails)?.price_range?.minimum_price
          ?.regular_price?.value || 0,
      status: details?.stock_status == "IN_STOCK" || "na",
      item_category_id: details?.categories?.[0]?.id?.toString() || "na",
      item_category2_id: details?.categories?.[1]?.id?.toString() || "na",
      item_category3_id: details?.categories?.[2]?.id?.toString() || "na",
      item_category4_id: details?.categories?.[3]?.id?.toString() || "na",
      item_category5: details?.sku || "na",
      item_category5_id: details?.sku || "na",
      discount: pdata?.[0]?.discount || 0,
      item_variant:
        details?.configurable_options
          ?.filter((att: any) => att?.attribute_code === "color")?.[0]
          ?.values?.filter?.((dataVal: any) => {
            return (
              dataVal?.value_index == getDetails(details, variantDetails)?.color
            );
          })?.[0]?.label ||
        details?.configurable_options?.[0]?.values?.[0]?.label ||
        "na",
      item_rating: details?.rating_summary,
      item_ean_code: "na",
      item_size: getDetails(details, variantDetails)?.size || "na",
      item_deeplink_url:
        `${global?.window?.location.origin}${deeplinkurl}` || "na",
      [eventKey]: [itemCartArray],
    },
    eventName
  );
};

//notify me array
export const notifymeselectItems = (
  details: any,
  deeplinkurl?: any,
  variantDetails?: any,
  gakey?: number,
  pdata?: any
) => {
  const itemArray = {} as any;
  (itemArray["item_id"] = variantDetails?.product?.sku || "na"),
    (itemArray["item_name"] = details?.name),
    (itemArray["item_type"] = details?.__typename),
    (itemArray["coupon"] = "na"),
    (itemArray["discount"] = pdata?.[0]?.discount || 0),
    (itemArray["index"] = gakey),
    (itemArray["item_brand"] = details?.brand_info),
    (itemArray["item_category"] = details?.categories?.[0]?.name),
    (itemArray["item_variant"] =
      details?.configurable_options
        ?.filter((att: any) => att?.attribute_code === "color")?.[0]
        ?.values?.filter?.((dataVal: any) => {
          return (
            dataVal?.value_index == getDetails(details, variantDetails)?.color
          );
        })?.[0]?.label ||
      details?.configurable_options?.[0]?.values?.[0]?.label ||
      "na"),
    (itemArray["original_price"] =
      getDetails(details, variantDetails)?.pmr_price_value?.amount?.value || 0),
    (itemArray["price"] = getDetails(
      details,
      variantDetails
    )?.price_range?.minimum_price?.regular_price?.value),
    (itemArray["quantity"] = 1),
    (itemArray["item_rating"] = details?.rating_summary),
    (itemArray["item_category2"] = details?.categories?.[1]?.name || "na"),
    (itemArray["item_category3"] = details?.categories?.[2]?.name || "na"),
    (itemArray["item_category4"] = details?.categories?.[3]?.name || "na"),
    (itemArray["item_category_id"] = details?.categories?.[0]?.id || "na"),
    (itemArray["item_category2_id"] = details?.categories?.[1]?.id || "na"),
    (itemArray["item_category3_id"] = details?.categories?.[2]?.id || "na"),
    (itemArray["item_category4_id"] = details?.categories?.[3]?.id || "na"),
    (itemArray["item_category5"] = details?.sku || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["item_category5_id"] = details?.sku || "na"),
    (itemArray["status"] = details?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] =
      getDetails(details, variantDetails)?.size || "na"),
    (itemArray["item_deeplink_url"] =
      `${global?.window?.location.origin}${deeplinkurl}` || "na"),
    (itemArray["item_image_link"] = getImageUrl(details, variantDetails)
      ? [getImageUrl(details, variantDetails)]
      : "na");
  itemArray["item_sample"] = "na";
  return itemArray;
};
//giftCard journey event
export const callJourneyEvent = (statuscheck: string) => {
  triggerGAEvent(
    {
      event_type: "widget-gift_card_Creation",
      widget_title: "Receive a Gift Card",
      status: statuscheck,
      item_type: "customized photographs",
      item_name: "In gift card creation amount selected by user",
    },
    "journey"
  );
};
//MSD ProductsCarousel select_item, add_to_cart,add_to_wishlist Events
export const callmsdSelectItem = (
  eventName: string,
  details: any,
  pageid?: any,
  linktext?: string,
  linkurl?: any,
  brand?: string,
  msddata?: any,
  id?: any,
  gakey?: any,
  variantDetails?: any,
  referrerSku?: any,
  referrerPrice?: any,
  title?: any,
  response?: any
) => {
  const eventKey =
    eventName === "add_to_cart"
      ? "cart_items"
      : eventName === "add_to_wishlist"
      ? "wishlist_items"
      : "click_items";
  const brandDataIndex =
    response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items?.length -
      1 ||
    response?.data?.removeProductsFromWishlist?.wishlist?.items_v2?.items
      ?.length - 1;
  const produtInfo =
    response?.data?.addProductsToWishlist?.wishlist?.items_v2?.items?.[
      brandDataIndex
    ] ||
    response?.data?.removeProductsFromWishlist?.wishlist?.items_v2?.items?.[
      brandDataIndex
    ];
  const itemCartArray = selectItems(
    details,
    undefined,
    variantDetails,
    produtInfo
  );
  const data = referrerSku
    ? {
        msd_referrer_product: {
          product_id: referrerSku,
          price: referrerPrice,
        },
        widget_type: widget_type,
        content_type: "product",
        widget_title:
          title || pageid?.includes("wishlist") ? "MY WISHLIST" : "na",
        widget_description: "na",
        widget_position: gakey + 1 || 0,
        item_type: details?.__typename,
        widget_powered_by: "MSD",
        link_text: linktext,
        no_of_items: 1,
        link_url: `${global?.window?.location.origin}${linkurl}` || "na",
        index: gakey + 1,
        item_name: details?.name,
        item_id: variantDetails?.product?.sku || "na",
        component_id: id || "na",
        item_brand: produtInfo?.product?.brand_info || brand || "na",
        event_type: eventName,
        item_category: details?.categories?.[0]?.name || "na",
        item_category2: details?.categories?.[1]?.name || "na",
        item_category3: details?.categories?.[2]?.name || "na",
        item_category4: details?.categories?.[3]?.name || "na",
        item_image_link: getImageUrl(details, variantDetails)
          ? [getImageUrl(details, variantDetails)]
          : "na",
        item_original_price:
          getDetails(details, variantDetails)?.pmr_price_value?.amount?.value ||
          0,
        item_price:
          getDetails(details, variantDetails)?.price_range?.minimum_price
            ?.regular_price?.value || 0,
        status: details?.stock_status == "IN_STOCK" || "na",
        item_category_id: details?.categories?.[0]?.id?.toString() || "na",
        item_category2_id: details?.categories?.[1]?.id?.toString() || "na",
        item_category3_id: details?.categories?.[2]?.id?.toString() || "na",
        item_category4_id: details?.categories?.[3]?.id?.toString() || "na",
        item_category5: details?.sku || "na",
        item_category5_id: details?.sku || "na",
        discount:
          getDetails(details, variantDetails)?.pmr_price_value?.discount
            ?.amount_off || 0,
        item_variant:
          details?.configurable_options
            ?.filter((att: any) => att?.attribute_code === "color")?.[0]
            ?.values?.filter?.((dataVal: any) => {
              return (
                dataVal?.value_index ==
                getDetails(details, variantDetails)?.color
              );
            })?.[0]?.label ||
          details?.configurable_options?.[0]?.values?.[0]?.label ||
          "na",
        item_rating: details?.rating_summary || "na",
        item_ean_code: "na",
        item_size: getDetails(details, variantDetails)?.size || "na",
        item_deeplink_url: linkurl,
        msd_module_id: msddata?.msd_module_id,
        msd_module_name: msddata?.msd_module_name,
        msd_module_bhaviour: msd_behaviour,
        msd_strategy_id: msddata?.msd_strategy_id,
        user_pin_code: localStorage?.getItem("pincode"),
        [eventKey]: [itemCartArray],
      }
    : {
        widget_type: widget_type,
        content_type: "product",
        widget_title: title || "na",
        widget_description: "na",
        widget_position: gakey + 1 || 0,
        item_type: details?.__typename,
        widget_powered_by: "MSD",
        link_text: linktext,
        no_of_items: 1,
        link_url: `${global?.window?.location.origin}${linkurl}` || "na",
        index: gakey + 1,
        item_name: details?.name,
        item_id:
          details?.type_id === "configurable"
            ? variantDetails?.product?.sku
            : "na",
        component_id: id || "na",
        item_brand: brand || "na",
        event_type: eventName,
        item_category: details?.categories?.[0]?.name || "na",
        item_category2: details?.categories?.[1]?.name || "na",
        item_category3: details?.categories?.[2]?.name || "na",
        item_category4: details?.categories?.[3]?.name || "na",
        item_catefory5: details?.sku || "na",
        item_image_link: getImageUrl(details, variantDetails)
          ? [getImageUrl(details, variantDetails)]
          : "na",
        item_original_price:
          getDetails(details, variantDetails)?.pmr_price_value?.amount?.value ||
          0,
        item_price:
          getDetails(details, variantDetails)?.price_range?.minimum_price
            ?.regular_price?.value || 0,
        status: details?.stock_status == "IN_STOCK" || "na",
        item_category_id: details?.categories?.[0]?.id?.toString() || "na",
        item_category2_id: details?.categories?.[1]?.id?.toString() || "na",
        item_category3_id: details?.categories?.[2]?.id?.toString() || "na",
        item_category4_id: details?.categories?.[3]?.id?.toString() || "na",
        discount:
          getDetails(details, variantDetails)?.pmr_price_value?.discount
            ?.amount_off || 0,
        item_variant:
          details?.configurable_options
            ?.filter((att: any) => att?.attribute_code === "color")?.[0]
            ?.values?.filter?.((dataVal: any) => {
              return (
                dataVal?.value_index ==
                getDetails(details, variantDetails)?.color
              );
            })?.[0]?.label ||
          details?.configurable_options?.[0]?.values?.[0]?.label ||
          "na",
        item_rating: details?.rating_summary || "na",
        item_category5: details?.categories?.[4]?.name || "na",
        item_category5_id: details?.sku || "na",
        item_ean_code: "na",
        item_size: getDetails(details, variantDetails)?.size || "na",
        item_deeplink_url: linkurl,
        msd_module_id: msddata?.msd_module_id,
        msd_module_name: msddata?.msd_module_name,
        msd_module_bhaviour: msd_behaviour,
        msd_strategy_id: msddata?.msd_strategy_id,
        user_pin_code: localStorage?.getItem("pincode"),
        [eventKey]: [itemCartArray],
      };
  triggerGAEvent(data, eventName);
};
//msd view_item_list array
export const viewmsdItemArray = (productss: any) => {
  const newArr =
    productss?.length > 0 &&
    productss?.map((products: any, index: any) => {
      const itemArray = {} as any;
      (itemArray["item_id"] = products?.variants?.[0]?.product?.sku),
        (itemArray["item_name"] = products?.name),
        (itemArray["item_type"] = products?.__typename),
        (itemArray["coupon"] = "na"),
        (itemArray["discount"] =
          products?.pmr_price_value?.discount?.amount_off || 0),
        (itemArray["index"] = index + 1),
        (itemArray["item_brand"] = products?.brand_info),
        (itemArray["item_category"] =
          products?.categories?.[0]?.breadcrumbs?.[0]?.category_name || "na"),
        (itemArray["item_variant"] =
          products?.type_id !== "simple"
            ? products?.configurable_options?.filter((obj: any) => {
                return obj?.attribute_code === "color";
              })?.length > 0
              ? products?.configurable_options
                  ?.filter((obj: any) => {
                    return obj?.attribute_code === "color";
                  })?.[0]
                  ?.values?.filter((key: any) => {
                    return (
                      key?.value_index ===
                      products?.variants?.[0]?.product?.color
                    );
                  })?.[0]?.label
              : products?.variants?.[0]?.product?.color
              ? products?.variants?.[0]?.product?.color
              : "na"
            : "na"),
        (itemArray["price"] =
          products?.price_range?.minimum_price?.regular_price?.value || 0),
        (itemArray["original_price"] =
          products?.pmr_price_value?.amount?.value || 0),
        (itemArray["quantity"] = 1),
        (itemArray["item_rating"] = products?.rating_summary || "na"),
        (itemArray["item_category2"] =
          products?.categories?.[1]?.breadcrumbs?.[1]?.category_name || "na"),
        (itemArray["item_category3"] =
          products?.categories?.[2]?.breadcrumbs?.[2]?.category_name || "na"),
        (itemArray["item_category4"] =
          products?.categories?.[3]?.breadcrumbs?.[2]?.category_name || "na"),
        (itemArray["item_category_id"] =
          products?.categories?.[1]?.breadcrumbs?.[0]?.category_id?.toString() ||
          "na"),
        (itemArray["item_category2_id"] =
          products?.categories?.[1]?.breadcrumbs?.[1]?.category_id?.toString() ||
          "na"),
        (itemArray["item_category3_id"] =
          products?.categories?.[1]?.breadcrumbs?.[2]?.category_id?.toString() ||
          "na"),
        (itemArray["item_category4_id"] =
          products?.categories?.[1]?.breadcrumbs?.[3]?.category_id?.toString() ||
          "na"),
        (itemArray["item_category5"] = products?.sku || "na"),
        (itemArray["affiliation"] = "na"),
        (itemArray["item_ean_code"] = "na"),
        (itemArray["item_category5_id"] = products?.sku || "na"),
        (itemArray["status"] = products?.stock_status == "IN_STOCK"),
        (itemArray["item_size"] =
          products?.variants?.[0]?.product?.size || "na"),
        (itemArray["item_deeplink_url"] =
          `${global?.window?.location.origin}${
            products?.type_id === "simple"
              ? pdpRedirecion(products?.sku, products?.type_id, products?.name)
              : pdpRedirecion(
                  products?.sku,
                  products?.type_id,
                  products?.name,
                  products?.configured_variant?.color,
                  products?.configured_variant?.size
                )
          }` || "na"),
        (itemArray["item_image_link"] = [
          products?.image?.url
            ? products?.image?.url
            : products?.variants?.[0]?.image?.url || "na",
        ]);
      itemArray["item_sample"] = "na";
      return itemArray;
    });
  return newArr;
};
//view_cart item array
export const viewCartArray = (data: any) => {
  const newArr = data?.cartItems?.cart?.items?.map(
    (item: any, index: number) => {
      const itemArray = {} as any;
      const getPmrDiscountPrice = () => {
        const sku = item?.configured_variant?.sku
          ? item?.configured_variant?.sku
          : item?.product?.sku;
        return data?.cartItems?.cart?.item_level_promotions?.filter(
          (data: any) => {
            return data?.sku === sku;
          }
        )?.[0];
      };
      const price = getPmrDiscountPrice()?.discount
        ? item?.prices?.row_total?.value - getPmrDiscountPrice()?.discount
        : item?.prices?.row_total?.value -
          item?.prices?.total_item_discount?.value;
      const Retailprice = item?.prices?.row_total?.value;
      const imagelink = data?.cartItems?.cart?.items?.[0]?.configured_variant
        ?.image?.url
        ? data?.cartItems?.cart?.items?.[0]?.configured_variant?.image?.url
        : data?.cartItems?.cart?.items?.[0]?.product?.image?.url;
      (itemArray["item_id"] = item?.configured_variant?.sku || "na"),
        (itemArray["item_name"] = item?.product?.name),
        (itemArray["item_type"] = item?.product?.__typename),
        (itemArray["coupon"] =
          data?.cartItems?.cart?.applied_coupons?.[0]?.code || "na"),
        (itemArray["discount"] =
          Math.ceil(Number(Retailprice) - Number(price)) || 0),
        (itemArray["index"] = index),
        (itemArray["item_brand"] = item?.product?.brand_info || "na"),
        (itemArray["item_category"] =
          item?.product?.categories?.[0]?.name || "na"),
        (itemArray["item_variant"] =
          item?.configurable_options?.[0]?.value_label || "na"),
        (itemArray["price"] = price || 0),
        (itemArray["original_price"] = Retailprice || 0),
        (itemArray["quantity"] = item?.quantity || 0),
        (itemArray["item_rating"] = item?.product?.rating_summary || "na"),
        (itemArray["item_category2"] =
          item?.product?.categories?.[1]?.name || "na"),
        (itemArray["item_category3"] =
          item?.product?.categories?.[2]?.name || "na"),
        (itemArray["item_category4"] =
          item?.product?.categories?.[3]?.name || "na"),
        (itemArray["item_category5_id"] = item?.product?.sku || "na"),
        (itemArray["affiliation"] = "na"),
        (itemArray["item_ean_code"] = "na"),
        (itemArray["item_category_id"] =
          item?.product?.categories?.[0]?.level || "na"),
        (itemArray["item_category_id"] =
          item?.product?.categories?.[1]?.level || "na"),
        (itemArray["item_category2_id"] =
          item?.product?.categories?.[2]?.level || "na"),
        (itemArray["item_category3_id"] =
          item?.product?.categories?.[3]?.level || "na"),
        (itemArray["item_category4_id"] =
          item?.product?.categories?.[4]?.level || "na"),
        (itemArray["item_category5"] = item?.product?.sku || "na"),
        (itemArray["status"] = item?.product?.stock_status == "IN_STOCK"),
        (itemArray["item_size"] =
          item?.product?.size || item?.configured_variant?.size || "na"),
        (itemArray["item_deeplink_url"] =
          `${global?.window?.location.origin}${
            item?.product?.type_id === "simple"
              ? pdpRedirecion(
                  item?.product?.sku,
                  item?.product?.type_id,
                  item?.product?.name
                )
              : pdpRedirecion(
                  item?.product?.sku,
                  item?.product?.type_id,
                  item?.product?.name,
                  item?.configured_variant?.color,
                  item?.configured_variant?.size
                )
          }` || "na"),
        (itemArray["item_image_link"] = imagelink ? [imagelink] : "na");
      itemArray["item_sample"] = item?.mp_free_gifts?.is_free_gift || "na";
      return itemArray;
    }
  );
  return newArr;
};

//MSD cart carousel item array in cart
export const viewitemCartArray = (data: any) => {
  const newArr = data?.map((item: any, index: number) => {
    const itemArray = {} as any;
    (itemArray["item_id"] = item?.product?.variants?.[0]?.product?.sku),
      (itemArray["item_name"] = item?.product?.name),
      (itemArray["item_type"] = item?.product?.__typename || "na"),
      (itemArray["coupon"] = "na"),
      (itemArray["discount"] =
        item?.product?.pmr_price_value?.discount?.amount_off || 0),
      (itemArray["index"] = index),
      (itemArray["item_brand"] = item?.product?.brand_info || "na"),
      (itemArray["item_category"] =
        item?.product?.categories?.[0]?.name || "na"),
      (itemArray["item_variant"] =
        item?.product?.configurable_options?.[0]?.values?.[0]?.label),
      (itemArray["price"] = item?.product?.pmr_price_value?.amount?.value || 0),
      (itemArray["original_price"] =
        item?.product?.price_range?.minimum_price?.regular_price?.value || 0),
      (itemArray["quantity"] = item?.quantity || 0),
      (itemArray["item_rating"] = item?.product?.rating_summary || "na"),
      (itemArray["item_category2"] =
        item?.product?.categories?.[1]?.name || "na"),
      (itemArray["item_category3"] =
        item?.product?.categories?.[2]?.name || "na"),
      (itemArray["item_category4"] =
        item?.product?.categories?.[3]?.name || "na"),
      (itemArray["item_category5_id"] = item?.product?.sku || "na"),
      (itemArray["affiliation"] = "na"),
      (itemArray["item_ean_code"] = "na"),
      (itemArray["item_category_id"] =
        item?.product?.categories?.[0]?.id?.toString() || "na"),
      (itemArray["item_category2_id"] =
        item?.product?.categories?.[1]?.id?.toString() || "na"),
      (itemArray["item_category3_id"] =
        item?.product?.categories?.[2]?.id?.toString() || "na"),
      (itemArray["item_category4_id"] =
        item?.product?.categories?.[3]?.id?.toString() || "na"),
      (itemArray["item_category5"] = item?.product?.sku || "na"),
      (itemArray["status"] = item?.product?.stock_status == "IN_STOCK"),
      (itemArray["item_size"] =
        item?.product?.variants?.[0]?.product?.size || "na"),
      (itemArray["item_deeplink_url"] =
        `${global?.window?.location.origin}${
          item?.product?.type_id === "simple"
            ? pdpRedirecion(
                item?.product?.sku,
                item?.product?.type_id,
                item?.product?.name
              )
            : pdpRedirecion(
                item?.product?.sku,
                item?.product?.type_id,
                item?.product?.name,
                item?.product?.configured_variant?.color,
                item?.product?.configured_variant?.size
              )
        }` || "na"),
      (itemArray["item_image_link"] =
        [
          item?.product?.image?.url ||
            item?.product?.variants?.map((product: any) => {
              if (item?.product?.image?.url !== "") {
                return product?.product?.image?.url;
              }
            })?.[0],
        ][item?.product?.image?.url] || "na");
    itemArray["item_sample"] = "na";
    return itemArray;
  });
  return newArr;
};

// view_item array in PDP
export const callViewItemArray = (
  productData: any,
  colorCode?: any,
  colorName?: any
) => {
  const queryString = global?.window?.location?.search;
  const urlParams = new URLSearchParams(queryString);
  let colorCodeData = colorCode ?? urlParams.get("colorCode");
  let sizeCodeData = urlParams.get("size");
  const getVariantSku = () => {
    return productData?.type_id === "simple"
      ? productData?.sku
      : queryString?.includes("colorCode") && queryString?.includes("size")
      ? productData?.variants?.filter(
          (variant: any) =>
            variant?.product?.color?.toString() == colorCodeData &&
            variant?.product?.size?.toString() == sizeCodeData
        )?.[0]?.product?.sku
      : queryString?.includes("colorCode")
      ? productData?.variants?.filter(
          (variant: any) => variant?.product?.color?.toString() == colorCodeData
        )?.[0]?.product?.sku
      : queryString?.includes("size")
      ? productData?.variants?.filter(
          (variant: any) => variant?.product?.size?.toString() == sizeCodeData
        )?.[0]?.product?.sku
      : productData?.variants?.[0]?.product?.sku;
  };
  const itemArray = {} as any;
  (itemArray["item_id"] = getVariantSku() || "na"),
    (itemArray["item_name"] = productData?.name || "na"),
    (itemArray["item_type"] = productData?.__typename || "na"),
    (itemArray["coupon"] = "na"),
    (itemArray["discount"] =
      Number(productData?.pmr_price_value?.discount?.amount_off) || 0),
    (itemArray["index"] = 1),
    (itemArray["item_brand"] = productData?.brand_info),
    (itemArray["item_category"] = productData?.categories?.[0]?.name || "na"),
    ((itemArray["item_variant"] =
      productData?.variants?.[0]?.product?.variants?.[0]?.size ||
      colorName ||
      (productData?.type_id !== "simple"
        ? productData?.configurable_options?.filter((obj: any) => {
            return obj.attribute_code === "color";
          })?.length > 0
          ? productData?.configurable_options
              ?.filter((obj: any) => {
                return obj.attribute_code === "color";
              })?.[0]
              ?.values?.filter((key: any) => {
                return key.value_index?.toString() === colorCodeData;
              })?.[0]?.label
          : productData?.color
          ? productData?.color
          : "na"
        : "na")),
    (itemArray["price"] =
      Number(productData?.price_range?.minimum_price?.final_price?.value) || 0),
    (itemArray["original_price"] =
      Math.ceil(
        Number(productData?.price_range?.minimum_price?.final_price?.value) -
          Number(productData?.pmr_price_value?.discount?.amount_off)
      ) || 0),
    (itemArray["quantity"] = 1),
    (itemArray["item_rating"] = productData?.rating_summary),
    (itemArray["item_category2"] = productData?.categories?.[1]?.name || "na"),
    (itemArray["item_category3"] = productData?.categories?.[2]?.name || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["item_category_id"] =
      productData?.categories?.[0]?.id?.toString() || "na"),
    (itemArray["item_category2_id"] =
      productData?.categories?.[1]?.id.toString() || "na"),
    (itemArray["item_category3_id"] =
      productData?.categories?.[2]?.id.toString() || "na"),
    (itemArray["item_category4_id"] =
      productData?.categories?.[3]?.id.toString() || "na"),
    (itemArray["item_category5"] = productData?.sku || "na"),
    (itemArray["item_category5_id"] = productData?.sku || "na"),
    (itemArray["status"] = productData?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] =
      productData?.variants?.[0]?.product?.size || "na"),
    (itemArray["item_deeplink_url"] =
      `${global?.window?.location.origin}${
        productData?.type_id === "simple"
          ? pdpRedirecion(
              productData?.sku,
              productData?.type_id,
              productData?.name
            )
          : pdpRedirecion(
              productData?.sku,
              productData?.type_id,
              productData?.name,
              productData?.configured_variant?.color,
              productData?.configured_variant?.size
            )
      }` || "na"),
    (itemArray["item_image_link"] =
      productData?.image?.url ||
      productData?.variants?.map((product: any) => {
        if (product?.product?.image?.url !== "") {
          return product?.product?.image?.url;
        }
      })?.[0]
        ? [
            productData?.image?.url ||
              productData?.variants?.map((product: any) => {
                if (product?.product?.image?.url !== "") {
                  return product?.product?.image?.url;
                }
              })?.[0],
          ]
        : "na")),
    (itemArray["item_sample"] = "na");
  return itemArray;
};

// PDP viewItem Event when clicking on variants
export const pdpVariantViewEvent = (
  productData: any,
  colorCode?: any,
  colorName?: any
) => {
  const queryString = global?.window?.location?.search;
  const urlParams = new URLSearchParams(queryString);
  let colorCodeData = colorCode ?? urlParams.get("colorCode");
  let sizeCodeData = urlParams.get("size");
  const getVariantSku = () => {
    return productData?.type_id === "simple"
      ? productData?.sku
      : queryString?.includes("colorCode") && queryString?.includes("size")
      ? productData?.variants?.filter(
          (variant: any) =>
            variant?.product?.color?.toString() == colorCodeData &&
            variant?.product?.size?.toString() == sizeCodeData
        )?.[0]?.product?.sku
      : queryString?.includes("colorCode")
      ? productData?.variants?.filter(
          (variant: any) => variant?.product?.color?.toString() == colorCodeData
        )?.[0]?.product?.sku
      : queryString?.includes("size")
      ? productData?.variants?.filter(
          (variant: any) => variant?.product?.size?.toString() == sizeCodeData
        )?.[0]?.product?.sku
      : productData?.variants?.[0]?.product?.sku;
  };

  triggerGAEvent(
    {
      item_id: getVariantSku() || "na",
      widget_type: widget_type || "na",
      item_name: productData?.name || "na",
      item_type: productData?.__typename || "na",
      widget_title: "na",
      widget_description: "na",
      widget_postion: 1,
      no_of_items: 1,
      item_brand: productData?.brand_info || "na",
      item_category: productData?.categories?.[0]?.name || "na",
      item_category2: productData?.categories?.[1]?.name || "na",
      item_category3: productData?.categories?.[2]?.name || "na",
      item_category5: productData?.sku || "na",
      item_category5_id: productData?.sku || "na",
      item_image_link: productData?.image?.url
        ? [productData?.image?.url]
        : "na",
      event_type: "view_list_view",
      view_items: [callViewItemArray(productData, colorCode, colorName)],
    },
    "view_item"
  );
};
