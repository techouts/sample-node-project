import React from "react";
import Box from "@mui/material/Box";
import  Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import StoreTopBrandSchema from "./StoreTopBrandSchema";
import { BrandTitle, StyledImg } from "./StoreTopBrandStyles";
import { useMobileCheck } from "../../utility/isMobile";

const StoreTopBrand = ({
  title,
  bgColor,
  bgPadding,
  items,
}: StoreTopBrandSchema) => {
  const isMobile = useMobileCheck();
  return (
    <>
      <Box
        bgcolor={bgColor}
        p={bgPadding}
        sx={{ margin: isMobile ? "25px 16px 0px 16px" : "0px" }}
      >
        <Divider
          sx={{
            "&.MuiDivider-root": {
              "&::before": {
                borderTop: "1px solid #A7A5A6",
              },
              "&::after": {
                borderTop: "1px solid #A7A5A6",
              },
              "> .MuiDivider-wrapper": {
                padding: isMobile ? "0 12px" : "0 25px",
              },
            },
          }}
        >
          <BrandTitle>{title}</BrandTitle>
        </Divider>
        <Grid container spacing={isMobile ? 1.2 : 5}>
          {items?.map((eachItem) => (
            <>
              <Grid item xs={4} sm={3} md={2.4} lg={2.4} xl={2.4}>
                <StyledImg
                  src={isMobile ? eachItem?.imgUrlMobile : eachItem?.imgUrl}
                  alt="Brand Image"
                  width="100%"
                  itemImgPath={eachItem?.imgPath}
                  onClick={() => {
                    eachItem?.imgPath &&
                      window.location.assign(eachItem?.imgPath);
                  }}
                />
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default StoreTopBrand;
