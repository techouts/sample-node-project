import { gql } from "@apollo/client";

export const OTPForLoyality = gql`
  mutation otpForLoyalty($cart_id: String!, $access_token: String!) {
    otpForLoyalty(cart_id: $cart_id, access_token: $access_token) {
      status
      message
    }
  }
`;
export const APPLY_WALLET_LOYALITY = gql`
  mutation applyLoyaltyAmount(
    $cart_id: String!
    $loyalty_point: Float!
    $otp: String!
    $access_token: String!
  ) {
    applyLoyaltyAmount(
      cart_id: $cart_id
      loyalty_point: $loyalty_point
      otp: $otp
      access_token: $access_token
    ) {
      id
      prices {
        grand_total {
          value
          currency
        }
        loyalty_discount {
          label
          value
        }
      }
    }
  }
`;
export const PlaceLoyalityOrder = gql`
  mutation confirmPlaceOrder($cart_id: String!, $access_token: String!, $source_from_info: String!) {
    confirmPlaceOrder(
      input: { cart_id: $cart_id, access_token: $access_token, source_from_info: $source_from_info }
    ) {
      order {
        order_number
      }
    }
  }
`;

export const REMOVE_LOYALTY_AMOUNT = gql`
  query removeLoyaltyAmount($cart_id: String!) {
    removeLoyaltyAmount(cart_id: $cart_id) {
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