import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Stack from "@mui/material/Stack";

interface GetTheApp {
  isMobile: boolean;
}

export const MainTitle = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "40px",
  color: " #231F20",
  "@media(max-width:600px)": {
    fontSize: "16px",
    lineHeight: "140%",
  },
}));

export const Buttonlabel = styled(Button)(() => ({
  backgroundColor: "#231F20",
  color: "#DEA3B7",
  borderRadius: 0,
  padding: "1% 6%",
  fontSize: "12px",
  height: "100%",
  "@media(max-width:600px)": {
    height: "90%",
  },
  margin: "5px",
  "&:hover": {
    background: "#231F20",
    color: "#DEA3B7",
    outline: "1px solid rgba(222, 163, 183, 1)",
  },
}));
export const AvailableText = styled(Typography)(() => ({
  color: "#231F20",
  "@media screen and (max-width: 600px)": {
    fontSize: "12px",
  },
}));
export const LargeTitle = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "700",
  "@media screen and (max-width: 600px)": {
    fontSize: "12px",
  },
}));
export const StyledStack = styled(Stack)(() => ({
  maxWidth: "320px",
  margin: "auto !important",
}));
export const TextFieldBox = styled(TextField)(() => ({
  backgroundColor: "#FFFFFF",
  maxWidth: "420px",
  "& .MuiOutlinedInput-root": {
    paddingRight: "0px",
    borderRadius: "0px",
    maxHeight: "40px",

    backgroundColor: "#F7F6F9",
    "@media screen and (max-width: 600px)": {
      backgroundColor: "#FFF",
      border: "1px solid #F7F6F9",
    },
  },
  "& .MuiInputAdornment-root": {
    display: "contents",
  },
  // To remove up and down arrows in input
  "input::-webkit-outer-spin-button,input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "input[type=number]": {
    "-moz-appearance": "textfield",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    "@media screen and (max-width: 600px)": {
      border: "1px solid #EAEAEA",
    },
  },
}));

export const StyledStepLabel = styled(StepLabel)(() => ({
  "& .MuiStepLabel-iconContainer svg": {
    width: "32px",
    height: "32px",
    color: "#231F20",
  },
  "& .MuiStepLabel-label": {
    fontSize: "16px",
    fontWeight: "700",
    color: "#231F20",
  },
  "& .Mui-completed": {
    fontSize: "16px",
    fontWeight: "700",
    color: "#AD184C !important",
  },
}));

export const StyledStepper = styled(Stepper)(() => ({
  "& .MuiStepConnector-root": {
    marginLeft: "16px !important",
  },
}));

export const TypographyAvailableText = styled(Typography)(
  ({ isMobile }: GetTheApp) => ({
    whiteSpace: "nowrap",
    marginRight: isMobile ? "0px" : "16px",
    fontWeight: "400",
    fontSize: isMobile ? "12px" : "16px",
    alignItems: "center",
  })
);
export const TypographyOr = styled(Typography)(({ isMobile }: GetTheApp) => ({
  fontWeight: "400",
  fontSize: isMobile ? "12px" : "16px",
}));
