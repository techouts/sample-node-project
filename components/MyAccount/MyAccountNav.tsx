import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  MainGrid,
  MainBox,
  ColoredText,
  SmallText,
  SelectBox,
  DynamicText,
  SelectedAccountSection,
} from "./MyAccountNavStyle";
import { useMobileCheck } from "../../utility/isMobile";
import AccountContentComponent from "./MyAccountSwitchTabs";
import Loader from "../../HOC/Loader/Loader";
import Logout from "../../utility/LogoutUtility";
import BackToTopButton from "../BackToTopBtn/BackToTopButton";

const MyAccountNav = (accountData: any) => {
  const isMobile = useMobileCheck();
  const [isLogout, setLogout] = useState(false);
  const [displayLoader, setLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    const name = accountData?.account?.items?.filter((dataItem: any) => {
      return dataItem?.selected === true;
    });
    setSelectedOption(name?.[0]?.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRouter = async (singleOption: any) => {
    setSelectedOption(singleOption?.title);
    if (singleOption?.identiier !== "logout") {
      window.location.assign(`${singleOption?.titlePath}`);
    } else {
      setLogout(true);
    }
  };

  return (
    <Grid sx={{ margin: "0 auto", maxWidth: "1440px" }}>
      {displayLoader && <Loader />}
      {isLogout && <Logout />}
      <MainBox>
        <ColoredText>My Account /</ColoredText>
        <SmallText>{selectedOption}</SmallText>
      </MainBox>
      <MainGrid container>
        {!isMobile && (
          <Grid item xs={12} sm={2.5} md={2.5} lg={2.5}>
            <Grid>
              <SelectedAccountSection variant="subtitle2">
                {selectedOption}
              </SelectedAccountSection>
            </Grid>
            <Box>
              {accountData?.account?.items?.map(
                (option: any, index: number) => (
                  <SelectBox key={index} onClick={() => handleRouter(option)}>
                    <DynamicText $isSelected={option?.title == selectedOption}>
                      {option?.title}
                    </DynamicText>
                  </SelectBox>
                )
              )}
            </Box>
          </Grid>
        )}
        <Grid item xs={12} sm={9.5} md={9.5} lg={9.5}>
          <AccountContentComponent components={accountData?.components} />
        </Grid>
      </MainGrid>
      <BackToTopButton />
    </Grid>
  );
};

export default MyAccountNav;
