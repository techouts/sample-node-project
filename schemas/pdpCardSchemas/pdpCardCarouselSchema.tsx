type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export default interface PdcInterface {
  data: {
    bgColor: RGB | RGBA | HEX | string;
    bgPadding: string;
    title: string;
    buttonCart: string;
    buttonBuy: string;
    delivery: string;
    enterPin: string;
    images: [
      {
        imageUrl:  string ;
      }
    ]
    loveIcon: {
      imageUrl: string | URL;
      path: URL;
    };
    sellerTag: {
      imageUrl: string | URL;
      path: URL;
    };
    imageCards: {
      imageUrl: string | URL;
      path: URL;
    };
    easyIcon: {
      imageUrl: string | URL;
      text: string;
    };
    auther: {
      imageUrl: string | URL;
      text: string;
      hiddenText: string;
    };
  };
}