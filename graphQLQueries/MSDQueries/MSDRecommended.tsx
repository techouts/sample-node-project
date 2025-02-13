import { gql } from "@apollo/client";
export const MSD_RECOMMENDED = gql`
  query msdRecomended(
    $module_name: String!
    $user_id: String!
    $num_results: Float!
    $mad_uuid: String!
    $product_id: String
    $filters: [FilterDataRequest]
  ) {
    msdRecomended(
      module_name: $module_name
      user_id: $user_id
      num_results: $num_results
      product_id: $product_id
      mad_uuid: $mad_uuid 
      filters: $filters
    ) {
      data {
        tiles {
          name
          id
        }
        products {
          total_count
          module_name
          module_id
          page_size
          items {
            sku
            swatch_image
            type_id
            brand_name
            product_id
            typename
            brand_info
            image {
              url
            }
            description {
              html
            }
            formulation
            pro_type
            is_best_seller_checkbox
            is_express_deliverable_checkbox
            is_featured_checkbox
            gift_message_available
            is_free_gift_available
            free_items_offers
            rating_summary
            review_count
            review_stars
            reviews {
              items
              page_info {
                page_size
                current_page
                total_pages
              }
            }
            brand_info
            brand_name
            stock_status
            name
            thumbnail {
              url
            }
            media_gallery {
              url
            }
            category
            sub_category
            # sub_sub_category
            categories {
              uid
              breadcrumbs {
                category_id
                category_level
                category_name
                category_uid
                category_url_key
                category_url_path
              }
            }
            configurable_options {
              use_default
              label
              id
              attribute_code
              attribute_id_v2
              position
              product_id
              values {
                label
                value_index
              }
            }
            variants {
              attributes {
                label
              }
              product {
                id
                sku
                size
                # parent_sku
                category
                stock_status
                sub_sub_category
                weight
                brand_name
                brand_info
                name
                color
                type_id
                swatch_image
                attribute_set_id
                image {
                  url
                }
                additional_images {
                  url
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
                    discount {
                      amount_off
                      percent_off
                    }
                    final_price {
                      value
                    }
                    regular_price {
                      value
                      currency
                    }
                  }
                }
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
                discount {
                  amount_off
                  percent_off
                }
                final_price {
                  value
                }
                regular_price {
                  value
                  currency
                }
              }
            }
          }
          page_info {
            current_page
            page_size
          }
        }
      }
      _journey_metadata {
        journey_id
      }
    }
  }
`;


export const MSD_RECOMMENDED_PAGE_NAME = gql`
  query msdRecomended(
    $module_name: String!
    $user_id: String!
    $num_results: Float!
    $mad_uuid: String!
    $product_id: String
    $filters: [FilterDataRequest]
    $page_name: String!
  ) {
    msdRecomended(
      module_name: $module_name
      user_id: $user_id
      num_results: $num_results
      product_id: $product_id
      mad_uuid: $mad_uuid 
      filters: $filters
      page_name: $page_name
    ) {
      data {
        tiles {
          name
          id
        }
        products {
          total_count
          module_name
          module_id
          page_size
          items {
            sku
            swatch_image
            type_id
            brand_name
            product_id
            typename
            brand_info
            image {
              url
            }
            description {
              html
            }
            formulation
            pro_type
            is_best_seller_checkbox
            is_express_deliverable_checkbox
            is_featured_checkbox
            gift_message_available
            is_free_gift_available
            free_items_offers
            rating_summary
            review_count
            review_stars
            reviews {
              items
              page_info {
                page_size
                current_page
                total_pages
              }
            }
            brand_info
            brand_name
            stock_status
            name
            thumbnail {
              url
            }
            media_gallery {
              url
            }
            category
            sub_category
            # sub_sub_category
            categories {
              uid
              breadcrumbs {
                category_id
                category_level
                category_name
                category_uid
                category_url_key
                category_url_path
              }
            }
            configurable_options {
              use_default
              label
              id
              attribute_code
              attribute_id_v2
              position
              product_id
              values {
                label
                value_index
              }
            }
            variants {
              attributes {
                label
              }
              product {
                id
                sku
                size
                # parent_sku
                category
                stock_status
                sub_sub_category
                weight
                brand_name
                brand_info
                name
                color
                type_id
                swatch_image
                attribute_set_id
                image {
                  url
                }
                additional_images {
                  url
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
                    discount {
                      amount_off
                      percent_off
                    }
                    final_price {
                      value
                    }
                    regular_price {
                      value
                      currency
                    }
                  }
                }
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
                discount {
                  amount_off
                  percent_off
                }
                final_price {
                  value
                }
                regular_price {
                  value
                  currency
                }
              }
            }
          }
          page_info {
            current_page
            page_size
          }
        }
      }
      _journey_metadata {
        journey_id
      }
    }
  }
`;