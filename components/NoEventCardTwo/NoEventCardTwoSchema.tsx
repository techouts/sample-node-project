import { ColorType } from "../../utility/ColorType";

export type LIST_ITEMS = {
  id: number;
  imgUrl: string;
  imgUrlMobile: string;
  stripText: string;
  boxText: string;
  boxSubText: string;
};

export default interface NoEventCardTwoSchema {
  title?: string;
  bgColor?: string | ColorType;
  bgPadding?: string;
  items?: LIST_ITEMS[];
}
