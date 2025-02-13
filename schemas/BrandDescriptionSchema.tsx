import { ColorType } from "../utility/ColorType";

type LIST_ITEM = {
  iconUrl: string;
  iconPath: URL | string;
};
export default interface BrandDescriptionInterface {
  __component: string;
  id: number;
  bgColor: string;
  bgPadding: string;
  title: string;
  ctaLabel: string;
  description: string;
  titleColor: ColorType;
  imgUrl: string;
  imgUrlMobile: string;
  subTitle: string;
  subTitleColor: ColorType;
  items: LIST_ITEM[];
  ctaLabelUrl: URL | string;
  position:number;
}
