import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import useMediaQuery from "@mui/material/useMediaQuery";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import router from "next/router";
import React, { useEffect, useState, useRef } from "react";
import Data from "../../JSON/Search.json";
import { PLP_SEARCH_ROUTE } from "../../utility/Constants";
import { normal_searchbar_event_type } from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";
import { SearchBar } from "../Header/HeaderStyle";
import SearchContent from "./SearchVisibleContent";
import { Cookies } from "react-cookie";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface SearchWebIconModalschema {
  searchVisible: any;
  setMobileOpen: Function;
  setSearchVisible: Function;
  searchIconUrl: any;
  searchText?: any;
  setLoader: Function;
  popularBrands: any;
  isPDP?: boolean;
  popularCategories?: any;
  unbxdCarousel?: any;
  productData?: any;
  searchbarTexts?: any;
  userDataItems?: any;
}

interface FilterSchema {
  Productname: string;
  id?: number;
}

const SearchWebIconModal = ({
  searchVisible,
  setSearchVisible,
  searchIconUrl,
  searchText,
  setMobileOpen,
  setLoader,
  popularBrands,
  isPDP = false,
  popularCategories,
  unbxdCarousel,
  productData,
  searchbarTexts,
  userDataItems,
}: SearchWebIconModalschema) => {
  const [isMobile, setIsmobile] = useState(false);
  const [search, setSearch] = useState("");
  const [dynamicPlaceholder, setDynamicPlaceholder] = useState("");
  const [startPlaceHolder, setStartPlaceHolder] = useState(false);
  const ref = useRef<any>(null);
  const matches = useMediaQuery("(min-width:600px)");
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsmobile(!matches);
  }, [matches]);

  useEffect(() => {
    let idx = 0;
    ref.current = setInterval(() => {
      setDynamicPlaceholder(searchbarTexts?.[idx]);
      idx = (idx + 1) % searchbarTexts?.length;
    }, 1000);

    return () => clearInterval(ref.current);
  }, [startPlaceHolder]);

  const OnChangeSearch = (e: { target: { value: any } }) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    setSearch(value);
    setDynamicPlaceholder("");
    clearInterval(ref.current);
    if (value === "") {
      setStartPlaceHolder(!startPlaceHolder);
      setDynamicPlaceholder(searchbarTexts?.[0]);
    }
  };

  const handleClickAway = () => {
    setSearchVisible(false);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleOnClick = () => {
    if (!!search === false) return;

    let newURL = encodeURIComponent(search);

    window.location.assign(
      `${window.location.origin}${PLP_SEARCH_ROUTE}?search=${newURL}`
    );
    callGaEvent();
    callSearchEvent(search);
  };

  const handleRedirection = (e: any) => {
    if (e?.key == "Enter" && e?.target?.value?.trim()?.length > 2) {
      let newURL = encodeURIComponent(e?.target?.value);
      window.location.assign(
        `${window.location.origin}${PLP_SEARCH_ROUTE}?search=${newURL}`
      );
      setSearchVisible(false);
      callSearchEvent(e.target.value);
    }
  };

  //search icon event
  const callGaEvent = () => {
    triggerGAEvent(
      {
        link_text: "search",
        link_url: "na",
      },
      "menu"
    );
  };
  //search event for searching
  const cookie = new Cookies();
  const callSearchEvent = (linktext: any) => {
    triggerGAEvent(
      {
        event_type: normal_searchbar_event_type,
        search_term: router?.query?.search,
        widget_title: "normal_search",
        item_price: 0,
        item_category: "na",
        item_rating: "na",
        item_name: linktext,
        item_original_price: 0,
        widget_position: 1,
        no_of_items: Number(cookie.get("productCount")),
        link_text: linktext,
        index: 1,
      },
      "search"
    );
  };
  const handleClear = (e: any) => {
    setSearch("");
    e?.stopPropagation();
  };
  return (
    <>
      <Grid container sx={{ placeItems: "center", zIndex: "9999" }}>
        <Grid item xs={12} lg={11} md={11} sm={9}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box>
              <Box>
                <SearchBar>
                  <IconButton
                    sx={{
                      p: "4%",
                      background: "transparent",
                      color: "#AD184C",
                    }}
                    aria-label="search">
                    <SearchIcon onClick={handleOnClick} />
                  </IconButton>
                  <div
                    onClick={() => {
                      setSearchVisible(true);
                    }}
                    style={{
                      // flex: 1,
                      position: "relative",
                    }}>
                    <InputBase
                      onClick={() => callGaEvent()}
                      sx={{
                        flex: 1,
                        width: "100%",
                        fontSize: "14px",
                        "& .MuiInputBase-input": {
                          "&, &::placeholder": {
                            color: "#231F20 !important",
                            opacity: "100%",
                            fontWeight: 400,
                          },
                        },
                      }}
                      placeholder={
                        userDataItems?.storeMode
                          ? "Tell us what are you looking"
                          : searchVisible
                          ? "Search On SSBeauty"
                          : "Search for"
                      }
                      onFocus={() => {
                        setSearchVisible(true);
                        setIsInputFocus(true);
                      }}
                      value={search}
                      onChange={OnChangeSearch}
                      onKeyDown={handleRedirection}
                    />
                    {!userDataItems?.storeMode && !searchVisible && (
                      <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "40%",
                          transform: "translateY(-50%)",
                          color: "#AD184C",
                          fontSize: "14px",
                          fontWeight: 700,
                          width: "100%",
                          paddingLeft: "15px",
                        }}>
                        {dynamicPlaceholder}
                      </span>
                    )}
                  </div>
                  {search && (
                    <CloseIcon
                      sx={{
                        cursor: "pointer",
                        color: "#AD184C",
                        fontSize: "14px",
                        mx: "8px",
                        zIndex: 1,
                      }}
                      onClick={handleClear}
                    />
                  )}
                </SearchBar>
              </Box>
              <SearchContent
                searchVisible={searchVisible}
                setSearchVisible={setSearchVisible}
                handleClickAway={handleClickAway}
                search={search}
                isPDP={isPDP}
                data={Data}
                isMobile={isMobile}
                popularBrands={popularBrands}
                popularCategories={popularCategories}
                isInputFocus={isInputFocus}
                unbxdCarousel={unbxdCarousel}
                productData={productData}
                userDataItems={userDataItems}
              />
            </Box>
          </ClickAwayListener>
        </Grid>
      </Grid>
    </>
  );
};
export default SearchWebIconModal;
