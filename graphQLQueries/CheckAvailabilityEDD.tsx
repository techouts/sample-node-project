import { gql } from "@apollo/client";
export const CHECK_AVAILABILITY = gql`
  mutation checkAvailabilityAndEDD(
    $pincode: String!
    $sku: ID!
    $lat: Float!
    $long: Float!
  ) {
    checkAvailabilityAndEDD(
      request: {
        type: "HD"
        fulfillmentType: "HD"
        address: { postcode: $pincode, latitude: $lat, longitude: $long }
        products: [
          {
            productRef: $sku
            requestedQuantity: 1
            deliveryModes: ["ED", "SD"]
          }
        ]
      }
    ) {
      status
      destinationPincode
      errorMessage
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

export const CHECK_ALL_AVAILABILITY = gql`
  mutation checkAvailabilityAndEDD($request: ServiceabilityEDDRequest!) {
    checkAvailabilityAndEDD(request: $request) {
      status
      destinationPincode
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

export const CHECK_PRODUCT_SERVICEABILITY = gql`
  mutation checkAvailabilityAndEDD($request: ServiceabilityEDDRequest!) {
    checkAvailabilityAndEDD(request: $request) {
      status
      destinationPincode
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
        }
      }
    }
  }
`;
