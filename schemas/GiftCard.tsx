type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type LIST_ITEMS = {
  imagegiftUrl: string;
  imageMobileUrl: string;
  path: string;
  cols: number;
  rows: number;
};
export type OCCASION_ITEMS = {
  cardtitle: string;
  browsertitle: string;
  giftName: string;
  listImages: LIST_ITEMS[];
  path: string;
};
export type CarousalImages = {
  bannerwebUrl: string;
  bannermobileUrl: string;
  path: string;
};

export interface GiftCardSchema {
  componentId: string;
  title: string;
  cardtitle: string;
  imageitems: CarousalImages[];
  subTitle: string;
  items: OCCASION_ITEMS[];
  viewAll: string;
  buttonText: string;
  ReceivedGiftTitle: string;
  CheckBalanceTitle: string;
  GiftCardRadioLabel: string;
  EVoucherRadioLabel: string;
  CardNumberLabel: string;
  EnterPinLabel: string;
  CheckBalanceButton: string;
  AddBalanceButton: string;
  CheckBalanceNote: string;
  HowTousetitle: string;
  EcardContent: string;
  StoreUseContent: string;
  TnCTitle: string;
  TnCContent: string;
  bgPadding: string;
  setOpen: Function;
  selectedImage: any;
  setSelectedImage: any;
  setEditModal: any;
  editModal: any;
  setCroppedImage?: any;
  croppedImage?: any;
}
export interface GiftData {
  setOpen: Function;
  selectedImage: any;
  setSelectedImage: any;
}
