type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface TrunkShowInterface {
  componentId: string;
  _Id: number;
  data: {
    bgColor: RGB | RGBA | HEX | string;
    bgPadding: string;
    title: string;
    showTextOnHover: boolean,
    showGradient: boolean,
    itemBackgroundSpacing: string ,
    columns: number,
    items: [
      {
        imageUrl: string;
        offerText: string,
        smallText: string,
        offerTextColor: RGB | RGBA | HEX | string,
        offerBackground: RGB | RGBA | HEX | string,
        webUrl: string | URL;
      }
    ];
  };
}
