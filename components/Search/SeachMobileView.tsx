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

interface SearchWebIconModalschema {
  searchVisible?: any;
  setMobileOpen?: Function;
  setSearchVisible?: Function;
  setLoader: Function;
  popularBrands?: any;
  isPDP?: boolean;
  searchbarTexts?: any;
  popularCategories?: any;
  userDataItems?: any;
}

const SearchIconModal = ({
  searchVisible,
  setSearchVisible = () => {},
  setMobileOpen = () => {},
  popularBrands,
  setLoader,
  isPDP = false,
  searchbarTexts,
  popularCategories,
  userDataItems,
}: SearchWebIconModalschema) => {
  const [isMobile, setIsmobile] = useState(false);
  const [search, setSearch] = useState("");
  const [dynamicPlaceholder, setDynamicPlaceholder] = useState("Lipsticks");
  const [startPlaceHolder, setStartPlaceHolder] = useState(false);
  const ref = useRef<any>(null);
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    setIsmobile(!matches);
  }, [matches]);

  useEffect(() => {
    let idx = 0;
    ref.current = setInterval(() => {
      setDynamicPlaceholder(searchbarTexts?.[idx]);
      idx = (idx + 1) % searchbarTexts?.length;
    }, 3000);

    return () => clearInterval(ref.current);
  }, [startPlaceHolder]);

  const OnChangeSearch = (e: { target: { value: any } }) => {
    const value = e?.target?.value;
    setSearch(value);
    setDynamicPlaceholder("");
    clearInterval(ref.current);
    if (value === "") {
      setStartPlaceHolder(!startPlaceHolder);
      setDynamicPlaceholder(searchbarTexts[0]);
    }
  };

  const handleClickAway = () => {
    setSearchVisible(false);
    // if (isMobile) {
    //   setMobileOpen(() => false);
    // }
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
    e?.preventDefault();
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

  return (
    <>
      <Grid container sx={{ placeItems: "center", zIndex: "9999" }}>
        <Grid item xs={12} lg={11} md={11} sm={9}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box
              sx={{
                background: "#F8F8F8",
                paddingBottom: "0.4rem",
              }}>
              <Box
                sx={{
                  border: "1px solid #707070",
                  top: " 104px",
                  borderRadius: " 18px",
                }}>
                <SearchBar
                  sx={{
                    width: userDataItems?.storeMode
                      ? "17rem !important"
                      : "initial",
                  }}>
                  <SearchIcon
                    sx={{
                      p: "1px",
                      background: "transparent",
                      color: "#AD184C",
                      marginLeft: "15px",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                    }}>
                    <InputBase
                      onClick={() => callGaEvent()}
                      sx={{
                        ml: { sm: 0, lg: 1, xl: 2 },
                        flex: 1,
                        marginLeft: "5px",
                        font: "normal normal normal 14px/24px Montserrat",
                        fontSize: "14px",
                        width: "100%",
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
                      }}
                      value={search}
                      onChange={OnChangeSearch}
                      onKeyDown={handleRedirection}
                    />
                    {!userDataItems?.storeMode && (
                      <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "75px",
                          transform: "translateY(-50%)",
                          color: "#B6315F",
                          fontSize: "14px",
                          marginLeft: "5px",
                          font: "normal normal normal 14px/24px Montserrat",
                          fontWeight: 700,
                        }}>
                        {dynamicPlaceholder}
                      </span>
                    )}
                  </div>
                </SearchBar>
              </Box>

              <SearchContent
                searchVisible={searchVisible}
                setSearchVisible={setSearchVisible}
                handleClickAway={handleClickAway}
                search={search}
                data={Data}
                isMobile={isMobile}
                popularBrands={popularBrands}
                popularCategories={popularCategories}
              />
            </Box>
          </ClickAwayListener>
        </Grid>
      </Grid>
    </>
  );
};
export default SearchIconModal;
