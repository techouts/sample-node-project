import React, { lazy, Suspense, useState } from "react";
import { useMobileCheck } from "../../utility/isMobile";
import LoadingCard from "../ProductCard/LoadingCard";
import SpecialCard from "../ProductCard/SpecialCard";
import Loader from "../../HOC/Loader/Loader";
const ProductCard = lazy(() => import("../ProductCard/ProductCard"));
import { Grid } from "@mui/material";


export const ProductsList = ({
  products,
  fetchWishListProducts,
  wishListItems,
  virtualCatgeoryProducts,
  componentData
}: any) => {
  const [displayLoader, setLoader] = useState(false);
  const isMobile = useMobileCheck();
  const [snackMessage, setSnackMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const showLoader = (loader: boolean) => {
    setLoader(loader);
  };

  const getVariantDetails = (parentSku: string) => {
    const index = virtualCatgeoryProducts?.findIndex((item: any) => {
      return item?.parent_sku === parentSku;
    })
    return index > -1 ? virtualCatgeoryProducts?.[index]?.sku : ""
  }

  return (
    <>
      {displayLoader && <Loader />}
      <Grid
        container
        columnSpacing={isMobile ? 1.5 : 2}
        rowSpacing={isMobile ? 1 : 2}
      >
        {products?.map((product: any, index: number) => {
          return (
            <Grid item xs={6} sm={6} md={4} key={product.id}>
              <Suspense fallback={<LoadingCard />}>
                {product?.isSpecialCard ? (
                  <SpecialCard />
                ) : (
                  <ProductCard
                    uniqueID={product.id}
                    gakey={index}
                    componentData={componentData}
                    snackMessage={snackMessage}
                    setSnackMessage={setSnackMessage}
                    snackBarOpen={snackBarOpen}
                    setSnackBarOpen={setSnackBarOpen}
                    fetchWishListProducts={fetchWishListProducts}
                    showLoader={showLoader}
                    details={
                      product?.__typename === "ConfigurableWishlistItem" ||
                        product?.__typename === "SimpleWishlistItem"
                        ? product?.product
                        : product
                    }
                    variantSku={product?.type_id === "simple" ? "" : getVariantDetails(product?.sku)}
                    wishListItems={wishListItems}
                    isfromWhishList={
                      product?.__typename === "ConfigurableWishlistItem" ||
                      product?.__typename === "SimpleWishlistItem"
                    }
                    wishListItemId={
                      (product?.__typename === "ConfigurableWishlistItem" ||
                        product?.__typename === "SimpleWishlistItem") &&
                      product?.id
                    }
                  ></ProductCard>
                )}
              </Suspense>
            </Grid>);
        })}
      </Grid>
    </>
  );
};
