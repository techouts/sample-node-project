import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MoreOffersSchema from "../../schemas/MoreOffersSchema";
import {
  StyledGrid,
  ImageContainer,
  BlockGrid,
  Offertext,
  BorderBox,
  Border,
  BrandSize,
} from "./MoreOffersStyles";
import Title from "../../HOC/Title/Title";
import { ReplaceImage } from "../../utility/ReplaceImage";
const MoreOffers = ({ data }: MoreOffersSchema) => {
  return (
    <>
      <Title interface={data} />
      <Grid container spacing={3} p={2} aria-label="parent-grid">
        {data?.items?.map((item: any, index: any) => (
          <StyledGrid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            aria-label="styled"
            key={index}
          >
            <BorderBox>
              <Border></Border>
            </BorderBox>
            <ImageContainer
              src={`${ReplaceImage(item?.imageUrl)}`}
              alt={item?.offerText}
            ></ImageContainer>
            <Grid container>
              <BlockGrid>
                <Offertext>
                  <Typography variant="body1">
                    <BrandSize>{item?.offerText}</BrandSize>
                  </Typography>
                  <Typography variant="subtitle1" component="span">
                    {item?.smallText}
                  </Typography>
                </Offertext>
              </BlockGrid>
            </Grid>
          </StyledGrid>
        ))}
      </Grid>
    </>
  );
};
export default MoreOffers;
