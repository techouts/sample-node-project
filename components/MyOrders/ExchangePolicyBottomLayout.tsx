import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import React from "react";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  ButtonStyled,
  ExchangeAndReturnPolicyTypography,
  PhoneTypography,
} from "./ExchangePolicyBottomLayoutStyled";

const ExchangePolicyBottomLayout = ({ cancelledOrderState }: any) => {
  const isMobile = useMobileCheck("(min-width : 900px )");
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          paddingTop: isMobile ? "25px" : "24px",
        }}
      >
        <Typography sx={{ fontSize: isMobile ? "12px" : "16px" }}>
          Read Our
        </Typography>

        <ExchangeAndReturnPolicyTypography
          sx={{ cursor: "pointer" }}
          onClick={() =>
            isMobile ? window.location.assign(
              cancelledOrderState
                ? "/miscs/cancellation-policy"
                : "/miscs/exchange-return"
            ) : window.open(
              cancelledOrderState
                ? "/miscs/cancellation-policy"
                : "/miscs/exchange-return"
            )
          }
        >
          {cancelledOrderState
            ? "Cancellation Policy"
            : "Exchange & Return Policy"}
        </ExchangeAndReturnPolicyTypography>
      </Box>

      <Typography sx={{ fontSize: isMobile ? "12px" : "16px" }}> Or</Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
          src={`${ReplaceImage("https://i.ibb.co/JHP52G6/call-calling.png")}`}
          alt="add-address logo"
          width={"18px"}
          height={"18px"}
          style={{ marginRight: "8px" }}
        />

        <Typography sx={{ fontSize: isMobile ? "12px" : "16px" }}>
          Call Us from 10 a.m to 8 p.m
        </Typography>
      </Box>
      <PhoneTypography>1800-210-4555</PhoneTypography>

      <Box>
        <ButtonStyled onClick={() => router?.push("/home")}>
          Continue Shopping
        </ButtonStyled>
      </Box>
    </Box>
  );
};

export default ExchangePolicyBottomLayout;
