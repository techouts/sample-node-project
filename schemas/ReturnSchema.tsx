type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface ReturnInterface {
  ProductPopUpText: PRODUCT_POPUP[];
  data: {
    bgColor: RGB | RGBA | HEX | string;
    bgPadding: string;
  };
}

export type PRODUCT_POPUP =  {
  title: string;
  text:string;
  buttonText:string;

}

