import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import { event_type, widgetType } from "../../utility/GAConstants";
import { useMobileCheck } from "../../utility/isMobile";
import { callEventMyProfile } from "../MyProfileLayout/MyprofileAnalytics";
import {
  DeleteBox,
  MessageText,
  Buttons,
} from "./EditAddress/EditAddressStyles";
const DeleteCard = ({
  deleteData,
  deletehandleClose,
  optionId,
  deleteAddressHandler,
}: any) => {
  const isMobile = useMobileCheck();
  return (
    <DeleteBox p={deleteData?.bgPadding}>
      <Box>
        <MessageText isMobile={isMobile}>
          {deleteData?.delete?.deleteTitle}
        </MessageText>
        <Box>
          <Buttons isFlag={true} onClick={() => deleteAddressHandler(optionId)}>
            <Typography
              sx={{ padding: isMobile ? "6px 18px" : "14px 26px" }}
              onClick={() => {
                deletehandleClose();
                callEventMyProfile(
                  event_type,
                  widgetType
                );
              }}
            >
              {deleteData?.delete?.deleteSave}
            </Typography>
          </Buttons>
          <Buttons
            isFlag={false}
            onClick={() => {
              deletehandleClose();
              callEventMyProfile(
                event_type,
                widgetType
              );
            }}
          >
            <Typography sx={{ padding: isMobile ? "6px 26px" : "14px 26px" }}>
              {deleteData?.delete?.deleteCancel}
            </Typography>
          </Buttons>
        </Box>
      </Box>
    </DeleteBox>
  );
};

export default DeleteCard;
