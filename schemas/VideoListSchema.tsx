type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface VideoListSchema {
  bgColor: string;
  bgPadding: string;
  isLarge: boolean;
  isLargetype: boolean;
  __component: string;
  position: number;
  id: number;
  items: {
    text: string;
    imageUrl: string;
    mobileImageUrl: string;
    videoButtonImageUrl: string;
    videoUrl: string;
    ContentText: string;
  }[];
}
