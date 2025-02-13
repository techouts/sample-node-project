import { useState, useEffect } from "react";

export function UniqueBrands(cartStore: any, userDataItems: any) {
  const [uniqueBrands, setUniqueBrands] = useState([]);

  useEffect(() => {
    function calculateUniqueBrands() {
      if (userDataItems?.storeMode) {
        setUniqueBrands([]);
        return;
      }

      const items = cartStore?.cartItems?.cart?.items || [];
      const itemsWithDiscount = cartStore?.cartItems?.cart?.item_level_promotions || [];

      const skuProductDiscountMap = new Map();
      itemsWithDiscount.forEach((item) => {
        const product = items.find((p) => p.configured_variant?.sku === item.sku);
        if (product) {
          const getPmrDiscountPrice = () => {
            const sku = product?.configured_variant?.sku
              ? product?.configured_variant?.sku
              : product?.product?.sku;
            return cartStore?.cartItems?.cart?.item_level_promotions?.filter(
              (data: any) => {
                return data?.sku === sku;
              }
            )?.[0];
          };

          skuProductDiscountMap.set(item.sku, {
            sku: item.sku,
            brandName: product.product?.brand_info,
            discount:`${Math.round(
              getPmrDiscountPrice()?.discount
                ? (getPmrDiscountPrice()?.discount /
                    product?.prices?.row_total?.value) *
                    100
                : (product?.prices?.total_item_discount?.value /
                    product?.prices?.row_total?.value) *
                    100
            )}`
          });
        }
      });

      const brandProducts = new Map();
      skuProductDiscountMap.forEach((product) => {
        if (product.brandName) {
          if (!brandProducts.has(product.brandName)) {
            brandProducts.set(product.brandName, []);
          }
          brandProducts.get(product.brandName).push(product);
        }
      });

      const topBrands = Array.from(brandProducts.entries())
        .map(([brandName, products]) => {
          const highestDiscountProduct = products.sort((a, b) => b.discount - a.discount)[0];
          return highestDiscountProduct;
        })
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 3);

      setUniqueBrands(topBrands);
    }

    calculateUniqueBrands();
  }, [cartStore?.cartItems, userDataItems?.storeMode]);

  return uniqueBrands;
}