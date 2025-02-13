import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { InformationIcon } from "../CartConstants";
import {
  GiftMessageBox,
  ReceiverNameBox,
  SaveGiftBox,
  SendersNameBox,
} from "./GiftCardModalStyles";

function GiftCardModal() {
  return (
    <Box sx={{ padding: "20px" }}>
      <b>GIFT WRAP DETAILS</b>
      <ReceiverNameBox>Receivers Name</ReceiverNameBox>
      <GiftMessageBox>Gift Message</GiftMessageBox>
      <SendersNameBox>Senders Name</SendersNameBox>
      <Typography
        sx={{ fontSize: "12px", color: "#656263", paddingBottom: "20px" }}
      >
        <img
          src={`${ReplaceImage(InformationIcon)}`}
          alt="info image"
          style={{ paddingRight: "4px" }}
        ></img>
        Gift wrap isn’t applicable for COD orders
      </Typography>
      <SaveGiftBox>SAVE GIFT DETAILS</SaveGiftBox>
    </Box>
  );
}

export default GiftCardModal;
