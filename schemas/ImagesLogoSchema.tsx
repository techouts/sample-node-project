type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type LIST_ITEMS = {
  imageURL: string | URL;
  text: string;
  textColor: RGB | RGBA | HEX | string;
  path: string | URL;
  description: string;
};
export type items = {
  icon: string;
  iconText: string;
};
export default interface ImagesLogoSchema {
  __component: string;
  id: number | string;
  bgColor: string;
  bgPadding: string;
  title:string;
  backEndItems: LIST_ITEMS[];
  items: items[];
}
