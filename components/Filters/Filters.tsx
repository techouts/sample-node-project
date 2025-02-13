import Box from "@mui/material/Box";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { event_type } from "../../utility/GAConstants";
import { Cookies } from "react-cookie";
import {
  ItemSubtitle,
  MainAccordion,
  PageTitle,
  StyledAccordian,
  StyledInput,
  ViewMore,
  FilterTitle,
  DividerGrid,
  SubFacets,
} from "./FiltersStyles";
import { ReplaceImage } from "../../utility/ReplaceImage";
import triggerGAEvent from "../../utility/GaEvents";
import { FILTERS_TITLE } from "./Constants";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  CHECKED_ICONS,
  DOWN_ARROW_ICON,
  NORMAL_SEARCH_ICON,
  UNCHECKED_ICONS,
} from "../../utility/AppIcons";
import UnbxdNestedCategoriesFilters from "./UnbxdNestedCategoriesFilters";

function Filters(props: any) {
  const data: any = props?.data;
  const filtersToShow = 8;
  const [searchQuery, setSearchQuery] = useState("");
  const [queryIndex, setQueryIndex] = useState(0);
  const [viewMore, setViewMore] = useState(true);
  const CHECKED_ICON = AppIcons(CHECKED_ICONS);
  const UNCHECKED_ICON = AppIcons(UNCHECKED_ICONS);
  const ARROWDOWN = AppIcons(DOWN_ARROW_ICON);
  const SEARCH_NORMAL = AppIcons(NORMAL_SEARCH_ICON);

  const UnCheckedIcon = () => {
    return (
      <img
        src={`${ReplaceImage(UNCHECKED_ICON?.url)}`}
        width="12.5px"
        height="12.5px"
        alt="unchecked icon"
      ></img>
    );
  };
  const CheckedIcon = () => {
    return (
      <img
        src={`${ReplaceImage(CHECKED_ICON?.url)}`}
        width="12.5px"
        height="12.5px"
        alt="checked icon"
        style={{ filter: "grayscale(100%" }}
      ></img>
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
    return [...firstArr, ...secondArr]?.toString().replaceAll(",", "%2C");;
  };
  const handleClick = (label: any, option: any, value: boolean) => {
    handleClickFilters(option?.label);
    props?.setPage(1);
    props?.setCheckedFilter(label);
    props?.setFiltered((prevState: any) => ({
      ...prevState,
      [label]:
        label === "price"
          ? {
            from: prevState[label]
              ? prevState[label]?.from?.split(/[,|%2C]+/)?.includes(option?.value)
                ? removePriceFilter(prevState, label, option?.value)
                : prevState[label]?.from === ""
                  ? option?.value
                  : [
                    ...prevState[label]?.from?.split("%2C"),
                    option?.value,
                  ]?.toString().replaceAll(",", "%2C")
              : option?.value,
          }
          : {
            in: prevState[label]
              ? prevState[label]?.in?.includes(option?.value.replace(/&/g, "%26"))
                ? removeFilter(prevState, label, option?.value.replace(/&/g, "%26"))
                : [...prevState[label]?.in, option?.value.replace(/&/g, "%26")]
              : [option?.value?.replace(/&/g, "%26")],
          },
    }));
    let filtersSelected = props.selectedFilters;
    if (value) {
      if (
        !Array.isArray(
          props.selectedFilters.find(
            (item: any) => label === item.tab && option.value === item.value
          )
        ) ||
        props.selectedFilters.find(
          (item: any) => label === item.tab && option.value === item.value
        ).length === 0
      ) {
        props.setSelectedFilters((oldArray: any) => [
          ...oldArray,
          { tab: label, ...option },
        ]);
      }
    } else {
      const index = filtersSelected.findIndex(
        (item: any) => label === item.tab && option.value === item.value
      );
      if (index > -1) {
        filtersSelected.splice(index, 1);
        props.setSelectedFilters((oldArray: any) => [...oldArray]);
      }
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  function handleClickFilters(itemname: string) {
    triggerGAEvent(
      {
        widget_type: "Filter",
        widget_title: "Filters",
        widget_position: 2,
        no_of_items: data?.length,
        link_text: itemname,
        link_url: window?.location?.href,
        event_type: event_type,
        item_name: itemname,
      },
      "click"
    );
  }
  const handleToggle = () => {
    triggerGAEvent(
      {
        widget_type: "Filter",
        item_type: "Filter ",
        widget_title: "Filters",
        widget_description: "na",
        widget_position: 2,
        no_of_items: data?.length,
        item_brand: "na",
        item_category: "na",
        link_text: viewMore ? "VIEW MORE" : "VIEW LESS",
        link_url: "na",
      },
      "view_all"
    );
    setViewMore(!viewMore);
  };

  let searchArray: any = [];
  data?.options?.map((option: any) => {
    searchArray = [...searchArray, ...option.items];
  });

  const inputChangeHandler = (e: any, index: number) => {
    setSearchQuery(e.target.value);
    setQueryIndex(index);
  };

  const getCheckedFilter = (filters: any) => {
    let res = [];
    res = filters?.options?.filter((option: any) => {
      return props?.selectedFilters.find((filterOptions: any) => {
        return (
          filterOptions.label === option.label &&
          filterOptions.value === option.value
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

  const renderMultipleFilterCheckbox = (attr: any, val: any, index: number) => {
    return attr?.items?.length > 0 &&
      attr?.items?.filter((keyval: any) => keyval?.items?.length > 0)?.length >
      0 ? (
      attr?.items?.map((attrItems: any, idx: any) => {
        return (
          <MainAccordion
            key={`${attrItems?.label}_${idx}`}
            aria-label="MainAccordina"
            expanded={props?.opened?.includes(attrItems?.value)}
          >
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
              }}
            >
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
                      <Box key={JSON.stringify(item)}>
                        <FormGroup>
                          <FormControlLabel
                            sx={{
                              "& span": {
                                paddingLeft: "0px !important",
                              },
                            }}
                            checked={
                              props?.filtered?.[val?.attribute_code]?.in?.filter(
                                (itm: any) => {
                                  return itm === item?.value;
                                }
                              )?.length > 0 ?? null
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
                                  fontWeight: props?.selectedFilters?.filter(
                                    (itm: any) =>
                                      itm?.value === item?.value &&
                                      val?.attribute_code === itm?.tab
                                  )[0]
                                    ? 500
                                    : 400,
                                }}
                              >
                                {item?.label}
                                {item?.count > 0 && (
                                  <ItemSubtitle
                                    sx={{
                                      fontWeight:
                                        props?.selectedFilters?.filter(
                                          (itm: any) =>
                                            itm?.value === item?.value &&
                                            val?.attribute_code === itm?.tab
                                        )[0]
                                          ? 500
                                          : 400,
                                    }}
                                    variant="caption"
                                  >
                                    {"  "}({item?.count})
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
            <Box key={`${item?.label}_${idx}`}>
              <FormGroup>
                <FormControlLabel
                  sx={{
                    "& span": {
                      paddingLeft: "0px !important",
                    },
                  }}
                  checked={
                    props?.filtered?.[val?.attribute_code]?.in?.filter(
                      (itm: any) => {
                        return itm === item?.value;
                      }
                    )?.length > 0 ?? null
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
                        fontWeight: props?.selectedFilters?.filter(
                          (itm: any) =>
                            itm?.value === item?.value &&
                            val?.attribute_code === itm?.tab
                        )[0]
                          ? 500
                          : 400,
                      }}
                    >
                      {item?.label}
                      {item?.count > 0 && (
                        <ItemSubtitle
                          sx={{
                            fontWeight: props?.selectedFilters?.filter(
                              (itm: any) =>
                                itm?.value === item?.value &&
                                val?.attribute_code === itm?.tab
                            )[0]
                              ? 500
                              : 400,
                          }}
                          variant="caption"
                        >
                          {"  "}({item?.count})
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
    <Stack sx={{ width: "85%", color: "#231F20" }}>
      <FilterTitle variant="h6">{FILTERS_TITLE}</FilterTitle>
      <Box>
        {data
          ?.slice(0, viewMore ? filtersToShow : data?.length)
          ?.map((filter: any, index: number) => {
           if (filter?.filterField
              === "facet_nested") {
              return  <Box key={`${filter?.attribute_code}_${index}`}>
                <UnbxdNestedCategoriesFilters data={filter} setCategoryPath = {props?.setCategoryPath} categoryPath = {props?.categoryPath}/>
              </Box>
            } 
            return (
              <Box key={`${filter?.attribute_code}_${index}`}>
                
                {!filter?.attribute_code?.includes("checkbox") ? (
                  filter?.options?.filter((val: any) => {
                    return val?.items?.length > 0;
                  })?.length > 0 ? (
                    <MainAccordion
                      aria-label="MainAccordina"
                      expanded={props?.opened?.includes(filter?.attribute_code)}
                    >
                      <StyledAccordian
                        onClick={() => handleAccordian(filter?.attribute_code)}
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
                        <PageTitle ischeckedfilter={getCheckedFilter(filter)}>
                          {filter?.label }
                        </PageTitle>
                      </StyledAccordian>
                      <AccordionDetails style={{ padding: "10px 0px 10px 10px" }}>
                        {filter?.options
                          ?.filter((val: any) => {
                            return val?.items?.length > 0;
                          })
                          ?.map((attr: any, indx: number) => {
                            if (attr?.label === "Default Category") {
                              return renderMultipleFilterCheckbox(
                                attr,
                                filter,
                                indx
                              );
                            } else {
                              return (
                                <MainAccordion
                                  key={`${attr?.label}_${indx}`}
                                  aria-label="MainAccordina"
                                  expanded={props?.opened?.includes(attr?.value ??
                                    attr?.attribute_code
                                  )}
                                >
                                  <StyledAccordian
                                    onClick={() =>
                                      handleAccordian(attr?.value ?? attr?.attribute_code)
                                    }
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
                                      ischeckedfilter={getCheckedFilter(filter)}
                                    >
                                      {attr?.label}
                                    </PageTitle>
                                  </StyledAccordian>
                                  <AccordionDetails
                                    style={{ padding: "10px 0px 10px 10px" }}
                                  >
                                    {renderMultipleFilterCheckbox(
                                      attr,
                                      filter,
                                      indx
                                    )}
                                  </AccordionDetails>
                                </MainAccordion>
                              );
                            }
                          })}
                        <DividerGrid />
                      </AccordionDetails>
                    </MainAccordion>
                  ) : filter?.options?.length > 0 ? (
                    <MainAccordion
                      aria-label="MainAccordina"
                      expanded={props?.opened?.includes(filter?.attribute_code)}
                    >
                      <StyledAccordian
                        onClick={() => handleAccordian(filter?.attribute_code)}
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
                        <PageTitle ischeckedfilter={getCheckedFilter(filter)}>
                          {filter?.label}
                        </PageTitle>
                      </StyledAccordian>
                      <AccordionDetails style={{ padding: "10px 0px 10px 10px" }}>
                        <StyledInput
                          placeholder={`Search for ${filter?.label}`}
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
                        <SubFacets>
                          {filter?.options
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
                                    filter?.attribute_code === itm?.tab
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
                                    filter?.attribute_code === itm?.tab
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
                            ?.map((item: any, idx: number) => {
                              let isChecked = false;
                              const filteredItems = props?.filtered?.[filter?.attribute_code]?.in?.filter((itm) => {
                                return itm === item?.value?.replace(/&/g, "%26");
                              });
                              if (filteredItems?.length > 0) {
                                isChecked = true; // or any other value you want to assign when the condition is true
                              } else {
                                if (
                                  props?.filtered?.[
                                    filter?.attribute_code
                                  ]?.from?.includes(",")
                                ) {
                                  isChecked =
                                    props?.filtered?.[
                                      filter?.attribute_code
                                    ]?.from
                                      ?.split(",")
                                      ?.filter((itm:any) => {
                                        return (
                                          itm ===
                                          item?.value?.replace(/&/g, "%2C")
                                        );
                                      })?.length > 0;
                                } else {
                                  isChecked =
                                    props?.filtered?.[
                                      filter?.attribute_code
                                    ]?.from
                                      ?.split("%2C")
                                      ?.filter((itm:any) => {
                                        return (
                                          itm ===
                                          item?.value?.replace(/&/g, "%2C")
                                        );
                                      })?.length > 0;
                                }
                              }

                              return (
                                <Box key={`${item?.label}_${idx}`}>
                                  <FormGroup>
                                    <FormControlLabel
                                      sx={{
                                        "& span": {
                                          paddingLeft: "0px !important",
                                        },
                                      }}
                                      checked={
                                        isChecked
                                        // props?.filtered?.[
                                        //   filter?.attribute_code
                                        // ]?.in?.filter((itm: any) => {
                                        //   return itm === item?.value.replace(/&/g, "%26");
                                        // })?.length > 0 ? props?.filtered?.[
                                        //   filter?.attribute_code
                                        // ]?.in?.filter((itm: any) => {
                                        //   return itm === item?.value.replace(/&/g, "%26");
                                        // })?.length > 0 : props?.filtered?.[
                                        //   filter?.attribute_code
                                        // ]?.from?.split("%2C")?.filter((itm: any) => {
                                        //   return itm === item?.value.replace(/&/g, "%26");
                                        // })?.length > 0 ?? null
                                      }
                                      control={
                                        <Checkbox
                                          icon={<UnCheckedIcon />}
                                          checkedIcon={<CheckedIcon />}
                                          onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                          ) => {
                                            handleClick(
                                              filter?.attribute_code,
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
                                            fontWeight:
                                              props?.selectedFilters?.filter(
                                                (itm: any) =>
                                                  itm?.value === item?.value &&
                                                  filter?.attribute_code ===
                                                    itm?.tab
                                              )[0]
                                                ? 500
                                                : 400,
                                          }}>
                                          {item?.label}
                                          {item?.count > 0 && (
                                            <ItemSubtitle
                                              sx={{
                                                fontWeight:
                                                  props?.selectedFilters?.filter(
                                                    (itm: any) =>
                                                      itm?.value ===
                                                        item?.value &&
                                                      filter?.attribute_code ===
                                                        itm?.tab
                                                  )[0]
                                                    ? 500
                                                    : 400,
                                              }}
                                              variant="caption">
                                              {"  "}({item?.count})
                                            </ItemSubtitle>
                                          )}
                                        </ItemSubtitle>
                                      }
                                    />
                                  </FormGroup>
                                </Box>
                              );
                            })}
                        </SubFacets>
                        <DividerGrid />
                      </AccordionDetails>
                    </MainAccordion>
                  ) : null
                ) : (
                  <FormGroup>
                    <FormControlLabel
                      checked={
                        props?.selectedFilters?.filter(
                          (itm: any) =>
                            itm?.value === "1" &&
                            filter?.attribute_code == itm?.tab
                        )[0] ?? null
                      }
                      control={
                        <Checkbox
                          icon={<UnCheckedIcon />}
                          checkedIcon={<CheckedIcon />}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleClick(
                              filter?.attribute_code,
                              filter?.options?.filter(
                                (option: any) => option?.label === "1"
                              )[0],
                              e?.target?.checked
                            );
                          }}
                        />
                      }
                      label={
                        <PageTitle
                          ischeckedfilter={
                            props?.selectedFilters?.filter(
                              (itm: any) =>
                                itm?.value === "1" &&
                                filter?.attribute_code == itm?.tab
                            )[0] ?? null
                          }
                        >
                          {filter?.label}
                          {filter?.options?.filter(
                            (option: any) => option?.label === "1"
                          )[0]?.count > 1 && (
                              <ItemSubtitle variant="caption" ml={"4px"}>
                                (
                                {
                                  filter?.options?.filter(
                                    (option: any) => option?.label === "1"
                                  )[0]?.count
                                }
                                )
                              </ItemSubtitle>
                            )}
                        </PageTitle>
                      }
                    />
                  </FormGroup>
                )}
              </Box>
            );
          })}
        {data?.length > filtersToShow && (
          <ViewMore onClick={() => handleToggle()}>
            {viewMore ? "VIEW MORE" : "VIEW LESS"}
          </ViewMore>
        )}
      </Box>
    </Stack>
  );
}
export default Filters;
