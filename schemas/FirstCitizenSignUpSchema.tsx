
export interface FirstCitizenSignUpInterface {
  __component: string;
  id:number;
  title: string;
  subTitle: string;
  isLoggedIn:boolean;
  loginButton: string;
  loginButtonPath: URL | string;
  signUpButtonPath:URL | string;
  submitButton: string;
  signUpButton: string ;
  items:[]
}

export interface items{
  alignment:boolean;
  bgImageUrl:string;
  bgImageUrlMobile:string;
  crownLogo:string;
  crownLogoPath:URL | string;
  enrollButtonPath:URL | string;
  enrollButtonText:string;
  id:number;
  imageUrl:string;
  imageUrlPath:string|URL;
  quote:string;
  subText:string;
  tierDescription:string;
  title:string;
}