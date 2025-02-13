import { gql } from "@apollo/client";
import graphql from "../middleware-graphql";
import { getCurrentFormattedDate } from "../utility/DateFormate";

export const WALLET_TRANSACTION_LOGS = gql`
  query {
    getTransactionHistory {
      transactionsTotalPages
      walletTransactions {
        walletNumber
        invoiceNumber
        dateAtServer
        batchNumber
        amount
        preTransactionBalance
        balance
        billAmount
        merchantOutletName
        transactionPostDate
        transactionStatus
        user
        merchantName
        pOSName
        customerName
        walletPIN
        cards {
          amount
          cardProgramName
          redeemStartDate
          bucketType
          cardBalance
          cardNumber
          expiry
          cardStatus
          notes
          responseCode
          responseMessage
        }
        apiWebProperties
        notes
        approvalCode
        responseCode
        responseMessage
        transactionId
        transactionType
        errorCode
        errorDescription
      }
      currentBatchNumber
      notes
      approvalCode
      responseCode
      responseMessage
      transactionId
      transactionType
      errorCode
      errorDescription
    }
  }
`;

export const WALLET_TRANSACTION = gql`
  mutation walletTransation(
    $startIndex: Float
    $noOfTransactions: Float
    $beginDate: String
    $endDate: String
    $transactionTypeIdToFilter: String
  ) {
    walletTransation(
      startIndex: $startIndex
      noOfTransactions: $noOfTransactions
      beginDate: $beginDate
      endDate: $endDate
      transactionTypeIdToFilter: $transactionTypeIdToFilter
    ) {
      totalNoOfTransactions
      transactionsTotalPages
      currentBatchNumber
      notes
      approvalCode
      responseCode
      responseMessage
      transactionId
      transactionType
      errorCode
      errorDescription
      preAuthCode
      walletTransactions {
        invoiceNumber
        dateAtServer
        batchNumber
        amount
        preTransactionBalance
        balance
        billAmount
        merchantOutletName
        transactionPostDate
        transactionStatus
        transactionType
        user
        merchantName
        pOSName
        customerName
        walletPIN
        preTransactionConsolidatedBalance
        consolidatedBalance
        outletGroup

        cards {
          redeemStartDate
          cardNumber
          amount
          cardBalance
          cardProgramName
          cardStatus
          cardType
          expiry
          bucketType
          notes
          responseCode
          responseMessage
        }
      }
    }
  }
`;

export function getLoyaltyPointTransaction() {
  return `query {
    getTransaction(
      getTxnRequest: {
        inquiryType: "RT"
        numberOfTxn: "20"
        startDate: "2022-10-27"
        endDate: "${getCurrentFormattedDate()}"
      }
    ) {
      errorMsg
      getTxnResponse {
        responseCode
        memberNumber
        correlationID
        details {
          txnData {
            transactionNumber
            transactionDate
            pointsGivenAmount
            transactionNumber
            validAmount
            grossAmount
            registerNumber
            rollOverNumber
            certificateNumber
            orderConfirmationNumber
            points
            pointsValue
            pointsFlag
            storeNumber
            remark
          }
        }
      }
    }
  }`;
}

export const LOYALTY_POINT_TRANSACTION_LOGS = gql`
  ${getLoyaltyPointTransaction()}
`;

async function fetchWalletTransactionLogs() {
  const res = await graphql
    .query({
      query: WALLET_TRANSACTION_LOGS,
      fetchPolicy: "no-cache",
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error: any) => {
      console.log("error", error);
      return null;
    });
  return res;
}
export const walletTransaction = async (
  beginDate: Date | undefined,
  endDate: Date | undefined
) => {
  const response = await graphql
    .mutate({
      mutation: WALLET_TRANSACTION,
      variables: {
        startIndex: 1,
        noOfTransactions: beginDate ? 100 : 10,
        beginDate: beginDate,
        endDate: endDate,
        transactionTypeIdToFilter: "504",
      },
    })
    // console.log(response,"==response")
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => {
      // toast.error("Someting went wrong, Please try again!!!");
      console.log("error!!!!", error);
    });
  return response;
};

async function fetchLoyaltyPointsTransactionLogs() {
  const res = await graphql
    .query({
      query: LOYALTY_POINT_TRANSACTION_LOGS,
      fetchPolicy: "no-cache",
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error: any) => {
      console.log("error", error);
      return null;
    });
  return res;
}

export { fetchWalletTransactionLogs, fetchLoyaltyPointsTransactionLogs };
