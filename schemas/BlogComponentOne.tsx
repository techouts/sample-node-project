import { ColorType } from "../utility/ColorType";

export type Blog = {
  imageUrl: string;
  subTitle: string;
  button: string;
  viewsText:string;
  shareText: string;
  numberOfViews: string;
  readMoreText: string;
  shareIcon:string;
  viewsIcon:string;
  path:string;
  readMore:string;
  Item_name:string;
  Item_type:any;
  imgPath:any;
  creative_name: string;
  creative_slot: any;
};

export default interface BlogComponentOneInterface {
  __component: string;
  id: number;
  items: Blog[];
  title: string;
  bgColor: ColorType;
  bgPadding: string;
  viewMore: string;
  position:number;
  viewMorePath:URL | string;
  imageAltText:string;
  promotion_id: string,
  promotion_name: string,
}
