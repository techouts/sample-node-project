export type LIST_ITEMS = {
  title: string;
  product_name: string;
  product_sale_price: number;
  discountTitle: string;
  discountPrice: number;
  convenienceTitle: string;
  convenienceFee: number;
  deliveryLabel: string;
  deliveryCharges: number;
  totalTitle: string;
  name:string;
  totalAmount: number;
  payment_methods: string;
  buttonName: string;
  value: any;
  quantity_ordered:number;
};

export default interface MyOrderModelSchema {
  items: LIST_ITEMS[];
}
