import { Box } from "@mui/material";
import React, { useState } from "react";
import client from "../../apollo-client";
import { PRODUCT_NOTIFY_ME } from "../../graphQLQueries/ProductQuery";
import { useMobileCheck } from "../../utility/isMobile";
import { toast } from "../../utility/Toast";
import { CANCEL_CTA, contact_type, NOTIFY_MESSAGE, YES_CTA } from "./Constants";
import {
  Buttons,
  ButtonText,
  ContactType,
  DeleteBox,
  MessageText,
  StyledInput,
  StyledStack,
} from "./NotifyPopupStyles";

export const NotifyPopup = ({
  notifyClose,
  sku,
  showLoader,
  openThanks,
}: any) => {
  const isMobile = useMobileCheck();
  const [emailID, setEmailID] = useState("");
  const [error, setError] = useState(false);

  const handleEmailID = (event: any) => {
    setEmailID(event.target.value);
    const emailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (event.target.value.match(emailFormat)) {
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleNotification = () => {
    if (!error) {
      showLoader(true);
      client
        .mutate({
          mutation: PRODUCT_NOTIFY_ME,
          variables: {
            sku: sku,
            mail: emailID,
          },
        })
        .then((response: any) => {
          showLoader(false);
          response && openThanks();
        })
        .catch((error: any) => {
          toast.error("Someting went wrong, Please try again!!!");
          showLoader(false);
        })
        .finally(() => {
          showLoader(false);
        });
      notifyClose();
    }
  };
  return (
    <DeleteBox>
      <Box>
        <MessageText>{NOTIFY_MESSAGE}</MessageText>
        <Box sx={{ textAlign: "start" }}>
          <ContactType>{contact_type}</ContactType>
          <StyledInput
            onChange={handleEmailID}
            helperText={error ? "Please enter valid Email ID" : ""}
          ></StyledInput>
        </Box>
        <StyledStack>
          <Buttons
            isPrimary={false}
            isMobile={isMobile}
            onClick={() => notifyClose()}
          >
            <ButtonText>{CANCEL_CTA}</ButtonText>
          </Buttons>
          <Buttons
            isPrimary={true}
            isMobile={isMobile}
            onClick={() => !error && handleNotification()}
          >
            <ButtonText>{isMobile ? "NOTIFY ME" : YES_CTA}</ButtonText>
          </Buttons>
        </StyledStack>
      </Box>
    </DeleteBox>
  );
};
