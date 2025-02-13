type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export interface CardDeatilsInterface {
  _component: string;
  _id: number;
  bgPadding: string;
  bgColor: RGB | RGBA | HEX | string;
  titleAdd: string;
  titleEdit: string;
  cardNumber: string;
  cardLogo: string;
  cardEditBrand: string;
  cardNo: string;
  cardImageUrl: string;
  cardName: string;
  cardNamefill: string;
  expiryDate: string;
  months: string;
  years: string;
  checkBox: string;
  save: string;
  cancel: string;
}
