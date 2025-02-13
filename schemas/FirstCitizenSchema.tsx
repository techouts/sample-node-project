export default interface FirstCitizenSchema {
  id: number;
  __component: string;
  navTitle: string;
  navImgUrl: string;
  navImgUrlPath: string;
  navImgUrlMobile: string;
  navImgUrlMobilPath: string;
  title: string;
  subTitle: string;
  loginButton: string;
  loginButtonPath: string;
  signUpButton: string;
  signUpButtonPath: string;
  isLoggedIn: boolean;
  fcLogo: string;
  fcNacInnerTitle: string;
  fcNavInnerSubTitle: string;
  fcTierTitle: string;
  fcTierSubTitle: string;
  bgPadding: string;
  bgColor: string;
  items: ITEMS[];
  item: ITEM[];
}
export type ITEMS = {
    id:number;
    title:string;
    titlePath:string;
    tier:string;
    key:null;
}
export type ITEM = {
    id:number;
    title:string;
    subText:string;
    crownLogo:string;
    crownLogoPath:string;
    imageUrl:string;
    imageUrlPath:string;
    alignment:boolean;
    bgImageUrl:string;
    bgImageUrlMobile:string;
    tierDescription:string;
    enrollButtonText:string;
    enrollButtonPath:string;
    quote:string;
    tier:string;
}