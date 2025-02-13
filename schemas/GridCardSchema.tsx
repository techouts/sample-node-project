type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type LIST_ITEMS = {
  id: number;
  imageUrl: string;
  text: string;
  textColor: string;
  offerBackground: string;
  subText: string;
  path: string | URL;
  isNewTab: null | string;
  subTextColor: string;
  offerText?: string;
  smallText?: string;
  webUrl?: string;
  marginBottom: string | null;
  marginX: string | null;
  offerTextColor?: RGB | RGBA | HEX | string;
  smallTextColor?: RGB | RGBA | HEX | string | null;
  columns?: number;
  ctaLabel: null | string;
};

export interface GridCardSchema {
  componentId: string;
  data: {
    id: number;
    __component: string;
    bgColor: RGB | RGBA | HEX | string;
    bgPadding: string;
    title: string;
    showTextOnHover: boolean;
    showGradient: boolean;
    itemBackgroundSpacing: string;
    cardBorder: boolean;
    itemPaddingBottom: string;
    itemPaddingX: string;
    titleColor: string;
    desktopColumns: number;
    viewMore: string;
    viewMoreLink: null | string;
    mobileColumns: number | string;
    topViewMore: null | string;
    display: null | string;
    isBgColor: null | string;
    marginBottom: string | null;
    marginX: string | null;
    offerTextColor?: RGB | RGBA | HEX | string;
    offerBackground?: RGB | RGBA | HEX | string;
    smallTextColor?: RGB | RGBA | HEX | string | null;
    columns?: number;
    ctaLabel: null | string;
    items: LIST_ITEMS[];
    mobileItems: LIST_ITEMS[];
  };
}
