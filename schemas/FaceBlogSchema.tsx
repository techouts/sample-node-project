type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface FaceBlogInterface {
  _id: number;
  __component: string;
  bgColor: RGB | RGBA | HEX | string;
  bgPadding: string;
  items: List_Items[];
}

interface List_Items {
  id: number;
  title: string;
  imageUrl: URL | string;
  imagePath: URL | string;
  subTitle: string;
  isNewTab: boolean;
  readMoreText:string;
  viewIcon: URL | string;
  viewText:string;
  view:string;
  shareText:string;
}
