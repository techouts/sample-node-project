import { ColorType } from "../utility/ColorType";
export default interface SingleBannerSchema{
    __component: string;
    id: number;
    bgColor: ColorType| string;
    bgPadding: number|string;
    imageUrl: URL | string;
    imageUrlMobile:URL | string;
    path: string | URL;
    isNewTab: boolean;
    display:null | string;
    position?: number;
    Item_name:string;
    Item_type:string;
  }
 
   