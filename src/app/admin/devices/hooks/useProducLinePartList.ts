import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePart/productLinePartUrl";
import { productLinePartInitialData, productLinePartSanitizer } from "@/utils/refinedData/adminPanel/productLinePart";


export default function useProductLinePartQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.devices.product_line_part_list,
    initialData: productLinePartInitialData,
    select: productLinePartSanitizer,
    queryFn: ({ signal }) => fetchWithError(productLinePartUrls.listProductLinePart, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}