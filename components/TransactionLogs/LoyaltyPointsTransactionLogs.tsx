import React from "react";
import { Stack } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";
import {
  TransactionNumber,
  WalletAmount,
  AttributeTitle,
  WalletLogDate,
} from "./TransactionLogsStyles";
import { getLogDate } from "../../utility/DateFormate";

function LoyaltyPointsTransactionLogs(data: any) {
  const isMobile = useMobileCheck();
  const isRedeem = Number(data?.validAmount) <= 0;
  return (
    <Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <AttributeTitle isMobile={isMobile}>
          {`Points ${isRedeem ? "Burned" : "Earned"}`}
        </AttributeTitle>
        <WalletAmount isMobile={isMobile} isRedeem={isRedeem}>{`${
          isRedeem ? "-" : "+"
        }${data?.pointsValue}`}</WalletAmount>
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <AttributeTitle isMobile={isMobile}>
          {"Transaction Number"}
        </AttributeTitle>
        <TransactionNumber isMobile={isMobile}>
          {data?.transactionNumber}
        </TransactionNumber>
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <AttributeTitle isMobile={isMobile}>
          {"Transaction Date"}
        </AttributeTitle>
        <WalletLogDate isMobile={isMobile}>
          {data?.transactionDate ? getLogDate(data?.transactionDate) : ""}
        </WalletLogDate>
      </Stack>
    </Stack>
  );
}

export default LoyaltyPointsTransactionLogs;
