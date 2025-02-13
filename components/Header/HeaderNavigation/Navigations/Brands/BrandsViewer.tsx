import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import {
  BrandTab,
  BrandTitle,
  MobileBrandTypeTitle,
  ScrollBarBoxWrapper,
  DesktopBrandsViewerWrapper,
} from "./Styles";
import { useMobileCheck } from "../../../../../utility/isMobile";
import { ReplaceImage } from "../../../../../utility/ReplaceImage";

function BrandsViewer({ brandData }: any) {
  const [selectedOption, setSelectedOption] = useState(0);
  const isMobile = useMobileCheck();
  const updateSelecedOPtion = (index: number) => {
    setSelectedOption(index);
  };
  const brandNavigation = (item: any) => {
    if (item?.ctaUrl !== "") {
      window.location.assign(item?.ctaUrl);
    }
  };
  return (
    <Box>
      {isMobile ? (
        <ScrollBarBoxWrapper Height={window.innerHeight - 100}>
          {brandData?.data?.brandItems?.map((item: any) => {
            return (
              <Grid container key={item?.title}>
                <Grid item xs={12}>
                  <MobileBrandTypeTitle>{item.title}</MobileBrandTypeTitle>
                </Grid>
                <Grid container item>
                  {item?.BrandSubItems?.map(
                    (brandItem: any) => {
                      return (
                        <Grid
                          item
                          xs={4}
                          key={brandItem?.logoUrl}
                          mt={2}
                          mb={2}
                          onClick={() => brandNavigation(brandItem)}
                        >
                          <img
                            width="100%"
                            src={`${ReplaceImage(brandItem?.logoUrl)}`}
                            alt="brand-image"
                          ></img>
                        </Grid>
                      );
                    }
                  )}
                </Grid>
              </Grid>
            );
          })}
        </ScrollBarBoxWrapper>
      ) : (
        <DesktopBrandsViewerWrapper direction={"column"}>
          <Grid container spacing={2}>
            {brandData?.data?.brandItems?.map((brands: any, index: number) => {
              return (
                <BrandTab
                  item
                  xs={12}
                  sm={3.5}
                  key={brands?.title}
                  bgcolor={selectedOption === index ? "#DEA3B7" : "unset"}
                  onClick={() => updateSelecedOPtion(index)}
                >
                  <BrandTitle>{brands?.title}</BrandTitle>
                </BrandTab>
              );
            })}
          </Grid>
          <Box>
            <Grid container spacing={2}>
              {brandData?.data?.brandItems?.[
                selectedOption
              ]?.BrandSubItems?.map((brand: any) => {
                
                return (
                  <Grid
                    item
                    sm={3.5}
                    key={brand?.logoUrl}
                    mr={2}
                    mt={2}
                    sx={{ paddingLeft: "0px !important", width: "161px" }}
                    onClick={() => brandNavigation(brand)}
                  >
                    <img src={`${ReplaceImage(brand?.logoUrl)}`} alt="brand" width= "100%"/>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </DesktopBrandsViewerWrapper>
      )}
    </Box>
  );
}

export default BrandsViewer;
