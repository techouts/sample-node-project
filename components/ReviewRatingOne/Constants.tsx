const CMSImageUrl = process.env.NEXT_PUBLIC_S3_URL;
export const IMAGE_LIMIT = 5;
export const IMAGE_SIZE_ERROR_MESSAGE =
  "File size greater than 5 MB, Please change file";
export const PLUS_IMAGE_FOR_UPLOADS = `${CMSImageUrl}/Accountreview_Add_8990c678d8.png`;
export const REVIEW_HEADING = "Review";
export const RATING_HEADING = "Rating";
export const SAVE_BUTTON = "save";
export const CANCEL_BUTTON = "cancel";
export const MODEL_YES_BUTTON = "yes";
export const MODEL_CANCEL_BUTTON = "cancel";
export const PHOTOS_TITLE = "Photos";
export const MODERATION_MESSAGE_PENDING = "Awaiting Moderation";
export const MODERATION_MESSAGE_FAILED = "Moderation Failed";
export const PHOTOS_TEXT =
  " Jpg, Png files only. Max file size 5 MB Max 5 files";
export const PHOTOS_CONTENT =
  "Max 6 photos. make sure your images should be in .jpeg or .png format. max file size 1 MB";
export const EDIT_ICON =
  `${process.env.NEXT_PUBLIC_CMS_IMAGES_URL}/editpencil_icon_2f35c686c9_a4c696b866.svg`;
export const DELETE_ICON =
`${process.env.NEXT_PUBLIC_CMS_IMAGES_URL}/delete_pinkcolour_1cf30de2fb_95444343f0.svg`;
