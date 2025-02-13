import { ColorType } from "../utility/ColorType";

export default interface BeautyShopSchema {
  bgColor: ColorType;
  bgPadding: string;
  arrowImageUrl: string;
  buttonPath: URL | string;
  galleryButtonText: string;
  gallerImageUrl: string;
  componentName: string;
  id: number;
  position: number;
  subheading: string;
  heading: string;
  galleryItems: LIST_ITEM[];
}

export type LIST_ITEM = {
  closeCircle: string;
  tickCircle: string;
  buttonText: string;
  buttonBgcolor: string;
  brandText: string;
  prosHeading: string;
  prosText: string;
  consHeading: string;
  consText: string;
  content: string;
  imageUrl: string;
  prosConsUrl: string;
  mobileImage: string;
  buttonPath: URL | string;
  imageAltText: string;
  componentName: string;
  item: any;
  widgetposition: number;
  items: any;
};
