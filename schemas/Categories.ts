type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export interface ListItems {
  id: number;
  imageUrl: string;
  textHoverBG?: RGB | RGBA | HEX | string;
  text: string;
  path: string | URL;
  Item_type:string;
  Item_name:string;
  // position:number;
}

export default interface CategoryInterface {
  id: number;
  __component: string;
  bgColor: RGB | RGBA | HEX | string;
  bgPadding: string;
  title: string;
  display: null | string;
  viewMore?: string;
  viewMoreLink?: URL | string | null | undefined | any;
  isTextHover?: boolean;
  items: ListItems[];
  mobileItems: ListItems[] | undefined | null;
  position?: number;
}
