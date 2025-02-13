import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useMobileCheck } from "../../utility/isMobile";
import StarIcon from "@mui/icons-material/Star";
import {
  CustomNextArrow,
  CustomPrevArrow,
} from "../ShopByCollection/CustomArrows";
import {
  Description,
  Multiimages,
  RatingReview,
  ReviewerName,
  ReviewTitle,
  VerifiedUser,
} from "./RatingComponentStyle";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { AppIcons } from "../../utility/AppIconsConstant";
import { FILLED_TICK_CIRLE_ICON } from "../../utility/AppIcons";
import Slider from "react-slick";
import { CommonCarouselStyles } from "../../HOC/Carousel/styles";

const ReviewImage = ({ sortedreviewdata }: any) => {
  const isMobile = useMobileCheck();
  const [nextArrow, setNextArrow] = useState(
    // @ts-ignore:next-line
    sortedreviewdata?.review_images.length < 1 ? false : true
  );
  const [prevArrow, setPrevArrow] = useState(false);

  const arrowsHandler = (sliderIndex: number) => {
    setPrevArrow(sliderIndex !== 0);
    setNextArrow(sliderIndex !== sortedreviewdata?.review_images?.length - 1);
};


  const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          infinite: false,
          initialSlide: 0,
          speed: 500,
          swipeToSlide: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: (
      <CustomNextArrow
        isNext={nextArrow}
        cssData={{ width: "36px", height: "36px", right: "-45px" }}
      />
    ),
    prevArrow: (
      <CustomPrevArrow
        isPrev={prevArrow}
        cssData={{ width: "36px", height: "36px", left: "-45px" }}
      />
    ),
    afterChange: (sliderIndex: number) => arrowsHandler(sliderIndex),
  };
  const Secondsettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          infinite: false,
          initialSlide: 0,
          speed: 500,
          swipeToSlide: true,
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      }
    ],
  };
  const Filled_tick_circle = AppIcons(FILLED_TICK_CIRLE_ICON);
  const [mainSliderReference, setMainSliderReference] = useState<Slider>();
  const [bottomSliderReference, setBottomSliderReference] = useState<Slider>();

  const clickHandler = (index: number) => {
    mainSliderReference?.slickGoTo(index, true);
  };

  return (
    <Box bgcolor={isMobile ? "#161616" : "#FFFFFF"}>
      <Grid
        container
        p={isMobile ? "28px 0px" : "60px 74px"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: isMobile ? "column-reverse" : "row",
        }}
      >
        <Grid width="100%" item md={7} xs={12} sm={7} lg={7}>
          <Box>
          <CommonCarouselStyles>
            <Slider
              {...settings}
              asNavFor={bottomSliderReference}
              ref={(slider1: any) => setMainSliderReference(slider1)}
            >
              {sortedreviewdata?.review_images?.map(
                (item: any, index: number) => (
                  <Box key={index}>
                    {Boolean(item) && (
                      <Box display="flex" justifyContent="center" height="100%">
                        <img
                          width="100%"
                          src={item}
                          alt={`Product Image`}
                        />
                      </Box>
                    )}
                  </Box>
                )
              )}
            </Slider>
            </CommonCarouselStyles>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isMobile && (
                <Divider
                  variant="middle"
                  color={"#FFFFFF"}
                  sx={{
                    margin: "30px 0 40px 0",
                    width: "20%",
                    border: "3px solid #FFFFFF ",
                  }}
                />
              )}
            </Grid>
            <Slider
              {...Secondsettings}
              asNavFor={mainSliderReference}
              ref={(slider2: any) => setBottomSliderReference(slider2)}
            >
              {sortedreviewdata?.review_images?.map(
                (item: any, index: number) => (
                  <Box key={index}>
                    {Boolean(item) && (
                      <Box
                        display="flex"
                        justifyContent="center"
                        height="100%"
                        onClick={() => clickHandler(index)}
                      >
                        <img
                          width={isMobile ? "140px" : "130px"}
                           style={{ cursor:"pointer" }}
                          src={item}
                          alt={`Product Image`}
                        />
                      </Box>
                    )}
                  </Box>
                )
              )}
            </Slider>
          </Box>
        </Grid>
        <Grid item md={4} xs={12} lg={4} sm={4} sx={{ marginLeft: "28px" }}>
          <Box sx={{ display: "flex", gap: "11px" }}>
            <Box>
              <Avatar
                sx={{
                  width: isMobile ? 40 : 76,
                  height: isMobile ? 40 : 76,
                }}
                src={sortedreviewdata?.customer_image}
                alt="profile pic"
              />
            </Box>
            <Box>
              <ReviewerName>{sortedreviewdata?.nickname}</ReviewerName>
              <RatingReview
                readOnly
                emptyIcon={
                  <StarIcon style={{ color: "#A7A5A6", fontSize: "inherit" }} />
                }
                style={{ fontSize: "20px" }}
                value={sortedreviewdata?.rating_value}
              ></RatingReview>
              <Box sx={{ display: "flex" }}>
                <img
                  src={`${ReplaceImage(Filled_tick_circle?.url)}`}
                  alt="vefified icon"
                />
                <VerifiedUser>Verified Buyer</VerifiedUser>
              </Box>
              {isMobile && (
                <>
                  <ReviewTitle sx={{ marginTop: "12px" }}>
                    {sortedreviewdata?.title}
                  </ReviewTitle>
                  <Description sx={{ marginBottom: "28px" }}>
                    {sortedreviewdata?.detail}
                  </Description>
                </>
              )}
            </Box>
          </Box>
          {!isMobile && (
            <>
              <ReviewTitle sx={{ marginTop: "30px" }}>
                {sortedreviewdata?.title}
              </ReviewTitle>
              <Description>{sortedreviewdata?.detail}</Description>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
export default ReviewImage;
