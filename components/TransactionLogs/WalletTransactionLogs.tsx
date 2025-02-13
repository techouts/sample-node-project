import React from "react";
import { Stack } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";
import {
  WalletAmount,
  WalletCustomerTitle,
  WalletLogDate,
  WalletUserTitle,
} from "./TransactionLogsStyles";
import { getLogDate } from "../../utility/DateFormate";

function getCustomer(
  transactionType: string,
  invoiceNumber: string,
  merchantOutletName: string
) {
  switch (transactionType) {
    case "WALLET REDEEM": {
      if (merchantOutletName?.includes("BeautyOnline")) {
        return "SSBeauty";
      } else if (merchantOutletName === "SSL-ShoppersStopOnline") {
        return "Shoppers Stop";
      }
      return "SSBeauty";
    }
    case "ADD CARD TO WALLET": {
      if (invoiceNumber === "") {
        if (merchantOutletName?.includes("BeautyOnline")) {
          return "SSBeauty Gift Cards";
        } else if (merchantOutletName === "SSL-ShoppersStopOnline") {
          return "Shoppers Stop Gift Cards";
        }
        return "SSBeauty Gift Cards";
      } else {
        if (merchantOutletName?.includes("BeautyOnline")) {
          return "SSBeauty Refunds";
        } else if (merchantOutletName === "SSL-ShoppersStopOnline") {
          return "ShoppersStop Refunds";
        } else if (merchantOutletName === "SSL-Corporate") {
          return "ShoppersStop Customer Care Credit";
        }
        return "SSBeauty Refunds";
      }
    }
    case "WALLET LOAD": {
      if (invoiceNumber === "") {
        if (merchantOutletName?.includes("BeautyOnline")) {
          return "SSBeauty Customer Care Credit";
        } else if (
          merchantOutletName === "SSL-ShoppersStopOnline" ||
          merchantOutletName === "SSL-Corporate"
        ) {
          return "ShoppersStop Customer Care Credit";
        }
        return "SSBeauty Customer Care Credit";
      } else {
        if (merchantOutletName?.includes("BeautyOnline")) {
          return "SSBeauty Refunds";
        } else if (merchantOutletName === "SSL-ShoppersStopOnline") {
          return "ShoppersStop Refunds";
        }
        return "SSBeauty Refunds";
      }
    }
    case "WALLET CANCEL REDEEM": {
      if (merchantOutletName?.includes("BeautyOnline")) {
        return "SSBeauty Refunds";
      } else if (merchantOutletName?.includes("SSL-ShoppersStopOnline")) {
        return "Shoppers Stop Refunds";
      }
    }
    default: {
      return "";
    }
  }
}

function getTransactionDebitOrCreditInfo(transactionType: string) {
  switch (transactionType) {
    case "WALLET REDEEM": {
      return "Redeem from SS Wallet";
    }
    case "ADD CARD TO WALLET": {
      return "Credited to SS Wallet";
    }
    case "WALLET LOAD": {
      return "Credited to SS Wallet";
    }
    case "WALLET CANCEL REDEEM": {
      return "Credited to SS Wallet";
    }
    default: {
      return "";
    }
  }
}

function WalletTransactionLogs(data: any) {
  const isMobile = useMobileCheck();
  const isRedeem = data?.transactionType === "WALLET REDEEM";
  const invoiceNumber = data?.invoiceNumber;
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Stack alignItems={"start"}>
        <WalletCustomerTitle isMobile={isMobile}>
          {getCustomer(
            data?.transactionType,
            data?.invoiceNumber,
            data?.merchantOutletName
          )}
        </WalletCustomerTitle>
        <WalletUserTitle isMobile={isMobile}>
          {getTransactionDebitOrCreditInfo(data?.transactionType)}
        </WalletUserTitle>
        {invoiceNumber &&
          invoiceNumber?.trim() !== "" && (
            <WalletUserTitle isMobile={isMobile}>
              {"Order No"}{" "}
            </WalletUserTitle>
          )}
      </Stack>
      <Stack alignItems={"end"}>
        <WalletAmount isMobile={isMobile} isRedeem={isRedeem}>{`${
          isRedeem ? "-" : "+"
        }${data?.amount}`}</WalletAmount>
        <WalletLogDate isMobile={isMobile}>
          {data?.transactionPostDate
            ? getLogDate(data?.transactionPostDate)
            : ""}
        </WalletLogDate>
        <WalletLogDate isMobile={isMobile}>
          {data?.invoiceNumber?.includes("U")
            ? data?.invoiceNumber?.split("_")?.slice(0, 3)?.join("_")
            : data?.invoiceNumber?.split("_")?.slice(0, 2)?.join("_")}
        </WalletLogDate>
      </Stack>
    </Stack>
  );
}

export default WalletTransactionLogs;
