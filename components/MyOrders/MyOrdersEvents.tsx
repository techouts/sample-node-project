import {
  Event_Type,
  event_type,
  event_Type,
  widget_type,
} from "../../utility/GAConstants";
import triggerGAEvent, { myOrdersItemJSON } from "../../utility/GaEvents";

//click event for Reorder CTA
export const callEventMyOrders = (
  ordersData: any,
  link_text: any,
  event_type?: any,
  widget_title?: any,
  position?: any,
  componentid?: any,
  url?: any
) => {
  triggerGAEvent(
    {
      event_type: event_type,
      widget_type: widget_type,
      widget_title: widget_title,
      widget_description: "na",
      widget_position: position,
      link_url: url,
      link_text: link_text,
      no_of_items: ordersData?.length,
      index: position,
      item_name: ordersData?.product_name,
      item_type: ordersData?.__typename,
      item_id: ordersData?.parent_sku,
      component_id: componentid,
      item_brand: "na",
      item_category: "na",
      item_category2: "na",
      item_category3: "na",
      item_original_price: 0,
      item_price: ordersData?.product_name?.value,
      item_rating: "na",
    },
    "click"
  );
};

export const callEventMyOrdersSearch = (ordersData: any, search_term: any,widget_title?:any, position?:any) => {
  triggerGAEvent(
    {
      event_type: Event_Type,
      search_term: search_term,
      link_text: "search",
      widget_title: widget_title,
      widget_position:position,
      no_of_items: ordersData?.length,
      index:position,
      item_name:ordersData?.product_name,
      item_price: ordersData?.product_name?.value || 0,
      item_original_price: 0,
      item_rating: "na",
    },
    "search"
  );
};

export const callEventOrderDetails = (
  orderItem: any,
  link_text: any,
  link_url: any,
  widget_title: any
) => {
  triggerGAEvent(
    {
      item_name: orderItem?.product_name,
      item_id: orderItem?.item_id,
      item_type: orderItem?.__typename,
      event_type: event_Type,
      widget_type: widget_type,
      widget_title: widget_title,
      widget_description: "na",
      widget_position: 1,
      link_url: `${global?.window?.location?.origin}${link_url}`,
      link_text: link_text,
      no_of_items: 1,
      index: 1,
      item_brand: orderItem?.average_rating,
      item_category: "na",
      item_category2: "na",
      item_category3: "na",
      item_original_price: 0,
      item_price: orderItem?.product_sale_price?.value,
      item_rating: orderItem?.average_rating,
    },
    "click"
  );
};
