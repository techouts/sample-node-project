import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useMobileCheck } from "../../../utility/isMobile";
import { Global } from "@emotion/react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
  BoxStyled,
  DropDownBox,
  FilterCloseIcon,
  HeaderContainerGrid,
  MainInputBase,
  SearchIconButton,
  OrderStyledBox,
  TypographyStyled,
} from "./MyOrdersSearchBarStyled";
import CustomDropDown from "../../../HOC/CustomDropDown/CustomDropDown";
import Loader from "../../../HOC/Loader/Loader";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { callEventMyOrders, callEventMyOrdersSearch } from "../MyOrdersEvents";
import { eventType } from "../../../utility/GAConstants";
import { AppIcons } from "../../../utility/AppIconsConstant";
import {
  CLOSE_CIRCLE_IMAGE,
  FILTER_SETTINGS_ICON,
  NORMAL_SEARCH_ICON,
} from "../../../utility/AppIcons";

type SearchBarProps = {
  setIsSearch: Function;
  setSelectedOrderFilter: Function;
  searchClickHandler: Function;
  isSearch: String;
  selectedOrderFilter: any;
  ordersData: any;
  __component: string;
  id: number;
  position: number;
};
const MyOrdersFilterJson = require("../../../JSON/MyOrdersFilter.json");

function MyOrdersSearchBar({
  setIsSearch,
  setSelectedOrderFilter,
  searchClickHandler,
  isSearch,
  selectedOrderFilter,
  ordersData,
  __component,
  id,
  position,
}: SearchBarProps) {
  const isMobile = useMobileCheck();
  const close_circle = AppIcons(CLOSE_CIRCLE_IMAGE);
  const [Open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const [displayLoader, setLoader] = useState(false);

  //desktop dropdown logic
  const handleSelectedValue = (val: string) => {
    setSelectedOrderFilter(val);
  };
  const handleChange = (value: any) => {
    toggleDrawer(false);
    handleSelectedValue(value);
  };
  const removeSearchFilter = async () => {
    await setIsSearch("");
    await searchClickHandler();
  };
  const SEARCH_NORMAL = AppIcons(NORMAL_SEARCH_ICON);
  const Filter_settings = AppIcons(FILTER_SETTINGS_ICON);

  return (
    <>
      {displayLoader && <Loader />}
      {!displayLoader && (
        <Box sx={{ display: "flex" }}>
          <HeaderContainerGrid>
            <SearchIconButton
              onClick={() => {
                searchClickHandler();
                callEventMyOrdersSearch(
                  ordersData,
                  isSearch,
                  __component,
                  position
                );
              }}
            >
              <img
                src={`${ReplaceImage(SEARCH_NORMAL?.url)}`}
                alt="searchIcon"
              />
            </SearchIconButton>
            <MainInputBase
              value={isSearch}
              placeholder="Search brands, products and more"
              inputProps={{ "aria-label": "Search brands, products and more" }}
              onKeyDown={(e: any) => {
                if (
                  e?.key === "Enter" &&
                  e?.target?.value?.trim()?.length > 2
                ) {
                  searchClickHandler();
                }
              }}
              onKeyUp={(e: any) => {
                if (
                  e?.key === "Enter" &&
                  e?.target?.value?.trim()?.length > 2
                ) {
                  searchClickHandler();
                }
              }}
              onChange={(e) => setIsSearch(e.target.value)}
            />
            {isSearch?.length > 2 &&
              <img src={`${ReplaceImage(close_circle?.url)}`}
                onClick={() => {
                  removeSearchFilter();
                }}
              />
            }
            {isMobile && (
              <img
                onClick={() => {
                  setOpen(true);
                  callEventMyOrders(ordersData, "Filter", eventType, "Filter");
                }}
                style={{
                  height: "16px",
                  width: "16px",
                  marginTop: "7px",
                  marginRight: "7px",
                }}
                alt="filter-icon"
                src={`${ReplaceImage(Filter_settings?.url)}`}
              ></img>
            )}
          </HeaderContainerGrid>
          <Box
            onClick={() =>
              callEventMyOrders(ordersData, "Filter", eventType, "Filter")
            }
          >
            {!isMobile && (
              <DropDownBox>
                Filter:
                <CustomDropDown
                  list={MyOrdersFilterJson.items}
                  handleSelectedValue={handleSelectedValue}
                  title={false}
                  border={false}
                  downArrowimage={true}
                  defaultValue={
                    selectedOrderFilter ||
                    MyOrdersFilterJson?.items.find(
                      (item: { isDefault: boolean }) => item?.isDefault === true
                    )?.value
                  }
                  titlePath={""}
                />
              </DropDownBox>
            )}
          </Box>
        </Box>
      )}
      {Open && (
        <Box>
          <Global
            styles={{
              ".MuiDrawer-root > .MuiPaper-root": {
                height: "100%",
                overflow: "visible",
                borderTopRightRadius: "20px",
                borderTopLeftRadius: "20px",
                top: "70px",
              },
            }}
          />
          <SwipeableDrawer
            anchor="bottom"
            open={Open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <OrderStyledBox>
              <TypographyStyled sx={{ borderBottom: 1 }}>
                {MyOrdersFilterJson.filter}
                <FilterCloseIcon onClick={toggleDrawer(false)} />
              </TypographyStyled>
            </OrderStyledBox>
            <BoxStyled>
              {MyOrdersFilterJson?.items?.slice(1)?.map(
                (
                  item: {
                    value: any;
                    disabled: boolean | undefined;
                    label: any;
                  },
                  iex: number | null | undefined
                ) => (
                  <MenuItem
                    onClick={() => handleChange(item?.value)}
                    key={iex}
                    disabled={item?.disabled}
                  >{`${item?.label}`}</MenuItem>
                )
              )}
            </BoxStyled>
          </SwipeableDrawer>
        </Box>
      )}
    </>
  );
}
export default MyOrdersSearchBar;
