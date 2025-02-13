import { gql } from "@apollo/client";

export const CreateEmptyCart = gql`
  mutation {
    createEmptyCart
  }
`;

export const CART_ACTIVE_INFO = gql`
  query cart($cartId: String!) {
    cart(cart_id: $cartId) {
      email
      items {
        uid
      }
    }
  }
`;

export const CUSTOMER_CART = gql`
  query cart($cartId: String!) {
    cart(cart_id: $cartId) {
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
        unique_id
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
          id
          categories {
            name
            level
            uid
            category_code
            id
            path
            breadcrumbs{
              category_id
              category_name
            }
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
      available_promotions {
        name
        message
        description
        know_more_link
        know_more_text
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
`;

export const GETCUSTOMER_CART_ITEMS = gql`
  query customerCart {
    customerCart {
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

export const GETCUSTOMER_CART = gql`
  query customerCart {
    customerCart {
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

export const GETCUSTOMER_CART_COUNT = gql`
  query customerCart {
    customerCart {
      id
      total_quantity
    }
  }
`;

export const CREATE_JUSPAY_ORDER = gql`
  mutation placeJuspayOrder(
    $cart_id: String!
    $return_url: String!
    $method: String!
    $saved_payment: Boolean!
    $access_token: String!
    $source_from_info: String!
  ) {
    placeJuspayOrder(
      input: {
        cart_id: $cart_id
        return_url: $return_url
        method: $method
        saved_payment: $saved_payment
        access_token: $access_token
        source_from_info: $source_from_info
      }
    ) {
      order_id
      success
      message
    }
  }
`;
