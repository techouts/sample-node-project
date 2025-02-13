import { ColorType } from "../utility/ColorType";

export default interface EditorPickInterface {
    __component: string;
    id: number;
    bgColor:ColorType;
    bgPadding:string;
    title: string;
    button: string;
    buttonPath:URL;
    items: Items[];
    imageUrl: string;
    mobileImageUrl: string
    buttonText: string;
    noOfViews: string;
    heading: string;
    text: string;
    shareText: string;
    subText: string;
    position:number;

}

export type Items = {
  imageUrl: string;
  buttonText: string;
  noOfViews: string;
  heading: string;
  text: string;
  shareText: string;
  subText: string;
  viewsText: string;
  shareIcon: string;
  viewsIcon: string;
  path: URL;
  imgPath: URL;
  position: number;
  imageAltText: string;
  Item_name: string;
  Item_type: any;
  __component: string;
  id: number;
  componentName: string;
  items: any;
};
