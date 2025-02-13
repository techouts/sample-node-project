import { gql } from "@apollo/client";

export const CREATE_BUYNOW_CART = gql`
  mutation createBuyNowCart($productSku: String!, $productQuantity: Float!, $parentID: String!) {
    createBuyNowCart(input: {cart_items: [{data: {quantity: $productQuantity, sku: $productSku}, parent_sku: $parentID}]}) {
      cart_id
    }
  }
`;

export const MERGE_ACTIVE_CARTS = gql`
  mutation mergeActiveCarts($BuyNowCart: String!, $CustomerCart: String!) {
    mergeActiveCarts(
      source_cart_id: $BuyNowCart
      destination_cart_id: $CustomerCart
    ) {
      cart_id
    }
  }
`;

export const MERGE_GUEST_CARTS = gql`
  mutation mergeCarts($source_cart_id: String!, $destination_cart_id: String!) {
    mergeCarts(
      source_cart_id: $source_cart_id
      destination_cart_id: $destination_cart_id
    ) {
      id
      total_quantity
      items {
        id
        product {
          name
          sku
        }
        quantity
      }
    }
  }
`;

export const ASSIGN_CUSTOMER_TO_GUEST_CART = gql`
  mutation assignCustomerToGuestCart($GuestCartId: String!) {
    assignCustomerToGuestCart(cart_id: $GuestCartId) {
      total_quantity
      mp_free_gifts {
        rule_id
        auto_add
        max_gift
        gifts {
          id
          name
          gift_price
          free_ship
          added
          configurable
          required_option
          sku
          final_price
          image
        }
      }
      items {
        mp_free_gifts {
          allow_notice
          free_gift_message
          is_free_gift
          rule_id
        }
        id
        uid
        product {
          image {
            url
          }
          stock_status
          cod_available
          name
          rating_summary
          sku
          color
          size
          brand_name
          categories {
            name
            level
            uid
            category_code
          }
          type_id
        }
        ... on ConfigurableCartItem {
          configured_variant {
            sku
            id
            color
            size
            name
            image {
              url
            }
          }
          configurable_options {
            id
            configurable_product_option_uid
            option_label
            configurable_product_option_value_uid
            value_label
          }
        }
        ... on SimpleCartItem {
          customizable_options {
            label
            values {
              value
            }
          }
        }
        prices {
          total_item_discount {
            value
          }
          row_total {
            value
          }
          price {
            value
          }
          discounts {
            label
            amount {
              value
            }
          }
        }
        product {
          name
          sku
          created_at
        }
        quantity
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
      applied_coupons {
        code
      }
      prices {
        applied_taxes {
          amount {
            currency
            value
          }
        }
        discount {
          amount {
            currency
            value
          }
        }
        grand_total {
          currency
          value
        }
        subtotal_excluding_tax {
          currency
          value
        }
        subtotal_including_tax {
          currency
          value
        }
        subtotal_with_discount_excluding_tax {
          currency
          value
        }
      }
      promotion_total {
        code
        amount
      }
      pmr_promotions {
        code
        amount
      }
      wallet_discount {
        code
        amount
      }
    }
  }
`;
