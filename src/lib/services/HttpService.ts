import axios, { AxiosInstance } from "axios";
import { store } from "@/lib/store/store";
import { handleLogout } from "@/lib/store/authSlice";

const baseUrl = process.env.API_URL || 'http://localhost:3000';

// Debug logging to verify baseUrl
if (typeof window !== 'undefined') {
  console.log('Client-side baseUrl:', baseUrl);
} else {
  console.log('Server-side baseUrl:', baseUrl);
}

class HttpService {
  private axios: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor() {
    this.axios = axios.create({
      baseURL: baseUrl,
      withCredentials: true, // VERY IMPORTANT for refresh token cookies
    });

    // Attach access token to every request
    this.axios.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    // Response interceptor (auto refresh on 401)
    this.axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;

        // If 401 (expired access token)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Avoid calling refresh API multiple times
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            try {
              const { data } = await this.axios.post("/auth/refresh-token");

              localStorage.setItem("access_token", data.access_token);

              this.isRefreshing = false;
              this.onRefreshed(data.access_token);
            } catch (err) {
              this.isRefreshing = false;
              return Promise.reject(err);
            }
          }

          // Queue the request until refresh finishes
          return new Promise((resolve) => {
            this.subscribeTokenRefresh((token: string) => {
              originalRequest.headers.Authorization = "Bearer " + token;
              resolve(this.axios(originalRequest));
            });
          });
        }

        return Promise.reject(error);
      }
    );
  }

  // helpers
  private subscribeTokenRefresh(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb);
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((cb) => cb(token));
    this.refreshSubscribers = [];
  }

  get(url: string) {
    return this.axios.get(url);
  }

  post(url: string, body?: any) {
    return this.axios.post(url, body);
  }
}

// Create a singleton instance
export const httpService = new HttpService();