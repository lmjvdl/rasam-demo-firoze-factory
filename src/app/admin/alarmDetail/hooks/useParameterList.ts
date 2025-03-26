import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import functionParameterUrls from "@/utils/url/adminPanel/functionParameter/functionParameterUrl";
import { parameterInitialData, parameterSanitizer } from "@/utils/refinedData/adminPanel/parameter";

export default function useParameterQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.alarmDetail.parameter_list,
    initialData: parameterInitialData,
    select: parameterSanitizer,
    queryFn: ({ signal }) => fetchWithError(functionParameterUrls.listFunctionParameter, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}