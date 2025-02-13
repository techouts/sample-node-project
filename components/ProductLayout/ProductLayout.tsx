import React, { useState, useEffect, useRef } from "react";
import client from "../../apollo-client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {
  GET_BEAUTY_PROFILE_JSON,
  GET_SEARCHED_DATA,
  GET_PLP_SEARCHED_DATA_JSON,
  PLP_SEARCH_QUERY,
  GET_OPTIMIZED_PLP_DATA,
} from "../../graphQLQueries/SearchListQuery";
import { ProductsList } from "../../HOC/ProductList/ProductList";
import CustomPagination from "../../HOC/CustomPagination/CustomPagination";
import Filters from "../Filters/Filters";
import CustomDropDown from "../../HOC/CustomDropDown/CustomDropDown";
import {
  FlexBox,
  StyledText,
  NoProducts,
  StyledChip,
  NoProductsText,
  ClearButton,
} from "./ProductLayoutStyles";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import FilterMobile from "../Filters/FilterMobile";
import { useMobileCheck } from "../../utility/isMobile";
import SortFilterBar from "../../HOC/SortFilterBar/SortFilterBar";
import {
  event_type,
  plp_view_event_type,
  search_event_type,
  widget_type,
} from "../../utility/GAConstants";
import { CUSTOMER_WISHLIST } from "../../graphQLQueries/WhishList/WishListQuery";
import { useRouter } from "next/router";
import { urlGenerator } from "../../utility/urlGenerator";
import { Cookies } from "react-cookie";
import AxiosInstance from "../../utility/AxiosInstance";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  categoriesData,
  brandsData,
  plpSchemaData,
  beautyProfileData,
  userState,
} from "../../recoilstore";
import { useRecoilState } from "recoil";
import { NO_PRODUCTS_FOUND } from "./constants";
import triggerGAEvent, {
  viewItemArray,
  viewSearchResultsItemArray,
} from "../../utility/GaEvents";
import { AppIcons } from "../../utility/AppIconsConstant";
import { Closecircle_BlackColour_ICON } from "../../utility/AppIcons";
import ViewEvent from "../../utility/viewEvent";
import { pdpRedirecion } from "../../utility/PdpRedirection";
import { GET_BEAUTY_PROFILE } from "../../graphQLQueries/BeautyProfile/getBeautyProfileQuery";
import { getUniqItemsArr } from "../../utility/commonUtility";
import axios from "axios";
import {
  IS_UNBXD_ENABLED,
  IS_UNBXD_MIDDLEWARE_ENABLED,
  MIDDLEWARE_UNBXD,
} from "../../utility/APIConstants";
import { triggerBrowseAPIEvent } from "../../lib/UnbxdEvents";
import graphql from "../../middleware-graphql";
import { getPlpVCSearchQuery } from "../../graphQLQueries/plpVCSearch";
import { toast } from "../../utility/Toast";
import sendRequest from "../../utility/apiClient";

export const ProductLayout = ({
  params,
  filteredOptions,
  displayLoader,
  virtualCatgeoryProducts,
  sortData,
  setSortData,
  pageNo,
  componentData,
  categoryListCheck,
  categoryPath,
  isVirtualCategory,
  unbxdCategoryPath,
  setUnbxdCategoryPath,
  ...props
}: any) => {
  const router: any = useRouter();
  const { search = "" } = params;
  const [productsTitle, setProductsTitle] = useState<any>("All");
  const [selectedFilters, setSelectedFilters] = useState<any>([]);
  const [checkedFilter, setCheckedFilter] = useState<any>();
  const [copiedSelectedFilters, setCopiedSelectedFilters] = useState<any[]>([]);
  const [filtered, setFiltered] = useState(filteredOptions);
  const [openFilter, setOpenFilter] = useState<Boolean>(false);
  const isMobile = useMobileCheck();
  const [products, setProducts] = useState<any>();
  const [facets, setFacets] = useState<any[]>([]);
  const [page, setPage] = useState(pageNo);
  const [pageCount, setPageCount] = useState(1);
  const [count, setCount] = useState(1);
  const [opened, setOpened] = useState<any>([]);
  const fieldRef = useRef<HTMLInputElement>(null);
  const CLOSE_ICON = AppIcons(Closecircle_BlackColour_ICON);
  const [schemaStructureData, setSchemaStructureData] =
    useRecoilState(plpSchemaData);
  const [beautyProfile, setBeautyProfile] = useRecoilState(beautyProfileData);
  const [categories, setCategories] = useRecoilState(categoriesData);
  const [brands, setBrands] = useRecoilState(brandsData);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const list = [
    {
      label: "Recommended",
      url_key: "{}",
      value: "{}",
      disable: false,
      default: true,
    },
    {
      label: "Price: Low to High",
      url_key: '{"pmr_price":"ASC"}',
      value: "price_ASC",
      disable: false,
      default: false,
    },
    {
      label: "Price: High to Low",
      url_key: '{"pmr_price":"DESC"}',
      value: "price_DESC",
      disable: false,
      default: false,
    },
    {
      label: "Discount",
      url_key: '{"pmr_discount":"DESC"}',
      value: "discount_DESC",
      disable: false,
      default: false,
    },
    {
      label: "New Arrivals",
      url_key: '{"new_arrivals":"ASC"}',
      value: "new_arrivals_ASC",
      disable: false,
      default: false,
    },
  ];
  const CMSImageUrl = process.env.NEXT_PUBLIC_S3_URL;
  const PLPCardBanner = `${CMSImageUrl}/PDP_Card_Image_ccd278b116.png`;
  const size = 24;
  const speacialCardData = {
    position: 5,
    data: {
      name: "See products in your shade",
      image: {
        url: `${ReplaceImage(PLPCardBanner)}`,
      },
      subTite: "Find your matching products",
      isSpecialCard: true,
    },
  };
  const boundaryCount = isMobile ? 2 : 3;
  const siblingCount = 1;

  const cookie = new Cookies();
  const [wishListItems, setWishListitems] = useState([]);
  cookie.set("productCount", count, {
    path: "/",
    sameSite: true,
  });
  const checkForWishlist = () => {
    props?.setLoader(true);
    if (cookie.get("accessToken")) {
      client
        .mutate({
          mutation: CUSTOMER_WISHLIST,
          variables: {
            currentPage: 1,
            pageSize: 100,
          },
        })
        .then((res: any) => {
          setWishListitems(
            res?.data?.customer?.wishlists?.[0]?.items_v2?.items
          );
        })
        .catch((err: any) =>{
          toast.error("Someting went wrong, Please try again!!!");
          console.log(err)})
        .finally(() => {
          props?.setLoader(false);
        });
    }
  };

  useEffect(() => {
    const handlePopstate = () => {
      window.location.reload();
    };
    window.addEventListener("popstate", handlePopstate);
  }, []);

  const fetchIndex = (type: string, arrString: any) => {
    let arr = arrString;
    return arr?.findIndex((key: any) => {
      return key?.split?.("=")?.[0] === type;
    });
  };

  useEffect(() => {
    if (router?.isFallback) return;

    const searchKeyword = router?.query?.search;

    (async () => {
      let urlString = "";
      let arr = window.location.search?.split("?")[1]?.split("&");
      if (Object?.keys(filtered)?.length > 0) {
        await Object?.keys(filtered)?.map((filterKey: string) => {
          if (fetchIndex(filterKey, arr) > -1)
            arr.splice(fetchIndex(filterKey, arr), 1);
        });
      }
      if (fetchIndex("sort", arr) > -1)
        await arr.splice(fetchIndex("sort", arr), 1);
      if (fetchIndex("page", arr) > -1)
        await arr.splice(fetchIndex("page", arr), 1);
      if (fetchIndex("vStockAvailability", arr) > -1)
        await arr.splice(fetchIndex("vStockAvailability", arr), 1);
      if (fetchIndex("search", arr) > -1)
        await arr.splice(fetchIndex("search", arr), 1);
      if (fetchIndex("categoryFilter", arr) > -1)
        await arr.splice(fetchIndex("categoryFilter", arr), 1);
      const search = searchKeyword
        ? encodeURIComponent(searchKeyword).replace(/%20/g, "+")
        : null;

      if (search) {
        urlString = await `?search=${search}`;
        if (arr?.length > 0) {
          urlString = await `${urlString}&${arr?.join("&")}`;
        }
      } else if (!search && arr?.length > 0) {
        urlString = `?${arr?.join("&")}`;
      }
      urlString = urlGenerator(
        filtered,
        sortData,
        urlString,
        page,
        unbxdCategoryPath,
        userDataItems?.storeMode,
        userDataItems?.storeCode
      );
      await history.replaceState({}, "", urlString);
      await setProductsTitle(
        router?.asPath?.includes("searchTitle")
          ? router?.query?.searchTitle
          : router?.asPath?.includes("search")
          ? router?.query?.search
          : props?.pageTitle
      );
    })();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, sortData, router, global?.window?.location, page]);

  const fetchURI = () => {
    const searchKeyword = router?.query?.search;

    let urlString = "";
    let arr = window.location.search?.split("?")[1]?.split("&");

    if (Object?.keys(filtered)?.length > 0) {
      Object?.keys(filtered)?.map((filterKey: string) => {
        if (fetchIndex(filterKey, arr) > -1)
          arr.splice(fetchIndex(filterKey, arr), 1);
      });
    }
    if (fetchIndex("sort", arr) > -1) arr.splice(fetchIndex("sort", arr), 1);
    if (fetchIndex("page", arr) > -1) arr.splice(fetchIndex("page", arr), 1);
    if (fetchIndex("vStockAvailability", arr) > -1)
      arr.splice(fetchIndex("vStockAvailability", arr), 1);
    if (fetchIndex("categoryFilter", arr) > -1)
      arr.splice(fetchIndex("categoryFilter", arr), 1);
    const search = searchKeyword
      ? encodeURIComponent(searchKeyword).replace(/%20/g, "+")
      : null;

    if (fetchIndex("search", arr) > -1)
      arr.splice(fetchIndex("search", arr), 1);
    if (search) {
      urlString = `?search=${search}`;
      if (arr?.length > 0) {
        urlString = `${urlString}&${arr?.join("&")}`;
      }
    } else if (!search && arr?.length > 0) {
      urlString = `?${arr?.join("&")}`;
    }
    urlString = urlGenerator(
      filtered,
      sortData,
      urlString,
      page,
      unbxdCategoryPath,
      userDataItems?.storeMode,
      userDataItems?.storeCode
    );
    return urlString;
  };

  const filterByProperty = (array: any, prop: any, value: any) => {
    var filtered: any = [];
    array?.map((level1: any) => {
      if (level1[prop] === value) {
        return null;
      } else {
        level1.children?.map((level2: any) => {
          if (level2[prop] === value) {
            filtered.push({
              level: 1,
              id: level2?.id,
              name: level2?.name,
              path: level2?.path,
              product_count: level2?.product_count,
              url_key: level2?.url_key,
            });
          } else {
            level2.children?.map((level3: any) => {
              if (level3[prop] === value) {
                filtered.push(
                  {
                    level: 1,
                    id: level2?.id,
                    name: level2?.name,
                    path: level2?.path,
                    product_count: level2?.product_count,
                    url_key: level2?.url_key,
                  },
                  {
                    level: 2,
                    id: level3?.id,
                    name: level3?.name,
                    path: level3?.path,
                    product_count: level3?.product_count,
                    url_key: level3?.url_key,
                  }
                );
              } else {
                level3.children?.map((level4: any) => {
                  if (level4[prop] === value) {
                    filtered.push(
                      {
                        level: 1,
                        id: level2?.id,
                        name: level2?.name,
                        path: level2?.path,
                        product_count: level2?.product_count,
                        url_key: level2?.url_key,
                      },
                      {
                        level: 2,
                        id: level3?.id,
                        name: level3?.name,
                        path: level3?.path,
                        product_count: level3?.product_count,
                        url_key: level3?.url_key,
                      },
                      {
                        level: 3,
                        id: level4?.id,
                        name: level4?.name,
                        path: level4?.path,
                        product_count: level4?.product_count,
                        url_key: level4?.url_key,
                      }
                    );
                  }
                });
              }
            });
          }
        });
      }
    });
    return filtered;
  };

  const checkFilterLevel = () => {
    return filterByProperty(
      categoryListCheck?.category?.children,
      "id",
      Number(router?.query?.pid[router?.query?.pid?.length - 1])
    )?.filter((val: any) => {
      return (
        val?.id === Number(router?.query?.pid[router?.query?.pid?.length - 1])
      );
    })?.[0];
  };

  function checkMultipleLevelFilter(filtered: any, sortItem: any) {
    const checkVal: any = [];
    sortItem?.items?.map((obj: any) => {
      obj?.items?.map((l1: any) => {
        l1?.items?.map((l2: any) => {
          const valCheck = filtered?.[
            sortItem?.attribute_code ?? sortItem?.tab
          ]?.in?.findIndex((key: any) => {
            return l2?.value === key;
          });
          if (
            (valCheck > -1 && checkFilterLevel()?.level < 3) ||
            (valCheck > -1 && !checkFilterLevel()?.level)
          ) {
            checkVal.push(l2);
          }
        });
      });
    });
    return checkVal;
  }

  const fetchFilteredVal = (obj: any) => {
    let filterObj;
    if (obj?.category_id) {
      let valCheck = obj?.category_id?.in?.filter((lvl: any) => {
        return checkFilterLevel()?.id?.toString() === lvl;
      });
      if (valCheck?.length > 0 && obj?.category_id?.in?.length > 1) {
        let levelCheckCat = obj?.category_id?.in?.filter((lvl: any) => {
          return (
            filterByProperty(
              categoryListCheck?.category?.children,
              "id",
              Number(lvl)
            )?.filter((keyD: any) => {
              return keyD?.level > 2;
            })?.length > 0
          );
        });
        filterObj = { ...obj, category_id: { in: levelCheckCat } };
      } else {
        filterObj = obj;
      }
    } else {
      filterObj = obj;
    }
    return filterObj;
  };

  const dynamicFiltersConversionToString = (obj: any) => {
    let str = "";
    for (const [p, val] of Object.entries(obj)) {
      const valueLab: any = val;
      const valueKey: any =
        valueLab?.length > 0
          ? valueLab?.length > 1
            ? val
            : valueLab?.[0]
          : val;
      str += `${p}:\n`;
      const keyValue = JSON.stringify(valueKey);
      str += `${keyValue}`;
    }
    return `{${str}}`;
  };

  function filtersConversionToString(obj: any) {
    let filterObj;
    if (obj?.category_id) {
      let valCheck = obj?.category_id?.in?.filter((lvl: any) => {
        return checkFilterLevel()?.id?.toString() === lvl;
      });
      if (valCheck?.length > 0 && obj?.category_id?.in?.length > 1) {
        let levelCheckCat = obj?.category_id?.in?.filter((lvl: any) => {
          return (
            filterByProperty(
              categoryListCheck?.category?.children,
              "id",
              Number(lvl)
            )?.filter((keyD: any) => {
              return keyD?.level > 2;
            })?.length > 0
          );
        });
        filterObj = { ...obj, category_id: { in: levelCheckCat } };
      } else {
        filterObj = obj;
      }
    } else {
      filterObj = obj;
    }
    let str = "";
    for (const [p, val] of Object.entries(filterObj)) {
      const valueLab: any = val;
      const valueKey: any =
        valueLab?.in?.length > 0
          ? valueLab?.in?.length > 1
            ? val
            : { eq: valueLab?.in?.[0] }
          : val;
      str += `${p}:\n`;
      for (const [key, value] of Object.entries(valueKey)) {
        const keyValue = JSON.stringify(value);
        str += `{${key}:${keyValue}}`;
      }
    }
    return `{${str}}`;
  }

  function SortConversionToString(obj: any, isVC = false) {
    let str = "";
    let count = 0;
    for (const [key, value] of Object.entries(obj)) {
      if (isVC) {
        str += count > 0 ? `, ${key}: "${value}"` : `${key}: "${value}"`;
      } else {
        str += count > 0 ? `, ${key}: ${value}` : `${key}: ${value}`;
      }
      count = count + 1;
    }
    return `{${str}}`;
  }

  const resultSets = (res: any) => {
    if (res?.items?.[0]?.categories) {
      let brandInfo = res?.aggregations
        ?.filter((obj: any) => obj.attribute_code === "brand_name")?.[0]
        ?.options?.filter((item: any) =>
          router?.query?.brand_name?.includes(",")
            ? item.value.toString() ===
              router?.query?.brand_name?.toString()?.split("%2C")?.[0]
            : item.value.toString() === router?.query?.brand_name
        );
      setBrands(brandInfo);
      setCategories(
        filterByProperty(
          categoryListCheck?.category?.children,
          "id",
          Number(router?.query?.pid[router?.query?.pid?.length - 1])
        )
      );
    } else {
      setCategories([]);
      setBrands([]);
    }
    setCount(res?.total_count);
    let productsData = res?.items;
    let structuredPLPData: any = [];
    productsData?.map((dataPLP: any, index: any) => {
      structuredPLPData.push({
        "@type": "ListItem",
        position: index + 1,
        name: dataPLP?.name,
        url:
          dataPLP?.type_id === "simple"
            ? dataPLP?.image?.url
            : dataPLP?.variants?.[0]?.product?.image?.url,
      });
    });
    setSchemaStructureData(structuredPLPData);
    let filterCheckArr: any = [];
    const agg = res?.aggregations;
    agg?.sort((a: any, b: any) => {
      if (
        a?.attribute_code?.includes("checkbox") ||
        b?.attribute_code?.includes("checkbox")
      ) {
        return 0;
      }
      if (a?.label < b?.label) {
        return -1;
      }
      if (a?.label > b?.label) {
        return 1;
      }
      return 0;
    });
    agg?.map((sortItem: any) => {
      if (filtered[sortItem?.attribute_code]) {
        sortItem?.options?.map((filterItem: any, index: number) => {
          const checkIndex =
            sortItem?.attribute_code === "price"
              ? filtered?.[sortItem?.attribute_code]?.from?.includes(",")
                ? filtered?.[sortItem?.attribute_code]?.from
                    ?.split(",")
                    ?.findIndex((key = { index }) => {
                      return filterItem?.value === decodeURIComponent(key);
                    })
                : filtered?.[sortItem?.attribute_code]?.from
                    ?.split("%2C")
                    ?.findIndex((key = { index }) => {
                      return filterItem?.value === decodeURIComponent(key);
                    })
              : sortItem?.options?.filter((levels: any) => {
                  return levels?.items?.length > 0;
                })?.length > 0
              ? checkMultipleLevelFilter(filtered, sortItem)?.length > -1
                ? 0
                : -1
              : filtered?.[sortItem?.attribute_code]?.in?.findIndex(
                  (key = { index }) => {
                    return (
                      filterItem?.value?.replace(/&/g, "%26") ===
                      decodeURIComponent(key)?.replace(/&/g, "%26")
                    );
                  }
                );
          if (checkIndex > -1) {
            filterCheckArr?.push({
              ...filterItem,
              tab: sortItem?.attribute_code,
            });
          }
        });
      }
    });
    setSelectedFilters(filterCheckArr);
    setProducts(productsData);
    let categories: any = {};
    if (res?.multilevel?.[0]) {
      let multiLevelData = res?.multilevel?.[0];
      categories["attribute_code"] = multiLevelData?.filterField;
      categories["filterField"] = "facet_nested";
      categories["label"] = "Category";
      if (Object.keys(multiLevelData?.breadcrumb)?.length > 0) {
        categories["child"] = getNestedBreadcrumb(
          multiLevelData?.breadcrumb,
          []
        );
      }
      categories["options"] = multiLevelData?.values;
    }
    if (process.env.NEXT_PUBLIC_FILTERS_ENABLE === "true") {
      const categoryIndex = res?.aggregations?.findIndex(
        (facetKey: any) =>
          facetKey?.attribute_code?.toLowerCase() === "category_id"
      );
      const catOptions = res?.aggregations?.[categoryIndex];
      let filterChecKarr: any;
      catOptions?.options?.map((opt: any) => {
        if (opt?.value === checkFilterLevel()?.id?.toString()) {
          filterChecKarr = opt?.items;
        } else {
          opt?.items?.map((l1: any) => {
            if (l1?.value === checkFilterLevel()?.id?.toString()) {
              filterChecKarr = l1;
            } else {
              l1?.items?.map((l2: any) => {
                if (l2?.value === checkFilterLevel()?.id?.toString()) {
                  filterChecKarr = l2;
                } else {
                  l2?.items?.map((l3: any) => {
                    if (l3?.value === checkFilterLevel()?.id?.toString()) {
                      filterChecKarr = l3;
                    }
                  });
                }
              });
            }
          });
        }
      });
      let filterOpt = { ...catOptions, options: filterChecKarr?.items };
      if (facets?.length <= 0) {
        let options = res?.aggregations;
        if (checkFilterLevel()?.id) {
          options[categoryIndex] = filterOpt;
        }
        setFacets(options);
      }
      if (facets?.length > 0) {
        const aggIndex = res?.aggregations?.findIndex(
          (facetKey: any) =>
            facetKey?.attribute_code?.toLowerCase() ===
            checkedFilter?.toLowerCase()
        );
        const keyIndex = facets.findIndex(
          (facetKey) =>
            facetKey?.attribute_code?.toLowerCase() ===
            checkedFilter?.toLowerCase()
        );
        const categoryIndex = facets?.findIndex(
          (facetKey: any) =>
            facetKey?.attribute_code?.toLowerCase() === "category_id"
        );
        if (keyIndex > -1 && aggIndex > -1) {
          let arr = res?.aggregations;
          arr[aggIndex] = facets[keyIndex];
          if (
            checkedFilter?.toLowerCase() === "category_id" &&
            categoryIndex > -1
          ) {
            const catOptions = facets[categoryIndex];
            arr[categoryIndex] = catOptions;
          }
          if (
            checkedFilter?.toLowerCase() !== "category_id" &&
            categoryIndex > -1
          ) {
            arr = [...getUniqItemsArr({ arr: arr, id: "attribute_code" })];

            const catIndex = arr?.findIndex(
              (facetKey: any) =>
                facetKey?.attribute_code?.toLowerCase() === "category_id"
            );

            arr[catIndex] = filterOpt;
          }
          setFacets(arr);
        }
      }
    }
    if (process.env.NEXT_PUBLIC_FILTERS_ENABLE !== "true") {
      setFacets(res?.aggregations);
    }
    if (productsData?.length > 0) {
      checkForWishlist();
    }
    if (!res) {
      setPage(1);
    }
    if (categories?.options) {
      setFacets((preData: any) => {
        const index = preData?.findIndex(
          (i: any) => i?.filterField === "facet_nested"
        );
        if (index === -1) {
          return [categories, ...preData];
        } else {
          const updatedFacets = preData?.filter(
            (i: any) => i?.filterField !== "facet_nested"
          );
          return [categories, ...updatedFacets];
        }
      });
    }
  };

  function getNestedBreadcrumb(data: any, parentPath: string[]) {
    let nestedCat: any = {};
    if (data?.child) {
      nestedCat["child"] = getNestedBreadcrumb(data?.child, [
        ...parentPath,
        data?.values?.[0]?.name,
      ]);
    }
    nestedCat["attribute_code"] = data?.filterField;
    nestedCat["values"] = data?.values?.[0]?.name;
    nestedCat["filterField"] = "facet_nested";
    nestedCat["level"] = data?.level;
    nestedCat["values"] = data?.values?.map((i: any) => {
      const prevPath = parentPath?.map((i) => i)?.join(">");
      const navPath = prevPath?.length > 0 ? prevPath + ">" : "";
      return {
        ...i,
        navPath: `${navPath}${i?.name}`,
      };
    });
    return nestedCat;
  }

  const fetchBeautyProfile = async () => {
    if (cookie.get("accessToken")) {
      let dataCheck: any = JSON.stringify({});
      await client
        .query({
          query: GET_BEAUTY_PROFILE,
          fetchPolicy: "no-cache",
        })
        .then((res) => {
          const BeautyProfile = res?.data?.customer?.BeautyProfile;
          if (BeautyProfile) {
            let profile = JSON.parse(BeautyProfile);
            let filters: any = {};
            profile.data?.map((obj: any) => {
              let arr = [obj?.childId];
              filters = { ...filters, [obj.parentId]: arr };
            });
            dataCheck = dynamicFiltersConversionToString(filters);
          }
        })
        .catch((err) => {
          dataCheck = JSON.stringify({});
          console.log("err:", err);
        });
      return dataCheck;
    } else {
      return JSON.stringify({});
    }
  };

  useEffect(() => {
    (async () => {
      props?.setLoader(true);
      if (router.isReady) {
        if (props?.slug === "beauty-profile") {
          let filters: any = {};
          if (beautyProfile) {
            beautyProfile?.data?.map((obj: any) => {
              let arr = [obj?.childId];
              filters = { ...filters, [obj.parentId?.toLowerCase()]: arr };
            });
          }
          const dynamicFilter =
            beautyProfile && beautyProfile?.data?.length > 0
              ? await dynamicFiltersConversionToString(filters)
              : await fetchBeautyProfile();
          console.log(dynamicFilter);
          await sendRequest(
            GET_BEAUTY_PROFILE_JSON(
              encodeURIComponent(JSON.stringify(search)),
              size,
              page,
              filtersConversionToString(filtered),
              list?.filter((obj) => obj.value === sortData)?.length > 0
                ? SortConversionToString(
                    JSON.parse(
                      list?.filter((obj) => obj.value === sortData)?.[0]
                        ?.url_key
                    )
                  )
                : JSON.stringify({}),
              dynamicFilter ?? JSON.stringify({})
            ),
            false,
            true
          )
            .then((res) => {
              console.log(res);
              resultSets(res?.data?.data?.beautyprofile);
            })
            .catch((err: any) => {
              setCategories([]);
              setBrands([]);
              setSchemaStructureData([]);
              console.log(err);
              props?.setLoader(false);
              setPage(1);
              setProducts([]);
            })
            .finally(() => {
              props?.setLoader(false);
            });
        } else {
          if (process.env.NEXT_PUBLIC_DISABLE_PRODUCTS_POST_CALL === "true") {
            // changing search query payload vStockAvailability to vStockAvailability_uFilter for search accuracy without modifying url
            const tempAllSearchParams = fetchURI()?.replaceAll("?search=", "");
            let allSearchParams = tempAllSearchParams;
            if (tempAllSearchParams.includes("vStockAvailability")) {
              allSearchParams = tempAllSearchParams.replace(
                "vStockAvailability",
                "vStockAvailability_uFilter"
              );
            }

            const userID = cookie.get("unbxd.userId") || "uid";

            const body = {};
            const unbxdURL = `${
              IS_UNBXD_MIDDLEWARE_ENABLED
                ? `${MIDDLEWARE_UNBXD}/unbxd-search`
                : "/api/searchV2"
            }?q=${allSearchParams}&uid=${userID}&facet.multiselect=true`;
            const unbxdBrowseParams = fetchURI()?.replace("?", "");
            const catPath = `categoryPath:"${encodeURIComponent(
              categoryPath
            )}"`;
            const unbxdBrowseURL = IS_UNBXD_MIDDLEWARE_ENABLED
              ? `${MIDDLEWARE_UNBXD}/browser?p=${catPath}&uid=${userID}&facet.multiselect=true&${unbxdBrowseParams}`
              : `/api/browse?q=${catPath}&uid=${userID}&${unbxdBrowseParams}`;
            const useBrowseAPI = !!categoryPath;
            console.log("unbxdURL", unbxdURL);
            // VirtualCategory api call
            if (isVirtualCategory) {
              await graphql
                .query({
                  query: getPlpVCSearchQuery(
                    encodeURIComponent(router?.query?.pid?.[1]),
                    size,
                    page,
                    decodeURIComponent(filtersConversionToString(filtered)),
                    list?.filter((obj) => obj.value === sortData)?.length > 0
                      ? SortConversionToString(
                          JSON.parse(
                            list?.filter((obj) => obj.value === sortData)?.[0]
                              ?.url_key
                          ),
                          true
                        )
                      : JSON.stringify({})
                  ),
                  fetchPolicy: "no-cache",
                })
                .then((res: any) => {
                  resultSets(res?.data?.cmsVirtualCategory);
                })
                .catch((error: any) => {
                  setCategories([]);
                  setBrands([]);
                  setSchemaStructureData([]);
                  console.log(error);
                  props?.setLoader(false);
                  setPage(1);
                  setProducts([]);
                })
                .finally(() => {
                  props?.setLoader(false);
                });
              return;
            }
            IS_UNBXD_ENABLED && search
              ? await axios
                  .post(unbxdURL, body)
                  .then((res) => {
                    if (!!res?.data?.redirect) {
                      router.push(res?.data?.redirect);
                    } else resultSets(res?.data?.products);
                  })
                  .finally(() => {
                    props?.setLoader(false);
                  })
              : IS_UNBXD_ENABLED && useBrowseAPI
              ? axios
                  .post(unbxdBrowseURL, body)
                  .then((res) => {
                    triggerBrowseAPIEvent({
                      page: categoryPath,
                      requestId: res.headers["unx-request-id"],
                    });
                    resultSets(res?.data?.products);
                  })
                  .finally(() => {
                    props?.setLoader(false);
                  })
              : AxiosInstance(
                  GET_OPTIMIZED_PLP_DATA(
                    encodeURIComponent(JSON.stringify(search)),
                    size,
                    page,
                    filtersConversionToString(filtered),
                    list?.filter((obj) => obj.value === sortData)?.length > 0
                      ? SortConversionToString(
                          JSON.parse(
                            list?.filter((obj) => obj.value === sortData)?.[0]
                              ?.url_key
                          )
                        )
                      : JSON.stringify({})
                  ),
                  false,
                  router?.query?.search &&
                    process.env.NEXT_PUBLIC_WIZZY_SEARCH_ENABLE === "true"
                    ? true
                    : false,
                  false
                )
                  .then((res) => {
                    resultSets(res?.data?.data?.productSearchQry);
                  })
                  .catch((err: any) => {
                    setCategories([]);
                    setBrands([]);
                    setSchemaStructureData([]);
                    console.log(err);
                    props?.setLoader(false);
                    setPage(1);
                    setProducts([]);
                  })
                  .finally(() => {
                    props?.setLoader(false);
                  });
          } else {
            client
              .query({
                query: GET_SEARCHED_DATA,
                variables: {
                  searchText: search,
                  pageSize: size,
                  currentPage: Number(page),
                  filters: fetchFilteredVal(filtered),
                  sort:
                    list?.filter((obj) => obj.value === sortData)?.length > 0
                      ? JSON.parse(
                          list?.filter((obj) => obj.value === sortData)?.[0]
                            ?.url_key
                        )
                      : {},
                  queryParamVal:
                    "?slug=" +
                      props?.slug +
                      "&" +
                      fetchURI()?.split("?")?.[1] || "",
                },
                fetchPolicy: "no-cache",
                errorPolicy: "ignore",
              })
              .then((res) => {
                resultSets(res?.data?.products);
              })
              .catch((err: any) => {
                setCategories([]);
                setBrands([]);
                setSchemaStructureData([]);
                console.log(err);
                props?.setLoader(false);
                setPage(1);
                setProducts([]);
              })
              .finally(() => {
                props?.setLoader(false);
              });
          }
        }
      }
    })();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filtered, sortData, search, router.isReady, unbxdCategoryPath]);

  useEffect(() => {
    setPageCount(
      count % size == 0 ? count / size : Math.floor(count / size) + 1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    props?.setLoader(true);
    setPage(value);
    //page change arrow clicks
    window.location?.href?.includes("search")
      ? triggerGAEvent(
          {
            widget_type: "pagination",
            widget_position: 2,
            link_url: window?.location?.href,
            link_text: value,
            no_of_items: count,
            event_type: event_type,
            search_term:
              window?.location?.search &&
              window?.location?.search
                ?.replace("?", "")
                ?.split("&")
                ?.filter((item: any) => item?.includes("search"))?.[0]
                ?.split("=")?.[1],
          },
          router?.asPath?.includes("search") ? "click" : "click"
        )
      : triggerGAEvent(
          {
            widget_type: "pagination",
            widget_position: 2,
            link_url: window?.location?.href,
            link_text: value,
            no_of_items: count,
            event_type: event_type,
          },
          router?.asPath?.includes("search") ? "click" : "click"
        );
    // eslint-disable-next-line react-hooks/rules-of-hooks
  };

  const handleSelectedValue = (val: string) => {
    setPage(1);
    val === "Recommended" ? setSortData({}) : setSortData(val);
    //sort selected event
    window.location?.href?.includes("search")
      ? triggerGAEvent(
          {
            widget_type: "sort ",
            widget_title: componentData?.__component,
            widget_position: 2,
            link_url: window?.location?.href,
            link_text: list?.filter((item) => item?.value === val)[0]?.label,
            no_of_items: count,
            event_type: event_type,
            search_term:
              window?.location?.search &&
              window?.location?.search
                ?.replace("?", "")
                ?.split("&")
                ?.filter((item: any) => item?.includes("search"))?.[0]
                ?.split("=")?.[1],
          },
          router?.asPath?.includes("search") ? "click" : "click"
        )
      : triggerGAEvent(
          {
            widget_type: "sort ",
            widget_title: componentData?.__component,
            widget_position: 2,
            link_url: window?.location?.href,
            link_text: list?.filter((item) => item?.value === val)[0]?.label,
            no_of_items: count,
            event_type: event_type,
          },
          router?.asPath?.includes("search") ? "click" : "click"
        );
  };

  const clearAllHandler = async () => {
    if (
      checkFilterLevel()?.id?.toString() ===
      router?.query?.pid[router?.query?.pid?.length - 1]
    ) {
      window.location.href =
        window.location.origin +
        window.location.pathname +
        "?category_id=" +
        router?.query?.pid[router?.query?.pid?.length - 1];
    } else {
      const oldParamKey = router?.query?.pid?.[router?.query?.pid?.length - 1];
      const oldParamValue = router?.query?.[oldParamKey];
      window.location.href =
        window.location.origin +
        window.location.pathname +
        `${oldParamValue ? "?" + oldParamKey + "=" + oldParamValue : ""}`;
    }
  };
  const removeFilter = (
    prevState: { [x: string]: { in: any } },
    label: string | number,
    optionValue: any
  ) => {
    const temp = [...prevState[label]?.in];
    const index = temp?.indexOf(optionValue);
    const firstArr = temp.slice(0, index);
    const secondArr = temp.slice(index + 1);
    return [...firstArr, ...secondArr];
  };
  const removePriceFilter = (
    prevState: { [x: string]: { from: any } },
    label: string | number,
    optionValue: any
  ) => {
    let temp = [];
    if (prevState[label]?.from?.includes(",")) {
      temp = [...prevState[label]?.from?.split(",")];
    } else {
      temp = [...prevState[label]?.from?.split("%2C")];
    }
    const index = temp?.indexOf(optionValue);
    const firstArr = temp.slice(0, index);
    const secondArr = temp.slice(index + 1);
    return [...firstArr, ...secondArr]?.toString();
  };
  const handleDelete = (label: any, value: any, index: any) => {
    if (index !== -1) {
      setSelectedFilters([
        ...selectedFilters.slice(0, index),
        ...selectedFilters.slice(index + 1, selectedFilters.length),
      ]);
      if (label) {
        setFiltered((prevState: any) => ({
          ...prevState,
          [label]:
            label === "price"
              ? {
                  from: prevState[label]
                    ? prevState[label]?.from?.split(/[,|%2C]+/)?.includes(value)
                      ? removePriceFilter(prevState, label, value)
                      : prevState[label]?.from === ""
                      ? value
                      : [
                          ...prevState[label]?.from?.split(/[,|%2C]+/),
                          value,
                        ]?.toString()
                    : value,
                }
              : {
                  in: prevState[label]
                    ? prevState[label]?.in?.includes(value)
                      ? removeFilter(prevState, label, value)
                      : [...prevState[label]?.in, value]
                    : [value],
                },
        }));
      }
    }
  };

  const getChipText = (item: any) => {
    return facets?.filter(
      (facet: any) => facet?.attribute_code == item?.tab
    )?.[0]?.label;
  };
  const viewEventWrapper: any = useRef();
  const deeplinkurl =
    `${global?.window?.location.origin}${
      products?.type_id === "simple"
        ? pdpRedirecion(products?.sku, products?.type_id, products?.name)
        : pdpRedirecion(
            products?.sku,
            products?.type_id,
            products?.name,
            products?.configured_variant?.color,
            products?.configured_variant?.size
          )
    }` || "na";
  const SLPdataLayer = {
    widget_type: widget_type,
    widget_title: componentData?.__component
      ? componentData?.__component
      : "na",
    widget_description: "na",
    widget_postion: 3,
    link_url: deeplinkurl,
    link_text: "na",
    no_of_items: count || 0,
    event_type: search_event_type,
    component_id: componentData?.id || "na",
    item_name: router?.query?.search,
    item_id: deeplinkurl,
    search_term: router?.query?.search,
    view_items: viewSearchResultsItemArray(
      products,
      deeplinkurl,
      categoryListCheck
    ),
  };
  const PLPdataLayer = {
    widget_type: widget_type,
    widget_title: componentData?.__component
      ? componentData?.__component
      : "na",
    widget_description: "na",
    widget_postion: 3,
    no_of_items: count || 0,
    event_type: plp_view_event_type,
    component_id: componentData?.id || "na",
    content_type: "product",
    item_type: "product",
    view_items: viewItemArray(
      products,
      deeplinkurl,
      router?.query?.pid,
      categoryListCheck
    ),
  };
  ViewEvent(
    viewEventWrapper,
    router?.query?.search ? SLPdataLayer : PLPdataLayer,
    router?.asPath?.includes("search")
      ? "view_search_results"
      : "view_item_list"
  );

  const selectedFilterValCheck = () => {
    return selectedFilters?.filter((item: any) => {
      return checkMultipleLevelFilter(filtered, item)?.length > 0;
    });
  };

  const filterLevelCheck = () => {
    let levelCheckCat;
    let obj = filtered;
    if (obj?.category_id) {
      let valCheck = obj?.category_id?.in?.filter((lvl: any) => {
        return checkFilterLevel()?.id?.toString() === lvl;
      });
      if (valCheck?.length > 0 && selectedFilterValCheck()?.length > 0) {
        levelCheckCat = obj?.category_id?.in?.filter((lvl: any) => {
          return (
            filterByProperty(
              categoryListCheck?.category?.children,
              "id",
              Number(lvl)
            )?.filter((keyD: any) => {
              return keyD?.level > 2;
            })?.length > 0
          );
        });
      }
    }
    return levelCheckCat;
  };

  return (
    <Box>
      <Grid container px={"5%"} pt={2} pb={isMobile ? 0 : 8}>
        <Grid item xs={12}>
          {products?.length > 0 && (
            <FlexBox ref={fieldRef} $isMobile={isMobile} flexDirection="row">
              <StyledText variant="h1">{`${
                brands?.[0]?.label
                  ? brands?.[0]?.label
                  : productsTitle
                  ? productsTitle
                  : props?.pageTitle
                  ? props?.pageTitle
                  : "All"
              } (${count})`}</StyledText>
              {!isMobile && products?.length > 0 && (
                <CustomDropDown
                  list={list}
                  handleSelectedValue={handleSelectedValue}
                  defaultValue={router?.query?.sort?.toString() || "{}"}
                  titlePath={""}></CustomDropDown>
              )}
            </FlexBox>
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item display={isMobile ? "none" : "block"} sm={3} md={3}>
              {!isMobile && products?.length > 0 && (
                <Box>
                  <Filters
                    key={JSON.stringify(facets)}
                    setFiltered={setFiltered}
                    filtered={filtered}
                    setSelectedFilters={setSelectedFilters}
                    selectedFilters={selectedFilters}
                    checkFilter={checkedFilter}
                    setCheckedFilter={setCheckedFilter}
                    data={facets}
                    opened={opened}
                    setOpened={setOpened}
                    setPage={setPage}
                    categoryPath={unbxdCategoryPath}
                    setCategoryPath={setUnbxdCategoryPath}
                  />
                </Box>
              )}
              {isMobile && (
                <FilterMobile
                  key={JSON.stringify(facets)}
                  showLoader={props?.setLoader}
                  setFiltered={setFiltered}
                  filtered={filtered}
                  checkFilter={checkedFilter}
                  setCheckedFilter={setCheckedFilter}
                  setSelectedFilters={setSelectedFilters}
                  selectedFilters={selectedFilters}
                  data={facets}
                  categoryListCheck={categoryListCheck}
                  openFilter={openFilter}
                  opened={opened}
                  setOpened={setOpened}
                  setOpenFilter={setOpenFilter}
                  setCopiedSelectedFilters={setCopiedSelectedFilters}
                  copiedSelectedFilters={copiedSelectedFilters}
                  clearAllHandler={clearAllHandler}
                  setPage={setPage}
                  categoryPath={unbxdCategoryPath}
                  setCategoryPath={setUnbxdCategoryPath}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              {!isMobile && !displayLoader && (
                <Stack direction={"row"} alignItems="baseline" flexWrap="wrap">
                  {selectedFilters?.map((item: any, index: number) => (
                    <>
                      {(item?.items?.length > 0 &&
                        checkFilterLevel()?.level <= 3) ||
                      (item?.items?.length > 0 &&
                        !checkFilterLevel()?.level) ? (
                        <>
                          {checkMultipleLevelFilter(filtered, item)?.length >
                            0 &&
                            checkMultipleLevelFilter(filtered, item)?.map(
                              (obj: any, idx: any) => (
                                <StyledChip
                                  key={obj?.label}
                                  label={obj?.label}
                                  onDelete={() =>
                                    handleDelete(item?.tab, obj.value, index)
                                  }
                                  deleteIcon={
                                    <img
                                      src={`${ReplaceImage(CLOSE_ICON?.url)}`}
                                      alt="close-icon"
                                    />
                                  }
                                />
                              )
                            )}
                        </>
                      ) : (
                        <StyledChip
                          key={index}
                          label={
                            item?.label === "1"
                              ? getChipText(item)
                              : item?.label
                          }
                          onDelete={() =>
                            handleDelete(item?.tab, item?.value, index)
                          }
                          deleteIcon={
                            <img
                              src={`${ReplaceImage(CLOSE_ICON?.url)}`}
                              alt="close-icon"
                            />
                          }
                        />
                      )}
                    </>
                  ))}
                  {((selectedFilters?.length > 0 &&
                    Object.keys(filtered)?.length > 1) ||
                    (selectedFilters?.length > 0 &&
                      filtered?.category_id?.in?.length > 0 &&
                      filterLevelCheck()?.length > 0) ||
                    (selectedFilters?.length > 0 &&
                      (filtered?.category_id?.in?.length < 1 ||
                        !filtered?.category_id))) && (
                    <ClearButton
                      sx={{
                        color: "#AD184C",
                        fontWeight: "600",
                        fontSize: "12px",
                        cursor: "pointer",
                        paddingBottom: "15px",
                      }}
                      onClick={clearAllHandler}>
                      CLEAR ALL
                    </ClearButton>
                  )}
                </Stack>
              )}
              {products?.length > 0 ? (
                <>
                  <Box ref={viewEventWrapper}>
                    <ProductsList
                      totalCount={count}
                      products={products}
                      wishListItems={wishListItems}
                      virtualCatgeoryProducts={virtualCatgeoryProducts}
                      componentData={componentData}></ProductsList>
                  </Box>
                  <Box width="100%" py={isMobile ? 1 : 2}></Box>
                  {count > size && (
                    <CustomPagination
                      pageCount={pageCount}
                      scrollMargin={120}
                      count={count}
                      setPage={setPage}
                      handleChange={handleChange}
                      page={page}
                      pageSize={size}
                      products={products}
                      fieldRef={fieldRef}
                      boundaryCount={boundaryCount}
                      siblingCount={siblingCount}></CustomPagination>
                  )}
                </>
              ) : (
                <>
                  {!displayLoader && (
                    <NoProducts ref={viewEventWrapper}>
                      <NoProductsText>
                        <ErrorRoundedIcon />
                        {NO_PRODUCTS_FOUND}
                      </NoProductsText>
                    </NoProducts>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isMobile && (
        <SortFilterBar
          list={list}
          handleSelectedValue={handleSelectedValue}
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          selectedFilters={selectedFilters}
          filtered={filtered}
          copiedSelectedFilters={copiedSelectedFilters}
          setCopiedSelectedFilters={setCopiedSelectedFilters}
        />
      )}
    </Box>
  );
};
