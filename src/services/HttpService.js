import axios from "axios";
import Cookies from "js-cookie";
import { store } from "@/lib/store/store";
import { handleLogout } from "@/lib/store/authSlice";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://144.91.76.33:3002/api/v1';

// Debug logging to verify baseUrl
if (typeof window !== 'undefined') {
  console.log('Client-side baseUrl:', baseUrl);
} else {
  console.log('Server-side baseUrl:', baseUrl);
}

export class HttpService {
  CancelToken;
  source;

  constructor() {
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
    
    if (HttpService.getToken()) {
      axios.defaults.headers["Authorization"] = `Bearer ${HttpService.getToken()}`;
    }

    axios.interceptors.request.use(
      (config) => {
        const token = HttpService.getToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        // Set the time zone offset in the header
        const offsetMinutes = new Date().getTimezoneOffset();
        const offsetHours = offsetMinutes / 60;
        config.headers["offset"] = offsetHours;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      function (error) {
        const status = error?.response?.status;
        const serverMsg = (error?.response?.data?.message || '').toString();

        // Consider classic auth failure messages even if backend returns non-401
        const looksLikeInvalidToken = /invalid token|jwt expired|token expired/i.test(serverMsg);
        const isAuthFailure = status === 401 || looksLikeInvalidToken;

        if (isAuthFailure) {
          const msg = 'Your session has expired. Please login again!';
          if (error.response && error.response.data) {
            error.response.data.message = msg;
          }
          error.message = msg;

          // Only perform logout/clear/modal if a token or auth header was present
          const hadToken = !!HttpService.getToken();
          const hadAuthHeader = !!(error?.config?.headers && (
            error.config.headers["Authorization"] || error.config.headers["authorization"]
          ));

          if (hadToken || hadAuthHeader) {
            try { HttpService.clearCookie(); } catch {}
            try { store.dispatch(handleLogout()); } catch {}
            try {
              if (typeof window !== 'undefined') {
                if (!window.__openedAuthFrom401) {
                  window.__openedAuthFrom401 = true;
                  window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { message: msg } }));
                  setTimeout(() => { window.__openedAuthFrom401 = false; }, 1500);
                }
              }
            } catch {}
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Set Token On Header
   * @param token
   */
  static setToken(token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  /**
   * Retrieves the token from the cookies.
   * @returns {string | undefined} The token value if found, otherwise undefined.
   */
  static getToken() {
    return Cookies.get("@voiture/authToken") ?? "";
  }

  static getUser() {
    return Cookies.get("@voiture/user") ?? "";
  }

  static clearCookie() {
    Cookies.remove("@voiture/user");
    Cookies.remove("@voiture/authToken");
    Cookies.remove("isLoggedIn");

    delete axios.defaults.headers["Authorization"];
  }

  /**
   * Sets a cookie with the specified name and value.
   * @param {string} name The name of the cookie.
   * @param {string} value The value to be stored in the cookie.
   */
  static setCookie(name, value) {
    try {
      Cookies.set(name, value, {
        expires: 30, // 30 days
        secure: false, // Set to true in production with HTTPS
        sameSite: "lax",
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * Fetch data from server
   * @param url Endpoint link
   * @return Promise
   */
  get = async (url, params) => {
    const res = await axios.get(`${baseUrl}/${url}`, {
      params,
      cancelToken: this.source.token,
    });
    return res.data;
  };

  /**
   * Write data over server
   * @param url Endpoint link
   * @param body Data to send over server
   * @param config Additional axios config (headers, etc.)
   * @return Promise
   */
  post = async (url, body, config = {}) => {
    const res = await axios.post(`${baseUrl}/${url}`, body, config);
    return res.data;
  };

  /**
   * Delete Data From Server
   * @param url Endpoint link
   * @param params Embed as query params
   * @return Promise
   */
  delete = async (url, params, data) => {
    const res = await axios.delete(`${baseUrl}/${url}`, { params, data });
    return res.data;
  };

  /**
   * Update data on server
   * @param url Endpoint link
   * @param body Data to send over server
   * @param params Embed as query params
   * @return Promise
   */
  put = async (url, body, params) => {
    const res = await axios.put(`${baseUrl}/${url}`, body, {
      ...params,
      cancelToken: this.source.token,
    });
    return res.data;
  };

  patch = async (url, body, params) => {
    const res = await axios.patch(`${baseUrl}/${url}`, body, {
      ...params,
      cancelToken: this.source.token,
    });
    return res.data;
  };

  updateCancelToken() {
    this.source = this.CancelToken.source();
  }

  cancel = () => {
    this.source.cancel("Explicitly cancelled HTTP request");
    this.updateCancelToken();
  };
}

// Create a singleton instance
export const httpService = new HttpService();