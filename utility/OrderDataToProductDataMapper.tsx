import { CATEGORY_PRODUCTS } from "../graphQLQueries/SearchListQuery";
import AxiosInstance from "./AxiosInstance";

export async function OrderDataToProductDataMapper(orderData: any) {
  let queryParam = "";
  let products: any = [];
  orderData?.map((order: any, index: any) => {
    queryParam =
      queryParam +
      `"${order?.items[0]?.parent_sku}"` +
      (index === orderData?.length - 1 ? "" : ",");
  });
  const productData = await AxiosInstance(
    CATEGORY_PRODUCTS(queryParam),
    false,
    false
  )
    .then((res) => {
      return res?.data?.data?.products?.items;
    })
    .catch((err: any) => {
      console.log(err);
    });

  productData?.map((orderedProdcut: any) => {
    products.push({ product: orderedProdcut });
  });
  return products;
}
