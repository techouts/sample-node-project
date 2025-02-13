import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DemoSchema from "../../../schemas/SearchCardScm";
import {
  CategoryImage,
  GridOuterContainer,
  SearchBoxContents,
} from "./SearchCarouselStyle";

import Carousel from "../../../HOC/Carousel/Carousel2";
import { ReplaceImage } from "../../../utility/ReplaceImage";

export default function SearchCardData({ items }: DemoSchema) {
  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 600,
    initialSlide: 0,
    slidesToShow: 2,
    slidesToScroll: 0,
    swipeToSlide: false,

    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container>
          <Carousel
            Component={SearchTrending}
            items={items}
            settings={settings}
            isVertical={false}
          />
        </Grid>
      </Box>
    </>
  );
}

const SearchTrending = (item: any) => {
  return (
    <>
      <SearchBoxContents>
        <GridOuterContainer>
          <CategoryImage
            src={`${ReplaceImage(item.imageUrl)}`}
            alt="Not Found"
          />
          <Grid
            style={{
              textAlign: "center",
              fontSize: "12px",
              marginTop: "10%",
            }}
          >
            {item.imgT}
          </Grid>
        </GridOuterContainer>
      </SearchBoxContents>
    </>
  );
};
