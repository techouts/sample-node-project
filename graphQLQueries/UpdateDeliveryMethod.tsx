import { gql } from "@apollo/client";

export const UPDATE_STANDARD_DELIVERY_METHOD = gql`
  mutation UpdateDeliveryMethod(
    $cartId: String!
    $deliveryMethods: [DeliveryMethodsInput]
  ) {
    UpdateDeliveryMethod(cart_id: $cartId, input: $deliveryMethods) {
      status
      message
    }
  }
`;

export const UPDATE_CNC_DELIVERY_METHOD = gql`
  mutation SaveCncStore(
    $cartId: String!
    $cncStoreId: String!
  ) {
    SaveCncStore(cart_id: $cartId, cnc_store: $cncStoreId) {
      status
      message
    }
  }
`;