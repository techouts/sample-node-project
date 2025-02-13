import {styled } from "@mui/material";
import  Box from "@mui/material/Box";
import  Button from "@mui/material/Button";
import  Typography from "@mui/material/Typography";
import styledComponent from "@emotion/styled";
import { transientProps } from "../../utility/TransientProps";

export const MainBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "20px",
}));

export const TypographyTitle = styled(Typography)(() => ({
  color: "#AD184C",
  whiteSpace: "nowrap",
  fontWeight: "600",
  fontSize: "20px",
  "@media(max-width:600px)": {
    fontSize: "15px",
  },
}));

export const NumberTypo = styled(Typography)(() => ({
  color: "#231F20",
  fontWeight: "700",
  fontSize: "40px",
  "@media(max-width:600px)": {
    fontSize: "14px",
  },
}));

export const TitleTextTypo = styled(Typography)(() => ({
  color: "#231F20",
  fontWeight: "700",
  fontSize: "28px",
  "@media(max-width:600px)": {
    fontSize: "14px",
  },
}));

export const VariantTextTypo = styled(
  Typography,
  transientProps
)<{ $bgcolor?: any; $textColor: any }>(({ $bgcolor, $textColor }) => ({
  fontWeight: "700",
  fontSize: "20px",
  opacity: "0.8",
  padding: "9px",
  color: $textColor,
  backgroundColor: $bgcolor,
  "@media(max-width:600px)": {
    fontSize: "12px",
    padding: "3px",
  },
}));
export const ButtonText = styled(Button)(() => ({
  fontWeight: "600",
  fontSize: "16px",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "14px",
  },
}));

export const ButtonBox = styled(Box)(() => ({
  backgroundColor: "#DEA3B7",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  width: "340px",
  height: "64px",
  "@media(max-width:600px)": {
    width: "256px",
    height: "54px",
  },
}));

export const BackgroundImage = styledComponent.img`
  width: 100%;
  display:flex;
  height:350px;
  @media screen and (max-width: 600px){
    height: 140px
  }
`;

export const StyledImage = styledComponent.img`
  width: 100%;
  display:flex;
  max-height:270px;
  border: ${(props: { isImageSelected: string }) =>
    props.isImageSelected ?? "0px"};
  @media screen and (max-width: 600px){
    min-height: 116px
  }
`;

export const TickIcon = styledComponent.img`
  position:absolute;
  height:16.5px;
  right:-6px;
  top:-6px;
  @media screen and (max-width: 600px){
    height: 12.5px;
    right:-4px;
    top:-3px;
  }
`;
