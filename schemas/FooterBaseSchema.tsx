type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;


export default interface FooterBaseInterface {
  id: number;
  __component?: string;
  bgColor: string;
  bgPadding: string;
  title: string;
  items: LIST_ITEM[];
}
export interface LIST_ITEM {
  id: number;
  title: string;
  path: string;
};
