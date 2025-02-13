import React from "react";
import {
  ColorPalette,
  ColorPaletteWrapperBox,
  CrossBox,
  Line1,
  Line2,
  ListS,
  MenuSelectStack,
  MenuSelectedShade,
  MenuuSelectShade,
  SelectShade,
  SelectShadeText,
  SelectSize,
  ShadeBox,
  SizeList,
  SizeMenu,
} from "./pdcardstyle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Menu, MenuItem } from "@mui/material";
import { pdpVariantViewEvent } from "../../utility/GaEvents";

const PdpVariants = (props: any) => {
  const {
    productData,
    isMobile,
    handleClick,
    selectedColor,
    checkOutOfStock,
    updateColor,
    colorList,
    anchorEl,
    fetchColors,
    open,
    handleClose,
    sizeList,
    fetchSizes,
    selectedSize,
    productDetails,
  } = props;
  return (
    <div>
      {productData?.variants?.length > 1 &&
        productData?.configurable_options?.map((option: any, idx: number) => (
          <>
            {option?.attribute_code == "color" && (
              <>
                <SelectShade>
                  <SelectShadeText
                    variant="subtitle1"
                    sx={{
                      fontSize: isMobile ? "12px" : "16px",
                    }}>
                    Select Shade -
                  </SelectShadeText>
                  <MenuSelectStack onClick={handleClick}>
                    <MenuSelectedShade
                      sx={{
                        cursor: "pointer",
                        fontSize: isMobile ? "12px" : "18px",
                      }}>
                      {selectedColor?.label}
                    </MenuSelectedShade>
                    <ExpandMoreIcon
                      sx={{
                        cursor: "pointer",
                        fontSize: isMobile ? "12px" : "20px",
                      }}
                    />
                  </MenuSelectStack>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    sx={{
                      "& .MuiPaper-root.MuiMenu-paper.MuiPaper-root.MuiPopover-paper":
                        {
                          maxHeight: "30%",
                          overflow: "auto",
                        },
                    }}>
                    <MenuItem value="">
                      <MenuuSelectShade>
                        Select Shade ({option?.values?.length})
                      </MenuuSelectShade>
                    </MenuItem>
                    {option?.attribute_code == "color" &&
                      option?.values?.map((item: any, index: number) => {
                        return (
                          <MenuItem
                            key={item?.label}
                            value={item}
                            disabled={checkOutOfStock(item?.value_index)}
                            onClick={() => updateColor(item)}>
                            {item?.label}
                          </MenuItem>
                        );
                      })}
                  </Menu>
                </SelectShade>
                {option?.attribute_code == "color" && (
                  <ShadeBox>
                    <ListS ismobile={isMobile}>
                      {colorList?.map((color: any, index: number) => (
                        <ColorPaletteWrapperBox
                          key={color?.swatch_data?.value}
                          available={!checkOutOfStock(color?.value_index)}
                          selected={
                            color?.value_index === selectedColor?.value_index
                          }
                          ismobile={isMobile}>
                          <ColorPalette
                            key={color?.swatch_data?.value}
                            swatch_color={color?.swatch_data?.value}
                            available={!checkOutOfStock(color?.value_index)}
                            ismobile={isMobile}
                            selected={
                              color?.value_index === selectedColor?.value_index
                            }
                            onClick={() =>{fetchColors(color);
                             pdpVariantViewEvent(
                               productData,
                               color?.value_index,
                               color?.label
                             );}}>
                            {checkOutOfStock(color?.value_index) && (
                              <CrossBox>
                                <Line1></Line1>
                                <Line2></Line2>
                              </CrossBox>
                            )}
                          </ColorPalette>
                        </ColorPaletteWrapperBox>
                      ))}
                    </ListS>
                  </ShadeBox>
                )}
              </>
            )}
            {option?.attribute_code == "size" && sizeList?.length > 1 && (
              <>
                <SelectSize>
                  Select {option?.attribute_code !== "color" && option?.label}
                </SelectSize>
                <SizeList>
                  {sizeList?.map((size: any) => (
                    <SizeMenu
                      onClick={() => {
                        fetchSizes(size);
                      }}
                      selected={size?.value_index == selectedSize?.value_index}
                      key={size?.label}
                      disabled={
                        productDetails?.variants
                          ?.filter(
                            (prod: any) =>
                              prod?.product?.color == selectedColor?.value_index
                          )
                          ?.filter(
                            (item: any) =>
                              item?.product?.size == size?.value_index
                          )?.length == 0
                      }>
                      {size?.label}
                    </SizeMenu>
                  ))}
                </SizeList>
              </>
            )}
          </>
        ))}
    </div>
  );
};

export default PdpVariants;
