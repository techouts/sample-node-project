import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  FlexBox,
  StyledText,
  StyledSelect,
  StyledList,
  StyledIcon,
  StyledForm,
  BlogTypography,
} from "./DropDownStyles";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { useRouter } from "next/router";
import { AppIcons } from "../../utility/AppIconsConstant";
import { DOWN_ARROW_ICON } from "../../utility/AppIcons";
interface CustomDropDownSchema {
  list?: LIST_ITEM[];
  border?: boolean;
  toggle?: boolean;
  handleSelectedValue?: Function;
  title?: boolean;
  downArrowimage?: boolean;
  downArrowIcon?: boolean;
  defaultValue?: string;
  onClickHandler?: Function;
  titlePath: URL | string;
}
export type LIST_ITEM = {
  id?: number;
  label?: string;
  labelPath?: string;
};
const CustomDropDown = ({
  toggle = false,
  list,
  border = true,
  handleSelectedValue,
  title = true,
  downArrowimage = true,
  onClickHandler,
  defaultValue,
  titlePath,
}: CustomDropDownSchema) => {
  const [value, setValue] = useState(defaultValue);
  const [listVisible, setListVisible] = useState(false);
  const router = useRouter();
  const handleChange = (event: any, child: React.ReactNode) => {
    setValue(event.target.value);
    if (typeof handleSelectedValue == "function") {
      handleSelectedValue(event.target.value);
    }
  };
  const ARROWDOWN = AppIcons(DOWN_ARROW_ICON);
  return (
    <FlexBox>
      {!toggle && title && <StyledText> Sort by:</StyledText>}
      <Box>
        <StyledForm $isBlog={toggle}>
          {downArrowimage && (
            <StyledIcon $isBlog={toggle}>
              {toggle && <BlogTypography>{defaultValue}</BlogTypography>}
              <img
                src={`${ReplaceImage(ARROWDOWN?.url)}`}
                alt="ArrowDownIcon"
              />
            </StyledIcon>
          )}

          <StyledSelect
            value={value}
            open={listVisible}
            onChange={handleChange}
            onOpen={() =>
              list?.length == 0 ? router?.push(titlePath) : setListVisible(true)
            }
            onClose={() => setListVisible(false)}
            $border={border}
            inputProps={{ "aria-label": "Without label" }}
            $isBlog={toggle}
            MenuProps={{
              sx: {
                "&& .Mui-selected": {
                  backgroundColor: "transparent",
                },
              },
            }}
          >
            {list?.map((sort: any) => (
              <StyledList
                key={sort?.label}
                value={sort?.value}
                disabled={sort?.disable}
                $isBlog={toggle}
                onClick={() => {
                  if (typeof onClickHandler == "function") {
                    setListVisible(false);
                    onClickHandler(sort?.labelPath,sort?.label, defaultValue);
                  }
                  return;
                }}
              >
                {sort?.label}
              </StyledList>
            ))}
          </StyledSelect>
        </StyledForm>
      </Box>
    </FlexBox>
  );
};
export default CustomDropDown;
