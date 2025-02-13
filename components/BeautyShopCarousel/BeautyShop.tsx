import { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ProductTitle,
  MainBox,
  ContentGrid,
  ProductGrid,
  Image,
  BuyNowButton,
  ProductDetails,
  Text,
  TitleTypography,
  CountText,
  ImageGrid,
  StyledStack,
  ButtonBox,
  Img,
} from "./BeautyShopStyles";
import Carousel from "../../HOC/Carousel/Carousel2";
import {
  CustomPrevArrow,
  CustomNextArrow,
} from "../../components/ShopByCollection/CustomArrows";
import BeautyShopSchema, { LIST_ITEM } from "../../schemas/BeautyShopSchema";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { useRouter } from "next/router";
import ViewEvent from "../../utility/viewEvent";
import { event_type, widget_type } from "../../utility/GAConstants";
import { viewArray, ViewArray } from "../../utility/ViewEvenItemArray";
import triggerGAEvent from "../../utility/GaEvents";

const BeautyShop = (props: BeautyShopSchema) => {
  const {
    galleryItems,
    bgColor,
    bgPadding,
    buttonPath,
    id,
    componentName,
    position,
    subheading,
    heading,
  } = props;
  const items = galleryItems;
  const isMobile = useMobileCheck();
  const [prevArrow, setPrevArrow] = useState(false);
  const [state, setState] = useState(0);
  const viewEventWrapper = useRef();
 
  const [nextArrow, setNextArrow] = useState(
    // @ts-ignore:next-line
    galleryItems?.imageUrl?.length === 2 ? false : true
  );
  const arrowsHandler = (sliderIndex: number) => {
    setState(sliderIndex);
    if (sliderIndex === 0) {
      setPrevArrow(false);
    } else if (sliderIndex === galleryItems?.length - 1) {
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
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: (
      <CustomPrevArrow isPrev={prevArrow}
        cssData={{
          width: "36px",
          height: "36px",
          left: isMobile ? "20px" : "-20px",
          top: isMobile ? "230px" : "",
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow isNext={nextArrow}
        cssData={{
          width: "36px",
          height: "36px",
          right: isMobile ? "20px" : "-20px",
          top: isMobile ? "230px" : "",
        }}
      />
    ),
    afterChange: (sliderIndex: number) => arrowsHandler(sliderIndex),
    responsive: [
      {
        breakpoint: 0,
        settings: {
          arrows: true,
          slidesToShow: 3.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const dataLayer = {
    item_id: `${componentName}_${position + 1}`,
    item_name: heading,
    component_id: id,
    widget_type: widget_type,
    item_type: "product",
    widget_title: componentName,
    widget_description: subheading,
    widget_postion: position + 1,
    no_of_items: items?.length,
    index: position + 1,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    view_items: viewArray(items),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  return (
    <>
      <MainBox
        ref={viewEventWrapper}
        bgcolor={bgColor}
        isMobile={isMobile}
        p={bgPadding}
      >
        <Carousel
          Component={content}
          items={galleryItems}
          settings={userSettings}
          callBack={undefined}
          isVertical={undefined}
          componentName={componentName}
          widgetposition={position}
        />
      </MainBox>
      <Box>
        <CountText>
          <Typography>{state + 1} </Typography>{" "}
          <Typography sx={{ color: "#7B7979" }}>
            OF {galleryItems?.length}
          </Typography>
        </CountText>
      </Box>
    </>
  );
};

const content = (item: LIST_ITEM) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isMobile = useMobileCheck();
  const router = useRouter();

  const callGaEvent = (
    linktext?: string,
    linkurl?: URL | string,
    itemname?: string
  ) => {
    triggerGAEvent(
      {
        widget_type: widget_type,
        item_name: itemname,
        item_type: "product",
        widget_title: item?.componentName,
        widget_description: "na",
        widget_position: item?.widgetposition + 1,
        no_of_items: item?.items?.length,
        item_brand: "na",
        item_category: "na",
        link_text: linktext,
        link_url: linkurl,
        item_id: `${item?.componentName}_${item?.widgetposition + 1}`,
        item_rating: "na",
        event_type: event_type,
        item_category2: "na",
        item_category3: "na",
      },
      "click"
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container sx={{ justifyContent: "flex-end" }}>
        <Grid item lg={7} md={7} sm={7} xs={12}>
          <Box>
            <ProductTitle
              isMobile={isMobile}
              dangerouslySetInnerHTML={{ __html: item?.brandText }}
            />
          </Box>
        </Grid>
      </Grid>
      <ContentGrid container>
        <ProductGrid item xs={12} sm={5} md={5} lg={5}>
          <Box>
            <Image src={ReplaceImage(item?.imageUrl)} alt={item?.imageAltText || "image"} />
          </Box>
        </ProductGrid>
        <Grid item xs={12} lg={7} md={7} sm={7}>
          <StyledStack>
            {isMobile && (
              <ButtonBox isMobile={isMobile}>
                {item?.buttonPath && (
                  <BuyNowButton
                    isMobile={isMobile}
                    onClick={() => window?.open(item?.buttonPath)}
                  >
                    {item?.buttonText}
                  </BuyNowButton>
                )}
              </ButtonBox>
            )}
            {item?.prosHeading && (
              <>
                <TitleTypography>{item?.prosHeading}</TitleTypography>
                <ProductDetails>
                  {item?.tickCircle && (
                    <Img
                      src={ReplaceImage(item?.tickCircle)}
                      alt="tick-circle"
                    />
                  )}
                  <Text>{item?.prosText}</Text>
                </ProductDetails>
              </>
            )}
            {item?.consHeading && (
              <>
                <TitleTypography>{item?.consHeading}</TitleTypography>
                <ProductDetails>
                  <Img
                    src={`${ReplaceImage(item?.closeCircle)}`}
                    alt="close-circle"
                  />
                  <Text>{item?.consText}</Text>
                </ProductDetails>
              </>
            )}
            <Text
              sx={{ paddingRight: "20px" }}
              isMobile={isMobile}
              dangerouslySetInnerHTML={{ __html: item?.content }}
            />
            {!isMobile && (
              <ButtonBox>
                {item?.buttonPath && (
                  <BuyNowButton
                    isMobile={isMobile}
                    onClick={() => {
                      window?.open(item?.buttonPath),
                        callGaEvent(
                          item?.buttonText,
                          item?.buttonPath,
                          item?.brandText
                        );
                    }}
                  >
                    {item?.buttonText}
                  </BuyNowButton>
                )}
              </ButtonBox>
            )}
          </StyledStack>
        </Grid>
      </ContentGrid>
      <Box></Box>
    </Box>
  );
};

export default BeautyShop;
