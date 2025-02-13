import React from "react";
import { InputLabel } from "@mui/material";
import {
  FlexBox,
  StyledSelect,
  StyledList,
  StyledIcon,
  StyledForm,
} from "../../HOC/SelectDropDown/SelectDropDownStyles";
import { useMobileCheck } from "../../utility/isMobile";

const SelectDropDown = (props: any) => {
  const { list, value, handleSelectedValue, icon, placeholders, label } = props;
  const handleChange = (event: any, child: React.ReactNode) => {
    handleSelectedValue(event?.target?.value);
  };
  const isMobile = useMobileCheck();
  return (
    <FlexBox>
      <StyledForm>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            fontSize: isMobile ? "0.8rem" : "0.9rem",
            overflowWrap: "break-word",
          }}
        >
          {label}
        </InputLabel>
        <StyledIcon sx={{ right: isMobile ? "-5%" : "0" }}>{icon}</StyledIcon>
        <StyledSelect
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: "30%",
              },
            },
          }}
          placeholder={placeholders}
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value ?? ""}
          label={label}
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          {list?.map((item: any) => (
            <StyledList key={item?.value} value={item?.value}>
              {item?.value}
            </StyledList>
          ))}
        </StyledSelect>
      </StyledForm>
    </FlexBox>
  );
};
export default SelectDropDown;
