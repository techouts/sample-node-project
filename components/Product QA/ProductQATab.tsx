import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "../../HOC/Loader/Loader";
import {
  AskButtonStyled,
  AskTypography,
  BoxStyled,
  ButtonStyled,
  ButtonStyledTypography,
  CancelButtonStyled,
  CancelTypography,
  DialogAskTypography,
  DialogBoxStyled,
  DialogButtonsBox,
  DialogTextFieldStyled,
  OkayButtonStyled,
  SubmittedTypographyPrimary,
  SubmittedTypographySecondary,
  TextFieldStyled,
  ThankYouTypography,
  NoQuestionsTypography,
} from "./ProductQATabStyled";
import SingleProductQA from "./SingleProductQA";
import { AddQuestions } from "../../graphQLQueries/ProductQuery";
import client from "../../apollo-client";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import { Cookies } from "react-cookie";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { useMobileCheck } from "../../utility/isMobile";
import {
  widget_powered_by,
  widget_type,
  event_type,
} from "../../utility/GAConstants";
import { toast } from "../../utility/Toast";
import {
  DrawerBox,
  MobileDrawer,
} from "../../HOC/SortFilterBar/SortFilterStyles";
import triggerGAEvent from "../../utility/GaEvents";
import { BootstrapDialog } from "../SigninComponent/SignInStyled";
import SignInComponent from "../SigninComponent/SignInComponent";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  QUESTION_HELPER_TEXT,
  ERROR_MESSAGE,
  HELPER_QUESTION_TEXT,
} from "../PdpCardComponent/Constants";
import { AppIcons } from "../../utility/AppIconsConstant";
import { CLOSE_CIRCLE_IMAGE } from "../../utility/AppIcons";
import handleErrorResponse from "../../utility/ErrorHandling";

const ProductQATab = (props: any) => {
  const analyticProductData = props?.productData?.items?.[0];
  const { setAnswerPost, setPost, productData } = props;
  const { placeholderText, helperText, buttonText } = props?.componentData;
  const [questionValue, setQuestionValue] = useState("");
  const [modelQuestionValue, setModelQuestionValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [reRender, setReRender] = useState(false);
  const [descError, setDescError] = useState(false);
  const [reviewDescription, setReviewDescription] = useState("");
  const [showLoader, setLoader] = useState(false);
  const cookie = new Cookies();
  const isMobile = useMobileCheck();
  const close_circle = AppIcons(CLOSE_CIRCLE_IMAGE);
  const handleClose = () => {
    setOpen(false);
    setIsAnswerSubmitted(false);
    setModelQuestionValue("");
  };
  useEffect(() => {
    setCustomerID(userDataItems ? userDataItems?.customerName : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender]);
  const [CustomerID, setCustomerID] = useState(
    userDataItems ? userDataItems?.customerName : null
  );
  const [signInOpen, setSignInOpen] = useState(false);
  const handleClosed = () => {
    setSignInOpen(false);
  };
  const analyticUtility = () => {
    return {
      item_name: analyticProductData?.name,
      item_id: analyticProductData?.sku,
      event_type: event_type,
      widget_type: widget_type,
      item_type: analyticProductData?.__typename,
      widget_description: analyticProductData?.short_description?.html,
      widget_powered_by: widget_powered_by,
      no_of_items: props?.componentData?.items?.length,
      item_brand: analyticProductData?.brand_info,
      item_category:analyticProductData?.categories?.[0]?.name,
      item_category2:analyticProductData?.categories?.[1]?.name,
      item_category3:analyticProductData?.categories?.[2]?.name,
      item_original_price:
        analyticProductData?.price_range?.minimum_price?.regular_price?.value,
      item_price:
        analyticProductData?.pmr_price_value?.amount?.value,
      item_rating: analyticProductData?.rating_summary,
    };
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionValue(event.target.value);
    setModelQuestionValue(event.target.value);
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

  const modelQuestionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModelQuestionValue(event.target.value);
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

  const AskAQuestion = () => {
    if (cookie.get("accessToken")) {
      setOpen(true);
      setQuestionValue("");
    } else {
      setSignInOpen(true);
    }
    triggerGAEvent(
      {
        ...analyticUtility(),
        widget_title: props?.componentData?.__component,
        widget_position: 4,
        link_url: "",
        link_text: "Ask A Question",
        index: props?.componentData?.id,
      },
      "click"
    );
  };
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarStatus, setSnackBarStatus] = useState({
    toastMessage: "",
    toastButton: "",
    path: "",
  });
  const handleSnackClose = () => {
    setSnackBarOpen(false);
    setSnackBarStatus({
      toastMessage: "",
      toastButton: "",
      path: "",
    });
  };
  const DialogAskAQuestion = () => {
    triggerGAEvent(
      {
        ...analyticUtility(),
        widget_title: props?.componentData?.__component,
        widget_position: 4,
        link_url: "",
        link_text: "Ask A Question",
        index: props?.componentData?.id,
      },
      "click"
    );
    setLoader(true);
    client
      .mutate({
        mutation: AddQuestions,
        variables: {
          AskQuestion: [
            {
              question: modelQuestionValue,
              name: cookie.get("customer_Name")
                ? cookie.get("customer_Name")
                : "Guest User",
              status: 1,
              entity_id: props?.productData?.items[0]?.id,
            },
          ],
        },
      })
      .then((response: any) => {
    
        if (response?.data?.askQuestion) {
          setIsAnswerSubmitted(true);
          setPost((value: any) => !value);
        }
      })
      .catch((error: any) => {
        toast.error("Someting went wrong, Please try again!!!");
        console.log(error)})
      .finally(() => setLoader(false));
  };
  return (
    <Box width="100%">
      {showLoader && <Loader />}
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
      <CustomSnackBar
        snackBarOpen={snackBarOpen}
        snackBarStatus={snackBarStatus}
        handleClose={handleClose}
      ></CustomSnackBar>
      {props?.questionsList < 1 && (
        <NoQuestionsTypography
          sx={{
            pl: { xs: 1.5, sm: 5, md: 15, lg: 20 },
            pr: { xs: 1.5, sm: 5, md: 15, lg: 20 },
          }}
        >
          Have a question? Share it with us and we’ll get back to you.
        </NoQuestionsTypography>
      )}
      <BoxStyled
        sx={{
          pl: { xs: 1.5, sm: 5, md: 15, lg: 20 },
          pr: { xs: 1.5, sm: 5, md: 15, lg: 20 },
        }}
      >
        <TextFieldStyled
          isMobile={isMobile}
          id="outlined-basic"
          variant="outlined"
          value={questionValue}
          placeholder={placeholderText}
          inputProps={{ maxLength: 1500 }}
          autoComplete="off"
          onChange={handleQuestionChange}
          fullWidth
          helperText={
            <span style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "red" }}>{descError && ERROR_MESSAGE}</span>
              <span>{helperText}</span>
            </span>
          }
          InputLabelProps={{
            style: { color: "#AD184C", display: "flex" },
          }}
          InputProps={{
            style: {
              padding: 0,
              margin: 0,
              borderRadius: 0,
              backgroundColor: "#FFFFFF ",
            },
            endAdornment: (
              <ButtonStyled isMobile={isMobile} onClick={AskAQuestion}>
                <ButtonStyledTypography
                  dangerouslySetInnerHTML={{ __html: buttonText }}
                ></ButtonStyledTypography>
              </ButtonStyled>
            ),
          }}
        />
      </BoxStyled>
      <Box sx={{ paddingLeft: "159px" }}>
        {isAnswerSubmitted ? (
          <BasicModal
            left={"50%"}
            right={"50%"}
            top={"50%"}
            height={"auto"}
            width={isMobile ? "100%" : "auto"}
            handleClose={handleClose}
            open={open}
            overflowData={"auto"}
            Component={
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: isMobile ? "" : "0px 50px",
                }}
              >
                <ThankYouTypography>Thank You</ThankYouTypography>
                <SubmittedTypographyPrimary>
                  Your Question has been submitted
                </SubmittedTypographyPrimary>
                <SubmittedTypographySecondary>
                  All submitted questions will be moderated before being
                  published
                </SubmittedTypographySecondary>
                <Box
                  sx={{
                    textAlign: "-webkit-center",
                    paddingTop: "20px",
                    paddingBottom: isMobile ? "25px" : "40px",
                  }}
                >
                  <OkayButtonStyled onClick={handleClose}>
                    OKAY
                  </OkayButtonStyled>
                </Box>
              </Box>
            }
          ></BasicModal>
        ) : isMobile ? (
          <MobileDrawer anchor="bottom" open={open}>
            <DrawerBox
              p={2}
              width="100%"
              textAlign="center"
              role="presentation"
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <AskTypography>Ask A Question</AskTypography>
                  <img
                    src={`${ReplaceImage(close_circle?.url)}`}
                    alt="cancel"
                    onClick={handleClose}
                    width={"35px"}
                  />
                </Box>
                <DialogBoxStyled>
                  <DialogTextFieldStyled
                    id="outlined-basic"
                    variant="outlined"
                    placeholder={HELPER_QUESTION_TEXT}
                    value={modelQuestionValue}
                    inputProps={{ maxLength: 1500 }}
                    autoComplete="off"
                    onChange={modelQuestionHandler}
                    helperText={
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "red" }}>
                          {descError && ERROR_MESSAGE}
                        </span>
                        <span>{QUESTION_HELPER_TEXT}</span>
                      </span>
                    }
                    InputLabelProps={{
                      style: { color: "#AD184C", display: "flex" },
                    }}
                    InputProps={{
                      style: {
                        padding: 0,
                        margin: 0,
                        borderRadius: 0,
                        backgroundColor: "#FFFFFF ",
                      },
                    }}
                  />
                </DialogBoxStyled>
                <DialogButtonsBox>
                  {modelQuestionValue.length >= 1 && (
                    <AskButtonStyled onClick={DialogAskAQuestion}>
                      {" "}
                      <DialogAskTypography
                        dangerouslySetInnerHTML={{ __html: "Submit" }}
                      ></DialogAskTypography>
                    </AskButtonStyled>
                  )}
                  <CancelButtonStyled onClick={handleClose}>
                    <CancelTypography>CANCEL</CancelTypography>
                  </CancelButtonStyled>
                </DialogButtonsBox>
              </Box>
            </DrawerBox>
          </MobileDrawer>
        ) : (
          <BasicModal
            open={open}
            left="50%"
            right={"50%"}
            top={"50%"}
            height={"auto"}
            width={"75%"}
            handleClose={handleClose}
            overflowData={"auto"}
            Component={
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                }}
              >
                <AskTypography style={{ textTransform: "none" }}>
                  Ask A Question
                </AskTypography>
                <DialogBoxStyled>
                  <DialogTextFieldStyled
                    id="outlined-basic"
                    variant="outlined"
                    inputProps={{ maxLength: 1500 }}
                    placeholder={HELPER_QUESTION_TEXT}
                    value={modelQuestionValue}
                    autoComplete="off"
                    onChange={modelQuestionHandler}
                    helperText={
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "red" }}>
                          {descError && ERROR_MESSAGE}
                        </span>
                        <span>{QUESTION_HELPER_TEXT}</span>
                      </span>
                    }
                    InputLabelProps={{
                      style: { color: "#AD184C", display: "flex" },
                    }}
                    InputProps={{
                      style: {
                        padding: 0,
                        margin: 0,
                        borderRadius: 0,
                        backgroundColor: "#FFFFFF ",
                      },
                    }}
                  />
                </DialogBoxStyled>
                <DialogButtonsBox>
                  {modelQuestionValue.length >= 1 && (
                    <AskButtonStyled onClick={DialogAskAQuestion}>
                      {" "}
                      <DialogAskTypography
                        dangerouslySetInnerHTML={{ __html: "Submit" }}
                      ></DialogAskTypography>
                    </AskButtonStyled>
                  )}
                  <CancelButtonStyled onClick={handleClose}>
                    <CancelTypography>CANCEL</CancelTypography>
                  </CancelButtonStyled>
                </DialogButtonsBox>
              </Box>
            }
          ></BasicModal>
        )}
      </Box>
      <SingleProductQA
        componentData={props?.componentData}
        questionsList={props?.questionsList}
        setAnswerPost={setAnswerPost}
        productData={productData}
      />
    </Box>
  );
};
export default ProductQATab;
