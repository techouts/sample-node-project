type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export interface HeaderListItems {
  text: string;
  isNewTab: boolean;
  webUrl: string;
  mobileText: string;
  mobileIcons: string;
  mobileIconUrl: string;
}
export default interface HeaderSchema {
  bgColor: RGB | RGBA | HEX;
  bgPadding: string;
  cartIconPath: string;
  cartIconUrl: string;
  crossIconUrl: string;
  ctaLabel: string;
  trendLogo: string;
  ctaLabelBgColor: RGB | RGBA | HEX;
  ctaLabelColor: RGB | RGBA | HEX;
  ctaLabelUrl: string;
  id: number;
  logoImageUrl: string;
  logoPath: string;
  searchIconUrl: string;
  searchText: string;
  signInPath: string;
  signInText: string;
  topIconUrl: string;
  userIconPath: string;
  userIconUrl: string;
  wishListIconUrl: string;
  wishListPath: string;
  items: HeaderListItems[];
  profileImgUrl: string;
  isHideBottomNav?: boolean;
  signOpen?: boolean;
  setAccountRerender?: any;
  accountRerender?: any;
  topItems: any;
  BrandItems: any;
  Brands: any;
  popularBrands: any;
  setSignOpen?: Function;
  isPDP?: boolean;
  isPLP?: boolean;
  popularCategories?: any;
  unbxdCarousel?: any;
  searchbarTexts?: any;
  productData?:any
}

export interface DrawerCompInterface {
  items: HeaderListItems[];
  crossIconUrl: string;
  signInPath: string;
  signInText: string;
  userIconUrl: string;
  ctaRecent: string;
  ctaLogo: string;
  ctaLabel: string;
  recentdata: string;
  ctaLabelBgColor: RGB | RGBA | HEX;
  ctaLabelColor: RGB | RGBA | HEX;
  ctaLabelUrl: string;
  handleDialog: Function;
  setQrcode: Function;
  CustomerID: any;
}
