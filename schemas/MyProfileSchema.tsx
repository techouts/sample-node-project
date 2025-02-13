type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface MyProfileInterface {
  _component?: string;
  id?: number;
  bgColor?: RGB | RGBA | HEX | string;
  bgPadding?: string;
    profileimagelogo?: string;
    profileimageback?: string;
    profilepicture?: string;
    profileText?: string;
    profileName?: string;
    profileLevel?: string;
    editLogo?: string;
    editText?: string;
    gender?: string;
    verify?: string;
    mobileVerify?: string;
    email?: string;
    mobileNumber?: string;
    dateOfBirth?: string;
    anniversary?: string;
    passwordText?: string;
}
