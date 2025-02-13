import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Rating from "@mui/material/Rating";

export const StyledBox = styled(Button)(() => ({
  width: "100%",
  borderRadius: "0px",
  backgroundColor: " #DEA3B7",
  color: " #231F20",
  marginTop: "28px",
  fontSize: "12px",
  fontWeight: "500",
  height: "55px",
  "&: hover": {
    backgroundColor: " #DEA3B7",
  },
  "@media (max-width:600px)": {
    height: "28px",
    marginTop: "12px",
    width: "100%",
    fontSize: "11px",
    letterSpacing: "1px",
  },
}));

export const StarRating = styled(Rating)(() => ({
  "& span": {
    fontSize: "30px",
  },
}));

export const AddressBox = styled(Card)(() => ({
  padding: "30px 30px",
  backgroundColor: "#FFFFFF",
  width: "100%",
  marginTop: "20px",
  "@media (max-width:600px)": {
    padding: "25px 16px",
  },
}));

export const TitlePrice = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: " space-between",
}));
export const AddressSectionTitle = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "500",
  color: "#231F20",
  fontFamily: "Montserrat",
  lineHeight: "22px",
  paddingBottom: "30px",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const DeliverySectionKeys = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "500",
  color: "#000000",
  display: "inline-block",
  fontFamily: "Montserrat",
  lineHeight: "20px",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const ContainerFragment = styled.div`
  display: inline-block;
  padding-left: 8px;
`;

export const TitleTypography = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "400",
  color: "#231F20",
  paddingBottom: "21px",
  "@media (max-width:600px)": {
    paddingBottom: "10px",
    fontSize: "12px",
  },
}));
export const OrderfeedbackTitle = styled(Typography)(() => ({
  fontSize: "16px",
  paddingBottom: "10px",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));

export const TextareaAutosizeStyled = styled(TextareaAutosize)(() => ({
  width: "100%",
  fontSize: "14px",
  fontFamily: "Montserrat",
  resize: "none",
  padding: "20px 0 0 20px",
}));

export const NameNumber = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "500",
  color: "#231F20",
  "@media (max-width:600px)": {
    fontSize: "11px",
    fontWeight: "bold",
  },
}));

export const AddressText = styled(Typography)(() => ({
  "@media (max-width:600px)": {
    fontSize: "11px",
  },
}));

export const SaveamountBox = styled(Box)(() => ({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingTop: "5px",
  "@media (max-width:600px)": {
    paddingTop: "0px",
  },
}));

export const AmountGrid = styled(Grid)(() => ({
  fontSize: "15px",
  color: "#231F20",
  "@media (max-width:600px)": {
    fontSize: "11px",
  },
}));

export const BreakupTypo = styled(Typography)(() => ({
  textDecoration: "underline",
  float: "right",
  color: "#231F20",
  cursor: "pointer",
  "@media (max-Width:600px)": {
    float: "unset",
    fontSize: "11px",
    paddingTop: "5px",
  },
}));

export const PaymentMode = styled(Typography)(() => ({
  fontSize: "16px",
  "@media (max-width:600px)": {
    fontSize: "11px",
    paddingTop: "6px",
  },
}));

export const ReviewButton = styled(Button)(() => ({
  border: "1px solid #DEA3B7",
  borderRadius: "0px",
  color: "#231F20",
  float: "right",
  minHeight: "44px",
  minWidth: "154px",
  fontSize: "12px",
  textTransform: "uppercase",
  fontWeight: "500",
  background: "#DEA3B7",
  ":hover": {
    background: "#DEA3B7",
    "@media (max-width:600px)": {
      background: "#DEA3B7",
    },
  },
  "@media (max-width:600px)": {
    minHeight: "28px",
    padding: "0 20px",
    width: "100%",
    background: "#DEA3B7",
    color: "#231F20",
    fontSize: "11px",
  },
}));

export const StyledBox1 = styled(Box)(() => ({
  textAlign: "center",
  display: "block",
  "@media (max-width:600px)": {
    display: "flex !important",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const IssueButton = styled(Button)(() => ({
  minWidth: "175px",
  minHeight: "45px",
  background: " #F8EDF1",
  color: "#231F20",
  fontSize: "14px",
  padding: "10px",
  whiteSpace: "nowrap",
  textTransform: "capitalize",
  "@media (max-width:600px)": {
    minWidth: "128px",
    minHeight: "35px",
    fontSize: "11px",
    padding: "7px",
  },
}));

export const ButtonBox = styled(Box)(() => ({
  display: "flex",
  gridGap: "10px",
  flexWrap: "wrap",
}));

// Track order css
export const ComponentGrid = styled(Grid)(() => ({
  backgroundColor: "#ffffff",
  padding: "30px",
  position: "relative",
  marginTop: "20px",
  "@media (max-width:600px)": {
    padding: "25px 16px",
  },
}));

export const OrderTitle = styled(Typography)(() => ({
  paddingBottom: "30px",
  color: "#231F20",
  fontSize: "18px",
  fontWeight: "500",
  "@media (max-width:600px)": {
    paddingBottom: "10px",
    fontSize: "12px",
    fontWeight: "bold",
  },
}));

export const TrackButton = styled(Button)(() => ({
  float: "right",
  backgroundColor: "#DEA3B7",
  color: "#231F20",
  padding: "17px",
  fontSize: "12px",
  fontWeight: "500",
  borderRadius: "0",
  height: "45px",
  "@media (max-width:600px)": {
    width: "100%",
    height: "28px",
    marginTop: "12px",
    fontSize: "11px",
    padding: "0",
    letterSpacing: "1px",
  },
  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
}));

export const OrderItemTitle = styled(Typography)(() => ({
  color: "#7B7979",
  "@media (max-width:600px)": {
    fontSize: "11px",
  },
}));

export const OrderStatusTitle = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "500",
  marginLeft: "4px",
  "@media (max-Width:600px)": {
    fontSize: "11px",
  },
  "& span": {
    fontWeight: "500",
    fontSize: "16px",
    "@media (max-Width:600px)": {
      fontSize: "11px",
    },
  },
}));

export const OrderStatusSubTitle = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "500",
  color: "#000000",
  "@media (max-Width:600px)": {
    fontSize: "11px",
  },
}));

//  track order modal
export const TrackTitle = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: 600,
  color: "#231F20",
}));

export const Confirming = styled(Typography)(() => ({
  fontSize: "16px",
  paddingTop: "30px",
  color: "#4F4C4D",
  "& span": {
    fontWeight: 600,
  },
}));

export const OrderDate = styled(Typography)(() => ({
  color: "#231F20",
  fontSize: "16px",
  paddingTop: "10px",
}));

export const StepperComponent = styled(Stepper)(() => ({
  paddingTop: "32px",
  flexDirection: "row",
  "@media (max-width:600px)": {
    flexDirection: "column",
  },
  "& .Mui-completed > span": {
    borderColor: "#209B00",
  },
}));

export const StepKey = styled(Step)(() => ({
  color: "#209B00",
  ".Mui-completed >span": {
    borderColor: "#209B00",
  },
  "& .MuiStepConnector-root": {
    left: "calc(-50% + 12px)",
    right: "calc(50% + 12px)",
  },
  "& .MuiStepLabel-root": {
    padding: 0,
  },
  "&.MuiStepConnector-root > span": {
    borderColor: "green",
  },
  "& > span > span > .MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
    color: "white !important",
  },
  "& .MuiStepLabel-iconContainer": {
    borderRadius: "50%",
    "& .MuiSvgIcon-root.Mui-completed": {
      borderRadius: "50%",
      border: "2px solid #209B00",
      color: "white !important",
      backgroundColor: "#209B00",
      "& .MuiStepConnector-line": {
        borderColor: "#209B00",
      },
    },
    "& .MuiSvgIcon-root.Mui-active": {
      color: "white",
      border: "2px solid #A7A5A6",
      borderRadius: "50%",
    },
    "& svg": {
      color: "white",
      border: "2px solid #A7A5A6",
      borderRadius: "50%",
    },
    "& .MuiStepLabel-label.Mui-active": {
      color: "#7B7979",
    },
  },
  "& >span >span >svg >text": {
    fill: "#A7A5A6",
    fontWeight: "bold",
  },
}));

export const TrackLabel = styled(StepLabel)(() => ({}));

export const TrackButtonBox = styled(Box)(() => ({
  position: "absolute",
  right: "30px",
  bottom: "30px",
  "@media (max-width:600px)": {
    position: "unset",
    right: "unset",
    bottom: "none",
  },
}));
//purchase carousel
export const PurchaseTitleTypography = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "600",
  margin: "20px 0px 0px 0px",
  "@media (max-width:600px)": {
    fontSize: "12px",
    padding: "20px 0px 0px 10px",
  },
}));
export const MainBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  height: "190px",
}));
export const TextTypography = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "14px",
  color: "#231F20",
  padding: "11px 11px 0px 12px",
  overflow: "hidden",
  display: "-webkit-box",
  "-webkitLineClamp": "2",
  "-webkitBoxOrient": "vertical",
}));
