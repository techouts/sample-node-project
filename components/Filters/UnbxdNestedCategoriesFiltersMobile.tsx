import {
  AccordionDetails,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import React from "react";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  MainAccordion,
  StyledAccordian,
  PageTitle,
  ItemSubtitle,
  SubFacets,
} from "./FiltersStyles";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  DOWN_ARROW_ICON,
  UNCHECKED_ICONS,
  CHECKED_ICONS,
} from "../../utility/AppIcons";
import { useRouter } from "next/router";

function UnbxdNestedCategoriesFiltersMobile(props: any) {
  const { data, categoryPath, setCategoryPath } = props;
  const selectedCatagories = decodeURIComponent(categoryPath)
    ?.split(">")
    ?.map((i: any, index: number) => {
      return { name: i, level: index };
    });
  const router = useRouter();
  const ARROWDOWN = AppIcons(DOWN_ARROW_ICON);
  const CHECKED_ICON = AppIcons(CHECKED_ICONS);
  const UNCHECKED_ICON = AppIcons(UNCHECKED_ICONS);
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

  function handleOnClick(path: string) {
    setCategoryPath(path === "" ? null : path);
    const { categoryFilter, ...routerQuery } = router?.query;
    props?.showLoader(true);
    router.push({
      pathname: router.pathname,
      query:
        path === ""
          ? { ...routerQuery }
          : { ...routerQuery, categoryFilter: encodeURIComponent(path) },
    });
  }

  return (
    <>
      {data?.hasOwnProperty("child")
        ? RenderNestedCategories({
            nestedData: data?.child,
            level: 0,
          })
        : RenderNestedOptions(0, null)}
    </>
  );

  function RenderNestedCategories(props: { nestedData: any; level: number }) {
    const { nestedData, level } = props;
    return nestedData?.values?.map((item: any, index: number) => {
      const currentCat = selectedCatagories?.find(
        (i: any) => i.name === item?.name
      );

      return (
        <MainAccordion
          aria-label="MainAccordion"
          expanded={
            currentCat?.name ? currentCat?.name === item?.name : index === 0
          }
        >
          <StyledAccordian
            expandIcon={
              <img
                src={`${ReplaceImage(ARROWDOWN?.url)}`}
                alt="ArrowDownIcon"
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => {
              if (
                !(
                  currentCat?.name === item?.name && currentCat?.level === level
                )
              ) {
                handleOnClick(item?.navPath);
              } else {
                if (level === 0) {
                  handleOnClick("");
                } else {
                  let previousLevelPath = "";
                  for (let i = 0; i < level; i++) {
                    previousLevelPath += `${selectedCatagories[i]?.name}${
                      i === level - 1 ? "" : ">"
                    }`;
                  }
                  handleOnClick(previousLevelPath);
                }
              }
            }}
          >
            <PageTitle
              ischeckedfilter={currentCat?.name === item?.name}
              sx={{
                textDecoration:
                  currentCat?.name ===
                  selectedCatagories?.[selectedCatagories?.length - 1]?.name
                    ? "underline"
                    : "none",
                textDecorationColor: "#AC184C",
              }}
            >
              {item?.name}
            </PageTitle>
          </StyledAccordian>
          <AccordionDetails style={{ padding: "10px 0px 10px 10px" }}>
            {nestedData?.hasOwnProperty("child")
              ? RenderNestedCategories({
                  nestedData: nestedData?.child,
                  level: nestedData?.level,
                })
              : RenderNestedOptions(nestedData?.level, item)}
          </AccordionDetails>
        </MainAccordion>
      );
    });
  }

  function RenderNestedOptions(level: number, path: any) {
    if (data?.hasOwnProperty("options")) {
      if (level === 3) {
        return (
          <>
            <SubFacets>
              {data?.options?.map((item: any, indx: number) => {
                const currentCat = selectedCatagories?.find(
                  (i: any) => i.name === item?.name
                );

                return (
                  <Box key={`${item?.name?.toLowerCase()}_${indx}`}>
                    <FormGroup>
                      <FormControlLabel
                        sx={{
                          "& span": {
                            paddingLeft: "0px !important",
                          },
                        }}
                        checked={currentCat?.name === item?.name}
                        control={
                          <Checkbox
                            icon={<UnCheckedIcon />}
                            checkedIcon={<CheckedIcon />}
                            onChange={() => {
                              if (
                                !(
                                  currentCat?.name === item?.name &&
                                  currentCat?.level === level
                                )
                              ) {
                                let previousLevelPath = "";
                                for (let i = 0; i < level - 1; i++) {
                                  previousLevelPath += `${selectedCatagories[i]?.name}>`;
                                }
                                previousLevelPath += `${item?.name}`;
                                handleOnClick(previousLevelPath);
                              } else {
                                console.log("====##", item, currentCat);
                              }
                            }}
                          />
                        }
                        label={
                          <ItemSubtitle
                            variant="subtitle2"
                            sx={{
                              fontWeight:
                                currentCat?.name === item?.name ? 500 : 400,
                            }}
                          >
                            {item?.name}
                            {item?.count > 0 && (
                              <ItemSubtitle
                                sx={{
                                  fontWeight:
                                    currentCat?.name === item?.name ? 500 : 400,
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
                );
              })}
            </SubFacets>
          </>
        );
      } else {
        return (
          <>
            {data?.options?.map((item: any, indx: number) => {
              const currentCat = selectedCatagories?.find(
                (i: any) => i.name === item?.name
              );
              return (
                <MainAccordion
                  aria-label="MainAccordion"
                  expanded={currentCat?.name === item?.name}
                >
                  <StyledAccordian
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
                    onClick={() => {
                      if (level < 3) {
                        const currentCat = selectedCatagories?.find(
                          (i: any) => i.name === item?.name
                        );
                        if (
                          !(
                            currentCat?.name === item?.name &&
                            currentCat?.level === level
                          )
                        ) {
                          if (path) {
                            handleOnClick(`${path?.navPath}>${item?.name}`);
                          } else {
                            handleOnClick(`${item?.name}`);
                          }
                        } else {
                          console.log("====##", item, currentCat);
                        }
                      }
                    }}
                  >
                    <PageTitle
                      ischeckedfilter={currentCat?.name === item?.name}
                    >
                      {item?.name}
                    </PageTitle>
                  </StyledAccordian>
                </MainAccordion>
              );
            })}
          </>
        );
      }
    }
  }
}

export default UnbxdNestedCategoriesFiltersMobile;
