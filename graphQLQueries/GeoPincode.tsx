import { gql } from "@apollo/client";
export const GEO_PINCODE = gql`
mutation getLatLongValues($pincode: String!) {
    getLatLongValues(request: {pincode: $pincode}) {
      pincode
      latitude
      longitude
      city
      state
    }
  }
`;