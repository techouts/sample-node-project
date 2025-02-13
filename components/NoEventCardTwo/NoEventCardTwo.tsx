import React from "react";
import { useMobileCheck } from "../../utility/isMobile";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  ImageOverTitle,
  TotalCard,
  CardTitle,
  DateSubtitle,
  SingleImageBox,
  SingleImageUnderContentBox,
} from "./NoEventCardTwoStyle";
import NoEventCardTwoSchema from "./NoEventCardTwoSchema";

const NoEventCardTwo = ({
  title,
  bgColor,
  bgPadding,
  items,
}: NoEventCardTwoSchema) => {
  const isMobile = useMobileCheck();
  return (
    <>
      <Box bgcolor={bgColor} p={bgPadding} style={{ textAlign: "center" }}>
        {title && <CardTitle>{title}</CardTitle>}
        {items && (
          <TotalCard container sx={{ gridGap: "18px", width: "100%" }}>
            {items?.map((eachItem) => (
              <Grid
                item
                xs={12}
                sm={5.9}
                md={5.9}
                lg={5.9}
                xl={5.9}
                width="100%"
                key={eachItem.boxText}
              >
                <SingleImageBox>
                  <img
                    src={isMobile ? eachItem.imgUrlMobile : eachItem.imgUrl}
                    alt="Main Card Image"
                    width="100%"
                  />
                  {eachItem.stripText && (
                    <ImageOverTitle>{eachItem.stripText}</ImageOverTitle>
                  )}
                  <SingleImageUnderContentBox>
                    {eachItem.boxText && (
                      <DateSubtitle>{eachItem.boxText}</DateSubtitle>
                    )}
                    {eachItem.boxSubText && (
                      <DateSubtitle>{eachItem.boxSubText}</DateSubtitle>
                    )}
                  </SingleImageUnderContentBox>
                </SingleImageBox>
              </Grid>
            ))}
          </TotalCard>
        )}
      </Box>
    </>
  );
};

export default NoEventCardTwo;
