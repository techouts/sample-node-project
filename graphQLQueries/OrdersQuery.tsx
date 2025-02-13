import { gql } from "@apollo/client";
export const GET_ORDERS_DATA = gql`
  query GetAllOrders(
    $search: String
    $pageSize: Int!
    $filter: CustomerOrdersFilterInput
    $sort: SortingInput
    $currentPage: Int!
  ) {
    customer {
      firstname
      orders(
        search: $search
        filter: $filter
        sort: $sort
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        total_count
        items {
          id
          status
          state
          applied_promotions_cart_level_amount
          coupon_amount
          order_number
          order_id
          is_egv_cart
          egv_additional_options
          egv_image
          created_at
          awb_number
          fulfilment_id
          fulfilment_ref
          fulfilment_unique_id
          invoice_url
          lsp_name
          is_exchange
          items {
            id
            coupon_amount
            product_name
            item_id
            parent_sku
            product_sku
            image
            stock_status
            average_rating
            quantity_ordered
            quantity_exchanged
            quantity_canceled
            quantity_returned
            base_discount_amount
            base_apportioned_delivery_charges
            product_sale_price {
              value
              currency
            }
            fulfilment_details {
              fulfilment_id
              lSPAlias
              aWBNumber
              fullfillmentRef
              consignmentId
              quantity
            }
            selected_options {
              label
              value
            }
            discounts {
              amount {
                currency
                value
              }
            }
          }
        }
      }
    }
  }
`;