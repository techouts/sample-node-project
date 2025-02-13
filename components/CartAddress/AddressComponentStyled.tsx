import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const PrimaryBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "start",
  position: "relative",
}));

export const PrimaryBoxOne = styled(Box)(() => ({
  display: "flex",
  marginRight: "10px",
}));
export const AddressTabsBox = styled(Box)(() => ({
  background: "#EAE9EF",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
}));

export const FormControlStyled = styled(FormControl)(({ isMobile }: any) => ({
  width: "100%",
  float: "right",
  display: "flex",
}));
export const FormControlLabelStyled = styled(FormControlLabel)();
() => ({
  margin: "10px",
  backgroundColor: "red",
  display: "flex",
  justifyContent: "space-between",
  position: "relative",
});
export const StyledRadioGroup = styled(RadioGroup)(() => ({
  "& .MuiRadio-root.Mui-checked": {
    color: "#AD184C",
  },
  "& .MuiButtonBase-root.MuiRadio-root": {
    padding: "4px",
  },
}));
export const AddressBottom = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const SecondaryBoxOne = styled(Box)(() => ({
  display: "flex",
}));
export const TabsTypography = styled(Typography)(({ isMobile }: any) => ({
  textAlign: "center",
  padding: isMobile ? "5px 10px" : "10px",
  fontSize: isMobile ? "11px" : "14px",
  fontWeight: 400,
  lineHeight: isMobile ? "13px" : "17px",
  height: isMobile ? "23px" : "31px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#231F20",
}));

export const NameTypography = styled(Typography)(({ isMobile }: any) => ({
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: isMobile ? "14px" : "16px",
  lineHeight: isMobile ? "17px" : "20px",
  color: isMobile ? "#231F20" : "#000000",
  paddingTop: isMobile ? "8px" : "20px",
}));
export const AddressTypography = styled(Typography)(({ isMobile }: any) => ({
  fontSize: isMobile ? "12px" : "16px",
  color: "#4F4C4D",
  fontWeight: 400,
  lineHeight: "150%",
  wordBreak: "break-all",
}));

export const PhoneTypography = styled(Typography)(({ isMobile }: any) => ({
  paddingTop: "8px",
  fontSize: isMobile ? "12px" : "16px",
  color: "#231F20",
  lineHeight: isMobile ? "23px" : "14px",
  fontWeight: 400,
}));
export const EditStack = styled(Stack)(({ isMobile }: any) => ({
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

export const RemoveStack = styled(Stack)(({ isMobile }: any) => ({
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  paddingLeft: "20px",
  color: "#231F20",
}));

export const EditTypography = styled(Typography)(({ isMobile }: any) => ({
  paddingLeft: "7px",
  textDecoration: "underline",
  color: "#AD184C  ",
  fontSize: isMobile ? "12px" : "14px",
  textTransform: "capitalize",
  fontWeight: 400,
  lineHeight: "140%",
}));

export const RemoveTypography = styled(Typography)(({ isMobile }: any) => ({
  paddingLeft: "8px",
  textDecoration: "underline",
  fontSize: isMobile ? "12px" : "14px",
  textTransform: "capitalize",
  fontWeight: 400,
  lineHeight: "120%",
  color: "#231F20",
}));
