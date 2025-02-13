import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { transientProps } from "../../utility/TransientProps";

interface Response {
  isSignUp?: boolean;
  isMobile: boolean;
}
export const MainBox = styled(Box)(({ isMobile }: Response) => ({
  padding: isMobile ? "" : "26px 0px",
  backgroundColor: "white",
  marginLeft: isMobile ? "" : "26px",
}));
export const SignInBox = styled(Box)(({ isMobile }: Response) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: "#F7F6F9",
  padding: isMobile ? "0 16px 0 16px" : "",
}));
export const SubTitleBox = styled(Box)(() => ({
  maxWidth: "511px",
  display: "flex",
  justifyContent: "center",
}));
export const ContentWrapper = styled(Typography)(() => ({
  textAlign: "center",
  width: "100%",
}));

export const TitleTypography = styled(Typography)(() => ({
  color: "#AD184C",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "24px",
  lineHeight: "140%",
  marginTop: "40px",
}));

export const SubTitleTypography = styled(Typography)(() => ({
  "@media (max-width: 600px)": {
    fontSize: "12px",
    marginTop: "25px",
    lineHeight: "150%",
  },
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "24px",
  lineHeight: "150%",
  color: " #231F20",
  marginTop: "30px",
}));

export const LoginButtons = styled(
  Button,
  transientProps
)<{ $isFirst: boolean }>(({ $isFirst }) => ({
  "@media (max-width: 600px)": {
    width: "143px",
    height: "28px",
    marginBottom: "25px",
  },
  "&:hover": {
    backgroundColor: $isFirst ? "#231F20" : "#DEA3B7",
    color: $isFirst ? "#FFFFFF" : "#231F20",
  },
  backgroundColor: $isFirst ? "#231F20" : "#DEA3B7",
  color: $isFirst ? "#FFFFFF" : "#231F20",
  fontSize: "12px",
  borderRadius: "0px",
  width: $isFirst ? "98px" : "107px",
  height: $isFirst ? "44px" : "44px",
  marginBottom: "50px",
}));

export const SubmitButton = styled(Button)(() => ({
  "&:hover": {
    backgroundColor: "#231F20",
    color: "#FFFFFF",
  },
  backgroundColor: "#231F20",
  color: "#FFFFFF",
  borderRadius: "0px",
}));

export const ButtonsBox = styled(Box)(({ isMobile }: Response) => ({
  display: "flex",
  justifyContent: "center",
  columnGap: "10px",
  // paddingTop:"30px"
  marginTop: isMobile ? "25px" : "36px",
}));

export const TextFieldStyled = styled(TextField)(() => ({
  "@media (max-width: 600px)": {
    width: "90px",
    paddingRight: "3%",
  },
  textlignLast: "center",
  marginBottom: "2%",
  width: "160px",
  paddingRight: "3%",
}));
