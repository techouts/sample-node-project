import { gql } from "@apollo/client";

export const createQRCodeCustomer = gql`
  mutation createQRCodeCustomer(
    $name: String!
    $mobilenumber: String!
    $email: String!
    $image: String!
    $tcFlag: Int!
    $store:String!
    $city:String!
    $region:String!
  ) {
    createQRCodeCustomer(
          name: $name
          mobilenumber: $mobilenumber
          email: $email
          image: $image
          tc_flag: $tcFlag
          store: $store
          city: $city
          region: $region
        ) {
         msg
         status
        }
  }
`;