import { ColorType } from "../utility/ColorType";
export interface LIST_ITEMS {
  imageUrl: string;
  mobileImageUrl: string;
  buttonText: string;
  eyeLogo: string;
  views: string;
  viewsText: string;
  headText: string;
  readText: string;
  shareLogo: string;
  shareText: string;
}
export default interface FooterBlogInterface {
  id: number;
  __component: string;
    bgColor: ColorType;
    bgPadding: string;
    Maintext: string;
    items: LIST_ITEMS[];
    position:number;
    imageAltText:string;
}