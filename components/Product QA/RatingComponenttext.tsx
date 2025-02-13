import React, { useState, useEffect } from "react";
import { useMobileCheck } from "../../utility/isMobile";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Typographycomment,
  BorderLinearProgress,
  RatingReview,
  Multiimages,
} from "./RatingComponentStyle";
import Avatar from "@mui/material/Avatar";
import {
  PostBox,
  QueryBox,
  LikedBox,
  TypographyTitle,
  TypographyUser,
  TypographyName,
  TypographyOverall,
  Typographytext,
  Typographyreview,
  GridReview,
  BoxRating,
  Gridtemp,
  BoxStyle,
  Ratingdata,
  TypographyNumber,
  GridRating,
  Spantext,
  BoxImages,
} from "./RatingComponentStyle";
import ReviewComponentCard from "../ReviewComponent/ReviewComponentCard";
import { AddReviewLikesMutation } from "../../graphQLQueries/ProductQuery";
import client from "../../apollo-client";
import { Cookies } from "react-cookie";
import SignInComponent from "../SigninComponent/SignInComponent";
import { BootstrapDialog } from "../SigninComponent/SignInStyled";
import Loader from "../../HOC/Loader/Loader";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import ReviewImage from "./ReviewImages";
import BasicModal from "../../HOC/Modal/ModalBlock";
import StarIcon from "@mui/icons-material/Star";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  FILLED_TICK_CIRLE_ICON,
  LIKE_ICONS,
  UNLIKE_ICONS,
} from "../../utility/AppIcons";
const ReviewData = require("../../JSON/ReviewCardData.json");
import { toast } from "../../utility/Toast";
import handleErrorResponse from "../../utility/ErrorHandling";

const RatingComponenttext = (props: any) => {
  const { productDataItem, sortedReviews, setSortValue, setPage } = props;
  const [reRender, setReRender] = useState(false);
  const [sortedreviewdata, setSortedreviewdata] = useState(
    sortedReviews && JSON.parse(JSON.stringify(sortedReviews))
  );
  const [starRating, setStartRating] = useState<any>();

  useEffect(() => {
    sortedReviews &&
      setSortedreviewdata(JSON.parse(JSON.stringify(sortedReviews)));
  }, [sortedReviews]);
  useEffect(() => {
    setCustomerID(userDataItems ? userDataItems?.customerName : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender]);
  const list = [
    { label: "Top Reviews", value: { top_reviews: "DESC" } },
    { label: "Most Recent", value: { created_at: "DESC" } },
  ];
  const [selectedOption, setSelectedOption] = useState("Top Reviews");
  const isMobile = useMobileCheck();
  const [poductItems, setProductDataItem] = useState(productDataItem);
  const [openReviewTab, setReviewTab] = useState(false);
  const [showLoader, setLoader] = useState(false);
  const [isLikee, setIsLikee] = useState(false);
  const [value, setValue] = useState<number>(0);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [data, setData] = useState();
  const [handleClose, setHandleClose] = useState(false);
  const [reviewsData, setReviewsData] = useState(
    productDataItem?.items?.[0]?.reviews?.items
  );
  const cookie = new Cookies();
  useEffect(() => {
    setReviewsData(poductItems?.items?.[0]?.reviews?.items);
  }, [poductItems]);
  useEffect(() => {
    productDataItem &&
      productDataItem?.items?.[0]?.review_stars &&
      setStartRating(
        Object.entries(
          JSON.parse(productDataItem?.items?.[0]?.review_stars)
        )?.reverse()
      );
  }, [productDataItem]);
  const [more, setMore] = useState(false);
  const [selectedIndex, setSeletedIndex] = useState(-1);
  const handleMore = (index: number) => {
    setSeletedIndex(index);
    setMore(!more);
  };
  let sum_of_rating = 0;
  reviewsData?.map((count: any) => {
    sum_of_rating =
      Number(sum_of_rating) + Number(count?.ratings_breakdown?.[0]?.value);
  });
  let ratingPercentage = [];
  for (let i = 1; i <= 5; i++) {
    let star = reviewsData?.filter((count: any) => {
      return count?.ratings_breakdown?.[0]?.value === `${i}`;
    });
    let count = (star?.length * 100) / sum_of_rating;
    ratingPercentage.push({
      value: i,
      percentage: count ? count?.toFixed(1) : 0,
    });
  }
  const [CustomerID, setCustomerID] = useState(
    userDataItems ? userDataItems?.customerName : null
  );
  const [signInOpen, setSignInOpen] = useState(false);
  const handleClosed = () => {
    setSignInOpen(false);
  };
  const reviewClick = () => {
    if (cookie.get("accessToken")) {
      setReviewTab(!openReviewTab);
      setValue(0);
    } else {
      setSignInOpen(true);
    }
  };
  const handleReviewLike = (review: any) => {
    setLoader(true);
    client
      .mutate({
        mutation: AddReviewLikesMutation,
        variables: {
          review_id: review?.review_id,
        },
      })
      .then((response: any) => {
     
        let reviewsList =
          reviewsData && JSON.parse(JSON.stringify(reviewsData));
        sortedreviewdata?.map((data: any) => {
          if (data?.review_id == review?.review_id) {
            data["review_likes_count"] = data.review_likes_count + 1;
            data["isLiked"] = true;
            setIsLikee(true);
          }
        });
        setSortedreviewdata(sortedreviewdata);
        setReviewsData([...reviewsList]);
      })
      .catch((error: any) =>{ 
        toast.error("Someting went wrong, Please try again!!!");
        console.log(error)})
      .finally(() => setLoader(false));
  };
  const reviewImageOpen = (index: number) => {
    setHandleClose(true);
    setData(sortedreviewdata[index]);
  };
  const UNLIKE_ICON = AppIcons(UNLIKE_ICONS);
  const LIKE_ICON = AppIcons(LIKE_ICONS);
  const Filled_tick_circle = AppIcons(FILLED_TICK_CIRLE_ICON);
  const ratingSummary = () => {
    if (productDataItem?.items[0]?.rating_summary) {
      if (productDataItem?.items[0]?.rating_summary != 0) {
        return parseFloat(productDataItem?.items[0]?.rating_summary).toFixed(1)
      } else {
        return 0
      }
    } else {
      return 1
    }
  }
  return (
    <Box
      pl={isMobile ? "12px" : "4.5vw"}
      sx={{ paddingBottom: "10px", width: "100%" }}

    >
      {showLoader && <Loader />}
      {productDataItem?.items?.[0]?.review_count > 0 && (
        <Grid container spacing={1} xs={12} sx={{ width: "100%" }}>
          <GridRating
            isMobile={isMobile}
            item
            sm={12}
            md={4.2}
            xs={12}
            pr={isMobile ? 0.5 : 0}
          >
            <Stack
              sx={{
                flexDirection: { xs: "column-reverse", sm: "row" },
                alignItems: { sm: "flex-start" },
              }}
            >
              <Box
                sx={{
                  display: isMobile ? "flex" : "",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5Px",
                }}
                pt={isMobile ? 0 : 2}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <TypographyOverall
                    isMobile={isMobile}
                    mt={{ xs: 0, sm: 0, md: "23px" }}
                    sx={{
                      fontSize: {
                        lg: 50,
                        md: 40,
                        sm: 30,
                        xs: 14,
                      },
                    }}
                  >
                    {ratingSummary()}
                  </TypographyOverall>
                  <TypographyNumber
                    mt={{ xs: "15px", sm: 0, md: "30px" }}
                    isMobile={isMobile}
                  >
                    / 5
                  </TypographyNumber>
                </Box>
                <Box sx={{ paddingTop: "3px" }}>
                  <Ratingdata
                    sx={{
                      gap: {
                        lg: 1.5,
                        md: 0.5,
                        sm: 1,
                        xs: 0.5,
                      },
                    }}
                    isMobile={isMobile}
                    precision={0.1}
                    defaultValue={productDataItem?.items[0]?.rating_summary}
                    readOnly
                    emptyIcon={<StarIcon style={{ color: "#EAE9EF" }} />}
                  ></Ratingdata>
                </Box>
              </Box>
              <BoxStyle
                isMobile={isMobile}
                pt={isMobile ? 0 : 2.5}
                pl={isMobile ? 0 : 3}
                width="100%"
                alignItems="center"
                sx={{
                  display: {
                    md: "flex",
                  },
                  paddingRight: {
                    sm: "28px",
                    md: "0px",
                  },
                }}
              >
                <Stack
                  sx={{ justifyContent: "space-between" }}
                  direction={{
                    lg: "column",
                    md: "column",
                    sm: "row",
                    xs: "row",
                  }}
                >
                  <Box>
                    <Typographytext
                      sx={{
                        fontSize: {
                          lg: 22,
                          md: 16,
                          sm: 16,
                          xs: 12,
                        },
                      }}
                      isMobile={isMobile}
                    >
                      Overall Ratings
                    </Typographytext>
                    <Typographyreview
                      sx={{
                        fontSize: {
                          lg: 16,
                          md: 14,
                          sm: 14,
                          xs: 12,
                        },
                      }}
                      isMobile={isMobile}
                    >
                      ({productDataItem?.items?.[0]?.review_count} reviews)
                    </Typographyreview>
                  </Box>
                  <Button
                    onClick={reviewClick}
                    sx={{
                      backgroundColor: "#FFFFFF",
                      marginTop: { xs: "0px", sm: "0px", md: "10px" },
                      borderRadius: "0px",
                      padding: isMobile
                        ? "6.19px 28px 5.8px 29px"
                        : "15px 17px 16px 17px",
                      border: "1px solid #DEA3B7",
                      "&:hover": {
                        borderColor: "#DEA3B7",
                      },
                    }}
                    variant="outlined"
                  >
                    {<Spantext isMobile={isMobile}> WRITE A REVIEW </Spantext>}
                  </Button>
                </Stack>
              </BoxStyle>
            </Stack>
          </GridRating>
          <Gridtemp isMobile={isMobile} item sm={7} md={5.3} xs={12} pr={1}>
            {starRating?.map((rating: any, index: number) => (
              <>
                <BoxRating isMobile={isMobile}>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    {rating[0]} stars
                  </Typography>
                  <Box
                    sx={{ width: isMobile ? "550%" : "100%", height: "50%" }}
                  >
                    <BorderLinearProgress
                      variant="determinate"
                      value={rating[1]}
                    />
                  </Box>
                  <Box width="100%">
                    <Typography>{Math?.floor(rating[1])}%</Typography>
                  </Box>
                </BoxRating>
              </>
            ))}
          </Gridtemp>
          <GridReview
            isMobile={isMobile}
            item
            sm={5}
            md={2.5}
            xs={12}
            mt={isMobile ? 3 : 0}
            pr={isMobile ? 1 : 3.5}
          >
            <Box>
              <Select
                displayEmpty
                value={selectedOption}
                sx={{
                  m: 1,
                  minWidth: "100%",
                  background: "#FFFFFF",
                  border: "none",
                  variant: "outlined",
                  borderRadius: "0px",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
                aria-controls="panel1a-content"
                id="panel1a-header"
                inputProps={{ "aria-label": "Without label" }}
              >
                {list.map((data, index) => {
                  const uniqueIndexValue = index
                  return (
                    <MenuItem
                      onClick={() => {
                        setSelectedOption(data?.label);
                        setSortValue(data?.value);
                        setPage(1);
                      }}
                      sx={{ cursor: "pointer" }}
                      value={data?.label}
                      key={uniqueIndexValue}
                    >
                      {data?.label}
                    </MenuItem>);
                })}
              </Select>
            </Box>
          </GridReview>
        </Grid>
      )}
      <ReviewComponentCard
        openReviewTab={openReviewTab}
        setValue={setValue}
        value={value}
        setReviewTab={setReviewTab}
        componentData={ReviewData}
        productDataItem={productDataItem}
        productName={productDataItem?.items?.[0]?.name}
        closeReviewTab={reviewClick}
        sortedreviewdata={sortedreviewdata}
      />
      <Grid pt={isMobile ? 0 : 3} xs={12} pr={{ xs: 1.5, sm: 12, md: 20 }}>
        {sortedreviewdata?.map((item: any, index: any) => {
          let mydate = new Date(item?.created_at);
          const dateString = `Posted on ${mydate.toLocaleString("default", {
            month: "long",
          })} ${mydate.getDate()}, ${mydate.getFullYear()}`;
          return (
            <>
              <Grid container spacing={1} xs={12} sx={{ marginTop: "20px" }}>
                <Grid
                  item
                  md={4.2}
                  xs={12}
                  sx={{ display: "flex", gap: "12px" }}
                >
                  <Box>
                    <Avatar
                      sx={{
                        width: isMobile ? 40 : 76,
                        height: isMobile ? 40 : 76,
                      }}
                      src={item?.customer_image}
                      alt="profile pic"
                    />
                  </Box>
                  <Box>
                    <TypographyName isMobile={isMobile}>
                      {item?.nickname}
                    </TypographyName>
                    <RatingReview
                      readOnly
                      emptyIcon={
                        <StarIcon
                          style={{ color: "#A7A5A6", fontSize: "inherit" }}
                        />
                      }
                      style={{ fontSize: "20px" }}
                      value={item?.rating_value}
                    ></RatingReview>

                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <img
                        src={`${ReplaceImage(Filled_tick_circle?.url)}`}
                        alt="verified buyer"
                      />
                      <TypographyUser isMobile={isMobile}>
                        Verified Buyer
                      </TypographyUser>
                    </Box>

                  </Box>
                </Grid>
                <Grid item md={7.8} xs={12} ml={{ xs: 7, sm: 11, md: 0 }}>
                  <TypographyTitle isMobile={isMobile}>
                    {item?.title}
                  </TypographyTitle>
                  <Box width={isMobile ? "100%" : "70%"}>
                    <Typographycomment isMobile={isMobile}>
                      {item?.detail?.length > 100 ? (
                        <>
                          {index == selectedIndex && more
                            ? item?.detail
                            : `${item?.detail?.substring(0, 150)}`}
                          <Typography
                            component="span"
                            sx={{
                              color: "#000",
                              fontSize: isMobile ? "10px" : "16px",
                            }}
                            onClick={() => handleMore(index)}
                          >
                            {index == selectedIndex && more
                              ? " less"
                              : " ...more"}
                          </Typography>
                        </>
                      ) : (
                        `${item?.detail}`
                      )}
                    </Typographycomment>
                  </Box>
                  <BoxImages isMobile={isMobile}>
                    {item?.review_images?.map((items: any) => (
                      <>
                        <Multiimages
                          style={{ cursor: "pointer" }}
                          isMobile={isMobile}
                          src={items}
                          alt=""
                          onClick={() => reviewImageOpen(index)}
                        ></Multiimages>
                      </>
                    ))}
                  </BoxImages>
                  <PostBox
                    isMobile={isMobile}
                    style={{ alignItems: isMobile ? "flex-end" : "" }}
                  >
                    <Typography
                      style={{ fontSize: isMobile ? "14px" : "10px" }}
                    >
                      {dateString}
                    </Typography>
                    <QueryBox isMobile={isMobile}>
                      <Typography
                        style={{
                          color: "#4F4C4D",
                          fontSize: isMobile ? "10px" : "14px",
                        }}
                      >
                        Was this review Helpful?
                      </Typography>
                      <LikedBox>
                        {item?.isLiked ? (
                          <img
                            src={`${ReplaceImage(LIKE_ICON?.url)}`}
                            alt="unliked"
                            width={isMobile ? "11px" : "13px"}
                          />
                        ) : (
                          <img
                            src={`${ReplaceImage(UNLIKE_ICON?.url)}`}
                            alt="unliked"
                            width={isMobile ? "11px" : "13px"}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleReviewLike(item)}
                          />
                        )}
                        <Typography
                          style={{
                            fontSize: "14px",
                            color: "#000000",
                            lineHeight: "16.5px",
                          }}
                        >
                          {item?.review_likes_count}
                        </Typography>
                      </LikedBox>
                    </QueryBox>
                  </PostBox>
                </Grid>
              </Grid>
              {index + 1 < sortedreviewdata.length && (
                <Divider sx={{ pt: isMobile ? 2 : 4, pb: 2 }} />
              )}
            </>
          );
        })}
      </Grid>
      {handleClose && (
        <BasicModal
          width={isMobile ? "100%" : "80%"}
          height={isMobile ? "100%" : "80%"}
          left="50%"
          top="50%"
          handleClose={setHandleClose}
          open={true}
          overflowData={"auto"}
          toggle={isMobile ? false : true}
          Component={
            <ReviewImage
              sortedreviewdata={data}
              setHandleClose={setHandleClose}
              handleClose={handleClose}
            />
          }
        />
      )}
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={signInOpen}
        fullScreen
        onClose={handleClosed}
      >
        <SignInComponent
          handleClosed={handleClosed}
          initialScreen={true}
          setCustomerID={setCustomerID}
          setReRender={setReRender}
          setLoader={setLoader}
        />
      </BootstrapDialog>
    </Box>
  );
};
export default RatingComponenttext;
