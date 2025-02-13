type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type BANNER_ITEMS = {
  title: string;
  titlePath: string;
  iconUrl: string;
};

export type CARD_ITEMS = {
  cardTitle: string;
  cardSubTitle: string;
  cardIcon: string;
  brand: string;
  category: string;
  isNewTab: boolean;
  ctaLabelUrl: string;
};

export default interface PdpBannerInterface {
  __component: string;
  id: number;
  bgColor: RGB | RGBA | HEX | string;
  bgPadding: string;
  title: string;
  subTitle: string;
  items: BANNER_ITEMS[];
  carditem: CARD_ITEMS[];
  position:number;
  productData:any;
}


export default interface PdpBeautyInspiration{
  title:string;
  bgColor:RGB | RGBA | HEX | string;
  bgPadding:string;
  data:[{
    imageUrl:string;
    title:string;
    subtitle:string;
    videoUrl:string;
  }]
}