import { gql } from "@apollo/client";

export const FETCH_STORES_FOR_EVENTS = gql`
  mutation storeFinder($SelectedCity: String!) {
    storeFinder(request: { city: $SelectedCity, page: "0" }) {
      results {
        name
        displayName
        url
        description
        openingHours {
          name
          code
          weekDayOpeningList {
            openingTime {
              hour
              minute
              formattedHour
            }
            closingTime {
              hour
              minute
              formattedHour
            }
            weekDay
            closed
          }
          specialDayOpeningList
        }
        storeContent
        # features
        geoPoint {
          latitude
          longitude
        }
        formattedDistance
        distanceKm
        mapIcon
        address {
          id
          title
          titleCode
          firstName
          lastName
          companyName
          line1
          line2
          town
          region {
            isocode
            isocodeShort
            countryIso
            name
            stateCode
          }
          postalCode
          phone
          email
          country {
            isocode
            name
          }
          shippingAddress
          billingAddress
          defaultAddress
          visibleInAddressBook
          formattedAddress
          fax
          loyaltyAddress
          flatNumber
          buildingNumber
          road
          area
          landLineNo
          officeNo
          state
          gender
          dateOfBirth
          stateCode
        }
        storeImages
        parking
        type
        disclaimer
        returnNote
        cin
        gtin
        city
        pk
        storeManager{
          addressData
          pk
        }
        isEnabledForPersonalShopper
        psName
        psMobile
        code
        brandCode
        categoryNames
      }
      sorts
      locationText
      sourceLatitude
      sourceLongitude
      boundNorthLatitude
      boundEastLongitude
      boundSouthLatitude
      boundWestLongitude
    }
  }
`;
