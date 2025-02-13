import { ColorType } from "../../utility/ColorType";

export type LIST_ITEMS = {
  id: number;
  imgUrl: string;
  title: string;
  description: string;
  eventDetailsTitle: string;
  registerBtn: string;
  registerBtnPath: string;
  date: string;
  time: string;
  price: string;
  location: string;
  imgUrlMobile: string;
  imgPath: string;
};

export default interface EventCardSchema {
  id: number;
  __component: string;
  title: null;
  noEventTitle?: string;
  noEventSubTitle?: string;
  imgUrl?: string;
  bgColor: string | ColorType;
  bgPadding: string;
  items: LIST_ITEMS[];
  position:number;
}
