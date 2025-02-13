import Box from "@mui/material/Box";
import React from "react";
import RefereAndEarnInterface from "../../../../schemas/RefereAndEarnMobile";
import { useMobileCheck } from "../../../../utility/isMobile";
import {
  BoxStyled,
  StyledBox,
  ButtonStyled,
  TypographyStyled,
  MainBox,
  SubTitleBox,
  CopyImgBox,
  BarCodeBox,
} from "./RefereAndEarnStyled";
import { ReplaceImage } from "../../../../utility/ReplaceImage";

export const RefereAndEarn = (referEarnData: RefereAndEarnInterface) => {
  const isMobile = useMobileCheck();
  return (
    <Box>
      {isMobile && (
        <MainBox>
          <BoxStyled>{referEarnData.Invite}</BoxStyled>
          <Box>
            <img alt={"icon"} src={referEarnData.img} width={"100%"} />
          </Box>
          <SubTitleBox>{referEarnData.ShareCode}</SubTitleBox>
          <StyledBox>
            <BarCodeBox>{referEarnData.BarCode}</BarCodeBox>
            <CopyImgBox>
              <>
                <img
                  alt={"copy-image"}
                  src={ReplaceImage(referEarnData?.CopyImg)}
                />
              </>
              <>{referEarnData.CopyCode}</>
            </CopyImgBox>
          </StyledBox>
          <ButtonStyled>{referEarnData.SendInvite}</ButtonStyled>
          <TypographyStyled>{referEarnData.ViewReferals}</TypographyStyled>
        </MainBox>
      )}
    </Box>
  );
};
