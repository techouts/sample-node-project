export type LIST_ITEMS = {
  headingTitle: string;
  imageUrl: string;
  title: string;
  rating: number;
  qtyInMl: number;
  quentity: number;
  price: number;
};
export default interface MyOrderSchema {
  items: LIST_ITEMS[];
}
