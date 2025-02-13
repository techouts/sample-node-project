export default interface FragranceStoreSchema {
  title: string;
  subTitle: string;
  listItems: LIST_ITEM[];
}

export type LIST_ITEM = {
  topTags: {
    map(
      arg0: (tag: any, index: number) => JSX.Element
    ): import("react").ReactNode;
    tagTitle: string;
    logo: string;
    textColor: string;
    istagTitle: boolean;
  };
  favIcon: boolean;
  backgroundImage: string;
  rateIcon: string;
  rating: number;
  productTitle: string;
  price: number;
  oldPrice: number;
  discount: number;
  sizeAvail: number;
  freeAvail: string;
  addTocartText: string;
  addtoCartdurl: string;
  ctaUrl: string | URL;
  ctaType: string;
  buyNowText: string;
  buyNow: string | URL;
};
