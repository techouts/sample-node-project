import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { ArrowImage } from "../../Header/Constants";
import QRCode from "react-qr-code";
import BasicModal from "../../../HOC/Modal/ModalBlock";
import { useLeavePageConfirmation } from "../../../utility/useLeavePageConfirmation";

import { JUSPAY_RETURN_URL } from "../../../utility/Constants";
import { failedQRStatus } from "../../../pages/api/payment-status";
import axios from "axios";
import handleErrorResponse from "../../../utility/ErrorHandling";

const QRCodePayment = (props: any) => {
  const {
    upiUrl,
    orderId,
    openCancelTransModal,
    setOpenCancelTransModal,
    closeCancelTransModal,
    cancelTransaction,
  } = props;
  const [secondsLeft, setSecondsLeft] = useState(480);
  const [qrStatus, setQrStatus] = useState("");
  const openModalPopup = async (msg: any) => {
    setOpenCancelTransModal({ ...openCancelTransModal, enable: true });
  };
  const isTimeLeft = secondsLeft !== 0 && !openCancelTransModal?.enable;
  useLeavePageConfirmation(isTimeLeft, openModalPopup);
  const qrStatusCheck = useRef<any>(null);
  let interval: any;

  useEffect(() => {
    startTimer();
  }, [secondsLeft]);

  const startTimer = () => {
    interval = setInterval(() => {
      setSecondsLeft((secs: any) => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(interval);
      if (qrStatus) {
        window.location.replace(qrStatus);
      } else {
        window.location.replace(
          `${window.location.origin}${JUSPAY_RETURN_URL}?order_id=${orderId}&status=AUTHORIZATION_FAILED`
        );
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [secondsLeft]);

  useEffect(() => {
    if (orderId) {
      qrStatusCheck.current = setInterval(async () => {
        await axios
        .get("/api/payment-status" + `?order_id=${orderId}&n7NonCached=true`)
          .then((res) => {
       const hasError =   handleErrorResponse( res.data) //response checking
       if (hasError) return null; 
            if (
              res.data?.status === "CHARGED" ||
              failedQRStatus.includes(res.data?.status)
            ) {
              setQrStatus(res.data?.return_url);
              setSecondsLeft(0);
            }
          });
      }, 5000);
    }
    return () => {
      clearInterval(qrStatusCheck.current);
    };
  }, [orderId]);

  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };
  const time = clockify();

  return (
    <Box>
      <BasicModal
        top={"50%"}
        width={"50%"}
        left={"50%"}
        open={openCancelTransModal?.enable}
        handleClose={closeCancelTransModal}
        Component={
          <Box sx={{ color: "white", padding: "31px" }}>
            <Typography
              sx={{
                textAlign: "center",
                color: "black",
                fontSize: "26px",
                fontWeight: "500",
              }}>
              Cancel Transaction?
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: "black",
                padding: "20px",
                fontSize: "16px",
              }}>
              Payment Request Already Initiated and it cannot be revoked. Do you
              still wish to go back
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}>
              <Button
                variant="contained"
                sx={{
                  width: "20%",
                  height: "40px",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "140%",
                  color: "#231F20",
                  backgroundColor: "#DEA3B7",
                  borderRadius: "0",
                  letterSpacing: "1px",
                  ":hover": {
                    backgroundColor: "#DEA3B7",
                  },
                  textTransform: "uppercase",
                }}
                onClick={() => {
                  cancelTransaction();
                }}>
                {"Yes"}
              </Button>
              <Button
                variant="contained"
                sx={{
                  marginLeft: "20px",
                  width: "20%",
                  height: "40px",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "140%",
                  color: "white",
                  borderRadius: "0",
                  backgroundColor: "#231F20",
                  ":hover": {
                    backgroundColor: "#231F20",
                    color: "white",
                  },
                  textTransform: "uppercase",
                }}
                onClick={() => {
                  closeCancelTransModal();
                }}>
                {"No"}
              </Button>
            </Stack>
          </Box>
        }
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        onClick={() =>
          setOpenCancelTransModal({ ...openCancelTransModal, enable: true })
        }>
        <img
          alt="arrow"
          src={ReplaceImage(ArrowImage)}
          style={{ width: "20px", transform: "rotate(-180deg)" }}
        />
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            marginLeft: "10px",
          }}>
          Go Back
        </Typography>
      </Box>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 150,
          width: "100%",
          marginTop: "10px",
        }}>
        <QRCode
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={upiUrl}
          viewBox={`0 0 256 256`}
        />
      </div>
      <Typography
        sx={{ textAlign: "center", fontSize: "12px", color: "#A7A5A6" }}>
        SCAN QR AND PAY
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <img src="/qr_upis.png" style={{ width: "50%" }}  alt="upi_img"/>
      </Box>
      <Typography
        sx={{
          margin: "10px 20px",
          alignSelf: "center",
          textAlign: "center",
          fontSize: "14px",
          color: "#4F4C4D",
        }}>
        Scan the QR from your mobile using any UPI app like PhonePe, Paytm,
        GooglePay, BHIM, etc
      </Typography>
      <Divider
        sx={{
          margin: "15px 0",
        }}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Typography
          sx={{ fontSize: "14px", color: "#A7A5A6", marginRight: "3px" }}>
          Approve payment within:
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "black",
          }}>{`${time.displayMins}:${time.displaySecs}`}</Typography>
      </Box>
    </Box>
  );
};

export default QRCodePayment;
