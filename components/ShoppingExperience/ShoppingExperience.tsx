import Box from "@mui/material/Box";
import  Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import  Alert from "@mui/material/Alert";
import React, { useState } from "react";
import client from "../../apollo-client";
import { SubmitOrderReview } from "../../graphQLQueries/ProductQuery";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import Loader from "../../HOC/Loader/Loader";
import { EventType} from "../../utility/GAConstants";
import { useMobileCheck } from "../../utility/isMobile";
import { toast } from "../../utility/Toast";
import {
  ButtonBox,
  ButtonTypography,
  CourierTypography,
  DescriptionTextField,
  QueryTypography,
  RatingStack,
  RatingTypography,
  SubmitButton,
  TitleTextTypography,
} from "./ShoppingExperienceStyles";
let data = require("../../JSON/ShareExperience.json");
import { callEventOrderConfirm } from "../OrderConfirmation/OrderConfirmAnalytics";
import { useRouter } from "next/router";
import handleErrorResponse from "../../utility/ErrorHandling";

export const ShoppingExperience = ({ orderNumber, orderDetails }: any) => {
  const {
    rating_label,
    whats_wrong_label,
    experience_label,
    buttons,
    intrest_description,
  } = data;
  const isMobile = useMobileCheck();
  const router = useRouter();
  const [value, setValue] = useState<number>(0);
  const [showLoader, setLoader] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [label, setLabel] = useState("");
  const [isRatingClicked, setIsRatingClicked] = useState(false);
  const [feedBackRes, setFeedBackRes] = useState({} as any);
  const [sucesssnackBarOpen, setSucessSnackBarOpen] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [networkErrorMessage, setNetworkErrorMessage] = useState("");
  const [descError, setDescError] = useState(false);
  const handleChange = (e: any) => {
    let value = e.target.value;
    setReviewDesc(value);
    if (value.length > 1000) {
      setReviewDesc(value.slice(0, value.length - 1));
      setDescError(true);
      return;
    } else {
      setDescError(false);
    }
  };

  const handleSubmit = () => {
    callEventOrderConfirm(
      orderDetails,
      "Submit",
      "/home",
      value,
      data?.rating_label,
      EventType
    );
    if (value < 1) {
      setErrorMessage("Add stars to post this rating");
    } else {
      setErrorMessage("");
      let customizeVariables;
      setLoader(true);
      customizeVariables = {
        order_id: orderNumber,
        rating_value: Number(value),
        title: label,
        description: reviewDesc,
      };
      client
        .mutate({
          mutation: SubmitOrderReview,
          variables: customizeVariables,
        })
        .then((response: any) => {

          
  const hasError =    handleErrorResponse(response?.data?.AddOrderShoppingRatings?.message) //response checking
  if (hasError) return null;
          if(response?.data?.AddOrderShoppingRatings?.message === "User already given the rating")
          {
            setNetworkError(true)
            setNetworkErrorMessage(response?.data?.AddOrderShoppingRatings?.message)
          }
          else{
            setFeedBackRes(response?.data?.AddOrderShoppingRatings);
            setSucessSnackBarOpen(true);
            localStorage.setItem(
              "orderConfirmationfeedback",
              "orderConfirmationfeedback"
            );
            router.push("/home");
          }
        })
        .catch((err: any) => {
          toast.error("Someting went wrong, Please try again!!!");
          console.log(err, "err")})
        .finally(() => {
          setLoader(false);
          setLabel("");
          setValue(0);
          setReviewDesc("");
        });
    }
  };
  const handleReview = (value: any) => {
    const SelectedLabel = buttons?.filter(
      (id: any) => id?.label_name === value
    );
    setLabel(SelectedLabel[0]?.label_name);
  };
  const handleRating = (event: any) => {
    setValue(event?.target?.value);
    callEventOrderConfirm(
      orderDetails,
      "Rating",
      "#",
      event?.target?.value,
      data?.rating_label,
      EventType
    );
    if (event?.target.value < 1) {
      setErrorMessage("Add stars to post this rating");
    } else {
      setErrorMessage("");
    }
    setIsRatingClicked(true);
  };
  return (
    <>
      {showLoader && <Loader />}
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
      <Box
        p={isMobile ? "25px 16px 50px 16px" : "26px 30px 60px 30px"}
        mt={isMobile ? "25px" : "29px"}
        bgcolor="#FFFFFF"
      >
        <Stack flexDirection="column" spacing="20px">
          <RatingStack flexDirection="column">
            <RatingTypography>{rating_label}</RatingTypography>
            <Box>
              <Rating
                sx={{ color: "#AD184C" }}
                name="half-rating"
                size="large"
                value={value}
                onClick={handleRating}
              ></Rating>
            </Box>
            {errorMsg && <span style={{ color: "red" }}>{errorMsg}</span>}
          </RatingStack>
          {isRatingClicked && (
            <>
              <Stack flexDirection="column">
                {feedBackRes?.status && (
                  <CustomSnackBar
                    setSnackBarOpen={setSucessSnackBarOpen}
                    snackBarOpen={sucesssnackBarOpen}
                    snackMessage={feedBackRes?.message && feedBackRes?.message}
                  />
                )}
                {value > 0 && (
                  <QueryTypography>
                    {value <= 3 ? whats_wrong_label : intrest_description}
                  </QueryTypography>
                )}
                {value > 0 && (
                  <ButtonBox>
                    {buttons?.map((button: any, index: number) => (
                      <ButtonTypography
                        key={index}
                        onClick={() => handleReview(button?.label_name)}
                        selectedlabel={label}
                        buttonLabel={button?.label_name}
                      >
                        {value <= 3 ? button?.label_name : button?.label}
                      </ButtonTypography>
                    ))}
                  </ButtonBox>
                )}
              </Stack>
              {value > 0 && (
                <Stack flexDirection="column">
                  <TitleTextTypography>{experience_label}</TitleTextTypography>
                  <Box>
                    <DescriptionTextField
                      inputProps={{ maxLength: "1001" }}
                      rows={6}
                      value={reviewDesc}
                      error={descError}
                      helperText={descError && "Max 1000 characters"}
                      onChange={(e) => handleChange(e)}
                      multiline={true}
                      fullWidth
                      placeholder="Write about your experience here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset ": {
                            "&.MuiOutlinedInput-notchedOutline": {
                              borderColor: `${
                                descError ? "red" : "rgb(196,196,196,1"
                              })`,
                              borderWidth: "1px",
                            },
                          },
                        },
                      }}
                    >
                      {" "}
                    </DescriptionTextField>
                  </Box>
                </Stack>
              )}
            </>
          )}
        </Stack>
        {value > 0 && <Box sx={{ paddingTop: "10px" }}>
          <SubmitButton onClick={() => handleSubmit()}>
            Submit
          </SubmitButton>
        </Box>}
      </Box>
    </>
  );
};
