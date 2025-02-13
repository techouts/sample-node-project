import { ColorType } from "../utility/ColorType";

export type banner = {
  imageUrl: string;
  title:string;
  id:number;
  arrowCarouselImageUrl:string;
  galleryCarouselButtonText:string;
  
};

export type QuickContent ={
  title:string
  Content:string;
 
};
export default interface AppBlogInterface {
__component: string;
id: number;
bgColor:ColorType;
bgPadding:string;
bannerItems: banner[];
data:string;
title: string;
button: string;
numberOfViews: string;
heading: string;
subheading: string;
name: string;
paragraph: string;
quickView:string;
showButton:string,
hideButton:string;
headLine:string;
galleryItems: LIST_ITEM[]
QuickContent: QuickContent[];
Info:{
  Information:Data_Info[]
}   
}
export interface Data_Info{
items:List_Items[],
headLine:string;
}
export interface List_Items {
   title: string;
   data:List[]
 }
 export interface List {
   imageUrl:  string;
   mobileImageurl:  string;
   shadowImage:string;
   subTitle: string;
   description:string;
 }
 export type LIST_ITEM = {
  buttonText:string;
  buttonBgcolor:string;
  brandText:string;
  prosHeading:string;
  prosText:string;
  consHeading:string;
  consText:string;
  content:string;
  imageUrl:string;
  prosConsUrl:string;
  mobileImage:string;
  tickCircle:string;
  closeCirlce:string;
}

 
 