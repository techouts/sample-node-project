type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export interface ListItems
  {
    imageUrl: string;
    imageUrlMobile: string;
    path: string | URL;
    textInfo: string;
    textCost: string;
    textStrick: string;
    textDiscount: string;
    textTaxes: string;
  }
export interface socialMediaListItem{
  backgroundColor: RGB | RGBA | HEX | string;
  mediaName: string;
  path: string|URL;
}
export default interface ShareInfoInterface {
  data: {
    title: string;
    bgColor: RGB | RGBA | HEX | string;
    bgPadding: string;
    items: ListItems[];
    socialMedia: socialMediaListItem[ ];
  };
}

