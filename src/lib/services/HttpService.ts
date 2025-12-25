import axios, { AxiosInstance } from "axios";
import { store } from "@/lib/store/store";
import { handleLogout } from "@/lib/store/authSlice";

const baseUrl = process.env.API_URL || "http://localhost:3000";

class HttpService {
  private axios: AxiosInstance;
  private isRefreshing = false;
  private subscribers: ((token: string) => void)[] = [];

  constructor() {
    this.axios = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
    });

    this.axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;

        // Prevent SSR crash
        const isBrowser = typeof window !== "undefined";

        // If refresh token API fails → logout (single robust cleanup)
        if (error.response?.status === 401 && originalRequest.url?.includes("/auth/refresh-token")) {
          store.dispatch(handleLogout());
          if (isBrowser) window.dispatchEvent(new Event("auth-changed"));
          return Promise.reject(error);
        }

        // If access token expired → refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (!this.isRefreshing) {
            this.isRefreshing = true;
            try {
              // Isolated refresh call (no interceptors involved)
              const { data } = await axios.post(
                "/auth/refresh-token",
                {},
                { baseURL: baseUrl, withCredentials: true }
              );

              this.isRefreshing = false;
              this.notify(data.access_token);
            } catch (e) {
              this.isRefreshing = false;
              store.dispatch(handleLogout());
              if (isBrowser) window.dispatchEvent(new Event("auth-changed"));
              return Promise.reject(e);
            }
          }

          // Queue until token refreshes
          return new Promise((resolve) => {
            this.subscribe((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(this.axios(originalRequest));
            });
          });
        }

        return Promise.reject(error);
      }
    );
  }

  private subscribe(cb: (token: string) => void) {
    this.subscribers.push(cb);
  }

  private notify(token: string) {
    this.subscribers.forEach((cb) => cb(token));
    this.subscribers = [];
  }

  get(url: string) {
    return this.axios.get(url);
  }

  post(url: string, body?: any) {
    return this.axios.post(url, body);
  }
}

export const httpService = new HttpService();
