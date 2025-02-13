import { Box, Button, Grid, Stack } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";
import { cartState, userState } from "../../recoilstore";
import { useRecoilState } from "recoil";
import ProductsCarousel from "../UNBXDWidget/ProductsCarousel";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { CategoryButtons } from "./CategoryButtons";

export interface Category {
  label: string;
  value: string;
  count: number;
}

export function BrandDiscount(data: any) {
  const {
    bgColor = "#ffffff",
    bgPadding = "1% 5%",
    productData,
    widgetId,
    pageType,
    displayItems,
    isWeb,
    isMsitePDP = false,
    brandName,
    discount,
    index,
  } = data;
  const [productsData, setProductsData] = useState<any[]>([]);
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [categoriesData, setCategoriesData] = useState<Category[]>([
    { label: "All", value: "all", count: 99 },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expanded, setExpanded] = useState<boolean>(index === 0);
  const [maximumPrice, setMaximumPrice] = useState<number>(0);
  const isMobile = useMobileCheck();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const isStoreMode = userDataItems?.storeMode || userDataItems?.storeModeType === "cc";
  const categoriesRef = useRef<Category[]>([]);

  const handleCategoryClick = (category: Category) => setSelectedCategory(category.label);

  const handleAccordionChange = (_event: React.SyntheticEvent, isExpanded: boolean) =>{
    setExpanded(isExpanded);
  }
  const fetchProductsData = async (brandName: string, selectedCategory: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_MIDDLEWARE_UNBXD_SEARCH}/unbxd-search?q=*&vCIsOfferAvailable_uFilter=1&sort=discount_DESC&brandName_uFilter=${encodeURIComponent(
        brandName
      )}${
        selectedCategory !== "All"
          ? `&categoryPath2_uFilter=${encodeURIComponent(selectedCategory)}`
          : ""
      }&page=1&uid=null&facet.multiselect=true&rows=18`
    );
    return response?.data;
  };


  const filterProducts = (products: any[], cartItems: any[]) => {
    return products.filter((product) => {
      return !cartItems.some((cartItem) => cartItem?.product?.sku === product?.sku);
    });
  };

  useEffect(() => {
    if (!isStoreMode) {
      fetchProductsData(brandName, selectedCategory).then((data) => {
        const items = cartStore?.cartItems?.cart?.items || [];
        const filteredProducts = filterProducts(data?.products?.items, items);
        // const sortedByPriceProducts = sortProductsByPrice(data?.products?.items)
        const calculateMaximumDiscount = filteredProducts?.[0]?.pmr_price_value?.discount?.amount_off - filteredProducts?.[0]?.pmr_price_value?.amount?.value
        setMaximumPrice(calculateMaximumDiscount)
        console.log(filteredProducts,"test")
        setProductsData(filteredProducts);
        const aggregations = data?.products?.aggregations;
        if (aggregations && categoriesRef.current.length === 0) {
          const categoryPath = aggregations.find(
            (item: any) => item?.attribute_code === "categoryPath2_uFilter"
          );
          const categories = categoryPath?.options || [];
          categoriesRef.current = [
            { label: "All", value: "all", count: 99 },
            ...categories,
          ];
          setCategoriesData(categoriesRef.current);
        }
      });
    }
  }, [selectedCategory, brandName, isStoreMode, index, expanded,cartStore]);

  useEffect(() => {
    setExpanded(index === 0);
  }, [index]);

  if (isStoreMode) return null;

  return (
    (Array.isArray(productsData) && productsData.length > 0 && !isNaN(maximumPrice) && maximumPrice > 0 &&(
    <Grid
      item
      xs={12}
      sm={8}
      md={8}
      lg={8}
      mt={2}
      aria-label="offers n added products"
      pr={isMobile ? 0 : 2}
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#EAE3FF",
      }}
    >
      <Accordion
        expanded={expanded}
        onChange={handleAccordionChange}
        sx={{ backgroundColor: "#EAE3FF", boxShadow: "none" }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <p
            style={{
              color: "#AF2354",
              fontSize: isMobile ? "12px" : "15px",
              margin: 0,
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            <div
              style={{
                border: "2px solid #71747C",
                borderRadius: "50%",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "6px",
              }}
            >
              <CurrencyRupeeRoundedIcon
                style={{ color: "#71747C", fontSize: "14px" }}
              />
            </div>{" "}
            Add items to unlock up to ₹{isNaN(maximumPrice) ? 0 : Math.round(maximumPrice)} discount
          </p>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "0px 16px",
          }}
        >
          <CategoryButtons
            categories={categoriesData}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
          <Box>
            <ProductsCarousel
              products={productsData}
              displayItems={displayItems}
              isUnbxd={true}
              mobileDisplayItems={2.1}
              showArrow={true}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Grid>       
  )));
}
