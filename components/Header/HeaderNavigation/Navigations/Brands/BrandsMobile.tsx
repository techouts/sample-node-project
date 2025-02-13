import { Stack } from "@mui/material";
import React, { useState } from "react";
import {
  MobileBrandTabTitle,
  BrandsMobileWrapper,
  BrandMobileTabs,
} from "./Styles";
import BrandsViewer from "./BrandsViewer";
import { AllBrands } from "./AllBrands";
import { useMobileCheck } from "../../../../../utility/isMobile";
import {
  MobileTabsInterface,
  BrandsInterface,
  Items,
} from "../../../../../schemas/BrandsSchema";

interface BrandsMobileInterFace {
  brandsData: {
    mobileTabs: MobileTabsInterface[];
    brands: BrandsInterface[];
    items: Items[];
  };
  callBack?: Function;
}

function BrandsMobile(props: any) {
  const isMobile = useMobileCheck();
  const brandTabs = [{ title: "TRENDING BRANDS" }, { title: "ALL BRANDS" }];
  const [activeTab, setActiveTab] = useState(0);
  return (
    <BrandsMobileWrapper isMobile={isMobile}>
      <BrandMobileTabs direction={"row"}>
        <Stack direction={"row"} alignItems="center">
          {brandTabs?.map((tab: any, index: number) => {
            return (
              <MobileBrandTabTitle
                isActive={activeTab === index}
                key={index}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </MobileBrandTabTitle>
            );
          })}
        </Stack>
      </BrandMobileTabs>
      {activeTab === 0 ? (
        <BrandsViewer brandData={props} />
      ) : (
        <AllBrands brandData={props} />
      )}
    </BrandsMobileWrapper>
  );
}

export default BrandsMobile;
