import { gql } from "@apollo/client";

export const upload_Customer_Profile_Pic = gql`
  mutation uploadCustomerProfilePic($base64: String!, $name: String!) {
    uploadCustomerProfilePic(
      input: { base64_encoded_file: $base64, name: $name }
    ) {
      image
      message
    }
  }
`;
