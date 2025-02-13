import React, { Fragment, useEffect, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "../../SigninComponent/Registrationcompo/DatePicker";
import {
  AppropriateMethodDescription,
  AppropriateMethodTypography,
  FormControlBox,
  RadioGroupStyled,
  StyledCard,
  TextFieldOtherReason,
  HowToSendItBackTypography,
  SelectStyled,
  FormControlStyled,
  ParcelDeliveryInfoTypography,
  NoteBox,
  NoteTextTypography,
  ExchangeAndReturnPolicyTypography,
  ReturnTypography,
  ButtonStyled,
  GridOne,
  GridTwo,
  GridThree,
  CrossIcon,
  ChoosePic,
  AddTextGrid,
  Img,
  MaxPhotos,
  ImageFormatText,
  WalletBox,
  BankDetailsBox,
  NameTypography,
  AccountTypography,
  CourierTypography,
  CourierDescription,
  IconBox,
} from "./ReturnOrderStyled";
import BasicModal from "../../../HOC/Modal/ModalBlock";
import AddBankDetailsForm from "./AddBankDetailsForm";
import DottedMenu from "./DottedMenu";
import { hashingAccountNumber } from "../../../utility/HashingAccountNumber";
import { useMobileCheck } from "../../../utility/isMobile";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import client from "../../../apollo-client";
import {
  REASON_FOR_RETURN,
  RETURN_ORDER_MUTATION,
} from "../../../graphQLQueries/Orders/Rma";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoilstore";
import ActivateSSWallet from "../../../HOC/ActivateWallet/ActivateSSWallet";
import graphql from "../../../middleware-graphql";
import { MywalletBalance } from "../../../graphQLQueries/MywalletQuery";
import { useRouter } from "next/router";
import Loader from "../../../HOC/Loader/Loader";
import {
  ADD_BANK_TEXT,
  DISCLAIMER_TEXT,
  REASON_TO_RETURN_TEXT,
  SELECT_QUANTITY_TEXT,
  UPLOAD_IMAGE_TEXT,
} from "../constant";
import { CustomSnackBar } from "../../../HOC/CustomSnackBar/CustomSnackBar";
import { AppIcons } from "../../../utility/AppIconsConstant";
import { DOWN_ARROW_ICON } from "../../../utility/AppIcons";
import handleErrorResponse from "../../../utility/ErrorHandling";

const ReturnOrder = ({
  ReturnOrderData,
  orderItem,
  order_id,
  orderedMethod,
  orderToggleHandler,
  enableSnackMessage,
  selectedOrderFulfilmentID,
  setReturnOrder,
  isExchangeOrder,
  setisExchangeOrder,
  trackOrder,
}: any) => {
  const {
    selectTimeSlots,
    addPhotoTitle,
    addPhotoSubtitle,
    photoTextOne,
    photoTextTwo,
    photoTextThree,
    chooseImage,
    maxPhotos,
    originalPaymentMethodData,
    courierTypography,
    courierDescription,
  } = ReturnOrderData;
  const isMobile = useMobileCheck();

  const initialValues = {
    otherReason: "",
  };
  const [values, setValues] = useState(initialValues);
  const [tempBankDetails, setTempBankDetails] = useState<any>([]);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [IsOnlinePayment, setIsOnlinePayment] = useState(false);
  const [IsCreditCard, setIsCreditCard] = useState(true);
  const [isUPI, setIsUPI] = useState(false);
  const [RefundMethod, setRefundMethod] = useState(
    IsOnlinePayment ? "source" : "bank_neft"
  );
  const [ReturnMethod, setReturnMethod] = useState("pickup");
  const [bankDetailsModal, setIsBankDetailsModal] = useState(false);
  const [timeSlot, setTimeSlot] = React.useState("");
  const [reasonToReturn, setReasonToReturn] = useState<any | null>([]);
  const [selectedReasonforReturn, setSelectedReturnForReason] = useState<any>();
  const [date, setDate] = React.useState<Date | null>();
  const [editDetails, setEditDetails] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [isDisabled, setIsDisabled] = useState<boolean | undefined>(true);
  const router = useRouter();
  const [displayLoader, setDisplayLoader] = useState(false);
  const [bankNumberForCOD, setBankNumberForCOD] = useState(null);
  const [ItemsQuantity, setItemsQuantity] = useState([
    ...Array.from(
      Array(
        orderItem?.quantity_invoiced -
          orderItem?.quantity_returned -
          orderItem?.quantity_exchanged
      ).keys()
    ),
  ]);
  useEffect(() => {
    let count = 0;
    orderItem?.return_details?.map((details: any) => {
      count += details?.quantity;
    });
    setItemsQuantity([
      ...Array.from(
        Array(
          orderItem?.quantity_invoiced - count - orderItem?.quantity_exchanged
        ).keys()
      ),
    ]);
  }, []);
  const [selectedQuantity, setSelectedQuantity] = useState<any>(
    ItemsQuantity[ItemsQuantity?.length]
  );
  const [reviewImages, setReviewImages] = useState<any>([]);
  const [helpertext, setHelperText] = useState(false);
  const [userWalletBalance, setUserWalletBalance] = useState(0);
  const formValidation = (isFormValid: any, id: any) => {
    setError({ ...error, [id]: !isFormValid });
  };
  const [walletActivateState, setWalletActivateState] = useState(false);

  const [errorMessage, setErrorMessage] = useState({
    otherReason: "Please write a reason for your order return.",
  });

  const [error, setError] = useState({
    otherReason: false,
  });
  const [imageSizeError, setImageSizeError] = useState("");
  const [quantityError, setQuantityError] = useState(false);
  const [reasonReturnError, setReasonReturnError] = useState(false);
  const [imagesError, setImagesError] = useState(false);
  const [bankNeftError, setBankNeftError] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleImagesErrors = (message: string) => {
    setHelperText(true);
    setImageSizeError(message);
  };
  useEffect(() => {
    if (orderedMethod == "checkmo" || orderedMethod == "cashondelivery") {
      setIsOnlinePayment(false);
      setRefundMethod("bank_neft");
    } else {
      setIsOnlinePayment(true);
      setRefundMethod("source");
    }
  }, [orderedMethod]);

  useEffect(() => {
    if (
      (RefundMethod?.length && ReturnMethod?.length && reviewImages?.length) >
        0 &&
      selectedReasonforReturn &&
      selectedQuantity &&
      (RefundMethod == "bank_neft" ? tempBankDetails.length > 0 : true)
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [
    RefundMethod,
    ReturnMethod,
    reviewImages,
    selectedReasonforReturn,
    selectedQuantity,
    tempBankDetails,
  ]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsFormTouched(true);
    let isFormValid: any = false;
    if (name === "otherReason") {
      isFormValid = value?.length >= 10 && value?.match(/^[a-zA-Z\s]*$/g);
      if (value?.match(/^[a-zA-Z\s]*$/g)) {
        setValues({
          ...values,
          [name]: value,
        });
      }
      formValidation(isFormValid, name);
    }
  };
  const handleRefundMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRefundMethod(event.target.value);
  };

  const handleReturnMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReturnMethod(event.target.value);
  };

  const handleTimeSlotChange = (event: any) => {
    setTimeSlot(event.target.value);
  };

  const handleQuantityChange = (event: any) => {
    setSelectedQuantity(event.target.value);
  };
  const handleReturnOrderChange = (event: any) => {
    setSelectedReturnForReason(event.target.value);
  };

  useEffect(() => {
    client
      .query({
        query: REASON_FOR_RETURN,
      })
      .then((response: any) => {
     
        setReasonToReturn(response?.data?.GetRMAReasons);
        setSelectedReturnForReason(response?.data?.GetRMAReasons?.[0]?.value);
      })
      .catch((error: any) => {
        console.log(error);
      });
    if (userDataItems?.walletNumber !== "na") {
      graphql
        .query({
          query: MywalletBalance,
          fetchPolicy: "no-cache",
        })
        .then((res) => {
         
          setUserWalletBalance(
            res?.data?.getWalletBalance?.wallet?.consolidatedBalance
          );
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, []);

  useEffect(() => {
    if (reviewImages?.length != 0 && reviewImages !== undefined) {
      setImagesError(false);
    }

    if (
      selectedReasonforReturn?.length != 0 &&
      selectedReasonforReturn !== undefined
    ) {
      setReasonReturnError(false);
    }
    if (selectedQuantity?.length != 0 && selectedQuantity !== undefined) {
      setQuantityError(false);
    }
    if (
      RefundMethod === "bank_neft" &&
      Object.keys(tempBankDetails)?.length != 0
    ) {
      setBankNeftError(false);
    }
  }, [
    reviewImages,
    selectedReasonforReturn,
    selectedQuantity,
    tempBankDetails,
  ]);

  const handleReturnSubmit = () => {
    if (
      reviewImages?.length == 0 ||
      selectedReasonforReturn == (0 || undefined) ||
      selectedQuantity == (0 || undefined) ||
      (RefundMethod == "bank_neft" && Object.keys(tempBankDetails)?.length <= 0)
    ) {
      if (reviewImages?.length <= 0) {
        setImagesError(true);
      }
      if (
        selectedReasonforReturn <= 0 ||
        selectedReasonforReturn == undefined
      ) {
        setReasonReturnError(true);
      }
      if (selectedQuantity <= 0 || selectedQuantity == undefined) {
        setQuantityError(true);
      }
      if (
        RefundMethod === "bank_neft" &&
        Object.keys(tempBankDetails)?.length <= 0
      ) {
        setBankNeftError(true);
      }
    }
    else {
      setDisplayLoader(true);
      if (
        (!userDataItems?.walletNumber ||
          userDataItems?.walletNumber === "na" ||
          userDataItems?.walletNumber === null) &&
        parseInt(trackOrder?.total?.loyalty_discount?.amount) > 0
      ) {
      }
       client
        .mutate({
          mutation: RETURN_ORDER_MUTATION,
          variables: {
            OrderID: order_id,
            store_id: 1,
            RefundPaymentMethod: isExchangeOrder ? "" : RefundMethod,
            OtherReason: values?.otherReason,
            ImageURL: reviewImages,
            SendBackMethod: ReturnMethod,
            OrderItemID: orderItem?.item_id,
            Sku: orderItem?.product_sku,
            SelectedReason:
              (selectedReasonforReturn && parseInt(selectedReasonforReturn)) ||
              1,
            QuantityRequested: selectedQuantity,
            FulfilmentID: selectedOrderFulfilmentID,
            ResolutionID: isExchangeOrder ? 1 : 2,
            IsExchange: isExchangeOrder ? true : false,
            BankReferenceKey:
              bankNumberForCOD === null ? 0 : parseInt(bankNumberForCOD),
          },
        })
        .then(async (res) => {
          console.log(
            res?.data?.createRma?.rma?.increment_id,
            "returnID",
            res?.data?.createRma?.rma?.date_requested,
            "return requested Date"
          );
          await enableSnackMessage(
            isExchangeOrder
              ? "Your exchange request has been initiated. Your order will be picked up in 2-3 working days."
              : "Your return request has been initiated. Refund amount will be credited to your account after product passes the quality check"
          );
          setDisplayLoader(false);
          await orderToggleHandler();
        })
        .catch(async (err) => {
          console.log("err", err);
          await enableSnackMessage(JSON.stringify(err?.message));
          setDisplayLoader(false);
          await orderToggleHandler();
        })
        .finally(() => {
          setDisplayLoader(false);
          setReturnOrder(false);
          setisExchangeOrder(false);
        });
    }
  };
  //Image handler

  const fileToDataUri = (image: Blob) => {
    return new Promise((res) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        res(reader.result);
      });
      reader.readAsDataURL(image);
    });
  };

  const limit = 5;
  const handleRemove = (index: any) => {
    setHelperText(false);
    const firstArr = reviewImages.slice(0, index);
    const secondArr = reviewImages.slice(index + 1);
    setReviewImages([...firstArr, ...secondArr]);
  };
  const fileUploadManager = async (event: any) => {
    const listOfImages = reviewImages;
    if (
      reviewImages.length <= limit &&
      limit - reviewImages?.length - event?.target?.files?.length >= 0
    ) {
      for (var i = 0; i < event?.target?.files?.length; i++) {
        const oFile = event?.target?.files[i];
        if (oFile.size > 5242880) {
          if (
            oFile.type == "image/png" ||
            oFile.type == "image/jpg" ||
            oFile.type == "image/jpeg"
          ) {
            handleImagesErrors("Images size should not be greater than 5mb.");
          } else {
            handleImagesErrors(
              "Only image formats png , jpg, jpeg are accepted."
            );
          }
        } else {
          if (
            oFile.type == "image/png" ||
            oFile.type == "image/jpg" ||
            oFile.type == "image/jpeg"
          ) {
            listOfImages?.push(fileToDataUri(event.target.files[i]));
            handleImagesErrors("");
          } else {
            console.log("Not Accepted");
            handleImagesErrors(
              "Only image formats png , jpg, jpeg are accepted"
            );
          }
        }
      }
      const newImages = await Promise.all(listOfImages);
      setReviewImages([...newImages]);
    }
    return false;
  };

  const handleAddBankDetails = (isEdit?: boolean, details?: any) => {
    setIsEdit(false);
    if (isEdit) {
      setIsEdit(true);
      setEditDetails(details);
    }
    setIsBankDetailsModal(true);
  };

  const handleAddBankDetailsClose = () => {
    setIsBankDetailsModal(false);
  };
  const userWalletActivate = () => {
    setWalletActivateState(true);
  };
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const ARROWDOWN = AppIcons(DOWN_ARROW_ICON);

  return (
    <>
      {displayLoader && <Loader />}
      <CustomSnackBar
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        snackMessage={snackMessage}
      ></CustomSnackBar>
      <StyledCard>
        <Box>
          <FormControlBox>
            <FormControlStyled
              sx={{
                minWidth: 120,
                width: "100%",
              }}
            >
              <InputLabel
                id="select-quantity-label"
                required
                sx={{
                  fontWeight: "500",
                  fontSize: "12px",
                  lineHeight: "150%",
                  "&.Mui-focused": {
                    color: "#AD184C !important",
                  },
                }}
              >
                Select Quantity
              </InputLabel>
              <IconBox isMobile={isMobile}>
                <img
                  src={`${ReplaceImage(ARROWDOWN?.url)}`}
                  alt="ArrowDownIcon"
                />
              </IconBox>
              <SelectStyled
                labelId="select-quantity-label"
                id="demo-simple-select-helper"
                value={selectedQuantity}
                label="Select Time"
                onChange={handleQuantityChange}
              >
                {ItemsQuantity?.map((quantity: any, index: number) => (
                  <MenuItem value={quantity + 1} key={index}>
                    {quantity + 1}
                  </MenuItem>
                ))}
              </SelectStyled>
            </FormControlStyled>
            {quantityError && (
              <Typography sx={{ fontSize: "14px", color: "#AD184C" }}>
                {SELECT_QUANTITY_TEXT}
              </Typography>
            )}
          </FormControlBox>
        </Box>
        {!isExchangeOrder && (
          <>
            <AppropriateMethodTypography>
              {ReturnOrderData?.appropriateMethodTypography}
            </AppropriateMethodTypography>
            {(orderedMethod == "checkmo" ||
              orderedMethod == "cashondelivery") && (
              <AppropriateMethodDescription>
                {ReturnOrderData?.appropriateMethodDescription}
              </AppropriateMethodDescription>
            )}
            <FormControlBox>
              <FormControl>
                <RadioGroupStyled
                  sx={{ display: "block" }}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={RefundMethod}
                  onChange={handleRefundMethodChange}
                >
                  {!IsOnlinePayment && (
                    <Stack direction="column">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <FormControlLabel
                          value="bank_neft"
                          control={<Radio />}
                          label="Bank NEFT "
                        />
                        {RefundMethod === "bank_neft" && (
                          <>
                            {tempBankDetails?.length < 1 && (
                              <Typography
                                sx={{
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                  whiteSpace: "nowrap",
                                }}
                                onClick={() => handleAddBankDetails()}
                              >
                                Add bank details
                              </Typography>
                            )}
                            <Typography>{"\u00A0"}</Typography>
                            <Typography pl={isMobile ? 4 : 0}>
                              (2-10 working Days for refund to get processed)
                            </Typography>
                          </>
                        )}
                      </Box>
                      {RefundMethod === "bank_neft" && (
                        <>
                          {tempBankDetails?.map(
                            (details: any, index: number) => (
                              <>
                                <BankDetailsBox>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box>
                                      <AccountTypography>
                                        Account Holder Name
                                      </AccountTypography>
                                      <NameTypography>
                                        {details?.name}
                                      </NameTypography>
                                    </Box>
                                    <Box>
                                      <DottedMenu
                                        handleAddBankDetails={
                                          handleAddBankDetails
                                        }
                                        details={details}
                                        setTempBankDetails={() =>
                                          setTempBankDetails([])
                                        }
                                      />
                                    </Box>
                                  </Box>

                                  <Box>
                                    <AccountTypography
                                      sx={{ paddingTop: "20px" }}
                                    >
                                      Account Number
                                    </AccountTypography>
                                    <NameTypography>
                                      {hashingAccountNumber(
                                        details?.accountNumber
                                      )}
                                    </NameTypography>
                                  </Box>
                                </BankDetailsBox>
                              </>
                            )
                          )}
                        </>
                      )}
                    </Stack>
                  )}
                  {IsOnlinePayment && (
                    <Stack direction="column">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                        mb={2}
                      >
                        <FormControlLabel
                          value="source"
                          control={<Radio />}
                          label="Original Payment Method"
                        />
                        {RefundMethod === "source" && (
                          <>
                            <Typography pl={isMobile ? 4 : 0}>
                              (5-7 working days for refund to get processed)
                            </Typography>
                          </>
                        )}
                        <Typography>{DISCLAIMER_TEXT}</Typography>
                      </Box>
                    </Stack>
                  )}
                  <FormControlLabel
                    value="wallet"
                    control={<Radio />}
                    label="Shoppers Stop wallet"
                  />
                  {(!userDataItems?.walletNumber ||
                    userDataItems?.walletNumber === null ||
                    userDataItems?.walletNumber === "na") && (
                    <Typography
                      onClick={() => userWalletActivate()}
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontSize: "16px",
                        color: "#7B7979",
                        fontWeight: 400,
                        display: "initial",
                      }}
                    >
                      Activate SS Wallet
                    </Typography>
                  )}
                  {RefundMethod === "wallet" && (
                    <WalletBox mt={1} mb={1}>
                      <Typography>SS Wallet</Typography>
                      {userDataItems?.walletNumber !== "na" && (
                        <Typography>{`Balance : ₹${userWalletBalance}`}</Typography>
                      )}
                    </WalletBox>
                  )}
                </RadioGroupStyled>
              </FormControl>
            </FormControlBox>
          </>
        )}
        <Box>
          <FormControlBox>
            <FormControlStyled sx={{ minWidth: 120, width: "100%" }}>
              <InputLabel
                id="demo-simple-select-helper-label"
                required
                sx={{
                  fontWeight: "500",
                  fontSize: "12px",
                  lineHeight: "150%",
                  "&.Mui-focused": {
                    color: "#AD184C !important",
                  },
                }}
              >
                {`Reason to  ${isExchangeOrder ? "Exchange" : "Return"}`}
              </InputLabel>
              <IconBox isMobile={isMobile}>
                <img
                  src={`${ReplaceImage(ARROWDOWN?.url)}`}
                  alt="ArrowDownIcon"
                />
              </IconBox>
              <SelectStyled
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedReasonforReturn}
                label="Select Time  la"
                onChange={handleReturnOrderChange}
              >
                {reasonToReturn?.map((reason: any, index: number) => (
                  <MenuItem value={reason?.reason_id} key={index}>
                    {reason?.rma_reason}
                  </MenuItem>
                ))}
              </SelectStyled>
            </FormControlStyled>
            {reasonReturnError && (
              <Typography sx={{ fontSize: "14px", color: "#AD184C" }}>
                {REASON_TO_RETURN_TEXT}
              </Typography>
            )}
          </FormControlBox>
        </Box>
        <Box sx={{ paddingTop: "32px" }}>
          <TextFieldOtherReason
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset ": {
                  "&.MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                    color: "#AD184C !important",
                  },
                },
              },
            }}
            id="outlined-basic"
            label="Other Reasons (if any)"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={values.otherReason}
            error={error?.otherReason}
            helperText={error?.otherReason && errorMessage.otherReason}
            name="otherReason"
            placeholder="Write your reasons here"
            onChange={handleInputChange}
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
        </Box>

        <Box sx={{ paddingTop: "24px" }}>
          {reviewImages?.length < 1 && (
            <Grid>
              <Box sx={{ display: "flex", paddingBottom: "20px" }}>
                <GridOne
                  dangerouslySetInnerHTML={{ __html: addPhotoTitle }}
                ></GridOne>
                <MaxPhotos>{maxPhotos}</MaxPhotos>
              </Box>
            </Grid>
          )}
          <Grid>
            {reviewImages?.length > 0 && (
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", marginBottom: "8px" }}
              >
                Upload Image
              </Typography>
            )}
            <GridThree style={{ alignItems: "center", overflow: "scroll" }}>
              {reviewImages &&
                reviewImages?.map((obj: any, index: number) => {
                  return (
                    <Img
                      style={{
                        backgroundImage: `url(${obj})`,
                        marginRight: "10px",
                        WebkitBackgroundSize: "70px",
                        width: "100px",
                        height: "80px",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                      key={index}
                    >
                      <CrossIcon>
                        <CancelOutlinedIcon
                          fontSize="medium"
                          onClick={() => handleRemove(index)}
                        />
                      </CrossIcon>
                    </Img>
                  );
                })}
              {reviewImages?.length < 5 && (
                <ChoosePic
                  onClick={() => {
                    reviewImages?.length >= 5 && setHelperText(true);
                  }}
                >
                  <label
                    htmlFor={`${reviewImages.length < 5 ? "file" : "none"}`}
                  >
                    <img src={`${ReplaceImage(chooseImage)}`} alt="imageUrl" />
                  </label>
                  <input
                    id="file"
                    type="file"
                    onInput={(e) => {
                      reviewImages?.length <= 5 && fileUploadManager(e);
                    }}
                    onClick={(e) => {
                      reviewImages?.length >= 5;
                      e.currentTarget.value = "";
                    }}
                  />
                </ChoosePic>
              )}
              {reviewImages?.length == 0 && (
                <AddTextGrid>
                  <ImageFormatText>{photoTextOne}</ImageFormatText>
                  <ImageFormatText>{photoTextTwo}</ImageFormatText>
                  <ImageFormatText>{photoTextThree}</ImageFormatText>
                </AddTextGrid>
              )}
            </GridThree>
            <Typography sx={{ fontSize: "14px", color: "#AD184C" }}>
              {imageSizeError}
            </Typography>

            {imagesError && (
              <Typography sx={{ fontSize: "14px", color: "#AD184C" }}>
                {UPLOAD_IMAGE_TEXT}
              </Typography>
            )}
          </Grid>
        </Box>
        <HowToSendItBackTypography>
          {ReturnOrderData?.howToSendItBackTypography}
        </HowToSendItBackTypography>
        <FormControlBox>
          <FormControl>
            <RadioGroupStyled
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={ReturnMethod}
              onChange={handleReturnMethodChange}
            >
              <FormControlLabel
                value="pickup"
                control={<Radio />}
                label="Pick-up"
              />
            </RadioGroupStyled>
          </FormControl>
        </FormControlBox>

        {ReturnMethod == "pickup" && (
          <ParcelDeliveryInfoTypography>
            {ReturnOrderData?.parcelDeliveryInfo}
          </ParcelDeliveryInfoTypography>
        )}
        <NoteBox>
          <NoteTextTypography>
            <b>Note:</b>
            {ReturnOrderData?.noteText}
          </NoteTextTypography>
        </NoteBox>
        <Box sx={{ display: "flex", alignItems: "baseline" }} pt={1.2}>
          <Typography> Read Our </Typography>

          <ExchangeAndReturnPolicyTypography
            sx={{ cursor: "pointer" }}
            onClick={() =>
              isMobile
                ? window.location.assign("/miscs/exchange-return")
                : window.open("/miscs/exchange-return")
            }
          >
            {ReturnOrderData?.exchangeAndReturnPolicyTypography}
          </ExchangeAndReturnPolicyTypography>
        </Box>
        <Box sx={{ paddingTop: "24px" }} onClick={() => handleReturnSubmit()}>
          <ButtonStyled>
            <ReturnTypography>
              {" "}
              {isExchangeOrder ? "EXCHANGE" : "RETURN"}
            </ReturnTypography>
          </ButtonStyled>
        </Box>

        {bankNeftError && RefundMethod === "bank_neft" && (
          <Typography sx={{ fontSize: "14px", color: "#AD184C" , paddingTop: "10px"}}>
            {ADD_BANK_TEXT}
          </Typography>
        )}

        <BasicModal
          height="auto"
          width={isMobile ? "90%" : "38%"}
          top="50%"
          left="50%"
          handleOpen={handleAddBankDetails}
          handleClose={handleAddBankDetailsClose}
          open={bankDetailsModal}
          Component={
            <AddBankDetailsForm
              setIsBankDetailsModal={setIsBankDetailsModal}
              editDetails={editDetails}
              isEdit={isEdit}
              setDisplayLoader={setDisplayLoader}
              setSnackBarOpen={setSnackBarOpen}
              setSnackMessage={setSnackMessage}
              setTempBankDetails={setTempBankDetails}
              tempBankDetails={tempBankDetails}
              order_id={order_id}
              setBankNumberForCOD={setBankNumberForCOD}
            />
          }
        />
      </StyledCard>
      {walletActivateState && (
        <ActivateSSWallet
          isReturnOrderFlow={true}
          setUserWalletBalance={setUserWalletBalance}
          userWalletActivate={userWalletActivate}
        />
      )}
    </>
  );
};

export default ReturnOrder;
