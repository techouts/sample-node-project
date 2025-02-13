import { gql } from "@apollo/client";

export const PRODUCT_SUGGESTIONS = gql`
  query ProductSuggestions($search: String!) {
    ProductSuggestions(search: $search) {
      products
    }
  }
`;
