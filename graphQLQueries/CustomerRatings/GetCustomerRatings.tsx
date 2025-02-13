import { gql } from "@apollo/client";
export const CUSTOMER_RATINGS = gql`
  query GetCustomerRatings($pagesize: Int!, $CurrentPage: Int!) {
    GetCustomerRatings(pagesize: $pagesize, CurrentPage: $CurrentPage) {
      total_count
      ratings {
        name
        created_at
        review_id
        detail
        title
        image
        review_images
        status
        rating_value
      }
    }
  }
`;

export const UPDATE_CUSTOMER_RATINGS = gql`
  mutation UpdateCustomerRatings(
    $revieId: Int!
    $ratingValue: Float!
    $reviewImages: [String]!
    $detail: String!
  ) {
    UpdateCustomerRatings(
      review_id: $revieId
      rating_value: $ratingValue
      review_images: $reviewImages
      detail: $detail
    ) {
      message
      status
    }
  }
`;

export const DELETE_CUSTOMER_RATING = gql`
  mutation DeleteCustomerRatings($reviewsId: Int!) {
    DeleteCustomerRatings(review_id: $reviewsId) {
      message
      status
    }
  }
`;
