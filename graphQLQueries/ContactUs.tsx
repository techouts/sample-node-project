import { gql } from "@apollo/client";

export const saveContactUsInfo = gql`
  mutation saveContactUsInfo(
    $firstname: String!
    $lastname: String!
    $emailid: String!
    $phoneNumber: String!
    $category: String!
    $subCategory: String!
    $orderNumber: String!
    $comment: String!
    $caseorigin: String!
    $title: String!
  ) {
    saveContactUsInfo(
      title: $title
      firstname: $firstname
      lastname: $lastname
      emailid: $emailid
      phoneNumber: $phoneNumber
      category: $category
      subCategory: $subCategory
      orderNumber: $orderNumber
      comment: $comment
      caseorigin: $caseorigin
    ) {
      status
      message
    }
  }
`;
export const EmailSubscription = gql`
  mutation emailSubscription($userEmail: String!, $isSubscribe: String!) {
    emailSubscription(email: $userEmail, is_subscribe: $isSubscribe) {
      status
      message
    }
  }
`;
