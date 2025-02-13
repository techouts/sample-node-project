import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  SingleCard,
  StyledImage,
  SubTitle,
  Title,
  BeautyAdviceWrapper,
} from "./Styles";
import { ReplaceImage } from "../../../../../utility/ReplaceImage";
import { Event_type } from "../../../../../utility/GAConstants";
import { useRouter } from "next/router";
import triggerGAEvent from "../../../../../utility/GaEvents";

interface BeautyAdviceInterface {
  data: {
    id: number;
    bgColor: string;
    bgPadding: string;
    title: string;
    subTitle: string;
    imgUrl: string;
    path: string | URL;
  }[];
  handleMouseLeave: Function;
}

const callGaEvent = (link_text: string, item_name: string) => {
  triggerGAEvent(
    {
      widget_title: "Beauty Advivce",
      link_text: link_text,
      link_url: "",
      event_type: Event_type,
      item_name: item_name,
    },
    "menu"
  );
};

export default function BeautyAdvice({
  data,
  handleMouseLeave,
}: BeautyAdviceInterface) {
  const router = useRouter();
  return (
    <BeautyAdviceWrapper>
      <Grid container spacing={2}>
        {data?.map((item, index) => {
          return (
            <Grid item xs={4} key={index}>
              <SingleCard
                $index={index}
                onClick={() => {
                  callGaEvent(item?.title, item?.title);
                  item?.path && window.location.assign(`${window.location.origin}${item?.path}`);
                  handleMouseLeave();
                }}
              >
                <StyledImage
                  src={`${ReplaceImage(item?.imgUrl)}`}
                  alt="image"
                />
                <Box
                  sx={{
                    padding:
                      index % 2 === 0 ? "16px 0px 0px 0px" : "0px 0px 16px 0px",
                  }}
                >
                  <Title>{item?.title}</Title>
                  <SubTitle>{item?.subTitle}</SubTitle>
                </Box>
              </SingleCard>
            </Grid>
          );
        })}
      </Grid>
    </BeautyAdviceWrapper>
  );
}
