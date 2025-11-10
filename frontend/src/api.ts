import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const API = axios.create({
  baseURL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${baseURL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );

        return API(originalRequest);
      } catch (Error) {
        console.error("Token refresh failed:", Error);

        const lastPath = window.location.pathname;
        localStorage.setItem("lastVisitedPage", lastPath);

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
