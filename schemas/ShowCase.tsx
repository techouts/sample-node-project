type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface TrunkShowInterface {
  id: number;
  __component: string;
  bgColor: RGB | RGBA | HEX | string;
  bgPadding: string;
  title: string;
  contentImageUrl: string;
  contentImageUrlMobile: string;
  contentLeft: boolean;
  display: null;
  zigzag: null;
  position: number;
  items: Item[];
  promotion_name?: string;
  promotion_id?: string;
}

export interface Item {
  id: number;
  imageUrl: string;
  text: string;
  subText: string;
  textColor: RGB | RGBA | HEX | string;
  offerBackground: RGB | RGBA | HEX | string;
  path: string | URL;
  isNewTab: null;
  Item_name: string;
  Item_type: string;
  creative_name: string;
  creative_slot: string;
}
