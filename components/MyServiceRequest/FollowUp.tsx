import { Stack, Typography } from "@mui/material";
import React from "react";
import { ContinueButton } from "../CartAddress/PrimaryComponentStyled";
import { useMobileCheck } from "../../utility/isMobile";

function FollowUp(props: {
  handleClose: any;
  details?: string;
}) {
  const isMobile = useMobileCheck();
  const customerSupportDetailsArray =
    props?.details?.split(/[{}]+/);
  return (
    <Stack justifyItems={"center"} alignItems={"center"} p={isMobile ? 3 : 6}>
      {isMobile ? (
        <Typography>
          {customerSupportDetailsArray?.[0]}
          <a
            style={{ color: "#0DC6DF", fontWeight: 600 }}
            href={`tel:${customerSupportDetailsArray?.[1]}`}
          >
            {customerSupportDetailsArray?.[1]}
          </a>
          {customerSupportDetailsArray?.[2]}
        </Typography>
      ) : (
        <Typography>{customerSupportDetailsArray?.join("")}</Typography>
      )}
      <ContinueButton
        sx={{ mt: 2 }}
        onClick={() => {
          props?.handleClose();
        }}
      >
        {"Okay"}
      </ContinueButton>
    </Stack>
  );
}

export default FollowUp;
