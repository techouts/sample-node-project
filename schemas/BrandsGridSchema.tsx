import { ColorType } from "../utility/ColorType";

type LIST_ITEM = {
  imageUrl: string;
  imageUrlMobile: string;
  path: string;
  isNewTab: boolean;
  creative_name: string,
  creative_slot: any,
};
export default interface MultiTilesInterface {
  __component: string;
  id: number;
  bgColor: ColorType;
  bgPadding: string;
  contentImageUrl: string;
  contentImageUrlMobile: string;
  contentImagePath: string;
  contentImageisNewTab: boolean;
  bgImageUrl: string;
  bgMobileImageUrl: string;
  button: string;
  buttonPath: string;
  items: LIST_ITEM[];
  position:number;
  title:string;
  promotion_id: any;
  promotion_name: string,
}
