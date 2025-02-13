import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  ReviewButton,
  FirstGrid,
  StyleText,
  GridOne,
  GridTwo,
  GridThree,
  GridFive,
  GridSix,
  GridSeven,
  FirstImgText,
  FirstImgGrid,
  Typo,
  Typoo,
  Typooo,
  FourTypo,
  InputTypo,
  InputTypoOne,
  AddTextGrid,
  PopupGrid,
  PopupGridOne,
  PopupGridTwo,
  PopupGridThree,
  Choosepic,
  Imgwarning,
  Crossicon,
  Addoption,
  Infoerror,
  SubmitButton,
  MaxTypography,
  ReviewTextField,
  AddPhotoGrid,
  DescriptionTextareaAutosize,
  ReviewImagesBox,
} from "./ReviewCardStyle";
import StarIcon from "@mui/icons-material/Star";
import {
  OrderRatingReview,
  RatingReview,
} from "../../graphQLQueries/ProductQuery";
import client from "../../apollo-client";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  widget_powered_by,
  widget_type,
  event_type,
} from "../../utility/GAConstants";
import { useMobileCheck } from "../../utility/isMobile";
import BasicModal from "../../HOC/Modal/ModalBlock";
import Loader from "../../HOC/Loader/Loader";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { Cookies } from "react-cookie";
import { BootstrapDialog } from "../SigninComponent/SignInStyled";
import SignInComponent from "../SigninComponent/SignInComponent";
import { SSBLogos, userState } from "../../recoilstore";
import { useRecoilState } from "recoil";
import triggerGAEvent from "../../utility/GaEvents";
import { useRouter } from "next/router";
import { PRODUCT_FALLBACK_URL } from "../../HOC/ProductCard/Constants";
import { ERROR_MESSAGE } from "../PdpCardComponent/Constants";
import { onImageError } from "../../utility/onImageError";
import { AppIcons } from "../../utility/AppIconsConstant";
import { Error_Image } from "../../utility/AppIcons";
import handleErrorResponse from "../../utility/ErrorHandling";
const ReviewComponentCard = (props: any) => {

  const isMobile = useMobileCheck();
  const {
    title,
    reviewButton,
    titleText,
    ratingTitle,
    formTitle,
    formFieldOne,
    formFieldTwo,
    addPhotoTitle,
    addPhotoSubtitle,
    photoTextOne,
    photoTextTwo,
    photoTextThree,
    submitButton,
    popupTitle,
    popupsubTitleOne,
    popupsubTitleTwo,
    popupButton,
    chooseimage,
    imagereached,
    maxphotos,
    optional,
  } = props?.componentData;
  let openReviewTab = props?.openReviewTab;
  let setReviewTab = props?.setReviewTab;
  let setValue = props?.setValue;
  let value = props?.value;
  let productSku = props?.productSku;

  const router = useRouter();
  const productId = props?.productDataItem?.items?.[0]?.sku;
  const analyticProductData = props?.productDataItem?.items?.[0];
  const [showLoader, setLoader] = useState(false);
  const [popup, setPopup] = useState(false);
  const [helpertext, setHelperText] = useState(false);
  const [reviewImages, setReviewImages] = useState([] as any);
  const [reRender, setReRender] = useState(false);
  const [fieldbox, setFieldbox] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [SSBeautyLogos, setSSBeautyLogos] = useRecoilState(SSBLogos);
  const [errorMsg, setErrorMessage] = useState("");
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [networkError, setNetworkError] = useState(false);
  const [descError, setDescError] = useState(false);
  const variantData = props?.productDataItem?.items?.[0]?.variants
    ?.filter((prod: any) => prod?.product?.color == router?.query?.colorCode)
    ?.filter((item: any) => item?.product?.size == router?.query?.size);
  const [networkErrorMessage, setNetworkErrorMessage] =
    useState("Network Error");
  const { query } = useRouter();
  const limit = 5;
  useEffect(() => {
    setSSBeautyLogos(SSBeautyLogos)
  }, [])
  const errorImage = AppIcons(Error_Image)
  const analyticUtility = () => {
    return {
      item_name: analyticProductData?.name,
      item_id: analyticProductData?.sku,
      event_type: event_type,
      widget_type: widget_type,
      item_type: analyticProductData?.__typename,
      widget_powered_by: widget_powered_by,
      widget_description: analyticProductData?.short_description?.html || "na",
      no_of_items: analyticProductData?.length || "na",
      outbound: false,
      item_category: analyticProductData?.categories?.[0]?.name,
      item_category2: analyticProductData?.categories?.[1]?.name,
      item_category3: analyticProductData?.categories?.[2]?.name,
      item_original_price:
        analyticProductData?.price_range?.minimum_price?.regular_price?.value,
      item_price: analyticProductData?.pmr_price_value?.amount?.value,
      item_rating: analyticProductData?.rating_summary,
      item_brand: analyticProductData?.brand_info,
    };
  };
  const cookie = new Cookies();
  const close_circle_pinkcolour = SSBeautyLogos?.appLogos?.find(
    (item: any) => item?.name == "close_circle_pinkcolour"
  );
  const [signInOpen, setSignInOpen] = useState(false);
  const [fileLarge, setFileLarge] = useState(false);
  const [CustomerID, setCustomerID] = useState(
    userDataItems ? userDataItems?.customerName : null
  );
  const handleClosed = () => {
    setSignInOpen(false);
  };
  useEffect(() => {
    setCustomerID(userDataItems ? userDataItems?.customerName : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender]);
  const toggleCard = (data: any) => {
    setReviewImages([]);
    setReviewDesc("");
    setFieldbox("");
    setHelperText(false);
    if (cookie.get("accessToken")) {
      setValue(0);
      setReviewTab(true);
      if (props?.openReviewTab) {
        props?.closeReviewTab();
      }
    } else {
      setSignInOpen(true);
    }
    triggerGAEvent(
      {
        ...analyticUtility(),
        widget_title: "Ratings & Reviews",
        widget_position: "4",
        link_url: "na",
        link_text: data,
        index: 1,
      },
      "click"
    );
  };
  const togglePopup = () => {
    setPopup(false);
    setReviewDesc("");
    setFieldbox("");
    setValue(0);
  };

  const handleSubmitAnalytic = () => {
    triggerGAEvent(
      {
        ...analyticUtility(),
        widget_title: titleText,
        widget_position: 1,
        link_url: "na",
        link_text: "Submit",
        index: 1,
      },
      "click"
    );
  };
  const handleRatingAnalytic = () => {
    triggerGAEvent(
      {
        ...analyticUtility(),
        widget_title: titleText,
        widget_position: 1,
        link_url: "na",
        link_text: "na",
        index: 1,
        item_brand: "na",
      },
      "click"
    );
  };
  const data = props?.myOrders
    ? {
      rating: value,
      title: fieldbox,
      description: reviewDesc,
      name: localStorage.getItem("customer_Name")
        ? localStorage.getItem("customer_Name")
        : "Guest User",
      sku: productId || productSku,
      images: reviewImages,
      order_id: props?.productDataItem?.items?.[0]?.order_id,
    }
    : {
      rating: value,
      title: fieldbox,
      description: reviewDesc,
      name: localStorage.getItem("customer_Name")
        ? localStorage.getItem("customer_Name")
        : "Guest User",
      sku: productId || productSku,
      images: reviewImages,
    };
  const handleSubmit = () => {
    if (value < 1) {
      setErrorMessage("Add stars to post this rating");
    } else {
      setLoader(true);
      setReviewTab(false);
      client
        .mutate({
          mutation: props?.myOrders ? OrderRatingReview : RatingReview,
          variables: data,
          
        })
        .then((response: any) => {
          const hasError =    handleErrorResponse(response?.data?.customerreview?.status) //response checking
          if (hasError) return null;
          if (response?.data?.customerreview?.status) {
            setPopup(!popup);
            setReviewImages([]);
            setHelperText(false);
          } else {
            // setPopup(!popup);
          }
        })
        .catch((err: any) => {
          console.log(err, "err");
          setNetworkError(true);
          setNetworkErrorMessage("Network Error");
          setReviewImages([]);
          setReviewDesc("");
          setFieldbox("");
          setHelperText(false);
          setValue(0);
        })
        .finally(() => setLoader(false));

    }
  };

  const field = (event: any) => {
    setFieldbox(event.target.value);
  };
  const handleReviewDescription = (e: any) => {
    setReviewDesc(e.target.value);
    let value = e.target.value;
    setReviewDescription(value);
    if (value.length > 1499) {
      setReviewDescription(value.slice(0, value.length - 1));
      setDescError(true);
    } else {
      setDescError(false);
    }
  };

  const handleRemove = (index: any) => {
    setHelperText(false);
    const firstArr = reviewImages.slice(0, index);
    const secondArr = reviewImages.slice(index + 1);
    setReviewImages([...firstArr, ...secondArr]);
  };

  const fileToDataUri = (image: any) => {
    return new Promise((res) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        res(reader.result);
      });
      reader.readAsDataURL(image);
    });
  };

  const fileUploadManager = async (event: any) => {
    const data = reviewImages;
    if (
      reviewImages.length <= limit &&
      limit - reviewImages.length - event.target.files.length >= 0
    ) {
      for (let i = 0; i < event.target.files.length; i++) {
        const oFile = event.target.files[i];
        if (oFile.size > 5242880) {
          setFileLarge(true);
        } else {
          if (
            oFile.type == "image/png" ||
            oFile.type == "image/jpg" ||
            oFile.type == "video" ||
            oFile.type == "image/jpeg"
          ) {
            data?.push(fileToDataUri(event.target.files[i]));
          } else console.log("Not Accepted");
        }
      }
      const newImages = await Promise.all(data);
      setReviewImages([...newImages]);
    }
    return false;
  };
  const filteredShade = props?.productDataItem?.items?.[0]?.configurable_options
    ?.map((data: any) => {
      const fill = data?.values?.find((childData: any, index: number) =>
        query?.colorCode
          ? childData?.value_index == query?.colorCode
          : index == 0
      );
      return fill?.label;
    })
    .find(function (x: any) {
      return x !== undefined;
    });
  const filteredSize = props?.productDataItem?.items?.[0]?.configurable_options
    ?.map((data: any) => {
      const fill = data?.values?.find((childData: any, index: number) =>
        query?.size ? childData?.value_index == query?.size : ""
      );
      return fill?.label;
    })
    .find(function (x: any) {
      return x !== undefined;
    });
  const cardMediaImageSrc = () => {
    if (props?.productDataItem?.items?.[0]?.type_id === "configurable") {
      if (props?.productDataItem?.items?.[0]?.variants?.[0]?.product?.image?.url) {
        if (variantData?.[0]?.product?.image?.url) {
          return variantData?.[0]?.product?.image?.url
        } else {
          return props?.productDataItem?.items?.[0]?.variants?.[0]?.product?.image?.url
        }
      } else {
        return props?.productDataItem?.items?.[0]?.variants?.[0]?.product?.additional_images?.[0]?.url
      }
    } else {
      if (props?.productDataItem?.items?.[0]?.image?.url) {
        return `${ReplaceImage(
          props?.productDataItem?.items?.[0]?.image?.url
        )}`
      } else {
        return PRODUCT_FALLBACK_URL
      }
    }
  }

  const paddingBottom = () => {
    if (props?.myOrders) {
      if (isMobile) {
        return "75px"
      } else {
        return "0px"
      }
    } else {
      return "23px"
    }
  }
  return (
    <>
      <Box>
        {showLoader && <Loader />}
        {networkError && (
          <Snackbar
            open={networkError}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{ marginTop: "56px" }}
            onClose={() => setNetworkError(false)}
          >
            <Alert severity="error" onClose={() => setNetworkError(false)}>
              {networkErrorMessage}
            </Alert>
          </Snackbar>
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

        <FirstGrid>
          <>
            {(props?.sortedreviewdata == null ||
              props?.sortedreviewdata == 0) &&
              props?.productDataItem?.items?.[0]?.reviews?.items?.length ===
              0 && <StyleText>{title}</StyleText>}
            {props?.productDataItem?.items?.[0]?.reviews?.items?.length ===
              0 && (
                <ReviewButton
                  onClick={() => {
                    toggleCard(reviewButton);
                  }}
                >
                  {reviewButton}
                </ReviewButton>
              )}
          </>
        </FirstGrid>
      </Box>
      <BasicModal
        top={"50%"}
        left="50%"
        height="100%"
        width="100%"
        open={openReviewTab}
        overflowData="auto"
        pdpPopup={false}
        Component={
          <Box
            sx={{
              padding: isMobile ? "0px 16px" : "",
            }}

          >
            <GridOne>
              <ArrowBackIosNewIcon
                sx={{
                  color: "#7B7979",
                  margin: isMobile ? "0px" : "0px 2.8vw 0px 2vw",
                  fontSize: isMobile ? "14px" : "20px",
                  cursor: "pointer",
                }}
                fontSize="medium"
                onClick={toggleCard}
              ></ArrowBackIosNewIcon>

              <Typography
                sx={{
                  marginLeft: isMobile ? "10px" : "0",
                  fontWeight: 600,
                  fontSize: isMobile ? "12px" : "22px",
                }}
              >
                {titleText}
              </Typography>
            </GridOne>
            <Box sx={{ padding: isMobile ? "" : "0 7%" }}>
              <Grid>
                <GridTwo>
                  <FirstImgGrid>
                    <CardMedia
                      component="img"
                      src={
                        cardMediaImageSrc()
                      }
                      onError={(e: any) => onImageError(e, errorImage)}
                      alt="Not Found"
                      width="100%"
                    ></CardMedia>
                  </FirstImgGrid>
                  <FirstImgText>
                    <Typoo>{props?.productName}</Typoo>
                    {filteredShade && (
                      <Typooo>
                        Shade - <span>{filteredShade}</span>
                      </Typooo>
                    )}
                    {filteredSize && <Typo>Size - {filteredSize}</Typo>}
                  </FirstImgText>
                </GridTwo>
              </Grid>
              <Grid>
                <GridThree>
                  <Grid sx={{ fontSize: isMobile ? "12px" : "20px" }}>
                    {ratingTitle}
                  </Grid>
                  <Rating
                    emptyIcon={
                      <StarIcon
                        style={{ color: "#EAE9EF", fontSize: "inherit" }}
                      />
                    }
                    name="simple-controlled"
                    sx={{
                      fontSize: isMobile ? "30px" : "50px",
                      color: "#333",
                      padding: isMobile ? "12px 0px 20px 0px" : "24px 0 46px 0",
                    }}
                    value={value}
                    onChange={(event: any, newValue: any) => {
                      setValue(newValue);
                      setErrorMessage("");
                      handleRatingAnalytic();
                    }}
                  />
                </GridThree>
              </Grid>
              <Grid>
                {value >= 1 && (
                  <Grid>
                    <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                      <FourTypo
                        dangerouslySetInnerHTML={{ __html: formTitle }}
                      ></FourTypo>
                      <Typography>{optional}</Typography>
                    </Stack>
                    <InputTypoOne>
                      <ReviewTextField
                        placeholder={formFieldOne}
                        onChange={field}
                        style={{ outline: "none" }}
                      />
                    </InputTypoOne>
                    <InputTypo>
                      <DescriptionTextareaAutosize
                        minRows={isMobile ? 16 : 9.49}
                        aria-label="maximum height"
                        placeholder={formFieldTwo}
                        maxLength={1500}
                        onChange={handleReviewDescription}
                      />
                      <span style={{ color: "red" }}>
                        {descError && ERROR_MESSAGE}
                      </span>
                    </InputTypo>
                  </Grid>
                )}
              </Grid>
              <AddPhotoGrid>
                <Addoption>
                  <GridFive
                    dangerouslySetInnerHTML={{ __html: addPhotoTitle }}
                  ></GridFive>
                  <MaxTypography>{maxphotos}</MaxTypography>
                </Addoption>
                <GridSix>{addPhotoSubtitle}</GridSix>
              </AddPhotoGrid>
              <Grid>
                <GridSeven sx={{ gap: "14px" }}>
                  {reviewImages &&
                    reviewImages.map((obj: any, index: number) => {
                      const uniqueKeyValue = index
                      return (
                        <ReviewImagesBox key={uniqueKeyValue}>
                          <img
                            src={obj}
                            height={isMobile ? "103px" : "104px"}
                            width={isMobile ? "103px" : "104px"}
                            style={{ position: "absolute" }}
                            alt="review_img"
                          />
                          <Crossicon sx={{ position: "relative" }}>
                            <img
                              src={`${ReplaceImage(
                                close_circle_pinkcolour?.url
                              )}`}
                              onClick={() => handleRemove(index)}
                              alt="close_img"
                            />
                          </Crossicon>
                        </ReviewImagesBox>
                      );
                    })}
                  <Choosepic
                    onClick={() => {
                      reviewImages?.length >= 5 && setHelperText(true);
                    }}
                  >
                    <label
                      htmlFor={`${reviewImages.length < 5 ? "file" : "none"}`}
                    >
                      <img
                        // src={`${ReplaceImage(chooseimage)}` || chooseimage}
                        src={'/upload.png'}
                        alt="imageUrl"
                        height={isMobile ? "103px" : "104px"}
                      />
                    </label>
                    <input
                      id="file"
                      type="file"
                      onChange={(e) => {
                        reviewImages?.length <= 5 && fileUploadManager(e);
                      }}
                      onClick={(event) => {
                        reviewImages?.length >= 5 && setHelperText(true);
                        event.currentTarget.value = "";
                      }}
                    />
                  </Choosepic>
                  {reviewImages?.length == 0 && (
                    <AddTextGrid>
                      <Typo>{photoTextOne}</Typo>
                      <Typo>{photoTextTwo}</Typo>
                      <Typo>{photoTextThree}</Typo>
                    </AddTextGrid>
                  )}
                </GridSeven>
                {helpertext && <Imgwarning>{imagereached}</Imgwarning>}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "center",
                  gap: errorMsg ? "12px" : "0px",
                  paddingBottom: paddingBottom(),
                }}
              >
                <SubmitButton
                  onClick={() => {
                    handleSubmit();
                    handleSubmitAnalytic();
                  }}
                  disabled={value === 0}
                >
                  {submitButton}
                </SubmitButton>

                <Box>
                  {errorMsg && (
                    <Box sx={{ display: "flex", gap: "5px" }}>
                      {isMobile && (
                        <ErrorOutlineIcon
                          sx={{ color: "#8E8D99" }}
                        ></ErrorOutlineIcon>
                      )}
                      <Infoerror> {errorMsg} </Infoerror>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            <Snackbar
              open={fileLarge}
              autoHideDuration={3000}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{ marginTop: "56px" }}
              onClose={() => setFileLarge(false)}
            >
              <Alert severity="error" onClose={() => setFileLarge(false)}>
                {"file size is greater than 5 MB"}
              </Alert>
            </Snackbar>
          </Box>
        }
        handleClose={toggleCard}
      />
      {popup && (
        <BasicModal
          top={"50%"}
          left={"50%"}
          height="auto"
          width={isMobile ? "100%" : "75%"}
          open={popup}
          overflowData="auto"
          Component={
            <Box p={"5%"}>
              <PopupGrid>{popupTitle}</PopupGrid>
              {(value > 1 && reviewDesc.length >= 1) || fieldbox.length >= 1 ? (
                <>
                  <PopupGridOne>{popupsubTitleOne}</PopupGridOne>
                  <PopupGridTwo>{popupsubTitleTwo}</PopupGridTwo>
                </>
              ) : (
                <>
                  <PopupGridOne>
                    {"Your product rating has been submitted"}
                  </PopupGridOne>
                  <PopupGridTwo>
                    {"Your review will be posted shortly"}
                  </PopupGridTwo>
                </>
              )}
              <PopupGridThree onClick={togglePopup}>
                {popupButton}
              </PopupGridThree>
            </Box>
          }
          handleClose={togglePopup}
        />
      )}
    </>
  );
};
export default ReviewComponentCard;
