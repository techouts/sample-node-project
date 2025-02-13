import { ColorType } from "../utility/ColorType";

export type ITEMS_LIST = {
  imageUrl: string;
  text: string;
  subText: string;
  path: string;
  offerText: string;
  smallText: string;
  offerBackground: ColorType;
  textColor: ColorType;
  isNewtab: boolean;
  subTextColor: ColorType;
  id: number;
  mobileTitle: string;
  Item_name: string;
  Item_type: string;
  promotion_id: string;
  promotion_name: string;
  creative_name: string;
  creative_slot: string;
  textHoverBG: string;
};

export interface BuyingGuideInterface {
  id: number;
  __component: string;
  bgColor: string;
  bgPadding: string;
  title: string;
  titleColor: string;
  showTextOnHover: string | null;
  showGradient: string | null;
  itemBackgroundSpacing: string;
  itemPaddingBottom: string;
  itemPaddingX: string;
  desktopColumns: number;
  mobileColumns: number;
  viewMore: string;
  viewMoreLink: string;
  topViewMore: string;
  isBgColor: boolean;
  marginLeft: string;
  display: string;
  carouselDots: string | null;
  cardBorder: boolean;
  position: number;
  mobileItems: ITEMS_LIST[];
  items: ITEMS_LIST[];
  promotion_id: string;
  promotion_name: string;
}
