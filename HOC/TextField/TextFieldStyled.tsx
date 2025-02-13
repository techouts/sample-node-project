import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const TextFieldStyled = styled(TextField)(
  ({ disabled, isColor }: any) => ({
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "0px",
    },
    "& label.Mui-focused": {
      color: "#AD184C !important",
      fontWeight: isColor ? 500 : "",
      fontSize: isColor ? "12px" : "",
    },
    "& .MuiOutlinedInput-root": {
      " &.Mui-focused fieldset": {
        borderColor: "#EAEAEA",
      },
      "& fieldset": {
        borderColor: disabled ? "#EAEAEA !important" : "#EAEAEA !important",
      },
    },
  })
);
