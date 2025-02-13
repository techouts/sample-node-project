import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import { transientProps } from "../../../utility/TransientProps";

interface Add {
  isMobile?: boolean;
  isFlag?: boolean;
}
export const AddressTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "16px",
  color: " #231F20",
}));
export const ShippingTypography = styled(Typography)(() => ({
  paddingLeft: "4px",
  display: "inline",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  color: "#4F4C4D",
}));
export const SaveButton = styled(Button)(() => ({
  borderRadius: 0,
  width: "85px",
  height: "30px",
  background: "#231F20",
  "&:hover": {
    backgroundColor: "#231F20",
  },
}));

export const SaveTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  color: "#FFFFFF",
  textAlign: "center",
}));
export const AddAddressButton = styled(Button)(
  ({ disabled, isMobile }: any) => ({
    borderRadius: 0,
    display: "flex",
    justifySelf: "center",
    width: isMobile ? "100%" : "153px",
    height: "44px",
    background: "#231F20",

    opacity: disabled ? "0.7" : "",
    "&:hover": {
      backgroundColor: "#231F20",
    },
  })
);
export const AddressFormsBox = styled(Box)(({ isMobile }: Add) => ({
  justifyContent: "center",
  display: "flex",
  paddingTop: isMobile ? "12px" : "37px",
  paddingBottom: "34px",
}));
export const AddAddressTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "12px",
  color: "#FFFFFF",
  textAlign: "center",
}));
export const LocationNameTextField = styled(TextField)(({ isMobile }: Add) => ({
  height: "100%",
  width: "100%",
  marginRight: "5px",
  marginLeft: isMobile ? "" : "25%",

  "& .MuiInputBase-input.MuiFilledInput-input": {
    paddingTop: "0px",
  },
  "& .MuiInputBase-root": {
    backgroundColor: "#FFFFFF",
  },
}));

export const SelectSizeList = styled(Typography)(() => ({
  display: "flex",
  paddingTop: "0px",
}));

export const SizeTab = styled(Tab)(() => ({
  backgroundColor: "#EAE9EF",
  margin: "0 10px 3px 0",
  padding: "0px 0px",
  color: " #231F20",
  textTransform: "capitalize",
  minHeight: "31px",
  minWidth: "69px",
  "& .MuiTab-root, &.Mui-selected": {
    color: "#231F20    ",
    border: "1px solid #DEA3B7   ",
  },
}));
export const CheckBoxStyle = styled(Box)(({ isMobile }: Add) => ({
  paddingTop: isMobile ? "" : "20px",
}));

export const StyledSelect = styled(Select)(() => ({
  border: "none",
  fontWeight: 600,
  "&:before": {
    borderColor: "none",
  },
  "&:after": {
    borderColor: "none",
  },
}));

export const StyledCheckbox = styled(Checkbox)(() => ({
  color: "red",
  borderColor: "black",

  "& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium": {
    color: "white",
    backgroundColor: "#AD184C    ",
  },

  "& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.Mui-checked": {
    color: "yellow",
    backgroundColor: "#AD184C    ",
  },
}));

export const TextFieldAddress = styled(TextField)(() => ({
  border: "unset",
  borderRadius: "0px",

  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
  },

  "& label.Mui-focused": {
    color: "#AD184C !important",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "150%",
  },
  "& .MuiOutlinedInput-root": {
    " &.Mui-focused fieldset": {
      borderColor: "#EAEAEA",
    },
    "& fieldset": {
      borderColor: "#EAEAEA !important",
    },
  },
}));
export const MainBox = styled(Box)(() => ({
  display: "block",
  border: "1px solid rgba(155, 155, 155, 0.3)",
}));
export const TextFieldBox = styled(Box)(({ isMobile }: Add) => ({
  paddingTop: isMobile ? "17px" : "20px",
}));

// DELETE MODAL CSS

export const DeleteBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));
export const MessageText = styled(Typography)(({ isMobile }: Add) => ({
  fontSize: isMobile ? "18px" : "24px",
  fontWeight: "600",
  lineHeight: isMobile ? "22px" : "30px",
  color: "#231F20",
  padding: "20px 0px",
}));
export const Buttons = styled(Button)(({ isFlag }: Add) => ({
  backgroundColor: isFlag ? " #231F20" : "#DEA3B7",
  borderRadius: "0px",
  color: isFlag ? "#FFFFFF" : "#231F20",
  margin: "10px",
  "&:hover": {
    backgroundColor: isFlag ? "#231F20" : "#DEA3B7",
  },
}));

export const ModalHeaderText = styled(
  Typography,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  fontWeight: 700,
  fontSize: $isMobile ? "12px" : "16px",
  lineHeight: "20px",
  textTransform: "uppercase",
  color: "#231F20",
  paddingBottom: "7px",
}));
