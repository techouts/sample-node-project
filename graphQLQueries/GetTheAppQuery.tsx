import { gql } from "@apollo/client";
export const GET_THE_APP = gql`
  query getTheApp(
    $mobile_number: String!
    $playStoreLink: String!
    $appStoreLink: String!
  ) {
    getTheApp(
      mobile_number: $mobile_number
      playStoreLink: $playStoreLink
      appStoreLink: $appStoreLink
    ) {
      message
    }
  }
`;
