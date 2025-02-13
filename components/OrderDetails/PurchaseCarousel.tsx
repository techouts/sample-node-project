import Box from "@mui/material/Box";
import { useState } from "react";
import Carousel from "../../HOC/Carousel/Carousel2";
import { PRODUCT_FALLBACK_URL } from "../../HOC/ProductCard/Constants";
import { useMobileCheck } from "../../utility/isMobile";
import { ContactedGraphqlUrl } from "../../utility/MagentoImageUrlConcatConstant";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  CustomNextArrow,
  CustomPrevArrow,
} from "../ShopByCollection/CustomArrows";
import {
  MainBox,
  PurchaseTitleTypography,
  TextTypography,
  TitleTypography,
} from "./OrderDetailsStyles";
function PurchasesCarousel(props: any) {
  const { productsList, setCurrentProduct } = props;
  const [prevArrow, setPrevArrow] = useState(false);
  const isMobile = useMobileCheck();
  const [nextArrow, setNextArrow] = useState(
    // @ts-ignore:next-line
    productsList?.length <= 4 ? false : true
  );
  const arrowsHandler = (sliderIndex: number) => {
    if (sliderIndex === 0) {
      setPrevArrow(false);
      setNextArrow(true);
    } else if (sliderIndex === productsList?.length - 4) {
      setPrevArrow(true);
      setNextArrow(false);
    } else {
      setNextArrow(true);
      setPrevArrow(true);
    }
  };
  const userSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: prevArrow && (
      <CustomPrevArrow
        isPrev={prevArrow}
        cssData={{ width: "36px", height: "36px", left: "-75px" }}
      />
    ),
    nextArrow: nextArrow && (
      <CustomNextArrow
        isNext={nextArrow}
        cssData={{ width: "36px", height: "36px", right: "-75px" }}
      />
    ),
    afterChange: (sliderIndex: number) => arrowsHandler(sliderIndex),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: true,
          verticalSwiping: true,
        },
      },
    ],
  };
  return (
    <Box sx={{ background: isMobile ? "#fff" : "#F7F6F9" }}>
      {productsList?.length > 0 && (
        <PurchaseTitleTypography>
          Purchases in the same order
        </PurchaseTitleTypography>
      )}
      <Carousel
        Component={SingleCard}
        items={productsList}
        settings={userSettings}
        callBack={setCurrentProduct}
      />
    </Box>
  );
}
export default PurchasesCarousel;
const SingleCard = ({ items, callBack, fulfilment_unique_id, product_name, id, image }: any) => {
  const isMobile = useMobileCheck();
  const currentProduct = items?.filter(
    (OrderItem: any) => OrderItem?.fulfilment_unique_id === fulfilment_unique_id
  )?.[0];
  return (
    <Box>
      {!isMobile && (
        <Box
          sx={{
            backgroundColor: isMobile ? "#F7F6F9" : "#FFFFFF",
            cursor: "pointer",
            minHeight: "260px",
          }}
          m={1}
          pt={1}
          onClick={() => currentProduct && callBack(currentProduct)}
        >
          <MainBox>
            <img
              src={
                image
                  ? ContactedGraphqlUrl + image
                  : ReplaceImage(PRODUCT_FALLBACK_URL)
              }
              alt="Purchase carousel"
              width={"100%"}
            />
          </MainBox>
          <Box>
            <TextTypography>{product_name}</TextTypography>
          </Box>
        </Box>
      )}
      {isMobile && (
        <Box>
          <Box
            sx={{
              backgroundColor: isMobile ? "#F7F6F9" : "#FFFFFF",
              display: "flex",
              flexDirection: "row",
              height: "90px",
              gridGap: isMobile ? "10px" : "",
              alignItems: "center",
            }}
            m={1}
            onClick={() => callBack(currentProduct)}
          >
            <Box>
              <img
                style={{ height: "60px", paddingLeft: "11px" }}
                alt={`${id} image`}
                src={
                  image
                    ? ContactedGraphqlUrl + image
                    : ReplaceImage(PRODUCT_FALLBACK_URL)
                }
              />
            </Box>
            <Box>
              <TextTypography>{product_name}</TextTypography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
