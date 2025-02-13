import { Box, Typography } from "@mui/material";
import { ColorType } from "../../utility/ColorType";
import { event_type, widget_type } from "../../utility/GAConstants";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import ViewEvent from "../../utility/viewEvent";
import {
  TypographyAuthor,
  TypographyDescription,
  Typographyblog,
} from "../BlogAuthor/BlogAuthorStyles";
import {useRef} from "react";


interface BlogProfile {
  id: number;
  authorDescription: string;
  authorImage: string;
  authorName: string;
  bgColor: ColorType;
  bgPadding: string;
  title: string;
  position:number;
  __component:string;
}

function BlogProfile({
  id,
  authorDescription,
  authorImage,
  authorName,
  bgColor,
  bgPadding,
  title,
  position,
  __component,
}: BlogProfile) {
  const isMobile = useMobileCheck();
  const viewEventWrapper = useRef();
  const dataLayer = {
    item_id:`${__component}_${position}`,
    item_name:"na",
    component_id: id ? id : "na",
    widget_type:widget_type,
    item_type:"na",
    widget_title:__component,
    widget_description: authorDescription,
    widget_postion: position,
    no_of_items:1,
    index:position,
    item_brand: "na",
    item_category: "na",
    item_category2: "na ",
    item_category3: "na ",
    event_type: event_type,
    view_items: {
      item_id:`${__component}_${position}`,
      item_name:"na",
      index:position + 1,
      item_brand: "na",
      item_category: "na",
      price:0,
      original_price:0,
      quantity: 0,
      item_rating: "na",
      item_category2: "na",
      item_category3: "na",
      item_category5: "na",
      item_deeplink_url: "na",
      item_image_link:authorImage,
    },
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");
  return (
    <Box bgcolor={bgColor} p={bgPadding} ref={viewEventWrapper}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px",marginTop:'30px' }}>
        <Box>
          <img width={"100%"} src={`${ReplaceImage(authorImage)}`} alt="author_image" />
        </Box>
        <Box>
          <TypographyAuthor isMobile={isMobile}>{authorName}</TypographyAuthor>
          <TypographyDescription isMobile={isMobile}>
            {authorDescription}
          </TypographyDescription>
        </Box>
      </Box>
      <Box>
        {" "}
        <Typographyblog isMobile={isMobile}> {title}</Typographyblog>
      </Box>
    </Box>
  );
}

export default BlogProfile;
