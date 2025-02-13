import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";

export const ButtonTypography = styled(Typography)(
  ({ selectedlabel, buttonLabel }: any) => ({
    width: "auto",
    minHeight: "45px",
    minWidth: "175px",
    display: "flex",
    padding: "0px 10px",
    justifyContent: "center",
    alignItems: "center",
    background: "#F8EDF1",
    cursor: "pointer",
    border: `${selectedlabel == buttonLabel && "1px solid #CE7494"} `,
    "@media (max-width:600px)": {
      minWidth: "125px",
      fontSize: "11px",
      minHeight: "35px",
      width: "48%",
      textAlign: "center",
    },
  })
);
export const TitleTypography = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "500",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const CourierTypography = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "500",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const ButtonBox = styled(Box)(() => ({
  display: "flex",
  gridGap: "20px",
  flexWrap: "wrap",
  "@media (max-width:600px)": {
    flexWrap: "wrap",
    gridGap: "10px",
  },
}));
export const QueryTypography = styled(Typography)(() => ({
  paddingBottom: "12px",
  fontSize: "16px",
  fontWeight: "500",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const RatingTypography = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "500",
  textTransform: "capitalize",
  paddingBottom: "10px",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const RatingStack = styled(Stack)(() => ({
  "@media (max-width:600px)": {
    marginTop: "10px !important",
  },
}));
export const TitleTextTypography = styled(Typography)(() => ({
  paddingBottom: "9px",
  fontSize: "16px",
  fontWeight: "500",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const DescriptionTextField = styled(TextField)(() => ({
  "& textarea": {
    "@media (max-width:600px)": {
      fontSize: "11px",
      color: "#231F20",
    },
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "0",
    "@media (max-width:600px)": {
      padding: "10px",
    },
  },
}));
export const SubmitButton = styled(Button)(() => ({
  paddingTop: "10px",
  float: "right",
  minWidth: "104px",
  minHeight: "43px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  backgroundColor: "#231F20",
  color: "#DEA3B7",
  borderRadius: "0",
  letterSpacing: "1px",
  fontSize: "12px",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#231F20",
  },
  "@media (max-width:600px)": {
    width: "100%",
    minHeight: "28px",
  },
  ":disabled": {
    backgroundColor: "silver",
    opacity: 0.5,
  },
}));
