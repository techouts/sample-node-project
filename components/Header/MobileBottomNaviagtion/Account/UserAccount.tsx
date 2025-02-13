import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import UserAccountInterface from "../../../../schemas/UserAccountMobile";
import {
  Header,
  QuickActionsWrapper,
  QuickActions,
  ProfileItemsWrapper,
  ArrowImageWrapper,
  Content,
  ContentTitle,
  ContentDescription,
  BenefitsWrapperBox,
  Benefits,
  BenefitsIcon,
  BenefitsTitle,
} from "./styles";
import { ReplaceImage } from "../../../../utility/ReplaceImage";
import { ArrowImage } from "../../Constants";
import Loader from "../../../../HOC/Loader/Loader";

export const UserAccount = ({
  title,
  manageProfileTitle,
  nonLoggedInTitle,
  ctaText,
  quickActions,
  profileItems,
  items,
  accessToken,
  bottomLinks,
}: UserAccountInterface) => {
  const router = useRouter();
  const [displayLoader, setLoader] = useState(false);
  const [profileData, setProfileData] = useState(profileItems);
  useEffect(() => {
    const newBenefits = profileItems?.filter((item) => {
      return !item.loggedIn || (accessToken ? item.loggedIn : !item.loggedIn);
    });
    setProfileData(newBenefits);
  }, [accessToken, profileItems]);
  const handleClick = (path: string) => {
    window.location.assign(`${window.location.origin}${path}`);
    setLoader(true);
  };
  return (
    <Box width="100%">
      {displayLoader && <Loader />}
      <Box>
        <Header>{accessToken ? title : nonLoggedInTitle}</Header>
        {accessToken ? (
          <QuickActionsWrapper>
            {quickActions?.map((actionItem, index: any) => {
              return (
                <QuickActions
                  key={index}
                  onClick={() => handleClick(actionItem?.titlePath)}
                >
                  {actionItem?.title}
                </QuickActions>
              );
            })}
          </QuickActionsWrapper>
        ) : (
          <BenefitsWrapperBox>
            {items?.map((benefit, index: any) => {
              return (
                <Benefits key={index}>
                  <BenefitsIcon
                    src={ReplaceImage(benefit?.icon)}
                    alt={"benefits-icon"}
                  />
                  <BenefitsTitle> {benefit?.text}</BenefitsTitle>
                </Benefits>
              );
            })}
          </BenefitsWrapperBox>
        )}
        <Box>
          <Header>{accessToken ? manageProfileTitle : ctaText}</Header>
          <ProfileItemsWrapper>
            {profileData?.map((item, index) => {
              return (
                <Content
                  key={index}
                  $index={index}
                  onClick={() => {
                    if (item.title?.toLowerCase()?.includes("first citizen")) {
                      handleClick(
                        accessToken
                          ? "/account/first-citizen"
                          : "/miscs/first-citizen"
                      );
                    } else {
                      handleClick(item?.path);
                    }
                  }}
                >
                  <Box>
                    <ContentTitle>{item?.title}</ContentTitle>
                    <ContentDescription>{item?.subTitle}</ContentDescription>
                  </Box>
                  <ArrowImageWrapper>
                    <img alt="arrow" src={ReplaceImage(ArrowImage)} />
                  </ArrowImageWrapper>
                </Content>
              );
            })}
          </ProfileItemsWrapper>
          <Box sx={{ margin: "0px 16px", paddingTop: "16px" }}>
            {bottomLinks?.map((item: any) => {
              return (
                <Grid
                  sx={{
                    fontSize: "12px",
                    paddingBottom: "16px",
                    cursor: "pointer",
                    color: "#7B7979",
                    lineHeight: "16px",
                  }}
                  onClick={() => router.push(item?.titlePath)}
                >
                  {item?.title}
                </Grid>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
