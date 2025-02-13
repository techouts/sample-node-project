import { gql } from "@apollo/client";

export const PRODUCT_DATA_SKU = gql`
  query GetAllSearchData($sku: String!) {
    products(filter: { sku: { eq: $sku } }, pageSize: 1) {
      total_count
      items {
        categories {
          level
          name
          uid
          id
          url_key
          is_primary
        }
        product_highlighter
        type_id
        easy_exchange_return
        product_count
        brand_name
        brand_info
        AvailablePromotions {
          description
          know_more_link
          know_more_text
        }
        description {
          html
        }
        name
        media_gallery {
          url
        }
        additional_images {
          url
        }
        image {
          url
        }
        thumbnail {
          url
        }
        sku
        short_description {
          html
        }
        pmr_price_value {
          amount {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
        id
        is_free_gift_available
        free_items_offers
        stock_status
        review_count
        rating_count
        worst_rating
        best_rating
        review_stars
        rating_summary
        about_the_product
        ingredients
        how_to_use
        reviews(pageSize: 5, currentPage: 1) {
          items {
            review_id
            average_rating
            nickname
            ratings_breakdown {
              value
            }
            created_at
            review_likes_count
            review_images
            summary
            text
          }
          page_info {
            current_page
            page_size
            total_pages
          }
        }
        formulation
        pro_type
        is_free_product_available
        is_featured_checkbox
        gift_message_available
        is_express_deliverable_checkbox
        is_best_seller_checkbox
        image {
          url
        }
        ... on ConfigurableProduct {
          configurable_options {
            id
            attribute_id_v2
            label
            position
            use_default
            attribute_code
            values {
              value_index
              swatch_data {
                value
              }
              label
            }
            product_id
          }
          variants {
            product {
              id
              color
              size
              uid
              name
              additional_images {
                url
              }
              media_gallery {
                url
              }
              categories {
                level
                name
                uid
                id
                url_key
                is_primary
              }
              type_id
              sku
              stock_status
              review_count
              rating_summary
              reviews {
                items {
                  average_rating
                  ratings_breakdown {
                    value
                  }
                  created_at
                  summary
                  text
                }
              }
              AvailablePromotions {
                description
                know_more_link
                know_more_text
              }
              pmr_price_value {
                amount {
                  value
                  currency
                }
                discount {
                  amount_off
                  percent_off
                }
              }
              price_range {
                minimum_price {
                  regular_price {
                    value
                    currency
                  }
                  final_price {
                    value
                  }
                  discount {
                    amount_off
                    percent_off
                  }
                }
              }
              formulation
              pro_type
              is_featured_checkbox
              gift_message_available
              is_best_seller_checkbox
              __typename
              image {
                url
              }
              attribute_set_id
              ... on PhysicalProductInterface {
                weight
              }
            }
          }
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
            }
            discount {
              amount_off
              percent_off
            }
          }
        }
      }
      aggregations {
        attribute_code
        count
        label
        options {
          count
          label
          value
          items {
            count
            label
            value
            items {
              count
              label
              value
              items {
                count
                label
                value
              }
            }
          }
        }
      }
      page_info {
        page_size
        current_page
      }
    }
  }
`;

export const PRODUCT_DATA_SKU_CACHE_PURGE = gql`
query GetAllSearchData($sku: String!) {
	products(filter: { sku: { eq: $sku } }) {
		items {
			name
			sku
			id
		}
	}
}
`;

export const PDP_JSON_QUERY = (sku: string) => `{products(filter: { sku: { eq: ${sku} } }, pageSize: 1) { total_count items { categories { level name uid id url_key is_primary } product_highlighter type_id easy_exchange_return product_count brand_name brand_info AvailablePromotions { description know_more_link know_more_text } description { html } name media_gallery { url } additional_images { url } image { url } thumbnail { url } sku short_description { html } pmr_price_value { amount { value currency } discount { amount_off percent_off } } id is_free_gift_available free_items_offers stock_status review_count rating_count worst_rating best_rating review_stars rating_summary about_the_product ingredients how_to_use reviews(pageSize: 5, currentPage: 1) { items { review_id average_rating nickname ratings_breakdown { value } created_at review_likes_count review_images summary text } page_info { current_page page_size total_pages } } formulation pro_type is_featured_checkbox gift_message_available is_express_deliverable_checkbox is_best_seller_checkbox image { url } ... on ConfigurableProduct { configurable_options { id attribute_id_v2 label position use_default attribute_code values { value_index swatch_data { value } label } product_id } variants { product { id color size uid name additional_images { url } media_gallery { url } categories { level name uid id url_key is_primary } type_id sku stock_status review_count rating_summary reviews { items { average_rating ratings_breakdown { value } created_at summary text } } AvailablePromotions { description know_more_link know_more_text } pmr_price_value { amount { value currency } discount { amount_off percent_off } } price_range { minimum_price { regular_price { value currency } final_price { value } discount { amount_off percent_off } } } formulation pro_type is_featured_checkbox gift_message_available is_best_seller_checkbox __typename image { url } attribute_set_id ... on PhysicalProductInterface { weight } } } } price_range { minimum_price { regular_price { value currency } final_price { value } discount { amount_off percent_off}}}} aggregations { attribute_code count label options { count label value items {count label value items {count label value items {count label value}}}}} page_info {page_size current_page}}}`

export const PDP_PRICE_JSON_QUERY = (sku: string) => `{ products(filter: { sku: { eq: ${sku} } }, pageSize: 1) { total_count items { is_out_of_stock AvailablePromotions { description know_more_link know_more_text } ... on ConfigurableProduct { configurable_options { id label attribute_code values { value_index swatch_data { value } label } product_id } free_product_description free_product_know_more_label free_product_know_more_link variants { product { id color size uid name type_id sku stock_status AvailablePromotions { description know_more_link know_more_text } pmr_price_value { amount { value currency } discount { amount_off percent_off } } price_range { minimum_price { regular_price { value currency } final_price { value } discount { amount_off percent_off } } } __typename attribute_set_id ... on PhysicalProductInterface { weight } } } } pmr_price_value { amount { value currency } discount { amount_off percent_off } } id free_items_offers stock_status price_range { minimum_price { regular_price { value currency } final_price { value } discount { amount_off percent_off } } } } } }`

export const RatingReview = gql`
  mutation customerreview(
    $rating: Int!
    $title: String!
    $description: String!
    $name: String!
    $sku: String!
    $images: [String!]
  ) {
    customerreview(
      review_rating: $rating
      review_title: $title
      review_description: $description
      nickname: $name
      sku: $sku
      images: $images
    ) {
      status
      message
    }
  }
`;

export const OrderRatingReview = gql`
  mutation customerreview(
    $rating: Int!
    $title: String!
    $description: String!
    $name: String!
    $sku: String!
    $images: [String!]
    $order_id: String
  ) {
    customerreview(
      review_rating: $rating
      review_title: $title
      review_description: $description
      nickname: $name
      sku: $sku
      images: $images
      order_id: $order_id
    ) {
      status
      message
    }
  }
`;

export const SubmitOrderReview = gql`
  mutation AddOrderShoppingRatings(
    $order_id: String!
    $rating_value: Int!
    $title: String!
    $description: String!
  ) {
    AddOrderShoppingRatings(
      order_id: $order_id
      rating_value: $rating_value
      title: $title
      description: $description
    ) {
      status
      message
    }
  }
`;

export const AddDeliveryPartnerRatings = gql`
  mutation AddDeliveryPartnerRatings(
    $DeliveryPartner: String!
    $OrderID: String!
    $RatingValue: Int!
    $Title: String!
    $Description: String!
  ) {
    AddDeliveryPartnerRatings(
      delivery_partner: $DeliveryPartner
      order_id: $OrderID
      rating_value: $RatingValue
      title: $Title
      description: $Description
    ) {
      status
      message
    }
  }
`;

export const GET_DELIVERY_PARTNER_REVIEW_OPTIONS = gql`
  query {
    GetDeliveryRating {
      rating1
      rating2
      rating3
      rating4
      rating5
    }
  }
`;

export const QuestionsQuery = gql`
  query question($entity_id: Int!, $pageSize: Int!, $currentPage: Int!) {
    question(
      entity_id: $entity_id
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      questions {
        question
        que_id
        name
        created_at
        likes_count
        answerDetails {
          answer
          name
          created_at
        }
      }
      total_count
    }
  }
`;
export const QuestionsQueryCount = gql`
  query question($entity_id: Int!, $pageSize: Int!, $currentPage: Int!) {
    question(
      entity_id: $entity_id
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      total_count
    }
  }
`;

export const AddLike = gql`
  mutation addquestionlikes($question_id: Int!) {
    addquestionlikes(question_id: $question_id) {
      status
      message
    }
  }
`;

export const AddQuestions = gql`
  mutation askQuestion($AskQuestion: [Question]) {
    askQuestion(AskQuestion: $AskQuestion) {
      question
      name
      created_at
    }
  }
`;

export const answerQuery = gql`
  mutation answer($Answer: [Answer]) {
    answer(Answer: $Answer) {
      status
      message
      answer
    }
  }
`;

export const AddLikesMutation = gql`
  mutation addlikes($sku: String!) {
    addlikes(sku: $sku) {
      status
      message
    }
  }
`;

export const AddReviewLikesMutation = gql`
  mutation addreviewlikes($review_id: Int!) {
    addreviewlikes(review_id: $review_id) {
      status
      message
    }
  }
`;
export const SORTED_PRODUCT_REVIEWS = gql`
  query GetReviews(
    $sort: sortInput!
    $entity_id: Int!
    $pagesize: Int!
    $CurrentPage: Int!
  ) {
    GetReviews(
      entity_id: $entity_id
      pagesize: $pagesize
      sort: $sort
      CurrentPage: $CurrentPage
    ) {
      reviews {
        created_at
        detail
        nickname
        customer_image
        rating_value
        review_id
        review_images
        status
        review_likes_count
        title
      }
      total_count
    }
  }
`;

export const PRODUCT_NOTIFY_ME = gql`
  mutation stockNotification($sku: String!, $mail: String!) {
    stockNotification(sku: $sku, mail: $mail) {
      status
      message
    }
  }
`;
