type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`
export type LIST_ITEMS = {
    imageUrl: string | URL;
    imagePath: string;
  };
export default interface FooterMediaInterface {
    __component:string;
    id:string;
    data: {
      bgColor: RGB | RGBA | HEX | string;
      bgPadding: string;
      followText: string;
      subscibeText: string;
      buttonText: string;
      placeholderText: string;
      columns: number;
      items: LIST_ITEMS[];
    };
  }