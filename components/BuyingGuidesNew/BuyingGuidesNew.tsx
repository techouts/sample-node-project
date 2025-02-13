import * as React from "react";
import { Box } from "@mui/material";
import BuyingGuidesNewInterface from "../../schemas/BuyingCardSchema";
import {
  HeadingTypography,
  BuyingGuidesBox,
  MainBox,
  ShopButton,
  ButtonBox,
  SubTypography,
  TitleTypography,
  TextBox,
  GradientBox,
} from "./BuyingGuidesNewStyle";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";

function BuyingGuidesNew({ data }: BuyingGuidesNewInterface) {
  const isMobile = useMobileCheck();

  return (
    <>
      <HeadingTypography>{data.title}</HeadingTypography>
      <BuyingGuidesBox display={"flex"}>
        {data?.items?.map((item, index) => (
          <MainBox key={index}>
            <Box>
              <img
                alt="imagetext"
                src={ReplaceImage(item?.imageUrl)}
                width="100%"
                height="100%"
              />
              <GradientBox />
              <TextBox>
                <TitleTypography>{item?.title}</TitleTypography>
                <SubTypography>{item.subTitle}</SubTypography>
              </TextBox>
            </Box>
          </MainBox>
        ))}
      </BuyingGuidesBox>
      <ButtonBox>
        <ShopButton>Shop All Lipsticks</ShopButton>
      </ButtonBox>
    </>
  );
}

export default BuyingGuidesNew;
