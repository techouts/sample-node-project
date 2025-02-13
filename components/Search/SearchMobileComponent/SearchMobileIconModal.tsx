import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SearchIcon from "@mui/icons-material/Search";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import searchData from "../../../JSON/Search.json";
import { PLP_SEARCH_ROUTE } from "../../../utility/Constants";
import { normal_searchbar_event_type } from "../../../utility/GAConstants";
import triggerGAEvent from "../../../utility/GaEvents";
import SearchContent from "../SearchVisibleContent";
import {
  BackIcon,
  CloseIconColor,
  FixedHeader,
  HeaderContainerGrid,
  PaperTileSpacing,
} from "./SearchMobileIconstyles";
import { Cookies } from "react-cookie";
import SearchContentMsite from "../SearchVisibleContentMsite";

interface SearchMobileIconSchema {
  open: boolean;
  setMobileOpen: Function;
  setLoader: Function;
  popularBrands: any;
  isPDP?: boolean;
  popularCategories?: any;
  unbxdCarousel?: any;
  productData?: any;
  userDataItems?: any;
}

interface FilterSchema {
  Productname: string;
  id?: number;
}
function SearchMobileIcon({
  setMobileOpen,
  open,
  setLoader,
  popularBrands,
  isPDP = false,
  popularCategories,
  unbxdCarousel,
  productData,
  userDataItems,
}: SearchMobileIconSchema) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMobVisible, setSearchMobVisible] = useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [dynamicPlaceholder, setDynamicPlaceholder] = useState("Lipsticks");
  const isPDPPage = router.pathname === "/pdp";
  const ref: any = useRef();
  const [startPlaceHolder, setStartPlaceHolder] = useState(false);
  const placeholderTexts = ["Lipsticks", "Skincare", "Cleansers"];
  const [isInputFocus, setIsInputFocus] = useState(false);

  const OnChangeSearch = (e: { target: { value: any } }) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    setDynamicPlaceholder("");
    clearInterval(ref.current);
    if (value === "") {
      setStartPlaceHolder(!startPlaceHolder);
      setDynamicPlaceholder(placeholderTexts[0]);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleOnClick = () => {
    if (!!searchQuery === false) return;
     
    let newURL = encodeURIComponent(searchQuery);

    window.location.assign(
      `${window.location.origin}${PLP_SEARCH_ROUTE}?search=${newURL}`
    );
    callGaEvent("menu");
    callSearchEvent(searchQuery);
  }

  const handleSearchRedirection = (e: any) => {
    if (e?.key == "Enter" && e?.target?.value?.trim()?.length > 2) {
      setLoader(true);
      window.location.assign(
        `${window.location.origin}${PLP_SEARCH_ROUTE}?search=${e?.target?.value}`
      );
    }
    callSearchEvent(e.target.value);
  };

  const handleBackToHome = () => {
    setMobileOpen(() => false);
  };

  const callGaEvent = (eventName: string) => {
    triggerGAEvent(
      {
        link_text: "search",
        link_url: "na",
      },
      eventName
    );
  };
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
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title">
        <FixedHeader>
          <HeaderContainerGrid>
            <BackIcon onClick={handleBackToHome} />
            <PaperTileSpacing
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}>
              {!isPDPPage ? (
                <IconButton
                  sx={{ p: "1px", background: "transparent", color: "#AD184C" }}
                  aria-label="search">
                  <SearchIcon onClick={handleOnClick} />
                </IconButton>
              ) : null}

              {!isPDPPage ? (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    color: "#707070",
                  }}>
                  <InputBase
                    onClick={() => callGaEvent("menu")}
                    sx={{
                      ml: 1,
                      flex: 1,
                      color: "#231F20",
                      width: "145px",
                      textAlign: "center",
                      font: "normal normal normal 14px/24px Montserrat",
                      fontWeight: 500,
                    }}
                    value={searchQuery}
                    inputProps={{ "aria-label": "What are you looking for?" }}
                    onChange={OnChangeSearch}
                    onKeyDown={(e) => handleSearchRedirection(e)}
                    className="search-input"
                    placeholder="Search on SSBeauty"
                    autoFocus={true}
                    onFocus={() => setIsInputFocus(true)}
                  />
                </div>
              ) : null}

              {searchQuery && (
                <IconButton type="submit" sx={{ p: "1px" }} aria-label="close">
                  <CloseIconColor onClick={handleClear} />
                </IconButton>
              )}
            </PaperTileSpacing>
            <MicNoneIcon sx={{ display: "none" }} />
            <CameraAltOutlinedIcon sx={{ display: "none" }} />
          </HeaderContainerGrid>

          <SearchContentMsite
            searchVisible={searchMobVisible}
            data={searchData}
            isMobile={true}
            search={searchQuery}
            setSearchVisible={setMobileOpen}
            popularBrands={popularBrands}
            isPDP={isPDP}
            isInputFocus={isInputFocus}
            popularCategories={popularCategories}
            unbxdCarousel={unbxdCarousel}
            productData={productData}
            userDataItems={userDataItems}
          />
        </FixedHeader>
      </Dialog>
    </>
  );
}

export default SearchMobileIcon;
