type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface CartAddressInterface {
  bgColor: RGB | RGBA | HEX | string;
  addressTypography: string;
  title: string;
  showTextOnHover: boolean;
  showGradient: boolean;
  itemBackgroundSpacing: string;
  columns: number;
  data: [
    {
      imageUrl: string;
      text: string;
      subText: string;
      textColor: RGB | RGBA | HEX | string;
      offerBackground: RGB | RGBA | HEX | string;
      path: string | URL;
    }
  ];
}
