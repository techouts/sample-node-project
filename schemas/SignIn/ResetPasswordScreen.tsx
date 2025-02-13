type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export interface ResetPasswordScreenComponentInterface {
  itemData: {
    title: string;
    subTitle: string;
    PlaceHolder: string;
    PlaceHolder1: string;
    buttontext: string;
    buttonUrl: string;
    ImageUrl: string;
    helpIconUrl: string;
    helpText: string;
    checkList: [
      {
        message: string;
      }
    ];
    bgColor: RGB | RGBA | HEX | string;
    columns: number;
  };
}
