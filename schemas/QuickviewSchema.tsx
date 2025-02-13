type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export default interface QuickviewInterface {
  data: {
    bgColor: RGB | RGBA | HEX | string;
    bgPadding: string;
    title: string;
    buttonCart: string;
    buttonBuy: string;
    delivery: string;
    enterPin: number;
    images: [
      {
        imageUrl:  string;
      }
    ];
    loveIcon: {
      imageUrl: string | URL;
      path: URL;
    };
    discountIcon : {
        imageUrl: string | URL;
      path: URL; 
    };
  };
}