import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import {
  SubHeaderNavContent,
  HeaderModalContentTitle,
  HeaderModalContentListItems,
} from "./HeaderStyle";

import { Event_type } from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";

export function HeaderModal({
  data,
  itemname,
  l1Data,
  currentSubNav,
  title,
  categoryId1,
  categoryIndex2,
  subCategoryWidth,
  ...props
}: any) {
  const [isSelected, setIsSelected] = useState<any>();
  const [isColors, setIsColors] = useState("#231F20");
  const handleMouseEnter = (subChild: any) => {
    setIsSelected(subChild?.id);
    setIsColors("#AD184C !important");
  };

  const handleMouseLeave = () => {
    setIsColors("#231F20");
  };

  const callGaEvent = (
    url: string,
    category3: string,
    category4: string,
    linktext: string,
    categoryIndex3: number,
    categoryIndex4: any
  ) => {
    triggerGAEvent(
      {
        widget_title:"na",
        link_text: linktext,
        link_url: `${global?.window?.location?.origin}${url}`,
        event_type: Event_type,
        item_name: linktext,
        item_category: title || "na",
        item_category2: l1Data?.name || "na",
        item_category3: category3 || "na",
        item_category4: category4 || "na",
        item_category_id: categoryId1?.toString() || "na",
        item_category2_id: l1Data?.id?.toString() || "na" ,
        item_category3_id: data?.[categoryIndex3]?.id?.toString() || "na" ,
        item_category4_id: data?.[categoryIndex3]?.children?.[categoryIndex4]?.id?.toString() || "na",
      },
      "menu"
    );
  };

  return (
    <SubHeaderNavContent
      onMouseLeave={(event: React.MouseEvent<HTMLElement>) => {
        props.handleClose();
      }}
    >
      {data?.map(
        (
          childItem: {
            id: number | string;
            name: string;
            children: any[];
            url_key: string;
          },
          childItemIndex: number
        ) => {
          return (
            <>
              {childItem?.children?.length > 0 &&
                childItem?.children?.reduce((accumulator, object) => {
                  return accumulator + object.product_count;
                }, 0) > 0 && (
                  <Grid
                    key={childItemIndex}
                    sx={{
                      width: `calc(${subCategoryWidth}px)`
                    }}
                  >
                    <HeaderModalContentTitle
                      onClick={() => {
                        callGaEvent(
                          childItem?.url_key,
                          childItem.name,
                          "",
                          childItem.name,
                          childItemIndex,
                          null
                        );
                        window.location.assign(
                          `${window.location.origin}/${l1Data?.url_key}/${childItem?.url_key}/c/${childItem?.id}?category_id=${childItem?.id}`
                        );
                      }}
                    >
                      {childItem.name}
                    </HeaderModalContentTitle>
                    {childItem?.children?.map(
                      (
                        subChild: {
                          product_count: number;
                          id: number | string;
                          name: string;
                          url_key: string;
                        },
                        subChildIndex
                      ) => {
                        return (
                          <>
                            {subChild?.product_count > 0 && (
                              <HeaderModalContentListItems
                                key={subChildIndex}
                                onMouseEnter={() => {
                                  handleMouseEnter(subChild);
                                }}
                                onMouseLeave={() => handleMouseLeave()}
                                sx={{
                                  color:
                                    isSelected === subChild.id
                                      ? isColors
                                      : "black",
                                }}
                                onClick={() => {
                                  callGaEvent(
                                    childItem?.url_key,
                                    childItem.name,
                                    subChild.name,
                                    subChild.name,
                                    childItemIndex,
                                    subChildIndex
                                  );
                                  window.location.assign(
                                    `${window.location.origin}/${l1Data?.url_key}/${childItem?.url_key}/${subChild?.url_key}/c/${subChild?.id}?category_id=${subChild?.id}`
                                  );
                                }}
                              >
                                {subChild.name}
                              </HeaderModalContentListItems>
                            )}
                          </>
                        );
                      }
                    )}
                  </Grid>
                )}
            </>
          );
        }
      )}
    </SubHeaderNavContent>
  );
}
