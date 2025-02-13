import { gql } from "@apollo/client";

export const AddEGVToCartQuery = gql`
  mutation AddEGVToCart(
    $price: Float!
    $fullName: String!
    $email: String!
    $telephone: String!
    $message: String!
    $senderName: String!
    $senderEmail: String!
    $sku: String!
    $image: [String!]!
  ) {
    AddEGVToCart(
      input: {
        price: $price
        fullname: $fullName
        email: $email
        telephone: $telephone
        message: $message
        sendername: $senderName
        senderemail: $senderEmail
        sku: $sku
        image: $image
      }
    ) {
      cartID
      status
      message
    }
  }
`;
