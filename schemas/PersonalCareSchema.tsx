import { ColorType } from "../utility/ColorType";
export type Blog = {
  imageUrl: string;
  buttonText: string;
  subText: string;
  shareIcon: string;
  noOfViews: string;
  text: string;
  shareText: string;
  viewsIcon: string;
  viewMore: string;
  readMore: string;
  viewsText: string;
  path: URL;
  imgPath: URL;
  position: number;
  imageAltText: string;
  __component: string;
  componentName: string;
  itemPosition: string;
  promotion_id: string;
  promotion_name: string;
  creative_name: string;
  creative_slot: string;
};
export default interface PersonalCareInterface {
  items: Blog[];
  title: string;
  viewMore: string;
  bgColor: ColorType;
  bgPadding: string;
  position: number;
  viewMorePath: URL | string;
  id: number;
  __component: string;
  promotion_id: string;
  promotion_name: string;
}
