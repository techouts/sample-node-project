import { gql } from "@apollo/client";

export const CHECK_AVAILABILITY_FOR_CC_FULLFILLMENT = gql`
  query checkAvailabilityForCCFulfillment($request: AvailabilityRequest!) {
    checkAvailabilityForCCFulfillment(request: $request) {
      errorMessage
      status
      stores {
        id
        address {
          line1
          line2
          city
          state
          country
          postcode
          latitude
          longitude
        }
      }
      availableStoresForAllProducts {
        id
        address {
          line1
          line2
          city
          state
          country
          postcode
          latitude
          longitude
        }
      }
    }
  }
`;
