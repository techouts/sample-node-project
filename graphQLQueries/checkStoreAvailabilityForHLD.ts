import { gql } from "@apollo/client";
import graphql from "../middleware-graphql";

export const CHECK_STORE_AVAILABILITY_MUTATION = gql`
  mutation checkStoreAvailabilityForHLD($request: HLDRequest!) {
    checkStoreAvailabilityForHLD(request: $request) {
      status
      products {
        status
        sku
        requestedQuantity
        fulfillments {
          type
          errorMessage
          store {
            id
            availableQuantity
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
          deliveryModeEDDs {
            deliveryMode
            errorMessage
            serviceableStores {
              store {
                id
                availableQuantity
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
              errorMessage
              lspEDDs {
                lspName
                edd
              }
            }
          }
        }
      }
    }
  }
`;

export type StoreAvailabilityRequestPayload =  {
  sku: string;
  storeId: string;
  quantity: number;
  deliveryMode: "pick";
}

export async function fetchExploreStoreModeServiceability(
  payload: StoreAvailabilityRequestPayload[]
) {
  const response = await graphql
    .mutate({
      mutation: CHECK_STORE_AVAILABILITY_MUTATION,
      variables: {
        request: {
          type: "HLD",
          products: payload,
        },
      },
    })
    .then((res: any) => {
      return res;
    })
    .catch((error: any) => {
      return error;
    });
  return response;
}
