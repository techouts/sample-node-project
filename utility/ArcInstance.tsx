import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();
const NEXT_PUBLIC_ORC_LAYER = process.env.NEXT_PUBLIC_ORC_LAYER;

export const arcClient = axios.create({
  baseURL: NEXT_PUBLIC_ORC_LAYER,
});

arcClient.interceptors.request.use((config) => {
  const accessToken = `${cookie.get("accessToken")}`;
  const axiosConfig = { ...config };
  axiosConfig.headers["Content-Type"] = "application/json";
  axiosConfig.headers["Access-Control-Allow-Origin"] = "*";
  axiosConfig.headers["Accept"] = "*/*";
  axiosConfig.headers["Accept-Encoding"] = "gzip, deflate, br";
  axiosConfig.headers["Connection"] = "keep-alive";
  if (accessToken && accessToken !== "undefined") {
    axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
  }
  return axiosConfig;
});