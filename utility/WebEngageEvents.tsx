import triggerGAEvent from "./GaEvents";
import { pdpRedirecion } from "./PdpRedirection";
const latestLevelBreadCrumbs = (catList: any[], level: number) => {
  return catList.find((item: any) => {
    if (item?.level === level) {
      return item;
    } else {
      latestLevelBreadCrumbs(catList, level - 1);
    }
  });
};

// PLP  addtocart cart Updated Event
export const plpCartUpdatedEvent = (
  response: any,
) => {
  const updatedcartNo = itemCartUpdate(
    response?.data?.addConfigurableProductsToCart?.cart?.items ||
      response?.data?.addSimpleProductsToCart?.cart?.items,
    response?.data?.addConfigurableProductsToCart?.cart
      ?.item_level_promotions ||
      response?.data?.addSimpleProductsToCart?.cart?.item_level_promotions
  );
  triggerGAEvent(
    {
      no_of_items:
        response?.data?.addConfigurableProductsToCart?.cart?.items?.length ||
        response?.data?.addSimpleProductsToCart?.cart?.items?.length ||
        0,
      index: 1,
      updated_items: updatedcartNo,
      value:
        response?.data?.addConfigurableProductsToCart?.cart?.prices?.grand_total
          ?.value ||
        response?.data?.addSimpleProductsToCart?.cart?.prices?.grand_total
          ?.value ||
        0,
    },
    "cart_updated"
  );
};
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
      cartItem?.prices?.price?.value -
      Number(
        item_level_promotions?.find(
          (i: any) => i?.sku === cartItem?.configured_variant?.sku
        )?.discount
      );
  const catData = latestLevelBreadCrumbs(cartItem?.product?.categories, 4);
  const discount = cartItem?.prices?.price?.value - RetailPrice;
    const deeplink = `${global?.window?.location.origin}${
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
    }`;
    const variant =
      cartItem?.configurable_options?.filter(
        (item: any) => item?.option_label == "Color"
      )?.[0]?.value_label || "na";
    const cartUpdates = {} as any;
    cartUpdates["item_id"] = cartItem?.configured_variant?.sku ||"na";
    cartUpdates["item_name"] =
      cartItem?.configured_variant?.name || cartItem?.product?.name;
    cartUpdates["index"] = 1;
    cartUpdates["quantity"] = cartItem?.quantity;
    cartUpdates["item_image_link"] = [getImageURL(cartItem)] || "na";
    cartUpdates["price"] = cartItem?.prices?.price?.value || 0;
    cartUpdates["original_price"] = RetailPrice
      ? RetailPrice
      : cartItem?.prices?.price?.value || 0;
    cartUpdates["discount"] =Math.ceil( discount) ||0;
    cartUpdates["item_deeplink_url"] = deeplink || "na";
    (cartUpdates["item_category_id"] =
      cartItem?.product?.categories?.[0]?.id?.toString() || "na"),
      (cartUpdates["item_category2_id"] =
        cartItem?.product?.categories?.[1]?.id?.toString() || "na");
    cartUpdates["item_category3_id"] =
      cartItem?.product?.categories?.[2]?.id?.toString() || "na";
    cartUpdates["item_category4_id"] =
      cartItem?.product?.categories?.[3]?.id?.toString() || "na";
    cartUpdates["item_category5"] =
      cartItem?.product?.sku || "na";
    cartUpdates["item_category"] = catData?.breadcrumbs?.[0]?.category_name || "na";
    cartUpdates["item_category2"] =
      catData?.breadcrumbs?.[1]?.category_name || "na";
    cartUpdates["item_category3"] =
      catData?.breadcrumbs?.[2]?.category_name?catData?.breadcrumbs?.[2]?.category_name :catData?.name || "na";
    cartUpdates["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
      ? catData?.breadcrumbs?.[3]?.category_name
      : catData?.name || "na";
    cartUpdates["item_category5_id"] =
      cartItem?.product?.sku || "na";
    cartUpdates["item_brand"] = cartItem?.product?.brand_info || "na";
    cartUpdates["item_variant"] = variant || "na";
    return cartUpdates;
  });
  return newArr;
};

// PDP  addtocart cart Updated Event 
export const PDPcartUpdatedEvent = (
  response: any,
) => {
  const updatedcartNo = itemUpdate(
    response?.data?.addConfigurableProductsToCart?.cart?.items ||
      response?.data?.addSimpleProductsToCart?.cart?.items,
    response?.data?.addConfigurableProductsToCart?.cart
      ?.item_level_promotions ||
      response?.data?.addSimpleProductsToCart?.cart?.item_level_promotions
  );
  triggerGAEvent(
    {
      no_of_items:
        response?.data?.addConfigurableProductsToCart?.cart?.items?.length ||
        response?.data?.addSimpleProductsToCart?.cart?.items?.length ||
        0,
      index: 1,
      updated_items: updatedcartNo,
      value:
        response?.data?.addConfigurableProductsToCart?.cart?.prices?.grand_total
          ?.value ||
        response?.data?.addSimpleProductsToCart?.cart?.prices?.grand_total
          ?.value ||
        0,
    },
    "cart_updated"
  );
};

export const itemUpdate = (items: any, item_level_promotions:any) => {
  const getImageURL = (cartItem: any) => {
    if (cartItem?.product?.type_id == "simple") {
      return cartItem?.product?.image?.url;
    } else {
      return cartItem?.configured_variant?.image?.url;
    }
  };
  const newArr = items?.map((cartItem: any) => {
    const price = cartItem?.prices?.price?.value;
    const RetailPrice =
      cartItem?.prices?.price?.value -
      Number(
        item_level_promotions?.find(
          (i: any) => i?.sku === cartItem?.configured_variant?.sku
        )?.discount
      );
    const discount = cartItem?.prices?.price?.value - RetailPrice;
    const variant =
      cartItem?.configurable_options?.filter(
        (item: any) => item?.option_label == "Color"
      )?.[0]?.value_label || "na";
    const catData = latestLevelBreadCrumbs(
          cartItem?.product?.categories,
          4
        );
    const cartUpdates = {} as any;
    cartUpdates["item_id"] = cartItem?.configured_variant?.sku || "na";
    cartUpdates["item_name"] =
      cartItem?.configured_variant?.name || cartItem?.product?.name;
    cartUpdates["index"] = 1;
    cartUpdates["quantity"] = cartItem?.quantity;
    cartUpdates["item_image_link"] = [getImageURL(cartItem)] || "na";
    cartUpdates["price"] = price || 0;
    cartUpdates["original_price"] = RetailPrice? RetailPrice: price || 0;
    cartUpdates["discount"] =Math.ceil( discount)|| 0;
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
    cartUpdates["item_category5"] =
      cartItem?.product?.sku|| "na";
    cartUpdates["item_category"] =
      catData?.breadcrumbs?.[0]?.category_name || "na";
    cartUpdates["item_category2"] =
      catData?.breadcrumbs?.[1]?.category_name || "na";
    cartUpdates["item_category3"] = catData?.breadcrumbs?.[2]?.category_name
      ? catData?.breadcrumbs?.[2]?.category_name
      : catData?.name || "na";
    cartUpdates["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
      ? catData?.breadcrumbs?.[3]?.category_name
      : catData?.name || "na";
    cartUpdates["item_category5_id"] =
      cartItem?.product?.sku || "na";
    cartUpdates["item_brand"] = cartItem?.product?.brand_info || "na";
    cartUpdates["item_variant"] = variant || "na";
    return cartUpdates;
  });
  return newArr;
};


//coupon apply cart updated Event 
export const couponcartUpdatedEvent = (response: any) => {
  const updatedcartNo = couponCartUpdateArray(
    response?.cartItems?.cart?.items,
    response?.cartItems?.cart?.item_level_promotions
  );
  triggerGAEvent(
    {
      no_of_items:
        response?.cartItems?.cart?.items?.length ||
        0,
      index: 1,
      updated_items: updatedcartNo,
      value:
        response?.cartItems?.cart?.prices?.grand_total?.value ||
        0,
    },
    "cart_updated"
  );
};

// coupon  apply cart_updated item array
export const couponCartUpdateArray = (items: any, item_level_promotions:any) => {
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
    const catData = latestLevelBreadCrumbs(cartItem?.product?.categories, 4);
    const cartUpdates = {} as any;
    cartUpdates["item_id"] = cartItem?.configured_variant?.sku || "na";
    cartUpdates["item_name"] =
      cartItem?.configured_variant?.name || cartItem?.product?.name;
    cartUpdates["index"] = 1;
    cartUpdates["quantity"] = cartItem?.quantity || "na";
    cartUpdates["item_image_link"] = [getImageURL(cartItem)] || "na";
    cartUpdates["price"] =
      Math.ceil(cartItem?.prices?.price?.value * cartItem?.quantity) || 0;
    cartUpdates["original_price"] =
      Math.ceil(
        Number(
          RetailPrice
            ? RetailPrice
            : cartItem?.prices?.price?.value * cartItem?.quantity
        )
      ) || 0;
    cartUpdates["discount"] = Math.ceil(discount)|| 0;
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
      cartItem?.product?.categories?.[0]?.uid?.toString() || "na"),
      (cartUpdates["item_category2_id"] =
        cartItem?.product?.categories?.[1]?.uid?.toString() || "na");
    cartUpdates["item_category3_id"] =
      cartItem?.product?.categories?.[2]?.uid?.toString() || "na";
    cartUpdates["item_category4_id"] =
      cartItem?.product?.categories?.[3]?.uid?.toString() || "na";
    cartUpdates["item_category5"] =
      cartItem?.product?.sku || "na";
       catData?.breadcrumbs?.[0]?.category_name || "na";
       cartUpdates["item_category2"] =
         catData?.breadcrumbs?.[1]?.category_name || "na";
       cartUpdates["item_category3"] = catData?.breadcrumbs?.[2]?.category_name
         ? catData?.breadcrumbs?.[2]?.category_name
         : catData?.name || "na";
       cartUpdates["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
         ? catData?.breadcrumbs?.[3]?.category_name
         : catData?.name || "na";
    cartUpdates["item_category5_id"] =
      cartItem?.product?.sku|| "na";
    cartUpdates["item_brand"] = cartItem?.product?.brand_name || "na";
    cartUpdates["item_variant"] = variant || "na";
    return cartUpdates;
  });
  return newArr;
};

//coupon remove cart updated item array 
export const couponRemovecartUpdatedEvent = (response: any) => {
  const updatedcartNo = couponRemoveCartUpdateArray(
    response?.cartItems?.cart?.items,
    response?.cartItems?.cart?.item_level_promotions
  );
  triggerGAEvent(
    {
      no_of_items:
        response?.cartItems?.cart?.items?.length ||
        0,
      index: 1,
      updated_items: updatedcartNo,
      value:
        response?.cartItems?.cart?.prices?.grand_total?.value ||
        0,
    },
    "cart_updated"
  );
};
export const couponRemoveCartUpdateArray = (
  items: any,
  item_level_promotions: any
) => {
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
    const discount = cartItem?.prices?.price?.value * cartItem?.quantity - RetailPrice;
    const variant =
      cartItem?.configurable_options?.filter(
        (item: any) => item?.option_label == "Color"
      )?.[0]?.value_label || "na";
        const catData = latestLevelBreadCrumbs(
          cartItem?.product?.categories,
          4
        );
    const cartUpdates = {} as any;
    cartUpdates["item_id"] = cartItem?.configured_variant?.sku|| "na";
    cartUpdates["item_name"] =
      cartItem?.configured_variant?.name || cartItem?.product?.name;
    cartUpdates["index"] = 1;
    cartUpdates["quantity"] = cartItem?.quantity;
    cartUpdates["item_image_link"] = [getImageURL(cartItem)] || "na";
    cartUpdates["price"] = Math.ceil(cartItem?.prices?.price?.value * cartItem?.quantity) || 0;
    cartUpdates["original_price"] = Math.ceil(RetailPrice
      ? RetailPrice
      : cartItem?.prices?.price?.value * cartItem?.quantity )|| 0;
    cartUpdates["discount"] =Math.ceil( discount) || 0;
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
      cartItem?.product?.categories?.[0]?.uid?.toString() || "na"),
      (cartUpdates["item_category2_id"] =
        cartItem?.product?.categories?.[1]?.uid?.toString() || "na");
    cartUpdates["item_category3_id"] =
      cartItem?.product?.categories?.[2]?.uid?.toString() || "na";
    cartUpdates["item_category4_id"] =
      cartItem?.product?.categories?.[3]?.uid?.toString() || "na";
    cartUpdates["item_category5"] =
      cartItem?.product?.sku || "na";
        catData?.breadcrumbs?.[0]?.category_name || "na";
        cartUpdates["item_category2"] =
          catData?.breadcrumbs?.[1]?.category_name || "na";
        cartUpdates["item_category3"] = catData?.breadcrumbs?.[2]?.category_name
          ? catData?.breadcrumbs?.[2]?.category_name
          : catData?.name || "na";
        cartUpdates["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
          ? catData?.breadcrumbs?.[3]?.category_name
          : catData?.name || "na";
    cartUpdates["item_category5_id"] =
      cartItem?.product?.sku|| "na";
    cartUpdates["item_brand"] = cartItem?.product?.brand_name || "na";
    cartUpdates["item_variant"] = variant || "na";
    return cartUpdates;
  });
  return newArr;
};

//cart updated event while increasing and decreasing the  quantity
export const quantitycartUpdatedEvent = (response: any) => {
  const updatedcartNo = quantityItemArray(
    response?.cartItems?.cart?.items,
    response?.cartItems?.cart?.item_level_promotions
  );
  triggerGAEvent(
    {
      no_of_items: response?.cartItems?.cart?.items?.length || 0,
      index: 0,
      updated_items: updatedcartNo,
      value:
        response?.cartItems?.cart?.prices?.grand_total?.value ||0,
    },
    "cart_updated"
  );
};

// cart_updated item array
export const quantityItemArray = (items: any, item_level_promotions: any) => {
  const getImageURL = (cartItem: any) => {
    if (cartItem?.product?.type_id == "simple") {
      return cartItem?.product?.image?.url;
    } else {
      return cartItem?.configured_variant?.image?.url;
    }
  };
  const newArr = items?.map((cartItem: any,index:number) => {
    const RetailPrice =
      cartItem?.prices?.price?.value *cartItem?.quantity -
      Number(
        item_level_promotions?.find(
          (i: any) => i?.sku === cartItem?.configured_variant?.sku
        )?.discount
      );
    const discount = cartItem?.prices?.price?.value*cartItem?.quantity - RetailPrice;
    const orignalPrice =
      RetailPrice 
        ? RetailPrice 
        : cartItem?.prices?.price?.value * cartItem?.quantity; 
    const variant =
      cartItem?.configurable_options?.filter(
        (item: any) => item?.option_label == "Color"
      )?.[0]?.value_label || "na";
        const catData = latestLevelBreadCrumbs(
          cartItem?.product?.categories,
          4
        );
    const cartUpdates = {} as any;
    cartUpdates["item_id"] = cartItem?.configured_variant?.sku|| "na";
    cartUpdates["item_name"] =
      cartItem?.configured_variant?.name || cartItem?.product?.name;
    cartUpdates["index"] = index;
    cartUpdates["quantity"] = cartItem?.quantity;
    cartUpdates["item_image_link"] = [getImageURL(cartItem)] || "na";
    cartUpdates["price"] =
      cartItem?.prices?.price?.value * cartItem?.quantity || 0;
    cartUpdates["original_price"] = orignalPrice || 0;
    cartUpdates["discount"] =Math.ceil( discount) || 0;
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
      cartItem?.product?.categories?.[0]?.level?.toString() || "na"),
      (cartUpdates["item_category2_id"] =
        cartItem?.product?.categories?.[1]?.level?.toString() || "na");
    cartUpdates["item_category3_id"] =
      cartItem?.product?.categories?.[2]?.level?.toString() || "na";
    cartUpdates["item_category4_id"] =
      cartItem?.product?.categories?.[3]?.level?.toString() || "na";
    cartUpdates["item_category5"] =
      cartItem?.product?.sku|| "na";
       cartUpdates["item_category"] =
         catData?.breadcrumbs?.[0]?.category_name || "na";
        cartUpdates["item_category2"] =
          catData?.breadcrumbs?.[1]?.category_name || "na";
        cartUpdates["item_category3"] = catData?.breadcrumbs?.[2]?.category_name
          ? catData?.breadcrumbs?.[2]?.category_name
          : catData?.name || "na";
        cartUpdates["item_category4"] = catData?.breadcrumbs?.[3]?.category_name
          ? catData?.breadcrumbs?.[3]?.category_name
          : catData?.name || "na";
    cartUpdates["item_category5_id"] =
      cartItem?.product?.sku || "na";
    cartUpdates["item_brand"] = cartItem?.product?.brand_info || "na";
    cartUpdates["item_variant"] = variant || "na";
    return cartUpdates;
  });
  return newArr;
};