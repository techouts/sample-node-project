import React, { useState } from "react";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { useMobileCheck } from "../../utility/isMobile";
import EditAddress from "../Address/EditAddress/EditAddress";
import { ADD_NEW_ADDRESS } from "../../utility/Constants";
import { AddNewAddressButton } from "./PrimaryComponentStyled";
import { useRecoilState } from "recoil";
import { cartState } from "../../recoilstore";
import { GetCartAddresses } from "../../utility/CartServiceability";
import triggerGAEvent from "../../utility/GaEvents";
import { addaddress, widgetaddress } from "../../utility/GAConstants";

export function AddNewBillingAddress({
  setLoader,
  handleErrorAlert,
  handleSnackBar,
}: any) {
  const [addressModal, setIsAddressModal] = useState(false);
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const isMobile = useMobileCheck();
  const handleNewAddress = () => {
    setIsAddressModal(true);
  };
  const handleNewAddressClose = () => {
    setIsAddressModal(false);
  };

  const handleToggle = () => {
    const updateAddress = async () => {
      await GetCartAddresses(setCartStore);
      setLoader(false);
      handleSnackBar("Address added");
    };
    updateAddress();
  };
  const callEvent = (linktext: string) => {
    triggerGAEvent(
      {
        widget_title:"Select Delivery Address",
        widget_type:widgetaddress,
        item_type:"Default/Home/Work",
        event_type:addaddress,
        link_url:"na",
        link_text:linktext,
      },
      "click"
    );
  };
  return (
    <>
      <AddNewAddressButton
        onClick={() => {
          handleNewAddress();
          callEvent(ADD_NEW_ADDRESS);
        }}
        $isMobile={isMobile}
      >
        {`+ ${ADD_NEW_ADDRESS}`}
      </AddNewAddressButton>
      <BasicModal
        height={isMobile ? "100%" : "80%"}
        width={isMobile ? "100%" : "50%"}
        top="50%"
        left="50%"
        overflowData="scroll"
        handleOpen={handleNewAddress}
        handleClose={handleNewAddressClose}
        open={addressModal}
        Component={
          <EditAddress
            toggleUpdated={handleToggle}
            editingData={null}
            edithandleClose={handleNewAddressClose}
            showLoader={setLoader}
            handleErrorAlert={handleErrorAlert}
            currentPage="info"
            isFromCart = {true}
          />
        }
      />
    </>
  );
}
