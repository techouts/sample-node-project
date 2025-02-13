import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { ListStack } from "../HeaderStyle";
import SubHeaderComponent from "../SubHeaderComponent";
import BrandsDesktop from "../HeaderNavigation/Navigations/Brands/BrandsDesktop";
import { useMobileCheck } from "../../../utility/isMobile";
import {
  FlexUnorderList,
  ListItem,
  UnorderList,
  NavigationTitle,
  DynamicBox,
} from "./Styles";
import BeautyAdvice from "../HeaderNavigation/Navigations/BeautyAdvice/BeautyAdvice";
import {
  NAVIGATION_SHOP,
  NAVIGATION_BEAUTY_ADVICE,
  NAVIGATION_BRANDS,
  NAVIGATION_LUXE,
} from "../Constants";
import triggerGAEvent from "../../../utility/GaEvents";
export interface PopUpInterface {
  navTitle?: string;
  data?: any;
  item: string;
  index: number;
  handleMouseLeave: Function;
}
export interface HeaderItems {
  headerNavigationData: HeaderNavigationItems[];
  categoriesData: any;
  brandData: any;
  cmsBrandsData: any;
  brandItems: any;
}
export interface HeaderNavigationItems {
  id?: number;
  text?: string;
  isNewTab?: boolean;
  subItems?: any[];
}

function HeaderNavigationBar({
  headerNavigationData,
  categoriesData,
  brandData,
  cmsBrandsData,
  brandItems,
}: HeaderItems) {
  const isMobile = useMobileCheck();
  const brandsData = { ...brandData, ...cmsBrandsData, brandItems: brandItems };

  return (
    <Box>
      <ListStack spacing={{ xs: 1, sm: 1, md: 2, lg: 1 }}>
        <FlexUnorderList>
          {headerNavigationData?.map((navItem, index: number) => {
            const componentData = {
              item: navItem,
              data:
                navItem.text === NAVIGATION_SHOP
                  ? categoriesData?.category?.children[0]
                  : navItem.text === NAVIGATION_LUXE
                  ? categoriesData?.category?.children[1]
                  : navItem.text === NAVIGATION_BRANDS
                  ? brandsData
                  : navItem.text === NAVIGATION_BEAUTY_ADVICE &&
                    navItem?.subItems,
            };
            return (
              <Box key={index} sx={{ cursor: "pointer" }}>
                {!isMobile && <NavItem {...componentData} />}
              </Box>
            );
          })}
        </FlexUnorderList>
      </ListStack>
    </Box>
  );
}
export default HeaderNavigationBar;

export const NavItem = ({ item, data }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [isColor, setIsColor] = useState("#231F20");
  const handleMouseEnter = (item: any) => {
    setOpenModal(true);
    setIsColor("#AD184C");
  };
  const handleMouseLeave = () => {
    setOpenModal(false);
    setIsColor("#231F20");
  };

  const callGaEvent = (link_text: string) => {
    triggerGAEvent(
      {
        widget_title: "na",
        link_text: link_text,
        link_url: "na",
      },
      "menu"
    );
  };

  return (
    <ListItem onMouseLeave={() => handleMouseLeave()}>
      <NavigationTitle
        onMouseEnter={() => {
          handleMouseEnter(item);
          // callGaEvent(item.text);
        }}
        style={{ color: item.text == "Luxe" ? "#C19F00" : isColor }}
      >
        {item.text}
      </NavigationTitle>
      <UnorderList>
        <div
          style={{
            position: "fixed",
            zIndex: 1000,
            height: "100%",
          }}
        >
          {openModal && (
            <DynamicBox>
              <PopUpDesktop
                data={{
                  navTitle: item.text,
                  data:
                    item.text == "Luxe" || item.text == "Category"
                      ? { ...data, isNavigateToPLP: item?.isNavigateToPLP }
                      : data,
                }}
                handleMouseLeave={handleMouseLeave}
                index={0}
                item={""}
              />
            </DynamicBox>
          )}
        </div>
      </UnorderList>
    </ListItem>
  );
};

export function PopUpDesktop({ data, handleMouseLeave }: PopUpInterface) {
  switch (data?.navTitle?.toLowerCase()) {
    case NAVIGATION_SHOP.toLowerCase():
      return <SubHeaderComponent data={data} handleMouseLeave={handleMouseLeave}/>;
    case NAVIGATION_LUXE.toLowerCase():
      return <SubHeaderComponent data={data} handleMouseLeave={handleMouseLeave}/>;
    case NAVIGATION_BRANDS.toLowerCase():
      return <BrandsDesktop brandData={data} />;
    case NAVIGATION_BEAUTY_ADVICE.toLowerCase():
      return (
        <BeautyAdvice data={data?.data} handleMouseLeave={handleMouseLeave} />
      );
    default:
      return null;
  }
}
