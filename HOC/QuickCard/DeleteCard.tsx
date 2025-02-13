import { Box } from "@mui/material";
import React from "react";
import { useMobileCheck } from "../../utility/isMobile";
import { CANCEL_CTA, cardMessage, YES_CTA } from "./Constants";
import {
  Buttons,
  ButtonText,
  DeleteBox,
  MessageText,
} from "./DeleteCardStyles";
export const DeleteCard = ({ handleRemoveWishlist, closeDeleteCard }: any) => {
  const isMobile = useMobileCheck();
  return (
    <DeleteBox p={isMobile ? 4 : 10}>
      <Box>
        <MessageText>{cardMessage}</MessageText>
        <Box>
          <Buttons
            isPrimary={true}
            isMobile={isMobile}
            onClick={() => handleRemoveWishlist()}
          >
            <ButtonText>{YES_CTA}</ButtonText>
          </Buttons>
          <Buttons
            isPrimary={false}
            isMobile={isMobile}
            onClick={() => closeDeleteCard()}
          >
            <ButtonText>{CANCEL_CTA}</ButtonText>
          </Buttons>
        </Box>
      </Box>
    </DeleteBox>
  );
};
