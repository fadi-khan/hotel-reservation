import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const USER_KEY = "user";

interface User {
  id?: number;
  email?: string;
}

interface AuthState {
  user: User;
}

const getInitialState = (): any => {
  if (typeof window === "undefined") return { user: {} };
  try {
    const raw = localStorage.getItem(USER_KEY);
    return { user: raw ? JSON.parse(raw) : {} };
  } catch {
    return { user: {} };
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState:getInitialState(),
  reducers: {
    handleLogin: (state, action: PayloadAction<{ user: any }>) => {
      state.user = action.payload.user;
      if (typeof window !== "undefined") {
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user));
        window.dispatchEvent(new Event("auth-changed"));
      }
    },

    updateUser: (state, action: PayloadAction<{ user: any }>) => {
      state.user = action.payload.user;
      if (typeof window !== "undefined") {
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user));
        window.dispatchEvent(new Event("auth-changed")); // ✅ added for consistency
      }
    },

    handleLogout: (state) => {
      state.user = {};
      if (typeof window !== "undefined") {
        localStorage.removeItem(USER_KEY);
        window.dispatchEvent(new Event("auth-changed"));
      }
    },
  },
});

export const { handleLogin, updateUser, handleLogout } = authSlice.actions;
export default authSlice.reducer;
