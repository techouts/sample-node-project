import { useRef } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  BottomButtons,
  FilterBootstrapDialog,
  FilterButton,
  ResetButton,
} from "./FiltersStyles";
import TabsComponent from "./TabsComponent";
import triggerGAEvent from "../../utility/GaEvents";
import { FILTERS_MOB_TITLE, RESET_TITLE } from "./Constants";
import { useRouter } from "next/router";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2, fontSize: "12px" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon sx={{ color: "#AD184C", marginTop: "10px" }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
const FilterMobile = (props: any) => {
  const { clearAllHandler } = props;
  const router: any = useRouter();
  const childRef = useRef<any>();
  const handleApplyClose = () => {
    childRef?.current?.handleApplyFilters();
    props?.setOpenFilter(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleClickClose = () => {
    props?.setSelectedFilters(props?.copiedSelectedFilters);
    props?.setOpenFilter(false);
    triggerGAEvent(
      {
        widget_type: "filter",
        widget_title: "Filter",
        widget_description: " ",
        link_text: "close ",
        link_url: " ",
      },
      "widget_close"
    );
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
            (valCheck > -1 && catLevelCheck?.level < 3) ||
            (valCheck > -1 && !catLevelCheck?.level)
          ) {
            checkVal.push(l2);
          }
        });
      });
    });
    return checkVal;
  }

  const selectedFilterValCheck = () => {
    return props?.selectedFilters?.filter((item: any) => {
      return checkMultipleLevelFilter(props?.filtered, item)?.length > 0;
    });
  };

  const filterLevelCheck = () => {
    let levelCheckCat;
    let obj = props?.filtered;
    if (obj?.category_id) {
      let valCheck = obj?.category_id?.in?.filter((lvl: any) => {
        return catLevelCheck?.id?.toString() === lvl;
      });
      if (valCheck?.length > 0 && selectedFilterValCheck()?.length > 0) {
        levelCheckCat = obj?.category_id?.in?.filter((lvl: any) => {
          return (
            filterByProperty(
              props?.categoryListCheck?.category?.children,
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

  const filtersLength = props?.selectedFilters?.filter(
    (l1Item: any) =>
      l1Item?.label?.toLowerCase() !== "default category" &&
      l1Item?.label?.toLowerCase() !== "luxe"
  );

  return (
    <>
      <FilterBootstrapDialog
        aria-label="customized-dialog-title"
        open={props?.openFilter}
        onClose={handleClickClose}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClickClose}>
          {FILTERS_MOB_TITLE}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TabsComponent
          key={JSON.stringify(props?.data ?? '{}')}
            showLoader={props?.showLoader}
            setSelectedFilters={props?.setSelectedFilters}
            selectedFilters={props?.selectedFilters}
            filtered={props?.filtered}
            setFiltered={props?.setFiltered}
            copiedSelectedFilters={props?.copiedSelectedFilters}
            setCopiedSelectedFilters={props?.setCopiedSelectedFilters}
            data={props?.data}
            ref={childRef}
            opened={props?.opened}
            categoryListCheck={props?.categoryListCheck}
            setOpened={props?.setOpened}
            setPage={props?.setPage}
            filtersLength={filtersLength}
            categoryPath={props?.categoryPath}
            setCategoryPath={props?.setCategoryPath}
            setCheckedFilter={props?.setCheckedFilter}
          />
        </DialogContent>
        <BottomButtons>
          <ResetButton autoFocus onClick={clearAllHandler}>
            {RESET_TITLE}
          </ResetButton>
          <FilterButton autoFocus onClick={handleApplyClose}>
            {`Apply ${filtersLength?.length || ""} Filters`}
          </FilterButton>
        </BottomButtons>
      </FilterBootstrapDialog>
    </>
  );
};
export default FilterMobile;
