import { gql } from "@apollo/client";

export const APPLY_COUPON_TO_CART = gql`
  mutation applyCouponToCart($cartId: String!, $coupon_code: String!) {
    applyCouponToCart(input: { cart_id: $cartId, coupon_code: $coupon_code }) {
      cart {
        email
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
        available_promotions {
          name
          message
          description
          know_more_link
          know_more_text
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
          loyalty_discount {
            label
            value
          }
          egv_discount {
            label
            value
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
        shipping_addresses {
          selected_shipping_method {
            amount {
              value
            }
            carrier_code
            carrier_title
            method_code
            method_title
          }
          available_shipping_methods {
            carrier_code
            carrier_title
            method_code
            method_title
            price_incl_tax {
              value
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_COUPON_FROM_CART = gql`
  mutation removeCouponFromCart($cartId: String!) {
    removeCouponFromCart(input: { cart_id: $cartId }) {
      cart {
        email
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
        available_promotions {
          name
          message
          description
          know_more_link
          know_more_text
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
          loyalty_discount {
            label
            value
          }
          egv_discount {
            label
            value
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
        shipping_addresses {
          selected_shipping_method {
            amount {
              value
            }
            carrier_code
            carrier_title
            method_code
            method_title
          }
          available_shipping_methods {
            carrier_code
            carrier_title
            method_code
            method_title
            price_incl_tax {
              value
            }
          }
        }
      }
    }
  }
`;

export const GET_COUPON_CODES = gql`
  query {
    getCouponCodes {
      coupon_code
      description
      discount_amount
      simple_action
      coupon_applicable
      is_visibility_frontend 
    }
  }
`;
