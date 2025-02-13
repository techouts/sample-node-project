import { ColorType } from "../utility/ColorType";

export default interface ExperienceLuxuryStoreSchema {
  __component: string;
  id: number;
  bgColor: ColorType;
  bgPadding: string;
  title: string;
  titleColor: string;
  items: LIST_ITEM[];
  position:number;
}
export type LIST_ITEM = {
  path: URL | string;
  isNewTab: boolean;
  textBgColor: ColorType;
  text: string;
  imageUrl: string;
  title: string;
  position:number;
  id: number;
  __component: string;
  
}

