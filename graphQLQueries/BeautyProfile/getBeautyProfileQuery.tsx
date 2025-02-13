
import { gql } from "@apollo/client";

export const GET_BEAUTY_PROFILE = gql`
  query getBeautyProfile {
    customer {
        BeautyProfile
    }
  }
`