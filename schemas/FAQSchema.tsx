export default interface FAQInterface {
  [x: string]: any;
  _id: any;
  component: string;
  searchSelect:any;
  searchText:string;
  bgPadding: string;
  title: string;
  subText: string;
  bottomText: string;
  categories: CATEGORY_LIST[];
}
export type CATEGORY_LIST = {
  id: number;
  title: string;
  subText: string;
  group: string;
  subCategories: SUB_CAT_LIST[];
};
export type SUB_CAT_LIST = {
    id: number;
  title: string;
  subText: string;
  path:string;
};
