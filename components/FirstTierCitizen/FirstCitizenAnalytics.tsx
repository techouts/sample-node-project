import triggerGAEvent, { cartListJSON } from "../../utility/GaEvents";

export const callEventFirstCitizen = (
  event_type: any,
  widget_type: any,
  widget_title: any,
  link_text: any,
  no_of_items: any,
  link_url: any,
  widget_description: any,
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
      index: "",
      item: cartItems ? [cartItemData] : "",
    },
    "click"
  );
};
