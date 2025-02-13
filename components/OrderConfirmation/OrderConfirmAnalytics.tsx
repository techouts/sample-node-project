import {widget_type } from "../../utility/GAConstants";
import triggerGAEvent, { orderItemJSON, transactionItemArray } from "../../utility/GaEvents";
import { pdpRedirecion } from "../../utility/PdpRedirection";

export const callEventOrderConfirm = (
  eventValues: any,
  link_text: any,
  link_url: any,
  value: any,
  widget_title: any,
  event_type:any
) => {
  triggerGAEvent(
    {
      widget_title: widget_title,
      widget_type: widget_type,
      link_url: `${global?.window?.location?.origin}${link_url}`,
      link_text: link_text,
      order_id: eventValues?.items?.[0]?.order_number ? eventValues?.items?.[0]?.order_number : "na",
      transcation_id: localStorage?.getItem("cartID") ? localStorage?.getItem("cartID") : "na",
      event_type: event_type,
      item_name: eventValues?.items?.[0]?.items?.[0]?.brand_name ? eventValues?.items?.[0]?.items?.[0]?.brand_name : "na",
      item_rating: value || "na",
    },
    "click"
  );
};
export const triggerPurchaseEvent = (
  eventValues: any,
  eventName: any,
  jounery_type: any,
  shipping_tier: any,
  error_message:any,
  paymentmode?:any,
  orderDetails?:any
) => {
  let itemdetails = eventValues?.items?.[0];
  let transaction = orderItemJSON(eventValues?.items);
  const totalSavings =
    orderDetails?.items?.[0]?.total &&
      parseInt(orderDetails?.items?.[0]?.coupon_amount) +
      parseFloat(orderDetails?.items?.[0]?.applied_promotions_cart_level_amount);
  triggerGAEvent(
    {
      currency: "INR",
      value: itemdetails?.total?.grand_total?.value || 0,
      no_of_items: eventValues?.items?.length,
      coupon_code: itemdetails?.items?.[0]?.coupon_code
        ? itemdetails?.items?.[0]?.coupon_code
        : "na",
      discount:
        Math.abs(itemdetails?.total?.discounts?.[0]?.amount?.value) || 0,
      tax: itemdetails?.total?.total_tax?.value || 0,
      order_id: itemdetails?.order_number,
      transaction_id: localStorage?.getItem("cartID")
        ? localStorage?.getItem("cartID")
        : "na",
      shipping: itemdetails?.total?.total_shipping?.value || 0,
      shipping_tier: itemdetails?.shipping_method || "na",
      payment_type: itemdetails?.payment_methods?.[0]?.type,
      status: itemdetails?.status,
      error_message: error_message,
      user_pin_code: itemdetails?.billing_address?.postcode,
      user_state: itemdetails?.billing_address?.region,
      user_city: itemdetails?.billing_address?.city,
      order_discount:
        Math.abs(itemdetails?.total?.discounts?.[0]?.amount?.value) || 0,
      other_purchase_items: 0,
      total_saving: totalSavings || 0,
      gift_or_voucher_detail: "na",
      gift_or_voucher_amount:
        itemdetails?.total?.egv_discount?.amount > 0
          ? parseFloat(itemdetails?.total?.egv_discount?.amount): 0,
      mrp_value: itemdetails?.total?.subtotal?.value || 0,
      jounery_type: jounery_type,
      first_citizen_points: 0,
      first_citizen_points_used:
        itemdetails?.total?.loyalty_discount?.amount > 0
          ? parseFloat(itemdetails?.total?.loyalty_discount?.amount)
          : 0,
      wallet_amount: 0,
      wallet_amount_used:
        itemdetails?.total?.wallet_discount?.amount > 0
          ? parseFloat(itemdetails?.total?.wallet_discount?.amount): 0,
      order_date_and_time: new Date(itemdetails?.order_date),
      payment_mode_break_up: paymentmode || "na",
      delivery_method: itemdetails?.carrier ? itemdetails?.carrier : "na",
      purchase_items: transaction,
    },
    eventName
  );
};
 
//transaction event
export const triggerTransactionEvent = (
  eventValues: any,
  eventName: any,
  jounery_type: any,
  shipping_tier: any,
  error_message:any,
  orderDetails?:any
) => {
  let itemdetails = eventValues?.items?.[0];
  const paymentType = [];
  if (itemdetails?.payment_methods?.[0]?.type) {
    paymentType.push(itemdetails?.payment_methods?.[0]?.type);
  }
  if (
    Number(itemdetails?.total?.egv_discount?.amount) > 0 &&
    itemdetails?.total?.egv_discount?.code
  ) {
    paymentType.push(itemdetails?.total?.egv_discount?.code);
  }
  if (
    Number(itemdetails?.total?.wallet_discount?.amount) > 0 &&
    itemdetails?.total?.wallet_discount?.code
  ) {
    paymentType.push(itemdetails?.total?.wallet_discount?.code);
  }

  const concatenatedMethods = paymentType?.join(" | ");

  const deeplinkurl =
    `${global?.window?.location.origin}${
      eventValues?.product?.type_id === "simple"
        ? pdpRedirecion(
            eventValues?.sku,
            eventValues?.type_id,
            eventValues?.product?.name
          )
        : pdpRedirecion(
            eventValues?.sku,
            eventValues?.type_id,
            eventValues?.name,
            eventValues?.configured_variant?.color,
            eventValues?.configured_variant?.size
          )
    }` || "na";
  let transaction = transactionItemArray(eventValues?.items);
  const totalSavings =
    orderDetails?.items?.[0]?.total &&
    parseInt(orderDetails?.items?.[0]?.coupon_amount) +
      parseFloat(
        orderDetails?.items?.[0]?.applied_promotions_cart_level_amount
      );
  triggerGAEvent(
    {
      mode_of_payment:
        (concatenatedMethods
          ? concatenatedMethods
          : itemdetails?.payment_methods?.[0]?.type) || "na",
      payment_type: itemdetails?.payment_methods?.[0]?.type,
      error_message: error_message || "na",
      order_id: itemdetails?.order_number || "na",
      type: itemdetails?.status || "na",
      currency: "INR",
      value: itemdetails?.total?.grand_total?.value || 0,
      no_of_items: eventValues?.items?.length
        ? eventValues?.items?.length
        : "na",
      coupon_code: itemdetails?.items?.[0]?.coupon_code
        ? itemdetails?.items?.[0]?.coupon_code
        : "na",
      discount:
        Math.abs(itemdetails?.total?.discounts?.[0]?.amount?.value) || 0,
      tax: itemdetails?.total?.total_tax?.value || 0,
      transaction_id: localStorage?.getItem("cartID")
        ? localStorage?.getItem("cartID")
        : "na",
      shipping: itemdetails?.total?.total_shipping?.value || 0,
      shipping_tier: itemdetails?.shipping_method || "na",
      status: itemdetails?.status == "IN_STOCK" || "na",
      user_pin_code: itemdetails?.billing_address?.postcode || "na",
      user_state: itemdetails?.billing_address?.region || "na",
      user_city: itemdetails?.billing_address?.city || "na",
      order_discount: itemdetails?.total?.discounts?.[0]?.amount?.value || 0,
      other_purchase_items: 0,
      total_saving: totalSavings || 0,
      gift_or_voucher_detail: "na",
      gift_or_voucher_amount:
        itemdetails?.total?.egv_discount?.amount > 0
          ? parseFloat(itemdetails?.total?.egv_discount?.amount)
          : 0,
      mrp_value: itemdetails?.total?.subtotal?.value || 0,
      jounery_type: jounery_type || "na",
      first_citizen_points: 0,
      first_citizen_points_used:
        itemdetails?.total?.loyalty_discount?.amount > 0
          ? parseFloat(itemdetails?.total?.loyalty_discount?.amount)
          : 0,
      wallet_amount: 0,
      wallet_amount_used:
        itemdetails?.total?.wallet_discount?.amount > 0
          ? parseFloat(itemdetails?.total?.wallet_discount?.amount)
          : 0,
      purchase_items: transaction,
    },
    eventName
  );
};
