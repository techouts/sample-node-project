import { ColorType } from "../../utility/ColorType";

export type LIST_ITEM = {
  // id: number;
  number: number;
  imageUrl?: string;
  plusImage: string;
  circleImage: string;
  subItems: POSITIONS[];
};

export type POSITIONS = {
  key: string;
  top: string;
  left: string;
  tooltipMsg: string;
  tooltipPlacement: string;
  mobileTopPosition: string;
  mobileLeftPosition: string;
};
export default interface CategorySchema {
  items: LIST_ITEM[];
  titleForMobile: string;
  titleForWeb: string;
  shopButton: string;
  position: string;
  shopButtonPath: string | URL;
  bgColor: string | ColorType;
  bgPadding: string;
  __component:string;
  id:any;
}
