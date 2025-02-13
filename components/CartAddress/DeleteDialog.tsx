import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import { useMobileCheck } from "../../utility/isMobile";
import { ModalWrapper, ModalTitle, ActionButton } from "./DeleteDialogStyles"
import { TEXT_CANCEL, TEXT_YES, DELETE_MODAL_TITLE } from "../../utility/Constants"
import triggerGAEvent from "../../utility/GaEvents";
import { removeaddress } from "../../utility/GAConstants";

export const DeleteCard = ({
    deleteData,
    deletehandleClose,
    deleteAddressHandler,
    address,
}: any) => {
    const isMobile = useMobileCheck();
    const callEvent = (linktext: string) => {
        triggerGAEvent(
          {
            widget_title:DELETE_MODAL_TITLE,
            widget_type:"Address",
            item_type:`${address?.default_billin?"Default/":""}${address?.save_as?address?.save_as+"/":""}${address?.city}`,
            event_type:removeaddress,
            link_url:"na",
            link_text:linktext,
          },
          "click"
        );
      };
    return (
        <ModalWrapper>
            <Box>
                <ModalTitle $isMobile={isMobile}>
                    {DELETE_MODAL_TITLE}
                </ModalTitle>
                <Box>
                    <ActionButton $backgroundColor="#231F20" $textColor="#FFFFFF"
                        onClick={() => {deleteAddressHandler(deleteData);
                            callEvent(TEXT_YES)}}
                    >
                        <Typography>{TEXT_YES}</Typography>
                    </ActionButton>
                    <ActionButton $backgroundColor="#DEA3B7" $textColor="#231F20"
                        onClick={() =>{ deletehandleClose();
                            callEvent(TEXT_CANCEL)
                        }}
                    >
                        <Typography>{TEXT_CANCEL}</Typography>
                    </ActionButton>
                </Box>
            </Box>
        </ModalWrapper>
    );
};