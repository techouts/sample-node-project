import { ColorType } from "../utility/ColorType";

export type LIST_ITEMS = {
  id: number;
  imageUrl: string;
  imageMobileUrl?: string;
  path: string | URL;
  text: string;
  isNewTab: any;
  Item_name: string;
  Item_type: string;
  creative_name: string;
  creative_slot: string;
};
export default interface MultiShowcaseInterface {
  __component: string;
  id: number;
  title: string;
  bgPadding: string;
  bgColor: ColorType | string;
  textColor?: ColorType | string;
  contentLeft: boolean;
  contentImageUrl: string;
  contentImageUrlMobile: string;
  display: null | string;
  zigzag: boolean;
  items: LIST_ITEMS[];
  path: string | URL;
  position: number;
  promotion_id: string;
  promotion_name: string;
}
