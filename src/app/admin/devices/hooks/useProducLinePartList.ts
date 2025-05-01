import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePart/productLinePartUrl";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";

export default function useProductLinePartQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.devices.product_line_part_list,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(productLinePartUrls.listProductLinePart, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}