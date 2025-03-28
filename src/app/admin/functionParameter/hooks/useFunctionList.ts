import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import functionUrls from "@/utils/url/adminPanel/function/functionUrl";
import { functionInitialData, functionSanitizer } from "@/utils/refinedData/adminPanel/function";


export default function useFunctionQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.alarm.function_list,
    initialData: functionInitialData,
    select: functionSanitizer,
    queryFn: ({ signal }) => fetchWithError(functionUrls.listFunction, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}