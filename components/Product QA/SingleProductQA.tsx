import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import Loader from "../../HOC/Loader/Loader";
import { Submit, CancelButton } from "../ReviewComponent/ReviewCardStyle";
import {
  AnswerByBox,
  AnswerByTypographyStyled,
  AnswerTypographyStyled,
  LikeIconBox,
  LikeIconBoxMobile,
  OkayButtonStyled,
  QAbox,
  QuestionByTypographyStyled,
  QuestionTypographyStyled,
  SingleProductBox,
  SubmittedTypographyPrimary,
  SubmittedTypographySecondary,
  ThankYouTypography,
  ViewMoreQA
} from "./ProductQATabStyled";
import { answerQuery } from "../../graphQLQueries/ProductQuery";
import client from "../../apollo-client";
import { AddLike } from "../../graphQLQueries/ProductQuery";
import { useMobileCheck } from "../../utility/isMobile";
import SignInComponent from "../SigninComponent/SignInComponent";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import { BootstrapDialog } from "../SigninComponent/SignInStyled";
import BasicModal from "../../HOC/Modal/ModalBlock";
import {
  widget_powered_by,
  widget_type,
  event_type,
} from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";
import { ERROR_MESSAGE } from "../PdpCardComponent/Constants";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  EDIT_IMAGE_ICON,
  LIKE_ICONS,
  UNLIKE_ICONS,
} from "../../utility/AppIcons";
import { toast } from "../../utility/Toast";
import handleErrorResponse from "../../utility/ErrorHandling";
const SingleProductQA = (props: any) => {
  const isMobile = useMobileCheck();
  const { setAnswerPost} = props;
  const { items, SubmitAnswerIcon } = props?.componentData;
  const [answersArray, setAnswersArray] = useState<number[]>([]);
  const [viewMoreSelected, setViewMoreSelected] = useState<any>(null);
  const [openTextArea, setTextArea] = useState(false);
  const [answertext, setAnswer] = useState("");
  const [showLoader, setLoader] = useState(false);
  const [likeSelectedIndex, setLikeSelectedIndex] = useState(-1);
  const [questionLiked, setQuestionLiked] = useState(false);
  const [submitAnswerModel, setSubmitAnswerModel] = useState(false);
  const cookie = new Cookies();
  const [reRender, setReRender] = useState(false);
  const [descError, setDescError] = useState(false);
  const [reviewDescription, setReviewDescription] = useState("");
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [CustomerID, setCustomerID] = useState(
    userDataItems ? userDataItems?.customerName : null
  );
  useEffect(() => {
    setCustomerID(userDataItems ? userDataItems?.customerName : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender]);
  const [signInOpen, setSignInOpen] = useState(false);
  const handleClosed = () => {
    setSignInOpen(false);
  };
  const [questionDataList, setQuestionDataList] = useState<any[]>(
    props?.questionsList
  );
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const removeAnswer = (element: number) => {
    let index = answersArray.indexOf(element);
    if (index !== -1) {
      setAnswersArray([
        ...answersArray.slice(0, index),
        ...answersArray.slice(index + 1, answersArray.length),
      ]);
    }
  };
  const addAnswer = (element: number) => {
    if (answersArray.filter((num) => num === element)[0] !== element) {
      setAnswersArray((answersArray) => [...answersArray, element]);
    } else {
      removeAnswer(element);
    }
  };
  const handleSeeMore = (index: number) => {
    addAnswer(index);
  };

  const openAnswerBox = (selectedIndex: number) => {
    if (cookie.get("accessToken")) {
      setTextArea(true);
      setSelectedIndex(selectedIndex);
    } else {
      setSignInOpen(true);
    }
  };

  const handleAnswer = (event: any) => {
    setAnswer(event.target.value);
    let value = event.target.value;
    setReviewDescription(value);
    if (value.length > 1499) {
      setReviewDescription(value.slice(0, value.length - 1));
      setDescError(true);
      return;
    } else {
      setDescError(false);
    }
  };

  const cancelHandler = () => {
    setTextArea(false), setSelectedIndex(-1), setAnswer("");
    triggerGAEvent(
      {
        ...analyticUtility(),
        widget_title: "Product Q & A",
        widget_position: "",
        link_url: "",
        link_text: "CANCEL",
        index: "",
        item_brand: "",
      },
      "click"
    );
  };

  const vieweMoreHandler = (moreSelectedIndex: number) => {
    if (moreSelectedIndex == viewMoreSelected) {
      setViewMoreSelected(null);
    } else {
      setViewMoreSelected(moreSelectedIndex);
    }
  };

  const LikeClickHandler = async (item: any, likeSelectedIndex: number) => {
    setLoader(true);
    setLikeSelectedIndex(likeSelectedIndex);
    const response = await client
      .mutate({
        mutation: AddLike,
        variables: {
          question_id: item?.que_id,
        },
      })
      .then((response: any) => {
        
        setQuestionLiked(true);
        const questionList = props.questionsList;
        questionList?.map((data: any) => {
          if (data?.que_id === item?.que_id) {
            data["likes_count"] = data?.likes_count + 1;
            data["isLiked"] = true;
          }
        });
        setQuestionDataList([...questionList]);
      })
      .catch((err: any) => {
        toast.error("Someting went wrong, Please try again!!!");
        console.log(err, "err")})
      .finally(() => setLoader(false));
  };
  const analyticProductData = props?.productData?.items?.[0];
  function analyticUtility() {
    return {
      item_name: analyticProductData?.name,
      item_id: analyticProductData?.sku,
      event_type: event_type,
      widget_type: widget_type,
      item_type: analyticProductData?.__typename,
      widget_description: analyticProductData?.short_description?.html,
      widget_powered_by: widget_powered_by,
      widget_title: "Product Q & A",
      widget_position: "",
      link_url: "",
      outbound: false,
      link_text: "",
      no_of_items: props?.componentData?.items?.length,
      index: props?.componentData?.id,
      item_brand: "",
      item_category: "",
      item_category2: "",
      item_category3: "",
      item_original_price:
        analyticProductData?.price_range?.minimum_price?.regular_price?.value,
      item_price:
        analyticProductData?.pmr_price_value?.amount?.value,
      item_rating: analyticProductData?.rating_summary,
    };
  }

  const handleSubmit = (item: any) => {
    setLoader(true);
    setSelectedIndex(-1),
      client
        .mutate({
          mutation: answerQuery,
          variables: {
            Answer: [
              {
                que_id: item?.que_id,
                answer: answertext,
                name: cookie.get("customer_Name")
                  ? cookie.get("customer_Name")
                  : "Guest User",
                status: 1,
              },
            ],
          },
        })
        .then((response: any) => {
         
          if (response?.data?.answer.message === "success") {
            setTextArea(false);
            setAnswerPost((answer: any) => !answer);
            setSubmitAnswerModel(true);
          }
        })
        .catch((error: any) => {
          toast.error("Someting went wrong, Please try again!!!");
          console.log(error)})
        .finally(() => setLoader(false));

    triggerGAEvent(
      {
        ...analyticUtility(),
        widget_title: "Product Q & A",
        widget_position: "",
        link_url: "",
        link_text: "Submit",
        index: "",
        item_brand: "",
      },
      "click"
    );
  };

  const handleClose = () => {
    setSubmitAnswerModel(false);
  };
  const EDIT_IMAGE = AppIcons(EDIT_IMAGE_ICON);
  const LIKE_ICON = AppIcons(LIKE_ICONS);
  const UNLIKE_ICON = AppIcons(UNLIKE_ICONS);

  return (
    <Box pl={isMobile ? "12px" : "5px"}>
      <SingleProductBox>
        {showLoader && <Loader />}
        {submitAnswerModel && (
          <BasicModal
            left={"50%"}
            right={"50%"}
            top={"50%"}
            height="auto"
            width={isMobile ? "100%" : "40%"}
            handleClose={handleClose}
            open={open}
            overflowData={"auto"}
            Component={
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ThankYouTypography>Thank You</ThankYouTypography>
                <SubmittedTypographyPrimary>
                  Your Answer has been submitted
                </SubmittedTypographyPrimary>
                <SubmittedTypographySecondary>
                  All Submitted answers will be moderated and published
                </SubmittedTypographySecondary>
                <Box
                  sx={{
                    textAlign: "-webkit-center",
                    paddingTop: "20px",
                    paddingBottom: isMobile ? "25px" : "50px",
                  }}
                >
                  <OkayButtonStyled onClick={handleClose}>
                    OKAY
                  </OkayButtonStyled>
                </Box>
              </Box>
            }
          ></BasicModal>
        )}
        {props.questionsList?.map((item: any, index: any) => (
          <Box
            key={index}
            sx={{
              position: "relative",
            }}
          >
            <QAbox
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pl: { xs: 1.5, sm: 5, md: 15, lg: 20 },
                pr: { xs: 1.5, sm: 5, md: 15, lg: 20 },
              }}
            >
              <QuestionTypographyStyled>
                Q. {item?.question}
              </QuestionTypographyStyled>
              <LikeIconBox sx={{ display: "flex" }}>
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
                    onClick={() => LikeClickHandler(item, index)}
                  />
                )}
                <Typography
                  sx={{
                    paddingLeft: "7px",
                  }}
                >
                  {item?.likes_count}
                </Typography>
              </LikeIconBox>
            </QAbox>
            <QuestionByTypographyStyled
              sx={{
                pl: { xs: 1.5, sm: 5, md: 15, lg: 20 },
                pr: { xs: 1.5, sm: 5, md: 15, lg: 20 },
              }}
            >
              By {item?.name} | <span>{item?.created_at}</span>
            </QuestionByTypographyStyled>
            {item?.answerDetails
              ?.slice(
                0,
                index == viewMoreSelected ? item?.answerDetails?.length : 1
              )
              ?.map((answer: any) => (
                <>
                  <Stack
                    sx={{
                      pl: { xs: 1.5, sm: 5, md: 15, lg: 20 },
                      pr: { xs: 1.5, sm: 5, md: 15, lg: 20 },
                    }}
                  >
                    <AnswerTypographyStyled>
                      A. {answer?.answer}
                    </AnswerTypographyStyled>
                    <AnswerByBox
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "centers",
                      }}
                    >
                      <AnswerByTypographyStyled>
                        {answer?.name && (
                          <>
                            <span>By {answer?.name}</span>
                            {answer?.created_at && (
                              <span> | {answer?.created_at}</span>
                            )}
                          </>
                        )}
                      </AnswerByTypographyStyled>
                    </AnswerByBox>
                  </Stack>
                </>
              ))}
            {item?.answerDetails.length >= 2 && (
              <ViewMoreQA sx={{
                pl: { xs: 1.5, sm: 5, md: 15, lg: 20 },
                pr: { xs: 1.5, sm: 5, md: 15, lg: 20 }}}
                 onClick={() => vieweMoreHandler(index)}>
                {index === viewMoreSelected ? "See Less" : "See More"}
              </ViewMoreQA>
            )}
            {index != selectedIndex && (
              <Box
                onClick={() => openAnswerBox(index)}
                sx={{
                  pl: { xs: 1.5, sm: 5, md: 15, lg: 20 },
                  pr: { xs: 1.5, sm: 5, md: 15, lg: 20 },
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "-23px",
                  marginBottom: "30px",
                  "@media(max-width:600px)": {
                    justifyContent: "start",
                    marginTop: "12px",
                  },
                }}
              >
                <img
                  src={`${ReplaceImage(EDIT_IMAGE?.url)}`}
                  alt="Submit Answer Icon"
                  width="20px"
                  height="20px"
                  style={{
                    cursor: "pointer",
                  }}
                />

                <Typography
                  sx={{
                    paddingLeft: "12px",
                    cursor: "pointer",
                  }}
                >
                  Submit an Answer
                </Typography>
              </Box>
            )}

            <LikeIconBoxMobile
              sx={{
                display: "flex",
                justifyContent: "end",
                pl: { xs: 1.5, sm: 5, md: 15, lg: 20 },
                pr: { xs: 1.5, sm: 5, md: 15, lg: 20 },
              }}
            >
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
                  onClick={() => LikeClickHandler(item, index)}
                />
              )}
              <Typography
                sx={{
                  paddingLeft: "7px",
                }}
              >
                {item?.likes_count}
              </Typography>
            </LikeIconBoxMobile>

            {index == selectedIndex && openTextArea && (
              <Box
                sx={{
                  pl: { xs: 1.5, sm: 5, md: 15, lg: 20 },
                  pr: { xs: 1.5, sm: 5, md: 15, lg: 20 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: isMobile ? "3px" : "18px",
                    paddingTop: isMobile ? "20px" : "35px",
                  }}
                >
                  <span>A.</span>
                  <span>
                    <TextareaAutosize
                      minRows={6}
                      aria-label="maximum height"
                      placeholder="submit your answer"
                      maxLength={1500}
                      style={{
                        width: "100%",
                        outline: "none",
                        padding: "15px",
                      }}
                      onChange={handleAnswer}
                    />
                    <span style={{ color: "red" }}>
                      {descError && ERROR_MESSAGE}
                    </span>
                  </span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "14px",
                    justifyContent: isMobile ? "center" : "end",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <CancelButton onClick={() => cancelHandler()}>
                    Cancel
                  </CancelButton>
                  {answertext.length >= 1 && (
                    <Submit onClick={() => handleSubmit(item)}>Submit</Submit>
                  )}
                </Box>
              </Box>
            )}
            {index != props.questionsList.length - 1 && (
              <Divider
                sx={{
                  marginTop: "10px",
                  width: "100%",
                  border: "1px solid #CCCCCC",
                }}
              />
            )}
          </Box>
        ))}
      </SingleProductBox>
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

export default SingleProductQA;
