type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type LIST_ITEMS = {
  description: string,
  tileSpacing: string,
  tileText: string,
  itemPaddingHorizontalMobile: string,
};

export interface ShopbyIngredientInterface {
  id: string;
  __component: string;
  bgColor: RGB | RGBA | HEX | string;
  bgPadding: string;
  title: string;
  titleColor: RGB | RGBA | HEX | string;
  showTextOnHover: boolean;
  showGradient: boolean;
  marginBottom: string;
  marginX: string;
  itemPaddingBottom: string;
  itemPaddingX: string;
  itemBackgroundSpacing: string;
  smallTextColor: string;
  desktopColumns: number;
  mobileColumns: number;
  position: number;
  ctaLabel: string;
  items: LIST_ITEMS[];
  mobileItems: LIST_ITEMS[];
  marginLeft: string;
  itemPaddingBottomMobile: string;
  itempaddingXMobile: string;
  itemPaddingHorizontal: string;
  description: string;
  text: string;
  tileSpacing: string;
  itemPaddingHorizontalMobile: string;
}
