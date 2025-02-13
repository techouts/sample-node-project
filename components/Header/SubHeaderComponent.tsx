import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { HeaderModal } from "./HeaderModal";
import {
  SubHederNav,
  SubHeaderUnorderList,
  SubHeaderText,
  BoxWrapper,
  SubHeaderModal,
  SubHeader,
} from "./HeaderStyle";
import triggerGAEvent from "../../utility/GaEvents";
import { Event_type } from "../../utility/GAConstants";

export default function SubHeaderComponent({ data , handleMouseLeave }: any) {
  const [openHeaderModal, setOpenHeaderModal] = useState(false);
  const [subMenu, setSubMenu] = useState([]);
  const [currentSubNav, setCurrentSubNav] = useState<number>(-1);
  const [subCategoryWidth, setCategoryWidth] = useState<any>("auto");

  const openModal = (item: any) => {
    setSubMenu(item);
    setOpenHeaderModal(true);
  };
  const closeModal = () => {
    setOpenHeaderModal(false);
    setCurrentSubNav(-1);
    handleMouseLeave();
  };
  const callGAEvent = (
    name: string,
    url: string,
    itemcateory2: string,
    navTitle: string,
    index: any
  ) => {
    triggerGAEvent(
      {
        widget_title: "na",
        link_text: name,
        link_url: `${global?.window?.location?.origin}${url}`,
        event_type: Event_type,
        item_name: name,
        item_category: navTitle || "na",
        item_category2: itemcateory2 || "na",
        item_category_id: data?.data?.id?.toString() || "na",
        item_category2_id:
          data?.data?.children?.[index]?.id?.toString() || "na",
      },
      "menu"
    );
  };
  const parentRef = React.useRef<any>([]);
  const containerRef = React.useRef<any>([]);
  const [boxPosition, setBoxPosition] = useState<any>({});
  const [maxwidth, setMaxWidth] = useState<any>("100%");
  const [width, setWidth] = useState<any>("auto");
  const [minWidth, setMinWidth] = useState<any>("fit-content");
  const windowMaxWith = 1440;
  const noOfCols = 8;
  useEffect(() => {
    const finalLeft =
      parentRef.current[currentSubNav]?.getBoundingClientRect()?.left;
    const dataItems = data?.data?.children?.[currentSubNav]?.children?.filter(
      (childItem: any) => {
        if (
          childItem?.children?.reduce((accumulator: any, object: any) => {
            return accumulator + object.product_count;
          }, 0) > 0
        ) {
          return childItem;
        }
      }
    );
    setCategoryWidth(
      window.innerWidth > windowMaxWith
        ? windowMaxWith / noOfCols
        : window.innerWidth / noOfCols
    );
    if (dataItems?.length > 7) {
      setBoxPosition({
        left:
          window.innerWidth > windowMaxWith
            ? `calc(${(window.innerWidth - windowMaxWith) / 2}px + 3%)`
            : "5%",
      });
      setWidth(
        window.innerWidth > windowMaxWith
          ? `calc(${windowMaxWith}px - 10%)`
          : `calc(${window.innerWidth}px - 10%)`
      );
    } else {
      setWidth(
        window.innerWidth > windowMaxWith
          ? `${(windowMaxWith / noOfCols) * dataItems?.length}px`
          : `${(window.innerWidth / noOfCols) * dataItems?.length}px`
      );
      setBoxPosition({
        left:
          window.innerWidth > windowMaxWith
            ? windowMaxWith - finalLeft - 68 >
              (windowMaxWith / noOfCols) * dataItems?.length
              ? `${finalLeft - 68}px`
              : finalLeft +
                  (windowMaxWith -
                    finalLeft -
                    (windowMaxWith / noOfCols) * dataItems?.length) -
                  68 <
                (window.innerWidth - windowMaxWith) / 2
              ? `calc(${
                  finalLeft +
                  (windowMaxWith -
                    finalLeft -
                    (windowMaxWith / noOfCols) * dataItems?.length)
                }px + 5%)`
              : `calc(${
                  finalLeft +
                  (windowMaxWith -
                    finalLeft -
                    (windowMaxWith / noOfCols) * dataItems?.length)
                }px - 5%)`
            : window.innerWidth - finalLeft - 68 >
              (window.innerWidth / noOfCols) * dataItems?.length
            ? finalLeft - 68 > 68
              ? `${finalLeft - 68}px`
              : "68px"
            : `calc(${
                finalLeft +
                (window.innerWidth -
                  finalLeft -
                  (window.innerWidth / noOfCols) * dataItems?.length)
              }px - 8%)`,
      });
    }
    setMaxWidth(`calc(${window.innerWidth}px - 5%)`);
    setMinWidth(dataItems?.length > noOfCols ? "auto" : "fit-content");
  }, [openHeaderModal, currentSubNav]);

  return (
    <>
      <SubHeaderUnorderList
        style={{
          zIndex: data && 1000,
        }}
        onMouseLeave={closeModal}
      >
        <BoxWrapper sx={{ boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.4)" }}>
          {data?.data?.children?.map(
            (
              item: {
                children: any;
                name: string;
                url_key: string;
                id: string;
              },
              index: number
            ) => (
              <>
                {item?.name?.toLowerCase() !== "brands" && (
                  <Box
                    key={index}
                    ref={(ref: any) => {
                      if (ref) {
                        parentRef.current[index] = ref;
                      }
                    }}
                  >
                    <SubHeader>
                      <SubHederNav
                        onMouseEnter={(
                          event: React.MouseEvent<HTMLElement>
                        ) => {
                          openModal(item?.children);
                          setCurrentSubNav(index);
                        }}
                        onClick={() => {
                          callGAEvent(
                            item?.name,
                            item.url_key,
                            item?.name,
                            data?.navTitle,
                            index
                          );
                          data?.data?.isNavigateToPLP
                            ? window.location.assign(
                                `/category/${item.url_key}/c/${item?.id}?category_id=${item?.id}`
                              )
                            : window.location.assign(`/category/${item.url_key}`);
                        }}
                      >
                        <SubHeaderText $isActiveTab={currentSubNav === index}>
                          {item?.name}
                        </SubHeaderText>
                      </SubHederNav>
                      <SubHeaderModal
                        sx={{
                          top:
                            data.navTitle == "Luxe" ? "71px !important" : "17%",
                          maxWidth: maxwidth,
                          width: width,
                          minWidth: minWidth,
                          ...boxPosition,
                        }}
                        ref={(ref: any) => {
                          if (ref) {
                            containerRef.current[index] = ref;
                          }
                        }}
                      >
                        {data?.data?.children?.[currentSubNav] &&
                          openHeaderModal && (
                            <HeaderModal
                              data={subMenu}
                              l1Data={data?.data?.children?.[currentSubNav]}
                              handleClose={closeModal}
                              title={data?.navTitle}
                              categoryIndex2={index}
                              categoryId1={data?.data?.id}
                              subCategoryWidth={subCategoryWidth}
                            />
                          )}
                      </SubHeaderModal>
                    </SubHeader>
                  </Box>
                )}
              </>
            )
          )}
        </BoxWrapper>
      </SubHeaderUnorderList>
    </>
  );
}
