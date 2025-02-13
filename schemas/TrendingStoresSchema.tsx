type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export interface List {
  id: number;
  imageUrl: string;
  imageUrlMobile: string;
  path: string | URL;
  isNewTab: boolean;
  Item_name: string;
  Item_type: string;
  altText: string;
  creative_name: string;
  creative_slot: string;
}
export default interface TrendingStoresInterface {
  id: number;
  __component: string;
  title: string;
  bgColor: RGB | RGBA | HEX | string;
  bgPadding: string;
  columns: number;
  display: string | null;
  ctaLabel: string | null;
  ctaLabelUrl: string | URL;
  items: List[];
  position: number;
  index: number;
  promotion_id: string;
  promotion_name: string;
}
