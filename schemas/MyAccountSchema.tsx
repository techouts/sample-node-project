export type LIST_ITEMS = {
  item?: string;
  path?: string;
};

export default interface MyAccountNavSchema {
  data?: LIST_ITEMS[];
}
