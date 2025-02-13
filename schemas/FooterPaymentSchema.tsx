import { ColorType } from "../utility/ColorType";

export default interface FooterPaymentInterface {
  id: number;
  __component: string;
  bgColor: ColorType | string;
  bgPadding: string;
  items: List_items[];
}
export interface List_items {
  id: number;
  title: string;
  imageUrl: string | null;
  imagePath: URL|string ;
  subText: string ;
  subTextMobile: string ;
  isNewTab: boolean | null;
  secondImageUrl: string;
  secondImageUrlPath: string ;
}
