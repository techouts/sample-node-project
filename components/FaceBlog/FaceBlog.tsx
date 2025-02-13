import React from "react";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  MainBox,
  ImageCard,
  MCardMedia,
  TitleTypography,
  SubtTypography,
  ReadTypography,
  CardActionsMore,
  ViewTextTypography,
  StackView,
  BoxView,
  StackText,
  FirstStack,
  StackMore,
  ShareTextTypography,
  TCardContent,
  EyeOutlinedIcon,
  ShareIcon,
} from "./FaceBlogStyle";
const FaceBlog = ({ items }: any) => {
  const isMobile = useMobileCheck();
  const View = ({ viewtext }: any) => {
    return (
      <>
        <EyeOutlinedIcon />
        <ViewTextTypography>
          {viewtext}
          {!isMobile && <span>Views</span>}
        </ViewTextTypography>
      </>
    );
  };
  return (
    <>
      <MainBox>
        {items?.map((blogitem: any, index: any) => (
          <ImageCard key={index}>
            <MCardMedia>
              <img
                alt="Card Image"
                src={`${ReplaceImage(blogitem?.imageUrl)}`}
                width="100%"
              />
              {isMobile && (
                <BoxView>
                  <StackView>
                    <View viewtext={blogitem?.viewText}></View>
                  </StackView>
                </BoxView>
              )}
            </MCardMedia>

            <TCardContent>
              <TitleTypography>{blogitem?.title}</TitleTypography>
              {!isMobile && (
                <SubtTypography>{blogitem?.subTitle}</SubtTypography>
              )}
            </TCardContent>
            <StackMore>
              <ReadTypography>{blogitem?.readMoreText}</ReadTypography>
              {isMobile && <ShareIcon />}
            </StackMore>
            {!isMobile && (
              <CardActionsMore>
                <StackText>
                  <View viewtext={blogitem?.viewText}></View>
                </StackText>
                <FirstStack>
                  <ShareIcon />
                  <ShareTextTypography>
                    {blogitem?.shareText}
                  </ShareTextTypography>
                </FirstStack>
              </CardActionsMore>
            )}
          </ImageCard>
        ))}
      </MainBox>
    </>
  );
};

export default FaceBlog;
