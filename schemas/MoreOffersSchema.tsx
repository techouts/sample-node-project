type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type LIST_ITEMS = {
  imageUrl: string | URL;
  offerText: string;
  offerTextColor: RGB | RGBA | HEX | string;
  offerBackground: RGB | RGBA | HEX | string;
  smallText: string;
  path: string | URL;
};
export default interface MoreOffersSchema {
  data: {
    bgColor: RGB | RGBA | HEX | string;
    bgPadding: string;
    title: string;
    showTextOnHover: boolean;
    showGradient: boolean;
    width: string;
    itemBackgroundSpacing: string;
    columns: number;
    items: LIST_ITEMS[];
  };
}
