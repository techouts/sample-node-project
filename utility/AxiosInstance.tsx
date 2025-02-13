import axios from "axios";
import { callErrorEvent } from "./ErrorEventAnalytics";
const FormData = require("form-data");
const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
const MIDDLEWARE_URL = process.env.NEXT_PUBLIC_SSO_API_GATEWAY_URL;

const AxiosInstance = async (query: string,isCMSQuery=false, middleWareURL=false, urlKey?: string) => {
  let data = new FormData();
  let config = {
    method: "get",
    url: urlKey ? `${urlKey}?query=${query}` : isCMSQuery ? query : middleWareURL ? `${MIDDLEWARE_URL}?query=${query}` :  `${GRAPHQL_URL}?query=${query}`,
    data: data,
  };
  try {
    return await axios(config);
  } catch (err: any) {
    if (err?.response) {
      // Server responded with a status other than 200 range
      console.log(err?.response?.data);
      console.log(err?.response?.status);
      console.log(err?.response?.headers);
      if (err?.response?.status === 404) {
        console.error("Error: Source Not Found");
      }
      let params = {
        error_message:err.response?.data,
        status:err.response?.status,
        item_name: GRAPHQL_URL,
      }   
      //ErrorEvent trigger
      callErrorEvent(params);
    } else if (err.request) {
      // Request was made but no response
      console.error(err.request);
    } else {
      console.error(err.message);
    }
  }
};

export default AxiosInstance;
