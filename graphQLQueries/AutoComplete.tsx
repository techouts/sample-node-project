import { gql } from "@apollo/client";

export const autoComplete = gql`
  query autoComplete($searchText: String!) {
    autoComplete(q: $searchText) {
      status
      message
      payload {
        pages {
          filters {
            pages {
              id
            }
          }
        }
        categories {
          value
          filters {
            brands
          }
        }
        products {
          sellingPrice
          name
        }
        others {
          value
          filters {
            categories {
              label
            }
          }
        }
      }
    }
  }
`;
