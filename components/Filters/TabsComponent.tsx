import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  FiltersTabs,
  ItemSubtitle,
  MainAccordion,
  PageTitle,
  StyledAccordian,
  StyledInput,
  SubFacets,
  TabSelected,
} from "./FiltersStyles";
import { AccordionDetails, InputAdornment } from "@mui/material";
import { ReplaceImage } from "../../utility/ReplaceImage";
import client from "../../apollo-client";
import { GET_FACETS_DATA } from "../../graphQLQueries/SearchListQuery";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  CHECKED_ICONS,
  DOWN_ARROW_ICON,
  NORMAL_SEARCH_ICON,
  UNCHECKED_ICONS,
} from "../../utility/AppIcons";
import { useRouter } from "next/router";
import handleErrorResponse from "../../utility/ErrorHandling";
import UnbxdNestedCategoriesFiltersMobile from "./UnbxdNestedCategoriesFiltersMobile";
interface TabPanelProps extends React.ComponentProps<'div'>  {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{maxHeight:"100%", overflowY:"scroll"}}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const TabsComponent = forwardRef((props: any, ref) => {
  const router: any = useRouter();
  const [value, setValue] = useState(0);
  const [queryIndex, setQueryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFacets, setMobileFacets] = useState(
    props?.data?.filter((val: any) => val?.options?.length > 0)
  );
  const [mobileFiltered, setMobileFiltered] = useState(props?.filtered);
  const inputChangeHandler = (e: any, index: number) => {
    setSearchQuery(e.target.value);
    setQueryIndex(index);
  };
  const CHECKED_ICON = AppIcons(CHECKED_ICONS);
  const UNCHECKED_ICON = AppIcons(UNCHECKED_ICONS);
  const SEARCH_NORMAL = AppIcons(NORMAL_SEARCH_ICON);
  const ARROWDOWN = AppIcons(DOWN_ARROW_ICON);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const UnCheckedIcon = () => {
    return (
      <img
        src={`${ReplaceImage(UNCHECKED_ICON?.url)}`}
        alt="unchecked icon"
      ></img>
    );
  };
  const CheckedIcon = () => {
    return (
      <img src={`${ReplaceImage(CHECKED_ICON?.url)}`} alt="checked icon"></img>
    );
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
      props?.categoryListCheck?.category?.children,
      "id",
      Number(router?.query?.pid[router?.query?.pid?.length - 1])
    )?.filter((val: any) => {
      return (
        val?.id === Number(router?.query?.pid[router?.query?.pid?.length - 1])
      );
    })?.[0];
  };
  const catLevelCheck = checkFilterLevel();

  const getOptionsById = (aggregations: any, categoryIndex: number) => {
    let updatedAggressions = [...aggregations];

    const catOptions = updatedAggressions[categoryIndex];
    let filterChecKarr: any;
    catOptions?.options?.map((opt: any) => {
      if (opt?.value === catLevelCheck?.id?.toString()) {
        filterChecKarr = opt?.items;
      } else {
        opt?.items?.map((l1: any) => {
          if (l1?.value === catLevelCheck?.id?.toString()) {
            filterChecKarr = l1;
          } else {
            l1?.items?.map((l2: any) => {
              if (l2?.value === catLevelCheck?.id?.toString()) {
                filterChecKarr = l2;
              } else {
                l2?.items?.map((l3: any) => {
                  if (l3?.value === catLevelCheck?.id?.toString()) {
                    filterChecKarr = l3;
                  }
                });
              }
            });
          }
        });
      }
    });
    let filterOpt = {
      ...catOptions,
      options: filterChecKarr?.items ?? catOptions?.options,
    };

    updatedAggressions[categoryIndex] = filterOpt;

    return updatedAggressions;
  };

  const removePriceFilter = (
    prevState: { [x: string]: { from: any } },
    label: string | number,
    optionValue: any
  ) => {
    let temp = []
    if(prevState[label]?.from?.includes(',')){
      temp =  [...prevState[label]?.from?.split(",")]
    } else {
       temp = [...prevState[label]?.from?.split("%2C")];
    }
    const index = temp?.indexOf(optionValue);
    const firstArr = temp.slice(0, index);
    const secondArr = temp.slice(index + 1);
    return [...firstArr, ...secondArr]?.toString();
  };

  const handleClick = (label: any, option: any, value: boolean) => {
    props?.setPage(1);
    props?.setCheckedFilter(label);
    setMobileFiltered((prevState: any) => ({
      ...prevState,
      [label]:
        label === "price"
          ? {
              from: prevState[label]
                ? prevState[label]?.from?.split(/[,|%2C]+/)?.includes(option?.value)
                  ? removePriceFilter(prevState, label, option?.value)
                  : [
                      ...prevState[label]?.from?.split(/[,|%2C]+/),
                      option?.value,
                    ]?.toString()
                : option?.value,
            }
          : {
              in: prevState[label]
                ? prevState[label]?.in?.includes(option?.value)
                  ? removeFilter(prevState, label, option?.value)
                  : [...prevState[label]?.in, option?.value]
                : [option?.value],
            },
    }));
    let filtersSelected = props?.selectedFilters;
    if (value) {
      if (
        !Array.isArray(
          props?.selectedFilters?.find(
            (item: any) => label === item?.tab && option?.value === item?.value
          )
        ) ||
        props.selectedFilters.find(
          (item: any) => label === item?.tab && option?.value === item?.value
        ).length === 0
      ) {
        props?.setSelectedFilters((oldArray: any) => [
          ...oldArray,
          { tab: label, selected: true, ...option },
        ]);
      }
    } else {
      const index = filtersSelected.findIndex(
        (item: any) => label === item.tab && option?.value === item?.value
      );
      if (index > -1) {
        filtersSelected?.splice(index, 1);
        props?.setSelectedFilters((oldArray: any) => [...oldArray]);
      }
    }
  };

  const getCheckedFilter = (filters: any) => {
    let res = [];
    res = filters?.options?.filter((option: any) => {
      return props?.selectedFilters?.find((filterOptions: any) => {
        return (
          filterOptions?.label === option?.label &&
          filterOptions?.value === option?.value
        );
      });
    });
    return res?.length > 0 ? true : false;
  };

  const handleAccordian = (value: any) => {
    if (props?.opened?.includes(value)) {
      const temp: any = props?.opened;
      const index = temp?.indexOf(value);
      const firstArr = temp.slice(0, index);
      const secondArr = temp.slice(index + 1);
      props?.setOpened([...firstArr, ...secondArr]);
    } else {
      props?.setOpened([...props?.opened, value]);
    }
  };

  const getFilterLabel = (item: any) => {
    let filters = 0;
    filters = props?.filtersLength?.filter(
      (selected: any) => item?.attribute_code === selected?.tab
    )?.length;
    if (filters && filters > 0) {
      return `${item?.label} (${filters})`;
    } else {
      return item?.label;
    }
  };

  useImperativeHandle(ref, () => ({
    handleApplyFilters() {
      let filters: any = {};
      props?.selectedFilters?.map((selected: any) => {
        filters = {
          ...filters,
          [selected?.tab]:
            selected?.tab === "category_id"
              ? catLevelCheck?.id &&
                props?.selectedFilters?.filter((val: any) => {
                  return (
                    val?.tab === "category_id" &&
                    catLevelCheck?.id?.toString() !== val?.value &&
                    val?.label !== "Default Category" &&
                    val?.label !== "Luxe"
                  );
                })?.length <= 0
                ? {
                    in: [catLevelCheck?.id?.toString()],
                  }
                : selected?.tab === "category_id" &&
                  catLevelCheck?.id?.toString() !== selected?.value &&
                  selected?.label !== "Default Category" &&
                  selected?.label !== "Luxe"
                ? {
                    in:
                      filters[selected?.tab]?.in?.length > 0
                        ? filters[selected?.tab]?.in?.includes(selected?.value)
                          ? removeFilter(
                              filters,
                              selected?.tab,
                              selected?.value
                            )
                          : catLevelCheck?.id?.toString() &&
                            filters[selected?.tab]?.in?.includes(
                              catLevelCheck?.id?.toString()
                            )
                          ? [...filters[selected?.tab]?.in, selected?.value]
                          : [
                              ...filters[selected?.tab]?.in,
                              selected?.value,
                              catLevelCheck?.id?.toString(),
                            ]
                        : [selected?.value, catLevelCheck?.id?.toString()],
                  }
                : {
                    in: [catLevelCheck?.id?.toString()],
                  }
              : selected?.tab === "price"
              ? {
                  from: filters[selected?.tab]
                    ? filters[selected?.tab]?.from
                        ?.split(/[,|%2C]+/)
                        ?.includes(selected?.value)
                      ? removePriceFilter(
                          filters,
                          selected?.tab,
                          selected?.value
                        )
                      : filters[selected?.tab]?.from === ""
                      ? selected?.value
                      : [
                          ...filters[selected?.tab]?.from?.split(/[,|%2C]+/),
                          selected?.value,
                        ]?.toString()?.replaceAll(",", "%2C")
                    : selected?.value,
                }
              : {
                  in: filters[selected?.tab]
                    ? filters[selected?.tab]?.in?.includes(selected?.value?.replace(/&/g, "%26"))
                      ? removeFilter(filters, selected?.tab, selected?.value?.replace(/&/g, "%26"))
                      : [...filters[selected?.tab]?.in, selected?.value?.replace(/&/g, "%26")]
                    : [selected?.value?.replace(/&/g, "%26")],
                },
        };
      });
      props?.setFiltered(filters);
      filters = {};
      props?.setCopiedSelectedFilters([]);
    },
  }));

  const renderMultipleFilterCheckbox = (attr: any, val: any, index: number) => {
    return attr?.items?.length > 0 &&
      attr?.items?.filter((keyval: any) => keyval?.items?.length > 0)?.length >
        0 ? (
      attr?.items?.map((attrItems: any, idx: any) => {
        return (
          <MainAccordion
            key={index}
            aria-label="MainAccordina"
            expanded={props?.opened?.includes(attrItems?.value)}>
            <StyledAccordian
              onClick={() => handleAccordian(attrItems?.value)}
              expandIcon={
                <img
                  src={`${ReplaceImage(ARROWDOWN?.url)}`}
                  alt="ArrowDownIcon"
                />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                content: {
                  margin: "10px 0",
                },
              }}>
              <PageTitle ischeckedfilter={getCheckedFilter(val)}>
                {attrItems?.label}
              </PageTitle>
            </StyledAccordian>
            <AccordionDetails style={{ padding: "10px 0px 10px 10px" }}>
              {attrItems?.items?.filter(
                (keyval: any) => keyval?.items?.length > 0
              )?.length > 0 ? (
                renderMultipleFilterCheckbox(attrItems, val, idx)
              ) : (
                <SubFacets>
                  {attrItems?.items
                    ?.filter((chkBoxName: any) => {
                      if (queryIndex === index) {
                        return chkBoxName?.label
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase());
                      } else return true;
                    })
                    ?.filter((checkKey: any) => {
                      return checkKey?.count > 0;
                    })
                    ?.sort((a: any, b: any) => {
                      if (a?.label < b?.label) {
                        return -1;
                      }
                      if (a?.label > b?.label) {
                        return 1;
                      }
                      return 0;
                    })
                    ?.sort((a: any, b: any) => {
                      if (a?.count < b?.count) {
                        return 1;
                      }
                      if (a?.count > b?.count) {
                        return -1;
                      }
                      return 0;
                    })
                    ?.sort((a: any) => {
                      if (
                        props?.selectedFilters?.filter(
                          (itm: any) =>
                            itm?.value === a?.value &&
                            val?.attribute_code === itm?.tab
                        )[0] ??
                        null
                      ) {
                        return -1;
                      }
                      return 0;
                    })
                    ?.sort((a: any, b: any) => {
                      if (
                        props?.selectedFilters?.filter(
                          (itm: any) =>
                            itm?.value === a?.value &&
                            val?.attribute_code === itm?.tab
                        )[0] ??
                        null
                      ) {
                        if (a?.label < b?.label) {
                          return -1;
                        }
                        if (a?.label > b?.label) {
                          return 1;
                        }
                        return 0;
                      }
                    })
                    ?.map((item: any, idx: number) => (
                      <Box key={index}>
                        <FormGroup>
                          <FormControlLabel
                            checked={
                              props?.filtered?.[
                                val?.attribute_code
                              ]?.in?.filter((itm: any) => {
                                return itm === item?.value;
                              })?.length > 0 ||
                              props?.selectedFilters?.filter(
                                (itm: any) => itm?.value == item?.value
                              )?.[0]
                            }
                            control={
                              <Checkbox
                                icon={<UnCheckedIcon />}
                                checkedIcon={<CheckedIcon />}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  handleClick(
                                    val?.attribute_code,
                                    item,
                                    e.target.checked
                                  );
                                }}
                              />
                            }
                            label={
                              <ItemSubtitle
                                variant="subtitle2"
                                sx={{
                                  fontWeight: props.selectedFilters?.filter(
                                    (itm: any) =>
                                      itm?.label == item?.label &&
                                      val?.attribute_code == itm?.tab
                                  )[0]
                                    ? 500
                                    : 400,
                                }}>
                                {item?.label === "1" ? val?.label : item?.label}
                                {item?.count > 0 && (
                                  <ItemSubtitle
                                    sx={{
                                      paddingLeft: "3px",
                                      fontWeight: props.selectedFilters?.filter(
                                        (itm: any) =>
                                          itm?.label == item?.label &&
                                          val?.attribute_code == itm?.tab
                                      )[0]
                                        ? 500
                                        : 400,
                                    }}
                                    variant="caption">
                                    ({item?.count})
                                  </ItemSubtitle>
                                )}
                              </ItemSubtitle>
                            }
                          />
                        </FormGroup>
                      </Box>
                    ))}
                </SubFacets>
              )}
            </AccordionDetails>
          </MainAccordion>
        );
      })
    ) : (
      <SubFacets>
        {attr?.items
          ?.filter((chkBoxName: any) => {
            if (queryIndex === index) {
              return chkBoxName?.label
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            } else return true;
          })
          ?.filter((checkKey: any) => {
            return checkKey?.count > 0;
          })
          ?.sort((a: any, b: any) => {
            if (a?.label < b?.label) {
              return -1;
            }
            if (a?.label > b?.label) {
              return 1;
            }
            return 0;
          })
          ?.sort((a: any, b: any) => {
            if (a?.count < b?.count) {
              return 1;
            }
            if (a?.count > b?.count) {
              return -1;
            }
            return 0;
          })
          ?.sort((a: any) => {
            if (
              props?.selectedFilters?.filter(
                (itm: any) =>
                  itm?.value === a?.value && val?.attribute_code === itm?.tab
              )[0] ??
              null
            ) {
              return -1;
            }
            return 0;
          })
          ?.sort((a: any, b: any) => {
            if (
              props?.selectedFilters?.filter(
                (itm: any) =>
                  itm?.value === a?.value && val?.attribute_code === itm?.tab
              )[0] ??
              null
            ) {
              if (a?.label < b?.label) {
                return -1;
              }
              if (a?.label > b?.label) {
                return 1;
              }
              return 0;
            }
          })
          ?.map((item: any, idx: number) => (
            <Box key={index}>
              <FormGroup>
                <FormControlLabel
                  checked={
                    props?.filtered?.[val?.attribute_code]?.in?.filter(
                      (itm: any) => {
                        return itm === item?.value;
                      }
                    )?.length > 0
                      ? props?.filtered?.[val?.attribute_code]?.in?.filter(
                          (itm: any) => {
                            return itm === item?.value;
                          }
                        )?.length > 0
                      : props?.filtered?.[val?.attribute_code]?.from
                          ?.split("%2C")
                          ?.filter((itm: any) => {
                            return itm === item?.value;
                          })?.length > 0
                      ? props?.filtered?.[val?.attribute_code]?.from
                          ?.split("%2C")
                          ?.filter((itm: any) => {
                            return itm === item?.value;
                          })?.length > 0
                      : props?.selectedFilters?.filter(
                          (itm: any) => itm?.value == item?.value
                        )?.[0]
                  }
                  control={
                    <Checkbox
                      icon={<UnCheckedIcon />}
                      checkedIcon={<CheckedIcon />}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleClick(
                          val?.attribute_code,
                          item,
                          e.target.checked
                        );
                      }}
                    />
                  }
                  label={
                    <ItemSubtitle
                      variant="subtitle2"
                      sx={{
                        fontWeight: props.selectedFilters?.filter(
                          (itm: any) =>
                            itm?.label == item?.label &&
                            val?.attribute_code == itm?.tab
                        )[0]
                          ? 500
                          : 400,
                      }}>
                      {item?.label === "1" ? val?.label : item?.label}
                      {item?.count > 0 && (
                        <ItemSubtitle
                          sx={{
                            paddingLeft: "3px",
                            fontWeight: props.selectedFilters?.filter(
                              (itm: any) =>
                                itm?.label == item?.label &&
                                val?.attribute_code == itm?.tab
                            )[0]
                              ? 500
                              : 400,
                          }}
                          variant="caption">
                          ({item?.count})
                        </ItemSubtitle>
                      )}
                    </ItemSubtitle>
                  }
                />
              </FormGroup>
            </Box>
          ))}
      </SubFacets>
    );
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
      }}>
      <FiltersTabs
        orientation="vertical"
        variant="scrollable"
        value={value > -1 ? value : 0}
        onChange={handleChange}
        aria-label="Vertical tabs example">
        {mobileFacets?.map((item: any, index: any) => (
          <TabSelected
            ischeckedfilter={getCheckedFilter(item)}
            key={index}
            label={getFilterLabel(item)}
            {...a11yProps(index)}
            aria-lavel="Tab-selected"
          />
        ))}
      </FiltersTabs>
      {mobileFacets?.map((filters: any, index: any) => {
        if (filters?.filterField === "facet_nested") {
          return (
            <TabPanel key={index} value={value > -1 ? value : 0} index={index} style={{ width: "-webkit-fill-available" }}>
              <UnbxdNestedCategoriesFiltersMobile
                data={props?.data?.find((i: any) => i.filterField === filters?.filterField)}
                setCategoryPath={props?.setCategoryPath}
                categoryPath={props?.categoryPath}
                showLoader={props?.showLoader}
              />
            </TabPanel>
          );
        }
        return (
          <TabPanel
            key={`${index}-${props?.filtersLength?.length}-${filters?.attribute_code}`}
            value={value > -1 ? value : 0}
            index={index}>
            <StyledInput
              placeholder={`Search for ${filters?.label}`}
              onChange={(e) => inputChangeHandler(e, index)}
              size="small"
              aria-label="search input"
              InputProps={{
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
            {filters?.options?.filter((filterVal: any) => {
              return filterVal?.items?.length > 0;
            })?.length > 0 ? (
              <>
                {filters?.options
                  ?.filter((val: any) => {
                    return val?.items?.length > 0;
                  })
                  .map((attr: any, indx: number) => {
                    if (attr?.label === "Default Category") {
                      return renderMultipleFilterCheckbox(attr, filters, indx);
                    } else {
                      return (
                        <MainAccordion
                          key={`${index}-${attr?.count}`}
                          aria-label="MainAccordina"
                          expanded={props?.opened?.includes(attr?.value)}>
                          <StyledAccordian
                            onClick={() => handleAccordian(attr?.value)}
                            expandIcon={
                              <img
                                src={`${ReplaceImage(ARROWDOWN?.url)}`}
                                alt="ArrowDownIcon"
                              />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{
                              content: {
                                margin: "10px 0",
                              },
                            }}
                          >
                            <PageTitle
                              ischeckedfilter={getCheckedFilter(filters)}
                            >
                              {attr?.label}
                            </PageTitle>
                          </StyledAccordian>
                          <AccordionDetails
                            style={{ padding: "10px 0px 10px 10px" }}
                          >
                            {renderMultipleFilterCheckbox(attr, filters, indx)}
                          </AccordionDetails>
                        </MainAccordion>
                      );
                    }
                  })}
              </>
            ) : (
              <>
                {filters?.options
                  ?.filter((checkBox: any) => checkBox?.label !== "0")
                  ?.filter((chkBoxName: any) => {
                    if (queryIndex === index) {
                      return chkBoxName?.label
                        ?.toLowerCase()
                        ?.includes(searchQuery?.toLowerCase());
                    } else return true;
                  })
                  ?.filter((checkKey: any) => {
                    return checkKey?.count > 0;
                  })
                  ?.sort((a: any, b: any) => {
                    if (a?.label < b?.label) {
                      return -1;
                    }
                    if (a?.label > b?.label) {
                      return 1;
                    }
                    return 0;
                  })
                  ?.sort((a: any, b: any) => {
                    if (a?.count < b?.count) {
                      return 1;
                    }
                    if (a?.count > b?.count) {
                      return -1;
                    }
                    return 0;
                  })
                  ?.sort((a: any) => {
                    if (
                      props?.selectedFilters?.filter(
                        (itm: any) =>
                          itm?.value === a?.value &&
                          filters?.attribute_code === itm?.tab
                      )[0] ??
                      null
                    ) {
                      return -1;
                    }
                    return 0;
                  })
                  ?.sort((a: any, b: any) => {
                    if (
                      props?.selectedFilters?.filter(
                        (itm: any) =>
                          itm?.value === a?.value &&
                          filters?.attribute_code === itm?.tab
                      )[0] ??
                      null
                    ) {
                      if (a?.label < b?.label) {
                        return -1;
                      }
                      if (a?.label > b?.label) {
                        return 1;
                      }
                      return 0;
                    }
                  })
                  .map((item: any, index: any) => (
                    <Box key={index}>
                      <FormGroup>
                        <FormControlLabel
                          checked={
                            props?.selectedFilters?.filter(
                              (itm: any) =>
                                itm?.label == item?.label &&
                                filters?.attribute_code == itm?.tab
                            )?.[0] ?? null
                          }
                          control={
                            <Checkbox
                              icon={<UnCheckedIcon />}
                              checkedIcon={<CheckedIcon />}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                handleClick(
                                  filters?.attribute_code,
                                  item,
                                  e.target.checked
                                );
                              }}
                            />
                          }
                          label={
                            <ItemSubtitle
                              variant="subtitle2"
                              sx={{
                                fontWeight: props.selectedFilters?.filter(
                                  (itm: any) =>
                                    itm?.label == item?.label &&
                                    filters?.attribute_code == itm?.tab
                                )[0]
                                  ? 500
                                  : 400,
                              }}
                            >
                              {item?.label === "1"
                                ? filters?.label
                                : item?.label}
                              {item?.count > 0 && (
                                <ItemSubtitle
                                  sx={{
                                    paddingLeft: "3px",
                                    fontWeight: props.selectedFilters?.filter(
                                      (itm: any) =>
                                        itm?.label == item?.label &&
                                        filters?.attribute_code == itm?.tab
                                    )[0]
                                      ? 500
                                      : 400,
                                  }}
                                  variant="caption"
                                >
                                  ({item?.count})
                                </ItemSubtitle>
                              )}
                            </ItemSubtitle>
                          }
                        />
                      </FormGroup>
                    </Box>
                  ))}
              </>
            )}
          </TabPanel>
        );
      })}
    </Box>
  );
});
export default TabsComponent;
