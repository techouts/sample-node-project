import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Modal from "../../HOC/Modal/ModalBlock";
import { event_type, Widget_type } from "../../utility/GAConstants";
import {toast} from "../../utility/Toast";


import {
  TypographyPlace,
  Typographylogo,
  TypographyName,
  TypographyText,
  TypographyNumber,
  IconTypography,
  TitleTypography,
  AddTypography,
  ChildGrid,
  TypographyHead,
  TypographyHeader,
  MainGrid,
  TypographyAddText,
} from "./AddAddressStyle";
import client from "../../apollo-client";
import {
  deleteCustomerAddress,
} from "../../graphQLQueries/MyProfileQuery";
import { useMobileCheck } from "../../utility/isMobile";
import EditAddress from "./EditAddress/EditAddress";
import BasicModal from "../../HOC/Modal/ModalBlock";
import deleteDataJson from "./DeleteModal.json";
import DeleteModal from "./DeleteModal";
import Loader from "../../HOC/Loader/Loader";
import { DELETE_ADDRESS, EMPTY_ADDRESS_IMG } from "../Accounts/constants";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  ADDRESSES_TEXT,
  ADD_ADDRESS,
} from "../Profile/constant";
import { callEventMyProfile } from "../MyProfileLayout/MyprofileAnalytics";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  DELETE_ICON,
  ADD_ADDRESS_ICON,
  EDIT_IMAGE_ICON,
} from "../../utility/AppIcons";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddAddress = (props: any) => {
  const { addressdata, toggleUpdated, setSnackBarOpen, setSnackMessage } =
    props;
  const isMobile = useMobileCheck();
  const [editAdd, setEditAdd] = useState(false);
  const [editingData, setEditingData] = useState<any>();
  const [deleteData, setDeleteData] = useState(false);
  const [showLoader, setLoader] = useState(false);
  const [deleteOptionID, setDeleteOptionID] = useState<number>();

  const addAddressHandler = () => setEditAdd(true);
  const edithandleClose = () => {
    setEditAdd(false);
    setEditingData(null);
  };
  const edithandleOpenAdd = (option: any) => {
    setEditAdd(true);
    setEditingData(option);
    callEventMyProfile(event_type, Widget_type);
  };
  const deleteAddressHandler = (id: any) => {
    setLoader(true);
    client
      .mutate({
        mutation: deleteCustomerAddress,
        variables: {
          id: id,
        },
      })
      .then((res) => {
        toggleUpdated();
        setLoader(false);
        setSnackBarOpen(true);
        setSnackMessage(DELETE_ADDRESS);
      })
      .catch((err) => {
        toast.error("Someting went wrong, Please try again!!!");
        console.log("err", err)})
      .finally(() => setLoader(false));
  };

  const deletehandleOpen = (id: number) => {
    setDeleteOptionID(id);
    setDeleteData(true);
  };
  const deletehandleClose = () => setDeleteData(false);
  const Delete_icon = AppIcons(DELETE_ICON);
  const Add_address = AppIcons(ADD_ADDRESS_ICON);
  const EDIT_IMAGE = AppIcons(EDIT_IMAGE_ICON);
  return (
    <>
      {showLoader && <Loader />}
      <Modal
        padding={isMobile ? "0 16px" : ""}
        open={editAdd}
        height={{ xs: "100%", xl: "90%", sm: "90%", md: "90%", lg: "90%" }}
        width={isMobile ? "100%" : "44.5%"}
        overflowData="auto"
        handleOpen={addAddressHandler}
        handleClose={edithandleClose}
        top={"50%"}
        left={"50%"}
        Component={
          <EditAddress
            setSnackBarOpen={setSnackBarOpen}
            setSnackMessage={setSnackMessage}
            toggleUpdated={toggleUpdated}
            editingData={editingData}
            edithandleClose={edithandleClose}
            showLoader={setLoader}
            currentPage="profile"
          />
        }
      ></Modal>
      <BasicModal
        height={isMobile ? "auto" : "260px"}
        width={isMobile ? "100%" : "570px"}
        top="50%"
        left="50%"
        handleOpen={deletehandleOpen}
        handleClose={deletehandleClose}
        open={deleteData}
        Component={
          <DeleteModal
            deleteAddressHandler={deleteAddressHandler}
            optionId={deleteOptionID}
            deleteData={deleteDataJson}
            deletehandleClose={deletehandleClose}
          />
        }
      />
      <Box
        sx={{ position: "relative", marginBottom: "40px" }}
        pt={isMobile ? "23px" : "32px"}
      >
        <MainGrid
          p={isMobile ? "16px" : "22px"}
          container
          xs={12}
          sx={{ border: "1px solid rgba(155, 155, 155, 0.3)" }}
        >
          <>
            <ChildGrid item xs={12} lg={12} pb={1}>
              <TitleTypography isMobile={isMobile}>
                {ADDRESSES_TEXT}
              </TitleTypography>
              <AddTypography onClick={() => addAddressHandler()}>
                <img
                  src={`${ReplaceImage(Add_address?.url)}`}
                  alt="add-address logo"
                />
                <TypographyAddText isMobile={isMobile}>
                  {ADD_ADDRESS}
                </TypographyAddText>
              </AddTypography>
            </ChildGrid>

            {addressdata?.addresses?.length === 0 ? (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <img
                  style={{
                    width: isMobile ? "200px" : "350px",
                  }}
                  src={`${ReplaceImage(EMPTY_ADDRESS_IMG)}`}
                  alt="empty_address"
                />
              </Box>
            ) : (
              <>
                {addressdata?.addresses?.map((option: any, index: number) => (
                  <Grid item xs={12} lg={6} md={6} sm={12} key={index}>
                    <Box
                      bgcolor={"#F7F6F9"}
                      p={3}
                      sx={{ margin: "12px", minHeight: "219px" }}
                    >
                      <TypographyHead>
                        <TypographyHeader
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                          }}
                        >
                          {option?.default_billing && (
                            <TypographyPlace isMobile={isMobile}>
                              Default
                            </TypographyPlace>
                          )}
                          {option?.save_as && (
                            <TypographyPlace isMobile={isMobile}>
                              {option?.save_as}
                            </TypographyPlace>
                          )}
                          {option?.city && (
                            <TypographyPlace isMobile={isMobile}>
                              {option?.city}
                            </TypographyPlace>
                          )}
                        </TypographyHeader>
                        <Typographylogo>
                          <IconTypography
                            onClick={() => edithandleOpenAdd(option)}
                          >
                            <img
                              src={`${ReplaceImage(EDIT_IMAGE?.url)}`}
                              alt="edit_logo"
                              width={"20px"}
                            />
                          </IconTypography>
                          {!option?.default_billing && (
                            <IconTypography
                              onClick={() => deletehandleOpen(option?.id)}
                            >
                              <img
                                src={`${ReplaceImage(Delete_icon?.url)}`}
                                alt="delete_logo"
                              />
                            </IconTypography>
                          )}
                        </Typographylogo>
                      </TypographyHead>
                      <Box>
                        <TypographyName isMobile={isMobile}>
                          {option?.firstname} {option?.lastname}
                        </TypographyName>
                        <TypographyText>
                          {option?.details?.addressDetails}
                        </TypographyText>
                        <TypographyText
                          style={{
                            overflowY: "scroll",
                            height: "52px",
                            paddingRight: "3px",
                          }}
                        >
                          {option?.street}
                        </TypographyText>
                        <TypographyText>
                          {option?.city} - {option?.postcode}
                        </TypographyText>
                        <TypographyNumber isMobile={isMobile}>
                          {option?.telephone}
                        </TypographyNumber>
                      </Box>
                    </Box>
                  </Grid>
                ))}{" "}
              </>
            )}
          </>
        </MainGrid>
      </Box>
    </>
  );
};
export default AddAddress;
