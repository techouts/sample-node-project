import { ColorType } from "../../utility/ColorType";

export type LIST_ITEMS = {
  imgUrl: string;
  imgUrlMobile: string;
  imgPath: string;
};

export default interface StoreTopBrandSchema {
  title?: string;
  bgColor?: string | ColorType;
  bgPadding?: string;
  items?: LIST_ITEMS[];
}
