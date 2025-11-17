import { createSlice } from "@reduxjs/toolkit";
import { HttpService } from "../services/HttpService";

export const initialUser = () => {
  // Only access cookies on client side to prevent hydration mismatch
  if (typeof window === "undefined") {
    return {};
  }
  const item = HttpService.getUser() ?? "";
  // Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {};
};

const getInitialAuthState = () => {
  // Only access cookies on client side to prevent hydration mismatch
  if (typeof window === "undefined") {
    return {
      userData: {},
      token: null,
    };
  }

  // Client-side: read from cookies
  const token = HttpService.getToken() || null;
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
      
      // Handle cookie management and token setting
      HttpService.setToken(action.payload.token);
      HttpService.setCookie('@voiture/authToken', action.payload.token);
      HttpService.setCookie('@voiture/user', JSON.stringify(action.payload.user));
      HttpService.setCookie('isLoggedIn', 'true');
    },
    updateUserData: (state, action) => {
      // Update user data only, don't touch token or cookies
      state.userData = action.payload.user;
      
      // Only update user cookie, leave token unchanged
      HttpService.setCookie('@voiture/user', JSON.stringify(action.payload.user));
    },
    handleLogout: (state) => {
      HttpService.clearCookie();
      state.userData = {};
      state.token = null;
    },
  },
});

export const { handleLogin, updateUserData, handleLogout } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state?.auth;
export const selectIsLoggedIn = (state) => !!state?.auth?.token && !!state?.auth?.userData?.id;
export const selectUser = (state) => state?.auth?.userData;
export const selectToken = (state) => state?.auth?.token;

export default authSlice.reducer;