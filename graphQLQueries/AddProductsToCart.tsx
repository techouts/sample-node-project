import { gql } from "@apollo/client";

export const ADD_SIMPLE_PRODUCTS_TO_CART = gql`
  mutation addSimpleProductsToCart(
    $cartID: String!
    $skuID: String!
    $quantity: Float!
  ) {
    addSimpleProductsToCart(
      input: {
        cart_id: $cartID
        cart_items: [{ data: { quantity: $quantity, sku: $skuID } }]
      }
    ) {
      cart {
        total_quantity
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
            name
            sku
            brand_name
            brand_info
            price_range {
              minimum_price {
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                }
                discount {
                  amount_off
                  percent_off
                }
              }
            }
            image {
              url
            }
          }
          quantity
        }
      }
    }
  }
`;
export const ADD_CONFIGURABLE_PRODUCTS_TO_CART = gql`
  mutation addConfigurableProductsToCart(
    $cartID: String!
    $skuID: String!
    $parentID: String!
    $quantity: Float!
  ) {
    addConfigurableProductsToCart(
      input: {
        cart_id: $cartID
        cart_items: [
          { parent_sku: $parentID, data: { quantity: $quantity, sku: $skuID } }
        ]
      }
    ) {
      cart {
        total_quantity
        email
        is_egv_cart
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
            brand_info
            categories {
              name
              level
              uid
              category_code
              id
              breadcrumbs {
                category_id
                category_name
              }
              path
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
