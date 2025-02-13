import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import styledComponent from "@emotion/styled";
import styled from "@emotion/styled";
import SignInComponentInterface from "../../../schemas/SignIn/SignIn";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { useMobileCheck } from "../../../utility/isMobile";

const HelpText = styled(Typography)(() => ({
  float: "left",
}));
const BottomImage = styledComponent.img`
width : 75%;
height: 100%;
padding-top: 0px;


@media(max-width:600px){
  width:70%;

}
`;

const HelpTextBox = styled(Box)(() => ({
  position: "absolute",
  bottom: "50px",
  marginLeft: "0px",
  right: "-60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@media (max-width:600px)": {
    bottom: "20px",
  },
}));

const HelpImage = styledComponent.img(() => ({
  width: "30px",
  height: "20px",
  float: "left",
  paddingRight: "10px",
}));

const MainStack = styled(Stack)(() => ({
  alignItems: "center",
  justifyContent: "center",
  "@media (max-width:600px)": {
    alignItems: "center",
    justifyContent: "center",
  },
}));

const BottomImageLayout = (props: SignInComponentInterface) => {
  const {
    data,
  } = props;

  const isMobile = useMobileCheck();
  return (
    <React.Fragment>
      <MainStack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <BottomImage
          src={`${ReplaceImage(data?.ImageUrl)}`}
          alt="social-icon"
        />
      </MainStack>
    </React.Fragment>
  );
};

export default BottomImageLayout;
