import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import productLineUrls from "@/utils/url/adminPanel/productLineUrl";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";


export default function useProductLineQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.productLinePart.product_line_list,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(productLineUrls.listProductLine, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}