import { axiosInstance } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

const getProductLinesURL = "factory_structure/productlines/";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getProductLines = (params?: string, config?: AxiosRequestConfig<any>) => {
  return axiosInstance.get(getProductLinesURL + params, config);
};
export const productLinesKey = "users";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGetProductLines = (params?: string, config?:AxiosRequestConfig<any>) => {
  const query = useQuery({
    queryKey: [productLinesKey],
    queryFn: () => getProductLines(params, config),
  });
  return query;
};
