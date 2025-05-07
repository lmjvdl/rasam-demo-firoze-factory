import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";
import dataTypeUrls from "@/utils/url/adminPanel/dataTypeUrl";


export default function useDataTypeQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.devices.data_type_list,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(dataTypeUrls.listDataType, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}