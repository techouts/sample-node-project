import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { useEffect, useRef, useState } from "react";
import client from "../../apollo-client";
import {
  EMPTY_CTA,
  EMPTY_MESSAGE,
  WISHLIST_TITLE,
} from "../../graphQLQueries/WhishList/Constants";
import { CUSTOMER_WISHLIST } from "../../graphQLQueries/WhishList/WishListQuery";
import CustomPagination from "../../HOC/CustomPagination/CustomPagination";
import Loader from "../../HOC/Loader/Loader";
import { ProductsList } from "../../HOC/ProductList/ProductList";
import {
  Empty_wishlist_appbgicon_icon,
  Empty_wishlist_webicon_icon,
} from "../../utility/AppIcons";
import { AppIcons } from "../../utility/AppIconsConstant";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  BgBox,
  WishListBox,
  WishlistCount,
  WishlistCTA,
  WishlistMessage,
  WishlistTitle,
} from "./WishListStyles";
import handleErrorResponse from "../../utility/ErrorHandling";

function WishList(props: any) {
  const isMobile = useMobileCheck();
  const size = 15;
  const [pageCount, setPageCount] = useState<number>();
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [wishListProducts, setWishListProducts] = useState<any>();
  const [displayLoader, setLoader] = useState(true);
  const viewEventWrapper = useRef();
  const fieldRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    fetchWishListProducts();
  }, [page]);
  useEffect(() => {
    setPageCount(
      count % size == 0 ? count / size : Math.floor(count / size) + 1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  const fetchWishListProducts = () => {
    client
      .query({
        query: CUSTOMER_WISHLIST,
        fetchPolicy: "no-cache",
        variables: {
          currentPage: page,
          pageSize: size,
        },
      })
      .then((res) => {
      
        setWishListProducts(res?.data?.customer?.wishlists[0]?.items_v2?.items);
        setCount(res?.data?.customer?.wishlists?.[0]?.items_count);
        setPageCount(
          res?.data?.customer?.wishlists[0]?.items_v2?.page_info?.total_pages
        );
        setLoader(false);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoader(false);
      });
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setLoader(true);
    setPage(value);
    // eslint-disable-next-line react-hooks/rules-of-hooks
  };
  const Empty_wishlist_webicon = AppIcons(Empty_wishlist_webicon_icon);
  const Empty_wishlist_appbgicon = AppIcons(Empty_wishlist_appbgicon_icon);
  return (
    <>
      {displayLoader && <Loader />}
      <Box ref={viewEventWrapper}>
        <Stack direction="row" alignItems="center">
          <WishlistTitle>{WISHLIST_TITLE}</WishlistTitle>
          {wishListProducts?.length > 0 && (
            <WishlistCount ref={fieldRef}>{`(${count})`}</WishlistCount>
          )}
        </Stack>
        {!displayLoader && (
          <BgBox isEmpty={wishListProducts?.length === 0}>
            {wishListProducts?.length > 0 ? (
              <ProductsList
                fetchWishListProducts={fetchWishListProducts}
                products={wishListProducts}
                wishListItems={wishListProducts}
                isfromWishList={true}
                totalCount={wishListProducts?.length}></ProductsList>
            ) : (
              <WishListBox>
                <img
                  src={`${ReplaceImage(
                    isMobile
                      ? Empty_wishlist_appbgicon?.url
                      : Empty_wishlist_webicon?.url
                  )}`}
                  alt="Wishlist Img"
                />
                <WishlistMessage>{EMPTY_MESSAGE}</WishlistMessage>
                <WishlistCTA onClick={() => window.location.assign(`${window.location.origin}/home`)}>
                  {EMPTY_CTA}
                </WishlistCTA>
              </WishListBox>
            )}
          </BgBox>
        )}
        {count > size && (
          <CustomPagination
            pageCount={pageCount}
            count={count}
            setPage={setPage}
            handleChange={handleChange}
            page={page}
            pageSize={size}
            fieldRef={fieldRef}
            boundaryCount={isMobile ? 2 : 3}
            siblingCount={1}
            widget_title={WISHLIST_TITLE}
          ></CustomPagination>
        )}
      </Box>
    </>
  );
}
export default WishList;
