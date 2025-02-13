type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface SavePaymentInterface {
  addUpiButton: string;
  _component: string;
  _id: number;
  bgPadding: string;
  bgColor: RGB | RGBA | HEX | string;
  title: string;
  bhimUpi: string;
  gpayUpi: string;
  paytmUpi: string;
  phonePeUpi: string;
  upiInfo: string;
  upiDemo: string;
  inputLabel: string;
  defalutUpi: string;
  inputPlaceHolder: string;
}
