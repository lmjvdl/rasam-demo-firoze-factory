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
  permissions: number[];
  isAdmin: boolean;
}


export interface ProductLineCompany {
  company_id: number;
  company_name: string;
  company_logo: string;
  product_lines: {
    id: number;
    name: string;
    light_icon: string | null;
    dark_icon: string | null;
  }[];
}

export interface ProductLineState {
  data: ProductLineCompany[];
  companies: ProductLineCompany[];
}
