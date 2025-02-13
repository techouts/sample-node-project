import {
  event_type,
  select_event_type,
  widget_type,
} from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";
import { pdpRedirecion } from "../../utility/PdpRedirection";
export const widgetTitle = "REMOVE FROM CART";
export const widgetDescription =
  "You can save it to your Wishlist to buy later";

const getPmrDiscountPrice = (sku: string, items: any) => {
  return items?.item_level_promotions?.filter((data: any) => {
    return data?.sku === sku;
  })?.[0];
};
// add_to_wishlist event in cart page on move to wishlist icon 
export const callAddwishlistEvent = (
  cartStore: any,
  eventValues: any,
  eventName: string,
  productIndex?: any
) => {
   const catData = latestLevelBreadCrumbs(eventValues?.product?.categories, 4);
  const deeplinkurl =
    `${global?.window?.location.origin}${
      eventValues?.product?.type_id === "simple"
        ? pdpRedirecion(
            eventValues?.product?.sku,
            eventValues?.product?.type_id,
            eventValues?.product?.name
          )
        : pdpRedirecion(
            eventValues?.product?.sku,
            eventValues?.product?.type_id,
            eventValues?.product?.name,
            eventValues?.configured_variant?.color,
            eventValues?.configured_variant?.size
          )
    }` || "na";
  const imagelink = cartStore?.cartItems?.cart?.items?.[0]?.configured_variant
    ?.image?.url
    ? cartStore?.cartItems?.cart?.items?.[0]?.configured_variant?.image?.url
    : cartStore?.cartItems?.cart?.items?.[0]?.product?.image?.url;
  const cartItemData = wishlistItemArray(
    cartStore,
    eventValues,
    imagelink,
    deeplinkurl,
    catData
  );
  const rprice = parseFloat(
    (
      (getPmrDiscountPrice(
        eventValues?.configured_variant?.sku
          ? eventValues?.configured_variant?.sku
          : eventValues?.product?.sku,
        cartStore?.cartItems?.cart
      )?.discount
        ? eventValues?.prices?.row_total?.value -
          getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
        : eventValues?.prices?.row_total?.value -
          eventValues?.prices?.total_item_discount?.value) /
      eventValues?.quantity
    )?.toFixed(2)
  )
    ? parseFloat(
        (
          (getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
            ? eventValues?.prices?.row_total?.value -
              getPmrDiscountPrice(
                eventValues?.configured_variant?.sku
                  ? eventValues?.configured_variant?.sku
                  : eventValues?.product?.sku,
                cartStore?.cartItems?.cart
              )?.discount
            : eventValues?.prices?.row_total?.value -
              eventValues?.prices?.total_item_discount?.value) /
          eventValues?.quantity
        )?.toFixed(2)
      )
    : eventValues?.prices?.price?.value * eventValues?.quantity;
  triggerGAEvent(
    {
      widget_type: widget_type,
      item_type: eventValues?.__typename,
      content_type: "product",
      widget_title: "na",
      widget_description: "na",
      widget_position: productIndex + 1,
      link_text: "Move To Wishlist",
      event_type: event_type,
      item_name: eventValues?.product?.name,
      component_id: "na",
      item_id: eventValues?.configured_variant?.sku || "na",
      no_of_items: 1,
      index: 1,
      item_brand: eventValues?.product?.brand_info || "na",
      item_category: catData?.breadcrumbs?.[0]?.category_name
        ? catData?.breadcrumbs?.[0]?.category_name
        : catData?.[0]?.name || "na",
      item_category2: catData?.breadcrumbs?.[1]?.category_name
        ? catData?.breadcrumbs?.[1]?.category_name
        : catData?.[1]?.name || "na",
      item_category3: catData?.breadcrumbs?.[2]?.category_name
        ? catData?.breadcrumbs?.[2]?.category_name
        : catData?.name || "na",
      item_category4: catData?.breadcrumbs?.[3]?.category_name
        ? catData?.breadcrumbs?.[3]?.category_name
        : catData?.name || "na",
      item_image_link: [imagelink] || "na",
      item_price:
        eventValues?.prices?.price?.value * eventValues?.quantity || 0,
      item_original_price:
        parseFloat(
          (
            (getPmrDiscountPrice(
              eventValues?.configured_variant?.sku
                ? eventValues?.configured_variant?.sku
                : eventValues?.product?.sku,
              cartStore?.cartItems?.cart
            )?.discount
              ? eventValues?.prices?.row_total?.value -
                getPmrDiscountPrice(
                  eventValues?.configured_variant?.sku
                    ? eventValues?.configured_variant?.sku
                    : eventValues?.product?.sku,
                  cartStore?.cartItems?.cart
                )?.discount
              : eventValues?.prices?.row_total?.value -
                eventValues?.prices?.total_item_discount?.value) /
            eventValues?.quantity
          )?.toFixed(2)
        ) * eventValues?.quantity || 0,
      status: eventValues?.product?.stock_status == "IN_STOCK" || "na",
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
      item_category5: eventValues?.product?.sku || "na",
      item_category5_id: eventValues?.product?.sku || "na",
      discount:
        getPmrDiscountPrice(
          eventValues?.configured_variant?.sku
            ? eventValues?.configured_variant?.sku
            : eventValues?.product?.sku,
          cartStore?.cartItems?.cart
        )?.discount || 0,
      item_variant:
        eventValues?.configurable_options
          ?.filter((att: any) => att?.attribute_code === "color")?.[0]
          ?.value_label?.filter?.((dataVal: any) => {
            return dataVal?.value_index == eventValues?.color;
          })?.[0]?.label ||
        eventValues?.configurable_options?.[0]?.value_label ||
        "na",
      item_rating: eventValues?.product?.rating_summary || "na",
      item_ean_code: "na",
      item_size:
        eventValues?.configured_variant?.size ||
        eventValues?.product?.size ||
        "na",
      item_deeplink_url: deeplinkurl || "na",
      wishlist_items: [cartItemData],
      quantity: eventValues?.quantity,
    },
    eventName
  );
};
export const wishlistItemArray = (
  cartStore: any,
  eventValues: any,
  imagelink?: any,
  deeplinkurl?: any,
  catData?:any
) => {
  const rprice = parseFloat(
    (
      (getPmrDiscountPrice(
        eventValues?.configured_variant?.sku
          ? eventValues?.configured_variant?.sku
          : eventValues?.product?.sku,
        cartStore?.cartItems?.cart
      )?.discount
        ? eventValues?.prices?.row_total?.value -
          getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
        : eventValues?.prices?.row_total?.value -
          eventValues?.prices?.total_item_discount?.value) /
      eventValues?.quantity
    )?.toFixed(2)
  )
    ? parseFloat(
        (
          (getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
            ? eventValues?.prices?.row_total?.value -
              getPmrDiscountPrice(
                eventValues?.configured_variant?.sku
                  ? eventValues?.configured_variant?.sku
                  : eventValues?.product?.sku,
                cartStore?.cartItems?.cart
              )?.discount
            : eventValues?.prices?.row_total?.value -
              eventValues?.prices?.total_item_discount?.value) /
          eventValues?.quantity
        )?.toFixed(2)
      )
    : eventValues?.prices?.price?.value * eventValues?.quantity;
  const itemArray = {} as any;
  (itemArray["item_id"] = eventValues?.configured_variant?.sku || "na"),
    (itemArray["item_name"] = eventValues?.product?.name),
    (itemArray["item_type"] = eventValues?.product?.__typename),
    (itemArray["coupon"] =
      cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "na"),
    (itemArray["discount"] =
      getPmrDiscountPrice(
        eventValues?.configured_variant?.sku
          ? eventValues?.configured_variant?.sku
          : eventValues?.product?.sku,
        cartStore?.cartItems?.cart
      )?.discount || 0),
    (itemArray["index"] = 1),
    (itemArray["item_brand"] = eventValues?.product?.brand_info || "na"),
    (itemArray["item_variant"] =
      eventValues?.configurable_options
        ?.filter((att: any) => att?.attribute_code === "color")?.[0]
        ?.value_label?.filter?.((dataVal: any) => {
          return dataVal?.value_index == eventValues?.color;
        })?.[0]?.label ||
      eventValues?.configurable_options?.[0]?.value_label ||
      "na"),
    (itemArray["original_price"] =
      parseFloat(
        (
          (getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
            ? eventValues?.prices?.row_total?.value -
              getPmrDiscountPrice(
                eventValues?.configured_variant?.sku
                  ? eventValues?.configured_variant?.sku
                  : eventValues?.product?.sku,
                cartStore?.cartItems?.cart
              )?.discount
            : eventValues?.prices?.row_total?.value -
              eventValues?.prices?.total_item_discount?.value) /
          eventValues?.quantity
        )?.toFixed(2)
      ) * eventValues?.quantity || 0),
    (itemArray["price"] =
      eventValues?.prices?.price?.value * eventValues?.quantity || 0),
    (itemArray["quantity"] = eventValues?.quantity),
    (itemArray["item_rating"] = eventValues?.product?.rating_summary),
    (itemArray["item_category"] = catData?.breadcrumbs?.[0]?.category_name
      ? catData?.breadcrumbs?.[0]?.category_name
      : catData?.[0]?.name || "na"),
    (itemArray["item_category2"] = catData?.breadcrumbs?.[1]?.category_name
      ? catData?.breadcrumbs?.[1]?.category_name
      : catData?.[1]?.name || "na"),
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
        ? catData?.breadcrumbs?.[2]?.category_id?.toString()
        : catData?.id?.toString() || "na"),
    (itemArray["item_category5"] = eventValues?.product?.sku || "na"),
    (itemArray["item_category5_id"] = eventValues?.product?.sku || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["status"] =
      eventValues?.product?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] =
      eventValues?.configured_variant?.size ||
      eventValues?.product?.size ||
      "na"),
    (itemArray["item_deeplink_url"] = deeplinkurl || "na"),
    (itemArray["item_image_link"] = [imagelink] || "na");
  itemArray["item_sample"] = "na";
  return itemArray;
};

//select_item event in cart page
export const callSelectItem = (
  cartStore: any,
  eventValues: any,
  eventName: string,
  link_text: any,
  productIndex?: any,
  linkurl?: any,
  pageid?: any
) => {
  const imagelink = cartStore?.cartItems?.cart?.items?.[0]?.configured_variant
    ?.image?.url
    ? cartStore?.cartItems?.cart?.items?.[0]?.configured_variant?.image?.url
    : cartStore?.cartItems?.cart?.items?.[0]?.product?.image?.url;
  const cartItemData = selectItemArray(
    cartStore,
    eventValues,
    imagelink,
    linkurl
  );
  triggerGAEvent(
    {
      widget_type: widget_type,
      content_type: "product",
      widget_title: pageid?.includes("cart") ? "CART" : "na",
      link_url: `${global?.window?.location?.origin}${linkurl}`,
      item_type: eventValues?.product?.__typename,
      widget_description: "na",
      widget_position: productIndex + 1,
      link_text: link_text,
      event_type: select_event_type,
      item_name: eventValues?.product?.name,
      component_id: "na",
      item_id: eventValues?.configured_variant?.sku ||"na",
      no_of_items: 1,
      index: 1,
      item_brand: eventValues?.product?.brand_info || "na",
      item_category: eventValues?.product?.categories?.[0]?.name || "na",
      item_category2: eventValues?.product?.categories?.[1]?.name || "na",
      item_category3: eventValues?.product?.categories?.[2]?.name || "na",
      item_category4: eventValues?.product?.categories?.[3]?.name || "na",
      item_image_link: [imagelink] || "na",
      item_original_price: eventValues?.prices?.price?.value || 0,
      item_price:
        parseFloat(
          (
            (getPmrDiscountPrice(
              eventValues?.configured_variant?.sku
                ? eventValues?.configured_variant?.sku
                : eventValues?.product?.sku,
              cartStore?.cartItems?.cart
            )?.discount
              ? eventValues?.prices?.row_total?.value -
                getPmrDiscountPrice(
                  eventValues?.configured_variant?.sku
                    ? eventValues?.configured_variant?.sku
                    : eventValues?.product?.sku,
                  cartStore?.cartItems?.cart
                )?.discount
              : eventValues?.prices?.row_total?.value -
                eventValues?.prices?.total_item_discount?.value) /
            eventValues?.quantity
          )?.toFixed(2)
        ) || 0,
      status: eventValues?.product?.stock_status,
      item_category_id:
        eventValues?.product?.categories?.[0]?.uid?.toString() || "na",
      item_category2_id:
        eventValues?.product?.categories?.[1]?.uid?.toString() || "na",
      item_category3_id:
        eventValues?.product?.categories?.[2]?.uid?.toString() || "na",
      item_category4_id:
        eventValues?.product?.categories?.[3]?.uid?.toString() || "na",
      item_category5: eventValues?.product?.sku || "na",
      item_category5_id: eventValues?.product?.sku || "na",
      discount:
        getPmrDiscountPrice(
          eventValues?.configured_variant?.sku
            ? eventValues?.configured_variant?.sku
            : eventValues?.product?.sku,
          cartStore?.cartItems?.cart
        )?.discount || 0,
      item_variant:
        eventValues?.configurable_options
          ?.filter((att: any) => att?.attribute_code === "color")?.[0]
          ?.value_label?.filter?.((dataVal: any) => {
            return dataVal?.value_index == eventValues?.color;
          })?.[0]?.label ||
        eventValues?.configurable_options?.[0]?.value_label ||
        "na",
      item_rating: eventValues?.product?.rating_summary,
      item_ean_code: "na",
      item_size:
        eventValues?.configured_variant?.size ||
        eventValues?.product?.size ||
        "na",
      item_deeplink_url: linkurl || "na",
      user_pin_code: localStorage?.getItem("pincode"),
      click_items: [cartItemData],
    },
    eventName
  );
};
export const selectItemArray = (
  cartStore: any,
  eventValues: any,
  imagelink?: any,
  deeplinkurl?: any
) => {
  const itemArray = {} as any;
  (itemArray["item_id"] = eventValues?.configured_variant?.sku ||"na"),
    (itemArray["item_name"] = eventValues?.product?.name),
    (itemArray["item_type"] = eventValues?.product?.__typename || "na"),
    (itemArray["coupon"] =
      cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "na"),
    (itemArray["discount"] =
      getPmrDiscountPrice(
        eventValues?.configured_variant?.sku
          ? eventValues?.configured_variant?.sku
          : eventValues?.product?.sku,
        cartStore?.cartItems?.cart
      )?.discount || 0),
    (itemArray["index"] = 1),
    (itemArray["item_brand"] = eventValues?.product?.brand_info || "na"),
    (itemArray["item_variant"] =
      eventValues?.configurable_options
        ?.filter((att: any) => att?.attribute_code === "color")?.[0]
        ?.value_label?.filter?.((dataVal: any) => {
          return dataVal?.value_index == eventValues?.color;
        })?.[0]?.label ||
      eventValues?.configurable_options?.[0]?.value_label ||
      "na"),
    (itemArray["price"] =
      parseFloat(
        (
          (getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
            ? eventValues?.prices?.row_total?.value -
              getPmrDiscountPrice(
                eventValues?.configured_variant?.sku
                  ? eventValues?.configured_variant?.sku
                  : eventValues?.product?.sku,
                cartStore?.cartItems?.cart
              )?.discount
            : eventValues?.prices?.row_total?.value -
              eventValues?.prices?.total_item_discount?.value) /
          eventValues?.quantity
        )?.toFixed(2)
      ) || 0),
    (itemArray["original_price"] = eventValues?.prices?.price?.value || 0),
    (itemArray["quantity"] = eventValues?.quantity || 0),
    (itemArray["item_rating"] = eventValues?.product?.rating_summary || "na"),
    (itemArray["item_category"] =
      eventValues?.product?.categories?.[0]?.name || "na"),
    (itemArray["item_category2"] =
      eventValues?.product?.categories?.[1]?.name || "na"),
    (itemArray["item_category3"] =
      eventValues?.product?.categories?.[2]?.name || "na"),
    (itemArray["item_category4"] =
      eventValues?.product?.categories?.[3]?.name || "na"),
    (itemArray["item_category4"] =
      eventValues?.product?.categories?.[4]?.name || "na"),
    (itemArray["item_category_id"] =
      eventValues?.product?.categories?.[0]?.uid?.toString() || "na"),
    (itemArray["item_category2_id"] =
      eventValues?.product?.categories?.[1]?.uid?.toString() || "na"),
    (itemArray["item_category3_id"] =
      eventValues?.product?.categories?.[2]?.uid?.toString() || "na"),
    (itemArray["item_category4_id"] =
      eventValues?.product?.categories?.[3]?.uid?.toString() || "na"),
    (itemArray["item_category5"] = eventValues?.product?.sku || "na"),
    (itemArray["item_category5_id"] = eventValues?.product?.sku || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["status"] = eventValues?.product?.stock_status),
    (itemArray["item_size"] =
      eventValues?.configured_variant?.size ||
      eventValues?.product?.size ||
      "na"),
    (itemArray["item_deeplink_url"] = deeplinkurl || "na"),
    (itemArray["item_image_link"] = [imagelink] || "na");
  itemArray["item_sample"] = "na";
  return itemArray;
};

const latestLevelBreadCrumbs = (catList: any[], level: number) => {
  return catList.find((item: any) => {
    if (item?.level === level) {
      return item;
    } else {
      latestLevelBreadCrumbs(catList, level - 1);
    }
  });
};
//remove_from_cart event in cart page, quantity increase and decrease event
export const removeFromCartEvent = (
  cartStore: any,
  eventValues: any,
  linktext: any,
  data:any
) => {
     const catData = latestLevelBreadCrumbs(
       eventValues?.product?.categories,
       4
     );
  const deeplinkurl =
    `${global?.window?.location.origin}${
      eventValues?.product?.type_id === "simple"
        ? pdpRedirecion(
            eventValues?.product?.sku,
            eventValues?.product?.type_id,
            eventValues?.product?.name
          )
        : pdpRedirecion(
            eventValues?.product?.sku,
            eventValues?.product?.type_id,
            eventValues?.product?.name,
            eventValues?.configured_variant?.color,
            eventValues?.configured_variant?.size
          )
    }` || "na";
  const imag = cartStore?.cartItems?.cart?.items?.[0]?.configured_variant?.image
    ?.url
    ? cartStore?.cartItems?.cart?.items?.[0]?.configured_variant?.image?.url
    : cartStore?.cartItems?.cart?.items?.[0]?.product?.image?.url;
  const cartItemData = removeCartItemArray(cartStore, eventValues, catData);
  const rprice = parseFloat(
    (
      (getPmrDiscountPrice(
        eventValues?.configured_variant?.sku
          ? eventValues?.configured_variant?.sku
          : eventValues?.product?.sku,
        cartStore?.cartItems?.cart
      )?.discount
        ? eventValues?.prices?.row_total?.value -
          getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
        : eventValues?.prices?.row_total?.value -
          eventValues?.prices?.total_item_discount?.value) /
      eventValues?.quantity
    )?.toFixed(2)
  )
    ? parseFloat(
        (
          (getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
            ? eventValues?.prices?.row_total?.value -
              getPmrDiscountPrice(
                eventValues?.configured_variant?.sku
                  ? eventValues?.configured_variant?.sku
                  : eventValues?.product?.sku,
                cartStore?.cartItems?.cart
              )?.discount
            : eventValues?.prices?.row_total?.value -
              eventValues?.prices?.total_item_discount?.value) /
          eventValues?.quantity
        )?.toFixed(2)
      )
    : eventValues?.prices?.price?.value * eventValues?.quantity;
  triggerGAEvent(
    {
      widget_type: widget_type,
      content_type: "product",
      widget_title: "CART",
      widget_description: "na",
      widget_position: 1,
      link_text: linktext || "na",
      event_type: event_type,
      item_name: eventValues?.product?.name,
      component_id: "na",
      item_id: eventValues?.configured_variant?.sku || "na",
      no_of_items: 1,
      index: 1,
      item_brand: eventValues?.product?.brand_info || "na",
      item_category: catData?.breadcrumbs?.[0]?.category_name || "na",
      item_category2: catData?.breadcrumbs?.[1]?.category_name || "na",
      item_category3: catData?.breadcrumbs?.[2]?.category_name
        ? catData?.breadcrumbs?.[2]?.category_name
        : catData?.name || "na",
      item_category4: catData?.breadcrumbs?.[3]?.category_name
        ? catData?.breadcrumbs?.[3]?.category_name
        : catData?.name || "na",
      item_image_link: [imag] || "na",
      item_price:
        eventValues?.prices?.price?.value * eventValues?.quantity || 0,
      item_original_price: rprice * eventValues?.quantity || 0,
      status: eventValues?.product?.stock_status == "IN_STOCK" || "na",
      item_category_id:
        eventValues?.product?.categories?.[0]?.uid?.toString() || "na",
      item_category2_id:
        eventValues?.product?.categories?.[1]?.uid.toString() || "na",
      item_category3_id:
        eventValues?.product?.categories?.[2]?.uid.toString() || "na",
      item_category4_id:
        eventValues?.product?.categories?.[3]?.uid.toString() || "na",
      item_category5: eventValues?.product?.sku || "na",
      item_category5_id: eventValues?.product?.sku || "na",
      discount:
        getPmrDiscountPrice(
          eventValues?.configured_variant?.sku
            ? eventValues?.configured_variant?.sku
            : eventValues?.product?.sku,
          cartStore?.cartItems?.cart
        )?.discount || 0,
      item_variant:
        eventValues?.configurable_options
          ?.filter((att: any) => att?.attribute_code === "color")?.[0]
          ?.value_label?.filter?.((dataVal: any) => {
            return dataVal?.value_index == eventValues?.color;
          })?.[0]?.label ||
        eventValues?.configurable_options?.[0]?.value_label ||
        "na",
      item_rating: eventValues?.product?.rating_summary,
      item_ean_code: "na",
      item_size:
        eventValues?.configured_variant?.size ||
        eventValues?.product?.size ||
        "na",
      item_deeplink_url: deeplinkurl,
      user_pin_code: localStorage?.getItem("pincode"),
      quantity: eventValues?.quantity,
      cart_items: [cartItemData],
    },
    data==="adding" ? "add_to_cart" : "remove_from_cart"
  );
};

//remove cart event when removing product 
export const removeCartEvent = (
  cartStore: any,
  eventValues: any,
  linktext: any
) => {
  const catData = latestLevelBreadCrumbs(eventValues?.product?.categories, 4);
  const deeplinkurl =
    `${global?.window?.location.origin}${
      eventValues?.product?.type_id === "simple"
        ? pdpRedirecion(
            eventValues?.product?.sku,
            eventValues?.product?.type_id,
            eventValues?.product?.name
          )
        : pdpRedirecion(
            eventValues?.product?.sku,
            eventValues?.product?.type_id,
            eventValues?.product?.name,
            eventValues?.configured_variant?.color,
            eventValues?.configured_variant?.size
          )
    }` || "na";
  const imag = cartStore?.cartItems?.cart?.items?.[0]?.configured_variant?.image
    ?.url
    ? cartStore?.cartItems?.cart?.items?.[0]?.configured_variant?.image?.url
    : cartStore?.cartItems?.cart?.items?.[0]?.product?.image?.url;
  const cartItemData = removeCartItemArray(cartStore, eventValues, catData);
  const rprice = parseFloat(
    (
      (getPmrDiscountPrice(
        eventValues?.configured_variant?.sku
          ? eventValues?.configured_variant?.sku
          : eventValues?.product?.sku,
        cartStore?.cartItems?.cart
      )?.discount
        ? eventValues?.prices?.row_total?.value -
          getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
        : eventValues?.prices?.row_total?.value -
          eventValues?.prices?.total_item_discount?.value) /
      eventValues?.quantity
    )?.toFixed(2)
  )
    ? parseFloat(
        (
          (getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
            ? eventValues?.prices?.row_total?.value -
              getPmrDiscountPrice(
                eventValues?.configured_variant?.sku
                  ? eventValues?.configured_variant?.sku
                  : eventValues?.product?.sku,
                cartStore?.cartItems?.cart
              )?.discount
            : eventValues?.prices?.row_total?.value -
              eventValues?.prices?.total_item_discount?.value) /
          eventValues?.quantity
        )?.toFixed(2)
      )
    : eventValues?.prices?.price?.value * eventValues?.quantity;
  triggerGAEvent(
    {
      widget_type: widget_type,
      content_type: "product",
      widget_title: "CART",
      widget_description: "na",
      widget_position: 1,
      link_text: linktext || "na",
      event_type: event_type,
      item_name: eventValues?.product?.name,
      component_id: "na",
      item_id: eventValues?.configured_variant?.sku
        ? eventValues?.configured_variant?.sku
        : eventValues?.product?.sku,
      no_of_items: 1,
      index: 1,
      item_brand: eventValues?.product?.brand_info || "na",
      item_category: catData?.breadcrumbs?.[0]?.category_name || "na",
      item_category2: catData?.breadcrumbs?.[1]?.category_name || "na",
      item_category3: catData?.breadcrumbs?.[2]?.category_name
        ? catData?.breadcrumbs?.[2]?.category_name
        : catData?.name || "na",
      item_category4: catData?.breadcrumbs?.[3]?.category_name
        ? catData?.breadcrumbs?.[3]?.category_name
        : catData?.name || "na",
      item_image_link: [imag] || "na",
      item_price:
        eventValues?.prices?.price?.value * eventValues?.quantity || 0,
      item_original_price: rprice * eventValues?.quantity || 0,
      status: eventValues?.product?.stock_status == "IN_STOCK" || "na",
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
      discount:
        getPmrDiscountPrice(
          eventValues?.configured_variant?.sku
            ? eventValues?.configured_variant?.sku
            : eventValues?.product?.sku,
          cartStore?.cartItems?.cart
        )?.discount || 0,
      item_variant:
        eventValues?.configurable_options
          ?.filter((att: any) => att?.attribute_code === "color")?.[0]
          ?.value_label?.filter?.((dataVal: any) => {
            return dataVal?.value_index == eventValues?.color;
          })?.[0]?.label ||
        eventValues?.configurable_options?.[0]?.value_label ||
        "na",
      item_rating: eventValues?.product?.rating_summary,
      item_category5: eventValues?.product?.sku || "na",
      item_category5_id: eventValues?.product?.sku || "na",
      item_ean_code: "na",
      item_size:
        eventValues?.configured_variant?.size ||
        eventValues?.product?.size ||
        "na",
      item_deeplink_url: deeplinkurl,
      user_pin_code: localStorage?.getItem("pincode"),
      quantity: eventValues?.quantity,
      cart_items: [cartItemData],
    },
    "remove_from_cart"
  );
};
//remove cart item array
export const removeCartItemArray = (cartStore: any, eventValues: any,catData?:any) => {
  const rprice = parseFloat(
    (
      (getPmrDiscountPrice(
        eventValues?.configured_variant?.sku
          ? eventValues?.configured_variant?.sku
          : eventValues?.product?.sku,
        cartStore?.cartItems?.cart
      )?.discount
        ? eventValues?.prices?.row_total?.value -
          getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
        : eventValues?.prices?.row_total?.value -
          eventValues?.prices?.total_item_discount?.value) /
      eventValues?.quantity
    )?.toFixed(2)
  )
    ? parseFloat(
        (
          (getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
            ? eventValues?.prices?.row_total?.value -
              getPmrDiscountPrice(
                eventValues?.configured_variant?.sku
                  ? eventValues?.configured_variant?.sku
                  : eventValues?.product?.sku,
                cartStore?.cartItems?.cart
              )?.discount
            : eventValues?.prices?.row_total?.value -
              eventValues?.prices?.total_item_discount?.value) /
          eventValues?.quantity
        )?.toFixed(2)
      )
    : eventValues?.prices?.price?.value *eventValues?.quantity;
     const deeplinkurl =
       `${global?.window?.location.origin}${
         eventValues?.product?.type_id === "simple"
           ? pdpRedirecion(
               eventValues?.product?.sku,
               eventValues?.product?.type_id,
               eventValues?.product?.name
             )
           : pdpRedirecion(
               eventValues?.product?.sku,
               eventValues?.product?.type_id,
               eventValues?.product?.name,
               eventValues?.configured_variant?.color,
               eventValues?.configured_variant?.size
             )
       }` || "na";
     const imag = cartStore?.cartItems?.cart?.items?.[0]?.configured_variant
       ?.image?.url
       ? cartStore?.cartItems?.cart?.items?.[0]?.configured_variant?.image?.url
       : cartStore?.cartItems?.cart?.items?.[0]?.product?.image?.url;
  const itemArray = {} as any;
  (itemArray["item_id"] = eventValues?.configured_variant?.sku || "na"),
    (itemArray["item_name"] = eventValues?.product?.name),
    (itemArray["item_type"] = eventValues?.product?.__typename),
    (itemArray["coupon"] =
      cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "na"),
    (itemArray["discount"] =
      getPmrDiscountPrice(
        eventValues?.configured_variant?.sku
          ? eventValues?.configured_variant?.sku
          : eventValues?.product?.sku,
        cartStore?.cartItems?.cart
      )?.discount || 0),
    (itemArray["index"] = 1),
    (itemArray["item_brand"] = eventValues?.product?.brand_info || "na"),
    (itemArray["item_variant"] =
      eventValues?.configurable_options
        ?.filter((att: any) => att?.attribute_code === "color")?.[0]
        ?.value_label?.filter?.((dataVal: any) => {
          return dataVal?.value_index == eventValues?.color;
        })?.[0]?.label ||
      eventValues?.configurable_options?.[0]?.value_label ||
      "na"),
    (itemArray["original_price"] = rprice * eventValues?.quantity || 0),
    (itemArray["price"] =
      eventValues?.prices?.price?.value * eventValues?.quantity || 0),
    (itemArray["quantity"] = eventValues?.quantity || 0),
    (itemArray["item_rating"] = eventValues?.product?.rating_summary || 0),
    (itemArray["item_category"] =
      catData?.breadcrumbs?.[0]?.category_name || "na"),
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
    (itemArray["item_category5"] = eventValues?.product?.sku || "na"),
    (itemArray["item_category5_id"] = eventValues?.product?.sku || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["status"] =
      eventValues?.product?.stock_status == "IN_STOCK" || "na"),
    (itemArray["item_size"] =
      eventValues?.configured_variant?.size || eventValues?.size || "na"),
    (itemArray["item_deeplink_url"] = deeplinkurl || "na"),
    (itemArray["item_image_link"] = [imag] || "na");
  itemArray["item_sample"] = eventValues?.mp_free_gifts?.is_free_gift || "na";
  return itemArray;
};

//add to wishlist event in cart page
export const addToWishlistEvent = (
  cartStore: any,
  eventValues: any,
  linktext: any
) => {
   const catData = latestLevelBreadCrumbs(eventValues?.product?.categories, 4);
  const deeplinkurl =
    `${global?.window?.location.origin}${
      eventValues?.product?.type_id === "simple"
        ? pdpRedirecion(
            eventValues?.product?.sku,
            eventValues?.product?.type_id,
            eventValues?.product?.name
          )
        : pdpRedirecion(
            eventValues?.product?.sku,
            eventValues?.product?.type_id,
            eventValues?.product?.name,
            eventValues?.configured_variant?.color,
            eventValues?.configured_variant?.size
          )
    }` || "na";
  const imag = cartStore?.cartItems?.cart?.items?.[0]?.configured_variant?.image
    ?.url
    ? cartStore?.cartItems?.cart?.items?.[0]?.configured_variant?.image?.url
    : cartStore?.cartItems?.cart?.items?.[0]?.product?.image?.url;
  const cartItemData = ItemArray(cartStore, eventValues,catData);
  const rprice = parseFloat(
    (
      (getPmrDiscountPrice(
        eventValues?.configured_variant?.sku
          ? eventValues?.configured_variant?.sku
          : eventValues?.product?.sku,
        cartStore?.cartItems?.cart
      )?.discount
        ? eventValues?.prices?.row_total?.value -
          getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
        : eventValues?.prices?.row_total?.value -
          eventValues?.prices?.total_item_discount?.value) /
      eventValues?.quantity
    )?.toFixed(2)
  )
    ? parseFloat(
        (
          (getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
            ? eventValues?.prices?.row_total?.value -
              getPmrDiscountPrice(
                eventValues?.configured_variant?.sku
                  ? eventValues?.configured_variant?.sku
                  : eventValues?.product?.sku,
                cartStore?.cartItems?.cart
              )?.discount
            : eventValues?.prices?.row_total?.value -
              eventValues?.prices?.total_item_discount?.value) /
          eventValues?.quantity
        )?.toFixed(2)
      )
    : eventValues?.prices?.price?.value * eventValues?.quantity;
  triggerGAEvent(
    {
      widget_type: widget_type,
      content_type: "product",
      widget_title: "CART",
      widget_description: "na",
      widget_position: 1,
      link_text: linktext || "na",
      event_type: event_type,
      item_name: eventValues?.product?.name,
      component_id: "na",
      item_id: eventValues?.configured_variant?.sku || "na",
      no_of_items: 1,
      index: 1,
      item_brand: eventValues?.product?.brand_info || "na",
      item_category: catData?.breadcrumbs?.[0]?.category_name || "na",
      item_category2: catData?.breadcrumbs?.[1]?.category_name || "na",
      item_category3: catData?.breadcrumbs?.[2]?.category_name
        ? catData?.breadcrumbs?.[2]?.category_name
        : catData?.name || "na",
      item_category4: catData?.breadcrumbs?.[3]?.category_name
        ? catData?.breadcrumbs?.[3]?.category_name
        : catData?.name || "na",
      item_image_link: [imag] || "na",
      item_price:
        eventValues?.prices?.price?.value * eventValues?.quantity || 0,
      item_original_price: rprice * eventValues?.quantity || 0,
      status: eventValues?.product?.stock_status,
      item_category_id: eventValues?.product?.categories?.[0]?.level || "na",
      item_category2_id: eventValues?.product?.categories?.[1]?.level || "na",
      item_category3_id: eventValues?.product?.categories?.[2]?.level || "na",
      item_category4_id: eventValues?.product?.categories?.[3]?.level || "na",
      item_category5: eventValues?.product?.sku || "na",
      discount:
        eventValues?.prices?.price?.value * eventValues?.quantity -
          rprice * eventValues?.quantity || 0,
      item_variant:
        eventValues?.configurable_options
          ?.filter((att: any) => att?.attribute_code === "color")?.[0]
          ?.value_label?.filter?.((dataVal: any) => {
            return dataVal?.value_index == eventValues?.color;
          })?.[0]?.label ||
        eventValues?.configurable_options?.[0]?.value_label ||
        "na",
      item_rating: eventValues?.product?.rating_summary,
      item_category5_id: eventValues?.product?.sku || "na",
      item_ean_code: "na",
      item_size:
        eventValues?.configured_variant?.size ||
        eventValues?.product?.size ||
        "na",
      item_deeplink_url: deeplinkurl,
      user_pin_code: localStorage?.getItem("pincode"),
      quantity: eventValues?.quantity,
      cart_items: [cartItemData],
    },
    "add_to_wishlist"
  );
};
export const ItemArray = (cartStore: any, eventValues: any,catData:any) => {
  const rprice = parseFloat(
    (
      (getPmrDiscountPrice(
        eventValues?.configured_variant?.sku
          ? eventValues?.configured_variant?.sku
          : eventValues?.product?.sku,
        cartStore?.cartItems?.cart
      )?.discount
        ? eventValues?.prices?.row_total?.value -
          getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
        : eventValues?.prices?.row_total?.value -
          eventValues?.prices?.total_item_discount?.value) /
      eventValues?.quantity
    )?.toFixed(2)
  )
    ? parseFloat(
        (
          (getPmrDiscountPrice(
            eventValues?.configured_variant?.sku
              ? eventValues?.configured_variant?.sku
              : eventValues?.product?.sku,
            cartStore?.cartItems?.cart
          )?.discount
            ? eventValues?.prices?.row_total?.value -
              getPmrDiscountPrice(
                eventValues?.configured_variant?.sku
                  ? eventValues?.configured_variant?.sku
                  : eventValues?.product?.sku,
                cartStore?.cartItems?.cart
              )?.discount
            : eventValues?.prices?.row_total?.value -
              eventValues?.prices?.total_item_discount?.value) /
          eventValues?.quantity
        )?.toFixed(2)
      )
    : eventValues?.prices?.price?.value * eventValues?.quantity;
  const itemArray = {} as any;
  (itemArray["item_id"] = eventValues?.configured_variant?.sku || "na"),
    (itemArray["item_name"] = eventValues?.product?.name),
    (itemArray["item_type"] = eventValues?.product?.__typename),
    (itemArray["coupon"] =
      cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "na"),
    (itemArray["discount"] =
      getPmrDiscountPrice(
        eventValues?.configured_variant?.sku
          ? eventValues?.configured_variant?.sku
          : eventValues?.product?.sku,
        cartStore?.cartItems?.cart
      )?.discount || 0),
    (itemArray["index"] = 1),
    (itemArray["item_brand"] = eventValues?.product?.brand_info || "na"),
    (itemArray["item_variant"] =
      eventValues?.configurable_options
        ?.filter((att: any) => att?.attribute_code === "color")?.[0]
        ?.value_label?.filter?.((dataVal: any) => {
          return dataVal?.value_index == eventValues?.color;
        })?.[0]?.label ||
      eventValues?.configurable_options?.[0]?.value_label ||
      "na"),
    (itemArray["original_price"] = rprice * eventValues?.quantity || 0),
    (itemArray["price"] =
      eventValues?.prices?.price?.value * eventValues?.quantity || 0),
    (itemArray["quantity"] = eventValues?.quantity || 0),
    (itemArray["item_rating"] = eventValues?.product?.rating_summary || 0),
    (itemArray["item_category"] =
      catData?.breadcrumbs?.[0]?.category_name || "na"),
    (itemArray["item_category2"] =
      catData?.breadcrumbs?.[1]?.category_name || "na"),
    (itemArray["item_category3"] = catData?.breadcrumbs?.[2]?.category_name
      ? catData?.breadcrumbs?.[2]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
      ? catData?.breadcrumbs?.[3]?.category_name
      : catData?.name || "na"),
    (itemArray["item_category_id"] =
      eventValues?.product?.categories?.[0]?.level || "na"),
    (itemArray["item_category2_id"] =
      eventValues?.product?.categories?.[1]?.level || "na"),
    (itemArray["item_category3_id"] =
      eventValues?.product?.categories?.[2]?.level || "na"),
    (itemArray["item_category4_id"] =
      eventValues?.product?.categories?.[3]?.level || "na"),
    (itemArray["affiliation"] = "na"),
    (itemArray["item_ean_code"] = "na"),
    (itemArray["status"] = eventValues?.product?.stock_status),
    (itemArray["item_size"] =
      eventValues?.configured_variant?.size || eventValues?.size || "na"),
    (itemArray["item_deeplink_url"] = "na"),
    (itemArray["item_image_link"] = [eventValues?.image?.url] || "na");
  itemArray["item_sample"] = eventValues?.mp_free_gifts?.is_free_gift || "na";
  return itemArray;
};
