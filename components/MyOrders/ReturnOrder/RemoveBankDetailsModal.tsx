import React from "react";
import { useMobileCheck } from "../../../utility/isMobile";
import {
  ButtonBox,
  ButtonStyledSecondary,
  CancelText,
  RemoveBankDetailsContentBox,
  TextTypography,
  YesButton,
  YesText,
} from "./ReturnOrderStyled";
import {
  CANCEL_TEXT,
  REMOVE_BANK_ACCOUNT_DETAILS_TEXT,
  YES_TEXT,
} from "../constant";

const RemoveBankDetailsModal = (props: any) => {
  const { setIsRemoveModal, setTempBankDetails } = props;
  const isMobile = useMobileCheck();
  const handleYes = () => {
    setTempBankDetails();
    setIsRemoveModal(false);
  };
  const handleCancel = () => {
    setIsRemoveModal(false);
  };
  return (
    <RemoveBankDetailsContentBox>
      <TextTypography>{REMOVE_BANK_ACCOUNT_DETAILS_TEXT}</TextTypography>
      <ButtonBox isMobile={isMobile}>
        <YesButton onClick={handleYes}>
          <YesText>{YES_TEXT}</YesText>
        </YesButton>
        <ButtonStyledSecondary onClick={handleCancel}>
          <CancelText>{CANCEL_TEXT}</CancelText>
        </ButtonStyledSecondary>
      </ButtonBox>
    </RemoveBankDetailsContentBox>
  );
};

export default RemoveBankDetailsModal;
