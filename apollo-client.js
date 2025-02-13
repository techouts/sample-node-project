import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";
import { RetryLink } from '@apollo/client/link/retry';
import { Cookies } from "react-cookie";
import { onError } from "@apollo/client/link/error";
import { callErrorEvent } from "./utility/ErrorEventAnalytics";
import { createEmptyCart } from "./api/Cart/CustomerCart";
import useStorage from "./utility/useStoarge";

const NEXT_PUBLIC_GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
const NEXT_PUBLIC_PRODUCTS_GRAPHQL_URL = process.env.NEXT_PUBLIC_PRODUCTS_GRAPHQL_URL;
const NEXT_PUBLIC_PDP_URL = process.env.NEXT_PUBLIC_PDP_URL
const NEXT_PUBLIC_PRODUCT_CAROUSEL_URL = process.env.NEXT_PUBLIC_PRODUCT_CAROUSEL_URL
const cookie = new Cookies();

const { setItem, getItem } = useStorage();

const cartError = "cart isn't active"

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      if (message?.includes(cartError)) {
        const isGuestUser = !!localStorage.getItem("accessToken") === false;
        if (isGuestUser) {
          createEmptyCart().then(a => localStorage.setItem("cartID", a))
        }
      }
      let params = {
        error_message: message,
        status: 200,
        item_name: NEXT_PUBLIC_GRAPHQL_URL,
      };
      //ErrorEvent trigger
      callErrorEvent(params);
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);

    if (networkError.statusCode === 401 && !!getItem("isLogoutSet", "session") === false) {
      setItem("isLogoutSet", "true", "session");
      window.location.href = window.location.origin + "?Logout=true";
    }
  };
});

const customFetch = (uri, options) => {
  const { variables } = JSON.parse(options.body);
  return variables?.sku ?
    fetch(`${NEXT_PUBLIC_PDP_URL}?sku=${variables?.sku}`, options)
    : variables?.queryParamVal?.includes("shopthelook") ?
      fetch(`${NEXT_PUBLIC_PRODUCT_CAROUSEL_URL}${variables?.queryParamVal || ""}`, options)
      : fetch(`${NEXT_PUBLIC_PRODUCTS_GRAPHQL_URL}${variables?.queryParamVal || ""}`, options);
};

const directionalLink = new RetryLink().split(
  (operation) => {
    return (operation?.variables?.sku || operation?.operationName === "GetAllSearchData")
  },
  new HttpLink({ fetch: customFetch }),
  new HttpLink({ uri: NEXT_PUBLIC_GRAPHQL_URL })
);

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: cookie.get("accessToken")
        ? `Bearer ${cookie.get("accessToken")}`
        : "",
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: from([errorLink, concat(authMiddleware, directionalLink)]),
  cache: new InMemoryCache(),
});

export default client;
