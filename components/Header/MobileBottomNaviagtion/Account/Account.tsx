import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  ButtonStyled,
  FooterCopyRightsTitle,
  FooterCopyRights,
  ButtonWrapper,
} from "./styles";
import { UserAccount } from "./UserAccount";
import { LOGIN_TEXT, LOOUT_TEXT } from "../../Constants";
import Logout from "../../../../utility/LogoutUtility";
interface AccountInterface {
  components: any[];
  footerCopyRights: { title: string };
  setSignOpen: Function;
  accessToken: any;
  setLoader: Function;
}

export default function Account({
  components,
  footerCopyRights,
  setSignOpen,
  accessToken,
  setLoader,
}: AccountInterface) {
  const {
    title,
    manageProfileTitle,
    quickActions,
    profileItems,
    bottomLinks,
    nonLoggedInTitle,
    ctaText,
    items,
  } = components[0];
  const [isLogout, setLogout] = useState(false);
  return (
    <Box width="100%">
      {isLogout && <Logout />}
      {/* Sign in buttom for non-login user */}
      {!accessToken && (
        <ButtonWrapper mt={1} $isSignedin={false}>
          <ButtonStyled
            $isSignedin={false}
            onClick={() => {
              setSignOpen(true);
            }}>
            {LOGIN_TEXT}
          </ButtonStyled>
        </ButtonWrapper>
      )}
      <Box>
        <UserAccount
          bottomLinks={bottomLinks}
          profileItems={profileItems}
          quickActions={quickActions}
          manageProfileTitle={manageProfileTitle}
          title={title}
          nonLoggedInTitle={nonLoggedInTitle}
          ctaText={ctaText}
          items={items}
          accessToken={accessToken}
        />
      </Box>
      <ButtonWrapper $isSignedin={true}>
        {footerCopyRights && (
          <FooterCopyRights direction={"column"}>
            <FooterCopyRightsTitle>
              {footerCopyRights?.title}
            </FooterCopyRightsTitle>
          </FooterCopyRights>
        )}
        {/* Logout buttom for login user */}
        {accessToken && (
          <ButtonStyled
            $isSignedin={true}
            onClick={() => {
              setLoader(true);
              setLogout(true);
            }}
          >
            {LOOUT_TEXT}
          </ButtonStyled>
        )}
      </ButtonWrapper>
    </Box>
  );
}
