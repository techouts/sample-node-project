import styled from "@emotion/styled";
import styledComponent from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
interface HighlightInterface {
  highlight: boolean;
}

export const PrimaryBox = styled(Box)(() => ({
  width: "100%",
  textAlign: "center",
  paddingTop: "99px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  "@media (max-width:600px)": {
    paddingTop: "94px",
  },
}));
export const ToastMessage = styled(Box)(() => ({
  width: "75%",
  fontSize: "14px",
  padding: "12px",
  margin: "30px auto",
  backgroundColor: "#F7F6F9",
  color: "#4F4C4D",
}));
export const Title = styled(Typography)(() => ({
  fontStyle: "normal ",
  fontWeight: "400",
  fontSize: "20px",
  textAlign: "center",
  letterSpacing: "0.15em",
  lineHeight: "24px",
}));
export const SmallTitle = styled(Typography)(() => ({
  fontStyle: "normal ",
  fontWeight: "400",
  fontSize: "16px",
  textAlign: "center",
}));
export const ButtonStyled = styled(Button)(() => ({
  padding: "14px",
  borderRadius: 0,
  backgroundColor: "#231F20",
  margin: "30px auto",
  minHeight: "16px",
  minWidth: "124px",
  color: "white",
  "&:hover": {
    backgroundColor: "#231F20",
  },
}));

export const ButtonTypography = styled(Typography)(() => ({
}));
export const TextFieldStyled = styled(TextField)(() => ({
  borderRadius: "unset",
}));
export const BoxStyled = styled(Box)(({ highlighted }: any) => ({
  paddingTop: `${highlighted && "30px"}`,
}));

export const StyledList = styledComponent.li<HighlightInterface>`


  // paddingLeft:70px;
    color: gray;
 
    ${(props) =>
      props?.highlight
        ? `
        color: black;
    `
        : `color: gray;`}
`;
