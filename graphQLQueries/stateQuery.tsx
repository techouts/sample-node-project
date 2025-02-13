import { gql } from "@apollo/client";

export const stateQuery = gql`
  query {
    country(id: "IN") {
      id
      two_letter_abbreviation
      available_regions {
        id
        code
        name
      }
    }
  }
`;
