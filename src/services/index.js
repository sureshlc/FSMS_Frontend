import axios from "axios";
import { getUser, removeUser } from "../utils/user";

// const ENDPOINT = "http://localhost:4000/api";
// const ENDPOINT = "http://34.216.140.84/api";
const ENDPOINT = "https://api.nenafoodsecurity.org/api";

const axiosInstance = axios.create({
  baseURL: ENDPOINT, // Define base URL here
});

axiosInstance.interceptors.request.use((config) => {
  const AUTH_TOKEN = getUser();
  if (AUTH_TOKEN) {
    config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, return it directly
    return response;
  },
  (error) => {
    console.log(
      error.response.data.status === 401,
      error.response.data.error.message
    );
    // Check if the error status is 401 (Unauthorized) and the error message indicates invalid token
    if (
      error.response.data.status === 401 &&
      error.response.data.error.message === "jwt expired"
    ) {
      // Handle invalid token error here, for example, log the user out
      removeUser();
      window.location.href = "/login?jwt-expired=true";
    }
    // Return the error so that it can be handled further downstream
    return Promise.reject(error);
  }
);

export const fetchCategoryData = async (category) => {
  const URL = `${ENDPOINT}/category/${category}`;
  return await axiosInstance.get(URL);
};

export const fetchSideBarList = async () => {
  const URL = `${ENDPOINT}/category`;
  return await axiosInstance.get(URL);
};

export const fetchCategorySummary = async (category, item, area) => {
  // handling all countries
  const country = area === "All Mashreq Countries" ? "" : area;

  const URL = `${ENDPOINT}/faostat-data/summary?category=${category}&item=${item}&area=${country}`;
  return await axiosInstance.get(URL);
};

export const fetchGraphDataValues = async (category, item, area) => {
  let queryParams = {};
  queryParams.params = {
    Category: category,
    Item: item,
  };
  if (area !== "All Mashreq Countries") {
    queryParams.params = {
      ...queryParams.params,
      Area: area,
    };
  }
  const URL = `${ENDPOINT}/faostat-data`;
  return await axiosInstance.get(URL, queryParams);
};

export const getCountryData = async () => {
  const URL = `${ENDPOINT}/country`;
  return await axiosInstance.get(URL);
};

export const getAlertData = async (requestData) => {
  const URL = `${ENDPOINT}/alerts`;
  return await axiosInstance.post(URL, requestData);
};

export const getTrendData = async (requestData) => {
  const URL = `${ENDPOINT}/alerts/trend`;
  return await axiosInstance.post(URL, requestData);
};

export const getLastUpdated = async () => {
  const URL = `${ENDPOINT}/last-updated/get`;
  return await axiosInstance.get(URL);
};

export const getCountryRank = async (requestData) => {
  const URL = `${ENDPOINT}/alerts`;
  return await axiosInstance.post(URL, requestData);
};

export const getIndicatorData = async (requestData) => {
  const URL = `${ENDPOINT}/indicator`;
  if (!Array.isArray(requestData.indicator)) {
    return await axiosInstance.post(URL, requestData);
  }
  const first = await axiosInstance.post(URL, {
    ...requestData,
    indicator: requestData.indicator[0],
  });
  const second = await axiosInstance.post(URL, {
    ...requestData,
    indicator: requestData.indicator[1],
  });

  return [first, second];
};

export const getAlertNotifications = async (area = "", category = "") => {
  const URL = `${ENDPOINT}/alerts/notifications?area=${area}&category=${category}`;

  return await axiosInstance.get(URL);
};

export const loginUser = async (userDetails) => {
  const URL = `${ENDPOINT}/auth/login`;
  return await axiosInstance.post(URL, userDetails);
};


export const signupUser = async (userDetails) => {
  const URL = `${ENDPOINT}/auth/signup`;
  return await axiosInstance.post(URL, userDetails);
};
