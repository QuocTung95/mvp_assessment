import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { COOKIE_USER_TOKEN } from "../contants";
import { deleteAllCookies, getCookie } from "../helpers/cookie";
import { toast } from "react-toastify";

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

// Intercept requests and responses
axiosClient.interceptors.request.use((request: InternalAxiosRequestConfig<any>) => requestHandler(request));

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => successHandler(response),
  (error) => errorHandler(error)
);

// Handle errors
const errorHandler = (error: any): Promise<any> => {
  toast.error(
    typeof error.response.data.message === "string"
      ? error.response.data.message
      : error.response.data.message.join(", ")
  );

  if (error?.response?.status === 401) {
    localStorage.clear();
    deleteAllCookies();
  }

  if (error?.response?.status === 415) {
    // Do something
  }

  if (error?.response?.status === 500) {
    // Do something
  }

  return Promise.reject(error.response?.data);
};

// Handle successful responses
const successHandler = (response: AxiosResponse): any => {
  return response.data;
};

// Attach Authorization token to request if available
const requestHandler = (request: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
  const token = getCookie(COOKIE_USER_TOKEN);

  // Attach the token to the Authorization header if it exists
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }

  return request;
};

export default axiosClient;
