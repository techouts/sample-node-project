import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Carousel from "../../HOC/Carousel/Carousel2";
import FragranceStoreSchema, {
  LIST_ITEM,
} from "../../schemas/FragranceStoreSchema";
import {
  CustomPrevArrow,
  CustomNextArrow,
} from "../ShopByCollection/CustomArrows";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  PcTitle,
  Price,
  PriceSO,
  Off,
  PriceBox,
  Avail,
  AvailFs,
  StyledButton,
  StyledListItem,
  StyledList,
  StyledImgItem,
  TopTextStyle,
  FragranceHeading,
  FragranceBg,
  ButtonTypography,
  ImageBox,
  Dividers,
  Mrp,
  RateBox,
  RateNo,
  ProCard,
  FavoriteBox,
} from "./FragranceStoreStyled";
import { ReplaceImage } from "../../utility/ReplaceImage";

const FragranceStore = (FragranceStoreData: FragranceStoreSchema) => {
  const { listItems, title, subTitle } = FragranceStoreData;

  const userSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <FragranceBg>
        <Dividers
          sx={{
            "&.MuiDivider-root": {
              "&::before": {
                borderTop: `thin solid`,
              },
              "&::after": {
                borderTop: `thin solid`,
              },
            },
          }}
        >
          <FragranceHeading>FRAGRANCE STORE</FragranceHeading>
        </Dividers>
        <FragranceHeading>{subTitle}</FragranceHeading>
        <Carousel
          Component={ProductCard}
          items={listItems}
          settings={userSettings}
        />
      </FragranceBg>
    </React.Fragment>
  );
};
const ProductCard = ({
  backgroundImage,
  productTitle,
  sizeAvail,
  price,
  oldPrice,
  discount,
  freeAvail,
  topTags,
}: LIST_ITEM) => {
  const [isMobile, setIsmobile] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    setIsmobile(!matches);
  }, [matches]);

  return (
    <React.Fragment>
      <ProCard >
        <Card sx={{ maxWidth: "304px" }} variant="outlined" square>
          <Box m={2}>
            <Box>
              <StyledList>
                <FavoriteBox>
                  <FavoriteBorderIcon />
                </FavoriteBox>
                <Stack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ md: 1 }}
                >
                  {topTags?.map((tag: any, index: number) => (
                    <StyledListItem key={index}>
                      {tag?.istagTitle && (
                        <>
                          <StyledImgItem
                            src={`${ReplaceImage(tag?.logo)}` || tag?.logo}
                            alt="logo loading..."
                          />
                          <TopTextStyle color={tag?.textColor}>
                            {tag.tagTitle}
                          </TopTextStyle>
                        </>
                      )}
                    </StyledListItem>
                  ))}
                </Stack>
              </StyledList>
            </Box>
            <ImageBox>
              <img
                src={`${ReplaceImage(backgroundImage)}` || backgroundImage}
                alt="image loading..."
              />
            </ImageBox>

            <RateBox>
              <Rating defaultValue={1} max={1} size="small" />
              <RateNo>4.3</RateNo>
            </RateBox>

            <PcTitle>{productTitle}</PcTitle>

            <Avail>{`${sizeAvail} Sizes Available`}</Avail>
            <Box>
              <PriceBox>
                <Mrp>MRP:</Mrp>
                <Price>{price}</Price>
                <PriceSO>{oldPrice}</PriceSO>
                <Off>{discount}</Off>
              </PriceBox>
            </Box>

            <AvailFs>{freeAvail}</AvailFs>
          </Box>
          <Grid container direction={isMobile ? "column" : "row"}>
            <Grid item xs>
              <StyledButton variant="outlined">
                <ButtonTypography color="#DEA3B7">ADD TO CART</ButtonTypography>
              </StyledButton>
            </Grid>
            <Grid item xs>
              <StyledButton sx={{ backgroundColor: "#DEA3B7" }}>
                <ButtonTypography>BUY NOW</ButtonTypography>
              </StyledButton>
            </Grid>
          </Grid>
        </Card>
      </ProCard>
    </React.Fragment>
  );
};
export default FragranceStore;
