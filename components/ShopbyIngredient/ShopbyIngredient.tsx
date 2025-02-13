import React, { useState, useRef } from "react";
import Title from "../../HOC/Title/Title";
import { useMobileCheck } from "../../utility/isMobile";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { ShopbyIngredientInterface } from "../../schemas/ShopbyIngredientSchema";
import {
  StyledGrid,
  StyledImage,
  BlockGrid,
  InnerBox,
  InnerSmallText,
  GridContainerPosition,
  MainGrid,
  TextGrid,
  DescriptionTypography,
  TitleInsideComponent,
  MainInnerBox
} from "./ShopbyIngredientStyle";
import { widget_type, event_type } from "../../utility/GAConstants";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { viewArray } from "../../utility/ViewEvenItemArray";
import triggerGAEvent from "../../utility/GaEvents";
import ViewEvent from "../../utility/viewEvent";

const ShopbyIngredient = ({
  id,
  __component,
  position,
  bgColor,
  bgPadding,
  showTextOnHover,
  showGradient,
  itemPaddingBottom,
  itemPaddingHorizontal,
  marginLeft,
  description,
  text,
  title,
  titleColor,
  itemPaddingBottomMobile,
  tileSpacing,
  itemPaddingHorizontalMobile,
  desktopColumns,
  mobileColumns,
  items,
}: ShopbyIngredientInterface) => {
  const isMobile = useMobileCheck();
  const [value, setValue] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedindex, setSelectedindex] = useState(-1);
  const [indexValue, setIndexValue] = useState(-1);
  const viewEventWrapper = useRef();
  const router = useRouter();
  const handleClick = (index: any) => {
    setShowDescription(true);
    setSelectedindex(index);
  };
  const hoverIn = (index: any) => {
    setValue(true);
    setIndexValue(index);
  };
  const hoverOut = () => {
    setValue(false);
  };
  const handleClickRedirection = (
    isNewTab: boolean,
    index: number,
    path: URL | string,
    imageUrl: string,
    description: string
  ) => {
    callEvent(index, path, imageUrl, description)
    if (isNewTab) {
      path && window?.open(path);
    } else {
      path && router.push(path);
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
  };

  const dataLayer = {
    item_id: `${__component}_${position}`,
    component_id: id ? id : "na",
    widget_type: widget_type,
    item_name: "na",
    item_type: "na",
    widget_title: __component ? __component : "na",
    widget_description: title ? title : "na",
    widget_postion: position + 1 ? position + 1 : "na",
    no_of_items: items?.length ? items?.length : "na",
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    index: position + 1 ? position + 1 : "na",
    view_items: viewArray(items, `${__component}_${position}_`),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  const callEvent = (
    index: number,
    path: URL | string,
    imageUrl: string,
    description: string
  ) => {
    triggerGAEvent(
      {
        item_name: "na",
        item_id: `${__component}_${position}_${index ? index + 1 : 0}`,
        component_id: id ? id : "na",
        widget_type: widget_type,
        item_type: "na",
        widget_title: __component ? __component : "na",
        widget_description: description ? description : "na",
        widget_postion: position + 1 ? position + 1 : "na",
        link_url: path ? path : "na",
        link_text: "na",
        no_of_items: items?.length ? items?.length : "na",
        index: index + 1 ? index + 1 : "na",
        item_brand: "na",
        item_category: "na",
        item_image_link: imageUrl ? imageUrl : "na",
        item_category2: "na",
        item_category3: "na",
        item_original_price: 0,
        item_price: 0,
        item_rating: "na",
        original_price: 0,
        event_type: event_type,
      },
      "click"
    );
  };

  return (
    <>
      <MainGrid p={isMobile ? "0 16px" : bgPadding} bgcolor={bgColor}>
        <TitleInsideComponent ref={viewEventWrapper} titleColor={titleColor}></TitleInsideComponent>
        <Title interface={{ title: title, bgColor: bgColor }} />
        <GridContainerPosition
          container
          spacing={isMobile ? "8px" : tileSpacing}
          mt={0}
          aria-label="parent-grid"
        >
          {items?.map(
            (
              {
                imageUrl,
                imageUrlMobile,
                alttext,
                tileText,
                tileTextColor,
                tileSubText,
                tileSubTextColor,
                description,
                path,
                isNewtab,
                tileTextBackground
              }: any,
              index: number
            ) => (
              <StyledGrid
                item
                xs={12 / mobileColumns}
                sm={12 / mobileColumns}
                md={12 / desktopColumns}
                lg={12 / desktopColumns}
                aria-label="styled"
                key={index}
                onClick={() =>
                  handleClickRedirection(isNewtab, index, path, imageUrl, description)
                }
              >
                <StyledImage
                  src={
                    isMobile
                      ? `${ReplaceImage(imageUrlMobile)}`
                      : `${ReplaceImage(imageUrl)}`
                  }
                  alt={alttext}
                  py={isMobile ? "4px" : itemPaddingBottom}
                  onMouseOver={() => hoverIn(index)}
                  onMouseOut={hoverOut}
                ></StyledImage>
                {(isMobile ||
                  !showTextOnHover ||
                  (indexValue == index && showTextOnHover)) && (
                  <Grid container>
                    <BlockGrid ml={isMobile ? 1 : marginLeft}>
                      <MainInnerBox
                        mb={
                          isMobile ? itemPaddingBottomMobile : itemPaddingBottom
                        }
                        mx={
                          isMobile && mobileColumns > 1
                            ? itemPaddingHorizontalMobile
                            : itemPaddingHorizontal
                        }
                        showGradient={showGradient}
                        tileTextBackground={tileTextBackground}
                      >
                        {tileText && (
                          <InnerBox
                            variant="body1"
                            $tileTextColor={tileTextColor}
                          >
                            {tileText}
                          </InnerBox>
                        )}
                        {tileSubText && (
                          <InnerSmallText
                            $tileSubTextColor={tileSubTextColor}
                            variant="subtitle1"
                            $columnNumbers={desktopColumns}
                            onClick={() => handleClick(index)}
                          >
                            {tileSubText}
                          </InnerSmallText>
                        )}
                      </MainInnerBox>
                    </BlockGrid>
                  </Grid>
                )}
                {index === selectedindex && showDescription && (
                  <TextGrid>
                    <DescriptionTypography $isMobile={isMobile}>
                      {description}
                    </DescriptionTypography>
                  </TextGrid>
                )}
              </StyledGrid>
            )
          )}
        </GridContainerPosition>
      </MainGrid>
    </>
  );
};
export default ShopbyIngredient;
