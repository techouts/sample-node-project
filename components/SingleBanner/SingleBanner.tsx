import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import SingleBannerSchema from "../../schemas/SingleBannerSchema";
import { Item } from "../HeroBanner/HeroBanner";
import { banner_event_type } from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import { useInView } from "react-intersection-observer";
import Skeleton from "@mui/material/Skeleton";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";

function SingleBanner({
  id,
  __component,
  bgColor,
  bgPadding,
  imageUrl,
  imageUrlMobile,
  path,
  isNewTab,
  position,
  Item_name,
  promotion_id,
  promotion_name,
  creative_name,
  creative_slot,
  viewport,
}: SingleBannerSchema) {
  const [isMobile, setIsmobile] = useState(false);
  const matches = useMediaQuery("(min-width:768px)");
  const viewEventWrapper = useRef();
  useEffect(() => {
    setIsmobile(!matches);
  }, [matches]);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const dataSet = 1;
  const itemsLength = 1;
  const widgetType = "Single Banner";

  const cookie = new Cookies();
  const { getItem } = useStorage();

  const dataLayer = {
    previous_screen_name: "na",
    visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
    user_id: getItem("customer_ref", "local") || "na",
    creative_name: `${creative_name}-outer SB`,
    creative_slot: `${creative_slot}-outer SB`,
    items: [
      {
        promotion_id: `${promotion_id}-inner SB`,
        promotion_name: `${promotion_name}-inner SB`,
        creative_name: `${creative_name}-inner SB`,
        creative_slot: `${creative_slot}-inner SB`,
      },
    ],
  };
  ViewEvent(viewEventWrapper, dataLayer, "view_promotion");

  return (
    <Box
      bgcolor={bgColor}
      className={`${id} ${__component}`}
      p={isMobile ? (bgPadding ? "0 16px" : 0) : `${bgPadding}`}
      width={"100%"}
      ref={viewEventWrapper}
    >
      <Box>
        <Box ref={ref}>
          {!inView ? (
            <Skeleton variant="rectangular" width="100%" height={200} />
          ) : (
            <Item
              path={path}
              isNewTab={isNewTab}
              imageUrl={imageUrl}
              imageUrlMobile={imageUrlMobile}
              dataSet={dataSet}
              itemsLength={itemsLength}
              position={position}
              widgetType={widgetType}
              Item_name={Item_name}
              __component={__component}
              creative_name={creative_name}
              creative_slot={creative_slot}
              promotion_id={promotion_id}
              promotion_name={promotion_name}
              viewport={viewport}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(SingleBanner);