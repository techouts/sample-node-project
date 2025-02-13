import { gql } from "@apollo/client";

export const SET_BEAUTY_PROFILE = gql`
  mutation($beauty_profile:String!) {
    UpdateCustomerBeautyProfile(beauty_profile: $beauty_profile) {
      status
      message
      beauty_profile
    }
  }
`;
