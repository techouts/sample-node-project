import { gql } from "@apollo/client";

export const RETURN_ORDER_MUTATION = gql`
  mutation createRma(
    $OrderID: String!
    $store_id: Int!
    $RefundPaymentMethod: String!
    $OtherReason: String!
    $ImageURL: [String!]!
    $SendBackMethod: String!
    # $SelectedDate: String!
    # $SelectedTime: String!
    $OrderItemID: Int!
    $Sku: String!
    $SelectedReason: Int!
    $QuantityRequested: Int!
    $FulfilmentID: String!
    $ResolutionID: Int!
    $IsExchange: Boolean!
    $BankReferenceKey: Int!
  ) {
    createRma(
      input: {
        rma_orders: {
          order_id: $OrderID
          store_id: $store_id
          refund_payment_method: $RefundPaymentMethod
          other_reason: $OtherReason
          photo: $ImageURL
          send_back_method: $SendBackMethod
          # select_date: $SelectedDate
          # select_time: $SelectedTime
          type: "regular"
          fulfilment_ref: $FulfilmentID
          items: {
            order_item_id: $OrderItemID
            qty_requested: $QuantityRequested
            product_sku: $Sku
            reason_id: $SelectedReason
            resolution_id: $ResolutionID
            is_exchange: $IsExchange
            bank_reference_key: $BankReferenceKey
          }
        }
      }
    ) {
      rma {
        increment_id
        status_id
        date_requested
        orders {
          order_number
          type
        }
      }
    }
  }
`;

export const REASON_FOR_RETURN = gql`
  query {
    GetRMAReasons {
      rma_reason
      reason_id
    }
  }
`;
export const REASON_FOR_CANCELLATION = gql`
  query {
    GetCancelReasons {
      cancel_id
      cancel_reason
    }
  }
`;

export const RMA_ADD_BANK_DETAILS = gql`
  mutation AddBankDetails(
    $OrderID: String!
    $AccountHolderName: String!
    $AccountHolderIFSC: String!
    $AccountHolderAccNum: String!
    $AccountHolderConfirmAccNum: String!
    $AccountHolderMobNum: String!
  ) {
    AddBankDetails(
      order_id: $OrderID
      name: $AccountHolderName
      ifsc_code: $AccountHolderIFSC
      account_number: $AccountHolderAccNum
      confirm_account_number: $AccountHolderConfirmAccNum
      mobile_number: $AccountHolderMobNum
    ) {
      status
      message
      reference_number
    }
  }
`;
