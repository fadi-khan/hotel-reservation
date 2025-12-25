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
      withCredentials: true, // sends cookies automatically
    });

    this.axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        const req = error.config;

        // If refresh fails → logout
        if (error.response?.status === 401 && req?.url?.includes("/auth/refresh-token")) {
          store.dispatch(handleLogout());
          window.dispatchEvent(new Event("auth-changed"));
          return Promise.reject(error);
        }

        // If access token expired → refresh
        if (error.response?.status === 401 && !req._retry) {
          req._retry = true;

          if (!this.isRefreshing) {
            this.isRefreshing = true;
            try {
              const { data } = await this.axios.post("/auth/refresh-token");
              this.isRefreshing = false;
              this.notify(data.access_token);
            } catch (e) {
              this.isRefreshing = false;
              store.dispatch(handleLogout());
              window.dispatchEvent(new Event("auth-changed"));
              return Promise.reject(e);
            }
          }

          return new Promise((resolve) => {
            this.subscriber((token) => {
              req.headers.Authorization = `Bearer ${token}`;
              resolve(this.axios(req));
            });
          });
        }

        return Promise.reject(error);
      }
    );
  }

  private subscriber(cb: (token: string) => void) {
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
