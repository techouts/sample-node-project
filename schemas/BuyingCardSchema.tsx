export interface ListItems {
  imageUrl: string;
  title: string;
  subTitle:string;
}

export default interface BuyingGuidesNewInterface {
  data: {
    title: string;
    items: ListItems[];
  };
}
