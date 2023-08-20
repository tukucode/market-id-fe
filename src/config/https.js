import axios from "axios";
import store from "../stores";
const { auth } = store.getState();

// export const axiosInstance = axios.create({
//   baseURL: '/api-base',
// });

export const axiosInstance =  axios

axiosInstance.interceptors.request.use(
  function (config) {
    const token = auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const statusCode = error.response.status;

    // REMOVE TOKEN AND USER IN LOCALSTORAGE
    if (statusCode === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    if (statusCode === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
