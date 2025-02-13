import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import {
  CANCEL_BUTTON,
  IMAGE_LIMIT,
  PHOTOS_CONTENT,
  PHOTOS_TITLE,
  PLUS_IMAGE_FOR_UPLOADS,
  REVIEW_HEADING,
  SAVE_BUTTON,
} from "./Constants";
import {
  AllImagesUploaded,
  CancelButton,
  CommonTitle,
  CrossMarkEntity,
  ImageSizeErrorMsg,
  ImageTextField,
  SaveButton,
  TitleAndDescription,
  UploadedViewImage,
  UploadForImage,
  UploadImageField,
} from "./ReviewRatingStyle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { onImageError } from "../../utility/onImageError";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { AppIcons } from "../../utility/AppIconsConstant";
import { Error_Image } from "../../utility/AppIcons";

const ReviewRatingUI = ({
  editDeails,
  edit,
  setEditDetails,
  moreImageSize,
  selectedImagesList,
  ReadMore,
  handleRemove,
  fileUploadManager,
  handleSubmit,
  handleCancle,
  review_id,
  isMobile,
}: any) => {
  //Read More & Read Less function
  const commentBoxTextStyle = {
    outline: "none",
  };
  const responsive = {
    ismobile: isMobile,
  };
  const errorImage = AppIcons(Error_Image)

  const desktopViewImageUI = () => {
    return (
      <>
        {(selectedImagesList?.length > 0 ||
          (edit && selectedImagesList?.length === 0)) && (
          <CommonTitle>{PHOTOS_TITLE}</CommonTitle>
        )}
        <Box sx={{ display: "flex" }}>
          <UploadImageField
            {...responsive}
            sx={{
              gridGap: selectedImagesList?.length === 0 ? "0" : "16px",
            }}
          >
            {selectedImagesList &&
              selectedImagesList?.map((allImages: any, index: number) => {
                return (
                  <Grid
                    sx={{
                      display: "flex",
                    }}
                    key={allImages}
                  >
                    <UploadedViewImage
                      width="80px"
                      isMobile={isMobile}
                      src={allImages}
                      onError={(e: any) => onImageError(e, errorImage)}
                    />
                    {edit && (
                      <CrossMarkEntity onClick={() => handleRemove(index)}>
                        &#10005;
                      </CrossMarkEntity>
                    )}
                  </Grid>
                );
              })}
          </UploadImageField>

          {edit && (
            <AllImagesUploaded>
              <Grid
                sx={{
                  display:
                    selectedImagesList?.length === IMAGE_LIMIT
                      ? "none"
                      : "block",
                }}
              >
                <ImageTextField
                  sx={{
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      padding: "36px",
                    },
                  }}
                  variant="filled"
                  type="file"
                  name="myImage"
                  inputProps={{ multiple: true }}
                  onChange={(e: any) => {
                    fileUploadManager(e);
                  }}
                />
                {edit && (
                  <UploadForImage
                    image={`${ReplaceImage(PLUS_IMAGE_FOR_UPLOADS)}`}
                    sx={{
                      display:
                        selectedImagesList?.length === IMAGE_LIMIT
                          ? "none"
                          : "block",
                    }}
                  ></UploadForImage>
                )}
              </Grid>
            </AllImagesUploaded>
          )}
        </Box>

        {edit && (
          <Typography
            sx={{
              display:
                selectedImagesList?.length === IMAGE_LIMIT ? "none" : "block",
              color: "#474747",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            {PHOTOS_CONTENT}
          </Typography>
        )}
        <ImageSizeErrorMsg>{moreImageSize}</ImageSizeErrorMsg>
      </>
    );
  };
  const mobileAndWebImageUI = () => {
    return (
      <>
        {isMobile ? (
          <Accordion
            sx={{
              backgroundColor: "#F7F6F9",
              borderTop: "0.5px solid #D7CEE7",
              boxShadow: "none",
              display:
                selectedImagesList?.length === 0 && !edit ? "none" : "unset",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#333" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ padding: "0px 16px 0px 0px" }}
            >
              <Typography style={{ fontWeight: 600 }}>
                {PHOTOS_TITLE}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AllImagesUploaded>
                <UploadImageField
                  {...responsive}
                  sx={{
                    gridGap: selectedImagesList?.length === 0 ? "0" : "10px",
                  }}
                >
                  {selectedImagesList &&
                    selectedImagesList?.map((image: any, index: number) => {
                      return (
                        <Grid
                          sx={{
                            display: "flex",
                          }}
                          key={image}
                        >
                          <UploadedViewImage
                            src={image}
                            isMobile={isMobile}
                            onError={(e: any) => onImageError(e, errorImage)}
                          />
                          {edit && (
                            <CrossMarkEntity
                              onClick={() => handleRemove(index)}
                            >
                              &#10005;
                            </CrossMarkEntity>
                          )}
                        </Grid>
                      );
                    })}
                </UploadImageField>
                {edit && (
                  <Grid
                    sx={{
                      display:
                        selectedImagesList?.length === IMAGE_LIMIT
                          ? "none"
                          : "block",
                    }}
                  >
                    <ImageTextField
                      sx={{
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "36px",
                        },
                      }}
                      variant="filled"
                      {...responsive}
                      type="file"
                      name="myImage"
                      inputProps={{ multiple: true }}
                      onChange={(e: any) => {
                        fileUploadManager(e);
                      }}
                    />
                    {edit && (
                      <UploadForImage
                        {...responsive}
                        image={`${ReplaceImage(PLUS_IMAGE_FOR_UPLOADS)}`}
                        sx={{
                          display:
                            selectedImagesList?.length === IMAGE_LIMIT
                              ? "none"
                              : "block",
                        }}
                      ></UploadForImage>
                    )}
                  </Grid>
                )}
              </AllImagesUploaded>
              {edit && (
                <Typography
                  sx={{
                    display:
                      selectedImagesList?.length === IMAGE_LIMIT
                        ? "none"
                        : "block",
                    color: "#474747",
                    fontSize: "14px",
                    marginTop: "10px",
                  }}
                >
                  {PHOTOS_CONTENT}
                </Typography>
              )}
              <ImageSizeErrorMsg>{moreImageSize}</ImageSizeErrorMsg>
            </AccordionDetails>
          </Accordion>
        ) : (
          // desktop view image section
          <>{desktopViewImageUI()}</>
        )}
        {edit && (
          <>
            <SaveButton onClick={() => handleSubmit(review_id)}>
              {SAVE_BUTTON}
            </SaveButton>
            <CancelButton variant="outlined" onClick={handleCancle}>
              {CANCEL_BUTTON}
            </CancelButton>
          </>
        )}
      </>
    );
  };
  return (
    <>
      {isMobile ? (
        <Accordion
          sx={{
            backgroundColor: "#F7F6F9",
            boxShadow: "none",
            borderTop: "0.5px solid #D7CEE7",
            display: !edit && !editDeails ? "none" : "unset",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#333" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ padding: "0px 16px 0px 0px" }}
          >
            <Typography sx={{ fontWeight: 600 }}>{REVIEW_HEADING}</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "1px 1px 1px 12px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div style={commentBoxTextStyle}>
              {!edit ? (
                <ReadMore>{editDeails}</ReadMore>
              ) : (
                <TextareaAutosize
                  value={editDeails}
                  minRows={4}
                  onChange={(e) => setEditDetails(e?.target?.value)}
                  style={{
                    border: "none",
                    resize: "none",
                    width: "100%",
                    outline: "none",
                    padding: "4%",
                  }}
                />
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      ) : (
        <Box>
          {!edit && editDeails && (
            <>
              <CommonTitle>{REVIEW_HEADING}</CommonTitle>
              <TitleAndDescription>
                <div>
                  <ReadMore>{editDeails}</ReadMore>
                </div>
              </TitleAndDescription>
            </>
          )}
          {edit && (
            <>
              <CommonTitle>{REVIEW_HEADING}</CommonTitle>
              <TitleAndDescription>
                <div>
                  <TextareaAutosize
                    value={editDeails}
                    onChange={(e) => setEditDetails(e?.target?.value)}
                    minRows={5}
                    style={{
                      border: "none",
                      resize: "none",
                      width: "100%",
                      outline: "none",
                      padding: "4%",
                    }}
                  />
                </div>
              </TitleAndDescription>
            </>
          )}
        </Box>
      )}
      {mobileAndWebImageUI()}
    </>
  );
};

export default ReviewRatingUI;
