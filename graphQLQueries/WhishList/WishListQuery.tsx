import { gql } from "@apollo/client";

export const CUSTOMER_WISHLIST = gql`
  query CustomerWishlists($currentPage: Int!, $pageSize: Int!) {
    customer {
      wishlists {
        id
        items_count
        __typename
        sharing_code
        updated_at
        items_v2(currentPage: $currentPage, pageSize: $pageSize) {
          page_info {
            current_page
            page_size
            total_pages
          }
          items {
            id
            quantity
            __typename
            added_at
            product {
              id
              type_id
              categories {
                level
                name
                uid
                id
                path
                breadcrumbs{
                  category_id
                  category_name
                }
              }
              __typename
              review_count
              rating_summary
              reviews {
                items {
                  ratings_breakdown {
                    value
                  }
                }
              }
              name
              sku
              stock_status
              image {
                url
              }
              additional_images {
                url
              }
              media_gallery {
                url
              }
              review_count
              rating_summary
              reviews {
                items {
                  ratings_breakdown {
                    value
                  }
                }
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
                    label
                  }
                  product_id
                }
                variants {
                  product {
                    type
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
                  }
                }
              }
              is_featured_checkbox
              is_best_seller_checkbox
              is_express_deliverable_checkbox
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
            }
            quantity
          }
        }
      }
    }
  }
`;

export const CUSTOMER_WISHLIST_COUNT = gql`
  {
    wishlist {
      items_count
    }
  }
`;
