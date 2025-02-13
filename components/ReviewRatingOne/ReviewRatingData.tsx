import { useState } from "react";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import {
  IMAGE_LIMIT,
  IMAGE_SIZE_ERROR_MESSAGE,
  RATING_HEADING,
  MODEL_YES_BUTTON,
  MODEL_CANCEL_BUTTON,
  MODERATION_MESSAGE_PENDING,
  MODERATION_MESSAGE_FAILED,
  EDIT_ICON,
  DELETE_ICON,
} from "../ReviewRatingOne/Constants";
import { SchemaItems } from "./ReviewRatingSchema";
import {
  MainBox,
  ContentMainImage,
  FirstImageUnderTitleStyle,
  ModerationFailedStyle,
  MainVisibleContentTitle,
  CommonTitle,
  MainVisibleContent,
  EditAndDeleteIcons,
  ModelMessageBox,
  ModalFirstTypography,
  ModalYesButton,
  ModalCancelButton,
  DeleteIconWrapper,
  StyledTypography,
  ContentWrapperGrid,
  ContentGrid,
} from "./ReviewRatingStyle";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { useMobileCheck } from "../../utility/isMobile";
import { DateFormate } from "../../utility/DateFormate";
import {
  DELETE_CUSTOMER_RATING,
  UPDATE_CUSTOMER_RATINGS,
} from "../../graphQLQueries/CustomerRatings/GetCustomerRatings";
import client from "../../apollo-client";
import Loader from "../../HOC/Loader/Loader";
import { event_type, widget_type } from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";
import { onImageError } from "../../utility/onImageError";
import ReviewRatingUI from "./ReviewRatingUI";
import { Error_Image } from "../../utility/AppIcons";
import { AppIcons } from "../../utility/AppIconsConstant";
import handleErrorResponse from "../../utility/ErrorHandling";
const ReviewRatingData = ({
  review_id,
  image,
  name,
  created_at,
  rating_value,
  detail,
  status,
  review_images,
  ToggleHandler,
  handleSnackbarMessage,
  id,
  position,
  componentNameFromCMS,
}: SchemaItems) => {
  const isMobile = useMobileCheck("(min-width : 600px )");
  const [modalOpen, setModalOpen] = useState(false);
  const [moreImageSize, setMoreImageSize] = useState("");
  const [displayLoader, setLoader] = useState(false);
  //state management to edit incoming data
  const [edit, setEdit] = useState(false);
  const [selectedImagesList, setSelectedImagesList] = useState<any>(
    review_images ?? []
  );
  const errorImage = AppIcons(Error_Image)
  const [editDeails, setEditDetails] = useState(detail);
  const [editReview, setEditReview] = useState(rating_value);
  const [ratingChanged, setRatingChanged] = useState<any>(rating_value);
  const forImageSize = IMAGE_SIZE_ERROR_MESSAGE;
  const handleEdits = () => {
    setEdit(!edit);
  };
  const handleCloseModal = () => {
    setModalOpen(!modalOpen);
  };
  // mutation for saving edited data
  const updateCustomerRating = async (reviewId: any) => {
    setLoader(true);
    const filePathsPromises: any = [];
    selectedImagesList?.forEach((file: any) => {
      filePathsPromises?.push(getBase64FromUrl(file));
    });
    const filePaths = await Promise?.all(filePathsPromises);
    const mappedFiles = filePaths?.map((base64File) => base64File);
    client
      .mutate({
        mutation: UPDATE_CUSTOMER_RATINGS,
        variables: {
          revieId: reviewId,
          ratingValue: editReview,
          reviewImages: mappedFiles,
          detail: editDeails,
        },
      })
      .then((resp) => {
      
        ToggleHandler();
        setEdit(!edit);
        handleSnackbarMessage("Your review is submitted, Thank you!");
        setLoader(false);
      })
      .catch((error: any) => {
        if (
          error?.message == "Response not successful: Received status code 413"
        ) {
          handleSnackbarMessage("Invalid body: request entity too large.");
        } else {
          handleSnackbarMessage(
            "Couldn't add your review at the moment,Please try again later.Thank you!"
          );
        }
        setLoader(false);
      })
      .finally(() => setLoader(false));
  };
  const handleSubmit = (reviewId: any) => {
    updateCustomerRating(reviewId);
    setEdit(!edit);
  };
  const getBase64FromUrl = async (url: any) => {
    const data = await fetch(url)
      .then(async (res) => {
        const blob = await res.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader?.result;
            resolve(base64data);
          };
        });
      })
      .catch((err) => console.log("err", err));
    return data;
  };
  //mutation for deleting the review
  const handleDeleteReview = (reviewsIds: any) => {
    setLoader(true);
    client
      .mutate({
        mutation: DELETE_CUSTOMER_RATING,
        variables: {
          reviewsId: reviewsIds,
        },
      })
      .then((response) => {
        
        ToggleHandler();
        handleSnackbarMessage("Your review is deleted successfully");
        setLoader(false);
      })
      .catch((error: any) => {
        handleSnackbarMessage(
          "Couldn't delete your review, Please try again later."
        );
      });
  };
  const handleDeletingReviews = (reviewsIds: any) => {
    setModalOpen(!modalOpen);
    handleDeleteReview(reviewsIds);
  };
  const handleCancle = () => {
    setRatingChanged(rating_value);
    setSelectedImagesList(review_images);
    ToggleHandler();
    handleEdits();
  };
  const setInitialState = () => {
    setRatingChanged(!ratingChanged);
    handleEdits();
  };
  const handleRemove = (index: number) => {
    const imagesArrayOne = selectedImagesList?.slice(0, index);
    const imagesArrayTwo = selectedImagesList?.slice(index + 1);
    setSelectedImagesList([...imagesArrayOne, ...imagesArrayTwo]);
  };
  const fileToDataUri = (image: Blob) => {
    return new Promise((res) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        res(reader.result);
      });
      reader.readAsDataURL(image);
    });
  };
  //Base64 conversion for newly uploaded images
  const fileUploadManager = async (e: any) => {
    let listOfImages: any[] = [...selectedImagesList];
    if (
      selectedImagesList?.length <= IMAGE_LIMIT &&
      IMAGE_LIMIT - selectedImagesList?.length - e.target?.files?.length >= 0
    ) {
      for (let i = 0; i < e?.target?.files?.length; i++) {
        const oFile = e?.target?.files[i];
        if (oFile?.size > 5242880) {
          setMoreImageSize(forImageSize);
        } else {
          if (
            oFile.type == "image/png" ||
            oFile.type == "image/jpg" ||
            oFile.type == "image/jpeg"
          ) {
            listOfImages?.push(fileToDataUri(e?.target?.files[i]));
          }
        }
        const newImages = await Promise?.all(listOfImages);
        setSelectedImagesList([...newImages]);
      }
      return false;
    }
  };

  const EditDeleteEvent = (linktext?: any) => {
    triggerGAEvent(
      {
        item_name: "na",
        item_id: `${componentNameFromCMS}_${position}`,
        component_id: id,
        widget_type: widget_type,
        item_type: "na",
        widget_title: componentNameFromCMS,
        widget_description: "na",
        widget_postion: position,
        link_url: "na",
        link_text: linktext || "na",
        no_of_items: 1,
        index: position,
        item_brand: "na",
        item_category: "na",
        item_image_link: "na",
        item_category2: "na",
        item_category3: "na",
        item_original_price: 0,
        item_price: 0,
        item_rating: "na",
        original_price: 0,
        event_type: event_type,
      },
      "click"
    );
  };

  return (
    <>
      {displayLoader && <Loader />}
      {!displayLoader && (
        <MainBox>
          <BasicModal
            open={modalOpen}
            handleClose={handleCloseModal}
            top="50%"
            left="50%"
            height={isMobile ? "230px" : "300px"}
            width={isMobile ? "84%" : "40%"}
            Component={
              <ModelMessageBox>
                <ModalFirstTypography>
                  Are you sure you want to delete this review?
                </ModalFirstTypography>
                <ModalYesButton
                  onClick={() => {
                    handleDeletingReviews(review_id);
                    handleCloseModal();
                    EditDeleteEvent(MODEL_YES_BUTTON);
                  }}
                >
                  {MODEL_YES_BUTTON}
                </ModalYesButton>
                <ModalCancelButton
                  variant="outlined"
                  onClick={() => {
                    handleCloseModal();
                    EditDeleteEvent(MODEL_CANCEL_BUTTON);
                  }}
                >
                  {MODEL_CANCEL_BUTTON}
                </ModalCancelButton>
              </ModelMessageBox>
            }
          />
          <ContentWrapperGrid>
            <ContentGrid>
              {isMobile && (
                <EditAndDeleteIcons
                  sx={{ cursor: "pointer", marginRight: "20px" }}
                >
                  <img
                    src={EDIT_ICON}
                    style={{ marginRight: "12px" }}
                    width="22px"
                    alt="Edit icon"
                    onClick={() => {
                      setInitialState();
                      EditDeleteEvent(name);
                    }}
                  />
                  <img
                    src={DELETE_ICON}
                    width="22px"
                    alt="Delete icon"
                    onClick={() => {
                      handleCloseModal();
                      EditDeleteEvent(name);
                    }}
                  />
                </EditAndDeleteIcons>
              )}
              <ContentMainImage>
                <img
                  src={image}
                  onError={(e: any) => onImageError(e, errorImage)}
                  alt="Content Main Image"
                  width="250px"
                />
                {status === "Pending" && MODERATION_MESSAGE_PENDING && (
                  <FirstImageUnderTitleStyle>
                    {MODERATION_MESSAGE_PENDING}
                  </FirstImageUnderTitleStyle>
                )}
                {status === "Not Approved" && MODERATION_MESSAGE_FAILED && (
                  <ModerationFailedStyle>
                    {MODERATION_MESSAGE_FAILED}
                  </ModerationFailedStyle>
                )}
              </ContentMainImage>
              <MainVisibleContent>
                <DeleteIconWrapper>
                  <MainVisibleContentTitle>{name}</MainVisibleContentTitle>
                  {!isMobile && (
                    <EditAndDeleteIcons>
                      <img
                        src={EDIT_ICON}
                        style={{ marginRight: "12px" }}
                        width="20px"
                        alt="Edit icon"
                        onClick={() => {
                          setInitialState();
                          EditDeleteEvent(name);
                        }}
                      />
                      <img
                        src={DELETE_ICON}
                        width="20px"
                        alt="Delete icon"
                        onClick={() => {
                          handleCloseModal();
                          EditDeleteEvent(name);
                        }}
                      />
                    </EditAndDeleteIcons>
                  )}
                </DeleteIconWrapper>
                <StyledTypography>{DateFormate(created_at)}</StyledTypography>
                <Typography pb={1}>
                  <CommonTitle>{RATING_HEADING}</CommonTitle>
                  <Rating
                    sx={{ color: "#AD184C" }}
                    readOnly={ratingChanged}
                    defaultValue={editReview}
                    onChange={(event, newValue: any) => {
                      setEditReview(newValue);
                    }}
                  />
                </Typography>
                <ReviewRatingUI
                  ReadMore={ReadMore}
                  isMobile={isMobile}
                  handleRemove={handleRemove}
                  fileUploadManager={fileUploadManager}
                  handleSubmit={handleSubmit}
                  handleCancle={handleCancle}
                  review_id={review_id}
                  editDeails={editDeails}
                  edit={edit}
                  setEditDetails={setEditDetails}
                  moreImageSize={moreImageSize}
                  selectedImagesList={selectedImagesList}
                />
              </MainVisibleContent>
            </ContentGrid>
          </ContentWrapperGrid>
        </MainBox>
      )}
    </>
  );
};

export const ReadMore = ({ children }: any) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const commentBoxStyle = {
    color: "red",
    cursor: "pointer",
  };
  return (
    <p className="text" style={{ overflow: "auto", maxWidth: "100%" }}>
      {isReadMore ? text?.slice(0, 100) : text}
      {text?.length > 100 && (
        <span
          onClick={toggleReadMore}
          style={commentBoxStyle}
          contentEditable="false"
        >
          {isReadMore ? "...read more" : " read less"}
        </span>
      )}
    </p>
  );
};

export default ReviewRatingData;
