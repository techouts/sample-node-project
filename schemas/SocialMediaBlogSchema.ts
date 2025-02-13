type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export type LIST_ITEMS = {
  subTitle: string;
  imageUrl: string;
  mobileImageurl: string;
  title: string;
  description: string;
  path:string;
  imageDirection:boolean;
  showEmbed: boolean;
  embedText: string;
  imageAltText:string;
  enableJumplinks:boolean;
  headingLevel:string;
  Item_name: string;
};
export default interface SocialMediaSchema {
  __component: string;
  id: string;
    bgColor: RGB | RGBA | HEX | string;
    bgPadding: string;
    title: string;
    imageDirection:boolean;
    items: LIST_ITEMS[];
    enableJumplinks:boolean;
    description:string;
    headingLevel:string;
    position:number;
    imageUrl: string;
}
