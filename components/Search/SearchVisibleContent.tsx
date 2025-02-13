import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import SearchContentSchema from "../../schemas/SearchContentSchema";
import { PLP_SEARCH_ROUTE } from "../../utility/Constants";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  BackdropBox,
  Boxs,
  BrandsTitle,
  GridFilter,
  GridImage,
  PopularBrandTitle,
  RecentText,
  StyledBackdrop,
} from "./SearchVisibleStyle";
import SpinnerLoaderForSearch from "./SpinnerLoaderForSearch";
import triggerGAEvent from "../../utility/GaEvents";
import { searchbar_event_type } from "../../utility/GAConstants";
import { PRODUCT_SUGGESTIONS } from "../../graphQLQueries/ProductSearchSuggestions";
import client from "../../apollo-client";
import { Cookies } from "react-cookie";
import { IS_UNBXD_ENABLED, IS_UNBXD_MIDDLEWARE_ENABLED, MIDDLEWARE_UNBXD } from "../../utility/APIConstants";
import axios from "axios";
import { triggerAutoSuggestEvent } from "../../lib/UnbxdEvents";
import handleErrorResponse from "../../utility/ErrorHandling";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  No_RESULTS_SEARCH_ICON,
  RECENT_SEARCH_ICON,
} from "../../utility/AppIcons";
import { AppIcons } from "../../utility/AppIconsConstant";
import SearchPopup from "./SearchPopUps";
import UNBXDWidget from "../UNBXDWidget";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

interface SearchSchema {
  searchVisible: boolean;
  handleClickAway?: any;
  search: any;
  isMobile: any;
  data: SearchContentSchema;
  setSearchVisible: Function;
  popularBrands: any;
  isPDP?: boolean;
  isInputFocus?: any;
  popularCategories?: any;
  unbxdCarousel?: any;
  productData?: any;
  userDataItems?: any;
}

const SearchContent = ({
  searchVisible,
  handleClickAway,
  search,
  data,
  isMobile,
  isPDP = false,
  setSearchVisible,
  popularBrands,
  isInputFocus,
  popularCategories,
  unbxdCarousel,
  productData,
  userDataItems,
}: SearchSchema) => {
  const [spinnerLoaderSearch, setSpinnerLoaderSearch] = useState(false);
  const [filterContent, setFilterContent] = useState<any>([]);
  const CMSImageUrl = process.env.NEXT_PUBLIC_S3_URL;
  const SearchTimeline = `${CMSImageUrl}/clock_7c7dfcdd34.png`;
  const {
    popularlistItems = [],
    popularcategoriesTitle = "",
    trendingsearchesTitle = "",
    trendlistItems = [],
  } = data;
  const noResultSearchIcon: any = AppIcons(No_RESULTS_SEARCH_ICON);

  const autoLoadSuggestions = (query: any) => {
    setSpinnerLoaderSearch(true);
    if (!IS_UNBXD_ENABLED) {
    client
      .query({
        query: PRODUCT_SUGGESTIONS,
        variables: {
          search: query,
        },
      })
      .then((response) => {
        const hasError =    handleErrorResponse(response?.data?.ProductSuggestions?.products) //response checking
        if (hasError) return null;
        setFilterContent(response?.data?.ProductSuggestions?.products);
      })
      .catch((error) => console.log(error, "searchrerror=====>"))
      .finally(() => {
        setSpinnerLoaderSearch(false);
      });
  } else {
    axios(IS_UNBXD_MIDDLEWARE_ENABLED ? `${MIDDLEWARE_UNBXD}/autosuggest?q=${encodeURIComponent(query)}` : `/api/getSearchSuggestionsV2?q=${encodeURIComponent(query)}`)
      .then((response) => {
        setFilterContent(response?.data?.data?.ProductSuggestions?.products);
      })
      .catch((error) => console.log(error, 'searchrerror=====>'))
      .finally(() => {
        setSpinnerLoaderSearch(false);
      });
    }
  };
  const LazyResponse = (Values: any) => {
    let SearchTimeing: any;
    return (...passing: any) => {
      const autoValues = this as any;
      if (SearchTimeing) clearTimeout(SearchTimeing);
      SearchTimeing = setTimeout(() => {
        SearchTimeing = null;
        Values.apply(autoValues, passing);
      }, 500);
    };
  };
  const handleAutoSearch = useCallback(LazyResponse(autoLoadSuggestions), []);

  useEffect(() => {
    search
      ? handleAutoSearch(search)
      : isInputFocus
      ? !userDataItems?.storeMode
        ? autoLoadSuggestions("*")
        : () => {}
      : setFilterContent([]);
  }, [search, isInputFocus]);

  const router = useRouter();
  const cookie = new Cookies();
  const callSearchEvent = (
    title: string,
    items: any,
    position: number,
    linktext: any,
    indx: number
  ) => {
    triggerGAEvent(
      {
        event_type: searchbar_event_type,
        search_term: linktext,
        widget_title: title,
        item_price: 0,
        item_category: "na",
        item_rating: "na",
        item_name: linktext,
        item_original_price: 0,
        widget_position: position,
        no_of_items:Number( cookie.get("productCount")),
        link_text: linktext,
        index: indx,
      },
      "search"
    );
  };

  const keywords = filterContent?.filter(
    (a: any) => a?.type === "KEYWORD_SUGGESTION"
  );

  const topSearches = filterContent?.filter(
    (a: any) => a?.type === "TOP_SEARCH_QUERIES"
  );

  const promotedSuggestions = filterContent?.filter(
    (a: any) => a?.type === "PROMOTED_SUGGESTION"
  );
  const popularProducts = filterContent
    ?.filter((a: any) => a?.type === "POPULAR_PRODUCTS" && a?.cThumbnail)
    ?.slice(0, 5);

  const filteredSuggestionsData = [
    ...promotedSuggestions,
    ...topSearches,
    ...keywords,
  ];

  const trendingData = filteredSuggestionsData?.map((item: any) => ({
    ...item,
    title: item?.autosuggest,
  }));

  const initialTrendingSearchData = useMemo(
    () => trendingData,
    [trendingData?.length > 0]
  );

  let correctRenderKeys = 0;

  if (userDataItems?.storeMode && search?.length === 0) return null;

  return (
    <>
      <StyledBackdrop open={searchVisible} onClick={handleClickAway}>
        <BackdropBox>
          <Boxs sx={{ paddingTop: search ? "" : "1rem" }}>
            <Box px={3}>
              <Grid lg={12}>
                {!spinnerLoaderSearch && search.length !== 0 && (
                  <Grid>
                    <Box sx={{ width: "100%", padding: "20px 40px" }}>
                      <GridFilter>
                        {filterContent?.map(
                          (data: any, index: React.Key | null | undefined) => {
                            const keyword = IS_UNBXD_ENABLED
                              ? data?.autosuggest
                              : data;
                            let regexTerm;
                            try {
                              regexTerm = new RegExp(search, "gi");
                            } catch (err) {}
                            const highlightedText = regexTerm
                              ? keyword?.replace(
                                  regexTerm,
                                  (match: any) =>
                                    `<b style="color:black;">${match}</b>`
                                )
                              : "";

                            if (highlightedText) {
                              correctRenderKeys += 1;
                            }
                            return (
                              <>
                                {highlightedText && correctRenderKeys <= 5 && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      flexDirection: "row",
                                      gap: "0.5%",
                                    }}
                                    onClick={() => {
                                      setSearchVisible(false);

                                      triggerAutoSuggestEvent({
                                        type: data.type,
                                        searchKeyword: search,
                                        selectedKeyword: data.autosuggest,
                                      });

                                      callSearchEvent(
                                        "na",
                                        0,
                                        1,
                                        router?.query?.search,
                                        1
                                      );
                                      let newURL = encodeURIComponent(keyword);

                                      window.location.assign(
                                        `${window.location.origin}/${PLP_SEARCH_ROUTE}?search=${newURL}`
                                      );
                                    }}>
                                    <Stack>
                                      <SearchIcon />
                                    </Stack>
                                    <RecentText
                                      p={0.5}
                                      dangerouslySetInnerHTML={{
                                        __html: highlightedText,
                                      }}
                                      key={index}
                                    />
                                  </Box>
                                )}
                              </>
                            );
                          }
                        )}
                        <Stack width={"100%"} gap={"6px"}>
                          {!userDataItems?.storeMode && popularProducts?.map(
                            (
                              data: any,
                              index: React.Key | null | undefined
                            ) => {
                              const keyword = data?.title;
                              let regexTerm;
                              try {
                                regexTerm = new RegExp(search, "gi");
                              } catch (err) {}
                              const highlightedText = regexTerm
                                ? keyword?.replace(
                                    regexTerm,
                                    (match: any) =>
                                      `<b style="color:black;">${match}</b>`
                                  )
                                : "";

                              if (highlightedText) {
                                correctRenderKeys += 1;
                              }
                              return (
                                <>
                                  {highlightedText && (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "row",
                                        gap: "0.5%",
                                      }}
                                      onClick={() => {
                                        setSearchVisible(false);

                                        triggerAutoSuggestEvent({
                                          type: data.type,
                                          searchKeyword: search,
                                          selectedKeyword: data.autosuggest,
                                        });

                                        callSearchEvent(
                                          "na",
                                          0,
                                          1,
                                          router?.query?.search,
                                          1
                                        );
                                        let newURL =
                                          encodeURIComponent(keyword);

                                        window.location.assign(
                                          `${window.location.origin}/${PLP_SEARCH_ROUTE}?search=${newURL}`
                                        );
                                      }}>
                                      <SearchIcon />
                                      <Stack
                                        flexGrow={1}
                                        justifyContent={"end"}>
                                        <RecentText
                                          p={0.5}
                                          dangerouslySetInnerHTML={{
                                            __html: highlightedText,
                                          }}
                                          key={index}
                                        />
                                      </Stack>
                                      <Box
                                        component={"img"}
                                        sx={{
                                          height: "3rem",
                                          width: "3rem",
                                          boxShadow:
                                            "0px 0px 1px 1px rgba(0,0,0,0.2)",
                                        }}
                                        src={data?.cThumbnail}
                                        alt="recentlogo"
                                      />
                                    </Box>
                                  )}
                                </>
                              );
                            }
                          )}
                        </Stack>
                      </GridFilter>
                      {filterContent?.length <= 0 && (
                        <Box width={"100%"}>
                          <Stack sx={{ alignItems: "center" }}>
                            <img
                              src={`${ReplaceImage(noResultSearchIcon?.url)}`}
                              alt="no results icon"
                              style={{
                                top: "144px",
                                width: "92px",
                                height: "104px",
                              }}
                            />
                          </Stack>
                          <Typography
                            sx={{
                              marginTop: "26px",
                              textAlign: "center",
                              fontWeight: 700,
                              fontSize: "18px",
                              fontFamily: "Montserrat",
                              fontStyle: "normal",
                              textTransform: "none",
                              color: "#000000",
                            }}>
                            Uh-Oh! No results found
                          </Typography>
                          <Typography
                            sx={{
                              textAlign: "center",
                              fontSize: " 0.9rem",
                              mt: 0.5,
                              maxWidth: "600px",
                              mx: "auto",
                              color: "#000000",
                              fontWeight: 450,
                            }}>
                            Try checking your spelling or browser <br />
                            from the categories below
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "auto",
                              textAlign: "center",
                              gap: 2,
                              backgroundColor: "#AD184C",
                              m: "auto",
                              mt: 3,
                              mb: 2,
                              borderRadius: "0.5rem",
                              padding: "1px 2px 1px 2px",
                              maxWidth: "300px",
                            }}>
                            <Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: 2,
                                  backgroundColor: "#AD184C",
                                  borderRadius: "3.5rem",
                                  padding: "4px 2px 4px 2px",
                                }}>
                                <SearchOutlinedIcon
                                  sx={{ color: "#ffffff", fontSize: 29 }}
                                />
                                <Typography
                                  sx={{ fontSize: 16, color: "#fff" }}>
                                  Try Searching Again
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                )}
                {!userDataItems?.storeMode && (
                  <Stack gap={isMobile ? "3rem" : "2rem"}>
                    {/* popular categories */}
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"space-between"}>
                      <SearchPopup
                        analyticsFragments="isFromPopularCategory=true"
                        items={popularCategories?.items?.map((item: any) => ({
                          ...item,
                        }))}
                        title={popularCategories?.title}
                        isMobile={isMobile}
                      />
                    </Stack>
                    {/* Popular brands */}
                    <Grid item lg={11}>
                      <BrandsTitle variant="h6">
                        {data?.popularheaderTitle}
                      </BrandsTitle>
                      <GridImage
                        style={{
                          gridTemplateColumns: isMobile
                            ? `repeat(3 ,1fr)`
                            : `auto auto auto`,
                        }}>
                        {popularBrands?.items?.map(
                          (popularlistItem: any, index: number) => {
                            return (
                              <Grid
                                xs={2}
                                sm={4}
                                md={4}
                                key={index}
                                sx={{
                                  paddingBottom: isMobile ? "0px" : "14px",
                                }}>
                                <CardMedia
                                  sx={{
                                    width: isMobile ? "84px" : "200px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    if (popularlistItem?.path) {
                                      popularlistItem?.isNewTab && !isMobile
                                        ? window?.open(popularlistItem?.path)
                                        : window?.location?.assign(
                                            `${window?.location?.origin}/${popularlistItem?.path}`
                                          );
                                    }
                                    callSearchEvent(
                                      data?.popularheaderTitle,
                                      data?.popularlistItems?.length,
                                      2,
                                      popularlistItem?.title,
                                      index
                                    );
                                  }}>
                                  <img
                                    src={`${ReplaceImage(
                                      popularlistItem.imageUrl
                                    )}`}
                                    alt="popularbrands"
                                    width="100%"
                                    height="auto"
                                  />
                                </CardMedia>
                              </Grid>
                            );
                          }
                        )}
                      </GridImage>
                    </Grid>
                    {/* Trending searches */}
                    {filteredSuggestionsData?.length > 0 && (
                      <Box>
                        <SearchPopup
                          analyticsFragments="isFromTrendingSearch=true"
                          items={initialTrendingSearchData}
                          title={trendingsearchesTitle}
                          isMobile={isMobile}
                        />
                      </Box>
                    )}
                    {/* Unbxd widget Recently viewed */}
                    {cookie.get("accessToken") && (
                      <Box
                        sx={{
                          "& .slick-arrow": {
                            display: "none !important",
                          },
                          "& .products-title": {
                            textAlign: "left",
                            fontWeight: 720,
                            textTransform: "uppercase",
                            letterSpacing: "unset",
                            fontSize: "16px",
                          },
                        }}>
                        <Box sx={{ mb: "30px" }}>
                          <UNBXDWidget
                            {...{
                              ...(unbxdCarousel || {}),
                              productData,
                              isMsitePDP: true,
                              isSearchPopup:true,
                            }}
                          />
                        </Box>
                      </Box>
                    )}
                  </Stack>
                )}
              </Grid>
            </Box>
          </Boxs>
        </BackdropBox>
      </StyledBackdrop>
    </>
  );
};
export default SearchContent;
