import { Box } from "@mui/material";
import React from "react";
import { AllBrands } from "./AllBrands";
import BrandsViewer from "./BrandsViewer";
import { BrandsDesktopWrapper, BrandsWrapper } from "./Styles";

function BrandsDesktop(brandData: any) {
  return (
    <BrandsDesktopWrapper direction={"row"}>
      <BrandsWrapper>
        <AllBrands {...brandData} />
      </BrandsWrapper>
      <Box width="65%" height="100%" sx={{ background: "#FFFFFF" }}>
        <BrandsViewer {...brandData}/>
      </Box>
    </BrandsDesktopWrapper>
  );
}

export default BrandsDesktop;
