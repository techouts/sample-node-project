import { Stack } from "@mui/material";
import React, { Fragment } from "react";
import { Heading, StyledButton } from "./styles";
import VideoViewer, { VideoViewerInterface } from "./VideoViewer";
import { useMobileCheck } from "../../utility/isMobile";
import {
  viewAllFrMob,
  viewAllFrDesk,
} from "../../components/BlogThumbnail/BlogThumbnailStyle";
import triggerGAEvent from "../../utility/GaEvents";
import { widget_type } from "../../utility/GAConstants";
export interface BeautyShotsInterface {
  __component: string;
  id: number;
  bgColor: string;
  bgPadding: string;
  title: string;
  viewMore: boolean;
  items: any[];
  frame: any;
  buttonText: string;
  position: number;
  buttonPath: URL | string;
  imageAltText: string;
  promotion_id: string;
  promotion_name: string;
}
function BeautyShots({
  title,
  bgColor,
  bgPadding,
  buttonText,
  buttonPath,
  viewMore,
  items,
  frame,
  position,
  imageAltText,
  __component,
  id,
  promotion_id,
  promotion_name,
}: BeautyShotsInterface) {
  const isMobile = useMobileCheck();
  const componentData = {
    items,
    frame,
    imageAltText,
    promotion_id,
    promotion_name,
  };

  const callGaEvent = () => {
    triggerGAEvent(
      {
        widget_type: widget_type,
        item_type: "video",
        widget_title: __component,
        widget_description: "na",
        widget_position: position,
        no_of_items: items?.length,
        item_brand: "na",
        item_category: "na",
        link_text: buttonText,
        link_url: `${global?.window?.location.origin}${buttonPath}`,
        item_id: `${__component}_${position}`,
        item_name: "na",
        component_id: id,
      },
      "view_all"
    );
  };

  return (
    <Fragment>
      <Stack
        direction={"column"}
        sx={{
          background: bgColor,
          justifyContent: "center",
          alignItems: "center",
          marginTop: isMobile ? "30px" : "0px",
        }}
        p={bgPadding}
        width={"100%"}
      >
        <Heading isMobile={isMobile}>{title}</Heading>
        <VideoViewer
          Component={__component}
          position={position}
          {...componentData}
        />

        {viewMore && (
          <StyledButton
            style={isMobile ? viewAllFrMob : viewAllFrDesk}
            onClick={() => {
              callGaEvent();
              window.location.assign(buttonPath);
            }}
          >
            {buttonText}
          </StyledButton>
        )}
      </Stack>
    </Fragment>
  );
}
export default BeautyShots;
