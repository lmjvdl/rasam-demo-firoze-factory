import { useQuery } from "@tanstack/react-query";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import { DataQuery } from "@/interfaces/admin/dataQuery/dataQuery";


export default function useDataQuery(data: DataQuery) {
  return useQuery({
    queryKey: data.queryKey,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(data.url, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}