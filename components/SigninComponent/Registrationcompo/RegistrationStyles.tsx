import { transientProps } from "../../../utility/TransientProps";
import {styled} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
export const FormLabelReg = styled(FormLabel)(() => ({
  "@media(max-width: 600px)": {
    color: "#231F20",
  },
  color: "#231F20",
  marginBottom: "6px",
}));
export const StyledStack = styled(Stack)(() => ({
  "& .MuiFormControl-root.MuiTextField-root": {
    padding: "2px 4px 2px 0px",
  },
  width: "100%",
  padding: "0px 71px",
  rowGap: "16px",
  marginTop: "33px",

  "@media(max-width: 600px)": {
    padding: "0px 16px",
    rowGap: "10px",
    marginTop: "25px",
  },
}));

export const TextFieldReg = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    "&.MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EAEAEA",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#EAEAEA    ",
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "@media(max-width: 600px)": {
    width: "100%",
  },
  width: "100%",
  "& .MuiInput-underline:after": {
    borderBottomColor: "#EAEAEA",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#EAEAEA      ",
    },
  },
  "& .MuiOutlinedInput-input.Mui-disabled": {
    cursor: "not-allowed",
    caretColor: "transparent !important",
  },
}));

export const StyledSelect = styled(Select)(() => ({
  "@media(max-width: 600px)": {
    width: "100%",
  },
}));

export const Title = styled(Typography)(() => ({
  paddingTop: "50px",
  color: "#1C191A",
  fontSize: "20px",
  fontStyle: "normal ",
  fontWeight: "400",
  lineHeight: "24px",
  textAlign: "center",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  "@media(max-width: 600px)": {
    paddingTop: "94px",
    fontSize: "12px",
  },
}));

export const SmallTitle = styled(Typography)(() => ({
  "@media(max-width: 600px)": {
    fontSize: "12px",
  },
  color: "#4F4C4D",
  fontStyle: "normal ",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "10.4px",
  textAlign: "center",
  letterSpacing: "0em",
  marginTop: "10px",
}));

export const DisplayGrid = styled(Grid)(() => ({
  "@media(max-width: 600px)": {
    marginLeft: "350",
    display: "flex",
    flexDirection: "column",
    gridGap: "5px",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gridGap: "20px",
}));

export const ButtonSave = styled(
  Button,
  transientProps
)<{ $isDisabled?: boolean }>(({ $isDisabled }) => ({
  backgroundColor: "#231F20",
  color: "white !important",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  borderRadius: 0,
  margin: "3px 0px",
  width: "117px",
  height: "44px",
  fontSize: "12px",
  letterSpacing: "1px",
  opacity: $isDisabled ? "0.5" : "1",
}));

export const SkipNow = styled(Typography)(() => ({
  "@media(max-width: 600px)": {
    borderRadius: 0,
    padding: "0px",
    marginRight: "1px",
  },
  borderRadius: 0,
  padding: "1px",
}));

export const FormControlStyle = styled(FormControl)(() => ({
  fontSize: "10px",
  "& label.Mui-focused": {
    color: "black",
  },
}));

export const RadioButton = styled(Radio)(() => ({
  "&.MuiButtonBase-root.MuiRadio-root.Mui-checked ": {
    color: "#AD184C",
  },
  padding: "3px",
}));

export const RadioGroups = styled(RadioGroup)(() => ({
  marginRight: "0",
}));

export const GridRadio = styled(Grid)(() => ({
  color: "#231F20",
}));
export const TypographySpan = styled(Typography)(() => ({
  color: "#4F4C4D",
  "& > span": {
    color: "#231F20",
  },
}));

export const FormControlLabelStyled = styled(FormControlLabel)(() => ({
  "& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root) path": {
    stroke: "white",
    strokeWidth: 1,
  },
}));
