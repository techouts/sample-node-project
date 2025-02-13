import { Box, Typography } from "@mui/material";
import BeautyTipsInterface from "../../schemas/BeautyStopSchema";
import { TextTypography } from "./BlogParagraphStyles";
import { useMobileCheck } from "../../utility/isMobile";
import { event_type, widget_type } from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import { useRef } from "react";

const BlogParagraph = ({
  title,
  bgPadding,
  bgColor,
  id,
  Item_name,
  Item_type,
  __component,
  position,
}: BeautyTipsInterface) => {
  const isMobile = useMobileCheck();
  const viewEventWrapper = useRef();
  const dataLayer = {
    item_id: `${__component}_${position}`,
    item_name: Item_name || "na",
    component_id: id,
    widget_type: widget_type,
    item_type: Item_type || "na",
    widget_title: __component,
    widget_description: "na",
    widget_postion: position,
    no_of_items: 1,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    view_items: {
      item_id: `${__component}_${position}`,
      item_name: Item_name || "na",
      index: position,
      item_brand: "na",
      item_category: "na",
      price: 0,
      original_price: 0,
      quantity: 0,
      item_rating: "na",
      item_category2: "na",
      item_category3: "na",
      item_category5: "na",
      item_deeplink_url: "na",
      item_image_link: "na",
    },
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");
  return (
    <Box
      ref={viewEventWrapper}
      p={isMobile ? "0 4%" : bgPadding}
      bgcolor={bgColor}
      mt={isMobile ? "10px" : "0px"}
    >
      <TextTypography
        isMobile={isMobile}
        dangerouslySetInnerHTML={{ __html: title }}
      ></TextTypography>
      
    </Box>
  );
};
export default BlogParagraph;