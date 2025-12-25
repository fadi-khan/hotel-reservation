import { createSlice } from "@reduxjs/toolkit";

const USER_KEY = "user";
const TOKEN_KEY = "access_token";

export const initialUser = () => {
  if (typeof window === "undefined") {
    return {};
  }
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const getInitialAuthState = () => {
  if (typeof window === "undefined") {
    return {
      userData: {},
      token: null,
    };
  }

  const token = localStorage.getItem(TOKEN_KEY) || null;
  const userData = initialUser();
  
  return {
    userData,
    token,
  };
};

export const authSlice = createSlice({
  name: "authentication",
  initialState: getInitialAuthState(),
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload.user;
      state.token = action.payload.token;

      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, action.payload.token);
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user ?? {}));
        window.dispatchEvent(new Event("auth-changed"));
      }
    },
    updateUserData: (state, action) => {
      state.userData = action.payload.user;

      if (typeof window !== "undefined") {
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user ?? {}));
        window.dispatchEvent(new Event("auth-changed"));
      }
    },
    handleLogout: (state) => {
      state.userData = {};
      state.token = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        window.dispatchEvent(new Event("auth-changed"));
      }
    },
  },
});

export const { handleLogin, updateUserData, handleLogout } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state?.auth;
export const selectIsLoggedIn = (state) => !!state?.auth?.token;
export const selectUser = (state) => state?.auth?.userData;
export const selectToken = (state) => state?.auth?.token;

export default authSlice.reducer;