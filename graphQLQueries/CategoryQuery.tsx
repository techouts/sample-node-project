import { gql } from "@apollo/client";
export const CATEGORYLIST = gql`
  query {
    category(id: 1) {
      products {
        total_count
        page_info {
          current_page
          page_size
        }
      }
      children_count
      children {
        id
        level
        name
        path
        product_count
        children {
          id
          level
          name
          image
          url_key
          path
          product_count
          children {
            id
            level
            name
            url_key
            category_code
            path
            product_count
            children {
              id
              level
              name
              url_key
              category_code
              path
              product_count
            }
          }
        }
      }
    }
  }
`;

export const CATEGORYLISTJSON = `{category(id:1){products{total_count page_info{current_page page_size}}children_count children{id level name path product_count children{id level name image url_key path product_count children{id level name url_key category_code path product_count children{id level name url_key category_code path product_count}}}}}}`;
