export const PrevDataInitial = {
    data: {
      count: 0,
      next: null,
      previous: null,
      page_size: 8,
      results: [],
    },
    status_code: 200,
    success: true,
    messages: "",
}


export interface AuthState {
  id: number;
  username: string;
  accessToken: string;
  refreshToken: string;
  lastLogin: string | null;
  isLoggedIn: boolean;
  permissions: string[];
  isAdmin: boolean;
}