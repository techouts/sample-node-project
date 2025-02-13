import { gql } from "@apollo/client";

export const AddShippingAddressQuery = gql`
  mutation setShippingAddressesOnCart(
    $cartId: String!
    $firstname: String!
    $lastname: String!
    $company: String!
    $street: String!
    $city: String!
    $region: String!
    $region_id: Int!
    $postcode: String!
    $country_code: String!
    $telephone: String!
    $save_in_address_book: Boolean!
    $utmsource: String!
  ) {
    setShippingAddressesOnCart(
      input: {
        cart_id: $cartId
        shipping_addresses: [
          {
            address: {
              firstname: $firstname
              lastname: $lastname
              company: $company
              street: [$street]
              city: $city
              region: $region
              region_id: $region_id
              postcode: $postcode
              country_code: $country_code
              telephone: $telephone
              save_in_address_book: $save_in_address_book
            }
          }
        ],
        utmsource: $utmsource
      }
    ) {
      cart {
        items {
          quantity
          id
        }
        shipping_addresses {
          firstname
          lastname
          company
          street
          city
          region {
            code
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          available_shipping_methods {
            carrier_code
            carrier_title
            method_code
            method_title
          }
        }
      }
      gokwick_response {
        status
        message
        data {
          request_id
          risk_flag
          reason
        }
        error {
          location
          message
          type
        }
      }
      gokwick_flag
    }
  }
`;

export const AddBillingAddressQuery = gql`
  mutation setBillingAddressOnCart(
    $cartId: String!
    $firstname: String!
    $lastname: String!
    $company: String!
    $street: String!
    $city: String!
    $region: String!
    $region_id: Int!
    $postcode: String!
    $country_code: String!
    $telephone: String!
    $save_in_address_book: Boolean!
  ) {
    setBillingAddressOnCart(
      input: {
        cart_id: $cartId
        billing_address: {
          address: {
            firstname: $firstname
            lastname: $lastname
            company: $company
            street: [$street]
            city: $city
            region: $region
            region_id: $region_id
            postcode: $postcode
            country_code: $country_code
            telephone: $telephone
            save_in_address_book: $save_in_address_book
          }
        }
      }
    ) {
      cart {
        billing_address {
          firstname
          lastname
          company
          street
          city
          region {
            code
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
`;
