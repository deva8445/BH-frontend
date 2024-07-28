import axios from "axios";
// Request Interceptor
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("auth");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    config.baseURL = process.env.REACT_APP_API_BASE_URL;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.data?.message?.code === "ERR_JWT_EXPIRED") {
      // await redirectToLogout();
      return;
    }
    return Promise.reject(error);
  }
);

const queryBuilder = (payload: any) => {
  return payload
    ? Object.keys(payload)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`
        )
        .join("&")
    : "";
};

export const AUTH = {
  signup: async function (payload: any) {
    return axios.post("/auth/signup", payload);
  },
  login: async function (payload: any) {
    return axios.post("/auth/login", payload);
  },
};

export const BOOK = {
  fetchAllBooks: async function (payload: any) {
    const queryParams = queryBuilder(payload);
    return axios.get(`/books?${queryParams}`);
  },
  addBook: async function (payload: any) {
    return axios.post("/books", payload);
  },
};
