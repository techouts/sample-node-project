import { gql } from "@apollo/client";

export const APPLY_WALLET_AMOUNT = gql`
  mutation applyWalletAmount(
    $cart_id: String!
    $wallet_amount: Float!
    $wallet_pin: String!
  ) {
    applyWalletAmount(
      cart_id: $cart_id
      redemption_amount: $wallet_amount
      wallet_pin: $wallet_pin
    ) {
      applied_coupons {
        code
      }
      item_level_promotions {
        sku
        discount
        pmrRules {
          name
          code
          amount
        }
      }
      promotion_total {
        code
        amount
      }
      prices {
        discounts {
          amount {
            value
          }
          label
        }
        subtotal_including_tax {
          value
        }
        grand_total {
          value
        }
      }
      wallet_discount {
        code
        amount
      }
    }
  }
`;

export const REMOVE_WALLET_AMOUNT = gql`
  query removeWalletAmount($cart_id: String!) {
    removeWalletAmount(cart_id: $cart_id) {
      applied_coupons {
        code
      }
      item_level_promotions {
        sku
        discount
        pmrRules {
          name
          code
          amount
        }
      }
      promotion_total {
        code
        amount
      }
      prices {
        discounts {
          amount {
            value
          }
          label
        }
        subtotal_including_tax {
          value
        }
        grand_total {
          value
        }
      }
      wallet_discount {
        code
        amount
      }
    }
  }
`;

export const OTPForWALLET = gql`
  mutation otpForWallet($cart_id: String!, $access_token: String!) {
    otpForWallet(cart_id: $cart_id, access_token: $access_token) {
      status
      message
    }
  }
`;

export const PlaceWalletOrder = gql`
  mutation confirmPlaceOrder($cart_id: String!, $access_token: String!, $source_from_info: String!) {
    confirmPlaceOrder(
      input: { cart_id: $cart_id, access_token: $access_token, source_from_info: $source_from_info  }
    ) {
      order {
        order_number
      }
    }
  }
`;
