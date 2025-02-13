import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { callErrorEvent } from "./ErrorEventAnalytics";
import { fetchMiddleWareAccessToken } from "./MiddelwareAccessWrapper";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
const MIDDLEWARE_URL = process.env.NEXT_PUBLIC_SSO_API_GATEWAY_URL!;
const isMiddlewareSecurityEnabled =
  process.env.NEXT_PUBLIC_IS_MIDDLEWARE_SECURITY_ENABLED === "true";

const axiosInstance = axios.create();

async (config: AxiosRequestConfig<any>) => {
  if (!config.url?.includes("/middleware")) return config;

  const token = localStorage.getItem("accessToken");
  const updatedHeaders: AxiosRequestConfig["headers"] = {
    ...config.headers,
    authorization: token ? `Bearer ${token}` : "",
  };
  if (isMiddlewareSecurityEnabled) {
    let mToken = localStorage.getItem("m-token");
    if (mToken && mToken !== "") {
      updatedHeaders["x-auth-token"] = `Bearer ${mToken}`;
    } else {
      const mTokenRes = await fetchMiddleWareAccessToken();
      if (mTokenRes?.data?.access_token) {
        updatedHeaders[
          "x-auth-token"
        ] = `Bearer ${mTokenRes?.data?.access_token}`;
      }
    }
  }

  return { ...config, headers: updatedHeaders };
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    if (error.response) {
      const { message, status } = error.response.data || {};
      console.error(`[Error]: ${message}, Status: ${status}`);

      let params = {
        error_message: message || error.message,
        status: status || error.response?.status,
        item_name: GRAPHQL_URL,
      };

      callErrorEvent(params);
    } else if (error.request) {
      console.error("[Network error]: No response received");
    } else {
      console.error(`[Error]: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

// Retry logic for requests
const retryRequest = async (
  config: AxiosRequestConfig<any>,
  retries = 3
): Promise<AxiosResponse | void> => {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      return await axiosInstance(config);
    } catch (error: any) {
      lastError = error;

      if (error.response?.status === 401 || error.response?.status === 403) {
        console.warn(
          `Attempt ${i + 1}: Received ${
            error.response.status
          }, trying to refresh token...`
        );
        const mTokenRes = await fetchMiddleWareAccessToken();
        const mToken = mTokenRes?.data?.access_token;

        if (!mToken) {
          console.error("Token refresh failed. Aborting retries.");
          break;
        }
        localStorage.setItem("m-token", mToken);
        config = {
          ...config,
          headers: {
            ...(config.headers || {}),
            "x-auth-token": `Bearer ${mToken}`,
          },
        };

        continue;
      }

      console.error(
        `Request failed with status ${error.response?.status}. Retrying...`
      );
    }
  }

  return Promise.reject(lastError);
};

// Function to send requests
const sendRequest = async (
  query: string,
  isCMSQuery = false,
  middleWareURL = false,
  urlKey?: string
): Promise<AxiosResponse | void> => {
  const url = urlKey
    ? `${urlKey}?query=${query}`
    : isCMSQuery
    ? query
    : middleWareURL
    ? `${MIDDLEWARE_URL}?query=${query}`
    : `${GRAPHQL_URL}?query=${query}`;

  const config: AxiosRequestConfig = {
    method: "get",
    url: url,
    headers: {},
  };

  try {
    return await retryRequest(config);
  } catch (error: any) {
    console.error(`Request failed: ${error}`);
    return Promise.reject(error);
  }
};

export default sendRequest;
