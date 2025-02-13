import { ColorType } from "../../utility/ColorType";

export type LIST_ITEMS = {
  id: number;
  text: string;
  textPath: string;
  isTabActive: boolean;
  itemName:string;
  itemType:string;
  path: string;
  position:number;
};

export default interface StoresAndEventsTabSchema {
  id: number;
  __component: string;
  title: null;
  isComponentDiffer: boolean;
  ComponentName: string;
  bgColor: string | ColorType;
  bgPadding: string;
  items: LIST_ITEMS[];
  position:number;  
}
