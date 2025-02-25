import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthResponse } from "@/utils/auth/AuthResponseSanitizer";

interface AuthState {
  id: number;
  username: string;
  accessToken: string;
  refreshToken: string;
  lastLogin: string | null;
  isLoggedIn: boolean;
  permissions: string[];
}

const initialAuthState: AuthState = {
  id: 0,
  username: "",
  accessToken: "",
  refreshToken: "",
  lastLogin: null,
  isLoggedIn: false,
  permissions: [],
};

export const useAuthStore = create(
  persist<AuthState>(() => initialAuthState, { name: "auth" })
);

export const updateUser = (authResponse: AuthResponse) => {
  useAuthStore.setState({
    ...authResponse,
    isLoggedIn: true,
  });
};


export const deleteUser = () => {
  useAuthStore.setState(initialAuthState, true);
};

export const renewAccessToken = (newAccessToken: string) => {
  useAuthStore.setState({ accessToken: newAccessToken });
};