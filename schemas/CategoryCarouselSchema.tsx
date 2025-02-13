import { ColorType } from "../utility/ColorType";

type LIST_ITEM = {
  imageUrl: string;
  title: string;
  subTitle: string;
  imageUrlMobile: string;
  path: string;
  isNewTab: boolean;
  position: number;
};
export default interface CategoryCarouselInterface {
  __component: string;
  id: number;
  bgColor: ColorType;
  bgpadding: string;
  bgImageUrl: URL | string;
  title: string;
  items: LIST_ITEM[];
  position: number;
}
