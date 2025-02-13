import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import {
  MainBox,
  StyledButton,
  FirstTypography,
  SecondTypography,
  MobileDrawer,
  DrawerBox,
  DrawerSubBox,
  MobileList,
  DrawerTypography,
  CustomDivider,
  DefaultLabel,
} from "./SortFilterStyles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  DEFAULT_LABEL,
  SORT_LABEL,
} from "../../components/ProductLayout/constants";
import { ReplaceImage } from "../../utility/ReplaceImage";
import triggerGAEvent from "../../utility/GaEvents";
import { AppIcons } from "../../utility/AppIconsConstant";
import { FILTER_SETTINGS_ICON, SORT_ICON } from "../../utility/AppIcons";
import { useRouter } from "next/router";
const SortFilterBar = (props: any) => {
  const { list, handleSelectedValue } = props;
  const [values, setValues] = useState("Recommended");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleChange = (option: any, index: number) => {
    if (!option?.disable) {
      setValues(option?.label);
      handleSelectedValue(option?.value);
    }
    setOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const data = list.filter(
      (val: any) => val.value === router?.query?.sort?.toString()
    );
    setValues(data?.[0]?.label);
  }, [router?.query?.sort]);
  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const handleSort = () => {
    triggerGAEvent(
      {
        widget_type: "filter",
        widget_title: "Filter",
        widget_description: "na",
        link_text: "close",
        link_url: "na",
      },
      "widget_close"
    );
    setOpen(false);
  };

  const handleFilters = () => {
    props?.setOpenFilter(true);
    props?.selectedFilters > 0
      ? props?.setCopiedSelectedFilters([])
      : props?.setCopiedSelectedFilters(props?.selectedFilters);
  };
  const SORT_ARROW = AppIcons(SORT_ICON);
  const Filter_settings = AppIcons(FILTER_SETTINGS_ICON);
  const filtersLength = props?.selectedFilters?.filter(
    (l1Item: any) =>
      l1Item?.label?.toLowerCase() !== "default category" &&
      l1Item?.label?.toLowerCase() !== "luxe"
  );

  return (
    <>
      <MainBox>
        <Grid container>
          <Grid item xs={5.5}>
            <StyledButton onClick={() => setOpen(true)}>
              <img
                width="20px"
                height="20px"
                src={`${ReplaceImage(SORT_ARROW?.url)}`}
                alt="Sort_Icon"
              />
              <Box>
                <FirstTypography>{SORT_LABEL}</FirstTypography>
                <SecondTypography>{values}</SecondTypography>
              </Box>
            </StyledButton>
          </Grid>
          <Grid item xs={1} display="flex">
            <CustomDivider orientation="vertical" />
          </Grid>
          <Grid item xs={5.5}>
            <StyledButton onClick={handleFilters}>
              <img
                src={`${ReplaceImage(Filter_settings?.url)}`}
                alt="Filter_Icon"
                width={"20px"}
              />
              <Box>
                <FirstTypography>FILTER</FirstTypography>
                <SecondTypography>
                  {filtersLength?.length > 0 &&
                    `${filtersLength?.length} Filters Applied`}
                </SecondTypography>
              </Box>
            </StyledButton>
          </Grid>
        </Grid>
        {/* for sort in plp */}
        <MobileDrawer anchor="bottom" open={open}>
          <DrawerBox p={2} width="100%" textAlign="center" role="presentation">
            <DrawerSubBox>
              <DrawerTypography>{SORT_LABEL}</DrawerTypography>
              <CloseRoundedIcon
                onClick={() => handleSort()}
                fontSize="small"
                htmlColor="#AD184C"
              />
            </DrawerSubBox>
            <Divider />
            {list?.map((option: any, index: number) => {
              const uniqueKeyValue = index;
              return (
                <MobileList
                  key={uniqueKeyValue}
                  value={option?.value}
                  disabled={option?.disable}
                  selected={values == option?.label}
                  onClick={() => handleChange(option, index)}>
                  {
                    <Typography>
                      {option?.label}
                      {option?.default && (
                        <DefaultLabel>{DEFAULT_LABEL}</DefaultLabel>
                      )}
                    </Typography>
                  }
                </MobileList>
              );
            })}
          </DrawerBox>
        </MobileDrawer>
      </MainBox>
    </>
  );
};
export default SortFilterBar;
