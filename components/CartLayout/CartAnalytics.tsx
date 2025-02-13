import triggerGAEvent, { cartItemJSON } from "../../utility/GaEvents";
import { pdpRedirecion } from "../../utility/PdpRedirection";

export const callEventCartCoupon = (
  coupon_code: any,
  link_text: any,
  order_discount: any,
  event_type: any,
  value: any,
  mrpValue: any,
  couponDiscount: any,
  brandDiscount: any,
  couponCodeDiscount: any,
  cartStore: any
) => {
  const generateItemArray = (data: any) => {
    const getPmrDiscountPrice = () => {
      const sku = data?.configured_variant?.sku
        ? data?.configured_variant?.sku
        : data?.product?.sku;
      return cartStore?.cartItems?.cart?.item_level_promotions?.find(
        (item_level_promotion: any) => item_level_promotion?.sku === sku
      );
    };
    const RetailPrice = getPmrDiscountPrice()?.discount
      ? data?.prices?.row_total?.value - getPmrDiscountPrice()?.discount
      : data?.prices?.row_total?.value -
        data?.prices?.total_item_discount?.value;
    const DiscountPrice: any =
      Math.round(data?.prices?.row_total?.value) - RetailPrice;

    const itemArray = {} as any;
    (itemArray["item_id"] = data?.configured_variant?.sku || "na"),
      (itemArray["item_name"] = data?.product?.name || "na"),
      (itemArray["discount"] = Math.ceil(DiscountPrice) || 0),
      (itemArray["item_category"] =
        data?.product?.categories?.[0]?.name || "na"),
      (itemArray["price"] = data?.prices?.row_total?.value || 0),
      (itemArray["original_price"] = Math.ceil(RetailPrice) || 0),
      (itemArray["item_category2"] =
        data?.product?.categories?.[1]?.name || "na"),
      (itemArray["item_category3"] =
        data?.product?.categories?.[2]?.name || "na"),
      (itemArray["item_category4"] =
        data?.product?.categories?.[3]?.name || "na"),
      (itemArray["item_category_id"] =
        data?.product?.categories?.[0]?.uid?.toString() || "na"),
      (itemArray["item_category2_id"] =
        data?.product?.categories?.[1]?.uid?.toString() || "na"),
      (itemArray["item_category3_id"] =
        data?.product?.categories?.[2]?.uid?.toString() || "na"),
      (itemArray["item_category4_id"] =
        data?.product?.categories?.[3]?.uid?.toString() || "na"),
      (itemArray["item_category5_id"] = data?.product?.sku || "na"),
      (itemArray["item_category5"] = data?.product?.sku|| "na"),
      (itemArray["item_deeplink_url"] =
        `${global?.window?.location.origin}${
          data?.type_id === "simple"
            ? pdpRedirecion(data?.sku, data?.type_id, data?.name)
            : pdpRedirecion(
                data?.sku,
                data?.type_id,
                data?.name,
                data?.configured_variant?.color,
                data?.configured_variant?.size
              )
        }` || "na");

    return itemArray;
  };

  triggerGAEvent(
    {
      widget_title: "Coupon",
      coupon_code: coupon_code || "na",
      event_type: event_type,
      link_text: link_text,
      order_discount: parseFloat(order_discount?.toFixed(2)) || 0,
      value: value || 0,
      mrp_value: mrpValue || 0,
      link_url: window?.location?.href || "na",
      Cart_value_Before_Discount: brandDiscount || 0,
      Cart_value_After_Discount: couponDiscount || 0,
      Discount_Amount: parseFloat(couponCodeDiscount?.toFixed(2)) || 0,
      no_of_items: cartStore?.cartItems?.cart?.items?.length || 0,
      coupon_items: cartStore?.cartItems?.cart?.items?.map((data: any) =>
        generateItemArray(data)
      ),
    },
    "coupon"
  );
};

export const dataLayer = (cartStore: any) => {
  return {
    currency: cartStore?.cartItems?.cart?.prices?.grand_total?.currency,
    value: cartStore?.cartItems?.cart?.prices?.grand_total?.value,
    no_of_items: cartStore?.cartItems?.cart?.items?.length,
    items: cartItemJSON(cartStore?.cartItems?.cart),
  };
};
export const placeOrderEvent = (
  cartStore: any,
  customerCartData: any,
  userDataItems: any
) => {
  const items = customerCartData?.cart?.items;
  const dataCart = customerCartData?.cart;
  let cartItemData = cartItemJSON(cartStore?.cartItems?.cart);
  triggerGAEvent(
    {
      currency: "INR",
      value: dataCart?.prices?.grand_total?.value || 0,
      no_of_items: items?.length,
      coupon: dataCart?.applied_coupons?.[0]?.code || "na",
      order_id: localStorage?.getItem("cartID"),
      transaction_id: localStorage?.getItem("cartID"),
      shipping:
        dataCart?.shipping_addresses?.[0]?.selected_shipping_method?.amount
          ?.value || 0,
      shipping_tier:
        dataCart?.shipping_addresses?.[0]?.selected_shipping_method
          ?.carrier_title,
      user_pin_code: userDataItems?.pincode,
      user_state: userDataItems?.state || "na",
      user_city: userDataItems?.city,
      order_discount:
        Number(
          parseFloat(dataCart?.promotion_total?.amount) > 0 &&
            Math.abs(dataCart?.prices?.discount?.amount?.value) > 0
            ? parseFloat(
                (
                  parseFloat(dataCart?.promotion_total?.amount) +
                  Math.abs(dataCart?.prices?.discount?.amount?.value)
                )?.toFixed(2)
              )
            : parseFloat(dataCart?.promotion_total?.amount) > 0
            ? parseFloat(
                parseFloat(dataCart?.promotion_total?.amount)?.toFixed(2)
              )
            : Math.abs(dataCart?.prices?.discount?.amount?.value)
        ) || 0,
      order_purchase_items: 0,
      gift_or_voucher_amount: 0,
      mrp_value: dataCart?.prices?.subtotal_including_tax?.value || 0,
      jounery_type:
        dataCart?.shipping_addresses?.[0]?.selected_shipping_method
          ?.carrier_title || "na",
      order_items: cartItemData,
    },
    "begin_checkout"
  );
};
