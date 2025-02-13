import { gql } from "@apollo/client";

export const ADD_ITEMS_TO_CART = gql`
  mutation AddProductsToCart(
    $cartId: String!
    $productSku: String!
    $productQuantity: Float!
  ) {
    addSimpleProductsToCart(
      input: {
        cart_id: $cartId
        cart_items: [{ data: { quantity: $productQuantity, sku: $productSku } }]
      }
    ) {
      cart {
        items {
          id
          product {
            sku
            stock_status
          }
          quantity
        }
      }
    }
  }
`;
