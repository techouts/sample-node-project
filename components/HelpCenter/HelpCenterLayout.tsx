import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FAQComponent } from "./FAQComponent";
import { CommonHeading } from "./CommonHeading";
import { useMobileCheck } from "../../utility/isMobile";
import { SearchInput, StyledBox, SuggestBox, SuggestFields } from "./FAQStyles";
import { ReplaceImage } from "../../utility/ReplaceImage";
import triggerGAEvent from "../../utility/GaEvents";
import { NORMAL_SEARCH_ICON } from "../../utility/AppIcons";
import { AppIcons } from "../../utility/AppIconsConstant";
export const HelpCenterLayout = (data: any, position:number) => {
  const SEARCH_NORMAL = AppIcons(NORMAL_SEARCH_ICON);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMobileCheck();
  const [searchText, setSearchText] = useState<any>({});
  const [showClear, setShowClear] = useState(false);
  const [searchClose, setSearchClose] = useState(true);

  const inputChangeHandler = (val: string) => {
    if (val.length > 0) {
      setShowClear(true);
    } else {
      setShowClear(false);
    }
    setSearchText({ title: val });
    setSearchClose(true);
  };

  const handleClear = () => {
    setSearchText({ title: "" });
    setShowClear(false);
  };

  const [cursorr, setCursor] = useState(-1);
  // Search Field Updated start

  let someData = [] as any;
  const filteredData = data?.categories
    ?.map((categoriesData: any) =>
      categoriesData?.subCategories
        ? categoriesData?.subCategories?.map((subCategoriesData: any) => {
            const subCatTitileValue = subCategoriesData?.title;
            const subCatidValue = subCategoriesData?.id;

            return { title: subCatTitileValue, id: subCatidValue };
          })
        : []
    )
    .map((titles: any) => (someData = [...someData, ...titles]));

  const searchFillData = someData?.filter((searchData: any) =>
    searchData?.title?.toLowerCase()?.includes(searchText?.title?.toLowerCase())
  );

  const finalSearchData = searchText.length > 0 && searchFillData;
  // Search Field Updated End

  function handleSearchSey(e: any) {
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursorr > 0) {
      setCursor(cursorr - 1);
    } else if (e.keyCode === 40) {
      setCursor(cursorr + 1);
    }
  }

  const [searchSelect, setSearchSelect] = useState<any>(0);
  const handleSearchSelect = (finalSearch: any) => {
    setSearchSelect(searchSelect + 1);
    setSearchText(finalSearch);
    setSearchClose(false);
  };
  const handleSearchClose = () => {
    setSearchClose(false);
  };

  const callSearchEvent = (searchedValue: string, searchvalue: any) => {
    triggerGAEvent(
      {
        search_term: searchedValue,
        no_of_items: searchvalue?.length,
        event_type: "help_search",
        widget_title: data?.__component ? data?.__component : "na",
        item_price: 0,
        item_rating: "na",
        widget_position:2,
        link_text: "na",
        item_original_price:0,
        index:2,
        item_name: "na",
        item_category:"na",
      },
      "search"
    );
  };

  return (
    <Box
      p={isMobile ? "0%" : data?.bgPadding}
      pb={isMobile ? 5 : 10}
      onClick={handleSearchClose}
    >
      <Grid container>
        <Grid item xs={12} sm={8} md={8}>
          <CommonHeading
            title={data?.title}
            subTitle={data?.subText}
          ></CommonHeading>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <StyledBox>
            <SearchInput
              placeholder="Search your question"
              value={searchText?.title}
              onChange={(e) => {
                inputChangeHandler(e?.target?.value);
              }}
              onKeyDown={(event) => handleSearchSey(event)}
              size="small"
              fullWidth
              aria-label="search input"
              InputProps={{
                endAdornment: (
                  <>
                    {showClear && (
                      <InputAdornment position="end">
                        <CloseIcon
                          onClick={handleClear}
                          sx={{ cursor: "pointer" }}
                        />
                      </InputAdornment>
                    )}
                  </>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={`${ReplaceImage(SEARCH_NORMAL?.url)}`}
                      alt="searchIcon"
                    />
                  </InputAdornment>
                ),
              }}
            />
            {searchFillData?.length > 0 &&
              searchText.title?.length > 0 &&
              searchClose && (
                <SuggestBox
                  ref={inputRef}
                  style={{ marginRight: isMobile ? "20px" : "0px" }}
                >
                  {searchFillData?.map((finalSearch: any, index: any) => {
                    let sum = new RegExp(searchText?.title, "gi");
                    let newTitle = finalSearch?.title?.replace(
                      sum,
                      `<b style="color:black">${searchText?.title}</b>`
                    );

                    return (
                      <SuggestFields
                        onClick={() => {
                          handleSearchSelect(finalSearch);
                          callSearchEvent(finalSearch?.title, searchFillData);
                        }}
                        dangerouslySetInnerHTML={{ __html: newTitle }}
                        style={{
                          backgroundColor: index == cursorr ? "#F8EDF1" : "",
                        }}
                      ></SuggestFields>
                    );
                  })}
                </SuggestBox>
              )}
          </StyledBox>
        </Grid>
      </Grid>
      <Box sx={{ paddingTop: "3%" }}>
        <FAQComponent
          {...data}
          searchId={searchText?.id}
          searchSelect={searchSelect}
        ></FAQComponent>
      </Box>
    </Box>
  );
};
