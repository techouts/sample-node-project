import { gql } from "@apollo/client";
export const setShippingMethodQuery = gql`
  mutation setShippingMethodsOnCart(
    $cartId: String!
    $carrier_code: String!
    $method_code: String!
  ) {
    setShippingMethodsOnCart(
      input: {
        cart_id: $cartId
        shipping_methods: [
          { carrier_code: $carrier_code, method_code: $method_code }
        ]
      }
    ) {
      cart {
        shipping_addresses {
          selected_shipping_method {
            carrier_code
            method_code
            carrier_title
            method_title
          }
        }
      }
    }
  }
`;

export const SetPaymentMethodQuery = gql`
  mutation setPaymentMethodOnCart($cartId: String!, $code: String!) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: { code: $code } }
    ) {
      cart {
        selected_payment_method {
          code
        }
      }
    }
  }
`;

export const OrderPlaceQuery = gql`
  mutation confirmPlaceOrder($cart_id: String!, $access_token: String!, $source_from_info: String!) {
    confirmPlaceOrder(input: { cart_id: $cart_id, access_token: $access_token, source_from_info: $source_from_info }) {
      order {
        order_number
        status
        message
      }
    }
  }
`;

export const VERIFY_UPI = gql`
mutation validateVPA($input: String!){
  validateVPA(
    input: $input
  ){
    vpa
    status
    customer_name
    mandate_details {
      is_handle_supported
    }
  }  
}
`