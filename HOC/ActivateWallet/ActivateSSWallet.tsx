import { useEffect, useState } from "react";
import graphql from "../../middleware-graphql";
import {
  CREATE_SSWALLET,
  VERIFY_CREATE_SSWALLET,
} from "../../graphQLQueries/SSWallet/SSWalletQueries";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import OtpModal from "../../components/Profile/Otp/OtpModal";
import { MywalletBalance } from "../../graphQLQueries/MywalletQuery";
import { useMobileCheck } from "../../utility/isMobile";
import { toast } from "../../utility/Toast";

import { CustomSnackBar } from "../CustomSnackBar/CustomSnackBar";
import BasicModal from "../Modal/ModalBlock";
import { WALLET_ACTIVATION } from "../../components/Accounts/constants";
import handleErrorResponse from "../../utility/ErrorHandling";
function ActivateSSWallet({
  callBackForWalletBalance,
  userWalletActivate,
  setChangeState,
  setRefreshAfterCreate,
  isReturnOrderFlow = false,
}: any) {
  const [otpModal, setOtpModal] = useState(false);
  const [resend, setResend] = useState(false);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [networkError, setNetworkError] = useState(false);
  const [counter, setCounter] = useState(30);
  const [networkErrorMessage, setNetworkErrorMessage] =
    useState("Network Error");
  const handleClose = () => {
    setOtpModal(!otpModal);
    userWalletActivate();
  };
  let isCheck = useMobileCheck();

  useEffect(() => {
    handleCreateSSWallet();
    if (resend) {
      setCounter(30);
    }
  }, [setChangeState, resend]);

  const handleVerifyCreateWallet = async (userOtp: string) => {
    graphql
      .mutate({
        mutation: VERIFY_CREATE_SSWALLET,
        variables: {
          mobileNumber:
            global?.window?.localStorage?.getItem("mobileNumber") || "",
          otp: userOtp,
        },
      })
      .then(async (response) => {
        if (
          response?.data.verifyCreateWallet.errorMessage.toLowerCase() ===
          "wallet created"
        ) {
          setNetworkErrorMessage(WALLET_ACTIVATION);
        } else {
          setNetworkErrorMessage(response?.data.verifyCreateWallet.errorMessage);
        }
        setNetworkError(true);
        console.log('verifyCreateWallet', response?.data?.verifyCreateWallet?.success)
        if (response?.data?.verifyCreateWallet?.success) {
          await graphql
            .query({
              query: MywalletBalance,
              fetchPolicy: "no-cache",
            })
            .then((res) => {
           
              console.log(res?.data?.getWalletBalance?.wallet?.walletNumber, "1111111")
              userDataItems &&
                setUserDataItems({
                  ...userDataItems,
                  walletNumber:
                    res?.data?.getWalletBalance?.wallet?.walletNumber,
                });
              callBackForWalletBalance(
                res?.data?.getWalletBalance?.wallet?.consolidatedBalance
              );
            })
            .catch((err) => {
              console.log("err", err);
            });
          setOtpModal(false);
          await userWalletActivate();
          await setRefreshAfterCreate((prev: any) => !prev);
          if (isReturnOrderFlow == false) {
            window.location.reload();
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Someting went wrong, Please try again!!!");
      });
  };

  const handleCreateSSWallet = () => {
    graphql
      .mutate({
        mutation: CREATE_SSWALLET,
        variables: {
          mobileNumber:
            global?.window?.localStorage.getItem("mobileNumber") || "",
          email: userDataItems.userEmail || "",
        },
      })
      .then((response) => {
       
        if (response?.data?.createWallet?.otpSent) {
          setOtpModal(true);
        } else {
          userWalletActivate();
        }
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Someting went wrong, Please try again!!!");
        userWalletActivate();
      });
  };

  return (
    <>
      <CustomSnackBar
        snackBarOpen={networkError}
        setSnackBarOpen={setNetworkError}
        snackMessage={networkErrorMessage}
      />
      {otpModal && (
        <BasicModal
          open={otpModal}
          height={isCheck ? "auto" : "506px"}
          width={{ xs: "90%", sm: "60%", md: "40%" }}
          handleClose={handleClose}
          top={"50%"}
          left={"50%"}
          Component={
            <OtpModal
              setResend={setResend}
              setCounter={setCounter}
              counter={counter}
              handleVerifyOtp={handleVerifyCreateWallet}
            />
          }
        />
      )}
    </>
  );
}

export default ActivateSSWallet;
