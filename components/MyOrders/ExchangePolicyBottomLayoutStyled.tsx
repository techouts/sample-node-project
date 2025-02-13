import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const ExchangeAndReturnPolicyTypography = styled(Typography)(() => ({
  fontWeight: "400",
  marginTop: "2px",
  fontSize: "16px",
  color: " #AD184C",
  paddingLeft: "10px",
  cursor: "pointer",
  textDecoration: " underline",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));

export const PhoneTypography = styled(Typography)(() => ({
  fontWeight: "400",
  marginTop: "2px",
  fontSize: "16px",
  color: " #AD184C",
  paddingBottom: "30px",
  cursor: "pointer",
  textDecoration: " underline",
  "@media (max-width:600px)": {
    paddingBottom: "25px",
    fontWeight: "400",
    fontSize: "12px",
  },
}));
export const ButtonStyled = styled(Button)((disable: any) => ({
  borderRadius: 0,
  fontSize: "12px",
  padding: "12px",
  width: "325px",
  height: "55px",
  backgroundColor: " #DEA3B7",
  color: " #231F20",
  "&:hover": {
    backgroundColor: " #DEA3B7",
  },
  "@media(max-width:600px)": {
    flexWrap: "wrap",
    whiteSpace: "nowrap",
    height: "28px",
    fontSize: "11px",
    padding: "0px",
  },
}));
