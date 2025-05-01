import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import functionParameterUrls from "@/utils/url/adminPanel/functionParameter/functionParameterUrl";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";

export default function useParameterQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.alarmDetail.parameter_list,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(functionParameterUrls.listFunctionParameter, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}