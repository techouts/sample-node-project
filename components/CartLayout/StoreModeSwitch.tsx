import { Stack, Typography } from "@mui/material";
import React from "react";
import { StyledButton } from "./CartLayoutStyles";
import UserInfoInterface from "../../schemas/userInfoAtom";
 
export function StoreModeSwitch({
  userDataItems,
  handleStoreModeSwitch,
}: {
  handleStoreModeSwitch: any;
  userDataItems: UserInfoInterface;
}) {
  return (
    <Stack
      flexDirection={"row"}
      p={1}
      mb={1}
      sx={{ background: "#F8EDF1", width: "100%" }}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography>
        {`Do you wish to opt for ${
          userDataItems?.storeModeType === "cc"
            ? "Home Delivery"
            : "Pay and Pick"
        } mode?`}
      </Typography>
      <StyledButton
        $isCartPage={true}
        sx={{ margin: "0px", padding: "0px 8px" }}
        onClick={() => {
          handleStoreModeSwitch();
        }}
      >
        Yes
      </StyledButton>
    </Stack>
  );
}