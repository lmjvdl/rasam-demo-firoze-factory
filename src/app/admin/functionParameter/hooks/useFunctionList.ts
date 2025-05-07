import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import functionUrls from "@/utils/url/adminPanel/functionUrl";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";


export default function useFunctionQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.alarm.function_list,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(functionUrls.listFunction, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}