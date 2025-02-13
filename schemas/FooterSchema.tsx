import { ColorType } from "../utility/ColorType";
export interface FooterInterface {
  __component: string;
  id: number;
  bgColor: ColorType | string;
  bgPadding: string;
  items: List_Items[];
}
export type List_Items = {
  id: number;
  title: string;
  subItems: Sub_List_Items[];
};

export type Sub_List_Items = {
  id: number;
  title: string;
  path: URL | string;
};
