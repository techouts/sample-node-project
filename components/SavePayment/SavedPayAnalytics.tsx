import {widgetType, widget_type } from "../../utility/GAConstants";
import triggerGAEvent, { cartItemJSON } from "../../utility/GaEvents";

export const callCardDetailsEvent = (
  cartItems: any,
  CardDetailsInfo: any,
  cardsData: any,
  link_text: any
) => {
  let cartItemData = cartItemJSON(cartItems?.cart);
  triggerGAEvent(
    {
      event_type: CardDetailsInfo?._component,
      widget_type: widget_type,
      widget_title: CardDetailsInfo?.titleAdd,
      widget_description:
        CardDetailsInfo?.cardName +
        "," +
        CardDetailsInfo?.cardName +
        "," +
        CardDetailsInfo?.expiryDate,
      widget_position: "",
      link_url: "#",
      link_text: link_text,
      no_of_items: cardsData?.length,
      index: "",
      item: [cartItemData],
    },
    "click"
  );
};

export const callUpiDetailsEvent = (
  cartItems: any,
  data: any,
  link_text: any
) => {
  let cartItemData = cartItemJSON(cartItems?.cart);
  triggerGAEvent(
    {
      event_type: data?._component,
      widget_type: widgetType,
      widget_title: data?.title,
      widget_description: data?.upiInfo,
      widget_position: "",
      link_url: "",
      link_text: link_text,
      no_of_items: length,
      index: "",
      item: [cartItemData],
    },
    "click"
  );
};
