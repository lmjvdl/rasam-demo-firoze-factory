import { ProductLineResponse } from "./productLines";

export interface RegisterUserResponse  {
  username: string;
  phone_number: string;
  password: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  exp_date?: string | null;
  is_manager?: boolean;
  is_superuser?: boolean;
  is_admin?: boolean;
  product_line_ids?: number[];
}
export type RegisterUserParameter = RegisterUserResponse;

export type registerUserForm = Omit<RegisterUserParameter, "product_line_ids"> & {
  product_line_ids: ProductLineResponse[];
};
