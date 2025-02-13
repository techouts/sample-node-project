export default interface ShopTheLookSchema {
    items: LIST_ITEM[];
  }
  export type LIST_ITEM = {
    imageUrl: string;
    title: string;
    wishlist: string;
    rating: number | string;
    price: number;
    MRPText: string;
    addTocartText: string;
  };