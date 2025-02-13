import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import {
  ButtonStyled,
  FormControlBox,
  FormControlStyled,
  IconBox,
  ReturnTypography,
  SelectStyled,
  StyledCard,
} from "./ReturnOrderStyled";
import { useMobileCheck } from "../../../utility/isMobile";
import { toast } from "../../../utility/Toast";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import Loader from "../../../HOC/Loader/Loader";
import Modal from "../../../HOC/Modal/ModalBlock";
import { AppIcons } from "../../../utility/AppIconsConstant";
import { DOWN_ARROW_ICON } from "../../../utility/AppIcons";
import client from "../../../apollo-client";
import { REASON_FOR_CANCELLATION } from "../../../graphQLQueries/Orders/Rma";
import {
  CANCEL_TEXT,
  DISCLAIMER_TEXT,
  OTP_MODAL_WALLET_ACTIVATE_SUBTEXT,
  REASON_TO_CANCEL_TEXT,
  SELECT_QUANTITY_TEXT,
  VERIFY_OTP_TEXT,
  WALLET_ACTIVATE_HEADER,
} from "../constant";
import { cancelItems } from "../../../graphQLQueries/OrderDetailsQuery";
import { OtpComponentLogic } from "../../SigninComponent/MobileOtpScreen/OtpComponentLogic";
import useStorage from "../../../utility/useStoarge";
import { ResendTimer } from "../../SigninComponent/MobileOtpScreen/MobileOtpStyled";
import {
  PayButton,
  TextTypography,
} from "../../PaymentsPages/FirstCitizen/OtpStyled";
import graphql from "../../../middleware-graphql";
import {
  CREATE_HYBRIS_USER,
  VERIFY_CREATE_SSWALLET,
} from "../../../graphQLQueries/SSWallet/SSWalletQueries";
import { userState } from "../../../recoilstore";
import { useRecoilState } from "recoil";
import { FETCH_CUSTOMER_WALLET } from "../../../graphQLQueries/MyProfileQuery";
import { TECHNICAL_ISSUE_TEXT } from "../../../utility/Constants";
import { CustomSnackBar } from "../../../HOC/CustomSnackBar/CustomSnackBar";
import handleErrorResponse from "../../../utility/ErrorHandling";

const CancelOrderLayout = ({
  enableSnackMessage,
  orderToggleHandler,
  orderItem,
  orderNumber,
  setCancelOrder,
  trackOrder,
}: any) => {
  const { getItem } = useStorage();
  const [otp, setOtp] = useState("");
  const [invalidOtp, setIsInvalidOtp] = useState(false);
  const [resetOtpFields, setResetOtpFields] = useState(false);
  let number = getItem("mobileNumber", "local")?.toString();
  let phnumber = number
    ? number?.replace(number?.substring(2, 8), "XXXXXX")
    : "";
  const [openOTPModal, setOpenOTPModal] = useState(false);
  const isMobile = useMobileCheck();
  const [ItemsQuantity, setItemsQuantity] = useState([
    ...Array.from(Array(orderItem?.quantity_ordered).keys()),
  ]);
  const [networkError, setNetworkError] = useState(false);
  const [networkErrorMessage, setNetworkErrorMessage] =
    useState("Network Error");
  const [quantityError, setQuantityError] = useState(false);
  const ARROWDOWN = AppIcons(DOWN_ARROW_ICON);
  const [counter, setCounter] = useState(0);
  const [displayLoader, setLoader] = useState(false);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);

  useEffect(() => {
    if (openOTPModal) {
      setCounter(30);
    }
  }, [openOTPModal]);

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    let count = 0;
    orderItem?.cancel_details?.map((details: any) => {
      count += details?.quantity;
    });
    setItemsQuantity([
      ...Array.from(Array(orderItem?.quantity_ordered - count).keys()),
    ]);
  
  }, []);

  const [selectedQuantity, setSelectedQuantity] = useState<any>(
    ItemsQuantity[ItemsQuantity?.length]
  );

  const [reasonToReturn, setReasonToReturn] = useState<any | null>([]);
  const [selectedReasonforReturn, setSelectedReturnForReason] =
    useState<any>("");
  const [reasonReturnError, setReasonReturnError] = useState(false);
  const handleReturnOrderChange = (event: any) => {
    setSelectedReturnForReason(event.target.value);
  };

  useEffect(() => {
    if (selectedQuantity?.length != 0 && selectedQuantity !== undefined) {
      setQuantityError(false);
    }
  }, [selectedReasonforReturn, selectedQuantity]); 
   useEffect(() => {
  client
    .query({
      query: REASON_FOR_CANCELLATION,
    })
    .then((response: any) => {
      const hasError =   handleErrorResponse(response?.data?.GetCancelReasons) //response checking
      if (hasError) return null;
      setReasonToReturn(response?.data?.GetCancelReasons);
      setSelectedReturnForReason(
        response?.data?.GetCancelReasons?.[0]?.value
      );
    })
    .catch((error: any) => {
      console.log(error);
    });
  }, []);

  const handleReturnSubmit = () => {
    if (selectedReasonforReturn == undefined || selectedReasonforReturn == "") {
      setReasonReturnError(true);
    } else {
      client
        .mutate({
          mutation: cancelItems,
          variables: {
            order_number: orderNumber,
            status: "cancelled",
            state: "cancelled",
            cancellation_reason: selectedReasonforReturn,
          },
          fetchPolicy: "no-cache",
        })
        .then((response) => {
          setLoader(false);
          orderToggleHandler();
          if (response?.data?.updateOrderStatus?.status) {
            enableSnackMessage(
              parseInt(trackOrder?.total?.loyalty_discount?.amount) > 0
                ? "Cancellation request raised successfully. The amount will be refunded to your SSBeauty Wallet soon."
                : "Your order has been Cancelled Successfully"
            );
          }
        })
        .catch((error) => {
          orderToggleHandler();
          enableSnackMessage(JSON.stringify(error?.message));
        })
        .finally(() => {
          setLoader(false);
          setCancelOrder(false);
        });
    }
  };

  const handleQuantityChange = (event: any) => {
    setSelectedQuantity(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenOTPModal(true);
  };

  const handleCreateSSWallet = () => {
    graphql
      .mutate({
        mutation: CREATE_HYBRIS_USER,
        variables: {
          mobileNumber:
            global?.window?.localStorage.getItem("mobileNumber") || "",
        },
      })
      .then((response) => {
        if (response?.data?.createHybrisUser?.content) {
          setLoader(false);
          handleOpenModal();
        } else {
          setLoader(false);
          setNetworkError(true);
          setNetworkErrorMessage(
            response?.data?.createHybrisUser?.errorMessage
          );
        }
      })
      .catch((err: any) => {
        setNetworkError(true);
        setNetworkErrorMessage(TECHNICAL_ISSUE_TEXT);
        setLoader(false);
        console.log(err);
      });
  };

  const handleClodeModal = () => {
    setOpenOTPModal(false);
  };

  const VerifyHandler = () => {
    console.log("kjhdkh");
  };

  const resendOTP = async () => {
    verifyOtp();
  };

  const userWalletFetch = () => {
    client
      .query({
        query: FETCH_CUSTOMER_WALLET,
        fetchPolicy: "no-cache",
      })
      .then((response: any) => {

        setUserDataItems({
          ...userDataItems,
          walletNumber: response?.data?.customer?.wallet_number,
        });
        if (response?.data?.customer?.wallet_number) {
          handleReturnSubmit();
        } else {
          setNetworkErrorMessage(TECHNICAL_ISSUE_TEXT);
          setNetworkError(true);
        }
      })
      .catch((error: any) => {
        setNetworkError(true);
        setNetworkErrorMessage(error);
        setLoader(false);
        console.log(error);
      });
  };

  const verifyOtp = () => {
    graphql
      .mutate({
        mutation: VERIFY_CREATE_SSWALLET,
        variables: {
          mobileNumber:
            global?.window?.localStorage?.getItem("mobileNumber") || "",
          otp: otp,
        },
      })
      .then(async (response) => {
        if (
          response?.data.verifyCreateWallet.errorMessage.toLowerCase() !==
          "wallet created"
        ) {
          setLoader(false);
          setNetworkErrorMessage(response?.data.verifyCreateWallet.errorMessage);
          setNetworkError(true);
        }
        if (response?.data?.verifyCreateWallet?.success) {
          setOpenOTPModal(false);
          setLoader(true);
          userWalletFetch();
        }
      })
      .catch((err: any) => {
        toast.error("Someting went wrong, Please try again!!!");
        console.log(err);
      });
  };

  const otptimer = () => {
    if (counter != 0) {
      return (
        <ResendTimer sx={{ textAlign: "center" }}>
          {"Resend in "}
          00:{counter < 10 ? `0${counter}` : counter}
        </ResendTimer>
      );
    } else
      return (
        <Box sx={{ textAlign: "center" }} id="resend">
          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: "150%",
              color: "red",
              textAlign: "center",
            }}
          >
            {invalidOtp && "Please enter a valid OTP"}
          </Typography>
          <TextTypography>
            Didn’t receive an SMS? <span onClick={resendOTP}>Resend OTP</span>
          </TextTypography>
        </Box>
      );
  };

  const clickCancelButton = () => {
      handleReturnSubmit();
  };

  return (
    <>
      <CustomSnackBar
        snackBarOpen={networkError}
        setSnackBarOpen={setNetworkError}
        snackMessage={networkErrorMessage}
      />
      {displayLoader && <Loader />}
      <StyledCard>
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
                {`Reason to  Cancel`}
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
                  <MenuItem value={reason?.cancel_reason} key={index}>
                    {reason?.cancel_reason}
                  </MenuItem>
                ))}
              </SelectStyled>
            </FormControlStyled>
            {reasonReturnError && (
              <Typography sx={{ fontSize: "14px", color: "#AD184C" }}>
                {REASON_TO_CANCEL_TEXT}
              </Typography>
            )}
          </FormControlBox>
        </Box>
        <Box sx={{ paddingTop: "24px" }} onClick={() => clickCancelButton()}>
          <ButtonStyled>
            <ReturnTypography>{CANCEL_TEXT}</ReturnTypography>
          </ButtonStyled>
          <Typography sx={{ fontSize: "12px", padding: "5px" }}>
            {DISCLAIMER_TEXT}
          </Typography>
        </Box>
      </StyledCard>

      <Modal
        padding={isMobile ? "0 16px" : ""}
        open={openOTPModal}
        height={isMobile ? "100%" : "70%"}
        width={isMobile ? "100%" : "50%"}
        overflowData="auto"
        handleOpen={handleOpenModal}
        handleClose={handleClodeModal}
        top={"50%"}
        left={"50%"}
        Component={
          <Grid sx={{ padding: "20px 0" }}>
            <Typography
              sx={{
                fontSize: "20px",
                lineHeight: "24px",
                color: "#1C191A",
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              {WALLET_ACTIVATE_HEADER}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "140%",
                color: "#4F4C4D",
                textAlign: "center",
                marginTop: "10px",
                padding: "0 21%",
              }}
            >
              {OTP_MODAL_WALLET_ACTIVATE_SUBTEXT}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "150%",
                color: "#656263",
                textAlign: "center",
                marginTop: "25px",
                marginBottom: "20px",
              }}
            >
              OTP sent to{" "}
              <Typography sx={{ color: "#AD184C" }} component="span">
                {phnumber}
              </Typography>
            </Typography>
            <OtpComponentLogic
              setOtp={setOtp}
              resetOtpFields={resetOtpFields}
              VerifyHandler={VerifyHandler}
              invalidOtp={invalidOtp}
              setIsInvalidOtp={setIsInvalidOtp}
            />
            <Box
              sx={{
                pt: "28px",
                pb: "30px  ",
                "@media (max-width:600px)": {
                  pt: "25px",
                  pb: "25px",
                },
              }}
            >
              {otptimer()}
            </Box>
            <PayButton sx={{ padding: "10px 20px" }} onClick={verifyOtp}>
              {VERIFY_OTP_TEXT}
            </PayButton>
          </Grid>
        }
      ></Modal>
    </>
  );
};

export default CancelOrderLayout;
