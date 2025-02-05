import { BASE_URL } from "@/constants/baseURL";
import axios from "axios";
// import { cookies } from "next/headers";
// const cookieStore = await cookies();

//   headers: {
//     Authorization: "Bearer" + cookieStore.get("refresh"),
//   },
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
