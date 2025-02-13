import { gql } from "@apollo/client";
export const GET_SEARCHED_DATA = gql`
  query GetAllSearchData(
    $searchText: String!
    $pageSize: Int!
    $currentPage: Int!
    $filters: ProductAttributeFilterInput
    $sort: ProductAttributeSortInput
  ) {
    products(
      search: $searchText
      pageSize: $pageSize
      currentPage: $currentPage
      filter: $filters
      sort: $sort
    ) {
      total_count
      items {
        name
        id
        type_id
        is_free_gift_available
        free_items_offers
        brand_name
        brand_info
        categories {
          level
          name
          uid
          id
        }
        additional_images {
          url
        }
        media_gallery {
          url
        }
        sku
        stock_status
        short_description {
          html
        }
        AvailablePromotions {
          description
        }
        review_count
        rating_summary
        reviews(pageSize: 3, currentPage: 1) {
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
        is_featured_checkbox
        gift_message_available
        is_express_deliverable_checkbox
        is_best_seller_checkbox
        __typename
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
              label
              swatch_data {
                value
              }
            }
            product_id
          }
          pmr_price
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
          variants {
            product {
              id
              color
              size
              uid
              name
              brand_name
              brand_info
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
              pmr_price
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
        AvailablePromotions {
          description
        }
        pmr_price
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

export const GET_BRANDLIST_STOCK = gql`
  query {filterForCategory: products(filter: { category_id: { in: ["1"] } }) {
    aggregations {
        attribute_code
        label
        count
        options {
            count
            label
            value
        }
    }
  }
}
  `;
export const GET_FACETS_DATA = gql`
  query GetAllSearchData($filters: ProductAttributeFilterInput) {
    products(filter: $filters) {
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
    }
  }
`;

export const GET_BEAUTY_PROFILE_JSON = (
  searchText: string,
  pageSize: number,
  currentPage: number,
  ProductAttributeFilterInput: any,
  ProductAttributeSortInput: any,
  dynamicFilterInput: any
) =>
  `{ beautyprofile(search: ${searchText}, pageSize: ${pageSize}, currentPage: ${currentPage}, filter: ${ProductAttributeFilterInput}, sort: ${ProductAttributeSortInput}, dynamicFilters:{attributes: ${dynamicFilterInput}}) { total_count items { name id type_id free_items_offers brand_name brand_info categories { level name uid id } additional_images { url } media_gallery { url } sku stock_status short_description { html } AvailablePromotions { description } review_count rating_summary formulation pro_type is_featured_checkbox gift_message_available is_express_deliverable_checkbox is_best_seller_checkbox __typename image { url } configurable_options { id attribute_id_v2 label position use_default attribute_code values { value_index label swatch_data { value } } product_id } variants { product { id color size uid name brand_name brand_info additional_images { url } media_gallery { url } sku stock_status review_count rating_summary pmr_price_value{amount{value currency}discount{amount_off percent_off}}price_range { minimum_price { regular_price { value currency } final_price { value } discount { amount_off percent_off } } } formulation pro_type is_featured_checkbox is_best_seller_checkbox __typename image { url } attribute_set_id } } pmr_price_value{amount{value currency}discount{amount_off percent_off}}price_range { minimum_price { regular_price { value currency } final_price { value } discount { amount_off percent_off } } } } aggregations { attribute_code count label options {count label value items{count label value items{count label value items{count label value}}}}}page_info { page_size current_page } }}`;

export const GET_SEARCHED_DATA_JSON = (
  searchText: string,
  pageSize: number,
  currentPage: number,
  ProductAttributeFilterInput: any,
  ProductAttributeSortInput: any
) =>
  `{products(search:${searchText},pageSize:${pageSize},currentPage:${currentPage},filter:${ProductAttributeFilterInput},sort:${ProductAttributeSortInput}){total_count items{name id type_id is_free_product_available is_free_gift_available free_items_offers brand_name brand_info categories{url_key level name uid id}additional_images{url}media_gallery{url}sku stock_status short_description{html}AvailablePromotions{description}review_count rating_summary reviews(pageSize:3,currentPage:1){items{review_id average_rating nickname ratings_breakdown{value}created_at review_likes_count review_images summary text}page_info{current_page page_size total_pages}}formulation pro_type is_featured_checkbox gift_message_available is_express_deliverable_checkbox is_best_seller_checkbox __typename image{url}...on ConfigurableProduct{configurable_options{id attribute_id_v2 label position use_default attribute_code values{value_index label swatch_data{value}}product_id}variants{product{id color size uid name brand_name brand_info additional_images{url}media_gallery{url}sku stock_status review_count rating_summary reviews{items{average_rating ratings_breakdown{value}created_at summary text}}AvailablePromotions{description}pmr_price pmr_price_value{amount{value currency}discount{amount_off percent_off}}price_range{minimum_price{regular_price{value currency}final_price{value}discount{amount_off percent_off}}}formulation pro_type is_featured_checkbox gift_message_available is_best_seller_checkbox __typename image{url}attribute_set_id...on PhysicalProductInterface{weight}}}}pmr_price pmr_price_value{amount{value currency}discount{amount_off percent_off}}price_range{minimum_price{regular_price{value currency}final_price{value}discount{amount_off percent_off}}}}aggregations{attribute_code count label options{count label value items{count label value items{count label value items{count label value}}}}}page_info{page_size current_page}}}`;

export const GET_PLP_SEARCHED_DATA_JSON = (
  searchText: string,
  pageSize: number,
  currentPage: number,
  ProductAttributeFilterInput: any,
  ProductAttributeSortInput: any
) => `{products(search:${searchText},pageSize:${pageSize},currentPage:${currentPage},filter:${ProductAttributeFilterInput},sort:${ProductAttributeSortInput}){
  total_count
  items {
    name
    id
    type_id
    is_free_product_available
    is_free_gift_available
    free_items_offers
    categories {
      name
      id
    }
    additional_images {
      url
    }
    sku
    stock_status
    AvailablePromotions {
      description
    }
    review_count
    rating_summary
    is_featured_checkbox
    is_best_seller_checkbox
    __typename
    image {
      url
    }
    ... on ConfigurableProduct {
      configurable_options {
        id
        label
        attribute_code
        values {
          label
        }
        product_id
      }
      variants {
        product {
          name
          sku
          type_id
          AvailablePromotions {
            description
          }
          pmr_price_value {
            amount {
              value
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
          image {
            url
          }
        }
        }
    }
    pmr_price_value {
      amount {
        value
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
}`;

export const GET_PLP_SEARCHED_QUICKVIEW_DATA_JSON = (sku: string) => `
{
  products(filter: { sku: { eq: ${sku} } }, pageSize: 1) {
    items {
      ... on ConfigurableProduct {
        configurable_options {
          id
          label
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
            type_id
            sku
            stock_status
            image {
              url
            }
            additional_images {
              url
            }
            AvailablePromotions {
              description
            }
            media_gallery {
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
            is_featured_checkbox
            __typename
          }
        }
      }
    }
  }
}
`;

export const GET_PLP_SEARCHED_UNBXD_QUICKVIEW_DATA_JSON = (sku: string) => `
{
  products(filter: { sku: { eq: ${sku} } }, pageSize: 1) {
    items {
      ... on ConfigurableProduct {
        configurable_options {
          id
          label
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
            sku
            stock_status
          }
        }
  }
}
}
}
`;

export const GET_OPTIMIZED_PLP_DATA = (
  searchText: string,
  pageSize: number,
  currentPage: number,
  ProductAttributeFilterInput: any,
  ProductAttributeSortInput: any
) => `{productSearchQry(search:${searchText},pageSize:${pageSize},currentPage:${currentPage},filter:${ProductAttributeFilterInput},sort:${ProductAttributeSortInput}){ total_count items { name id type_id is_free_product_available is_free_gift_available free_items_offers categories { name id } additional_images { url } sku stock_status AvailablePromotions { description } review_count rating_summary is_featured_checkbox is_best_seller_checkbox __typename image { url } variants { product { name sku type_id AvailablePromotions { description } pmr_price_value { amount { value } discount { amount_off percent_off } } price_range { minimum_price { regular_price { value currency } final_price { value } discount { amount_off percent_off } } } image { url } } } pmr_price_value { amount { value } discount { amount_off percent_off } } price_range { minimum_price { regular_price { value } final_price { value } discount { amount_off percent_off } } } } aggregations { attribute_code count label options { count label value items { count label value items { count label value items { count label value } } } } } page_info { page_size current_page } } }`;

export const PLP_SEARCH_QUERY = (
  searchText: string,
  pageSize: number,
  currentPage: number,
  ProductAttributeFilterInput: any,
  ProductAttributeSortInput: any
) =>
  `{products(search:${searchText},pageSize:${pageSize},currentPage:${currentPage},filter:${ProductAttributeFilterInput},sort:${ProductAttributeSortInput}){total_count items{name id type_id is_free_gift_available free_items_offers categories{level name uid id}additional_images{url}media_gallery{url}sku stock_status short_description{html}review_count rating_summary is_featured_checkbox gift_message_available is_express_deliverable_checkbox is_best_seller_checkbox __typename image{url}configurable_options{id attribute_id_v2 label attribute_code values{value_index label swatch_data{value}}product_id}variants{product{id name size color additional_images{url}media_gallery{url}__typename attribute_set_id weight sku stock_status AvailablePromotions{description}pmr_price pmr_price_value{amount{value currency}discount{amount_off percent_off}}price_range{minimum_price{regular_price{value currency}final_price{value}discount{amount_off percent_off}}}}}pmr_price pmr_price_value{amount{value currency}discount{amount_off percent_off}}price_range{minimum_price{regular_price{value currency}final_price{value}discount{amount_off percent_off}}}}aggregations{attribute_code count label options{count label value items{count label value items{count label value items{count label value}}}}}page_info{page_size current_page}}}`;

export const CATEGORY_PRODUCTS = (ProductAttributeFilterInput: any) =>
  `{products(filter:{sku:{in:[${ProductAttributeFilterInput}]}}){items{name id type_id sku is_free_gift_available free_items_offers stock_status rating_summary __typename image{url}categories{level name uid id}...on ConfigurableProduct{configurable_options{id attribute_id_v2 label position use_default attribute_code values{value_index label swatch_data{value}}product_id}variants{product{id name sku pmr_price pmr_price_value{amount{value currency}discount{amount_off percent_off}}price_range{minimum_price{regular_price{value currency}final_price{value}discount{amount_off percent_off}}}attribute_set_id}}}pmr_price pmr_price_value{amount{value currency}discount{amount_off percent_off}}price_range{minimum_price{regular_price{value currency}final_price{value}discount{amount_off percent_off}}}}}}`;
