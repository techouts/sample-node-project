type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type LIST_ITEMS = {
  id: number;
  imageUrl: string;
  contentType: string;
  title: string;
  subText: string;
  path: string | URL;
  viewsIcon: string;
  viewsText: string;
  shareText: string;
  shareIcon: string;
  position: number;
  Item_name:string;
  Item_type:string;
};
export default interface BeautyStopInterface {
  __component: string;
  id: number;
  bgColor: RGB | RGBA | HEX | string;
  bgPadding: string;
  title: string;
  subText: string;
  imageUrl: string;
  cardTitle: string;
  cardDescription: string;
  buttonText: string;
  buttonPath: string;
  display: null | string;
  contentType: null | string;
  viewMore: null | string;
  beautyButton: null | string;
  items: LIST_ITEMS[];
  position: number;
  Item_type:string;
  Item_name:string;
}
export default interface BeautyTipsInterface {
  __component: string;
  viewsText?: string;
  flag?: boolean;
  description: LIST_ITEMS[];
  data: {
    quote: string;
  };
}
