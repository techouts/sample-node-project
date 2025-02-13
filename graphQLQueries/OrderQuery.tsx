import { gql } from '@apollo/client';
export const customerOrdersQuery = gql`
  query customer($orderId: String!) {
    customer {
      orders(filter: { number: { eq: $orderId } }) {
        total_count
        items {
          id
          order_number
          order_id
          order_date
          status
          state
          is_egv_cart
          egv_additional_options
          egv_image
          shipping_method
          applied_promotions_cart_level_amount
          coupon_amount
          payment_methods {
            name
            type
            additional_data {
              name
              value
            }
          }
          items {
            coupon_amount
            applied_pmr_promotions_amount
            coupon_code
            store_details {
              city
              name
              postcode
              region
              source_code
              street
              street_number
            }
            brand_name
            product_name
            product_sku
            parent_sku
            item_id
            unique_id
            product_url_key
            image
            average_rating
            selected_options {
              label
              value
            }
            categories {
              level
              name
              uid
              id
              breadcrumbs{
                category_id
                category_name
              }
              path
            }
            product_sale_price {
              value
              currency
            }
            quantity_ordered
            quantity_invoiced
            base_discount_amount
            base_apportioned_delivery_charges
          }
          billing_address {
            city
            firstname
            lastname
            postcode
            street
            telephone
            region
          }
          shipping_address {
            city
            firstname
            lastname
            postcode
            street
            telephone
            region
          }
          carrier
          shipments {
            id
            number
            items {
              product_name
              quantity_shipped
            }
          }
          total {
            base_grand_total {
              value
              currency
            }
            wallet_discount {
              code
              amount
            }
            loyalty_discount {
              code
              amount
            }
            egv_discount {
              code
              amount
            }
            grand_total {
              value
              currency
            }
            total_tax {
              value
            }
            subtotal {
              value
              currency
            }
            taxes {
              amount {
                value
                currency
              }
              title
              rate
            }
            total_shipping {
              value
            }
            shipping_handling {
              amount_including_tax {
                value
              }
              amount_excluding_tax {
                value
              }
              total_amount {
                value
              }
              taxes {
                amount {
                  value
                }
                title
                rate
              }
            }
            discounts {
              amount {
                value
                currency
              }
              label
            }
          }
        }
      }
    }
  }
`;
