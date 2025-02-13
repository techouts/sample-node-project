import { gql } from "@apollo/client";

export const GetFreeSampleProducts = gql`
  query mpFreeGiftsByProductSku($sku: String!) {
    mpFreeGiftsByProductSku(sku: $sku) {
      rule_id
      auto_add
      max_gift
      notice
      total_added
      gifts {
        id
        name
        gift_price
        free_ship
        added
        sku
        configurable
        required_option
        final_price
        image
      }
    }
  }
`;

export const AddFreeSample = gql`
  mutation mpFreeGiftsAddGift(
    $cart_id: String!
    $rule_id: Int!
    $gift_id: Int!
  ) {
    mpFreeGiftsAddGift(
      input: { cart_id: $cart_id, rule_id: $rule_id, gift_id: $gift_id }
    ) {
      status
      message
      rule_id
      quote_id
      quote_item_id
      product_gift_id
    }
  }
`;

export const RemoveFreeSample = gql`
  mutation freeGiftsDeleteByQuoteItem($cart_id: String!, $item_id: Int!) {
    freeGiftsDeleteByQuoteItem(cart_id: $cart_id, item_id: $item_id) {
      status
    }
  }
`;
