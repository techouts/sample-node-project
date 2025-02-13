import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {styled} from "@mui/material";
import Box from "@mui/material/Box";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
    },
  },
  position: "fixed",
  left: "60%",
  height: "100%",
  overflow: "hidden",
  "@media (max-width: 1200px)": {
    left: "50%",
  },
  "@media (max-width: 900px)": {
    left: "40%",
  },
  "@media (max-width: 600px)": {
    left: "0%",
  },
}));
export const ButtonStyled = styled(Button)(({ disabled }: any) => ({
  "@media(max-width: 600px)": {
    width: "100%",
    margin: "25px 16px 0px 16px",
    fontSize: "11px",
    padding: "8px 50px",
  },
  color: "black",
  letterSpacing: "1px",
  lineHeight: "16.8px",
  fontWeight: "500",
  padding: "12px 50px",
  fontSize: "12px",
  marginTop: "15px",
  cursor: "pointer",
  border: "1px solid #DEA3B7",
  borderRadius: 0,
  opacity: disabled ? "0.7" : "",
  width: "80%",
}));
export const SnackBox = styled(Box)(() => ({
  "& .MuiSnackbar-root": {
    width: "80%",
    left: "5%",
    right: "0px",
    transform: "unset",
    position: "absloute",
    textAlign: "center",
    "@media (max-width:600px)": {
      "& .MuiSnackbar-root": {
        margin: "auto",
        top: "-20px !important",
      },
    },
  },
}));
