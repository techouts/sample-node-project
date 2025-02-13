import React from "react";
import { Box, Grid } from "@mui/material";
import { TabBox } from "../FirstTierCitizen/CardTierStyle";
import { useMobileCheck } from "../../utility/isMobile";
import {
  ScrollButton,
  FirstCitizenImage,
  NavBannerTitle,
  NavBannerSubtitle,
  NavtitleBox,
  NavTitleintro,
  TitlesBox,
} from "./NavBannerTierStyles";
const NavBannerTier = ({
  navTitle,
  navImgUrl,
  items,
  fcLogo,
  fcNacInnerTitle,
  fcNavInnerSubTitle,
}: any) => {
  const isMobile = useMobileCheck();
  return (
    <Box>
      <NavtitleBox isMobile={isMobile}>
        <NavTitleintro isMobile={isMobile}>{navTitle}</NavTitleintro>
      </NavtitleBox>
      <TabBox isMobile={isMobile}>
        {items?.map((button: any) => (
          <ScrollButton
            isMobile={isMobile}
            key={button?.title}
            onClick={() => {
              let cardTierElement: any = document.getElementById(button?.tier);
              cardTierElement &&
                cardTierElement.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "start",
                });
              cardTierElement.scrollIntoView(true);
              let scrolledY = window.scrollY;
              if (scrolledY) {
                window.scroll(0, scrolledY - 100);
              }
            }}
          >
            {button?.title}
          </ScrollButton>
        ))}
      </TabBox>
      <Grid
        container
        p={isMobile ? "25px 16px 53px 16px" : "30px 38px 37px 57px"}
        sx={{ backgroundColor: "#F7F6F9", gridGap: "20px" }}
      >
        <Grid item xs={12} md={4.5} sm={4.5} lg={4.5}>
          <FirstCitizenImage isMobile={isMobile}>
            <Box sx={{ marginTop: isMobile ? "10px" : "47px" }}>
              <img src={fcLogo} alt="first-citizen-image" />
            </Box>
            <TitlesBox>
              <NavBannerTitle isMobile={isMobile}>
                {fcNacInnerTitle}
              </NavBannerTitle>
              <NavBannerSubtitle isMobile={isMobile}>
                {fcNavInnerSubTitle}
              </NavBannerSubtitle>
            </TitlesBox>
          </FirstCitizenImage>
        </Grid>
        <Grid item xs={12} sm={7} md={7} lg={7}>
          <Box sx={{ maxWidth: "490px" }}>
            <img width={"100%"} src={navImgUrl} alt="cards-image" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NavBannerTier;
