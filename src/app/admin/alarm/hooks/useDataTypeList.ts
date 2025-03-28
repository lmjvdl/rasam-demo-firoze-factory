import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import dataTypeUrls from "@/utils/url/adminPanel/dataType/dataTypeUrl";
import { dataTypeInitialData, dataTypeSanitizer } from "@/utils/refinedData/adminPanel/dataType";


export default function useDataTypeQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.alarm.data_type_list,
    initialData: dataTypeInitialData,
    select: dataTypeSanitizer,
    queryFn: ({ signal }) => fetchWithError(dataTypeUrls.listDataType, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}