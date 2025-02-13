import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { fetchMiddleWareAccessToken } from "./utility/MiddelwareAccessWrapper";
import { from } from "apollo-link";
import { RetryLink } from "@apollo/client/link/retry";
const NEXT_PUBLIC_SSO_API_GATEWAY_URL =
  process.env.NEXT_PUBLIC_SSO_API_GATEWAY_URL;
const httpLink = createHttpLink({
  uri: NEXT_PUBLIC_SSO_API_GATEWAY_URL,
});
const isMiddlewareSecurityEnabled =
  process.env.NEXT_PUBLIC_IS_MIDDLEWARE_SECURITY_ENABLED;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      let params = {
        error_message: message,
        status: 200,
        item_name: NEXT_PUBLIC_SSO_API_GATEWAY_URL,
      };
      //event trigger
      callErrorEvent(params);
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("accessToken");
  let updatedHeaders = {
    ...headers,
    authorization: token ? `Bearer ${token}` : "",
  };
  if (isMiddlewareSecurityEnabled === "true") {
    let mToken = localStorage.getItem("m-token");
    updatedHeaders = {
      ...updatedHeaders,
      "x-auth-token": mToken ? `Bearer ${mToken}` : "",
    };
    if (!mToken || mToken === "") {
      const mTokenRes = await fetchMiddleWareAccessToken();
      if (mTokenRes?.data?.access_token) {
        updatedHeaders = {
          ...updatedHeaders,
          "x-auth-token": mTokenRes?.data?.access_token
            ? `Bearer ${mTokenRes?.data?.access_token}`
            : "",
        };
      }
    }
  }

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...updatedHeaders,
    },
  };
});

const retryLink = new RetryLink({
  delay: {
    initial: 1,
    max: Infinity,
    jitter: true,
  },
  attempts: async (count, operation, error) => {
    if (!error.message) {
      // If error is not related to connection, do not retry
      return false;
    }
    if (
      isMiddlewareSecurityEnabled === "true" 
      // && (error?.statusCode === 401 || error?.statusCode === 403)
    ) {
      localStorage.removeItem("m-token");
      const mTokenRes = await fetchMiddleWareAccessToken();
      operation.setContext((context) => {
        return {
          ...context,
          headers: {
            ...context?.headers,
            "x-auth-token": mTokenRes?.data?.access_token
              ? `Bearer ${mTokenRes?.data?.access_token}`
              : "",
          },
          retryCount: count,
        };
      });
    }
    return count < 3;
  },
});

const graphql = new ApolloClient({
  link: from([retryLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default graphql;
