import { gql } from "@apollo/client";

export const getPlpVCSearchQuery = (
  searchText: string,
  pageSize: number,
  currentPage: number,
  ProductAttributeFilterInput: any,
  ProductAttributeSortInput: any
) => {
  return gql`query{
    cmsVirtualCategory(
        slug:"${searchText}"
        pageSize:${pageSize}
        limit:20
        search:""
        filter:${ProductAttributeFilterInput}
        sort:${ProductAttributeSortInput})
        {
        total_count
        items {
        categories {
          level
          name
          uid
          id
          url_key
        }
        product_highlighter
        type_id
        easy_exchange_return
        product_count
        brand_name
        brand_info
        AvailablePromotions {
          description
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
        formulation
        pro_type
        is_featured_checkbox
        gift_message_available
        is_express_deliverable_checkbox
        is_best_seller_checkbox
        image {
          url
        }
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
              }
              type_id
              sku
              stock_status
              review_count
              rating_summary
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
              is_best_seller_checkbox
              __typename
              image {
                url
              }
              attribute_set_id
             
                weight
             
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
        }
      }
      page_info {
        page_size
        current_page
      }
        }
}`;
};
