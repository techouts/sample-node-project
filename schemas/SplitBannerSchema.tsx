type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface SpiltBannerSchema {
  __component: string;
  id: number;
  bgColor: RGB | RGBA | HEX | string;
  bgPadding: string;
  imageUrl: string;
  imageUrlMobile: string;
  pathLeft: string | URL;
  pathRight: string | URL;
  isNewTab: boolean;
  display: null;
  position: number;
  Item_name: string;
  Item_type: string;
  promotion_id: string;
  promotion_name: string;
  creative_name: string;
  creative_slot: string;
}
