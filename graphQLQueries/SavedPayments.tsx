import { gql } from "@apollo/client";

export const SAVED_CARD_PAYMENTS = gql`
  mutation {
    savedPaymentMethod {
      cards {
        name_on_card
        card_token
        card_exp_month
        card_reference
        card_number
        card_isin
        card_exp_year
        card_type
        card_issuer
        card_brand
        nickname
        expired
        card_fingerprint
      }
      UpiIds {
        upi_id
        is_default
      }
    }
  }
`;

export const SAVED_CARD_PAYMENTS_CHECK = gql`
  mutation {
    savedPaymentMethod {
      cards {
        card_token
      }
      UpiIds {
        upi_id
      }
    }
  }
`;

export const SAVE_CARD_DETAILS = gql`
  mutation ($card_token: String!) {
    SaveCustomerCard(card_token: $card_token) {
      status
      message
    }
  }
`;

export const DELETE_CARD_DETAILS = gql`
  mutation ($card_token: String!) {
    DeleteCustomerCard(card_token: $card_token) {
      status
      message
    }
  }
`;

export const SET_UPI_DATA = gql`
  mutation ($upiId: String!, $isDefault: Boolean!) {
    SaveCustomerUpiId(upi_id: $upiId, is_default: $isDefault) {
      message
      status
    }
  }
`;

export const DELETE_UPI_DATA = gql`
  mutation ($upiId: String!) {
    DeleteCustomerUpiId(upi_id: $upiId) {
      message
      status
    }
  }
`;
