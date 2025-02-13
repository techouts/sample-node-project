import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
export const MainBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  gap: "22px",
  alignItems: "center",
  width: "62%",
  "@media(max-width:900px)": {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "6px",
    width: "100%",
  },
}));
export const TextFieldBox = styled(TextField)(() => ({
  backgroundColor: "#FFFFFF",
  "& .MuiOutlinedInput-root": {
    paddingRight: "0px",
    borderRadius: "0px",
    border: "1px solid #EAEAEA",
  },
  "& .MuiInputAdornment-root": {
    display: "contents",
  },
  width: "100%",
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    padding: "3%",
  },
}));
export const BorderBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid rgba(167, 165, 166, 0.34)",
  padding: "2.4% 8%",
  "@media(min-width:601px) and (max-width:1200px)": {
    padding: "2.4% 2.4%",
  },
  "@media(min-width:601px) and (max-width:900px)": {
    rowGap: "16px",
    flexDirection: "column",
    border: "1px solid rgba(167, 165, 166, 0.34)",
    padding: "2.4% 8%",
    alignItems: "baseline",
  },
  "@media(max-width:600px)": {
    flexDirection: "column",
    alignItems: "baseline",
    margin: "0px",
    padding: "0px",
    border: "none",
  },
}));
export const FollowBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  gap: "5.5%",
  alignItems: "center",
}));
export const FollowIconBox = styled(Box)(() => ({
  flexDirection: "row",
  display: "flex",
  gap: "20px",
  "@media(max-width:600px)": {
    gap: "12px",
  },
}));
export const Boxicon = styled(Box)(() => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
}));
export const Typographyfollow = styled(Typography)(() => ({
  fontSize: "18px",
  whiteSpace: "nowrap",
  "@media(max-width:1200px)": {
    fontSize: "16px",
  },
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const Buttonlabel = styled(Button)(() => ({
  backgroundColor: "black",
  color: "#DEA3B7",
  borderRadius: 0,
  padding: "2.6% 10%",
  fontSize: "12px",
  height: "100%",
  letterSpacing: "1px",
  "&.MuiButtonBase-root.MuiButton-root":{
    marginRight:"3px",
  },
  "@media(max-width:600px)": {
    height: "90%",
  },
  margin: "0.5%",
  "&:hover": {
    background: "black",
    color: "pink",
    outline: "1px solid rgba(222, 163, 183, 1)",
  },
}));
export const TypographyText = styled(Typography)(() => ({
  width: "max-content",
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "142%",
  "@media(max-width:1200px)": {
    fontSize: "16px",
  },
  "@media(max-width:600px)": {
    marginBottom: "7px",
    fontSize: "12px",
  },
}));
export const BottomDivider = styled(Divider)(() => ({
  marginTop: "20px",
}));
export const Icon = styled("img")(() => ({
  "@media(max-width:1200px)": {
      width: "35px",
    },
    "@media(max-width:600px)": {
      width: "100%",
    },
}));
