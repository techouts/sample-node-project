import styled from "@emotion/styled";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Dialog } from "@mui/material";

export const NoQuestionsTypography = styled(Typography)(() => ({

  color: "#231F20",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "150%",
  marginTop:"39px",
  "@media(max-width:600px)": {
    paddingLeft: "0px",
    fontSize: "12px",
    marginTop:"0px",
  },
}));
export const TextFieldStyled = styled(TextField)(({ isMobile }: any) => ({
  width: "100%",
  borderRadius: "unset",
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #EAEAEA",
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    padding: isMobile ? "13px 0px 13px 12px" : "18px 0px 18px 20px",
  },
  marginTop: isMobile ? "10px" : "",
  color: "#656263",
  "& .MuiFormHelperText-root": {
    marginTop: "16px",
    marginLeft:isMobile?"12px":' 5px',
    color: "#656263",
    fontSize:"14px",
    "@media(max-width:600px)": {
      fontSize: "12px",
      marginTop: "10px",
    }
  },
  whiteSpace: "nowrap",
  'input': {
    '&::placeholder': {
      color: "#656263",
      fontWeight:"400",
      opacity:0.5,
      fontSize: "14px",
      lineHeight: "16px",
      "@media(max-width:600px)": {
        fontSize: "12px",
      }
    }
  }
}));
export const BoxStyled = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "20px",
  width: "100%",

  "@media(max-width:600px)": {
    padding: "0px",
    flexWrap: "wrap",
  },
}));
export const DialogBoxStyled = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  "@media(max-width:600px)": {
    padding: "0px 16px 0px 16px",
    flexWrap: "wrap",
  },
}));

export const SingleProductBox = styled(Box)(() => ({
  "@media(max-width:600px)": {
    padding: "0px",
  },
}));

export const ButtonStyled = styled(Button)(({ isMobile }: any) => ({
  borderRadius: 0,
  margin:isMobile ?"7px 7px 7px 0px":"8px 8px 8px 0px",
  minWidth:isMobile?"94px":"166px",
  padding: isMobile ? "9.5px 35px" : "14px 26px",
  backgroundColor: "#231F20",
  color: "#DEA3B7",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  whiteSpace: "nowrap",
}));

export const ButtonStyledTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "12px",
  lineHeight:"133%",
  whiteSpace: "nowrap",
  letterSpacing: "1px",
  "@media(max-width:600px)": {
    "& > span": {
      display: "none",
      fontSize: "11px",
    },
  },
}));

export const QAbox = styled(Box)(() => ({
  padding: "41px 0px 12px 0px",
  "@media(max-width:600px)": {
    padding: "25px 0px 3px 0px",
  },
}));
export const QuestionTypographyStyled = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "16px",
  color: "#231F20",
  wordBreak: "break-word",
}));
export const QuestionByTypographyStyled = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  color: "#7B7979",
  paddingLeft: "20px",
}));

export const LikeIconBox = styled(Box)(() => ({
  "@media(max-width:600px)": {
    display: "none",
  },
}));

export const LikeIconBoxMobile = styled(Box)(() => ({
  display: "none",
  "@media(max-width:600px)": {
    display: "flex",
    marginTop: "-52px",
    marginBottom: "28px !important",
  },
}));

export const SubmitAnswerBox = styled(Box)(() => ({
  "@media(max-width:600px)": {
    display: "flex",
    justifyContent: "space-between",
  },
}));
export const AnswerTypographyStyled = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "16px",
  color: "#231F20",
  padding: " 15px 0 0 0",
}));
export const AnswerByTypographyStyled = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  color: "#7B7979",
}));
export const AnswerByBox = styled(Box)(() => ({
  padding: "12px 0px 0px 0px",
}));

export const SeeMoreBox = styled(Box)(() => ({
  "@media(max-width:600px)": {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));
export const SeeMoreTypographyStyled = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  padding: " 25px 0 0px 0",
  color: "#AD184C",
  textDecorationLine: "underline",
  cursor: "pointer",
}));

export const BootstrapDialog = styled(Dialog)(({ isAnswerSubmitted }: any) => ({
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      width: isAnswerSubmitted ? "656px" : "100%",
      maxWidth: isAnswerSubmitted ? "656px" : "100%",
      padding: "0px",
      margin: "0px",
      height: isAnswerSubmitted ? "347px" : "",
    },
  },

  height: "100%",
  overflow: "hidden",
  "@media (max-width: 768px)": {
    left: "50%",
    position: "fixed",
  },
  "@media (max-width: 600px)": {
    left: "0%",
    position: "fixed",
  },
}));

export const DialogTextFieldStyled = styled(TextField)(() => ({
  borderRadius: "unset",
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid grey",
  },
  "& .MuiFormHelperText-root": {
    marginTop: "22px",
    "@media(max-width:600px)": {
      marginTop: "10px",
    },
  },
  paddingTop: "22px",
  width: "100%",
}));

export const DialogButtonsBox = styled(Box)(() => ({
  display: "flex",
  margin: "40px 0px 32px 14px",
  gap: "20px",
  "@media(max-width:600px)": {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    margin: "25px 16px",
    gap: "8px",
  },
}));
export const AskButtonStyled = styled(Button)(() => ({
  borderRadius: 0,
  padding: "14px 26px",
  backgroundColor: "#231F20",
  color: "white",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  "@media(max-width:600px)": {
    whiteSpace: "nowrap",
    flex: "1",
    width: "160px",
    padding: "6px 26px",
  },
}));

export const CancelButtonStyled = styled(Button)(() => ({
  borderRadius: 0,
  padding: "14px 26px",
  backgroundColor: "#231F20",
  color: "white",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  "@media(max-width:600px)": {
    whiteSpace: "nowrap",
    flex: "1",
    paddingLeft: "16px",
    background: "  #FFFFFF",
    width: "160px",
    border: "1px solid #DEA3B7",
    "&:hover": {
      background: "  #FFFFFF",
    },
  },
}));
export const AskTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "22px",
  color: "#231F20",
  marginTop: "40px",
  marginLeft: "0px",
  "@media(max-width:600px)": {
    marginTop: "10px",
    marginLeft: "16px",
    textAlign: "start",
  },
}));
export const CancelTypography = styled(Typography)(() => ({
  fontSize: "12px",
  color: "#DEA3B7",
  "@media(max-width:600px)": {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "11px",
    whiteSpace: "nowrap",
    color: "#DEA3B7",
  },
}));
export const ThankYouTypography = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "30px",
  color: "#231F20",
  textAlign: "center",
  marginTop: "47px",
  "@media(max-width:600px)": {
    fontSize: "18px",
  },
}));

export const SubmittedTypographyPrimary = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "20px",
  color: "#231F20",
  textAlign: "center",
  paddingTop: "6px",
  "@media(max-width:600px)": {
    fontSize: "14px",
    paddingTop: "5px",
  },
}));
export const SubmittedTypographySecondary = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  color: "#656263",
  textAlign: "center",
  paddingTop: "4px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    paddingTop: "5px",
  },
}));

export const OkayButtonStyled = styled(Button)(() => ({
  borderRadius: 0,
  padding: "14px 26px",
  justifySelf: "center",
  backgroundColor: "#231F20",
  color: "#DEA3B7",
  "&:hover": {
    backgroundColor: "#231F20",
  },
}));
export const OkayTypography = styled(Typography)(() => ({
  fontSize: "12px",
  "@media(max-width:600px)": {
    whiteSpace: "nowrap",
  },
}));

export const DialogAskTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  whiteSpace: "nowrap",
  color: "#DEA3B7",
}));

export const Mbox = styled(Backdrop)(() => ({}));
export const ViewMoreQA = styled(Typography)(({}) => ({
  paddingTop: "10px",
  fontSize: "14px",
  fontWeight: 400,
  color: "#AD184C",
  cursor: "pointer",
  textDecorationLine: "underline",
  lineHeight: "150%",
  "@media (max-width: 600px)": {
    fontSize: "11px",
  }
}));