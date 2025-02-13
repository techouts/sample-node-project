import { gql } from "@apollo/client";

export const SAVED_UPI_PAYMENTS = gql`
mutation SaveCustomerUpiId($upi_id: String!, $isDefault: Boolean!){ 
    SaveCustomerUpiId(upi_id: $upi_id, is_default: $isDefault) { 
      message 
      status 
    } 
  } 
`;
