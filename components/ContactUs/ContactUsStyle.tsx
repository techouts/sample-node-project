import {styled} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
export const HeaderTitle = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "34px",
  color: "#000000",
}));
export const SubText = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  Lineheight: "30px",
  color: "#656263",
  paddingBottom: "52px",
  "@media(max-width:600px)": {
    paddingBottom: "10px",
    fontSize: "12px",
    marginTop:"30px"
  },
}));
export const ColumnStack = styled(Stack)(() => ({
  flexDirection: "column",
  paddingBottom: "20px",
  gap: "48px",
  "@media(max-width:600px)": {
    gap: "12px",
  },
}));
export const StyledHeading = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "18px",
  LineHeight: "30px",
  color: "#000000",
  paddingBottom: "10px",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const StyledContent = styled(Typography)(() => ({
  width: "80%",
  fontSize: "14px",
  fontWeight: "400",
  LineHeight: "18px",
  color: "#656263",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const StyledTextFiled = styled(TextField)(() => ({
  "& input": {
    fontSize: "14px",
  },
  "& > div": {
    borderRadius: "0px",
  },
  "& label.Mui-focused": {
    color: "#AD184C !important",
  },
  "& div.Mui-focused fieldset": {
    borderColor: "#EAEAEA !important",
  },
  "@media(max-width:600px)": {
    "& input": {
      fontSize: "12px",
    },
  },
  // To remove up and down arrows in input
  "input::-webkit-outer-spin-button,input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "input[type=number]": {
    "-moz-appearance": "textfield",
  },
}));
export const Stlyleddropdown = styled(Grid)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  gridGap: "24px",
}));
export const StyledGrid = styled(Grid)(() => ({
  display: "flex",
  marginTop: "24px",
  "@media(max-width:600px)": {
    display: "block",
  },
}));
export const Styledbox = styled(Box)(() => ({
  margin: "20px auto",
}));
export const SubmitTitle = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "18px",
  Lineheight: "30px",
  color: "#000000",
  paddingBottom: "24px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    paddingBottom: "20px",
  },
}));
export const HelperText = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  color: "#000000",
  "@media(max-width:600px)": {
    color: "#D21515",
    fontSize: "12px",
    paddingBottom: "18px",
  },
  paddingBottom: "8px",
}));
export const LetterCount = styled(Typography)(() => ({
  color: "#A7A5A6",
  fontSize: "14px",
  display: "flex",
  justifyContent: "flex-end",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const SubmitButton = styled(Button)(({ disabled }: any) => ({
  fontWeight: "600",
  fontSize: "12px",
  padding: "14px 32px",
  letterSpacing: "1px",
  borderRadius: "0",
  cursor: "pointer",
  backgroundColor: "#231F20",
  color: "#DEA3B7 !important",
  opacity: disabled ? "0.4" : "",

  "&:hover": {
    backgroundColor: "#231F20",
  },
  "@media(max-width:600px)": {
    width: "100%",
    padding: "6px 0px",
    marginBottom: "24px",
  },
}));
export const Selectbox = styled(Grid)(() => ({
  "& input": {
    padding: "14px",
  },
  "& > div": {
    borderRadius: "0px",
  },
  "& label.Mui-focused": {
    color: "#AD184C !important",
  },
  "& div.Mui-focused fieldset": {
    borderColor: "#EAEAEA !important",
  },
}));
