import { Button, Typography, styled, Box } from "@mui/material";

export const DateText = styled(Typography)(() => ({
  fontWeight: "800",
  fontSize: "16px !important",
  color: "#303030",
  padding: "20px 12px 4px 13px",
  "@media screen and (max-width: 600px)": {
    fontSize: "16px",
    padding: "20px 12px 4px 13px",
  },
}));

export const ErrorText = styled(Typography)(() => ({
  color: "red",
  fontSize: "10px",
  fontWeight: "500",
  paddingLeft: "20px",
}));

export const FromBox = styled(Box)(() => ({}));

export const ConfirmButton = styled(Button)( ({ disabled }: any) => ({
  fontWeight: "600",
  fontSize: "12px",
  color: "white",
  background: "#231F20",
  padding: "7px 12px 7px 12px",
  opacity: disabled ? "0.7" : "",
  ":hover": {
    backgroundColor: "black",
    color: "white",
  },
  "@media screen and (max-width: 600px)": {
    marginTop: "10px",
    marginLeft: "0px",
    padding: "15px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight:700
  },
}));

export const CancelButton = styled(Button)(() => ({
  fontWeight: "600",
  fontSize: "12px",
  color: "#303030",
  backgroundColor: "white",
  padding: "4px 12px 4px 12px",
  marginLeft: "15px",
  border: "0.5px solid black",
  borderRadius: "2px",
  minHeight: "90%",
  "@media screen and (max-width: 600px)": {
    marginTop: "10px",
    marginLeft: "0px",
    padding: "15px",
    borderRadius: "8px",
    fontWeight: "800",
   fontSize: "12px",
  },
}));
export const MainConfirmBox = styled(Box)(() => ({
  "@media screen and (max-width: 600px)": {
   display: "flex",
   flexDirection: "column",
  },
}));
