import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import productLineUrls from "@/utils/url/adminPanel/productLine/productLineUrl";
import { productLineInitialData, productLineSanitizer } from "@/utils/refinedData/adminPanel/productLine";


export default function useProductLineQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.productLinePart.product_line_list,
    initialData: productLineInitialData,
    select: productLineSanitizer,
    queryFn: ({ signal }) => fetchWithError(productLineUrls.listProductLine, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}