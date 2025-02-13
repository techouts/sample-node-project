type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface CardInfoInterface {
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
  subText: string;
  isNewTab: boolean;
}
