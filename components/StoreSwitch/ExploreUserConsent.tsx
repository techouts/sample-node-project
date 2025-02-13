import { Stack, Typography } from "@mui/material";
import React from "react";
import { StyledButton } from "../../components/CartLayout/CartLayoutStyles";
import { useMobileCheck } from "../../utility/isMobile";

export function ExploreUserConsent({
  message,
  rightCta,
  leftCta,
  leftAction,
  rightAction,
  isCartMode,
  commonCta,
  commonCtaAction,
}: {
  message: string;
  leftCta: string;
  rightCta: string;
  rightAction: any;
  leftAction: any;
  isCartMode?: boolean;
  commonCta?: string;
  commonCtaAction?: any;
}) {
  const isMobile = useMobileCheck();
  return (
    <>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "15px 0px",
          borderBottom: "1px solid #A7A5A6",
          fontWeight: "bold",
        }}
      >
        {"Confirm User Action"}
      </Typography>
      <Stack
        mt={3}
        sx={{ padding: "0px 20px" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography>{message}</Typography>
        {isCartMode ? (
          <StyledButton
            $isCartPage={false}
            onClick={commonCtaAction}
            style={{
              background: "white",
              border: "1px solid #AD184C",
              boxShadow: "inset 0 0 0 1px #AD184C, inset 0 1px 0 #AD184C",
              borderRadius: "4px",
              marginRight: "10px",
              padding: "0px 10px",
            }}
          >
            {commonCta}
          </StyledButton>
        ) : (
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            mt={2}
            sx={{ width: "100%" }}
          >
            <StyledButton
              $isCartPage={false}
              onClick={leftAction}
              style={{
                background: "white",
                border: "1px solid #AD184C",
                boxShadow: "inset 0 0 0 1px #AD184C, inset 0 1px 0 #AD184C",
                borderRadius: "4px",
                marginRight: "10px",
                padding: "0px 10px",
              }}
            >
              {leftCta}
            </StyledButton>
            <Stack flexDirection={"row"}>
              <StyledButton
                $isCartPage={false}
                onClick={commonCtaAction}
                style={{
                  background: "white",
                  border: "1px solid #AD184C",
                  boxShadow: "inset 0 0 0 1px #AD184C, inset 0 1px 0 #AD184C",
                  borderRadius: "4px",
                  marginRight: "10px",
                  padding: "0px 10px",
                }}
              >
                {commonCta}
              </StyledButton>

              <StyledButton
                $isCartPage={false}
                onClick={rightAction}
                style={{
                  background: "white",
                  border: "1px solid #AD184C",
                  boxShadow: "inset 0 0 0 1px #AD184C, inset 0 1px 0 #AD184C",
                  borderRadius: "4px",
                  padding: "0px 10px",
                }}
              >
                {rightCta}
              </StyledButton>
            </Stack>
          </Stack>
        )}
      </Stack>
    </>
  );
}
