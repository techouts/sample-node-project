import triggerGAEvent, { cartItemJSON } from "../../utility/GaEvents";
import useStorage from "../../utility/useStoarge";
const callEventPay = (
  cartStore: any,
  sswalletamount?: string,
  sswallentamountused?: string,
  selectoption?: string
) => {
  const {
    currentDeliveryMode,
    cartItems,
    userDeliveryAddress,
  } = cartStore;
  const { getItem } = useStorage();
  let cartItemData = cartItemJSON(cartItems?.cart);
  triggerGAEvent(
    {
      currency: "INR",
      value: cartItems?.cart?.prices?.grand_total?.value ||0,
      no_of_items: cartItems?.cart?.items?.length,
      coupon_code: cartItems?.cart?.applied_coupons?.[0]?.code?.toString()|| "na",
      order_id: getItem("BuyNowCartID", "local")
        ? `${getItem("BuyNowCartID", "local")}`
        : `${getItem("cartID", "local")}`,
      transaction_id: getItem("BuyNowCartID", "local")
        ? `${getItem("BuyNowCartID", "local")}`
        : `${getItem("cartID", "local")}`,
      item_type: cartItems?.cart?.__typename,
      shipping_tier:
        cartItems?.cart?.shipping_addresses?.[0]?.selected_shipping_method
          ?.carrier_code,
      payment_type: selectoption,
      user_pin_code:
        userDeliveryAddress?.[
          currentDeliveryMode as keyof typeof userDeliveryAddress
        ]?.billingAddress?.postcode,
      user_state:
        userDeliveryAddress?.[
          currentDeliveryMode as keyof typeof userDeliveryAddress
        ]?.billingAddress?.region?.region,
      user_city:
        userDeliveryAddress?.[
          currentDeliveryMode as keyof typeof userDeliveryAddress
        ]?.billingAddress?.city,
      order_discount:
      Number(parseFloat(cartItems?.cart?.promotion_total?.amount) > 0 &&
        Math.abs(cartItems?.cart?.prices?.discount?.amount?.value) > 0
          ? parseFloat(
              (
                parseFloat(cartItems?.cart?.promotion_total?.amount) +
                Math.abs(cartItems?.cart?.prices?.discount?.amount?.value)
              )?.toFixed(2)
            )
          : parseFloat(cartItems?.cart?.promotion_total?.amount) > 0
          ? parseFloat(
              parseFloat(cartItems?.cart?.promotion_total?.amount)?.toFixed(2)
            )
          : Math.abs(cartItems?.cart?.prices?.discount?.amount?.value)?.toFixed(
              2
            ) )|| 0,
      other_purchase_items: 0,
      total_saving:
     Number(parseFloat(cartItems?.cart?.promotion_total?.amount) > 0 &&
        Math.abs(cartItems?.cart?.prices?.discount?.amount?.value) > 0
          ? parseFloat(
              (
                parseFloat(cartItems?.cart?.promotion_total?.amount) +
                Math.abs(cartItems?.cart?.prices?.discount?.amount?.value)
              )?.toFixed(2)
            )
          : parseFloat(cartItems?.cart?.promotion_total?.amount) > 0
          ? parseFloat(
              parseFloat(cartItems?.cart?.promotion_total?.amount)?.toFixed(2)
            )
          : Math.abs(cartItems?.cart?.prices?.discount?.amount?.value)?.toFixed(
              2
            )) || 0,
      gift_or_voucher_detail: "na",
      gift_or_voucher_amount:
        cartItems?.cart?.prices?.egv_discount?.value > 1
          ? parseFloat(cartItems?.cart?.prices?.egv_discount?.value)?.toFixed(2)
          : 0,
      mrp_value: cartItems?.cart?.prices?.subtotal_excluding_tax?.value ||0,
      first_citizen_points_used:
        cartItems?.cart?.prices?.loyalty_discount?.value || 0,
      wallet_amount_used:
        sswallentamountused ||
        cartItems?.cart?.prices?.wallet_discount?.amount ||
        0,
      order_items: cartItemData,
    },
    "add_payment_info"
  );
};
export default callEventPay;
