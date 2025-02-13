import { ColorType } from "../utility/ColorType";

export interface HeroBannerItem {
  id?: number;
  imageUrl?: string;
  imageUrlMobile?: string;
  path?: string | URL;
  isNewTab?: boolean;
  Item_name?: string;
  Item_type?: string;
  imageName?: string | null;
  __component?: string;
  altText?: string | null;
}
export default interface HeroBannerSchema {
  __component: string;
  id: number;
  bgColor: ColorType | string;
  bgPadding: string;
  autoPlay: boolean;
  controlType: string;
  items: HeroBannerItem[];
  position?: number;
  key?: number;
  promotion_id?:any;
  promotion_name?:any;
}
