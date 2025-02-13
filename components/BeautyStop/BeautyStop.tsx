import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useRef } from "react";
import BeautyStopInterface from "../../schemas/BeautyStopSchema";
import Title from "../../HOC/Title/Title";
import { useMobileCheck } from "../../utility/isMobile";
import {
  CeGrid,
  ImgsCard,
  StyledButton,
  AlTypography,
  BCardContent,
  ButtonBox,
  ContentTag,
  STypography,
  MTypography,
  PTypography,
  FirstStack,
  RightGrid,
  RGrid,
  CardBox,
  RightStack,
  OverlappedImage,
} from "../BeautyStop/style";
import { widget_type, event_type } from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import { ReplaceImage } from "../../utility/ReplaceImage";
import triggerGAEvent from "../../utility/GaEvents";
import { viewArray } from "../../utility/ViewEvenItemArray";
const BeautyStop = ({
  bgPadding,
  title,
  imageUrl,
  subText,
  items,
  cardTitle,
  cardDescription,
  buttonText,
  buttonPath,
  position,
  id,
  __component,
}: BeautyStopInterface) => {
  const viewEventWrapper = useRef();
  let blogHome = false;
  const subItemsLength = 1;
  if (typeof window != "undefined") {
    blogHome = window.location.pathname.includes("blog");
  }

  const dataLayer = {
    item_id: "na",
    item_name: "na",
    component_id: id,
    widget_type: widget_type,
    item_type: "na",
    widget_title: __component,
    widget_description: subText,
    widget_postion: position,
    no_of_items: items?.length,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na ",
    event_type: event_type,
    index: position,
    view_items: viewArray(items, `${__component}_${position}_`),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");
  const isMobile = useMobileCheck();

  const handleClick = (item: any, index: number, linktext: string) => {
    triggerGAEvent(
      {
        item_name: items[0]?.Item_name ? items[0]?.Item_name : "na",
        item_id: `${__component}_${position}_${index + 1}`,
        component_id: id,
        widget_type: widget_type,
        item_type: items[0]?.Item_type ? items[0]?.Item_type : "na",
        widget_title: __component,
        widget_description: item?.subText,
        widget_postion: position + 1,
        link_url: `${global?.window?.location.origin}${buttonPath}` || "na",
        link_text: linktext,
        no_of_items: subItemsLength,
        index: index + 1,
        item_brand: "na",
        item_category: "na",
        item_orginal_price: 0,
        item_price: 0,
        item_rating: "na",
        event_type: event_type,
      },
      "click"
    );

    isMobile ? window.location.assign(item?.path) : window.open(item?.path);
  };

  const gaTriggerReadmore = (linktext: string, url: string) => {
    triggerGAEvent(
      {
        widget_type: widget_type,
        component_id: id,
        widget_title: __component,
        widget_description: cardDescription,
        widget_postion: position + 1,
        no_of_items: 1,
        item_brand: "na",
        item_category: "na",
        item_image_link: imageUrl,
        item_category2: "na",
        item_category3: "na",
        link_text: linktext,
        link_url: `${global?.window?.location.origin}${url}`,
      },
      "view_all"
    );
  };
  return (
    <>
      <Grid
        container
        p={isMobile ? "0 16px" : bgPadding}
        sx={{
          px: { xl: "13%", lg: "10%", md: "7%", sm: "7%" },
          paddingTop: isMobile ? "12px" : "20px",
          paddingBottom: isMobile ? "12px" : "20px",
        }}
      >
        <CeGrid item xs={12} sm={12} md={12} lg={12}>
          {title && (
            <Box
              sx={{
                paddingTop: isMobile ? "2px" : "4px",
                paddingBottom: isMobile ? "8px" : "24px",
              }}
            >
              <Title interface={{ title: title }} />
            </Box>
          )}
          {subText && (
            <Box
              ref={viewEventWrapper}
              sx={{
                margin: "auto",
                width: { xs: "90%", sm: "75%", md: "75%", lg: "50%" },
              }}
            >
              <AlTypography>{subText}</AlTypography>
            </Box>
          )}
        </CeGrid>
        <Grid container mt={2}>
          <Grid
            bgcolor={"#F3F3F3"}
            item
            xs={12}
            sm={12}
            md={5.4}
            lg={5.4}
            aria-label="left-section"
          >
            <ImgsCard $isBlog={blogHome}>
              <CardMedia
                component="img"
                image={`${ReplaceImage(imageUrl)}`}
                alt="mImage"
                width="100%"
              ></CardMedia>
              <CardBox>
                <BCardContent sx={{ fontSize: { xs: 14, sm: 16, md: 20 } }}>
                  {cardTitle}
                </BCardContent>
                <STypography
                  variant="body2"
                  sx={{ padding: "2% 11% 2% 3%", width: "100%" }}
                >
                  {cardDescription}
                </STypography>
                <ButtonBox
                  onClick={() => [
                    gaTriggerReadmore(buttonText, buttonPath),
                    window.location.assign(buttonPath),
                  ]}
                  sx={{
                    display: { sm: "flex", md: "none" },
                    justifyContent: { sm: "center", md: "left" },
                  }}
                  mb={2}
                >
                  {buttonText && (
                    <StyledButton
                      isMobile={isMobile}
                    >
                      {buttonText}
                    </StyledButton>
                  )}
                </ButtonBox>
              </CardBox>
            </ImgsCard>
          </Grid>
          {/* right content */}
          <RGrid
            item
            xs={12}
            sm={12}
            md={6.6}
            lg={6.6}
            aria-label="right-section"
          >
            <Box
              ml={{ xs: 0, sm: 0, md: 2, lg: 2 }}
              pt={{ xs: "3%", sm: "0%" }}
            >
              <RightStack
                direction={{ sm: "row", md: "column" }}
                gap={{ sm: "2%" }}
                rowGap={{ md: "20px" }}
                pt={{ sm: "3%", md: "0%" }}
              >
                {items?.slice(0, isMobile ? 2 : 3)?.map((item, index) => (
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={12}
                    lg={12}
                    key={index}
                    marginTop={{ sm: "0px !important" }}
                  >
                    <FirstStack
                      direction={{ md: "row" }}
                      spacing={2}
                      key={index}
                    >
                      <Grid md={6} lg={6} display="flex">
                        <OverlappedImage
                          onClick={() => handleClick(item, index, item?.title)}
                          src={`${ReplaceImage(item?.imageUrl)}`}
                          alt="OverlappedImage"
                        />
                      </Grid>
                      <RightGrid pt={{ sm: "6%", md: "0%" }}>
                        <ContentTag variant="body2" py={0.5}>
                          {item?.contentType}
                        </ContentTag>
                        <Box
                          pt={1}
                          sx={{
                            padding: isMobile ? "10px 0px" : "",
                            lineHeight: "18px",
                          }}
                        >
                          <PTypography
                            variant="subtitle2"
                            sx={{
                              fontSize: {
                                lg: 16,
                                md: 14,
                                sm: 12,
                              },
                              lineHeight: "120%",
                              width: { md: "100%", lg: "75%" },
                            }}
                          >
                            {item?.title}
                          </PTypography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: isMobile ? "0px" : "10px 0",
                          }}
                        >
                          <MTypography
                            $isBlog={blogHome}
                            variant="body2"
                            sx={{
                              fontSize: {
                                lg: 12,
                                md: 11,
                                sm: 10,
                              },
                              width: { md: "100%", lg: "80%" },
                            }}
                          >
                            {item?.subText}
                          </MTypography>
                        </Box>
                      </RightGrid>
                    </FirstStack>
                  </Grid>
                ))}
              </RightStack>
            </Box>
          </RGrid>
        </Grid>
        <ButtonBox
          onClick={() => [
            gaTriggerReadmore(buttonText, buttonPath),
            window.location.assign(buttonPath),
          ]}
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
            justifyContent: { sm: "center", md: "left" },
          }}
          mt={1.5}
        >
          {buttonText && (
            <StyledButton isMobile={isMobile}>{buttonText}</StyledButton>
          )}
        </ButtonBox>
      </Grid>
    </>
  );
};
export default BeautyStop;
