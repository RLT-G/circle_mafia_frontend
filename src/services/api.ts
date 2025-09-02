import axios, { type AxiosInstance } from "axios";
import { apiURL } from "../constans"

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: apiURL,
    });

    this.api.interceptors.request.use(
      async (config) => {
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken) {
            return Promise.reject(error);
          }

          try {
            const response = await axios.post(`${apiURL}/token/refresh/`, { refresh: refreshToken });
            const newAccessToken = response.data.access;
            localStorage.setItem("accessToken", newAccessToken);
            const newRefreshToken = response.data?.refresh;
            if (newAccessToken) {
              localStorage.setItem("refreshToken", newRefreshToken)
            }
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  getInstance() {
    return this.api;
  }
}

export default new ApiService().getInstance();
