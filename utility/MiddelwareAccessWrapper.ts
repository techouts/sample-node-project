import axios from "axios";
import { mTokenFailurePattern, mTokenSuccessPattern } from "./Constants";
import { toast } from "./Toast";
const NEXT_PUBLIC_MIDDLEWARE_ACCESS_URL =
  process.env.NEXT_PUBLIC_MIDDLEWARE_ACCESS_URL;
const NEXT_PUBLIC_MIDDLEWARE_ACCESS_CLIENT_ID =
  process.env.NEXT_PUBLIC_MIDDLEWARE_ACCESS_CLIENT_ID;
const NEXT_PUBLIC_MIDDLEWARE_ACCESS_KEY =
  process.env.NEXT_PUBLIC_MIDDLEWARE_ACCESS_KEY;

const body = {
  client_id: `${NEXT_PUBLIC_MIDDLEWARE_ACCESS_CLIENT_ID}`,
  client_secret: `${NEXT_PUBLIC_MIDDLEWARE_ACCESS_KEY}`,
};

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

export async function fetchMiddleWareAccessToken() {
  let attempt = 0;
  let success = false;
  let response: any = null;
  while (attempt < 3 && !success) {
    attempt++;
    response = await axios
      .post(`${NEXT_PUBLIC_MIDDLEWARE_ACCESS_URL}`, body, { headers: headers })
      .then((res: any) => {
        console.log('res', res)
        if (mTokenSuccessPattern.test(res?.status) && res?.data?.access_token) {
          localStorage.setItem("m-token", res?.data?.access_token);
        }
        return res;
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(`Token ${error?.message}`);
        return error;
      });

    if (mTokenFailurePattern.test(response?.response?.status)) {
      continue;
    } else {
      success = true;
    }
  }
  return response;
}
