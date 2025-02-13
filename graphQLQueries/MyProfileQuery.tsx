import { gql } from "@apollo/client";
export const GET_PROFILE_DATA = gql`
  query Getallprofile {
    customer {
      id
      customer_ref
      firstname
      lastname
      gender
      dob
      suffix
      email
      customer_image
      customer_mobile_number
      anniversary
      addresses {
        id
        firstname
        lastname
        street
        city
        region {
          region_id
          region_code
          region
        }
        postcode
        country_code
        telephone
        default_billing
        save_as
      }
    }
  }
`;

export const FETCH_CUSTOMER_WALLET = gql`
  query Getallprofile {
    customer {
      wallet_number
    }
  }
`;

export const updateCustomerQuery = gql`
  mutation updateCustomer(
    $firstname: String!
    $email: String!
    $lastname: String!
    $gender: gender
    $dob: dob
  ) {
    updateCustomer(
      input: {
        firstname: $firstname
        email: $email
        lastname: $lastname
        gender: $gender
        dob: $dob
      }
    ) {
      customer {
        firstname
        email
        lastname
        gender
        dob
      }
    }
  }
`;

export const updateProfile = gql`
  mutation UpdateProfile(
    $anniversary: String!
    $dateOfBirth: String!
    $firstName: String!
    $gender: String!
    $lastName: String!
    $prefix: String!
  ) {
    updateProfile(
      anniversary: $anniversary
      dateOfBirth: $dateOfBirth
      firstName: $firstName
      gender: $gender
      lastName: $lastName
      prefix: $prefix
    ) {
      success
    }
  }
`;

export const addCustomerAddress = gql`
  mutation createCustomerAddress(
    $street: [String]!
    $telephone: String!
    $postcode: String!
    $city: String!
    $firstname: String!
    $lastname: String!
    $default_shipping: Boolean!
    $default_billing: Boolean!
    $save_as: String!
    $region: String!
    $region_id: Int!
    $country_id: CountryCodeEnum
  ) {
    createCustomerAddress(
      input: {
        street: $street
        telephone: $telephone
        postcode: $postcode
        city: $city
        firstname: $firstname
        lastname: $lastname
        default_shipping: $default_shipping
        default_billing: $default_billing
        save_as: $save_as
        country_id: $country_id
        region: { region_id: $region_id, region: $region }
      }
    ) {
      id
      region {
        region
        region_code
        region_id
      }
      country_code
      street
      telephone
      postcode
      firstname
      lastname
      city
      default_shipping
      default_billing
      save_as
    }
  }
`;

export const updateCustomerAddress = gql`
  mutation updateCustomerAddress(
    $id: Int!
    $city: String!
    $postcode: String!
    $firstname: String!
    $telephone: String!
    $lastname: String!
    $save_as: String!
    $street: [String]!
    $default_shipping: Boolean!
    $default_billing: Boolean!
    $country_id: CountryCodeEnum
    $region: String!
    $region_id: Int!
  ) {
    updateCustomerAddress(
      id: $id
      input: {
        city: $city
        postcode: $postcode
        firstname: $firstname
        telephone: $telephone
        lastname: $lastname
        save_as: $save_as
        street: $street
        default_shipping: $default_shipping
        default_billing: $default_billing
        country_id: $country_id
        region: { region_id: $region_id, region: $region }
      }
    ) {
      id
      city
      postcode
      firstname
      telephone
      lastname
      save_as
      street
      default_shipping
      default_billing
      country_code
      region {
        region
        region_code
        region_id
      }
    }
  }
`;
export const deleteCustomerAddress = gql`
  mutation deleteCustomerAddress($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`;
