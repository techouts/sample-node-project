const CMSImageUrl = process.env.NEXT_PUBLIC_S3_URL
export const MAKE_CHANGES ='MAKE CHANGES';
export const FIRST_NAME =  ' Name';
export const LAST_NAME = 'Last Name';
export const GENDER = 'Gender';
export const MALE = 'Male';
export const FEMALE = 'Female';
export const OTHER ='Other';
export const EDIT_IMAGE = `${CMSImageUrl}/edit_sso_545a1793bb.png`
export const PROFILEPICTURE = `${CMSImageUrl}/Upload_photo_63f129674f.png`;
export const EMAIL_ID = 'Email ID';
export const MOBILE_NO ='Mobile No.';
export const INFO_TEXT ="*Date of Birth & Anniversary can't be changed once submitted";
export const NAME_FIELD_TEXT = "*Please Enter First Name & Last Name With Space"
export const PROFILE_UPDATE = "Profile Pic Updated Successfully";
export const UPDATE_ADDRESS = " Address Updated Successfully! "
export const DELETE_ADDRESS = " Address Deleted Successfully! "
export const ADD_ADDRESS = "Address Added Successfully! "
export const EMPTY_ADDRESS_IMG = `${CMSImageUrl}/empty_Address_0d67a3caa3.png`
export const UPDATE_ADDRESS_TEXT = "update address";
export const ADD_ADDRESS_TEXT = "add address";
export const WALLET_ACTIVATION = "Wallet Activated successfully"
export const PINCODE_ERROR_MESSAGE = "Please enter a valid pin code"
export const getFormattedDate = (date: any) => {
  let semiFinalDate = new Date(date);
  let year = semiFinalDate?.getFullYear();
  let month = ("0" + (semiFinalDate?.getMonth() + 1)).slice(-2);
  let day =
    semiFinalDate?.getDate() < 9
      ? `0${semiFinalDate?.getDate()}`
      : semiFinalDate?.getDate();

  return `${year}-${month}-${day}`;
};
