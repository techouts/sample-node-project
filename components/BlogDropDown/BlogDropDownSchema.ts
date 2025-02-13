import { ColorType } from "../../utility/ColorType";

export default interface DropDownInterface {
  title: string;
  bgColor:ColorType
  bgPadding:string;
  items: List_Items[];
  titlePath:URL | string;
  id:number;
}
export type List_Items= {
  title: string;
  id:number;
  titlePath: URL | string;
  list: [
    {
      id:number;
      label: string;
      labelPath:string;
      titlePath: URL | string;
    }
  ];
}
