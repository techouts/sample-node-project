import React, { Fragment, useState } from "react";
import {
  AddressTabsBox,
  AddressTypography,
  EditStack,
  EditTypography,
  NameTypography,
  PhoneTypography,
  PrimaryBox,
  PrimaryBoxOne,
  RemoveStack,
  RemoveTypography,
  AddressBottom,
  SecondaryBoxOne,
  TabsTypography,
} from "./AddressComponentStyled";
import { Stack } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";
import { deleteAddress } from "../../api/Account/UserAddress";
import EditAddress from "../Address/EditAddress/EditAddress";
import Modal from "../../HOC/Modal/ModalBlock";
import { DeleteCard } from "./DeleteDialog";
import { REMOVE_TEXT, EDIT_TEXT } from "../../utility/Constants";
import { GetCartAddresses } from "../../utility/CartServiceability";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { AppIcons } from "../../utility/AppIconsConstant";
import { DELETE_ICON, EDIT_PINK_ICON } from "../../utility/AppIcons";

const AddressComponent = ({
  address,
  editVisible,
  setLoader,
  handleSnackBar,
  handleErrorAlert,
  setCartStore,
}: any) => {
  const isMobile = useMobileCheck();
  const CMSImageUrl = process.env.NEXT_PUBLIC_S3_URL;
  const Images = {
    editSource: `${CMSImageUrl}/address_edit_bcfaa5290e.png`,
    removeSource: `${CMSImageUrl}/trash_4a54e69428.png`,
  };
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [typeOfAction, setTypeOfAction] = useState<any>();
  const addAddressHandler = () => setModal(true);

  const modalHandleClose = () => {
    setModal(false);
    setModalData(null);
  };
  const modalHandleOpen = (option: any) => {
    setModal(true);
    setModalData(option);
    setTypeOfAction(EDIT_TEXT);
  };

  const handleRemoveAddress = (addressId: any) => {
    setLoader(true);
    const getRes = async () => {
      const res = await deleteAddress(addressId);
      {
        res?.data?.deleteCustomerAddress
          ? handleSnackBar("Address Deleted")
          : handleErrorAlert("Failed to delete the address!");
        !res && setLoader(false);
      }
      await GetCartAddresses(setCartStore);
      setLoader(false);
    };
    getRes();
    setModal(false);
  };

  const handleUpdateAddress = () => {
    const updateAddress = async () => {
      await GetCartAddresses(setCartStore);
      setLoader(false);
      handleSnackBar("Address Updated");
    };
    updateAddress();
  };

  const Delete_icon = AppIcons(DELETE_ICON);
  const EditIcon_PinkColour = AppIcons(EDIT_PINK_ICON);
  return (
    <Fragment>
      <Stack direction="column">
        {address && (
          <PrimaryBox>
            {address?.default_billing && (
              <PrimaryBoxOne>
                <AddressTabsBox>
                  <TabsTypography isMobile={isMobile}>Default</TabsTypography>
                </AddressTabsBox>
              </PrimaryBoxOne>
            )}
            {address?.save_as && (
              <PrimaryBoxOne>
                <AddressTabsBox key={1}>
                  <TabsTypography isMobile={isMobile}>
                    {address?.save_as}
                  </TabsTypography>
                </AddressTabsBox>
              </PrimaryBoxOne>
            )}
            {address?.city && (
              <PrimaryBoxOne>
                <AddressTabsBox key={1}>
                  <TabsTypography isMobile={isMobile}>
                    {address?.city}
                  </TabsTypography>
                </AddressTabsBox>
              </PrimaryBoxOne>
            )}
          </PrimaryBox>
        )}

        <Stack direction="column">
          <NameTypography isMobile={isMobile}>
            {address?.firstname} {address?.lastname}
          </NameTypography>
          <Stack
            direction="column"
            sx={{ paddingTop: isMobile ? "14px" : "8px" }}
          >
            <AddressTypography isMobile={isMobile}>
              {address?.street[0]}
            </AddressTypography>
            <AddressTypography isMobile={isMobile}>
              {address?.region?.region} - {address?.postcode}
            </AddressTypography>
            {isMobile && (
              <PhoneTypography isMobile={isMobile}>
                {address?.telephone}
              </PhoneTypography>
            )}
          </Stack>
        </Stack>
      </Stack>
      <AddressBottom>
        {!isMobile && !editVisible && (
          <>
            <PhoneTypography isMobile={isMobile}>
              {address?.telephone}
            </PhoneTypography>
            <SecondaryBoxOne>
              <EditStack direction="row" isMobile={isMobile}>
                <img
                  src={`${ReplaceImage(EditIcon_PinkColour?.url)}`}
                  alt="edit icon"
                />
                <EditTypography
                  isMobile={isMobile}
                  onClick={() => {
                    modalHandleOpen(address);
                  }}
                >
                  {EDIT_TEXT}
                </EditTypography>
              </EditStack>
              {!address?.default_billing && (
                <RemoveStack
                  direction="row"
                  isMobile={isMobile}
                  onClick={() => {
                    setTypeOfAction(REMOVE_TEXT);
                    setModalData(address.id);
                    setModal(true);
                  }}
                >
                  <img
                    src={`${ReplaceImage(Delete_icon?.url)}`}
                    alt="edit icon0"
                    height="16px"
                    width={"16px"}
                  />
                  <RemoveTypography isMobile={isMobile}>
                    {REMOVE_TEXT}
                  </RemoveTypography>
                </RemoveStack>
              )}
            </SecondaryBoxOne>
          </>
        )}
      </AddressBottom>

      {isMobile && !editVisible && (
        <SecondaryBoxOne sx={{ float: isMobile ? "right" : "none" }}>
          <EditStack direction="row" isMobile={isMobile}>
            <img src={`${ReplaceImage(Images?.editSource)}`} alt="edit icon" />
            <EditTypography
              isMobile={isMobile}
              onClick={() => modalHandleOpen(address)}
            >
              {EDIT_TEXT}
            </EditTypography>
          </EditStack>
          {!address?.default_billing && (
            <RemoveStack
              direction="row"
              isMobile={isMobile}
              onClick={() => {
                setTypeOfAction(REMOVE_TEXT);
                setModalData(address.id);
                setModal(true);
              }}
            >
              <img
                src={`${ReplaceImage(Delete_icon?.url)}`}
                alt="delete icon"
                width={"16px"}
              />
              <RemoveTypography isMobile={isMobile}>
                {REMOVE_TEXT}
              </RemoveTypography>
            </RemoveStack>
          )}
        </SecondaryBoxOne>
      )}

      <Modal
        padding={isMobile ? "0 16px" : ""}
        open={modal}
        height={
          typeOfAction === EDIT_TEXT
            ? isMobile
              ? "100%"
              : "80%"
            : isMobile
            ? "auto"
            : "260px"
        }
        width={
          typeOfAction === EDIT_TEXT
            ? isMobile
              ? "100%"
              : "50%"
            : isMobile
            ? "100%"
            : "570px"
        }
        overflowData="auto"
        handleOpen={addAddressHandler}
        handleClose={modalHandleClose}
        top={"50%"}
        left={"50%"}
        Component={
          typeOfAction === EDIT_TEXT ? (
            <EditAddress
              toggleUpdated={handleUpdateAddress}
              editingData={modalData}
              edithandleClose={modalHandleClose}
              showLoader={setLoader}
              handleSnackBar={handleSnackBar}
              handleErrorAlert={handleErrorAlert}
              currentPage="info"
              isFromCart={true}
            />
          ) : (
            <DeleteCard
              deleteData={modalData}
              deletehandleClose={setModal}
              deleteAddressHandler={handleRemoveAddress}
              handleSnackBar={handleSnackBar}
              address={address}
            />
          )
        }
      ></Modal>
    </Fragment>
  );
};

export default AddressComponent;
