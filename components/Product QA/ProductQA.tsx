import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {
  PrimaryBox,
  SecondaryBox,
  StyledTab,
  TabListStyled,
} from "./ProductQAStyled";
import RatingComponenttext from "./RatingComponenttext";
import { useMobileCheck } from "../../utility/isMobile";
import {
  SORTED_PRODUCT_REVIEWS,
  PRODUCT_DATA_SKU,
} from "../../graphQLQueries/ProductQuery";
import CustomPagination from "../../HOC/CustomPagination/CustomPagination";
import client from "../../apollo-client";
import ViewEvent from "../../utility/viewEvent";
import {
  event_type,
  widget_powered_by,
  Widget_type,
} from "../../utility/GAConstants";
import { userState } from "../../recoilstore";
import { useRecoilState } from "recoil";
import handleErrorResponse from "../../utility/ErrorHandling";

const ProductQA = (props: any) => {
  const {productData,component,} =props;
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [value, setValue] = useState("1");
  const isMobile = useMobileCheck();
  const [questionsList, setQuestionsList] = useState([]);
  const [page, setPage] = useState(1);
  const [questionPage, setQuestionPage] = useState(1);
  const [productDataItem, setProductDataItem] = useState(productData);
  const size = 3;
  const [totalCount, setTotalCount] = useState(productData);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [sortValue, setSortValue] = useState({ top_reviews: "DESC" });
  const [reviewCount, setReviewCount] = useState(1);
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
    setUserDataItems({ ...userDataItems, productQAIndex: newValue });
  };

  useEffect(() => {
    setValue(userDataItems?.productQAIndex||"1");
  }, [userDataItems?.productQAIndex]);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    if (page > 1) {
      client
        .query({
          query: PRODUCT_DATA_SKU,
          variables: {
            sku: productData?.items?.[0]?.sku,
          },
          fetchPolicy: "no-cache",
        })
        .then((response: any) => {
        
          setProductDataItem(response?.data?.products);
        })
        .catch((error: any) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    client
      .query({
        query: SORTED_PRODUCT_REVIEWS,
        variables: {
          entity_id: productDataItem?.items?.[0]?.id,
          sort: sortValue,
          pagesize: size,
          CurrentPage: page,
        },
      })
      .then((response: any) => {
      
        setSortedReviews(response?.data?.GetReviews?.reviews);
        setReviewCount(response?.data?.GetReviews?.total_count);
      })
      .catch((err: any) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortValue, page]);

  const analyticProductData = productData?.items?.[0];
  const viewEventWrapper = useRef();
  const dataLayer = {
    item_name: analyticProductData?.name,
    item_id: analyticProductData?.sku,
    event_type: event_type,
    widget_type: Widget_type,
    widget_powered_by: widget_powered_by,
    item_type: analyticProductData?.__typename,
    widget_title: "Ratings & product QA",
    widget_description: "na",
    widget_position:3,
    no_of_items: productData?.items?.length|| 0,
    view_items: JSON.stringify({
    item_id: analyticProductData?.sku,
    item_name: analyticProductData?.name,
      index: 1,
      item_brand: analyticProductData?.brand_info,
      item_category: analyticProductData?.categories?.[0]?.name,
      price:analyticProductData?.pmr_price_value?.amount?.value,
      item_original_price:
      analyticProductData?.price_range?.minimum_price?.regular_price?.value,
      quantity: analyticProductData?.product_count,
      item_rating: analyticProductData?.rating_summary,
      item_category2: analyticProductData?.categories?.[1]?.name,
      item_category3: analyticProductData?.categories?.[2]?.name,
      item_category5:analyticProductData?.categories?.[3]?.name || "na",
      item_size:analyticProductData?.variants?.color || "na",
    }),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");
  return (
    <Box
     bgcolor={component?.bgColor}
      p={isMobile ? "25px 16px" :component?.bgPadding}
      id="productQA"
    >
      <PrimaryBox ref={viewEventWrapper}>
        <TabContext value={value}>
          <SecondaryBox>
            <TabListStyled
              onChange={handleChange}
              TabIndicatorProps={{
                style: { backgroundColor: "#F6F6F6" },
              }}
            >
              <StyledTab label="Ratings & Reviews" value="1" disableRipple />
            </TabListStyled>
          </SecondaryBox>
          <TabPanel style={{ padding: "24px 0px" }} value="1">
            <RatingComponenttext
              productDataItem={productDataItem}
              sortedReviews={sortedReviews}
              setSortValue={setSortValue}
              setPage={setPage}
            />
          </TabPanel>
        </TabContext>
      </PrimaryBox>
      {(value === "1" ? reviewCount > 3 : totalCount > 3) && (
        <Box sx={{ paddingTop:isMobile?"25px":"40px" }}>
          <CustomPagination
            pageCount={
              value === "1"
                ? reviewCount % size == 0
                  ? reviewCount / size
                  : Math.floor(reviewCount / size) + 1
                : totalCount % size == 0
                ? totalCount / size
                : Math.floor(totalCount / size) + 1
            }
            count={value === "1" ? reviewCount : totalCount}
            page={value === "1" ? page : questionPage}
            size={size}
            setPage={value === "1" ? setPage : setQuestionPage}
            handleChange={handleChange}
            boundaryCount={isMobile ? 2 : 3}
            siblingCount={1}
            products={value === "1" ? sortedReviews : questionsList}
          />
        </Box>
      )}
    </Box>
  );
};
export default ProductQA;
