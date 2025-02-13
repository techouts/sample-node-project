type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export interface GetTheAppSchema {
  id: number;
  __component: string;
  bgColor: RGB | RGBA | HEX;
  bgPadding: string;
  title: string;
  path: string;
  playStoreimgUrl: string;
  playStoreImgUrlMobile: string;
  appStoreImageUrl:string;
  playStoreImgPath: string;
  appStoreImgPath:string;
  downloadText: string;
  ctaLabel: string;
  placeholder: string;
  componentName: string | null;
  availableOn : string;
  altText: string | null;
  items: LIST_ITEM[];
}
export type LIST_ITEM = {
  id: number;
  number: string;
  label: string;
  description: string;
};