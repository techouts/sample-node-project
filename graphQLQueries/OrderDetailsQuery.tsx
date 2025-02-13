import { gql } from "@apollo/client";
export const GET_ORDER_SUMMARY = gql`
  query customer($orderNumber: String!) {
    customer {
      email
      orders(filter: { number: { eq: $orderNumber } }) {
        total_count
        items {
          shipping_method
          payment_methods {
            name
            type
            additional_data {
              name
              value
            }
          }
          applied_promotions_cart_level_amount
          coupon_amount
          awb_number
          fulfilment_id
          fulfilment_ref
          fulfilment_item_id
          fulfilment_unique_id
          invoice_url
          lsp_name
          is_exchange
          status
          state
          order_date
          order_id
          is_egv_cart
          is_rto
          egv_additional_options
          egv_image
          old_order_number
          return_date
          billing_address {
            firstname
            lastname
            telephone
            city
            street
            postcode
          }
          shipping_address {
            firstname
            lastname
            telephone
            city
            street
            postcode
          }

          carrier
          id
          number
          items {
            id
            coupon_code
            coupon_amount
            applied_pmr_promotions
            applied_pmr_promotions_amount
            delivery_charges
            parent_sku
            product_name
            item_id
            product_sku
            average_rating
            image
            stock_status
            estimated_delivery_date
            product_url_key
            store_details {
              source_code
              name
              region
              city
              street
              postcode
              street_number
            }
            return_details {
              juspay_reference_id
              juspay_refund_mode
              order_number
              sku
              # neft_bank
              return_fulfilment_ref
              fulfilment_ref
              quantity
              fulfilment_type
              reason
              state
              return_initiated_date
              send_back_method
              awb_number
              total_refund
              wallet_refund
              egv_refund
              rma_number
              customer_bank_number
            }
            exchange_details {
              order_number
              sku
              return_fulfilment_ref
              fulfilment_ref
              quantity
              fulfilment_type
              reason
              state
              return_initiated_date
              send_back_method
              awb_number
              exchange_order_number
              rma_number
            }
            cancel_details {
              # neft_bank
              juspay_reference_id
              juspay_refund_mode
              cancel_id
              order_number
              quantity
              cancellation_reason
              state
              total_refund
              wallet_refund
              egv_refund
              cancel_initiated_date
            }
            product_sale_price {
              value
            }
            product_sale_price {
              value
              currency
            }
            quantity_ordered
            quantity_invoiced
            quantity_shipped
            quantity_exchanged
            quantity_returned
            quantity_canceled
            base_discount_amount
            base_apportioned_delivery_charges
            discounts {
              amount {
                value
              }
            }
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
            grand_total {
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

export const reorderItems = gql`
  mutation reorderItems($orderNumber: String!) {
    reorderItems(orderNumber: $orderNumber) {
      cart {
        id
        email
        items {
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
      userInputErrors {
        code
        message
        path
      }
    }
  }
`;

export const cancelItems = gql`
  mutation updateOrderStatus(
    $order_number: String!
    $status: String!
    $state: String!
    $cancellation_reason: String!
  ) {
    updateOrderStatus(
      order_number: $order_number
      status: $status
      state: $state
      cancellation_reason: $cancellation_reason
    ) {
      status
      message
    }
  }
`;

export const delivaryReview = gql`
query getReviewReasons(
  $rating:Int!
){
  getReviewReasons(rating:$rating) {
      reviewreasons_id
      reason
  }
}
`;

export const delivaryReviewSubmit = gql`
mutation createDeliveryReview(
      $shipment_id:String!
      $rating: Int
      $reason: String!
      $comment: String!
  ) {
  createDeliveryReview(
      shipment_id:$shipment_id
      rating: $rating
      reason: $reason
      comment: $comment
  ) {
      deliveryreview_id
      created_at
      shipment_id
      rating
      reason
      comment
  }
}
`;

export const getDelivaryPartner = gql`
query getDeliveryPartner(
  $shipment_id:String!
){
  getDeliveryPartner(shipment_id:$shipment_id) {
      delivery_partner
      feedback_given
      feedback_frame_expired
  }
}
`;

