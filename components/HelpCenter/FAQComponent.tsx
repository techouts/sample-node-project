import AccordionDetails from "@mui/material/AccordionDetails";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import { useMobileCheck } from "../../utility/isMobile";
import {
  AccordionTitle,
  ListDot,
  ListOption,
  ListTitle,
  StyledAccordian,
  StyledArrow,
  StyledSummary,
  SubText,
  AccordionText,
  StyledListHead,
  StyledUpArrow,
  ContactusStyle,
} from "./FAQStyles";
import FAQInterface from "../../schemas/FAQSchema";
import router from "next/router";
import Loader from "../../HOC/Loader/Loader";
import triggerGAEvent from "../../utility/GaEvents";
export const FAQComponent = (props: FAQInterface) => {
  const isMobile = useMobileCheck();
  let temp: any = [];
  const data: any = props?.categories.filter(
    (data) => !temp?.includes(data?.group) && temp.push(data?.group)
  );
  const [items, setItems] = useState<string[]>(temp?.[0]);
  const [accordions, setAccordions] = useState<number[]>([]);
  const [categoryId, setCategoryId] = useState<string>(temp?.[0]);
  const [subCatId, setSubCatId] = useState<number>(
    isMobile
      ? -1
      : props?.categories?.filter((data) => data.group == categoryId)?.[0]?.id
  );
  const [subCatId1, setSubCatId1] = useState<number>(-1);
  const [displayLoader, setDisplayLoader] = useState<any>(false);

  const handleCatId = (id: string) => {
    if (items?.includes(id)) {
      let index = items?.indexOf(id);
      let firstArray = items?.slice(0, index);
      let secondArray = items?.slice(index + 1);
      setItems([...firstArray, ...secondArray]);
    } else {
      setCategoryId(id);
      setItems([...items, id]);
    }
  };

  const handleAccordions = (id: number) => {
    if (accordions?.includes(id)) {
      let index = accordions?.indexOf(id);
      let firstArray = accordions?.slice(0, index);
      let secondArray = accordions?.slice(index + 1);

      setAccordions([...firstArray, ...secondArray]);
    } else {
      setAccordions([...accordions, id]);
    }
  };

  const handleSubId = (cName: string, sID: number) => {
    setCategoryId(cName);
    setSubCatId(sID);
    setSubCatId1(sID);
  };

  const handleContactus = () => {
    router.push("/miscs/contact-us");
    setDisplayLoader(true);
    mblContactClick();
  };

  useEffect(() => {
    if (props?.searchSelect != 0) {
      props.categories?.forEach(function (mainCat, index, arr) {
        mainCat.subCategories.forEach(function (filterSubcatId, index, arr) {
          if (filterSubcatId?.id == props?.searchId) {
            setItems([...items, mainCat.group]);
            setAccordions([...accordions, props?.searchId]);
            setCategoryId(mainCat.group);

            setSubCatId(mainCat?.id);
            setSubCatId1(mainCat?.id);
          }
        });
      });
    }
  }, [props?.searchSelect]);

  const callGaEvent = (
    itemname?: string,
    LinkText?: any,
    abc?: string,
  ) => {
    const x =
      typeof LinkText === "boolean"
        ? LinkText
          ? "expand"
          : "collapse"
        : LinkText;

    triggerGAEvent(
      {
        widget_title:props?.__component,
        link_text: x,
        link_url: "na",
        event_type: abc,
        item_name: itemname,
      },
      "click"
    );
  };
  const callExpandEvent = (
    itemname?: string,
    LinkText?: any,
    abc?: string,
    description?:any
  ) => {
    const x =
      typeof LinkText === "boolean"
        ? LinkText
          ? "expand"
          : "collapse"
        : LinkText;

    triggerGAEvent(
      {
        widget_title:props?.__component,
        link_text: x,
        link_url: "na",
        event_type: abc,
        item_name: itemname,
        widget_description:description ||"na"
      },
      "click"
    );
  };
  const mblContactClick = () => {
    triggerGAEvent(
      {
        event_type: "contact_us",
        link_text: "contact_us",
        link_url: "na",
      },
      "click"
    );
  };
  return (
    <>
      {displayLoader && <Loader />}
      <Grid container>
        <Grid item xs={12} sm={3} aria-label="ls-options">
          {
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                paddingTop: "5%",
              }}
              component="nav">
              {temp?.map((category: string) => (
                <>
                  <StyledListHead
                    $isMobile={isMobile}
                    key={category}
                    onClick={() => {
                      [
                        handleCatId(category),
                        !items?.includes(category) &&
                          handleSubId(
                            category,
                            props?.categories?.filter(
                              (data) => data.group == category
                            )?.[0]?.id
                          ),
                      ];
                      callGaEvent(category, category, "help_category_click");
                      isMobile
                        ? !items?.includes(category) &&
                          handleSubId(category, -1)
                        : "";
                    }}>
                    <ListTitle primary={category} />
                    {isMobile && (
                      <StyledUpArrow $isSelected={items?.includes(category)} />
                    )}
                  </StyledListHead>

                  <Collapse
                    in={items?.includes(category)}
                    timeout="auto"
                    unmountOnExit>
                    <List component="div" disablePadding>
                      {props?.categories
                        ?.filter((data) => data?.group == category)
                        ?.map((subCategory: any, subId: number) => (
                          <>
                            <ListItemButton
                              key={subId}
                              sx={{ pl: isMobile ? 2 : 4 }}
                              onClick={() => {
                                handleSubId(category, subCategory?.id);
                                callGaEvent(
                                  subCategory?.group,
                                  subCategory?.title,
                                  "help_sub_category_click"
                                );
                              }}>
                              {!isMobile && (
                                <ListDot
                                  $isSelected={
                                    subCategory?.id === subCatId &&
                                    category === categoryId
                                  }
                                />
                              )}

                              <ListOption
                                $isSelected={
                                  subCategory?.id === subCatId &&
                                  category === categoryId
                                }
                                primary={subCategory?.title}
                              />
                            </ListItemButton>

                            {/* QUESTIONS IN MOBILE VIEW */}

                            {isMobile && (
                              <Collapse
                                in={
                                  subCategory?.id === subCatId1 &&
                                  category === categoryId
                                }
                                timeout="auto"
                                unmountOnExit>
                                {props?.categories
                                  ?.filter((data) => data?.id == subCatId1)
                                  ?.map((data) =>
                                    data?.subCategories?.map(
                                      (queryItem: any, indx: number) => (
                                        <StyledAccordian
                                          $isMobile={isMobile}
                                          expanded={accordions?.includes(
                                            queryItem?.id
                                          )}
                                          key={indx}
                                          onChange={() =>
                                            handleAccordions(queryItem?.id)
                                          }>
                                          <StyledSummary
                                            expandIcon={<StyledArrow />}>
                                            <AccordionTitle>
                                              {queryItem?.title}
                                            </AccordionTitle>
                                          </StyledSummary>
                                          <AccordionDetails>
                                            {queryItem?.subText && (
                                              <AccordionText>
                                                {queryItem?.subText}
                                              </AccordionText>
                                            )}
                                            {queryItem?.info && (
                                              <AccordionText>
                                                {queryItem?.info}
                                              </AccordionText>
                                            )}
                                          </AccordionDetails>
                                        </StyledAccordian>
                                      )
                                    )
                                  )}
                              </Collapse>
                            )}
                          </>
                        ))}
                    </List>
                  </Collapse>
                </>
              ))}

              <ContactusStyle
                p={2}
                isMobile={isMobile}
                onClick={handleContactus}>
                Contact Us
              </ContactusStyle>
            </List>
          }
        </Grid>

        {/* QUESTIONS IN WEB VIEW   */}
        {!isMobile && (
          <Grid item sm={9} aria-label="rs-questions" pt={2}>
            {props?.categories
              ?.filter((data) => data?.id == subCatId)
              ?.map((data) =>
                data?.subCategories?.map((queryItem: any, indx: number) => (
                  <StyledAccordian
                    $isMobile={isMobile}
                    expanded={accordions?.includes(queryItem?.id)}
                    key={indx}
                    onChange={(e, isExpanded) => {
                      handleAccordions(queryItem?.id);
                      callExpandEvent(
                        data?.group,
                        isExpanded,
                        queryItem?.title
                      );
                    }}>
                    <StyledSummary expandIcon={<StyledArrow />}>
                      <AccordionTitle>{queryItem?.title}</AccordionTitle>
                    </StyledSummary>

                    <AccordionDetails>
                      {queryItem?.subText && (
                        <AccordionText>{queryItem?.subText}</AccordionText>
                      )}
                      {queryItem?.info && (
                        <AccordionText>{queryItem?.info}</AccordionText>
                      )}
                    </AccordionDetails>
                  </StyledAccordian>
                ))
              )}
            <SubText
              dangerouslySetInnerHTML={{ __html: props?.bottomText }}
              onClick={handleContactus}></SubText>
          </Grid>
        )}
      </Grid>
    </>
  );
};
