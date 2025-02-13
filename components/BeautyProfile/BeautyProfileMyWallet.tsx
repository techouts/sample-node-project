import { error_Type, event_type, widget_type } from "../../utility/GAConstants";
import triggerGAEvent, { cartListJSON } from "../../utility/GaEvents";
import { WrongCaptcha } from "../Profile/constant";

export const callEventBeautyProfileMyWallet = (
  event_type: string,
  widget_type: string,
  widget_title: string | undefined,
  link_text: any,
  no_of_items: any,
  link_url: any,
  widget_description: string | undefined,
  cartItems?: any
) => {
  let cartItemData = cartListJSON(cartItems?.cart?.items);
  triggerGAEvent(
    {
      event_type: event_type,
      widget_type: widget_type,
      widget_title: widget_title,
      link_text: link_text,
      no_of_items: no_of_items,
      link_url: link_url,
      widget_description: widget_description,
      widget_position: "",
      index: 1,
      item: cartItems ? [cartItemData] : "",
    },
    "click"
  );
};

export const errorEvent = (status:any) => {
  triggerGAEvent(
    {
      event_type: event_type,
      widget_type: widget_type,
      error_message: WrongCaptcha,
      error_type: error_Type,
      status: status,
      item_name: "na",
    },
    "error_event",
  );
  return true;
};