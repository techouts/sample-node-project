import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React, { useState, useRef } from "react";
import SocialMediaSchema from "../../schemas/SocialMediaBlogSchema";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  ContentGrid,
  DescriptionText,
  FaceCleansingSubText,
  TextGrid,
  EmbededText,
  HeadingLevel,
  HeadingLevelMain,
  Quickviewtext,
  Descriptionbenefits,
} from "../FaceCleansing/styles";
import { event_type, widgetType, widget_type } from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import triggerGAEvent from "../../utility/GaEvents";
const SocialBlog = ({
  title,
  bgColor,
  bgPadding,
  items,
  enableJumplinks,
  description,
  __component,
  position,
  id,
  imageUrl,
}: SocialMediaSchema) => {
  const isMobile = useMobileCheck();
  const [hide, setHide] = useState(false);
  const handler = (index: any) => {
    let cardTierElement: any = document.getElementById(index);
    cardTierElement &&
      cardTierElement?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    cardTierElement?.scrollIntoView(true);
    let scrolledY = window.scrollY;
    if (scrolledY) {
      window.scroll(0, scrolledY - 120);
    }
  };
  const viewEventWrapper = useRef();
  const dataLayer = {
    item_id: `${__component}_${position}`,
    component_id: id,
    item_name: "na",
    widget_type: widgetType,
    item_type: "na",
    widget_title: __component,
    widget_description: "na",
    widget_postion: position,
    no_of_items: 1,
    index: position,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    original_price: 0,
    event_type: event_type,
    view_items: [
      {
        item_id: `${__component}_${position}`,
        item_name: "na",
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
        item_image_link: imageUrl,
      },
    ],
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  const callGaEvent = (
    linktext: string,
    imagepath: URL | string,
    itemname: string
  ) => {
    triggerGAEvent(
      {
        widget_type: widget_type,
        component_id: id,
        item_name: itemname || "na",
        item_type: "product",
        widget_title: __component,
        widget_description: "na",
        widget_position: position,
        no_of_items: items?.length,
        item_brand: "na",
        item_category: "na",
        link_text: linktext,
        index: position,
        link_url: `${global?.window?.location.origin}${imagepath}` || "na",
        item_id: `${__component}_${position}`,
        item_rating: "na",
        event_type: event_type,
        item_category2: "na",
        item_category3: "na",
      },
      "click"
    );
  };
  const flexDirection = (itemName: any) => {
    if (itemName?.showEmbed) {
      if (itemName?.imageDirection) {
        return "column-reverse";
      } else {
        return "column";
      }
    } else {
      if (itemName?.imageDirection) {
        return "row-reverse";
      } else {
        return "row";
      }
    }
  };

  const imageDirection = (item: any, index: any) => {
    if (index % 2 === 0) {
      if (item?.imageDirection) {
        return "row";
      } else {
        return "row-reverse";
      }
    } else {
      return "row";
    }
  };
  const descriptionText = (item: any) => {
    if (isMobile) {
      return (
        <>
          <EmbededText
            isMobile={isMobile}
            dangerouslySetInnerHTML={{
              __html: item?.embedText,
            }}
          />
        </>
      );
    } else {
      return (
        <>
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              paddingBottom: "10px",
            }}
          >
            <Box
              sx={{
                width: "75%",
                display: "inline-block",
                justifyContent: "center",
              }}
            >
              <DescriptionText
                dangerouslySetInnerHTML={{
                  __html: item?.embedText,
                }}
              />
            </Box>
          </Box>
        </>
      );
    }
  };
  const textGrid = (item: any) => {
    return (
      <>
        <TextGrid
          style={{
            maxWidth: item?.showEmbed ? "100%" : "",
            marginTop: isMobile ? "0px" : "10px",
            marginRight: isMobile ? "auto" : "",
            alignSelf: item?.showEmbed ? "start" : "center",
          }}
          item
          xs={12}
          md={12}
          lg={5.7}
          pr={isMobile ? 0 : 4}
        >
          {!isMobile && (
            <>
              <Box mb={"10px"}>
                <FaceCleansingSubText
                  dangerouslySetInnerHTML={{
                    __html: item?.subTitle,
                  }}
                />
              </Box>
              <Box>
                <DescriptionText
                  dangerouslySetInnerHTML={{
                    __html: item?.description,
                  }}
                />
              </Box>
            </>
          )}
        </TextGrid>
      </>
    );
  };
  const embedTextGrid = (item: any) => {
    return (
      <>
        <Grid
          item
          sm={12}
          md={12}
          xs={12}
          lg={item?.showEmbed ? 12 : 6}
          sx={{ width: "100%" }}
        >
          <Box
            sx={{
              display: !item?.showEmbed ? "flex" : "inline-block",
              width: isMobile ? "95%" : "97%",
              height: isMobile ? "95%" : "100%",
              alignSelf: "center",
              marginLeft: !item?.showEmbed ? "" : "10px",
              paddingTop: isMobile ? "0px" : "20px",
            }}
          >
            {!item?.showEmbed
              ? item?.imageUrl && (
                  <img
                    src={`${ReplaceImage(item?.imageUrl)}`}
                    alt={item?.imageAltText || "image"}
                    height="100%"
                    width="100%"
                    id={item?.subTitle}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      item?.path && window?.open(`${item?.path}`);
                      callGaEvent(item?.subTitle, item?.path, item?.Item_name);
                    }}
                  />
                )
              : descriptionText(item)}
          </Box>
        </Grid>
      </>
    );
  };
  return (
    <>
      <Box
        bgcolor={bgColor}
        p={isMobile ? "0% 4%" : bgPadding}
        style={{ cursor: "pointer" }}
      >
        {title && (
          <HeadingLevel
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        )}
        {enableJumplinks && (
          <Box bgcolor="#F0F0F4" p="18px">
            {enableJumplinks && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Quickviewtext isMobile={isMobile}>
                  {" "}
                  QUICK VIEW&nbsp;{" "}
                </Quickviewtext>
                <Typography
                  sx={{ color: "#BD4670", fontSize: "12px" }}
                  onClick={() => setHide(!hide)}
                >
                  {!hide ? "[Show]" : "[Hide]"}
                </Typography>
              </Box>
            )}
            {hide && (
              <>
                <Box ref={viewEventWrapper}>
                  {items?.map((item, index) => {
                    const uniqueKeyValue = index;
                    return item?.headingLevel === "one" ? (
                      <HeadingLevelMain
                        key={uniqueKeyValue}
                        isMobile={isMobile}
                        onClick={() => handler(item?.subTitle)}
                        dangerouslySetInnerHTML={{ __html: item?.subTitle }}
                      ></HeadingLevelMain>
                    ) : (
                      <HeadingLevelMain
                        isMobile={isMobile}
                        onClick={() => handler(item?.subTitle)}
                        dangerouslySetInnerHTML={{ __html: item?.subTitle }}
                      ></HeadingLevelMain>
                    );
                  })}
                </Box>
              </>
            )}
          </Box>
        )}
      </Box>
      <Box bgcolor={bgColor} p={isMobile ? "0% 4%" : bgPadding} mt="10px">
        <Descriptionbenefits
          isMobile={isMobile}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Box>
      <Box
        bgcolor={bgColor}
        p={isMobile ? "0% 4%" : bgPadding}
        mt={isMobile ? "10px" : ""}
      >
        <ol style={{ margin: "0px", padding: "0px", listStyleType: "none " }}>
          {items?.map((item, index) => {
            const uniqueKeyValue = index;
            return (
              <li key={uniqueKeyValue}>
                {item?.headingLevel === "one" && (
                  <>
                    <br />
                    &nbsp;
                  </>
                )}
                {isMobile && (
                  <>
                    <Box mb={"10px"} mt={"10px"}>
                      <FaceCleansingSubText
                        dangerouslySetInnerHTML={{ __html: item?.subTitle }}
                      />
                    </Box>
                  </>
                )}
                <ContentGrid
                  imageDirection={!isMobile && item?.imageDirection}
                  direction={imageDirection(item, index)}
                  container
                  key={uniqueKeyValue}
                  id={item?.subTitle}
                  sx={{
                    margin: isMobile ? "" : "0",
                    display: "flex",
                    flexDirection: flexDirection(item),
                    alignItems: item?.showEmbed ? "center" : "",
                    justifyContent: "start",
                    gap: isMobile ? "" : "20px",
                    paddingBottom: item?.showEmbed ? "" : "10px",
                  }}
                >
                  {isMobile && (
                    <Box>
                      <DescriptionText
                        dangerouslySetInnerHTML={{
                          __html: item?.description,
                        }}
                      />
                    </Box>
                  )}

                  {item?.headingLevel === "one" ||
                  item?.headingLevel === "two" ? (
                    <>
                      <HeadingLevel
                        isMobile={isMobile}
                        onClick={() => handler(item?.subTitle)}
                        dangerouslySetInnerHTML={{ __html: item?.subTitle }}
                      />
                    </>
                  ) : (
                    <>
                      {(!item?.showEmbed ||
                        (item?.showEmbed && item?.embedText)) &&
                        embedTextGrid(item)}
                      {textGrid(item)}
                    </>
                  )}
                </ContentGrid>
              </li>
            );
          })}
        </ol>
      </Box>
    </>
  );
};
export default SocialBlog;
