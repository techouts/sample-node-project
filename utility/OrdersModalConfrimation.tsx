import React from "react";
import {
  ButtonBoxs,
  CancelTypography,
  ConfirmTypography,
  ModaldataBox,
  TitledataTypography,
} from "../components/MyOrders/OrderDetails/OrderDetailsStyles";
import { useMobileCheck } from "./isMobile";
type ModalProps = {
  title: string;
  onHandleClick: Function;
  onOrderHandleClose: Function;
};
export const OrdersModalConfirmation = ({
  title,
  onHandleClick,
  onOrderHandleClose,
}: ModalProps) => {
  const isMobile = useMobileCheck();

  return (
    <>
      <ModaldataBox $isMobile={isMobile}>
        <TitledataTypography $isMobile={isMobile}>{title}</TitledataTypography>
        <ButtonBoxs $isMobile={isMobile}>
          <ConfirmTypography
            $isMobile={isMobile}
            onClick={() => [onHandleClick(), onOrderHandleClose()]}
          >
            YES
          </ConfirmTypography>
          <CancelTypography
            $isMobile={isMobile}
            onClick={() => onOrderHandleClose()}
          >
            NO
          </CancelTypography>
        </ButtonBoxs>
      </ModaldataBox>
    </>
  );
};
