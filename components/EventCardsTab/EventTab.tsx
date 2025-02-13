import React from "react";
import { useRouter } from "next/router";
import { useMobileCheck } from "../../utility/isMobile";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  ContentTitle,
  ImageContainer,
  EventDetailsTitle,
  EventDetailsItem,
  LocationText,
  RegisterBtn,
  ImageStyle,
  EventsNotFoundCard,
  EventsNotFoundTitle,
  EventsNotFoundSubtitle,
} from "./EventStyles";
import EventCardSchema from "./EventCardSchema";
import triggerGAEvent from "../../utility/GaEvents";
import { Widget_type } from "../../utility/GAConstants";

const EventTab = ({
  bgPadding,
  bgColor,
  items,
  noEventTitle,
  noEventSubTitle,
  imgUrl,
  id,
  __component,
  position,
}: EventCardSchema) => {
  const isMobile = useMobileCheck();
  const router = useRouter();

  const ContentDescription = styled("p")(() => ({
    fontSize: isMobile ? "12px" : "16px",
    lineHeight: "24px",
    color: "#231F20",
    fontFamily: "Montserrat",
    marginBlockStart: 0,
    marginBlockEnd: 0,
    "& > p": {
      marginBlockStart: "0.5em",
      marginBlockEnd: "0.5em",
    },
  }));

  //RegisterNow event
  const callEvent = (
    title: string,
    description: string,
    Btn: string,
    price: string,
    index: number
  ) => {
    triggerGAEvent(
      {
        item_name: title,
        item_id: `${__component}_${position}_${index}`,
        component_id: id,
        event_type: "filter",
        widget_type: Widget_type,
        item_type: "na",
        widget_title: __component,
        widget_description: description,
        widget_position: 2,
        link_url: window?.location?.href,
        link_text: Btn,
        no_of_items: 1,
        index: index,
        item_price: price,
      },
      "click"
    );
  };

  return (
    <>
      {items.length > 0 ? (
        <>
          <Box p={bgPadding} bgcolor={bgColor}>
            {items?.map((eachItem: any, index: number) => (
              <Grid
                container
                sx={{
                  border: "1px solid #A7A5A6",
                  padding: isMobile ? "25px" : "36px",
                  marginBottom: isMobile ? "25px" : "36px",
                }}
                key={eachItem?.title}
              >
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <ImageContainer
                    src={isMobile ? eachItem?.imgUrlMobile : eachItem?.imgUrl}
                    alt="Card Main Image"
                    width="100%"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    paddingLeft: isMobile ? "0px" : "36px",
                    rowGap: isMobile ? "10px" : "0x",
                  }}
                >
                  <Box>
                    <ContentTitle>{eachItem?.title}</ContentTitle>
                    {eachItem?.description && (
                      <ContentDescription
                        dangerouslySetInnerHTML={{
                          __html: eachItem?.description,
                        }}
                      ></ContentDescription>
                    )}
                  </Box>
                  <Box>
                    <EventDetailsTitle>
                      {eachItem?.eventDetailsTitle}
                    </EventDetailsTitle>
                    <EventDetailsItem
                      dangerouslySetInnerHTML={{ __html: eachItem?.date }}
                    ></EventDetailsItem>
                    <EventDetailsItem
                      dangerouslySetInnerHTML={{ __html: eachItem?.time }}
                    ></EventDetailsItem>
                    <EventDetailsItem
                      dangerouslySetInnerHTML={{ __html: eachItem?.price }}
                    ></EventDetailsItem>
                    <LocationText
                      dangerouslySetInnerHTML={{ __html: eachItem?.location }}
                    ></LocationText>
                  </Box>
                  <Box>
                    {eachItem?.registerBtnPath && (
                      <RegisterBtn
                        onClick={() => {
                          router?.push(eachItem?.registerBtnPath);
                          callEvent(
                            eachItem?.title,
                            eachItem?.description,
                            eachItem?.registerBtn,
                            eachItem?.price,
                            index
                          );
                        }}
                      >
                        {eachItem?.registerBtn}
                      </RegisterBtn>
                    )}
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Box>
        </>
      ) : (
        <>
          <Box p={bgPadding} bgcolor={bgColor}>
            <EventsNotFoundCard>
              <EventsNotFoundTitle>{noEventTitle}</EventsNotFoundTitle>
              <EventsNotFoundSubtitle>{noEventSubTitle}</EventsNotFoundSubtitle>
              <ImageStyle src={imgUrl} alt="Events Not Found" />
            </EventsNotFoundCard>
          </Box>
        </>
      )}
    </>
  );
};

export default EventTab;
