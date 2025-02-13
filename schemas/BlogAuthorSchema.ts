type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type LIST_ITEMS = {
  imageUrl: string;
  title: string;
  subTitle: string;
  readMoreText: string;
  chiptext: string;
  viewText: string;
  ReadMorePath: string | URL;
  isSharable: boolean;
  position: boolean;
  isVideo: boolean;
};

export default interface BlogAuthorSchema {
  __component: string;
  id: string;
  bgColor: RGB | RGBA | HEX | string;
  bgPadding: string;
  title: string;
  position: number;
  items: LIST_ITEMS[];
  viewAllPath: string;
  viewAllText: string | URL;
  sortByBottom: boolean;
  Item_name: any;
  Item_type: any;
  promotion_id: string;
  promotion_name: string;
}