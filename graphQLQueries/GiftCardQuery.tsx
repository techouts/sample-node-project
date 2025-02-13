import { gql } from "@apollo/client";

export const REDEEM_EGV_CARD = gql`
  mutation applyEgvAmount(
    $cart_id: String!
    $amount: Float!
    $access_token: String!
    $card_number: String!
    $card_pin: String!
  ) {
    applyEgvAmount(
      cart_id: $cart_id
      amount: $amount
      access_token: $access_token
      card_number: $card_number
      card_pin: $card_pin
    ) {
      id
      prices {
        grand_total {
          value
          currency
        }
        egv_discount {
          label
          value
        }
      }
    }
  }
`;

export const REMOVE_EGV_CARD = gql`
  query removeEgvAmount($cart_id: String!) {
    removeEgvAmount(cart_id: $cart_id) {
      id
      prices {
        grand_total {
          value
          currency
        }
      }
    }
  }
`;
