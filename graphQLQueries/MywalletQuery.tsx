import { gql } from "@apollo/client";
export const MywalletBalance = gql`
  query {
    getWalletBalance {
      buckets {
        type
        amount
        numOfCards
      }
      wallet {
        status
        walletNumber
        externalWalletId
        walletPin
        trackData
        barCode
        walletProgramGroupName
        walletHolderName
        balance
        consolidatedBalance
        notes
        card {
          cardNumber
          cardType
          cardBalance
          cardStatus
          cardProgramName
          bucketType
          responseCode
          redeemStartDate
          responseMessage
          expiry
          amount
        }
        status
        customer {
          customerType
        }
      }
    }
  }
`;

export const CheckBal = gql`
  mutation checkBalance($cardNumber: String!, $cardPIN: String!) {
    checkBalance(request: { CardNumber: $cardNumber, CardPIN: $cardPIN }) {
      amount
      approvalCode
      responseMessage
      activationURL
      activationDate
      activationCode
      addonCardNumber
      adjustmentAmount
      addonCardTrackData
      barcode
      bulkType
      billAmount
      cardPIN
      culture
      cardType
      customer
      cardNumber
      cardExpiry
      cardStatus
      cardStatusId
      cardProgramID
      corporateName
      cardCreationType
      currencyPosition
      cardProgramGroupType
      currencyDecimalDigits
    }
  }
`;

export const addPreActivatedCardToWallet = gql`
  mutation addPreActivatedCardToWallet(
    $cardNumber: String!
    $cardPIN: String!
  ) {
    addPreActivatedCardToWallet(
      request: { CardNumber: $cardNumber, CardPin: $cardPIN }
    ) {
      wallet {
        walletNumber
        #externalWalletId
        walletPin
      }
      billAmount
      invoiceNumber
      currentBatchNumber
      notes
      responseCode
      approvalCode
      responseMessage
      transactionId
      transactionType
      errorCode
      errorDescription
    }
  }
`;
