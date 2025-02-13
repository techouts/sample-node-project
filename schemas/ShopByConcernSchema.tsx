export interface ListItems {
  id: number;
  imageUrl: string;
}

export default interface ShopByConcernInterface {
  id: number;
  __component: string;
  data: {
    title: string;
    items: ListItems[];
  };
}
