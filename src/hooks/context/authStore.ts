import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthResponse } from "@/utils/auth/authResponseSanitizer";
import { AuthState } from "@/interfaces/general/general";

const initialAuthState: AuthState = {
  id: 0,
  username: "",
  accessToken: "",
  refreshToken: "",
  lastLogin: null,
  isLoggedIn: false,
  permissions: [],
  isAdmin: false,
};

export const useAuthStore = create(
  persist<AuthState>(() => initialAuthState, { name: "auth" })
);

export const updateUser = (authResponse: AuthResponse) => {
  useAuthStore.setState({
    ...authResponse.data,
    isLoggedIn: true,
  });
};


export const deleteUser = () => {
  useAuthStore.setState(initialAuthState, true);
};

export const renewAccessToken = (newAccessToken: string) => {
  useAuthStore.setState({ accessToken: newAccessToken });
};