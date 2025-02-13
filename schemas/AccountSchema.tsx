type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface AccountsInterface {
  _component: string;
  id: number;
  bgColor: RGB | RGBA | HEX | string;
  bgPadding: string;
  data: {
    profileTextOne:string;
    profileTextTwo:string;
    profileimagelogo: string;
    profileimageback: string;
    profilepicture: string;
    profileText: string;
    profileName: string;
    profileLevel: string;
    editLogo: string;
    editText: string;
    gender: string;
    email: string;
    verify: string;
    mobileNumber: string;
    dateOfBirth: string;
    anniversary: string;
    passwordText: string;
    calender: string;
  };
}
